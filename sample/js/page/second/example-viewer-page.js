const exampleViewerPage = {};
exampleViewerPage.PAGE_ID = "exampleViewerPage";

// Parameters:
exampleViewerPage.htmlFile = "examples/ui-segment.htm";

exampleViewerPage.openInSecondView = function() {

    secondView.clear();

    // BOX: Page container.
    const box = secondView.getContainerBox();
    exampleViewerPage.box = box;

    box.color = "white";
    box.scrollY = 0;

    // UI TITLE: Default values.
    UITitle.resetDefault();

    // UI TITLE: Object description.
    box.uiTitle = UITitle.create({
        title: "Example Preview", 
        backButtonVisible: 1, 
        backButtonText: "Back" 
    });
    box.add(that);
    that.left = 0;
    that.top = 0;
    that.backButton.onClick(function(self) {

        secondView.close();
        
    });

    // UI WEB VIEW:
    box.webView = UIWebView.create(0, box.uiTitle.height, box.width, box.height - box.uiTitle.height);
    box.add(that);
    that.loadHTMLFile(exampleViewerPage.htmlFile);

    secondView.setVisible(1);
    print("Opened page id: " + exampleViewerPage.PAGE_ID + ": " + exampleViewerPage.htmlFile);

}