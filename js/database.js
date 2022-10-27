const database = {};

database.getSideMenuBarItemDataList = function() {

    let dataList = [
        { itemId: "HOUSE", title: "House", count: 12, iconFile: "assets/ui-side-menu-bar/t1.png" },
        { itemId: "BILLS", title: "Bills", count: 1, iconFile: "assets/ui-side-menu-bar/t2.png" },
        { itemId: "SHOPPING", title: "Shopping", count: 23, iconFile: "assets/ui-side-menu-bar/t3.png" },
        { itemId: "ENTERTAINMENT", title: "Entertainment", count: 54, iconFile: "assets/ui-side-menu-bar/t4.png" },
        { itemId: "EATING OUT", title: "Eating Out", count: 3, iconFile: "assets/ui-side-menu-bar/t5.png" },
        { itemId: "CLOTHING", title: "Clothing", count: 15, iconFile: "assets/ui-side-menu-bar/t6.png" },
        { itemId: "HEALTH", title: "Health", count: 12, iconFile: "assets/ui-side-menu-bar/t7.png" },
        { itemId: "TRANSPORT", title: "Transport", count: 19, iconFile: "assets/ui-side-menu-bar/t8.png" },
        { itemId: "CHARITIES", title: "Charities", count: 22, iconFile: "assets/ui-side-menu-bar/t9.png" },
        { itemId: "HOBBY", title: "Hobby", count: 5, iconFile: "assets/ui-side-menu-bar/t10.png" },
        { itemId: "OTHERS", title: "Others", count: 3, iconFile: "assets/ui-side-menu-bar/t11.png" },  
    ];

    return dataList;

};

database.getBottomBarItemDataList = function() {

    const dataList = [
        { pageId: homePage.PAGE_ID, iconFile: "assets/ui-bottom-bar/home.svg" },
        { pageId: searchPage.PAGE_ID, iconFile: "assets/ui-bottom-bar/search.svg" },
        { pageId: examplesPage.PAGE_ID, iconFile: "assets/ui-bottom-bar/component.svg" },
        { pageId: tasksPage.PAGE_ID, iconFile: "assets/ui-bottom-bar/note.svg" },
        { pageId: settingsPage.PAGE_ID, iconFile: "assets/ui-bottom-bar/setting.svg" }
    ];

    return dataList;

}