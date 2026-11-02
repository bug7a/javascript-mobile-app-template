/* Bismillah */

/*

Mobile App Template: Shop - Settings - v26.11

THE SETTINGS OF THE SHOP: change these first (the name, the money, the shipping prices, the colors, the tabs).
The products, the discount codes and the saved data are in app/store.js.

*/

"use strict";

const AppSettings = {

    appName: "goods.",
    appIcon: "assets/app-icon.svg",
    storageKey: "shop-template", // The saved data of the app starts with this (App.save / App.load)
    startPage: "home",

    // WHY: The components load their icons from their own folder. A copy made with _make-standalone.sh
    //      has its components in "comp/": change this line to "comp/" there.
    componentPath: "comp/",

    currency: "USD",
    freeShippingFrom: 100,
    shippingPrices: { standard: 5, express: 12 },
    discountCodes: { WELCOME10: 10 }, // code: percent

    tabs: [
        { pageId: "home", text: tx("Home"), icon: "assets/tabs/home.svg" },
        { pageId: "shop", text: tx("Shop"), icon: "assets/tabs/shop.svg" },
        { pageId: "cart", text: tx("Cart"), icon: "assets/tabs/cart.svg" },
        { pageId: "account", text: tx("Account"), icon: "assets/tabs/account.svg" },
    ],
    menu: [],

    colors: {
        background: "#F6F6F3", surface: "#FFFFFF", text: "#1F2A2A", softText: "#5F6866", line: "#E6E6E0",
        accent: "#1F7A5C", accentPressed: "#17634A", accentSoft: "#E2F0EA", accentSoftPressed: "#CFE5DB",
        sale: "#C8432F", star: "#E2A400", danger: "#C8432F", white: "#FFFFFF",
        heroEnd: "#2F9C78",
    },

};
