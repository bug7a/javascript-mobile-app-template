/* Bismillah */

/*
PAGE TEMPLATES (pages over the tabs):
- template-a: tiles on a warm gray page: a folder (it opens My Documents), a lamp with a switch, two buttons,
  a counter, a chip that turns, a picture.
- my-documents: a search box over a grid of files; a tapped file is selected.
- category: an item of the side menu.
*/

"use strict";

App.addPage({

    id: "template-a",
    title: "Template A",
    scroll: 0,
    color: "#D3CFC1",
    headerColor: "transparent",
    backColor: Black(0.8),

    create: function (box) {

        const SPACE = 20;
        const TOP_CARD_HEIGHT = 170;
        const BOTTOM_CARD_HEIGHT = 170;
        const TURN_STEP = 45; // degrees for each tap
        const CARD_LOOK = { color: Black(0.05), round: 13, clickable: 1, cursor: "pointer", role: "button", tabIndex: 0 };
        const CHIP_LOOK = { color: Black(0.05), border: 1, borderColor: Black(0.2), round: 8, padding: [12, 0], textColor: App.colors.text };
        const isLampOn = App.load("lamp", 1);

        let turnAngle = 0;

        startBox({ width: "100%", height: "100%", color: "transparent" });

            // BOX: My Documents (a folder)
            const folderCard = startBox(SPACE, SPACE, 275, TOP_CARD_HEIGHT, CARD_LOOK);
                VGroup({ align: "center center", gap: 8 });
                    startBox({ width: 80, height: 80, round: 8, color: Black(0.05) });
                        Icon(8, 8, 64, 64, { opacity: 0.9 });
                        that.load("assets/files/folder.png");
                        that.css = { filter: "grayscale(70%)" };
                    endBox();
                    Label({ text: "My Documents", fontSize: 20, padding: [8, 4], round: 8, color: Black(0.05), textColor: Black(0.9) });
                endGroup();
            endBox();
            folderCard.on("click", openMyDocuments);

            // BOX: The lamp and its switch
            startBox(305, SPACE, 275, TOP_CARD_HEIGHT, { color: Black(0.05), round: 13 });
                const lampIcon = Icon(20, 20, 70, 70, { opacity: 0.9 });
                Label({ left: 98, top: 20, text: "Lamp", fontSize: 30, textColor: Black(0.9) });
                const lblLamp = Label({ right: 90, bottom: 24, text: "", fontSize: 20, textColor: Black(0.6) });
                Toggle({
                    styleName: "classic",
                    right: SPACE,
                    bottom: SPACE,
                    height: 30,
                    spacing: 3,
                    value: isLampOn,
                    backgroundStyle: { color: Black(0.25), selectedColor: "#0078D4" },
                    onChange: (self) => paintLamp(self.value, 1),
                });
            endBox();

            // GROUP: Two buttons in the middle
            VGroup({ left: 0, top: SPACE * 2 + TOP_CARD_HEIGHT, width: "100%", height: "calc(100% - " + (SPACE * 3 + TOP_CARD_HEIGHT + BOTTOM_CARD_HEIGHT) + "px)", align: "center center", gap: 2 });
                createTemplateButton("Button 1");
                createTemplateButton("Button 2");
            endGroup();

            // BOX: A counter (+1 at each tap)
            const counterCard = startBox({ left: SPACE, bottom: SPACE, width: 175, height: BOTTOM_CARD_HEIGHT, ...CARD_LOOK });
                VGroup({ align: "center center" });
                    const lblCount = Label({ text: "1", fontSize: 40, ...CHIP_LOOK });
                endGroup();
            endBox();
            counterCard.on("click", () => lblCount.text = String(Number(lblCount.text) + 1));

            // BOX: A chip that turns 45° at each tap
            const turnCard = startBox({ left: 205, bottom: SPACE, width: 190, height: BOTTOM_CARD_HEIGHT, ...CARD_LOOK });
                VGroup({ align: "center center" });
                    const lblTurn = Label({ text: "abc", fontSize: 26, ...CHIP_LOOK });
                    lblTurn.setMotion("transform 0.2s");
                endGroup();
            endBox();
            turnCard.on("click", turnChip);

            // BOX: A picture (it writes its name on the chip)
            const coffeeCard = startBox({ right: SPACE, bottom: SPACE, width: 175, height: BOTTOM_CARD_HEIGHT, ...CARD_LOOK });
                VGroup({ align: "center center" });
                    Icon({ width: 90, height: 90 });
                    that.load("assets/categories/coffee.png");
                    that.css = { filter: "grayscale(100%)" };
                endGroup();
            endBox();
            coffeeCard.on("click", () => lblTurn.text = "coffee");

        endBox();

        paintLamp(isLampOn, 0);

        // *** FUNCTIONS:

        function createTemplateButton(labelText) {
            SmartButton({
                width: 250,
                height: 50,
                labelText: labelText,
                style: {
                    box: { color: Black(0.1), border: 1, borderColor: Black(0.2), round: 4, boxShadow: "none" },
                    hover: { color: Black(0.14) },
                    active: { color: Black(0.18) },
                    label: { fontSize: 20, textColor: Black(0.7) },
                },
                onClick: () => Notice.show({ messageText: labelText }),
            });
        }

        function paintLamp(isOn, isToSave) {
            lampIcon.load(isOn ? "assets/icons/lamp-on.png" : "assets/icons/lamp.png");
            lblLamp.text = isOn ? "ON" : "OFF";
            if (isToSave) App.save("lamp", isOn ? 1 : 0);
        }

        // WHY at 360: it goes back to 0 without a motion (the same look), so the angle does not grow forever
        function turnChip() {
            if (turnAngle >= 360) {
                lblTurn.dontMotion();
                turnAngle = 0;
                lblTurn.css = { transform: "rotate(0deg)" };
            }
            lblTurn.withMotion(function (self) {
                turnAngle += TURN_STEP;
                self.css = { transform: "rotate(" + turnAngle + "deg)" };
            });
        }

        // This page slides out, then My Documents slides in
        function openMyDocuments() {
            App.closePage();
            App.frame.after(App.PAGE_MOTION_TIME, () => App.open("my-documents"));
        }

    },

});

App.addPage({

    id: "my-documents",
    title: "My Documents",
    scroll: 0,

    create: function (box) {

        const SEARCH_AREA_HEIGHT = 90;
        const FILES = [
            { key: "components", title: "Components", iconFile: "assets/files/folder.png" },
            { key: "fonts", title: "Fonts", iconFile: "assets/files/folder.png" },
            { key: "images", title: "Images", iconFile: "assets/files/folder.png" },
            { key: "book", title: "Book", iconFile: "assets/files/doc.png" },
            { key: "book-2", title: "Book 2", iconFile: "assets/files/doc.png" },
            { key: "tables", title: "Tables", iconFile: "assets/files/xls.png" },
            { key: "notes", title: "Notes", iconFile: "assets/files/txt.png" },
        ];

        let fileList;

        // BOX: The search box
        startBox({ width: "100%", height: SEARCH_AREA_HEIGHT, color: "transparent" });
        that.shrink = 0;
            SearchInput({
                left: App.BAR_SPACE,
                top: 20,
                width: App.DESIGN_WIDTH - App.BAR_SPACE * 2,
                height: 50,
                searchIconOpacity: 0.4,
                placeholderText: "Search",
                searchIconFile: AppSettings.componentPath + "search-input-v2/search.svg",
                clearIconFile: AppSettings.componentPath + "search-input-v2/clear.svg",
                onSearch: (text) => fileList.search(text),
            });
        endBox();

        // LIST: The files (the selected one: a light background and a line around it)
        fileList = ItemList({
            width: "100%",
            height: "calc(100% - " + SEARCH_AREA_HEIGHT + "px)",
            layout: "grid",
            items: FILES,
            style: {
                box: { color: "transparent", border: 0 },
                row: { border: 2, borderColor: "transparent", round: 13, color: "transparent", motion: "background-color 0.3s, border-color 0.3s" },
                tile: {
                    width: 141,
                    height: 190,
                    padding: [4, 40],
                    gap: 8,
                    spacing: 4,
                    listPadding: [10, 0],
                    iconSize: 70,
                    frameSize: 0,
                    iconFilter: "",
                    selectedColor: Black(0.05),
                    selectedIconScale: 1,
                    selectedIconFilter: "",
                    selectedFontFamily: "",
                },
                selected: { borderColor: Black(0.2) },
                title: { fontSize: 20, textColor: App.colors.text },
            },
        });

    },

});

App.addPage({

    id: "category",
    title: (params) => params.title || "Category",
    scroll: 0,
    color: App.colors.whitesmoke,

    create: function (box, params) {

        VGroup({ align: "center center", gap: 12 });
            if (params.iconFile) {
                Icon({ width: 80, height: 80 });
                that.load(params.iconFile);
            }
            Label({ text: params.title, fontSize: App.TITLE_SIZE, bold: 1, textColor: App.colors.text });
            Label({ text: params.count + " items", fontSize: 20, textColor: App.colors.softText });
            Label({ text: "The items of the side menu are in AppSettings.menu (app/settings.js).", fontSize: 18, textColor: App.colors.softText, css: { marginTop: "20px" } });
        endGroup();

    },

});
