
// NESNE OLUŞTURMA: Kapatma butonu

// Sayfalar için kapatma butonu oluşturur.
var createCloseButton = function() {
            
    var object = createLabel()
    that.text = "X"
    that.fontSize = 35
    that.right = 30
    that.top = 30
    that.width = basic.BUTTON_HEIGHT
    that.height = basic.BUTTON_HEIGHT
    // %40 görünen beyaz renk ile boya.
    that.color = "rgba(255, 255, 255, 0.4)"
    that.round = 30
    // Metni ortalı yap.
    that.textAlign = "center"
    that.textColor = "tomato"

    // that olarak ayarla.
    makeBasicObject(object)
    
    return object
    
}