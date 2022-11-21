const menuStylePage = {};
menuStylePage.PAGE_ID = "menuStylePage";

menuStylePage.openInSecondView = function() {

    secondView.clear();

    // BOX: Page container.
    const box = secondView.getContainerBox();
    menuStylePage.box = box;

    box.color = "whitesmoke";
    box.scrollY = 0;

    // UI TITLE: Default values.
    UITitle.resetDefault();

    // UI TITLE: Object description.
    box.uiTitle = UITitle.create({ 
        title: "Menu Style", 
        backButtonVisible: 1, 
        backButtonText: "Settings" 
    });
    box.add(that);
    that.left = 0;
    that.top = 0;
    that.backButton.onClick(function(self) {
        secondView.close();
    });

    // LABEL: Centered text.
    box.lblCenteredText = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = "Menu Style Page";
    that.onResize(function(self) {
        self.center();
    });

    secondView.setVisible(1);
    print("Opened page id: " + secondExamplePage.PAGE_ID);

}