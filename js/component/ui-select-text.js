/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

"use strict";
const UISelectText = {};

UISelectText.DEFAULT_WIDTH = 200;
UISelectText.DEFAULT_HEIGHT = 50;

UISelectText.itemSelection;
UISelectText.isFirstCreate = 0;

// Colors: "#EAEAE9", "#BFDBC9", "#CADAE0", "#FFF0C2"
UISelectText.selectedColor = "#FFF0C2";
UISelectText.placeholder = "Search";
UISelectText.uiBackgroundColor = "whitesmoke";

// Create new component
UISelectText.create = function(left = 0, 
    top = 0, 
    width = UISelectText.DEFAULT_WIDTH, 
    height = UISelectText.DEFAULT_HEIGHT) {

    // BOX: Component background box
    const ui = createBox(left, top, width, height);
    that.color = UISelectText.uiBackgroundColor;
    that.round = 4;
    that.border = 0;
    that.borderColor = "black";

    that.onClick(function(self) {
        
        if (ui.itemList.length > 0) {
            if (!UISelectText.itemSelection) {
                createItemSelection(self);
            }
        }
    })

    // VARIABLES
    ui.selectedIndex = -1;
    ui.autoResize = 0;
    ui.itemList = [];
    ui.onChangeFunc = function() {};

    // LABEL: Component name label
    ui.txtName = createLabel(10, 0, "auto");
    ui.add(that);
    that.text = "";
    that.fontSize = 20;
    that.height = that.fontSize + (that.fontSize / 2);
    that.onResize(function(self) {
        self.center("top");

        if(ui.autoResize == 1) {
            ui.width = self.width + 50;
        }
    })

    // BOX: Mask of txtName
    ui.boxMask = createBox(0, 0, 40, ui.height);
    ui.add(that);
    that.right = 0;
    that.element.style.background = "linear-gradient(to right, #FFFFFF00, " + UISelectText.uiBackgroundColor + ")";

    // IMAGE: Up arrow image
    ui.imgArrow1 = createImage(0, 0, 16, 16);
    ui.add(that);
    that.load("js/component/ui-select-text/arrow.svg");
    that.right = 8;
    that.opacity = 0.7;
    that.rotate = 180;
    that.onLoad(function(self) {
        self.center("top");
        self.top -= 7;
    })

    // IMAGE: Down arrow image
    ui.imgArrow2 = createImage(0, 0, 16, 16);
    ui.add(that);
    that.load("js/component/ui-select-text/arrow.svg");
    that.right = 8;
    that.opacity = 0.7;
    that.onLoad(function(self) {
        self.center("top");
        self.top += 7;      
    })

    // METHODS:

    ui.createItemsByDataList = function(list) {

        ui.itemList = [...list];

        if (ui.itemList.length > 0) {
            ui.setSelectedIndex(0);

        } else {
            ui.setSelectedIndex(-1);
        }
    }

    ui.setSelectedIndex = function(index) {

        if (index != ui.selectedIndex) {

            if (index >= 0 && index < ui.itemList.length) {
                ui.selectedIndex = index;
                ui.txtName.text = ui.itemList[ui.selectedIndex].name;

                ui.onChangeFunc(ui, ui.selectedIndex);

            } else {
                ui.selectedIndex = -1;
                ui.txtName.text = "";
            }
        }
    }

    ui.getSelectedIndex = function() {

        return ui.selectedIndex;
    }

    ui.getSelectedId = function() {

        return ui.itemList[ui.selectedIndex].id;
    }

    ui.getSelectedName = function() {

        return ui.itemList[ui.selectedIndex].name;
    }

    ui.getIndexById = function(id) {

        for (let i = 0; i < ui.itemList.length; i++) {
            
            if (ui.itemList[i].id == id) {
                return i;
            }
        }

        return -1;
    }

    ui.setAutoResize = function(value) {

        ui.autoResize = value;
    }

    ui.onChange = function(func) {

            if (typeof func == "function") {
                ui.onChangeFunc = func;

            } else {
                ui.onChangeFunc = function() {};
            }
    }

    if (!UISelectText.isFirstCreate) {

        page.onResize(function() {

            if (UISelectText.itemSelection) {
                UISelectText.itemSelection.width = getDefaultContainerBox().width;
                UISelectText.itemSelection.height = getDefaultContainerBox().height;

                UISelectText.itemSelection.boxSearch.width = getDefaultContainerBox().width - 40 - 30 - 10;
                UISelectText.itemSelection.boxSearch.txtSearch.width = UISelectText.itemSelection.boxSearch.width - 80;

                UISelectText.itemSelection.boxItems.width = getDefaultContainerBox().width - 10;
                UISelectText.itemSelection.boxItems.height = getDefaultContainerBox().height - 110;

                UISelectText.itemSelection.boxMaskTop.width = getDefaultContainerBox().width - 10;
                UISelectText.itemSelection.boxMaskBottom.width = getDefaultContainerBox().width - 10;

                for (let i = 0; i < ui.itemList.length; i++) {
                    UISelectText.itemSelection.boxItems["b" + i].width = getDefaultContainerBox().width - 20;
                    UISelectText.itemSelection.boxItems["b" + i].lblName.width = getDefaultContainerBox().width - 70;
                }
            }
        })

        UISelectText.isFirstCreate = 1;
    }

    makeBasicObject(ui);
    return ui;

}

/*
const createSelectText = function(left = 0, 
    top = 0, 
    width = UISelectText.DEFAULT_WIDTH, 
    height = UISelectText.DEFAULT_HEIGHT) {

    return UISelectText.create(left, top, width, height);
}
*/

UISelectText.setSelectedColor = function(color) {
    UISelectText.selectedColor = color;
}

UISelectText.setSearchInfoText = function(infoText) {
    UISelectText.placeholder = infoText;
}

UISelectText.setUIBackgroundColor = function(color) {
    UISelectText.uiBackgroundColor = color;
}

const createItemSelection = function(connectedUI) {

    // BOX: Item selection box
    UISelectText.itemSelection = createBox(0, 0, getDefaultContainerBox().width, getDefaultContainerBox().height);
    that.color = "white";
    that.setMotion("top 0.3s, opacity 0.3s");
    that.opacity = 0;
    that.top = 150;
    that.withMotion(function(self) {
        self.top = 0;
        self.opacity = 1;
    })

    // BOX: Search box
    UISelectText.itemSelection.boxSearch = createBox(20, 40);
    UISelectText.itemSelection.add(that);
    that.width = getDefaultContainerBox().width - 40 - 30 - 10;
    that.height = 50;
    that.color = "whitesmoke";
    that.round = 25;
    that.border = 0;

    // IMAGE: Search icon
    UISelectText.itemSelection.boxSearch.imgIcon = createImage(5, 0, 50, 50);
    UISelectText.itemSelection.boxSearch.add(that);
    that.load("js/component/ui-select-text/search.svg");
    that.opacity = 0.4;
    that.space = 27;

    // TEXTBOX: Search textbox
    UISelectText.itemSelection.boxSearch.txtSearch = createTextBox(45, 0);
    UISelectText.itemSelection.boxSearch.add(that);
    that.width = UISelectText.itemSelection.boxSearch.width - 80;
    that.border = 0;
    that.minimal = 1;
    that.textColor = "gray";
    that.color = "whitesmoke";
    that.inputElement.setAttribute("placeholder", UISelectText.placeholder);

    // BOX: Cancel button box
    UISelectText.itemSelection.boxCancel = createBox(0, 50, 30, 30);
    UISelectText.itemSelection.add(that);
    that.right = 20;
    that.color = "#D8D8D8";
    that.round = 15;
    that.onClick(function(self) {
        UISelectText.itemSelection.close();
    })

    // IMAGE: Cancel button icon
    UISelectText.itemSelection.boxCancel.imgCancel = createImage(8, 8, 14, 14);
    UISelectText.itemSelection.boxCancel.add(that);
    that.load("js/component/ui-select-text/cancel.svg");
    that.opacity = 0.5;

    // BOX: Scrollable box for items
    UISelectText.itemSelection.boxItems = createBox();
    UISelectText.itemSelection.add(that);
    that.left = 10;
    that.bottom = 0;
    that.width = getDefaultContainerBox().width - 10;
    that.height = getDefaultContainerBox().height - 110;
    that.color = "white";
    that.border = 0;
    that.borderColor = "lightgray";
    that.scrollY = 1;

    // BOX: Items mask box (Top)
    UISelectText.itemSelection.boxMaskTop = createBox(0, 109, getDefaultContainerBox().width - 10 , 10);
    UISelectText.itemSelection.add(that);
    that.element.style.background = "linear-gradient(to bottom, #FFFFFF, #FFFFFF00)";

    // BOX: Items mask box (Bottom)
    UISelectText.itemSelection.boxMaskBottom = createBox(0, 189, getDefaultContainerBox().width - 10 , 10);
    UISelectText.itemSelection.add(that);
    that.element.style.background = "linear-gradient(to bottom, #FFFFFF00, #FFFFFF)";
    that.bottom = -1;
    
    // Create new item
    UISelectText.itemSelection.createItem = function(index) {

        // You can create your own custom item:

        // BOX: One of item box
        const boxItem = createBox(10, 0, getDefaultContainerBox().width - 40, 60);
        that.index = index;
        that.round = 4;
        that.border = 0;
        that.color = "white";
        that.borderColor = "lightgray";
        //that.element.style.borderBottomWidth = "1px"
        that.element.style.position = "relative";
        that.onClick(UISelectText.itemSelection.itemClicked);

        // LABEL: Item name
        boxItem.lblName = createLabel(30, 17, getDefaultContainerBox().width - 70, "auto");
        boxItem.add(that);
        that.text = connectedUI.itemList[index].name;
        that.textAlign = "left";
        that.fontSize = 20;
        that.textColor = "#4A4A4A";
        that.onResize(function(self) {
            self.center("top");
        })

        makeBasicObject(boxItem);
        return boxItem;

    }

    UISelectText.itemSelection.itemClicked = function(self) {

        if (connectedUI.selectedIndex >= 0) {
            UISelectText.itemSelection.boxItems["b" + connectedUI.selectedIndex].color = "white";
        }

        self.color = UISelectText.selectedColor;
        connectedUI.setSelectedIndex(self.index);

        UISelectText.itemSelection.close();

    }

    UISelectText.itemSelection.close = function() {

        UISelectText.itemSelection.opacity = 0;
        UISelectText.itemSelection.top = 150;

        setTimeout(function() {
            if (UISelectText.itemSelection) {
                UISelectText.itemSelection.remove();
                UISelectText.itemSelection = null;
            }
        }, 300);
    }

    UISelectText.itemSelection.filter = function() {

        var searchKeyword = UISelectText.itemSelection.boxSearch.txtSearch.text.toLowerCase();

        for (var i = 0; i < connectedUI.itemList.length; i++) {

            var boxItem = UISelectText.itemSelection.boxItems["b" + i];
            var nameKeyword = connectedUI.itemList[i].name.toLowerCase();

            if (nameKeyword.search(searchKeyword) > -1) {
                boxItem.visible = 1;

            } else {
                boxItem.visible = 0;
            }
        }
    }

    // Filter when search keyword is changed
    UISelectText.itemSelection.boxSearch.txtSearch.inputElement.addEventListener("keyup", UISelectText.itemSelection.filter);

    // Create all items
    for (let i = 0; i < connectedUI.itemList.length; i++) {
        UISelectText.itemSelection.boxItems["b" + i] = UISelectText.itemSelection.createItem(i);
        UISelectText.itemSelection.boxItems.add(that);
    }

    // Highlight selected item
    if (connectedUI.selectedIndex >= 0) {
        UISelectText.itemSelection.boxItems["b" + connectedUI.selectedIndex].color = UISelectText.selectedColor;
    }

}
