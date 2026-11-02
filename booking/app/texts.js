/* Bismillah */

/*

Mobile App Template: Booking - Texts - v26.11

THE TEXTS OF THE APP: the English text is the key; every text shown goes through tx().
A new language: add its list to Texts and its name to Texts.languages. A text without a translation stays in English.

*/

"use strict";

const Texts = {};

Texts.STORAGE_KEY = "booking-template-language";
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

// tx("Book now"), tx("{count} min", { count: 30 })
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
    "Services": "Hizmetler",
    "Bookings": "Randevular",
    "Account": "Hesabım",
    "Book": "Randevu al",
    "Change the time": "Saati değiştir",
    "Appointment": "Randevu",
    "My details": "Bilgilerim",
    "Back": "Geri",

    // Home
    "Hello, {name}": "Merhaba, {name}",
    "NEXT APPOINTMENT": "SIRADAKİ RANDEVU",
    "Your time, your way": "Senin zamanın, senin tarzın",
    "Pick a service and book in under a minute.": "Bir hizmet seç, bir dakikadan kısa sürede randevu al.",
    "Book now": "Randevu al",
    "Popular services": "Popüler hizmetler",
    "See all": "Tümü",
    "Our team": "Ekibimiz",
    "Find us": "Bize ulaş",
    "Mon-Sat {start}-{end}": "Pzt-Cmt {start}-{end}",

    // The services
    "All": "Tümü",
    "Hair": "Saç",
    "Skin": "Cilt",
    "Nails": "Tırnak",
    "Search services": "Hizmet ara",
    "Nothing found": "Sonuç yok",
    "Try another word or category.": "Başka bir kelime ya da kategori dene.",
    "{count} min": "{count} dk",
    "Book {name}": "{name} için randevu al",
    "Women's haircut": "Kadın saç kesimi",
    "Men's haircut": "Erkek saç kesimi",
    "Color and blow-dry": "Boya ve fön",
    "Blow-dry": "Fön",
    "Classic facial": "Klasik cilt bakımı",
    "Deep cleansing": "Derin temizlik",
    "Manicure": "Manikür",
    "Gel pedicure": "Kalıcı pedikür",
    "Cut, wash and style": "Kesim, yıkama ve şekillendirme",
    "A quick, clean cut": "Hızlı ve temiz kesim",
    "Full color with a finish": "Tam boya ve son dokunuş",
    "Smooth and full of volume": "Pürüzsüz ve hacimli",
    "Cleanse, massage and mask": "Temizlik, masaj ve maske",
    "For tired, oily skin": "Yorgun ve yağlı ciltler için",
    "Shape, care and polish": "Şekil, bakım ve oje",
    "Lasts three weeks": "Üç hafta dayanır",

    // The booking
    "Who would you like?": "Kimi tercih edersin?",
    "Any": "Fark etmez",
    "Choose a day": "Gün seç",
    "Choose a time": "Saat seç",
    "Morning": "Sabah",
    "Afternoon": "Öğleden sonra",
    "Previous week": "Önceki hafta",
    "Next week": "Sonraki hafta",
    "Closed": "Kapalı",
    "No free times": "Boş saat yok",
    "Try another day or person.": "Başka bir gün ya da kişi dene.",
    "Note (optional)": "Not (isteğe bağlı)",
    "Confirm": "Onayla",
    "Save the change": "Değişikliği kaydet",
    "This time was just taken. Choose another one.": "Bu saat az önce doldu. Başka bir saat seç.",
    "Choose a time first": "Önce saat seç",

    // The appointments
    "Thank you!": "Teşekkürler!",
    "Your appointment is booked.": "Randevun oluşturuldu.",
    "Your appointment is changed.": "Randevun değiştirildi.",
    "Upcoming": "Yaklaşan",
    "Past": "Geçmiş",
    "Cancelled": "İptal edildi",
    "No upcoming appointments": "Yaklaşan randevu yok",
    "Your next visit will show here.": "Sonraki randevun burada görünecek.",
    "No past appointments": "Geçmiş randevu yok",
    "Your visits will show here.": "Ziyaretlerin burada görünecek.",
    "Date": "Tarih",
    "Time": "Saat",
    "Service": "Hizmet",
    "With": "Görevli",
    "Duration": "Süre",
    "Price": "Ücret",
    "Pay at the studio.": "Ödemeyi stüdyoda yaparsın.",
    "Note": "Not",
    "Book again": "Tekrar randevu al",
    "Cancel the appointment": "Randevuyu iptal et",
    "Cancel the appointment?": "Randevu iptal edilsin mi?",
    "Yes, cancel": "Evet, iptal et",
    "Keep it": "Vazgeç",
    "Demo: no appointment is sent to a studio.": "Demo: randevu bir stüdyoya iletilmez.",

    // The account
    "Language": "Dil",
    "Reset the demo data": "Demo verilerini sıfırla",
    "Reset the demo data?": "Demo verileri sıfırlansın mı?",
    "The appointments and your details go back to the start.": "Randevular ve bilgilerin başa döner.",
    "Reset": "Sıfırla",
    "Full name": "Ad soyad",
    "Phone": "Telefon",
    "Save": "Kaydet",
    "Fill in every field.": "Bütün alanları doldur.",
    "Saved": "Kaydedildi",
};
