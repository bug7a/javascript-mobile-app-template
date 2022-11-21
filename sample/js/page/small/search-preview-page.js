
const searchPreviewPage = {};
searchPreviewPage.PAGE_ID = "searchPreviewPage";

// Parameters:
searchPreviewPage.titleText = "";
searchPreviewPage.descriptionText = "";
searchPreviewPage.iconFile = "";

searchPreviewPage.openInSmallView = function() {

    smallView.clear();

    // BOX: Page container.
    const box = smallView.getContainerBox();
    searchPreviewPage.box = box;

    box.color = "white";
    box.height = 500;

    // LABEL: title.
    box.lblTitle = createLabel(0, 80, box.width, "auto");
    box.add(that);
    that.text = searchPreviewPage.titleText;
    that.fontSize = 30;
    that.textAlign = "center";

    // LABEL: description.
    box.lblDesc = createLabel(0, 114, box.width, "auto");
    box.add(that);
    that.text = searchPreviewPage.descriptionText;
    that.fontSize = 18;
    that.textColor = "gray";
    that.textAlign = "center";

    // IMAGE: icon.
    box.imgIcon = createImage(0, 0, 160, 160);
    box.add(that);
    that.load(searchPreviewPage.iconFile);
    that.center();

    smallView.setVisible(1);

}