

/* Bismillah */

/*

SMALL PAGE TEMPLATE
- You can customize, this template code as you need:


Started Date: 11 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

const smallExamplePage = {};
smallExamplePage.PAGE_ID = "smallExamplePage";

// Parameters:
smallExamplePage.parameter1 = "";

smallExamplePage.openInSmallView = function(resultCallback = function(results) {}) {

    smallView.clear();

    // BOX: Page container.
    const box = smallView.getContainerBox();
    // Out of this function, use "smallExamplePage.box" for "box".
    smallExamplePage.box = box;

    box.color = "white";
    box.height = 400;

    // LABEL: Centered text.
    box.lblCenteredText = createLabel(0, 0, "auto", "auto");
    box.add(that);
    // Get parameter:
    that.text = smallExamplePage.parameter1;
    that.onResize(function(self) {
        self.center();
    });

    smallView.onClose(function closed() {

        // Send back result.
        let results = {};
        results.result1 = "Result 1";
        
        resultCallback(results);

    });

    smallView.setVisible(1);

}