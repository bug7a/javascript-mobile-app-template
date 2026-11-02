/* Bismillah */

/*
SETTINGS (a tab): rows in groups (SettingsRow). A row has a title, a small text and a control at the right (Toggle,
FullScreenSelect, the color square, Stepper) or an arrow. The values are saved on the device:
App.load("settings", {}).fontSize
*/

"use strict";

App.addPage({

    id: "settings",
    title: "Settings",
    topBar: 1,
    titleAlign: "left",
    topBarLine: 1,
    bottomBarLine: 1,

    create: function (box) {

        // The small text of the video quality; Low and High also show a notice when they are chosen
        const VIDEO_TEXTS = {
            Low: { desc: "Current quality: 25%", notice: "Videos will look very poor quality." },
            Standard: { desc: "", notice: "" },
            High: { desc: "Remaining disk space: 2.3GB", notice: "Videos will take up a lot of space." },
        };
        const DELETE_COLOR = "orangered";
        const FONT_SIZE_STEPPER_WIDTH = 180;
        const saved = App.load("settings", {});
        const videoQuality = saved.videoQuality || "High";

        SettingsRow.createSection("APPEARANCE");
        SettingsRow({ titleText: "Dark Mode", descText: "Use interface colors inverted.", control: () => createToggle("darkMode", 1) });
        SettingsRow({ titleText: "Theme", control: () => createSelect("theme", ["Default", "StarWars", "Supernova", "Metro", "Flatty", "Material", "1990s"], "StarWars") });
        SettingsRow({ titleText: "Menu Style", descText: "Choose how your navigation menu appears.", arrow: 1, onClick: () => App.open("menu-style") });
        SettingsRow({ titleText: "Primary Color", descText: "Choose a color for the colored interface buttons.", control: createColorSquare });

        SettingsRow.createSection("SYSTEM");
        SettingsRow({ titleText: "Update", control: () => createSelect("update", ["Auto", "Ask to me", "Off"], "Auto") });
        SettingsRow({ titleText: "Only When Charging", descText: "The app only updates when plugged in.", control: () => createToggle("onlyWhenCharging", 1) });
        SettingsRow({ titleText: "Notifications", control: () => createSelect("notifications", ["On", "Friends only", "Off", "Do not disturb 1 hour", "Do not disturb 24 hours"], "Friends only") });
        SettingsRow({ titleText: "Font Size", control: createFontSizeStepper });
        SettingsRow({ titleText: "Language", control: () => createSelect("language", ["English", "Spanish", "French", "Türkçe"], "English") });

        SettingsRow.createSection("DOWNLOADS");
        SettingsRow({ titleText: "Download Over Wi-Fi Only", control: () => createToggle("wifiOnly", 1, App.colors.danger) });
        const videoRow = SettingsRow({
            titleText: "Video Quality",
            descText: getVideoTexts(videoQuality).desc,
            control: () => createSelect("videoQuality", ["Low", "Standard", "High"], videoQuality, paintVideoQuality),
        });
        createDeleteRow("Delete All Downloads", "Nothing will be deleted. It is a demo.", () => Notice.show({ messageText: "All downloads still exist." }));

        SettingsRow.createSection("OTHERS");
        SettingsRow({ titleText: "Security", arrow: 1, onClick: () => App.open("security") });
        SettingsRow({ titleText: "Privacy Policy and Terms of Use", arrow: 1, onClick: () => App.open("privacy") });
        createDeleteRow("Delete My Data", "The tasks and the settings of this device.", deleteSavedData);

        // BOX: The space at the end
        Box({ width: "100%", height: 120, color: App.colors.whitesmoke });

        // *** ROWS:

        // An orangered row with a trash icon; a tap on the row runs onClick
        function createDeleteRow(titleText, descText, onClick) {
            return SettingsRow({
                titleText: titleText,
                descText: descText,
                titleColor: DELETE_COLOR,
                control: () => createRowIcon("assets/icons/trash.svg"),
                onClick: onClick,
            });
        }

        // *** CONTROLS (the row puts them at its right side, in the middle):

        function createRowIcon(iconFile) {
            Icon({ width: 36, height: 36, opacity: 0.8 });
            that.load(iconFile);
            return that;
        }

        function createToggle(key, defaultValue, onColor = App.colors.toggle) {
            return Toggle({
                styleName: "classic",
                value: saved[key] ?? defaultValue,
                backgroundStyle: { selectedColor: onColor },
                onChange: (self) => saveSetting(key, self.value),
            });
        }

        // onSelect(name): after the choice is saved (Ex: the small text of the row changes)
        function createSelect(key, names, defaultName, onSelect) {
            return FullScreenSelect({
                height: 50,
                autoWidth: 1,
                items: names,
                selectedKey: saved[key] || defaultName,
                placeholderText: "Filter",
                arrowIconFile: AppSettings.componentPath + "full-screen-select/arrow.svg",
                closeIconFile: AppSettings.componentPath + "full-screen-select/cancel.svg",
                searchIconFile: AppSettings.componentPath + "search-input-v2/search.svg",
                clearIconFile: AppSettings.componentPath + "search-input-v2/clear.svg",
                style: { box: { color: "white" }, itemSelected: { color: "#E1F0FF" } },
                onChange: function (self) {
                    saveSetting(key, self.selectedKey);
                    if (onSelect) onSelect(self.selectedKey);
                },
            });
        }

        // A square of the primary color: it opens the color dialog
        function createColorSquare() {
            const square = Box({
                width: 40,
                height: 40,
                color: saved.primaryColor || App.colors.blue,
                border: 2,
                borderColor: "#141414",
                round: 4,
                clickable: 1,
                cursor: "pointer",
                role: "button",
                tabIndex: 0,
                aria: { label: "Primary color" },
            });
            square.on("click", function () {
                ColorDialog.open(square.color, function (color) {
                    square.color = color;
                    saveSetting("primaryColor", color);
                });
            });
            return square;
        }

        function createFontSizeStepper() {
            return Stepper({
                styleName: "ozden",
                width: FONT_SIZE_STEPPER_WIDTH,
                value: saved.fontSize || 18,
                min: 18,
                max: 24,
                unitText: "px",
                ariaLabel: "Font size",
                onChange: (self) => saveSetting("fontSize", self.value),
            });
        }

        // *** FUNCTIONS:

        function getVideoTexts(name) {
            return VIDEO_TEXTS[name] || VIDEO_TEXTS.Standard;
        }

        function paintVideoQuality(name) {
            const texts = getVideoTexts(name);
            videoRow.setDescText(texts.desc);
            if (texts.notice === "") return;
            Notice.show({ messageText: texts.notice, type: "warning" });
        }

        function saveSetting(key, value) {
            saved[key] = value;
            App.save("settings", saved);
        }

        function deleteSavedData() {
            ConfirmDialog.open({
                questionText: "Delete the tasks and the settings?",
                actionText: "DELETE",
                onConfirm: function () {
                    App.save("settings", {});
                    App.setMenuSide(AppSettings.menuSide); // (the menu goes back to its first side)
                    TaskList.saveAll([]);
                    App.refreshTab();
                    Notice.show({ messageText: "The saved data is deleted.", type: "success" });
                },
            });
        }

    },

});
