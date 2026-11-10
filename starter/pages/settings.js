/* Bismillah */

/*
SETTINGS (a tab): switches that are saved on the device, and the links of the app.
Read a setting anywhere: App.load("settings", {}).notifications
*/

"use strict";

App.addPage({

    id: "settings",
    title: "Settings",

    create: function (box) {

        const APP_VERSION = "1.0";
        const savedSettings = App.load("settings", {});

        App.createCaption("PREFERENCES");

        // CARD: Switches
        App.startCard({ gap: 0, padding: [18, 6] });

            createSwitchRow("notifications", "Notifications", "News and reminders");
            createSwitchRow("sounds", "Sounds", "A sound when a task is done");

        App.endCard();

        App.createCaption("APP");

        // CARD: Links
        App.startCard({ gap: 0, padding: [18, 6] });

            createLinkRow("About", () => App.open("about"));
            createLinkRow("Website", () => App.open("website"));

        App.endCard();

        App.createButton({
            tone: "orange",
            labelText: "Delete my data",
            ask: "Click again to delete the saved data.",
            onClick: deleteSavedData,
        });

        Label({ text: AppSettings.appName + " · v" + APP_VERSION, width: "100%", textAlign: "center", fontSize: 13, textColor: App.colors.softText });

        // *** FUNCTIONS:

        // A row: a title, a small text and a switch that is saved with its key
        function createSwitchRow(key, titleText, descText) {

            // GROUP: Row
            HGroup({ width: "100%", height: "auto", gap: 12, padding: [0, 12], align: "left center" });

                // GROUP: Texts
                VGroup({ width: "auto", height: "auto", align: "left center", grow: 1 });
                    Label({ text: titleText, fontSize: 17, textColor: App.colors.text });
                    Label({ text: descText, fontSize: 14, textColor: App.colors.softText });
                endGroup();

                Toggle({
                    width: 56,
                    height: 32,
                    value: savedSettings[key] ? 1 : 0,
                    backgroundStyle: { selectedColor: App.colors.accent },
                    onChange: (self) => saveSetting(key, self.value),
                });

            endGroup();

        }

        function createLinkRow(titleText, onClick) {

            // GROUP: Row
            HGroup({ width: "100%", height: 52, gap: 12, align: "left center", clickable: 1, cursor: "pointer" });
            that.on("click", onClick);

                Label({ text: titleText, fontSize: 17, textColor: App.colors.text, grow: 1 });
                Icon({ width: 20, height: 20 });
                that.load(App.makeIcon(App.ICON_PATHS.next, App.colors.softText));

            endGroup();

        }

        function saveSetting(key, value) {
            savedSettings[key] = value;
            App.save("settings", savedSettings);
        }

        function deleteSavedData() {
            App.save("settings", {});
            TaskList.saveAll([]);
            Toast.success("The saved data is deleted.");
            App.refreshTab();
        }

    },

});
