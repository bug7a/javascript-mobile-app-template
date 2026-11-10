"use strict";
App.addPage({
    id: "menu", title: "Menü",
    create: function () {
        const CATEGORIES = ["Tümü", "Sıcak", "Soğuk", "Kahvesiz"];
        let selectedCategory = CATEGORIES[0];
        let searchText = "";

        const normalize = (text) => text.trim().toLocaleLowerCase("tr").replace(/ı/g, "i");

        CoffeeUI.heading("Bugün ne içelim?");
        CoffeeUI.text("Senin kahven, senin molan.", 14, App.colors.softText);
        const search = SearchInput({
            styleName: "ozden",
            width: "100%",
            height: 48,
            fontSize: 16, // WHY: Safari on an iPhone zooms the whole page into a field with a smaller text.
            searchIconSize: 20,
            searchIconFile: AppSettings.componentPath + "search-input/search.svg",
            clearIconFile: AppSettings.componentPath + "search-input/clear-round.svg",
            placeholder: "Bir kahve ara…",
            color: App.colors.surface,
            textColor: App.colors.text,
            borderColor: App.colors.line,
            onChange: function (self) {
                const text = self.getSearchText();
                searchText = normalize(text);
                drawProducts();
            },
        });
        search.txtSearch.inputElement.setAttribute("aria-label", "Menüde ara");
        HGroup({ width: "100%", height: "auto", gap: 6, wrap: 1, align: "left center", clipContent: 0 });
            CoffeeUI.createChoices(CATEGORIES, function (index) {
                selectedCategory = CATEGORIES[index];
                drawProducts();
            });
        endGroup();
        const results = VGroup({ width: "100%", height: "auto", gap: 14, clipContent: 0 });
        endGroup();

        function drawProducts() {
            results.children.forEach((child) => child.remove());
            const products = Store.products.filter(function (product) {
                const isInCategory = selectedCategory === CATEGORIES[0] || product.category === selectedCategory;
                return isInCategory && normalize(product.name + " " + product.note).includes(searchText);
            });
            createIn(results, function () {
                if (!products.length) CoffeeUI.empty("Bulamadık.", "Başka bir isim dene ya da kategoriyi değiştir.", 0);
                products.forEach(CoffeeUI.product);
            });
        }
        drawProducts();
    },
});
