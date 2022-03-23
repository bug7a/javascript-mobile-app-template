
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
        global.CONTENT_WIDTH, 
        page.height
    )
    //that.color = "rgba(0, 0, 0, 0.8)"
    that.color = "transparent"
    that.setMotion("opacity 0.3s, transform 0.5s")
    that.visible = 0

    // BOX: background box.
    smallView.box.boxBackground = createBox(0, 0, global.CONTENT_WIDTH, page.height)
    that.color = "rgba(0, 0, 0, 0.8)"
    that.onClick(function() {
        smallView.setVisible(0)
    })

    // BOX: Content container box.
    smallView.box.b1 = createBox(0, 0, global.CONTENT_WIDTH, 500)
    that.element.style.borderTopLeftRadius = "50px"
    that.element.style.borderTopRightRadius = "50px"
    that.bottom = 0
    
    smallView.clean()
}

smallView.clean = function() {

    smallView.box.b1.text = ""
    smallView.box.b1.color = "whitesmoke"
    smallView.box.b1.border = 0
    smallView.box.b1.scrollX = 1
}

smallView.setVisible = function(visible) {

    if (visible != smallView.visible) {
        if (visible) {
            smallView.box.dontMotion()
            smallView.box.element.style.transform = "scale(1.4)"
            smallView.box.opacity = 0
            smallView.box.visible = 1
            smallView.box.withMotion(function(self) {
                self.element.style.transform = "scale(1)"
                self.opacity = 1
            })
        } else {
            smallView.box.dontMotion()
            smallView.box.element.style.transform = "scale(1)"
            smallView.box.opacity = 1
            smallView.box.withMotion(function(self) {
                self.element.style.transform = "scale(1.4)"
                self.opacity = 0
                setTimeout(function() { 
                    smallView.box.visible = 0
                    smallView.clean()
                }, 300)
            })
        }
    }
}

smallView.createAndShowContent = function(content) {

    smallView.clean()
    content.createIn(smallView.box.b1)

    smallView.setVisible(1)
}

smallView.setHeight = function(height) {
    smallView.box.b1.height = height
}