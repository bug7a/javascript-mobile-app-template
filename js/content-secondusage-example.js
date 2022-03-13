
var secondUsageExamContent = {}

// BOX: İçerik taşıyıcısı
secondUsageExamContent.box

secondUsageExamContent.createIn = function(boxView) {

    secondUsageExamContent.box = boxView

    secondUsageExamContent.box.color = "white"
    
    // LABEL: Sayfanın ortasındaki yazı
    secondUsageExamContent.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Second Usage Example<br>Previous view did not unload.<br>It is waiting at back."
    that.textAlign = "center"
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(secondUsageExamContent.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

    // NESNE: Tam ekran içeriği kapatma butonu
    secondUsageExamContent.box.btnClose = closeButton.create()
    that.onClick(function() {
        secondView.setVisible(0)
    })
}

secondUsageExamContent.open = function() {
    secondView.loadContent(secondUsageExamContent)
}

secondUsageExamContent.writeMessage = function() {
    print("İçerik Sayfası")
}