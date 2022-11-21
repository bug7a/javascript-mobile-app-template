/* Bismillah */

/*

UI COMPONENT TEMPLATE:

Started Date: 14 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-tabs.htm


*/

"use strict";
const UITabs = {};

// SHARED VARIABLES:
UITabs.default = {};
UITabs.resetDefault = function() {
    
    UITabs.default.width = 500;
    UITabs.default.autoWidth = 1;
    UITabs.default.height = 50;
    UITabs.default.backgroundColor = "#E4E4E4" // lightgray;
    UITabs.default.selectedItemColor = "white";
    UITabs.default.itemAlign = "center" // Only center;
    UITabs.default.round = 13;
    UITabs.default.itemOuterSpace = 1;
    UITabs.default.itemInnerSpaceX = 20;
    UITabs.default.itemFontSize = 20;
    UITabs.default.itemTextColor = "rgba(0, 0, 0, 0.8)" // "rgba(255, 255, 255, 0.8)";
    UITabs.default.itemIconSize = 28;
    UITabs.default.itemSelectedTextColor = "rgba(0, 0, 0, 0.8)";

}
UITabs.resetDefault();

UITabs.create = function(parameters = {}) {

    // BOX: UI object container.
    const box = createBox();

    // Default values.
	box.default = {};
	for (let parameterName in UITabs.default) {
		box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UITabs.default[parameterName];
	}
    
    // *** PRIVATE VARIABLES:
    let onChangeFunc = function() {};

    // *** PUBLIC VARIABLES:
    box.itemList = [];
    box.itemDataList = [];
    box.selectedIndex = -1;
    box.totalSpaceX = box.default.itemOuterSpace + box.default.itemOuterSpace + box.default.itemInnerSpaceX + box.default.itemInnerSpaceX;

    // *** OBJECT MODEL:
    box.height = box.default.height;
    box.border = 0;
    box.round = box.default.round;
    box.color = box.default.backgroundColor;
    box.setMotion("background-color 0.2s, opacity 0.2s");
    
    // Autowidth
    if (box.default.autoWidth) {
        box.width = 0;
    } else {
        box.width = box.default.width;
    }

    // *** PUBLIC METHODS:
    box.setItemsByDataList = function(dataList) {

        box.selectedIndex = -1;
        box.itemList = [];
        box.itemDataList = [...dataList];
        
        box.html = "";
        
        box.color =  box.default.backgroundColor;

        // BOX: Selected container box.
        box.boxSelected = createBox(-1000, 0, box.height, box.height);
        box.add(that);
        that.color = "transparent";
        //that.left = -1 * box.boxSelected.width;
        that.opacity = 0;
        that.center();
        //that.left = 0;
        that.setMotion("left 0.2s, opacity 0.2s"); // width 0.2s, 

        // BOX: Selected background box.
        box.boxSelected.boxBack = createBox(box.default.itemOuterSpace, box.default.itemOuterSpace);
        box.boxSelected.add(that);
        that.round = box.default.round;
        that.color = box.default.selectedItemColor;
        that.setMotion("width 0.2s, background-color 0.2s");

        if (dataList[0].selectedColor) {
            box.boxSelected.boxBack.color = dataList[0].selectedColor;
        } else {
            box.boxSelected.boxBack.color = box.default.selectedItemColor;
        }

        box.boxSelected.onResize(function(self) {
            self.boxBack.width = self.width - box.default.itemOuterSpace - box.default.itemOuterSpace;
            self.boxBack.height = self.height - box.default.itemOuterSpace - box.default.itemOuterSpace;
        })

        for (let i = 0; i < dataList.length; i++) {

            box.createItem(dataList[i], i);
            box.add(that);
            that.data = dataList[i];
            that.index = i;
            box.itemList.push(that);

        }

        box.selectItem(box.itemList[0]);
        box.refresh();

        makeBasicObject(box);

    }

    box.createItem = function(dataList, index) {

        // BOX: Item container box.
        const item = createBox();
        that.color = "transparent";
        that.width = box.height;
        that.height = box.height;
        that.element.style.cursor = "pointer";
        that.onClick(function(self) {
            box.selectItem(self);
        });
        that.opacity = 0;
        that.left = 0;
        that.top = 0;
        that.setMotion("left 0.1s, width 0.1s, opacity 0.1s");
        
        // BOX: Item background box.
        item.boxBack = createBox(0, box.default.itemOuterSpace, box.height, item.height - box.default.itemOuterSpace - box.default.itemOuterSpace);
        item.add(that);
        that.color = "transparent";
        that.round = box.default.round;
        that.setMotion("width 0.1s");
        
        // LABEL: Item text.
        item.lblTitle = createLabel(0, 0, "auto", "auto");
        item.add(that);
        that.text = dataList.text;
        that.fontSize = box.default.itemFontSize;
        that.textColor = box.default.itemTextColor;
        that.setMotion("color 0.2s");

        // IMAGE: item icon image.
        item.imgIcon = createImage(0, 0, box.default.itemIconSize, box.default.itemIconSize);
        item.add(that);
        that.space = 0;
        if (dataList.iconFile) {
            that.load(dataList.iconFile);
            that.visible = 1;
        } else {
            that.visible = 0;
        }
        
        item.lblTitle.onResize(function(self) {
            if (dataList.iconFile) {

                item.width = self.width + item.imgIcon.width + 4 + box.totalSpaceX;
                item.boxBack.width = item.width - box.default.ItemSpace - box.default.ItemSpace;

                item.imgIcon.left = box.default.itemOuterSpace + box.default.itemInnerSpaceX;
                item.imgIcon.center("top");
                self.aline(item.imgIcon, "right", 4);
                self.center("top");

            } else {

                item.width = self.width + box.totalSpaceX;
                item.boxBack.width = item.width - box.default.ItemSpace - box.default.ItemSpace;

                self.center();

            }

            box.refresh();

        })

        if (!dataList.text) {

            item.width = item.imgIcon.width + box.totalSpaceX;
            item.boxBack.width = item.width - box.default.ItemSpace - box.default.ItemSpace;

            item.imgIcon.center();

        }

        item.getData = function() {
            return item.data;
        }

        item.getIndex = function() {
            return item.index;
        }

        item.getId = function() {
            return item.data.id;
        }

        makeBasicObject(item);
        return item;

    }

    box.resizeItems = function() {

    }

    box.refresh = function() {

        clearTimeout(box.refreshTimer);

        box.refreshTimer = setTimeout(function() {
            box.repositionItems();
        }, 0);     

    }

    box.repositionItems = function() {

        box.default.itemTotalWidth = 0;

        for (let i = 0; i < box.itemList.length; i++) {
            box.default.itemTotalWidth += box.itemList[i].width;
        }

        let _startLeft = 0;

        if (box.default.autoWidth) {
            _startLeft = 0;
            box.width = box.default.itemTotalWidth;
        } else {
            _startLeft = (box.width - box.default.itemTotalWidth) / 2;
        }

        for (let i = 0; i < box.itemList.length; i++) {
            
            box.itemList[i].left = _startLeft;
            box.itemList[i].top = 0;
            box.itemList[i].opacity = 1;

            _startLeft += box.itemList[i].width;
        }

        box.boxSelected.width = box.itemList[box.selectedIndex].width;
        box.boxSelected.left = box.itemList[box.selectedIndex].left;

    }

    box.setBackgroundColor = function(color) {
        box.default.backgroundColor = color;
        box.color = color;
    }

    box.selectItem = function(item) {

        let previousItem;
        
        if (box.selectedIndex != -1) {

            previousItem = box.itemList[box.selectedIndex];

            previousItem.clickable = 1;

            previousItem.lblTitle.textColor = box.default.itemTextColor;

            if (previousItem.data.selectedIconFile && previousItem.data.iconFile && previousItem !== item) {
                previousItem.imgIcon.load(previousItem.data.iconFile);
            }

        } else {
            
            box.boxSelected.dontMotion();
            box.boxSelected.boxBack.dontMotion();

        }

        box.selectedIndex = item.index;

        box.boxSelected.width = item.width;
        box.boxSelected.left = item.left;
        box.boxSelected.opacity = 1;

        item.clickable = 0;

        if (item.data.selectedTextColor) {
            item.lblTitle.textColor = item.data.selectedTextColor;
        } else if (box.default.itemSelectedTextColor) {
            item.lblTitle.textColor = box.default.itemSelectedTextColor;
        }

        if (item.data.selectedColor) {
            box.boxSelected.boxBack.color = item.data.selectedColor;
        } else {
            box.boxSelected.boxBack.color = box.default.selectedItemColor;
        }

        if (item.data.selectedIconFile) {
            item.imgIcon.load(item.data.selectedIconFile);
        }

        onChangeFunc(item, item.index);

    }

    box.selectItemByIndex = function(index) {

        if (box.itemList.length > index && index > -1) {
            box.selectItem(box.itemList[index]);
        }

    }

    box.getSelectedItem = function() {
        return box.itemList[box.selectedIndex];
    }

    box.getSelectedIndex = function() {
        return box.selectedIndex;
    }

    box.onChange = function(func) {
        onChangeFunc = func;
    }

    box.dontMotion_boxSelected = function() {
        box.boxSelected.dontMotion();
        box.boxSelected.boxBack.dontMotion();
    }

    // *** FIRST RUN CODE:

    makeBasicObject(box);
    return box;
}
