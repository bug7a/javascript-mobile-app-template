/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/

*/

var defaultView = {}

defaultView.openedPageList = []

defaultView.create = function() {

    // BOX: Content container box.
    defaultView.box = createBox(0, 
        0, 
        global.USED_WIDTH, 
        page.height
    )

    defaultView.removeOpenedPageInView()
}

defaultView.removeOpenedPageInView = function() {

    defaultView.box.html = ""
    defaultView.box.color = "whitesmoke"
    defaultView.box.border = 0
    defaultView.box.scrollX = 0
    defaultView.box.scrollY = 1
}

defaultView.getContainerBox = function() {
    return defaultView.box
}

defaultView.setVisible = function(visible) {

    if (visible) {
        defaultView.box.visible = 0
        shared.setVisibleWithMotion(defaultView.box, 1)

    } else {
        shared.setVisibleWithMotion(defaultView.box, 0)
    }
}

defaultView.setTopAndBottomOuterSpaces = function(top, bottom) {
    defaultView.box.top = top
    defaultView.box.height = page.height - top - bottom
}

defaultView.pushIntoOpenedPageList = function(openedPage) {
    if (defaultView.openedPageList.length >= global.defaultView.openedPageListLimit) {
        defaultView.openedPageList.shift();
    }
    defaultView.openedPageList.push(openedPage)
}

defaultView.createPrevOpenedPageAndShow = function() {

    if (defaultView.openedPageList.length > 1) {
        var content = defaultView.openedPageList[defaultView.openedPageList.length - 2]
        defaultView.openedPageList.pop()
        defaultView.openedPageList.pop()
        content.createInDefaultViewAndShow()
    } else {
        print("defaultView: There is no previous page. History limit is " + global.defaultView.openedPageListLimit)
    }
}

defaultView.getLastOpenedPage = function() {
    
    if (defaultView.openedPageList.length > 0) {
        return defaultView.openedPageList[defaultView.openedPageList.length - 1]
    } else {
        return ""
    }
}