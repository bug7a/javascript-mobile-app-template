const securityPage = {};
securityPage.PAGE_ID = "securityPage";

securityPage.openInSecondView = function() {

    secondView.clear();

    // BOX: Page container.
    const box = secondView.getContainerBox();
    securityPage.box = box;

    box.color = "whitesmoke";
    box.scrollY = 0;

    // UI TITLE: Default values.
    UITitle.resetDefault();
    UITitle.default.width = box.width;

    // UI TITLE: Object description.
    box.uiTitle = UITitle.create({ 
        title: "Security", 
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
    that.text = "Security Page";
    that.onResize(function(self) {
        self.center();
    });

    secondView.setVisible(1);
    print("Opened page id: " + secondExamplePage.PAGE_ID);

}