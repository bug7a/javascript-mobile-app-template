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

object.setColorOn(color: string) : void
- Set the color of the toggle action.

object.setColorOff(color: string) : void
- Set the color of the object background.

object.onChange(func: function) : void
- Set the function that will be called when the toggle value is changed.

*/

var UIToggle = {}

var createUIToggle = function(left = 0, top = 0, width = 70) {

    // BOX: Object container box.
    var box = createBox(left, top, width, 40)
    that.round = 20
    that.color = "lightgray"
    that.border = 0
    that.setMotion("background-color 0.3s")
    
    // VARIABLES:
    box.value = 0
    box.colorForOn = "#3871E0"
    box.colorForOff = "lightgray"
    box.onChangeFunc = function() {}
    
    // METHODS:
    box.toggle = function() {
        if(box.value == 0) {
            box.value = 1
            box.btnAction.left = box.width - box.btnAction.width - 4
            box.color = box.colorForOn
        
        } else {
            box.value = 0
            box.btnAction.left = 4
            box.color = box.colorForOff
        }
        
        box.onChangeFunc(box)
    }
    
    box.setValue = function(value) {
        if (value != box.value) {
            box.toggle()
        }
    }
    
    box.getValue = function() {
        return box.value
    }
    
    box.setColorOn = function(color) {
        box.colorForOn = color
        if (box.value == 1) {
            box.color = color
        }
    }
    
    box.setColorOff = function(color) {
        box.colorForOff = color
        if (box.value == 0) {
            box.color = color
        }
    }
    
    box.onChange = function(func) {
        box.onChangeFunc = func
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