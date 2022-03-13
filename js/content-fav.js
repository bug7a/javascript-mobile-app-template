
var favContent = {}

// BOX: İçerik taşıyıcısı
favContent.box

favContent.createIn = function(boxView) {

    favContent.box = boxView

    page.color = "white"
    favContent.box.color = "white"
    
    // LABEL: Sayfanın ortasındaki yazı
    /*
    favContent.box.lblContent = createLabel(0, 0, "auto", "auto")
    that.text = "Sayfa İçeriği #4"
    that.color = "rgba(255, 255, 255, 0.5)"
    that.textColor = favContent.box.color
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(favContent.writeMessage)
    that.onResize(function(self) {
        self.center()
    })
    */

    favContent.box.scrollY = 0
    favContent.box.html = document.getElementById("todo-app").innerHTML

}

favContent.open = function() {
    
    navigationBar.setVisible(0)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(3)
    normalView.resize(0, tabBar.HEIGHT)
    normalView.loadContent(favContent)
}

favContent.writeMessage = function() {
    print("Sık Kullanılanlar Sayfası")
}