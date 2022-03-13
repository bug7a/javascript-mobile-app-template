// Tam sayfa uygulamaların üzerinde yuvarlak border içinde geri dönme butonu.

var closeButton = {}

closeButton.onClickFunc_btnBack = function() {}

closeButton.create = function() {

    closeButton.btnBack = createImage(20, 30, 40, 40)
    that.load("images/close-button.svg")
    that.right = 30
    that.border = 0
    that.color = "white"
    that.borderColor = "lightgray"
    that.round = closeButton.btnBack.width
    that.space = 4
    that.opacity = 0.5
    that.onClick(function() {
        closeButton.onClickFunc_btnBack()
    })

    makeBasicObject(that)

    return closeButton.btnBack

}

closeButton.setVisible = function(visible) {
    closeButton.btnBack.visible = visible
}