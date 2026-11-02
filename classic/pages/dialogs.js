/* Bismillah */

/*
THE SMALL DIALOGS (sheets from the bottom, App.openSheet):
- ColorDialog.open(selectedColor, onSelect(color)): "Select a Color", a row of round colors (not the selected one).
- EditItemDialog.open(options, onDone(result)): a text to add, edit or delete. result: { operation: "action",
  "cancel" or "delete", isNew, itemId, itemText }, after the sheet has gone.
- ConfirmDialog.open({ questionText, actionText, onConfirm }): a question with a red button.
*/

"use strict";

// A button of a dialog: a colored one (SAVE, DELETE) or a flat one (CANCEL)
const createDialogButton = function (labelText, color, isFlat, onClick) {
    const flatLook = isFlat ? { border: 0, boxShadow: "none" } : {};
    return SmartButton({
        labelText: labelText,
        height: 60,
        style: {
            layout: { padding: [36, 0] },
            box: { color: color, round: 8, ...flatLook },
            hover: { color: color },
            active: { color: color },
            label: { fontSize: 20, fontFamily: "opensans-bold", textColor: Black(0.65) },
        },
        onClick: onClick,
    });
};

// The white card of a dialog that floats over the bottom of the screen (its sheet is transparent)
const startDialogCard = function () {
    const CARD_SPACE = 10;
    return startBox(CARD_SPACE, CARD_SPACE, App.DESIGN_WIDTH - CARD_SPACE * 2, 280, {
        color: "white",
        round: 13,
        boxShadow: "0 0 8px " + Black(0.4),
    });
};

// *** SELECT A COLOR

const ColorDialog = {};
ColorDialog.COLORS = ["#FFD541", "#689BD2", "#A5D5BE", "lightgray", "#EE7553", "pink"];

ColorDialog.open = function (selectedColor, onSelect) {
    const SHEET_HEIGHT = 240;
    const CIRCLE_SIZE = 40;
    const colors = ColorDialog.COLORS.filter((color) => color.toLowerCase() != String(selectedColor).toLowerCase());

    App.openSheet({
        height: SHEET_HEIGHT,
        content: function (body, sheet) {

            startBox({ width: "100%", height: SHEET_HEIGHT, color: "transparent" });

                Label({ left: 0, top: 60, width: "100%", text: "Select a Color", fontSize: 28, textAlign: "center", textColor: App.colors.text });

                // GROUP: The colors
                HGroup({ left: 0, top: 120, width: "100%", height: CIRCLE_SIZE, gap: 8, align: "center center" });
                    colors.forEach(function (color) {
                        const circle = Box({
                            width: CIRCLE_SIZE,
                            height: CIRCLE_SIZE,
                            color: color,
                            border: 2,
                            borderColor: "#141414",
                            round: CIRCLE_SIZE / 2,
                            clickable: 1,
                            cursor: "pointer",
                            role: "button",
                            tabIndex: 0,
                            aria: { label: color },
                        });
                        circle.on("click", function () {
                            onSelect(color);
                            sheet.close();
                        });
                    });
                endGroup();

            endBox();

        },
    });
};
// USAGE: ColorDialog.open("#689BD2", (color) => square.color = color);

// *** EDIT AN ITEM

const EditItemDialog = {};

// options: { titleText, itemId, itemText, isNew, isRemovable, maxLength }
EditItemDialog.open = function (options, onDone) {

    const SHEET_HEIGHT = 300;
    const FIELD_WIDTH = 520;
    const result = { operation: "cancel", isNew: options.isNew ? 1 : 0, itemId: options.itemId, itemText: options.itemText || "" };

    App.openSheet({
        height: SHEET_HEIGHT,
        color: "transparent",
        onClose: () => onDone(result),
        content: function (body, sheet) {

            startBox({ width: "100%", height: SHEET_HEIGHT, color: "transparent" });

                // BOX: The card
                startDialogCard();

                    Label({ left: 30, top: 40, text: options.titleText || "Item Name:", fontSize: 20, textColor: App.colors.text });

                    const textInput = Input(30, 80, FIELD_WIDTH, 70, {
                        minimal: 1,
                        color: App.colors.whitesmoke,
                        border: 1,
                        borderColor: Black(0.2),
                        round: 4,
                        fontSize: 20,
                        text: result.itemText,
                    });
                    textInput.inputElement.maxLength = options.maxLength || 25;

                    // BUTTON: Delete (only for an item that can be deleted)
                    if (!options.isNew && options.isRemovable) {
                        SmartButton({
                            left: 30,
                            bottom: 40,
                            width: 60,
                            height: 60,
                            labelText: "",
                            iconFile: "assets/icons/trash.svg",
                            ariaLabel: "Delete",
                            style: { layout: { padding: [14, 14] }, icon: { width: 32, height: 32, opacity: 0.8 }, box: { color: App.colors.whitesmoke, round: 8, border: 0, boxShadow: "none" } },
                            onClick: () => confirmLayer.visible = 1,
                        });
                    }

                    // GROUP: Cancel, Save
                    HGroup({ right: 30, bottom: 40, width: "auto", height: 60, gap: 10, align: "right center" });
                        createDialogButton("CANCEL", App.colors.whitesmoke, 1, () => closeWith("cancel"));
                        const btnSave = createDialogButton(options.isNew ? "ADD" : "SAVE", App.colors.green, 0, () => closeWith("action"));
                    endGroup();

                endBox();

                // BOX: The question before a delete (over the card)
                const confirmLayer = startDialogCard();
                confirmLayer.boxShadow = "none";
                confirmLayer.visible = 0;
                    Label({ left: 0, top: 90, width: "100%", text: "Do you confirm the deletion?", fontSize: 20, textAlign: "center", textColor: App.colors.text });
                    HGroup({ right: 20, bottom: 30, width: "auto", height: 60, gap: 10, align: "right center" });
                        createDialogButton("CANCEL", App.colors.whitesmoke, 1, () => confirmLayer.visible = 0);
                        createDialogButton("DELETE", "#EA7A50", 0, () => closeWith("delete"));
                    endGroup();
                endBox();

            endBox();

            // SAVE works only for a new, not empty text
            const paintSave = function () {
                const text = textInput.text.trim();
                btnSave.setEnabled((text !== "" && text != options.itemText) ? 1 : 0);
            };

            const closeWith = function (operation) {
                result.operation = operation;
                result.itemText = textInput.text.trim();
                sheet.close();
            };

            textInput.on("input", paintSave);
            paintSave();

        },
    });

};
// USAGE: EditItemDialog.open({ titleText: "Item Name:", itemId: 20, itemText: "Milk" }, (result) => println(result.operation));

// *** A QUESTION

const ConfirmDialog = {};

ConfirmDialog.open = function (params) {
    const SHEET_HEIGHT = 300;
    App.openSheet({
        height: SHEET_HEIGHT,
        color: "transparent",
        content: function (body, sheet) {
            startBox({ width: "100%", height: SHEET_HEIGHT, color: "transparent" });
                startDialogCard();
                    Label({ left: 0, top: 90, width: "100%", text: params.questionText, fontSize: 20, textAlign: "center", textColor: App.colors.text });
                    HGroup({ right: 20, bottom: 30, width: "auto", height: 60, gap: 10, align: "right center" });
                        createDialogButton("CANCEL", App.colors.whitesmoke, 1, () => sheet.close());
                        createDialogButton(params.actionText || "OK", "#EA7A50", 0, function () {
                            sheet.close();
                            params.onConfirm();
                        });
                    endGroup();
                endBox();
            endBox();
        },
    });
};
// USAGE: ConfirmDialog.open({ questionText: "Delete it?", actionText: "DELETE", onConfirm: deleteItem });
