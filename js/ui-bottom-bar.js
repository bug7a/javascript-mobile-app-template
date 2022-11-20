/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

const bottomBar = {};

bottomBar.itemList = [];
bottomBar.selectedIndex = -1;
bottomBar.onItemClickFunc = function() {};

bottomBar.default = {};
bottomBar.resetDefault = function() {
    bottomBar.default.height = 80;
}
bottomBar.resetDefault();

bottomBar.create = function() {

    // BOX: Object container box.
    bottomBar.box = createBox();
    that.width = basic.getDefaultContainerBox().width;
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
    that.top = getDefaultContainerBox().height - bottomBar.default.height;
    that.setMotion("top 0.2s, opacity 0.2s");

    // BOX: Selected item background highlight.
    bottomBar.box.boxHighLight = createBox(0, 5, 70, 70);
    bottomBar.box.add(that);
    that.round = 50;
    that.border = 0;
    that.borderColor = "lightgray";
    that.color = "whitesmoke";
    that.opacity = 1;
    that.setMotion("left 0.3s, background-color 0.3s");
    
}

bottomBar.createItemsByDataList = function(list) {

    bottomBar.removeItems();

    for (var i = 0; i < list.length; i++) {
            bottomBar.addItem(list[i], i);
    }

}

bottomBar.addItem = function(itemData, itemIndex) {

    var itemName = "item" + bottomBar.itemList.length;

    // IMAGE: item image
    bottomBar.box[itemName] = createImage();
    bottomBar.box.add(that);
    that.load(itemData.iconFile);
    that.width = bottomBar.default.height;
    that.height = bottomBar.default.height;
    that.space = 16;
    that.opacity = 0.7;
    that.itemIndex = itemIndex;
    that.pageId = itemData.pageId;
    that.left = 0;
    that.top = 0;
    that.setMotion("padding 0.3s, opacity 0.3s");

    // Koordinat sistemini devre dışı bırak:
    that.element.style.position = "relative";
    // Nesneler, satır dolana kadar; yan yana dizilir:
    that.element.style.display = "inline-block";

    that.onClick(function(self) {
        bottomBar.selectItemByIndex(self.itemIndex);
        bottomBar.onItemClickFunc(self.pageId);
    })

    // bottomBar.box.width = (bottomBar.default.height * (bottomBar.itemList.length + 1)) + 20;
    // bottomBar.box.center("left");

    bottomBar.itemList.push(that);
    makeBasicObject(that);

}

bottomBar.selectItemByIndex = function(index) {
    bottomBar.selectItem(bottomBar.itemList[index]);
}

bottomBar.selectItem = function(item) {

    bottomBar.unselectItem();
    bottomBar.selectedIndex = item.itemIndex;
    //item.load(item.clickedIconPath);
    item.clickable = 0;
    item.space = 6;
    item.opacity = 1;

    bottomBar.box.boxHighLight.left = item.element.offsetLeft + 5;
    //bottomBar.box.boxHighLight.color = "lightblue";

}

bottomBar.unselectItem = function() {

    if (bottomBar.selectedIndex != -1) {

        //bottomBar.itemList[bottomBar.selectedIndex].load(bottomBar.itemList[bottomBar.selectedIndex].item.clickedIconPath)
        bottomBar.itemList[bottomBar.selectedIndex].clickable = 1;
        bottomBar.itemList[bottomBar.selectedIndex].space = 16;
        bottomBar.itemList[bottomBar.selectedIndex].opacity = 0.7;
        bottomBar.box.boxHighLight.left = bottomBar.box.boxHighLight.width * -1;

    }

}

bottomBar.removeItems = function() {

    for (var i = 0; i < bottomBar.itemList.length; i++) {
        bottomBar.itemList[i].remove();
    }

    bottomBar.itemList = [];
    bottomBar.selectedIndex = -1;

}

bottomBar.setVisible = function(visible) {

    if (visible != bottomBar.box.visible) {
        if (visible) {

            bottomBar.box.top = getDefaultContainerBox().height;
            bottomBar.box.opacity = 0;
            bottomBar.box.visible = 1;
            bottomBar.box.withMotion(function(self) {
                self.top = getDefaultContainerBox().height - bottomBar.default.height;
                self.opacity = 1;
            })
    
        } else {
    
            bottomBar.box.withMotion(function(self) {
                self.top = getDefaultContainerBox().height;
                self.opacity = 0;
                setTimeout(function() {
                    bottomBar.box.visible = 0;
                }, 250);
            });
    
        }
    }
    
}

bottomBar.getVisible = function() {
    return bottomBar.box.visible;
}

bottomBar.onItemClick = function(func) {
    bottomBar.onItemClickFunc = func;
}

bottomBar.getHeight = function() {
    return bottomBar.box.height;
}

bottomBar.setBorderLine = function(isShown) {
 
    if (isShown) {
        bottomBar.box.borderColor = "rgba(0, 0, 0, 0.1)";

    } else {
        bottomBar.box.borderColor = "rgba(0, 0, 0, 0)";
    }
    
}

/*
bottomBar.get = function(parameters = {}) {

}

bottomBar.set = function(parameters = {}) {

    switch (parameters.name) {

        case "closeStart":
            break;

        case "closeEnd":
            break;

    }
    
}

bottomBar.on = function(parameters = {}) {

    switch (parameters.name) {

        case "closeStart":
            break;

        case "closeEnd":
            break;

    }
    
}
*/