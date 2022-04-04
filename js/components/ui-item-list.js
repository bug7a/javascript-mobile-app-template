/* Bismillah */

/*

UI ITEM LIST COMPONENT:
- Makes searchable, custom item lists


Started Date: 14 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

createUIItemList(left: float, top: float, width: integer, height: integer) : UIItemList
- Creates a new UIItemList object.
- UIItemList object extends Box object.

listObject.setItemAlign(alignType: string) : void
- Sets the item align type.
- alignType: "vertical", "horizontal", "horizontal-vertical"
- "vertical" for vertical list
- "horizontal" for horizontal categories, cards, etc.
- "horizontal-vertical" for folder view, files, icons, images, etc.

listObject.setInnerSpaces(left: float, top: float, right: integer, bottom: integer) : void
- Sets the border spaces.

listObject.setCreateFunctionOfItem(func: function) : void
- Sets the function that creates the items.

listObject.createItemsByDataList(dataList: array) : void
- Sets the items.
- If you use .searchItemByText() function, dataList must have an element named "searchText".

listObject.addItemToSelectedList(item: CustomObject) : void
- Selects the item.

listObject.removeItemFromSelectedList(item: CustomObject) : void
- Unselects the item.

listObject.getSelectedItemList() : array
- Returns the selected items.
- Supports multiple selections. (If you dont unselect ex item object)

listObject.selectItemByIndex(itemIndex) : void
- Selects the item by index.

listObject.searchItemByText(searchText: string) : void
- Searches the item by text.

listObject.cleanItems() : void
- Cleans the items.

listObject.onItemClick(func: function) : void
- Sets the function that will be called when the item is clicked.
- Example:
    listObject.onItemClick(function(uiItemList, clickedItem, prevClickedItem) {
        print(itemObject.getIndex())
    })

itemObject.isSelected() : boolean
- Returns the selected status of the item before.

itemObject.getData() : itemData
- Returns the item data.

itemObject.getIndex() : integer
- Returns the item index.

*/

UIItemList = {}

var createUIItemList = function(left = 0, top = 0, width = 600, height = page.height) {

    // *** PRIVATE VARIABLES:
    var displayType = "block"
    var itemList = []
    var selectedItemList = []
    var itemCreationFunction = ""
    var onChangeFunc = function() {}

    // *** OBJECT MODEL:
    // BOX: Object container box
    var box = createBox(left, top, width, height)
    that.color = "transparent"
    box.scrollX = 0
    box.scrollY = 0
    box.element.style.wordSpacing = "0px"
    box.element.style.letterSpacing = "0px"
    box.element.style.fontSize = "0px"
    
    // *** PRIVATE METHODS:
    var addItem = function(item) {

        item.element.style.position = "relative"
        item.element.style.display = displayType
        //item.element.style.float = "left"
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
    box.setCreateFunctionOfItem = function(func) {
        itemCreationFunction = func
    }

    box.createItemsByDataList = function(dataList) {
        box.cleanItems()
        if (itemCreationFunction == "") {
            print("UIItemList: .setCreateFunctionOfItem() did not set yet.")

        } else {
            for (var i = 0; i < dataList.length; i++) {
                var item = itemCreationFunction(dataList[i])
                item.data = dataList[i]
                item.index = i
                addItem(item)
            }
        }
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
        return selectedItemList
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
            if (itemList[i].getData().searchText.toLowerCase().search(searchText) > -1) {
                itemList[i].visible = 1

            } else {
                itemList[i].visible = 0
            }
        }
    }

    box.setInnerSpaces = function(left, top, right, bottom) {
        box.element.style.paddingLeft = left + "px"
        box.element.style.paddingTop = top + "px"
        box.element.style.paddingRight = right + "px"
        box.element.style.paddingBottom = bottom + "px"
    }

    box.setItemAlign = function(alignType) {

        if (itemList.length > 0) {
            print("UIItemList: call .setItemAlign() before adding items.")
        }

        switch (alignType) {

            case "horizontal-vertical":
                box.scrollX = 0
                box.scrollY = 1
                box.element.style.whiteSpace = "normal"
                displayType =  "inline-block"
                break;

            case "horizontal":
                box.scrollX = 1
                box.scrollY = 0
                box.element.style.whiteSpace = "nowrap"
                displayType =  "inline-block"
                break;

            case "vertical":
                box.scrollX = 0
                box.scrollY = 1
                box.element.style.whiteSpace = "normal"
                displayType = "block"
                break;
        }   
    }

    // *** CODE:
    box.setItemAlign("vertical")

    makeBasicObject(box)
    return box
}
