/*

ARANABİLİR LİSTE NESNESİ

Kendi nesnelerinizi oluştururken, bu yapıyı taslak olarak kullanabilirsiniz.

Çalışma Mantığı:

Object isminde bir değişken oluşturuluyor. İçine bir Box nesnesi atanıyor.
- Kullanılacak değişken, fonksiyon ve diğer nesneler; bu ana nesne içinde eleman olarak oluşturuluyor.
- Sonuç olarak elimizde tüm algoritmayı taşıyan tek bir object değişkeni oluyor.
- Bu paket, cevap olarak fonksiyonun çağırıldığı kod satırına gönderiliyor.

object bir Box nesnesinin tüm özelliklerini taşırken, mesela;
object.top
object.color
object.border

Aynı zamanda, yeni oluşturulan fonksiyonları da taşıyor. mesela;
object.fill(dataArray)
object.getSelectedIndex()

*/

var createSearcableList = function(objectWidth = 400, objectHeight = 450) {

    // NESNE: EN DIŞTAKİ TAŞIYICI ALAN
    var object = createBox()
    that.width = objectWidth
    that.height = objectHeight
    that.color = "whitesmoke"
    that.round = 0
    that.border = 0

    // NOT: Nesnenin konumu, oluşturulduğu yerden belirleniyor.

    // PAKET İÇİNDEKİ DEĞİŞKENLER
    object.dataList = []
    // İlk parçanın sıra numarası 0 olduğu için, seçim yok ise -1 kullanılır.
    object.selectedIndex = -1
    object.selectedColor = "whitesmoke"
    object.lastSearchedWord = undefined
    object.runWhenItemClicked = undefined

    // NESNE: ARAMA İÇİN TAŞIYICI ALAN
    object.boxSearchArea = createBox(10, 10)
    that.width = objectWidth - 20
    that.height = 60
    that.color = "whitesmoke"
    that.round = 14
    that.border = 0

    // NESNE: ARAMA KÜÇÜK RESİM
    object.boxSearchArea.imgIcon = createImage(15, 15, 30 ,30)
    that.load("images/search.svg")
    that.opacity = 0.6

    // NESNE: ARAMA METİN KUTUSU
    object.boxSearchArea.txtSearch = createTextBox(60, 5)
    that.width = 310
    that.border = 0
    that.minimal = 1
    that.color = "whitesmoke"
    // TextBox a placeholder ekle.
    that.inputElement.setAttribute("placeholder", "Search")

    // NESNE: PARÇALAR İÇİN TAŞIYICI ALANI
    object.boxItemsArea = createBox()
    that.left = 0
    that.top = object.boxSearchArea.height + 20
    that.width = objectWidth
    that.height = objectHeight - object.boxSearchArea.height - 20
    that.color = "white"
    that.border = 0
    that.borderColor = "lightgray"
    // Bu alanda dikey kaydırmaya izin ver.
    that.scrollY = 1
    that.scrollX = 1
    
    // PAKET İÇİNDEKİ FONKSİYONLAR
    // Yeni bir parça oluşturma fonksiyonu.
    object.createSearcableListItem = function(title, desc, image, topSpace) {

        // LİSTE İÇİNDEKİ BİR HER BİR PARÇA

        // NESNE: PARÇANIN ARKA PLANI
        var itemObject = createBox(0, topSpace, objectWidth, 90)
        that.round = 0
        that.border = 0
        that.color = "white"
        that.onClick(object.itemClicked)

        // NESNE: PARÇANIN RESMİ
        itemObject.imgLogo = createImage(30, 10, 70, 70)
        that.load(image)
        that.round = 4
        that.color = "transparent"
        that.border = 0

        // NESNE: PARÇANIN BAŞLIĞI // default top: 10
        itemObject.lblTitle = createLabel(120, 23, 280, "auto")
        that.text = title

        // NESNE: PARÇANIN AÇIKLAMASI // default top: 34
        itemObject.lblDesc = createLabel(120, 47, 280, "auto")
        that.text = desc
        that.textColor = "gray"
        that.fontSize = 14

        // that değişkeni ile itemObject nesnesine ulaşılabilsin.
        makeBasicObject(itemObject)

        return itemObject

    }

    // Aramayı temizle.
    object.clearSearch = function() {

        object.boxSearchArea.txtSearch.text = ""
        object.refresh()

    }

    // Arama ikonuna basıldığında, aramayı temizle
    object.boxSearchArea.imgIcon.onClick(object.clearSearch)

    // Bir parçaya basıldığında, onu aramış gibi düzenle.
    object.itemClicked = function(self) {

        // Önceki seçimi var ise temizle.
        if (object.selectedIndex > -1) {
            object.boxItemsArea["item" + object.selectedIndex].color = "white"
        }

        // Basılan parçayı seç.
        self.color = object.selectedColor
        object.selectedIndex = self.itemIndex

        // Basıldığını haber ver.
        if (object.runWhenItemClicked) {

            var itemIndex = object.getSelectedIndex()
            var item = object.getSelectedItem()
            var itemData = object.getSelectedItemData()

            object.runWhenItemClicked(object, item, itemIndex, itemData)

        }

    }

    // Tüm parçaları aramaya metnine göre yeniden oluştur.
    object.refresh = function() {

        // Aramada büyük-küçük harf hassasiyeti olmasın.
        var keyword = object.boxSearchArea.txtSearch.text.toLowerCase()

        // Eğer bir önceki ile aynı ise, kodu çalıştırma.
        if (object.lastSearchedWord != keyword) {

            // Son aramayı sakla.
            object.lastSearchedWord = keyword

            // Tüm alanı temizle.
            object.boxItemsArea.html = ""
            
            // Arama sonucunda eklenen parça sayını sakla.
            var itemCount = 0

            // Birincil ekleme alanını değiştir. (default: page nesnesi)
            // NOT: Oluşturulan nesnelerin önce page alanına eklenmemesi için.
            //selectBox(object.boxItemsArea)

            for (var i = 0; i < object.dataList.length; i++) {

                var item = object.dataList[i]

                // Aranacak metinler: başlık ve açıklama
                var itemKeyword = item.title.toLowerCase()
                var descKeyword = item.desc.toLowerCase()

                // Başlık veya açıklamada eşleşme var ise,
                if (itemKeyword.search(keyword) > -1 || descKeyword.search(keyword) > -1) {

                    // Yeni bir parça oluştur ve ekle.
                    object.boxItemsArea["item" + i] = object.createSearcableListItem(item.title, item.desc, item.logo, itemCount * 90)
                    // Sıra numarasını nesnenin içinde sakla.
                    that.itemIndex = i
                    itemCount++

                }

            }

            // Eğer seçili bir parça var ise, liste yenilendiğinde onu bul ve boya.
            if (object.selectedIndex > -1) {
                object.boxItemsArea["item" + object.selectedIndex].color = object.selectedColor
            }

            makeBasicObject(object)

            // Ekleme alanı olarak page nesnesini seç.
            //selectBox(page)

        }

    }

    // Bir harfe basılıp elini kaldırdıktan sonra, tüm parçaları güncelle.
    object.boxSearchArea.txtSearch.inputElement.addEventListener("keyup", object.refresh)

    // Seçili parçanın sıra numarasını al.
    object.getSelectedIndex = function() {

        return object.selectedIndex

    }

    // Seçili parçanın nesnesini al.
    object.getSelectedItem = function() {

        return object.boxItemsArea["item" + object.selectedIndex]

    }

    // Seçili parçanın verisini al.
    object.getSelectedItemData = function() {

        return object.dataList[object.selectedIndex]

    }

    // Listeyi veri ile doldur.
    object.fill = function(data = []) {

        object.lastSearchedWord = undefined
        object.dataList = data
        object.refresh()

    }

    // Basılma fonksiyonun ayarla.
    object.onClick = function(func) {

        object.runWhenItemClicked = func

    }

    object.addItem = function(itemTitle, itemDesc, itemLogoFileName) {

        // TODO: Yeni bir parça ekleme fonksiyonu yazılabilir.

    }

    object.removeItem = function(itemIndex) {

        // Sıra numarası verilen bir parçayı silme fonksiyonu yazılabilir.

    }

    // that değişkeni ile object nesnesine ulaşılabilsin.
    makeBasicObject(object)

    // Oluşturulan nesneyi cevap olarak gönder.
    return object

}