const bPage = {};
bPage.PAGE_ID = "bPage";

bPage.createIn = function(box) {

    // BOX: Page container.
    bPage.box = box;

    box.color = "white";
    box.scrollY = 0;

    // LABEL: Centered text.
    box.lblCenteredText = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = "Page B";
    that.onResize(function(self) {
        self.center();
    });

    console.log("Opened page id: " + bPage.PAGE_ID);

}