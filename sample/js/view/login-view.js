
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


const loginView = {}

loginView.create = function() {

    // BOX: Content container box.
    loginView.box = createBox(0, 0, app.usedWidth, getDefaultContainerBox().height);
    that.border = 0;
    that.element.style.backgroundImage = "radial-gradient(white, white, lightgray)";
    //that.center("left");
    that.setMotion("opacity 0.3s, transform 0.5s");

    // BOX: Form background box.
    loginView.box.b1 = createBox(0, 0, 500, 480);
    loginView.box.add(that);
    that.color = "white";
    //that.color = "rgba(0, 0, 0, 0.01)";
    that.border = 0;
    that.borderColor = "rgba(0, 0, 0, 0.05)";
    that.element.style.boxShadow = "0px 0px 30px rgba(0, 0, 0, 0.1)";
    that.round = 13;
    that.center();

    // IMAGE: Logo image.
    loginView.box.b1.imgLogo = createImage(0, 50, 60, 60)
    loginView.box.b1.add(that)
    that.load("assets/login-view/lock.png")
    that.opacity = 1
    that.center("left")

    // TEXTBOX: User.
    loginView.box.b1.txtName = createTextBox(0, 200, 400)
    loginView.box.b1.add(that)
    that.title = "User Name:"
    //that.titleElement.style.fontSize = "24px";
    //that.titleElement.style.top = "-40px";
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
    //that.titleElement.style.fontSize = "24px";
    //that.titleElement.style.top = "-40px";
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
    that.color = "#5ABB9F"; //"#3871E0"
    //that.textColor = "white";
    that.minimal = 0
    that.onClick(function() {
        loginView.box.visible = 0
    });

    // UI TOGGLE: Remember me.
    UIToggle.resetDefault();
    UIToggle.default.backgroundOnColor = "#5ABB9F";
    loginView.box.b1.rememberUIToggle = UIToggle.create();
    loginView.box.b1.add(that);
    that.setValue(1);
    that.aline(loginView.box.b1.txtPass, "bottom", 45);

    // LABEL: Remember me text.
    loginView.box.b1.lblBoxRemember = createLabel()
    loginView.box.b1.add(that)
    that.text = "Remember me"
    that.aline(loginView.box.b1.rememberUIToggle, "right", 10, "center");
    that.fontSize = 16
    //that.top += 8

    loginView.hide()
}

loginView.show = function() {
    loginView.box.visible = 1

}

loginView.hide = function() {
    loginView.box.visible = 0

}