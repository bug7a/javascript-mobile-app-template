/* Bismillah */

/*
CHECKOUT (over the tabs): one page with the address, the delivery, the payment and the summary.
WHY no card fields: a template must not teach taking card numbers in a page. A real shop opens its payment service
(Stripe, iyzico...) at "Place order"; the demo only saves the order on the device.
*/

"use strict";

App.addPage({

    id: "checkout",
    title: tx("Checkout"),

    create: function (box, params, view) {

        const FOOTER_HEIGHT = 80;
        const DELIVERIES = [
            { id: "standard", name: "Standard", note: "3-5 work days" },
            { id: "express", name: "Express", note: "Tomorrow" },
        ];
        const PAYMENTS = [
            { id: "card", name: "Credit card", note: "Connect your payment service here" },
            { id: "cash", name: "Cash on delivery", note: "Pay when it arrives" },
        ];

        let deliveryId = DELIVERIES[0].id;
        let paymentId = PAYMENTS[0].id;

        const getShippingText = function (methodId) {
            const shipping = Store.getShipping(methodId);
            return shipping ? Store.money(shipping) : tx("Free");
        };

        const drawAddress = function () {
            const address = Store.getSelectedAddress();
            addressPart.children.forEach((child) => child.remove());
            createIn(addressPart, function () {
                if (!address) {
                    ShopUI.button(tx("Add an address"), () => App.open("address-edit"), false);
                    return;
                }
                const note = address.street + ", " + address.city + "\n" + address.phone;
                const card = ShopUI.optionCard(address.name, note, "", true, () => App.open("addresses"));
                card.role = "button";
                card.aria = { label: tx("Change") + ": " + address.name };
            });
        };

        const drawDeliveries = function () {
            deliveryPart.children.forEach((child) => child.remove());
            createIn(deliveryPart, function () {
                DELIVERIES.forEach(function (delivery) {
                    ShopUI.optionCard(tx(delivery.name), tx(delivery.note), getShippingText(delivery.id),
                        delivery.id === deliveryId, function () {
                            deliveryId = delivery.id;
                            drawAll();
                        });
                });
            });
        };

        const drawPayments = function () {
            paymentPart.children.forEach((child) => child.remove());
            createIn(paymentPart, function () {
                PAYMENTS.forEach(function (payment) {
                    ShopUI.optionCard(tx(payment.name), tx(payment.note), "", payment.id === paymentId, function () {
                        paymentId = payment.id;
                        drawPayments();
                    });
                });
            });
        };

        const drawSummary = function () {
            summaryPart.children.forEach((child) => child.remove());
            createIn(summaryPart, function () {
                ShopUI.row(tx("Subtotal"), Store.money(Store.getSubtotal()));
                if (Store.discountCode) ShopUI.row(tx("Discount"), "-" + Store.money(Store.getDiscount()));
                ShopUI.row(tx("Shipping"), getShippingText(deliveryId));
                ShopUI.row(tx("Total"), Store.money(Store.getTotal(deliveryId)), true);
            });
            btnPlace.setLabelText(tx("Place order") + "  ·  " + Store.money(Store.getTotal(deliveryId)));
        };

        const drawAll = function () {
            drawAddress();
            drawDeliveries();
            drawSummary();
        };

        const placeOrder = async function () {
            if (!Store.getSelectedAddress()) {
                Toast.show({ key: "checkout", type: "error", messageText: tx("Add an address to go on.") });
                return;
            }
            // WHY the short wait: here a real shop waits for its server; the demo shows the same screen.
            const order = await App.wait(basic.sleep(600).then(() => Store.placeOrder(deliveryId, paymentId)));
            if (!order) return;
            App.closeAllPages();
            App.showTab("home");
            App.open("order", { id: order.id, isNew: 1 });
        };

        const createPart = function (title, gap = 8) {
            ShopUI.section(title);
            const part = VGroup({ width: "100%", height: "auto", gap: gap, clipContent: 0 });
            endGroup();
            return part;
        };

        const addressPart = createPart(tx("Delivery address"));
        const deliveryPart = createPart(tx("Delivery"));
        const paymentPart = createPart(tx("Payment"));
        ShopUI.section(tx("Summary"));
        App.startCard({ padding: [14, 14], round: 14, gap: 0 });
            const summaryPart = VGroup({ width: "100%", height: "auto", gap: 8 });
            endGroup();
        App.endCard();
        ShopUI.softText(tx("Demo: no payment is taken and no order is sent."), 12);

        let btnPlace = null;
        App.createFooter(view, FOOTER_HEIGHT, function () {
            btnPlace = ShopUI.button(tx("Place order"), placeOrder);
        });

        drawAll();
        drawPayments();
        box.listenTo(window, Store.EVENT, drawAll);

    },

});
