// Tam sayfa uygulamaların üzerinde yuvarlak border içinde geri dönme butonu.

var closeButton = {}

closeButton.onClickFunc_btnBack = function() {}

closeButton.create = function() {

    closeButton.btnBack = createImage(20, 30, 40, 40)
    that.load("resimler/35/close-button.svg")
    that.right = 30
    that.border = 2
    that.borderColor = "lightgray"
    that.round = closeButton.btnBack.width
    that.space = 4
    that.onClick(function() {
        closeButton.onClickFunc_btnBack()
    })

    makeBasicObject(that)

    return closeButton.btnBack

}

closeButton.setVisible = function(visible) {
    closeButton.btnBack.visible = visible
}