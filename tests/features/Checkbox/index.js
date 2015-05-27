var checkboxWorkflow = require('common/workflow/checkbox');
var Q = require('q');
var users = require('data/users');
var assert = require('assert');

describe('features.login', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        });
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login'").sleep(10000);
    });
    it('will log in with the correct username/password for single agency with checkbox', function () {
        //var act=driver.elementByCssSelector('#login-feature input[type=email]');
        //var exp=driver.elementByCssSelector('#login-feature input[type=email]');
        return checkboxWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000)
        .waitForElementByCssSelector('#splash-feature', 20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[4]/button')
        .click().sleep(10000)
        .eval("window.location.hash='#/login'").sleep(20000)
        .textPresent('vsso@grr.la', '#login-feature input[type=email]', true);
        //assert.equal(act, exp, "user name should be same");
    });
    });