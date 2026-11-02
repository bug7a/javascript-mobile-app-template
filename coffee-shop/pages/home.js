"use strict";
App.addPage({
    id: "home", title: "Keşfet", gap: 20,
    create: function () {
        const featured = Store.findProduct("latte");
        const stampCount = Store.stamps % CoffeeUI.STAMP_COUNT;

        HGroup({ width: "100%", height: "auto", align: "left center" });
            Label({ text: "MODA, İSTANBUL", fontSize: 10, bold: 1, textColor: App.colors.softText, grow: 1,
                css: { letterSpacing: "1.5px" } });
            Label({ text: "GEL AL", fontSize: 10, bold: 1, textColor: App.colors.orange,
                css: { letterSpacing: "1.5px" } });
        endGroup();
        VGroup({ width: "100%", height: "auto", gap: 8 });
            CoffeeUI.heading("Bir kahve.\nKendine bir mola.", 33);
            CoffeeUI.text("Günün en güzel ritüeli, taze bir fincanda.", 13, App.colors.softText);
        endGroup();

        startBox({ width: "100%", height: 330, round: 24, color: App.colors.accent });
            Box({ right: -65, top: 42, width: 300, height: 300, round: 150, color: App.colors.accentSoft });
            Box({ right: -32, top: 74, width: 235, height: 235, round: 120, color: "transparent",
                border: 1, borderColor: App.colors.accentLine });
            Label({ left: 22, top: 23, text: "MOLA'NIN İMZASI", fontSize: 10, bold: 1,
                textColor: App.colors.peach, css: { letterSpacing: "2px" } });
            Label({ left: 22, top: 53, text: "Vanilyalı<br>Latte", fontFamily: AppSettings.headingFont,
                fontSize: 38, textColor: App.colors.white });
            Label({ left: 23, top: 150, width: 130, text: "Yumuşak espresso.<br>Tatlı bir denge.", fontSize: 12,
                textColor: App.colors.peach, lineHeight: "1.6" });
            Icon({ right: -22, top: 115, width: 190, height: 178 }).load(featured.image);
            Label({ left: 23, bottom: 83, text: featured.price + " <span style='font-size:14px'>₺</span>", fontSize: 25,
                fontFamily: AppSettings.headingFont, textColor: App.colors.white });
            CoffeeUI.button("Kahveni seç  ↗", () => App.open("drink", { id: featured.id }), false,
                { left: 22, bottom: 21, width: 150, height: 46 });
        endBox();

        App.startCard({ color: App.colors.peach, round: 20, padding: [18, 17], gap: 12 });
            HGroup({ width: "100%", height: "auto", align: "left center", gap: 10, clipContent: 0 });
                VGroup({ width: "100%", height: "auto", grow: 1, shrink: 1, gap: 4 });
                    CoffeeUI.eyebrow("MOLA CLUB");
                    CoffeeUI.heading("Bir sonraki bizden.", 20);
                endGroup();
                CoffeeUI.button("Kartım ↗", () => App.open("rewards"), false,
                    { width: 90, height: 40, shrink: 0 });
            endGroup();
            CoffeeUI.stamps(stampCount);
            CoffeeUI.text(stampCount + " / " + CoffeeUI.STAMP_COUNT + " damga  ·  Her fincan bir adım daha.", 12);
        App.endCard();
        CoffeeUI.section("Favorini bul", "Menü ↗", () => App.open("menu"));
        CoffeeUI.product(Store.findProduct("iced"));
        CoffeeUI.product(Store.findProduct("filter"));
        const closingLine = CoffeeUI.eyebrow("ÖZENLE KAVRULDU. KEYİFLE DEMLENDİ.", App.colors.softText);
        closingLine.textAlign = "center";
    },
});
