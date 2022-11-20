/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

"use strict";
const defaultView = {};

defaultView.default = {};
defaultView.resetDefault = function() {

    defaultView.default.backgroundColor = "white";
    defaultView.default.scrollY = 1;
    defaultView.default.showWithMotion = 1;

}
defaultView.resetDefault();

defaultView.onCloseFunc = function() {};

defaultView.create = function() {

    // BOX: Container.
    defaultView.box = createBox();
    that.width = basic.getDefaultContainerBox().width;
    that.height = basic.getDefaultContainerBox().height;
    that.visible = 0;
    that.top = 0;
    that.left = 0;
    that.setMotion("top 0.2s, opacity 0.2s");

    defaultView.clear();
    
}

defaultView.getContainerBox = function() {
    return defaultView.box;
}

defaultView.close = function() {

    defaultView.setVisible(0, function motionFinished() {

        defaultView.clear();
        defaultView.onCloseFunc();
        defaultView.onCloseFunc = function() {};

    });

}

defaultView.clear = function() {

    defaultView.box.html = "";
    defaultView.box.color = defaultView.default.backgroundColor;
    defaultView.box.border = 0;
    defaultView.box.scrollX = 0;
    defaultView.box.scrollY = defaultView.default.scrollY;

}

defaultView.setVisible = function(visible, finishedCallback = function() {}) {

    if (defaultView.default.showWithMotion) {

        if (visible) {

            defaultView.box.dontMotion();
            defaultView.box.visible = 1;
            defaultView.box.opacity = 0; // 0
            defaultView.tempTop = defaultView.box.top;
            defaultView.box.top = 300; // getDefaultContainerBox().height / 3

            defaultView.box.withMotion(function(self) {
                defaultView.box.top = defaultView.tempTop;
                defaultView.box.opacity = 1;
            });

            setTimeout(function() {
                finishedCallback();
            }, 250);

        } else {

            // defaultView.setVisible(0) should not be necessary to use:
            defaultView.box.visible = 0;
            finishedCallback();

            /*

            defaultView.box.dontMotion();
            defaultView.box.top = defaultView.tempTop;
            defaultView.box.opacity = 1;

            defaultView.box.withMotion(function(self) {
                defaultView.box.opacity = 0;
                defaultView.box.top = 300; // getDefaultContainerBox().height / 3
            });

            setTimeout(function() {

                defaultView.box.visible = visible;
                defaultView.box.top = defaultView.tempTop;
                finishedCallback();
                
            }, 250);

            */

            }

    } else {

        if (visible) {
            defaultView.box.top = defaultView.tempTop || defaultView.box.top;
            defaultView.box.opacity = 1;
        }
 
        defaultView.box.visible = visible;
        
    }

}

defaultView.setTopAndBottomOuterSpaces = function(top, bottom) {

    defaultView.box.top = top;
    defaultView.box.height = getDefaultContainerBox().height - top - bottom;

}

defaultView.onClose = function(func) {
    defaultView.onCloseFunc = func;
}