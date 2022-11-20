/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


topBar.setTitleAlign("center"); // center, left


*/

const topBar = {};
topBar.backButton = {};
topBar.menuButton = {};
topBar.backButton.onClickFunc = function() {};
topBar.menuButton.onClickFunc = function() {};

topBar.default = {};
topBar.resetDefault = function() {
    topBar.default.height = 105;
}
topBar.resetDefault();

topBar.create = function() {

    // BOX: Object container.
    topBar.box = createBox();
    that.width = basic.getDefaultContainerBox().width;
    that.height = topBar.default.height;
    that.border = 0;
    that.color = "white";
    //that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.1)";
    that.borderColor = "rgba(0, 0, 0, 0)";
    that.element.style.borderBottomWidth = "2px";
    that.visible = 0;
    that.opacity = 0;
    that.top = -1 * that.height;
    that.left = 0;
    that.setMotion("top 0.2s, opacity 0.2s");

    // IMAGE: Go back button.
    topBar.box.btnBack = createImage(20, 32, 34, 34);
    topBar.box.add(that);
    that.load("assets/ui-top-bar/back.svg");
    that.space = 0;
    that.visible = 0;
    that.opacity = 0.8;
    that.bottom = 24;
    //that.border = 1;
    that.onClick(function() {
        topBar.backButton.onClickFunc();
    })

    // LABEL: Title text.
    topBar.box.lblTitle = createLabel(0, 37, 400); // top 37
    topBar.box.add(that);
    that.textAlign = "center";
    that.element.style.fontFamily = "opensans-bold";
    that.fontSize = 28; //28
    that.textColor = "rgba(0, 0, 0, 0.8)";
    that.bottom = 24;
    //that.top = 37;
    //that.border = 1;
    that.center("left");

    // IMAGE: Open/close menu button.
    topBar.box.btnMenu = createImage(0, 0, 40, 40);
    topBar.box.add(that);
    that.load("assets/ui-top-bar/menu6.svg");
    that.border = 0;
    that.borderColor = "lightgray";
    that.space = 8;
    that.round = 8;
    that.right = 20;
    //that.top = 30;
    that.bottom = 24;
    that.opacity = 0.8;
    that.visible = 0;
    //that.border = 1;
    that.onClick(function() {
        topBar.menuButton.onClickFunc();
    });

}

topBar.setTitle = function(titleText) {
    topBar.box.lblTitle.text = titleText;
}

topBar.setTitleAlign = function(alignType) {

    if (alignType == "center") {

        topBar.box.lblTitle.center("left");
        topBar.box.lblTitle.textAlign = "center";

    } else if (alignType == "left") {

        topBar.box.lblTitle.left = 20;
        topBar.box.lblTitle.textAlign = "left";

    }

}

topBar.setSubTitle = function(subTitleText) {
    // No sub title.
}

topBar.setVisible = function(visible) {

    if (visible != topBar.box.visibleValue) {

        topBar.box.visibleValue = visible;

        if (visible) {

            clearTimeout(topBar.box.visibleTimeout);

            topBar.box.top = -1 * topBar.box.height;
            topBar.box.opacity = 0;
            topBar.box.visible = 1;
            topBar.box.withMotion(function(self) {
                self.top = 0;
                self.opacity = 1;
            });

        } else {

            topBar.box.withMotion(function(self) {
                self.top = -1 * self.height;
                self.opacity = 0;
                topBar.box.visibleTimeout = setTimeout(function() {
                    topBar.box.visible = 0;
                }, 250);
            });

        }

    }

    /*
    if (visible) {

        topBar.box.opacity = 0;
        topBar.box.top = 300 - topBar.box.height;
        topBar.box.visible = 1;
        topBar.box.withMotion(function(self) {
            self.top = 0;
            topBar.box.opacity = 1;
        })

    } else {
        topBar.box.visible = 0;
    }
    */
    
}

topBar.getVisible = function() {
    return topBar.box.visible;
}

topBar.backButton.setVisible = function(visible) {
    topBar.box.btnBack.visible = visible;
}

topBar.menuButton.setVisible = function(visible) {
    topBar.box.btnMenu.visible = visible;
}

topBar.backButton.onClick = function(func) {
    topBar.backButton.onClickFunc = func;
}

topBar.menuButton.onClick = function(func) {
    topBar.menuButton.onClickFunc = func;
}

topBar.getHeight = function() {
    return topBar.box.height;
}

topBar.setBorderLine = function(isShown) {
 
    if (isShown) {
        topBar.box.borderColor = "rgba(0, 0, 0, 0.1)";

    } else {
        topBar.box.borderColor = "rgba(0, 0, 0, 0)";
    }
    
}

topBar.setBackgroundColor = function(color) {
    topBar.box.color = color;
}

topBar.setTitleColor = function(color) {
    topBar.box.lblTitle.textColor = color;
}