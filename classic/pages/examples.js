/* Bismillah */

/*
USAGE EXAMPLES (a tab): the components, the views and the page templates; each row opens its example.
- A title row ("VIEWS") is an item with type: "section" (ItemList). A tapped row flashes, then its example opens.
- A component example: a key in ExampleViews (pages/example.js) and a row here with example: "<key>".
*/

"use strict";

const ExampleList = [

    { type: "section", text: "UI COMPONENTS" },
    { text: "Toggle", description: "comp/toggle.js", example: "toggle" },
    { text: "Page Control", description: "comp/page-control.js", example: "page-control" },
    { text: "Tabs", description: "comp/tabs.js", example: "tabs" },
    { text: "Title", description: "comp/page-header.js", example: "page-header" },
    { text: "Left Title", description: "comp/settings-row.js", example: "settings-row" },
    { text: "Search Input", description: "comp/search-input.js", example: "search-input" },
    { text: "Action Button", description: "comp/action-button.js", example: "action-button" },
    { text: "Progress Bar", description: "comp/progress-bar.js", example: "progress-bar" },
    { text: "Notice", description: "comp/notice.js", example: "notice" },
    { text: "Stepper", description: "comp/stepper.js", example: "stepper" },
    { text: "Waiting View", description: "comp/loading-screen.js", example: "waiting" },
    { text: "Web View", description: "comp/web-view.js", example: "web-view" },

    { type: "section", text: "VIEWS" },
    { text: "defaultView", description: "pages/default-example.js", run: () => App.open("default-example") },
    { text: "secondView", description: "pages/second-example.js", run: () => App.open("second-example") },
    { text: "smallView", description: "App.openSheet()", run: () => ExampleActions.openSmallView() },

    { type: "section", text: "PAGE TEMPLATES" },
    { text: "Custom Tab Bar", description: "comp/action-tab-bar.js", example: "action-tab-bar" },
    { text: "Select Item Dialog", description: "pages/color-dialog.js", run: () => ExampleActions.openColorDialog() },
    { text: "Edit Item Dialog", description: "pages/edit-item-dialog.js", run: () => ExampleActions.openEditItemDialog() },
    { text: "Item List (Icons)", description: "pages/my-documents.js", run: () => App.open("my-documents") },
    { text: "Template A", description: "pages/template-a.js", run: () => App.open("template-a") },
    { text: "Lock Screen", description: "pages/lock.js", run: () => App.lock() },

    { type: "section", text: "TECHNIQUES" },
    { text: "Autolayout Group", description: "VGroup, HGroup", example: "autolayout" },
    { text: "Scrolling Text", description: "comp/scrolling-text.js", example: "scrolling-text" },
    { text: "HTML Page", description: "html/privacy.htm", run: () => App.open("privacy") },
    { text: "Waiting for a Task", description: "App.wait()", run: () => App.wait(basic.sleep(1500)) },

    { type: "section", text: "BONUS" },
    { text: "Period Bar", description: "comp/period-bar.js", example: "period-bar" },

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
                styleName: "original", // the first look of SearchInput
                left: App.BAR_SPACE,
                top: 40,
                width: App.DESIGN_WIDTH - App.BAR_SPACE * 2,
                height: 50,
                color: Black(0.2),
                textColor: Black(0.65),
                placeholderColor: Black(0.4),
                borderBottomStyle: "2px solid " + Black(0.2),
                searchIconOpacity: 0.4,
                placeholder: "Search",
                searchIconFile: AppSettings.componentPath + "search-input/search.svg",
                clearIconFile: AppSettings.componentPath + "search-input/clear.svg",
                onChange: (self) => exampleList.search(self.getSearchText()),
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
                hover: { color: Black(0.06), lineColor: "" }, // WHY: "": no lines above and under the row (ozden has them).
                pressed: { color: Black(0.2) },
            },
            createItemView: createRow,
            onItemClick: (self, item) => runExample(item),
        });

        function createRow(item) {
            Label({ text: item.text, fontSize: 24, textColor: White(0.75), grow: 1 });
            Label({ text: item.description, fontSize: 14, textColor: White(0.65) });
        }

        function runExample(item) {
            if (item.run) {
                item.run();
                return;
            }
            App.open("example", { key: item.example, title: item.text });
        }

    },

});
