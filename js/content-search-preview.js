
var searchPreviewContent = {}

searchPreviewContent.box = {}
searchPreviewContent.title = ""
searchPreviewContent.description = ""
searchPreviewContent.imagePath = ""

searchPreviewContent.createIn = function(boxView) {

    searchPreviewContent.box = boxView

    searchPreviewContent.box.color = "white"

    searchPreviewContent.box.lblTitle = createLabel(0, 80, global.CONTENT_WIDTH, "auto")
    that.text = searchPreviewContent.title
    that.fontSize = 30
    that.textAlign = "center"

    searchPreviewContent.box.lblDesc = createLabel(0, 114, global.CONTENT_WIDTH, "auto")
    that.text = searchPreviewContent.description
    that.fontSize = 18
    that.textColor = "gray"
    that.textAlign = "center"

    searchPreviewContent.box.imgLogo = createImage(0, 0, 160, 160)
    that.load(searchPreviewContent.imagePath)
    that.center()

    /*
    searchPreviewContent.box.btnClose = closeButton.create()
    that.onClick(function(self) {
        smallView.setVisible(0)
    })
    */

}

searchPreviewContent.open = function() {

    //smallView.setHeight(700)
    //smallView.setHeight(page.height - 200)
    smallView.createAndShowContent(searchPreviewContent)
    smallView.setVisible(1)
}