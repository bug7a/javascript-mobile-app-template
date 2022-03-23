
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

    // BOX: Normal içerik taşıyıcısı
    secondView.box = createBox(0, 
        0, 
        global.CONTENT_WIDTH, 
        page.height
    )
    that.setMotion("opacity 0.3s, transform 0.5s")
    
    secondView.clean()

    secondView.setVisible(0)

}

secondView.clean = function() {

    secondView.box.text = ""
    secondView.box.color = "whitesmoke"
    secondView.box.border = 0
    secondView.box.scrollX = 1

}

secondView.setVisible = function(visible) {

    if (visible != secondView.visible) {
        if (visible) {
            secondView.box.dontMotion()
            secondView.box.element.style.transform = "scale(1.4)"
            secondView.box.opacity = 0
            secondView.box.visible = 1
            secondView.box.withMotion(function(self) {
                self.element.style.transform = "scale(1)"
                self.opacity = 1
            })
        } else {
            secondView.box.dontMotion()
            secondView.box.element.style.transform = "scale(1)"
            secondView.box.opacity = 1
            secondView.box.withMotion(function(self) {
                self.element.style.transform = "scale(1.4)"
                self.opacity = 0
                setTimeout(function() { 
                    secondView.box.visible = 0
                    secondView.clean()
                }, 300)
            })
        }
    }

}

secondView.createAndShowContent = function(content) {

    secondView.clean()
    content.createIn(secondView.box)

    secondView.setVisible(1)
}