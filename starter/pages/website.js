/* Bismillah */

/*
WEBSITE (a page over the tabs): a web page from the internet in the app.
NOTE: Some sites do not let other pages show them (X-Frame-Options): WebView then shows an error after loadTimeout.
*/

"use strict";

App.addPage({

    id: "website",
    title: "Website",
    scroll: 0,

    create: function (box) {

        WebView({
            width: "100%",
            height: "100%",
            url: "https://bug7a.github.io/js-components/",
            ariaLabel: "Website",
            loadTimeout: 15,
            onTimeout: (self) => self.showError("The page could not be loaded."),
        });

    },

});
