/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var tabBar = {}

tabBar.HEIGHT = 80
tabBar.itemList = []
tabBar.selectedIndex = -1
tabBar.onItemClickFunc = function() {}

tabBar.create = function() {

    // BOX: Object container box.
    tabBar.box = createBox()
    that.width = global.USED_WIDTH
    that.height = tabBar.HEIGHT
    that.left = 0
    that.color = "white"
    that.border = 0
    that.borderColor = "lightgray"
    // that.round = 20
    that.element.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.2)"
    that.element.style.textAlign = "center"
    that.top = page.height - tabBar.HEIGHT
    that.visible = 0

    // BOX: Selected item background highlight.
    tabBar.box.boxHighLight = createBox(0, 5, 70, 70)
    tabBar.box.add(that)
    that.round = 50
    that.border = 0
    that.borderColor = "lightgray"
    that.color = "whitesmoke"
    that.opacity = 1
    that.setMotion("left 0.3s, background-color 0.3s")
}

tabBar.createItemsByDataList = function(list) {

    tabBar.removeItems()

    for (var i = 0; i < list.length; i++) {
            tabBar.addItem(list[i], i)
    }
}

tabBar.addItem = function(itemData, itemIndex) {

    var itemName = "item" + tabBar.itemList.length

    // IMAGE: item image
    tabBar.box[itemName] = createImage()
    tabBar.box.add(that)
    that.load(itemData.iconPath)
    that.width = tabBar.HEIGHT
    that.height = tabBar.HEIGHT
    that.space = 16
    that.opacity = 0.7
    that.itemIndex = itemIndex
    that.pageId = itemData.pageId
    that.setMotion("padding 0.3s, opacity 0.3s")

    // Koordinat sistemini devre dışı bırak:
    that.element.style.position = "relative"
    // Nesneler, satır dolana kadar; yan yana dizilir:
    that.element.style.display = "inline-block"

    that.onClick(function(self) {
        tabBar.selectItemByIndex(self.itemIndex)
        tabBar.onItemClickFunc(self.pageId)
    })

    // tabBar.box.width = (tabBar.HEIGHT * (tabBar.itemList.length + 1)) + 20
    // tabBar.box.center("left")

    tabBar.itemList.push(that)
    makeBasicObject(that)
}

tabBar.selectItemByIndex = function(index) {
    tabBar.selectItem(tabBar.itemList[index])
}

tabBar.selectItem = function(item) {
    tabBar.unselectItem()
    tabBar.selectedIndex = item.itemIndex
    //item.load(item.clickedIconPath)
    item.space = 6
    item.opacity = 1

    tabBar.box.boxHighLight.left = item.element.offsetLeft + 5
    //tabBar.box.boxHighLight.color = "lightblue"
}

tabBar.unselectItem = function() {
    if (tabBar.selectedIndex != -1) {

        //tabBar.itemList[tabBar.selectedIndex].load(tabBar.itemList[tabBar.selectedIndex].item.clickedIconPath)
        tabBar.itemList[tabBar.selectedIndex].space = 16
        tabBar.itemList[tabBar.selectedIndex].opacity = 0.7
        tabBar.box.boxHighLight.left = tabBar.box.boxHighLight.width * -1
    }
}

tabBar.removeItems = function() {
    for (var i = 0; i < tabBar.itemList.length; i++) {
        tabBar.itemList[i].remove()
    }

    tabBar.itemList = []
    tabBar.selectedIndex = -1
}

tabBar.setVisible = function(visible) {
    //tabBar.box.visible = visible
    shared.setVisibleWithMotion(tabBar.box, visible)
}

tabBar.getVisible = function() {
    return tabBar.box.visible
}

tabBar.onItemClick = function(func) {
    tabBar.onItemClickFunc = func
}

