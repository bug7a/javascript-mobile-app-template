/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 1 September 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-left-title.htm


*/

"use strict";
const UILeftTitle = {};

// SHARED VARIABLES:
UILeftTitle.default = {};
UILeftTitle.resetDefault = function() {

    UILeftTitle.default.title = "Title";
    UILeftTitle.default.description = "";
    UILeftTitle.default.width = 600;
    UILeftTitle.default.height = 90;
    UILeftTitle.default.titleFontSize = 24;
    UILeftTitle.default.titleTextColor = "rgba(0, 0, 0, 0.8)";
    UILeftTitle.default.descriptionFontSize = 18;
    UILeftTitle.default.descriptionTextColor = "rgba(0, 0, 0, 0.5)";
    UILeftTitle.default.textSpaceToCenter = 14;
    UILeftTitle.default.leftInnerSpace = 30;
    UILeftTitle.default.rightInnerSpace = 30;
    UILeftTitle.default.border = 0;
    UILeftTitle.default.borderColor = "rgba(0, 0, 0, 0.2)";
    UILeftTitle.default.bottomBorder = 2;
    UILeftTitle.default.backgroundColor = "white";
    UILeftTitle.default.round = 4;

}
UILeftTitle.resetDefault();

UILeftTitle.create = function(parameters = {}) {

    // BOX: UI object container.
    const box = createBox();

    // Default values.
    box.default = {};
    for (let parameterName in UILeftTitle.default) {
        box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UILeftTitle.default[parameterName];
    }

    // *** PRIVATE VARIABLES:
    let test = "";

    // *** PUBLIC VARIABLES:

    // *** OBJECT MODEL:
    box.width = box.default.width;
    box.height = box.default.height;
    box.color = box.default.backgroundColor;
    box.border = box.default.border;
    box.borderColor = box.default.borderColor;
    box.element.style.borderBottomWidth = box.default.bottomBorder + "px";
    box.round = box.default.round;
    
    // LABEL: Title text.
    box.lblTitle = createLabel(box.default.leftInnerSpace, 0, "auto", "auto");
    box.add(that);
    that.text = parameters.title;
    that.fontSize = box.default.titleFontSize;
    that.textColor = box.default.titleTextColor;
    that.setMotion("top 0.3s");
    that.dontMotion();
    box.lblTitle.onResize(function(self) {
        repositonObjects();
    });

    // LABEL: Description text.
    box.lblDescription = createLabel(box.default.leftInnerSpace, 0, "auto", "auto");
    box.add(that);
    that.text = parameters.description;
    that.fontSize = box.default.descriptionFontSize;
    that.textColor = box.default.descriptionTextColor;
    that.opacity = 0;
    that.setMotion("top 0.3s, opacity: 0.3s");
    that.dontMotion();
    box.lblDescription.onResize(function(self) {
        repositonObjects();
    });

    // *** PRIVATE METHODS:
    const repositonObjects = function() {

        if (box.lblDescription.text) {
            const space = box.default.textSpaceToCenter;
            box.lblTitle.center("top");
            box.lblTitle.top -= space;
            box.lblDescription.center("top");
            box.lblDescription.top += space;
            box.lblDescription.opacity = 1;
        } else {
            box.lblTitle.center("top");
            box.lblDescription.opacity = 0;
        }

    }
        
    // *** PUBLIC METHODS:
    box.setTitle = function(titleText) {
        box.lblTitle.text = titleText;
    }

    box.setDescription = function(descriptionText) {
        box.lblDescription.text = descriptionText;
    }

    box.addObject = function(object) {
        
        box.add(object);
        object.right = box.default.rightInnerSpace;
        object.center("top");

    }

    box.addIconByFile = function(iconFile) {

    }

    box.removeIcon = function() {

    }

    box.setIconSpace = function(space) {

    }

    box.getIconObject = function() {
        
    }

    // *** FIRST RUN CODE:

    makeBasicObject(box);
    return box;
}

// SHARED METHODS:
UILeftTitle.testFunction = function() {

}