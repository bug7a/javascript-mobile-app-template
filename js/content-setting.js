
var settingContent = {}

settingContent.themeList = [
    {id:"default", name:"Default"},
    {id:"starwars", name:"StarWars"},
    {id:"supernova", name:"Supernova"},
    {id:"metro", name:"Metro"},
    {id:"flatty", name:"Flatty"},
    {id:"material", name:"Material"},
    {id:"1990s", name:"1990s"}
]

settingContent.primaryColorList = [
    {id:"red", name:"Red"},
    {id:"green", name:"Green"},
    {id:"blue", name:"Blue"},
    {id:"yellow", name:"Yellow"},
    {id:"black", name:"Black"},
    {id:"white", name:"White"},
    {id:"gray", name:"Gray"}
]

settingContent.updateStatusList = [
    {id:"auto", name:"Auto"},
    {id:"ask-to-me", name:"Ask to me"},
    {id:"off", name:"Off"}
]

settingContent.notificationStatusList = [
    {id:"on", name:"On"},
    {id:"friends-only", name:"Friends only"},
    {id:"off", name:"Off"},
    {id:"dont-disturb-1-hour", name:"Dont disturb 1 hour"},
    {id:"dont-disturb-24-hours", name:"Dont disturb 24 hours"}
]

settingContent.soundStatusList = [
    {id: "enable", name: "Enable"},
    {id: "mute", name: "Mute"},
    {id: "mute-for-a-hour", name: "Mute for a hour"}
]

settingContent.languageList = [
    {id:"en", name:"English"},
    {id:"es", name:"Spanish"},
    {id:"fr", name:"French"},
    {id:"tr", name:"Türkçe"}
]

settingContent.objectTypeList = [
    {id:"classical", name:"Classical"},
    {id:"minimal", name:"Minimal"},
    {id:"functional", name:"Functional"},
    {id:"exaggerated", name:"Exaggerated"}
]

// BOX: İçerik taşıyıcısı
settingContent.box

settingContent.createIn = function(box) {

    settingContent.box = box
    box.color = "whitesmoke"

    // Global settings
    //SelectText.setSelectedColor("#CADAE0")
    //SelectText.setUIBackgroundColor("white")
    SelectText.setSearchInfoText("Filter")

    // OBJECTS:
    box.appearanceUISubTitle = shared.createRelativeUISubTitle(
        "APPEARANCE")

    box.darkModeGroup = settingContent.createUIToggleWithTitle(
        "Dark mode",
        {},
        settingContent.printToggleValue)
    box.darkModeGroup.uiToggle.id = "dark-mode"
    box.darkModeGroup.uiToggle.setValue(1)

    box.themeGroup = settingContent.createUISelectTextWithTitle(
        "Theme", 
        settingContent.themeList, 
        settingContent.printSelectedName)
    box.themeGroup.uiSelectText.setSelectedIndex(1)

    box.primaryColorGroup = settingContent.createUISelectTextWithTitle(
        "Primary Color", 
        settingContent.primaryColorList, 
        settingContent.printSelectedName)
    

    box.systemUISubTitle = shared.createRelativeUISubTitle(
        "SYSTEM")

    box.updateGroup = settingContent.createUISelectTextWithTitle(
        "Update", 
        settingContent.updateStatusList, 
        settingContent.printSelectedName)
    box.updateGroup.uiSelectText.setSelectedIndex(1)

    box.onlyWhenChargingGroup = settingContent.createUIToggleWithTitle(
        "Only when charging",
        {},
        settingContent.printToggleValue)
    box.onlyWhenChargingGroup.uiToggle.id = "only-when-charging"

    box.notificationsGroup = settingContent.createUISelectTextWithTitle(
        "Notifications", 
        settingContent.notificationStatusList, 
        settingContent.printSelectedName)
    box.notificationsGroup.uiSelectText.setSelectedIndex(2)

    box.sleepDelayGroup = settingContent.createUIStepperWithTitle(
        "Sleep delay",
        {},
        settingContent.printStepperNumber)
    box.sleepDelayGroup.uiStepper.id = "sleep-delay"
    box.sleepDelayGroup.uiStepper.setMinimumRangeNumber(1)
    box.sleepDelayGroup.uiStepper.setMaximumRangeNumber(5)
    box.sleepDelayGroup.uiStepper.setNumber(3)

    box.soundGroup = settingContent.createUISelectTextWithTitle(
        "Sound", 
        settingContent.soundStatusList, 
        settingContent.printSelectedName)

    box.languageGroup = settingContent.createUISelectTextWithTitle(
        "Language", 
        settingContent.languageList, 
        settingContent.printSelectedName)


    box.othersUISubTitle = shared.createRelativeUISubTitle(
        "OTHERS")

    box.objectTypeGroup = settingContent.createUISelectTextWithTitle(
        "objectType", 
        settingContent.objectTypeList, 
        settingContent.printSelectedName)
    
    box.bottomUISpace = shared.createRelativeUISpace(
        120, 
        "whitesmoke")
}

settingContent.open = function() {

    navigationBar.setVisible(1)
    navigationBar.setTitle("Settings")
    navigationBar.backButton.setVisible(0)
    navigationBar.menuButton.setVisible(1)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(4)
    defaultView.setTopAndBottomSpaces(navigationBar.HEIGHT, tabBar.HEIGHT)
    defaultView.createAndShowContent(settingContent)
}

settingContent.printSelectedName = function(self) {
    print("Selected name: " + self.itemList[self.getSelectedIndex()].name)
}

settingContent.printToggleValue = function(self) {
    // self.id
    print("Toggle value: " + self.getValue())
}

settingContent.printStepperNumber = function(self) {
    // self.id
    print("Stepper number: " + self.getNumber())
}

// UI SELECT TEXT
settingContent.createUISelectTextWithTitle = function(titleText, data, func) {

    // BOX: object container
    var box = settingContent.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiSelectText = createSelectText()
    that.right = 20
    that.top = 10
    that.setAutoResize(1)
    that.onChange(func)
    that.setItems(data)
    that.color = "whitesmoke"
    that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, lightgray)"

    makeBasicObject(box)
    return box
}

// UI TOGGLE
settingContent.createUIToggleWithTitle = function(titleText, data = {}, func) {

    // BOX: object container
    var box = settingContent.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiToggle = createUIToggle()
    that.right = 20
    that.center("top")
    that.onValueChange(func)

    makeBasicObject(box)
    return box
}

// UI STEPPER
settingContent.createUIStepperWithTitle = function(titleText, data = {}, func) {

    // BOX: object container
    var box = settingContent.createBoxWithLeftTitle(titleText)

    // OBJECT: Select text
    box.uiStepper = createUIStepper()
    that.right = 20
    that.center("top")
    that.onNumberChange(func)

    makeBasicObject(box)
    return box
}

settingContent.createBoxWithLeftTitle = function(titleText) {

    // BOX: object container
    var box = createBox(0, 0, global.CONTENT_WIDTH, 70)
    that.color = "white"
    that.borderColor = "lightgray"
    that.element.style.borderBottomWidth = "1px"
    that.element.style.position = "relative"
    
    // LABEL: object title text
    box.lblTitle = createLabel(20, 22, "auto")
    that.text = titleText
    that.fontSize = 20

    makeBasicObject(box)
    return box
}