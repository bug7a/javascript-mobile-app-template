
const homePage = {};
homePage.PAGE_ID = "homePage";

homePage.categoryItemDataList = [
    { categoryId: "a", title: "Coffee", iconFile: "assets/categories/coffee.png", searchText: "Coffee Hot" },
    { categoryId: "b", title: "Coffee Cup", iconFile: "assets/categories/coffee-cup.png", searchText: "Coffee Cup Hot" },
    { categoryId: "c", title: "Iced Caffee", iconFile: "assets/categories/iced-caffee.png", searchText: "Iced Caffee Cold" },
    { categoryId: "d", title: "Milkshake", iconFile: "assets/categories/milkshake.png", searchText: "Milkshake Cold" },
    { categoryId: "e", title: "Chocolate", iconFile: "assets/categories/chocolate-milk.png", searchText: "Chocolate Cold" },
    { categoryId: "f", title: "Cappuccino", iconFile: "assets/categories/cappuccino.png", searchText: "Cappuccino Hot" },
    { categoryId: "g", title: "Tea", iconFile: "assets/categories/tea.png", searchText: "Tea Hot" },
    { categoryId: "h", title: "Frappe", iconFile: "assets/categories/frappe.png", searchText: "Frappe Cold" },
    { categoryId: "i", title: "Orange Juice", iconFile: "assets/categories/orange-juice.png", searchText: "Orange Juice Cold" }
];

homePage.cardItemDataList = [
    { title: "Dill", price: "3", iconFile: "assets/cards/dill.png", searchText: "i g h i" },
    { title: "Fennel", price:"5", iconFile: "assets/cards/fennel.png", searchText: "h f g c" },
    { title: "Juniper", price:"2", iconFile: "assets/cards/juniper.png", searchText: "g e g" },
    { title: "Olives", price:"7", iconFile: "assets/cards/olives.png", searchText: "f g c a" },
    { title: "Oregano", price:"4", iconFile: "assets/cards/oregano.png", searchText: "e c g b" },
    { title: "Pepper", price:"5", iconFile: "assets/cards/pepper.png", searchText: "d b a" },
    { title: "Rosehip", price:"3", iconFile: "assets/cards/rosehip.png", searchText: "c a g d" }
];

homePage.openInDefaultView = function() {

        defaultView.clear();

        const box = defaultView.getContainerBox();
        // Out of this function, we will use "homePage.box" for "box".
        homePage.box = box;

        topBar.setVisible(0);
        //topBar.setTitle("Title Text");
        //topBar.setBackgroundColor("#FFFFFF");
        //topBar.setTitleColor("rgba(0, 0, 0, 0.8)");
        //topBar.setBorderLine(1);
        //topBar.setTitleAlign("left");
        //topBar.backButton.setVisible(1);
        //topBar.menuButton.setVisible(1);
        
        bottomBar.setVisible(1);
        bottomBar.selectItemByIndex(0);
        bottomBar.setBorderLine(0);

        defaultView.setTopAndBottomOuterSpaces(0, bottomBar.getHeight());
        //defaultView.setTopAndBottomOuterSpaces(topBar.getHeight(), bottomBar.getHeight());

        // Background color of defaultView.
        box.color = "#5ABB9F";


        // #1

        /*
        // UI TITLE: Default values.
        UITitle.resetDefault();
        //UITitle.default.title = "Title";
        //UITitle.default.backButtonVisible = 0;
        //UITitle.default.backButtonText = "Back";
        UITitle.default.width = box.width;
        //UITitle.default.height = 105;
        //UITitle.default.backgroundColor = "white";
        //UITitle.default.round = 0;
        //UITitle.default.border = 0;
        //UITitle.default.borderColor = "rgba(0, 0, 0, 0.1)";
        //UITitle.default.bottomBorder = 1;
        //UITitle.default.bottomInnerSpace = 24;
        //UITitle.default.leftInnerSpace = 20;
        //UITitle.default.rightInnerSpace = 20;
        //UITitle.default.titleFontSize = 28;
        //UITitle.default.titleTextColor = "rgba(0, 0, 0, 0.8)";
        //UITitle.default.backButtonIconFile = "components/ui-title/arrow-blue.svg";
        //UITitle.default.backButtonHeight = 20;
        //UITitle.default.backButtonFontSize = 14;
        //UITitle.default.backButtonTextColor = "#689BD2";
        //UITitle.default.backButtonIconBackgroundColor = "rgba(0, 0, 0, 0.0)";
        */

        const uiTitleOptions = {};
        uiTitleOptions.title = "Categories";

        // UI TITLE: Category title.
        box.categoryUITitle = UITitle.create(uiTitleOptions);
        box.add(that);
        // Show object:
        that.position = "relative";

        // UI SEARCH BOX: Default values.
        UISearchBox.resetDefault();
        //UISearchBox.default.width = 300;
        //UISearchBox.default.height = 50;
        //UISearchBox.default.searchIconFile = "components/ui-search-box/search.svg";
        //UISearchBox.default.clearIconFile = "components/ui-search-box/clear.svg";
        //UISearchBox.default.isCancelEnabled = 1;
        //UISearchBox.default.placeholderText = "Search";
        //UISearchBox.default.color = "whitesmoke";
        //UISearchBox.default.textColor = "rgba(0, 0, 0, 0.8)";
        //UISearchBox.default.border = 0;
        //UISearchBox.default.borderColor = "rgba(0, 0, 0, 0.1)";
        //UISearchBox.default.borderBottomStyle = "2px solid rgba(0, 0, 0, 0.06)";
        //UISearchBox.default.round = 6;
        //UISearchBox.default.fontSize = 20;

        // UI SEARCH BOX: Search box in box.categoryUITitle.
        box.categoryUITitle.uiSearchBox = UISearchBox.create({ 
            width: 200
        });
        box.categoryUITitle.add(that);
        // Show object:
        that.right = UITitle.default.rightInnerSpace;
        that.bottom = 20;


        // #2
        
        // UI ITEM LIST: Categoriy items in horizontal list.
        box.categoryUIItemList = UIItemList.create({ 
            width: box.width, 
            height: 200 
        });
        box.add(that);
        that.color = "white";
        //that.color = "whitesmoke";

        that.setItemAlignment(UIItemList.alignType.HORIZONTAL);
        that.setInnerSpaces(10, 0, 10, 0);
        that.setItemCreationFunction(homePage.createCategoryItem);
        that.createItemsByDataList(homePage.categoryItemDataList);
        that.onSelectionChange(homePage.selectClickedCategoryItem);
        // Show object:
        that.position = "relative";
        
        // Connect search box with category item list.
        box.categoryUITitle.uiSearchBox.onSearch(function(searchText, uiSearchBox) {
            box.categoryUIItemList.searchItemByText(searchText);
        });


        // #3

        // UI TITLE: Cards title
        box.cardUITitle = UITitle.create({
            title: "Cards",
            backgroundColor: "rgba(0, 0, 0, 0.02)"
        });
        box.add(that);
        // Show object:
        that.position = "relative";


        // #4

        // UI ITEM LIST: Card items in horizontal list.
        box.cardUIItemList = UIItemList.create({ 
            width: box.width, 
            height: 400 
        });
        box.add(that);
        that.color = "#5ABB9F";
        //that.color = "white";

        that.setItemAlignment(UIItemList.alignType.HORIZONTAL);
        that.setInnerSpaces(20, 0, 20, 0);
        that.setItemCreationFunction(homePage.createCardItem);
        that.createItemsByDataList(homePage.cardItemDataList);
        that.onSelectionChange(homePage.selectClickedCardItem);
        //that.selectItemByIndex(3); // Olives
        //that.selectItemByIndex(5); // Pepper
        // Show object:
        that.position = "relative";

        // Olives card's stepper object global name
        //console.log(homePage.box.cardUIItemList.getItemList()[3].uiStepper.connectedItemName);

        // All selected items:
        //console.log(homePage.box.cardUIItemList.getSelectedItemList());

        /*
        // All items:
        homePage.box.cardUIItemList.forEach(function(item) {
            console.log(item.uiStepper.connectedItemName);
            console.log(item.getData());
        });
        */

        // Select category, after cardUIItemList created:
        // NOTE: We connected them in homePage.selectClickedCategoryItem() function.
        box.categoryUIItemList.selectItemByIndex(0);

        box.grpLinkButton = startFlexBox({
            width: box.width, 
            height: 200,
            position: "relative",
            color: "transparent",
        });
        box.add(that);

            startBox(20, 5, box.width - 40, 100, {
                color: "rgba(0, 0, 0, 0.25)",
                round: 8,
            });
            that.clickable = 1;
            that.elem.style.cursor = "pointer";
            that.onClick(() => {
                window.open("https://bug7a.github.io/javascript-mobile-app-template/", "_blank");
            });

                Icon({
                    right: -20,
                    top: -20,
                    width: 100,
                    height: 100,
                    opacity: 0.15,
                });
                that.load("assets/download.svg");

                Label({
                    left: 20,
                    top: 15,
                    text: "Download on Github",
                    fontSize: 30,
                    textColor: "#5ABB9F",
                });
                that.elem.style.fontFamily = "opensans-bold";

                Label({
                    left: 20,
                    top: 50,
                    text: "This is open-source javascript mobile app template.",
                    textColor: "rgba(255, 255, 255, 0.5)",
                });

            endBox();

        endFlexBox();

        console.log("Opened page id: " + homePage.PAGE_ID);
        
        // Show view:
        defaultView.setVisible(1);
        
}

homePage.createCategoryItem = function(itemData, uiItemList) {

    const ITEM_WIDTH = 129;
    //const ITEM_WIDTH = 150;

    // BOX: Object container.
    const item = createBox();
    item.width = ITEM_WIDTH;
    item.height = 200; // uiItemList.height
    item.color = "transparent";

    // BOX: Item background box
    item.boxBackground = createBox(2, 5, ITEM_WIDTH - 4, 190);
    item.add(that);
    that.color = "transparent";
    that.round = 13;
    that.setMotion("background-color 0.3s");

    // BOX: Icon background box
    item.boxIconBackground = createBox(0, 35, 90, 90);
    item.add(that);
    that.round = 50;
    that.color = "rgba(255, 255, 255, 0.3)";
    that.setMotion("background-color 0.3s");
    that.center("left");
    
    // IMAGE: icon image
    item.imgIcon = createImage(0, 0, 70, 70);
    item.add(that);
    that.load(itemData.iconFile);
    that.aline(item.boxIconBackground);
    that.left += 10;
    that.top += 10;
    that.setMotion("transform 0.3s");
    that.imageElement.style.filter = "grayscale(100%)";
    // Dont motion at create.
    that.dontMotion();

    // LABEL: item name text
    item.lblName = createLabel(0, 0, ITEM_WIDTH, 30);
    item.add(that);
    that.text = itemData.title;
    that.bottom = 30;
    that.textAlign = "center";

    // NOTE: UIItemList will set item.position = "relative";

    makeBasicObject(item);
    return item;

}

homePage.selectClickedCategoryItem = function(uiItemList, clickedItem, prevClickedItem) {

    // Single Selection:
    if (!clickedItem.isSelected()) {

        if (prevClickedItem) {

            // Deselect previous selected item:
            prevClickedItem.clickable = 1;
            prevClickedItem.boxBackground.color = "transparent";
            prevClickedItem.boxIconBackground.color = "rgba(255, 255, 255, 0.3)";
            prevClickedItem.lblName.element.style.fontFamily = "opensans";
            prevClickedItem.imgIcon.element.style.transform = "scale(1)";
            prevClickedItem.imgIcon.element.style.filter = "grayscale(100%)";
            uiItemList.removeItemFromSelectedList(prevClickedItem);
        }

        // Select clicked item:
        clickedItem.clickable = 0;
        clickedItem.boxBackground.color = "white"
        clickedItem.boxIconBackground.color = "transparent"
        clickedItem.lblName.element.style.fontFamily = "opensans-bold"
        clickedItem.imgIcon.element.style.transform = "scale(1.5)"
        clickedItem.imgIcon.element.style.filter = "grayscale(30%)";
        uiItemList.addItemToSelectedList(clickedItem);

        console.log("Selected category: " + clickedItem.getIndex() + "-" + clickedItem.getData().title);

        // Filter cards by selected category id:
        if (homePage.box.cardUIItemList) {
            homePage.box.cardUIItemList.searchItemByText(clickedItem.getData().categoryId);
        }
    }
}

homePage.createCardItem = function(itemData, uiItemList) {

    const ITEM_WIDTH = 350;
    //const ITEM_WIDTH = 150;

    // BOX: Object container box
    const item = createBox();
    item.color = "transparent";
    item.width = ITEM_WIDTH;
    item.height = 400; // uiItemList.height

    // BOX: Item background box
    item.boxBackground = createBox(2, 10, ITEM_WIDTH - 4, 380);
    item.add(that);
    that.color = "rgba(255, 255, 255, 0.1)";
    that.round = 13;
    that.border = 0;
    that.borderColor = "rgba(255, 255, 255, 0.8)";
    that.setMotion("background-color 0.3s");

    // IMAGE: icon image
    item.imgIcon = createImage(0, 50, 200, 200);
    item.add(that);
    that.load(itemData.iconFile);
    //that.imageElement.style.filter = "grayscale(80%)";
    that.center("left");

    // LABEL: item name text
    item.lblName = createLabel(0, 300, ITEM_WIDTH, 38);
    item.add(that);
    that.text = itemData.title;
    that.fontSize = 28;
    that.textAlign = "center";
    that.setMotion("top 0.3s");

    // LABEL: item price text
    item.lblPrice = createLabel(0, 0, "auto", "auto");
    item.add(that);
    that.text = "$" + itemData.price;
    that.top = 20;
    that.right = 10;
    that.color = "rgba(255, 255, 255, 0.3)";
    that.spaceX = 14;
    that.spaceY = 4;
    that.round = 6;
    that.border = 0; //2
    that.borderColor = "rgba(255, 255, 255, 0.8)";
    that.fontSize = 28;
    that.element.style.fontFamily = "opensans-bold";
    
    // UI STEPPER: Count of product.
    UIStepper.resetDefault();
    UIStepper.default.backgroundColor = "rgba(0, 0, 0, 0.08)";
    UIStepper.default.buttonOuterSpace = 4;
    UIStepper.default.buttonColor = "rgba(0, 0, 0, 0.2)";
    UIStepper.default.buttonBorder = 1;
    UIStepper.default.buttonBorderColor = "rgba(0, 0, 0, 0.8)";
    item.uiStepper = UIStepper.create();
    item.add(that);
    that.connectedItemName = itemData.title;
    that.opacity = 0;
    that.setMotion("opacity 0.3s, transform 0.3s");
    that.element.style.transform = "scale(0.1)";
    that.setMinimumNumber(1);
    that.setMaximumNumber(15);
    that.setValue(1);
    that.onChange(function(uiStepper) {

        console.log("Stepper value (" + uiStepper.connectedItemName + "): " + uiStepper.getValue());
        item.lblPrice.text = "$" + (itemData.price * uiStepper.getValue());

    });
    that.bottom = 35;
    that.center("left");

    // NOTE: UIItemList will set item.position = "relative"

    makeBasicObject(item);
    return item;
}

homePage.selectClickedCardItem = function(uiItemList, clickedItem, prevClickedItem) {

    // Multi Selection:
    if (!clickedItem.isSelected()) {

        // Select item:
        clickedItem.boxBackground.border = 2;
        //clickedItem.boxBackground.borderColor = "rgba(255, 255, 255, 0.8)";
        clickedItem.boxBackground.color = "rgba(255, 255, 255, 0.3)";
        clickedItem.uiStepper.element.style.transform = "scale(1)";
        clickedItem.uiStepper.opacity = 1;
        clickedItem.lblName.top = 270;
        uiItemList.addItemToSelectedList(clickedItem);

    } else {

        // Deselect item:
        clickedItem.boxBackground.border = 0;
        //clickedItem.boxBackground.borderColor = "rgba(255, 255, 255, 0.0)";
        clickedItem.boxBackground.color = "rgba(255, 255, 255, 0.1)";
        clickedItem.uiStepper.element.style.transform = "scale(0.1)";
        clickedItem.uiStepper.opacity = 0;
        //clickedItem.uiStepper.setValue(1);
        clickedItem.lblName.top = 300;
        uiItemList.removeItemFromSelectedList(clickedItem);

    }

    console.log("Total selected cards: " + uiItemList.getSelectedItemList().length);

}