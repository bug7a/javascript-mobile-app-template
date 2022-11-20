/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


const sideBar = {};
sideBar.itemList = [];
sideBar.selectedItem = null;
sideBar.selectedItemIndex = -1;
sideBar.onSelectionChangeFunc = function() {};

sideBar.lockScreenButton = {};
sideBar.lockScreenButton.onClickFunc = function() {};

sideBar.create = function() {

    // BOX: UI Component container.
    const box = createBox(0, 0, getDefaultContainerBox().width, getDefaultContainerBox().height);
    sideBar.box = box;
    box.color = "transparent";
    box.border = 0;
    box.visible = 0;

    // BOX: Cover.
    box.boxCover = createBox(0, 0, getDefaultContainerBox().width, getDefaultContainerBox().height);
    box.add(that);
    that.color = "rgba(0, 0, 0, 0.4)";
    that.setMotion("opacity 0.2s");
    that.onClick(function() {
        sideBar.setVisible(0);
    });

    // BOX: Menu content container and background.
    box.boxContent = createBox();
    box.add(that);
    that.border = 0;
    //that.borderColor = "rgba(0, 0, 0, 0.1)";
    //that.element.style.borderBottomWidth = "2px";
    //that.element.style.borderBottomWidth = "2px";
    //that.color = "white";
    that.color = "whitesmoke";
    that.right = 0;
    that.width = 450; //getDefaultContainerBox().width * 0.8;
    that.height = getDefaultContainerBox().height - 8;
    that.top = 4;
    that.element.style.borderTopLeftRadius = "13px";
    that.element.style.borderBottomLeftRadius = "13px";
    that.setMotion("right 0.2s, opacity 0.2s");

    // LABEL: Menu title text.
    box.boxContent.lblTitle = createLabel(40, 46, "auto");
    box.boxContent.add(that);
    that.text = "";
    that.element.style.fontFamily = "opensans-bold";
    that.fontSize = 28;

    // BOX: Items container.
    box.boxContent.boxItems = createBox(0, 105, box.boxContent.width, box.boxContent.height - 200);
    box.boxContent.add(that);
    that.color = "transparent";
    that.scrollY = 1;

    // You can add your custom objects:

    // IMAGE: Lock button icon.
    box.boxContent.imgLock = createImage(0, 0, 50, 50);
    box.boxContent.add(that);
    that.load("assets/lock.png");
    that.bottom = 30;
    that.right = 30;
    //that.color = "whitesmoke";
    that.color = "white";
    that.border = 1;
    that.round = 4;
    that.space = 25;
    that.onClick(function(self) {
        sideBar.setVisible(0);
        sideBar.lockScreenButton.onClickFunc();
    });

}

sideBar.createItemsByDataList = function(list) {

    sideBar.removeItems();

    for (let i = 0; i < list.length; i++) {
        sideBar.addItem(list[i], i);
    }

}

sideBar.addItem = function(itemData, itemIndex) {

    const ITEM_HEIGHT = 54;

    // BOX: Item container.
    const boxItem = createBox();
    that.top = 0;
    that.left = 0;
    that.index = itemIndex;
    that.itemId = itemData.itemId;
    that.itemData = itemData;
    that.height = ITEM_HEIGHT;
    that.width = sideBar.box.boxContent.width;
    that.color = "transparent";
    that.border = 0;
    that.element.style.position = "relative";
    
    // BOX: Item background box.
    boxItem.boxBackground = createBox(4, 0, boxItem.width - 8, boxItem.height);
    boxItem.add(that);
    that.round = 4;
    that.borderColor = "rgba(0, 0, 0, 0.2)";

    // IMAGE: Item icon image.
    boxItem.imgIcon = createImage(40, 0, 30, 30);
    boxItem.add(that);
    that.load(itemData.iconFile);
    that.element.style.filter = "grayscale(50%)";
    that.center("top");
    if (!itemData.iconFile) {
        boxItem.imgIcon.visible = 0;
    }

    // BUTTON: Item name text.
    boxItem.lblName = createLabel(80, 0, boxItem.width - 160, "auto");
    boxItem.add(that);
    //that.width = "auto";
    //that.left = 40;
    that.textAlign = "left";
    that.color = "transparent";
    that.text = itemData.title;
    that.fontSize = 26;
    that.clickable = 0;
    that.border = 0;
    that.onResize(function(self) {
        self.center("top");
    });

    // LABEL: Item count text.
    boxItem.lblCount = createLabel(0, 0, "auto", "auto");
    boxItem.add(that);
    that.color = "rgba(0, 0, 0, 0.05)";
    that.spaceX = 14;
    that.spaceY = 6;
    that.text = itemData.count;
    that.round = 13;
    //that.color = "white";
    //that.border = 1;
    //that.borderColor = "rgba(0, 0, 0, 0.2)";
    that.right = 30;
    that.onResize(function(self) {
        self.center("top");
    });

    boxItem.onClick(function(self) {

        sideBar.selectItem(self);
        sideBar.setVisible(0);

    })

    sideBar.box.boxContent.boxItems.add(boxItem);
    sideBar.normalItemStyle(boxItem);
    sideBar.itemList.push(boxItem);
    
}

sideBar.normalItemStyle = function(item) {

    item.clickable = 1;
    item.boxBackground.color = "transparent";
    item.boxBackground.border = 0;
    //item.lblCount.color = "rgba(0, 0, 0, 0.05)";
    //item.lblCount.visible = 1;

}

sideBar.selectedItemStyle = function(item) {

    item.clickable = 0;
    //item.boxBackground.color = "whitesmoke";
    item.boxBackground.color = "white";
    item.boxBackground.border = 1;
    //item.lblCount.color = "rgba(0, 0, 0, 0.0)";
    //item.lblCount.visible = 0;

}

sideBar.removeItems = function() {

    for (var i = 0; i < sideBar.itemList.length; i++) {
        sideBar.itemList[i].remove();
    }

    sideBar.itemList = [];

}

sideBar.setVisible = function(visible) {

    if (visible != sideBar.box.visible) {

        if (visible) {

            sideBar.box.boxCover.clickable = 0;

            sideBar.box.boxCover.opacity = 0;
            sideBar.box.boxContent.right = -1 * sideBar.box.boxContent.width;
            sideBar.box.visible = 1;

            sideBar.box.withMotion(function(self) {
                sideBar.box.boxCover.opacity = 1;
                sideBar.box.boxContent.right = 0;
                sideBar.box.boxCover.clickable = 1;
            })

        } else {

            sideBar.box.boxCover.clickable = 0;

            sideBar.box.boxCover.opacity = 1;
            sideBar.box.boxContent.right = 0;

            sideBar.box.withMotion(function(self) {
                sideBar.box.boxCover.opacity = 0;
                sideBar.box.boxContent.right = -1 * sideBar.box.boxContent.width;
            })

            setTimeout(function() {
                sideBar.box.visible = 0;
            }, 200 + basic.motionController.WITH_MOTION_TIME);

        }

    }

}

sideBar.selectItem = function(item) {

    // Unselect selected item.
    if (sideBar.selectedItem) {
        sideBar.normalItemStyle(sideBar.selectedItem);
    }

    // Select clicked item.
    sideBar.selectedItemStyle(item);
    sideBar.selectedItem = item;
    sideBar.selectedItemIndex = item.index;
    sideBar.onSelectionChangeFunc(item, item.itemId);

}

sideBar.selectItemByIndex = function(index) {

    const item = sideBar.getItemByIndex(index);

    if (item) {
        sideBar.selectItem(item);
    }

}

sideBar.getItemByIndex = function(index) {

    if (index < sideBar.itemList.length && index >= 0) {
        return sideBar.itemList[index];
    }
    return null;
    
}

sideBar.getSelectedIndex = function(index) {
    return sideBar.selectedItemIndex;
}

sideBar.getSelectedItem = function(index) {
    return sideBar.selectedItem;
}

sideBar.setTitle = function(title) {
    sideBar.box.boxContent.lblTitle.text = title;
}

sideBar.setBackgroundColor = function(color) {
    sideBar.box.boxContent.color = color;
}

sideBar.onSelectionChange = function(func) {
    sideBar.onSelectionChangeFunc = func;
}

sideBar.lockScreenButton.onClick = function(func) {
    sideBar.lockScreenButton.onClickFunc = func;
}


