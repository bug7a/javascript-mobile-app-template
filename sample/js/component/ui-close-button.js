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
const UICloseButton = {};

UICloseButton.create = function() {

    // BOX: UI object container.
    const box = createBox(20, 30, 40, 40);
    that.right = 20;
    that.border = 0;
    that.color = "transparent";
    that.borderColor = "lightgray";
    that.round = 0;
    that.opacity = 1;

    // BOX: Background.
    box.background = createBox(0, 0, box.width, box.height);
    box.add(that);
    that.color = "white";
    that.border = 1;
    that.borderColor = "rgba(0, 0, 0, 0.8)";
    that.round = 8;

    // IMAGE: Close button image.
    box.imgClose = createImage(0, 0, box.width, box.height);
    box.add(that);
    that.load("js/component/ui-close-button/close-button.svg");
    that.space = 25;
    that.opacity = 0.6;

    makeBasicObject(box);
    return box;

}