/* Bismillah */

/*

Mobile App Template: Booking - Settings - v26.11

THE SETTINGS OF THE BUSINESS: change these first (the name, the hours, the money, the colors, the tabs).
The services and the people are in app/store.js. The template fits any business that takes appointments: a salon, a
barber, a clinic, a coach...

*/

"use strict";

const AppSettings = {

    appName: "studio.",
    appIcon: "assets/app-icon.svg",
    storageKey: "booking-template", // The saved data of the app starts with this (App.save / App.load)
    startPage: "home",

    // WHY: The components load their icons from their own folder. A copy made with _make-standalone.sh
    //      has its components in "comp/": change this line to "comp/" there.
    componentPath: "comp/",

    currency: "USD",
    address: "24 Park Avenue, Springfield",
    phone: "+1 555 0123",

    // The hours of the business. closedDays: 0 is Sunday, 6 is Saturday.
    openingTime: "09:00",
    closingTime: "19:00",
    closedDays: [0],
    slotMinutes: 30, // The times shown are this far apart
    weeksAhead: 4, // How far ahead a booking can be made

    tabs: [
        { pageId: "home", text: tx("Home"), icon: "assets/tabs/home.svg" },
        { pageId: "services", text: tx("Services"), icon: "assets/tabs/services.svg" },
        { pageId: "appointments", text: tx("Bookings"), icon: "assets/tabs/appointments.svg" },
        { pageId: "account", text: tx("Account"), icon: "assets/tabs/account.svg" },
    ],
    menu: [],

    colors: {
        background: "#F6F6FA", surface: "#FFFFFF", text: "#20233A", softText: "#5F6277", line: "#E4E5EE",
        accent: "#3F4AA3", accentPressed: "#333C8A", accentSoft: "#E7E8F6", accentSoftPressed: "#D6D8EE",
        sale: "#C2413A", danger: "#C2413A", white: "#FFFFFF", disabled: "#EDEDF2",
        heroEnd: "#6B5CC4",
    },

};
