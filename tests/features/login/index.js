var loginWorkflow = require('common/workflow/login');
//var pinWorkflow = require('common/workflow/pinEntry');
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

    //Here am getting Splash Screen Error 
    it('will log in with the correct username/password', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(20000)
        .eval("window.location.hash='#/splash'")
        .waitForElementByCssSelector('#splash-feature', 10000).sleep(10000)
        .eval("window.location.hash='#/dash'").sleep(10000);
        
        
    });

    //Here test case is pass but am unable to see the Error message while runing the app
    it('will give an error if you try to login with the wrong username and password', function () {
        return loginWorkflow(driver, 'wrong@wrong.com', 'wrong')
            .waitForElementByCssSelector('#login-feature .alert', 10000).sleep(10000);
    });

});