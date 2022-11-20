/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 1 September 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

"use strict";
var UINumericKeyboard = {};
UINumericKeyboard.START_NUMBER = ""; // "0"
UINumericKeyboard.MAX_NUMBER = "4"; // 10

UINumericKeyboard.create = function($left = 0, $top = 0, $width = 600, $height = 300) {

    var createNumericButton = function($text) {

        // BOX: Container.
        var _boxBtn = createBox(0, 0, 80, 80);
        // that.color = "#9B9B9B33";
        that.color = "white";
        that.round = 14;
        // that.border = 2;
        that.border = 1;
        //that.borderColor = "rgba(0, 0, 0, 0.1)";
        that.borderColor = "rgba(0, 0, 0, 0.7)";
        // that.borderColor = "#9B9B9B";
    
        that.value = $text;
    
        if ($text != -1) {
    
            // LABEL: Text.
            _boxBtn.lblText = createLabel(0, 0, "auto", "auto");
            _boxBtn.add(that);
            that.text = $text;
            that.textColor = "#141414";
            // that.element.style.fontFamily = "opensans-bold";
            that.fontSize = 35;
            //that.opacity = 0.7;
            that.onResize(function(self) {
                self.center();
            })
    
        } else {
    
            // IMAGE: Backspace icon.
            _boxBtn.imgIcon = createImage(0, 0, 42, 42);
            _boxBtn.add(that);
            that.load("images/backspace.png");
            //that.opacity = 0.7;
            that.onResize(function(self) {
                self.center();
            })
    
        }
        
        makeBasicObject(_boxBtn);
        return _boxBtn;
    
    }

    // BOX: UI object container.
    var _box = createBox($left, $top, $width, $height);
    that.color = "transparent";
    /*
    that.opacity = 0;
    that.setMotion("opacity 0.5s");
    that.withMotion(function(self) {
        self.opacity = 1;
    })
    */

    _box.onChangeFunc = function() { };

    // BOX: Background.
    _box.boxBack = createBox(20, 10, $width - 40, $height - 20);
    _box.add(that);
    that.color = "transparent";
    //that.border = 1;
    //that.borderColor = "#141414";
    that.round = 14;
    //that.border = 3;
    //that.borderColor = "rgba(0, 0, 0, 0.15)";

    // LABEL: Title text.
    _box.lblTitle = createLabel(0, 33, _box.width, "auto");
    _box.add(that);
    that.textColor = "#141414";
    that.opacity = 0.5;
    that.fontSize = 18;
    that.textAlign = "center";
    that.text = "PIN"
    // that.text = "YAPILAN HARCAMA"
    // that.text = "HARCAMA MİKTARI"
    that.opacity = 0;

    // LABEL: Value text.
    _box.lblValue = createLabel(0, 50, _box.width, "auto");
    _box.add(that);
    that.textColor = "#141414";
    that.element.style.fontFamily = "opensans-bold";
    that.fontSize = 35;
    that.opacity = 0.9;
    that.textAlign = "center";
    that.text = UINumericKeyboard.START_NUMBER;
    that.opacity = 0;

    _box.setValue = function($value) {
        _box.lblValue.text = $value;
    }

    _box.getValue = function() {
        return _box.lblValue.text;
    }

    _box.setTitle = function($value) {
        _box.lblTitle.text = $value;
    }

    _box.onChange = function($func) {
        _box.onChangeFunc = $func;
    }

    // Keyboard items.
    var _itemList = [1, 2, 3, 4, 5, -1, 6, 7, 8, 9, 0];
    var _itemBottom = 25 + 80 + 10;
    var _itemLeft = 35;

    for (var i = 0; i < _itemList.length; i++) {

        createNumericButton(_itemList[i]);
        _box.add(that);
        that.left = _itemLeft;
        that.bottom = _itemBottom;
        that.onClick(function(self) {

            _firstValue = _box.lblValue.text;

            //if (_firstValue.length != 4  || self.value == -1) {

                if (_box.lblValue.text == UINumericKeyboard.START_NUMBER) {
                    if (self.value == -1) {
                        _box.lblValue.text = UINumericKeyboard.START_NUMBER;
                    } else {
                        if (self.value != 0) {
                            //clickEffect.makeClick();
                        }
                        _box.lblValue.text = self.value;
                    }
                } else {
                    if (self.value == -1) {
                        // delete last character.
                        //clickEffect.makeClick();
                        if (_box.lblValue.text.length > 1) {
                            _box.lblValue.text = _box.lblValue.text.substring(0, _box.lblValue.text.length - 1);
                        } else {
                            _box.lblValue.text = UINumericKeyboard.START_NUMBER;
                        }
                    } else {
                        if (_box.lblValue.text.length < UINumericKeyboard.MAX_NUMBER) {
                            //clickEffect.makeClick();
                            _box.lblValue.text += self.value;
                        }
                    }
                }

                if (_box.lblValue.text != _firstValue) {
                    _box.onChangeFunc(_box);
                }

            //}
    
        });

        _itemLeft += 80 + 10;

        if (_itemList[i] == -1) {
            _itemLeft = 35;
            _itemBottom -= 80 + 10;
        }

        if (_itemList[i] == 0) {
            that.width += 80 + 10; 
        }

    }

    makeBasicObject(_box);
    return _box;

}