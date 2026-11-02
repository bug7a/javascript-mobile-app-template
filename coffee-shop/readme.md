# Mola Coffee — mobil uygulama teması

2026-11-01 tarihinde oluşturuldu. `starter` uygulama iskeletini ve `classic` sayfa/varlık düzenini temel alır. Arayüz basic.js ile oluşturulur; derleme adımı yoktur.

## Açılış

- Bu klasörde bir HTTP sunucusu başlat: `python3 -m http.server 5505 --bind 127.0.0.1`.
- `http://127.0.0.1:5505/index.html` adresini aç.
- Tasarım 390 px genişliğindedir ve ekrana sığdırılır (`page.fit(390, 480)`): küçük telefonda aynı düzen orantılı küçülür, yazıların satırları değişmez. Masaüstünde ortalanmış, 480 px genişliğinde görünür.
- `basic/` ve `comp/` bu klasörün içindedir: klasör tek başına çalışır.

## Ekranlar

- Keşfet: marka alanı, öne çıkan kahve, sadakat özeti ve öneri.
- Menü: altı içecek, kategori filtreleri, Türkçe/İngilizce I harfine toleranslı arama ve boş sonuç durumu.
- İçecek: boyut, süt tercihi, adet ve anlık fiyat hesabı.
- Sepet: seçeneklere göre birleştirilen ürünler, adet değiştirme, sıfıra indirerek kaldırma ve toplam.
- Demo sipariş: sonuç ekranı, sepetin temizlenmesi, sipariş geçmişi ve damgalar.
- Mola Club: sekiz damgalık kart, kazanılan demo hediye sayısı ve son beş sipariş.

## Dosyalar ve özelleştirme

- `app/settings.js`: marka, tema renkleri, sekmeler, ayrı yerel kayıt anahtarı.
- `app/app.js`: mevcut başlangıç temasından alınan sayfa/geri dönüş/Cordova/Capacitor iskeleti; bu temaya ait kopyadır. `App.createFooter(view, height, createContent)` sabit alt satırı yapar (içecek, sepet); sayfanın `create` fonksiyonu üçüncü parametre olarak `view` alır.
- `app/store.js`: örnek ürünler, fiyatlar, sepet, siparişler ve kalıcı kayıt.
- `components/coffee-ui.js`: bu temaya özel başlık, buton, seçim, adet, damga, ürün kartı ve boş durum yardımcıları.
- `pages/`: ekranların ayrı dosyaları.
- `assets/`: mevcut temadan kopyalanan içecek çizimleri ve bu tema için çizilen SVG sekme ikonları. Kaynak atıfları `assets/credits.txt` içindedir.

## Sınırlar

- Türkçe arayüz. Marka, şube, fiyatlar ve ürünler örnektir.
- Sunucu, kullanıcı hesabı, ödeme veya gerçek sipariş iletimi yoktur. Arayüzde demo olduğu belirtilir.
- Damga/hediye kayıtları demo amaçlıdır; gerçek kampanya veya hediye kullanma servisi yoktur.
- Sepet ve geçmiş yalnızca bu tarayıcıda `mola-coffee-v1-*` anahtarlarıyla saklanır.
- Cordova/Capacitor bağlantı noktaları korunmuştur; yerel cihaz paketi oluşturulup test edilmedi.

## Doğrulama

- Tüm JavaScript dosyalarının sözdizimi kontrol edildi.
- Fiyat, aynı seçenekli ürün birleştirme, sipariş/damga ve boş sipariş koruması Node VM ile doğrulandı.
- Chrome'da iki büyük boy yulaf sütlü latte: 190 ₺ × 2 = 380 ₺; sepet, demo sipariş ve 2 damga akışı doğrulandı.
- Yenileme sonrasında damga kaydı korundu.
- Soğuk kategorisi ve `iced` araması gerçek arayüzde doğrulandı.
- Masaüstü ve 375 × 844 mobil önizleme görsel olarak incelendi. Konsolda uygulama hatası görülmedi.
- Mevcut temalara veya ortak komponentlere değişiklik yapılmadı.

## Görsel düzeltmeler (2026-11-02)

- Hatalar: boş "Sepete ekle" butonu, üst üste binen ana sayfa açıklaması, başlıklardaki yok sayılan satır sonu, "Mola Club" sekmesinde ekrandan taşan alt çubuk, dar ekranda iki satıra bölünen damgalar ve başlık.
- Seçimler: kategori, boyut ve süt seçenekleri artık dolgulu; `•` ve `✓` işaretleri kalktı.
- Ana eylem: içecek ve sepette sabit alt satırda (içecek: adet + "Sepete ekle"; sepet: toplam + sipariş).
- Tab bar içeriğin üstünde yüzer; liste altından kayar. Sayfada kalan kart kesilmez.
- Arama: proje kuralı gereği `SearchInput` (`ozden`).
- İkon butonlar, sepet küçük resimleri, son adette çöp kutusu, kesik çizgili boş durumlar, tıklanabilir ürün kartı, damga dairesi.
- `softText` ve `orange` küçük yazıda okunur olsun diye koyulaştırıldı; sabit renkler `AppSettings.colors` içine taşındı.

## Yazı tipi ve telefon denemesi (2026-11-02)

- Başlık yazı tipi: `assets/fonts/gelasio.ttf` (Gelasio, SIL OFL 1.1; Georgia ile aynı ölçülerde). Android'de Georgia olmadığı için şablonla gelir; değiştirmek için `AppSettings.headingFont`.
- Arama kutusu 16 px: iPhone Safari daha küçük yazılı alana girince sayfayı yakınlaştırır.
- Chrome telefon emülasyonunda (390 × 844, çentik 47 px, ev çizgisi 34 px, dokunma) denendi. **Gerçek cihazda denenmedi**: bu makinede Xcode, Android SDK veya bağlı telefon yok.
