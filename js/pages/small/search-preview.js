
var searchPreviewPage = {}
searchPreviewPage.ID = "search-preview"

searchPreviewPage.titleText = ""
searchPreviewPage.descriptionText = ""
searchPreviewPage.iconPath = ""


searchPreviewPage.createInSmallViewAndShow = function() {

    smallView.removeOpenedPageInView()

    var box = smallView.getContainerBox()
    // Out of this function, use "searchPreviewPage.box" for "box".
    searchPreviewPage.box = box

    box.color = "white"

    box.lblTitle = createLabel(0, 80, global.USED_WIDTH, "auto")
    box.add(that)
    that.text = searchPreviewPage.titleText
    that.fontSize = 30
    that.textAlign = "center"

    box.lblDesc = createLabel(0, 114, global.USED_WIDTH, "auto")
    box.add(that)
    that.text = searchPreviewPage.descriptionText
    that.fontSize = 18
    that.textColor = "gray"
    that.textAlign = "center"

    box.imgLogo = createImage(0, 0, 160, 160)
    box.add(that)
    that.load(searchPreviewPage.iconPath)
    that.center()

    smallView.setVisible(1)
}