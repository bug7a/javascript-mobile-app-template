const app = {};

app.isCordovaExist = 0;
app.lastPerformanceCheckTime = Date.now();
app.savedSelectedBox = null;

app.cordovaOnDeviceReady = function (func) {

    window.addEventListener("load", function () {

        if (typeof cordova !== "undefined") {
            app.isCordovaExist = 1;
            document.addEventListener('deviceready', func.bind(this), false);
        
        }else {
            func();
        }
    });
    
}

app.getPlatformId = function() {
    return app.isCordovaExist ? cordova.platformId : "web";
}

app.calculateResolution = function() {

    if (page.width > 1000) {
        global.usedWidth = 700;

    } else if (page.width < 400) {
        global.usedWidth = 550;

    } else {
        global.usedWidth = 600;
    }

}

app.saveSelectedBox = function() {
    app.savedSelectedBox = getSelectedBox();
}

app.restoreSelectedBox = function() {
    if (app.savedSelectedBox) {
        selectBox(app.savedSelectedBox);
        app.savedSelectedBox = null;
    }
}

app.checkPerformance = function(label) {

    var spendingTime = (Date.now() - app.lastPerformanceCheckTime);
    app.lastPerformanceCheckTime = Date.now();
    print(label + ": " + spendingTime + "ms");
    
}

app.createSafeAreaBackground = function() {
    page.boxBackground = createBox(0, 0, global.usedWidth, page.height);
    that.color = "white";
}

app.setSafeAreaBackgroundColor = function(color) {
    page.boxBackground.color = color;
}

app.setBackgroundColorWithStatusBar = function(color) {
    page.color = color;
    // StatusBar.backgroundColorByHexString("#C0C0C0");
}