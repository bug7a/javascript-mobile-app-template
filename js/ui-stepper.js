
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

var myUIStepper = createUIStepper(left: float, top: float, width: number) : UIStepper
- Create a stepper object.
- UIStepper object extends Box object.

object.setNumber(number: integer) : void
- Set the number of the stepper.

object.getNumber() : number
- Get the number of the stepper.

object.setWidth(width: number) : void
- Set the width of the stepper.

object.setMinimumRangeNumber(number: integer) : void
- Set the minimum number of the stepper.

object.getMinimumRangeNumber() : number
- Get the minimum number of the stepper.

object.setMaximumRangeNumber(number: integer) : void
- Set the maximum number of the stepper.

object.getMaximumRangeNumber() : number
- Get the maximum number of the stepper.

object.onNumberChange(func: function) : void
- Set the function that will be called when the stepper value is changed.

*/

var UIStepper = {}

var createUIStepper = function(left = 0, top = 0, width = 130) {

	var DEFAULT_HEIGHT = 45
	
	// BOX: Object container box.
	var box = createBox(left, top, width, DEFAULT_HEIGHT)
	that.border = 0
	//that.round = 13
	that.round = DEFAULT_HEIGHT
	that.color = "transparent"
	//that.color = "rgba(0, 0, 0, 0.08)"
	
	// VARIABLES:
	box.minimumNumber = 1
	box.maximumNumber = 10
	box.defaultRangeNumber = 1
	box.onNumberChangeFunc = function() {}
	
	// METODS:
	box._increaseNumber = function(self, event) {
		event.stopPropagation()
		if (num(box.lblNumber.text) != box.maximumNumber) {
			box.setNumber(num(box.lblNumber.text) + 1)
			box.refreshButtonsOpacity()
		}
	}
	
	box._decreaseNumber = function(self, event) {
		event.stopPropagation()
		if (num(box.lblNumber.text) != box.minimumNumber) {
			box.setNumber(num(box.lblNumber.text) - 1)
			box.refreshButtonsOpacity()
		}
	}
	
	box.refreshButtonsOpacity = function() {

		box.imgIncrease.opacity = 0.9
		box.imgDecrease.opacity = 0.9
		box.imgIncrease.element.style.cursor = "pointer"
		box.imgDecrease.element.style.cursor = "pointer"

		if (num(box.lblNumber.text) == box.maximumNumber) {
			box.imgIncrease.opacity = 0.4
			box.imgIncrease.element.style.cursor = "default"
		}

		if (num(box.lblNumber.text) == box.minimumNumber) {
			box.imgDecrease.opacity = 0.4
			box.imgDecrease.element.style.cursor = "default"
		}
	}
	
	box.setMinimumRangeNumber = function(number) {
		box.minimumNumber = number
		if (num(box.lblNumber.text) < number) {
			box.setNumber(number)
		}
		box.refreshButtonsOpacity()
	}

	box.getMinimumRangeNumber = function() {
		return box.minimumNumber
	}
	
	box.setMaximumRangeNumber = function(number) {
		box.maximumNumber = number
		if (num(box.lblNumber.text) > number) {
			box.setNumber(number)
		}
		box.refreshButtonsOpacity()
	}

	box.getMaximumRangeNumber = function() {
		return box.maximumNumber
	}
	
	box.setWidth = function(width) {
		box.width = width
		box.lblNumber.width = width
	}

	box.getWidth = function() {
		return box.width
	}
	
	box.setNumber = function(number) {
		if (number < box.minimumNumber) {
			number = box.minimumNumber
			print("UIStepper: setNumber() number is changed because too small.")
		}
		if (number > box.maximumNumber) {
			number = box.maximumNumber
			print("UIStepper: setNumber() number is changed because too big.")
		}
		box.lblNumber.text = str(number)
		box.refreshButtonsOpacity()
		box.onNumberChangeFunc(box)
	}
	
	box.getNumber = function() {
		return num(box.lblNumber.text)
	}

	box.onNumberChange = function(func) {
		box.onNumberChangeFunc = func
	}

	// LABEL: Decrease button. (-)
	box.imgDecrease = createImage(2, 2, DEFAULT_HEIGHT - 4, DEFAULT_HEIGHT - 4)
	//box.imgDecrease = createImage(0, 0, DEFAULT_HEIGHT, DEFAULT_HEIGHT)
	that.load("js/ui-stepper/decrease.svg")
	that.border = 0
	that.borderColor = "#141414"
	that.color = "rgba(0, 0, 0, 0.2)"
	//that.round = 13
	that.round = DEFAULT_HEIGHT
	that.element.style.cursor = "pointer"
	box.imgDecrease.onClick(box._decreaseNumber)
	
	// LABEL: Number text.
	box.lblNumber = createLabel(0, 6)
	that.fontSize = 22
	that.textAlign = "center"
	that.textColor = "rgba(0, 0, 0, 0.8)"
	that.width = box.width
	that.height = 30
	that.color = "transparent"
	that.element.style.fontFamily = "opensans-bold"
	
	// LABEL: Increase button. (+)
	box.imgIncrease = createImage(2, 2, DEFAULT_HEIGHT - 4, DEFAULT_HEIGHT - 4)
	that.right = 2
	//box.imgIncrease = createImage(0, 0, DEFAULT_HEIGHT, DEFAULT_HEIGHT)
	//that.right = 0
	that.load("js/ui-stepper/increase.svg")
	that.border = 0
	that.borderColor = "#141414"
	that.color = "rgba(0, 0, 0, 0.2)"
	//that.round = 13
	that.round = DEFAULT_HEIGHT
	that.element.style.cursor = "pointer"
	box.imgIncrease.onClick(box._increaseNumber)
	
	box.setNumber(box.defaultRangeNumber)
	box.refreshButtonsOpacity()
	
	makeBasicObject(box)
	return box
}

