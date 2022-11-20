/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 1 September 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-title.htm


*/

"use strict";
const UITitle = {};

// SHARED VARIABLES:
UITitle.default = {};
UITitle.resetDefault = function() {

    UITitle.default.title = "Title";
    UITitle.default.backButtonVisible = 0;
    UITitle.default.backButtonText = "Back";
    UITitle.default.width = "auto";
    UITitle.default.height = 105;
    UITitle.default.backgroundColor = "white";
    UITitle.default.round = 0;
    UITitle.default.border = 0;
    UITitle.default.borderColor = "rgba(0, 0, 0, 0.1)";
    UITitle.default.bottomBorder = 1;
    UITitle.default.bottomInnerSpace = 24;
    UITitle.default.leftInnerSpace = 20;
    UITitle.default.rightInnerSpace = 20;
    UITitle.default.titleFontSize = 28;
    UITitle.default.titleTextColor = "rgba(0, 0, 0, 0.8)";
    UITitle.default.backButtonIconFile = "js/component/ui-title/arrow-blue.svg";
    UITitle.default.backButtonHeight = 20;
    UITitle.default.backButtonFontSize = 14;
    UITitle.default.backButtonTextColor = "#689BD2";
    UITitle.default.backButtonIconBackgroundColor = "rgba(0, 0, 0, 0.0)";

}
UITitle.resetDefault();

UITitle.create = function(parameters = {}) {

    // BOX: UI object container.
    const box = createBox();

    // Default values.
    box.default = {};
    for (let parameterName in UITitle.default) {
        box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UITitle.default[parameterName];
    }

    if (box.default.width == "auto") {
        box.default.width = basic.getDefaultContainerBox().width;
    }

    // *** PRIVATE VARIABLES:
    let privateVariable = "privateVariable";

    // *** PUBLIC VARIABLES:
    box.publicVariable = "publicVariable";
    box.backButton = {};
    box.backButton.onClickFunc = function() {};

    // *** OBJECT MODEL:
    box.width = box.default.width;
    box.height = box.default.height;
    box.color = box.default.backgroundColor;
    box.border = box.default.border;
    box.borderColor = box.default.borderColor;
    box.element.style.borderBottomWidth = box.default.bottomBorder + "px";
    box.round = box.default.round;
    
    // LABEL: title text.
    box.lblTitle = createLabel();
    box.add(that);
    that.width = 540;
    that.height = 40;
    that.text = box.default.title;
    that.fontSize = box.default.titleFontSize;
    that.color = "transparent";
    that.textColor = "rgba(0, 0, 0, 0.8)";
    that.element.style.fontFamily = "opensans-bold";
    that.left = box.default.leftInnerSpace;
    that.bottom = box.default.bottomInnerSpace;

    // BOX: Back button container.
    box.boxBackButton = createBox();
    box.add(that)
    that.left = box.default.leftInnerSpace;
    that.height = box.default.backButtonHeight;
    that.color = "transparent";
    that.round = 4;
    that.onClick(function(self) {
        box.backButton.onClickFunc(self);
    });

    // IMAGE: Back icon.
    box.boxBackButton.imgIcon = createImage();
    box.boxBackButton.add(that);
    that.width = 20;
    that.height = 20;
    that.load(box.default.backButtonIconFile);
    that.color = box.default.backButtonIconBackgroundColor;
    that.round = 4;
    that.left = 0;
    that.top = 0;

    // LABEL: Back text.
    box.boxBackButton.lblBack = createLabel();
    box.boxBackButton.add(that);
    that.width = "auto";
    that.height = "auto";
    that.fontSize = box.default.backButtonFontSize;
    that.text = box.default.backButtonText;
    that.textColor = box.default.backButtonTextColor;
    that.aline(box.boxBackButton.imgIcon, "right", 3);
    that.onResize(function(self) {
        box.boxBackButton.width = self.width + self.left + self.fontSize;
    })

    box.boxBackButton.aline(box.lblTitle, "top", -4);

    // *** PRIVATE METHODS:
    let privateMetod = function() {};
        
    // *** PUBLIC METHODS:
    box.publicMethod = function() {
        return "publicMethod";
    };

    box.setTitle = function(titleText) {
        box.lblTitle.text = titleText;
    };

    box.backButton.setText = function(buttonText) {
        box.boxBackButton.lblBack.text = buttonText;
    };

    box.backButton.setVisible = function(visible) {
        box.boxBackButton.visible = visible;
    };

    /*
    // NOTE: You can write your own methods to change a value after object created. 
    box.backButton.setTextColor = function(color) {
        box.default.backButtonTextColor = color;
        box.boxBackButton.lblBack.textColor = color;
    };
    */

    box.backButton.onClick = function(func) {
        box.backButton.onClickFunc = func;
    };

    // *** FIRST RUN CODE:
    box.backButton.setVisible(box.default.backButtonVisible);

    makeBasicObject(box);
    return box;

};

// SHARED METHODS:
UITitle.sharedMethod = function() {
    return "sharedMethod";
};