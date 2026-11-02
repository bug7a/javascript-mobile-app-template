/* Bismillah */

/*
HOME (a tab): the next appointment or an invitation, the popular services, the team, and how to find the business.
*/

"use strict";

App.addPage({

    id: "home",
    title: "Home",
    showBrand: 1,
    gap: 18,

    create: function (box) {

        const PERSON_SIZE = 60;

        box.listenTo(window, Store.EVENT, App.refreshTab);

        const createHeroBox = function () {
            const hero = VGroup({ width: "100%", height: "auto", padding: [20, 18], gap: 6, align: "left top", round: 20, clipContent: 0 });
            hero.css = { background: "linear-gradient(120deg, " + App.colors.accent + ", " + App.colors.heroEnd + ")" };
            return hero;
        };

        const createNextAppointment = function (appointment) {
            const service = Store.findService(appointment.serviceId);
            const person = Store.findPerson(appointment.personId);
            const hero = createHeroBox();
            hero.role = "button";
            hero.tabIndex = 0;
                Label({ plainText: tx("NEXT APPOINTMENT"), fontSize: 10, bold: 1, textColor: App.colors.white,
                    css: { letterSpacing: "1px" } });
                Label({ plainText: Store.getDayText(appointment.dayKey), width: "100%", fontSize: 20, bold: 1, textColor: App.colors.white });
                Label({ plainText: Store.getTimeText(appointment.start) + "  ·  " + tx(service.name) + "  ·  " + person.name,
                    width: "100%", fontSize: 13, textColor: App.colors.white });
            endGroup();
            BookingUI.makePressable(hero, () => App.open("appointment", { id: appointment.id }));
        };

        const createInvitation = function () {
            createHeroBox();
                Label({ plainText: tx("Your time, your way"), width: "100%", fontSize: 21, bold: 1, textColor: App.colors.white });
                Label({ plainText: tx("Pick a service and book in under a minute."), width: "100%", fontSize: 13, textColor: App.colors.white });
                BookingUI.button(tx("Book now"), () => App.open("services"), false, { width: "auto", height: 40 });
            endGroup();
        };

        const createPerson = function (person) {
            const tile = VGroup({ width: "33.3%", shrink: 1, height: "auto", gap: 6, align: "center top", padding: [4, 12],
                color: App.colors.surface, round: 16 });
            tile.role = "button";
            tile.tabIndex = 0;
            tile.aria = { label: person.name };
                BookingUI.avatar(person, PERSON_SIZE);
                Label({ plainText: person.name, width: "100%", textAlign: "center", fontSize: 13, bold: 1, textColor: App.colors.text });
            endGroup();
            BookingUI.makePressable(tile, () => App.open("services", { personId: person.id }));
        };

        const createContactRow = function (iconPath, text) {
            HGroup({ width: "100%", height: "auto", gap: 12, align: "left center" });
                BookingUI.iconCircle(iconPath, 34);
                BookingUI.text(text, 13).shrink = 1;
            endGroup();
        };

        Label({ plainText: tx("Hello, {name}", { name: Store.customer.name.split(" ")[0] }), width: "100%",
            fontSize: 22, bold: 1, textColor: App.colors.text });

        const nextAppointment = Store.getUpcoming()[0];
        if (nextAppointment) {
            createNextAppointment(nextAppointment);
        } else {
            createInvitation();
        }

        BookingUI.section(tx("Popular services"), tx("See all"), () => App.open("services"));
        VGroup({ width: "100%", height: "auto", gap: 10, clipContent: 0 });
            Store.getPopularServices().forEach((service) => BookingUI.serviceCard(service));
        endGroup();

        BookingUI.section(tx("Our team"));
        HGroup({ width: "100%", height: "auto", gap: 10, align: "left top", clipContent: 0 });
            Store.people.forEach(createPerson);
        endGroup();

        BookingUI.section(tx("Find us"));
        App.startCard({ padding: [14, 14], round: 16, gap: 10 });
            createContactRow(App.ICON_PATHS.clock, tx("Mon-Sat {start}-{end}", { start: AppSettings.openingTime, end: AppSettings.closingTime }));
            createContactRow(App.ICON_PATHS.pin, AppSettings.address);
            createContactRow(App.ICON_PATHS.phone, AppSettings.phone);
        App.endCard();

    },

});
