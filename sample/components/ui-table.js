/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 1 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


EXAMPLE: {javascript-mobile-app-template}/ui-table.htm


*/

"use strict";
const UITable = {};

// SHARED VARIABLES:
UITable.sharedVariable = "sharedVariable";
UITable.default = {};
UITable.resetDefault = function() {

    UITable.default.width = 400;
    UITable.default.height = 300;
    UITable.default.titleHeight = 50;
    UITable.default.leftRightInnerSpace = 10;
    UITable.default.topBottomInnerSpace = 12;
    UITable.default.sortingHeight = 20;


    /*
	UITable.default.value = 1;
	UITable.default.minimumNumber = 1;
	UITable.default.maximumNumber = 10;

    UITable.default.width = 150;
    UITable.default.height = 50;

    UITable.default.backgroundColor = "transparent";
    UITable.default.backgroundBorder = 0;
    UITable.default.backgroundBorderColor = "rgba(0, 0, 0, 0.1)";
    UITable.default.backgroundRound = 23;

    UITable.default.buttonWidth = 42;
    UITable.default.buttonHeight = 42;
    UITable.default.buttonOuterSpace = 4;
    UITable.default.buttonColor = "white";
    UITable.default.buttonBorder = 1;
    UITable.default.buttonBorderColor = "rgba(0, 0, 0, 0.8)";
    UITable.default.buttonRound = 23;
    UITable.default.buttonRightShadow = "-1px 0px 3px rgba(0, 0, 0, 0.0)";
	UITable.default.buttonLeftShadow = "1px 0px 3px rgba(0, 0, 0, 0.0)";
	UITable.default.buttonOpacity = 0.9;
	UITable.default.buttonDisableOpacity = 0.4;

    UITable.default.iconWidth = 32;
    UITable.default.iconHeight = 32;
    UITable.default.iconFileDecrease = "components/ui-stepper/decrease.svg";
    UITable.default.iconFileIncrease = "components/ui-stepper/increase.svg";
    UITable.default.textColor = "rgba(0, 0, 0, 0.8)";
	UITable.default.fontSize = 22;
    */

}
UITable.resetDefault();

UITable.create = function(parameters = {}) {

    // BOX: UI Object container.
	const box = createBox();

	// Default values.
	box.default = {};
	for (let parameterName in UITable.default) {
		box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UITable.default[parameterName];
	}
	
	// *** PRIVATE VARIABLES:

	// *** PUBLIC VARIABLES:
	box.publicVariable = "publicVariable";
    box.titleDataList = [];
    box.itemDataList = [];
	
	// *** OBJECT MODEL:
	box.border = 0;
	box.color = "transparent";
    box.width = box.default.width;
    box.height = box.default.height;
    //box.element.style.whiteSpace = "nowrap";

    // BOX: Titles container.
    box.boxTitles = createBox();
    box.add(that);
    that.color = "transparent";
    that.width = box.width;
    that.height = box.default.titleHeight;
    that.border = 0;
    that.left = 0;
    that.top = 0;

    // BOX: Titles background container
    box.boxTitles.boxBackground = createBox();
    box.boxTitles.add(that);
    that.width = box.width;
    that.element.style.height = "100%";
    that.borderColor = "rgba(0, 0, 0, 0.5)";
    that.color = "transparent";
    that.round = 0;
    that.border = 0;
    that.left = 0;
    that.top = 0;

    // BOX: Items container.
    box.boxItems = createBox();
    box.add(that);
    that.color = "transparent";
    that.width = box.width;
    that.height = box.height - box.default.titleHeight;
    that.border = 0;
    that.scrollY = 1;
    that.left = 0;
    that.top = box.default.titleHeight;

    let titleRowStyle = function() {};
    let titleCellStyle = function() {};
    let itemRowStyle = function() {};
    let itemCellStyle = function() {};

    box.setTitleRowStyle = function(func) {
        titleRowStyle = func;
        titleRowStyle(box.boxTitles);
    };

    box.setTitleCellStyle = function(func) {
        titleCellStyle = func;
    };

    box.setItemRowStyle = function(func) {
        itemRowStyle = func;
    };

    box.setItemCellStyle = function(func) {
        itemCellStyle = func;
    };

    const createTitleCell = (titleData, titleIndex) => {
        
        // BOX: Title container
        const titleCell = createBox();
        titleCell.color = "transparent";
        titleCell.width = titleData.width || 100;
        titleCell.height = box.default.titleHeight;

        // BOX: Title background container
        titleCell.boxBackground = createBox();
        titleCell.add(that);
        that.width = titleCell.width;
        that.height = titleCell.height;
        that.color = "transparent";
        that.borderColor = "rgba(0, 0, 0, 0.5)";
        that.border = 0;
        //that.element.style.borderLeft = "1px solid rgba(0, 0, 0, 0.5)";
        that.clickable = 1;
        that.round = 0;
        that.left = 0;
        that.top = 0;

        // LABEL: Title text
        titleCell.lblValue = createLabel();
        titleCell.add(that);
        that.width = titleCell.width - (UITable.default.leftRightInnerSpace * 2);
        //that.widht = "auto";
        that.height = "auto";
        //that.textAlign = titleData.titleTextAlign;
        that.element.style.whiteSpace = "nowrap";
        that.element.style.textOverflow = "ellipsis";
        that.left = UITable.default.leftRightInnerSpace;
        that.fontSize = 16;
        //that.element.style.fontFamily = "opensans-bold";
        that.text = titleData.name;
        titleCell.lblValue.center("top");
        titleCell.lblValue.onResize((self) => {
            self.center("top");
        });

        // BOX: Title background container
        titleCell.boxArrows = createBox();
        titleCell.add(that);
        that.width = 12;
        that.height = UITable.default.sortingHeight;
        that.color = "whitesmoke";
        that.borderColor = "rgba(0, 0, 0, 0.5)";
        that.border = 0;
        that.round = 6;
        that.right = UITable.default.leftRightInnerSpace;
        that.center("top");

        // IMAGE: ASC arrow icon
        titleCell.boxArrows.imgUp = createImage();
        titleCell.boxArrows.add(that);
        that.width = 12;
        that.height = 12;
        that.load("components/ui-table/asc.svg");
        that.center();
        that.top -= 3;

        // IMAGE: DESC arrow icon
        titleCell.boxArrows.imgUp = createImage();
        titleCell.boxArrows.add(that);
        that.width = 12;
        that.height = 12;
        that.load("components/ui-table/desc.svg");
        that.center();
        that.top += 3;

        titleCell.boxArrows.clickable = 0;
        titleCell.position = "relative";
        titleCell.element.style.display = "inline-block";

        titleCellStyle(titleCell, titleData, titleIndex);

        return titleCell;

    };

    const createItemRow = (itemData, itemIndex) => {

        // BOX: Item row container
        const itemRow = createBox();
        itemRow.color = "transparent";
        itemRow.width = box.width;
        itemRow.height = 50;
        //itemRow.element.style.verticalAlign = "top";

        // BOX: Item row background container
        itemRow.boxBackground = createBox();
        itemRow.add(that);
        that.width = box.width;
        that.element.style.height = "100%";
        that.borderColor = "rgba(0, 0, 0, 0.5)";
        that.color = "transparent";
        that.round = 0;
        that.border = 0;
        that.left = 0;
        that.top = 0;
        that.clickable = 1;

        itemRow.forEach = (callback) => {
            for(var i = 0; i < itemRow.cellList.length; i++) {
                callback(itemRow.cellList[i]);
            }
        };

        itemRowStyle(itemRow, itemData, itemIndex);
        return itemRow;

    }

    const createItemCell = (cellData, titleData, itemRow, itemCellIndex) => {

        // BOX: Item cell container
        const itemCell = createBox();
        itemCell.color = "transparent";
        itemCell.width = titleData.width || 100;
        itemCell.element.style.height = "100%";

        // BOX: Title background container
        itemCell.boxBackground = createBox();
        itemCell.add(that);
        that.width = itemCell.width;
        //that.height = itemCell.height;
        that.element.style.height = "100%";
        that.borderColor = "rgba(0, 0, 0, 0.1)";
        that.round = 0;
        that.border = 0;
        that.color = "transparent";
        that.left = 0;
        that.top = 0;

        // LABEL: Title
        itemCell.lblValue = createLabel();
        itemCell.add(that);
        //that.textAlign = titleData.itemTextAlign;
        that.width = itemCell.width - (UITable.default.leftRightInnerSpace * 2);
        that.height = "auto";
        //that.element.style.whiteSpace = "nowrap";
        that.fontSize = 16;
        that.text = cellData;
        that.left = UITable.default.leftRightInnerSpace;
        that.top = UITable.default.topBottomInnerSpace;
        //that.element.style.position = "relative";
        that.onResize((self) => {
            if ((itemCell.lblValue.height+(UITable.default.topBottomInnerSpace*2)) >= itemRow.height) {
                itemRow.height = itemCell.lblValue.height + (UITable.default.topBottomInnerSpace*2);
            }
            itemCell.lblValue.top = (itemCell.element.offsetHeight - itemCell.lblValue.height)/2;
        });

        itemCell.onResize((self) => {
            self.lblValue.top = (self.element.offsetHeight - self.lblValue.height)/2;
        });

        // BOX: Title background container
        itemCell.boxFront = createBox();
        itemCell.add(that);
        that.width = itemCell.width;
        //that.height = itemCell.height;
        that.element.style.height = "100%";
        that.borderColor = "rgba(0, 0, 0, 0.1)";
        that.round = 0;
        that.border = 0;
        that.color = "transparent";
        that.left = 0;
        that.top = 0;

        itemCell.clickable = 0;

        itemCellStyle(itemCell, cellData, titleData, itemRow, itemCellIndex);
        return itemCell;
        
    }

    const createItemRowWithCells = (itemData, itemRowIndex) => {

        const itemRow  = createItemRow(itemData, itemRowIndex);
        itemRow.cellList = [];

        for(var i = 0; i < box.titleDataList.length; i++) {
            //console.log(box.titleDataList[i]);
            const itemCell = createItemCell(itemData[box.titleDataList[i].valueIndex], box.titleDataList[i], itemRow, i);
            itemRow.add(itemCell);
            itemCell.position = "relative";
            itemCell.element.style.display = "inline-block";
            itemCell.element.style.verticalAlign = "top";
            itemRow.cellList.push(itemCell);
        }

        return itemRow;

    }

    box.createTitles = (titleDataList) => {
        box.titleDataList = [...titleDataList];
        for(var i = 0; i < box.titleDataList.length; i++) {
            const title = createTitleCell(box.titleDataList[i], i);
            box.boxTitles.add(title);
        }
        makeBasicObject(box);
    };

    box.createItems = (itemDataList) => {
        box.itemDataList = [...itemDataList];
        for(var i = 0; i < itemDataList.length; i++) {
            const item = createItemRowWithCells(itemDataList[i], i);
            //title.left = 0;
            //title.top = 0;
            item.position = "relative";
            //item.element.style.display = "inline-block";
            box.boxItems.add(item);
        }
        makeBasicObject(box);
    }

	// *** FIRST RUN CODE:
    /*
	box.boxDecrease.onClick(decreaseNumber);
	box.boxIncrease.onClick(increaseNumber);
	box.setValue(num(currentValue));
	box.refreshButtonsOpacity();
    */
	
	makeBasicObject(box);
	return box;
    
}


// SHARED METHODS:
UITable.sharedMethod = function() {
	return "sharedMethod";
}