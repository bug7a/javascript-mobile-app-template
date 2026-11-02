/* Bismillah */

/*
ORDERS (over the tabs): the list of the orders, and ORDER: the status and the content of one. params: { id, isNew }
*/

"use strict";

App.addPage({

    id: "orders",
    title: tx("My orders"),

    create: function () {

        const createOrderCard = function (order) {
            const stepName = tx(Store.ORDER_STEPS[Store.getOrderStep(order)]);
            const dateText = new Date(order.date).toLocaleDateString(Texts.current);
            const card = App.startCard({ padding: [14, 12], round: 14, gap: 4 });
            card.role = "button";
            card.tabIndex = 0;
                ShopUI.row("#" + order.id, Store.money(order.total));
                ShopUI.softText(dateText + "  ·  " + tx("{count} items", { count: order.count }), 12);
                Label({ plainText: stepName, fontSize: 12, bold: 1, textColor: App.colors.accent });
            App.endCard();
            ShopUI.makePressable(card, () => App.open("order", { id: order.id }));
        };

        if (!Store.orders.length) {
            ShopUI.empty(App.ICON_PATHS.box, tx("No orders yet"), tx("Your orders will show here."),
                tx("Go to the store"), () => App.open("shop"));
            return;
        }
        Store.orders.forEach(createOrderCard);

    },

});

App.addPage({

    id: "order",
    title: (params) => tx("Order") + " #" + params.id,

    create: function (box, params) {

        const DOT_SIZE = 26;
        const LINE_HEIGHT = 18;
        const LINE_IMAGE_SIZE = 52;
        const order = Store.findOrder(params.id);
        const currentStep = Store.getOrderStep(order);

        const createThanks = function () {
            VGroup({ width: "100%", height: "auto", gap: 8, align: "center top", padding: [0, 6] });
                startBox({ width: 64, height: 64, round: 32, color: App.colors.accent });
                    const check = Icon({ width: 34, height: 34 });
                    check.load(App.makeIcon(App.ICON_PATHS.check, App.colors.white));
                    check.center();
                endBox();
                ShopUI.title(tx("Thank you!"), 24).textAlign = "center";
                ShopUI.softText(tx("Your order is placed."), 14).textAlign = "center";
            endGroup();
        };

        const createStep = function (stepName, index) {
            const isDone = (index <= currentStep);
            const isLastStep = (index === Store.ORDER_STEPS.length - 1);
            HGroup({ width: "100%", height: DOT_SIZE, gap: 12, align: "left center" });
                startBox({ width: DOT_SIZE, height: DOT_SIZE, round: DOT_SIZE / 2, shrink: 0,
                    color: isDone ? App.colors.accent : App.colors.line });
                    if (isDone) {
                        const check = Icon({ width: 16, height: 16 });
                        check.load(App.makeIcon(App.ICON_PATHS.check, App.colors.white));
                        check.center();
                    }
                endBox();
                Label({ plainText: tx(stepName), fontSize: 14, bold: (index === currentStep) ? 1 : 0,
                    textColor: isDone ? App.colors.text : App.colors.softText });
            endGroup();
            if (isLastStep) return;
            const line = Box({ width: 2, height: LINE_HEIGHT, color: (index < currentStep) ? App.colors.accent : App.colors.line });
            line.css = { marginLeft: ((DOT_SIZE / 2) - 1) + "px" };
        };

        const createLine = function (line) {
            const product = Store.findProduct(line.id);
            HGroup({ width: "100%", height: "auto", gap: 10, align: "left center" });
                ShopUI.productImage(product, LINE_IMAGE_SIZE, LINE_IMAGE_SIZE, line.colorId);
                VGroup({ width: "100%", height: "auto", gap: 2, shrink: 1 });
                    ShopUI.title(tx(product.name), 14);
                    ShopUI.softText(line.count + " × " + Store.money(line.price), 12);
                endGroup();
            endGroup();
        };

        if (params.isNew) createThanks();

        ShopUI.section(tx("Order status"));
        App.startCard({ padding: [16, 14], round: 14, gap: 0 });
            Store.ORDER_STEPS.forEach(createStep);
        App.endCard();

        ShopUI.section(tx("Items"));
        App.startCard({ padding: [12, 12], round: 14, gap: 10 });
            order.lines.forEach(createLine);
        App.endCard();

        ShopUI.section(tx("Summary"));
        App.startCard({ padding: [14, 14], round: 14, gap: 8 });
            ShopUI.row(tx("Subtotal"), Store.money(order.subtotal));
            if (order.discount) ShopUI.row(tx("Discount"), "-" + Store.money(order.discount));
            ShopUI.row(tx("Shipping"), order.shipping ? Store.money(order.shipping) : tx("Free"));
            ShopUI.row(tx("Total"), Store.money(order.total), true);
        App.endCard();

        ShopUI.section(tx("Delivery address"));
        App.startCard({ padding: [14, 12], round: 14, gap: 2 });
            ShopUI.title(order.address.name, 14);
            ShopUI.softText(order.address.street + ", " + order.address.city, 13);
        App.endCard();

        if (params.isNew) {
            ShopUI.button(tx("Keep shopping"), () => App.open("shop"));
            ShopUI.button(tx("See my orders"), function () {
                App.closeAllPages();
                App.open("orders");
            }, false);
        }

    },

});
