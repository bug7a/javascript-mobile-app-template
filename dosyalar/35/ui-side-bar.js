
// NOT: Bu sadece bir taslaktır. Bu tasarım, tamamen özelleştirilebilir.

// NESNE: Sol menü
var sideBar = {}

sideBar.onClickFunc = function() {}

sideBar.create = function() {

    // BOX: Taşıyıcı
    sideBar.box = createBox(0, 0, 600, page.height)
    that.color = "rgba(0, 0, 0, 0.8)"
    that.border = 0

    // BOX: Beyaz arka plan
    sideBar.box.b1 = createBox(200, 0, 400, page.height)
    that.border = 0

    // IMAGE: Kapatma düğmesi
    sideBar.box.b1.btnClose = createImage(0, 0, 50, 50)
    that.load("resimler/35/ui-side-bar/close.svg")
    that.right = 30
    that.top = 30
    that.borderColor = "lightgray"
    that.space = 12
    that.round = 8
    that.onClick(function() {
        sideBar.box.visible = 0
    })

    // Özel tasarımlar yapılabilir.

    // BOX: Kilitmeleme düğmesi arka plan
    sideBar.box.b1.boxLock = createBox(0, 0, 172, 52)
    that.color = "white"
    that.borderColor = "lightgray"
    that.border = 1
    that.round = 8
    that.left = 50
    that.bottom = 55

    // IMAGE: Kilitleme düğmesi resimi
    sideBar.box.b1.boxLock.imgLock = createImage(8, 10, 30, 30)
    that.load("resimler/35/ui-side-bar/lock.png")

    // LABEL: Kilitleme düğmesi yazısı
    sideBar.box.b1.boxLock.lblLock = createLabel(46, 12, "auto", 50)
    that.text = "Ekranı Kilitle"

    sideBar.hide()

}

sideBar.lastButtonTop = 140

sideBar.addItem = function(buttonText, contentIndex) {

    // BUTTON: Menü butonları
    var btnItem = createButton(50, sideBar.lastButtonTop)
    that.index = contentIndex
    that.width = "auto"
    that.textAlign = "left"
    that.minimal = 1
    that.color = "transparent"
    that.text = buttonText
    that.fontSize = 26
    that.onClick(function(self) {
        sideBar.hide()
        sideBar.onClickFunc(self.index)
    })

    sideBar.box.b1.add(btnItem)

    sideBar.lastButtonTop += 55

}

sideBar.show = function() {
    sideBar.box.visible = 1
}

sideBar.hide = function() {
    sideBar.box.visible = 0
}

sideBar.onClick = function(func) {
    sideBar.onClickFunc = func
}