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

    // BOX: Content container box.
    defaultView.box = createBox(0, 
        0, 
        global.CONTENT_WIDTH, 
        page.height
    )

    defaultView.clean()
}

defaultView.clean = function() {

    defaultView.box.text = ""
    defaultView.box.color = "whitesmoke"
    defaultView.box.border = 0
    defaultView.box.scrollX = 0
    defaultView.box.scrollY = 1
}

defaultView.createAndShowContent = function(content) {

    if (typeof content.createIn === "function") {
        defaultView.clean()
        content.createIn(defaultView.box)

    } else {
        print("defaultView: content must have .createIn() function")
    }
}

defaultView.setTopAndBottom = function(topSpace, bottomSpace) {
    defaultView.box.top = topSpace
    defaultView.box.height = page.height - topSpace - bottomSpace
}