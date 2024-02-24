/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 7 July 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


EXAMPLE: {javascript-mobile-app-template}/ui-waiting-view.htm


*/

"use strict";
const WaitingView = function(params = {}) {

    const box = createBox();

    const defaults = {
        border: 0,
        color: "transparent",
        opacity: 0,
        visible: 0,
        width: box.containerBox.width,
        height: box.containerBox.height,
        waitingIconFile: "components/ui-waiting-view/clock.png",
        coverBackgroundColor: "rgba(0, 0, 0, 0.4)",
    };

    box.props(defaults, params);

    box.show = function() {

        box.visible = 1;
        box.withMotion(function(self) {
            box.opacity = 1;
        });
        
    }
    
    box.hide = function() {
    
        box.withMotion(function(self) {
            box.opacity = 0;
        });
        setTimeout(function() {
            box.visible = 0;
        }, 250);
    
    }

    // *** OBJECT MODEL:
    box.setMotion("opacity 0.2s");
    
    // BOX: Cover.
    box.boxCover = createBox(0, 0, box.width, box.height);
    box.add(that);
    that.color = box.coverBackgroundColor;

    // IMAGE: Logo image.
    box.imgLogo = createImage();
    box.add(that);
    that.width = 50;
    that.height = 50;
    that.load(box.waitingIconFile);
    that.opacity = 1;
    that.center();

    // Show at:
    box.left = 0;
    box.top = 0;

    makeBasicObject(box);
    return box;

};

/*
const waitingView = {};

UICore.createDefaultValues(waitingView, {
    coverWidth: "container-width",
    coverHeight: "container-height",
    waitingIconFile: "components/ui-waiting-view/clock.png",
    coverBackgroundColor: "rgba(0, 0, 0, 0.4)",
});

waitingView.create = function(parameters = {}) {

    // BOX: UI Object container.
    const box = createBox();
    waitingView.box = box;

    // Default values.
    UICore.parseParameters(waitingView.default, parameters);

    if (waitingView.default.coverWidth == "container-width") {
        waitingView.default.coverWidth = waitingView.box.containerBox.width;
    }

    if (waitingView.default.coverHeight == "container-height") {
        waitingView.default.coverHeight = waitingView.box.containerBox.height;
    }

    // *** OBJECT MODEL:
    box.border = 0;
    box.color = "transparent";
    box.opacity = 0;
    box.visible = 0;
    box.width = waitingView.default.coverWidth;
    box.height = waitingView.default.coverHeight;
    box.setMotion("opacity 0.2s");
    
    // BOX: Cover.
    box.boxCover = createBox(0, 0, waitingView.default.coverWidth, waitingView.default.coverHeight);
    box.add(that);
    that.color = waitingView.default.coverBackgroundColor;

    // IMAGE: Logo image.
    box.imgLogo = createImage();
    box.add(that);
    that.width = 50;
    that.height = 50;
    that.load(waitingView.default.waitingIconFile);
    that.opacity = 1;
    that.center();

    // Show at:
    box.left = 0;
    box.top = 0;

}

waitingView.show = function() {

    waitingView.box.visible = 1;
    waitingView.box.withMotion(function(self) {
        waitingView.box.opacity = 1;
    });
    
}

waitingView.hide = function() {

    waitingView.box.withMotion(function(self) {
        waitingView.box.opacity = 0;
    });
    setTimeout(function() {
        waitingView.box.visible = 0;
    }, 250);

}
*/