/* Bismillah */

/*

UI ITEM LIST COMPONENT:
- Makes searchable, custom item lists.


Started Date: 14 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/js/page/default/home-page.js
EXAMPLE: {cordova-mobile-app-ui-template}/js/page/default/search-page.js
EXAMPLE: {cordova-mobile-app-ui-template}/js/page/default/examples-page.js


USAGE OF UI COMPONENT:

UIItemList.create({ width: 200, height: 200 }) : UIItemList
- Creates a new UIItemList object.
- UIItemList object extends Box object.

uiItemList.setItemAlignment(alignType: String)
- Sets the item align type.
- alignType: "vertical", "horizontal", "both"
- "vertical" for vertical list
- "horizontal" for horizontal categories, cards, etc.
- "both" for folder view, files, icons, images, etc.

UIItemList.alignType.VERTICAL;
UIItemList.alignType.HORIZONTAL;
UIItemList.alignType.BOTH;

uiItemList.setInnerSpaces(left: Float, top: Float, right: Integer, bottom: Integer)
- Sets the border spaces.

uiItemList.setItemCreationFunction(func: Function)
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

uiItemList.setItemCreationFunction(createItem)

--- EXAMPLE END ---

uiItemList.createItemsByDataList(dataList: Array)
- Sets the items.
- If you use .searchItemByText() function, dataList must have an element named "searchText".

--- EXAMPLE ---

var itemDataList = [
    { titleText:"Broccoli", descriptionText:"Vegetable", iconFile:"images/fruids/brokoli.png", searchText: "Broccoli Vegetable" },
    { titleText:"Strawberry", descriptionText:"Fruit", iconFile:"images/fruids/cilek.png", searchText: "Strawberry Fruit" },
    { titleText:"Tomato", descriptionText:"Vegetable", iconFile:"images/fruids/domates.png", searchText: "Tomato Vegetable" },
]

uiItemList.createItemsByDataList(itemDataList)

--- EXAMPLE END ---

uiItemList.getItemList() : Array
- Returns the items.

uiItemList.getSelectedItemList() : Array
- Returns the selected items.
- Supports multiple selections. (If you dont unselect ex item object)

uiItemList.addItemToSelectedList(item: ItemObject)
- Selects the item.

uiItemList.removeItemFromSelectedList(item: ItemObject)
- Unselects the item.

uiItemList.selectItemByIndex(itemIndex)
- Selects the item by index.

uiItemList.searchItemByText(searchText: String)
- Searches the item by text.

uiItemList.clearItems()
- Cleans the items.

uiItemList.onSelectionChange(func: Function)
- Sets the function that will be called when the item is clicked.

--- EXAMPLE: single selection ---

var itemChanged = function(uiItemList, clickedItem, prevClickedItem) {

    if (!clickedItem.isSelected()) {

        if (prevClickedItem) {
            prevClickedItem.boxBackground.color = "white"
            uiItemList.removeItemFromSelectedList(prevClickedItem)
        }

        // Selected item properties
        clickedItem.boxBackground.color = "red"
        uiItemList.addItemToSelectedList(clickedItem)

        print("Selected item: " + uiItemList.getIndex() + "-" + clickedItem.getData().titleText)

    }

}

uiItemList.onSelectionChange(itemChanged)

--- EXAMPLE END ---

--- EXAMPLE: multi selection ---

var itemChanged = function(uiItemList, clickedItem, prevClickedItem) {

    if (clickedItem.isSelected()) {
        clickedItem.boxBackground.color = "white"
        uiItemList.removeItemFromSelectedList(clickedItem)

    } else {
        clickedItem.boxBackground.color = "red"
        uiItemList.addItemToSelectedList(clickedItem)
    }

    print("Selected item list length: " + uiItemList.getSelectedItemList().length)

}

uiItemList.onSelectionChange(itemChanged)

--- EXAMPLE END ---

itemObject.isSelected() : Boolean
- Returns the selected status of the item before.

itemObject.getData() : itemData
- Returns the item data.

itemObject.getIndex() : Integer
- Returns the item index.

uiItemList.forEach(function (item) {
    // print(item.getData());
});

*/

"use strict";
const UIItemList = {};

// "list" "columns" "icons"
UIItemList.alignType = {};
UIItemList.alignType.VERTICAL = "vertical";
UIItemList.alignType.HORIZONTAL = "horizontal";
UIItemList.alignType.BOTH = "both";

UIItemList.create = function(parameters = {}) {

    // *** PARAMETERS:
    if (!parameters.width) parameters.width = 600;
    if (!parameters.height) parameters.height = getDefaultContainerBox().height;

    // BOX: UI object container.
    const box = createBox();

    // *** PRIVATE VARIABLES:
    let displayType = "block";
    let itemList = [];
    let selectedItemList = [];
    let itemCreationFunction = "";
    let onSelectionChangeFunc = function() {};

    // *** OBJECT MODEL:
    box.width = parameters.width;
    box.height = parameters.height;
    box.color = "transparent";
    box.scrollX = 0;
    box.scrollY = 0;
    box.element.style.wordSpacing = "0px";
    box.element.style.letterSpacing = "0px";
    box.element.style.fontSize = "0px";
    
    // *** PRIVATE METHODS:
    const addItem = function(item) {

        item.element.style.position = "relative";
        item.left = 0;
        item.top = 0;
        item.element.style.display = displayType;
        //item.element.style.float = "left";

        item.onClick(function(self, event) {

            const lastSelectedItem = getLastSelectedItem();
            onSelectionChangeFunc(box, self, lastSelectedItem, event);

        });

        item.isSelected = function() {

            for (let i = 0; i < selectedItemList.length; i++) {
                if (selectedItemList[i].getIndex() == item.getIndex()) {
                    return 1;
                }
            }
            return 0;

        };

        item.getData = function() {
            return item.data;
        };

        item.getIndex = function() {
            return item.index;
        };

        itemList.push(item);
        box.add(item);
        that = box;

    };

    const getLastSelectedItem = function() {

        let lastSelectedItem = "";
        if (selectedItemList.length > 0) {
            lastSelectedItem = selectedItemList[selectedItemList.length - 1];
        }

        return lastSelectedItem;

    };

    // *** PUBLIC METHODS:
    box.setItemCreationFunction = function(func) {
        itemCreationFunction = func;
    };

    box.getItemList = function() {
        return [...itemList];
    };

    box.createItemsByDataList = function(dataList) {

        box.clearItems();
        if (!itemCreationFunction) {
            print("UIItemList: .setItemCreationFunction() did not set yet.");

        } else {
            for (let i = 0; i < dataList.length; i++) {

                const item = itemCreationFunction(dataList[i], box);
                item.data = dataList[i];
                item.index = i;
                addItem(item);

            }
        }

    };

    box.addItemToSelectedList = function(item) {

        if (item.isSelected() == 0) {
            selectedItemList.push(item);
        }

    };

    box.removeItemFromSelectedList = function(item) {

        if (item.isSelected() == 1) {
            const newSelectedItemList = [];

            for (let i = 0; i < selectedItemList.length; i++) {
                if (selectedItemList[i].getIndex() != item.getIndex()) {
                    newSelectedItemList.push(selectedItemList[i]);
                }
            }
            selectedItemList = newSelectedItemList;
        }

    };

    box.getSelectedItemList = function() {
        return [...selectedItemList];
    };

    box.selectItemByIndex = function(index) {

        if(itemList.length > index) {

            const item = itemList[index];
            const lastSelectedItem = getLastSelectedItem();
            onSelectionChangeFunc(box, item, lastSelectedItem);

        }

    };

    box.clearItems = function() {

        box.html = "";
        itemList = [];
        selectedItemList = [];

    };

    box.onSelectionChange = function(func) {
        onSelectionChangeFunc = func;
    };

    box.searchItemByText = function(searchText) {

        searchText = searchText.toLowerCase();

        for (let i = 0; i < itemList.length; i++) {
            let _searchedText = itemList[i].getData().searchText.toLowerCase();

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
                itemList[i].visible = 1;

            } else {
                itemList[i].visible = 0;
            }
        }

    };

    box.setInnerSpaces = function(left, top, right, bottom) {

        box.element.style.paddingLeft = left + "px";
        box.element.style.paddingTop = top + "px";
        box.element.style.paddingRight = right + "px";
        box.element.style.paddingBottom = bottom + "px";

    };

    box.setItemAlignment = function(alignType) {

        if (itemList.length > 0) {
            print("UIItemList: call .setItemAlignment() before adding items.");
        }

        switch (alignType) {

            case UIItemList.alignType.BOTH:
                box.scrollX = 0;
                box.scrollY = 1;
                box.element.style.whiteSpace = "normal";
                displayType =  "inline-block";
                break;

            case UIItemList.alignType.HORIZONTAL:
                box.scrollX = 1;
                box.scrollY = 0;
                box.element.style.whiteSpace = "nowrap";
                displayType =  "inline-block";
                break;

            case UIItemList.alignType.VERTICAL:
                box.scrollX = 0;
                box.scrollY = 1;
                box.element.style.whiteSpace = "normal";
                displayType = "block";
                break;
        }   
    };

    box.forEach = function(sendItem = function() {}) {

        for (let i = 0; i < itemList.length; i++) {
            sendItem(itemList[i]);
        }

    }

    // *** CODE:
    box.setItemAlignment(UIItemList.alignType.VERTICAL);

    makeBasicObject(box);
    return box;

}
