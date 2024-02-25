/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


EXAMPLE: {javascript-mobile-app-template}/ui-toggle.htm


*/

"use strict";
const UIMiniChart = {};

UIMiniChart.dataList = [23, 34, 44, 45, 46, 45, 45, 43, 32, 44, 35, 36, 36, 37, 38, 20, 23, 24, 22, 23, 25, 22];

// SHARED VARIABLES:
UIMiniChart.sharedVariable = "sharedVariable";
UICore.createDefaultValues(UIMiniChart, {
    width: 400,
    height: 300,
    showSelectedText: 1,
    highLightColor: "#141414", // "whitesmoke", "#141414"
    reverseColorOfSelectedIcon: 1,
    normalIconSpace: 16,
    selectedIconSpace: 6,
    showWithMotion: 0,
    normalIconOpacity: 0.7,
    selectedIconOpacity: 0.85,
});

UIMiniChart.create = function(parameters = {}) {

    // BOX: UI Object container.
    const box = createBox();

    // Default values.
    box.default = UICore.cloneDefaultValues(UIMiniChart);
    UICore.parseParameters(box.default, parameters);

    // *** PRIVATE VARIABLES:
    let onChangeFunc = function() {};

    // *** PUBLIC VARIABLES:
    box.publicVariable = "publicVariable";
    box.isOn = 0;

    // *** OBJECT MODEL:
    box.width = box.default.width;
    box.height = box.default.height;
    box.round = 0;
    box.color = "whitesmoke";
    box.border = 0;
    box.element.style.overflow = "visible";
    box.left = 0;
    box.top = 0;    

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
UIMiniChart.sharedMethod = function() {
	return "sharedMethod";
}