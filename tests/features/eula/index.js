var loginWorkflow = require('common/workflow/login');
var Q = require('q');
var users = require('data/users');

describe('features.eula', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        });
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login'").sleep(10000);
    });
    
    it('Will redirected to login page if we disagree the EULA', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000)
        .elementByXPath('//*[@id="eula-agreement-feature"]/footer/button[2]').click().click().sleep(5000)
        .eval("window.location.hash='#/login'");
    });
    
    it('Will redirected to splash screen if we agree the EULA', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000)
              .elementByXPath('//*[@id="eula-agreement-feature"]/footer/button[1]').click().click().sleep(5000)
              .waitForElementByCssSelector('#splash-feature', 20000).sleep(20000)
              .eval("window.location.hash='#/dash'").sleep(10000);
    });
    });