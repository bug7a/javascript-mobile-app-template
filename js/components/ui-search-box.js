/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 15 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

createUISearchBox(left: float, top: float, width: number) : UISearchBox
- Create a search box.
- UISearchBox extends the Box object.

object.onSearch(func: function) : void
- Call this function when textbox text changes.
- Return parameters: self: UISearchBox, searchText: string
- Example:
    object.onSearch(function(self, searchText) {
        print(searchText)
    })

object.setWidth(width: number)
- Change the width of the search box

object.setPlaceholderText(text: string)
- Change the placeholder text of the search box

object.setText(text: string)
- Change the text of the search box.

object.getText() : string
- Get the text of the search box.

object.color = "white"
- Change color of search box


*/

var UISearchBox = {}

var createUISearchBox = function(left = 0, top = 0, width = 300) {

    // *** PRIVATE VARIABLES:
    var onSearchFunc = function() {}

    // *** OBJECT MODEL:
    // BOX: Search box
    var box = createBox(left, top, width, 50)
    that.color = "whitesmoke"
    that.round = 13
    //that.border = 0
    //that.borderColor = "gray"
    that.element.style.borderBottom = "2px solid rgba(0, 0, 0, 0.06)"

    // IMAGE: Search icon
    box.imgIcon = createImage(5, 0, 50, 50)
    box.add(that)
    that.load("js/components/ui-search-box/search.svg")
    that.opacity = 0.4
    that.space = 12

    // TEXTBOX: Search textbox
    box.txtSearch = createTextBox(45, 0)
    box.add(that)
    that.width = box.width - 80
    that.border = 0
    that.minimal = 1
    that.textColor = "gray"
    that.color = "transparent"
    that.inputElement.setAttribute("placeholder", "Search")

    // *** PUBLIC METHODS:
    box.onResize = function(self) {
        self.txtSearch.width = self.width - 80
    }

    box.onSearch = function(func) {
        onSearchFunc = func
    }

    box.setWidth = function(width) {
        box.width = width
    }

    box.setText = function(text) {
        box.txtSearch.text = text
    }

    box.getText = function() {
        return box.txtSearch.text
    }

    box.setPlaceholderText = function(text) {
        box.txtSearch.inputElement.setAttribute("placeholder", text)
    }

    box.txtSearch.inputElement.addEventListener("keyup", function() {
        onSearchFunc(box, box.txtSearch.text.toLowerCase())
    })

    makeBasicObject(box)
    return box
}

