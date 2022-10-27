
/* Bismillah */

/*

CUSTOM DIALOG TEMPLATE
- You can customize, this template code as you need:


Started Date: 20 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/


*/

const editItemDialog = {};
editItemDialog.PAGE_ID = "editItemDialog";

// Parameters:
editItemDialog.isNew = 0;
editItemDialog.isRemoveable = 1;
editItemDialog.title = "Title:";
editItemDialog.itemId = "";
editItemDialog.itemText = "";
editItemDialog.itemTextMaximumChar = 25;
editItemDialog.addButtonText = "ADD";
editItemDialog.editButtonText = "SAVE";
editItemDialog.cancelButtonText = "CANCEL";
editItemDialog.removeButtonImage = "assets/edit-item-dialog/trash.svg";
editItemDialog.actionColor = "#5ABB9F";
editItemDialog.removeColor = "#EA7A50";
editItemDialog.removeConfirmButtonText = "DELETE";
editItemDialog.removeConfirmText = "Do you confirm the deletion?";

editItemDialog.operation = "cancel";
editItemDialog.editedItemText = "";



editItemDialog.openInSmallView = function(resultCallback = function(results) {}) {

    smallView.clear();

    editItemDialog.operation = "cancel";
    editItemDialog.editedItemText = "";

    // BOX: Page container.
    const box = smallView.getContainerBox();
    // Out of this function, use "editItemDialog.box" for "box".
    editItemDialog.box = box;

    box.color = "transparent";
    box.height = 300;

    // BOX: Dialog background.
    box.boxBackground = createBox(10, 10, box.width - 20, box.height - 20);
    box.add(that);
    that.color = "white";
    that.round = 13;
    that.element.style.boxShadow = "0px 0px 8px rgba(0, 0, 0, 0.4)";

    // LABEL: Title text.
    box.lblTitle = createLabel();
    box.add(that);
    // Get parameter:
    that.width = "auto";
    that.height = "auto";
    that.text = editItemDialog.title;
    that.left = 30;
    that.top = 40;
    
    //that.element.style.fontFamily = "opensans-bold";

    // TEXTBOX: Editable item text field.
    box.txtItemText = createTextBox();
    box.add(that);
    that.inputElement.setAttribute("maxlength", str(editItemDialog.itemTextMaximumChar));
    that.text = editItemDialog.itemText;
    that.minimal = 1;
    that.color = "whitesmoke";
    that.border = 1;
    that.borderColor = "rgba(0, 0, 0, 0.2)";
    that.width = box.width - 60;
    that.height = 70;
    that.left = 30;
    that.top = 40;

    box.lblTitle.onResize(function(self) {
        box.txtItemText.aline(box.lblTitle, "bottom", 14);
    });

    // BUTTON: Action Button.
    box.btnAction = createButton();
    box.add(that);
    that.width = "auto";
    that.height = 60;
    // Action can be "ADD" or "SAVE"
    if (editItemDialog.isNew) {
        that.text = editItemDialog.addButtonText;
    } else {
        that.text = editItemDialog.editButtonText;
    }
    that.fontSize = 20;
    that.minimal = 0;
    that.color = editItemDialog.actionColor;
    that.round = 8;
    that.opacity = 1;
    that.enabled = 0;
    that.element.style.filter = "grayscale(100%)"
    that.element.style.fontFamily = "opensans-bold";
    that.spaceX = 36;
    that.setMotion("filtre 0.2s, opacity 0.2s");
    that.right = 30;
    that.bottom = 40;

    // BUTTON: Cancel Button.
    box.btnCancel = createButton();
    box.add(that);
    that.width = "auto";
    that.height = 60;
    that.text = "CANCEL";
    that.fontSize = 20;
    that.minimal = 1;
    that.color = "whitesmoke";
    that.round = 8;
    that.opacity = 1;
    that.enabled = 1;
    that.element.style.filter = "grayscale(100%)";
    that.element.style.fontFamily = "opensans-bold";
    that.spaceX = 36;
    // Repositon cancel button relative to action button:
    box.btnAction.onResize(function(self) {
        box.btnCancel.aline(box.btnAction, "left", 10);
    });

    // IMAGE: Trash Button.
    box.imgRemove = createImage();
    box.add(that);
    that.load(editItemDialog.removeButtonImage);
    that.width = 60;
    that.height = 60;
    that.color = "whitesmoke";
    that.round = 8;
    that.left = 30;
    that.visible = 0;
    that.bottom = 40;
    that.space = 24;
    that.opacity = 0.8;
    // Show; image of remove button:
    if (!editItemDialog.isNew) {
        if (editItemDialog.isRemoveable) {
            box.imgRemove.visible = 1;
        }
    }

    // If there is a change, activate the action button.
    box.txtItemText.inputElement.addEventListener("keyup" ,function(self) {

        if (box.txtItemText.text == "" || box.txtItemText.text == editItemDialog.itemText) {    
            box.btnAction.enabled = 0;
            box.btnAction.element.style.filter = "grayscale(100%)";
        
        } else {
            box.btnAction.enabled = 1;
            box.btnAction.element.style.filter = "none";
        }

    });

    // BOX: Do you confirm the deletion? container.
    box.boxDeleteConfirm = createBox();
    box.add(that);
    that.visible = 0;
    that.width = box.width - 20;
    that.height = box.height - 20;
    that.color = "white";
    that.round = 13;
    that.left = 10;
    that.top = 10;

    // LABEL: Title text.
    box.lblDeleteConfirmText = createLabel();
    box.boxDeleteConfirm.add(that);
    // Get parameter:
    that.width = "auto";
    that.height = "auto";
    that.text = editItemDialog.removeConfirmText;
    //that.left = 20;
    //that.top = 30;
    that.onResize(function(self) {
        self.center();
        self.top -= 35;
    });
    //that.element.style.fontFamily = "opensans-bold";

    // BUTTON: Delete action Button.
    box.btnDeleteAction = createButton();
    box.boxDeleteConfirm.add(that);
    that.width = "auto";
    that.height = 60;
    that.text = editItemDialog.removeConfirmButtonText;
    that.fontSize = 20;
    that.minimal = 0;
    that.color = editItemDialog.removeColor;
    that.round = 8;
    that.opacity = 1;
    that.element.style.fontFamily = "opensans-bold";
    that.spaceX = 36;
    that.setMotion("filtre 0.2s, opacity 0.2s");
    that.right = 20;
    that.bottom = 30;

    // BUTTON: Delete cancel Button.
    box.btnDeleteCancel = createButton();
    box.boxDeleteConfirm.add(that);
    that.width = "auto";
    that.height = 60;
    that.text = "CANCEL";
    that.fontSize = 20;
    that.minimal = 1;
    that.color = "whitesmoke";
    that.round = 8;
    that.opacity = 1;
    that.enabled = 1;
    that.element.style.filter = "grayscale(100%)";
    that.element.style.fontFamily = "opensans-bold";
    that.spaceX = 36;
    // Repositon cancel button relative to action button:
    box.btnDeleteAction.onResize(function(self) {
        box.btnDeleteCancel.aline(box.btnDeleteAction, "left", 10);
    });

    // Action:
    box.btnAction.onClick(function(self) {
        editItemDialog.editedItemText = box.txtItemText.text;
        editItemDialog.operation = "action";
        smallView.close();
    });

    // Cancel:
    box.btnCancel.onClick(function(self) {
        editItemDialog.operation = "cancel";
        smallView.close();
    });

    // Show delete confirm.
    box.imgRemove.onClick(function(self) {
        box.boxDeleteConfirm.visible = 1;
    });

    // Close delete confirm.
    box.btnDeleteCancel.onClick(function(self) {
        box.boxDeleteConfirm.visible = 0;
    });

    // Delete:
    box.btnDeleteAction.onClick(function(self) {
        editItemDialog.operation = "delete";
        smallView.close();
    });

    smallView.onClose(function closed() {

        // Send back result.
        let results = {};
        results.operation = editItemDialog.operation;
        results.isNew = editItemDialog.isNew;
        results.itemId = editItemDialog.itemId;
        results.itemText = editItemDialog.editedItemText;
        
        resultCallback(results);

    });

    smallView.setVisible(1);

}