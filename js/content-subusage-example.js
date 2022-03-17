
var subUsageExamContent = {}

// BOX: İçerik taşıyıcısı
subUsageExamContent.box

subUsageExamContent.createIn = function(boxView) {

    subUsageExamContent.box = boxView

    subUsageExamContent.box.color = "white"
    
    // LABEL: Sayfanın ortasındaki yazı
    subUsageExamContent.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sub Usage Example"
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(subUsageExamContent.writeMessage)
    that.onResize(function(self) {
        self.center()
    })

    // NESNE: Tam ekran içeriği kapatma butonu
    /*
    boxView.btnClose = closeButton.create()
    that.onClick(function() {
        subUsageExamContent.box.visible = 0
    })
    */
}

subUsageExamContent.open = function() {
    navigationBar.setVisible(1)
    navigationBar.setTitle("Sub View")
    navigationBar.backButton.setVisible(1)
    navigationBar.menuButton.setVisible(1)
    tabBar.setVisible(0)
    defaultView.setTopAndBottomSpaces(navigationBar.HEIGHT, 0)
    defaultView.createAndShowContent(subUsageExamContent)
}

subUsageExamContent.writeMessage = function() {
    print("İçerik Sayfası")
}