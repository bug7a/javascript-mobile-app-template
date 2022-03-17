/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 15 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

var mynameUISearchBox = createUISearchBox()

*/

var UISearchBox = {}

var createUISearchBox = function(x = 0, y = 0, width = 300) {

    // BOX: Search box
    var box = createBox(x, y, width, 50)
    that.color = "whitesmoke"
    that.round = 25
    that.border = 0

    // VARIABLES:
    box.onCharChangeFunc = function() {}

    // IMAGE: Search icon
    box.imgIcon = createImage(5, 0, 50, 50)
    that.load("images/ui-search-box/search.svg")
    that.opacity = 0.5
    that.space = 15

    // TEXTBOX: Search textbox
    box.txtSearch = createTextBox(45, 0)
    that.width = box.width - 80
    that.border = 0
    that.minimal = 1
    that.textColor = "gray"
    that.color = "whitesmoke"
    that.inputElement.setAttribute("placeholder", "Search")

    box.onResize = function(self) {
        self.txtSearch.width = self.width - 80
    }

    /*
    box.connectWith = function(uiItemList) {
        box.connectedUIItemList = uiItemList
    }
    */
    box.onCharChange = function(func) {
        box.onCharChangeFunc = func
    }

    // setPlaceholder
    box.setSearchText = function(text) {
        box.inputElement.setAttribute("placeholder", text)
    }

    box.txtSearch.inputElement.addEventListener("keyup", function() {

        box.onCharChangeFunc(box.txtSearch.text.toLowerCase())

        //if(box.connectedUIItemList) {
        //    box.connectedUIItemList.searchItem(box.txtSearch.text.toLowerCase())
        //}
    })

    makeBasicObject(box)
    return box
}

