
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/


var secondView = {}

secondView.create = function() {

    // BOX: Container box.
    secondView.box = createBox(0, 
        0, 
        global.CONTENT_WIDTH, 
        page.height
    )
    
    secondView.clean()
    secondView.setVisible(0)
}

secondView.clean = function() {

    secondView.box.text = ""
    secondView.box.color = "whitesmoke"
    secondView.box.border = 0
    secondView.box.scrollX = 0
    secondView.box.scrollY = 0
}

secondView.setVisible = function(visible) {

    secondView.box.visible = visible
}

secondView.createAndShowContent = function(content) {

    secondView.clean()
    content.createIn(secondView.box)

    secondView.setVisible(1)
}