
var searchContent = {}

// BOX: Container
searchContent.box

// Meyve, sebze listesi
searchContent.plantList = [
    {title:"Broccoli", desc:"Vegetable", logo:"images/fruids/brokoli.png"},
    {title:"Strawberry", desc:"Fruit", logo:"images/fruids/cilek.png"},
    {title:"Tomato", desc:"Vegetable", logo:"images/fruids/domates.png"},
    {title:"Apple", desc:"Fruit", logo:"images/fruids/elma.png"},
    {title:"Carrot", desc:"Vegetable", logo:"images/fruids/havuc.png"},
    {title:"Watermelon", desc:"Fruit", logo:"images/fruids/karpuz.png"},
    {title:"Lemon", desc:"Fruit", logo:"images/fruids/limon.png"},
    {title:"Banana", desc:"Fruit", logo:"images/fruids/muz.png"},
    {title:"Pomegranate", desc:"Fruit", logo:"images/fruids/nar.png"},
    {title:"Eggplant", desc:"Vegetable", logo:"images/fruids/patlican.png"},
    {title:"Blueberry", desc:"Fruit", logo:"images/fruids/yabanmersini.png"},
    {title:"Green Pepper", desc:"Vegetable", logo:"images/fruids/yesilbiber.png"}
]

searchContent.createIn = function(boxView) {

    searchContent.box = boxView

    page.color = "whitesmoke"
    searchContent.box.color = "#588ABE"

    searchContent.box.objPlantList = createSearcableList(boxView.width, boxView.height)
    that.top = 0
    that.left = 0

    that.fill(searchContent.plantList)
    that.onClick(searchContent.listItemClicked)

}

searchContent.open = function() {
    navigationBar.setVisible(0)
    tabBar.setVisible(1)
    tabBar.setSelectedIndex(1)
    normalView.resize(0, tabBar.HEIGHT)
    normalView.loadContent(searchContent)
}

searchContent.listItemClicked = function(self, item, itemIndex, itemData) {

    print(itemIndex + "-" + itemData.title)

    searchPreviewContent.title = itemData.title
    searchPreviewContent.description = itemData.desc
    searchPreviewContent.imagePath = itemData.logo

    searchPreviewContent.open()

    // - self, üzerine basılan liste nesnesi.
    // - item, üzerine basılan parça.
    // - itemIndex, basılan parçanın dizideki sıra numarası.
    // - itemData, basılan parçanın dizideki elemanı.
}