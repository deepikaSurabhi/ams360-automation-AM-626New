var loginWorkflow = require('common/workflow/login');
var pinWorkflow = require('common/workflow/pinEntry');
var Q = require('q');
var users = require('data/users');

describe('features.login', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        })
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login?reset'");
    });

    it('will log in with the correct username/password', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password)
            .waitForElementByCssSelector('#first-run-feature', 10000);
    });

    it('will give an error if you try to login with the wrong username and password', function () {
        return loginWorkflow(driver, 'wrong@wrong.com', 'wrong')
            .waitForElementByCssSelector('#login-feature .alert', 10000);
    });

    it('will require a new user to enter a pin', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password)
            .waitForElementByCssSelector('#pin-feature', 10000);
    });

    it('will not require a returning user to enter a pin', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password)
            .then(function () {
                return pinWorkflow(driver, '1111', '1111');
            })
            .eval("window.location.hash='#/login'")
            .then(function () {
                return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password);
            })
            .waitForElementByCssSelector('#splash-feature', 10000);
    });

});