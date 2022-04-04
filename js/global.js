
// global.js - shared variables storaged at local storage.
var global = {}

global.appId = "app-id"
// If you want bigger objects use smaller USED_WIDTH
global.USED_WIDTH = 600
//global.USED_WIDTH = 500
global.MAX_ZOOMABLE_WIDTH = 1024

global.defaultView = {}
global.defaultView.openedPageListLimit = 10

global.natifications = {}
global.natifications.isLampOn = 1

global.settings = {}
// its working.
global.settings.useMotionInTransitions = 1
// they are examples: not working.
global.settings.isDarkModeOn = 0
global.settings.themeIndex = 1
global.settings.themeName = "StarWars"
global.settings.primaryColorIndex = 5
global.settings.primaryColorName = "White"
global.settings.updateIndex = 1
global.settings.updateName = "Ask to me"
global.settings.isOnlyWhenChargingOn = 1
global.settings.notificationsIndex = 1
global.settings.notificationsName = "Friends only"
global.settings.sleepDelayNumber = 3
global.settings.soundIndex = 1
global.settings.soundName = "Mute"
global.settings.languageIndex = 0
global.settings.languageName = "English"
global.settings.objectTypeIndex = 1
global.settings.objectTypeName = "Minimal"


var saveGlobal = function() {
    storage.save(global.appId + "-global-vars", global)
}

var loadGlobal = function() {
    global = storage.load(global.appId + "-global-vars") || global
}