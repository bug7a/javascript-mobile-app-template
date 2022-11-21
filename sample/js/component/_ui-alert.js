/* Bismillah */

/*

UI COMPONENT TEMPLATE:

Started Date: 14 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HOW TO USE:

dialog.show({
    title: "",
    message: "",
    actionButtonText: "DELETE",
    cancelButtonText: "CANCEL",
    onClick: function(buttonId) {
        swtich(buttonId) {
            case "1":
                // action.
                break;
            case "2":
                // cancel.
                break;
        }
    },
})

dialog.show({
    titleText: "",
    messageText: "",
    actionButtonText: "DELETE",
    actionButtonClicked: function() {},
    cancelButtonText: "CANCEL",

})

*/

// dialog
var UIAlert = {}

UIAlert.default = {}
UIAlert.actionButtonColor = "#63C9CF"

createUIAlert = function(titleText, descriptionText, buttonDataList) {

    // BOX: ui container.
    var ui = createBox(0, 0, getDefaultContainerBox().width, getDefaultContainerBox().height)
    that.color = "transparent"
    that.border = 0
    that.setMotion("opacity 0.3s")

    ui.default = {}
    ui.default.backgroundColor = UIAlert.actionButtonColor

    // BOX: Background.
    ui.boxBlack = createBox(0, 0, getDefaultContainerBox().width, getDefaultContainerBox().height)
    ui.add(that)
    that.border = 0
    that.color = "rgba(0, 0, 0, 0.85)"

    // BOX: Beyaz taşıyıcı.
    ui.window = createBox()
    ui.add(that)
    that.width = 450
    that.height = 240
    that.color = "white"
    that.border = 0
    that.round = 6
    that.element.style.boxShadow = "2px 3px 6px rgba(0, 0, 0, 0.6)"
    that.center()

    // LABEL: Başlık.
    ui.window.lblTitle = createLabel(0, 0)
    ui.window.add(that)
    that.textSize = 20
    that.text = ""
    that.width = ui.window.width
    that.color = "whitesmoke"
    that.textColor = "#141414"
    that.border = 0
    that.round = 6
    that.textAlign = "center"
    that.space = 12
    that.rotate = 0
    that.element.style.fontFamily = "opensans-bold"

    // LABEL: Açıklama.
    ui.window.lblDesc = createLabel()
    ui.window.add(that)
    that.text = ""
    that.top = 50
    that.space = 25
    that.width = ui.window.width

    // BUTTON: Onay butonu.
    ui.window.btnOkay = createButton()
    ui.window.add(that)
    that.text = ""
    that.color = ui.default.backgroundColor
    that.minimal = 0
    that.bottom = 10
    that.right = 10

    // BUTTON: İptal butonu.
    ui.window.btnCancel = createButton()
    ui.window.add(that)
    that.text = "İptal"
    that.textColor = "#4A4A4A"
    that.color = "transparent"
    that.minimal = 1
    that.border = 0
    that.aline(ui.window.btnOkay, "left", 6)

    // ALT DEĞİŞKENLER

    ui.okFunction = function() {}
    ui.cancelFunction = function() {}

    // ALT FONKSİYONLAR

    // Diyalog kutusunu göster.
    ui.show = function(title, description, buttonText) {
        ui.centerAgain()
        ui.window.lblTitle.text = title
        ui.window.lblDesc.text = description
        ui.window.btnOkay.text = buttonText

        ui.visible = 1

        setTimeout(function() {
            ui.opacity = 1
        }, 25)

    }

    // Diyalog kutusunu gizle.
    ui.hide = function() {

        ui.opacity = 0

        setTimeout(function() {
            //ui.visible = 0
            ui.remove()
        }, 300)

    }

    ui.okClicked = function() {
        ui.okFunction()
        ui.hide()

    }

    // İptal butonuna basıldığında.
    ui.cancelClicked = function() {
        ui.cancelFunction()
        ui.hide()
        
    }

    // Onay butonu için fonksiyon belirleme,
    ui.onOkay = function(func) {
        ui.okFunction = func

    }

    // İptal butonu için fonksiyon belirleme,
    ui.onCancel = function(func) {
        ui.cancelFunction = func

    }

    // Sayfa boyutuna göre yeniden düzenleme yap.
    ui.centerAgain = function() {

        ui.top = 0
        ui.left = 0
        ui.width = getDefaultContainerBox().width
        ui.height = getDefaultContainerBox().height

        ui.boxBlack.top = 0
        ui.boxBlack.left = 0
        ui.boxBlack.width = getDefaultContainerBox().width
        ui.boxBlack.height = getDefaultContainerBox().height

        ui.window.center()

    }

    // Butonları, nesne içindeki fonksiyonlara bağla.
    ui.window.btnOkay.onClick(ui.okClicked)
    ui.window.btnCancel.onClick(ui.cancelClicked)

    ui.visible = 0
    ui.opacity = 0

    ui.show(titleText, descriptionText, buttonDataList[0])

    makeBasicObject(ui)
    return ui

}