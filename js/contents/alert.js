
var alertContent = {}

alertContent.createIn = function(box) {

    alertContent.box = box
    box.color = "#EB6853"

    // BOX: Group box for buttons
    box.buttonGroup = createBox(0, 0, 250, 104)
    box.add(that)
    that.color = "transparent"
    that.center()

    // BUTTON: Open Sub View button.
    box.buttonGroup.btnOpenView1 = createButton(0, 0, 250)
    box.buttonGroup.add(that)
    that.text = "Open Sub View"
    that.color = "rgba(0, 0, 0, 0.1)"
    //that.border = 1
    //that.borderColor = "rgba(0, 0, 0, 0.2)"
    that.textColor = "rgba(255, 255, 255, 0.8)"
    that.minimal = 1
    that.onClick(function(self) {
        contentController.openContentById("test-secondview")
    })

    // BUTTON: Open Second View button.
    box.buttonGroup.btnOpenView2 = createButton(0, 0, 250)
    box.buttonGroup.add(that)
    that.text = "Open Second View"
    that.color = "rgba(0, 0, 0, 0.1)"
    //that.border = 1
    //that.borderColor = "rgba(0, 0, 0, 0.2)"
    that.textColor = "rgba(255, 255, 255, 0.8)"
    that.minimal = 1
    that.aline(box.buttonGroup.btnOpenView1, "bottom", 4)
    that.onClick(function(self) {
        secondUsageExamContent.open()
        secondView.setVisible(1)
    })

    var doubleButtonWidth = ((page.width - 40 - 4) / 2)

    // BOX: My Documents button container box.
    box.boxOpenDocumentsButton = createBox(20, 40, doubleButtonWidth, 160)
    box.add(that)
    that.color = "rgba(0, 0, 0, 0.1)"
    that.round = 13
    that.onClick(function(self) {
        folderContent.open()
    })

    // IMAGE: My Documents button icon.
    box.boxOpenDocumentsButton.imgIcon = createImage(0, 60, 70, 70)
    box.boxOpenDocumentsButton.add(that)
    that.load("images/file-icons/folder.png")
    that.opacity = 0.9
    that.center("left")

    // LABEL: My Documents text
    box.boxOpenDocumentsButton.lblTitle = createLabel(0, 25, box.boxOpenDocumentsButton.width, 30)
    box.boxOpenDocumentsButton.add(that)
    that.text = "My Documents"
    that.textAlign = "center"
    that.textColor = "rgba(255, 255, 255, 0.9)"

    // BOX: Other button container box.
    box.boxOtherButton = createBox(20, 40, doubleButtonWidth, 160)
    box.add(that)
    that.color = "rgba(0, 0, 0, 0.1)"
    //that.color = "rgba(255, 255, 255, 0.8)"
    that.round = 13
    that.aline(box.boxOpenDocumentsButton, "right", 4)

    // IMAGE: Lamp icon.
    box.boxOtherButton.imgIcon = createImage(20, 20, 70, 70)
    box.boxOtherButton.add(that)
    that.load("images/lamp.png")
    //that.color = "rgba(255, 255, 255, 0.05)"
    that.round = 13
    that.space = 0
    //that.border = 1
    //that.borderColor = "rgba(255, 255, 255, 0.1)"
    //that.borderColor = "rgba(0, 0, 0, 0.2)"
    that.opacity = 0.9

    // LABEL: Lamp title text.
    box.boxOtherButton.lblTitle = createLabel(0, 0, 130, 40)
    box.boxOtherButton.add(that)
    that.text = "Lamp"
    that.top = box.boxOtherButton.imgIcon.top + (box.boxOtherButton.imgIcon.height / 2) - (that.height / 2)
    that.left = box.boxOtherButton.imgIcon.left + box.boxOtherButton.imgIcon.width + 4
    that.fontSize = 30
    that.textAlign = "left"
    that.textColor = "rgba(255, 255, 255, 0.9)"

    // UI TOGGLE: Open light toggle.
    box.boxOtherButton.uiToggle = createUIToggle(0, 20)
    box.boxOtherButton.add(that)
    that.right = 20
    that.bottom = 20
    that.setColorOff("rgba(0, 0, 0, 1)")
    that.setColorOn("white")
    that.border = 0
    that.borderColor = "rgba(0, 0, 0, 0.4)"
    that.btnAction.border = 3
    that.btnAction.borderColor = "rgba(0, 0, 0, 1)"

    // LABEL: Toggle on/off text.
    box.boxOtherButton.lblToggle = createLabel(0, 25, box.boxOpenDocumentsButton.width, 30)
    box.boxOtherButton.add(that)
    that.text = ""
    that.fontSize = 20
    that.textAlign = "right"
    that.textColor = "rgba(255, 255, 255, 0.6)"
    that.aline(box.boxOtherButton.uiToggle, "left", 10)
    that.bottom += 4

    box.boxOtherButton.uiToggle.onChange(function(self) {
        if (self.getValue()) {
            box.boxOtherButton.lblToggle.text = "On"
            box.boxOtherButton.imgIcon.load("images/lamp-on.png")
            storage.save("alertContent.box.boxOtherButton.uiToggle-value", 1)
        } else {
            box.boxOtherButton.lblToggle.text = "Off"
            box.boxOtherButton.imgIcon.load("images/lamp.png")
            storage.save("alertContent.box.boxOtherButton.uiToggle-value", 0)
        }
    })

    box.boxOtherButton.uiToggle.setValue(storage.load("alertContent.box.boxOtherButton.uiToggle-value") | 0)

    var tripleButtonWidth = ((page.width - 40 - 8) / 3)

    // BOX: Container box.
    box.boxSomeButton = createBox(20, 0, tripleButtonWidth, 160)
    box.add(that)
    that.bottom = 20
    that.color = "rgba(0, 0, 0, 0.1)"
    that.round = 13

    // LABEL: A
    box.boxSomeButton.lblNumber = createLabel(0, 0, "auto", "auto")
    box.boxSomeButton.add(that)
    that.text = "1"
    that.fontSize = 40
    that.textColor = "white"
    that.color = "rgba(255, 255, 255, 0.1)"
    that.round = 8
    that.spaceX = 12
    that.onResize(function(self) {
        self.center()
    })
    box.boxSomeButton.onClick(function(self) {
        self.lblNumber.text = num(self.lblNumber.text) + 1
    })

    // BOX: Container box.
    box.boxSome2Button = createBox(20, 0, tripleButtonWidth, 160)
    box.add(that)
    that.bottom = 20
    that.color = "rgba(0, 0, 0, 0.1)"
    that.round = 13
    that.aline(box.boxSomeButton, "right", 4)

    // LABEL: B
    box.boxSome2Button.lblB = createLabel(0, 0, "auto", "auto")
    box.boxSome2Button.add(that)
    that.text = "abc"
    that.fontSize = 26
    that.textColor = "white"
    that.color = "rgba(255, 255, 255, 0.1)"
    that.round = 8
    that.spaceX = 12
    that.onResize(function(self) {
        self.center()
    })
    box.boxSome2Button.onClick(function(self) {
        self.lblB.rotate += 45
    })

    // BOX: Container box.
    box.boxSome3Button = createBox(20, 0, tripleButtonWidth, 160)
    box.add(that)
    that.bottom = 20
    that.color = "rgba(0, 0, 0, 0.1)"
    that.round = 13
    that.aline(box.boxSome2Button, "right", 4)

    // LABEL: Caffee
    box.boxSome3Button.imgCaffee = createImage(0, 0, 40, 40)
    box.boxSome3Button.add(that)
    that.load("images/categories/coffee.png")
    that.center()
    box.boxSome3Button.onClick(function(self) {
        box.boxSome2Button.lblB.text = "Caffee"
    })
}

alertContent.open = function() {

    navigationBar.setVisible(1)
    navigationBar.setTitle("Notifications")
    navigationBar.backButton.setVisible(0)
    navigationBar.menuButton.setVisible(1)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(2)
    defaultView.setTopAndBottom(navigationBar.HEIGHT, tabBar.HEIGHT)
    defaultView.createAndShowContent(alertContent)
}