
var contentSearch = {}

// BOX: İçerik taşıyıcısı
contentSearch.box

// Meyve, sebze listesi
contentSearch.plantList = [
    {title:"Brokoli", desc:"Sebze", logo:"brokoli.png"},
    {title:"Çilek", desc:"Meyve", logo:"cilek.png"},
    {title:"Domates", desc:"Sebze", logo:"domates.png"},
    {title:"Elma", desc:"Meyve", logo:"elma.png"},
    {title:"Havuç", desc:"Sebze", logo:"havuc.png"},
    {title:"Karpuz", desc:"Meyve", logo:"karpuz.png"},
    {title:"Limon", desc:"Meyve", logo:"limon.png"},
    {title:"Muz", desc:"Meyve", logo:"muz.png"},
    {title:"Nar", desc:"Meyve", logo:"nar.png"},
    {title:"Patlıcan", desc:"Sebze", logo:"patlican.png"},
    {title:"Yaban Mersini", desc:"Meyve", logo:"yabanmersini.png"},
    {title:"Yeşil Biber", desc:"Sebze", logo:"yesilbiber.png"}
]

contentSearch.create = function(boxView) {

    contentSearch.box = boxView
    contentSearch.box.color = "#588ABE"

    contentSearch.box.objPlantList = createSearcableList(boxView.width, boxView.height)
    that.top = 0
    that.left = 0

    that.fill(contentSearch.plantList)
    that.onClick(contentSearch.listItemClicked)

}

contentSearch.writeMessage = function() {
    print("Arama Sayfası")
}

// Basılan parçanın bilgilerini consola yazdır.
contentSearch.listItemClicked = function(self, item, itemIndex, itemData) {

    print(itemIndex + "-" + itemData.title)

    // - self, üzerine basılan liste nesnesi.
    // - item, üzerine basılan parça.
    // - itemIndex, basılan parçanın dizideki sıra numarası.
    // - itemData, basılan parçanın dizideki elemanı.

}