/* Bismillah */

/*

Mobile App Template (default) - Settings - v26.11

THE SETTINGS OF THE APP: change these first.
- The tabs of the bottom bar, the items of the side menu, the colors and the name of the app.
- A page is a file in pages/ (App.addPage). Its id is used here.
- The sizes of the template are px of a 600 px design (the app is fitted to the screen: page.fit(600, 800)).

Started Date: November 2026 (the look of bug7a/javascript-mobile-app-template)
Webpage: https://bug7a.github.io/js-components/

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com> (https://bug7a.github.io/)
Licensed under the Apache License, Version 2.0
SPDX-License-Identifier: Apache-2.0

*/

"use strict";

const AppSettings = {

    appName: "My App",
    appIcon: "assets/icons/logo.png", // The launch screen. "": no icon
    storageKey: "my-app-default", // The saved data of the app starts with this (App.save / App.load)
    startPage: "home", // The first page (a tab)

    // WHY: The components load their icons from their own folder. A copy made with _make-standalone.sh
    //      has its components in "comp/": change this line to "comp/" there.
    componentPath: "comp/",

    // The tabs of the bottom bar: iconFile, and selectedIconFile (white) for the selected tab.
    // text: its name over the bar for a moment (in capitals). color: the circle behind it ("": colors.dark)
    tabs: [
        { pageId: "home", text: "Home", iconFile: "assets/tabs/home.png", selectedIconFile: "assets/tabs/homes.png", color: "#5ABB9F" },
        { pageId: "search", text: "Search", iconFile: "assets/tabs/search.png", selectedIconFile: "assets/tabs/searchs.png", color: "" },
        { pageId: "examples", text: "Usage Examples", iconFile: "assets/tabs/grid.png", selectedIconFile: "assets/tabs/grids.png", color: "indianred" },
        { pageId: "tasks", text: "Tasks", iconFile: "assets/tabs/tasks.png", selectedIconFile: "assets/tabs/taskss.png", color: "" },
        { pageId: "settings", text: "Settings", iconFile: "assets/tabs/settings.png", selectedIconFile: "assets/tabs/settingss.png", color: "" },
    ],

    // The side menu (the ⋮ button of the top bar): { pageId, text, count, iconFile }. Each item opens its page with params.
    menuTitle: "CATEGORIES",
    menuSide: "right", // "right", "left" or "bottom" (the user can change it: Settings > Menu Style)
    menu: [
        { pageId: "category", text: "House", count: 12, iconFile: "assets/menu/t1.png" },
        { pageId: "category", text: "Bills", count: 1, iconFile: "assets/menu/t2.png" },
        { pageId: "category", text: "Shopping", count: 23, iconFile: "assets/menu/t3.png" },
        { pageId: "category", text: "Entertainment", count: 54, iconFile: "assets/menu/t4.png" },
        { pageId: "category", text: "Eating Out", count: 3, iconFile: "assets/menu/t5.png" },
        { pageId: "category", text: "Clothing", count: 15, iconFile: "assets/menu/t6.png" },
        { pageId: "category", text: "Health", count: 12, iconFile: "assets/menu/t7.png" },
        { pageId: "category", text: "Transport", count: 19, iconFile: "assets/menu/t8.png" },
        { pageId: "category", text: "Charities", count: 22, iconFile: "assets/menu/t9.png" },
        { pageId: "category", text: "Hobby", count: 5, iconFile: "assets/menu/t10.png" },
        { pageId: "category", text: "Others", count: 3, iconFile: "assets/menu/t11.png" },
    ],
    showLockButton: 1, // 1: a lock button in the menu opens the lock screen (App.lock)

    // The colors of the app. The pages take their colors from here (App.colors).
    colors: {
        background: "#FFFFFF", // The pages
        outside: "#FFFFFF", // Around the app on a wide screen
        whitesmoke: "#F5F5F5", // The launch screen, the side menu, the bands of the settings
        text: Black(0.8),
        softText: Black(0.5),
        line: Black(0.1),
        dark: "#141414", // The circle of a selected tab without its own color
        green: "#5ABB9F",
        blue: "#689BD2",
        red: "indianred",
        toggle: "#3871E0", // A switch that is on
        danger: "#FE5D49",
        yellow: "#FFD541",
    },

};
