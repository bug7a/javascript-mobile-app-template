"use strict";
const tool = {};

tool.useImageAsText = function(parameters = {}, editCreatedImage) {

    if (!parameters.fontSize) parameters.fontSize = 20;
    if (!parameters.outerSpaceRight) parameters.outerSpaceRight = 0;
    if (!parameters.outerSpaceLeft) parameters.outerSpaceLeft = 0;

    tool.saveCurrentThat();

    const htmText = document.createElement('span');
    htmText.style.display = "inline-block";
    htmText.style.marginRight = parameters.outerSpaceRight + "px";
    htmText.style.marginLeft = parameters.outerSpaceLeft + "px";

    const box = createBox(0, 0, parameters.fontSpace, parameters.fontSpace);
    that.color = "transparent";
    that.element.style.position = "relative";
    that.element.style.overflow = "visible";

    createImage(0, 0);
    box.add(that);
    editCreatedImage(that);
    that.center();

    htmText.appendChild(box.element);

    tool.restoreThatFromSaved();
    return htmText.outerHTML;

}

tool.savedThat = null;
tool.savedExThat = null;

tool.saveCurrentThat = function() {

    tool.savedThat = that;
    tool.savedExThat = previousThat;

}

tool.restoreThatFromSaved = function() {

    that = tool.savedThat;
    previousThat = tool.savedExThat;

}