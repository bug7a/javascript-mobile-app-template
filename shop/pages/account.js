/* Bismillah */

/*
ACCOUNT (a tab): the orders, the favorites, the addresses, the language and the reset of the demo.
ADDRESSES and ADDRESS-EDIT (over the tabs): the saved addresses and a new one.
*/

"use strict";

App.addPage({

    id: "account",
    title: tx("Account"),

    create: function (box) {

        const AVATAR_SIZE = 56;
        const LANGUAGE_SHEET_HEIGHT = 240;

        box.listenTo(window, Store.EVENT, App.refreshTab);

        const createMenuRow = function (iconPath, text, value, onClick, color = App.colors.text) {
            const row = HGroup({ width: "100%", height: 52, gap: 12, align: "left center", padding: [14, 0] });
            row.role = "button";
            row.tabIndex = 0;
                Icon({ width: 21, height: 21, shrink: 0 }).load(App.makeIcon(iconPath, color));
                Label({ plainText: text, grow: 1, shrink: 1, fontSize: 15, textColor: color });
                if (value !== "") Label({ plainText: String(value), fontSize: 13, shrink: 0, textColor: App.colors.softText });
                Icon({ width: 16, height: 16, shrink: 0 }).load(App.makeIcon(App.ICON_PATHS.next, App.colors.softText));
            endGroup();
            ShopUI.makePressable(row, onClick);
        };

        const openLanguageSheet = function () {
            App.openSheet({
                titleText: tx("Language"),
                height: LANGUAGE_SHEET_HEIGHT,
                content: function () {
                    VGroup({ width: "100%", height: "auto", gap: 8, padding: [16, 12], clipContent: 0 });
                        Object.keys(Texts.languages).forEach(function (language) {
                            ShopUI.optionCard(Texts.languages[language], "", "", language === Texts.current,
                                () => Texts.setLanguage(language));
                        });
                    endGroup();
                },
            });
        };

        const askResetDemo = async function () {
            const isSure = await Dialog.confirm({
                titleText: tx("Reset the demo data?"),
                messageText: tx("The cart, the favorites, the orders and the addresses go back to the start."),
                confirmText: tx("Reset"),
                cancelText: tx("Cancel"),
                danger: 1,
            });
            if (isSure) Store.resetDemoData();
        };

        HGroup({ width: "100%", height: "auto", gap: 14, align: "left center" });
            startBox({ width: AVATAR_SIZE, height: AVATAR_SIZE, round: AVATAR_SIZE / 2, color: App.colors.accentSoft, shrink: 0 });
                const avatar = Icon({ width: 28, height: 28 });
                avatar.load(App.makeIcon(App.ICON_PATHS.user, App.colors.accent));
                avatar.center();
            endBox();
            VGroup({ width: "100%", height: "auto", gap: 2, shrink: 1 });
                ShopUI.title(Store.FIRST_ADDRESS.name, 18);
                ShopUI.softText(tx("Demo account"), 13);
            endGroup();
        endGroup();

        App.startCard({ padding: [0, 4], round: 14, gap: 0 });
            createMenuRow(App.ICON_PATHS.box, tx("My orders"), Store.orders.length, () => App.open("orders"));
            createMenuRow(App.ICON_PATHS.heart, tx("Favorites"), Store.favorites.length, () => App.open("favorites"));
            createMenuRow(App.ICON_PATHS.pin, tx("Addresses"), Store.addresses.length, () => App.open("addresses"));
        App.endCard();

        App.startCard({ padding: [0, 4], round: 14, gap: 0 });
            createMenuRow(App.ICON_PATHS.globe, tx("Language"), Texts.languages[Texts.current], openLanguageSheet);
            createMenuRow(App.ICON_PATHS.trash, tx("Reset the demo data"), "", askResetDemo, App.colors.danger);
        App.endCard();

    },

});

App.addPage({

    id: "addresses",
    title: tx("Addresses"),

    create: function (box, params, view) {

        const FOOTER_HEIGHT = 80;

        const list = VGroup({ width: "100%", height: "auto", gap: 10, clipContent: 0 });
        endGroup();

        const askDeleteAddress = async function (address) {
            const isSure = await Dialog.confirm({
                titleText: tx("Delete this address?"),
                messageText: address.street + ", " + address.city,
                confirmText: tx("Delete"),
                cancelText: tx("Cancel"),
                danger: 1,
            });
            if (isSure) Store.removeAddress(address.id);
        };

        const createAddressRow = function (address) {
            const selected = Store.getSelectedAddress();
            const isSelected = (selected && selected.id === address.id);
            HGroup({ width: "100%", height: "auto", gap: 8, align: "left center", clipContent: 0 });
                const note = address.street + ", " + address.city + "\n" + address.phone;
                const card = ShopUI.optionCard(address.name, note, "", isSelected, () => Store.selectAddress(address.id));
                card.shrink = 1;
                ShopUI.iconButton(App.ICON_PATHS.trash, tx("Delete"), () => askDeleteAddress(address));
            endGroup();
        };

        const drawList = function () {
            list.children.forEach((child) => child.remove());
            createIn(list, function () {
                if (Store.addresses.length) {
                    Store.addresses.forEach(createAddressRow);
                    return;
                }
                ShopUI.empty(App.ICON_PATHS.pin, tx("No addresses yet"), tx("Add one to use it at checkout."));
            });
        };

        App.createFooter(view, FOOTER_HEIGHT, function () {
            ShopUI.button(tx("Add an address"), () => App.open("address-edit"));
        });

        box.listenTo(window, Store.EVENT, drawList);
        drawList();

    },

});

App.addPage({

    id: "address-edit",
    title: tx("New address"),

    create: function (box, params, view) {

        const FOOTER_HEIGHT = 80;

        const createField = function (title, type = "text") {
            return TextField({
                styleName: "ozden",
                width: "100%",
                height: "auto",
                type: type,
                titleText: title,
                placeholder: "",
            });
        };

        const saveAddress = function () {
            const emptyField = [inputName, inputPhone, inputStreet, inputCity].find((field) => !field.getValue().trim());
            if (emptyField) {
                Toast.show({ key: "address-form", type: "error", messageText: tx("Fill in every field.") });
                emptyField.input.inputElement.focus(); // WHY: the toast may cover the field: the caret shows which one
                return;
            }
            Store.addAddress({
                name: inputName.getValue().trim(),
                phone: inputPhone.getValue().trim(),
                street: inputStreet.getValue().trim(),
                city: inputCity.getValue().trim(),
            });
            App.goBack();
        };

        const inputName = createField(tx("Full name"));
        const inputPhone = createField(tx("Phone"), "tel");
        const inputStreet = createField(tx("Street address"));
        const inputCity = createField(tx("City"));

        App.createFooter(view, FOOTER_HEIGHT, function () {
            ShopUI.button(tx("Save the address"), saveAddress);
        });

    },

});
