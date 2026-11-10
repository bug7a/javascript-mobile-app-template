/* Bismillah */

/*
SEARCH (a tab): a search box over a list; the price went up (green) or down (red).
A row is selected (whitesmoke) and opens a sheet with the product (ProductPreview), which can add a task.
*/

"use strict";

// The data of the list (it may come from a server: App.wait(fetch(...)))
const ProductData = [
    { key: "broccoli", title: "Broccoli", type: "Vegetable", price: 4, previousPrice: 3, iconFile: "assets/products/brokoli.png" },
    { key: "strawberry", title: "Strawberry", type: "Fruit", price: 8, previousPrice: 9, iconFile: "assets/products/cilek.png" },
    { key: "tomato", title: "Tomato", type: "Vegetable", price: 3, previousPrice: 3, iconFile: "assets/products/domates.png" },
    { key: "apple", title: "Apple", type: "Fruit", price: 2, previousPrice: 3, iconFile: "assets/products/elma.png" },
    { key: "carrot", title: "Carrot", type: "Vegetable", price: 6, previousPrice: 6, iconFile: "assets/products/havuc.png" },
    { key: "watermelon", title: "Watermelon", type: "Fruit", price: 5, previousPrice: 3, iconFile: "assets/products/karpuz.png" },
    { key: "lemon", title: "Lemon", type: "Fruit", price: 7, previousPrice: 6, iconFile: "assets/products/limon.png" },
    { key: "banana", title: "Banana", type: "Fruit", price: 12, previousPrice: 12, iconFile: "assets/products/muz.png" },
    { key: "pomegranate", title: "Pomegranate", type: "Fruit", price: 13, previousPrice: 13, iconFile: "assets/products/nar.png" },
    { key: "eggplant", title: "Eggplant", type: "Vegetable", price: 5, previousPrice: 3, iconFile: "assets/products/patlican.png" },
    { key: "blueberry", title: "Blueberry", type: "Fruit", price: 17, previousPrice: 18, iconFile: "assets/products/yabanmersini.png" },
    { key: "pepper", title: "Green Pepper", type: "Vegetable", price: 6, previousPrice: 3, iconFile: "assets/products/yesilbiber.png" },
];

// A sheet with a product: its name, its type, its picture and a button that adds a task
const ProductPreview = {};

ProductPreview.open = function (product) {
    const SHEET_HEIGHT = 500;
    const PICTURE_SIZE = 160;
    App.openSheet({
        height: SHEET_HEIGHT,
        content: function (body, sheet) {

            // BOX: The sheet (its objects stand at their places)
            startBox({ width: "100%", height: SHEET_HEIGHT, color: "transparent" });

                Label({ left: 0, top: 80, width: "100%", text: product.title, fontSize: 30, textAlign: "center", textColor: App.colors.text });
                Label({ left: 0, top: 114, width: "100%", text: product.type, fontSize: 18, textAlign: "center", textColor: "gray" });

                Icon((App.DESIGN_WIDTH - PICTURE_SIZE) / 2, 170, PICTURE_SIZE, PICTURE_SIZE);
                that.load(product.iconFile);

                SmartButton({
                    left: (App.DESIGN_WIDTH - 300) / 2,
                    top: 370,
                    width: 300,
                    height: 60,
                    labelText: "Add to my tasks",
                    style: { box: { color: App.colors.green, round: 8 }, hover: { color: "#52AE93" }, active: { color: "#4CA287" }, label: { fontSize: 20, textColor: Black(0.65) } },
                    onClick: function () {
                        TaskList.add("Buy " + product.title.toLowerCase());
                        sheet.close();
                        Notice.show({ messageText: "Added to your tasks.", type: "success" });
                    },
                });

            endBox();

        },
    });
};

App.addPage({

    id: "search",
    title: "Search",
    scroll: 0, // WHY: The list scrolls itself, under its search box.
    bottomBarLine: 1,

    create: function (box) {

        const SEARCH_AREA_HEIGHT = 105;
        const PRICE_UP_COLOR = "#41AC9F";
        const PRICE_DOWN_COLOR = "#FE5D49";
        const PRICE_SAME_COLOR = "#4A4A4A";
        const ARROW_SIZE = 28;

        let productList;

        // BOX: The search box
        startBox({ width: "100%", height: SEARCH_AREA_HEIGHT, color: "transparent" });
        that.shrink = 0;
            SearchInput({
                styleName: "original", // the first look of SearchInput
                left: App.BAR_SPACE,
                bottom: 20,
                width: App.DESIGN_WIDTH - App.BAR_SPACE * 2,
                height: 50,
                searchIconOpacity: 0.4,
                placeholder: "Search",
                searchIconFile: AppSettings.componentPath + "search-input/search.svg",
                clearIconFile: AppSettings.componentPath + "search-input/clear.svg",
                onChange: (self) => productList.search(self.getSearchText()),
            });
        endBox();

        // LIST: Products (the selected row is whitesmoke)
        productList = ItemList({
            width: "100%",
            height: "calc(100% - " + SEARCH_AREA_HEIGHT + "px)",
            items: ProductData.map((product) => ({ key: product.key, text: product.title, description: product.type, product: product })),
            selection: "single",
            scrollToSelected: 0,
            style: {
                box: { color: "transparent", border: 0, padding: [App.BAR_SPACE, 10] },
                list: { gap: 4 },
                row: { height: 90, padding: [10, 0], gap: 20, round: 13, color: "transparent", motion: "background-color 0.3s" },
                hover: { color: Black(0.04), lineColor: "" }, // WHY: "": no lines above and under the row (ozden has them).
                selected: { color: App.colors.whitesmoke, opacity: 1, canSelectAgain: 1 }, // WHY: 1: the selected product opens again
            },
            createItemView: createRow,
            onItemClick: (self, item) => ProductPreview.open(item.product),
        });

        // A row: the picture, the name and the type, the price and its arrow
        function createRow(item) {
            const product = item.product;

            Icon({ width: 70, height: 70, round: 4 });
            that.load(product.iconFile);
            that.shrink = 0;

            // GROUP: Texts
            VGroup({ width: "auto", height: "auto", align: "left center", grow: 1 });
                Label({ text: product.title, fontSize: 20, textColor: App.colors.text });
                Label({ text: product.type, fontSize: 14, textColor: "gray" });
            endGroup();

            // GROUP: Price
            HGroup({ width: "auto", height: "auto", align: "right center", gap: 2, css: { marginRight: "10px" } });
                createPrice(product);
            endGroup();
        }

        function createPrice(product) {
            const isUp = product.price > product.previousPrice;
            const isDown = product.price < product.previousPrice;
            let priceColor = PRICE_SAME_COLOR;
            if (isUp) priceColor = PRICE_UP_COLOR;
            if (isDown) priceColor = PRICE_DOWN_COLOR;

            Label({ text: "$" + product.price, fontSize: 24, textColor: priceColor });

            // ICON: The arrow (none for the same price: it keeps its place, so the prices stand in a line)
            Icon({ width: ARROW_SIZE, height: ARROW_SIZE, opacity: (isUp || isDown) ? 0.95 : 0 });
            if (isUp) that.load("assets/icons/arrow-rise.svg");
            if (isDown) that.load("assets/icons/arrow-drop.svg");
        }

    },

});
