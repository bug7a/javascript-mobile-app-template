/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/

*/

var CloseButton = {}

createUICloseButton = function() {

    var box = createBox(20, 30, 40, 40)
    that.right = 30
    that.border = 0
    that.color = "transparent"
    that.borderColor = "lightgray"
    that.round = box.width
    that.opacity = 1

    box.imgClose = createImage(0, 0, 40, 40)
    box.add(that)
    that.load("js/components/ui-close-button/close-button.svg")
    that.border = 0
    that.color = "transparent"
    that.borderColor = "lightgray"
    that.round = box.width
    that.space = 6
    that.opacity = 0.4

    makeBasicObject(box)
    return box
}