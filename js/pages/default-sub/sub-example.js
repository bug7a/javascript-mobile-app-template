
var subExamplePage = {}
subExamplePage.ID = "sub-example"

subExamplePage.createInDefaultViewAndShow = function() {

    if (subExamplePage.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
        // Out of this function, use "subExamplePage.box" for "box".
        subExamplePage.box = box

        navigationBar.setVisible(1)
        navigationBar.setTitle("Example #1")
        navigationBar.backButton.setVisible(1)
        navigationBar.menuButton.setVisible(1)
        tabBar.setVisible(0)
        defaultView.setTopAndBottomOuterSpaces(navigationBar.HEIGHT, 0)

        box.color = "whitesmoke"

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
        that.fontSize = 22
        that.space = 6
        that.spaceX = 14
        that.round = 6
        that.onClick(subExamplePage.writeMessage)
        that.onResize(function(self) {
            self.center("left")
        })

        // BUTTON: Open Sub View button.
        box.buttonGroup.btnOpenSubView = createButton(0, 50, 250)
        box.buttonGroup.add(that)
        that.text = "Open another"
        that.color = "rgba(0, 0, 0, 0.7)"
        //that.border = 1
        //that.borderColor = "rgba(0, 0, 0, 0.2)"
        that.textColor = "rgba(255, 255, 255, 0.8)"
        that.minimal = 1
        that.onClick(function(self) {
            subExample2Page.createInDefaultViewAndShow()
        })

        defaultView.pushIntoOpenedPageList(subExamplePage)
        defaultView.setVisible(1)
        print("Opened page id: " + subExamplePage.ID)
    }
}

subExamplePage.writeMessage = function() {
    print("Clicked on text.")
}