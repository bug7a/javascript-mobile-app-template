/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var navigationBar = {}
navigationBar.backButton = {}
navigationBar.menuButton = {}

navigationBar.HEIGHT = 105
navigationBar.backButton.onClickFunc = function() {}
navigationBar.menuButton.onClickFunc = function() {}

navigationBar.create = function() {

    // BOX: Object container box.
    navigationBar.box = createBox(0, 0, global.USED_WIDTH, navigationBar.HEIGHT)
    that.border = 0
    that.color = "white"
    that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.1)"
    //that.setMotion("top 0.3s, opacity 0.3s")
    that.top = 0
    //that.opacity = 0
    that.visible = 0

    // IMAGE: Go back button.
    navigationBar.box.btnBack = createImage(30, 32, 50, 50)
    navigationBar.box.add(that)
    that.load("images/ui-navigation-bar/back.svg")
    that.space = 4
    that.visible = 0
    that.opacity = 0.8
    that.onClick(function() {
        navigationBar.backButton.onClickFunc()
    })

    // LABEL: Title text.
    navigationBar.box.lblTitle = createLabel(0, 37, 400)
    navigationBar.box.add(that)
    that.textAlign = "center"
    that.element.style.fontFamily = "opensans-bold"
    that.fontSize = 28
    that.center("left")
    that.setMotion("opacity 0.3s, transform 0.3s")

    // IMAGE: Open/close menu button.
    navigationBar.box.btnMenu = createImage(0, 0, 50, 50)
    navigationBar.box.add(that)
    that.load("images/ui-navigation-bar/menu6.svg")
    that.border = 0
    that.borderColor = "lightgray"
    that.space = 8
    that.round = 8
    that.right = 30
    that.top = 30
    that.opacity = 0.8
    that.visible = 0
    that.onClick(function() {
        navigationBar.menuButton.onClickFunc()
    })
}

navigationBar.setTitle = function(titleText) {

    navigationBar.box.lblTitle.dontMotion()
    navigationBar.box.lblTitle.element.style.transform = "scale(1.4)"
    navigationBar.box.lblTitle.opacity = 0
    navigationBar.box.lblTitle.withMotion(function(self) {
        self.element.style.transform = "scale(1)"
        self.opacity = 1
    })
    navigationBar.box.lblTitle.text = titleText
}

navigationBar.setSubTitle = function(subTitleText) {

}

navigationBar.setColor = function(color) {
    navigationBar.box.color = color
}

navigationBar.setVisible = function(visible) {
    //navigationBar.box.visible = visible
    shared.setVisibleWithMotion(navigationBar.box, visible)
}

navigationBar.getVisible = function() {
    return navigationBar.box.visible
}

navigationBar.backButton.setVisible = function(visible) {
    navigationBar.box.btnBack.visible = visible   
}

navigationBar.menuButton.setVisible = function(visible) {
    navigationBar.box.btnMenu.visible = visible
}

navigationBar.backButton.onClick = function(func) {
    navigationBar.backButton.onClickFunc = func
}

navigationBar.menuButton.onClick = function(func) {
    navigationBar.menuButton.onClickFunc = func
}