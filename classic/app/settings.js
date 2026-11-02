/* Bismillah */

/*

Mobile App Template (default) - Settings - v26.11

THE SETTINGS OF THE APP: change these first.
- The tabs of the bottom bar, the items of the side menu, the colors and the name of the app.
- A page is a file in pages/ (App.addPage). Its id is used here.
- The sizes of the template are px of a 600 px design (the app is fitted to the screen: page.fit(600, 800)).

Started Date: November 2026 (the look of bug7a/javascript-mobile-app-template)
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Webpage: https://bug7a.github.io/js-components/

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

    // The tabs of the bottom bar. Each tab needs two icons: "home.png" and "homes.png" (selected, white).
    // text: its name over the bar for a moment (in capitals). color: the circle behind it ("": colors.dark)
    tabs: [
        { pageId: "home", text: "Home", icon: "assets/tabs/home.png", color: "#5ABB9F" },
        { pageId: "search", text: "Search", icon: "assets/tabs/search.png", color: "" },
        { pageId: "examples", text: "Usage Examples", icon: "assets/tabs/grid.png", color: "indianred" },
        { pageId: "tasks", text: "Tasks", icon: "assets/tabs/tasks.png", color: "" },
        { pageId: "settings", text: "Settings", icon: "assets/tabs/settings.png", color: "" },
    ],

    // The side menu (the ⋮ button of the top bar). Each item opens its page with params.
    menuTitle: "CATEGORIES",
    menuSide: "right", // "right", "left" or "bottom" (the user can change it: Settings > Menu Style)
    menu: [
        { pageId: "category", title: "House", count: 12, iconFile: "assets/menu/t1.png" },
        { pageId: "category", title: "Bills", count: 1, iconFile: "assets/menu/t2.png" },
        { pageId: "category", title: "Shopping", count: 23, iconFile: "assets/menu/t3.png" },
        { pageId: "category", title: "Entertainment", count: 54, iconFile: "assets/menu/t4.png" },
        { pageId: "category", title: "Eating Out", count: 3, iconFile: "assets/menu/t5.png" },
        { pageId: "category", title: "Clothing", count: 15, iconFile: "assets/menu/t6.png" },
        { pageId: "category", title: "Health", count: 12, iconFile: "assets/menu/t7.png" },
        { pageId: "category", title: "Transport", count: 19, iconFile: "assets/menu/t8.png" },
        { pageId: "category", title: "Charities", count: 22, iconFile: "assets/menu/t9.png" },
        { pageId: "category", title: "Hobby", count: 5, iconFile: "assets/menu/t10.png" },
        { pageId: "category", title: "Others", count: 3, iconFile: "assets/menu/t11.png" },
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
