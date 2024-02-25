// This template was developed to show how to use basic.js

// VARIABLES:
const APP_ID = "app-id";

const USED_WIDTH = 600; // Examples: 550, 600, 700, "100%" (Dont use when page.fit is active)
// NOTE: If you want bigger objects use smaller USED_WIDTH:
const MAX_ZOOMABLE_WIDTH = 800;

let waitingView;

// First running function.
const prepareApp = function() {

    // Platforms: "web", "android", "ios"
    console.log("Platform: " + app.getPlatformId());

    // If more resolution is desired for large screen device:
    //USED_WIDTH = app.calculateResolution();

    // Supports all screen resolutions (Orientation: portrait)
    page.fit(USED_WIDTH, MAX_ZOOMABLE_WIDTH);

    // Show launch view.
    launchView.create();

    // Safearea outer spaces.
    app.getSafeAreaOuterSpaces(function() {

        // Ready to use: app.safeAreaInsetTop, app.safeAreaInsetBottom, app.safeAreaInsetLeft, app.safeAreaInsetRight
        
        var safeAreaOptions = {
            width: USED_WIDTH,
            topOuterSpace: app.safeAreaInsetTop,
            bottomOuterSpace: app.safeAreaInsetBottom,
            backgroundColor: "transparent",
            outerBackgroundColor: "white",
            statusBarBackgroundColor: "rgba(0, 0, 0, 0.05)",
        };

        // SAFE AREA: App container.
        safeArea.create(safeAreaOptions);
        // Objects are first created in the "safeArea". (Previous value is the "page")
        basic.setDefaultContainerBox(safeArea.getContainerBox());

        // Change launchView layer after safeArea created.
        launchView.showOnSafeArea();
        
        // Start the app.
        startApp();

    });

};

// Second running function.
const startApp = function() {

    //saveGlobal(); // Close this line to store data.
    // NOTE: For reseting global variables, run saveGlobal() before loadGlobal():

    loadGlobal();

    /*
    safeArea.setBackgroundColor("transparent");
    safeArea.setOuterBackgroundColor("white");
    safeArea.setStatusBarBackgroundColor("rgba(0, 0, 0, 0.0)"); // works only at notched devices.
    */
    
    // UI DEFAULT VIEW: Default page view:
    defaultView.create({
        backgroundColor: "white",
        scrollY: 1,
        showWithMotion: 0,
    });

    // UI TOP BAR: Title and buttons:
    topBar.create({
        height: 105,
        showWithMotion: 0,
    });
    topBar.menuButton.onClick(showSideBar);
    
    // UI BOTTOM BAR: Image buttons at bottom:
    bottomBar.create({
        height: 80, // 70, 80, 90
        showSelectedText: 1, // 0
        highLightColor: "#141414", // "whitesmoke"
        reverseColorOfSelectedIcon: 1, // 0
        normalIconSpace: 16,
        selectedIconSpace: 16, // 16
    });
    bottomBar.createItemsByDataList(database.getBottomBarItemDataList());
    bottomBar.onItemClick(openPageById);

    // UI BUDGE FOR BOTTOM BAR: Tasks count.
    bottomBar.tasksUIBudge = bottomBar.createBudgeOnItem({ itemIndex: 3});
    //that.setValue(storage.load("todoApp-taskDataList").length || 0);
    that.setColor("indianred");
    updateBottomBarTasksUIBudge();
    //that.setVisible(0);

    // UI SECOND VIEW: If you need a view without unload page in defaultView:
    secondView.create({
        backgroundColor: "white",
        scrollY: 1,
        showWithMotion: 1,
    });

    // UI SMALL VIEW: For small pages, extra info, custom dialogs etc.
    smallView.create({
        height: 500,
        backgroundColor: "white",
        coverColor: "rgba(0, 0, 0, 0.4)",
        topRound: 13,
        scrollY: 0,
        showWithMotion: 1,
    });

    // UI SIDE MENU BAR: Right side menu:
    sideBar.create();
    sideBar.setTitle("CATEGORIES");
    sideBar.createItemsByDataList(database.getSideMenuBarItemDataList());
    sideBar.selectItemByIndex(0);
    sideBar.onSelectionChange(sideBarItemSelectionChanged);

    // UI OBJECT: Login view:
    loginView.create();
    //loginView.show();
    sideBar.lockScreenButton.onClick(lockScreen);

    // Shows where did you tap.
    clickEffect.create({
        clickColor: "black",
    });

    // WAITING VIEW: It prevents the user from touching the screen until the process is complete.
    waitingView = WaitingView({
        waitingIconFile: "components/ui-waiting-view/clock.png",
        coverBackgroundColor: "rgba(0, 0, 0, 0.4)",
    });
    // NOTE: New component technique year:2024 (Template File: components/_component-template.js)
    
    // Open the home page.
    openPageById(homePage.PAGE_ID);

    // Remove launch view.
    launchView.remove();

}

const openPageById = function(pageId) {
    switch(pageId) {

        case homePage.PAGE_ID:
            homePage.openInDefaultView();
            break;

        case searchPage.PAGE_ID:
            searchPage.openInDefaultView();
            break;

        case examplesPage.PAGE_ID:
            examplesPage.openInDefaultView();
            break;

        case tasksPage.PAGE_ID:
            tasksPage.openInDefaultView();
            break;

        case settingsPage.PAGE_ID:
            settingsPage.openInDefaultView();
            break;

    }
}

const sideBarItemSelectionChanged = function(item, itemId) {
    console.log("Side bar selection changed: " + itemId);
}

const showSideBar = function() {
    sideBar.setVisible(1);
}

const lockScreen = function() {
    sideBar.setVisible(0);
    loginView.show();
}

window.updateBottomBarTasksUIBudge = function(number) {
    bottomBar.tasksUIBudge.setValue(number || ((storage.load("todoApp-taskDataList")) ? storage.load("todoApp-taskDataList").length : 0));
};

// Run the prepareApp() function when the device is ready:
app.onDeviceReady(prepareApp);