
var contentNum7 = {}

// BOX: İçerik taşıyıcısı
contentNum7.box

contentNum7.create = function(boxView) {

    contentNum7.box = boxView

    contentNum7.box.color = "white"
    
    // LABEL: Sayfanın ortasındaki yazı
    contentNum7.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #7"
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(contentNum7.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

    // NESNE: Tam ekran içeriği kapatma butonu
    boxView.btnClose = closeButton.create()
    that.onClick(function() {
        contentNum7.box.upperObject.visible = 0
    })

}

contentNum7.writeMessage = function() {
    print("İçerik Sayfası")
}