const secondExamplePage = {}
secondExamplePage.ID = "second-example"

secondExamplePage.openInSecondView = function() {

    secondView.clear()

    const box = secondView.getContainerBox()
    // Out of this function, use "secondExamplePage.box" for "box".
    secondExamplePage.box = box

    box.color = "white"

    // IMAGE: background image.
    box.imgBackground = createImage(0, 0, box.width, box.height)
    box.add(that)
    that.load("images/backgrounds/background1.jpg")
    
    // LABEL: Info text.
    box.lblContent = createLabel(0, 0, "auto", "auto")
    box.add(that)
    that.text = "Second View Example:<br>Previous view did not unload.<br>It is waiting at back."
    that.bottom = 100
    that.textAlign = "center"
    that.textColor = "rgba(0, 0, 0, 0.6)"
    that.fontSize = 22
    that.space = 6
    that.spaceX = 14
    that.round = 6
    that.onClick(secondExamplePage.writeMessage)
    that.onResize(function(self) {
        self.center("left")
    })

    // BOX: button box at top.
    box.btn1 = cbox(0, 0, 40, 40)
    box.add(that)
    that.color = "rgba(0, 0, 0, 0.4)"
    that.round = 20
    that.center()
    that.top -= 150
    that.onClick(secondExamplePage.refreshCircle)

    // BOX: button box 2 at bottom.
    box.btn2 = cbox(0, 0, 40, 40)
    box.add(that)
    that.color = "rgba(0, 0, 0, 0.4)"
    that.round = 20
    that.center()
    that.top += 150
    that.onClick(secondExamplePage.refreshCircle)

    // BOX: moving circle at center.
    box.circle = cbox(0, 0, 20, 20)
    box.add(that)
    that.color = "rgba(0, 0, 0, 0.2)"
    that.round = 100
    // Animate specified properties with CSS.
    that.setMotion("left 1s, top 1s, width 1s, height 1s, border-radius 1s, background-color 1s, opacity 1s")

    // NOT: Bu hareket özelliği, iptal edilene kadar korunur.
    // Hareket özelliğini, iptal etmek için,
    // that.setMotion("none")
    
    // İlk oluşturulma konumuna hareketsiz gider.
    that.center()
    that.opacity = 0

    // İlk oluşturulma konumundan, aşağıdaki özelliklere yumuşak geçiş (hareket) yap.
    that.withMotion(function(self) {
        self.width = 150
        self.height = 150
        self.opacity = 1
        self.center()

        // NOT: self, a0.circle nesnesinin kendisidir.

    })

    // CLOSE BUTTON: Close button.
    box.btnClose = UICloseButton.create()
    box.add(that)
    //that.color = "rgba(255, 255, 255, 0.1)"
    //that.border = 2
    //that.borderColor = "rgba(0, 0, 0, 0.1)"
    //that.imgClose.center()
    that.onClick(function() {
        secondView.close()
    })

    secondView.setVisible(1)
    print("Opened page id: " + secondExamplePage.ID)
}

secondExamplePage.refreshCircle = function(self) {

    secondExamplePage.box.circle.top = self.top - 55
    secondExamplePage.box.circle.left = self.left - 55

    // NOTE: Since CSS motion is added,
    // the property changes of the object will be with the move.

    // NOTE: Calculate the number 55: num((a0.circle.width / 2) - (self.width / 2))

    // NOTE: Here; self is the object clicked on it.
}

secondExamplePage.writeMessage = function() {
    print("Clicked on text.")
}