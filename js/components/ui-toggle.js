/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

createUIToggle(left: float, top: float, width: number) : UIToggle
- Create a UIToggle object.
- UIToggle object extends Box object.

object.setValue(makeToggleOn: boolean) : void
- Set the value of the toggle.

object.getValue() : boolean
- Get the value of the toggle.

object.setColorOn(color: string) : void
- Set the color of the toggle action.

object.setColorOff(color: string) : void
- Set the color of the object background.

object.onChange(func: function) : void
- Set the function that will be called when the toggle value is changed.
- Example:
object.onChange(function(self) {
    print(self.getValue())
})

*/

var UIToggle = {}

// SHARED VARIABLES:
UIToggle.textVariable = ""

var createUIToggle = function(left = 0, top = 0, width = 70) {

    // *** PRIVATE VARIABLES:
    var value = 0
    var colorOn = "#3871E0"
    var colorOff = "lightgray"
    var onChangeFunc = function() {}

    // *** OBJECT MODEL:
    // BOX: Object container box.
    var box = createBox(left, top, width, 40)
    that.round = 20
    that.color = "lightgray"
    that.border = 0
    that.setMotion("background-color 0.3s")

    // BOX: Action button.
    box.btnAction = createBox(4, 4, 32, 32)
    box.add(that)
    that.round = 16
    that.color = "white"
    that.border = 0
    that.setMotion("left 0.3s")
    
    // *** PUBLIC VARIABLES:
    box.testVariable = ""
    
    // *** PUBLIC METHODS:
    box.toggle = function() {
        if(value == 0) {
            value = 1
            box.btnAction.left = box.width - box.btnAction.width - 4
            box.color = colorOn
        
        } else {
            value = 0
            box.btnAction.left = 4
            box.color = colorOff
        }
    }
    
    box.setValue = function(val) {
        if (value != val) {
            box.toggle()   
        }
        onChangeFunc(box)
    }
    
    box.getValue = function() {
        return value
    }
    
    box.setColorOn = function(color) {
        colorOn = color
        if (value == 1) {
            box.color = color
        }
    }
    
    box.setColorOff = function(color) {
        colorOff = color
        if (value == 0) {
            box.color = color
        }
    }
    
    box.onChange = function(func) {
        onChangeFunc = func
    }

    // *** CODE:
    box.onClick(function(self, event) {
        event.stopPropagation()
        self.toggle()
        onChangeFunc(box)
    })

    makeBasicObject(box)
    return box
}

// SHARED METHODS:
UIToggle.testFunction = function() {
	return "test"
}