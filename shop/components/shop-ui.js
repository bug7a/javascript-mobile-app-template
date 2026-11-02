/* Bismillah */

/*

Mobile App Template: Shop - The parts of the pages - v26.11

The small parts every page of the shop shares: texts, buttons, choices, the product card, the price, empty states.
The header of the app is here too (App.createHeader): the frame of the app stays the same as the other templates.

*/

"use strict";

const ShopUI = {};

ShopUI.BUTTON_ROUND = 12;
ShopUI.CHIP_ROUND = 21;
ShopUI.PRODUCT_TILE_HEIGHT = 156;
ShopUI.GRID_GAP = 12;
ShopUI.SWATCH_SIZE = 34;

// *** TEXTS:

ShopUI.text = function (text, size = 14, color = App.colors.text) {
    return Label({ plainText: text, width: "100%", fontSize: size, textColor: color });
};

ShopUI.softText = function (text, size = 13) {
    return ShopUI.text(text, size, App.colors.softText);
};

ShopUI.title = function (text, size = 20) {
    const title = ShopUI.text(text, size);
    title.bold = 1;
    return title;
};

// A title and an optional link at its right: the start of a part of a page.
ShopUI.section = function (title, linkText, onClick) {
    HGroup({ width: "100%", height: "auto", align: "left center", gap: 8, clipContent: 0 });
        const titleLabel = ShopUI.title(title, 18);
        titleLabel.shrink = 1;
        if (linkText) ShopUI.linkButton(linkText, onClick);
    endGroup();
};

// A line of a card: a text at the left, its value at the right.
ShopUI.row = function (text, value, isStrong = false) {
    const size = isStrong ? 16 : 14;
    const textColor = isStrong ? App.colors.text : App.colors.softText;
    HGroup({ width: "100%", height: "auto", align: "left center", gap: 8 });
        Label({ plainText: text, grow: 1, shrink: 1, fontSize: size, bold: isStrong ? 1 : 0, textColor: textColor });
        Label({ plainText: value, shrink: 0, fontSize: size, bold: 1, textColor: App.colors.text });
    endGroup();
};

// *** BUTTONS:

ShopUI.getButtonColors = function (primary) {
    const color = primary ? App.colors.accent : App.colors.accentSoft;
    const pressedColor = primary ? App.colors.accentPressed : App.colors.accentSoftPressed;
    return {
        box: { color: color },
        hover: { color: pressedColor },
        active: { color: pressedColor },
        label: { textColor: primary ? App.colors.white : App.colors.accentPressed },
    };
};

ShopUI.getButtonStyle = function (primary, round = ShopUI.BUTTON_ROUND) {
    const colors = ShopUI.getButtonColors(primary);
    return {
        ...colors,
        box: { ...colors.box, round: round, border: 0, boxShadow: "none" },
        label: { ...colors.label, fontSize: 15, fontFamily: "opensans-bold" },
        layout: { padding: [14, 0] },
    };
};

ShopUI.button = function (text, onClick, primary = true, params = {}) {
    return SmartButton({
        labelText: text, width: "100%", height: App.BUTTON_HEIGHT, onClick: onClick,
        style: ShopUI.getButtonStyle(primary),
        ...params,
    });
};

ShopUI.linkButton = function (text, onClick) {
    const style = ShopUI.getButtonStyle(false, 10);
    return SmartButton({
        labelText: text, width: "auto", height: 34, shrink: 0, onClick: onClick,
        style: { ...style, box: { ...style.box, color: "transparent" }, label: { ...style.label, fontSize: 13 },
            layout: { padding: [10, 0] } },
    });
};

ShopUI.iconButton = function (iconPath, ariaLabel, onClick, primary = false, size = 44) {
    const style = ShopUI.getButtonStyle(primary);
    return SmartButton({
        labelText: "",
        iconFile: App.makeIcon(iconPath, style.label.textColor),
        ariaLabel: ariaLabel,
        width: size, height: size, shrink: 0, onClick: onClick,
        style: { ...style, layout: { padding: [0, 0], iconSideTrim: 0 }, icon: { width: 20, height: 20, opacity: 1 } },
    });
};

// *** CHOICES:

ShopUI.chip = function (text, onClick, params = {}) {
    return SmartButton({
        labelText: text, width: "auto", height: 40, onClick: onClick,
        style: ShopUI.getButtonStyle(false, ShopUI.CHIP_ROUND),
        ...params,
    });
};

ShopUI.setSelected = function (button, isSelected) {
    const colors = ShopUI.getButtonColors(isSelected);
    // WHY: A touch screen keeps the hover look after a tap: a selected chip must not stay in its pressed color.
    if (isSelected) colors.hover = colors.box;
    button.setStyle(colors);
    button.aria = { pressed: isSelected };
};

// A row of chips with one selected. onSelect(index) comes after the look has changed.
ShopUI.createChoices = function (texts, onSelect, selectedIndex = 0) {
    const chips = [];
    const select = function (index) {
        chips.forEach((chip, each) => ShopUI.setSelected(chip, each === index));
        onSelect(index);
    };
    HGroup({ width: "100%", height: "auto", gap: 6, wrap: 1, align: "left center", clipContent: 0 });
        texts.forEach(function (text, index) {
            chips.push(ShopUI.chip(text, () => select(index)));
        });
    endGroup();
    chips.forEach((chip, each) => ShopUI.setSelected(chip, each === selectedIndex));
    return chips;
};

// A big choice of a list: a title and a note at the left, a round mark at the right. Its card is the button.
ShopUI.optionCard = function (title, note, value, isSelected, onClick) {
    const borderColor = isSelected ? App.colors.accent : App.colors.line;
    const card = App.startCard({ padding: [14, 12], round: 14, gap: 2, border: isSelected ? 2 : 1, borderColor: borderColor });
    card.role = "radio";
    card.aria = { checked: isSelected };
    card.tabIndex = 0;
        HGroup({ width: "100%", height: "auto", align: "left center", gap: 10 });
            VGroup({ width: "100%", height: "auto", gap: 2, shrink: 1 });
                ShopUI.title(title, 14);
                if (note) ShopUI.softText(note, 12).css = { whiteSpace: "pre-line" }; // WHY: an address has two lines
            endGroup();
            if (value) Label({ plainText: value, fontSize: 14, bold: 1, textColor: App.colors.text, shrink: 0 });
        endGroup();
    App.endCard();
    ShopUI.makePressable(card, onClick);
    return card;
};

// − 2 + : the count of a product. minusIcon: a cart line shows a bin when one more tap removes it.
ShopUI.stepper = function (value, name, onMinus, onPlus, minusIcon = App.ICON_PATHS.minus) {
    const stepper = HGroup({ hug: 1, gap: 2, align: "left center", shrink: 0, clipContent: 0 });
        stepper.btnMinus = ShopUI.iconButton(minusIcon, tx("{name}, decrease", { name: name }), onMinus);
        stepper.lblValue = Label({ plainText: String(value), width: 30, textAlign: "center",
            fontSize: 16, bold: 1, textColor: App.colors.text });
        stepper.btnPlus = ShopUI.iconButton(App.ICON_PATHS.plus, tx("{name}, increase", { name: name }), onPlus);
    endGroup();
    return stepper;
};

// *** THE PRODUCT:

// A card or a row that is pressed like a button. skipButton: an object of it with its own click.
ShopUI.makePressable = function (card, onPress, skipButton = null) {
    const setPressed = function (isPressed) {
        card.css = { transform: isPressed ? "scale(0.98)" : "none" };
    };
    card.clickable = 1;
    card.cursor = "pointer";
    card.setMotion("transform 0.15s");
    card.on("pointerdown", () => setPressed(true));
    ["pointerup", "pointerleave", "pointercancel"].forEach((name) => card.on(name, () => setPressed(false)));
    card.on("click", function (self, event) {
        if (skipButton && skipButton.elem.contains(event.target)) return;
        onPress();
    });
    card.on("keydown", function (self, event) {
        if (event.key === "Enter" && event.target === card.elem) onPress();
    });
};

ShopUI.productImage = function (product, width, height, colorId) {
    const tile = startBox({ width: width, height: height, round: 14, color: product.tint, shrink: 0 });
        tile.image = Icon({ width: "86%", height: "86%" });
        tile.image.load(Store.getImage(product, colorId));
        tile.image.center();
    endBox();
    return tile;
};

ShopUI.saleBadge = function (product) {
    const percent = Math.round((1 - (product.price / product.oldPrice)) * 100);
    return Label({ left: 8, top: 8, plainText: "-" + percent + "%", color: App.colors.sale, textColor: App.colors.white,
        fontSize: 11, bold: 1, round: 8, padding: [7, 3] });
};

// The heart of a product: it follows the favorites, also when another page changes them.
ShopUI.favoriteButton = function (product, params = {}) {
    const getIcon = function () {
        const isFavorite = Store.isFavorite(product.id);
        return App.makeIcon(App.ICON_PATHS.heart, isFavorite ? App.colors.sale : App.colors.softText,
            isFavorite ? App.colors.sale : "none");
    };
    const getName = () => tx(Store.isFavorite(product.id) ? "Remove from favorites" : "Add to favorites");
    const button = SmartButton({
        labelText: "", iconFile: getIcon(), ariaLabel: getName(),
        width: 36, height: 36, shrink: 0,
        onClick: () => Store.toggleFavorite(product.id),
        style: {
            box: { color: App.colors.surface, round: 18, border: 0, boxShadow: "none" },
            hover: { color: App.colors.surface }, active: { color: App.colors.line },
            layout: { padding: [0, 0], iconSideTrim: 0 }, icon: { width: 19, height: 19, opacity: 1 },
        },
        ...params,
    });
    button.listenTo(window, Store.EVENT, function () {
        button.setIcon(getIcon());
        button.ariaLabel = getName();
    });
    return button;
};

ShopUI.rating = function (product) {
    HGroup({ hug: 1, gap: 3, align: "left center" });
        Icon({ width: 14, height: 14 }).load(App.makeIcon(App.ICON_PATHS.star, App.colors.star, App.colors.star));
        Label({ plainText: product.rating.toFixed(1), fontSize: 12, bold: 1, textColor: App.colors.text });
        Label({ plainText: "(" + product.reviewCount + ")", fontSize: 12, textColor: App.colors.softText });
    endGroup();
};

ShopUI.price = function (product, size = 16) {
    HGroup({ hug: 1, gap: 6, align: "left center" });
        Label({ plainText: Store.money(product.price), fontSize: size, bold: 1,
            textColor: product.oldPrice ? App.colors.sale : App.colors.text });
        if (product.oldPrice) {
            Label({ plainText: Store.money(product.oldPrice), fontSize: size - 3, textColor: App.colors.softText,
                css: { textDecoration: "line-through" } });
        }
    endGroup();
};

// A card of the grid: it fills its half of the row.
ShopUI.productCard = function (product) {
    const openProduct = () => App.open("product", { id: product.id });
    const card = App.startCard({ width: "50%", shrink: 1, padding: [8, 8], gap: 7, round: 18, clipContent: 0 });
    card.role = "link";
    card.tabIndex = 0;
    card.aria = { label: tx("Open {name}", { name: tx(product.name) }) };
        const tile = ShopUI.productImage(product, "100%", ShopUI.PRODUCT_TILE_HEIGHT);
        let btnFavorite = null;
        createIn(tile, function () {
            if (product.oldPrice) ShopUI.saleBadge(product);
            btnFavorite = ShopUI.favoriteButton(product, { right: 6, top: 6 });
        });
        VGroup({ width: "100%", height: "auto", gap: 3, padding: [4, 2], align: "left top" });
            const name = ShopUI.title(tx(product.name), 13);
            name.ellipsis = 1;
            ShopUI.rating(product);
            ShopUI.price(product);
        endGroup();
    App.endCard();
    ShopUI.makePressable(card, openProduct, btnFavorite);
};

// WHY rows of two and not wrap: both cards of a row are as wide on every phone, also a last card alone.
ShopUI.productGrid = function (products) {
    const grid = VGroup({ width: "100%", height: "auto", gap: ShopUI.GRID_GAP, clipContent: 0 });
        for (let index = 0; index < products.length; index += 2) {
            HGroup({ width: "100%", height: "auto", gap: ShopUI.GRID_GAP, align: "left top", clipContent: 0 });
                ShopUI.productCard(products[index]);
                if (products[index + 1]) {
                    ShopUI.productCard(products[index + 1]);
                } else {
                    Box({ width: "50%", shrink: 1, height: 1, color: "transparent" });
                }
            endGroup();
        }
    endGroup();
    return grid;
};

// *** STATES:

// An empty state: a dashed frame with an icon, centered.
ShopUI.empty = function (iconPath, title, description, buttonText, onClick) {
    const card = App.startCard({ color: "transparent", padding: [24, 30], gap: 10, align: "center top",
        border: 1, borderColor: App.colors.softText, round: 18 });
    card.css = { borderStyle: "dashed" };
        startBox({ width: 64, height: 64, round: 32, color: App.colors.accentSoft });
            const icon = Icon({ width: 28, height: 28 });
            icon.load(App.makeIcon(iconPath, App.colors.accent));
            icon.center();
        endBox();
        ShopUI.title(title, 17).textAlign = "center";
        ShopUI.softText(description, 14).textAlign = "center";
        if (buttonText) ShopUI.button(buttonText, onClick);
    App.endCard();
};

// *** THE HEADER:

// WHY: The frame of the app (app/app.js) keeps its navigation and safe areas; only its header gets the look of the shop.
App.createHeader = function (view, isTab) {
    view.header = startBox(0, 0, "100%", App.getHeaderHeight(), { color: App.colors.background });
        HGroup({ top: App.safeArea.top, width: "100%", height: App.HEADER_HEIGHT,
            padding: [20, 0], align: "left center", gap: 10, clipContent: 0 });
            if (!isTab) ShopUI.createBackButton(view);
            ShopUI.createHeaderTitle(view, isTab);
            if (view.appPage.headerContent) view.appPage.headerContent(view.params, view);
        endGroup();
    endBox();
};

ShopUI.createBackButton = function (view) {
    ShopUI.iconButton(App.ICON_PATHS.back, tx("Back"), function () {
        // WHY only the page on top: a second tap while the page slides out closed the page under it too.
        if (App.openedViews[App.openedViews.length - 1] === view) App.goBack();
    }, false, 40);
};

ShopUI.createHeaderTitle = function (view, isTab) {
    const appPage = view.appPage;
    const title = (typeof appPage.title === "function") ? appPage.title(view.params) : appPage.title;
    const isBrand = (isTab && appPage.showBrand);
    Label({
        plainText: isBrand ? AppSettings.appName : title,
        fontSize: isBrand ? 26 : 21,
        bold: 1,
        textColor: isBrand ? App.colors.accent : App.colors.text,
        ellipsis: 1, grow: 1, shrink: 1, css: { minWidth: "0px" },
    });
};
