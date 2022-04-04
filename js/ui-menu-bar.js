/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var menuBar = {}
menuBar.itemList = []
menuBar.lockScreenButton = {}
menuBar.onItemClickFunc = function() {}


menuBar.create = function() {

    // BOX: Object container box.
    menuBar.box = createBox(0, 0, global.USED_WIDTH, page.height)
    //that.color = "rgba(0, 0, 0, 0.8)"
    that.color = "transparent"
    that.border = 0
    that.visible = 0

    // BOX: half transparent background box.
    menuBar.box.boxBackground = createBox(0, 0, global.USED_WIDTH, page.height)
    menuBar.box.add(that)
    that.color = "rgba(0, 0, 0, 0.8)"
    that.onClick(function() {
        menuBar.setVisible(0)
    })

    // BOX: Menu container and background box.
    menuBar.box.b1 = createBox(0, 0, 400, page.height)
    menuBar.box.add(that)
    that.border = 0
    that.right = 0

    // You can add your custom objects:
    // BOX: Lock button background box.
    menuBar.box.b1.boxLock = createBox(0, 0, 172, 52)
    menuBar.box.b1.add(that)
    that.color = "white"
    that.borderColor = "lightgray"
    that.border = 1
    that.round = 8
    that.left = 50
    that.bottom = 55

    // IMAGE: Lock button icon.
    menuBar.box.b1.boxLock.imgLock = createImage(8, 10, 30, 30)
    menuBar.box.b1.boxLock.add(that)
    that.load("images/ui-menu-bar/lock.png")

    // LABEL: Lock button text.
    menuBar.box.b1.boxLock.lblLock = createLabel(46, 12, "auto", 50)
    menuBar.box.b1.boxLock.add(that)
    that.text = "Lock Screen"
}

menuBar.createItemsByDataList = function(list) {
    menuBar.removeItems()

    for (var i = 0; i < list.length; i++) {
        menuBar.addItem(list[i], i)
    }
}

menuBar.lastButtonTop = 140
menuBar.addItem = function(itemData, itemIndex) {

    // BUTTON: Menü butonları
    var btnItem = createButton(50, menuBar.lastButtonTop)
    that.index = itemIndex
    that.pageId = itemData.pageId
    that.width = "auto"
    that.textAlign = "left"
    that.minimal = 1
    that.color = "transparent"
    that.text = itemData.title
    that.fontSize = 26
    that.onClick(function(self) {
        menuBar.setVisible(0)
        menuBar.onItemClickFunc(self.pageId)
    })

    menuBar.itemList.push(btnItem)
    menuBar.box.b1.add(btnItem)
    menuBar.lastButtonTop += 55
}

menuBar.removeItems = function() {

    for (var i = 0; i < menuBar.itemList.length; i++) {
        menuBar.itemList[i].remove()
    }

    menuBar.lastButtonTop = 140
    menuBar.itemList = []
}

menuBar.setVisible = function(visible) {
    //menuBar.box.visible = visible
    shared.setVisibleWithMotion(menuBar.box, visible)
}

menuBar.onItemClick = function(func) {
    menuBar.onItemClickFunc = func
}

menuBar.lockScreenButton.onClick = function(func) {
    menuBar.box.b1.boxLock.onClick(func)
}