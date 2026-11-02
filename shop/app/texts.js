/* Bismillah */

/*

Mobile App Template: Shop - Texts - v26.11

THE TEXTS OF THE APP: the English text is the key; every text shown goes through tx().
A new language: add its list to Texts and its name to Texts.languages. A text without a translation stays in English.

*/

"use strict";

const Texts = {};

Texts.STORAGE_KEY = "shop-template-language";
Texts.languages = { en: "English", tr: "Türkçe" };

const getFirstLanguage = function () {
    const browserLanguage = (navigator.language || "en").slice(0, 2);
    const savedLanguage = basic.storage.loadOr(Texts.STORAGE_KEY, browserLanguage);
    return Texts.languages[savedLanguage] ? savedLanguage : "en";
};

Texts.current = getFirstLanguage();

Texts.setLanguage = function (language) {
    basic.storage.save(Texts.STORAGE_KEY, language);
    location.reload(); // WHY: every page and the tab bar are made again with the new texts.
};

// tx("Add to cart"), tx("{count} items", { count: 3 })
const tx = function (text, values = {}) {
    const list = Texts[Texts.current] || {};
    let result = list[text] ?? text;
    Object.keys(values).forEach(function (name) {
        result = result.replace("{" + name + "}", values[name]);
    });
    return result;
};

Texts.tr = {
    // The tabs and the pages
    "Home": "Ana sayfa",
    "Shop": "Mağaza",
    "Cart": "Sepet",
    "Account": "Hesabım",
    "Favorites": "Favoriler",
    "My orders": "Siparişlerim",
    "Addresses": "Adreslerim",
    "New address": "Yeni adres",
    "Checkout": "Ödeme",
    "Order": "Sipariş",
    "Back": "Geri",

    // The categories
    "All": "Tümü",
    "Bags": "Çantalar",
    "Shoes": "Ayakkabılar",
    "Living": "Yaşam",
    "Tech": "Teknoloji",

    // Home
    "Search the store": "Mağazada ara",
    "WELCOME OFFER": "HOŞ GELDİN FIRSATI",
    "10% off your first order": "İlk siparişine %10 indirim",
    "Use the code {code} in your cart.": "Sepette {code} kodunu kullan.",
    "Shop now": "Alışverişe başla",
    "Categories": "Kategoriler",
    "On sale": "İndirimde",
    "New arrivals": "Yeni gelenler",
    "See all": "Tümü",

    // Shop
    "Search products": "Ürün ara",
    "{count} products": "{count} ürün",
    "Sort": "Sırala",
    "Sort by": "Sıralama",
    "Most popular": "En popüler",
    "Price: low to high": "Fiyat: artan",
    "Price: high to low": "Fiyat: azalan",
    "Top rated": "En yüksek puan",
    "Nothing found": "Sonuç yok",
    "Try another word or category.": "Başka bir kelime ya da kategori dene.",

    // The product
    "Color: {name}": "Renk: {name}",
    "Size": "Beden",
    "Description": "Açıklama",
    "Reviews": "Yorumlar",
    "You may also like": "Bunları da beğenebilirsin",
    "Only {count} left": "Son {count} ürün",
    "In stock": "Stokta",
    "Free shipping over {amount}": "{amount} üzeri ücretsiz kargo",
    "30-day free returns": "30 gün ücretsiz iade",
    "Add to cart": "Sepete ekle",
    "Added to cart": "Sepete eklendi",
    "View": "Gör",
    "Add to favorites": "Favorilere ekle",
    "Remove from favorites": "Favorilerden çıkar",
    "{name}, decrease": "{name}, azalt",
    "{name}, increase": "{name}, artır",
    "Open {name}": "{name} ürününü aç",

    // The colors
    "Black": "Siyah",
    "Sand": "Kum",
    "Olive": "Zeytin",
    "Navy": "Lacivert",
    "Clay": "Kil",
    "White": "Beyaz",
    "Sage": "Adaçayı",
    "Terracotta": "Kiremit",
    "Silver": "Gümüş",

    // The cart
    "Your cart is empty": "Sepetin boş",
    "Find something you like and it will wait for you here.": "Beğendiğin bir şey bul, burada seni beklesin.",
    "Go to the store": "Mağazaya git",
    "You get free shipping": "Ücretsiz kargo kazandın",
    "{amount} more for free shipping": "Ücretsiz kargo için {amount} daha",
    "Discount code": "İndirim kodu",
    "Apply": "Uygula",
    "Remove": "Kaldır",
    "Code {code} is applied.": "{code} kodu uygulandı.",
    "This code is not valid.": "Bu kod geçerli değil.",
    "Subtotal": "Ara toplam",
    "Discount": "İndirim",
    "Shipping": "Kargo",
    "Free": "Ücretsiz",
    "Total": "Toplam",

    // Checkout
    "Delivery address": "Teslimat adresi",
    "Change": "Değiştir",
    "Add an address": "Adres ekle",
    "Add an address to go on.": "Devam etmek için adres ekle.",
    "Delivery": "Teslimat",
    "Standard": "Standart",
    "3-5 work days": "3-5 iş günü",
    "Express": "Hızlı",
    "Tomorrow": "Yarın",
    "Payment": "Ödeme",
    "Credit card": "Kredi kartı",
    "Connect your payment service here": "Ödeme servisini buraya bağla",
    "Cash on delivery": "Kapıda ödeme",
    "Pay when it arrives": "Teslimatta öde",
    "Summary": "Özet",
    "Demo: no payment is taken and no order is sent.": "Demo: ödeme alınmaz, sipariş iletilmez.",
    "Place order": "Siparişi ver",

    // The order
    "Thank you!": "Teşekkürler!",
    "Your order is placed.": "Siparişin alındı.",
    "Order status": "Sipariş durumu",
    "Placed": "Alındı",
    "Packed": "Hazırlandı",
    "On the way": "Yolda",
    "Delivered": "Teslim edildi",
    "Items": "Ürünler",
    "Keep shopping": "Alışverişe devam et",
    "See my orders": "Siparişlerimi gör",
    "{count} items": "{count} ürün",
    "No orders yet": "Henüz sipariş yok",
    "Your orders will show here.": "Siparişlerin burada görünecek.",

    // Favorites
    "No favorites yet": "Henüz favori yok",
    "Tap a heart to keep a product here.": "Bir ürünü burada tutmak için kalbe dokun.",

    // Account and addresses
    "Demo account": "Demo hesap",
    "Language": "Dil",
    "Reset the demo data": "Demo verilerini sıfırla",
    "Reset the demo data?": "Demo verileri sıfırlansın mı?",
    "The cart, the favorites, the orders and the addresses go back to the start.":
        "Sepet, favoriler, siparişler ve adresler başa döner.",
    "Reset": "Sıfırla",
    "Cancel": "Vazgeç",
    "No addresses yet": "Henüz adres yok",
    "Add one to use it at checkout.": "Ödemede kullanmak için bir adres ekle.",
    "Delete": "Sil",
    "Delete this address?": "Bu adres silinsin mi?",
    "Full name": "Ad soyad",
    "Phone": "Telefon",
    "Street address": "Açık adres",
    "City": "Şehir",
    "Save the address": "Adresi kaydet",
    "Fill in every field.": "Bütün alanları doldur.",

    // The products
    "Everyday Tote": "Günlük Bez Çanta",
    "Roomy canvas tote with long handles and an inner pocket. Made for the market, the office and everything in between.":
        "Uzun saplı, iç cepli geniş kanvas çanta. Pazar, ofis ve aradaki her şey için.",
    "City Backpack": "Şehir Sırt Çantası",
    "A light backpack with a padded laptop sleeve and a front pocket for the small things.":
        "Yastıklı laptop bölmeli, küçük eşyalar için ön cepli hafif sırt çantası.",
    "Mini Crossbody": "Mini Askılı Çanta",
    "Small on the outside, surprisingly roomy on the inside. The strap adjusts to any height.":
        "Dıştan küçük, içi şaşırtıcı derecede geniş. Askısı her boya ayarlanır.",
    "Cloud Sneaker": "Bulut Spor Ayakkabı",
    "Soft foam soles and a breathable upper. The pair you reach for every morning.":
        "Yumuşak köpük taban ve nefes alan üst yüzey. Her sabah ilk seçtiğin çift.",
    "Trail Boot": "Patika Botu",
    "A warm boot with a strong grip, ready for rain, mud and long walks.":
        "Sağlam tutuşlu sıcak bot; yağmura, çamura ve uzun yürüyüşlere hazır.",
    "Summer Sandal": "Yazlık Sandalet",
    "Two soft straps and a shaped sole. Light enough to forget you have them on.":
        "İki yumuşak bant ve şekilli taban. Giydiğini unutturacak kadar hafif.",
    "Stoneware Mug": "Taş Kupa",
    "A heavy, hand-glazed mug that keeps your coffee warm a little longer.":
        "Kahveni biraz daha uzun sıcak tutan, elde sırlanmış ağır kupa.",
    "Soft Desk Lamp": "Yumuşak Masa Lambası",
    "Warm, even light for late work. The shade tilts and the light dims in three steps.":
        "Geç saatler için sıcak ve dengeli ışık. Başlığı eğilir, ışığı üç kademede kısılır.",
    "Ceramic Planter": "Seramik Saksı",
    "A round planter with a drainage hole and a matching saucer. The plant is included.":
        "Su deliği ve uyumlu tabağı olan yuvarlak saksı. Bitkisi de dahil.",
    "Quiet Headphones": "Sessiz Kulaklık",
    "Noise-cancelling headphones with 40 hours of battery and soft ear cushions.":
        "40 saat pil ömürlü, yumuşak yastıklı, gürültü engelleyici kulaklık.",
    "Daily Watch": "Günlük Saat",
    "A clean face, a soft strap and a week of battery. It tracks your steps and your sleep.":
        "Sade kadran, yumuşak kordon ve bir hafta pil. Adımlarını ve uykunu takip eder.",
    "Pocket Speaker": "Cep Hoparlörü",
    "A small speaker with a big sound. Waterproof, with 12 hours of music.":
        "Küçük hoparlör, büyük ses. Suya dayanıklı, 12 saat müzik.",

    // The reviews
    "Better than I expected. I use it every day.": "Beklediğimden iyi. Her gün kullanıyorum.",
    "Good quality and it arrived fast.": "Kalitesi iyi, hızlı geldi.",
};
