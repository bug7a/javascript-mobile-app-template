
var normalView = {}

normalView.create = function() {

    // BOX: Normal içerik taşıyıcısı
    normalView.box = createBox(0, 
        0, 
        global.VIEW_WIDTH, 
        page.height
    )
    that.setMotion("height 0.3s, top 0.3s, opacity 0.3s, transform 0.3s")

    normalView.clean()

}

normalView.clean = function() {

    normalView.box.text = ""
    normalView.box.color = "whitesmoke"
    normalView.box.border = 0
    normalView.box.scrollX = 0
    normalView.box.scrollY = 1

}

normalView.setVisible = function(visible) {
    normalView.box.visible = visible

}

normalView.getVisible = function() {
    return normalView.box.visible

}

normalView.loadContent = function(content) {

    normalView.clean()

    // Give some time for motion
    setTimeout(function() {
        content.createIn(normalView.box)
    }, 100)

    normalView.box.dontMotion()
    normalView.box.element.style.transform = "scale(1.4)"
    normalView.box.opacity = 0
    normalView.box.withMotion(function(self) {
        self.canMotionNow()
        self.element.style.transform = "scale(1)"
        self.opacity = 1
    })
}

normalView.resize = function(topSpace, bottomSpace) {
    normalView.box.top = topSpace
    normalView.box.height = page.height - topSpace - bottomSpace
}