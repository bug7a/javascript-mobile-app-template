/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 August 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-action-button.htm


*/

"use strict";
const UIActionButton = {}

// SHARED VARIABLES:
UIActionButton.default = {}

UIActionButton.resetDefault = function() {

    UIActionButton.default.actionButtonColor = "#FFD541"
    UIActionButton.default.menuButtonColor = "#FFFFFF"
    UIActionButton.default.menuBackgroundColor = "whitesmoke"
    UIActionButton.default.menuWidth = 280
    UIActionButton.default.actionButtonSelectedColor = "lightgray"
    UIActionButton.default.actionButtonIconFile = "js/component/ui-action-button/add.png"
    UIActionButton.default.actionButtonIconSelectedFile = "js/component/ui-action-button/add.png"
    UIActionButton.default.actionButtonIconRotate = 0
    UIActionButton.default.actionButtonSelectedIconRotate = 45
    UIActionButton.default.coverBackgroundColor = "rgba(0, 0, 0, 0.0)"
    UIActionButton.default.actionButtonBorder = 4
    UIActionButton.default.rightOuterSpace = 40
    UIActionButton.default.bottomOuterSpace = 40
    UIActionButton.default.menuRightOuterSpace = 20
    UIActionButton.default.iconSize = 30

}

UIActionButton.resetDefault()

UIActionButton.create = function(parameters = {}) {

    // BOX: UI object container.
    const box = createBox()

    // Default values.
    box.default = {}
    for (let parameterName in UIActionButton.default) {
        box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UIActionButton.default[parameterName]
    }

    // *** PRIVATE VARIABLES:
    let onActionFunc = function() {}

    // *** PUBLIC VARIABLES:
    box.itemList = []
    box.isMenuOpened = 0

    // *** OBJECT MODEL:
    box.width = basic.getDefaultContainerBox().width
    box.height = basic.getDefaultContainerBox().height
    box.color = "transparent"
    box.bottom = 0
    box.right = 0
    
    // BOX: UI background.
    box.boxCover = createBox(0, 0, box.width, box.height)
    box.add(that)
    //that.color = "transparent"
    that.color = box.default.coverBackgroundColor
    that.clickable = 0
    that.visible = 0
    
    // BOX: Action button container box.
    box.boxButton = createBox(0, 0, 90, 90)
    box.add(that)
    that.right = box.default.rightOuterSpace
    that.bottom = box.default.bottomOuterSpace
    that.color = box.default.actionButtonColor
    that.round = 50
    that.border = box.default.actionButtonBorder
    that.borderColor = "rgba(0, 0, 0, 0.2)"
    that.setMotion("background-color 0.3s")
    //that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.1)"
    
    // IMAGE: Action button icon.
    box.boxButton.imgIcon = createImage(0, 0, box.default.iconSize, box.default.iconSize)
    box.boxButton.add(that)
    that.load(box.default.actionButtonIconFile)
    that.opacity = 0.4
    that.setMotion("transform 0.3s")
    //that.rotate = 45
    that.center()

    /*
    // BOX: Action button 2 container box.
    box.boxButton2 = createBox(0, 0, 50, 50)
    box.add(that)
    that.color = "#FFD541"
    that.round = 50
    that.border = 3
    that.right = 1
    that.bottom = 1
    that.borderColor = "rgba(0, 0, 0, 0.2)"
    that.setMotion("background-color 0.3s")
    //that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.1)"
    box.boxButton2.aline(box.boxButton, "top", 10, "center")
    
    // IMAGE: Action button icon.
    box.boxButton2.imgIcon = createImage(0, 0, 20, 20)
    box.boxButton2.add(that)
    that.load("js/component/ui-action-button/search.svg")
    that.opacity = 0.4
    that.setMotion("transform 0.3s")
    //that.rotate = 45
    that.center()
    */

    // BOX: Menu buttons container.
    box.boxMenu = createBox(0, 0, box.default.menuWidth, 158)
    box.add(that)
    that.right = box.boxButton.right + box.boxButton.width + box.default.menuRightOuterSpace  //140
    that.bottom = box.default.bottomOuterSpace
    that.color = box.default.menuBackgroundColor
    that.round = 13
    that.border = 2
    that.borderColor = "rgba(0, 0, 0, 0.2)"
    //that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.1)"
    that.visible = 0
    that.opacity = 0
    that.element.style.transform = "scale(0.4)"
    that.setMotion("opacity 0.2s, transform 0.2s")

    const makeMenuOpened = function() {

        box.isMenuOpened = 1

        box.boxCover.visible = 1
        box.boxCover.clickable = 1

        box.boxButton.imgIcon.rotate = box.default.actionButtonSelectedIconRotate
        box.boxButton.color = box.default.actionButtonSelectedColor

        if (box.default.actionButtonIconFile != box.default.actionButtonIconSelectedFile
            && box.default.actionButtonIconSelectedFile) {
                box.boxButton.imgIcon.load(box.default.actionButtonIconSelectedFile)
            }

    }

    const makeMenuClosed = function() {

        box.isMenuOpened = 0

        box.boxCover.visible = 0
        box.boxCover.clickable = 0

        box.boxButton.imgIcon.rotate = box.default.actionButtonIconRotate
        box.boxButton.color = box.default.actionButtonColor

        if (box.default.actionButtonIconFile != box.default.actionButtonIconSelectedFile
            && box.default.actionButtonIconSelectedFile) {
                box.boxButton.imgIcon.load(box.default.actionButtonIconFile)
            }

    }

    // *** PUBLIC METHODS:
    box.openMenu = function(self) {

        if (box.itemList.length > 1) {

            if (box.motionSetTimeout) {
                clearTimeout(box.motionSetTimeout)
            }

            if (box.isMenuOpened) {

                makeMenuClosed()

                box.boxMenu.opacity = 0
                box.boxMenu.element.style.transform = "scale(0.4)"
                box.motionSetTimeout = setTimeout(function() {
                    box.boxMenu.visible = 0
                }, 200)

            } else {

                makeMenuOpened()
                
                box.boxMenu.visible = 1
                box.boxMenu.withMotion(function(self) {
                    box.boxMenu.opacity = 1
                    box.boxMenu.element.style.transform = "scale(1)"
                })

            }

        } else {
            // If no item added (no sub buttons, call direct action function)
            onActionFunc(0)
        }

    }

    box.setItemsByDataList = function(dataList) {

        box.boxMenu.html = ""
        box.itemList = []

        let itemTop = 0

        for (let i = 0; i < dataList.length; i++) {

            box.boxMenu["btn" + i] = createButton(0, itemTop, box.boxMenu.width, 50)
            box.boxMenu.add(that)
            that.minimal = 1
            that.color = "white"
            that.text = dataList[i].text
            that.id = dataList[i].id
            that.onClick(function(self) {
                onActionFunc(self.id)
                box.openMenu()
            })

            box.itemList.push(that)

            itemTop += 51
            box.boxMenu.height = itemTop + (box.boxMenu.border * 2)

        }

        makeBasicObject(box)

    }

    box.onAction = function(func) {
        onActionFunc = func
    }

    box.changeActionButtonColor = function(color) {

        box.default.actionButtonColor = color
        box.boxButton.color = color

    }

    // *** CODE:
    box.boxButton.onClick(box.openMenu)
    // Press anywhere on background for close menu.
    box.boxCover.onClick(box.openMenu)
    // Dont block other buttons behinde component
    box.clickable = 0

    makeBasicObject(box)
    return box

}