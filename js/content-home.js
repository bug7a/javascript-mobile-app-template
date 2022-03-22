
var homeContent = {}

homeContent.categoriesItemDataList = [
    { categoryId: "a", title: "Coffee", iconPath: "images/categories/coffee.png", searchText: "Coffee Hot" },
    { categoryId: "b", title: "Coffee Cup", iconPath: "images/categories/coffee-cup.png", searchText: "Coffee Cup Hot" },
    { categoryId: "c", title: "Iced Caffee", iconPath: "images/categories/iced-caffee.png", searchText: "Iced Caffee Cold" },
    { categoryId: "d", title: "Milkshake", iconPath: "images/categories/milkshake.png", searchText: "Milkshake Cold" },
    { categoryId: "e", title: "Chocolate", iconPath: "images/categories/chocolate-milk.png", searchText: "Chocolate Cold" },
    { categoryId: "f", title: "Cappuccino", iconPath: "images/categories/cappuccino.png", searchText: "Cappuccino Hot" },
    { categoryId: "g", title: "Tea", iconPath: "images/categories/tea.png", searchText: "Tea Hot" },
    { categoryId: "h", title: "Frappe", iconPath: "images/categories/frappe.png", searchText: "Frappe Cold" },
    { categoryId: "i", title: "Orange Juice", iconPath: "images/categories/orange-juice.png", searchText: "Orange Juice Cold" }
]

homeContent.cardsItemDataList = [
    { title: "Armchair", price: "50", iconPath: "images/cards/armchair.png", searchText: "i g h i" },
    { title: "Bed", price:"86", iconPath: "images/cards/bed.png", searchText: "h f g c" },
    { title: "Bunk", price:"120", iconPath: "images/cards/bunk.png", searchText: "g e g" },
    { title: "Desk", price:"95", iconPath: "images/cards/desk.png", searchText: "f d g c d a" },
    { title: "Couch", price:"110", iconPath: "images/cards/couch.png", searchText: "e c g b" },
    { title: "Bookcase", price:"40", iconPath: "images/cards/bookcase.png", searchText: "d b a" },
    { title: "Dressing Table", price:"67", iconPath: "images/cards/dressing-table.png", searchText: "c a g" }
]

homeContent.createIn = function(box) {

    // Out of this function, use "homeContent.box" for "box"
    homeContent.box = box
    box.color = "#5ABB9F"
    //box.color = "whitesmoke"
    //box.color = "gold"
    
    // UI TITLE: Categories title
    box.categoriesUITitle = shared.createRelativeUITitle("Categories", "white")

    // UI SEARCH BOX: Search box in categoriesUITitle
    box.categoriesUITitle.categoriesUISearchBox = createUISearchBox(0, 0, 200)
    that.right = 30
    that.bottom = 20
    //that.color = "white"
    //that.setWidth(300)
    //that.setPlaceholderText("")
    //that.border = 0

    // UI ITEM LIST: Categoriy items in horizontal list
    box.categoriesUIItemList = createUIItemList(0, 0, global.CONTENT_WIDTH, 200)
    that.color = "white"
    //that.color = "whitesmoke"
    that.element.style.position = "relative"
    that.setItemAlign("horizontal")
    that.setBorderSpaces(10, 0, 10, 0)
    that.setCreateFunctionOfItem(homeContent.createCategoryItem)
    that.setItemsWithData(homeContent.categoriesItemDataList)
    that.onItemClick(homeContent.selectClickedCategoryItem)
    
    // Connect search box with category item list
    box.categoriesUITitle.categoriesUISearchBox.onCharChange(box.categoriesUIItemList.searchItemByText)

    // UI TITLE: Cards title
    box.cardsUITitle = shared.createRelativeUITitle("Cards", "transparent")

    // UI ITEM LIST: Categoriy items in vertical list
    box.cardsUIItemList = createUIItemList(0, 0, global.CONTENT_WIDTH, 400)
    that.color = "transparent"
    //that.color = "white"
    that.element.style.position = "relative"
    that.setItemAlign("horizontal")
    that.setBorderSpaces(10, 0, 10, 0)
    that.setCreateFunctionOfItem(homeContent.createCardItem)
    that.setItemsWithData(homeContent.cardsItemDataList)
    that.onItemClick(homeContent.selectClickedCardItem)
    //that.selectItemByIndex(0)
    //that.selectItemByIndex(1)

    // Select category, after cardsUIItemList created. 
    // NOTE: We connected them in homeContent.selectClickedCategoryItem() function.
    box.categoriesUIItemList.selectItemByIndex(0)
}

homeContent.open = function() {

    navigationBar.setVisible(0)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(0)
    defaultView.setTopAndBottomSpaces(0, tabBar.HEIGHT)
    defaultView.createAndShowContent(homeContent)
}

homeContent.createCategoryItem = function(dataItem) {

    //var ITEM_WIDTH = 150
    var ITEM_WIDTH = 129

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 200)
    that.color = "transparent"

    // BOX: Item background box
    box.boxBackground = createBox(2, 5, ITEM_WIDTH - 4, 190)
    that.color = "transparent"
    that.round = 13
    that.setMotion("background-color 0.3s")

    // BOX: Icon background box
    box.boxIconBackground = createBox(0, 35, 90, 90)
    that.round = 50
    that.color = "rgba(255, 255, 255, 0.3)"
    that.setMotion("background-color 0.3s")
    that.center("left")

    // IMAGE: icon image
    box.imgIcon = createImage(0, 0, 70, 70)
    that.load(dataItem.iconPath)
    that.aline(box.boxIconBackground)
    that.left += 10
    that.top += 10
    that.setMotion("transform 0.3s")

    // LABEL: item name text
    box.lblName = createLabel(0, 0, ITEM_WIDTH, 30)
    that.text = dataItem.title
    that.bottom = 30
    that.textAlign = "center"

    makeBasicObject(box)
    return box
}

homeContent.selectClickedCategoryItem = function(uiItemList, itemObject, exItemObject) {

    if (itemObject.isSelected() == 0) {

        if (exItemObject) {
            exItemObject.boxBackground.color = "transparent"
            exItemObject.boxIconBackground.color = "rgba(255, 255, 255, 0.3)"
            exItemObject.lblName.element.style.fontFamily = "opensans"
            exItemObject.imgIcon.element.style.transform = "scale(1)"
            uiItemList.removeItemFromSelectedList(exItemObject)
        }

        // Selected item properties
        itemObject.boxBackground.color = "white"
        itemObject.boxIconBackground.color = "transparent"
        itemObject.lblName.element.style.fontFamily = "opensans-bold"
        itemObject.imgIcon.element.style.transform = "scale(1.5)"
        uiItemList.addItemToSelectedList(itemObject)

        print("Selected category: " + itemObject.getIndex() + "-" + itemObject.getData().title)

        // Filter cards by selected category id:
        if (homeContent.box.cardsUIItemList) {
            homeContent.box.cardsUIItemList.searchItemByText(itemObject.getData().categoryId)
        }
    }
}

homeContent.createCardItem = function(dataItem) {

    //var ITEM_WIDTH = 150
    var ITEM_WIDTH = 350

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 400)
    that.color = "transparent"

    // BOX: Item background box
    box.boxBackground = createBox(2, 10, ITEM_WIDTH - 4, 380)
    that.color = "rgba(255, 255, 255, 0.1)"
    that.round = 13
    that.border = 0
    that.borderColor = "rgba(255, 255, 255, 0.8)"
    that.setMotion("background-color 0.3s")

    // IMAGE: icon image
    box.imgIcon = createImage(0, 50, 200, 200)
    that.load(dataItem.iconPath)
    that.center("left")

    // LABEL: item name text
    box.lblName = createLabel(0, 300, ITEM_WIDTH, 38)
    that.text = dataItem.title
    that.fontSize = 28
    that.textAlign = "center"
    that.setMotion("top 0.3s")

    // LABEL: item price text
    box.lblPrice = createLabel(0, 0, "auto", "auto")
    that.text = "$" + dataItem.price
    that.top = 20
    that.right = 10
    that.color = "rgba(255, 255, 255, 0.4)"
    that.spaceX = 14
    that.spaceY = 4
    that.round = 6
    that.border = 2
    that.borderColor = "rgba(255, 255, 255, 0.8)"
    that.fontSize = 28
    that.element.style.fontFamily = "opensans-bold"
    /*
    that.aline(box.lblName, "bottom", 20)
    that.onResize(function(self) {
        self.center("left")
    })
    */
    
    // UI STEPPER: Count of product.
    box.countUIStepper = createUIStepper()
    that.connectedItemName = dataItem.title
    that.bottom = 35
    that.opacity = 0
    that.center("left")
    that.setMotion("opacity 0.3s, transform 0.3s")
    that.element.style.transform = "scale(0.1)"
    that.setMinimumRangeNumber(1)
    that.setMaximumRangeNumber(6)
    that.setNumber(1)
    that.color = "rgba(0, 0, 0, 0.08)"
    that.imgDecrease.border = 1
    that.imgIncrease.border = 1
    that.onNumberChange(function(self) {
        print("Stepper value (" + self.connectedItemName + "): " + self.getNumber())
    })
    // First cards stepper object global name:
    // homeContent.box.cardsUIItemList.getSelectedItemList()[0].countUIStepper

    makeBasicObject(box)
    return box
}

homeContent.selectClickedCardItem = function(uiItemList, itemObject, exItemObject) {

    // Multi selection
    if (itemObject.isSelected() == 0) {
        itemObject.boxBackground.border = 2
        //itemObject.boxBackground.borderColor = "rgba(255, 255, 255, 0.8)"
        itemObject.boxBackground.color = "rgba(255, 255, 255, 0.3)"
        itemObject.countUIStepper.element.style.transform = "scale(1)"
        itemObject.countUIStepper.opacity = 1
        itemObject.lblName.top = 270
        uiItemList.addItemToSelectedList(itemObject)

    } else {
        itemObject.boxBackground.border = 0
        //itemObject.boxBackground.borderColor = "rgba(255, 255, 255, 0.0)"
        itemObject.boxBackground.color = "rgba(255, 255, 255, 0.1)"
        itemObject.countUIStepper.element.style.transform = "scale(0.1)"
        itemObject.countUIStepper.opacity = 0
        itemObject.countUIStepper.setNumber(1)
        itemObject.lblName.top = 300
        uiItemList.removeItemFromSelectedList(itemObject)
    }
    print("Total selected cards: " + uiItemList.getSelectedItemList().length)
}