
var contentNum8 = {}

contentNum8.createIn = function(box) {

    contentNum8.box = box
    
    // LABEL: Sayfanın ortasındaki yazı
    contentNum8.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #8"
    that.color = "rgba(0, 0, 0, 0.5)"
    that.textColor = contentNum8.box.color
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(contentNum8.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

}

contentNum8.writeMessage = function() {
    print("Başlangıç Sayfası")
}