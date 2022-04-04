
var settingsPage = {}
settingsPage.ID = "settings"

settingsPage.themeList = [
    {id:"default", name:"Default"},
    {id:"starwars", name:"StarWars"},
    {id:"supernova", name:"Supernova"},
    {id:"metro", name:"Metro"},
    {id:"flatty", name:"Flatty"},
    {id:"material", name:"Material"},
    {id:"1990s", name:"1990s"}
]

settingsPage.primaryColorList = [
    {id:"red", name:"Red"},
    {id:"green", name:"Green"},
    {id:"blue", name:"Blue"},
    {id:"yellow", name:"Yellow"},
    {id:"black", name:"Black"},
    {id:"white", name:"White"},
    {id:"gray", name:"Gray"}
]

settingsPage.updateStatusList = [
    {id:"auto", name:"Auto"},
    {id:"ask-to-me", name:"Ask to me"},
    {id:"off", name:"Off"}
]

settingsPage.notificationStatusList = [
    {id:"on", name:"On"},
    {id:"friends-only", name:"Friends only"},
    {id:"off", name:"Off"},
    {id:"dont-disturb-1-hour", name:"Dont disturb 1 hour"},
    {id:"dont-disturb-24-hours", name:"Dont disturb 24 hours"}
]

settingsPage.soundStatusList = [
    {id: "enable", name: "Enable"},
    {id: "mute", name: "Mute"},
    {id: "mute-for-a-hour", name: "Mute for a hour"}
]

settingsPage.languageList = [
    {id:"en", name:"English"},
    {id:"es", name:"Spanish"},
    {id:"fr", name:"French"},
    {id:"tr", name:"Türkçe"}
]

settingsPage.objectTypeList = [
    {id:"classical", name:"Classical"},
    {id:"minimal", name:"Minimal"},
    {id:"functional", name:"Functional"},
    {id:"exaggerated", name:"Exaggerated"}
]

settingsPage.createInDefaultViewAndShow = function() {

    if (settingsPage.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
        // Out of this function, use "settingsPage.box" for "box".
        settingsPage.box = box

        navigationBar.setVisible(1)
        navigationBar.setTitle("Settings")
        navigationBar.backButton.setVisible(0)
        navigationBar.menuButton.setVisible(0)
        tabBar.setVisible(1)
        tabBar.selectItemByIndex(4)
        defaultView.setTopAndBottomOuterSpaces(navigationBar.HEIGHT, tabBar.HEIGHT)

        box.color = "whitesmoke"
        //SelectText.setSelectedColor("#CADAE0")
        //SelectText.setUIBackgroundColor("white")
        SelectText.setSearchInfoText("Filter")

        // #1

        // UI SUB TITLE: APPEARANCE
        box.appearanceUISubTitle = shared.createRelativeUISubTitle("APPEARANCE")
        box.add(that)

        // UI TOGGLE: Use motion in transitions.
        box.useMotionInTransitionsGroup = settingsPage.createUIToggleWithTitle("Use motion in transitions (working)")
        box.add(that)
        that.uiToggle.id = "useMotionInTransitions"
        that.uiToggle.onChange(settingsPage.printToggleValue)
        that.uiToggle.setValue(global.settings[that.uiToggle.id])
        
        // UI TOGGLE: Dark mode.
        box.darkModeGroup = settingsPage.createUIToggleWithTitle("Dark mode")
        box.add(that)
        that.uiToggle.id = "isDarkModeOn"
        that.uiToggle.onChange(settingsPage.printToggleValue)
        that.uiToggle.setValue(global.settings[that.uiToggle.id])
        
        // UI SELECT TEXT: Theme.
        box.themeGroup = settingsPage.createUISelectTextWithTitle("Theme")
        box.add(that)
        that.uiSelectText.id = "theme"
        that.uiSelectText.createItemsByDataList(settingsPage.themeList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])
        
        // UI SELECT TEXT: Primary color.
        box.primaryColorGroup = settingsPage.createUISelectTextWithTitle("Primary Color")
        box.add(that)
        that.uiSelectText.id = "primaryColor"
        that.uiSelectText.createItemsByDataList(settingsPage.primaryColorList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])
        
        
        // #2
        
        // UI SUB TITLE: SYSTEM
        box.systemUISubTitle = shared.createRelativeUISubTitle("SYSTEM")
        box.add(that)

        // UI SELECT TEXT: Update status.
        box.updateGroup = settingsPage.createUISelectTextWithTitle("Update")
        box.add(that)
        that.uiSelectText.id = "update"
        that.uiSelectText.createItemsByDataList(settingsPage.updateStatusList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])

        // UI TOGGLE: Only when charging.
        box.onlyWhenChargingGroup = settingsPage.createUIToggleWithTitle("Only when charging")
        box.add(that)
        that.uiToggle.id = "isOnlyWhenChargingOn"
        that.uiToggle.onChange(settingsPage.printToggleValue)
        that.uiToggle.setValue(global.settings[that.uiToggle.id])

        // UI SELECT TEXT: Notifications.
        box.notificationsGroup = settingsPage.createUISelectTextWithTitle("Notifications")
        box.add(that)
        that.uiSelectText.id = "notifications"
        that.uiSelectText.createItemsByDataList(settingsPage.notificationStatusList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])

        // UI STEPPER: Sleep delay.
        box.sleepDelayGroup = settingsPage.createUIStepperWithTitle("Sleep delay")
        box.add(that)
        that.uiStepper.id = "sleepDelayNumber"
        that.uiStepper.setMinNumber(1)
        that.uiStepper.setMaxNumber(5)
        that.uiStepper.onChange(settingsPage.printStepperNumber)
        that.uiStepper.setValue(global.settings[that.uiStepper.id])
        
        // UI SELECT TEXT: Sound.
        box.soundGroup = settingsPage.createUISelectTextWithTitle("Sound")
        box.add(that)
        that.uiSelectText.id = "sound"
        that.uiSelectText.createItemsByDataList(settingsPage.soundStatusList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])

        // UI SELECT TEXT: Language.
        box.languageGroup = settingsPage.createUISelectTextWithTitle("Language")
        box.add(that)
        that.uiSelectText.id = "language"
        that.uiSelectText.createItemsByDataList(settingsPage.languageList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])

        // #3

        // UI SUB TITLE: OTHERS
        box.othersUISubTitle = shared.createRelativeUISubTitle("OTHERS")
        box.add(that)

        // UI SELECT TEXT: Language.
        box.objectTypeGroup = settingsPage.createUISelectTextWithTitle("objectType")
        box.add(that)
        that.uiSelectText.id = "objectType"
        that.uiSelectText.createItemsByDataList(settingsPage.objectTypeList)
        that.uiSelectText.onChange(settingsPage.printSelectedName)
        that.uiSelectText.setSelectedIndex(global.settings[that.uiSelectText.id + "Index"])
        
        // Relative space at bottom.
        box.bottomUISpace = shared.createRelativeUISpace(120, "whitesmoke")
        box.add(that)

        defaultView.pushIntoOpenedPageList(settingsPage)
        defaultView.setVisible(1)
        print("Opened page id: " + settingsPage.ID)
    }
}

settingsPage.printSelectedName = function(self) {
    print("Selected name (" + self.id + "): " + self.itemList[self.getSelectedIndex()].name)
    global.settings[self.id + "Index"] = self.getSelectedIndex()
    global.settings[self.id + "Name"] = self.itemList[self.getSelectedIndex()].name
    saveGlobal()
}

settingsPage.printToggleValue = function(self) {
    print("Toggle value (" + self.id + "): " + self.getValue())
    global.settings[self.id] = self.getValue()
    saveGlobal()
}

settingsPage.printStepperNumber = function(self) {
    print("Stepper number (" + self.id + "): " + self.getValue())
    global.settings[self.id] = self.getValue()
    saveGlobal()
}

// UI SELECT TEXT IN GROUP BOX
settingsPage.createUISelectTextWithTitle = function(titleText) {

    // BOX: object container
    var box = settingsPage.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiSelectText = createSelectText()
    box.add(that)
    that.right = 20
    that.top = 10
    that.setAutoResize(1)
    //that.createItemsByDataList(data)
    //that.color = "whitesmoke"
    //that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, lightgray)"
    that.color = "white"
    that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, white)"

    makeBasicObject(box)
    return box
}

// UI TOGGLE IN GROUP BOX
settingsPage.createUIToggleWithTitle = function(titleText) {

    // BOX: object container
    var box = settingsPage.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiToggle = createUIToggle()
    box.add(that)
    that.right = 20
    that.setColorOff("rgba(0, 0, 0, 0.1)")
    that.setColorOn("#BFDBC9")
    that.center("top")

    makeBasicObject(box)
    return box
}

// UI STEPPER IN GROUP BOX
settingsPage.createUIStepperWithTitle = function(titleText) {

    // BOX: object container
    var box = settingsPage.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiStepper = createUIStepper()
    box.add(that)
    that.right = 20
    that.imgDecrease.color = "rgba(0,0,0,0.05)"
    that.imgIncrease.color = "rgba(0,0,0,0.05)"
    that.center("top")

    makeBasicObject(box)
    return box
}

// CREATE GROUP BOX
settingsPage.createBoxWithLeftTitle = function(titleText) {

    // BOX: object container
    var box = createBox(0, 0, global.USED_WIDTH, 70)
    that.color = "white"
    that.borderColor = "lightgray"
    that.element.style.borderBottomWidth = "1px"
    that.element.style.position = "relative"
    
    // LABEL: object title text
    box.lblTitle = createLabel(20, 22, "auto")
    box.add(that)
    that.text = titleText
    that.fontSize = 20

    makeBasicObject(box)
    return box
}