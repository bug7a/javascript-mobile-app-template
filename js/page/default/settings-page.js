
const settingsPage = {};
settingsPage.PAGE_ID = "settingsPage";

settingsPage.themeDataList = [
    { id: "default", name: "Default" },
    { id: "starwars", name: "StarWars" },
    { id: "supernova", name: "Supernova" },
    { id: "metro", name: "Metro" },
    { id: "flatty", name: "Flatty" },
    { id: "material", name: "Material" },
    { id: "1990s", name: "1990s" }
];

settingsPage.updateDataList = [
    { id: "auto", name: "Auto" },
    { id: "ask-to-me", name: "Ask to me" },
    { id: "off", name: "Off" }
];

settingsPage.notificationDataList = [
    { id: "on", name: "On" },
    { id: "friends-only", name: "Friends only" },
    { id: "off", name: "Off" },
    { id: "dont-disturb-1-hour", name: "Dont disturb 1 hour" },
    { id: "dont-disturb-24-hours", name: "Dont disturb 24 hours" }
];

settingsPage.languageDataList = [
    { id: "en", name: "English" },
    { id: "es", name: "Spanish" },
    { id: "fr", name: "French" },
    { id: "tr", name: "Türkçe" }
];

settingsPage.videoQualityDataList = [
    { id: "low", name: "Low"},
    { id: "standart", name: "Standart"},
    { id: "high", name: "High"}
];

// NOTE: Selected values are kept in variable global.settings

settingsPage.openInDefaultView = function() {

    defaultView.clear();

    const box = defaultView.getContainerBox();
    basic.setDefaultContainerBox(box);
    // Out of this function, use "settingsPage.box" for "box".
    settingsPage.box = box;

    topBar.setVisible(1);
    topBar.setTitle("Settings");
    topBar.setBackgroundColor("#FFFFFF");
    topBar.setTitleColor("rgba(0, 0, 0, 0.8)");
    topBar.setBorderLine(1);
    topBar.setTitleAlign("left");
    topBar.backButton.setVisible(0);
    topBar.menuButton.setVisible(1);
    
    bottomBar.setVisible(1);
    bottomBar.selectItemByIndex(4);
    bottomBar.setBorderLine(1);

    defaultView.setTopAndBottomOuterSpaces(topBar.getHeight(), bottomBar.getHeight());

    box.color = "transparent";

    UISelectText.setSelectedColor("#E1F0FF");
    UISelectText.setSearchInfoText("Filter");


    // A. APPEARANCE:

    // UI SUB TITLE: APPEARANCE
    box.appearanceUISubTitle = settingsPage.createRelativeUISubTitle("APPEARANCE");
    //box.add(that);


    // A1. Dark Mode: global.settings.isDarkModeOn

    // UI LEFT TITLE: Default values.
    settingsPage.setLeftTitleDefaultValues();

    // UI LEFT TITLE: Dark Mode.
    box.darkModeUILeftTitle = UILeftTitle.create({ 
        title: "Dark Mode", 
        description: "Use interface colors inverted." 
    });
    //box.add(that);
    // Show
    that.position = "relative";

    // UI TOGGLE: Dark mode toggle.
    settingsPage.createUIToggleInLeftTitle({
        uiLeftTitle: box.darkModeUILeftTitle,
        toggleId: "isDarkModeOn"
    });


    // A2. Theme: global.settings.themeId
    
    // UI LEFT TITLE: Theme.
    box.themeUILeftTitle = UILeftTitle.create({
        title: "Theme",
        description: "" 
    });
    //box.add(that);
    // Show
    that.position = "relative";

    // UI SELECT TEXT: Theme.
    settingsPage.createUISelectTextInLeftTitle({
        uiLeftTitle: box.themeUILeftTitle,
        selectTextId: "theme",
        itemDataList: settingsPage.themeDataList
    });
    

    // A3. Menu style:

    // UI LEFT TITLE: Menu style.
    box.categoriesLeftTitle = UILeftTitle.create({ 
        title: "Menu Style", 
        description: "Choose how your navigation menu appears." 
    });
    //box.add(that);
    // Show
    that.position = "relative";

    // Right Arrow Image:
    box.categoriesLeftTitle.addObject(settingsPage.createRightArrowImage());

    box.categoriesLeftTitle.onClick(function(uiLeftTitle) {
        menuStylePage.openInSecondView();
    });


    // A4. Primary color: global.settings.selectedColor

    // UI LEFT TITLE: Primary color.
    box.colorLeftTitle = UILeftTitle.create({ 
        title: "Primary Color", 
        description: "Choose a color for the colored interface buttons." 
    });
    //box.add(that);
    // Show
    that.position = "relative";

    // BOX: Primary color. (Custom Item)
    box.colorLeftTitle.boxPrimaryColor = createBox(0, 0, 40, 40);
    that.color = global.settings.selectedColor || "#689BD2";
    that.colorData = global.settings.selectedColor || "#689BD2";
    that.border = 2;
    that.borderColor = "#141414";
    that.round = 4;
    that.onClick(function(boxPrimaryColor) {

        // smallView "Select a Color:"
        selectColorDialog.selectedColor = boxPrimaryColor.colorData;
        selectColorDialog.openInSmallView(function colorSelected(color) {

            boxPrimaryColor.color = color;
            boxPrimaryColor.colorData = color;
            global.settings.selectedColor = color;
            saveGlobal();

        });

    });

    box.colorLeftTitle.addObject(box.colorLeftTitle.boxPrimaryColor);


    // B. SYSTEM:
    
    // UI SUB TITLE: SYSTEM:
    box.systemUISubTitle = settingsPage.createRelativeUISubTitle("SYSTEM");
    //box.add(that);


    // B1. Update Status: global.settings.updateId
    
    // UI LEFT TITLE: Update status.
    box.updateUILeftTitle = UILeftTitle.create({
        title: "Update",
        description: "" 
    });
    //box.add(that);
    // Show
    that.position = "relative";

    // UI SELECT TEXT: Update status.
    settingsPage.createUISelectTextInLeftTitle({
        uiLeftTitle: box.updateUILeftTitle,
        selectTextId: "update",
        itemDataList: settingsPage.updateDataList
    });


    // B2. Only When Charging: global.settings.isOnlyWhenChargingOn

    // UI LEFT TITLE: Only When Charging.
    box.onlyWhenChargingUILeftTitle = UILeftTitle.create({ 
        title: "Only When Charging", 
        description: "The app only updates when plugged in." 
    });
    //box.add(that);
    that.position = "relative";

    // UI TOGGLE: Only when charging toggle.
    settingsPage.createUIToggleInLeftTitle({
        uiLeftTitle: box.onlyWhenChargingUILeftTitle,
        toggleId: "isOnlyWhenChargingOn"
    });


    // B3. Notifications: global.settings.notificationId
    
    // UI LEFT TITLE: Notifications.
    box.notificationsUILeftTitle = UILeftTitle.create({
        title: "Notifications",
        description: "" 
    });
    //box.add(that);
    that.position = "relative";

    // UI SELECT TEXT: notifications select text.
    settingsPage.createUISelectTextInLeftTitle({
        uiLeftTitle: box.notificationsUILeftTitle,
        selectTextId: "notification",
        itemDataList: settingsPage.notificationDataList
    });


    // B4. Font Size: global.settings.fontSize
    
    // UI LEFT TITLE: Font size.
    box.fontSizeUILeftTitle = UILeftTitle.create({
        title: "Font Size",
        description: "" 
    });
    //box.add(that);
    that.position = "relative";

    // UI STEPPER: Font size stepper.
    settingsPage.createUIStepperInLeftTitle({

        uiLeftTitle: box.fontSizeUILeftTitle,
        stepperId: "fontSize"

    }, function setCustomStyle() {

        //UIStepper.default.backgroundColor = "whitesmoke";
        //UIStepper.default.buttonOuterSpace = 4;
        UIStepper.default.width = 180;

    }, function setOptions(uiToggle) {

        uiToggle.setMinimumNumber(18);
        uiToggle.setMaximumNumber(24);
        uiToggle.setUnitText("px");

    });


    // B5. Language: global.settings.languageId
    
    // UI LEFT TITLE: Language.
    box.languageUILeftTitle = UILeftTitle.create({
        title: "Language",
        description: "" 
    });
    //box.add(that);
    that.position = "relative";

    // UI SELECT TEXT: Language.
    settingsPage.createUISelectTextInLeftTitle({
        uiLeftTitle: box.languageUILeftTitle,
        selectTextId: "language",
        itemDataList: settingsPage.languageDataList
    });


    // C. DOWNLOADS:

    // UI SUB TITLE: DOWNLOADS
    box.othersUISubTitle = settingsPage.createRelativeUISubTitle("DOWNLOADS")
    box.add(that)


    // C1. Download Over Wi-Fi Only: global.settings.isDownloadWiFiOnlyOn

    // UI LEFT TITLE: Download Over Wi-Fi Only.
    box.downloadWiFiOnlyUILeftTitle = UILeftTitle.create({ 
        title: "Download Over Wi-Fi Only", 
        description: "" 
    });
    //box.add(that);
    that.position = "relative";

    // UI TOGGLE: Download over wi-fi only toggle.
    settingsPage.createUIToggleInLeftTitle({
        uiLeftTitle: box.downloadWiFiOnlyUILeftTitle,
        toggleId: "isDownloadWiFiOnlyOn"
    }, function setCustomStyle() {
        UIToggle.default.backgroundOnColor = "#FE5D49";
    });
    

    // C2. Video Quality: global.settings.videoQualityId
    
    // UI LEFT TITLE: Video Quality.
    box.videoQualityUILeftTitle = UILeftTitle.create({
        title: "Video Quality",
        description: "" 
    });
    //box.add(that);
    that.position = "relative";

    // UI SELECT TEXT: Video Quality.
    settingsPage.createUISelectTextInLeftTitle({
        uiLeftTitle: box.videoQualityUILeftTitle,
        selectTextId: "videoQuality",
        itemDataList: settingsPage.videoQualityDataList
    }, function setCustomStyle(uiSelectText) {

        //uiSelectText.color = "whitesmoke";
        //uiSelectText.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, lightgray)";

    });
    settingsPage.updateInfo_videoQuality();


    // C3. Delete all downloads.

    // UI LEFT TITLE: Delete all downloads
    UILeftTitle.default.titleTextColor = "orangered";
    //UILeftTitle.default.descriptionTextColor = "#FE5D4999";
    box.deleteAllDownloadsLeftTitle = UILeftTitle.create({ 
        title: "Delete All Downloads",
        description: "Nothing will be deleted. It is a demo."
    });
    //box.add(that);
    that.position = "relative";

    // IMAGE: Trash icon.
    const imgTrash = createImage(0, 0, 36, 36);
    that.load("assets/settings/trash.svg");
    that.opacity = 0.9;
    box.deleteAllDownloadsLeftTitle.addObject(imgTrash);

    box.deleteAllDownloadsLeftTitle.onClick(function(uiLeftTitle) {

        notice.show({ message: "All downloads are still exist." });

    });


    // D. OTHERS:

    // UI SUB TITLE: OTHERS
    box.appearanceUISubTitle = settingsPage.createRelativeUISubTitle("OTHERS");
    //box.add(that);


    // D1. Security:

    // UI LEFT TITLE: Default values.
    settingsPage.setLeftTitleDefaultValues();

    // UI LEFT TITLE: Security.
    box.securityLeftTitle = UILeftTitle.create({ 
        title: "Security", 
        description: "" 
    });
    //box.add(that);
    that.position = "relative";

    // Right Arrow Image:
    box.securityLeftTitle.addObject(settingsPage.createRightArrowImage());

    box.securityLeftTitle.onClick(function(uiLeftTitle) {
        securityPage.openInSecondView();
    });


    // D2. Privacy Policy and Terms of Use.

    // UI LEFT TITLE: Privacy Policy and Terms of Use.
    box.termOfUseLeftTitle = UILeftTitle.create({ 
        title: "Privacy Policy and Terms of Use", 
        description: "" 
    });
    //box.add(that);
    that.position = "relative";

    // Right Arrow Image:
    box.termOfUseLeftTitle.addObject(settingsPage.createRightArrowImage());

    box.termOfUseLeftTitle.onClick(function(uiLeftTitle) {
        termsOfUsePage.openInSecondView();
    });

    // --

    // Relative space at bottom.
    box.bottomUISpace = settingsPage.createRelativeUISpace(120, "whitesmoke");
    //box.add(that);

    basic.restoreDefaultContainerBox();

    defaultView.setVisible(1);
    console.log("Opened page id: " + settingsPage.PAGE_ID);

}

settingsPage.createRelativeUISubTitle = function(title, color = "whitesmoke") {

    // BOX: UI object container
    const box = createBox(0, 0, USED_WIDTH, 90);
    that.color = color;
    that.borderColor = "rgba(0, 0, 0, 0.1)";
    that.element.style.borderBottomWidth = "3px";
    that.element.style.position = "relative";
    
    // LABEL: object title text
    box.lblTitle = createLabel(20, 50, "auto");
    box.add(that);
    that.text = title;
    that.fontSize = 18;
    that.element.style.fontFamily = "opensans-bold";

    makeBasicObject(box);
    return box;

}

settingsPage.createRelativeUISpace = function(height = 100, color = "transparent") {

    const box = createBox(0, 0, USED_WIDTH, height);
    that.color = color;
    that.element.style.position = "relative";

    return box;

}

settingsPage.setLeftTitleDefaultValues = function() {

    // UI LEFT TITLE: Default values.
    UILeftTitle.resetDefault();
    UILeftTitle.default.width = USED_WIDTH;
    UILeftTitle.default.height = 100;
    UILeftTitle.default.titleFontSize = 20;
    UILeftTitle.default.leftInnerSpace = 20;
    UILeftTitle.default.rightInnerSpace = 20;
    UILeftTitle.default.bottomBorder = 1;
    UILeftTitle.default.round = 0;

}

settingsPage.createRightArrowImage = function() {

    const imgIcon = createImage(0, 0, 36, 36);
    that.load("components/ui-left-title/arrow.svg");
    that.opacity = 0.8;

    return imgIcon;

}

settingsPage.makeRelative = function(box) {

    //box.element.style.position = "relative";
    //box.left = 0;
    //box.top = 0;
    box.position = "relative";

}

settingsPage.createUIToggleInLeftTitle = function(parameters = {}, setCustomStyle = function() {}, setOptions = function() {}) {

    // parameters.uiLeftTitle
    // parameters.toggleId

    // UI TOGGLE:
    UIToggle.resetDefault();
    //UIToggle.style.microsoft();

    // Custom style:
    setCustomStyle();

    parameters.uiLeftTitle.uiToggle = UIToggle.create();
    parameters.uiLeftTitle.add(that);
    // Show at:
    that.right = UILeftTitle.default.rightInnerSpace;
    that.center("top");
    that.toggleId = parameters.toggleId;

    // Options:
    setOptions(that);

    //that.setValue(global.settings[parameters.toggleId]);
    that.setValue(settingsPage.getValue(that.toggleId) || 0);
    that.onChange(settingsPage.valueChanged_toggle);

}

settingsPage.createUISelectTextInLeftTitle = function(parameters = {}, setCustomStyle = function() {}, setOptions = function() {}) {

    // parameters.uiLeftTitle
    // parameters.selectTextId
    // parameters.itemDataList

    // UI SELECT TEXT:
    parameters.uiLeftTitle.uiSelectText = UISelectText.create();
    parameters.uiLeftTitle.add(that);
    // Show at:
    that.right = 20;
    that.center("top");
    that.setAutoResize(1);

    //that.color = "whitesmoke";
    //that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, lightgray)";
    that.color = "white";
    that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, white)";

    // Custom style
    setCustomStyle(that);

    parameters.uiLeftTitle.uiSelectText.selectTextId = parameters.selectTextId;

    // Options
    setOptions(that);

    parameters.uiLeftTitle.uiSelectText.createItemsByDataList(parameters.itemDataList);

    let itemIndex = parameters.uiLeftTitle.uiSelectText.getIndexById(
        global.settings[parameters.uiLeftTitle.uiSelectText.selectTextId + "Id"]
        );

    if (itemIndex < 0) {
        itemIndex = 0;
    }

    parameters.uiLeftTitle.uiSelectText.setSelectedIndex(itemIndex);
    parameters.uiLeftTitle.uiSelectText.onChange(settingsPage.valueChanged_selectText);

}

settingsPage.createUIStepperInLeftTitle = function(parameters = {}, setCustomStyle = function() {}, setOptions = function() {}) {

    // parameters.uiLeftTitle
    // parameters.stepperId

    // UI STEPPER: Default values.
    UIStepper.resetDefault();
    UIStepper.default.buttonOuterSpace = 0;

    setCustomStyle();

    parameters.uiLeftTitle.uiStepper = UIStepper.create();
    parameters.uiLeftTitle.add(that);
    that.stepperId = parameters.stepperId;
    // Show at:
    that.right = UILeftTitle.default.rightInnerSpace;
    that.center("top");
    
    setOptions(that);

    that.setValue(settingsPage.getValue(that.stepperId) || 0);
    that.onChange(settingsPage.valueChanged_stepper);

}

settingsPage.valueChanged_toggle = function(uiToggle) {

    console.log("Toggle value (" + uiToggle.toggleId + "): " + uiToggle.getValue());
    settingsPage.setValue(uiToggle.toggleId, uiToggle.getValue());

    switch(uiToggle.toggleId) {

        case "isDarkModeOn":
            // Do something.
            break;

        case "isDownloadWiFiOnlyOn":
            // Do something.
            break;

        case "isOnlyWhenChargingOn":
            // Do something.
            break;

    }

}

settingsPage.valueChanged_selectText = function(uiSelectText) {

    console.log("Selected name (" + uiSelectText.selectTextId + "): " + uiSelectText.getSelectedName());
    settingsPage.setValue(uiSelectText.selectTextId + "Id", uiSelectText.getSelectedId());
    settingsPage.setValue(uiSelectText.selectTextId + "Name", uiSelectText.getSelectedName());

    switch(uiSelectText.selectTextId) {

        case "theme":
            // Do something.
            //alert(uiSelectText.getSelectedName());
            break;

        case "videoQuality":

            // Do something.
            settingsPage.updateInfo_videoQuality();
            settingsPage.action_videoQuality();
            break;

        case "update":
            // Do something.
            break;

        case "notification":
            // Do something.
            break;

        case "language":
            // Do something.
            break;

    }

}

settingsPage.valueChanged_stepper = function(uiStepper) {

    console.log("Stepper number (" + uiStepper.stepperId + "): " + uiStepper.getValue());
    settingsPage.setValue(uiStepper.stepperId, uiStepper.getValue());

    switch(uiStepper.stepperId) {

        case "fontSize":
            // Do something.
            break;

    }

}

settingsPage.setValue = function(id, value) {

    global.settings[id] = value;
    saveGlobal();

}

settingsPage.getValue = function(id) {
    return global.settings[id];
}

settingsPage.updateInfo_videoQuality = function() {

    const uiLeftTitle = settingsPage.box.videoQualityUILeftTitle;

    switch(uiLeftTitle.uiSelectText.getSelectedId()) {

        case "low":
            uiLeftTitle.setDescription("Current quality: 25%");
            break;

        case "standart":
            uiLeftTitle.setDescription("");
            break;

        case "high":
            uiLeftTitle.setDescription("Remaining disk space: 2.3GB");
            break;

    }

}

settingsPage.action_videoQuality = function() {

    switch(settingsPage.box.videoQualityUILeftTitle.uiSelectText.getSelectedId()) {

        case "low":
            // Do something.
            notice.show({ 
                message: "Videos will look very poor quality.", 
                backgroundColor: notice.colors.YELLOW,
                textColor: "#141414"
            });
            break;

        case "standart":
            // Do something.
            break;

        case "high":
            // Do something.
            notice.show({ 
                message: "Videos will take up a lot of space.", 
                backgroundColor: notice.colors.YELLOW,
                textColor: "#141414"
            });
            break;

    }

}