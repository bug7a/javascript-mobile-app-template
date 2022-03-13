
var secondView = {}

secondView.create = function() {

    // BOX: Normal içerik taşıyıcısı
    secondView.box = createBox(0, 
        0, 
        global.VIEW_WIDTH, 
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

    secondView.box.visible = visible

}

secondView.loadContent = function(content) {

    secondView.clean()
    content.createIn(secondView.box)

    secondView.box.dontMotion()
    secondView.box.element.style.transform = "scale(1.4)"
    secondView.box.opacity = 0
    secondView.box.withMotion(function(self) {
        self.canMotionNow()
        self.element.style.transform = "scale(1)"
        self.opacity = 1
    })
}