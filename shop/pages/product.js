/* Bismillah */

/*
PRODUCT (over the tabs): the picture, the color and the size, the description, the reviews. The add button is in a
fixed footer. params: { id }
*/

"use strict";

App.addPage({

    id: "product",
    title: (params) => tx(Store.findProduct(params.id).category),

    headerContent: function (params) {
        ShopUI.favoriteButton(Store.findProduct(params.id), { width: 40, height: 40 });
    },

    create: function (box, params, view) {

        const FOOTER_HEIGHT = 80;
        const REVIEWS = [
            { name: "Sam K.", rating: 5, text: "Better than I expected. I use it every day." },
            { name: "Dana R.", rating: 4, text: "Good quality and it arrived fast." },
        ];

        const product = Store.findProduct(params.id);
        let selectedColor = product.colors[0];
        let selectedSize = product.sizes[0] || "";
        let count = 1;

        const refreshFooter = function () {
            stepper.lblValue.plainText = String(count);
            btnAdd.setLabelText(tx("Add to cart") + "  ·  " + Store.money(product.price * count));
        };

        const paintSwatch = function (swatch) {
            const isSelected = (swatch.colorId === selectedColor);
            swatch.css = { boxShadow: isSelected ? "0 0 0 2px " + App.colors.background + ", 0 0 0 4px " + App.colors.accent : "none" };
            swatch.aria = { checked: isSelected };
        };

        const selectColor = function (colorId) {
            selectedColor = colorId;
            tile.image.load(Store.getImage(product, colorId));
            lblColor.plainText = tx("Color: {name}", { name: tx(Store.getColor(colorId).name) });
            swatches.forEach(paintSwatch);
        };

        const createSwatch = function (colorId) {
            const swatch = Box({ width: ShopUI.SWATCH_SIZE, height: ShopUI.SWATCH_SIZE, round: ShopUI.SWATCH_SIZE / 2,
                color: Store.getColor(colorId).hex, clickable: 1, cursor: "pointer" });
            swatch.colorId = colorId;
            swatch.role = "radio";
            swatch.tabIndex = 0;
            swatch.aria = { label: tx(Store.getColor(colorId).name) };
            swatch.on("click", () => selectColor(colorId));
            swatch.on("keydown", function (self, event) {
                if (event.key === "Enter") selectColor(colorId);
            });
            return swatch;
        };

        const createReview = function (review) {
            App.startCard({ padding: [14, 12], round: 14, gap: 4 });
                HGroup({ width: "100%", height: "auto", align: "left center", gap: 3 });
                    const name = ShopUI.title(review.name, 13);
                    name.shrink = 1;
                    for (let star = 0; star < review.rating; star++) {
                        Icon({ width: 13, height: 13, shrink: 0 }).load(App.makeIcon(App.ICON_PATHS.star, App.colors.star, App.colors.star));
                    }
                endGroup();
                ShopUI.softText(tx(review.text), 13);
            App.endCard();
        };

        const addToCart = function () {
            Store.addToCart(product, selectedColor, selectedSize, count);
            Toast.show({
                key: "added-to-cart",
                type: "success",
                messageText: tx("Added to cart"),
                action: { text: tx("View"), onClick: () => App.open("cart") },
            });
        };

        const getStockText = function () {
            if (product.stock <= Store.LOW_STOCK) return tx("Only {count} left", { count: product.stock });
            return tx("In stock");
        };

        // PICTURE:
        const tile = ShopUI.productImage(product, "100%", 280);
        if (product.oldPrice) createIn(tile, () => ShopUI.saleBadge(product));

        // NAME AND PRICE:
        VGroup({ width: "100%", height: "auto", gap: 6, align: "left top" });
            ShopUI.title(tx(product.name), 22);
            ShopUI.rating(product);
            HGroup({ width: "100%", height: "auto", align: "left center", gap: 8 });
                ShopUI.price(product, 20);
                Label({ plainText: getStockText(), grow: 1, textAlign: "right", fontSize: 12,
                    textColor: product.stock <= Store.LOW_STOCK ? App.colors.sale : App.colors.accent });
            endGroup();
        endGroup();

        // COLOR:
        VGroup({ width: "100%", height: "auto", gap: 10, clipContent: 0 });
            const lblColor = ShopUI.title("", 14);
            const swatches = [];
            HGroup({ width: "100%", height: "auto", gap: 14, padding: [4, 4], align: "left center", clipContent: 0 });
                product.colors.forEach((colorId) => swatches.push(createSwatch(colorId)));
            endGroup();
        endGroup();
        selectColor(selectedColor);

        // SIZE:
        if (product.sizes.length) {
            VGroup({ width: "100%", height: "auto", gap: 10, clipContent: 0 });
                ShopUI.title(tx("Size"), 14);
                ShopUI.createChoices(product.sizes, function (index) {
                    selectedSize = product.sizes[index];
                });
            endGroup();
        }

        // DESCRIPTION:
        VGroup({ width: "100%", height: "auto", gap: 6 });
            ShopUI.title(tx("Description"), 14);
            ShopUI.softText(tx(product.description), 14);
        endGroup();

        App.startCard({ padding: [14, 12], round: 14, gap: 8 });
            [["truck", tx("Free shipping over {amount}", { amount: Store.money(AppSettings.freeShippingFrom) })],
                ["refresh", tx("30-day free returns")]].forEach(function ([iconName, text]) {
                HGroup({ width: "100%", height: "auto", gap: 10, align: "left center" });
                    Icon({ width: 20, height: 20, shrink: 0 }).load(App.makeIcon(App.ICON_PATHS[iconName], App.colors.accent));
                    ShopUI.text(text, 13);
                endGroup();
            });
        App.endCard();

        // REVIEWS:
        ShopUI.section(tx("Reviews"));
        REVIEWS.forEach(createReview);

        // RELATED:
        ShopUI.section(tx("You may also like"));
        ShopUI.productGrid(Store.getRelatedProducts(product));

        // FOOTER:
        let stepper = null;
        let btnAdd = null;
        App.createFooter(view, FOOTER_HEIGHT, function () {
            stepper = ShopUI.stepper(count, tx(product.name), function () {
                count = Math.max(1, count - 1);
                refreshFooter();
            }, function () {
                count = Math.min(product.stock, count + 1);
                refreshFooter();
            });
            btnAdd = ShopUI.button(tx("Add to cart"), addToCart, true, { shrink: 1 });
        });
        refreshFooter();

    },

});
