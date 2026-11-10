/* Bismillah */

/*
CART (a tab): the lines, the way to free shipping, the discount code and the totals. The total and the next step are
in a fixed footer. The tab is made again when the data changes (Store.EVENT).
*/

"use strict";

App.addPage({

    id: "cart",
    title: tx("Cart"),

    create: function (box, params, view) {

        const FOOTER_HEIGHT = 76;
        const LINE_IMAGE_SIZE = 76;
        const PROGRESS_HEIGHT = 8;

        box.listenTo(window, Store.EVENT, App.refreshTab);

        const getOptionsText = function (line) {
            const colorName = tx(Store.getColor(line.colorId).name);
            return line.size ? colorName + "  ·  " + line.size : colorName;
        };

        const createLine = function (line) {
            const product = Store.findProduct(line.id);
            const name = tx(product.name);
            const isLastOne = (line.count === 1);
            App.startCard({ padding: [10, 10], round: 16, gap: 8, clipContent: 0 });
                HGroup({ width: "100%", height: "auto", gap: 12, align: "left center", clipContent: 0 });
                    const image = ShopUI.productImage(product, LINE_IMAGE_SIZE, LINE_IMAGE_SIZE, line.colorId);
                    image.role = "link";
                    image.tabIndex = 0;
                    image.aria = { label: tx("Open {name}", { name: name }) };
                    ShopUI.makePressable(image, () => App.open("product", { id: product.id }));
                    VGroup({ width: "100%", height: "auto", gap: 3, shrink: 1, clipContent: 0 });
                        ShopUI.title(name, 15);
                        ShopUI.softText(getOptionsText(line), 12);
                        HGroup({ width: "100%", height: "auto", gap: 8, align: "left center", clipContent: 0 });
                            ShopUI.stepper(line.count, name, () => Store.changeCount(line, -1), () => Store.changeCount(line, 1),
                                isLastOne ? App.ICON_PATHS.trash : App.ICON_PATHS.minus);
                            Label({ plainText: Store.money(line.price * line.count), grow: 1, textAlign: "right",
                                fontSize: 15, bold: 1, textColor: App.colors.text });
                        endGroup();
                    endGroup();
                endGroup();
            App.endCard();
        };

        const createShippingProgress = function () {
            const moneyLeft = Store.getShippingLeft();
            const progress = 1 - (moneyLeft / AppSettings.freeShippingFrom);
            App.startCard({ padding: [14, 12], round: 14, gap: 8, color: App.colors.accentSoft });
                ShopUI.text(moneyLeft ? tx("{amount} more for free shipping", { amount: Store.money(moneyLeft) }) : tx("You get free shipping"), 13).bold = 1;
                startBox({ width: "100%", height: PROGRESS_HEIGHT, round: PROGRESS_HEIGHT / 2, color: App.colors.white });
                    Box({ left: 0, top: 0, width: (progress * 100) + "%", height: "100%", round: PROGRESS_HEIGHT / 2, color: App.colors.accent });
                endBox();
            App.endCard();
        };

        const createDiscountRow = function () {
            const applyCode = function () {
                if (Store.setDiscountCode(codeInput.text)) return;
                Toast.show({ key: "discount-code", type: "error", messageText: tx("This code is not valid.") });
            };
            HGroup({ width: "100%", height: "auto", gap: 8, align: "left center", clipContent: 0 });
                const codeInput = Input({ width: "100%", height: 46, shrink: 1, placeholder: tx("Discount code"), fontSize: 16,
                    color: App.colors.surface, textColor: App.colors.text, round: 12, border: 1, borderColor: App.colors.line,
                    aria: { label: tx("Discount code") } });
                ShopUI.button(tx("Apply"), applyCode, false, { width: "auto", height: 46, shrink: 0 });
            endGroup();
        };

        const createAppliedCode = function () {
            HGroup({ width: "100%", height: "auto", gap: 8, align: "left center", clipContent: 0 });
                Label({ plainText: tx("Code {code} is applied.", { code: Store.discountCode }), grow: 1, shrink: 1,
                    fontSize: 13, bold: 1, textColor: App.colors.accent });
                ShopUI.linkButton(tx("Remove"), () => Store.setDiscountCode(""));
            endGroup();
        };

        if (!Store.cart.length) {
            ShopUI.empty(App.ICON_PATHS.bag, tx("Your cart is empty"), tx("Find something you like and it will wait for you here."),
                tx("Go to the store"), () => App.open("shop"));
            return;
        }

        createShippingProgress();
        Store.cart.forEach(createLine);
        if (Store.discountCode) {
            createAppliedCode();
        } else {
            createDiscountRow();
        }

        App.startCard({ padding: [14, 14], round: 14, gap: 8 });
            ShopUI.row(tx("Subtotal"), Store.money(Store.getSubtotal()));
            if (Store.discountCode) ShopUI.row(tx("Discount"), "-" + Store.money(Store.getDiscount()));
            const shipping = Store.getShipping();
            ShopUI.row(tx("Shipping"), shipping ? Store.money(shipping) : tx("Free"));
        App.endCard();

        App.createFooter(view, FOOTER_HEIGHT, function () {
            VGroup({ hug: 1, align: "left top", shrink: 0 });
                Label({ plainText: tx("Total"), fontSize: 11, textColor: App.colors.softText });
                Label({ plainText: Store.money(Store.getTotal()), fontSize: 20, bold: 1, textColor: App.colors.text });
            endGroup();
            ShopUI.button(tx("Checkout"), () => App.open("checkout"), true, { shrink: 1 });
        });

    },

});
