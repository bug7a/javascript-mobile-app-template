

/* Bismillah */

/*

CUSTOM DIALOG TEMPLATE
- You can customize, this template code as you need:


Started Date: 3 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

const selectColorDialog = {};
selectColorDialog.PAGE_ID = "selectColorDialog";

selectColorDialog.colorList = ["#FFD541", "#689BD2", "#A5D5BE", "lightgray", "#EE7553", "pink" ];
selectColorDialog.selectedColor = "";

selectColorDialog.openInSmallView = function(colorSelectedCallback = function() {}) {

    smallView.clear();

    // BOX: Page container.
    const box = smallView.getContainerBox();
    selectColorDialog.box = box;

    box.color = "white";
    box.height = 240;

    // LABEL: Title text.
    box.lblTitle = createLabel(0, 60, app.usedWidth, "auto");
    box.add(that);
    that.text = "Select a Color";
    that.fontSize = 28;
    that.textAlign = "center";

    // UI GROUP: Color items.
    box.grpColor = UIGroup.create();
    box.add(that);
    that.setInnerSpaces(0, 0, 0, 0);
    that.setSpacesBetweenItems(20);
    //that.setItemAlignment(UIGroup.alignType.HORIZONTAL, "center");

    for (let i = 0; i < selectColorDialog.colorList.length; i++) {

        if (selectColorDialog.selectedColor != selectColorDialog.colorList[i]) {

            // COLOR ITEM:
            const colorItem = selectColorDialog.createColorItem(selectColorDialog.colorList[i]);

            box.grpColor.addItem(colorItem);
            colorItem.colorData = selectColorDialog.colorList[i];

            colorItem.onClick(function(self) {

                colorSelectedCallback(self.colorData);
                smallView.close();

            });

        }

    };

    box.grpColor.onResize(function(self) {

        self.center("left");
        self.top = 120;

    })

    smallView.setVisible(1);

};

selectColorDialog.createColorItem = function(color = "white") {

    // BOX: Item container.
    const item = createBox(0, 0, 40, 40);

    that.color = color;
    that.border = 2;
    that.borderColor = "#141414";
    that.round = 40;

    makeBasicObject(item);
    return(item);

};