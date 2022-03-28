
var subUsageExamContent = {}

subUsageExamContent.createIn = function(box) {

    subUsageExamContent.box = box
    box.color = "white"
    
    // LABEL: Sayfanın ortasındaki yazı
    box.lblContent = createLabel(0, 0, "auto", "auto")
    box.add(that)
    that.text = "Sub Usage Example."
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(subUsageExamContent.writeMessage)
    that.onResize(function(self) {
        self.center()
    })
}

subUsageExamContent.open = function() {
    navigationBar.setVisible(1)
    navigationBar.setTitle("Sub View")
    navigationBar.backButton.setVisible(1)
    navigationBar.menuButton.setVisible(1)
    tabBar.setVisible(0)
    defaultView.setTopAndBottom(navigationBar.HEIGHT, 0)
    defaultView.createAndShowContent(subUsageExamContent)
}

subUsageExamContent.writeMessage = function() {
    print("İçerik Sayfası")
}