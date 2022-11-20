/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 30 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-progress-bar.htm


UIProgressBar.create(left = 0, top = 0, width = 300, height = 40)
- Show a percentage of progress bar.

that.setProgressPercentage($percentage)
- Set a percentage of progress bar.

that.setLineLimitPercentage($percentage)
- Set a percentage of line limit.
- if $percentage == 0, line limit will be invisible.

that.setProgressColor($color)
- Set a color of progress bar. $color can be "yellow", "green" or "red".

that.setLineLimitText($text)
- Set a text of line limit. Under the line limit, this text will be shown.

that.setLineLimitVisible($visible)
- Set a visibility of line limit.

that.makeLineLimitHalfVisible()
- Make a line limit half visible.

UIProgressBar.calculatePercentage($width, $maxWidth)
- Calculate a percentage of progress bar from two width values.


*/

"use strict";
const UIProgressBar = {};

UIProgressBar.create = function(left = -1000, top = -1000, width = 300, height = 40) {

    // BOX: UI object container.
    const box = createBox(left, top, width, height);

    box.color = "transparent";
    box.element.style.overflow = "visible";
    box.width = width;
    box.height = height;

    // BOX: Background box.
    box.boxBack = createBox(0, 0, width, height);
    box.add(that);
    that.color = "white";
    that.border = 3;
    that.borderColor = "rgba(0, 0, 0, 0.15)";
    that.round = 14;

    // BOX: Progress container.
    box.boxMask = createBox(0, 0, width, height);
    box.add(that);
    that.color = "transparent";
    that.border = 0;
    that.round = 14;

    // BOX: Progress inside color box.
    box.boxMask.boxProgress = createBox(0, 0, width, height);
    box.boxMask.add(that);
    that.color = "#40A5AF";
    that.round = 14;
    that.opacity = 0.5;
    /* MOTION: */
    // that.setMotion("width 0.3s, opacity 0.3s, background-color 0.3s");

    // BOX: Progress border color box.
    box.boxMask.boxProgressBorder = createBox(0, 0, width, height);
    box.boxMask.add(that);
    that.color = "transparent";
    that.border = 3;
    that.borderColor = "#40A5AF";
    that.round = 14;
    /* MOTION: */
    // that.setMotion("width 0.3s, opacity 0.3s, background-color 0.3s");

    // BOX: Limit line box.
    box.boxLimitLine = createBox(0, -4, 4, height + 8);
    box.add(that);
    that.color = "rgba(0, 0, 0, 0.7)";
    that.round = 2;
    that.opacity = 0;
    /* MOTION: */
    // that.setMotion("left 0.3s, opacity 0.3s");

    // LABEL: Limit line label.
    box.lblLimitLine = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = "0";
    that.textColor = "rgba(0, 0, 0, 0.7)";
    that.opacity = 0;
    /* MOTION: */
    // that.setMotion("left 0.3s, opacity 0.3s");
    that.onResize(function(self) {

        box.lblLimitLine.aline(box.boxLimitLine, "bottom", 8, "center");

        if (self.left < 0) {
            self.left = 0;
        }

        if (self.left > box.width - self.width) {
            self.left = box.width - self.width;
        }

    });

    const calculateProgressWidth = function($percentage) {

        $percentage = parseInt($percentage);
            
        let _progressWidth = parseInt((box.boxBack.width / 100) * $percentage);

        if (_progressWidth < 0) {
            _progressWidth = 0;
        }

        if (_progressWidth > box.boxBack.width) {
            _progressWidth = box.boxBack.width;
        }

        return _progressWidth;
    }

    box.setProgressPercentage = function($percentage) {

        $percentage = UIProgressBar.checkPercentage($percentage);

        let _width = calculateProgressWidth($percentage);

        box.boxMask.boxProgress.width = _width;
        box.boxMask.boxProgressBorder.width = _width;

        if ($percentage == 0) {
            box.boxMask.boxProgress.opacity = 0;
            box.boxMask.boxProgressBorder.opacity = 0;

        } else {
            box.boxMask.boxProgress.opacity = 0.5;
            box.boxMask.boxProgressBorder.opacity = 1;
        }

    }

    box.setProgressColor = function(color = "green") {

        switch (color) {
            case "green":
                color = "#40A5AF";
                break;
            case "red":
                color = "#FE5D49";
                break;
            case "yellow":
                color = "#F1C74A";
                break;
            case "purple":
                color = "#CC75AA";
                break;
            case "blue":
                color = "#588ABE";
                break;
        }

        box.boxMask.boxProgress.color = color;
        box.boxMask.boxProgressBorder.borderColor = color;

    }

    box.setLineLimitPercentage = function($percentage) {

        $percentage = UIProgressBar.checkPercentage($percentage);

        let _width = calculateProgressWidth($percentage);

        box.boxLimitLine.left = _width - 2;

        box.lblLimitLine.aline(box.boxLimitLine, "bottom", 8, "center");

        if (box.lblLimitLine.left < 0) {
            box.lblLimitLine.left = 0;
        }

        if (box.lblLimitLine.left > box.width - box.lblLimitLine.width) {
            box.lblLimitLine.left = box.width - box.lblLimitLine.width;
        }

        if ($percentage == 0) {
            box.setLineLimitVisible(0);
        } else {
            box.setLineLimitVisible(1);
        }

    }

    box.setLineLimitText = function($text) {

        box.lblLimitLine.text = $text;

    }

    box.setLineLimitVisible = function($visible) {

        box.boxLimitLine.opacity = $visible ? 1 : 0;
        box.lblLimitLine.opacity = $visible ? 1 : 0;

    }

    box.makeLineLimitHalfVisible = function() {

        box.boxLimitLine.opacity = 0.4;
        box.lblLimitLine.opacity = 0.4;

    }

    // Show at:
    box.left = left;
    box.top = top;

    makeBasicObject(box);
    return box;

}

UIProgressBar.calculatePercentage = function($width, $maxWidth) {

    let _percentage = parseInt(($width / $maxWidth) * 100)

    _percentage = UIProgressBar.checkPercentage(_percentage)

    return _percentage

}

UIProgressBar.checkPercentage = function($percentage) {

        // 0 - 100

        if (!$percentage) {
            $percentage = 0
        }
    
        if ($percentage < 0) {
            $percentage = 0
        }
    
        if ($percentage > 100) {
            $percentage = 100
        }
    
        return $percentage

}