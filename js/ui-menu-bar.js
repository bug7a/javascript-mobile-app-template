
// NOT: Bu sadece bir taslaktır. Bu tasarım, tamamen özelleştirilebilir.

// NESNE: Sol menü
var menuBar = {}
menuBar.lockScreenButton = {}

menuBar.onClickFunc = function() {}

menuBar.create = function() {

    // BOX: Taşıyıcı
    menuBar.box = createBox(0, 0, 600, page.height)
    that.color = "rgba(0, 0, 0, 0.8)"
    that.border = 0
    that.visible = 0
    that.setMotion("opacity 0.3s, transform 0.3s")

    // BOX: Beyaz arka plan
    menuBar.box.b1 = createBox(200, 0, 400, page.height)
    that.border = 0

    // IMAGE: Kapatma düğmesi
    menuBar.box.b1.btnClose = createImage(0, 0, 50, 50)
    that.load("images/ui-menu-bar/close.svg")
    that.right = 30
    that.top = 30
    that.borderColor = "lightgray"
    that.space = 12
    that.round = 8
    that.onClick(function() {
        menuBar.hide()
    })

    // Özel tasarımlar yapılabilir.

    // BOX: Kilitmeleme düğmesi arka plan
    menuBar.box.b1.boxLock = createBox(0, 0, 172, 52)
    that.color = "white"
    that.borderColor = "lightgray"
    that.border = 1
    that.round = 8
    that.left = 50
    that.bottom = 55

    // IMAGE: Kilitleme düğmesi resimi
    menuBar.box.b1.boxLock.imgLock = createImage(8, 10, 30, 30)
    that.load("images/ui-menu-bar/lock.png")

    // LABEL: Kilitleme düğmesi yazısı
    menuBar.box.b1.boxLock.lblLock = createLabel(46, 12, "auto", 50)
    that.text = "Lock Screen"

    // menuBar.hide()

}

menuBar.setItems = function(list) {

    //menuBar.removeAll()

    for (var i = 0; i < list.length; i++) {
        menuBar.addItem(list[i], i)
    }
}

menuBar.lastButtonTop = 140

menuBar.addItem = function(buttonText, contentIndex) {

    // BUTTON: Menü butonları
    var btnItem = createButton(50, menuBar.lastButtonTop)
    that.index = contentIndex
    that.contentId = buttonText.contentId
    that.width = "auto"
    that.textAlign = "left"
    that.minimal = 1
    that.color = "transparent"
    that.text = buttonText.title
    that.fontSize = 26
    that.onClick(function(self) {
        menuBar.hide()
        menuBar.onClickFunc(self.contentId)
    })

    menuBar.box.b1.add(btnItem)

    menuBar.lastButtonTop += 55
}

menuBar.show = function() {
    menuBar.box.visible = 1
    // MOTION:
    menuBar.box.dontMotion()
    menuBar.box.element.style.transform = "scale(1.4)"
    menuBar.box.opacity = 0
    menuBar.box.withMotion(function(self) {
        self.canMotionNow()
        self.element.style.transform = "scale(1)"
        self.opacity = 1
    })
}

menuBar.hide = function() {
    
    // MOTION:
    menuBar.box.dontMotion()
    menuBar.box.element.style.transform = "scale(1)"
    menuBar.box.opacity = 1
    menuBar.box.withMotion(function(self) {
        self.canMotionNow()
        self.element.style.transform = "scale(1.4)"
        self.opacity = 0
        setTimeout(function() {
            menuBar.box.visible = 0
        }, 200)
    })
}

menuBar.onClick = function(func) {
    menuBar.onClickFunc = func
}

menuBar.lockScreenButton.onClick = function(func) {
    menuBar.box.b1.boxLock.onClick(func)
}