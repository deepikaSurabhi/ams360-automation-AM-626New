var loginWorkflow = require('common/workflow/login');
var Q = require('q');
var users = require('data/users');

describe('features.login', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        });
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login?reset'");
    });

    it('will log in with the correct username/password for single agency', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000);
    });

    it('will log in with the correct username/password for multi agency', function () {
        return loginWorkflow(driver, users.multiAgency.username, users.multiAgency.password).sleep(10000)
        .waitForElementByCssSelector('#first-run-feature', 10000);
    });

    it('will give an error if you try to login with the wrong username and password', function () {
        return loginWorkflow(driver, 'wrong@wrong.com', 'wrong')
        .waitForElementByCssSelector('#login-feature .alert', 10000);
    });

    it('will give an error if you try to login without username and password', function () {
        return loginWorkflow(driver, '', '').sleep(10000)
        .waitForElementByCssSelector('#login-feature .alert', 10000);
    });

    it('will give an error if you try to login with username and without password for single agency', function () {
        return loginWorkflow(driver, users.singleAgency.username, '').sleep(10000)
        .waitForElementByCssSelector('#login-feature .alert', 10000);
    });

     it('will give an error if you try to login with username and without password for multi agency', function () {
        return loginWorkflow(driver, users.multiAgency.username, '').sleep(10000)
        .waitForElementByCssSelector('#login-feature .alert', 10000);
    });

    it('will give an error if you try to login without username and with password for single agency', function () {
        return loginWorkflow(driver, '', users.singleAgency.password).sleep(10000)
        .waitForElementByCssSelector('#login-feature .alert', 10000);
    });

    it('will give an error if you try to login without username and with password for multi agency', function () {
        return loginWorkflow(driver, '', users.multiAgency.password).sleep(10000)
        .waitForElementByCssSelector('#login-feature .alert', 10000);
    });
    

});