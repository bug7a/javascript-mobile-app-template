
const tasksPage = {};
tasksPage.PAGE_ID = "tasksPage";

tasksPage.openInDefaultView = function() {

    defaultView.clear();

    const box = defaultView.getContainerBox();
    // Out of this function, use "tasksPage.box" for "box".
    tasksPage.box = box;

    topBar.setVisible(0);
    
    bottomBar.setVisible(1);
    bottomBar.selectItemByIndex(3);
    bottomBar.setBorderLine(1);

    defaultView.setTopAndBottomOuterSpaces(0, bottomBar.getHeight());

    box.color = "transparent";
    box.scrollY = 0;

    box.webView = UIWebView.create(0, 0, box.width, box.height);
    box.add(that);
    that.loadHTMLFile("app-todo.htm");

    print("Opened page id: " + tasksPage.PAGE_ID);

    defaultView.setVisible(1);

}
