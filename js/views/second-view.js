
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var secondView = {}

secondView.create = function() {

    // BOX: Container box.
    secondView.box = createBox(0, 
        0, 
        global.USED_WIDTH, 
        page.height
    )
    that.visible = 0

    secondView.removeOpenedPageInView()
}

secondView.removeOpenedPageInView = function() {

    secondView.box.html = ""
    secondView.box.color = "whitesmoke"
    secondView.box.border = 0
    secondView.box.scrollX = 0
    secondView.box.scrollY = 1
}

secondView.getContainerBox = function() {
    return secondView.box
}

secondView.setVisible = function(visible) {

    //secondView.box.visible = visible
    shared.setVisibleWithMotion(secondView.box, visible)
}

secondView.cleanAndHide = function() {
    secondView.setVisible(0)

    if (global.settings.useMotionInTransitions) {
        setTimeout(function() {
            smallView.removeOpenedPageInView()
        }, 300)
    } else {
        smallView.removeOpenedPageInView()
    }
}