
/* Bismillah */

/*

UI GROUP COMPONENT
- It is designed only for multiple objects that are desired to be centered.


Started Date: 30 September 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-group.htm


EXAMPLE USAGE CODE:

const group = UIGroup.create();
that.setInnerSpaces(0, 0, 0, 0);
that.setSpacesBetweenItems(8);
that.setItemAlignment(UIGroup.alignType.VERTICAL, "center");
// alignItem(UIGroup.alignType.VERTICAL, "center");

const lblName = createLabel(0, 0, "auto", "auto");
that.text = "My Name";

const lblLastName = createLabel(0, 0, "auto", "auto");
that.text = "Last Name";

group.addItem(lblName);
group.addItemToBeginning(lblLastName);
//group.removeItemByIndex(0);
//group.clearItems();

let itemCount = group.getItemCount();
let firstItem = group.getFirstItem();
let lastItem = group.getLastItem();

*/

"use strict";
const UIGroup = {};

UIGroup.alignType = {};
UIGroup.alignType.VERTICAL = "vertical";
UIGroup.alignType.HORIZONTAL = "horizontal";

UIGroup.create = function() { // left = 0, top = 0

    // BOX: Component container.
    const box = createBox();

    box.itemList = [];
    box.leftSpace = 0;
    box.rightSpace = 0;
    box.topSpace = 0;
    box.bottomSpace = 0;
    box.spaceBetweenItems = 0;
    box.alignType = UIGroup.alignType.HORIZONTAL;
    box.secondAlign = "center";

    that.clickable = 0;
    that.element.style.overflow = "visible";
    that.color = "transparent";
    that.opacity = 0;

    // setContactFrom("left", "top")
    box.setItemAlignment = function(alignType, secondAlign = "center") {

        // top
        // left
        box.alignType = alignType;

        // for top: left, center, right
        // for left: top, center, bottom
        box.secondAlign = secondAlign;

        box.repositionItemsOneTime();

    };

    box.setInnerSpaces = function(left = 0, top = 0, right = 0, bottom = 0) {

        box.leftSpace = left;
        box.rightSpace = right;
        box.topSpace = top;
        box.bottomSpace = bottom;
        box.repositionItemsOneTime();

    };

    box.setSpacesBetweenItems = function(space = 0) {

        box.spaceBetweenItems = space;
        box.repositionItemsOneTime();

    };

    box.addItem = function(item) {

        item.contElement.style.whiteSpace = "nowrap";
        box.add(item);
        box.itemList.push(item);
        item.onResize(function(self) {
            box.repositionItemsOneTime();
        });

    };

    box.addItemToBeginning = function() {

        item.contElement.style.whiteSpace = "nowrap";
        box.add(item);
        box.itemList.unshift(item);
        item.onResize(function(self) {
            box.repositionItemsOneTime();
        });

    };

    box.removeItemByIndex = function() {

    };

    box.getItemCount = function() {
        return box.itemList.length;
    };

    box.getFirstItem = function() {
        return box.itemList[0];
    };

    box.getLastItem = function() {
        return box.itemList[box.itemList.length - 1];
    };

    box.clearItems = function() {

    };

    box.repositionItemsOneTime = function() {

        clearTimeout(box.timer);

        box.timer = setTimeout(function() {
            box.repositionItems();
        }, 10);

    }

    box.repositionItems = function() {

        if (box.alignType == UIGroup.alignType.HORIZONTAL) {

            let itemLeft = box.leftSpace;
            let highestItemHeight = 0;
            let previousItem = null;

            for( let i = 0; i < box.itemList.length; i++) {

                const item = box.itemList[i];
                if (item.height > highestItemHeight) {
                    highestItemHeight = item.height;
                }

            }

            box.height = box.topSpace + highestItemHeight + box.bottomSpace + (box.border * 2);

            for(let i = 0; i < box.itemList.length; i++) {

                const item = box.itemList[i];

                if (i == 0) {

                    item.left = box.leftSpace;
                    item.center("top");
                    //item.top = item.top + ((item.top - box.bottomSpace));
                    if (item.height < highestItemHeight) {
                        item.top += ((box.topSpace - box.bottomSpace));
                    } else {
                        item.top = box.topSpace;
                    }

                } else {

                    item.aline(previousItem, "right", box.spaceBetweenItems, box.secondAlign);

                }

                itemLeft += item.width + box.spaceBetweenItems;
                previousItem = item;

            }

            itemLeft -= box.spaceBetweenItems;
            box.width = itemLeft + box.rightSpace + (box.border * 2);

        } else if (box.alignType = UIGroup.alignType.VERTICAL) {

            let itemTop = box.topSpace;
            let highestItemWidth = 0;
            let previousItem = null;

            for( let i = 0; i < box.itemList.length; i++) {

                const item = box.itemList[i];
                if (item.width > highestItemWidth) {
                    highestItemWidth = item.width;
                }

            }

            box.width = box.leftSpace + highestItemWidth + box.rightSpace + (box.border * 2);

            for(let i = 0; i < box.itemList.length; i++) {

                const item = box.itemList[i];

                if (i == 0) {

                    item.top = box.topSpace;
                    item.center("left");
                    if (item.width < highestItemWidth) {
                        item.left += ((box.leftSpace - box.rightSpace));
                    } else {
                        item.left = box.leftSpace;
                    }
                    
                } else {

                    item.aline(previousItem, "bottom", box.spaceBetweenItems, box.secondAlign);

                }

                itemTop += item.height + box.spaceBetweenItems;
                previousItem = item;

            }

            itemTop -= box.spaceBetweenItems;
            box.height = itemTop + box.bottomSpace + (box.border * 2);

        }

        box.opacity = 1;

    };

    makeBasicObject(box);
    return box;

};