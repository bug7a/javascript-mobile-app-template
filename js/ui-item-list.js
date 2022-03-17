/* Bismillah */

/*


Started Date: 14 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


UI ITEM LIST COMPONENT:
- Makes searchable, custom item lists


HANDBOOK:

createUIItemList(x: float, y: float, width: integer, height: integer) : UIItemList
- Creates a new UIItemList object.
- UIItemList object extends Box object.

listObject.setItemAlign(alignType: string) : void
- Sets the item align type.
- alignType: "vertical", "horizontal", "horizontal-vertical"
- "vertical" for vertical list
- "horizontal" for horizontal categories, cards, etc.
- "horizontal-vertical" for folder view, files, icons, images, etc.

listObject.setBorderSpaces(left: integer, top: integer, right: integer, bottom: integer) : void
- Sets the border spaces.

listObject.setCreateFunctionOfItem(func: function) : void
- Sets the function that creates the items.

listObject.setItemsWithData(dataList: array) : void
- Sets the items.
- If you use .searchItemByText() function, dataList must have an element named "searchText".

listObject.addItemToSelectedList(itemObject: CustomObject) : void
- Selects the item.

listObject.removeItemFromSelectedList(itemObject: CustomObject) : void
- Unselects the item.

listObject.getSelectedItemList() : array
- Returns the selected items.
- Supports multiple selections. (If you dont unselect ex item object)

listObject.selectItemByIndex(itemIndex) : void
- Selects the item by index.

listObject.searchItemByText(searchText: string) : void
- Searches the item by text.

itemObject.isSelected() : boolean
- Returns the selected status of the item before.

itemObject.getData() : itemData
- Returns the item data.

itemObject.getIndex() : integer
- Returns the item index.

*/

UIItemList = {}

var createUIItemList = function(x = 0, y = 0, width = 600, height = page.height) {

    // BOX: Object container box
    var box = createBox(x, y, width, height)
    that.color = "transparent"
    box.scrollX = 0
    box.scrollY = 0
    box.element.style.wordSpacing = "0px"
    box.element.style.letterSpacing = "0px"
    box.element.style.fontSize = "0px"
    
    box.displeyText = "block"
    box.itemObjectList = []
    box.selectedItemObjectList = []
    box.itemCreationFunction = ""
    box.onItemClickFunc = function() {}
    box.selectedItemObject = ""

    box._addItemWithObject = function(itemObject) {

        itemObject.element.style.position = "relative"
        itemObject.element.style.display = box.displeyText
        //itemObject.element.style.float = "left"
        itemObject.onClick(function(self) {
            var lastSelectedItemObject = box._getLastSelectedItemObject()
            box.onItemClickFunc(box, self, lastSelectedItemObject)
        })

        itemObject.isSelected = function() {

            for (var i = 0; i < box.selectedItemObjectList.length; i++) {
                if (box.selectedItemObjectList[i].getIndex() == itemObject.getIndex()) {
                    return 1
                }
            }
            return 0
        }

        itemObject.getData = function() {
            return itemObject.data
        }

        itemObject.getIndex = function() {
            return itemObject.index
        }

        box.itemObjectList.push(itemObject)
        box.add(itemObject)
        that = box
    }

    box._getLastSelectedItemObject = function() {

        var lastSelectedItemObject = ""
        if (box.selectedItemObjectList.length > 0) {
            lastSelectedItemObject = box.selectedItemObjectList[box.selectedItemObjectList.length - 1]
        }
        return lastSelectedItemObject
    }

    box.setCreateFunctionOfItem = function(func) {
        box.itemCreationFunction = func
    }

    box.setItemsWithData = function(dataList) {

        box.cleanItems()

        if (box.itemCreationFunction == "") {
            print("UIItemList: .setCreateFunctionOfItem() did not set yet.")

        } else {
            for (var i = 0; i < dataList.length; i++) {
                var itemObject = box.itemCreationFunction(dataList[i])
                itemObject.data = dataList[i]
                itemObject.index = i
                box._addItemWithObject(itemObject)
            }
        }
    }

    box.addItemToSelectedList = function(itemObject) {
        if (itemObject.isSelected() == 0) {
            box.selectedItemObjectList.push(itemObject)
        }
    }

    box.removeItemFromSelectedList = function(itemObject) {

        if (itemObject.isSelected() == 1) {
            var newSelectedItemObjectList = []

            for (var i = 0; i < box.selectedItemObjectList.length; i++) {
                if (box.selectedItemObjectList[i].getIndex() != itemObject.getIndex()) {
                    newSelectedItemObjectList.push(box.selectedItemObjectList[i])
                }
            }
            box.selectedItemObjectList = newSelectedItemObjectList
        }
    }

    box.getSelectedItemList = function() {
        return box.selectedItemObjectList
    }

    box.selectItemByIndex = function(index) {

        if(box.itemObjectList.length > index) {
            var itemObject = box.itemObjectList[index]
            var lastSelectedItemObject = box._getLastSelectedItemObject()
            box.onItemClickFunc(box, itemObject, lastSelectedItemObject)
        }
    }

    box.cleanItems = function() {
        box.html = ""
        box.itemObjectList = []
        box.selectedItemObjectList = []
    }

    box.onItemClick = function(func) {
        box.onItemClickFunc = func
    }

    box.searchItemByText = function(searchText) {
        searchText = searchText.toLowerCase()
        for (var i = 0; i < box.itemObjectList.length; i++) {
            if (box.itemObjectList[i].getData().searchText.toLowerCase().search(searchText) > -1) {
                box.itemObjectList[i].visible = 1

            } else {
                box.itemObjectList[i].visible = 0
            }
        }
    }

    box.setBorderSpaces = function(left, top, right, bottom) {
        box.element.style.paddingLeft = left + "px"
        box.element.style.paddingTop = top + "px"
        box.element.style.paddingRight = right + "px"
        box.element.style.paddingBottom = bottom + "px"
    }

    box.setItemAlign = function(alignType) {

        if (box.itemObjectList.length > 0) {
            print("UIItemList: call .setItemAlign() before adding items.")
        }

        switch (alignType) {

            case "horizontal-vertical":
                box.scrollX = 0
                box.scrollY = 1
                box.element.style.whiteSpace = "normal"
                box.displeyText =  "inline-block"
                break;

            case "horizontal":
                box.scrollX = 1
                box.scrollY = 0
                box.element.style.whiteSpace = "nowrap"
                box.displeyText =  "inline-block"
                break;

            case "vertical":
                box.scrollX = 0
                box.scrollY = 1
                box.element.style.whiteSpace = "normal"
                box.displeyText = "block"
                break;
        }   
    }

    // Default settings
    box.setItemAlign("vertical")

    makeBasicObject(box)
    return box
}
