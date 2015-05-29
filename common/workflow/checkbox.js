var config = require('config');

module.exports = function (driver, username, password) {
    return driver
        .eval("window.location.hash='#/login'")
        .waitForElementByCssSelector('#login-feature', 10000)
        .elementByCssSelector('#login-feature input[type=email]')
        .sendKeys(username)
        .elementByCssSelector('#login-feature input[type=password]')
        .sendKeys(password)
        .elementByCssSelector('#login-feature input[type="checkbox"]')
        .click().click()
        .elementByCssSelector('#login-feature form')
        .submit();
};