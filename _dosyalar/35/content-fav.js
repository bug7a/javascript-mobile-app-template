
var contentFav = {}

// BOX: İçerik taşıyıcısı
contentFav.box

contentFav.create = function(boxView) {

    contentFav.box = boxView

    contentFav.box.color = "#FEC108"
    
    // LABEL: Sayfanın ortasındaki yazı
    contentFav.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #4"
    that.color = "rgba(255, 255, 255, 0.5)"
    that.textColor = contentFav.box.color
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(contentFav.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

}

contentFav.writeMessage = function() {
    print("Sık Kullanılanlar Sayfası")
}