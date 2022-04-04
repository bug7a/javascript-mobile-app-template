/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

var SelectText = {}

SelectText.DEFAULT_WIDTH = 200
SelectText.DEFAULT_HEIGHT = 50

SelectText.itemSelection;
SelectText.isFirstCreate = 0

// Colors: "#EAEAE9", "#BFDBC9", "#CADAE0", "#FFF0C2"
SelectText.selectedColor = "#FFF0C2"
SelectText.placeholder = "Search"
SelectText.uiBackgroundColor = "whitesmoke"

// Create new component
SelectText.createCopy = function(left = 0, 
    top = 0, 
    width = SelectText.DEFAULT_WIDTH, 
    height = SelectText.DEFAULT_HEIGHT) {

    // BOX: Component background box
    var ui = createBox(left, top, width, height)
    that.color = SelectText.uiBackgroundColor
    that.round = 4
    that.border = 0
    that.borderColor = "black"

    that.onClick(function(self) {
        
        if (ui.itemList.length > 0) {
            if (!SelectText.itemSelection) {
                createItemSelection(self)
            }
        }
    })

    // VARIABLES
    ui.selectedIndex = -1
    ui.autoResize = 0
    ui.itemList = []
    ui.onChangeFunc = function() {}

    // LABEL: Component name label
    ui.txtName = createLabel(10, 0, "auto")
    ui.add(that)
    that.text = ""
    that.fontSize = 20
    that.height = that.fontSize + (that.fontSize / 2)
    that.onResize(function(self) {
        self.center("top")

        if(ui.autoResize == 1) {
            ui.width = self.width + 50
        }
    })

    // BOX: Mask of txtName
    ui.boxMask = createBox(0, 0, 40, ui.height)
    ui.add(that)
    that.right = 0
    that.element.style.background = "linear-gradient(to right, #FFFFFF00, " + SelectText.uiBackgroundColor + ")"

    // IMAGE: Up arrow image
    ui.imgArrow1 = createImage(0, 0, 16, 16)
    ui.add(that)
    that.load("js/components/ui-select-text/arrow.svg")
    that.right = 8
    that.opacity = 0.7
    that.rotate = 180
    that.onLoad(function(self) {
        self.center("top")
        self.top -= 7
    })

    // IMAGE: Down arrow image
    ui.imgArrow2 = createImage(0, 0, 16, 16)
    ui.add(that)
    that.load("js/components/ui-select-text/arrow.svg")
    that.right = 8
    that.opacity = 0.7
    that.onLoad(function(self) {
        self.center("top")
        self.top += 7            
    })

    // METHODS:

    ui.createItemsByDataList = function(list) {

        ui.itemList = [...list]

        if (ui.itemList.length > 0) {
            ui.setSelectedIndex(0)

        } else {
            ui.setSelectedIndex(-1)
        }
    }

    ui.setSelectedIndex = function(index) {

        if (index != ui.selectedIndex) {

            if (index >= 0 && index < ui.itemList.length) {
                ui.selectedIndex = index
                ui.txtName.text = ui.itemList[ui.selectedIndex].name

                ui.onChangeFunc(ui, ui.selectedIndex)

            } else {
                ui.selectedIndex = -1
                ui.txtName.text = ""
            }
        }
    }

    ui.getSelectedIndex = function() {

        return ui.selectedIndex
    }

    ui.getIndexById = function(id) {

        for (var i = 0; i < ui.itemList.length; i++) {
            
            if (ui.itemList[i].id == id) {
                return i
            }
        }

        return -1
    }

    ui.setAutoResize = function(value) {

        ui.autoResize = value
    }

    ui.onChange = function(func) {

            if (typeof func == "function") {
                ui.onChangeFunc = func

            } else {
                ui.onChangeFunc = function() {}
            }
    }

    if (!SelectText.isFirstCreate) {

        page.onResize(function() {

            if (SelectText.itemSelection) {
                SelectText.itemSelection.width = page.width
                SelectText.itemSelection.height = page.height

                SelectText.itemSelection.boxSearch.width = page.width - 40 - 30 - 10
                SelectText.itemSelection.boxSearch.txtSearch.width = SelectText.itemSelection.boxSearch.width - 80

                SelectText.itemSelection.boxItems.width = page.width - 10
                SelectText.itemSelection.boxItems.height = page.height - 110

                SelectText.itemSelection.boxMaskTop.width = page.width - 10
                SelectText.itemSelection.boxMaskBottom.width = page.width - 10

                for (var i = 0; i < ui.itemList.length; i++) {
                    SelectText.itemSelection.boxItems["b" + i].width = page.width - 20
                    SelectText.itemSelection.boxItems["b" + i].lblName.width = page.width - 70
                }
            }
        })

        SelectText.isFirstCreate = 1
    }

    makeBasicObject(ui)

    return ui
}

var createSelectText = function(left = 0, 
    top = 0, 
    width = SelectText.DEFAULT_WIDTH, 
    height = SelectText.DEFAULT_HEIGHT) {

    return SelectText.createCopy(left, top, width, height)
}

SelectText.setSelectedColor = function(color) {
    SelectText.selectedColor = color
}

SelectText.setSearchInfoText = function(infoText) {
    SelectText.placeholder = infoText
}

SelectText.setUIBackgroundColor = function(color) {
    SelectText.uiBackgroundColor = color
}

var createItemSelection = function(connectedUI) {

    // BOX: Item selection box
    SelectText.itemSelection = createBox(0, 0, page.width, page.height)
    that.color = "white"
    that.setMotion("top 0.3s, opacity 0.3s")
    that.opacity = 0
    that.top = 150
    that.withMotion(function(self) {
        self.top = 0
        self.opacity = 1
    })

    // BOX: Search box
    SelectText.itemSelection.boxSearch = createBox(20, 40)
    SelectText.itemSelection.add(that)
    that.width = page.width - 40 - 30 - 10
    that.height = 50
    that.color = "whitesmoke"
    that.round = 25
    that.border = 0

    // IMAGE: Search icon
    SelectText.itemSelection.boxSearch.imgIcon = createImage(5, 0, 50, 50)
    SelectText.itemSelection.boxSearch.add(that)
    that.load("js/components/ui-select-text/search.svg")
    that.opacity = 0.4
    that.space = 15

    // TEXTBOX: Search textbox
    SelectText.itemSelection.boxSearch.txtSearch = createTextBox(45, 0)
    SelectText.itemSelection.boxSearch.add(that)
    that.width = SelectText.itemSelection.boxSearch.width - 80
    that.border = 0
    that.minimal = 1
    that.textColor = "gray"
    that.color = "whitesmoke"
    that.inputElement.setAttribute("placeholder", SelectText.placeholder)

    // BOX: Cancel button box
    SelectText.itemSelection.boxCancel = createBox(0, 50, 30, 30)
    SelectText.itemSelection.add(that)
    that.right = 20
    that.color = "#D8D8D8"
    that.round = 15
    that.onClick(function(self) {
        SelectText.itemSelection.close()
    })

    // IMAGE: Cancel button icon
    SelectText.itemSelection.boxCancel.imgCancel = createImage(8, 8, 14, 14)
    SelectText.itemSelection.boxCancel.add(that)
    that.load("js/components/ui-select-text/cancel.svg")
    that.opacity = 0.5

    // BOX: Scrollable box for items
    SelectText.itemSelection.boxItems = createBox()
    SelectText.itemSelection.add(that)
    that.left = 10
    that.bottom = 0
    that.width = page.width - 10
    that.height = page.height - 110
    that.color = "white"
    that.border = 0
    that.borderColor = "lightgray"
    that.scrollY = 1

    // BOX: Items mask box (Top)
    SelectText.itemSelection.boxMaskTop = createBox(0, 109, page.width - 10 , 10)
    SelectText.itemSelection.add(that)
    that.element.style.background = "linear-gradient(to bottom, #FFFFFF, #FFFFFF00)"

    // BOX: Items mask box (Bottom)
    SelectText.itemSelection.boxMaskBottom = createBox(0, 189, page.width - 10 , 10)
    SelectText.itemSelection.add(that)
    that.element.style.background = "linear-gradient(to bottom, #FFFFFF00, #FFFFFF)"
    that.bottom = -1
    
    // Create new item
    SelectText.itemSelection.createItem = function(index) {

        // You can create your own custom item:

        // BOX: One of item box
        var boxItem = createBox(0, 0, page.width - 20, 60)
        that.index = index
        that.round = 4
        that.border = 0
        that.color = "white"
        that.borderColor = "lightgray"
        //that.element.style.borderBottomWidth = "1px"
        that.element.style.position = "relative"
        that.onClick(SelectText.itemSelection.itemClicked)

        // LABEL: Item name
        boxItem.lblName = createLabel(30, 17, page.width - 70, "auto")
        boxItem.add(that)
        that.text = connectedUI.itemList[index].name
        that.textAlign = "left"
        that.fontSize = 20
        that.textColor = "#4A4A4A"
        that.onResize(function(self) {
            self.center("top")
        })

        makeBasicObject(boxItem)

        return boxItem

    }

    SelectText.itemSelection.itemClicked = function(self) {

        if (connectedUI.selectedIndex >= 0) {
            SelectText.itemSelection.boxItems["b" + connectedUI.selectedIndex].color = "white"
        }

        self.color = SelectText.selectedColor
        connectedUI.setSelectedIndex(self.index)

        SelectText.itemSelection.close()

    }

    SelectText.itemSelection.close = function() {

        SelectText.itemSelection.opacity = 0
        SelectText.itemSelection.top = 150

        setTimeout(function() {
            if (SelectText.itemSelection) {
                SelectText.itemSelection.remove()
                SelectText.itemSelection = null

            }
        }, 300)
    }

    SelectText.itemSelection.filter = function() {

        var searchKeyword = SelectText.itemSelection.boxSearch.txtSearch.text.toLowerCase()

        for (var i = 0; i < connectedUI.itemList.length; i++) {

            var boxItem = SelectText.itemSelection.boxItems["b" + i]
            var nameKeyword = connectedUI.itemList[i].name.toLowerCase()

            if (nameKeyword.search(searchKeyword) > -1) {
                boxItem.visible = 1

            } else {
                boxItem.visible = 0
            }
        }
    }

    // Filter when search keyword is changed
    SelectText.itemSelection.boxSearch.txtSearch.inputElement.addEventListener("keyup", SelectText.itemSelection.filter)

    // Create all items
    for (var i = 0; i < connectedUI.itemList.length; i++) {
        SelectText.itemSelection.boxItems["b" + i] = SelectText.itemSelection.createItem(i)
        SelectText.itemSelection.boxItems.add(that)
    }

    // Highlight selected item
    if (connectedUI.selectedIndex >= 0) {
        SelectText.itemSelection.boxItems["b" + connectedUI.selectedIndex].color = SelectText.selectedColor
    }

}
