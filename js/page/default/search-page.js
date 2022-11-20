const searchPage = {};
searchPage.PAGE_ID = "searchPage";

searchPage.itemDataList = [
    { title:"Broccoli", desc:"Vegetable", iconFile:"assets/fruids/brokoli.png", searchText: "Broccoli Vegetable" },
    { title:"Strawberry", desc:"Fruit", iconFile:"assets/fruids/cilek.png", searchText: "Strawberry Fruit" },
    { title:"Tomato", desc:"Vegetable", iconFile:"assets/fruids/domates.png", searchText: "Tomato Vegetable" },
    { title:"Apple", desc:"Fruit", iconFile:"assets/fruids/elma.png", searchText: "Apple Fruit" },
    { title:"Carrot", desc:"Vegetable", iconFile:"assets/fruids/havuc.png", searchText: "Carrot Vegetable" },
    { title:"Watermelon", desc:"Fruit", iconFile:"assets/fruids/karpuz.png", searchText: "Watermelon Fruit" },
    { title:"Lemon", desc:"Fruit", iconFile:"assets/fruids/limon.png", searchText: "Lemon Fruit" },
    { title:"Banana", desc:"Fruit", iconFile:"assets/fruids/muz.png", searchText: "Banana Fruit" },
    { title:"Pomegranate", desc:"Fruit", iconFile:"assets/fruids/nar.png", searchText: "Pomegranate Fruit" },
    { title:"Eggplant", desc:"Vegetable", iconFile:"assets/fruids/patlican.png", searchText: "Eggplant Vegetable" },
    { title:"Blueberry", desc:"Fruit", iconFile:"assets/fruids/yabanmersini.png", searchText: "Blueberry Fruit" },
    { title:"Green Pepper", desc:"Vegetable", iconFile:"assets/fruids/yesilbiber.png", searchText: "Green Pepper Vegetable" }
];

searchPage.openInDefaultView = function() {

    defaultView.clear();

    const box = defaultView.getContainerBox();
    searchPage.box = box;

    topBar.setVisible(0);
    //topBar.setTitle("Title Text");
    //topBar.setBackgroundColor("#FFFFFF");
    //topBar.setTitleColor("rgba(0, 0, 0, 0.8)");
    //topBar.setBorderLine(1);
    //topBar.setTitleAlign("left");
    //topBar.backButton.setVisible(1);
    //topBar.menuButton.setVisible(1);
    
    bottomBar.setVisible(1);
    bottomBar.selectItemByIndex(1);
    bottomBar.setBorderLine(1);

    defaultView.setTopAndBottomOuterSpaces(0, bottomBar.getHeight());
    //defaultView.setTopAndBottomOuterSpaces(topBar.getHeight(), bottomBar.getHeight());

    box.color = "transparent";
    box.scrollY = 0;


    // #1

    // BOX: Search container.
    box.boxSearch = createBox(0, 0, box.width, 105);
    box.add(that);
    that.color = "transparent";
    that.border = 0;
    //that.borderColor = "rgba(0, 0, 0, 0.1)";
    //that.element.style.borderBottomWidth = "1px";
    //that.color = "whitesmoke";

    // UI SEARCH BOX: Search box in boxSearch.
    UISearchBox.resetDefault();
    //UISearchBox.default.width = 300;
    //UISearchBox.default.height = 50;
    //UISearchBox.default.searchIconFile = "js/component/ui-search-box/search.svg"
    //UISearchBox.default.clearIconFile = "js/component/ui-search-box/clear.svg"
    //UISearchBox.default.isCancelEnabled = 1
    //UISearchBox.default.placeholderText = "Search"
    //UISearchBox.default.color = "whitesmoke"
    //UISearchBox.default.textColor = "rgba(0, 0, 0, 0.8)"
    //UISearchBox.default.border = 0
    //UISearchBox.default.borderColor = "rgba(0, 0, 0, 0.1)"
    //UISearchBox.default.borderBottomStyle = "2px solid rgba(0, 0, 0, 0.06)"
    //UISearchBox.default.round = 6
    //UISearchBox.default.fontSize = 20
    box.boxSearch.uiSearchBox = UISearchBox.create({ width: box.width - 40 });
    box.boxSearch.add(that);
    // Show object at:
    that.left = 20;
    that.bottom = 20;


    // #2

    // UI ITEM LIST: Items (VERTICAL)
    box.uiItemList = UIItemList.create({ 
        width: box.width, 
        height: box.height - box.boxSearch.height
    });
    box.add(that);
    that.color = "transparent";
    //that.color = "white";
    that.setItemAlignment(UIItemList.alignType.VERTICAL);
    that.setInnerSpaces(0, 10, 0, 10);
    that.setItemCreationFunction(searchPage.createItem);
    that.createItemsByDataList(searchPage.itemDataList);
    that.onSelectionChange(searchPage.selectedItemChanged);
    // Show object at:
    that.left = 0;
    that.top = box.boxSearch.height;

    // Connect search box with plant item list.
    box.boxSearch.uiSearchBox.onSearch(function (searchText, uiSearchBox) {
        box.uiItemList.searchItemByText(searchText);
    });

    // BOX: Top mask for box.uiItemList.
    /*
    box.boxTopMask = createBox(0, 0, box.width, 6);
    box.add(that);
    that.element.style.background = "linear-gradient(to bottom, white, #FFFFFF00)";
    that.aline(box.uiItemList, "top", -5);
    that.border = 0;
    */

    print("Opened page id: " + searchPage.PAGE_ID);

    // Show view:
    defaultView.setVisible(1);

};

searchPage.createItem = function(itemData, uiItemList) {

    const ITEM_WIDTH = uiItemList.width;
    const ITEM_HEIGHT = 94;

    // BOX: Item container.
    const item = createBox();
    item.width = ITEM_WIDTH;
    item.height = ITEM_HEIGHT;
    item.color = "transparent";

    // BOX: Item background.
    item.boxBackground = createBox(20, 2, ITEM_WIDTH - 40, ITEM_HEIGHT - 4);
    item.add(that);
    that.color = "transparent";
    that.round = 13;
    that.setMotion("background-color 0.3s");

    // IMAGE: Item icon image.
    item.imgIcon = createImage(30, 12, 70, 70);
    item.add(that);
    that.load(itemData.iconFile);
    that.round = 4;
    that.color = "transparent";
    that.border = 0;

    // LABEL: Item title text.
    item.lblTitle = createLabel(120, 25, 280, "auto");
    item.add(that);
    that.text = itemData.title;

    // LABEL: Item description text.
    item.lblDesc = createLabel(120, 49, 280, "auto");
    item.add(that);
    that.text = itemData.desc;
    that.textColor = "gray";
    that.fontSize = 14;

    // NOTE: UIItemList will set item.position = "relative";

    makeBasicObject(item);
    return item;

}

searchPage.selectedItemChanged = function(uiItemList, clickedItem, prevClickedItem) {

    if (!clickedItem.isSelected()) {

        if (prevClickedItem) {

            //prevClickedItem.clickable = 1;
            prevClickedItem.boxBackground.color = "transparent";
            //prevClickedItem.boxBackground.element.style.background = "transparent";
            uiItemList.removeItemFromSelectedList(prevClickedItem);

        }

        //clickedItem.clickable = 0;
        // "whitesmoke", "#EAEAE9", "#BFDBC9", "#CADAE0", "#FFF0C2"
        clickedItem.boxBackground.color = "whitesmoke";
        //clickedItem.boxBackground.element.style.background = "linear-gradient(to top, #FFFFFF00, #FFF0C2)";
        //clickedItem.boxBackground.element.style.background = "linear-gradient(to bottom, #FFFFFF00, whitesmoke)";
        uiItemList.addItemToSelectedList(clickedItem);

    }

    print("Selected item: " + clickedItem.getIndex() + "-" + clickedItem.getData().title);

    // Show details:
    searchPreviewPage.titleText = clickedItem.getData().title;
    searchPreviewPage.descriptionText = clickedItem.getData().desc;
    searchPreviewPage.iconFile = clickedItem.getData().iconFile;

    searchPreviewPage.openInSmallView();

}