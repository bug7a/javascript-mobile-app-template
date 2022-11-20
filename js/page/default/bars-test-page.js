
const barsTestPage = {};
barsTestPage.PAGE_ID = "barsTestPage";

// Parameters:
barsTestPage.parameter1 = "";

barsTestPage.openInDefaultView = function(resultCallback = function() {}) {

        defaultView.clear();

        var box = defaultView.getContainerBox();
        // Out of this function, use "barsTestPage.box" for "box".
        barsTestPage.box = box;

        topBar.setVisible(1);
        topBar.setTitle("Bars Test");
        topBar.setBackgroundColor("#FFFFFF");
        topBar.setTitleColor("rgba(0, 0, 0, 0.8)");
        topBar.setBorderLine(1);
        topBar.setTitleAlign("center");
        topBar.backButton.setVisible(1);
        topBar.menuButton.setVisible(1);
        topBar.backButton.onClick(function() {

            // Send back result.
            let results = {};
            results.result1 = "Result 1";
            
            //defaultView.close();
            resultCallback(results);

        });

        bottomBar.setVisible(1);
        bottomBar.selectItemByIndex(4);
        bottomBar.setBorderLine(1);
    
        defaultView.setTopAndBottomOuterSpaces(topBar.getHeight(), bottomBar.getHeight());

        box.color = "whitesmoke";
        box.scrollX = 0;
        box.scrollY = 1;

        // CELLS: 4 vertical cells:
        UICells.create(box, UICells.alignType.VERTICAL, ["auto", "auto", "auto", "auto", "auto"]);
        box.cell(0).color = "whitesmoke";
        box.cell(1).color = "white";
        box.cell(2).color = "whitesmoke";
        // CELLS: 4 horizontal cells in box.cell(1)
        UICells.create(box.cell(1), UICells.alignType.HORIZONTAL, ["auto", "auto", "auto"]);
        box.cell(1).cell(0).color = "white";
        box.cell(1).cell(1).color = "#E1F0FF";
        box.cell(1).cell(2).color = "white";

        // LABEL:
        createLabel(0, 0, "auto", "auto");
        that.text = "cell(3)";
        box.cell(3).add(that);
        that.onResize(function(self) {
            self.center();
        });

        defaultView.setVisible(1);
        print("Opened page id: " + barsTestPage.PAGE_ID);

}