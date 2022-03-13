
var smallView = {}

smallView.create = function() {

    // BOX: Normal içerik taşıyıcısı
    smallView.box = createBox(0, 
        0, 
        global.VIEW_WIDTH, 
        page.height
    )
    that.color = "rgba(0, 0, 0, 0.8)"
    that.setMotion("opacity 0.3s, transform 0.5s")

    smallView.box.b1 = createBox(0, 0, global.VIEW_WIDTH, 500)
    that.element.style.borderTopLeftRadius = "50px"
    that.element.style.borderTopRightRadius = "50px"
    that.bottom = 0
    
    smallView.clean()
    smallView.setVisible(0)

}

smallView.clean = function() {

    smallView.box.b1.text = ""
    smallView.box.b1.color = "whitesmoke"
    smallView.box.b1.border = 0
    smallView.box.b1.scrollX = 1

}

smallView.setVisible = function(visible) {

    smallView.box.visible = visible

}

smallView.loadContent = function(content) {

    smallView.clean()
    content.createIn(smallView.box.b1)

    smallView.box.dontMotion()
    smallView.box.element.style.transform = "scale(1.4)"
    smallView.box.opacity = 0
    smallView.box.withMotion(function(self) {
        self.canMotionNow()
        self.element.style.transform = "scale(1)"
        self.opacity = 1
    })

}