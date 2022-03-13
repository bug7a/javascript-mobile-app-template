
var contentNum6 = {}

// BOX: İçerik taşıyıcısı
contentNum6.box

contentNum6.create = function(boxView) {

    contentNum6.box = boxView

    contentNum6.box.color = "white"
    
    // LABEL: Sayfanın ortasındaki yazı
    contentNum6.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #6"
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(contentNum6.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

    // NESNE: Tam ekran içeriği kapatma butonu
    boxView.btnBack = backButton.create()
    that.onClick(function() {
        contentNum6.box.visible = 0
    })

}

contentNum6.writeMessage = function() {
    print("İçerik Sayfası")
}