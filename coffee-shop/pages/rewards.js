"use strict";
App.addPage({
    id: "rewards", title: "Mola Club",
    create: function () {
        const SHOWN_ORDER_COUNT = 5;
        const stampCount = Store.stamps % CoffeeUI.STAMP_COUNT;
        const giftCount = Math.floor(Store.stamps / CoffeeUI.STAMP_COUNT);

        const createOrderRow = function (order) {
            App.startCard({ round: 18, gap: 4, border: 1, borderColor: App.colors.line });
                HGroup({ width: "100%", height: "auto", gap: 8, align: "left center" });
                    CoffeeUI.heading("Mola #" + order.number, 17).shrink = 1;
                    Label({ plainText: Store.money(order.total), fontSize: 15, bold: 1,
                        textColor: App.colors.text, shrink: 0 });
                endGroup();
                CoffeeUI.text(new Date(order.date).toLocaleDateString("tr-TR") + " · " + order.count + " içecek · Demo", 12, App.colors.softText);
            App.endCard();
        };

        VGroup({ width: "100%", height: "auto", gap: 8 });
            CoffeeUI.eyebrow("KÜÇÜK MOLALAR, GÜZEL AYRICALIKLAR");
            CoffeeUI.heading("İyi ki mola verdin.", 30);
        endGroup();
        App.startCard({ color: App.colors.accent, round: 26, padding: [22, 24], gap: 18 });
            CoffeeUI.eyebrow("MOLA CLUB  ·  SADAKAT KARTIN", App.colors.peach);
            Label({ text: stampCount + " <span style='font-size:20px'>/ " + CoffeeUI.STAMP_COUNT + "</span>",
                fontFamily: AppSettings.headingFont, fontSize: 44, textColor: App.colors.white });
            CoffeeUI.stamps(stampCount, 30, true);
            CoffeeUI.text("Bir sonraki kahve hediyene " + (CoffeeUI.STAMP_COUNT - stampCount) + " damga kaldı.", 14, App.colors.white);
            if (giftCount > 0) CoffeeUI.text("Kazanılan demo hediye: " + giftCount, 14, App.colors.peach).bold = 1;
        App.endCard();
        CoffeeUI.text("Her demo içecek bir damga kazandırır. Kartın bu cihazda saklanır.", 13, App.colors.softText);
        CoffeeUI.section("Son molaların");
        if (!Store.orders.length) CoffeeUI.text("İlk molan seni bekliyor. Siparişlerin burada görünecek.", 14, App.colors.softText);
        Store.orders.slice(0, SHOWN_ORDER_COUNT).forEach(createOrderRow);
        CoffeeUI.button("Yeni bir mola ver", () => App.open("menu"), true);
    },
});
