
var subExample2Page = {}
subExample2Page.ID = "sub-example2"

subExample2Page.createInDefaultViewAndShow = function() {

    if (subExample2Page.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
        // Out of this function, use "subExample2Page.box" for "box".
        subExample2Page.box = box

        navigationBar.setVisible(1)
        navigationBar.setTitle("Example #2")
        navigationBar.backButton.setVisible(1)
        navigationBar.menuButton.setVisible(1)
        tabBar.setVisible(0)
        defaultView.setTopAndBottomOuterSpaces(navigationBar.HEIGHT, 0)

        var colors = ["#5F9EA0", "#BDB76B", "#2F4F4F", "#FF1493", "#CD5C5C", "#DB7093", "#4682B4", "#008080"]
        box.color = "#4682B4"

        // #1

        // BOX: Group box for buttons
        box.buttonGroup = createBox(0, 0, 250, 104)
        box.add(that)
        that.color = "transparent"
        that.center()

        // LABEL: Sayfanın ortasındaki yazı
        box.buttonGroup.lblContent = createLabel(0, 0, "auto", "auto")
        box.buttonGroup.add(that)
        that.text = "Sub Usage Example."
        that.textColor = "rgba(255, 255, 255, 0.8)"
        that.fontSize = 22
        that.space = 6
        that.spaceX = 14
        that.round = 6
        that.onClick(subExample2Page.writeMessage)
        that.onResize(function(self) {
            self.center("left")
        })

        // BUTTON: Open Sub View button.
        box.buttonGroup.btnOpenSubView = createButton(0, 50, 250)
        box.buttonGroup.add(that)
        that.text = "Open another"
        that.color = "rgba(255, 255, 255, 0.7)"
        //that.border = 1
        //that.borderColor = "rgba(0, 0, 0, 0.2)"
        that.textColor = "rgba(0, 0, 0, 0.6)"
        that.minimal = 1
        that.onClick(function(self) {
            subExamplePage.createInDefaultViewAndShow()
        })

        defaultView.pushIntoOpenedPageList(subExample2Page)
        defaultView.setVisible(1)
        print("Opened page id: " + subExample2Page.ID)
    }
}

subExample2Page.writeMessage = function() {
    print("Clicked on text.")
}