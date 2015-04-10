var config = require('config');

module.exports = function (driver, firstPin, secondPin) {
    var driverPromise = driver
        .waitForElementByCssSelector('#pin-feature', 10000);

    for(var i = 0, l = firstPin.length; i < l; i++) {
        driverPromise = driverPromise.elementByCssSelector('#pin-key-' + firstPin[i]).click()
    }

    driverPromise = driverPromise.waitForElementByCssSelector('#pin-confirm-text', 10000);

    for(var i = 0, l = secondPin.length; i < l; i++) {
        driverPromise = driverPromise.elementByCssSelector('#pin-key-' + secondPin[i]).click()
    }

    return driverPromise;
}