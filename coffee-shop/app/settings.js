"use strict";
const AppSettings = {
    appName: "mola coffee", appIcon: "assets/coffee-art/latte.svg",
    storageKey: "mola-coffee-v1", startPage: "home", componentPath: "comp/",
    tabs: [
        { pageId: "home", text: "Keşfet", iconFile: "assets/tabs/home.svg" },
        { pageId: "menu", text: "Menü", iconFile: "assets/tabs/menu.svg" },
        { pageId: "cart", text: "Sepet", iconFile: "assets/tabs/cart.svg" },
        { pageId: "rewards", text: "Mola Club", iconFile: "assets/tabs/rewards.svg" },
    ],
    menu: [],
    headingFont: "gelasio, Georgia, serif", // assets/fonts/gelasio.ttf: as wide as Georgia, also on Android
    colors: {
        background: "#F6F2E9", surface: "#FFFDF8", text: "#243E35",
        softText: "#656B60", line: "#E5E2D8", danger: "#B54E36",
        accent: "#254F3D", accentPressed: "#1C3F30", accentSoft: "#365E49", accentLine: "#54735A",
        peach: "#EAD8BC", orange: "#96461F", white: "#FFFFFF",
        mint: "#DEE8DB", mintPressed: "#CEDCCA",
    },
};
