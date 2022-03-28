
folderContent = {}

folderContent.documentsItemDataList = [
    { title: "Components", price: "50", iconPath: "images/file-icons/folder.png", searchText: "Components folder" },
    { title: "Fonts", price:"86", iconPath: "images/file-icons/folder.png", searchText: "Fonts folder" },
    { title: "Images", price:"120", iconPath: "images/file-icons/folder.png", searchText: "Images folder" },
    { title: "Book", price:"95", iconPath: "images/file-icons/doc.png", searchText: "Book doc" },
    { title: "Book 2", price:"110", iconPath: "images/file-icons/doc.png", searchText: "Book 2 doc" },
    { title: "Tables", price:"40", iconPath: "images/file-icons/xls.png", searchText: "Tables xls" },
    { title: "Notes", price:"67", iconPath: "images/file-icons/txt.png", searchText: "Notes txt" }
]

folderContent.createIn = function(box) {

    folderContent.box = box
    box.color = "white"

    // UI TITLE: documents title
    box.DocumentsUITitle = shared.createUITitle(0, 0, "My Documents", "white")
    box.add(that)
    that.height = 90

    // UI SEARCH BOX: Search box
    box.documentsUISearchBox = createUISearchBox(0, 0, page.width - 60)
    box.add(that)
    that.left = 30
    that.top = box.DocumentsUITitle.height + 20

    var documentsUIItemListHeight = page.height - box.DocumentsUITitle.height - box.documentsUISearchBox.height - 40

    // UI ITEM LIST: Documents items in horizontal list
    box.documentsUIItemList = createUIItemList(0, 0, global.CONTENT_WIDTH, documentsUIItemListHeight)
    box.add(that)
    that.bottom = 0
    that.color = "white"
    that.setItemAlign("horizontal-vertical")
    that.setInnerSpaces(10, 10, 10, 10)
    that.setCreateFunctionOfItem(folderContent.createDocumentItem)
    that.createItemsByDataList(folderContent.documentsItemDataList)
    that.onItemClick(folderContent.selectClickedDocumentItem)

    box.documentsUISearchBox.onSearch(function(uiSearchBox, searchText) {
        box.documentsUIItemList.searchItemByText(searchText)
    })
    

    // NESNE: Tam ekran içeriği kapatma butonu
    box.btnClose = closeButton.create()
    box.add(that)
    that.color = "transparent"
    that.onClick(function() {
        secondView.setVisible(0)
    })

    return box
}

folderContent.open = function() {
    secondView.createAndShowContent(folderContent)
}

folderContent.createDocumentItem = function(itemData) {

    var ITEM_WIDTH = (page.width - 20) / 4

    // BOX: Object container box
    var box = createBox(0, 0, ITEM_WIDTH, 200)
    that.color = "transparent"

    // BOX: Item background box
    box.boxBackground = createBox(2, 5, ITEM_WIDTH - 4, 190)
    box.add(that)
    that.color = "transparent"
    that.border = 0
    that.borderColor = "rgba(0, 0, 0, 0.2)"
    that.round = 13
    that.setMotion("all 0.3s")

    // IMAGE: icon image
    box.imgIcon = createImage(0, 0, 70, 70)
    box.add(that)
    that.load(itemData.iconPath)
    that.center()
    that.top  -= 20

    // LABEL: item name text
    box.lblName = createLabel(4, 0, ITEM_WIDTH - 8, "auto")
    box.add(that)
    that.text = itemData.title
    that.top = box.imgIcon.top + box.imgIcon.height + 8
    that.textAlign = "center"

    makeBasicObject(box)
    return box
}

folderContent.selectClickedDocumentItem = function(uiItemList, itemObject, exItemObject) {
    if (itemObject.isSelected() == 0) {

        if (exItemObject) {
            exItemObject.boxBackground.border = 0
            exItemObject.boxBackground.color = "transparent"
            uiItemList.removeItemFromSelectedList(exItemObject)
        }

        // Selected item properties
        itemObject.boxBackground.border = 2
        itemObject.boxBackground.color = "rgba(0, 0, 0, 0.05)"
        uiItemList.addItemToSelectedList(itemObject)
    }
}