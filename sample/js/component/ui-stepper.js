/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-stepper.htm


HANDBOOK:

UIStepper.create() : UIStepper
- Create a stepper object.
- UIStepper object extends Box object.

object.setValue(number: integer) : void
- Set the number of the stepper.

object.getValue() : Integer
- Get the number of the stepper.

object.setMinimumNumber(number: Integer) : void
- Set the minimum number of the stepper.

object.getMinimumNumber() : Integer
- Get the minimum number of the stepper.

object.setMaximumNumber(number: Integer) : void
- Set the maximum number of the stepper.

object.getMaximumNumber() : Integer
- Get the maximum number of the stepper.

object.onChange(func: function) : Void
- Set the function that will be called when the stepper value is changed.

- Example:
object.onChange(function(self) {
    print(self.getValue());
});

*/

"use strict";
const UIStepper = {};

// SHARED VARIABLES:
UIStepper.sharedVariable = "sharedVariable";
UIStepper.default = {};
UIStepper.resetDefault = function() {

	UIStepper.default.value = 1;
	UIStepper.default.minimumNumber = 1;
	UIStepper.default.maximumNumber = 10;

    UIStepper.default.width = 150;
    UIStepper.default.height = 50;

    UIStepper.default.backgroundColor = "transparent";
    UIStepper.default.backgroundBorder = 0;
    UIStepper.default.backgroundBorderColor = "rgba(0, 0, 0, 0.1)";
    UIStepper.default.backgroundRound = 23;

    UIStepper.default.buttonWidth = 42;
    UIStepper.default.buttonHeight = 42;
    UIStepper.default.buttonOuterSpace = 4;
    UIStepper.default.buttonColor = "white";
    UIStepper.default.buttonBorder = 1;
    UIStepper.default.buttonBorderColor = "rgba(0, 0, 0, 0.8)";
    UIStepper.default.buttonRound = 23;
    UIStepper.default.buttonRightShadow = "-1px 0px 3px rgba(0, 0, 0, 0.0)";
	UIStepper.default.buttonLeftShadow = "1px 0px 3px rgba(0, 0, 0, 0.0)";
	UIStepper.default.buttonOpacity = 0.9;
	UIStepper.default.buttonDisableOpacity = 0.4;

    UIStepper.default.iconWidth = 32;
    UIStepper.default.iconHeight = 32;
    UIStepper.default.iconFileDecrease = "js/component/ui-stepper/decrease.svg";
    UIStepper.default.iconFileIncrease = "js/component/ui-stepper/increase.svg";
    UIStepper.default.textColor = "rgba(0, 0, 0, 0.8)";
	UIStepper.default.fontSize = 22;

}
UIStepper.resetDefault();

UIStepper.create = function(parameters = {}) {

	// BOX: UI Object container.
	const box = createBox();

	// Default values.
	box.default = {};
	for (let parameterName in UIStepper.default) {
		box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UIStepper.default[parameterName];
	}
	
	// *** PRIVATE VARIABLES:
	let minimumNumber = box.default.minimumNumber;
	let maximumNumber = box.default.maximumNumber;
	let currentValue = box.default.value;
	let unitText = "";
	let onChangeFunc = function() {};

	// *** PUBLIC VARIABLES:
	box.publicVariable = "publicVariable";
	
	// *** OBJECT MODEL:
	box.border = 0;
	box.color = "transparent";
	box.width = box.default.width;
	box.height = box.default.height;

	// BOX: Background.
	box.boxBackground = createBox(0, 0, box.width, box.height);
	box.add(that);
	that.round = box.default.backgroundRound;
	that.color = box.default.backgroundColor;
	that.border = box.default.backgroundBorder;
	that.borderColor = box.default.backgroundBorderColor;

	// LABEL: Number text.
	box.lblNumber = createLabel(0, 0);
	box.add(that);
	that.fontSize = box.default.fontSize;
	that.textAlign = "center";
	that.textColor = box.default.textColor;
	that.width = box.width;
	that.height = "auto";
	that.color = "transparent";
	//that.element.style.fontFamily = "opensans-bold";
	that.onResize(function(self) {
		self.center("top");
	});

	// BOX: Decrease button. (-)
	box.boxDecrease = createBox(box.default.buttonOuterSpace, 0, box.default.buttonWidth, box.default.buttonHeight);
	box.add(that);
	that.border = box.default.buttonBorder;
	that.borderColor = box.default.buttonBorderColor;
	that.color = box.default.buttonColor;
	that.round = box.default.buttonRound;
	that.element.style.cursor = "pointer";
	that.element.style.boxShadow = box.default.buttonLeftShadow;
	that.setMotion("opacity 0.2s");
	that.center("top");

	// IMAGE: Decrease icon. (-)
	box.imgDecrease = createImage(0, 0, box.default.iconWidth, box.default.iconHeight);
	box.boxDecrease.add(that);
	that.load(box.default.iconFileDecrease);
	that.border = 0;
	that.color = "transparent";
	that.round = 0;
	that.space = 0;
	that.center();

	// BOX: Increase button. (+)
	box.boxIncrease = createBox(0, 0, box.default.buttonWidth, box.default.buttonHeight);
	box.add(that);
	that.right = box.default.buttonOuterSpace;
	that.border = box.default.buttonBorder;
	that.borderColor = box.default.buttonBorderColor;
	that.color = box.default.buttonColor;
	that.round = box.default.buttonRound;
	that.element.style.cursor = "pointer";
	that.element.style.boxShadow = box.default.buttonRightShadow;
	that.setMotion("opacity 0.2s");
	that.center("top");
	
	// Image: Increase icon. (+)
	box.imgIncrease = createImage(0, 0, box.default.iconWidth, box.default.iconHeight)
	box.boxIncrease.add(that);
	that.load(box.default.iconFileIncrease);
	that.border = 0;
	that.color = "transparent";
	that.round = 0;
	that.space = 0;
	that.center();
	
	// *** PRIVATE METHODS:
	const privateMethod = function() {
        return "privateMethod";
    }

	const increaseNumber = function(self, event) {

		event.stopPropagation();

		if (num(currentValue) != maximumNumber) {
			box.setValue(num(currentValue) + 1);
			box.refreshButtonsOpacity();
		}

	}
	
	const decreaseNumber = function(self, event) {

		event.stopPropagation();

		if (num(currentValue) != minimumNumber) {
			box.setValue(num(currentValue) - 1);
			box.refreshButtonsOpacity();
		}

	}
	
	// *** PUBLIC METHODS:
	box.refreshButtonsOpacity = function() {

		box.boxIncrease.opacity = box.default.buttonOpacity;
		box.boxDecrease.opacity = box.default.buttonOpacity;
		box.boxIncrease.element.style.cursor = "pointer";
		box.boxDecrease.element.style.cursor = "pointer";

		if (num(currentValue) == maximumNumber) {
			box.boxIncrease.opacity = box.default.buttonDisableOpacity;
			box.boxIncrease.element.style.cursor = "default";
		}

		if (num(currentValue) == minimumNumber) {
			box.boxDecrease.opacity = box.default.buttonDisableOpacity;
			box.boxDecrease.element.style.cursor = "default";
		}
	}
	
	box.setMinimumNumber = function(number) {

		minimumNumber = number;
		if (num(currentValue) < number) {
			box.setValue(number);
		}

		box.refreshButtonsOpacity();

	}

	box.getMinimumNumber = function() {
		return minimumNumber;
	}
	
	box.setMaximumNumber = function(number) {
		
		maximumNumber = number;
		if (num(currentValue) > number) {
			box.setValue(number);
		}

		box.refreshButtonsOpacity();

	}

	box.getMaximumNumber = function() {
		return maximumNumber;
	}

	/*
	box.setWidth = function(width) {
		box.width = width;
		box.lblNumber.width = width;
	}

	box.getWidth = function() {
		return box.width;
	}
	*/

	box.setUnitText = function(text) {
		unitText = text
	}

	box.setValue = function(number) {

		if (number < minimumNumber) {
			number = minimumNumber;
			print("UIStepper: setValue() number is changed because too small.");
		}

		if (number > maximumNumber) {
			number = maximumNumber;
			print("UIStepper: setValue() number is changed because too big.");
		}

		currentValue = number;
		box.lblNumber.text = str(number) + unitText;
		box.refreshButtonsOpacity();
		onChangeFunc(box);

	}
	
	box.getValue = function() {
		return num(currentValue);
	}

	box.onChange = function(func) {
		onChangeFunc = func;
	}

	// *** FIRST RUN CODE:
	box.boxDecrease.onClick(decreaseNumber);
	box.boxIncrease.onClick(increaseNumber);
	box.setValue(num(currentValue));
	box.refreshButtonsOpacity();
	
	makeBasicObject(box);
	return box;
	
}

// SHARED METHODS:
UIStepper.sharedMethod = function() {
	return "sharedMethod";
}