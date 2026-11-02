/* Bismillah */

/*

Mobile App Template: Booking - The parts of the pages - v26.11

The small parts every page shares: texts, buttons, chips, the service row, the avatar, empty states.
The header of the app is here too (App.createHeader): the frame of the app stays the same as the other templates.

*/

"use strict";

const BookingUI = {};

BookingUI.BUTTON_ROUND = 12;
BookingUI.CHIP_ROUND = 20;

// *** TEXTS:

BookingUI.text = function (text, size = 14, color = App.colors.text) {
    return Label({ plainText: text, width: "100%", fontSize: size, textColor: color });
};

BookingUI.softText = function (text, size = 13) {
    return BookingUI.text(text, size, App.colors.softText);
};

BookingUI.title = function (text, size = 20) {
    const title = BookingUI.text(text, size);
    title.bold = 1;
    return title;
};

BookingUI.section = function (title, linkText, onClick) {
    HGroup({ width: "100%", height: "auto", align: "left center", gap: 8, clipContent: 0 });
        const titleLabel = BookingUI.title(title, 18);
        titleLabel.shrink = 1;
        if (linkText) BookingUI.linkButton(linkText, onClick);
    endGroup();
};

// A line of a card: a text at the left, its value at the right.
BookingUI.row = function (text, value) {
    HGroup({ width: "100%", height: "auto", align: "left top", gap: 12 });
        Label({ plainText: text, shrink: 0, fontSize: 14, textColor: App.colors.softText });
        Label({ plainText: value, grow: 1, shrink: 1, textAlign: "right", fontSize: 14, bold: 1, textColor: App.colors.text });
    endGroup();
};

// *** BUTTONS:

BookingUI.getButtonColors = function (primary) {
    const color = primary ? App.colors.accent : App.colors.accentSoft;
    const pressedColor = primary ? App.colors.accentPressed : App.colors.accentSoftPressed;
    return {
        box: { color: color },
        hover: { color: pressedColor },
        active: { color: pressedColor },
        label: { textColor: primary ? App.colors.white : App.colors.accentPressed },
    };
};

BookingUI.getButtonStyle = function (primary, round = BookingUI.BUTTON_ROUND) {
    const colors = BookingUI.getButtonColors(primary);
    return {
        ...colors,
        box: { ...colors.box, round: round, border: 0, boxShadow: "none" },
        label: { ...colors.label, fontSize: 15, fontFamily: "opensans-bold" },
        layout: { padding: [14, 0] },
    };
};

BookingUI.button = function (text, onClick, primary = true, params = {}) {
    return SmartButton({
        labelText: text, width: "100%", height: App.BUTTON_HEIGHT, onClick: onClick,
        style: BookingUI.getButtonStyle(primary),
        ...params,
    });
};

// A quiet button for what can not be taken back; the question comes after it.
BookingUI.dangerButton = function (text, onClick) {
    const style = BookingUI.getButtonStyle(false);
    return SmartButton({
        labelText: text, width: "100%", height: App.BUTTON_HEIGHT, onClick: onClick,
        style: { ...style, box: { ...style.box, color: "transparent" }, hover: { color: App.colors.disabled },
            active: { color: App.colors.disabled }, label: { ...style.label, textColor: App.colors.danger } },
    });
};

BookingUI.linkButton = function (text, onClick) {
    const style = BookingUI.getButtonStyle(false, 10);
    return SmartButton({
        labelText: text, width: "auto", height: 34, shrink: 0, onClick: onClick,
        style: { ...style, box: { ...style.box, color: "transparent" }, label: { ...style.label, fontSize: 13 },
            layout: { padding: [10, 0] } },
    });
};

BookingUI.iconButton = function (iconPath, ariaLabel, onClick, primary = false, size = 44) {
    const style = BookingUI.getButtonStyle(primary);
    return SmartButton({
        labelText: "",
        iconFile: App.makeIcon(iconPath, style.label.textColor),
        ariaLabel: ariaLabel,
        width: size, height: size, shrink: 0, onClick: onClick,
        style: { ...style, layout: { padding: [0, 0], iconSideTrim: 0 }, icon: { width: 20, height: 20, opacity: 1 } },
    });
};

// *** CHOICES:

BookingUI.chip = function (text, onClick, params = {}) {
    return SmartButton({
        labelText: text, width: "auto", height: 40, onClick: onClick,
        style: BookingUI.getButtonStyle(false, BookingUI.CHIP_ROUND),
        ...params,
    });
};

BookingUI.setSelected = function (button, isSelected) {
    const colors = BookingUI.getButtonColors(isSelected);
    // WHY: A touch screen keeps the hover look after a tap: a selected chip must not stay in its pressed color.
    if (isSelected) colors.hover = colors.box;
    button.setStyle(colors);
    button.aria = { pressed: isSelected };
};

// A row of chips with one selected. onSelect(index) comes after the look has changed.
BookingUI.createChoices = function (texts, onSelect, selectedIndex = 0) {
    const chips = [];
    const select = function (index) {
        chips.forEach((chip, each) => BookingUI.setSelected(chip, each === index));
        onSelect(index);
    };
    HGroup({ width: "100%", height: "auto", gap: 6, wrap: 1, align: "left center", clipContent: 0 });
        texts.forEach(function (text, index) {
            chips.push(BookingUI.chip(text, () => select(index)));
        });
    endGroup();
    chips.forEach((chip, each) => BookingUI.setSelected(chip, each === selectedIndex));
    return chips;
};

// *** CARDS:

// A card or a row that is pressed like a button. skipButton: an object of it with its own click.
BookingUI.makePressable = function (card, onPress, skipButton = null) {
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

BookingUI.iconCircle = function (iconPath, size = 42, primary = false) {
    const circle = startBox({ width: size, height: size, round: size / 2, shrink: 0,
        color: primary ? App.colors.accent : App.colors.accentSoft });
        const icon = Icon({ width: size * 0.52, height: size * 0.52 });
        icon.load(App.makeIcon(iconPath, primary ? App.colors.white : App.colors.accent));
        icon.center();
    endBox();
    return circle;
};

// A round picture of a person: the first letter on the color of the person. In a real app, load a photo here.
BookingUI.avatar = function (person, size = 56) {
    const avatar = startBox({ width: size, height: size, round: size / 2, shrink: 0, color: person.color });
        const letter = Label({ plainText: person.name.charAt(0), fontSize: size * 0.42, bold: 1, textColor: App.colors.white });
        letter.center();
    endBox();
    return avatar;
};

BookingUI.getDurationText = (minutes) => tx("{count} min", { count: minutes });

// A service: its name, its note, its time and price. personId: the person chosen before it, if any.
BookingUI.serviceCard = function (service, personId = "") {
    const openBooking = () => App.open("book", { serviceId: service.id, personId: personId });
    const card = App.startCard({ padding: [14, 12], round: 16, gap: 0, clipContent: 0 });
    card.role = "button";
    card.tabIndex = 0;
    card.aria = { label: tx("Book {name}", { name: tx(service.name) }) };
        HGroup({ width: "100%", height: "auto", gap: 12, align: "left center", clipContent: 0 });
            VGroup({ width: "100%", height: "auto", gap: 3, shrink: 1, align: "left top" });
                BookingUI.title(tx(service.name), 15);
                BookingUI.softText(tx(service.note), 12);
                BookingUI.softText(BookingUI.getDurationText(service.minutes) + "  ·  " + Store.money(service.price), 13).bold = 1;
            endGroup();
            const btnBook = BookingUI.iconButton(App.ICON_PATHS.plus, tx("Book {name}", { name: tx(service.name) }), openBooking, true, 38);
        endGroup();
    App.endCard();
    BookingUI.makePressable(card, openBooking, btnBook);
};

// *** STATES:

// An empty state: a dashed frame with an icon, centered.
BookingUI.empty = function (iconPath, title, description, buttonText, onClick) {
    const card = App.startCard({ color: "transparent", padding: [24, 28], gap: 10, align: "center top",
        border: 1, borderColor: App.colors.softText, round: 18 });
    card.css = { borderStyle: "dashed" };
        BookingUI.iconCircle(iconPath, 60);
        BookingUI.title(title, 17).textAlign = "center";
        BookingUI.softText(description, 14).textAlign = "center";
        if (buttonText) BookingUI.button(buttonText, onClick);
    App.endCard();
};

// *** THE HEADER:

// WHY: The frame of the app (app/app.js) keeps its navigation and safe areas; only its header gets the look of the app.
App.createHeader = function (view, isTab) {
    view.header = startBox(0, 0, "100%", App.getHeaderHeight(), { color: App.colors.background });
        HGroup({ top: App.safeArea.top, width: "100%", height: App.HEADER_HEIGHT,
            padding: [20, 0], align: "left center", gap: 10, clipContent: 0 });
            if (!isTab) BookingUI.createBackButton(view);
            BookingUI.createHeaderTitle(view, isTab);
        endGroup();
    endBox();
};

BookingUI.createBackButton = function (view) {
    BookingUI.iconButton(App.ICON_PATHS.back, tx("Back"), function () {
        // WHY only the page on top: a second tap while the page slides out closed the page under it too.
        if (App.openedViews[App.openedViews.length - 1] === view) App.goBack();
    }, false, 40);
};

BookingUI.createHeaderTitle = function (view, isTab) {
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
