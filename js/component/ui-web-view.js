
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-web-view.htm


*/

"use strict";
const UIWebView = {};

UIWebView.create = function(left = -1000, top = -1000, width = 250, height = 250) {

    const box = createBox(left, top, width, height);
    box.color = "transparent";
    box.clickable = 1;
    box.border = 0;

    const iframeObj = document.createElement('iframe');
    box.element.appendChild(iframeObj);

    box.onResize(function(self) {

        iframeObj.setAttribute('width', self.width + 'px');
        iframeObj.setAttribute('height', self.height + 'px');
        iframeObj.style.border = "none";

    })

    box.loadHTMLFile = function(url) {
        iframeObj.src = url;
    }

    box.getContent = function() {
        return iframeObj.contentWindow;
    }

    makeBasicObject(box);
    return box;

}