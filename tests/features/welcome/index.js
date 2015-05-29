var loginWorkflow = require('common/workflow/login');
var Q = require('q');
var users = require('data/users');
var assert = require('assert');

describe('features.welcome', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        });
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login?reset'");
    });


    it('It will show a splash screen for the user with an image if the user has a gravatar image.', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password)
            .waitForElementByCssSelector('#splash-feature', 20000)//We'll wait for the splash screen to show, within 20 seconds
            .waitForElementByCssSelector('img:not(.ng-hide)', 5000); //We'll wait for a gravatar image to get pulled and shown in the app, in no more than 5 seconds
    });

    it('It will show a splash screen for the user without an image if the user has no gravatar image.', function () {
        return loginWorkflow(driver, users.singleAgencyNoAvatar.username, users.singleAgencyNoAvatar.password)
            .waitForElementByCssSelector('#splash-feature', 20000)//We'll wait for the splash screen to show, within 20 seconds
            .sleep(1000)
            .elementByCssSelector('img:not(.ng-hide)') //This will throw a rejection if the css selector comes up with no element
            .should.eventually.be.rejected; //This will catch that rejection, as it's expected and we want it.
    });

});