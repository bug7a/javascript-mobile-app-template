/* Bismillah */

/*
BOOKINGS (a tab): the upcoming and the past appointments. APPOINTMENT (over the tabs): one of them, with the way to
change or cancel it. params: { id, message }: message is the English text of the thanks at the top.
*/

"use strict";

App.addPage({

    id: "appointments",
    title: tx("Bookings"),

    create: function (box) {

        const UPCOMING = 0;

        let selectedList = UPCOMING;

        BookingUI.createChoices([tx("Upcoming"), tx("Past")], function (index) {
            selectedList = index;
            drawList();
        });

        const list = VGroup({ width: "100%", height: "auto", gap: 10, clipContent: 0 });
        endGroup();

        const createAppointmentCard = function (appointment) {
            const service = Store.findService(appointment.serviceId);
            const person = Store.findPerson(appointment.personId);
            const card = App.startCard({ padding: [12, 12], round: 16, gap: 0 });
            card.role = "button";
            card.tabIndex = 0;
                HGroup({ width: "100%", height: "auto", gap: 12, align: "left center" });
                    BookingUI.avatar(person, 46);
                    VGroup({ width: "100%", height: "auto", gap: 2, shrink: 1, align: "left top" });
                        BookingUI.title(tx(service.name), 15);
                        BookingUI.softText(Store.getDayText(appointment.dayKey) + "  ·  " + Store.getTimeText(appointment.start), 12);
                        if (appointment.isCancelled) {
                            Label({ plainText: tx("Cancelled"), fontSize: 12, bold: 1, textColor: App.colors.danger });
                        } else {
                            BookingUI.softText(person.name + "  ·  " + Store.money(appointment.price), 12);
                        }
                    endGroup();
                endGroup();
            App.endCard();
            BookingUI.makePressable(card, () => App.open("appointment", { id: appointment.id }));
        };

        const drawList = function () {
            const isUpcoming = (selectedList === UPCOMING);
            const appointments = isUpcoming ? Store.getUpcoming() : Store.getPast();
            list.children.forEach((child) => child.remove());
            createIn(list, function () {
                appointments.forEach(createAppointmentCard);
                if (appointments.length) return;
                if (isUpcoming) {
                    BookingUI.empty(App.ICON_PATHS.calendar, tx("No upcoming appointments"), tx("Your next visit will show here."),
                        tx("Book now"), () => App.open("services"));
                    return;
                }
                BookingUI.empty(App.ICON_PATHS.calendar, tx("No past appointments"), tx("Your visits will show here."));
            });
        };

        box.listenTo(window, Store.EVENT, drawList);
        drawList();

    },

});

App.addPage({

    id: "appointment",
    title: tx("Appointment"),

    create: function (box, params) {

        const appointment = Store.findAppointment(params.id);
        const service = Store.findService(appointment.serviceId);
        const person = Store.findPerson(appointment.personId);
        const isUpcoming = Store.isUpcoming(appointment);

        const askCancel = async function () {
            const isSure = await Dialog.confirm({
                titleText: tx("Cancel the appointment?"),
                messageText: tx(service.name) + ", " + Store.getDayText(appointment.dayKey) + " " + Store.getTimeText(appointment.start),
                confirmText: tx("Yes, cancel"),
                cancelText: tx("Keep it"),
                danger: 1,
            });
            if (!isSure) return;
            Store.cancelAppointment(appointment.id);
            App.goBack();
        };

        const createThanks = function () {
            VGroup({ width: "100%", height: "auto", gap: 8, align: "center top", padding: [0, 6] });
                BookingUI.iconCircle(App.ICON_PATHS.check, 64, true);
                BookingUI.title(tx("Thank you!"), 24).textAlign = "center";
                BookingUI.softText(tx(params.message), 14).textAlign = "center";
            endGroup();
        };

        if (params.message) createThanks();

        HGroup({ width: "100%", height: "auto", gap: 12, align: "left center" });
            BookingUI.avatar(person, 56);
            VGroup({ width: "100%", height: "auto", gap: 2, shrink: 1, align: "left top" });
                BookingUI.title(tx(service.name), 18);
                BookingUI.softText(person.name, 14);
                if (appointment.isCancelled) Label({ plainText: tx("Cancelled"), fontSize: 13, bold: 1, textColor: App.colors.danger });
            endGroup();
        endGroup();

        App.startCard({ padding: [14, 14], round: 16, gap: 10 });
            BookingUI.row(tx("Date"), Store.getDayText(appointment.dayKey));
            BookingUI.row(tx("Time"), Store.getTimeText(appointment.start));
            BookingUI.row(tx("Duration"), BookingUI.getDurationText(appointment.minutes));
            BookingUI.row(tx("Price"), Store.money(appointment.price));
            if (appointment.note) BookingUI.row(tx("Note"), appointment.note);
        App.endCard();

        BookingUI.softText(tx("Pay at the studio.") + " " + AppSettings.address, 13);

        if (isUpcoming) {
            BookingUI.button(tx("Change the time"), function () {
                App.open("book", { serviceId: service.id, appointmentId: appointment.id });
            }, false);
            BookingUI.dangerButton(tx("Cancel the appointment"), askCancel);
        } else {
            BookingUI.button(tx("Book again"), () => App.open("book", { serviceId: service.id, personId: person.id }));
        }

        BookingUI.softText(tx("Demo: no appointment is sent to a studio."), 12);

    },

});
