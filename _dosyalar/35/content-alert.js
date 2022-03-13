
var contentAlert = {}

// BOX: İçerik taşıyıcısı
contentAlert.box

contentAlert.create = function(boxView) {

    contentAlert.box = boxView

    contentAlert.box.color = "#EB6853"
    
    // LABEL: Sayfanın ortasındaki yazı
    contentAlert.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #3"
    that.color = "rgba(255, 255, 255, 0.5)"
    that.textColor = contentAlert.box.color
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(contentAlert.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

}

contentAlert.writeMessage = function() {
    print("Uyarılar Sayfası")
}