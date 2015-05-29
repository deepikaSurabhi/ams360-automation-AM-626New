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
        return driver.eval("window.location.hash='#/login'").sleep(10000);
    });
    it('will logout with the username/password for single agency', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password)
        .waitForElementByCssSelector('#splash-feature', 20000).sleep(20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[4]/button').click()
        .eval("window.location.hash='#/login'").sleep(20000);
    });
    it('will logout with the username/password for multi Agency', function () {
        return loginWorkflow(driver, users.multiAgency1.username, users.multiAgency1.password).sleep(10000)
        .elementByCssSelector('#pick-agency-feature button').click()
        .waitForElementByCssSelector('#splash-feature', 20000).sleep(20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[4]/button').click()
        .eval("window.location.hash='#/login'").sleep(20000);
    });
    });