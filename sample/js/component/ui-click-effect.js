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
const clickEffect = {};
clickEffect.isActive = 1;
clickEffect.boxClick = null;

// Show click outomaticly.
clickEffect.create = function() {

    page.onClick(function(self) {

        if (clickEffect.isActive) {
            clickEffect.showClick();
        }

    });

}

clickEffect.setActive = function(value) {
    clickEffect.isActive = value;
}

// Show click manual.
clickEffect.showClick = function() {

    if (clickEffect.isActive) {

        if (!clickEffect.boxClick) {

            var lastSelectedBox = getDefaultContainerBox();
            if (lastSelectedBox != page) {
                setDefaultContainerBox(page);
            }

            var e = window.event;
            var posX = e.clientX;
            var posY = e.clientY;

            posX = basic.withPageZoom(posX);
            posY = basic.withPageZoom(posY);

            clickEffect.boxClick = createBox(posX - 40, posY - 40, 80, 80);
            //that.color = "#40A5AF"
            that.color = "#000000";
            that.round = 50;
            //that.color = "transparent";
            //that.border = 3;
            //that.borderColor = "#000000";
            that.setMotion("opacity 0.2s");
            that.opacity = 0.05;
            
            that.withMotion(function(self) {
                self.opacity = 0;
            })
            
            var _that = that;
            setTimeout(function() {
                _that.remove();
                clickEffect.boxClick = null;
            }, 250);

            setDefaultContainerBox(lastSelectedBox);

        }

    }
    
}