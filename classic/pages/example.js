/* Bismillah */

/*
EXAMPLE PREVIEW (a page over the tabs): App.open("example", { key: "stepper", title: "Stepper" })
Each key of ExampleViews draws one component on the page (box: the page, a group that fills it).
A new example: a key here and a row in ExampleList (pages/examples.js).
Tabs is made for screen px: it keeps its size on the screen (basic.uiScale), so its width is a screen width.
*/

"use strict";

const ExampleViews = {

    "toggle": function (box) {
        ExampleViews.startCenter(box, "white", 40);
            Toggle({ styleName: "classic", value: 1, backgroundStyle: { selectedColor: "#85BFDB" } });
            ["float", "round", "slim", "outline", "square", "tick", "badge", "label"].forEach(function (styleName) {
                Toggle({ styleName: styleName, value: 1 });
            });
        endGroup();
    },

    "page-control": function (box) {
        const PAGES = [
            { key: "home", text: "Lavender", color: "Lavender", textColor: "#734f96" },
            { key: "tasks", text: "Pale Turquoise", color: "PaleTurquoise", textColor: "#0F4E4E" },
            { key: "settings", text: "Bisque", color: "Bisque", textColor: "#B86500" },
        ];
        ExampleViews.startCenter(box, App.colors.whitesmoke, 10);
            ExampleViews.createOldTabs(
                [{ key: "home", text: "Home" }, { key: "tasks", text: "Tasks" }, { key: "settings", text: "Settings" }],
                { value: "home", onChange: (self) => pages.open(self.value) },
            );
            const pages = PageControl({ width: 560, height: 500, motion: 0.2, style: { box: { round: 14 } } });
            PAGES.forEach(function (pageData) {
                pages.addPage(pageData.key);
                pages.startPage(pageData.key);
                    VGroup({ align: "center center", color: pageData.color });
                        Label({ text: pageData.text, fontSize: 20, textColor: pageData.textColor });
                    endGroup();
                pages.endPage();
            });
        endGroup();
    },

    "tabs": function (box) {
        const ICONS = "assets/example-tabs/";
        const lampTab = (key, text) => ({ key: key, text: text, iconFile: ICONS + "lamp.png", selectedIconFile: ICONS + "lamp-on.png" });
        const iconTab = (number) => ({
            key: "i" + number,
            text: "",
            ariaLabel: "Icon " + number,
            iconFile: ICONS + "i" + number + "-white.png",
            selectedIconFile: ICONS + "i" + number + ".png",
        });
        const SECOND_BAR_TEXT = Black(0.8);

        ExampleViews.startCenter(box, App.colors.whitesmoke, 80);

            // TABS: A dark bar, wider than its tabs
            ExampleViews.createOldTabs([lampTab("low", "LOW"), lampTab("medium", "MEDIUM"), lampTab("power", "ALL POWER")], {
                value: "medium",
            }, { color: "#141414", textColor: White(0.8), height: 70, outerSpace: 4, sideSpace: 42.5 });

            // TABS: No bar, the selected tab has the color of the tab
            ExampleViews.createOldTabs([
                { key: "coffee", text: "Coffee", selectedColor: "Lavender", selectedTextColor: "#734f96" },
                { key: "milkshake", text: "Milkshake", selectedColor: "PaleTurquoise", selectedTextColor: "#0F4E4E" },
                { key: "iced", text: "Iced Caffee", selectedColor: "Bisque", selectedTextColor: "#B86500" },
            ], { value: "iced" }, { color: "transparent", textColor: SECOND_BAR_TEXT, round: 6 });

            // TABS: A small icon on a tab, a tab with only an icon
            ExampleViews.createOldTabs([
                { key: "coffee", text: "Coffee", iconFile: ICONS + "coffee.png" },
                { key: "milkshake", text: "Milkshake" },
                { key: "frappe", text: "Frappe" },
                { key: "tea", text: "Tea" },
                { key: "search", text: "", iconFile: ICONS + "search.svg", ariaLabel: "Search" },
            ], { value: "coffee" }, { color: "#EBEAE8", iconSize: 20 });

            // TABS: Only icons, a round bar
            ExampleViews.createOldTabs([1, 2, 3, 4, 5].map(iconTab), { value: "i3" },
                { color: "#EBEAE8", iconSize: 30, round: 50, outerSpace: 2, innerSpace: 10 });

        endGroup();
    },

    "page-header": function (box) {
        const goBack = () => Notice.show({ messageText: "onBack" });
        box.color = App.colors.whitesmoke;
        // GROUP: Headers, one under the other
        VGroup({ width: "100%", height: "auto", align: "left top", gap: 30 });
            PageHeader({ titleText: "Settings", onBack: goBack });
            PageHeader({ titleText: "Security", backText: "Settings", color: "#D3CFC1", backColor: Black(0.8), onBack: goBack });
            PageHeader({ titleText: "Without a back link", showBack: 0 });
        endGroup();
    },

    "settings-row": function (box) {
        box.color = App.colors.whitesmoke;
        // GROUP: Rows in a group
        VGroup({ width: "100%", height: "auto", align: "left top" });
            SettingsRow.createSection("A GROUP OF ROWS");
            SettingsRow({ titleText: "A switch", descriptionText: "A small text under the title.", control: () => Toggle({ styleName: "classic", value: 1 }) });
            const textRow = SettingsRow({
                titleText: "A small text comes and goes",
                control: () => Toggle({ styleName: "classic", value: 0, onChange: (self) => textRow.setDescriptionText(self.value ? "The title went up to make room." : "") }),
            });
            SettingsRow({ titleText: "A row that opens a page", arrow: 1, onClick: () => Notice.show({ messageText: "onClick" }) });
            SettingsRow({ titleText: "A row that deletes", titleColor: "orangered", arrow: 1, onClick: () => Notice.show({ messageText: "Nothing is deleted." }) });
        endGroup();
    },

    "action-tab-bar": function (box) {
        const TAB_BAR_HEIGHT = 150;
        const TABS = [
            { key: "status", text: "STATUS", iconFile: "assets/tab-bar/status.png" },
            { key: "receipts", text: "RECEIPTS", iconFile: "assets/tab-bar/transactions.png" },
            { key: "tools", text: "TOOLS", iconFile: "assets/tab-bar/settings.png" },
        ];
        box.color = "white";
        // GROUP: The page of the selected tab
        VGroup({ width: "100%", height: "calc(100% - " + TAB_BAR_HEIGHT + "px)", align: "center center" });
            const lblPage = Label({ text: "", fontSize: 40, bold: 1, textColor: App.colors.text });
        endGroup();
        const tabBar = ActionTabBar({
            height: TAB_BAR_HEIGHT,
            items: TABS,
            onChange: (self) => { lblPage.text = "Page " + TABS[self.getIndex()].text; },
            onAction: () => Notice.show({ messageText: "The + adds a new item." }),
        });
        lblPage.text = "Page " + TABS[tabBar.getIndex()].text;
    },

    "period-bar": function (box) {
        box.color = App.colors.whitesmoke;
        // GROUP: The bar at the top, the month it shows under it
        VGroup({ width: "100%", height: "auto", align: "center top", gap: 30 });
            const periodBar = PeriodBar({ onChange: showMonth });
            const lblMonth = Label({ text: "", fontSize: 22, textColor: App.colors.text });
        endGroup();
        showMonth(periodBar);

        function showMonth(self) {
            const date = self.getSelectedDate();
            lblMonth.text = "getSelectedDate(): " + date.year + " / " + basic.twoDigitFormat(date.month);
        }
    },

    "search-input": function (box) {
        const iconFiles = {
            searchIconFile: AppSettings.componentPath + "search-input/search.svg",
            clearIconFile: AppSettings.componentPath + "search-input/clear.svg",
        };
        // GROUP: The green half
        VGroup({ width: "100%", height: "50%", align: "center center", color: App.colors.green });
            SearchInput({ styleName: "original", width: 300, height: 50, color: Black(0.2), textColor: Black(0.65), placeholderColor: Black(0.4), borderBottomStyle: "2px solid " + Black(0.2), searchIconOpacity: 0.4, ...iconFiles });
        endGroup();
        // GROUP: The white half
        VGroup({ width: "100%", height: "50%", align: "center center", color: "white" });
            SearchInput({ styleName: "original", width: 300, height: 50, placeholder: "Filter", searchIconOpacity: 0.4, ...iconFiles });
        endGroup();
    },

    "action-button": function (box) {
        box.color = App.colors.whitesmoke;
        ActionButton({
            iconFile: AppSettings.componentPath + "action-button/add.png",
            items: ["Take a Photo", "Add from Gallery", "Add from URL"],
            onAction: (self, key) => Notice.show({ messageText: key }),
        });
    },

    "progress-bar": function (box) {
        ExampleViews.startCenter(box, "white", 20);
            ProgressBar({ styleName: "ozden", width: 300, value: 40, titleText: "Progress Title:", limits: [{ value: 60, text: "60" }] });
        endGroup();
    },

    "notice": function (box) {
        const BUTTON_WIDTH = 250;
        ExampleViews.startCenter(box, "white", 4);
            ExampleViews.createButton("Info Message", "whitesmoke", BUTTON_WIDTH, () => Notice.show({ messageText: "Process completed" }));
            ExampleViews.createButton("Alert Message", App.colors.yellow, BUTTON_WIDTH, () => Notice.show({ messageText: "No internet connection.", descriptionText: "Please, try again later.", type: "warning" }));
            ExampleViews.createButton("Error Message", "#EE7553", BUTTON_WIDTH, () => Notice.show({ messageText: "Failed to copy", type: "error" }));
        endGroup();
    },

    "stepper": function (box) {
        ExampleViews.startCenter(box, App.colors.whitesmoke, 0);
            Stepper({ styleName: "ozden", value: 8, minValue: 5, maxValue: 10 });
        endGroup();
    },

    "waiting": function (box) {
        const WAIT_TIME = 1500; // ms
        ExampleViews.startCenter(box, "#BE94CA", 0);
            ExampleViews.createButton("Show Waiting", Black(0.1), 220, () => App.wait(basic.sleep(WAIT_TIME)));
        endGroup();
    },

    "web-view": function (box) {
        ExampleViews.startCenter(box, App.colors.whitesmoke, 0);
            WebView({ width: 400, height: 400, url: "html/privacy.htm", ariaLabel: "Privacy", round: 4 });
        endGroup();
    },

    "autolayout": function (box) {
        box.color = "white";
        // GROUP: The column that hugs its content, in the middle
        // WHY height "auto" + grow: a group is 100% high by default; it would push the buttons out of the page
        VGroup({ width: "100%", height: "auto", grow: 1, align: "center center" });
            VGroup({ hug: 1, align: "center center", gap: 28, padding: [12, 8], border: 1, borderColor: Black(0.1), round: 4, color: "white" });
                Label({ text: "Vegetables are healthy.", fontSize: 20, textColor: App.colors.text });
                Icon({ width: 32, height: 32 });
                that.load("assets/products/brokoli.png");
                ExampleViews.createButton("Broccoli", "seagreen", 0, () => Notice.show({ messageText: "Broccoli" }));
            endGroup();
        endGroup();
        // GROUP: The buttons at the bottom
        HGroup({ width: "100%", height: "auto", align: "center center", gap: 8, padding: [0, 30] });
            ExampleViews.createButton("Home", "#D8D8D8", 0, () => App.open("home"));
            ExampleViews.createButton("Second Page", "#D8D8D8", 0, () => App.open("second-example"));
        endGroup();
    },

    "scrolling-text": function (box) {
        ExampleViews.startCenter(box, App.colors.whitesmoke, 0);
            HGroup({ width: 220, height: 50, align: "center center", color: "white", round: 8, border: 1, borderColor: Black(0.1) });
                ScrollingText({ width: 200, labelText: "Start. Vegetables are healthy. End." });
            endGroup();
        endGroup();
    },

};

// A group that fills the page and keeps its objects in the middle (close it with endGroup())
// Tabs with the look of the old UITabs (the sizes are px of the 600 px design: scale: 1).
// WHY width max-content: the bar is as wide as its tabs, as the old one.
// look: color, textColor, height, round, outerSpace (around the selected tab), innerSpace (in a tab), sideSpace, iconSize
ExampleViews.createOldTabs = function (tabs, params = {}, look = {}) {
    const round = look.round ?? 13;
    const outerSpace = look.outerSpace ?? 1;
    const innerSpace = look.innerSpace ?? 20;
    const height = look.height ?? 50;
    const textColor = look.textColor ?? Black(0.8);
    return Tabs({
        tabs: tabs,
        variant: "pill",
        scale: 1,
        width: "max-content",
        showArrows: 0,
        style: {
            pillBar: { color: look.color ?? "#E4E4E4", padding: [outerSpace + (look.sideSpace ?? 0), outerSpace], gap: outerSpace * 2, round: round },
            tab: { fontSize: 20, textColor: textColor, padding: [innerSpace, 0], round: round, gap: 4, minHeight: height - outerSpace * 2 },
            tabHover: { color: "transparent", textColor: textColor },
            pillActive: { textColor: Black(0.8) },
            pillIndicator: { color: "white", round: round, shadow: "none", motion: 0.2 },
            icon: { size: look.iconSize ?? 28, passiveOpacity: 1 },
        },
        ...params,
    });
};

ExampleViews.startCenter = function (box, color, gap) {
    box.color = color;
    return VGroup({ align: "center center", gap: gap });
};

// width: 0 -> as wide as its text
ExampleViews.createButton = function (labelText, color, width, onClick) {
    return SmartButton({
        labelText: labelText,
        width: width || "auto",
        height: 50,
        style: { layout: { padding: [20, 0] }, box: { color: color, round: 4 }, hover: { color: color }, active: { color: color }, label: { fontSize: 20, textColor: Black(0.8) } },
        onClick: onClick,
    });
};

App.addPage({

    id: "example",
    title: "Example Preview",
    scroll: 0,

    create: function (box, params) {
        const createExample = ExampleViews[params.key];
        if (!createExample) {
            Label({ text: "No example: " + params.key, fontSize: 20, textColor: App.colors.text });
            return;
        }
        createExample(box);
    },

});
