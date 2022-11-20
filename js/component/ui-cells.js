/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 14 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-cells.htm


*/

"use strict";
const UICells = {};

UICells.alignType = {};
UICells.alignType.VERTICAL = "vertical";
UICells.alignType.HORIZONTAL = "horizontal";

UICells.create = function(box, align, sizes) {

    let usedSize = 0;
    let autoCellCount = 0;
    let autoCellSize = 0;

    box.cell = function(cellIndex) {
        return box.cell.itemList[cellIndex];
    }

    box.cell.itemList = [];
    box.cell.getCount = function() {
        return box.cell.itemList.length;
    }

    for (let i = 0; i < sizes.length; i++) {

        createBox();
        box.add(that);
        that.left = 0;
        that.top = 0;
        that.color = "transparent";

        if (sizes[i] != "auto") {

            if (align == UICells.alignType.VERTICAL) {

                that.height = sizes[i];
                that.width = box.width;

            } else {

                that.width = sizes[i];
                that.height = box.height;
                
            }

            usedSize += sizes[i];

        } else {
            autoCellCount++;
        }

        box.cell.itemList.push(that);

    }

    if (align == UICells.alignType.VERTICAL) {
        autoCellSize = (box.height - usedSize) / autoCellCount;

    } else {
        autoCellSize = (box.width - usedSize) / autoCellCount;
    }

    let countCellSize = 0;

    for (let i = 0; i < box.cell.itemList.length; i++) {

        if (align == UICells.alignType.VERTICAL) {

            box.cell.itemList[i].top = countCellSize;

            if (sizes[i] == "auto") {
                box.cell.itemList[i].height = autoCellSize;
                box.cell.itemList[i].width = box.width;
            }

            countCellSize += box.cell.itemList[i].height;
    
        } else {

            box.cell.itemList[i].left = countCellSize;

            if (sizes[i] == "auto") {
                box.cell.itemList[i].width = autoCellSize;
                box.cell.itemList[i].height = box.height;
            }

            countCellSize += box.cell.itemList[i].width;

        }

    }
    
}