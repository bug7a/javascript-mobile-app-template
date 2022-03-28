
var secondUsageExamContent = {}

secondUsageExamContent.createIn = function(box) {

    secondUsageExamContent.box = box

    box.color = "white"
    
    // LABEL: Sayfanın ortasındaki yazı
    box.lblContent = createLabel(0, 0, "auto", "auto")
    box.add(that)
    that.text = "Second Usage Example:<br>Previous view did not unload.<br>It is waiting at back."
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
    box.btnClose = closeButton.create()
    box.add(that)
    that.onClick(function() {
        secondView.setVisible(0)
    })
}

secondUsageExamContent.open = function() {
    secondView.createAndShowContent(secondUsageExamContent)
}

secondUsageExamContent.writeMessage = function() {
    print("İçerik Sayfası")
}