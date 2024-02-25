const aPage = {};
aPage.PAGE_ID = "aPage";

aPage.createIn = function(box) {

    // BOX: Page container.
    aPage.box = box;

    box.color = "white";
    box.scrollY = 0;

    // LABEL: Centered text.
    box.lblCenteredText = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = "Page A";
    that.onResize(function(self) {
        self.center();
    });

    console.log("Opened page id: " + aPage.PAGE_ID);

}