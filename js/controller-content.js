var contentController = {}

contentController.historyList = []

contentController.openContentById = function(contentId) {

    if (contentController.getLastOpenedContentId() != contentId) {
                
        contentController.historyList.push(contentId)
        print("Opened content id: " + contentId)

        switch(contentId) {

            case "test":
                navigationBar.setVisible(1)
                navigationBar.setTitle("Test Title")
                navigationBar.backButton.setVisible(1)
                navigationBar.menuButton.setVisible(1)
                tabBar.setVisible(1)
                tabBar.setSelectedIndex(0)
                defaultView.setTopAndBottom(navigationBar.HEIGHT, tabBar.HEIGHT)
                defaultView.createAndShowContent(homeContent)
                break;

            case "home":
                homeContent.open()
                break;

            case "search":
                searchContent.open()
                break;

            case "alert":
                alertContent.open()
                break;

            case "fav":
                favContent.open()
                break;

            case "setting":
                settingContent.open()
                break;

            case "test-secondview":
                subUsageExamContent.open()
                break;

            case "test-smallview":
                open_secondUsageExamContent()
                break;
                
        }
    }

}

contentController.goBack = function() {

    if (contentController.historyList.length > 1) {
        var contentId = contentController.historyList[contentController.historyList.length - 2]
        contentController.historyList.pop()
        contentController.historyList.pop()
        contentController.openContentById(contentId)
    }   
}

contentController.getLastOpenedContentId = function() {
    
        if (contentController.historyList.length > 0) {
            return contentController.historyList[contentController.historyList.length - 1]
        } else {
            return ""
        }
}

contentController.pushContentIdToHistoryList = function(contentId) {
    contentController.historyList.push(contentId)
}