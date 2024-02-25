/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 5 Aug 2023
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/javascript-mobile-app-template/


EXAMPLE: {javascript-mobile-app-template}/ui-waiting-view.htm


*/

// UICore
const UICore = {};

UICore.createDefaultValues = function(defaultContainerObj, params) {
    defaultContainerObj.default = {};
    defaultContainerObj.resetDefault = function() {
        for (let parameterName in params) {
            defaultContainerObj.default[parameterName] = params[parameterName];
        }
    }
    defaultContainerObj.resetDefault();
};

UICore.parseParameters = function(defaultObj, params) {
    for (let parameterName in defaultObj) {
        defaultObj[parameterName] = (params[parameterName] != undefined) ? params[parameterName] : defaultObj[parameterName];
    }
};

UICore.cloneDefaultValues = function(defaultContainerObj) {
    return JSON.parse(JSON.stringify(defaultContainerObj.default));
};
