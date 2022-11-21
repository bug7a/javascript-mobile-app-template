
/* Bismillah */

/*

SECOND PAGE TEMPLATE
- You can customize, this template code as you need:


Started Date: 11 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

const secondExamplePage = {};
secondExamplePage.PAGE_ID = "secondExamplePage";

// Parameters:
secondExamplePage.parameter1 = "";
secondExamplePage.backButtonText = "Back";

secondExamplePage.openInSecondView = function(resultCallback = function(results) {}) {

    secondView.clear();

    // BOX: Page container.
    const box = secondView.getContainerBox();
    // Out of this function, use "secondExamplePage.box" for "box".
    secondExamplePage.box = box;

    box.color = "whitesmoke";
    box.scrollY = 0;

    // UI TITLE: Default values.
    UITitle.resetDefault();

    // UI TITLE: Object description.
    box.uiTitle = UITitle.create({ 
        title: "Second Example", 
        backButtonVisible: 1, 
        backButtonText: secondExamplePage.backButtonText 
    });
    box.add(that);
    that.left = 0;
    that.top = 0;
    that.backButton.onClick(function(self) {

        // Send back result.
        let results = {};
        results.result1 = "Result 1";
        
        secondView.close();
        resultCallback(results);
        
    });

    // LABEL: Centered text.
    box.lblCenteredText = createLabel(0, 0, "auto", "auto");
    box.add(that);
    that.text = secondExamplePage.parameter1;
    that.onResize(function(self) {
        self.center();
    });

    secondView.setVisible(1);
    print("Opened page id: " + secondExamplePage.PAGE_ID);

}