/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

var defaultView = {}

defaultView.create = function() {

    // BOX: Normal içerik taşıyıcısı
    defaultView.box = createBox(0, 
        0, 
        global.CONTENT_WIDTH, 
        page.height
    )
    that.setMotion("height 0.3s, top 0.3s, opacity 0.3s, transform 0.3s")

    defaultView.clean()

}

defaultView.clean = function() {

    defaultView.box.text = ""
    defaultView.box.color = "whitesmoke"
    defaultView.box.border = 0
    defaultView.box.scrollX = 0
    defaultView.box.scrollY = 1

}

defaultView.setVisible = function(visible) {
    defaultView.box.visible = visible
}

defaultView.getVisible = function() {
    return defaultView.box.visible
}

defaultView.createAndShowContent = function(content) {

    if (typeof content.createIn === "function") {

        defaultView.clean()
        // Give some time for motion
        //setTimeout(function() {
        content.createIn(defaultView.box)
        //}, 100)

        defaultView.box.dontMotion()
        defaultView.box.element.style.transform = "scale(1.4)"
        defaultView.box.opacity = 0.1
        defaultView.box.withMotion(function(self) {
            self.element.style.transform = "scale(1)"
            self.opacity = 1
        })

    } else {
        print("defaultView: content must have .createIn() function")
    }
}

defaultView.loadContentFromURL = function(url) {

}

defaultView.setTopAndBottomSpaces = function(topSpace, bottomSpace) {
    defaultView.box.top = topSpace
    defaultView.box.height = page.height - topSpace - bottomSpace
}