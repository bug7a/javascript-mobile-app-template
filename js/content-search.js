
var searchContent = {}

// BOX: Container
searchContent.box

// Meyve, sebze listesi
searchContent.plantItemDataList = [
    { title:"Broccoli", desc:"Vegetable", iconPath:"images/fruids/brokoli.png", searchText: "Broccoli Vegetable" },
    { title:"Strawberry", desc:"Fruit", iconPath:"images/fruids/cilek.png", searchText: "Strawberry Fruit" },
    { title:"Tomato", desc:"Vegetable", iconPath:"images/fruids/domates.png", searchText: "Tomato Vegetable" },
    { title:"Apple", desc:"Fruit", iconPath:"images/fruids/elma.png", searchText: "Apple Fruit" },
    { title:"Carrot", desc:"Vegetable", iconPath:"images/fruids/havuc.png", searchText: "Carrot Vegetable" },
    { title:"Watermelon", desc:"Fruit", iconPath:"images/fruids/karpuz.png", searchText: "Watermelon Fruit" },
    { title:"Lemon", desc:"Fruit", iconPath:"images/fruids/limon.png", searchText: "Lemon Fruit" },
    { title:"Banana", desc:"Fruit", iconPath:"images/fruids/muz.png", searchText: "Banana Fruit" },
    { title:"Pomegranate", desc:"Fruit", iconPath:"images/fruids/nar.png", searchText: "Pomegranate Fruit" },
    { title:"Eggplant", desc:"Vegetable", iconPath:"images/fruids/patlican.png", searchText: "Eggplant Vegetable" },
    { title:"Blueberry", desc:"Fruit", iconPath:"images/fruids/yabanmersini.png", searchText: "Blueberry Fruit" },
    { title:"Green Pepper", desc:"Vegetable", iconPath:"images/fruids/yesilbiber.png", searchText: "Green Pepper Vegetable" }
]

searchContent.createIn = function(box) {

    searchContent.box = box

    searchContent.box.color = "white"

    // BOX: Search container box
    box.boxSearch = createBox(0, 0, global.CONTENT_WIDTH, 100)
    that.color = "white"
    //that.color = "whitesmoke"

    // UI SEARCH BOX: Search box in boxSearch
    box.boxSearch.plantUISearchBox = createUISearchBox(0, 0, global.CONTENT_WIDTH - 60)
    that.left = 30
    that.top = 30
    //that.color = "white"
    //that.txtSearch.color = "white"

    // UI ITEM LIST: Categoriy items in vertical list
    box.plantUIItemList = createUIItemList(0, 0, 600, box.height - box.boxSearch.height)
    that.color = "white"
    //that.color = "white"
    that.top = box.boxSearch.height
    that.setItemAlign("vectoral")
    that.setBorderSpaces(0, 10, 0, 10)
    that.setCreateFunctionOfItem(searchContent.createPlantItem)
    that.setItemsWithData(searchContent.plantItemDataList)
    that.onItemClick(searchContent.selectClickedPlantItem)

    // Connect search box with plant item list
    box.boxSearch.plantUISearchBox.onCharChange(box.plantUIItemList.searchItemByText)

}

searchContent.open = function() {
    navigationBar.setVisible(0)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(1)
    defaultView.setTopAndBottomSpaces(0, tabBar.HEIGHT)
    defaultView.createAndShowContent(searchContent)
}

searchContent.createPlantItem = function(dataItem) {

    //var ITEM_WIDTH = 150
    var ITEM_WIDTH = global.CONTENT_WIDTH

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 94)
    that.color = "transparent"

    // BOX: Item background box
    box.boxBackground = createBox(10, 2, ITEM_WIDTH - 20, 90)
    that.color = "transparent"
    that.round = 13
    that.setMotion("background-color 0.3s")

    // IMAGE: Item icon image
    box.imgLogo = createImage(30, 12, 70, 70)
    that.load(dataItem.iconPath)
    that.round = 4
    that.color = "transparent"
    that.border = 0

    // LABEL: Item title text
    box.lblTitle = createLabel(120, 25, 280, "auto")
    that.text = dataItem.title

    // LABEL: Item description text
    box.lblDesc = createLabel(120, 49, 280, "auto")
    that.text = dataItem.desc
    that.textColor = "gray"
    that.fontSize = 14

    makeBasicObject(box)
    return box
}

searchContent.selectClickedPlantItem = function(uiItemList, itemObject, exItemObject) {

    if (itemObject.isSelected() == 0) {
        if (exItemObject) {
            exItemObject.boxBackground.color = "transparent"
            uiItemList.removeItemFromSelectedList(exItemObject)
        }
        itemObject.boxBackground.color = "whitesmoke"
        uiItemList.addItemToSelectedList(itemObject)

        print("Selected plant: " + itemObject.getIndex() + "-" + itemObject.getData().title)
    }

    searchPreviewContent.title = itemObject.getData().title
    searchPreviewContent.description = itemObject.getData().desc
    searchPreviewContent.imagePath = itemObject.getData().iconPath

    searchPreviewContent.open()
}