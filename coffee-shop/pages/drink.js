"use strict";
App.addPage({
    id: "drink", title: "Tam sana göre",
    create: function (box, params, view) {
        const FOOTER_HEIGHT = 80;
        const MAX_COUNT = 20;
        const product = Store.findProduct(params.id);
        if (!product) return CoffeeUI.empty("Kahve bulunamadı", "Menüden yeni bir kahve seçebilirsin.");
        let size = "Normal";
        let milk = "Standart";
        let count = 1;

        const getButtonText = function () {
            const total = Store.unitPrice(product, size, milk) * count;
            return "Sepete ekle  ·  " + Store.money(total);
        };

        const refreshPrice = function () {
            stepper.lblValue.plainText = String(count);
            btnAdd.setText(getButtonText());
        };

        const createOption = function (title, texts, onSelect) {
            VGroup({ width: "100%", height: "auto", gap: 10, clipContent: 0 });
                CoffeeUI.heading(title, 18);
                HGroup({ width: "100%", height: "auto", gap: 8, clipContent: 0 });
                    // WHY width 50%: both choices are as wide, whatever their texts are.
                    CoffeeUI.createChoices(texts, onSelect, { width: "50%", shrink: 1 });
                endGroup();
            endGroup();
        };

        App.startCard({ color: App.colors.peach, align: "center top", round: 26, padding: [12, 12] });
            Icon({ width: 206, height: 192 }).load(product.image);
        App.endCard();
        VGroup({ width: "100%", height: "auto", gap: 6 });
            HGroup({ width: "100%", height: "auto", gap: 10, align: "left center" });
                const name = CoffeeUI.heading(product.name, 25);
                name.grow = 1;
                name.shrink = 1;
                Label({ plainText: Store.money(product.price), fontSize: 18, bold: 1,
                    textColor: App.colors.text, shrink: 0 });
            endGroup();
            CoffeeUI.text(product.note, 14, App.colors.softText);
        endGroup();
        createOption("Boyut", ["Normal", "Büyük +25 ₺"], function (index) {
            size = index ? "Büyük" : "Normal";
            refreshPrice();
        });
        createOption("Süt tercihi", ["Standart", "Yulaf +20 ₺"], function (index) {
            milk = index ? "Yulaf" : "Standart";
            refreshPrice();
        });
        CoffeeUI.text("Sipariş üzerine, senin için taze hazırlanır. Alerjen: Süt içerebilir. Çapraz temas mümkündür.",
            12, App.colors.softText);

        let stepper = null;
        let btnAdd = null;
        App.createFooter(view, FOOTER_HEIGHT, function () {
            stepper = CoffeeUI.stepper(count, product.name, function () {
                count = Math.max(1, count - 1);
                refreshPrice();
            }, function () {
                count = Math.min(MAX_COUNT, count + 1);
                refreshPrice();
            });
            btnAdd = CoffeeUI.button(getButtonText(), function () {
                Store.add(product, size, milk, count);
                App.closeAllPages();
                App.showTab("cart"); // WHY not App.open: a cart tab that is already open must show the new drink.
            }, true, { shrink: 1 });
        });
    },
});
