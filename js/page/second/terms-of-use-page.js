const termsOfUsePage = {};
termsOfUsePage.PAGE_ID = "termsOfUsePage";

termsOfUsePage.openInSecondView = function() {

    secondView.clear();

    // BOX: Page container.
    const box = secondView.getContainerBox();
    termsOfUsePage.box = box;

    box.color = "whitesmoke";
    box.scrollY = 0;

    // UI TITLE: Default values.
    UITitle.resetDefault();

    // UI TITLE: Object description.
    box.uiTitle = UITitle.create({ 
        title: "Privacy Policy and Terms of Use", 
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
    that.text = "Privacy Policy and<br>Terms of Use Page";
    that.textAlign = "center";
    that.onResize(function(self) {
        self.center();
    });

    secondView.setVisible(1);
    print("Opened page id: " + secondExamplePage.PAGE_ID);

}