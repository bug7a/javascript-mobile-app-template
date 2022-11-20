/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 1 September 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


EXAMPLE: {cordova-mobile-app-ui-template}/ui-page-control.htm


USAGE EXAMPLE:

//UIPageControl.resetDefault();
//UIPageControl.default.startWithMotion = 0;
//UIPageControl.default.motionString = "opacity 0.3s";
//UIPageControl.default.changePageWithMotion = 1;
//UIPageControl.default.changePageMotionString = "left 0.2s";

// UI PAGE CONTROL: Object description.
var uiPageControl = UIPageControl.create({ width: 500, height: getDefaultContainerBox().height });
//that.color = "lightgray"
//that.round = 10
uiPageControl.createNewPage("homePage");
//uiPageControl.homePage.color = "Lavender"
var pageContainerBox = uiPageControl.homePage;
var pageId = uiPageControl.homePage.PAGE_ID;
var pageIndex = uiPageControl.getPageIndexById("homePage");
uiPageControl.openPageById("homePage");
//var openedPageId = uiPageControl.getOpenedPageId();
//var pageCount = uiPageControl.getPageCount();
//uiPageControl.openNextPage()
//uiPageControl.openPreviousPage()
//var pageIdList = uiPageControl.getPageIdList();
//uiPageControl.removePageById("homePage");
//uiPageControl.removeAllPages()
//uiPageControl.setSizes(500, 500);

// NOTE: Dont use border for uiPageControl object. If needed make an other object on it.

*/

"use strict";
const UIPageControl = {};

// SHARED VARIABLES:
UIPageControl.default = {};
UIPageControl.resetDefault = function() {

    UIPageControl.default.width = 600;
    UIPageControl.default.height = 600;
    UIPageControl.default.startWithMotion = 0;
    UIPageControl.default.motionString = "opacity 0.3s";
    UIPageControl.default.changePageWithMotion = 1;
    UIPageControl.default.changePageMotionString = "left 0.2s";

}
UIPageControl.resetDefault();

UIPageControl.create = function(parameters = {}) {

    // BOX: UI object container.
    const box = createBox();

    // Default values.
    box.default = {};
    for (let parameterName in UIPageControl.default) {
        box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UIPageControl.default[parameterName];
    }

    // *** PRIVATE VARIABLES:
    let pageIdList = [];
    let openedPageId = "";
    let onOpenFunc = function(uiPageControl, pageId) {};
    let onCloseFunc = function(uiPageControl, pageId) {};

    // *** PUBLIC VARIABLES:

    // *** OBJECT MODEL:
    //box.left = 0;
    //box.top = 0;
    box.width = box.default.width;
    box.height = box.default.height;
    box.round = 0;
    box.color = "transparent";
    box.border = 0;

    // BOX: Group of pages.
    box.boxPageGroup = createBox(0, 0, box.width, box.height);
    box.add(that);
    if (box.default.changePageWithMotion) {
        that.setMotion(box.default.changePageMotionString);
    }
    that.clickable = 1;
    that.color = "transparent";

    // *** PRIVATE METHODS:
    const repositonPages = function() {

        for (let i = 0; i < pageIdList.length; i++) {
            box[pageIdList[i]].left = i * box.width;
        }

    }
        
    // *** PUBLIC METHODS:
    box.createNewPageWithId = function(pageId) {

        // BOX: Page container box.
        const boxPage = createBox(0, 0, box.width, box.height);
        box.boxPageGroup.add(that);
        that.color = "transparent";
        that.pageId = pageId;

        box[pageId] = boxPage;

        // Set page left
        boxPage.left = pageIdList.length * box.width;
        pageIdList.push(pageId);

        // Set pageGroup width
        box.boxPageGroup.width = pageIdList.length * box.width;

        if (pageIdList.length == 1) {
            box.openPageById(pageId);
        }

        makeBasicObject(boxPage);
        return boxPage;

    }

    box.openPageById = function(pageId) {
        if (box.getPageIndexById(pageId) != -1) {

            // onOpen:
            onOpenFunc(box, pageId);

            box.boxPageGroup.left = box[pageId].left * -1;
            const previousPageId = openedPageId;
            openedPageId = pageId;

            // onClose:
            if (box.default.changePageWithMotion) {
                setTimeout(function() {
                    onCloseFunc(box, previousPageId);
                }, 250);
            } else {
                onCloseFunc(box, previousPageId);
            }

        } else {
            print("UI PAGE CONTROL, openPageById: There is no page with this pageId.")
        }
    }

    box.getPageIndexById = function(pageId) {

        for (let i = 0; i < pageIdList.length; i++) {
            if (pageIdList[i] == pageId) {
                return i;
            }
        }

        return -1;

    }

    box.getContainerBoxById = function(pageId) {
        return box[pageId];
    }

    box.getPageCount = function() {
        return pageIdList.length;
    }

    box.removePageById = function(pageId) {

        let pageIndex = -1;
        let pageObject = null;

        for (let i = 0; i < pageIdList.length; i++) {
            if (pageIdList[i] == pageId) {
                pageIndex = i;
                pageObject = box[pageId];
                break;
            }
        }

        pageIdList.splice(pageIndex, 1);
        delete box[pageId];
        pageObject.remove();
        repositonPages();

        // If selected page deleted, select previous. Or first page.
        box.boxPageGroup.dontMotion();
        if (openedPageId == pageId) {
            let newSelectedPageIndex = pageIndex;
            newSelectedPageIndex = newSelectedPageIndex - 1;
            if (newSelectedPageIndex > 0) {
                box.openPageById(pageIdList[newSelectedPageIndex]);
            } else {
                if (pageIdList.length > 0) {
                    box.openPageById(pageIdList[0]);
                }
            }
        }

        if (pageIdList.length == 0) {
            openedPageId = ""
        }

    }

    box.getOpenedPageId = function() {
        return openedPageId;
    }

    box.getPageIdList = function() {
        return JSON.parse(JSON.stringify(pageIdList));
    }

    box.removeAllPages = function() {

        for (let i = 0; i < pageIdList.length; i++) {
            delete box[pageIdList[i]];
        }
        pageIdList = [];
        openedPageId = "";
        box.boxPageGroup.html = "";
        box.boxPageGroup.left = 0;
        box.boxPageGroup.width = 0;

    }

    box.openNextPage = function() {
        box.openPageByNumber(1);
    }

    box.openPreviousPage = function() {
        box.openPageByNumber(-1);
    }

    box.openPageByNumber = function(number) {
        let pageIndex = box.getPageIndexById(openedPageId);

        pageIndex = pageIndex + number;

        if (pageIndex >= 0 && pageIndex < pageIdList.length) {
            box.openPageById(pageIdList[pageIndex]);
        }
    }

    box.setSizes =  function(width, height) {

        // Resize, all pages and reposition.
        box.width = width;
        box.height = height;

        box.boxPageGroup.width = width;
        box.boxPageGroup.height = height;

        for (let i = 0; i < pageIdList.length; i++) {
            box[pageIdList[i]].width = width;
            box[pageIdList[i]].height = height;
        }

        // Set pageGroup width
        box.boxPageGroup.width = pageIdList.length * width;

        repositonPages();
        box.boxPageGroup.dontMotion();
        box.openPageById(openedPageId);

    }

    box.onOpen = function(func) {
        onOpenFunc = func;
    }

    box.onClose = function(func) {
        onCloseFunc = func;
    }

    box.afterPageClosed = function(func) {

        if (box.default.changePageWithMotion) {
            setTimeout(function() {
                func(box);
            }, 250);

        } else {
            func(box);
        }

    }

    // *** CODE:

    makeBasicObject(box);
    return box;
}

// SHARED METHODS:
UIPageControl.testFunction = function() {

}