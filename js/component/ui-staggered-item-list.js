/* Bismillah */

/*

UI ITEM LIST COMPONENT:
- Makes searchable, custom item lists


Started Date: 14 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


USAGE OF UI COMPONENT:

UIStaggeredItemList.create(left: Float, top: Float, width: Integer, height: Integer) : UIStaggeredItemList
- Creates a new UIStaggeredItemList object.
- UIStaggeredItemList object extends Box object.

UIStaggeredItemList.setInnerSpaces(left: Float, top: Float, right: Integer, bottom: Integer)
- Sets the border spaces.

UIStaggeredItemList.setItemCreationFunction(func: Function)
- Sets the function that creates the items.

--- EXAMPLE ---

var createItem = function(itemData) {

    var ITEM_WIDTH = app.usedWidth

    // BOX: Object container box.
    var box = createBox(0, 0, ITEM_WIDTH, 94)
    that.color = "transparent"

    // BOX: Item background box.
    box.boxBack = createBox(10, 2, ITEM_WIDTH - 20, 90)
    box.add(that)
    that.color = "transparent"
    that.round = 13
    that.setMotion("background-color 0.3s")

    // IMAGE: Item icon image.
    box.imgLogo = createImage(30, 12, 70, 70)
    box.add(that)
    that.load(itemData.iconFile)
    that.round = 4
    that.color = "transparent"
    that.border = 0

    // LABEL: Item title text.
    box.lblTitle = createLabel(120, 25, 280, "auto")
    box.add(that)
    that.text = itemData.titleText

    // LABEL: Item description text.
    box.lblDesc = createLabel(120, 49, 280, "auto")
    box.add(that)
    that.text = itemData.descriptionText
    that.textColor = "gray"
    that.fontSize = 14

    makeBasicObject(box)
    return box
}

UIStaggeredItemList.setItemCreationFunction(createItem)

--- EXAMPLE END ---

UIStaggeredItemList.createItemsByDataList(dataList: Array)
- Sets the items.
- If you use .searchItemByText() function, dataList must have an element named "searchText".

--- EXAMPLE ---

var itemDataList = [
    { titleText:"Broccoli", descriptionText:"Vegetable", iconFile:"images/fruids/brokoli.png", searchText: "Broccoli Vegetable" },
    { titleText:"Strawberry", descriptionText:"Fruit", iconFile:"images/fruids/cilek.png", searchText: "Strawberry Fruit" },
    { titleText:"Tomato", descriptionText:"Vegetable", iconFile:"images/fruids/domates.png", searchText: "Tomato Vegetable" },
]

UIStaggeredItemList.createItemsByDataList(itemDataList)

--- EXAMPLE END ---

UIStaggeredItemList.getItemList() : Array
- Returns the items.

UIStaggeredItemList.getSelectedItemList() : Array
- Returns the selected items.
- Supports multiple selections. (If you dont unselect ex item object)

UIStaggeredItemList.addItemToSelectedList(item: ItemObject)
- Selects the item.

UIStaggeredItemList.removeItemFromSelectedList(item: ItemObject)
- Unselects the item.

UIStaggeredItemList.selectItemByIndex(itemIndex)
- Selects the item by index.

UIStaggeredItemList.searchItemByText(searchText: String)
- Searches the item by text.

UIStaggeredItemList.cleanItems()
- Cleans the items.

UIStaggeredItemList.onChange(func: Function)
- Sets the function that will be called when the item is clicked.

--- EXAMPLE: single selection ---

var itemChanged = function(UIStaggeredItemList, clickedItem, prevClickedItem) {

    if (!clickedItem.isSelected()) {

        if (prevClickedItem) {
            prevClickedItem.boxBackground.color = "white"
            UIStaggeredItemList.removeItemFromSelectedList(prevClickedItem)
        }

        // Selected item properties
        clickedItem.boxBackground.color = "red"
        UIStaggeredItemList.addItemToSelectedList(clickedItem)

        print("Selected item: " + UIStaggeredItemList.getIndex() + "-" + clickedItem.getData().titleText)

    }

}

UIStaggeredItemList.onChange(itemChanged)

--- EXAMPLE END ---

--- EXAMPLE: multi selection ---

var itemChanged = function(UIStaggeredItemList, clickedItem, prevClickedItem) {

    if (clickedItem.isSelected()) {
        clickedItem.boxBackground.color = "white"
        UIStaggeredItemList.removeItemFromSelectedList(clickedItem)

    } else {
        clickedItem.boxBackground.color = "red"
        UIStaggeredItemList.addItemToSelectedList(clickedItem)
    }

    print("Selected item list length: " + UIStaggeredItemList.getSelectedItemList().length)

}

UIStaggeredItemList.onChange(itemChanged)

--- EXAMPLE END ---

itemObject.isSelected() : Boolean
- Returns the selected status of the item before.

itemObject.getData() : itemData
- Returns the item data.

itemObject.getIndex() : Integer
- Returns the item index.

*/

"use strict";
const UIStaggeredItemList = {};

UIStaggeredItemList.create = function(left = 0, top = 0, width = 600, height = getDefaultContainerBox().height) {

    // *** PRIVATE VARIABLES:
    var displayType = "block"
    var itemList = []
    var selectedItemList = []
    var itemCreationFunction = ""
    var onChangeFunc = function() {}
    var spaces = {}

    // *** OBJECT MODEL:
    // BOX: Object container box
    var box = createBox(left, top, width, height)
    that.color = "transparent"
    box.scrollX = 0
    box.scrollY = 1
    box.element.style.wordSpacing = "0px"
    box.element.style.letterSpacing = "0px"
    box.element.style.fontSize = "0px"
    
    // *** PRIVATE METHODS:
    var addItem = function(item) {

        //item.element.style.position = "relative"
        //item.element.style.display = displayType
        item.onClick(function(self) {
            var lastSelectedItemObject = getLastSelectedItem()
            onChangeFunc(box, self, lastSelectedItemObject)
        })

        item.isSelected = function() {

            for (var i = 0; i < selectedItemList.length; i++) {
                if (selectedItemList[i].getIndex() == item.getIndex()) {
                    return 1
                }
            }
            return 0
        }

        item.getData = function() {
            return item.data
        }

        item.getIndex = function() {
            return item.index
        }

        itemList.push(item)
        box.add(item)
        that = box
    }

    var getLastSelectedItem = function() {

        var lastSelectedItemObject = ""
        if (selectedItemList.length > 0) {
            lastSelectedItemObject = selectedItemList[selectedItemList.length - 1]
        }
        return lastSelectedItemObject
    }

    // *** PUBLIC METHODS:
    box.setItemCreationFunction = function(func) {
        itemCreationFunction = func
    }

    box.getItemList = function() {
        return [...itemList];
    }

    box.createItemsByDataList = function(dataList) {
        box.cleanItems()
        if (!itemCreationFunction) {
            print("UIStaggeredItemList: .setItemCreationFunction() did not set yet.")

        } else {
            for (var i = 0; i < dataList.length; i++) {
                var item = itemCreationFunction(dataList[i], box.repositionItems)
                item.data = dataList[i]
                item.index = i
                addItem(item)
            }
        }

        box.boxBottomSpace = createBox(0, 0, box.width, spaces.bottom)
        box.add(that)
        that.color = "transparent"

        box.repositionItems()
        makeBasicObject(box)
    }

    box.addItemToSelectedList = function(item) {
        if (item.isSelected() == 0) {
            selectedItemList.push(item)
        }
    }

    box.removeItemFromSelectedList = function(item) {
        if (item.isSelected() == 1) {
            var newSelectedItemObjectList = []

            for (var i = 0; i < selectedItemList.length; i++) {
                if (selectedItemList[i].getIndex() != item.getIndex()) {
                    newSelectedItemObjectList.push(selectedItemList[i])
                }
            }
            selectedItemList = newSelectedItemObjectList
        }
    }

    box.getSelectedItemList = function() {
        return [...selectedItemList]
    }

    box.selectItemByIndex = function(index) {
        if(itemList.length > index) {
            var item = itemList[index]
            var lastSelectedItemObject = getLastSelectedItem()
            onChangeFunc(box, item, lastSelectedItemObject)
        }
    }

    box.cleanItems = function() {
        box.html = ""
        itemList = []
        selectedItemList = []
    }

    box.onChange = function(func) {
        onChangeFunc = func
    }

    box.searchItemByText = function(searchText) {
        searchText = searchText.toLowerCase()
        for (var i = 0; i < itemList.length; i++) {
            var _searchedText = itemList[i].getData().searchText.toLowerCase();

            // for Turkish characters:
            _searchedText = _searchedText.replace(/ı/g, "i");
            searchText = searchText.replace(/ı/g, "i");
            _searchedText = _searchedText.replace(/i̇/g, "i");
            searchText = searchText.replace(/i̇/g, "i");
            _searchedText = _searchedText.replace(/ç/g, "c");
            searchText = searchText.replace(/ç/g, "c");
            _searchedText = _searchedText.replace(/ğ/g, "g");
            searchText = searchText.replace(/ğ/g, "g");
            _searchedText = _searchedText.replace(/ş/g, "s");
            searchText = searchText.replace(/ş/g, "s");
            _searchedText = _searchedText.replace(/ü/g, "u");
            searchText = searchText.replace(/ü/g, "u");
            _searchedText = _searchedText.replace(/ö/g, "o");
            searchText = searchText.replace(/ö/g, "o");

            // "*" is used joker character. Will shown at all searches.
            if (_searchedText.search(searchText) > -1 || itemList[i].getData().searchText.indexOf("*") > -1) {
                itemList[i].visible = 1

            } else {
                itemList[i].visible = 0
            }
        }
        box.repositionItems()
    }

    box.setInnerSpaces = function(left, top, right, bottom) {

        spaces.left = left
        spaces.top = top
        spaces.right = right
        spaces.bottom = bottom

    }

    box.setItemAlignment = function(alignType) {

    }

    box.repositionItems = function() {

        var columnATop = spaces.top || 0
        var columnBTop = spaces.top || 0
        var columnBRight = spaces.right || 0

        for (var i = 0; i < itemList.length; i++) {

            if (itemList[i].visible == 1) {

                if (columnATop <= columnBTop) {

                    itemList[i].top = columnATop
                    itemList[i].left = spaces.left
                    columnATop += itemList[i].height

                    box.boxBottomSpace.top = columnATop

                } else {

                    itemList[i].top = columnBTop
                    itemList[i].right = columnBRight
                    columnBTop += itemList[i].height

                    box.boxBottomSpace.top = columnBTop

                }

                itemList[i].opacity = 1

            }
        }
    }

    // *** CODE:

    makeBasicObject(box)
    return box
}
