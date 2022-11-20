/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 7 July 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-waiting-view.htm


*/

"use strict";
const waitingView = {};

waitingView.default = {};
waitingView.default.coverBackground = "rgba(0, 0, 0, 0.4)";
waitingView.default.waitingIconFile = "js/component/ui-waiting-view/clock.png";

waitingView.create = function() {

    // BOX: UI Object container.
    const box = createBox();
    waitingView.box = box;

    box.border = 0;
    box.color = "transparent";
    box.opacity = 0;
    box.visible = 0;
    box.width = getDefaultContainerBox().width;
    box.height = getDefaultContainerBox().height;
    box.setMotion("opacity 0.2s");
    
    // BOX: Cover.
    box.boxCover = createBox(0, 0, getDefaultContainerBox().width, getDefaultContainerBox().height);
    box.add(that);
    that.color = waitingView.default.coverBackground;

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