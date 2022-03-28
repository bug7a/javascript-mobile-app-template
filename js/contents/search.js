
var searchContent = {}

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

    // BOX: Content container box
    searchContent.box = box
    box.color = "white"
    // "#EAEAE9", "#BFDBC9", "#CADAE0", "#FFF0C2"
    //box.element.style.background = "linear-gradient(to bottom, #FFFFFF00, whitesmoke)"

    // BOX: Search container box
    box.boxSearch = createBox(0, 0, global.CONTENT_WIDTH, 110)
    box.add(that)
    that.color = "white"
    //that.color = "whitesmoke"

    // UI SEARCH BOX: Search box in boxSearch
    box.boxSearch.plantUISearchBox = createUISearchBox(0, 0, global.CONTENT_WIDTH - 60)
    box.boxSearch.add(that)
    that.left = 30
    that.top = 40
    //that.color = "white"
    //that.txtSearch.color = "white"

    // UI ITEM LIST: Category items (vertical)
    box.plantUIItemList = createUIItemList(0, 0, global.CONTENT_WIDTH, box.height - box.boxSearch.height)
    box.add(that)
    that.color = "transparent"
    //that.color = "white"
    that.top = box.boxSearch.height
    that.setItemAlign("vertical")
    that.setInnerSpaces(0, 10, 0, 10)
    that.setCreateFunctionOfItem(searchContent.createPlantItem)
    that.createItemsByDataList(searchContent.plantItemDataList)
    that.onItemClick(searchContent.selectClickedPlantItem)

    // Connect search box with plant item list
    box.boxSearch.plantUISearchBox.onSearch(function(uiSearchBox, searchText) {
        box.plantUIItemList.searchItemByText(searchText)
    })
        

}

searchContent.open = function() {
    navigationBar.setVisible(0)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(1)
    defaultView.setTopAndBottom(0, tabBar.HEIGHT)
    defaultView.createAndShowContent(searchContent)
}

searchContent.createPlantItem = function(itemData) {

    //var ITEM_WIDTH = 150
    var ITEM_WIDTH = global.CONTENT_WIDTH

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 94)
    that.color = "transparent"

    // BOX: Item background box
    box.boxBackground = createBox(10, 2, ITEM_WIDTH - 20, 90)
    box.add(that)
    that.color = "transparent"
    that.round = 13
    that.setMotion("background-color 0.3s")

    // IMAGE: Item icon image
    box.imgLogo = createImage(30, 12, 70, 70)
    box.add(that)
    that.load(itemData.iconPath)
    that.round = 4
    that.color = "transparent"
    that.border = 0

    // LABEL: Item title text
    box.lblTitle = createLabel(120, 25, 280, "auto")
    box.add(that)
    that.text = itemData.title

    // LABEL: Item description text
    box.lblDesc = createLabel(120, 49, 280, "auto")
    box.add(that)
    that.text = itemData.desc
    that.textColor = "gray"
    that.fontSize = 14

    makeBasicObject(box)
    return box
}

searchContent.selectClickedPlantItem = function(uiItemList, clickedItem, prevClickedItem) {

    if (clickedItem.isSelected() == 0) {
        if (prevClickedItem) {
            prevClickedItem.boxBackground.color = "transparent"
            //prevClickedItem.boxBackground.element.style.background = "transparent"
            uiItemList.removeItemFromSelectedList(prevClickedItem)
        }
        // "whitesmoke", "#EAEAE9", "#BFDBC9", "#CADAE0", "#FFF0C2"
        clickedItem.boxBackground.color = "whitesmoke"
        //clickedItem.boxBackground.element.style.background = "linear-gradient(to top, #FFFFFF00, #FFF0C2)"
        //clickedItem.boxBackground.element.style.background = "linear-gradient(to bottom, #FFFFFF00, whitesmoke)"
        uiItemList.addItemToSelectedList(clickedItem)

        print("Selected plant: " + clickedItem.getIndex() + "-" + clickedItem.getData().title)
    }

    searchPreviewContent.title = clickedItem.getData().title
    searchPreviewContent.description = clickedItem.getData().desc
    searchPreviewContent.imagePath = clickedItem.getData().iconPath

    searchPreviewContent.open()
}