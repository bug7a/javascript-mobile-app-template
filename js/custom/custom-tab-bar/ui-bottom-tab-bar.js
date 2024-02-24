
/*

bottomTabBar UI Component.
- change tab page in homePage.

bottomTabBar.create()
- create the object.
- left: 0, bottom:0, width: 600, height: 150

bottomTabBar.getContainerBox()
- get the container box.

*/

var bottomTabBar = {};

bottomTabBar.itemDataList = [
    { pageId: 1, title: "STATUS", iconFile: "js/custom/custom-tab-bar/assets/status.png" },
    { pageId: 2, title: "RECEIPTS", iconFile: "js/custom/custom-tab-bar/assets/transactions.png" },
    { pageId: 3, title: "TOOLS", iconFile: "js/custom/custom-tab-bar/assets/settings.png" }
];

bottomTabBar.itemList = [];
bottomTabBar.selectedItemIndex = -1;
bottomTabBar.onItemClickFunc = function() {};

bottomTabBar.create = function() {

    bottomTabBar.WIDTH = 600;
    bottomTabBar.HEIGHT = 150;
    bottomTabBar.BACK_WIDTH = 600 - 40;
    bottomTabBar.BACK_HEIGHT = bottomTabBar.HEIGHT - 50;

    // BOX: Object container box.
    bottomTabBar.box = createBox(0, 0, bottomTabBar.WIDTH, bottomTabBar.HEIGHT);
    that.border = 0;
    that.color = "transparent";

    /* MOTION:
    that.bottom = bottomTabBar.HEIGHT * -1
    that.opacity = 0
    that.setMotion("bottom 0.5s, opacity 0.5s")
    that.withMotion(function(self) {
        self.bottom = 0
        self.opacity = 1
    })
    */
    that.bottom = 0;
    that.opacity = 1;

    // Box: Object background box.
    bottomTabBar.box.boxBack = createBox(20, 20, bottomTabBar.BACK_WIDTH, bottomTabBar.BACK_HEIGHT)
    bottomTabBar.box.add(that)
    //that.color = "white"
    that.element.style.background = "linear-gradient(to bottom, #D8D8D8, #D8D8D800)"
    that.round = 20
    that.border = 1
    that.borderColor = "#141414"

    // BOX: Items group box.
    bottomTabBar.box.boxItemGroup = createBox(20, 20, bottomTabBar.BACK_WIDTH, bottomTabBar.BACK_HEIGHT)
    bottomTabBar.box.add(that)
    that.color = "transparent"

    // BUTTON: Right button.
    bottomTabBar.box.boxRightButton = createBox(0, 10, 120, 120)
    bottomTabBar.box.add(that)
    that.right = 35
    that.color = "#FFFFFF"
    that.border = 2
    that.borderColor = "#141414"
    that.round = that.width
    that.opacity = 1
    /* MOTION: */
    // that.setMotion("opacity 0.5s")
    that.onClick(function(self) {
        bottomTabBar.onItemClickFunc(self, 3)
    })

    // IMAGE: Right button icon.
    bottomTabBar.box.boxRightButton.imgRightButton = createImage(0, 0, 120, 120)
    bottomTabBar.box.boxRightButton.add(that)
    that.load("js/custom/custom-tab-bar/assets/add-spending.png")
    that.space = 30
    that.opacity = 0.65

    // BOX: Selection color box.
    bottomTabBar.box.boxSelectionColor = createBox(0, 0, 60, 4);
    bottomTabBar.box.add(that);
    that.color = "#40A5AF";
    that.opacity = 0.8;
    that.round = 4;
    /* MOTION: */
    that.setMotion("left 0.2s");
    // that.setMotion("left 0.5s")

    // Create items.
    bottomTabBar.createItemsByDataList(bottomTabBar.itemDataList);
    // DEFAULT: Select the first item.
    bottomTabBar.selectItemByIndex(0);

}

bottomTabBar.createItemsByDataList = function(dataList) {

    bottomTabBar.itemList = [];
    bottomTabBar.selectedItemIndex = -1;

    bottomTabBar.box.boxItemGroup.html = "";

    for (var i = 0; i < dataList.length; i++) {
        bottomTabBar.box.boxItemGroup["item" + i] = bottomTabBar.createItem(dataList[i], i);
        bottomTabBar.box.boxItemGroup.add(that);
        that.left = 10 + (i * 135);
        that.onClick(function(self) {
            if (bottomTabBar.selectedItemIndex != self.index) {
            }
            bottomTabBar.selectItemByItem(self);
            bottomTabBar.onItemClickFunc(self, self.index);
            
        });

    }

}

bottomTabBar.createItem = function(data, index) {

    var ITEM_WIDTH = 130;

    // Create item.
    // BOX: Item container box.
    var item = createBox();
    // bottomTabBar.box.boxBack.add(that)
    that.color = "transparent";
    that.width = ITEM_WIDTH;
    that.height = bottomTabBar.BACK_HEIGHT;
    that.top = 0;
    that.left = 0;
    that.opacity = 0.4;

    that.data = data;
    that.index = index;
    
    // LABEL: Item title.
    item.lblDateTitle = createLabel(0, 0, ITEM_WIDTH);
    item.add(that);
    that.textAlign = "center";
    that.textColor = "#000000";
    //that.element.style.fontFamily = "opensans-bold"
    that.fontSize = 23;
    that.text = data.title;
    that.opacity = 0.6;
    that.bottom = 12;

    // IMAGE: Item icon.
    item.imgIcon = createImage(0, 12, 40, 40);
    item.add(that);
    that.load(data.iconFile);
    that.center("left");

    bottomTabBar.itemList.push(item);
    makeBasicObject(item);
    return item;

}

bottomTabBar.selectItemByItem = function(item) {

    bottomTabBar.selectItemByIndex(item.index);
    
}

bottomTabBar.selectItemByIndex = function(index) {

    if (bottomTabBar.selectedItemIndex != index) {
    
        var currentItem = bottomTabBar.itemList[index];
        if (bottomTabBar.selectedItemIndex != -1) {
            var previousItem = bottomTabBar.itemList[bottomTabBar.selectedItemIndex];
            previousItem.opacity = 0.4;
        }
        currentItem.opacity = 1;

        bottomTabBar.box.boxSelectionColor.aline(currentItem, "bottom", 6, "center");
        bottomTabBar.box.boxSelectionColor.left += 20;

        bottomTabBar.selectedItemIndex = index;

    }

};

bottomTabBar.onItemClick = function(func) {
    bottomTabBar.onItemClickFunc = func;
};

bottomTabBar.getSelectedItemIndex = function() {
    return bottomTabBar.selectedItemIndex;
};

bottomTabBar.getContainerBox = function() {
    return bottomTabBar.box;
};

bottomTabBar.getHeight = function() {
    return bottomTabBar.box.height;
}