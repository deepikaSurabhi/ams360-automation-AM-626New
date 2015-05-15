var loginWorkflow = require('common/workflow/login');
var Q = require('q');
var users = require('data/users');
describe('features.firstRun', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        });
    });
    
      beforeEach(function () {
        return driver.eval("window.location.hash='#/login?reset'");
    });
    
    it('will log in with the correct username/password for multi agency', function () {
        return loginWorkflow(driver, users.firstrun.username, users.firstrun.password).sleep(10000)
        //.waitForElementByCssSelector('#master-layout', 10000)
        .eval("window.location.hash='#/agency'")
        .elementByCssSelector('#pick-agency-feature select').click().sleep(20000)
        //.elementByCssSelector('#pick-agency-feature select').textPresent('ALPHA360-1').click().sleep(1000)
        .elementByCssSelector('#pick-agency-feature button').click()
        .eval("window.location.hash='#/splash'").sleep(20000);
        //.waitForElementByCssSelector('#splash-feature', 20000)
        //.waitForElementByCssSelector('img:not(.ng-hide)', 5000);
       
       
    });
});