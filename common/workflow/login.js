var config = require('config');

module.exports = function (driver, username, password) {
    return driver
        .eval("window.location.hash='#/login'")
        .elementByCssSelector('#login-feature input[type=email]')
        .sendKeys(username)
        .elementByCssSelector('#login-feature input[type=password]')
        .sendKeys(password)
        .elementByCssSelector('#login-feature button')
        .click();
}