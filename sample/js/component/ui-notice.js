/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 1 September 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-notice.htm


HOW TO USE (COPY, PASTE CODE):

// UI NOTICE: Default values.
notice.resetDefault();
notice.default.backgroundColor = notice.colors.WHITE;
notice.default.coverBackgroundColor = "rgba(0, 0, 0, 0.2)";
notice.default.coverMotionString = "opacity 0.3s";
notice.default.fontSize = 20;
notice.default.round = 20;
notice.default.border = 0;
notice.default.borderColor = "rgba(0, 0, 0, 0.3)";
notice.default.spaceX = 24;
notice.default.spaceY = 18;
notice.default.shadow = "0px 0px 12px rgba(0, 0, 0, 0.2)";
notice.default.textMotionString = "opacity 0.3s, transform 0.3s";
notice.default.textColor = "rgba(0, 0, 0, 0.8)";
notice.default.displayTime = 2000;
notice.default.fontFamily = "opensans";
notice.default.motionTime = 300 + basic.motionController.WITH_MOTION_TIME;

// UI NOTICE: Object description.
notice.show({ messageText: "Process completed" });

notice.show({
    message: "No internet connection.", 
    backgroundColor: notice.colors.YELLOW
});

notice.show({
    message: "No internet connection.", 
    backgroundColor: notice.colors.RED,
    textColor: "#141414"
});

*/

"use strict";
const notice = {};

// SHARED VARIABLES:
notice.colors = {};
notice.colors.WHITE = "white";
notice.colors.YELLOW = "#FFD541";
notice.colors.RED = "#EE7553";
notice.colors.BLUE = "#689BD2";
notice.colors.GREEN = "seagreen";

notice.default = {};
notice.resetDefault = function() {

    notice.default.message = "No message";
    notice.default.backgroundColor = notice.colors.WHITE;
    notice.default.coverBackgroundColor = "rgba(0, 0, 0, 0.2)";
    notice.default.coverMotionString = "opacity 0.3s";
    notice.default.fontSize = 20;
    notice.default.round = 20;
    notice.default.border = 0;
    notice.default.borderColor = "rgba(0, 0, 0, 0.3)";
    notice.default.spaceX = 24;
    notice.default.spaceY = 18;
    notice.default.shadow = "0px 0px 12px rgba(0, 0, 0, 0.2)";
    notice.default.textMotionString = "opacity 0.3s, transform 0.3s";
    notice.default.textColor = "rgba(0, 0, 0, 0.8)";
    notice.default.displayTime = 2000;
    notice.default.fontFamily = "opensans";
    notice.default.motionTime = 300 + basic.motionController.WITH_MOTION_TIME;

}
notice.resetDefault();

notice.show = function(parameters = {}) {

    if (!notice.isShown) {

        // BOX: UI Object container.
        const box = createBox();

        // Default values.
        box.default = {};
        for (let parameterName in notice.default) {
            box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : notice.default[parameterName];
        }

        // *** PRIVATE VARIABLES:
        let privateVariable = "privateVariable";

        // *** PUBLIC VARIABLES:
        box.publicVariable = "publicVariable";

        // *** OBJECT MODEL:
        box.width = getDefaultContainerBox().width;
        box.height = getDefaultContainerBox().height;
        box.color = "transparent";

        // BOX: Cover background.
        box.boxBack = createBox(0, 0, box.width, box.height);
        box.add(that);
        that.opacity = 0;
        box.boxBack.color = box.default.coverBackgroundColor;
        box.boxBack.setMotion(box.default.coverMotionString);

        // LABEL: Message text.
        box.lblMessage = createLabel(0, 0, "auto", "auto");
        box.add(that);
        that.opacity = 0;
        that.onResize(function(self) {
            box.lblMessage.center();
        });
        box.lblMessage.fontSize = box.default.fontSize;
        box.lblMessage.textColor = box.default.textColor;
        box.lblMessage.text = box.default.message;
        box.lblMessage.color = box.default.backgroundColor;
        box.lblMessage.textAlign = "center";
        box.lblMessage.border = box.default.border;
        box.lblMessage.borderColor = box.default.borderColor;
        box.lblMessage.spaceX = box.default.spaceX;
        box.lblMessage.spaceY = box.default.spaceY;
        box.lblMessage.round = box.default.round;
        //box.lblMessage.element.style.fontFamily = "opensans-bold";
        box.lblMessage.element.style.fontFamily = box.default.fontFamily;
        box.lblMessage.element.style.boxShadow = box.default.shadow;
        that.element.style.transform = "scale(0.4)"
        that.setMotion(box.default.textMotionString);

        // *** PRIVATE METHODS:
        const privateMetod = function() {
            return "privateMetod";
        };

        // *** PUBLIC METHODS:
        box.publicMethod = function() {
            return "publicMethod";
        };
        
        // *** FIRST RUN CODE:

        box.left = 0;
        box.top = 0;

        // Show notice.
        notice.isShown = 1;
        box.withMotion(function(self) {

            box.lblMessage.element.style.transform = "scale(1)";
            box.boxBack.opacity = 1;
            box.lblMessage.opacity = 1;

        });
        
        // Close notice.
        setTimeout(function() {

            box.boxBack.opacity = 0;
            box.lblMessage.opacity = 0;
            box.lblMessage.element.style.transform = "scale(0.4)";
            setTimeout(function() {

                notice.isShown = 0;
                box.remove();
                
            }, box.default.motionTime);

        }, box.default.displayTime);

    }

}

// SHARED METHODS:
notice.sharedMethod = function() {
    return "sharedMethod";
};