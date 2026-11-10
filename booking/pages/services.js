/* Bismillah */

/*
SERVICES (a tab): the services with a search and the categories. params: { personId }: only the services of that person.
*/

"use strict";

App.addPage({

    id: "services",
    title: tx("Services"),

    create: function (box, params) {

        const ALL = "All";
        const person = params.personId ? Store.findPerson(params.personId) : null;
        const categories = [ALL, ...(person ? person.categories : Store.CATEGORIES)];
        let selectedCategory = ALL;
        let searchedText = "";

        const normalize = (text) => text.trim().toLocaleLowerCase(Texts.current).replace(/ı/g, "i");

        const getServices = function () {
            return Store.services.filter(function (service) {
                const isOfPerson = !person || person.categories.includes(service.category);
                const isInCategory = (selectedCategory === ALL || service.category === selectedCategory);
                const name = normalize(tx(service.name) + " " + service.name + " " + tx(service.note));
                return isOfPerson && isInCategory && name.includes(searchedText);
            });
        };

        const drawServices = function () {
            const services = getServices();
            results.children.forEach((child) => child.remove());
            createIn(results, function () {
                if (!services.length) BookingUI.empty(App.ICON_PATHS.search, tx("Nothing found"), tx("Try another word or category."));
                services.forEach((service) => BookingUI.serviceCard(service, params.personId));
            });
        };

        if (person) {
            HGroup({ width: "100%", height: "auto", gap: 12, align: "left center" });
                BookingUI.avatar(person, 44);
                BookingUI.title(person.name, 17).shrink = 1;
            endGroup();
        }

        SearchInput({
            styleName: "ozden",
            width: "100%",
            height: 48,
            fontSize: 16, // WHY: Safari on an iPhone zooms the whole page into a field with a smaller text.
            searchIconSize: 20,
            searchIconFile: AppSettings.componentPath + "search-input/search.svg",
            clearIconFile: AppSettings.componentPath + "search-input/clear-round.svg",
            placeholder: tx("Search services"),
            color: App.colors.surface,
            textColor: App.colors.text,
            borderColor: App.colors.line,
            onChange: function (self) {
                const text = self.getSearchText();
                searchedText = normalize(text);
                drawServices();
            },
        });

        BookingUI.createChoices(categories.map((category) => tx(category)), function (index) {
            selectedCategory = categories[index];
            drawServices();
        });

        const results = VGroup({ width: "100%", height: "auto", gap: 10, clipContent: 0 });
        endGroup();

        drawServices();

    },

});
