/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

var myUIToggle = createUIToggle(left: float, top: float, width: number) : UIStepper
- Create a UIToggle object.
- UIToggle object extends Box object.

object.setValue(makeToggleOn: boolean) : void
- Set the value of the toggle.

object.getValue() : boolean
- Get the value of the toggle.

object.setActionColor(color: string) : void
- Set the color of the toggle action.

object.setBackgroundColor(color: string) : void
- Set the color of the object background.

object.onValueChange(func: function) : void
- Set the function that will be called when the toggle value is changed.

*/

var UIToggle = {}

var createUIToggle = function(left, top, width = 70) {

    // BOX: Object container box.
    var box = createBox(left, top, width, 40)
    that.round = 20
    that.color = "lightgray"
    that.border = 0
    that.setMotion("background-color 0.3s")
    
    // VARIABLES:
    box.value = 0
    box.actionColor = "#3871E0"
    box.backgroundColor = "lightgray"
    box.onValueChangeFunc = function() {}
    
    // METHODS:
    box.toggle = function() {
        if(box.value == 0) {
            box.value = 1
            box.btnAction.left = box.width - box.btnAction.width - 4
            box.color = box.actionColor
        
        } else {
            box.value = 0
            box.btnAction.left = 4
            box.color = box.backgroundColor
        }
        
        box.onValueChangeFunc(box)
    }
    
    box.setValue = function(value) {
        if (value != box.value) {
            box.toggle()
        }
    }
    
    box.getValue = function() {
        return box.value
    }
    
    box.setActionColor = function(color) {
        box.actionColor = color
        if (box.value == 1) {
            box.color = color
        }
    }
    
    box.setBackgroundColor = function(color) {
        box.backgroundColor = color
        if (box.value == 0) {
            box.color = color
        }
    }
    
    box.onValueChange = function(func) {
        box.onValueChangeFunc = func
    }

    // BOX: Action button.
    box.btnAction = createBox(4, 4, 32, 32)
    that.round = 16
    that.color = "white"
    that.border = 0
    that.setMotion("left 0.3s")

    box.onClick(box.toggle)

    makeBasicObject(box)
    return box
}