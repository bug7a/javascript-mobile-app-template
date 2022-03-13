
var contentSetting = {}

// BOX: İçerik taşıyıcısı
contentSetting.box

contentSetting.create = function(boxView) {

    contentSetting.box = boxView

    contentSetting.box.color = "#773680"
    
    // LABEL: Sayfanın ortasındaki yazı
    contentSetting.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #5"
    that.color = "rgba(255, 255, 255, 0.5)"
    that.textColor = contentSetting.box.color
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(contentSetting.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

}

contentSetting.writeMessage = function() {
    print("Ayarlar Sayfası")
}