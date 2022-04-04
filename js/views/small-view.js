
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var smallView = {}

smallView.create = function() {

    // BOX: View container box.
    smallView.box = createBox(0, 
        0, 
        global.USED_WIDTH, 
        page.height
    )
    //that.color = "rgba(0, 0, 0, 0.8)"
    that.color = "transparent"
    that.visible = 0

    // BOX: background box.
    smallView.box.boxBackground = createBox(0, 0, global.USED_WIDTH, page.height)
    smallView.box.add(that)
    that.color = "rgba(0, 0, 0, 0.8)"
    that.onClick(function() {
        smallView.cleanAndHide()
    })

    // BOX: Content container box.
    smallView.box.b1 = createBox(0, 0, global.USED_WIDTH, 500)
    smallView.box.add(that)
    that.element.style.borderTopLeftRadius = "50px"
    that.element.style.borderTopRightRadius = "50px"
    that.bottom = 0
    
    smallView.removeOpenedPageInView()
}

smallView.removeOpenedPageInView = function() {

    smallView.box.b1.text = ""
    smallView.box.b1.color = "whitesmoke"
    smallView.box.b1.border = 0
    smallView.box.b1.scrollX = 1
}

smallView.getContainerBox = function() {
    return smallView.box.b1
}

smallView.setVisible = function(visible) {
    //smallView.box.visible = visible
    shared.setVisibleWithMotion(smallView.box, visible)
}

smallView.setHeight = function(height) {
    smallView.box.b1.height = height
}

smallView.cleanAndHide = function() {
    smallView.setVisible(0)

    if (global.settings.useMotionInTransitions) {
        setTimeout(function() {
            smallView.removeOpenedPageInView()
        }, 300)
    } else {
        smallView.removeOpenedPageInView()
    }
}