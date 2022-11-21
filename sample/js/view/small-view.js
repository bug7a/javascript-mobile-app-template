
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
const smallView = {};

smallView.default = {};
smallView.resetDefault = function() {

    smallView.default.height = 500;
    smallView.default.backgroundColor = "white";
    smallView.default.coverColor = "rgba(0, 0, 0, 0.4)";
    smallView.default.topRound = 13;
    smallView.default.scrollY = 0;
    smallView.default.showWithMotion = 1;
    
}
smallView.resetDefault();

smallView.onCloseFunc = function() {};

smallView.create = function() {

    // BOX: Content container.
    smallView.box = createBox();
    that.width = basic.getDefaultContainerBox().width;
    that.height = basic.getDefaultContainerBox().height;
    that.color = "transparent";
    that.visible = 0;
    that.top = 0;
    that.left = 0;

    // BOX: Cover background.
    smallView.box.boxCover = createBox();
    smallView.box.add(that);
    that.width = basic.getDefaultContainerBox().width;
    that.height = basic.getDefaultContainerBox().height;
    that.setMotion("opacity 0.2s");
    that.top = 0;
    that.left = 0;
    that.onClick(function() {

        smallView.close();
        
    });

    // BOX: Content (Page) container.
    smallView.box.boxContent = createBox();
    smallView.box.add(that);
    that.width = basic.getDefaultContainerBox().width;
    that.height = smallView.default.height;
    that.setMotion("bottom 0.2s");
    that.left = 0;
    that.bottom = 0;
    
    smallView.clear();

}

smallView.getContainerBox = function() {
    return smallView.box.boxContent;
}

smallView.close = function() {

    smallView.setVisible(0, function motionFinished() {

        smallView.clear();
        smallView.onCloseFunc();
        smallView.onCloseFunc = function() {};

    });

}

smallView.clear = function() {

    smallView.box.boxContent.html = "";
    smallView.box.boxContent.color = smallView.default.backgroundColor;
    smallView.box.boxContent.border = 0;
    smallView.box.boxContent.scrollY = smallView.default.scrollY;
    smallView.box.boxContent.height = smallView.default.height;
    smallView.box.boxContent.element.style.borderTopLeftRadius = smallView.default.topRound + "px";
    smallView.box.boxContent.element.style.borderTopRightRadius = smallView.default.topRound + "px";
    smallView.box.boxCover.color = smallView.default.coverColor;
    
}

smallView.setVisible = function(visible, finishedCallback = function() {}) {

    if (visible != smallView.box.visible) {

        if (smallView.default.showWithMotion) {

            if (visible) {

                // Cant close view. (Because opening.)
                smallView.box.boxCover.clickable = 0;
                // Cant click objects behind view anymore.
                smallView.box.clickable = 1;

                smallView.box.boxCover.opacity = 0;
                smallView.box.boxContent.bottom = -1 * smallView.box.boxContent.height;
                smallView.box.visible = 1;
                smallView.box.withMotion(function(self) {

                    smallView.box.boxCover.opacity = 1;
                    smallView.box.boxContent.bottom = 0;
                    // Can close view by clicking background.
                    smallView.box.boxCover.clickable = 1;

                });

                setTimeout(function() {
                    finishedCallback();
                }, 250);

            } else {

                // Cant close view again. (Because closing.)
                smallView.box.boxCover.clickable = 0;
                // Cant click objects behind view yet:
                smallView.box.clickable = 1;

                smallView.box.boxCover.opacity = 1;
                smallView.box.boxContent.bottom = 0;
                smallView.box.withMotion(function(self) {
                    smallView.box.boxCover.opacity = 0;
                    smallView.box.boxContent.bottom = -1 * smallView.box.boxContent.height;
                })

                setTimeout(function() {

                    smallView.box.visible = 0;
                    // Closing finihed. Can click object again.
                    smallView.box.clickable = 0;
                    finishedCallback();

                }, 250);

            }

        } else {

            if (visible) {

                smallView.box.dontMotion();
                smallView.box.boxCover.opacity = 1;
                smallView.box.boxContent.bottom = 0;
                smallView.box.boxCover.clickable = 1;

            }

            smallView.box.visible = visible;
            finishedCallback();

        }

    }

}

smallView.onClose = function(func) {
    smallView.onCloseFunc = func;
}