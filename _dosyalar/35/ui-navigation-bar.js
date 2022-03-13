
// NESNE: Üst başlık çubuğu
var navigationBar = {}

navigationBar.HEIGHT = 105
navigationBar.onClickFunc_btnBack = function() {}
navigationBar.onClickFunc_btnMenu = function() {}

navigationBar.create = function() {

    // BOX: Taşıyıcı kutu.
    navigationBar.box = createBox(0, 0, 600, navigationBar.HEIGHT)
    that.border = 0
    that.element.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.2)"

    // IMAGE: Üst başlık kutusu, geri dön düğmesi.
    navigationBar.box.btnBack = createImage(20, 30, 50, 50)
    that.load("resimler/35/ui-header/back.svg")
    that.space = 4
    that.onClick(function() {
        navigationBar.onClickFunc_btnBack()
    })

    // LABEL: Üst başlık kutusu, başlık metni.
    navigationBar.box.lblTitle = createLabel(0, 36, 400)
    that.textAlign = "center"
    that.fontSize = 28
    that.center("left")

    // IMAGE: Menu açma/kapatma düğmesi.
    navigationBar.box.btnMenu = createImage(0, 0, 50, 50)
    that.load("resimler/35/ui-header/menu6.svg")
    that.border = 0
    that.borderColor = "lightgray"
    that.space = 8
    that.round = 8
    that.right = 30
    that.top = 30
    that.onClick(function() {
            navigationBar.onClickFunc_btnMenu()
    })

    makeBasicObject(navigationBar.box)

    return navigationBar.box

}

navigationBar.setTitle = function(titleText) {

    navigationBar.box.lblTitle.text = titleText

}

navigationBar.setSubTitle = function(subTitleText) {

}

navigationBar.setVisible = function(visible) {

    navigationBar.box.visible = visible

}

navigationBar.setVisible_backButton = function(visible) {

    navigationBar.box.btnBack.visible = visible

}

navigationBar.setVisible_sideBarButton = function(visible) {
    navigationBar.box.btnSideBar.visible = visible
}

navigationBar.onClick_btnBack = function(func) {
    navigationBar.onClickFunc_btnBack = func
}

navigationBar.onClick_btnMenu = function(func) {
    navigationBar.onClickFunc_btnMenu = func
}