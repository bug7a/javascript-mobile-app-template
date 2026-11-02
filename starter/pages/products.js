/* Bismillah */

/*
PRODUCTS (a tab): a list with a search box. A row opens the product page (pages/product.js).
*/

"use strict";

// The data of the list (it may come from a server: App.wait(fetch(...)))
const ProductData = [
    { key: "broccoli", title: "Broccoli", type: "Vegetable", price: 4, iconFile: "assets/products/brokoli.png" },
    { key: "strawberry", title: "Strawberry", type: "Fruit", price: 8, iconFile: "assets/products/cilek.png" },
    { key: "tomato", title: "Tomato", type: "Vegetable", price: 3, iconFile: "assets/products/domates.png" },
    { key: "apple", title: "Apple", type: "Fruit", price: 2, iconFile: "assets/products/elma.png" },
    { key: "carrot", title: "Carrot", type: "Vegetable", price: 6, iconFile: "assets/products/havuc.png" },
    { key: "watermelon", title: "Watermelon", type: "Fruit", price: 5, iconFile: "assets/products/karpuz.png" },
    { key: "lemon", title: "Lemon", type: "Fruit", price: 7, iconFile: "assets/products/limon.png" },
    { key: "banana", title: "Banana", type: "Fruit", price: 12, iconFile: "assets/products/muz.png" },
    { key: "pomegranate", title: "Pomegranate", type: "Fruit", price: 13, iconFile: "assets/products/nar.png" },
    { key: "eggplant", title: "Eggplant", type: "Vegetable", price: 5, iconFile: "assets/products/patlican.png" },
    { key: "blueberry", title: "Blueberry", type: "Fruit", price: 17, iconFile: "assets/products/yabanmersini.png" },
    { key: "pepper", title: "Green Pepper", type: "Vegetable", price: 6, iconFile: "assets/products/yesilbiber.png" },
];

App.addPage({

    id: "products",
    title: "Products",
    scroll: 0, // WHY: The list scrolls itself, under its search box.

    create: function (box) {

        // LIST: Products
        ItemList({
            width: "100%",
            height: "100%",
            items: ProductData.map((product) => ({
                key: product.key,
                title: product.title,
                desc: product.type + " · $" + product.price,
                iconFile: product.iconFile,
                searchText: product.type,
                product: product,
            })),
            selection: "none",
            showSearch: 1,
            searchParams: {
                styleName: "ozden",
                placeholderText: "Search",
                searchIconFile: AppSettings.componentPath + "search-input-v2/search.svg",
                clearIconFile: AppSettings.componentPath + "search-input-v2/clear-round.svg",
            },
            style: { box: { border: 0 } },
            onItemClick: function (self, item) {
                App.open("product", { item: item.product });
            },
        });

    },

});
