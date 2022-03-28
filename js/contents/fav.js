
var favContent = {}

// BOX: İçerik taşıyıcısı
favContent.box

favContent.createIn = function(box) {

    favContent.box = box
    box.color = "white"
    
    box.webView = createUIWebView(0, 0, box.width, box.height)
    box.add(that)
    that.loadContentFromURL("todo.htm")
    //that.content.a0.b1.txtNewTask.color = "red"
}

favContent.open = function() {
    
    navigationBar.setVisible(0)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(3)
    defaultView.setTopAndBottom(0, tabBar.HEIGHT)
    defaultView.createAndShowContent(favContent)
}