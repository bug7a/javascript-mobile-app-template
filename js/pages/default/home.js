
var homePage = {}
homePage.ID = "home"

homePage.categoryItemDataList = [
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

homePage.cardItemDataList = [
    { title: "Armchair", price: "50", iconPath: "images/cards/armchair.png", searchText: "i g h i" },
    { title: "Bed", price:"86", iconPath: "images/cards/bed.png", searchText: "h f g c" },
    { title: "Bunk", price:"120", iconPath: "images/cards/bunk.png", searchText: "g e g" },
    { title: "Desk", price:"95", iconPath: "images/cards/desk.png", searchText: "f d g c d a" },
    { title: "Couch", price:"110", iconPath: "images/cards/couch.png", searchText: "e c g b" },
    { title: "Bookcase", price:"40", iconPath: "images/cards/bookcase.png", searchText: "d b a" },
    { title: "Dressing Table", price:"67", iconPath: "images/cards/dressing-table.png", searchText: "c a g" }
]

homePage.createInDefaultViewAndShow = function() {

    if (homePage.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
        // Out of this function, use "homePage.box" for "box".
        homePage.box = box

        navigationBar.setVisible(0)
        //navigationBar.setTitle("Title Text")
        //navigationBar.backButton.setVisible(1)
        //navigationBar.menuButton.setVisible(1)
        tabBar.setVisible(1)
        tabBar.selectItemByIndex(0)
        defaultView.setTopAndBottomOuterSpaces(0, tabBar.HEIGHT)
        //defaultView.setTopAndBottomOuterSpaces(navigationBar.HEIGHT, tabBar.HEIGHT)

        box.color = "#5ABB9F"

        // #1

        // UI TITLE: Category title.
        box.categoryUITitle = shared.createRelativeUITitle("Categories", "white")
        box.add(that)

        // UI SEARCH BOX: Search box in categoryUITitle.
        box.categoryUITitle.categoryUISearchBox = createUISearchBox(0, 0, 200)
        box.categoryUITitle.add(that)
        that.right = 30
        that.bottom = 20
        //that.color = "white"
        //that.setWidth(300)
        //that.setPlaceholderText("")
        //that.border = 0

        // #2
        
        // UI ITEM LIST: Categoriy items in horizontal list.
        box.categoryUIItemList = createUIItemList(0, 0, global.USED_WIDTH, 200)
        box.add(that)
        that.color = "white"
        //that.color = "whitesmoke"
        that.element.style.position = "relative"
        that.setItemAlign("horizontal")
        that.setInnerSpaces(10, 0, 10, 0)
        that.setCreateFunctionOfItem(homePage.createCategoryItem)
        that.createItemsByDataList(homePage.categoryItemDataList)
        that.onChange(homePage.selectClickedCategoryItem)
        
        // Connect search box with category item list.
        box.categoryUITitle.categoryUISearchBox.onSearch(function(uiSearchBox, searchText) {
            box.categoryUIItemList.searchItemByText(searchText)
        })

        // #3

        // UI TITLE: Cards title
        box.cardUITitle = shared.createRelativeUITitle("Cards", "transparent")
        box.add(that)

        // #4

        // UI ITEM LIST: Categoriy items in horizontal list.
        box.cardUIItemList = createUIItemList(0, 0, global.USED_WIDTH, 400)
        box.add(that)
        that.color = "transparent"
        //that.color = "white"
        that.element.style.position = "relative"
        that.setItemAlign("horizontal")
        that.setInnerSpaces(10, 0, 10, 0)
        that.setCreateFunctionOfItem(homePage.createCardItem)
        that.createItemsByDataList(homePage.cardItemDataList)
        that.onChange(homePage.selectClickedCardItem)
        //that.selectItemByIndex(0)
        //that.selectItemByIndex(1)

        // Select category, after cardUIItemList created. 
        // NOTE: We connected them in homePage.selectClickedCategoryItem() function.
        box.categoryUIItemList.selectItemByIndex(0)

        defaultView.pushIntoOpenedPageList(homePage)
        defaultView.setVisible(1)
        print("Opened page id: " + homePage.ID)
    }
}

homePage.createCategoryItem = function(itemData) {

    //var ITEM_WIDTH = 150
    var ITEM_WIDTH = 129

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 200)
    that.color = "transparent"

    // BOX: Item background box
    box.boxBackground = createBox(2, 5, ITEM_WIDTH - 4, 190)
    box.add(that)
    that.color = "transparent"
    that.round = 13
    that.setMotion("background-color 0.3s")

    // BOX: Icon background box
    box.boxIconBackground = createBox(0, 35, 90, 90)
    box.add(that)
    that.round = 50
    that.color = "rgba(255, 255, 255, 0.3)"
    that.setMotion("background-color 0.3s")
    that.center("left")
    
    // IMAGE: icon image
    box.imgIcon = createImage(0, 0, 70, 70)
    box.add(that)
    that.load(itemData.iconPath)
    that.aline(box.boxIconBackground)
    that.left += 10
    that.top += 10
    that.setMotion("transform 0.3s")

    // LABEL: item name text
    box.lblName = createLabel(0, 0, ITEM_WIDTH, 30)
    box.add(that)
    that.text = itemData.title
    that.bottom = 30
    that.textAlign = "center"

    makeBasicObject(box)
    return box
}

homePage.selectClickedCategoryItem = function(uiItemList, clickedItem, prevClickedItem) {

    if (clickedItem.isSelected() == 0) {

        if (prevClickedItem) {
            prevClickedItem.boxBackground.color = "transparent"
            prevClickedItem.boxIconBackground.color = "rgba(255, 255, 255, 0.3)"
            prevClickedItem.lblName.element.style.fontFamily = "opensans"
            prevClickedItem.imgIcon.element.style.transform = "scale(1)"
            uiItemList.removeItemFromSelectedList(prevClickedItem)
        }

        // Selected item properties
        clickedItem.boxBackground.color = "white"
        clickedItem.boxIconBackground.color = "transparent"
        clickedItem.lblName.element.style.fontFamily = "opensans-bold"
        clickedItem.imgIcon.element.style.transform = "scale(1.5)"
        uiItemList.addItemToSelectedList(clickedItem)

        print("Selected category: " + clickedItem.getIndex() + "-" + clickedItem.getData().title)

        // Filter cards by selected category id:
        if (homePage.box.cardUIItemList) {
            homePage.box.cardUIItemList.searchItemByText(clickedItem.getData().categoryId)
        }
    }
}

homePage.createCardItem = function(itemData) {

    //var ITEM_WIDTH = 150
    var ITEM_WIDTH = 350

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 400)
    that.color = "transparent"

    // BOX: Item background box
    box.boxBackground = createBox(2, 10, ITEM_WIDTH - 4, 380)
    box.add(that)
    that.color = "rgba(255, 255, 255, 0.1)"
    that.round = 13
    that.border = 0
    that.borderColor = "rgba(255, 255, 255, 0.8)"
    that.setMotion("background-color 0.3s")

    // IMAGE: icon image
    box.imgIcon = createImage(0, 50, 200, 200)
    box.add(that)
    that.load(itemData.iconPath)
    that.center("left")

    // LABEL: item name text
    box.lblName = createLabel(0, 300, ITEM_WIDTH, 38)
    box.add(that)
    that.text = itemData.title
    that.fontSize = 28
    that.textAlign = "center"
    that.setMotion("top 0.3s")

    // LABEL: item price text
    box.lblPrice = createLabel(0, 0, "auto", "auto")
    box.add(that)
    that.text = "$" + itemData.price
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
    
    // UI STEPPER: Count of product.
    box.countUIStepper = createUIStepper()
    box.add(that)
    that.connectedItemName = itemData.title
    that.bottom = 35
    that.opacity = 0
    that.center("left")
    that.setMotion("opacity 0.3s, transform 0.3s")
    that.element.style.transform = "scale(0.1)"
    that.setMinNumber(1)
    that.setMaxNumber(6)
    that.setValue(1)
    that.color = "rgba(0, 0, 0, 0.08)"
    that.imgDecrease.border = 1
    that.imgIncrease.border = 1
    that.onChange(function(self) {
        print("Stepper value (" + self.connectedItemName + "): " + self.getValue())
    })

    // First cards stepper object global name:
    // homePage.box.cardUIItemList.getSelectedItemList()[0].countUIStepper

    makeBasicObject(box)
    return box
}

homePage.selectClickedCardItem = function(uiItemList, clickedItem, prevClickedItem) {

    // Multi selection
    if (clickedItem.isSelected() == 0) {
        clickedItem.boxBackground.border = 2
        //clickedItem.boxBackground.borderColor = "rgba(255, 255, 255, 0.8)"
        clickedItem.boxBackground.color = "rgba(255, 255, 255, 0.3)"
        clickedItem.countUIStepper.element.style.transform = "scale(1)"
        clickedItem.countUIStepper.opacity = 1
        clickedItem.lblName.top = 270
        uiItemList.addItemToSelectedList(clickedItem)

    } else {
        clickedItem.boxBackground.border = 0
        //clickedItem.boxBackground.borderColor = "rgba(255, 255, 255, 0.0)"
        clickedItem.boxBackground.color = "rgba(255, 255, 255, 0.1)"
        clickedItem.countUIStepper.element.style.transform = "scale(0.1)"
        clickedItem.countUIStepper.opacity = 0
        //clickedItem.countUIStepper.setValue(1)
        clickedItem.lblName.top = 300
        uiItemList.removeItemFromSelectedList(clickedItem)
    }
    print("Total selected cards: " + uiItemList.getSelectedItemList().length)
}