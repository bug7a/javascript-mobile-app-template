/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:

*/

var tabBar = {}

tabBar.HEIGHT = 80
tabBar.itemList = []
tabBar.selectedIndex = -1
tabBar.onChangeFunc = function() {}

tabBar.create = function() {

    // BOX: object container box
    tabBar.box = createBox()
    that.width = global.VIEW_WIDTH
    that.height = tabBar.HEIGHT
    that.left = 0
    that.color = "white"
    that.border = 0
    that.borderColor = "lightgray"
    // that.round = 20
    that.element.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.2)"
    that.element.style.textAlign = "center"
    that.setMotion("top 0.3s, opacity 0.3s")

    that.top = page.height
    that.opacity = 0
    that.withMotion(function(self) {
        self.top = page.height - tabBar.HEIGHT
        self.opacity = 1
    })

    // BOX: Selected item background highlight
    tabBar.box.boxHighLight = createBox(0, 0, 100, 100)
    that.round = 0
    that.setMotion("left 0.3s, background-color 0.3s")
}

tabBar.setItems = function(list) {

    tabBar.removeAll()

    for (var i = 0; i < list.length; i++) {
            tabBar.addItem(list[i], i)
    }
}

tabBar.addItem = function(item, index) {

    var itemName = "item" + tabBar.itemList.length

    // IMAGE: item image
    tabBar.box[itemName] = createImage()
    that.load(item.iconPath)
    that.width = tabBar.HEIGHT
    that.height = tabBar.HEIGHT
    that.space = 16
    that.opacity = 0.7
    that.itemIndex = index
    that.contentId = item.contentId
    that.setMotion("padding 0.3s, opacity 0.3s")

    // Koordinat sistemini devre dışı bırak:
    that.element.style.position = "relative"
    // Nesneler, satır dolana kadar; yan yana dizilir:
    that.element.style.display = "inline-block"

    that.onClick(function(self) {

        tabBar.setSelectedIndex(self.itemIndex)
        tabBar.onChangeFunc(self.contentId)
    })

    // tabBar.box.width = (tabBar.HEIGHT * (tabBar.itemList.length + 1)) + 20
    // tabBar.box.center("left")

    tabBar.itemList.push(that)

    makeBasicObject(that)

}

tabBar.setSelectedIndex = function(index) {

    tabBar.selectItem(tabBar.itemList[index])
}

tabBar.selectItem = function(item) {

    tabBar.unselect()
    tabBar.selectedIndex = item.itemIndex
    //item.load(item.clickedIconPath)
    item.space = 6
    item.opacity = 1

    tabBar.box.boxHighLight.left = item.element.offsetLeft - 12
    //tabBar.box.boxHighLight.color = "lightblue"
}

tabBar.unselect = function() {

    if (tabBar.selectedIndex != -1) {

        //tabBar.itemList[tabBar.selectedIndex].load(tabBar.itemList[tabBar.selectedIndex].item.clickedIconPath)
        tabBar.itemList[tabBar.selectedIndex].space = 16
        tabBar.itemList[tabBar.selectedIndex].opacity = 0.7
        tabBar.box.boxHighLight.left = tabBar.box.boxHighLight.width * -1
    }
}

tabBar.removeAll = function() {

    for (var i = 0; i < tabBar.itemList.length; i++) {
        tabBar.itemList[i].remove()
    }

    tabBar.itemList = []
    tabBar.selectedIndex = -1
}

tabBar.setVisible = function(visible) {

    if (visible == 1) {
        tabBar.box.top = page.height - tabBar.HEIGHT
        tabBar.box.opacity = 1

    } else {
        tabBar.box.top = page.height
        tabBar.box.opacity = 0
    }
}

tabBar.getVisible = function() {
    return tabBar.box.opacity
}

tabBar.onClick = function(func) {
    tabBar.onChangeFunc = func
}

