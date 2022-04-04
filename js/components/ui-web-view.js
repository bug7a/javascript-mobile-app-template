
/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 March 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


HANDBOOK:

createUIWebView(left: float, top: float, width: integer, height: integer) : createUIWebView
- Create a UIWebView object.
- UIWebView object extends Box object.

object.loadHTMLFileFromURL(url: string) : void
- Load content from htm file url.

*/

var UIWebView = {}

var createUIWebView = function(left = 0, top = 0, width = 250, height = 250) {

    var box = createBox(left, top, width, height)
    that.color = "transparent"
    that.clickable = 1
    that.border = 0

    var iframeObj = document.createElement('iframe')
    box.element.appendChild(iframeObj)

    box.onResize(function(self) {
        iframeObj.setAttribute('width', self.width + 'px')
        iframeObj.setAttribute('height', self.height + 'px')
    })

    box.loadHTMLFileFromURL = function(url) {
        iframeObj.src = url
    }

    box.getContent = function() {
        return iframeObj.contentWindow
    }

    makeBasicObject(box)
    return box
}