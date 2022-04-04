
var tasksPage = {}
tasksPage.ID = "tasks"

tasksPage.createInDefaultViewAndShow = function() {

    if (tasksPage.ID != defaultView.getLastOpenedPage().ID) {

        defaultView.removeOpenedPageInView()

        var box = defaultView.getContainerBox()
        // Out of this function, use "tasksPage.box" for "box".
        tasksPage.box = box

        navigationBar.setVisible(0)
        //navigationBar.setTitle("Title Text")
        //navigationBar.backButton.setVisible(1)
        //navigationBar.menuButton.setVisible(1)
        tabBar.setVisible(1)
        tabBar.selectItemByIndex(3)
        defaultView.setTopAndBottomOuterSpaces(0, tabBar.HEIGHT)
        //defaultView.setTopAndBottomOuterSpaces(navigationBar.HEIGHT, tabBar.HEIGHT)

        box.color = "white"
        box.scrollY = 0

        box.webView = createUIWebView(0, 0, box.width, box.height)
        box.add(that)
        that.loadHTMLFileFromURL("todo.htm")

        defaultView.pushIntoOpenedPageList(tasksPage)
        defaultView.setVisible(1)
        print("Opened page id: " + tasksPage.ID)
    }
}
