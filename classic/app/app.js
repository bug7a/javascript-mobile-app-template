/* Bismillah */

/*

Mobile App Template (default) - App - v26.11

THE FRAME OF THE APP, with the look and the small motions of bug7a/javascript-mobile-app-template.
A page file only says what is in its page (pages/*.js); this file shows it.

THE DESIGN: the app is drawn 600 px wide (page.fit(600, 800)): every size in this template is a px of that design.
On a phone the design fills the width; on a wider screen it is a column of at most 800 px.

THE DESIGN: the components made for screen px (Tabs, Dialog, Toast, Tooltip, SelectBox, DatePicker) keep their size
on the screen: basic.uiScale = 1 / page.zoom.

THE VIEWS:
- The tabs (the default view): a tab changes at once. The top bar (AppBar: title, ⋮) when the page asks for it; the
  bottom bar (BottomBar): the circle slides to the selected tab and takes its color, the name of the tab shows over
  it for a moment.
- The pages over the tabs (the second view): they slide in from the right (0.2 s). A header (PageHeader) with a
  small blue back link over a big title.
- The sheets (the small view): a panel rises from the bottom over a dark cover (0.2 s). (SidePanel)
- The side menu (⋮): from the right over a dark cover (SidePanel). The lock screen. A soft circle where the screen is
  tapped (TapEffect).

THE PAGES:
- App.addPage({ id, title, create: function (box, params) {} }): a page. Objects created in create() go into the
  page. box.after(), box.every() and box.listenTo() stop when the page closes. More keys:
  title: a text, or function (params) that returns one.
  scroll: 1 (default): the page scrolls; 0: the page fills its place (Ex: a list that scrolls itself).
  color: the background of the page (default: colors.background). padding, gap: of the column of the page.
  A tab: topBar (1: the top bar), titleAlign ("center" / "left"), topBarLine, bottomBarLine (1: a thin line).
  A page over the tabs: backText (default "Back"), header (0: no header), headerColor, backIcon, backColor.
  view: "default": the page opens in the place of the tab, with a back arrow in the top bar (no bottom bar).
- App.open(pageId, params): a tab is shown as a tab; another page slides in over the tabs.
- App.goBack(): closes the list, the dialog, the sheet, the menu or the page on top. The back button of Android (it
  leaves the app when nothing is open), the back of the browser and Escape call it too.

MORE:
- App.refreshTab(): makes the tab under the pages again (after a page over it changed its data).
- App.openSheet({ height, color, content: function (box, sheet) {} }): a sheet from the bottom. Returns it.
- App.wait(task): the waiting screen while a task (a Promise, or a function that returns one) works.
- App.save(name, value), App.load(name, defaultValue): the saved data of the app (in this browser / device).
- App.setTabBadge(pageId, count): the number on a tab.
- App.lock(): the lock screen (the page "lock") over everything; App.unlock() takes it away.
- App.setMenuSide(side): the side menu opens from "right", "left" or "bottom" (saved).
- App.whenStarted(func): func runs when the app is ready.
- App.colors: the colors of AppSettings.colors.

Started Date: November 2026 (the frame of starter, the look of bug7a/javascript-mobile-app-template)
Webpage: https://bug7a.github.io/js-components/

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com> (https://bug7a.github.io/)
Licensed under the Apache License, Version 2.0
SPDX-License-Identifier: Apache-2.0

*/

"use strict";

const App = {};
window.App = App; // WHY: A "const" is not a property of window; an HTML page in a WebView calls window.parent.App.

// *** CONSTANTS (px of the 600 px design):
App.DESIGN_WIDTH = 600;
App.MAX_ZOOM_WIDTH = 600; // A wider screen shows the app 800 px wide, in the middle
App.TOP_BAR_HEIGHT = 105;
App.BOTTOM_BAR_HEIGHT = 80;
App.BAR_SPACE = 20; // The space at the sides of the bars and the headers
App.TITLE_SIZE = 28;
App.PAGE_MOTION = "transform 0.2s"; // A page over the tabs slides in from the right
App.PAGE_MOTION_TIME = 250; // ms: the start of the motion (withMotion: 50 ms) and the slide
App.PANEL_MOTION_TIME = 200; // ms: the side menu and the sheets
App.SHEET_HEIGHT = 500;
App.SHEET_ROUND = 13;
App.COVER_COLOR = Black(0.4);
App.SIDE_MENU_WIDTH = 450;
App.SIDE_MENU_HEIGHT = 760; // From the bottom (SidePanel keeps the top of the screen free on a small screen)
App.LAUNCH_MIN_TIME = 300; // ms
// WHY: The launch screen is made before the app, so it needs a layer to stay over it. (Dialog: 4000 and up)
App.LAUNCH_LAYER = 3001;

App.ICONS = {
    lock: "assets/icons/lock-small.png",
};

// *** VARIABLES:
App.colors = AppSettings.colors;
App.pages = {}; // id -> page
App.currentTabId = "";
App.tabView = null; // The view in the place of the tabs: a tab, or a page with view: "default"
App.openedViews = []; // The pages over the tabs (the last one is on top)
App.safeArea = { top: 0, bottom: 0 }; // The notch and the home line of a phone (design px)
App.startFunctions = []; // App.whenStarted()
App.hasHistoryEntry = 0; // 1: the entry of App.syncHistory() is in the history of the browser
App.skippedBackCount = 0; // The "popstate" events of the app's own history.back()
App.isSyncHistoryWaiting = 0;
App.lockView = null; // The lock screen (App.lock)

// *** PAGES:

App.addPage = function (appPage) {
    App.pages[appPage.id] = appPage;
};
// USAGE: App.addPage({ id: "home", title: "Home", create: function (box, params) { Label({ text: "Hi" }); } });

App.getPage = function (pageId) {
    const appPage = App.pages[pageId];
    if (!appPage) console.warn("App: no page with the id \"" + pageId + "\" (App.addPage)");
    return appPage;
};

App.getTabIndex = function (pageId) {
    return AppSettings.tabs.findIndex((tab) => tab.pageId == pageId);
};

App.isTab = function (pageId) {
    return App.getTabIndex(pageId) >= 0;
};

// A text of a page: a text, or function (params) that returns one
App.getText = function (textOrFunction, params) {
    return (typeof textOrFunction === "function") ? textOrFunction(params) : (textOrFunction || "");
};

App.open = function (pageId, params = {}) {
    if (App.isTab(pageId)) {
        App.closeAllPages();
        // WHY: The tab that is seen keeps its scroll and its typed text (App.refreshTab() makes it again).
        if (pageId == App.currentTabId && !App.isDefaultPageOpen()) return;
        App.showTab(pageId, params);
        return;
    }
    const appPage = App.getPage(pageId);
    if (!appPage) return;
    if (appPage.view == "default") {
        App.closeAllPages();
        App.showInDefaultView(appPage, params, "default");
        return;
    }
    App.openPage(pageId, params);
};
// USAGE: App.open("search"); App.open("my-documents"); App.open("category", item)

App.showTab = function (pageId, params = {}) {
    const appPage = App.getPage(pageId);
    if (!appPage) return;
    App.currentTabId = pageId;
    App.showInDefaultView(appPage, params, "tab");
    App.selectTab(pageId);
};

// The tab is made again with its data (Ex: a page over it changed the data the tab shows).
App.refreshTab = function () {
    if (App.isDefaultPageOpen()) return;
    App.showTab(App.currentTabId, App.tabView.params);
};

// kind: "tab", or "default" (a page in the place of the tab, with a back arrow and no bottom bar)
App.showInDefaultView = function (appPage, params, kind) {
    if (App.tabView) App.tabView.remove();
    App.tabView = createIn(App.tabLayer, () => App.createPageView(appPage, params, kind));
    App.paintBars(appPage, kind);
    App.syncHistory();
};

App.isDefaultPageOpen = function () {
    return !!App.tabView && App.tabView.kind == "default";
};

// A page over the tabs: it slides in from the right and has a back link.
App.openPage = function (pageId, params = {}) {
    const appPage = App.getPage(pageId);
    if (!appPage) return;
    const view = createIn(App.pageLayer, () => App.createPageView(appPage, params, "over"));
    App.openedViews.push(view);
    App.slideView(view, 1);
    App.syncHistory();
};

App.closePage = function () {
    const view = App.openedViews.pop();
    if (!view) return;
    App.slideView(view, 0);
    view.after(App.PAGE_MOTION_TIME, () => view.remove());
    App.syncHistory();
};

App.closeAllPages = function () {
    App.openedViews.forEach((view) => view.remove());
    App.openedViews = [];
    App.syncHistory();
};

// WHY only the page on top: a second tap while the page slides out closed the page under it too.
App.closePageOf = function (view) {
    if (App.openedViews[App.openedViews.length - 1] === view) App.closePage();
};

// The open list, the dialog, the sheet or the menu (one panel at a time: SidePanel.openedPanel), the page on top,
// or the page in the place of the tab
App.goBack = function () {
    if (App.lockView) return; // (only a log in opens the lock screen)
    if (FullScreenSelect.openedSelect) {
        FullScreenSelect.openedSelect.close();
        return;
    }
    // WHY: A Dialog is over everything: the back of Android or of the browser must not close the page under it.
    const topDialog = App.getTopDialog();
    if (topDialog) {
        if (basic.isOn(topDialog.closeOnEscape) && !topDialog.isBusy()) topDialog.close("escape");
        return;
    }
    if (SidePanel.openedPanel) {
        SidePanel.openedPanel.close();
        return;
    }
    if (App.openedViews.length > 0) {
        App.closePage();
        return;
    }
    if (App.isDefaultPageOpen()) App.showTab(App.currentTabId);
};

// WHY typeof: the template does not load comp/dialog.js; a page that loads it gets the right back.
App.getTopDialog = function () {
    return (typeof Dialog === "function") ? Dialog.getTop() : null;
};

// *** THE BACK OF THE BROWSER: while a page, a sheet or the menu is open, the history has one more entry, so the
//     back of the browser (a phone browser, an installed web app) calls App.goBack() and does not leave the app.

App.getOpenedCount = function () {
    const panelCount = SidePanel.openedPanel ? 1 : 0;
    const defaultPageCount = App.isDefaultPageOpen() ? 1 : 0;
    return App.openedViews.length + panelCount + defaultPageCount;
};

// WHY a moment later: one action may close one thing and open another (the menu closes, a page opens);
//     the history is changed once, for the result.
App.syncHistory = function () {
    if (App.isSyncHistoryWaiting) return;
    App.isSyncHistoryWaiting = 1;
    setTimeout(function () {
        App.isSyncHistoryWaiting = 0;
        const isOpened = App.getOpenedCount() > 0;
        if (isOpened && !App.hasHistoryEntry) {
            history.pushState({ app: AppSettings.storageKey }, "");
            App.hasHistoryEntry = 1;
            return;
        }
        if (!isOpened && App.hasHistoryEntry) {
            App.hasHistoryEntry = 0;
            App.skippedBackCount++;
            history.back();
        }
    }, 0);
};

App.onHistoryBack = function () {
    App.hasHistoryEntry = 0;
    if (App.skippedBackCount > 0) {
        App.skippedBackCount--;
        App.syncHistory(); // WHY: something may have been opened while the entry was going
        return;
    }
    App.goBack();
    App.syncHistory(); // WHY: the entry is gone even when nothing closed (a dialog that can not close)
};

// The back button of Android: at the first level (nothing open) it leaves the app, as the other apps do.
App.onDeviceBack = function () {
    if (App.getOpenedCount() > 0 || App.getTopDialog() || App.lockView) {
        App.goBack();
        return;
    }
    if (window.navigator.app && window.navigator.app.exitApp) window.navigator.app.exitApp(); // Cordova
    const capacitorApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (capacitorApp && capacitorApp.exitApp) capacitorApp.exitApp(); // Capacitor (@capacitor/app)
};

// *** THE VIEW OF A PAGE: kind "tab" / "default" (in the place of the tabs) or "over" (over the tabs)

// WHY appPage: "page" is the main box of basic.js.
App.createPageView = function (appPage, params, kind) {

    const spaces = App.getBodySpaces(appPage, kind);
    const bodyHeight = "calc(100% - " + (spaces.top + spaces.bottom) + "px)";

    // BOX: The page
    const view = startBox(0, 0, "100%", "100%", { color: appPage.color || App.colors.background });
    view.appPage = appPage;
    view.params = params;
    view.kind = kind;

        if (kind == "over" && appPage.header !== 0) App.createPageHeader(view);

        // BOX: The body (under the bar or the header, over the bottom bar)
        view.body = startBox(0, spaces.top, "100%", bodyHeight, { color: "transparent" });
        if (appPage.scroll !== 0) view.body.scrollY = 1;
            App.createPageContent(appPage, params);
        endBox();

    endBox();

    if (appPage.scroll !== 0 && typeof ScrollBar !== "undefined") ScrollBar({ scrollableBox: view.body });

    return view;

};

// The space of the bars over and under the body of a page
App.getBodySpaces = function (appPage, kind) {
    if (kind == "over") {
        const headerHeight = (appPage.header === 0) ? 0 : App.TOP_BAR_HEIGHT;
        return { top: headerHeight, bottom: 0 };
    }
    const isDefaultPage = (kind == "default");
    const isTopBarShown = isDefaultPage || basic.isOn(appPage.topBar);
    return {
        top: isTopBarShown ? App.TOP_BAR_HEIGHT : 0,
        bottom: isDefaultPage ? 0 : App.BOTTOM_BAR_HEIGHT,
    };
};

App.createPageContent = function (appPage, params) {

    if (appPage.scroll === 0) {
        // GROUP: The whole body (a group: its objects need no left / top)
        const fullGroup = VGroup({ align: "left top" });
            appPage.create(fullGroup, params);
        endGroup();
        return;
    }

    // GROUP: The column of the page (it grows with its content and scrolls in the body)
    const column = VGroup({
        width: "100%",
        height: "auto",
        align: "left top",
        gap: appPage.gap ?? 0,
        padding: appPage.padding ?? 0,
        clipContent: 0,
    });
        appPage.create(column, params);
    endGroup();

};

// The header of a page over the tabs: a small back link over a big title
App.createPageHeader = function (view) {
    const appPage = view.appPage;
    view.header = PageHeader({
        height: App.TOP_BAR_HEIGHT,
        titleText: App.getText(appPage.title, view.params),
        backText: App.getText(appPage.backText, view.params) || "Back",
        color: appPage.headerColor || "white",
        backColor: appPage.backColor || App.colors.blue,
        backIconFile: appPage.backIcon || "", // "": a chevron drawn in backColor
        onBack: () => App.closePageOf(view),
    });
};

App.isReducedMotion = function () {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// isIn: 1 slides the page in from the right, 0 slides it out
App.slideView = function (view, isIn) {

    const outTransform = "translateX(100%)";

    if (App.isReducedMotion()) {
        view.css = { transform: isIn ? "none" : outTransform };
        return;
    }

    view.css = { transform: outTransform };
    if (!isIn) return;
    view.setMotion(App.PAGE_MOTION);
    // WHY withMotion: setMotion() turns the motion on a moment later; the page waits outside until then.
    view.withMotion((self) => { self.css = { transform: "translateX(0)" }; });

};

// *** THE BARS: the top bar (tab pages that ask for it) and the bottom bar of the tabs

App.createTopBar = function () {
    // TOP BAR: The title, the back arrow (a page in the place of the tab) and ⋮ (the side menu)
    App.topBar = AppBar({
        height: App.TOP_BAR_HEIGHT,
        showMenu: (AppSettings.menu.length > 0) ? 1 : 0,
        onBack: App.goBack,
        onMenu: () => App.menu.open(),
    });
    App.topBar.visible = 0;
};

// The bars for a page: kind "tab" or "default"
App.paintBars = function (appPage, kind) {
    const isDefaultPage = (kind == "default");
    const isTopBarShown = isDefaultPage || basic.isOn(appPage.topBar);
    App.topBar.visible = isTopBarShown ? 1 : 0;
    App.bottomBar.visible = isDefaultPage ? 0 : 1;
    App.setLine(App.bottomBar, "Top", appPage.bottomBarLine);
    if (isTopBarShown) App.paintTopBar(appPage, isDefaultPage);
};

App.paintTopBar = function (appPage, isDefaultPage) {
    const topBar = App.topBar;
    topBar.setTitleText(App.getText(appPage.title, App.tabView.params));
    topBar.setTitleAlign(appPage.titleAlign);
    topBar.setBackVisible(isDefaultPage);
    topBar.setLine(appPage.topBarLine);
};

// The thin line at a side of a bar (the line is always there: on, it gets its color)
App.setLine = function (bar, side, isOn) {
    bar.css = { ["border" + side + "Color"]: basic.isOn(isOn) ? App.colors.line : "transparent" };
};

App.createBottomBar = function () {

    const ICON_SIZE = 40;
    const ICON_SPACE = 40; // WHY: an icon and its space make the 80 px place of a tab
    const BAR_PADDING = 20;
    const CIRCLE_PADDING = 14; // The circle around the selected icon (68 px, in the 80 px bar)
    const NAME_SPACE = 19; // Between the circle and the name over it

    // BOTTOM BAR: The tabs. The circle of the selected tab takes the color of the tab; its name shows over it for a
    // moment (labelMode "float").
    App.bottomBar = BottomBar({
        left: 0,
        bottom: 0,
        width: "100%",
        height: App.BOTTOM_BAR_HEIGHT,
        hoverEffect: false,
        labelMode: "float",
        items: AppSettings.tabs.map((tab) => ({ iconFile: tab.iconFile, selectedIconFile: tab.selectedIconFile, text: tab.text, color: tab.color })),
        onItemClick: (self, item, index) => App.open(AppSettings.tabs[index].pageId),
        // The number on a tab (App.setTabBadge): indianred with a white ring, 0 and 1 too
        badge: {
            showZero: 1,
            dotForOne: 0,
            style: { color: App.colors.red, border: 3, borderColor: "white", textColor: "white" },
            numberStyle: { fontSize: 14, bold: 1, padding: [8, 3], round: 20, top: -10, right: -14 },
        },
        style: {
            // WHY gradient: it is the CSS background of the bar box, written over its color
            container: { color: "white", gradient: "white", border: 0 },
            background: { gradient: "none", round: 0, border: 0 },
            layout: { barHeight: App.BOTTOM_BAR_HEIGHT, iconBoxSize: ICON_SIZE, padding: BAR_PADDING, itemSpacing: ICON_SPACE, iconGap: 0, selectionPadding: CIRCLE_PADDING },
            icon: { width: ICON_SIZE, height: ICON_SIZE },
            selectedBox: { color: App.colors.dark, border: 0, round: 100, height: ICON_SIZE + CIRCLE_PADDING * 2 },
            floatLabel: { space: NAME_SPACE, css: { textTransform: "uppercase" } },
        },
    });
    App.bottomBar.css = { borderTop: "2px solid transparent" };

};

// The selected icon is white in a circle of the color of its tab
App.selectTab = function (pageId) {
    App.bottomBar.selectByIndex(App.getTabIndex(pageId));
};

App.setTabBadge = function (pageId, count) {
    const index = App.getTabIndex(pageId);
    if (index < 0) return;
    App.bottomBar.setBadge(index, count);
};

// *** THE SIDE MENU AND THE SHEETS (SidePanel): in the app column, over a dark cover, 0.2 s

// look: { panel: {...} } of SidePanel. Its Escape and the back of the browser go to App.goBack().
App.createPanel = function (params, look = {}) {
    return SidePanel({
        container: App.frame,
        showHeader: 0,
        fade: 0, // It only slides
        closeOnEscape: 0, // WHY: Escape goes to App.goBack(): one thing closes at a time
        duration: App.PANEL_MOTION_TIME,
        onOpen: App.syncHistory,
        onClose: App.syncHistory,
        style: {
            // round: the corners that face the page
            panel: Object.assign({ color: "white", border: 0, boxShadow: "none", round: App.SHEET_ROUND }, look.panel),
            backdrop: { color: App.COVER_COLOR },
            body: { padding: [0, 0], gap: 0 },
        },
        ...params,
    });
};

// The side of the menu: "right", "left" or "bottom" (Settings > Menu Style saves it)
App.getMenuSide = function () {
    return App.load("settings", {}).menuSide || AppSettings.menuSide;
};

App.setMenuSide = function (side) {
    const settings = App.load("settings", {});
    settings.menuSide = side;
    App.save("settings", settings);
    App.menu.remove();
    App.createMenu();
};
// USAGE: App.setMenuSide("left")

// The side menu: the title, the items of AppSettings.menu (an icon, a title, a count) and the lock button
App.createMenu = function () {

    const side = App.getMenuSide();
    const TITLE_SPACE = "46px 0 18px 40px"; // top, right, bottom, left

    App.menu = App.createPanel({
        side: side,
        panelSize: (side == "bottom") ? App.SIDE_MENU_HEIGHT : App.SIDE_MENU_WIDTH,
        ariaLabel: "Menu",
    }, { panel: { color: App.colors.whitesmoke } });

    App.menu.startBody();

        // LABEL: Title
        Label({ text: AppSettings.menuTitle, fontSize: App.TITLE_SIZE, bold: 1, textColor: App.colors.text, css: { margin: TITLE_SPACE } });

        // LIST: The items of the menu (the selected one is white)
        App.menuList = ItemList({
            width: "100%",
            height: "auto",
            items: AppSettings.menu.map((item, index) => ({ key: String(index), text: item.text, menuItem: item })),
            selectedKeys: ["0"],
            styleName: "ozden",
            style: {
                box: { border: 0, padding: [4, 0] },
                row: { height: 54, padding: [36, 0], gap: 10, color: "transparent", border: 1, borderColor: "transparent", round: 4 },
                hover: { color: Black(0.06), lineColor: "" }, // WHY: "": no lines above and under the row (ozden has them).
                selected: { color: "white", borderColor: Black(0.2), opacity: 1, canSelectAgain: 1 }, // WHY: 1: the page of the menu opens again (and the menu closes)
            },
            createItemView: App.createMenuRow,
            onItemClick: function (self, item) {
                App.menu.close();
                App.open(item.menuItem.pageId, item.menuItem);
            },
        });

    App.menu.endBody();

    if (basic.isOn(AppSettings.showLockButton)) createIn(App.menu, App.createLockButton);

};

// A row of the menu: the icon, the title and the count (the objects made here go into the row)
App.createMenuRow = function (item) {
    const menuItem = item.menuItem;
    const ICON_SIZE = 30;

    if (menuItem.iconFile) {
        Icon({ width: ICON_SIZE, height: ICON_SIZE });
        that.load(menuItem.iconFile);
        that.css = { filter: "grayscale(50%)" };
    }
    Label({ text: menuItem.text, fontSize: 26, textColor: App.colors.text, grow: 1 });
    if (menuItem.count !== undefined) {
        Label({ text: String(menuItem.count), fontSize: 20, padding: [14, 6], round: 13, color: Black(0.05), textColor: App.colors.text, css: { marginRight: "26px" } });
    }
};

// The lock button at the bottom right of the menu (it opens the lock screen)
App.createLockButton = function () {
    const BUTTON_SIZE = 50;
    const BUTTON_SPACE = 30;
    SmartButton({
        styleName: "ozden4",
        labelText: "",
        iconFile: App.ICONS.lock,
        ariaLabel: "Lock",
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        right: BUTTON_SPACE,
        bottom: BUTTON_SPACE,
        position: "absolute",
        style: {
            layout: { padding: [13, 13] },
            icon: { width: 24, height: 24, opacity: 0.9 },
            box: { color: "white", border: 1, borderColor: Black(0.6), round: 4, boxShadow: "none" },
            hover: { color: "white" },
        },
        onClick: App.lock,
    });
};

// A sheet from the bottom: content(box, sheet) creates its objects. Returns the sheet (sheet.close()).
App.openSheet = function (params = {}) {

    const sheet = App.createPanel({
        side: "bottom",
        panelSize: params.height || App.SHEET_HEIGHT,
        ariaLabel: params.ariaLabel || "Panel",
        onClose: function (self) {
            App.syncHistory();
            if (params.onClose) params.onClose(self);
            self.after(self.duration, () => self.remove());
        },
    }, { panel: { color: params.color || "white" } });

    sheet.startBody();
        if (params.content) params.content(sheet.getBody(), sheet);
    sheet.endBody();

    sheet.open();
    return sheet;

};
// USAGE: App.openSheet({ height: 240, content: function (box, sheet) { Label({ text: "Hi" }); } })

// *** THE LOCK SCREEN: the page "lock" (pages/lock.js) over everything; the back keys do not close it.

App.lock = function () {
    if (App.lockView) return;
    const lockPage = App.getPage("lock");
    if (!lockPage) return;
    if (SidePanel.openedPanel) SidePanel.openedPanel.close();
    App.lockView = createIn(App.frame, function () {
        const view = VGroup({ align: "center center", color: App.colors.whitesmoke, clickable: 1 });
            lockPage.create(view, {});
        endGroup();
        return view;
    });
};

App.unlock = function () {
    if (!App.lockView) return;
    App.lockView.remove();
    App.lockView = null;
};

// *** WAITING, SAVED DATA:

// task: a Promise, or a function that returns one. Returns the result of the task.
App.wait = async function (task) {
    App.waitingScreen.open();
    try {
        const promise = (typeof task === "function") ? task() : task;
        return await promise;
    } finally {
        App.waitingScreen.close();
    }
};
// USAGE: const data = await App.wait(fetch(url).then((response) => response.json()));

App.save = function (name, value) {
    basic.storage.save(AppSettings.storageKey + "-" + name, value);
};

App.load = function (name, defaultValue) {
    return basic.storage.loadOr(AppSettings.storageKey + "-" + name, defaultValue);
};
// USAGE: App.save("tasks", list); const list = App.load("tasks", []);

// *** THE DEVICE:

// The notch and the home line of a phone, in design px (0 in a browser on a computer)
App.readSafeArea = function () {
    const probe = Box(0, 0, 0, 0, { color: "transparent" });
    probe.css = { paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" };
    const style = getComputedStyle(probe.elem);
    App.safeArea.top = withPageZoom(parseFloat(style.paddingTop) || 0);
    App.safeArea.bottom = withPageZoom(parseFloat(style.paddingBottom) || 0);
    probe.remove();
};

// Cordova calls the app after "deviceready"; Capacitor and a browser can start at once.
App.whenDeviceReady = function (func) {
    if (window.cordova) {
        document.addEventListener("deviceready", func, false);
        return;
    }
    func();
};

// The back button of Android, the back of the browser and Escape; a soft circle where the screen is tapped
App.listenDevice = function () {
    document.addEventListener("backbutton", App.onDeviceBack, false); // Cordova
    const capacitorApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (capacitorApp) capacitorApp.addListener("backButton", App.onDeviceBack); // Capacitor (@capacitor/app)
    window.addEventListener("popstate", App.onHistoryBack);
    // (A Dialog, a list and a popover take their own Escape first: it does not come here.)
    window.addEventListener("keydown", function (event) {
        if (event.key == "Escape" && !event.defaultPrevented) App.goBack();
    });
    TapEffect.start();
};

// *** THE APP COLUMN: 600 design px, in the middle of a wide screen, under the notch

App.fitPage = function () {
    page.fit(App.DESIGN_WIDTH, App.MAX_ZOOM_WIDTH);
    // WHY: The components made for screen px take it as their scale: they keep their size on the screen.
    basic.uiScale = 1 / page.zoom;
};

App.refreshFrame = function () {
    App.fitPage();
    App.readSafeArea();
    App.frame.left = Math.max(0, (page.width - App.DESIGN_WIDTH) / 2);
    App.frame.top = App.safeArea.top;
    App.frame.height = page.height - App.safeArea.top - App.safeArea.bottom;
    App.statusBar.left = App.frame.left;
    App.statusBar.height = App.safeArea.top;
};

// *** START:

// A page file can run something when the app is ready (Ex: the badge of a tab).
App.whenStarted = function (func) {
    App.startFunctions.push(func);
};
// USAGE: App.whenStarted(TaskList.refreshBadge);

App.start = function () {

    page.color = App.colors.outside;

    // BOX: The strip over the app under the notch of a phone
    App.statusBar = Box(0, 0, App.DESIGN_WIDTH, 0, { color: Black(0.05) });

    // BOX: The app column (the safe area)
    App.frame = Box(0, 0, App.DESIGN_WIDTH, 100, { color: App.colors.background });

    createIn(App.frame, function () {

        // LAYER: The tabs (under the bars)
        App.tabLayer = Box(0, 0, "100%", "100%", { color: "transparent" });

        App.createTopBar();
        App.createBottomBar();

        // LAYER: The pages over the tabs (App.openPage)
        App.pageLayer = Box(0, 0, "100%", "100%", { color: "transparent" });

        // WAITING: App.wait() (over the pages)
        App.waitingScreen = LoadingScreen({
            opened: 0,
            minDuration: 300,
            fadeDuration: 0.2,
            style: { box: { color: App.COVER_COLOR } },
        });

    });

    App.refreshFrame();
    App.frame.onPageResize(App.refreshFrame);

    App.createMenu();
    App.listenDevice();
    App.showTab(AppSettings.startPage);
    App.startFunctions.forEach((func) => func());

};

// basic.js calls start() when the page is loaded.
const start = function () {

    App.fitPage();

    // LAUNCH SCREEN: whitesmoke with the logo, until the app is ready (it fades out)
    const LOGO_SIZE = 50;
    const launchScreen = LoadingScreen({
        iconFile: AppSettings.appIcon,
        spinnerType: "none",
        minDuration: App.LAUNCH_MIN_TIME,
        fadeDuration: 0.2,
        removeOnClose: 1,
        zIndex: App.LAUNCH_LAYER,
        style: { box: { color: AppSettings.colors.whitesmoke }, icon: { size: LOGO_SIZE, round: 0, marginBottom: 0 } },
    });

    App.whenDeviceReady(function () {
        createIn(page, App.start);
        launchScreen.close();
    });

};
