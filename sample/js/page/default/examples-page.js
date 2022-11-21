
const examplesPage = {};
examplesPage.PAGE_ID = "examplesPage";

examplesPage.itemDataList = [
    { type: "title", title: "UI COMPONENTS", searchText: "*" },
    { type: "normal", title:"Toggle", desc:"ui-toggle.htm", actionType: "url", actionValue: "ui-toggle.htm", searchText: "toggle checkbox" },
    { type: "normal", title:"Page Control", desc:"ui-page-control.htm", actionType: "url", actionValue: "ui-page-control.htm", searchText: "page control" },
    { type: "normal", title:"Tabs", desc:"ui-tabs.htm", actionType: "url", actionValue: "ui-tabs.htm", searchText: "tabs segment" },
    { type: "normal", title:"Title", desc:"ui-title.htm", actionType: "url", actionValue: "ui-title.htm", searchText: "title" },
    { type: "normal", title:"Left Title", desc:"ui-left-title.htm", actionType: "url", actionValue: "ui-left-title.htm", searchText: "left title" },
    { type: "normal", title:"Search Box", desc:"ui-search-box.htm", actionType: "url", actionValue: "ui-search-box.htm", searchText: "search box" },
    { type: "normal", title:"Action Button", desc:"ui-action-button.htm", actionType: "url", actionValue: "ui-action-button.htm", searchText: "action button" },
    { type: "normal", title:"Progress Bar", desc:"ui-progress-bar.htm", actionType: "url", actionValue: "ui-progress-bar.htm", searchText: "progress bar" },
    { type: "normal", title:"Notice", desc:"ui-notice.htm", actionType: "url", actionValue: "ui-notice.htm", searchText: "notice tiny alert" },
    { type: "normal", title:"Stepper", desc:"ui-stepper.htm", actionType: "url", actionValue: "ui-stepper.htm", searchText: "stepper" },
    { type: "normal", title:"Waiting View", desc:"ui-waiting-view.htm", actionType: "url", actionValue: "ui-waiting-view.htm", searchText: "waiting view" },
    /* { type: "normal", title:"Bars Test", desc:"js/page/default/bars-test-page.js", actionType: "code", actionValue: barsTestPage.PAGE_ID, searchText: "bars text" }, */
    { type: "normal", title:"Web View", desc:"ui-web-view.htm", actionType: "url", actionValue: "ui-web-view.htm", searchText: "web view htm" },
    { type: "title", title: "VIEWS", searchText: "*" },
    { type: "normal", title:"defaultView", desc:"js/page/default/default-example-page.js", actionType: "code", actionValue: defaultExamplePage.PAGE_ID, searchText: "default view" },
    { type: "normal", title:"secondView", desc:"js/page/second/second-example-page.js", actionType: "code", actionValue: secondExamplePage.PAGE_ID, searchText: "second view" },
    { type: "normal", title:"smallView", desc:"js/page/small/small-example-page.js", actionType: "code", actionValue: smallExamplePage.PAGE_ID, searchText: "small view" },
    { type: "title", title: "PAGE TEMPLATES", searchText: "*" },
    { type: "normal", title:"Custom Tab Bar", desc:"custom-tab-bar.htm", actionType: "url", actionValue: "custom-tab-bar.htm", searchText: "custom bottom tab bar" },
    { type: "normal", title:"Select Item Dialog", desc:"js/page/small/select-color-dialog.js", actionType: "code", actionValue: selectColorDialog.PAGE_ID, searchText: "title" },
    { type: "normal", title:"Edit Item Dialog", desc:"js/page/small/edit-item-dialog.js", actionType: "code", actionValue: editItemDialog.PAGE_ID, searchText: "edit item" },
    { type: "normal", title:"Item List (Icons)", desc:"js/page/second/my-documents-page.js", actionType: "code", actionValue: myDocumentsPage.PAGE_ID, searchText: "title" },
    { type: "normal", title:"Template A", desc:"js/page/second/template-a-page.js", actionType: "code", actionValue: templateAPage.PAGE_ID, searchText: "title" },
    { type: "title", title: "TECHNIQUES", searchText: "*" },
    { type: "normal", title:"Cells", desc:"ui-cells.htm", actionType: "url", actionValue: "ui-cells.htm", searchText: "cell cells" },
    { type: "normal", title:"Group", desc:"ui-group.htm", actionType: "url", actionValue: "ui-group.htm", searchText: "group" },
    { type: "normal", title:"Scrolling Text", desc:"ui-scrolling-text.htm", actionType: "url", actionValue: "ui-scrolling-text.htm", searchText: "Scrolling Text" },
    { type: "normal", title:"HTML Model Usage", desc:"html-model-usage.htm", actionType: "url", actionValue: "html-model-usage.htm", searchText: "html model css htm" },
    { type: "title", title: "BONUS", searchText: "*" },
    { type: "normal", title:"Select Item Dialog (B)", desc:"custom-dialog-b.htm", actionType: "url", actionValue: "custom-dialog-b.htm", searchText: "custom dialog" },
    { type: "normal", title:"Period Bar", desc:"ui-period-bar.htm", actionType: "url", actionValue: "ui-period-bar.htm", searchText: "period bar date" },
];

examplesPage.openInDefaultView = function() {

    defaultView.clear();

    const box = defaultView.getContainerBox();
    // Out of this function, use "examplesPage.box" for "box".
    examplesPage.box = box;

    topBar.setVisible(1);
    topBar.setBorderLine(0);
    topBar.setTitle("Usage Examples");
    topBar.setBackgroundColor("#FFFFFF");
    //topBar.setTitleColor("rgba(0, 0, 0, 0.8)");
    topBar.setTitleAlign("center");
    topBar.backButton.setVisible(0);
    topBar.menuButton.setVisible(1);

    bottomBar.setVisible(1);
    bottomBar.selectItemByIndex(2);
    bottomBar.setBorderLine(0);

    defaultView.setTopAndBottomOuterSpaces(topBar.getHeight(), bottomBar.getHeight());

    box.color = "indianred";
    // Dont scroll
    box.scrollX = 0;
    box.scrollY = 0;

    //topBar.box.element.style.filter = "invert(100%)";
    //box.element.style.filter = "invert(100%)";

    // #1

    // BOX: Search container box
    box.boxSearch = createBox(0, 0, app.usedWidth, 110);
    box.add(that);
    that.color = "transparent";
    //that.color = "whitesmoke";

    // UI SEARCH BOX: Search box in boxSearch.
    UISearchBox.resetDefault();
    //UISearchBox.default.width = 300;
    //UISearchBox.default.height = 50;
    //UISearchBox.default.searchIconFile = "js/component/ui-search-box/search.svg";
    //UISearchBox.default.clearIconFile = "js/component/ui-search-box/clear.svg";
    //UISearchBox.default.isCancelEnabled = 1;
    //UISearchBox.default.placeholderText = "Search";
    UISearchBox.default.color = "rgba(0, 0, 0, 0.2)";
    UISearchBox.default.textColor = "rgba(0, 0, 0, 0.65)";
    //UISearchBox.default.border = 0;
    //UISearchBox.default.borderColor = "rgba(0, 0, 0, 0.1)";
    UISearchBox.default.borderBottomStyle = "2px solid rgba(0, 0, 0, 0.2)";
    //UISearchBox.default.round = 6;
    //UISearchBox.default.fontSize = 20;
    // UI SEARCH BOX: Object description.
    box.boxSearch.uiSearchBox = UISearchBox.create({ width: box.width - 40 });
    box.boxSearch.add(that);
    // Show at:
    that.left = 20;
    that.top = 40;
    
    box.boxSearch.uiSearchBox.txtSearch.inputElement.classList.add('search-box');
    //inputElement.setAttribute("placeholder", "Search")


    // #2

    // UI ITEM LIST: Category items (vertical)
    box.uiItemList = UIItemList.create({ 
        width: app.usedWidth, 
        height: box.height - box.boxSearch.height 
    });
    box.add(that);
    that.color = "transparent";
    that.setItemAlignment(UIItemList.alignType.VERTICAL);
    that.setInnerSpaces(0, 10, 0, 10);
    that.setItemCreationFunction(examplesPage.createItem);
    that.createItemsByDataList(examplesPage.itemDataList);
    that.onSelectionChange(examplesPage.selectClickedItem);
    // Show at:
    that.left = 0;
    that.top = box.boxSearch.height;

    // Connect search box with plant item list
    box.boxSearch.uiSearchBox.onSearch(function(searchText, uiSearchBox) {
        box.uiItemList.searchItemByText(searchText);
    })

    print("Opened page id: " + examplesPage.PAGE_ID);

    defaultView.setVisible(1);
    
}

examplesPage.createItem = function(itemData, uiItemList) {

    const ITEM_WIDTH = uiItemList.width;

    let item = null;

    if (itemData.type == "normal") {

        // BOX: Object container item
        item = createBox();
        item.color = "transparent";
        item.width = ITEM_WIDTH;
        item.height = 54;
        item.element.style.cursor = "pointer";

        // BOX: Item background item
        item.boxBack = createBox(20, 2, ITEM_WIDTH - 40, 50);
        item.add(that);
        that.color = "transparent";
        that.round = 13;
        that.setMotion("background-color 0.3s");

        // IMAGE: Item icon image
        /*
        item.imgLogo = createImage(30, 12, 70, 70)
        item.add(that)
        that.load(itemData.iconFile)
        that.round = 4
        that.color = "transparent"
        that.border = 0
        */

        // LABEL: Item title text
        item.lblTitle = createLabel(40, 11, "auto", "auto");
        item.add(that);
        that.text = itemData.title;
        that.textColor = "rgba(255, 255, 255, 0.75)";
        that.fontSize = 24;
        that.onResize(function(self) {
            self.center("top");
        })

        // LABEL: Item description text
        
        item.lblDesc = createLabel(0, 0, "auto", "auto");
        item.add(that);
        that.text = itemData.desc;
        that.textColor = "rgba(255, 255, 255, 0.65)";
        that.fontSize = 14;
        that.right = 40;
        that.onResize(function(self) {
            self.center("top");
        })

    } else if (itemData.type == "title") {

        // BOX: Object container item
        item = createBox();
        item.width = ITEM_WIDTH;
        item.height = 54;
        item.color = "transparent";
        //that.clickable = 0;

        // BOX: Item background item
        item.boxBack = createBox(20, 2, ITEM_WIDTH - 40, 50);
        item.add(that);
        that.color = "transparent";
        that.round = 13;
        that.setMotion("background-color 0.3s");

        // LABEL: Item title text
        item.lblTitle = createLabel(40, 11, "auto", "auto");
        item.add(that);
        that.text = itemData.title;
        //that.textColor = "rgba(255, 255, 255, 0.85)";
        that.textColor = "rgba(0, 0, 0, 0.35)";
        //that.fontSize = 18;
        that.fontSize = 24;
        that.element.style.fontFamily = "opensans-bold";
        that.onResize(function(self) {
            self.center("top");
            //self.center();
        })

    }

    makeBasicObject(item);
    return item;
}

examplesPage.selectClickedItem = function(uiItemList, clickedItem, prevClickedItem) {

    if (clickedItem.getData().type == "normal") {
    
        clickedItem.boxBack.dontMotion();
        clickedItem.boxBack.color = "rgba(0, 0, 0, 0.2)";
        clickedItem.boxBack.withMotion(function() {
            clickedItem.boxBack.color = "transparent";
        });

        if (clickedItem.getData().actionValue) {

            if (clickedItem.getData().actionType == "url") {

                exampleViewerPage.htmlFile = clickedItem.getData().actionValue;
                exampleViewerPage.openInSecondView();
    
            } else if (clickedItem.getData().actionType == "code") {
    
                examplesPage.openPageById(clickedItem.getData().actionValue);
    
            }

        }
        
    }

}

examplesPage.openPageById = function(pageId) {

    switch (pageId) {
    
        case defaultExamplePage.PAGE_ID:

            // DEFAULT VIEW: Example page:
            defaultExamplePage.parameter1 = "defaultView";
            defaultExamplePage.openInDefaultView(
                function closed(results) {

                    //notice.show({ message: "Page Closed: " + results.result1 });
                    examplesPage.openInDefaultView();

                }
            );

            break;

        case myDocumentsPage.PAGE_ID:

            myDocumentsPage.openInSecondView();
            break;

        case secondExamplePage.PAGE_ID:

            // SECOND VIEW: Example page: 
            secondExamplePage.parameter1 = "secondView";
            secondExamplePage.backButtonText = "Usage Examples";
            secondExamplePage.openInSecondView(
                function closed(results) {

                    //notice.show({ message: "Page Closed: " + results.result1 });
                    
                }
            );

            break;

        case smallExamplePage.PAGE_ID:

            // SMALL VIEW: Example page:
            smallExamplePage.parameter1 = "smallView";
            smallExamplePage.openInSmallView(
                function closed(results) {

                    //notice.show({ message: "Page Closed: " + results.result1 });

                }
            );

            break;

        case editItemDialog.PAGE_ID:

            // SMALL VIEW: Add/Edit/Remove a text example dialog:
            editItemDialog.title = "Item Name:";
            editItemDialog.itemId = 20;
            editItemDialog.itemText = "Item Text";
            editItemDialog.isNew = 0;
            editItemDialog.isRemoveable = 1;

            editItemDialog.openInSmallView(
                function closed(results) {

                    switch(results.operation) {

                        case "action":
                            if (results.isNew) {
                                notice.show({ message: "Add new item: " + results.itemText });
                            } else {
                                notice.show({ message: "Edit item by id: " + results.itemId + " - " + results.itemText });
                            }
                            break;

                        case "cancel":
                            notice.show({ message: "Edit item canceled." });
                            break;

                        case "delete":
                            notice.show({ message: "Delete by item id: " + results.itemId });
                            break;

                    }

                }
            );
            break;

        case selectColorDialog.PAGE_ID:

                // SMALL VIEW: Select a color page:
                selectColorDialog.selectedColor = "";
                selectColorDialog.openInSmallView(
                    function colorSelected(color) {

                        notice.show({ message: "Selected color: " + color });

                    }
                );

            break;

        case barsTestPage.PAGE_ID:
            barsTestPage.openInDefaultView();
            break;

        case templateAPage.PAGE_ID:
            templateAPage.openInSecondView();
            break;

    }

}