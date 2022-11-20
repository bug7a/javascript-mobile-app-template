
const templateAPage = {};
templateAPage.PAGE_ID = "templateAPage";

templateAPage.openInSecondView = function() {

        secondView.clear();

        var box = secondView.getContainerBox();
        templateAPage.box = box;

        box.color = "#D3CFC1";
        // Dont scroll
        box.scrollX = 0;
        box.scrollY = 0;

        // UI TITLE: Default values.
        UITitle.resetDefault();
        UITitle.default.backButtonIconFile = "js/component/ui-title/arrow.svg";
        UITitle.default.backButtonTextColor = "rgba(0, 0, 0, 0.8)";

        // CELLS: 4 vertical cells:
        UICells.create(box, UICells.alignType.VERTICAL, [UITitle.default.height, 190, "auto", 190]);
        box.cell(0).color = "transparent";
        box.cell(1).color = "transparent";
        box.cell(2).color = "transparent"; // "red"
        box.cell(3).color = "transparent";
        
        // CELLS: 2 horizontal cells in box.cell(1)
        UICells.create(box.cell(1), UICells.alignType.HORIZONTAL, ["auto", "auto"]);
        box.cell(1).cell(0).color = "transparent";
        box.cell(1).cell(1).color = "transparent";

        // CELLS: 3 horizontal cells in box.cell(3)
        UICells.create(box.cell(3), UICells.alignType.HORIZONTAL, ["auto", "auto", "auto"]);
        box.cell(3).cell(0).color = "transparent";
        box.cell(3).cell(1).color = "transparent"; // "red"
        box.cell(3).cell(2).color = "transparent";


        // #1 Title

        // UI TITLE: Object description.
        box.uiTitle = UITitle.create({ 
            title: "Template A", 
            backButtonVisible: 1, 
            backButtonText: "Back",
            backgroundColor: "transparent"
        });
        box.cell(0).add(that);
        that.backButton.onClick(function(uiTitleBackButton) {
            print("Go Back");
            secondView.onClose(function closed() {});
            secondView.close();
        });
        that.left = 0;
        that.top = 0;


        // #2 Up

        // BOX: Up left background.
        box.boxUpLeft = createBox();
        box.cell(1).cell(0).add(that);
        that.width = box.cell(1).cell(0).width - 25;
        that.height = box.cell(1).cell(0).height - 20;
        that.color = "rgba(0, 0, 0, 0.05)";
        that.round = 13;
        that.top = 20;
        that.left = 20;
        that.onClick(function(self) {

            secondView.onClose(function closed() {
                myDocumentsPage.openInSecondView();
            });
            
            secondView.close();

        });

        // GROUP: My documents item group.
        box.boxUpLeft.grpMyDocuments = UIGroup.create();
        box.boxUpLeft.add(that);
        that.setInnerSpaces(0, 0, 0, 0);
        that.setSpacesBetweenItems(8);
        that.setItemAlignment(UIGroup.alignType.VERTICAL, "center");
        
        // IMAGE: My documents icon.
        box.boxUpLeft.imgIcon = createImage();
        that.width = 80;
        that.height = 80;
        that.load("assets/file-icons/folder.png");
        that.opacity = 0.9;
        that.element.style.filter = "grayscale(70%)";
        that.border = 0;
        that.borderColor = "rgba(0, 0, 0, 0.2)";
        that.round = 8;
        that.space = 10;
        that.color = "rgba(0, 0, 0, 0.05)";

        // LABEL: My documents title text.
        box.boxUpLeft.lblTitle = createLabel();
        that.width = "auto";
        that.height = "auto";
        that.text = "My Documents";
        that.fontSize = 20;
        that.textAlign = "center";
        that.textColor = "rgba(0, 0, 0, 0.9)";
        that.border = 0;
        that.borderColor = "rgba(0, 0, 0, 0.2)";
        that.round = 8;
        that.spaceX = 8;
        that.spaceY = 4;
        that.color = "rgba(0, 0, 0, 0.05)";

        // Add items into group.
        box.boxUpLeft.grpMyDocuments.addItem(box.boxUpLeft.imgIcon);
        box.boxUpLeft.grpMyDocuments.addItem(box.boxUpLeft.lblTitle);
        box.boxUpLeft.grpMyDocuments.onResize(function(self) {
            box.boxUpLeft.grpMyDocuments.center();
        });

        // BOX: Up right background. 
        box.boxUpRight = createBox();
        box.cell(1).cell(1).add(that);
        that.width = box.cell(1).cell(1).width - 25;
        that.height = box.cell(1).cell(1).height - 20;
        that.color = "rgba(0, 0, 0, 0.05)";
        that.round = 13;
        that.left = 5;
        that.top = 20;

        // IMAGE: Lamp icon.
        box.boxUpRight.imgIcon = createImage();
        box.boxUpRight.add(that);
        that.width = 70;
        that.height = 70;
        that.load("assets/lamp.png");
        that.round = 13;
        that.space = 0;
        that.opacity = 0.9;
        that.left = 20;
        that.top = 20;

        // LABEL: Lamp title text.
        box.boxUpRight.lblTitle = createLabel();
        box.boxUpRight.add(that);
        that.text = "Lamp";
        that.width = 130;
        that.height = 40;
        that.fontSize = 30;
        that.textAlign = "left";
        that.textColor = "rgba(0, 0, 0, 0.9)";
        that.aline(box.boxUpRight.imgIcon, "right", 8, "top");

        // UI TOGGLE: Open light toggle.
        UIToggle.style.microsoft();
        box.boxUpRight.uiToggle = UIToggle.create();
        box.boxUpRight.add(that);
        that.right = 20;
        that.bottom = 20;

        // LABEL: Toggle on/off text.
        box.boxUpRight.lblToggle = createLabel();
        box.boxUpRight.add(that);
        that.width = "auto";
        that.height = "auto";
        that.text = "";
        that.fontSize = 20;
        that.textAlign = "right";
        that.textColor = "rgba(0, 0, 0, 0.6)";
        that.onResize(function(self) {
            self.aline(box.boxUpRight.uiToggle, "left", 10, "center");
        });
        
        box.boxUpRight.uiToggle.onChange(function(self) {

            if (self.getValue()) {
                box.boxUpRight.lblToggle.text = "ON";
                box.boxUpRight.imgIcon.load("assets/lamp-on.png");
                global.natifications.isLampOn = 1;
                saveGlobal();

            } else {
                box.boxUpRight.lblToggle.text = "OFF";
                box.boxUpRight.imgIcon.load("assets/lamp.png");
                global.natifications.isLampOn = 0;
                saveGlobal();

            }

            print("Lamp toggle value: " + self.getValue());

        });

        // Take value from global.
        box.boxUpRight.uiToggle.setValue(global.natifications.isLampOn);


        // #3 Center content

        // GROUP: Group for buttons.
        box.grpButtons = UIGroup.create();
        box.cell(2).add(that);
        that.setInnerSpaces(0, 0, 0, 0);
        that.setSpacesBetweenItems(2);
        that.setItemAlignment(UIGroup.alignType.VERTICAL, "center");

        // BUTTON: Button 1.
        box.btn1 = createButton();
        that.text = "Button 1";
        templateAPage.buttonStyle(that);
        that.onClick(function(self) {
            print("Button 1 clicked.");
        });

        // BUTTON: Button 2.
        box.btn2 = createButton();
        that.text = "Button 2";
        templateAPage.buttonStyle(that);
        that.onClick(function(self) {
            print("Button 2 clicked.");
        });

        // Add items into group.
        box.grpButtons.addItem(box.btn1);
        box.grpButtons.addItem(box.btn2);
        box.grpButtons.onResize(function(self) {
            self.center();
        });


        // #4 Bottom

        // BOX: Bottom left background.
        box.boxBottomLeft = createBox();
        box.cell(3).cell(0).add(that);
        that.width = that.containerBox.width - 25;
        that.height = that.containerBox.height - 20;
        that.color = "rgba(0, 0, 0, 0.05)";
        that.round = 13;
        that.left = 20;
        that.bottom = 20;

        // LABEL: Counting number.
        box.boxBottomLeft.lblNumber = createLabel();
        box.boxBottomLeft.add(that);
        that.width = "auto";
        that.height = "auto";
        that.text = "1";
        that.fontSize = 40;
        that.textColor = "rgba(0, 0, 0, 0.8)";
        that.color = "rgba(0, 0, 0, 0.05)";
        that.border = 1;
        that.borderColor = "rgba(0, 0, 0, 0.2)";
        that.round = 8;
        that.spaceX = 12;
        that.onResize(function(self) {
            self.center();
        })
        box.boxBottomLeft.onClick(function(self) {
            self.lblNumber.text = num(self.lblNumber.text) + 1;
            print(self.lblNumber.text);
        })

        // BOX: Bottom center background.
        box.boxBottomCenter = createBox();
        box.cell(3).cell(1).add(that);
        that.width = that.containerBox.width - 10;
        that.height = that.containerBox.height - 20;
        that.color = "rgba(0, 0, 0, 0.05)";
        that.round = 13;
        that.bottom = 20;
        that.left = 5;

        // LABEL: Rotating text.
        box.boxBottomCenter.lblTitle = createLabel();
        box.boxBottomCenter.add(that);
        that.width = "auto";
        that.height = "auto";
        that.text = "abc"
        that.fontSize = 26;
        that.textColor = "rgba(0, 0, 0, 0.8)";
        that.color = "rgba(0, 0, 0, 0.05)";
        that.border = 1;
        that.borderColor = "rgba(0, 0, 0, 0.2)";
        that.round = 8;
        that.spaceX = 12;
        that.setMotion("transform 0.2s");
        that.onResize(function(self) {
            self.center();
        })
        box.boxBottomCenter.onClick(function(self) {

            const lbl = self.lblTitle;

            if (lbl.rotate >= 360) {
                lbl.dontMotion();
                lbl.rotate = 0;
            }

            lbl.withMotion(function() {
                lbl.rotate += 45;
            });

            print(lbl.rotate);

        })

        // BOX: Bottom right container box.
        box.boxBottomRight = createBox();
        box.cell(3).cell(2).add(that);
        that.width = that.containerBox.width - 25;
        that.height = that.containerBox.height - 20;
        that.color = "rgba(0, 0, 0, 0.05)";
        that.round = 13;
        that.bottom = 20;
        that.right = 20;

        // IMAGE: Caffee icon.
        box.boxBottomRight.imgCaffee = createImage();
        box.boxBottomRight.add(that);
        that.width = 90;
        that.height = 90;
        that.load("assets/categories/coffee.png");
        that.element.style.filter = "grayscale(100%)";
        that.center();
        box.boxBottomRight.onClick(function(self) {
            box.boxBottomCenter.lblTitle.text = "caffee";
        })

        print("Opened page id: " + templateAPage.PAGE_ID);
        secondView.setVisible(1);

}

templateAPage.buttonStyle = function(btn) {

    that.width = 250;
    that.color = "rgba(0, 0, 0, 0.1)";
    that.textColor = "rgba(0, 0, 0, 0.7)";
    that.border = 1;
    that.borderColor = "rgba(0, 0, 0, 0.2)";
    that.minimal = 1;

}