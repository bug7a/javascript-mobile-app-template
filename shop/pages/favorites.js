/* Bismillah */

/*
FAVORITES (over the tabs): the products with a heart. A heart taken away leaves the list at once.
*/

"use strict";

App.addPage({

    id: "favorites",
    title: tx("Favorites"),

    create: function (box) {

        const list = VGroup({ width: "100%", height: "auto", clipContent: 0 });
        endGroup();

        const drawList = function () {
            const products = Store.products.filter((product) => Store.isFavorite(product.id));
            list.children.forEach((child) => child.remove());
            createIn(list, function () {
                if (products.length) {
                    ShopUI.productGrid(products);
                    return;
                }
                ShopUI.empty(App.ICON_PATHS.heart, tx("No favorites yet"), tx("Tap a heart to keep a product here."),
                    tx("Go to the store"), () => App.open("shop"));
            });
        };

        box.listenTo(window, Store.EVENT, drawList);
        drawList();

    },

});
