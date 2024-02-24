/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 2 November 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


*/

"use strict";
const safeArea = {};

safeArea.default = {};
safeArea.resetDefault = function() {

    safeArea.default.width = "novalue";
    safeArea.default.topOuterSpace = 0;
    safeArea.default.bottomOuterSpace = 0;
    safeArea.default.backgroundColor = "transparent";
    safeArea.default.outerBackgroundColor = "white";
    safeArea.default.statusBarBackgroundColor = "rgba(0, 0, 0, 0.05)";

};
safeArea.resetDefault();

safeArea.create = function(parameters = {}) {

    // BOX: UI object container.
    const box = createBox();
    safeArea.box = box;

    // Default values.
    for (let parameterName in safeArea.default) {
        safeArea.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : safeArea.default[parameterName];
    }
    if (safeArea.default.width == "novalue") safeArea.default.width = page.width;

    // *** PRIVATE VARIABLES:
    let height = page.height - safeArea.default.topOuterSpace - safeArea.default.bottomOuterSpace;

    // *** PUBLIC VARIABLES:

    // *** OBJECT MODEL:
    box.color = "transparent";
    box.round = 0;
    box.width = safeArea.default.width;
    box.height = height;

    // BOX: status bar background.
    box.boxStatusBarBackground = createBox();
    that.width = box.width;
    that.height = safeArea.default.topOuterSpace;
    that.color = safeArea.default.statusBarBackgroundColor;
    that.top = 0;

    safeArea.getBackgroundColor = function() {
        return safeArea.default.outerBackgroundColor;
    };

    safeArea.setBackgroundColor = function(color) {
        safeArea.default.backgroundColor = color;
        box.color = color;
    };

    safeArea.getOuterBackgroundColor = function() {
        return safeArea.default.outerBackgroundColor;
    };

    safeArea.setOuterBackgroundColor = function(color) {
        safeArea.default.outerBackgroundColor = color;
        page.color = color;
    };

    safeArea.setStatusBarBackgroundColor = function(color) {
        safeArea.default.statusBarBackgroundColor = color;
        box.boxStatusBarBackground.color = color;
    };

    safeArea.getStatusBarBackgroundColor = function() {
        return safeArea.default.statusBarBackgroundColor;
    };

    safeArea.getWidth = function() {
        return box.width;
    };

    safeArea.getHeight = function() {
        return box.height;
    };

    safeArea.getContainerBox = function() {
        return box;
    };

    safeArea.reposition = function() {
        box.top = safeArea.default.topOuterSpace;
        box.center("left");
        box.boxStatusBarBackground.left = box.left;
    };

    // *** First run code:
    safeArea.reposition();
    //page.onResize(safeArea.reposition);

};