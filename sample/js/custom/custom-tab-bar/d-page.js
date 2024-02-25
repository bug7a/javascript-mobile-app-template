const dPage = {};
dPage.PAGE_ID = "dPage";

dPage.openInSecondView = function() {

    secondView.clear();

    // BOX: Page container.
    const box = secondView.getContainerBox();
    dPage.box = box;

    box.color = "whitesmoke";
    box.scrollY = 0;

    // UI TITLE: Default values.
    UITitle.resetDefault();

    // UI TITLE: Object description.
    box.uiTitle = UITitle.create({ 
        title: "Page Title", 
        backButtonVisible: 1, 
        backButtonText: "Home" 
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
    that.text = "Page D";
    that.onResize(function(self) {
        self.center();
    });

    secondView.setVisible(1);
    console.log("Opened page id: " + dPage.PAGE_ID);

}