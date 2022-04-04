/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 22 February 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/

*/

var clickEffect = {}
clickEffect.isActive = 1

clickEffect.create = function() {

    page.onClick(function(self) {

        if (clickEffect.isActive) {

            var lastSelectedBox = getSelectedBox()
            if (lastSelectedBox != page) {
                selectBox(page)
            }

            var e = window.event;
            var posX = e.clientX;
            var posY = e.clientY;

            posX = basic.antiZoom(posX)
            posY = basic.antiZoom(posY)

            createBox(posX - 20, posY - 20, 40, 40)
            that.color = "black"
            that.round = 50
            that.border = 0
            that.borderColor = "gray"
            that.setMotion("left 0.4s, top 0.4s, opacity 0.4s, width 0.4s, height 0.4s")
            that.opacity = 0.1
            that.withMotion(function(self) {

                self.opacity = 0
                self.width += 60
                self.height += 60
                self.top -= 30
                self.left -= 30
            })
            
            var _that = that
            setTimeout(function() {

                _that.remove()
            }, 2500)

            selectBox(lastSelectedBox)
        }
    })
}

clickEffect.setActive = function(value) {
    clickEffect.isActive = value
}

            