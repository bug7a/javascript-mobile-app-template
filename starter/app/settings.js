/* Bismillah */

/*

Mobile App Template - Settings - v26.11

THE SETTINGS OF THE APP: change these first.
- The tabs of the bottom bar, the items of the side menu, the colors and the name of the app.
- A page is a file in pages/ (App.addPage). Its id is used here.

Started Date: November 2026
Webpage: https://bug7a.github.io/js-components/

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com> (https://bug7a.github.io/)
Licensed under the Apache License, Version 2.0
SPDX-License-Identifier: Apache-2.0

*/

"use strict";

const AppSettings = {

    appName: "My App",
    appIcon: "assets/app-icon.svg", // The launch screen and the side menu. "": no icon
    storageKey: "my-app", // The saved data of the app starts with this (App.save / App.load)
    startPage: "home", // The first page (a tab)

    // WHY: The components load their icons from their own folder. A copy made with _make-standalone.sh
    //      has its components in "comp/": change this line to "comp/" there.
    componentPath: "comp/",

    // The tabs of the bottom bar: iconFile, and selectedIconFile for the selected tab ("": the same icon).
    tabs: [
        { pageId: "home", text: "Home", iconFile: "assets/tabs/home.png", selectedIconFile: "assets/tabs/homes.png" },
        { pageId: "products", text: "Products", iconFile: "assets/tabs/grid.png", selectedIconFile: "assets/tabs/grids.png" },
        { pageId: "tasks", text: "Tasks", iconFile: "assets/tabs/tasks.png", selectedIconFile: "assets/tabs/taskss.png" },
        { pageId: "settings", text: "Settings", iconFile: "assets/tabs/settings.png", selectedIconFile: "assets/tabs/settingss.png" },
    ],

    // The side menu (the button at the top left of a tab page): { pageId, text, description, iconFile }. A tab page opens
    // as a tab, others over it.
    menu: [
        { pageId: "home", text: "Home", description: "The first tab" },
        { pageId: "about", text: "About", description: "An HTML page in the app" },
        { pageId: "website", text: "Website", description: "A web page from the internet" },
    ],

    // The colors of the app. The pages take their colors from here (App.colors).
    colors: {
        background: "#F3F3F0", // The page
        surface: "#FFFFFF", // Cards, the header
        text: "#2B2B2A",
        softText: Black(0.5),
        line: Black(0.08),
        accent: "#2F8A91", // The selected tab, links, small marks
        danger: "#E8796D",
    },

};
