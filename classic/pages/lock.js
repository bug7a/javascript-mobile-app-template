/* Bismillah */

/*
THE LOCK SCREEN: App.lock() shows it over everything (the lock button of the side menu); App.unlock() closes it.
It is a demo: any user name and password open the app. Put your own check (a server) in logIn().
*/

"use strict";

App.addPage({

    id: "lock",
    title: "Lock",

    create: function (box) {

        const CARD_WIDTH = 500;
        const CARD_HEIGHT = 480;
        const FIELD_LEFT = 50;
        const FIELD_WIDTH = 400;
        const FIELD_LOOK = { minimal: 1, color: "#F6F6F6", round: 8, fontSize: 20 };

        box.css = { backgroundImage: "radial-gradient(white, white, lightgray)" };

        // BOX: The card
        startBox({ width: CARD_WIDTH, height: CARD_HEIGHT, color: "white", round: 13, boxShadow: "0 0 30px " + Black(0.1) });

            Icon((CARD_WIDTH - 60) / 2, 50, 60, 60);
            that.load("assets/icons/lock.png");

            const userInput = Input(FIELD_LEFT, 200, FIELD_WIDTH, 50, { title: "User Name:", text: "admin", ...FIELD_LOOK });

            const passwordInput = Input(FIELD_LEFT, 300, FIELD_WIDTH, 50, { title: "Password:", text: "1111", ...FIELD_LOOK });
            passwordInput.inputElement.type = "password";

            // GROUP: Remember me
            HGroup({ left: FIELD_LEFT, top: 395, width: "auto", height: 40, gap: 10, align: "left center" });
                Toggle({ styleName: "classic", value: 1, backgroundStyle: { selectedColor: App.colors.green } });
                Label({ text: "Remember me", fontSize: 16, textColor: App.colors.text });
            endGroup();

            SmartButton({
                right: FIELD_LEFT,
                top: 390,
                width: 150,
                height: 50,
                labelText: "Log in",
                style: {
                    box: { color: App.colors.green, round: 4 },
                    hover: { color: "#52AE93" },
                    active: { color: "#4CA287" },
                    label: { fontSize: 24, textColor: Black(0.65) },
                },
                onClick: logIn,
            });

        endBox();

        function logIn() {
            const isFilled = userInput.text.trim() !== "" && passwordInput.text !== "";
            if (!isFilled) {
                Notice.show({ messageText: "Write your user name and password.", type: "warning" });
                return;
            }
            App.unlock();
        }

    },

});
