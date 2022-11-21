const launchView = {};

launchView.create = function(parameters = {}) {

    if (!parameters.delayTime) parameters.delayTime = 1300;

    setDefaultContainerBox(page);

    // BOX: Content container box.
    const box = createBox();
    launchView.box = box;

    box.width = page.width;
    box.height = page.height;
    box.border = 0;
    box.color = "whitesmoke";
    box.setMotion("opacity 0.2s");
    box.left = 0;
    box.top = 0;

    // IMAGE: clock icon or your app logo.
    box.imgLogo = createImage();
    box.add(that);
    that.width = 50;
    that.height = 50;
    //that.autoSize = 2;
    that.load("assets/launch-view/logo.png");
    that.opacity = 1;
    that.onLoad(function(self) {
        self.center();
    });

    restoreDefaultContainerBox();

    setTimeout(function() {

        box.opacity = 0;

        setTimeout(function() {
            box.remove();
        }, 250);

    }, parameters.delayTime);

}

launchView.showOnSafearea = function() {
    page.element.appendChild(launchView.box.element);
    // page.add(launchView.getContainerBox());
}