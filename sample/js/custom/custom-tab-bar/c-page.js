const cPage = {};
cPage.PAGE_ID = "cPage";

cPage.createIn = function(box) {

    // BOX: Page container.
    cPage.box = box;

    box.color = "white";
    box.scrollY = 0;

    // LABEL: Centered text.
    box.lblCenteredText = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = "Page C";
    that.onResize(function(self) {
        self.center();
    });

    console.log("Opened page id: " + cPage.PAGE_ID);

}