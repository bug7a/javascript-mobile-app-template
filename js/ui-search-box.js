/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 15 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

var myUISearchBox = createUISearchBox(x: float, y: float, width: number) : UISearchBox
- Create a search box.

object.onCharChange(func: function) : void
- Call this function when textbox text changes.

object.setWidth(width: number)
- Change the width of the search box

object.setPlaceholderText(text: string)
- Change the placeholder text of the search box

object.txtSearch.text = "text"
- Change text of textbox

object.color = "white"
- Change color of search box

*/

var UISearchBox = {}

var createUISearchBox = function(x = 0, y = 0, width = 300) {

    // BOX: Search box
    var box = createBox(x, y, width, 50)
    that.color = "whitesmoke"
    that.round = 13
    //that.border = 0
    //that.borderColor = "gray"
    that.element.style.borderBottom = "2px solid rgba(0, 0, 0, 0.06)"

    // VARIABLES:
    box.onCharChangeFunc = function() {}

    // IMAGE: Search icon
    box.imgIcon = createImage(5, 0, 50, 50)
    that.load("images/ui-search-box/search.svg")
    that.opacity = 0.4
    that.space = 12

    // TEXTBOX: Search textbox
    box.txtSearch = createTextBox(45, 0)
    that.width = box.width - 80
    that.border = 0
    that.minimal = 1
    that.textColor = "gray"
    that.color = "transparent"
    that.inputElement.setAttribute("placeholder", "Search")

    box.onResize = function(self) {
        self.txtSearch.width = self.width - 80
    }

    box.onCharChange = function(func) {
        box.onCharChangeFunc = func
    }

    box.setWidth = function(width) {
        box.width = width
    }

    box.setPlaceholderText = function(text) {
        box.txtSearch.inputElement.setAttribute("placeholder", text)
    }

    box.txtSearch.inputElement.addEventListener("keyup", function() {
        box.onCharChangeFunc(box.txtSearch.text.toLowerCase())
    })

    makeBasicObject(box)
    return box
}

