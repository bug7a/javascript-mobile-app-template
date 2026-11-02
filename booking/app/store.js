/* Bismillah */

/*

Mobile App Template: Booking - Store - v26.11

THE DATA OF THE BUSINESS: the services, the people, the free times, the appointments and the customer.
Everything is saved on the device (App.save). A real business asks its server for the free times in
Store.getFreeTimes() and sends the booking in Store.saveAppointment(); the pages do not need to change.

A day is a text "YYYY-MM-DD" and a time is minutes from midnight (Ex: 570 is 09:30).
WHY a text and not toISOString(): it would give the day in UTC, the wrong day late in the evening in many countries.

Every change calls Store.notify(): a page that shows this data listens with box.listenTo(window, Store.EVENT, ...).

*/

"use strict";

const Store = {};

Store.EVENT = "booking-data-changed";
Store.CATEGORIES = ["Hair", "Skin", "Nails"];
Store.DAYS_IN_WEEK = 7;
Store.MINUTES_PER_DAY = 24 * 60;
Store.ANY_PERSON = "any";
Store.DEMO_BUSY_ONE_IN = 4; // The demo: about one of this many times is taken by other customers

Store.services = [
    { id: "cut-women", name: "Women's haircut", note: "Cut, wash and style", category: "Hair", minutes: 60, price: 55, isPopular: 1 },
    { id: "cut-men", name: "Men's haircut", note: "A quick, clean cut", category: "Hair", minutes: 30, price: 30, isPopular: 1 },
    { id: "color", name: "Color and blow-dry", note: "Full color with a finish", category: "Hair", minutes: 120, price: 110 },
    { id: "blow-dry", name: "Blow-dry", note: "Smooth and full of volume", category: "Hair", minutes: 30, price: 25 },
    { id: "facial", name: "Classic facial", note: "Cleanse, massage and mask", category: "Skin", minutes: 60, price: 70, isPopular: 1 },
    { id: "cleansing", name: "Deep cleansing", note: "For tired, oily skin", category: "Skin", minutes: 90, price: 95 },
    { id: "manicure", name: "Manicure", note: "Shape, care and polish", category: "Nails", minutes: 30, price: 28 },
    { id: "pedicure", name: "Gel pedicure", note: "Lasts three weeks", category: "Nails", minutes: 60, price: 48 },
];

Store.people = [
    { id: "maya", name: "Maya", color: "#C9708E", categories: ["Hair", "Nails"] },
    { id: "leo", name: "Leo", color: "#4F8FB0", categories: ["Hair"] },
    { id: "sara", name: "Sara", color: "#5FA388", categories: ["Skin", "Nails"] },
];

Store.FIRST_CUSTOMER = { name: "Alex Morgan", phone: "+1 555 0100" };

Store.appointments = App.load("appointments", []);
Store.customer = App.load("customer", Store.FIRST_CUSTOMER);

Store.notify = function () {
    window.dispatchEvent(new Event(Store.EVENT));
};

Store.money = function (amount) {
    return new Intl.NumberFormat(Texts.current, {
        style: "currency",
        currency: AppSettings.currency,
        maximumFractionDigits: 0,
    }).format(amount);
};

Store.findService = (id) => Store.services.find((service) => service.id === id);
Store.findPerson = (id) => Store.people.find((person) => person.id === id);
Store.getPopularServices = () => Store.services.filter((service) => service.isPopular);
Store.getPeopleFor = (service) => Store.people.filter((person) => person.categories.includes(service.category));

// *** DAYS AND TIMES:

Store.getDayKey = function (date) {
    const month = basic.twoDigitFormat(date.getMonth() + 1);
    const day = basic.twoDigitFormat(date.getDate());
    return date.getFullYear() + "-" + month + "-" + day;
};

Store.getDate = function (dayKey) {
    const [year, month, day] = dayKey.split("-").map(Number);
    return new Date(year, month - 1, day);
};

// WHY setDate and not hours x 24: a day with a clock change has 23 or 25 hours.
Store.addDays = function (dayKey, count) {
    const date = Store.getDate(dayKey);
    date.setDate(date.getDate() + count);
    return Store.getDayKey(date);
};

Store.getToday = () => Store.getDayKey(new Date());

Store.getMondayOf = function (dayKey) {
    const dayOfWeek = Store.getDate(dayKey).getDay();
    const daysFromMonday = (dayOfWeek + Store.DAYS_IN_WEEK - 1) % Store.DAYS_IN_WEEK;
    return Store.addDays(dayKey, -daysFromMonday);
};

Store.getLastDay = () => Store.addDays(Store.getToday(), AppSettings.weeksAhead * Store.DAYS_IN_WEEK);

Store.isClosed = (dayKey) => AppSettings.closedDays.includes(Store.getDate(dayKey).getDay());

Store.isBookable = function (dayKey) {
    return dayKey >= Store.getToday() && dayKey <= Store.getLastDay() && !Store.isClosed(dayKey);
};

Store.getMinutes = function (timeText) {
    const [hours, minutes] = timeText.split(":").map(Number);
    return (hours * 60) + minutes;
};

Store.getTimeText = function (minutes) {
    return basic.twoDigitFormat(Math.floor(minutes / 60)) + ":" + basic.twoDigitFormat(minutes % 60);
};

Store.getDayText = function (dayKey) {
    return Store.getDate(dayKey).toLocaleDateString(Texts.current, { weekday: "long", day: "numeric", month: "long" });
};

Store.getShortDayName = function (dayKey) {
    return Store.getDate(dayKey).toLocaleDateString(Texts.current, { weekday: "short" });
};

Store.getStartMoment = function (appointment) {
    const moment = Store.getDate(appointment.dayKey);
    moment.setMinutes(appointment.start);
    return moment;
};

// *** FREE TIMES:

Store.isOverlapping = function (appointment, start, end) {
    const appointmentEnd = appointment.start + appointment.minutes;
    return start < appointmentEnd && appointment.start < end;
};

Store.getActiveAppointmentsOf = function (dayKey, skippedId) {
    return Store.appointments.filter(function (appointment) {
        return appointment.dayKey === dayKey && !appointment.isCancelled && appointment.id !== skippedId;
    });
};

// The demo: the same person, day and time always gives the same answer. A real business asks its server here.
Store.isTakenByOthers = function (personId, dayKey, time) {
    const text = personId + dayKey + time;
    let sum = 0;
    for (let index = 0; index < text.length; index++) {
        sum = ((sum * 31) + text.charCodeAt(index)) % 9973;
    }
    return sum % Store.DEMO_BUSY_ONE_IN === 0;
};

Store.isPersonFree = function (personId, dayKey, start, end, skippedId) {
    const hasOwnBooking = Store.getActiveAppointmentsOf(dayKey, skippedId).some(function (appointment) {
        return appointment.personId === personId && Store.isOverlapping(appointment, start, end);
    });
    if (hasOwnBooking) return false;
    for (let time = start; time < end; time += AppSettings.slotMinutes) {
        if (Store.isTakenByOthers(personId, dayKey, time)) return false;
    }
    return true;
};

Store.findFreePerson = function (service, personId, dayKey, start, skippedId) {
    const end = start + service.minutes;
    const candidates = (personId === Store.ANY_PERSON) ? Store.getPeopleFor(service) : [Store.findPerson(personId)];
    return candidates.find((person) => Store.isPersonFree(person.id, dayKey, start, end, skippedId));
};

// WHY the customer too: one person can not be in two chairs, also with two different people.
Store.isCustomerFree = function (dayKey, start, end, skippedId) {
    return !Store.getActiveAppointmentsOf(dayKey, skippedId).some((appointment) => Store.isOverlapping(appointment, start, end));
};

Store.isPastTime = function (dayKey, start) {
    const today = Store.getToday();
    if (dayKey !== today) return dayKey < today;
    const now = new Date();
    return start <= (now.getHours() * 60) + now.getMinutes();
};

// The times a service can start on a day: it fits before closing, nobody is in the way. skippedId: an appointment
// that is being changed does not block its own time.
Store.getFreeTimes = function (service, personId, dayKey, skippedId = "") {
    if (!Store.isBookable(dayKey)) return [];
    const closing = Store.getMinutes(AppSettings.closingTime);
    const times = [];
    for (let start = Store.getMinutes(AppSettings.openingTime); start + service.minutes <= closing; start += AppSettings.slotMinutes) {
        const isFree = !Store.isPastTime(dayKey, start)
            && Store.isCustomerFree(dayKey, start, start + service.minutes, skippedId)
            && Store.findFreePerson(service, personId, dayKey, start, skippedId);
        if (isFree) times.push(start);
    }
    return times;
};

// The first day with a free time, from the given day on
Store.getFirstFreeDay = function (service, personId, fromDay, skippedId = "") {
    let dayKey = (fromDay < Store.getToday()) ? Store.getToday() : fromDay;
    const lastDay = Store.getLastDay();
    while (dayKey <= lastDay) {
        if (Store.getFreeTimes(service, personId, dayKey, skippedId).length) return dayKey;
        dayKey = Store.addDays(dayKey, 1);
    }
    return Store.getToday();
};

// *** APPOINTMENTS:

Store.findAppointment = (id) => Store.appointments.find((appointment) => appointment.id === id);

Store.isUpcoming = function (appointment) {
    return !appointment.isCancelled && Store.getStartMoment(appointment) > new Date();
};

Store.getUpcoming = function () {
    const upcoming = Store.appointments.filter(Store.isUpcoming);
    return upcoming.sort((a, b) => Store.getStartMoment(a) - Store.getStartMoment(b));
};

Store.getPast = function () {
    const past = Store.appointments.filter((appointment) => !Store.isUpcoming(appointment));
    return past.sort((a, b) => Store.getStartMoment(b) - Store.getStartMoment(a));
};

Store.saveAppointments = function () {
    App.save("appointments", Store.appointments);
    App.setTabBadge("appointments", Store.getUpcoming().length || "");
    Store.notify();
};

// WHY it looks again: the page may have been open for a while, the time may be gone. Returns null then.
Store.saveAppointment = function (service, personId, dayKey, start, note, editedId = "") {
    const isStillFree = Store.getFreeTimes(service, personId, dayKey, editedId).includes(start);
    if (!isStillFree) return null;
    const person = Store.findFreePerson(service, personId, dayKey, start, editedId);
    const edited = Store.findAppointment(editedId);
    const appointment = edited || { id: String(Date.now()) };
    Object.assign(appointment, { serviceId: service.id, personId: person.id, dayKey: dayKey, start: start,
        minutes: service.minutes, price: service.price, note: note, isCancelled: 0 });
    if (!edited) Store.appointments.push(appointment);
    Store.saveAppointments();
    return appointment;
};

Store.cancelAppointment = function (id) {
    Store.findAppointment(id).isCancelled = 1;
    Store.saveAppointments();
};

// *** THE CUSTOMER:

Store.saveCustomer = function (customer) {
    Store.customer = customer;
    App.save("customer", customer);
    Store.notify();
};

// *** THE DEMO:

Store.resetDemoData = function () {
    ["appointments", "customer"].forEach(function (name) {
        basic.storage.remove(AppSettings.storageKey + "-" + name);
    });
    location.reload();
};

App.whenStarted(() => App.setTabBadge("appointments", Store.getUpcoming().length || ""));
