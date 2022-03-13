
var contentHome = {}

// BOX: İçerik taşıyıcısı
contentHome.box

contentHome.create = function(boxView) {

    contentHome.box = boxView

    contentHome.box.color = "#5ABB9F"
    
    // LABEL: Sayfanın ortasındaki yazı
    contentHome.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #1"
    that.color = "rgba(255, 255, 255, 0.5)"
    that.textColor = contentHome.box.color
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(contentHome.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

}

contentHome.writeMessage = function() {
    print("Başlangıç Sayfası")
}