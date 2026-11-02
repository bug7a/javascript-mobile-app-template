/* Bismillah */

/*
BOOK (over the tabs): the person, the day and the time of a service on one page. The confirm button stays in a fixed
footer. params: { serviceId, personId, appointmentId }: appointmentId changes the time of that appointment.
*/

"use strict";

App.addPage({

    id: "book",
    title: (params) => tx(params.appointmentId ? "Change the time" : "Book"),

    create: function (box, params, view) {

        const FOOTER_HEIGHT = 76;
        const PERSON_SIZE = 48;
        const DAY_HEIGHT = 64;
        const TIMES_PER_ROW = 4;
        const NOON = 12 * 60;

        const service = Store.findService(params.serviceId);
        const edited = params.appointmentId ? Store.findAppointment(params.appointmentId) : null;
        const editedId = edited ? edited.id : "";

        let selectedPersonId = params.personId || (edited ? edited.personId : Store.ANY_PERSON);
        let selectedDay = Store.getFirstFreeDay(service, selectedPersonId, edited ? edited.dayKey : Store.getToday(), editedId);
        let selectedTime = null;
        let shownMonday = Store.getMondayOf(selectedDay);

        // *** DRAWING: each part draws itself again from the state above.

        const drawPart = function (part, createContent) {
            part.children.forEach((child) => child.remove());
            createIn(part, createContent);
        };

        const createPersonChoice = function (person, name) {
            const isSelected = (person ? person.id : Store.ANY_PERSON) === selectedPersonId;
            const tile = VGroup({ width: "25%", shrink: 1, height: "auto", gap: 5, align: "center top", padding: [2, 10], round: 14,
                color: App.colors.surface, border: isSelected ? 2 : 1, borderColor: isSelected ? App.colors.accent : App.colors.line });
            tile.role = "radio";
            tile.tabIndex = 0;
            tile.aria = { checked: isSelected, label: name };
                if (person) {
                    BookingUI.avatar(person, PERSON_SIZE);
                } else {
                    BookingUI.iconCircle(App.ICON_PATHS.spark, PERSON_SIZE);
                }
                Label({ plainText: name, width: "100%", textAlign: "center", fontSize: 12, textColor: App.colors.text, ellipsis: 1 });
            endGroup();
            BookingUI.makePressable(tile, function () {
                selectedPersonId = person ? person.id : Store.ANY_PERSON;
                selectedDay = Store.getFirstFreeDay(service, selectedPersonId, selectedDay, editedId);
                shownMonday = Store.getMondayOf(selectedDay);
                selectedTime = null;
                drawAll();
            });
        };

        const drawPeople = function () {
            drawPart(peoplePart, function () {
                createPersonChoice(null, tx("Any"));
                Store.getPeopleFor(service).forEach((person) => createPersonChoice(person, person.name));
            });
        };

        const createDay = function (dayKey) {
            const isSelected = (dayKey === selectedDay);
            const isOpen = Store.isBookable(dayKey);
            const textColor = isSelected ? App.colors.white : (isOpen ? App.colors.text : App.colors.softText);
            const day = VGroup({ width: "14.28%", shrink: 1, height: DAY_HEIGHT, gap: 2, align: "center center", round: 14,
                color: isSelected ? App.colors.accent : (isOpen ? App.colors.surface : App.colors.disabled) });
            day.role = "radio";
            day.aria = { checked: isSelected, label: Store.getDayText(dayKey), disabled: !isOpen };
                Label({ plainText: Store.getShortDayName(dayKey), fontSize: 11, textColor: textColor });
                Label({ plainText: String(Store.getDate(dayKey).getDate()), fontSize: 17, bold: 1, textColor: textColor });
            endGroup();
            if (!isOpen) return;
            day.tabIndex = 0;
            BookingUI.makePressable(day, function () {
                selectedDay = dayKey;
                selectedTime = null;
                drawDays();
                drawTimes();
                refreshFooter();
            });
        };

        const moveWeek = function (weekCount) {
            shownMonday = Store.addDays(shownMonday, weekCount * Store.DAYS_IN_WEEK);
            const firstDay = Store.isBookable(shownMonday) ? shownMonday : Store.addDays(shownMonday, 1);
            selectedDay = Store.getFirstFreeDay(service, selectedPersonId, firstDay, editedId);
            shownMonday = Store.getMondayOf(selectedDay);
            selectedTime = null;
            drawDays();
            drawTimes();
            refreshFooter();
        };

        const drawDays = function () {
            const isFirstWeek = (shownMonday <= Store.getMondayOf(Store.getToday()));
            const nextMonday = Store.addDays(shownMonday, Store.DAYS_IN_WEEK);
            const isLastWeek = (nextMonday > Store.getLastDay());
            drawPart(daysPart, function () {
                HGroup({ width: "100%", height: "auto", align: "left center", gap: 6, clipContent: 0 });
                    BookingUI.iconButton(App.ICON_PATHS.back, tx("Previous week"), () => moveWeek(-1), false, 36).setEnabled(isFirstWeek ? 0 : 1);
                    Label({ plainText: Store.getDate(selectedDay).toLocaleDateString(Texts.current, { month: "long", year: "numeric" }),
                        grow: 1, shrink: 1, textAlign: "center", fontSize: 14, bold: 1, textColor: App.colors.text });
                    BookingUI.iconButton(App.ICON_PATHS.next, tx("Next week"), () => moveWeek(1), false, 36).setEnabled(isLastWeek ? 0 : 1);
                endGroup();
                HGroup({ width: "100%", height: "auto", gap: 4, align: "left top", clipContent: 0 });
                    for (let index = 0; index < Store.DAYS_IN_WEEK; index++) {
                        createDay(Store.addDays(shownMonday, index));
                    }
                endGroup();
            });
        };

        const createTime = function (time) {
            const button = BookingUI.chip(Store.getTimeText(time), function () {
                selectedTime = time;
                drawTimes();
                refreshFooter();
            }, { width: "25%", shrink: 1, height: 42, ariaLabel: Store.getTimeText(time) });
            button.setStyle({ layout: { padding: [0, 0] } });
            BookingUI.setSelected(button, time === selectedTime);
        };

        // WHY rows and not wrap: every time is as wide, also in a last row that is not full.
        const createTimeRows = function (title, times) {
            if (!times.length) return;
            BookingUI.softText(title, 13);
            for (let index = 0; index < times.length; index += TIMES_PER_ROW) {
                HGroup({ width: "100%", height: "auto", gap: 6, align: "left center", clipContent: 0 });
                    const rowTimes = times.slice(index, index + TIMES_PER_ROW);
                    rowTimes.forEach(createTime);
                    for (let empty = rowTimes.length; empty < TIMES_PER_ROW; empty++) {
                        Box({ width: "25%", shrink: 1, height: 1, color: "transparent" });
                    }
                endGroup();
            }
        };

        const drawTimes = function () {
            const times = Store.getFreeTimes(service, selectedPersonId, selectedDay, editedId);
            drawPart(timesPart, function () {
                if (!times.length) {
                    BookingUI.empty(App.ICON_PATHS.clock, tx("No free times"), tx("Try another day or person."));
                    return;
                }
                createTimeRows(tx("Morning"), times.filter((time) => time < NOON));
                createTimeRows(tx("Afternoon"), times.filter((time) => time >= NOON));
            });
        };

        const refreshFooter = function () {
            const hasTime = (selectedTime !== null);
            lblWhen.plainText = hasTime ? Store.getTimeText(selectedTime) : tx("Choose a time first");
            btnConfirm.setEnabled(hasTime ? 1 : 0);
        };

        const drawAll = function () {
            drawPeople();
            drawDays();
            drawTimes();
            refreshFooter();
        };

        // *** THE END OF THE BOOKING:

        const confirmBooking = async function () {
            const saveBooking = () => Store.saveAppointment(service, selectedPersonId, selectedDay, selectedTime, noteInput.text.trim(), editedId);
            // WHY the short wait: here a real business waits for its server; the demo shows the same screen.
            const appointment = await App.wait(basic.sleep(500).then(saveBooking));
            if (!appointment) {
                Toast.show({ key: "booking", type: "error", message: tx("This time was just taken. Choose another one.") });
                selectedTime = null;
                drawTimes();
                refreshFooter();
                return;
            }
            App.closeAllPages();
            App.showTab("appointments");
            App.open("appointment", { id: appointment.id, message: edited ? "Your appointment is changed." : "Your appointment is booked." });
        };

        // *** THE PAGE:

        App.startCard({ padding: [14, 12], round: 16, gap: 0 });
            HGroup({ width: "100%", height: "auto", gap: 12, align: "left center" });
                BookingUI.iconCircle(App.ICON_PATHS.spark, 42);
                VGroup({ width: "100%", height: "auto", gap: 2, shrink: 1 });
                    BookingUI.title(tx(service.name), 15);
                    BookingUI.softText(BookingUI.getDurationText(service.minutes) + "  ·  " + Store.money(service.price), 13);
                endGroup();
            endGroup();
        App.endCard();

        BookingUI.section(tx("Who would you like?"));
        const peoplePart = HGroup({ width: "100%", height: "auto", gap: 8, align: "left top", clipContent: 0 });
        endGroup();

        BookingUI.section(tx("Choose a day"));
        const daysPart = VGroup({ width: "100%", height: "auto", gap: 8, clipContent: 0 });
        endGroup();

        BookingUI.section(tx("Choose a time"));
        const timesPart = VGroup({ width: "100%", height: "auto", gap: 8, clipContent: 0 });
        endGroup();

        const noteInput = Input({ width: "100%", height: 46, placeholder: tx("Note (optional)"), fontSize: 16,
            text: edited ? edited.note : "", color: App.colors.surface, textColor: App.colors.text, round: 12,
            border: 1, borderColor: App.colors.line, aria: { label: tx("Note (optional)") } });

        let lblWhen = null;
        let btnConfirm = null;
        App.createFooter(view, FOOTER_HEIGHT, function () {
            VGroup({ hug: 1, align: "left top", shrink: 0 });
                Label({ plainText: Store.money(service.price), fontSize: 18, bold: 1, textColor: App.colors.text });
                lblWhen = Label({ plainText: "", fontSize: 12, textColor: App.colors.softText });
            endGroup();
            btnConfirm = BookingUI.button(tx(edited ? "Save the change" : "Confirm"), confirmBooking, true, { shrink: 1 });
        });

        drawAll();

    },

});
