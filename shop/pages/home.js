/* Bismillah */

/*
HOME (a tab): the search, the offer of the shop, the categories, the products on sale and the new ones.
*/

"use strict";

App.addPage({

    id: "home",
    title: "Home",
    showBrand: 1,

    headerContent: function () {
        ShopUI.iconButton(App.ICON_PATHS.heart, tx("Favorites"), () => App.open("favorites"), false, 40);
    },

    create: function () {

        const CATEGORY_ICONS = { Bags: "bag", Shoes: "shoe", Living: "lamp", Tech: "headphones" };
        const FIRST_CODE = Object.keys(AppSettings.discountCodes)[0];

        const openStore = (params = {}) => App.open("shop", params);

        const createSearchEntry = function () {
            const entry = HGroup({ width: "100%", height: 48, gap: 10, padding: [16, 0], align: "left center",
                color: App.colors.surface, round: 24, border: 1, borderColor: App.colors.line });
            entry.role = "button";
            entry.tabIndex = 0;
            entry.aria = { label: tx("Search the store") };
                Icon({ width: 20, height: 20 }).load(App.makeIcon(App.ICON_PATHS.search, App.colors.softText));
                ShopUI.softText(tx("Search the store"), 15);
            endGroup();
            ShopUI.makePressable(entry, () => openStore({ focusSearch: 1 }));
        };

        const createOffer = function () {
            const offer = startBox({ width: "100%", height: 178, round: 20 });
            offer.css = { background: "linear-gradient(120deg, " + App.colors.accent + ", " + App.colors.heroEnd + ")" };
                Icon({ right: -18, bottom: -10, width: 132, height: 132 }).load(Store.getImage(Store.findProduct("sneaker"), "white"));
                VGroup({ left: 18, top: 16, width: "60%", height: "auto", gap: 5, align: "left top", clipContent: 0 });
                    Label({ plainText: tx("WELCOME OFFER"), fontSize: 10, bold: 1, textColor: App.colors.white,
                        css: { letterSpacing: "1px" } });
                    Label({ plainText: tx("10% off your first order"), width: "100%", fontSize: 20, bold: 1,
                        textColor: App.colors.white });
                    Label({ plainText: tx("Use the code {code} in your cart.", { code: FIRST_CODE }), width: "100%",
                        fontSize: 12, textColor: App.colors.white });
                    ShopUI.button(tx("Shop now"), () => openStore(), false, { width: "auto", height: 38 });
                endGroup();
            endBox();
        };

        const createCategoryTile = function (category) {
            const tile = VGroup({ width: "25%", shrink: 1, height: "auto", gap: 6, align: "center top", padding: [2, 10],
                color: App.colors.surface, round: 14 });
            tile.role = "button";
            tile.tabIndex = 0;
            tile.aria = { label: tx(category) };
                startBox({ width: 42, height: 42, round: 21, color: App.colors.accentSoft });
                    const icon = Icon({ width: 22, height: 22 });
                    icon.load(App.makeIcon(App.ICON_PATHS[CATEGORY_ICONS[category]], App.colors.accent));
                    icon.center();
                endBox();
                Label({ plainText: tx(category), width: "100%", textAlign: "center", fontSize: 12, textColor: App.colors.text });
            endGroup();
            ShopUI.makePressable(tile, () => openStore({ category: category }));
        };

        createSearchEntry();
        createOffer();

        ShopUI.section(tx("Categories"));
        HGroup({ width: "100%", height: "auto", gap: 8, align: "left top", clipContent: 0 });
            Store.CATEGORIES.forEach(createCategoryTile);
        endGroup();

        ShopUI.section(tx("On sale"), tx("See all"), () => openStore());
        ShopUI.productGrid(Store.getSaleProducts().slice(0, 2));

        ShopUI.section(tx("New arrivals"), tx("See all"), () => openStore());
        ShopUI.productGrid(Store.getNewProducts());

    },

});
