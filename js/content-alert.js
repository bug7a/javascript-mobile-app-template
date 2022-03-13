
var alertContent = {}

// BOX: İçerik taşıyıcısı
alertContent.box

alertContent.createIn = function(boxView) {

    alertContent.box = boxView

    page.color = "#EB6853"
    alertContent.box.color = "#EB6853"

    alertContent.box.b1 = createBox(0, 0, 250, 104)
    that.color = "transparent"
    that.center()

    alertContent.box.b1.btnOpenView1 = createButton(0, 0, 250)
    that.text = "Open Sub View"
    that.color = "white"
    that.minimal = 1
    that.onClick(function(self) {
        contentController.openContentById("test-secondview")
    })

    alertContent.box.b1.btnOpenView2 = createButton(0, 0, 250)
    that.text = "Open Second View"
    that.color = "white"
    that.minimal = 1
    that.aline(alertContent.box.b1.btnOpenView1, "bottom", 4)
    that.onClick(function(self) {
        secondUsageExamContent.open()
        secondView.setVisible(1)
    })
}

alertContent.open = function() {

    navigationBar.setVisible(1)
    navigationBar.setTitle("Notifications")
    navigationBar.backButton.setVisible(0)
    navigationBar.menuButton.setVisible(1)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(2)
    normalView.resize(navigationBar.HEIGHT, tabBar.HEIGHT)
    normalView.loadContent(alertContent)
}

alertContent.writeMessage = function() {
    print("Uyarılar Sayfası")
}