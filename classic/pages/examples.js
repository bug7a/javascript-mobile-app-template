/* Bismillah */

/*
USAGE EXAMPLES (a tab): the components, the views and the page templates; each row opens its example.
- A title row ("VIEWS") is an item with type: "section" (ItemList). A tapped row flashes, then its example opens.
- A component example: a key in ExampleViews (pages/example.js) and a row here with example: "<key>".
*/

"use strict";

const ExampleList = [

    { type: "section", title: "UI COMPONENTS" },
    { title: "Toggle", desc: "comp/toggle.js", example: "toggle" },
    { title: "Page Control", desc: "comp/page-control.js", example: "page-control" },
    { title: "Tabs", desc: "comp/tabs.js", example: "tabs" },
    { title: "Title", desc: "comp/page-header.js", example: "page-header" },
    { title: "Left Title", desc: "comp/settings-row.js", example: "settings-row" },
    { title: "Search Input", desc: "comp/search-input-v2.js", example: "search-input" },
    { title: "Action Button", desc: "comp/action-button.js", example: "action-button" },
    { title: "Progress Bar", desc: "comp/progress-bar.js", example: "progress-bar" },
    { title: "Notice", desc: "comp/notice.js", example: "notice" },
    { title: "Stepper", desc: "comp/stepper.js", example: "stepper" },
    { title: "Waiting View", desc: "comp/loading-screen.js", example: "waiting" },
    { title: "Web View", desc: "comp/web-view.js", example: "web-view" },

    { type: "section", title: "VIEWS" },
    { title: "defaultView", desc: "pages/default-example.js", run: () => App.open("default-example") },
    { title: "secondView", desc: "pages/second-example.js", run: () => App.open("second-example") },
    { title: "smallView", desc: "App.openSheet()", run: () => ExampleActions.openSmallView() },

    { type: "section", title: "PAGE TEMPLATES" },
    { title: "Custom Tab Bar", desc: "comp/action-tab-bar.js", example: "action-tab-bar" },
    { title: "Select Item Dialog", desc: "pages/color-dialog.js", run: () => ExampleActions.openColorDialog() },
    { title: "Edit Item Dialog", desc: "pages/edit-item-dialog.js", run: () => ExampleActions.openEditItemDialog() },
    { title: "Item List (Icons)", desc: "pages/my-documents.js", run: () => App.open("my-documents") },
    { title: "Template A", desc: "pages/template-a.js", run: () => App.open("template-a") },
    { title: "Lock Screen", desc: "pages/lock.js", run: () => App.lock() },

    { type: "section", title: "TECHNIQUES" },
    { title: "Autolayout Group", desc: "VGroup, HGroup", example: "autolayout" },
    { title: "Scrolling Text", desc: "comp/scrolling-text.js", example: "scrolling-text" },
    { title: "HTML Page", desc: "html/privacy.htm", run: () => App.open("privacy") },
    { title: "Waiting for a Task", desc: "App.wait()", run: () => App.wait(basic.sleep(1500)) },

    { type: "section", title: "BONUS" },
    { title: "Period Bar", desc: "comp/period-bar.js", example: "period-bar" },

];

const ExampleActions = {};

ExampleActions.openSmallView = function () {
    const SHEET_HEIGHT = 400;
    App.openSheet({
        height: SHEET_HEIGHT,
        content: function () {
            VGroup({ width: "100%", height: SHEET_HEIGHT, align: "center center" });
                Label({ text: "smallView", fontSize: 20, textColor: App.colors.text });
            endGroup();
        },
    });
};

ExampleActions.openColorDialog = function () {
    ColorDialog.open("", (color) => Notice.show({ messageText: "Selected color: " + color }));
};

ExampleActions.openEditItemDialog = function () {
    const ITEM_ID = 20;
    EditItemDialog.open({ titleText: "Item Name:", itemId: ITEM_ID, itemText: "Item Text", isNew: 0, isRemovable: 1 }, function (result) {
        if (result.operation == "action") Notice.show({ messageText: "Edit item by id: " + result.itemId + " - " + result.itemText });
        if (result.operation == "cancel") Notice.show({ messageText: "Edit item canceled." });
        if (result.operation == "delete") Notice.show({ messageText: "Delete by item id: " + result.itemId });
    });
};

App.addPage({

    id: "examples",
    title: "Usage Examples",
    scroll: 0,
    color: App.colors.red,
    topBar: 1,
    titleAlign: "center",
    topBarLine: 0,
    bottomBarLine: 0,

    create: function (box) {

        const SEARCH_AREA_HEIGHT = 110;

        let exampleList;

        // BOX: The search box
        startBox({ width: "100%", height: SEARCH_AREA_HEIGHT, color: "transparent" });
        that.shrink = 0;
            SearchInput({
                left: App.BAR_SPACE,
                top: 40,
                width: App.DESIGN_WIDTH - App.BAR_SPACE * 2,
                height: 50,
                color: Black(0.2),
                textColor: Black(0.65),
                placeholderColor: Black(0.4),
                borderBottomStyle: "2px solid " + Black(0.2),
                searchIconOpacity: 0.4,
                placeholderText: "Search",
                searchIconFile: AppSettings.componentPath + "search-input-v2/search.svg",
                clearIconFile: AppSettings.componentPath + "search-input-v2/clear.svg",
                onSearch: (text) => exampleList.search(text),
            });
        endBox();

        // LIST: The examples, under their titles (a tapped row is dark at once, then it fades)
        exampleList = ItemList({
            width: "100%",
            height: "calc(100% - " + SEARCH_AREA_HEIGHT + "px)",
            items: ExampleList.map((example, index) => ({ ...example, key: String(index) })),
            selection: "none",
            style: {
                box: { color: "transparent", border: 0, padding: [App.BAR_SPACE, 10] },
                list: { gap: 4 },
                row: { height: 50, padding: [20, 0], gap: 12, round: 13, color: "transparent", motion: "background-color 0.3s" },
                section: { height: 50, padding: [20, 0], fontSize: 24, textColor: Black(0.35) },
                hover: { color: Black(0.06) },
                pressed: { color: Black(0.2) },
            },
            createItemView: createRow,
            onItemClick: (self, item) => runExample(item),
        });

        function createRow(item) {
            Label({ text: item.title, fontSize: 24, textColor: White(0.75), grow: 1 });
            Label({ text: item.desc, fontSize: 14, textColor: White(0.65) });
        }

        function runExample(item) {
            if (item.run) {
                item.run();
                return;
            }
            App.open("example", { key: item.example, title: item.title });
        }

    },

});
