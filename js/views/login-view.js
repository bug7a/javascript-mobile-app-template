
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var loginView = {}

loginView.create = function() {

    // BOX: Content container box.
    loginView.box = createBox(0, 0, global.USED_WIDTH, page.height)
    that.border = 0
    // that.element.style.backgroundImage = "radial-gradient(steelblue, black)"
    that.element.style.backgroundImage = "radial-gradient(white, white, lightgray)"
    //that.center("left")
    that.setMotion("opacity 0.3s, transform 0.5s")

    // BOX: Form background box.
    loginView.box.b1 = createBox(0, 0, 500, 480)
    loginView.box.add(that)
    that.color = "transparent"
    that.border = 0
    that.round = 13
    that.center()

    // IMAGE: Logo image.
    loginView.box.b1.imgLogo = createImage(0, 20, 100, 100)
    loginView.box.b1.add(that)
    that.load("images/view-login/lock.png")
    that.opacity = 1
    that.center("left")

    // TEXTBOX: User.
    loginView.box.b1.txtName = createTextBox(0, 200, 400)
    loginView.box.b1.add(that)
    that.title = "User Name:"
    that.text = "admin"
    that.color = "#f6f6f6"
    that.border = 0
    that.round = 8
    that.minimal = 1
    that.center("left")

    // TEXTBOX: password.
    loginView.box.b1.txtPass = createTextBox(0, 300, 400)
    loginView.box.b1.add(that)
    that.title = "Password:"
    that.text = "1111"
    that.color = "#f6f6f6"
    that.border = 0
    that.round = 8
    that.minimal = 1
    that.center("left")
    // Metin kutusunun tipini, şifre girişi olarak değiştir.
    that.inputElement.setAttribute("type", "password")

    // BUTTON: log in.
    loginView.box.b1.btnLogin = createButton()
    loginView.box.b1.add(that)
    that.text = "Log in"
    that.width = 150
    that.fontSize = 24
    that.aline(loginView.box.b1.txtPass, "bottom", 40)
    that.right = 50
    that.round = 4
    that.color = "#3871E0"
    that.textColor = "white"
    that.minimal = 1
    that.onClick(function() {
        loginView.box.visible = 0
    })

    // UI TOGGLE: Remember me.
    loginView.box.b1.boxRemember = createUIToggle(10, 10)
    loginView.box.b1.add(that)
    that.aline(loginView.box.b1.txtPass, "bottom", 45)

    // LABEL: Remember me text.
    loginView.box.b1.lblBoxRemember = createLabel()
    loginView.box.b1.add(that)
    that.text = "Remember me"
    that.aline(loginView.box.b1.boxRemember, "right", 10)
    that.fontSize = 16
    that.top += 8

    loginView.hide()
}

loginView.show = function() {
    loginView.box.visible = 1

}

loginView.hide = function() {
    loginView.box.visible = 0

}