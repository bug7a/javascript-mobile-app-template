/* Bismillah */

/*
PRODUCT (a page over the tabs): App.open("product", { item: product })
*/

"use strict";

App.addPage({

    id: "product",
    title: "Product",

    create: function (box, params) {

        const product = params.item;
        if (!product) {
            App.createText("No product.", { textColor: App.colors.softText });
            return;
        }

        // CARD: The product
        App.startCard({ align: "center top", padding: [18, 28] });

            Icon({ width: 140, height: 140 });
            that.load(product.iconFile);

            Label({ text: product.title, fontSize: 26, bold: 1, textColor: App.colors.text });
            Label({ text: product.type, fontSize: 16, textColor: App.colors.softText });
            Label({ text: "$" + product.price, fontSize: 30, bold: 1, textColor: App.colors.accent });

        App.endCard();

        App.createButton({
            tone: "cyan",
            labelText: "Add to my tasks",
            onClick: function () {
                TaskList.add("Buy " + product.title.toLowerCase());
                Toast.success("Added to your tasks.");
            },
        });

    },

});
