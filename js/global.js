
const APP_ID = "app-id";

// global.js - shared variables storaged at local storage.
let global = {};

// If you want bigger objects use smaller USED_WIDTH: 550, 600, 700
global.usedWidth = 600;
//global.usedWidth = 550;
global.maxZoomableWidth = 1024;

global.defaultView = {};
global.defaultView.openedPageListLimit = 10;

global.natifications = {};
global.natifications.isLampOn = 1;

global.settings = {};
global.settings.selectedColor = "#689BD2";
global.settings.isDarkModeOn = 1;
global.settings.isDownloadWiFiOnlyOn = 1;
global.settings.isOnlyWhenChargingOn = 1;
global.settings.fontSize = 18;
global.settings.themeId = "starwars";
global.settings.themeName = "StarWars";
global.settings.videoQualityId = "high";
global.settings.videoQualityName = "High";
global.settings.updateId = "auto";
global.settings.updateName = "Auto";
global.settings.notificationId = "friends-only";
global.settings.notificationName = "Friends only";
global.settings.languageId = "en";
global.settings.languageName = "English";

const saveGlobal = function() {
    storage.save(APP_ID + "-global-vars", global);
}

const loadGlobal = function() {
    global = storage.load(APP_ID + "-global-vars") || global;
}