/* Bismillah */

/*
ACCOUNT (a tab): the details of the customer, the language and the reset of the demo. MY-DETAILS (over the tabs):
the name and the phone that go with a booking.
*/

"use strict";

App.addPage({

    id: "account",
    title: tx("Account"),

    create: function (box) {

        const LANGUAGE_SHEET_HEIGHT = 240;

        box.listenTo(window, Store.EVENT, App.refreshTab);

        const createMenuRow = function (iconPath, text, value, onClick, color = App.colors.text) {
            const row = HGroup({ width: "100%", height: 52, gap: 12, align: "left center", padding: [14, 0] });
            row.role = "button";
            row.tabIndex = 0;
                Icon({ width: 21, height: 21, shrink: 0 }).load(App.makeIcon(iconPath, color));
                Label({ plainText: text, grow: 1, shrink: 1, fontSize: 15, textColor: color });
                if (value) Label({ plainText: value, fontSize: 13, shrink: 0, textColor: App.colors.softText });
                Icon({ width: 16, height: 16, shrink: 0 }).load(App.makeIcon(App.ICON_PATHS.next, App.colors.softText));
            endGroup();
            BookingUI.makePressable(row, onClick);
        };

        const createLanguageChoice = function (language, sheetClose) {
            const isSelected = (language === Texts.current);
            const card = App.startCard({ padding: [14, 12], round: 14, border: isSelected ? 2 : 1,
                borderColor: isSelected ? App.colors.accent : App.colors.line });
            card.role = "radio";
            card.tabIndex = 0;
            card.aria = { checked: isSelected };
                BookingUI.title(Texts.languages[language], 14);
            App.endCard();
            BookingUI.makePressable(card, function () {
                sheetClose();
                Texts.setLanguage(language);
            });
        };

        const openLanguageSheet = function () {
            const sheet = App.openSheet({
                titleText: tx("Language"),
                height: LANGUAGE_SHEET_HEIGHT,
                content: function () {
                    VGroup({ width: "100%", height: "auto", gap: 8, padding: [16, 12], clipContent: 0 });
                        Object.keys(Texts.languages).forEach((language) => createLanguageChoice(language, () => sheet.close()));
                    endGroup();
                },
            });
        };

        const askResetDemo = async function () {
            const isSure = await Dialog.confirm({
                titleText: tx("Reset the demo data?"),
                messageText: tx("The appointments and your details go back to the start."),
                confirmText: tx("Reset"),
                cancelText: tx("Keep it"),
                danger: 1,
            });
            if (isSure) Store.resetDemoData();
        };

        HGroup({ width: "100%", height: "auto", gap: 14, align: "left center" });
            BookingUI.iconCircle(App.ICON_PATHS.user, 56);
            VGroup({ width: "100%", height: "auto", gap: 2, shrink: 1 });
                BookingUI.title(Store.customer.name, 18);
                BookingUI.softText(Store.customer.phone, 13);
            endGroup();
        endGroup();

        App.startCard({ padding: [0, 4], round: 14, gap: 0 });
            createMenuRow(App.ICON_PATHS.user, tx("My details"), "", () => App.open("my-details"));
            createMenuRow(App.ICON_PATHS.globe, tx("Language"), Texts.languages[Texts.current], openLanguageSheet);
            createMenuRow(App.ICON_PATHS.trash, tx("Reset the demo data"), "", askResetDemo, App.colors.danger);
        App.endCard();

    },

});

App.addPage({

    id: "my-details",
    title: tx("My details"),

    create: function (box, params, view) {

        const FOOTER_HEIGHT = 80;

        const createField = function (title, value, type = "text") {
            return InputB({ styleName: "ozden", width: "100%", height: "auto", type: type, titleText: title,
                placeholder: "", inputValue: value });
        };

        const saveDetails = function () {
            const emptyField = [inputName, inputPhone].find((field) => !field.getInputValue().trim());
            if (emptyField) {
                Toast.show({ key: "details-form", type: "error", message: tx("Fill in every field.") });
                emptyField.input.inputElement.focus(); // WHY: the toast may cover the field: the caret shows which one
                return;
            }
            Store.saveCustomer({ name: inputName.getInputValue().trim(), phone: inputPhone.getInputValue().trim() });
            Toast.show({ key: "details-form", type: "success", message: tx("Saved") });
            App.goBack();
        };

        const inputName = createField(tx("Full name"), Store.customer.name);
        const inputPhone = createField(tx("Phone"), Store.customer.phone, "tel");

        App.createFooter(view, FOOTER_HEIGHT, function () {
            BookingUI.button(tx("Save"), saveDetails);
        });

    },

});
