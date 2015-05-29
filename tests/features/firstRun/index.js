var loginWorkflow = require('common/workflow/login');
var Q = require('q');
var users = require('data/users');
var assert = require('assert');

describe('features.firstRun', function() {
    var driver;
    before(function() {
        return require('helpers/driver').init().then(function(d) {
            driver = d;
        });
    });

    beforeEach(function() {
        return driver.eval("window.location.hash='#/login'").sleep(5000)
        .then(function () {
       return loginWorkflow(driver, users.multiAgency1.username, users.multiAgency1.password).sleep(10000);
        });

    });

    it('will not require a returning user to select the agency', function() {
        return driver.elementByCssSelector('#pick-agency-feature select').click().sleep(5000)
        .elementByCssSelector('#pick-agency-feature button').click().click()
        .waitForElementByCssSelector('#splash-feature', 20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[4]/button')
        .click().sleep(10000)
        .then(function() {
            return loginWorkflow(driver, users.multiAgency1.username, users.multiAgency1.password);
        })
        .waitForElementByCssSelector('#splash-feature', 20000)
        .eval("window.location.hash='#/dash'").sleep(20000);
    });

    it('will require user to select the agency', function() {
        return driver.elementByCssSelector('#pick-agency-feature select')
        .elementByXPath('//*[@id="pick-agency-feature"]/div[1]/div/select/option[2]')
        .click().sleep(5000)
        .elementByCssSelector('#pick-agency-feature button')
        .click().click()
        .waitForElementByCssSelector('#splash-feature', 20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[4]/button')
        .click().sleep(10000)
        .then(function() {
            return loginWorkflow(driver, users.multiAgency1.username, users.multiAgency1.password).sleep(10000);
        })
        .waitForElementByCssSelector('#splash-feature', 20000)
        .eval("window.location.hash='#/dash'").sleep(20000);
    });

    it('Will change the agency selection in settings tap', function(done) {
        
        //var actual= driver.elementByXPath('//*[@id="pick-agency-feature"]/div[1]/div/select/option[1]');
        //var net= driver.elementByXPath('//*[@id="pick-agency-feature"]/div[1]/div/select/option[2]');
        return driver.elementByCssSelector('#pick-agency-feature select')
        .elementByXPath('//*[@id="pick-agency-feature"]/div[1]/div/select/option[2]')
        .click().sleep(5000)
        .elementByCssSelector('#pick-agency-feature button')
        .click().click()
        .waitForElementByCssSelector('#splash-feature', 20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[3]/button')
        .click().sleep(10000).elementByCssSelector('#pick-agency-feature select').sleep(10000)
        .elementByXPath('//*[@id="pick-agency-feature"]/div[1]/div/select/option[1]')
        .click().sleep(5000)
        .elementByCssSelector('#pick-agency-feature button').click().sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[4]/button').click()
        .then(function() {
            return loginWorkflow(driver, users.multiAgency1.username, users.multiAgency1.password).sleep(1000);
        })
        .waitForElementByCssSelector('#splash-feature', 20000).sleep(10000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[3]/button')
        .click().sleep(10000);
        //.elementByXPath('//*[@id="pick-agency-feature"]/div[1]/div/select/option[1]');
        ///assert.equal(actual, net, "agency selection should be same");
        //done();
    });

}); 