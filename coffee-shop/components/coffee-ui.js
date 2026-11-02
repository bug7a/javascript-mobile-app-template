"use strict";

const CoffeeUI = {};

basic.addCss("coffee-heading-font", "@font-face { font-family: gelasio; src: url(assets/fonts/gelasio.ttf); " +
    "font-weight: 400 700; font-display: block; }");

CoffeeUI.STAMP_COUNT = 8;
CoffeeUI.BUTTON_ROUND = 13;
CoffeeUI.CHIP_ROUND = 21;

CoffeeUI.text = function (text, size = 15, color = App.colors.text) {
    return Label({ plainText: text, width: "100%", fontSize: size, textColor: color });
};

// A small title over a part: bold capitals, a little apart.
CoffeeUI.eyebrow = function (text, color = App.colors.orange) {
    return Label({ plainText: text, width: "100%", fontSize: 10, bold: 1, textColor: color,
        css: { letterSpacing: "1px" } });
};

// WHY pre-line: plainText keeps a "\n" of the text, but a label would show it as a space.
CoffeeUI.heading = function (text, size = 30) {
    return Label({ plainText: text, width: "100%", fontSize: size, bold: 1,
        fontFamily: AppSettings.headingFont, textColor: App.colors.text, css: { whiteSpace: "pre-line" } });
};

// The colors of a button in its three states: its look stays one package, also while it changes (setSelected).
CoffeeUI.getButtonColors = function (primary) {
    const color = primary ? App.colors.accent : App.colors.mint;
    const pressedColor = primary ? App.colors.accentPressed : App.colors.mintPressed;
    return {
        box: { color: color },
        hover: { color: pressedColor },
        active: { color: pressedColor },
        label: { textColor: primary ? App.colors.white : App.colors.text },
    };
};

CoffeeUI.getButtonStyle = function (primary, round) {
    const colors = CoffeeUI.getButtonColors(primary);
    return {
        ...colors,
        box: { ...colors.box, round: round, border: 0, boxShadow: "none" },
        label: { ...colors.label, fontSize: 14 },
        layout: { padding: [12, 0] },
    };
};

CoffeeUI.button = function (text, onClick, primary = false, params = {}) {
    return SmartButton({
        labelText: text, height: 48, width: "100%", onClick: onClick,
        style: CoffeeUI.getButtonStyle(primary, CoffeeUI.BUTTON_ROUND),
        ...params,
    });
};

// A button with only an icon: a typed "+" or "‹" was too small to see on its button.
CoffeeUI.iconButton = function (iconPath, ariaLabel, onClick, primary = false, size = 44) {
    const style = CoffeeUI.getButtonStyle(primary, CoffeeUI.BUTTON_ROUND);
    return SmartButton({
        labelText: "",
        iconFile: App.makeIcon(iconPath, style.label.textColor),
        ariaLabel: ariaLabel,
        width: size, height: size, shrink: 0, onClick: onClick,
        style: { ...style, layout: { padding: [0, 0], iconSideTrim: 0 }, icon: { width: 20, height: 20, opacity: 1 } },
    });
};

// A choice of a row: a pill that fills when it is selected. (Menu categories, the size of a drink)
CoffeeUI.chip = function (text, onClick, params = {}) {
    return SmartButton({
        labelText: text, height: 42, width: "auto", onClick: onClick,
        style: CoffeeUI.getButtonStyle(false, CoffeeUI.CHIP_ROUND),
        ...params,
    });
};

CoffeeUI.setSelected = function (button, isSelected) {
    const colors = CoffeeUI.getButtonColors(isSelected);
    // WHY: A touch screen keeps the hover look after a tap: a selected chip must not stay in its pressed color.
    if (isSelected) colors.hover = colors.box;
    button.setStyle(colors);
    button.aria = { pressed: isSelected };
};

// One selected chip of a list: chips[0] first. onSelect(index) comes after the look has changed.
CoffeeUI.createChoices = function (texts, onSelect, params = {}) {
    const chips = [];
    const select = function (selectedIndex) {
        chips.forEach((chip, index) => CoffeeUI.setSelected(chip, index === selectedIndex));
        onSelect(selectedIndex);
    };
    texts.forEach(function (text, index) {
        chips.push(CoffeeUI.chip(text, () => select(index), params));
    });
    chips.forEach((chip, index) => CoffeeUI.setSelected(chip, index === 0));
    return chips;
};

CoffeeUI.section = function (title, action, onClick) {
    HGroup({ height: "auto", width: "100%", align: "left center", gap: 8 });
        const heading = CoffeeUI.heading(title, 24);
        heading.grow = 1;
        heading.shrink = 1;
        if (action) CoffeeUI.button(action, onClick, false, { width: 92, height: 40, shrink: 0 });
    endGroup();
};

// − 2 + : the buttons of a count. minusIcon: a cart row shows a bin when one more tap removes it.
CoffeeUI.stepper = function (value, name, onMinus, onPlus, minusIcon = App.ICON_PATHS.minus) {
    const stepper = HGroup({ hug: 1, gap: 2, align: "left center", shrink: 0, clipContent: 0 });
        stepper.btnMinus = CoffeeUI.iconButton(minusIcon, name + " azalt", onMinus);
        stepper.lblValue = Label({ plainText: String(value), width: 30, textAlign: "center",
            fontSize: 16, bold: 1, textColor: App.colors.text });
        stepper.btnPlus = CoffeeUI.iconButton(App.ICON_PATHS.plus, name + " artır", onPlus);
    endGroup();
    return stepper;
};

// A round place on the card of the club, with a check when it is stamped.
CoffeeUI.createStamp = function (isStamped, size, isOnDark) {
    const stampedColor = isOnDark ? App.colors.peach : App.colors.accent;
    const emptyColor = isOnDark ? App.colors.accentSoft : App.colors.surface;
    const checkColor = isOnDark ? App.colors.accent : App.colors.white;
    const stamp = startBox({ width: size, height: size, round: size / 2, shrink: 0,
        color: isStamped ? stampedColor : emptyColor });
        if (isStamped) {
            const checkSize = size * 0.6;
            const check = Icon({ width: checkSize, height: checkSize });
            check.load(App.makeIcon(App.ICON_PATHS.check, checkColor));
            check.center();
        }
    endBox();
    return stamp;
};

CoffeeUI.stamps = function (count, size = 26, isOnDark = false) {
    const row = HGroup({ width: "100%", height: "auto", justify: "space-between", align: "left center" });
    row.role = "img";
    row.aria = { label: count + " / " + CoffeeUI.STAMP_COUNT + " damga" };
        for (let index = 0; index < CoffeeUI.STAMP_COUNT; index++) {
            CoffeeUI.createStamp(index < count, size, isOnDark);
        }
    endGroup();
    return row;
};

// The picture of a drink on its soft ground
CoffeeUI.drinkImage = function (imageFile, width, height) {
    const ground = startBox({ width: width, height: height, round: 15, color: App.colors.background, shrink: 0 });
        const image = Icon({ width: width, height: width * 280 / 300 }); // WHY: the drawings are 300 x 280
        image.load(imageFile);
        image.center();
    endBox();
    return ground;
};

// A card that is pressed like a button: its objects stay inside, it scales a little.
CoffeeUI.makeCardPressable = function (card, onPress, skipButton) {
    const setPressed = function (isPressed) {
        card.css = { transform: isPressed ? "scale(0.98)" : "none" };
    };
    card.clickable = 1;
    card.cursor = "pointer";
    card.setMotion("transform 0.15s");
    card.on("pointerdown", () => setPressed(true));
    ["pointerup", "pointerleave", "pointercancel"].forEach((name) => card.on(name, () => setPressed(false)));
    card.on("click", function (self, event) {
        if (skipButton.elem.contains(event.target)) return; // WHY: the button runs onPress itself
        onPress();
    });
};

CoffeeUI.product = function (product) {
    const openDrink = () => App.open("drink", { id: product.id });
    const card = App.startCard({ padding: [12, 12], round: 20, gap: 8,
        border: 1, borderColor: App.colors.line });
        HGroup({ width: "100%", height: "auto", align: "left center", gap: 12 });
            CoffeeUI.drinkImage(product.image, 100, 112);
            VGroup({ width: "100%", height: "auto", gap: 6, shrink: 1 });
                CoffeeUI.eyebrow(product.category.toLocaleUpperCase("tr"));
                CoffeeUI.heading(product.name, 19);
                CoffeeUI.text(product.note, 12, App.colors.softText);
                HGroup({ width: "100%", height: 38, align: "left center", gap: 6, clipContent: 0 });
                    Label({ plainText: Store.money(product.price), fontSize: 16, bold: 1,
                        textColor: App.colors.text, grow: 1 });
                    const btnOpen = CoffeeUI.iconButton(App.ICON_PATHS.plus,
                        product.name + " seçeneklerini aç", openDrink, true, 38);
                endGroup();
            endGroup();
        endGroup();
    App.endCard();
    CoffeeUI.makeCardPressable(card, openDrink, btnOpen);
};

// An empty state: a dashed frame with a drawing, centered. withMenuButton: 0 when the answer is on the same page.
CoffeeUI.empty = function (title, description, withMenuButton = 1) {
    const card = App.startCard({ color: "transparent", padding: [24, 28], gap: 12, align: "center top",
        border: 1, borderColor: App.colors.softText, round: 20 });
    card.css = { borderStyle: "dashed" };
        Icon({ width: 96, height: 90 }).load("assets/coffee-art/latte.svg");
        CoffeeUI.heading(title, 22).textAlign = "center";
        CoffeeUI.text(description, 14, App.colors.softText).textAlign = "center";
        if (withMenuButton) CoffeeUI.button("Menüyü keşfet", () => App.open("menu"), true);
    App.endCard();
};

// A short line of a card: a text at the left, its value at the right.
CoffeeUI.row = function (text, value, size = 14) {
    HGroup({ width: "100%", height: "auto", align: "left center", gap: 8 });
        Label({ plainText: text, grow: 1, shrink: 1, fontSize: size, textColor: App.colors.softText });
        Label({ plainText: value, fontSize: size, bold: 1, textColor: App.colors.text, shrink: 0 });
    endGroup();
};

// WHY: The original shell keeps its navigation and safe areas; only its header gets the coffee identity.
App.createHeader = function (view, isTab) {
    view.header = startBox(0, 0, "100%", App.getHeaderHeight(), { color: App.colors.background });
        HGroup({ top: App.safeArea.top, width: "100%", height: App.HEADER_HEIGHT,
            padding: [20, 0], align: "left center", gap: 10, clipContent: 0 });
            if (isTab) {
                CoffeeUI.createBrandHeader();
            } else {
                CoffeeUI.createPageHeader(view);
            }
        endGroup();
    endBox();
};

CoffeeUI.createBrandHeader = function () {
    Label({ text: "mola<span style='font-weight:normal'> coffee.</span>", fontFamily: AppSettings.headingFont,
        fontSize: 26, bold: 1, textColor: App.colors.text, grow: 1 });
    // WHY nowrap: a small phone broke it into two lines.
    Label({ plainText: "COFFEE & SLOW DAYS", fontSize: 9, textColor: App.colors.softText,
        css: { letterSpacing: "0.5px", whiteSpace: "nowrap" } });
};

CoffeeUI.createPageHeader = function (view) {
    CoffeeUI.iconButton(App.ICON_PATHS.back, "Geri", function () {
        // WHY only the page on top: a second tap while the page slides out closed the page under it too.
        if (App.openedViews[App.openedViews.length - 1] === view) App.goBack();
    }, false, 40);
    Label({ plainText: view.appPage.title, fontFamily: AppSettings.headingFont, fontSize: 21, bold: 1,
        textColor: App.colors.text, ellipsis: 1, grow: 1, shrink: 1, css: { minWidth: "0px" } });
};
