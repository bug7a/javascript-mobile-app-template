/* Bismillah */

/*
ABOUT (a page over the tabs): a plain HTML page (html/about.htm) in the app.
- Any HTML page can be a page of the app: write it as usual and open it in a WebView.
- The HTML page can call the app: window.parent.App.open("tasks")
*/

"use strict";

App.addPage({

    id: "about",
    title: "About",
    scroll: 0, // WHY: The HTML page scrolls itself.

    create: function (box) {

        WebView({ width: "100%", height: "100%", url: "html/about.htm", title: "About" });

    },

});
