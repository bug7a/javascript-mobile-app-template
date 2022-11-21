
// Standarts for design.
const style = {};

style.colors = {};
style.colors.blue = "#689BD2";
style.colors.neutral = "#EAEAE9";
style.colors.green = "#5ABB9F";
style.colors.yellow = "#FEC108";
style.colors.red = "#FE5D49";
style.colors.purple = "#CC75AA";
style.colors.darkGray = "#141414";

style.primaryColor = style.colors.blue;
style.secondaryColor = style.colors.neutral;
style.successColor = style.colors.green;
style.infoColor = style.colors.neutral;
style.warningColor = style.colors.yellow;
style.dangerColor = style.colors.red;
style.lightColor = style.colors.neutral;
style.darkColor = style.colors.darkGray;

style.topOuterSpace = 30;
style.leftOuterSpace = 20;
style.rightOuterSpace = 20;
style.fontSize = 20;

style.titleLabel = function(lbl) {

}

style.subTitleLabel = function(lbl) {

}

style.normalLabel = function(lbl) {

    lbl.fontSize = 20;
    lbl.textColor = "#141414";

}

style.descriptionLabel = function(lbl) {

}

style.primaryButton = function(btn) {

    btn.fontSize = 20;
    btn.textColor = "#141414";
    
}

style.secondaryButton = function(btn) {


}

style.toggle = function(uiToggle) {

}

style.redToggle = function(uiToggle) {

}

style.title = function(uiTitle) {
    
    // This is after object created options.

}