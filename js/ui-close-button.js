/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var closeButton = {}

closeButton.onClickFunc_btnClose = function() {}

closeButton.create = function() {

    closeButton.btnClose = createImage(20, 30, 40, 40)
    that.load("images/ui-close-button/close-button.svg")
    that.right = 30
    that.border = 0
    that.color = "white"
    that.borderColor = "lightgray"
    that.round = closeButton.btnClose.width
    that.space = 4
    that.opacity = 0.5
    that.onClick(function(self) {
        closeButton.onClickFunc_btnClose(self)
    })

    makeBasicObject(that)
    return closeButton.btnClose
}

closeButton.setVisible = function(visible) {
    closeButton.btnClose.visible = visible
}