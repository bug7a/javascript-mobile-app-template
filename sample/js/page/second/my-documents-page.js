const myDocumentsPage = {};
myDocumentsPage.PAGE_ID = "myDocumentsPage";

myDocumentsPage.documentsItemDataList = [
    { title: "Components", price: "50", iconFile: "assets/file-icons/folder.png", searchText: "Components folder" },
    { title: "Fonts", price:"86", iconFile: "assets/file-icons/folder.png", searchText: "Fonts folder" },
    { title: "Images", price:"120", iconFile: "assets/file-icons/folder.png", searchText: "Images folder" },
    { title: "Book", price:"95", iconFile: "assets/file-icons/doc.png", searchText: "Book doc" },
    { title: "Book 2", price:"110", iconFile: "assets/file-icons/doc.png", searchText: "Book 2 doc" },
    { title: "Tables", price:"40", iconFile: "assets/file-icons/xls.png", searchText: "Tables xls" },
    { title: "Notes", price:"67", iconFile: "assets/file-icons/txt.png", searchText: "Notes txt" }
];

myDocumentsPage.openInSecondView = function() {

    secondView.clear();

    // BOX: Page container.
    const box = secondView.getContainerBox();
    myDocumentsPage.box = box;

    box.color = "white";

    // UI TITLE: Default values.
    UITitle.resetDefault();
    // UI TITLE: Object description.
    box.DocumentsUITitle = UITitle.create({ 
        title: "My Documents", 
        backButtonVisible: 1, 
        backButtonText: "Back"
    });
    box.add(that);
    that.position = "relative";
    that.backButton.onClick(function(self) {
        secondView.close();
    });

    // UI SEARCH BOX: Search box
    UISearchBox.resetDefault();
    box.uiSearchBox = UISearchBox.create({ width: box.width - 40 });
    box.add(that);
    that.left = 20;
    that.top = box.DocumentsUITitle.height + 20;

    var documentsUIItemListHeight = getDefaultContainerBox().height - box.DocumentsUITitle.height - box.uiSearchBox.height - 40;

    // UI ITEM LIST: Documents items in horizontal list
    box.documentsUIItemList = UIItemList.create({ 
        width: app.usedWidth, 
        height: documentsUIItemListHeight 
    });
    box.add(that);
    that.color = "transparent";
    that.setItemAlignment("both");
    that.setInnerSpaces(10, 10, 10, 10);
    that.setItemCreationFunction(myDocumentsPage.createDocumentItem);
    that.createItemsByDataList(myDocumentsPage.documentsItemDataList);
    that.onSelectionChange(myDocumentsPage.selectClickedDocumentItem);
    // Show
    that.bottom = 0;
    that.left = 0;

    box.uiSearchBox.onSearch(function(searchText, uiSearchBox) {
        box.documentsUIItemList.searchItemByText(searchText);
    });

    print("Opened page id: " + myDocumentsPage.PAGE_ID);

    secondView.setVisible(1);
    
}

myDocumentsPage.createDocumentItem = function(itemData) {

    var ITEM_WIDTH = (myDocumentsPage.box.width - 20) / 4;

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 200);
    that.color = "transparent";

    // BOX: Item background box
    box.boxBackground = createBox(2, 5, ITEM_WIDTH - 4, 190);
    box.add(that);
    that.color = "transparent";
    that.border = 0;
    that.borderColor = "rgba(0, 0, 0, 0.2)";
    that.round = 13;
    that.setMotion("all 0.3s");

    // IMAGE: icon image
    box.imgIcon = createImage(0, 0, 70, 70);
    box.add(that);
    that.load(itemData.iconFile);
    that.center();
    that.top  -= 20;

    // LABEL: item name text
    box.lblName = createLabel(4, 0, ITEM_WIDTH - 8, "auto");
    box.add(that);
    that.text = itemData.title;
    that.top = box.imgIcon.top + box.imgIcon.height + 8;
    that.textAlign = "center";

    makeBasicObject(box);
    return box;

}

myDocumentsPage.selectClickedDocumentItem = function(uiItemList, itemObject, exItemObject) {
    if (itemObject.isSelected() == 0) {

        if (exItemObject) {

            // Deselect item:
            exItemObject.boxBackground.border = 0;
            exItemObject.boxBackground.color = "transparent";
            uiItemList.removeItemFromSelectedList(exItemObject);

        }

        // Select item.
        itemObject.boxBackground.border = 2;
        itemObject.boxBackground.color = "rgba(0, 0, 0, 0.05)";
        uiItemList.addItemToSelectedList(itemObject);

    }
}