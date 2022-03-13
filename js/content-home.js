
var homeContent = {}

// BOX: İçerik taşıyıcısı
homeContent.box

homeContent.createIn = function(boxView) {

    homeContent.box = boxView

    page.color = "#5ABB9F"
    homeContent.box.color = "#5ABB9F"
    
    // LABEL: Sayfanın ortasındaki yazı
    homeContent.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "HOME"
    that.color = "rgba(255, 255, 255, 0.5)"
    that.textColor = homeContent.box.color
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(homeContent.writeMessage)
    that.onResize(function(self) {
        self.center()
    })
}

homeContent.open = function() {

    navigationBar.setVisible(0)
    //navigationBar.setTitle("Başlangıç")
    //navigationBar.backButton.hide()
    //navigationBar.menuButton.hide()

    tabBar.setVisible(1)
    tabBar.setSelectedIndex(0)
    normalView.loadContent(homeContent)

}

homeContent.writeMessage = function() {
    print("Başlangıç Sayfası")
    //contentController.openContentById("search")
    homeContent.onContentChangeFunc("search")
}