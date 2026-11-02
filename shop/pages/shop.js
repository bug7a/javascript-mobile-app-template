/* Bismillah */

/*
SHOP (a tab): every product, with the search, the categories and the sorting. params: { category, focusSearch }
*/

"use strict";

App.addPage({

    id: "shop",
    title: tx("Shop"),

    create: function (box, params) {

        const ALL = "All";
        const CATEGORIES = [ALL, ...Store.CATEGORIES];
        const SORTS = [
            { name: "Most popular", compare: (a, b) => b.reviewCount - a.reviewCount },
            { name: "Price: low to high", compare: (a, b) => a.price - b.price },
            { name: "Price: high to low", compare: (a, b) => b.price - a.price },
            { name: "Top rated", compare: (a, b) => b.rating - a.rating },
        ];
        const SORT_SHEET_HEIGHT = 330;

        let selectedCategory = params.category || ALL;
        let selectedSort = SORTS[0];
        let searchedText = "";

        const normalize = (text) => text.trim().toLocaleLowerCase(Texts.current).replace(/ı/g, "i");

        const getProducts = function () {
            const matching = Store.products.filter(function (product) {
                const isInCategory = (selectedCategory === ALL || product.category === selectedCategory);
                const name = normalize(tx(product.name) + " " + product.name + " " + tx(product.category));
                return isInCategory && name.includes(searchedText);
            });
            return matching.sort(selectedSort.compare);
        };

        const drawProducts = function () {
            const products = getProducts();
            lblCount.plainText = tx("{count} products", { count: products.length });
            results.children.forEach((child) => child.remove());
            createIn(results, function () {
                if (products.length) {
                    ShopUI.productGrid(products);
                } else {
                    ShopUI.empty(App.ICON_PATHS.search, tx("Nothing found"), tx("Try another word or category."));
                }
            });
        };

        const selectSort = function (sort, sheet) {
            selectedSort = sort;
            btnSort.setText(tx("Sort") + ": " + tx(sort.name));
            sheet.close();
            drawProducts();
        };

        const openSortSheet = function () {
            const sheet = App.openSheet({
                titleText: tx("Sort by"),
                height: SORT_SHEET_HEIGHT,
                content: function () {
                    VGroup({ width: "100%", height: "auto", gap: 8, padding: [16, 12], clipContent: 0 });
                        SORTS.forEach(function (sort) {
                            ShopUI.optionCard(tx(sort.name), "", "", sort === selectedSort, () => selectSort(sort, sheet));
                        });
                    endGroup();
                },
            });
        };

        const search = SearchInput({
            styleName: "ozden",
            width: "100%",
            height: 48,
            fontSize: 16, // WHY: Safari on an iPhone zooms the whole page into a field with a smaller text.
            searchIconSize: 20,
            searchIconFile: AppSettings.componentPath + "search-input-v2/search.svg",
            clearIconFile: AppSettings.componentPath + "search-input-v2/clear-round.svg",
            placeholderText: tx("Search products"),
            color: App.colors.surface,
            textColor: App.colors.text,
            borderColor: App.colors.line,
            onSearch: function (text) {
                searchedText = normalize(text);
                drawProducts();
            },
        });

        ShopUI.createChoices(CATEGORIES.map((category) => tx(category)), function (index) {
            selectedCategory = CATEGORIES[index];
            drawProducts();
        }, CATEGORIES.indexOf(selectedCategory));

        HGroup({ width: "100%", height: "auto", align: "left center", gap: 8, clipContent: 0 });
            const lblCount = Label({ plainText: "", grow: 1, shrink: 1, fontSize: 13, textColor: App.colors.softText });
            const btnSort = ShopUI.linkButton(tx("Sort") + ": " + tx(selectedSort.name), openSortSheet);
        endGroup();

        const results = VGroup({ width: "100%", height: "auto", clipContent: 0 });
        endGroup();

        drawProducts();

        // WHY after(): a field can take the focus only when its page is on the screen.
        if (params.focusSearch) box.after(100, () => search.txtSearch.inputElement.focus());

    },

});
