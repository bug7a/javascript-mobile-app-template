/* Bismillah */

/*
HOME (a tab): a welcome card and the parts of the template to try.
*/

"use strict";

App.addPage({

    id: "home",
    title: "Home",

    create: function (box) {

        const WAIT_DEMO_TIME = 1500; // ms

        // CARD: Welcome
        App.startCard();

            Label({ text: "Welcome", fontSize: 26, bold: 1, textColor: App.colors.text });
            App.createText("This is the starter template. Every page is a file in pages/. The tabs, the menu and the colors are in app/settings.js.", {
                textColor: App.colors.softText,
            });

        App.endCard();

        App.createCaption("TRY THE PARTS");

        // CARD: The parts of the app
        App.startCard({ gap: 10 });

            App.createButton({
                labelText: "Open a page",
                onClick: () => App.open("product", { item: ProductData[0] }),
            });

            App.createButton({
                labelText: "Open a sheet",
                onClick: openDemoSheet,
            });

            App.createButton({
                labelText: "Ask a question",
                onClick: askDemoQuestion,
            });

            App.createButton({
                labelText: "Wait a moment",
                onClick: async function () {
                    await App.wait(basic.sleep(WAIT_DEMO_TIME));
                    Toast.success("The work is done.");
                },
            });

        App.endCard();

        function openDemoSheet() {
            const sheet = App.openSheet({
                titleText: "A sheet",
                height: 260,
                content: function () {
                    App.createText("A panel from the bottom: for a short choice, a filter, a share menu...");
                    App.createButton({ styleName: "ozdenPrimary", labelText: "Close", onClick: () => sheet.close() });
                },
            });
        }

        async function askDemoQuestion() {
            const isOk = await Dialog.confirm({
                titleText: "A question",
                messageText: "Dialog.confirm() waits for the answer.",
                confirmText: "Yes",
                cancelText: "No",
            });
            Toast.show({ type: "info", message: isOk ? "You said yes." : "You said no." });
        }

    },

});
