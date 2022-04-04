var searchPage = {}
searchPage.ID = "search"

searchPage.plantItemDataList = [
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

searchPage.createInDefaultViewAndShow = function() {

    if (searchPage.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
        // Out of this function, use "searchPage.box" for "box".
        searchPage.box = box

        navigationBar.setVisible(0)
        //navigationBar.setTitle("Title Text")
        //navigationBar.backButton.setVisible(1)
        //navigationBar.menuButton.setVisible(1)
        tabBar.setVisible(1)
        tabBar.selectItemByIndex(1)
        defaultView.setTopAndBottomOuterSpaces(0, tabBar.HEIGHT)
        //defaultView.setTopAndBottomOuterSpaces(navigationBar.HEIGHT, tabBar.HEIGHT)

        box.color = "white"
        // "#EAEAE9", "#BFDBC9", "#CADAE0", "#FFF0C2"
        //box.element.style.background = "linear-gradient(to bottom, #FFFFFF00, whitesmoke)"
        box.scrollY = 0

        // #1

        // BOX: Search container box
        box.boxSearch = createBox(0, 0, global.USED_WIDTH, 110)
        box.add(that)
        that.color = "transparent"
        //that.color = "whitesmoke"

        // UI SEARCH BOX: Search box in boxSearch
        box.boxSearch.plantUISearchBox = createUISearchBox(0, 0, global.USED_WIDTH - 60)
        box.boxSearch.add(that)
        that.left = 30
        that.top = 40
        //that.color = "white"

        // #2

        // UI ITEM LIST: Category items (vertical)
        box.plantUIItemList = createUIItemList(0, 0, global.USED_WIDTH, box.height - box.boxSearch.height)
        box.add(that)
        that.color = "transparent"
        //that.color = "white"
        that.top = box.boxSearch.height
        that.setItemAlign("vertical")
        that.setInnerSpaces(0, 10, 0, 10)
        that.setCreateFunctionOfItem(searchPage.createPlantItem)
        that.createItemsByDataList(searchPage.plantItemDataList)
        that.onChange(searchPage.selectClickedPlantItem)

        // Connect search box with plant item list
        box.boxSearch.plantUISearchBox.onSearch(function(uiSearchBox, searchText) {
            box.plantUIItemList.searchItemByText(searchText)
        })

        defaultView.pushIntoOpenedPageList(searchPage)
        defaultView.setVisible(1)
        print("Opened page id: " + searchPage.ID)
    }
}

searchPage.createPlantItem = function(itemData) {

    //var ITEM_WIDTH = 150
    var ITEM_WIDTH = global.USED_WIDTH

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

searchPage.selectClickedPlantItem = function(uiItemList, clickedItem, prevClickedItem) {

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

    searchPreviewPage.titleText = clickedItem.getData().title
    searchPreviewPage.descriptionText = clickedItem.getData().desc
    searchPreviewPage.iconPath = clickedItem.getData().iconPath

    searchPreviewPage.createInSmallViewAndShow()
}