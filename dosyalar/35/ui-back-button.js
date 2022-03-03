// Tam sayfa uygulamaların üzerinde yuvarlak border içinde geri dönme butonu.

var backButton = {}

backButton.onClickFunc_btnBack = function() {}

backButton.create = function() {

    backButton.btnBack = createImage(30, 30, 50, 50)
    that.load("resimler/35/back-button.svg")
    that.border = 2
    that.borderColor = "lightgray"
    that.round = backButton.btnBack.width
    that.space = 4
    that.onClick(function() {
        backButton.onClickFunc_btnBack()
    })

    makeBasicObject(that)

    return backButton.btnBack

}

backButton.setVisible = function(visible) {
    backButton.btnBack.visible = visible
}