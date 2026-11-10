/* Bismillah */

/*
HOME (a tab): the categories (a search box finds them), the cards of the selected category, a link card.
- A tap on a card selects it: it gets lighter, its name goes up and a stepper grows in; the price follows the count.
*/

"use strict";

const HomePage = {};

HomePage.GITHUB_URL = "https://github.com/bug7a/javascript-mobile-app-template";

HomePage.categories = [
    { key: "coffee", text: "Coffee", iconFile: "assets/categories/coffee.png", searchText: "Hot" },
    { key: "coffee-cup", text: "Coffee Cup", iconFile: "assets/categories/coffee-cup.png", searchText: "Hot" },
    { key: "iced-coffee", text: "Iced Coffee", iconFile: "assets/categories/iced-caffee.png", searchText: "Cold" },
    { key: "milkshake", text: "Milkshake", iconFile: "assets/categories/milkshake.png", searchText: "Cold" },
    { key: "chocolate", text: "Chocolate", iconFile: "assets/categories/chocolate-milk.png", searchText: "Cold" },
    { key: "cappuccino", text: "Cappuccino", iconFile: "assets/categories/cappuccino.png", searchText: "Hot" },
    { key: "tea", text: "Tea", iconFile: "assets/categories/tea.png", searchText: "Hot" },
    { key: "frappe", text: "Frappe", iconFile: "assets/categories/frappe.png", searchText: "Cold" },
    { key: "orange-juice", text: "Orange Juice", iconFile: "assets/categories/orange-juice.png", searchText: "Cold" },
];

// categories: the keys of the categories the card is in
HomePage.cards = [
    { title: "Dill", price: 3, iconFile: "assets/cards/dill.png", categories: ["orange-juice", "tea", "frappe"] },
    { title: "Fennel", price: 5, iconFile: "assets/cards/fennel.png", categories: ["frappe", "cappuccino", "tea", "iced-coffee"] },
    { title: "Juniper", price: 2, iconFile: "assets/cards/juniper.png", categories: ["tea", "chocolate"] },
    { title: "Olives", price: 7, iconFile: "assets/cards/olives.png", categories: ["cappuccino", "tea", "iced-coffee", "coffee"] },
    { title: "Oregano", price: 4, iconFile: "assets/cards/oregano.png", categories: ["chocolate", "iced-coffee", "tea", "coffee-cup"] },
    { title: "Pepper", price: 5, iconFile: "assets/cards/pepper.png", categories: ["milkshake", "coffee-cup", "coffee"] },
    { title: "Rosehip", price: 3, iconFile: "assets/cards/rosehip.png", categories: ["iced-coffee", "coffee", "tea", "milkshake"] },
];

// The selected cards and their counts stay while the app is open (a category shows its cards again)
HomePage.cardStates = {}; // title -> { isSelected, count }

HomePage.getCardsOf = function (categoryKey) {
    return HomePage.cards.filter((card) => card.categories.includes(categoryKey));
};

HomePage.getCardState = function (card) {
    if (!HomePage.cardStates[card.title]) HomePage.cardStates[card.title] = { isSelected: 0, count: 1 };
    return HomePage.cardStates[card.title];
};

App.addPage({

    id: "home",
    title: "Categories",
    color: App.colors.green,
    bottomBarLine: 0,

    create: function (box) {

        const CARD_AREA_HEIGHT = 400;
        const CARD_WIDTH = 346;
        const CARD_HEIGHT = 380;
        const CARD_GAP = 4;
        const CARD_MOTION = "background-color 0.3s, border-color 0.3s";
        // WHY always there, transparent: a border that comes and goes moves the content of the card inside it.
        const CARD_BORDER = 2;
        const CARD_HOVER_BORDER_COLOR = White(0.45);
        const CARD_SELECTED_BORDER_COLOR = White(0.8);
        const NAME_TOP = 290 - CARD_BORDER;
        const SELECTED_NAME_TOP = 260 - CARD_BORDER;
        const LINK_AREA_HEIGHT = 200;

        let categoryList;

        // HEADER: The title of the categories, with the search box
        const categoryTitle = PageHeader({ titleText: "Categories", showBack: 0 });
        createIn(categoryTitle, function () {
            SearchInput({
                styleName: "original", // the first look of SearchInput
                right: App.BAR_SPACE,
                bottom: 20,
                width: 200,
                height: 50,
                searchIconOpacity: 0.4,
                placeholder: "Search",
                searchIconFile: AppSettings.componentPath + "search-input/search.svg",
                clearIconFile: AppSettings.componentPath + "search-input/clear.svg",
                onChange: (self) => categoryList.search(self.getSearchText()),
            });
        });

        // LIST: The categories (the selected one: a bigger, colored icon and a bold name)
        categoryList = ItemList({
            width: "100%",
            height: 200,
            layout: "horizontal",
            items: HomePage.categories,
            selectedKeys: [HomePage.categories[0].key],
            style: {
                box: { color: "white", border: 0, round: 0 },
                tile: { listPadding: [10, 5] },
                scrollBar: { neverHide: 0 },
            },
            onChange: (self, selectedItems) => drawCards(selectedItems[0].key),
        });
        categoryList.shrink = 0;

        PageHeader({ titleText: "Cards", showBack: 0, color: Black(0.02) });

        // BOX: The cards (they scroll to the side)
        startBox({ width: "100%", height: CARD_AREA_HEIGHT, color: "transparent", scrollX: 1 });
        that.shrink = 0;
            const cardGroup = HGroup({ width: "max-content", height: "100%", align: "left top", gap: CARD_GAP, padding: [20, 0], clipContent: 0 });
            endGroup();
        endBox();

        createLinkCard();

        drawCards(HomePage.categories[0].key);

        // *** FUNCTIONS:

        // The cards of a category
        function drawCards(categoryKey) {
            cardGroup.children.forEach((card) => card.remove());
            createIn(cardGroup, function () {
                HomePage.getCardsOf(categoryKey).forEach(createCard);
            });
        }

        function createCard(card) {

            const state = HomePage.getCardState(card);
            let isCardHover = false;

            // BOX: The place of the card (the card stands 10 px lower in it)
            const place = startBox({ width: CARD_WIDTH, height: CARD_AREA_HEIGHT, color: "transparent", clipContent: 0 });

                // BOX: The card
                const cardBox = startBox(0, 10, CARD_WIDTH, CARD_HEIGHT, {
                    color: White(0.1),
                    round: 13,
                    border: CARD_BORDER,
                    borderColor: "transparent",
                    clickable: 1,
                    cursor: "pointer",
                    role: "button",
                    tabIndex: 0,
                    aria: { label: card.title },
                });
                cardBox.setMotion(CARD_MOTION);

                    // ICON: Picture
                    Icon(73 - CARD_BORDER, 40 - CARD_BORDER, 200, 200);
                    that.load(card.iconFile);

                    // LABEL: Name (it goes up when the card is selected)
                    const lblName = Label({ left: -CARD_BORDER, top: NAME_TOP, width: CARD_WIDTH, text: card.title, fontSize: 28, textAlign: "center", textColor: App.colors.text });
                    lblName.setMotion("top 0.3s");

                    // LABEL: Price (the price of the count)
                    const lblPrice = Label({ top: 10 - CARD_BORDER, right: 8 - CARD_BORDER, text: "", fontSize: 28, bold: 1, padding: [14, 4], round: 6, color: White(0.3), textColor: App.colors.text });

                    // STEPPER: The count (it grows in when the card is selected)
                    const stepper = Stepper({
                        left: ((CARD_WIDTH - 150) / 2) - CARD_BORDER,
                        top: 305 - CARD_BORDER,
                        width: 150,
                        height: 50,
                        value: state.count,
                        minValue: 1,
                        maxValue: 15,
                        ariaLabel: "Count of " + card.title,
                        style: {
                            box: { color: Black(0.08), border: 0, round: 25, padding: 4 },
                            button: { width: 42, color: Black(0.2), hoverColor: Black(0.25), activeColor: Black(0.3), border: 1, borderColor: Black(0.8), round: 21, iconColor: "#141414", iconSize: 16, disabledOpacity: 0.4 },
                            value: { fontSize: 22, textColor: App.colors.text },
                        },
                        onChange: function (self) {
                            state.count = self.value;
                            paintPrice();
                        },
                    });
                    stepper.setMotion("opacity 0.3s, transform 0.3s");

                endBox();

            endBox();

            const paintPrice = function () {
                lblPrice.text = "$" + (card.price * state.count);
            };

            const paintBorder = function () {
                if (state.isSelected) {
                    cardBox.borderColor = CARD_SELECTED_BORDER_COLOR;
                    return;
                }
                cardBox.borderColor = isCardHover ? CARD_HOVER_BORDER_COLOR : "transparent";
            };

            const paintSelection = function () {
                const isSelected = state.isSelected;
                cardBox.color = isSelected ? White(0.3) : White(0.1);
                paintBorder();
                lblName.top = isSelected ? SELECTED_NAME_TOP : NAME_TOP;
                stepper.opacity = isSelected ? 1 : 0;
                stepper.css = { transform: isSelected ? "scale(1)" : "scale(0.1)" };
                stepper.clickable = isSelected;
            };

            const toggleCard = function () {
                state.isSelected = state.isSelected ? 0 : 1;
                paintSelection();
            };

            cardBox.onHoverChange(function (self, isOver) {
                isCardHover = isOver;
                paintBorder();
            });
            cardBox.on("click", function (self, event) {
                // WHY: a tap on the stepper changes the count, it does not unselect the card
                if (stepper.elem.contains(event.target)) return;
                toggleCard();
            });
            cardBox.on("keydown", function (self, event) {
                if (event.target !== cardBox.elem) return;
                if (event.key == "Enter" || event.key == " ") toggleCard();
            });

            paintPrice();
            paintSelection();
            return place;

        }

        // The link to the page of the template
        function createLinkCard() {

            // BOX: The place of the card
            startBox({ width: "100%", height: LINK_AREA_HEIGHT, color: "transparent" });
            that.shrink = 0;

                // BOX: The card
                const linkCard = startBox(App.BAR_SPACE, 50, App.DESIGN_WIDTH - App.BAR_SPACE * 2, 100, {
                    color: Black(0.25),
                    round: 8,
                    clickable: 1,
                    cursor: "pointer",
                    role: "link",
                    tabIndex: 0,
                    aria: { label: "Download on Github" },
                });

                    // ICON: A big, faint download icon at the corner
                    Icon({ right: -20, top: -20, width: 100, height: 100, opacity: 0.15 });
                    that.load("assets/icons/download.svg");

                    Label({ left: 20, top: 15, text: "Download on Github", fontSize: 30, bold: 1, textColor: App.colors.green });
                    Label({ left: 20, top: 50, text: "This is open-source javascript mobile app template.", fontSize: 20, textColor: White(0.5) });

                endBox();
                linkCard.on("click", () => window.open(HomePage.GITHUB_URL, "_blank"));

            endBox();

        }

    },

});
