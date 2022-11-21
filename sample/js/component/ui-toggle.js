/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-toggle.htm


*/

"use strict";
const UIToggle = {};

// SHARED VARIABLES:
UIToggle.sharedVariable = "sharedVariable";
UIToggle.default = {};
UIToggle.resetDefault = function() {

    UIToggle.default.width = 60;
    UIToggle.default.height = 40;
    UIToggle.default.backgroundWidth = 60;
    UIToggle.default.backgroundHeight = 40;

    UIToggle.default.backgroundOffColor = "lightgray";
    UIToggle.default.backgroundOffBorder = 0;
    UIToggle.default.backgroundOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOffRound = 20;

    UIToggle.default.backgroundOnColor = "#3871E0";
    UIToggle.default.backgroundOnBorder = 0;
    UIToggle.default.backgroundOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOnRound = 20;

    UIToggle.default.buttonWidth = 32;
    UIToggle.default.buttonHeight = 32;
    UIToggle.default.buttonSpace = 4;

    UIToggle.default.buttonOffColor = "white";
    UIToggle.default.buttonOffBorder = 0;
    UIToggle.default.buttonOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOffRound = 16;
    UIToggle.default.buttonOffShadow = "1px 0px 6px rgba(0, 0, 0, 0.3)";

    UIToggle.default.buttonOnColor = "white";
    UIToggle.default.buttonOnBorder = 0;
    UIToggle.default.buttonOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOnRound = 16;
    UIToggle.default.buttonOnShadow = "-1px 0px 6px rgba(0, 0, 0, 0.6)";

    UIToggle.default.butttonMotionString = "left 0.2s";
    UIToggle.default.backgroundMotionString = "background-color 0.2s";

}
UIToggle.resetDefault();

UIToggle.create = function(parameters = {}) {

    // BOX: UI Object container.
    const box = createBox();

    // Default values.
    box.default = {};
    for (let parameterName in UIToggle.default) {
        box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UIToggle.default[parameterName];
    }

    // *** PRIVATE VARIABLES:
    let onChangeFunc = function() {};

    // *** PUBLIC VARIABLES:
    box.publicVariable = "publicVariable";
    box.isOn = 0;

    // *** OBJECT MODEL:
    box.width = box.default.width;
    box.height = box.default.height;
    box.round = 0;
    box.color = "transparent";
    box.border = 0;
    box.element.style.overflow = "visible";
    
    // BOX: Background.
    box.boxBackground = createBox(0, 0);
    box.add(that);
    that.width = box.default.backgroundWidth;
    that.height = box.default.backgroundHeight;
    that.color = box.default.backgroundOffColor;
    that.border = box.default.backgroundOffBorder;
    that.borderColor = box.default.backgroundOffBorderColor;
    that.round = box.default.backgroundOffRound;
    that.center();
    box.setMotion(box.default.backgroundMotionString);

    // BOX: Action button.
    box.btnAction = createBox(box.default.buttonSpace, 0);
    box.add(that);
    that.width = box.default.buttonWidth;
    that.height = box.default.buttonHeight;
    that.round = box.default.buttonOffRound;
    that.color = box.default.buttonOffColor;
    that.border = box.default.buttonOffBorder;
    that.element.style.boxShadow = box.default.buttonOffShadow;
    that.center("top");
    that.setMotion(box.default.butttonMotionString);

    // *** PRIVATE METHODS:
    const privateMethod = function() {
        return "privateMethod";
    }
    
    // *** PUBLIC METHODS:
    box.toggle = function() {
        if(!box.isOn) {

            box.isOn = 1;
            box.btnAction.left = box.width - box.btnAction.width - box.default.buttonSpace;
            box.boxBackground.color = box.default.backgroundOnColor;
            box.boxBackground.border = box.default.backgroundOnBorder;
            box.boxBackground.borderColor = box.default.backgroundOnBorderColor;
            box.boxBackground.round = box.default.backgroundOnRound;
            box.btnAction.color = box.default.buttonOnColor;
            box.btnAction.border = box.default.buttonOnBorder;
            box.btnAction.borderColor = box.default.buttonOnBorderColor;
            box.btnAction.round = box.default.buttonOnRound;
            box.btnAction.element.style.boxShadow = box.default.buttonOnShadow;
        
        } else {

            box.isOn = 0;
            box.btnAction.left = box.default.buttonSpace;
            box.boxBackground.color = box.default.backgroundOffColor;
            box.boxBackground.border = box.default.backgroundOffBorder;
            box.boxBackground.borderColor = box.default.backgroundOffBorderColor;
            box.boxBackground.round = box.default.backgroundOffRound;
            box.btnAction.color = box.default.buttonOffColor;
            box.btnAction.border = box.default.buttonOffBorder;
            box.btnAction.borderColor = box.default.buttonOffBorderColor;
            box.btnAction.round = box.default.buttonOffRound;
            box.btnAction.element.style.boxShadow = box.default.buttonOffShadow;

        }
    }
    
    box.setValue = function(value) {
        if (box.isOn != value) {
            box.toggle(); 
            onChangeFunc(box);
        }
    }
    
    box.getValue = function() {
        return box.isOn;
    }

    /*
    box.setBackgroundOnColor = function(color) {
        box.default.backgroundOnColor = color;
        if (box.isOn == 1) {
            box.boxBackground.color = box.default.backgroundOnColor;
        }
    }
    
    box.setBackgroundOffColor = function(color) {
        box.default.backgroundOffColor = color;
        if (box.isOn == 0) {
            box.boxBackground.color = box.default.backgroundOffColor;
        }
    }
    */

    box.onChange = function(func) {
        onChangeFunc = func;
    }

    // *** FIRST RUN CODE:
    box.onClick(function(self, event) {
        event.stopPropagation();
        self.toggle();
        onChangeFunc(box);
    });

    makeBasicObject(box);
    return box;
}

// SHARED METHODS:
UIToggle.sharedMethod = function() {
	return "sharedMethod";
}

UIToggle.style = {};
UIToggle.style.google = function() {

    UIToggle.resetDefault();
    UIToggle.default.width = 56;
    UIToggle.default.height = 40;
    UIToggle.default.backgroundWidth = 54;
    UIToggle.default.backgroundHeight = 26;

    UIToggle.default.backgroundOffColor = "#F1F1F1";
    UIToggle.default.backgroundOffBorder = 0;
    UIToggle.default.backgroundOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOffRound = 20;

    UIToggle.default.backgroundOnColor = "#C298FF";
    UIToggle.default.backgroundOnBorder = 0;
    UIToggle.default.backgroundOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOnRound = 20;

    UIToggle.default.buttonWidth = 30;
    UIToggle.default.buttonHeight = 30;
    UIToggle.default.buttonSpace = 0;

    UIToggle.default.buttonOffColor = "white";
    UIToggle.default.buttonOffBorder = 0;
    UIToggle.default.buttonOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOffRound = 16;
    UIToggle.default.buttonOffShadow = "0px 0px 6px rgba(0, 0, 0, 0.4)";

    UIToggle.default.buttonOnColor = "#6700E5";
    UIToggle.default.buttonOnBorder = 0;
    UIToggle.default.buttonOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOnRound = 16;
    UIToggle.default.buttonOnShadow = "0px 0px 6px rgba(0, 0, 0, 0.4)";

    UIToggle.default.butttonMotionString = "left 0.2s";
    UIToggle.default.backgroundMotionString = "background-color 0.2s";

}

UIToggle.style.apple = function() {

    UIToggle.resetDefault();
    UIToggle.default.width = 60;
    UIToggle.default.height = 40;
    UIToggle.default.backgroundWidth = 60;
    UIToggle.default.backgroundHeight = 40;

    UIToggle.default.backgroundOffColor = "lightgray";
    UIToggle.default.backgroundOffBorder = 0;
    UIToggle.default.backgroundOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOffRound = 20;

    UIToggle.default.backgroundOnColor = "#6AC966";
    UIToggle.default.backgroundOnBorder = 0;
    UIToggle.default.backgroundOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOnRound = 20;

    UIToggle.default.buttonWidth = 36;
    UIToggle.default.buttonHeight = 36;
    UIToggle.default.buttonSpace = 2;

    UIToggle.default.buttonOffColor = "white";
    UIToggle.default.buttonOffBorder = 0;
    UIToggle.default.buttonOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOffRound = 18;
    UIToggle.default.buttonOffShadow = "2px 0px 4px rgba(0, 0, 0, 0.3)";

    UIToggle.default.buttonOnColor = "white";
    UIToggle.default.buttonOnBorder = 0;
    UIToggle.default.buttonOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOnRound = 18;
    UIToggle.default.buttonOnShadow = "-2px 0px 4px rgba(0, 0, 0, 0.5)";

    UIToggle.default.butttonMotionString = "left 0.2s";
    UIToggle.default.backgroundMotionString = "background-color 0.2s";

}

UIToggle.style.ibm = function() {

    UIToggle.resetDefault();
    UIToggle.default.width = 56;
    UIToggle.default.height = 28;
    UIToggle.default.backgroundWidth = 56;
    UIToggle.default.backgroundHeight = 28;

    UIToggle.default.backgroundOffColor = "lightgray";
    UIToggle.default.backgroundOffBorder = 0;
    UIToggle.default.backgroundOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOffRound = 28;

    UIToggle.default.backgroundOnColor = "#239A4A";
    UIToggle.default.backgroundOnBorder = 0;
    UIToggle.default.backgroundOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOnRound = 28;

    UIToggle.default.buttonWidth = 24;
    UIToggle.default.buttonHeight = 24;
    UIToggle.default.buttonSpace = 2;

    UIToggle.default.buttonOffColor = "white";
    UIToggle.default.buttonOffBorder = 0;
    UIToggle.default.buttonOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOffRound = 25;
    UIToggle.default.buttonOffShadow = "none";

    UIToggle.default.buttonOnColor = "white";
    UIToggle.default.buttonOnBorder = 0;
    UIToggle.default.buttonOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOnRound = 16;
    UIToggle.default.buttonOnShadow = "0px 0px 8px rgba(0, 0, 0, 0.4)";

    UIToggle.default.butttonMotionString = "left 0.2s, background-color 0.2s";
    UIToggle.default.backgroundMotionString = "background-color 0.2s";

}

UIToggle.style.microsoft = function() {

    UIToggle.resetDefault();
    UIToggle.default.width = 60;
    UIToggle.default.height = 30;
    UIToggle.default.backgroundWidth = 60;
    UIToggle.default.backgroundHeight = 30;

    UIToggle.default.backgroundOffColor = "white";
    UIToggle.default.backgroundOffBorder = 3;
    UIToggle.default.backgroundOffBorderColor = "rgba(0, 0, 0, 0.5)";
    UIToggle.default.backgroundOffRound = 20;

    UIToggle.default.backgroundOnColor = "#0179D0";
    UIToggle.default.backgroundOnBorder = 0;
    UIToggle.default.backgroundOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOnRound = 20;

    UIToggle.default.buttonWidth = 20;
    UIToggle.default.buttonHeight = 20;
    UIToggle.default.buttonSpace = 5;

    UIToggle.default.buttonOffColor = "rgba(0, 0, 0, 0.6)";
    UIToggle.default.buttonOffBorder = 0;
    UIToggle.default.buttonOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOffRound = 16;
    UIToggle.default.buttonOffShadow = "none";

    UIToggle.default.buttonOnColor = "white";
    UIToggle.default.buttonOnBorder = 0;
    UIToggle.default.buttonOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOnRound = 16;
    UIToggle.default.buttonOnShadow = "none";

    UIToggle.default.butttonMotionString = "left 0.2s";
    UIToggle.default.backgroundMotionString = "background-color 0.2s";
    
}

UIToggle.style.default2 = function() {

    UIToggle.resetDefault();
    UIToggle.default.width = 56;
    UIToggle.default.height = 34;
    UIToggle.default.backgroundWidth = 56;
    UIToggle.default.backgroundHeight = 34;

    UIToggle.default.backgroundOffColor = "lightgray";
    UIToggle.default.backgroundOffBorder = 0;
    UIToggle.default.backgroundOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOffRound = 3;

    UIToggle.default.backgroundOnColor = "#23ACCF";
    UIToggle.default.backgroundOnBorder = 0;
    UIToggle.default.backgroundOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.backgroundOnRound = 3;

    UIToggle.default.buttonWidth = 32;
    UIToggle.default.buttonHeight = 32;
    UIToggle.default.buttonSpace = 1;

    UIToggle.default.buttonOffColor = "white";
    UIToggle.default.buttonOffBorder = 0;
    UIToggle.default.buttonOffBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOffRound = 3;
    UIToggle.default.buttonOffShadow = "2px 0px 3px rgba(0, 0, 0, 0.2)";

    UIToggle.default.buttonOnColor = "white";
    UIToggle.default.buttonOnBorder = 0;
    UIToggle.default.buttonOnBorderColor = "rgba(0, 0, 0, 0.1)";
    UIToggle.default.buttonOnRound = 3;
    UIToggle.default.buttonOnShadow = "-2px 0px 3px rgba(0, 0, 0, 0.2)";

    UIToggle.default.butttonMotionString = "left 0.2s";
    UIToggle.default.backgroundMotionString = "background-color 0.2s";

}