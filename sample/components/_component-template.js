/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: February 2024
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


EXAMPLE: {javascript-mobile-app-template}/comp-name.htm


*/

"use strict";
const CompName = (params = {}) => {

    // BOX: Component container
    const box = startBox();

    // Default values
    const defaults = {
        border: 0,
        color: "transparent",
        opacity: 0,
        visible: 0,
        width: box.containerBox.width,
        height: box.containerBox.height,
    };

    box.props(defaults, params);

    // *** Private variables:
    let privateVar = "";

    // *** Public variables:
    box.publicVar = "";

    // *** Private functions:
    const privateFunc = () => {};

    // *** Public functions:
    box.publicFunc = () => {};

    // Set a param after created.
    box.setColor = (color) => {
        box.color = color;
    };
    // USAGE: get: componentName.color, set: componentName.setColor("red")

        // *** OBJECT TEMPLATE:
        box.setMotion("opacity 0.2s");
        
        // BOX: Cover.
        box.boxCover = Box(0, 0, box.width, box.height);
        that.color = box.coverBackgroundColor;

        // ICON: Logo image.
        box.imgLogo = Icon();
        that.width = 50;
        that.height = 50;
        that.load(box.waitingIconFile);
        that.opacity = 1;
        that.center();

    endBox();

    // *** OBJECT INIT CODE:
    box.left = 0;
    box.top = 0;
    
    makeBasicObject(box);
    return box;

};