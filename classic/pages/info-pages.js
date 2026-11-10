/* Bismillah */

/*
SMALL PAGES (pages over the tabs and in the place of the tabs):
- second-example: the "secondView" example (it slides in over the tabs).
- default-example: the "defaultView" example (view: "default": in the place of the tab, with a back arrow).
- security: an empty page of the settings.
- privacy: an HTML page in the app (html/privacy.htm, in a WebView).
- menu-style: the side of the side menu (right, left, bottom): saved, the menu is made again on that side.
*/

"use strict";

// A text in the middle of a page
const createCenterText = function (text) {
    VGroup({ align: "center center" });
        Label({ text: text, fontSize: 20, textAlign: "center", textColor: App.colors.text });
    endGroup();
};

App.addPage({
    id: "second-example",
    title: "Second Example",
    backText: "Usage Examples",
    scroll: 0,
    color: App.colors.whitesmoke,
    create: () => createCenterText("secondView"),
});

App.addPage({
    id: "default-example",
    title: "Default Example",
    view: "default",
    scroll: 0,
    color: App.colors.whitesmoke,
    topBarLine: 1,
    create: () => createCenterText("defaultView"),
});

App.addPage({
    id: "security",
    title: "Security",
    backText: "Settings",
    scroll: 0,
    color: App.colors.whitesmoke,
    create: () => createCenterText("Security Page"),
});

App.addPage({
    id: "privacy",
    title: "Privacy Policy and Terms of Use",
    backText: "Settings",
    scroll: 0, // WHY: The HTML page scrolls itself.
    create: function () {
        WebView({ width: "100%", height: "100%", url: "html/privacy.htm", ariaLabel: "Privacy Policy and Terms of Use" });
    },
});

App.addPage({
    id: "menu-style",
    title: "Menu Style",
    backText: "Settings",
    color: App.colors.whitesmoke,
    create: function () {

        const MENU_SIDES = [
            { key: "right", text: "From the right", description: "The menu slides in from the right side." },
            { key: "left", text: "From the left", description: "The menu slides in from the left side." },
            { key: "bottom", text: "From the bottom", description: "The menu rises from the bottom like a sheet." },
        ];

        Label({ text: "Choose how your navigation menu appears.", fontSize: 18, textColor: App.colors.softText, css: { margin: "30px 20px 10px" } });

        // LIST: The sides (the selected one has a mark)
        ItemList({
            width: "100%",
            height: "auto",
            items: MENU_SIDES,
            selectedKeys: [App.getMenuSide()],
            style: {
                box: { color: "transparent", border: 0, padding: [App.BAR_SPACE, 0] },
                list: { gap: 10 },
                row: { height: 100, padding: [20, 0], color: "white", border: 1, borderColor: "transparent", round: 13 },
                hover: {},
                selected: { color: "white", borderColor: Black(0.2), opacity: 1 },
                check: { visible: 1 },
            },
            onChange: function (self, selectedItems) {
                App.setMenuSide(selectedItems[0].key);
                Notice.show({ messageText: "The menu opens " + selectedItems[0].text.toLowerCase() + ".", type: "success" });
            },
        });

    },
});
