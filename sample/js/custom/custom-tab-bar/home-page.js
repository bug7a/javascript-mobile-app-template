const homePage = {};
homePage.PAGE_ID = "homePage";

homePage.openInDefaultView = function() {

    defaultView.clear();

    // BOX: Page container.
    const box = defaultView.getContainerBox();
    homePage.box = box;

    defaultView.setTopAndBottomOuterSpaces(0, bottomTabBar.getHeight());

    box.color = "white";
    box.scrollY = 0;

    // UI PAGE CONTROL:
    box.uiPageControl = UIPageControl.create({ width: box.width, height: box.height });
    box.add(that);
    that.color = "transparent";
    that.round = 0;
    that.left = 0;
    that.top = 0;

    // PAGE A:
    box.uiPageControl.createNewPageWithId("aPage");
    aPage.createIn(box.uiPageControl.aPage);

    // PAGE B:
    box.uiPageControl.createNewPageWithId("bPage");
    bPage.createIn(box.uiPageControl.bPage);

    // PAGE C:
    box.uiPageControl.createNewPageWithId("cPage");
    cPage.createIn(box.uiPageControl.cPage);

    //box.uiPageControl.openPageById("aPage");

    // NOTE: All 3 pages are always available.

    defaultView.setVisible(1);
    console.log("Opened page id: " + homePage.PAGE_ID);

}

homePage.openPageByIndex = function(pageIndex) {

    switch(pageIndex) {

        case 0:
            homePage.box.uiPageControl.openPageById("aPage");
            break;

        case 1:
            homePage.box.uiPageControl.openPageById("bPage");
            break;

        case 2:
            homePage.box.uiPageControl.openPageById("cPage");
            break;

        case 3:
            dPage.openInSecondView();
            break;

    }

}