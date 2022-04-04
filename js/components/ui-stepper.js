/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

createUIStepper(left: float, top: float, width: number) : UIStepper
- Create a stepper object.
- UIStepper object extends Box object.

object.setValue(number: integer) : void
- Set the number of the stepper.

object.getValue() : number
- Get the number of the stepper.

object.setWidth(width: number) : void
- Set the width of the stepper.

object.setMinNumber(number: integer) : void
- Set the minimum number of the stepper.

object.getMinNumber() : number
- Get the minimum number of the stepper.

object.setMaxNumber(number: integer) : void
- Set the maximum number of the stepper.

object.getMaxNumber() : number
- Get the maximum number of the stepper.

object.onChange(func: function) : void
- Set the function that will be called when the stepper value is changed.
- Example:
object.onChange(function(self) {
    print(self.getValue())
})

*/

var UIStepper = {}

// SHARED VARIABLES:
UIStepper.textVariable = ""

var createUIStepper = function(left = 0, top = 0, width = 130) {

	// *** PRIVATE VARIABLES:
	var minimumNumber = 1
	var maximumNumber = 10
	var defaultNumber = 1
	var onChangeFunc = function() {}
	
	// *** OBJECT MODEL:
	// BOX: Object container box.
	var box = createBox(left, top, width, 45)
	that.border = 0
	//that.round = 13
	that.round = 23
	that.color = "transparent"
	//that.color = "rgba(0, 0, 0, 0.08)"

	// LABEL: Decrease button. (-)
	box.imgDecrease = createImage(2, 2, 41, 41)
	box.add(that)
	//box.imgDecrease = createImage(0, 0, 45, 45)
	that.load("js/components/ui-stepper/decrease.svg")
	that.border = 0
	that.borderColor = "#141414"
	that.color = "rgba(0, 0, 0, 0.2)"
	//that.round = 13
	that.round = 23
	that.space = 0
	that.element.style.cursor = "pointer"
	
	// LABEL: Number text.
	box.lblNumber = createLabel(0, 6)
	box.add(that)
	that.fontSize = 22
	that.textAlign = "center"
	that.textColor = "rgba(0, 0, 0, 0.8)"
	that.width = box.width
	that.height = 30
	that.color = "transparent"
	//that.element.style.fontFamily = "opensans-bold"
	
	// LABEL: Increase button. (+)
	box.imgIncrease = createImage(2, 2, 41, 41)
	box.add(that)
	that.right = 2
	//box.imgIncrease = createImage(0, 0, 45, 45)
	//that.right = 0
	that.load("js/components/ui-stepper/increase.svg")
	that.border = 0
	that.borderColor = "#141414"
	that.color = "rgba(0, 0, 0, 0.2)"
	//that.round = 13
	that.round = 23
	that.space = 0
	that.element.style.cursor = "pointer"
	
	// *** PUBLIC VARIABLES:
	box.testVariable = ""
	
	// *** PRIVATE METHODS:
	var increaseNumber = function(self, event) {
		event.stopPropagation()
		if (num(box.lblNumber.text) != maximumNumber) {
			box.setValue(num(box.lblNumber.text) + 1)
			box.refreshButtonsOpacity()
		}
	}
	
	var decreaseNumber = function(self, event) {
		event.stopPropagation()
		if (num(box.lblNumber.text) != minimumNumber) {
			box.setValue(num(box.lblNumber.text) - 1)
			box.refreshButtonsOpacity()
		}
	}
	
	// *** PUBLIC METHODS:
	box.refreshButtonsOpacity = function() {

		box.imgIncrease.opacity = 0.9
		box.imgDecrease.opacity = 0.9
		box.imgIncrease.element.style.cursor = "pointer"
		box.imgDecrease.element.style.cursor = "pointer"

		if (num(box.lblNumber.text) == maximumNumber) {
			box.imgIncrease.opacity = 0.4
			box.imgIncrease.element.style.cursor = "default"
		}

		if (num(box.lblNumber.text) == minimumNumber) {
			box.imgDecrease.opacity = 0.4
			box.imgDecrease.element.style.cursor = "default"
		}
	}
	
	box.setMinNumber = function(number) {
		minimumNumber = number
		if (num(box.lblNumber.text) < number) {
			box.setValue(number)
		}
		box.refreshButtonsOpacity()
	}

	box.getMinNumber = function() {
		return minimumNumber
	}
	
	box.setMaxNumber = function(number) {
		maximumNumber = number
		if (num(box.lblNumber.text) > number) {
			box.setValue(number)
		}
		box.refreshButtonsOpacity()
	}

	box.getMaxNumber = function() {
		return maximumNumber
	}
	
	box.setWidth = function(width) {
		box.width = width
		box.lblNumber.width = width
	}

	box.getWidth = function() {
		return box.width
	}
	
	box.setValue = function(number) {
		if (number < minimumNumber) {
			number = minimumNumber
			print("UIStepper: setValue() number is changed because too small.")
		}
		if (number > maximumNumber) {
			number = maximumNumber
			print("UIStepper: setValue() number is changed because too big.")
		}
		box.lblNumber.text = str(number)
		box.refreshButtonsOpacity()
		onChangeFunc(box)
	}
	
	box.getValue = function() {
		return num(box.lblNumber.text)
	}

	box.onChange = function(func) {
		onChangeFunc = func
	}

	// *** CODE:
	box.imgDecrease.onClick(decreaseNumber)
	box.imgIncrease.onClick(increaseNumber)
	box.setValue(defaultNumber)
	box.refreshButtonsOpacity()
	
	makeBasicObject(box)
	return box
}

// SHARED METHODS:
UIStepper.testFunction = function() {
	return "test"
}