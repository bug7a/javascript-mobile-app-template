

/* Bismillah */

/*

DEFAULT PAGE TEMPLATE
- You can customize, this template code as you need:


Started Date: 11 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

const defaultExamplePage = {};
defaultExamplePage.PAGE_ID = "defaultExamplePage";

// Parameters:
defaultExamplePage.parameter1 = "";

defaultExamplePage.openInDefaultView = function(resultCallback = function() {}) {

        defaultView.clear();

        var box = defaultView.getContainerBox();
        // Out of this function, use "defaultExamplePage.box" for "box".
        defaultExamplePage.box = box;

        topBar.setVisible(1);
        topBar.setTitle("Default Example");
        topBar.backButton.setVisible(1);
        topBar.menuButton.setVisible(1);
        topBar.setBorderLine(1);
        topBar.setBackgroundColor("white");
        topBar.backButton.onClick(function() {

            // Send back result.
            let results = {};
            results.result1 = "Result 1";
            
            //defaultView.close();
            resultCallback(results);

        });

        bottomBar.setVisible(0);
        //bottomBar.selectItemByIndex(2)
        defaultView.setTopAndBottomOuterSpaces(topBar.getHeight(), 0);

        box.color = "whitesmoke";
        box.scrollX = 0;
        box.scrollY = 1;

        // #1
        box.lblText = createLabel(0, 0, "auto", "auto");
        box.add(that);
        that.text = defaultExamplePage.parameter1;
        //that.color = "white";
        //that.border = 2;
        //that.borderColor = "rgba(0, 0, 0, 0.2)";
        //that.spaceX = 14;
        //that.spaceY = 8;
        //that.round = 6;
        that.onResize(function(self) {
            self.center();
        });

        defaultView.setVisible(1);
        print("Opened page id: " + defaultExamplePage.PAGE_ID);

}