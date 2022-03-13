
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

settingContent.createIn = function(boxView) {

    settingContent.box = boxView

    page.color = "whitesmoke"
    settingContent.box.color = "whitesmoke"

    // Global settings
    //SelectText.setSelectedColor("#CADAE0")
    SelectText.setSearchInfoText("Filter")
    //SelectText.setUIBackgroundColor("white")

    // OBJECTS:
    settingContent.box.b2 = settingContent.createSubTitle("APPEARANCE")
    settingContent.box.b3 = settingContent.createSelectTextWithTitle("Theme", settingContent.themeList, settingContent.printSelectedName)
    settingContent.box.b4 = settingContent.createSelectTextWithTitle("Primary Color", settingContent.primaryColorList, settingContent.printSelectedName)
    
    settingContent.box.b5 = settingContent.createSubTitle("SYSTEM")
    settingContent.box.b6 = settingContent.createSelectTextWithTitle("Update", settingContent.updateStatusList, settingContent.printSelectedName)
    
    settingContent.box.b7 = settingContent.createSelectTextWithTitle("Notifications", settingContent.notificationStatusList, settingContent.printSelectedName)
    settingContent.box.b8 = settingContent.createSelectTextWithTitle("Sound", settingContent.soundStatusList, settingContent.printSelectedName)
    settingContent.box.b9 = settingContent.createSelectTextWithTitle("Language", settingContent.languageList, settingContent.printSelectedName)
    
    settingContent.box.b10 = settingContent.createSubTitle("OTHERS")
    settingContent.box.b11 = settingContent.createSelectTextWithTitle("objectType", settingContent.objectTypeList, settingContent.printSelectedName)
    settingContent.box.b10 = settingContent.createSubTitle(" ")

    settingContent.box.b3.uiSelectText.setSelectedIndex(1)
    settingContent.box.b4.uiSelectText.setSelectedIndex(5)
    settingContent.box.b6.uiSelectText.setSelectedIndex(1)
    settingContent.box.b7.uiSelectText.setSelectedIndex(1)

}

settingContent.open = function() {

    navigationBar.setVisible(1)
    navigationBar.setTitle("Settings")
    navigationBar.backButton.setVisible(0)
    navigationBar.menuButton.setVisible(1)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(4)
    normalView.resize(navigationBar.HEIGHT, tabBar.HEIGHT)
    normalView.loadContent(settingContent)
}

settingContent.printSelectedName = function(self, index) {
    print("Selected value: " + self.itemList[index].name)
}

settingContent.createSubTitle = function(title) {

    // BOX: object container
    var box = createBox(0, 0, global.VIEW_WIDTH, 90)
    that.color = "whitesmoke"
    that.borderColor = "lightgray"
    that.element.style.borderBottomWidth = "1px"
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
    var box = createBox(0, 0, global.VIEW_WIDTH, 70)
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