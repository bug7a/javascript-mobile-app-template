"use strict";
App.addPage({
    id: "cart", title: "Sepetim",
    create: function (box, params, view) {
        const FOOTER_HEIGHT = 76;

        const changeCount = function (item, delta) {
            item.count += delta;
            Store.cart = Store.cart.filter((row) => row.count > 0);
            Store.saveCart();
            App.refreshTab();
        };

        const createCartRow = function (item) {
            const product = Store.findProduct(item.id);
            const isLastOne = item.count === 1;
            App.startCard({ round: 20, padding: [12, 12], border: 1, borderColor: App.colors.line });
                HGroup({ width: "100%", height: "auto", gap: 12, align: "left center" });
                    CoffeeUI.drinkImage(product.image, 64, 64);
                    VGroup({ width: "100%", height: "auto", gap: 4, shrink: 1 });
                        CoffeeUI.heading(item.name, 18);
                        CoffeeUI.text(item.size + " · " + item.milk + " · " + Store.money(item.price), 12, App.colors.softText);
                    endGroup();
                endGroup();
                HGroup({ width: "100%", height: "auto", gap: 12, align: "left center", clipContent: 0 });
                    CoffeeUI.stepper(item.count, item.name, () => changeCount(item, -1), () => changeCount(item, 1),
                        isLastOne ? App.ICON_PATHS.trash : App.ICON_PATHS.minus);
                    Label({ plainText: Store.money(item.price * item.count), grow: 1, textAlign: "right",
                        fontSize: 17, bold: 1, textColor: App.colors.text });
                endGroup();
            App.endCard();
        };

        const finishOrder = function () {
            const order = Store.order();
            if (!order) return;
            App.refreshTab();
            App.open("confirmation", { order: order });
        };

        CoffeeUI.heading("Molan hazır olsun.");
        if (!Store.cart.length) return CoffeeUI.empty("Bir kahveyle başlar.", "Sepetin şu an boş. Yeni favorini bulmaya ne dersin?");
        VGroup({ width: "100%", height: "auto", gap: 4 });
            CoffeeUI.eyebrow("MODA ŞUBESİ  ·  GEL AL");
            CoffeeUI.text("Örnek şube · Moda Caddesi 24, İstanbul", 13, App.colors.softText);
        endGroup();
        Store.cart.forEach(createCartRow);
        CoffeeUI.text("Demo akışı: ödeme alınmaz, şubeye sipariş iletilmez.", 12, App.colors.softText);

        App.createFooter(view, FOOTER_HEIGHT, function () {
            VGroup({ hug: 1, align: "left top", shrink: 0 });
                Label({ plainText: "Toplam", fontSize: 11, textColor: App.colors.softText });
                Label({ plainText: Store.money(Store.total()), fontSize: 20, bold: 1, textColor: App.colors.text });
            endGroup();
            CoffeeUI.button("Demo siparişi tamamla", finishOrder, true, { shrink: 1 });
        });
    },
});
App.addPage({
    id: "confirmation", title: "Güzel bir mola",
    create: function (box, params) {
        const CHECK_SIZE = 56;
        const order = params.order;
        startBox({ width: CHECK_SIZE, height: CHECK_SIZE, round: CHECK_SIZE / 2, color: App.colors.accent });
            const check = Icon({ width: 30, height: 30 });
            check.load(App.makeIcon(App.ICON_PATHS.check, App.colors.white));
            check.center();
        endBox();
        VGroup({ width: "100%", height: "auto", gap: 8 });
            CoffeeUI.eyebrow("DEMO SİPARİŞ OLUŞTURULDU");
            CoffeeUI.heading("Kahve kokusu\nyolda.", 36);
        endGroup();
        App.startCard({ color: App.colors.surface, round: 20, border: 1, borderColor: App.colors.line, gap: 10 });
            CoffeeUI.heading("Mola #" + order.number, 21);
            CoffeeUI.row("Örnek hazırlık süresi", "5–10 dakika");
            CoffeeUI.row(order.count + " içecek", Store.money(order.total));
        App.endCard();
        CoffeeUI.text("Bu bir önizlemedir. Gerçek sipariş verilmedi.", 12, App.colors.softText);
        CoffeeUI.button("Mola kartımı gör", () => App.open("rewards"), true);
        CoffeeUI.button("Keşfetmeye devam et", () => App.open("home"));
    },
});
