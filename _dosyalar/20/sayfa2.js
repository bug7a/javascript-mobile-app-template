
// Sayfa2 nin içeriğini oluştur.
var createA2 = function() {
    
    // Kapatma düğmesi.
    a2.closeButton = createCloseButton()
    that.onClick(hideA2)
    
    // Sayfa2 yazısı.
    a2.lblDesc = createLabel()
    that.text = "Sayfa 2"
    that.fontSize = 40
    that.textColor = "white"
    that.textAlign = "center"
    that.center()
    
    // Ekranın dışına çıkan içerik. yazısı.
    a2.imgContent = createImage(0, 0, 100, 100)
    that.load("resimler/app-logo.svg")
    that.space = 20
    // Resmi, sayfa yüksekliğinden 200px daha aşağıya yerleştir.
    that.top = page.height + 200
    
}

// Sayfa2 yi gizle.
var hideA2 = function() {
    a2.visible = 0
    
}
