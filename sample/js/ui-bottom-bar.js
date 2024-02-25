/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


*/

const bottomBar = {};

bottomBar.itemList = [];
bottomBar.selectedIndex = -1;
bottomBar.onItemClickFunc = function() {};

bottomBar.create = function(parameters = {}) {

    // BOX: Object container box.
    bottomBar.box = createBox();

    // Default values.
    bottomBar.default = {
        width: "container-width",
        height: 80,
        showSelectedText: 1,
        highLightColor: "#141414", // "whitesmoke", "#141414"
        reverseColorOfSelectedIcon: 1,
        normalIconSpace: 16,
        selectedIconSpace: 6,
        showWithMotion: 0,
        normalIconOpacity: 0.7,
        selectedIconOpacity: 0.85,
    };

    UICore.parseParameters(bottomBar.default, parameters);

    if (bottomBar.default.width == "container-width") {
        bottomBar.default.width = bottomBar.box.containerBox.width;
    }

    // *** OBJECT MODEL:
    that.width = bottomBar.default.width;
    that.height = bottomBar.default.height;
    that.color = "white";
    that.border = 0;
    //that.borderColor = "rgba(0, 0, 0, 0.1)";
    that.borderColor = "rgba(0, 0, 0, 0)";
    // that.round = 20
    //that.element.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.2)";
    that.element.style.borderTopWidth = "2px";
    that.element.style.textAlign = "center";
    that.visible = 0;
    that.left = 0;
    that.top = bottomBar.box.containerBox.height - bottomBar.default.height;
    that.element.style.overflow = "visible";
    that.setMotion("top 0.2s, opacity 0.2s");

    // BOX: Selected item background highlight.
    bottomBar.box.boxHighLight = createBox(105, 5);
    bottomBar.box.add(that);
    that.width = bottomBar.default.height - 10;
    that.height = bottomBar.default.height - 10;
    that.round = 50;
    that.border = 0;
    that.borderColor = "rgba(0, 0, 0, 0.05)";
    that.color = bottomBar.default.highLightColor;
    that.opacity = 1;
    that.setMotion("left 0.3s, background-color 0.3s");

    // LABEL: Selected item text.
    bottomBar.box.lblText = createLabel();
    bottomBar.box.add(that);
    that.text = "";
    that.fontSize = 14;
    that.color = "rgba(255, 255, 255, 0.8)";
    that.border = 1;
    that.borderColor = "rgba(0, 0, 0, 0.6)";
    that.spaceX = 8;
    that.spaceY = 3;
    that.round = 6;
    that.opacity = 0;
    that.setMotion("left 0.3s, background-color 0.3s, opacity 0.3s");

    bottomBar.box.lblText.onResize(function() {
        if (bottomBar.default.showSelectedText) {
            if (bottomBar.box.opacity != 0) {
                bottomBar.box.lblText.aline(bottomBar.box.boxHighLight, "top", 20, "center");
            }
        }
    });
    // WHY: lblText boyutları içindeki metne göre değişir ve zaman alır; lblText konumu, changeText içinde hesaplanmamalı.

};

bottomBar.createItemsByDataList = function(list) {

    bottomBar.removeItems();

    for (var i = 0; i < list.length; i++) {
            bottomBar.addItem(list[i], i);
    }

};

bottomBar.removeItems = function() {

    for (var i = 0; i < bottomBar.itemList.length; i++) {
        bottomBar.itemList[i].remove();
    }

    bottomBar.itemList = [];
    bottomBar.selectedIndex = -1;

};

bottomBar.addItem = function(itemData, itemIndex) {

    var itemName = "item" + bottomBar.itemList.length;

    // BOX: item container
    bottomBar.box[itemName] = createBox();
    const item = bottomBar.box[itemName];
    bottomBar.box.add(item);
    item.color = "transparent";
    item.width = bottomBar.default.height;
    item.height = bottomBar.default.height;
    item.itemIndex = itemIndex;
    item.itemData = itemData;
    item.pageId = itemData.pageId;
    item.left = 0;
    item.top = 0;

    // Koordinat sistemini devre dışı bırak:
    item.element.style.position = "relative";
    // Nesneler, satır dolana kadar; yan yana dizilir:
    item.element.style.display = "inline-block";

    // IMAGE: item image
    item.imgIcon = createImage();
    item.add(that);
    that.load(itemData.iconFile);
    that.width = bottomBar.default.height;
    that.height = bottomBar.default.height;
    that.space = bottomBar.default.normalIconSpace;
    that.opacity = bottomBar.default.normalIconOpacity;
    that.left = 0;
    that.top = 0;
    that.setMotion("padding 0.3s, opacity 0.3s");

    item.onClick(function(self) {
        //bottomBar.selectItemByIndex(self.itemIndex);
        bottomBar.onItemClickFunc(self.pageId);
    })

    // bottomBar.box.width = (bottomBar.default.height * (bottomBar.itemList.length + 1)) + 20;
    // bottomBar.box.center("left");

    bottomBar.itemList.push(item);
    makeBasicObject(item);

};

bottomBar.selectItemByIndex = function(index) {
    bottomBar.selectItem(bottomBar.itemList[index]);
};

bottomBar.selectItem = function(item) {

    if (bottomBar.selectedIndex != item.itemIndex) {

        bottomBar.unselectItem();

        bottomBar.selectedIndex = item.itemIndex;
        //item.imgIcon.load(item.itemData.clickedIconPath);
        item.clickable = 0;
        item.imgIcon.space = bottomBar.default.selectedIconSpace;
        item.imgIcon.opacity = bottomBar.default.selectedIconOpacity;
        if (bottomBar.default.reverseColorOfSelectedIcon) {
            item.imgIcon.element.style.filter = "invert(100%)";
        }

        bottomBar.box.boxHighLight.color = item.itemData.highLightColor || bottomBar.default.highLightColor;
        bottomBar.box.boxHighLight.left = item.element.offsetLeft + 5;

    }

    if (bottomBar.default.showSelectedText) {
        bottomBar.changeSelectedText(item.itemData.text);
    }

};

bottomBar.unselectItem = function() {

    if (bottomBar.selectedIndex != -1) {

        const selectedItem = bottomBar.itemList[bottomBar.selectedIndex];

        selectedItem.clickable = 1;
        selectedItem.imgIcon.space = bottomBar.default.normalIconSpace;
        selectedItem.imgIcon.opacity = bottomBar.default.normalIconOpacity;
        selectedItem.imgIcon.element.style.filter = "none";
        //bottomBar.box.boxHighLight.left = bottomBar.box.boxHighLight.width * -1;

    }

};

bottomBar.changeSelectedText = function(text) {

    bottomBar.box.lblText.opacity = 1;
    bottomBar.box.lblText.text = text;

    if (bottomBar.box.lblText.timer) {
        clearTimeout(bottomBar.box.lblText.timer);
    }

    bottomBar.box.lblText.timer = setTimeout(function() {
        bottomBar.box.lblText.opacity = 0;
    }, 600);

};

bottomBar.setVisible = function(visible) {

    if (visible != bottomBar.box.visible) {

        if (bottomBar.default.showWithMotion) {
            if (visible) {

                bottomBar.box.top = bottomBar.box.containerBox.height;
                bottomBar.box.opacity = 0;
                bottomBar.box.visible = 1;
                bottomBar.box.withMotion(function(self) {
                    self.top = bottomBar.box.containerBox.height - bottomBar.default.height;
                    self.opacity = 1;
                })
        
            } else {
        
                bottomBar.box.withMotion(function(self) {
                    self.top = bottomBar.box.containerBox.height;
                    self.opacity = 0;
                    setTimeout(function() {
                        bottomBar.box.visible = 0;
                    }, 250);
                });
        
            }
        } else {
            if (visible) {
                bottomBar.box.top = bottomBar.box.containerBox.height - bottomBar.default.height;
            } else {
                bottomBar.box.top = bottomBar.box.containerBox.height;
            }
            bottomBar.box.opacity = visible;
            bottomBar.box.visible = visible;
        }
    }
    
};

bottomBar.getVisible = function() {
    return bottomBar.box.visible;
};

bottomBar.onItemClick = function(func) {
    bottomBar.onItemClickFunc = func;
};

bottomBar.getHeight = function() {
    return bottomBar.box.height;
};

bottomBar.setBorderLine = function(isShown) {
 
    if (isShown) {
        bottomBar.box.borderColor = "rgba(0, 0, 0, 0.1)";

    } else {
        bottomBar.box.borderColor = "rgba(0, 0, 0, 0)";
    }
    
};

bottomBar.createBudgeOnItem = function(params = {}) {

    const itemIndex = params.itemIndex || 0;

    const lbl = createLabel();
    bottomBar.itemList[itemIndex].add(lbl);
    lbl.text = "3";
    lbl.fontSize = 14;
    lbl.color = "indianred";
    lbl.spaceX = 8;
    lbl.spaceY = 3;
    lbl.round = 20;
    lbl.element.style.fontFamily = "opensans-bold";
    lbl.border = 3;
    lbl.borderColor = "white";
    lbl.textColor = "white";
    lbl.top = 6;
    lbl.right = 4;

    lbl.setVisible = function(value) {
        lbl.visible = value;
    }

    lbl.setColor = function(value) {
        lbl.color = value;
    }

    lbl.setValue = function(value) {
        lbl.text = value;
    }

    lbl.getValue = function() {
        return lbl.text;
    }
    
    makeBasicObject(lbl);
    return lbl;

};