/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 15 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/





*/

"use strict";
var UISearchBox = {};

// SHARED VARIABLES:
UISearchBox.default = {};
UISearchBox.resetDefault = function() {

    UISearchBox.default.width = 300;
    UISearchBox.default.height = 50;
    UISearchBox.default.searchIconFile = "js/component/ui-search-box/search.svg";
    UISearchBox.default.clearIconFile = "js/component/ui-search-box/clear.svg";
    UISearchBox.default.isCancelEnabled = 1;
    UISearchBox.default.placeholderText = "Search";
    UISearchBox.default.color = "whitesmoke";
    UISearchBox.default.textColor = "rgba(0, 0, 0, 0.8)";
    UISearchBox.default.border = 0;
    UISearchBox.default.borderColor = "rgba(0, 0, 0, 0.1)";
    UISearchBox.default.borderBottomStyle = "2px solid rgba(0, 0, 0, 0.06)";
    UISearchBox.default.round = 6;
    UISearchBox.default.fontSize = 20;

}
UISearchBox.resetDefault();

UISearchBox.create = function(parameters = {}) {

    // BOX: UI object container.
    const box = createBox();

    // Default values.
    box.default = {};
    for (let parameterName in UISearchBox.default) {
        box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UISearchBox.default[parameterName];
    }
    
    // *** PRIVATE VARIABLES:
    let onSearchFunc = function() {};

    // *** PUBLIC VARIABLES:
    box.publicVariable = "publicVariable";

    // *** OBJECT MODEL:
    box.width = box.default.width;
    box.height = box.default.height;
    box.color = box.default.color;
    box.round = box.default.round;
    box.border = box.default.border;
    box.borderColor = box.default.borderColor;
    box.element.style.borderBottom = box.default.borderBottomStyle;

    // IMAGE: Search icon
    box.imgIcon = createImage(16, 0, 25, 25);
    box.add(that);
    that.load(box.default.searchIconFile);
    that.opacity = 0.4;
    that.space = 0;
    that.center("top");

    // TEXTBOX: Search textbox
    box.txtSearch = createTextBox(40, 0);
    box.add(that);
    that.width = box.width - 80;
    that.height = box.default.height;
    that.border = 0;
    that.minimal = 1;
    that.fontSize = box.default.fontSize;
    that.textColor = box.default.textColor;
    that.color = "transparent";
    that.inputElement.setAttribute("placeholder", box.default.placeholderText);

    // IMAGE: Clear icon
    box.imgClearIcon = createImage(5, 0, 20, 20);
    box.add(that);
    that.load(box.default.clearIconFile);
    that.opacity = 0;
    that.space = 0;
    that.right = 20;
    that.center("top");
    that.setMotion("opacity 0.3s");

    /*
    box.onResize = function(self) {
        self.txtSearch.width = self.width - 80
        self.txtSearch.center("top")
    }
    */

    // *** PRIVATE METHODS:
    const uiResized = function(self) {

        self.txtSearch.width = self.width - 80;
        self.txtSearch.center("top");
        self.imgClearIcon.center("top");
        self.imgIcon.center("top");

    }

    // *** PUBLIC METHODS:
    box.onSearch = function(func) {
        onSearchFunc = func;
    }

    /*
    box.setWidth = function(width) {
        box.width = width
    }
    */

    box.setText = function(text) {
        box.txtSearch.text = text;
    }

    box.getText = function() {
        return box.txtSearch.text;
    }

    box.setPlaceholderText = function(text) {
        box.default.placeholderText = text;
        box.txtSearch.inputElement.setAttribute("placeholder", text);
    }

    box.txtSearch.inputElement.addEventListener("keyup", function() {

        onSearchFunc(box.txtSearch.text.toLowerCase(), box);

        if (box.default.isCancelEnabled) {
            if (box.txtSearch.text.length > 0) {
                box.imgClearIcon.opacity = 0.6;
            } else {
                box.imgClearIcon.opacity = 0;
            }
        }

    });

     // *** CODE:
    box.onResize(uiResized);
    box.imgClearIcon.onClick(function(self) {

        self.opacity = 0;
        box.txtSearch.text = "";
        onSearchFunc(box.txtSearch.text.toLowerCase(), box);

    });

    makeBasicObject(box);
    return box;

}