var loginWorkflow = require('common/workflow/login');
var pinWorkflow = require('common/workflow/pinEntry');
var Q = require('q');
var users = require('data/users');
var assert = require("assert");

describe('features.pin', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        })
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login?reset'").then(function () {
            return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password)
                .waitForElementByCssSelector('#pin-feature', 10000);
        });
    });

    it('will add characters each time a pin keyboard button is clicked', function () {
        return driver.elementByCssSelector('#pin-key-1')
            .click()
            .click()
            .elementsByCssSelector('.pin-button .filled')
            .then(function (e) {
                assert.equal(e.length, 2);
            });
    });

    it('will remove characters if the "back" button is clicked', function () {
        return driver.elementByCssSelector('#pin-key-1')
            .click()
            .click()
            .elementByCssSelector('#pin-key-back')
            .click()
            .elementsByCssSelector('.pin-button .filled')
            .then(function (e) {
                assert.equal(e.length, 1);
            });
    });

    it('will clear the characters entered if the "clear" button is clicked', function () {
        return driver.elementByCssSelector('#pin-key-1')
            .click()
            .click()
            .elementByCssSelector('#pin-key-clear')
            .click()
            .elementsByCssSelector('.pin-button .filled')
            .then(function (e) {
                assert.equal(e.length, 0);
            });
    });

    it('will show an error if the the first pin does not equal the second pin', function () {
        return pinWorkflow(driver, '1111', '2222')
            .alertText()
            .acceptAlert();
    });

});