/* Bismillah */

/*

Mobile App Template - App - v26.11

THE FRAME OF THE APP: the tabs, the pages, the header, the side menu, the sheets and the waiting screen.
A page file only says what is in its page (pages/*.js); this file shows it.

THE DESIGN: the app is drawn 390 px wide and fitted to the screen (page.fit(390, 480)): every size in this template is
a px of that design, so a smaller phone shows the same layout a little smaller, with the same lines of text. On a
screen wider than 480 px it is a column of 480 px in the middle.

THE PAGES:
- App.addPage({ id, title, scroll, color, headerContent, create: function (box, params) {} }): a page. Objects created
  in create() go into the page. box.after(), box.every() and box.listenTo() stop when the page closes.
  title: a text, or function (params) that returns one (Ex: the name of the opened item).
  scroll: 1 (default): a column that scrolls, as wide as the phone (at most CONTENT_MAX_WIDTH);
  scroll: 0: the page fills its place (Ex: a list that scrolls itself).
  color: the background of the page ("": colors.background). padding, gap: of the scrolling column (Ex: padding: 0 for
  rows from edge to edge).
  headerContent: function (params, view) {}: objects at the right of the title (Ex: a small search box;
  view.lblTitle is the title).
- App.open(pageId, params): a tab is shown as a tab; another page opens over the tabs with a back button.
- App.goBack(): closes the dialog, the sheet, the menu or the page on top. The back button of Android (it leaves the
  app when nothing is open), the back of the browser
  and Escape call it too.

MORE:
- App.refreshTab(): makes the tab under the pages again (after a page over it changed its data).
- App.openSheet({ titleText, height, content: function (box) {} }): a panel from the bottom.
- App.wait(task): the waiting screen while a task (a Promise, or a function that returns one) works.
- App.save(name, value), App.load(name, defaultValue): the saved data of the app (in this browser / device).
- App.setTabBadge(pageId, count): the number on a tab.
- App.whenStarted(func): func runs when the app is ready.
- App.startCard() ... App.endCard(): a white card in a page; App.createCaption(text): a small title over it.
- App.createButton({ labelText, onClick, styleName }): a SmartButton as wide as its card.
- App.colors: the colors of AppSettings.colors.
- App.makeIcon(App.ICON_PATHS.trash, color): a simple line icon (an SVG data URI) for Icon / SmartButton.

Started Date: November 2026 (the new version of bug7a/web2app)
Webpage: https://bug7a.github.io/js-components/

Copyright 2020-2026 Bugra Ozden <bugra.ozden@gmail.com> (https://bug7a.github.io/)
Licensed under the Apache License, Version 2.0
SPDX-License-Identifier: Apache-2.0

*/

"use strict";

const App = {};
window.App = App; // WHY: A "const" is not a property of window; an HTML page in a WebView calls window.parent.App.

// *** CONSTANTS:
App.HEADER_HEIGHT = 56;
App.TAB_BAR_HEIGHT = 84;
App.TAB_LABEL_SIZE = 14;
App.DESIGN_WIDTH = 390; // Every size of the app is a px of this width
App.MAX_ZOOM_WIDTH = 480; // px on the screen: the design stops growing here
App.CONTENT_MAX_WIDTH = App.DESIGN_WIDTH;
App.OUTSIDE_COLOR = "#DCDDD3"; // Around the app on a wide screen
App.CONTENT_PADDING = [20, 20];
App.CONTENT_GAP = 16;
App.BUTTON_HEIGHT = 48;
App.TOAST_SPACE = 8; // Between the header and a toast
App.PAGE_MOTION_TIME = 250; // ms: a page slides in from the right and goes back
App.PAGE_MOTION_CURVE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
App.LAUNCH_MIN_TIME = 400; // ms: the launch screen does not flash on a fast start
// WHY: The launch screen is made before the app, so it needs a layer to stay over it. (Dialog: 4000 and up)
App.LAUNCH_LAYER = 3001;

// Simple line icons (24 x 24). App.makeIcon(App.ICON_PATHS.menu, color)
App.ICON_PATHS = {
    menu: "M4 7h16M4 12h16M4 17h16",
    back: "M15 5l-7 7 7 7",
    next: "M9 5l7 7-7 7",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    check: "M5 12.5l4.5 4.5L19 7.5",
    trash: "M4 7h16M10 11v6M14 11v6M9 7V4h6v3M6 7l1 13h10l1-13",
};

// *** VARIABLES:
App.colors = AppSettings.colors;
App.pages = {}; // id -> page
App.currentTabId = "";
App.tabView = null; // The view of the tab that is seen
App.openedViews = []; // The pages over the tabs (the last one is on top)
App.safeArea = { top: 0, bottom: 0 }; // The notch and the home line of a phone (design px)
App.startFunctions = []; // App.whenStarted()
App.hasHistoryEntry = 0; // 1: the entry of App.syncHistory() is in the history of the browser
App.skippedBackCount = 0; // The "popstate" events of the app's own history.back()
App.isSyncHistoryWaiting = 0;

// *** PAGES:

App.addPage = function (appPage) {
    App.pages[appPage.id] = appPage;
};
// USAGE: App.addPage({ id: "home", title: "Home", create: function (box, params) { Label({ text: "Hi" }); } });

App.getTabIndex = function (pageId) {
    return AppSettings.tabs.findIndex((tab) => tab.pageId == pageId);
};

App.isTab = function (pageId) {
    return App.getTabIndex(pageId) >= 0;
};

App.open = function (pageId, params = {}) {
    if (!App.isTab(pageId)) {
        App.openPage(pageId, params);
        return;
    }
    App.closeAllPages();
    // WHY: The tab that is seen keeps its scroll and its typed text (App.refreshTab() makes it again).
    if (pageId == App.currentTabId) return;
    App.showTab(pageId, params);
};
// USAGE: App.open("product", { item: item })

App.showTab = function (pageId, params = {}) {
    const appPage = App.getPage(pageId);
    if (!appPage) return;

    if (App.tabView) App.tabView.remove();
    App.currentTabId = pageId;
    App.tabView = createIn(App.tabLayer, () => App.createPageView(appPage, params, 1));
    App.tabBar.selectByIndex(App.getTabIndex(pageId));
};

// The tab is made again with its data (Ex: a page over it changed the data the tab shows).
App.refreshTab = function () {
    const scrollTop = App.tabView.body.elem.scrollTop; // WHY: a + in a long cart must not jump to the top.
    App.showTab(App.currentTabId, App.tabView.params);
    App.tabView.body.elem.scrollTop = scrollTop;
};

// A page over the tabs: it slides in from the right and has a back button.
App.openPage = function (pageId, params = {}) {
    const appPage = App.getPage(pageId);
    if (!appPage) return;

    const view = createIn(App.pageLayer, () => App.createPageView(appPage, params, 0));
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

// The dialog, the sheet or the menu (only one panel is open at a time: SidePanel.openedPanel), or else the page on top
App.goBack = function () {
    // WHY: A Dialog is over everything: the back of Android or of the browser must not close the page under it.
    const topDialog = Dialog.getTop();
    if (topDialog) {
        if (basic.isOn(topDialog.closeOnEscape) && !topDialog.isBusy()) topDialog.close("escape");
        return;
    }
    if (SidePanel.openedPanel) {
        SidePanel.openedPanel.close();
        return;
    }
    App.closePage();
};

// *** THE BACK OF THE BROWSER: while a page, a sheet or the menu is open, the history has one more entry, so the
//     back of the browser (a phone browser, an installed web app) calls App.goBack() and does not leave the app.

App.getOpenedCount = function () {
    const panelCount = SidePanel.openedPanel ? 1 : 0;
    return App.openedViews.length + panelCount;
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
    App.syncHistory(); // WHY: the entry is gone even when nothing closed (a dialog that can not close, a closed dialog)
};

// The back button of Android: at the first level (nothing open) it leaves the app, as the other apps do.
App.onDeviceBack = function () {
    if (App.getOpenedCount() > 0 || Dialog.getTop()) {
        App.goBack();
        return;
    }
    if (window.navigator.app && window.navigator.app.exitApp) window.navigator.app.exitApp(); // Cordova
    const capacitorApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (capacitorApp && capacitorApp.exitApp) capacitorApp.exitApp(); // Capacitor (@capacitor/app)
};

App.getPage = function (pageId) {
    const appPage = App.pages[pageId];
    if (!appPage) console.warn("App: no page with the id \"" + pageId + "\" (App.addPage)");
    return appPage;
};

// *** THE VIEW OF A PAGE: a header and a body. isTab: 1 between the header and the tab bar, 0 over the tabs

// WHY appPage: "page" is the main box of basic.js.
App.createPageView = function (appPage, params, isTab) {

    // BOX: The page
    const view = startBox(0, 0, "100%", "100%", { color: appPage.color || App.colors.background });
    view.appPage = appPage;
    view.params = params;
    view.isTab = isTab;
    view.footerHeight = 0; // App.createFooter()

        App.createHeader(view, isTab);

        // BOX: The body (under the header)
        view.body = startBox(0, App.getHeaderHeight(), "100%", 100, { color: "transparent" });
        if (appPage.scroll !== 0) view.body.scrollY = 1;
            App.createPageContent(appPage, params, view);
        endBox();

    endBox();

    // WHY: The tab bar floats: the body goes on under it, unless a footer holds the end of the page over it.
    //     Its height follows the screen (a phone turned, the keyboard).
    const tabBarSpace = isTab ? App.TAB_BAR_HEIGHT : 0;
    const coveredSpace = view.footerHeight ? view.footerHeight + tabBarSpace : 0;
    const bottomSpace = App.safeArea.bottom + coveredSpace;
    const refreshLayout = function () {
        view.body.height = view.height - view.body.top - bottomSpace;
    };
    view.onResize(refreshLayout);
    refreshLayout();
    if (appPage.scroll !== 0 && typeof ScrollBar !== "undefined") ScrollBar({ scrollableBox: view.body });

    return view;

};

App.createPageContent = function (appPage, params, view) {

    if (appPage.scroll === 0) {
        // GROUP: The whole body (a group: its objects need no left / top)
        const fullGroup = VGroup({ align: "left top" });
            appPage.create(fullGroup, params, view);
        endGroup();
        return;
    }

    // GROUP: The column in the middle (as wide as a phone on a big screen)
    const padding = appPage.padding ?? App.CONTENT_PADDING;
    const gap = appPage.gap ?? App.CONTENT_GAP;
    VGroup({ width: "100%", height: "auto", align: "center top", padding: padding });

        const column = VGroup({ width: "100%", height: "auto", align: "left top", gap: gap, clipContent: 0 });
        column.css = { maxWidth: App.CONTENT_MAX_WIDTH + "px" };
            appPage.create(column, params, view);
            // WHY: The last card can be scrolled out from under the floating tab bar.
            if (view.isTab && !view.footerHeight) Box({ width: 1, height: App.TAB_BAR_HEIGHT, color: "transparent" });
        endGroup();

    endGroup();

};

App.getHeaderHeight = function () {
    return App.safeArea.top + App.HEADER_HEIGHT;
};

// The header: the menu button on a tab, the back button on a page over the tabs, the title, and the objects of the
// page at the right (headerContent).
App.createHeader = function (view, isTab) {

    const appPage = view.appPage;
    const titleText = (typeof appPage.title === "function") ? appPage.title(view.params) : appPage.title;

    // BOX: Header
    view.header = startBox(0, 0, "100%", App.getHeaderHeight(), { color: App.colors.surface });
    view.header.css = { borderBottom: "1px solid " + App.colors.line };

        // GROUP: The button and the title (under the notch)
        HGroup({ top: App.safeArea.top, height: App.HEADER_HEIGHT, align: "left center", gap: 4, padding: [8, 0] });

            if (!isTab) {
                // WHY only the page on top: a second tap while the page slides out closed the page under it too.
                view.btnBack = App.createIconButton(App.ICON_PATHS.back, "Back", function () {
                    if (App.openedViews[App.openedViews.length - 1] === view) App.closePage();
                });
            } else if (AppSettings.menu.length > 0) {
                view.btnMenu = App.createIconButton(App.ICON_PATHS.menu, "Menu", () => App.menu.open());
            }

            // LABEL: Title
            view.lblTitle = Label({
                text: titleText,
                fontSize: 19,
                bold: 1,
                textColor: App.colors.text,
                ellipsis: 1,
                grow: 1,
                shrink: 1,
                css: { minWidth: "0px" },
            });

            if (appPage.headerContent) appPage.headerContent(view.params, view);

        endGroup();

    endBox();

};

// A button as wide as its card (SmartButton: params.labelText, params.onClick, params.styleName...)
App.createButton = function (params = {}) {
    return SmartButton({
        width: "100%",
        height: App.BUTTON_HEIGHT,
        ...params,
    });
};
// USAGE: App.createButton({ labelText: "Save", tone: "cyan", onClick: save });

// A button with only an icon (the header, a row of a list)
App.createIconButton = function (iconPath, ariaLabel, onClick) {
    return SmartButton({
        styleName: "ozden4",
        labelText: "",
        iconFile: App.makeIcon(iconPath, App.colors.text),
        ariaLabel: ariaLabel,
        height: "auto", // WHY: as high as it is wide (10 + 24 + 10)
        style: { layout: { padding: [10, 10] } },
        onClick: onClick,
    });
};

App.makeIcon = function (iconPath, color) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' + color +
        '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + iconPath + '"/></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

App.isReducedMotion = function () {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// isIn: 1 slides the page in from the right, 0 slides it out
App.slideView = function (view, isIn) {

    const outTransform = "translateX(100%)";
    const inTransform = "translateX(0)";

    if (App.isReducedMotion()) {
        view.css = { transform: isIn ? inTransform : outTransform };
        return;
    }

    view.setMotion("transform " + App.PAGE_MOTION_TIME + "ms " + App.PAGE_MOTION_CURVE);
    view.css = { transform: outTransform };
    if (!isIn) return;
    // WHY: The browser has to draw the page outside first, or it does not slide.
    basic.nextFrame().then(() => { view.css = { transform: inTransform }; });

};

// The fixed end of a page, with its main action: it does not move when the content scrolls. The page calls it in
// its create(box, params, view); createContent makes the objects of the row. Returns the footer.
App.createFooter = function (view, height, createContent) {
    view.footerHeight = height;
    const tabBarSpace = view.isTab ? App.TAB_BAR_HEIGHT : 0;
    return createIn(view, function () {
        const footer = HGroup({
            left: 0,
            bottom: App.safeArea.bottom + tabBarSpace,
            width: "100%",
            height: height,
            padding: [20, 0],
            gap: 12,
            align: "left center",
            color: App.colors.background,
            clipContent: 0,
        });
        footer.css = { borderTop: "1px solid " + App.colors.line };
            createContent();
        endGroup();
        return footer;
    });
};

// *** CARDS: the parts of a page

// A white card: the objects created until App.endCard() go into it. Returns the card.
App.startCard = function (params = {}) {
    return VGroup({
        width: "100%",
        height: "auto",
        align: "left top",
        gap: 12,
        padding: [18, 18],
        color: App.colors.surface,
        round: 14,
        clipContent: 0,
        ...params,
    });
};

App.endCard = function () {
    endGroup();
};
// USAGE: App.startCard(); Label({ text: "Hi" }); App.endCard();

// A small title over a card
App.createCaption = function (text) {
    return Label({
        text: text,
        fontSize: 13,
        bold: 1,
        textColor: App.colors.softText,
        css: { letterSpacing: "0.4px", marginTop: "8px" },
    });
};

// A text that wraps in its card
App.createText = function (text, params = {}) {
    return Label({
        text: text,
        width: "100%",
        fontSize: 16,
        textColor: App.colors.text,
        ...params,
    });
};

// *** THE SIDE MENU AND THE SHEETS:

// A SidePanel of the app (on page, over everything; its Escape and the back of the browser go to App.goBack())
App.createPanel = function (params) {
    return createIn(page, () => SidePanel({
        closeOnEscape: 0, // WHY: Escape goes to App.goBack(): one thing closes at a time
        onOpen: App.syncHistory,
        onClose: App.syncHistory,
        ...params,
    }));
};

App.createMenu = function () {

    App.menu = App.createPanel({
        side: "left",
        panelSize: 300,
        titleText: AppSettings.appName,
        ariaLabel: "Menu",
    });

    App.menu.startBody();

        // LIST: The items of AppSettings.menu
        ItemList({
            width: "100%",
            height: "auto",
            items: AppSettings.menu.map((item) => ({ key: item.pageId, text: item.text, description: item.description, iconFile: item.iconFile })),
            selection: "none",
            styleName: "light",
            style: { box: { border: 0 } },
            onItemClick: function (self, item) {
                App.menu.close();
                App.open(item.key);
            },
        });

    App.menu.endBody();

};

// A panel from the bottom: content(box) creates its objects. Returns the panel (sheet.close()).
App.openSheet = function (params = {}) {

    const sheet = App.createPanel({
        side: "bottom",
        panelSize: params.height || 320,
        titleText: params.titleText || "",
        ariaLabel: params.titleText || "Panel",
        onClose: function (self) {
            App.syncHistory();
            self.after(self.duration, () => self.remove());
        },
    });

    sheet.startBody();
        if (params.content) params.content(sheet.getBody());
    sheet.endBody();

    sheet.open();
    return sheet;

};
// USAGE: App.openSheet({ titleText: "Share", height: 260, content: function (box) { Label({ text: "Hi" }); } })

// WHY: BottomBar has no size for its labels. A smaller text is centered in the bar again.
App.setTabLabelSize = function (size) {
    App.tabBar.itemObjList.forEach(function (item) {
        item.label.fontSize = size;
        item.label.center("top");
    });
};

// *** WAITING, SAVED DATA, BADGES:

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

App.setTabBadge = function (pageId, count) {
    const index = App.getTabIndex(pageId);
    if (index < 0) return;
    App.tabBar.setBadge(index, count);
};

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

// The back button of Android, the back of the browser and Escape close the sheet, the menu or the page on top.
App.listenBackKeys = function () {
    document.addEventListener("backbutton", App.onDeviceBack, false); // Cordova
    const capacitorApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (capacitorApp) capacitorApp.addListener("backButton", App.onDeviceBack); // Capacitor (@capacitor/app)
    window.addEventListener("popstate", App.onHistoryBack);
    // (A Dialog and a popover take their own Escape first: it does not come here.)
    window.addEventListener("keydown", function (event) {
        if (event.key == "Escape" && !event.defaultPrevented) App.goBack();
    });
};

// *** THE APP COLUMN: DESIGN_WIDTH design px, fitted to the screen, in the middle of a wide screen

App.fitPage = function () {
    page.fit(App.DESIGN_WIDTH, App.MAX_ZOOM_WIDTH);
    // WHY: The zoom is a scale of the body: at its full width, a design that grows would be wider than the window and
    //      the page could slide sideways.
    page.bodyElement.style.width = page.width + "px";
    page.bodyElement.style.height = page.height + "px";
    // WHY fixed: the browser counts the height of the body before its scale, so a design that shrinks left a page that
    //      a focused field could scroll. clip: a closed sheet waits outside the screen, nothing may scroll to it.
    page.bodyElement.style.position = "fixed";
    page.bodyElement.style.left = "0px";
    page.bodyElement.style.top = "0px";
    page.bodyElement.style.overflow = "clip";
    document.documentElement.style.overflow = "hidden";
};

App.refreshFrame = function () {
    App.fitPage();
    App.frame.left = Math.max(0, (page.width - App.DESIGN_WIDTH) / 2);
    App.frame.height = page.height;
};

// *** START:

// A page file can run something when the app is ready (Ex: the badge of a tab).
App.whenStarted = function (func) {
    App.startFunctions.push(func);
};
// USAGE: App.whenStarted(TaskList.refreshBadge);

App.start = function () {

    page.color = App.OUTSIDE_COLOR;
    App.readSafeArea();
    App.frame = Box(0, 0, App.DESIGN_WIDTH, "100%", { color: App.colors.background });
    App.refreshFrame();
    App.frame.onPageResize(App.refreshFrame);
    createIn(App.frame, function () {

    // LAYER: The tabs (under the tab bar)
    App.tabLayer = Box(0, 0, "100%", "100%", { color: "transparent" });

    // BOTTOM BAR: The tabs
    App.tabBar = BottomBar({
        bottom: App.safeArea.bottom,
        height: App.TAB_BAR_HEIGHT,
        items: AppSettings.tabs.map((tab) => ({ iconFile: tab.iconFile, text: tab.text })),
        badge: {
            dotForOne: 0,
            style: { color: App.colors.orange, textColor: App.colors.white },
            numberStyle: { fontSize: 11, bold: 1, round: 10, padding: [5, 1], top: -2, right: -4 },
        },
        onItemClick: function (self, item, index) {
            // WHY App.open: a tap on the tab that is seen keeps its scroll and its typed text.
            App.open(AppSettings.tabs[index].pageId);
        },
        style: {
            container: { color: "transparent", gradient: "linear-gradient(" + Alpha(App.colors.background, 0) + ", " + App.colors.background + " 70%)" },
            // WHY these sizes: with the defaults (icons of 40 px) the bar of "Mola Club" was wider than a phone.
            layout: { barHeight: 64, iconBoxSize: 40, padding: 18, itemSpacing: 10, iconGap: 4, selectionPadding: 8, labelEndSpace: 3 },
            icon: { width: 24, height: 24 },
            background: { gradient: "linear-gradient(" + App.colors.surface + ", " + App.colors.surface + ")" },
            label: { textColor: App.colors.accent },
            selectedBox: { color: Alpha(App.colors.accent, 0.1), border: 0, height: 46 },
        },
    });
    App.setTabLabelSize(App.TAB_LABEL_SIZE);
    App.tabBar.innerBox.css = { boxShadow: "0 6px 24px " + Black(0.1) };

    // LAYER: The pages over the tabs (App.openPage). The objects made after it (the menu, the waiting screen) stay over them.
    App.pageLayer = Box(0, 0, "100%", "100%", { color: "transparent" });

    App.createMenu();

    // WAITING: App.wait()
    App.waitingScreen = LoadingScreen({
        opened: 0,
        minDuration: 300,
        fadeDuration: 0.2,
        style: { box: { color: White(0.6) } },
    });

    // WHY: Under the header: over it, a toast covered the back button; at the bottom, the tab bar covered it.
    Toast.setOptions({ position: "top-center", offsetTop: App.getHeaderHeight() + App.TOAST_SPACE });

    App.listenBackKeys();
    App.showTab(AppSettings.startPage);
    App.startFunctions.forEach((func) => func());
    });

};

// basic.js calls start() when the page is loaded.
const start = function () {

    App.fitPage();

    // LAUNCH SCREEN: Until the first page is ready
    const launchScreen = LoadingScreen({
        iconFile: AppSettings.appIcon,
        titleText: AppSettings.appName,
        spinnerType: "none",
        minDuration: App.LAUNCH_MIN_TIME,
        removeOnClose: 1,
        zIndex: App.LAUNCH_LAYER,
        style: { box: { color: AppSettings.colors.background } },
    });

    App.whenDeviceReady(function () {
        createIn(page, App.start);
        launchScreen.close();
    });

};
