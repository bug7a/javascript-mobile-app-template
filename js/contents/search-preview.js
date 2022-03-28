
var searchPreviewContent = {}

searchPreviewContent.title = ""
searchPreviewContent.description = ""
searchPreviewContent.imagePath = ""

searchPreviewContent.createIn = function(box) {

    searchPreviewContent.box = box

    box.color = "white"

    box.lblTitle = createLabel(0, 80, global.CONTENT_WIDTH, "auto")
    box.add(that)
    that.text = searchPreviewContent.title
    that.fontSize = 30
    that.textAlign = "center"

    box.lblDesc = createLabel(0, 114, global.CONTENT_WIDTH, "auto")
    box.add(that)
    that.text = searchPreviewContent.description
    that.fontSize = 18
    that.textColor = "gray"
    that.textAlign = "center"

    box.imgLogo = createImage(0, 0, 160, 160)
    box.add(that)
    that.load(searchPreviewContent.imagePath)
    that.center()

    /*
    box.btnClose = closeButton.create()
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