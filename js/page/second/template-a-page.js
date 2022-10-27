
const templateAPage = {};
templateAPage.PAGE_ID = "templateAPage";

templateAPage.openInDefaultView = function() {

        defaultView.clear();

        var box = defaultView.getContainerBox();
        // Out of this function, use "templateAPage.box" for "box".
        templateAPage.box = box;

        topBar.setVisible(1);
        topBar.setTitle("Sample1 Page");
        topBar.backButton.setVisible(1);
        topBar.menuButton.setVisible(0);
        bottomBar.setVisible(0);
        //bottomBar.selectItemByIndex(2)
        defaultView.setTopAndBottomOutterSpaces(topBar.getHeight(), 0);

        box.color = "#D3CFC1";
        // Dont scroll
        box.scrollX = 0;
        box.scrollY = 0;

        // #1

        // BOX: Group box for buttons
        box.buttonGroup = createBox(0, 0, 250, 104);
        box.add(that);
        that.color = "transparent";
        that.center();

        // BUTTON: Open Sub View button.
        box.buttonGroup.btnOpenSubView = createButton(0, 0, 250)
        box.buttonGroup.add(that)
        that.text = "Sub Usage Example"
        that.color = "rgba(0, 0, 0, 0.1)"
        //that.border = 1
        //that.borderColor = "rgba(0, 0, 0, 0.2)"
        that.textColor = "rgba(255, 255, 255, 0.8)"
        that.minimal = 1
        that.onClick(function(self) {
            subExamplePage.openInDefaultView()
        })

        // BUTTON: Open Second View button.
        box.buttonGroup.btnOpenSecondView = createButton(0, 0, 250)
        box.buttonGroup.add(that)
        that.text = "Second View Example"
        that.color = "rgba(0, 0, 0, 0.1)"
        //that.border = 1
        //that.borderColor = "rgba(0, 0, 0, 0.2)"
        that.textColor = "rgba(255, 255, 255, 0.8)"
        that.minimal = 1
        that.aline(box.buttonGroup.btnOpenSubView, "bottom", 4)
        that.onClick(function(self) {
            //secondExamplePage.open()
            secondExamplePage.openInSecondView()
        })

        // #2

        // TOP:
        // Calculate width for 2 container box.
        var doubleButtonWidth = ((box.width - 40 - 4) / 2);

        // BOX: Up left container box.
        box.boxUpLeft = createBox(20, 40, doubleButtonWidth, 160);
        box.add(that);
        that.color = "rgba(0, 0, 0, 0.05)";
        that.round = 13;
        that.onClick(function(self) {
            myDocumentsPage.openInSecondView();
        })

        // IMAGE: My Documents icon.
        box.boxUpLeft.imgIcon = createImage(0, 60, 70, 70);
        box.boxUpLeft.add(that);
        that.load("assets/file-icons/folder.png");
        that.opacity = 0.9;
        that.center("left");

        // LABEL: My documents title text.
        box.boxUpLeft.lblTitle = createLabel(0, 25, box.boxUpLeft.width, 30);
        box.boxUpLeft.add(that);
        that.text = "My Documents";
        that.textAlign = "center";
        that.textColor = "rgba(0, 0, 0, 0.9)";

        // BOX: Up right container box.
        box.boxUpRight = createBox(20, 40, doubleButtonWidth, 160)
        box.add(that)
        that.color = "rgba(0, 0, 0, 0.05)"
        //that.color = "rgba(255, 255, 255, 0.8)"
        that.round = 13
        that.aline(box.boxUpLeft, "right", 4)

        // IMAGE: Lamp icon.
        box.boxUpRight.imgIcon = createImage(20, 20, 70, 70)
        box.boxUpRight.add(that)
        that.load("assets/lamp.png")
        //that.color = "rgba(255, 255, 255, 0.05)"
        that.round = 13
        that.space = 0
        //that.border = 1
        //that.borderColor = "rgba(255, 255, 255, 0.1)"
        //that.borderColor = "rgba(0, 0, 0, 0.2)"
        that.opacity = 0.9

        var lampTitleTop = box.boxUpRight.imgIcon.top + (box.boxUpRight.imgIcon.height / 2) - (that.height / 2)
        var lampTitleLeft = box.boxUpRight.imgIcon.left + box.boxUpRight.imgIcon.width + 4
        // LABEL: Lamp title text.
        box.boxUpRight.lblTitle = createLabel(0, 0, 130, 40)
        box.boxUpRight.add(that)
        that.text = "Lamp"
        that.top = lampTitleTop
        that.left = lampTitleLeft
        that.fontSize = 30
        that.textAlign = "left"
        that.textColor = "rgba(0, 0, 0, 0.9)";

        // UI TOGGLE: Open light toggle.
        UIToggle.style.microsoft();
        box.boxUpRight.uiToggle = createUIToggle();
        box.boxUpRight.add(that);
        that.right = 20;
        that.bottom = 20;

        // LABEL: Toggle on/off text.
        box.boxUpRight.lblToggle = createLabel(0, 25, box.boxUpLeft.width, 30);
        box.boxUpRight.add(that);
        that.text = "";
        that.fontSize = 20;
        that.textAlign = "right";
        that.textColor = "rgba(0, 0, 0, 0.6)";
        that.aline(box.boxUpRight.uiToggle, "left", 10, "center");
        //that.bottom += 4;

        box.boxUpRight.uiToggle.onChange(function(self) {
            if (self.getValue()) {
                box.boxUpRight.lblToggle.text = "ON"
                box.boxUpRight.imgIcon.load("assets/lamp-on.png")
                global.natifications.isLampOn = 1
                saveGlobal()

            } else {
                box.boxUpRight.lblToggle.text = "OFF"
                box.boxUpRight.imgIcon.load("assets/lamp.png")
                global.natifications.isLampOn = 0
                saveGlobal()
            }
            print("Lamp toggle value: " + self.getValue())
        })

        // Take value from global.
        box.boxUpRight.uiToggle.setValue(global.natifications.isLampOn)

        // #3

        // BOTTOM:
        // Calculate width for 3 container box.
        var tripleButtonWidth = ((box.width - 40 - 8) / 3)

        // BOX: Bottom left container box.
        box.boxBottomLeft = createBox(20, 0, tripleButtonWidth, 160)
        box.add(that)
        that.bottom = 20
        that.color = "rgba(0, 0, 0, 0.05)"
        that.round = 13

        // LABEL: Counting number.
        box.boxBottomLeft.lblNumber = createLabel(0, 0, "auto", "auto")
        box.boxBottomLeft.add(that)
        that.text = "1"
        that.fontSize = 40
        that.textColor = "rgba(255, 255, 255, 0.9)"
        that.color = "rgba(0, 0, 0, 0.1)"
        that.round = 8
        that.spaceX = 12
        that.onResize(function(self) {
            self.center()
        })
        box.boxBottomLeft.onClick(function(self) {
            self.lblNumber.text = num(self.lblNumber.text) + 1
            segmentExamplePage.openInSecondView()
        })

        // BOX: Bottom center container box.
        box.boxBottomCenter = createBox(20, 0, tripleButtonWidth, 160)
        box.add(that)
        that.bottom = 20
        that.color = "rgba(0, 0, 0, 0.05)"
        that.round = 13
        that.aline(box.boxBottomLeft, "right", 4)

        // LABEL: Rotating title text.
        box.boxBottomCenter.lblTitle = createLabel(0, 0, "auto", "auto")
        box.boxBottomCenter.add(that)
        that.text = "abc"
        that.fontSize = 26
        that.textColor = "rgba(255, 255, 255, 0.9)"
        that.color = "rgba(0, 0, 0, 0.1)"
        that.round = 8
        that.spaceX = 12
        that.onResize(function(self) {
            self.center()
        })
        box.boxBottomCenter.onClick(function(self) {
            self.lblTitle.rotate += 45
        })

        // BOX: Bottom right container box.
        box.boxBottomRight = createBox(20, 0, tripleButtonWidth, 160)
        box.add(that)
        that.bottom = 20
        that.color = "rgba(0, 0, 0, 0.05)"
        that.round = 13
        that.aline(box.boxBottomCenter, "right", 4)

        // IMAGE: Caffee icon.
        box.boxBottomRight.imgCaffee = createImage(0, 0, 40, 40)
        box.boxBottomRight.add(that)
        that.load("assets/categories/coffee.png")
        that.center()
        box.boxBottomRight.onClick(function(self) {
            box.boxBottomCenter.lblTitle.text = "Caffee"
        })

        defaultView.setVisible(1);
        print("Opened page id: " + templateAPage.PAGE_ID);

}