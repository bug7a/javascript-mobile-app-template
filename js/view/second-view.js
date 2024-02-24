
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


*/

"use strict";
const secondView = {};

secondView.default = {};
secondView.resetDefault = function() {

    secondView.default.width = "container-width";
    secondView.default.height = "container-height";
    secondView.default.backgroundColor = "white";
    secondView.default.scrollY = 1;
    secondView.default.showWithMotion = 1;

}
secondView.resetDefault();

secondView.onCloseFunc = function() {};

secondView.create = function(parameters = {}) {

    // BOX: Content container.
    secondView.box = createBox();

    // Default values.
    for (let parameterName in secondView.default) {
        secondView.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : secondView.default[parameterName];
    }

    if (secondView.default.width == "container-width") {
        secondView.default.width = basic.getDefaultContainerBox().width;
    }

    if (secondView.default.height == "container-height") {
        secondView.default.height = basic.getDefaultContainerBox().height;
    }
    
    // *** OBJECT MODEL:
    that.width = secondView.default.width;
    that.height = secondView.default.height;
    secondView.box.visible = 0;
    secondView.box.setMotion("left 0.2s, opacity 0.2s");
    that.left = 0;
    that.top = 0;

    secondView.clear();

}

secondView.getContainerBox = function() {
    return secondView.box;
}

secondView.close = function() {

    secondView.setVisible(0, function motionFinished() {

        secondView.clear();
        secondView.onCloseFunc();
        secondView.onCloseFunc = function() {};

    });

}

secondView.clear = function() {

    secondView.box.html = "";
    secondView.box.color = secondView.default.backgroundColor;
    secondView.box.border = 0;
    secondView.box.scrollX = 0;
    secondView.box.scrollY = secondView.default.scrollY;

}

secondView.setVisible = function(visible, finishedCallback = function() {}) {

    if (visible != secondView.box.visibleValue) {

        secondView.box.visibleValue = visible;

        if (secondView.default.showWithMotion) {

            if (visible) {

                secondView.box.dontMotion();
                secondView.box.visible = 1;
                //secondView.box.opacity = 0;
                secondView.tempLeft = secondView.box.left;
                secondView.box.left = secondView.default.width;

                secondView.box.withMotion(function(self) {

                    secondView.box.left = secondView.tempLeft;
                    //secondView.box.opacity = 1;

                });

                setTimeout(function() {
                    finishedCallback();
                }, 250);

            } else {

                secondView.box.dontMotion();
                secondView.box.left = secondView.tempLeft;
                //secondView.box.opacity = 1;

                secondView.box.withMotion(function(self) {
                    //secondView.box.opacity = 0;
                    secondView.box.left = secondView.default.width;
                });

                setTimeout(function() {

                    secondView.box.visible = secondView.box.visibleValue;
                    secondView.box.left = secondView.tempLeft;
                    finishedCallback();
                    
                }, 250);

            }

        } else {

            if (visible) {
    
                secondView.box.dontMotion();
                secondView.box.left = secondView.tempLeft || secondView.box.left;
                //secondView.box.opacity = 1;
    
            }
            
            secondView.box.visible = visible;
            finishedCallback();
    
        }

    }

}

secondView.onClose = function(func) {
    secondView.onCloseFunc = func;
}