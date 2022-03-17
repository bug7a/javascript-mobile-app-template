
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
    SelectText.setSearchInfoText("Filter")
    //SelectText.setUIBackgroundColor("white")

    // OBJECTS:
    box.b2 = settingContent.createSubTitle("APPEARANCE")
    box.b3 = settingContent.createSelectTextWithTitle("Theme", settingContent.themeList, settingContent.printSelectedName)
    box.b4 = settingContent.createSelectTextWithTitle("Primary Color", settingContent.primaryColorList, settingContent.printSelectedName)
    
    box.b5 = settingContent.createSubTitle("SYSTEM")
    box.b6 = settingContent.createSelectTextWithTitle("Update", settingContent.updateStatusList, settingContent.printSelectedName)
    
    box.b7 = settingContent.createSelectTextWithTitle("Notifications", settingContent.notificationStatusList, settingContent.printSelectedName)
    box.b8 = settingContent.createSelectTextWithTitle("Sound", settingContent.soundStatusList, settingContent.printSelectedName)
    box.b9 = settingContent.createSelectTextWithTitle("Language", settingContent.languageList, settingContent.printSelectedName)
    
    box.b10 = settingContent.createSubTitle("OTHERS")
    box.b11 = settingContent.createSelectTextWithTitle("objectType", settingContent.objectTypeList, settingContent.printSelectedName)
    
    box.b12 = shared.createRelativeUISpace(120, "whitesmoke")

    box.b3.uiSelectText.setSelectedIndex(1)
    box.b4.uiSelectText.setSelectedIndex(5)
    box.b6.uiSelectText.setSelectedIndex(1)
    box.b7.uiSelectText.setSelectedIndex(1)

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

settingContent.printSelectedName = function(self, index) {
    print("Selected value: " + self.itemList[index].name)
}

settingContent.createSubTitle = function(title) {

    // BOX: object container
    var box = createBox(0, 0, global.CONTENT_WIDTH, 90)
    that.color = "whitesmoke"
    that.borderColor = "rgba(0, 0, 0, 0.1)"
    that.element.style.borderBottomWidth = "3px"
    that.element.style.position = "relative"
    
    // LABEL: object title text
    box.lblTitle = createLabel(20, 50, "auto")
    that.text = title
    that.fontSize = 18
    that.element.style.fontFamily = "opensans-bold"

    makeBasicObject(box)

    return box
}

settingContent.createSelectTextWithTitle = function(title, list, func) {

    // BOX: object container
    var box = createBox(0, 0, global.CONTENT_WIDTH, 70)
    that.color = "white"
    that.borderColor = "lightgray"
    that.element.style.borderBottomWidth = "1px"
    that.element.style.position = "relative"
    
    // LABEL: object title text
    box.lblTitle = createLabel(20, 22, "auto")
    that.text = title
    that.fontSize = 20

    // OBJECT: Select text
    box.uiSelectText = createSelectText()
    that.right = 10
    that.top = 10
    that.setAutoResize(1)
    that.onChange(func)
    that.setItems(list)
    that.color = "whitesmoke"
    that.boxMask.element.style.background = "linear-gradient(to right, #FFFFFF00, lightgray)"

    makeBasicObject(box)

    return box
}