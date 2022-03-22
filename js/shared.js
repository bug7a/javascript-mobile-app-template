
var shared = {}
shared.isCordovaExist = 0;

shared.cordovaOnDeviceReady = function (func) {

    if (typeof cordova !== "undefined") {
        shared.isCordovaExist = 1;
        document.addEventListener('deviceready', func.bind(this), false);
    
    }else {
        window.onload = func;
    }
}

shared.getPlatformId = function() {
    return shared.isCordovaExist ? cordova.platformId : "web"
}

shared.createSafeAreaBackground = function() {
    page.boxBackground = createBox(0, 0, global.CONTENT_WIDTH, page.height)
    that.color = "white"
}

shared.setSafeAreaBackgroundColor = function(color) {
    page.boxBackground.color = color
}

shared.setBackgroundColorWithStatusBar = function(color) {
    page.color = color
}

shared.createRelativeBox = function(height = 100, color = "transparent") {

    var box = createBox(0, 0, global.CONTENT_WIDTH, height)
    that.color = color
    that.element.style.position = "relative"

    return box
}
shared.createRelativeUISpace = shared.createRelativeBox

shared.createRelativeUITitle = function(titleText = "", backgroundColor = "transparent") {

    // BOX: Object container box
    var box = shared.createUITitle(0, 0, titleText, backgroundColor)
    that.element.style.position = "relative"

    return box
}

shared.createUITitle = function(x = 0, y = 0, titleText = "", backgroundColor = "transparent") {

    // BOX: Object container box
    var box = createBox(x, y, global.CONTENT_WIDTH, 110)
    that.color = backgroundColor
    that.element.style.borderBottom = "2px solid rgba(0, 0, 0, 0.06)"

    // LABEL: title text
    box.lblTitle = createLabel(30, 0, 540, 38)
    that.bottom = 20
    that.text = titleText
    that.fontSize = 28
    that.color = "transparent"
    that.textColor = "rgba(0, 0, 0, 0.8)"
    that.element.style.fontFamily = "opensans-bold"
    /*
    that.onResize(function(self) {
        print(self.height)
    })
    */

    makeBasicObject(box)
    return box
}

shared.createRelativeUISubTitle = function(titleText, color = "whitesmoke") {

    // BOX: object container
    var box = createBox(0, 0, global.CONTENT_WIDTH, 90)
    that.color = color
    that.borderColor = "rgba(0, 0, 0, 0.1)"
    that.element.style.borderBottomWidth = "3px"
    that.element.style.position = "relative"
    
    // LABEL: object title text
    box.lblTitle = createLabel(20, 50, "auto")
    that.text = titleText
    that.fontSize = 18
    that.element.style.fontFamily = "opensans-bold"

    makeBasicObject(box)
    return box
}