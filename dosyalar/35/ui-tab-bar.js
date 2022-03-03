
var tabBar = {}

tabBar.HEIGHT = 80
tabBar.WIDTH = 600

tabBar.itemList = []
tabBar.selectedItemIndex = -1
tabBar.onSelectedIndexChanged = function() {}

tabBar.create = function() {

    tabBar.box = createBox()
    that.width = tabBar.WIDTH
    that.height = tabBar.HEIGHT
    that.bottom = 0
    that.left = 0
    that.color = "white"
    that.border = 0
    that.borderColor = "lightgray"
    // that.round = 20
    that.element.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.2)"
    that.element.style.textAlign = "center"

    return tabBar.box

}

tabBar.addItem = function(iconName) {

    tabBar.box["item" + tabBar.itemList.length] = createImage()
    that.load("resimler/35/ui-tab-bar/" + iconName + ".svg")
    that.width = tabBar.HEIGHT
    that.height = tabBar.HEIGHT
    that.space = 16
    that.itemIndex = tabBar.itemList.length
    that.iconName = iconName

    // Koordinat sistemini devre dışı bırak:
    that.element.style.position = "relative"
    // Nesneler, satır dolana kadar; yan yana dizilir:
    that.element.style.display = "inline-block"

    that.onClick(function(self) {

        tabBar.selectItem(self)
        tabBar.onSelectedIndexChanged(self.itemIndex)

    })

    // tabBar.box.width = (tabBar.HEIGHT * (tabBar.itemList.length + 1)) + 20
    // tabBar.box.center("left")

    tabBar.itemList.push(that)

}

tabBar.selectItemByIndex = function(index) {

    tabBar.selectItem(tabBar.itemList[index])

}

tabBar.selectItem = function(item) {

    tabBar.unselect()
    tabBar.selectedItemIndex = item.itemIndex
    item.load("resimler/35/ui-tab-bar/" + item.iconName + "-clicked.svg")
    item.space = 6

}

tabBar.unselect = function() {

    if (tabBar.selectedItemIndex != -1) {

        tabBar.itemList[tabBar.selectedItemIndex].load("resimler/35/ui-tab-bar/" + tabBar.itemList[tabBar.selectedItemIndex].iconName + ".svg")
        tabBar.itemList[tabBar.selectedItemIndex].space = 16

    }
    
}

tabBar.removeAllItems = function() {

    tabBar.itemList = []
    tabBar.selectedItemIndex = -1
    tabBar.box.html = ""

}

tabBar.setVisible = function(visible) {

    tabBar.box.visible = visible

}

tabBar.onClick = function(func) {

    tabBar.onSelectedIndexChanged = func

}

