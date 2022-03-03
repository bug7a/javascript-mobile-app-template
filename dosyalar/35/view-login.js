
var viewLogin = {}

viewLogin.create = function() {

    // BOX: Kilit ekranı sayfası.
    viewLogin.me = createBox(0, 0, 600, page.height)
    that.border = 0
    // that.element.style.backgroundImage = "radial-gradient(steelblue, black)"
    that.element.style.backgroundImage = "radial-gradient(white, white, lightgray)"
    //that.center("left")

    // BOX: Giriş sayfasının içindeki beyaz kutu.
    viewLogin.me.b1 = createBox(0, 0, 500, 480)
    that.color = "transparent"
    that.border = 0
    that.round = 13
    that.center()

    // Giriş sayfası logo
    viewLogin.me.b1.imgLogo = createImage(0, 20, 100, 100)
    that.load("resimler/35/lock.png")
    that.opacity = 1
    that.center("left")

    // Giriş sayfası, kullanıcı adı metin kutusu
    viewLogin.me.b1.txtName = createTextBox(0, 200, 400)
    that.title = "Kullanıcı Adı:"
    that.text = "admin"
    that.color = "#f6f6f6"
    that.border = 0
    that.round = 8
    that.minimal = 1
    that.center("left")

    // Giriş sayfası, şifre metin kutusu
    viewLogin.me.b1.txtPass = createTextBox(0, 300, 400)
    that.title = "Şifre:"
    that.text = "1111"
    that.color = "#f6f6f6"
    that.border = 0
    that.round = 8
    that.minimal = 1
    that.center("left")
    // Metin kutusunun tipini, şifre girişi olarak değiştir.
    that.inputElement.setAttribute("type", "password")

    // Giriş sayfası, giriş düğmesi
    viewLogin.me.b1.btnLogin = createButton()
    that.text = "Giriş"
    that.width = 150
    that.fontSize = 24
    that.aline(viewLogin.me.b1.txtPass, "bottom", 40)
    that.right = 50
    that.round = 8
    that.color = "#3871E0"
    that.textColor = "white"
    that.minimal = 1
    that.onClick(function() {
        viewLogin.me.visible = 0
    })

    // Giriş sayfası, Beni hatırla kutusu
    viewLogin.me.b1.boxRemember = createBox()
    that.height = 40
    that.width = 65
    that.round = 30
    that.color = "lightgray"
    that.border = 0
    that.aline(viewLogin.me.b1.txtPass, "bottom", 45)

    // Giriş sayfası, Beni hatırla kutusu iç parçası
    viewLogin.me.b1.boxRemember.p1 = createBox(4, 4, 32, 32)
    that.round = 21
    that.color = "white"
    that.border = 0
    viewLogin.me.b1.boxRemember.onClick(function() {
        var _btn = viewLogin.me.b1.boxRemember.p1
        if(_btn.left == 4) {

            _btn.right = 4
            viewLogin.me.b1.boxRemember.color = "#3871E0"

        } else {

            _btn.left = 4
            viewLogin.me.b1.boxRemember.color = "lightgray"

        }
    })

    // Giriş sayfası, Beni hatırla metni
    viewLogin.me.b1.lblBoxRemember = createLabel()
    that.text = "Beni Hatırla"
    that.aline(viewLogin.me.b1.boxRemember, "right", 10)
    that.fontSize = 16
    that.top += 10

    viewLogin.open()

}

viewLogin.lock = function() {

    viewLogin.me.visible = 1

}

viewLogin.open = function() {

    viewLogin.me.visible = 0

}