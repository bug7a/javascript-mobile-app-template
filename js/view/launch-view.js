const launchView = {};

launchView.create = function(parameters = {}) {

    if (!parameters.delayTime) parameters.delayTime = 1300;

    // BOX: Content container box.
    const box = createBox(0, 0, page.width, page.height);
    that.border = 0;
    that.color = "whitesmoke";
    that.setMotion("opacity 0.2s");

    // IMAGE: clock icon or your app logo image.
    box.imgLogo = createImage(0, 0, 50, 50);
    box.add(that);
    that.load("assets/launch-view/logo.png");
    that.opacity = 1;
    that.center();

    setTimeout(function() {

        box.opacity = 0;

        setTimeout(function() {
            box.remove();
        }, 250);

    }, parameters.delayTime);

}