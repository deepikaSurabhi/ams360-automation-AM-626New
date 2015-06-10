var loginWorkflow = require('common/workflow/login');
var Q = require('q');
var users = require('data/users');
var assert = require('assert');

describe('features.clientSearch', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        });
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login'").sleep(10000);
    });
    it('will search for the client', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000)
        .waitForElementByCssSelector('#splash-feature', 20000).sleep(20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[2]/button').click().sleep(10000)
        .eval("window.location.hash='#/search'")
        .elementByCssSelector('#search input[placeholder="Search"]')
        .sendKeys("tim").click().sleep(5000)
        .elementByCssSelector('li:nth-child(3)').click().sleep(10000);
    });
    it('will select the recent client', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000)
        .waitForElementByCssSelector('#splash-feature', 20000).sleep(20000)
        .eval("window.location.hash='#/dash'").sleep(20000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[2]/button').click().sleep(10000)
        .eval("window.location.hash='#/search'")
        .elementByCssSelector('#search input[placeholder="Search"]').sleep(10000)
        .elementByCssSelector('li:nth-child(3)').click().sleep(10000);
        
       
    });
    
    it('will disply the error message if we are searching for invalid user', function () {
        
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000)
        .waitForElementByCssSelector('#splash-feature', 20000).sleep(20000)
        .eval("window.location.hash='#/dash'").sleep(10000)
        .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[2]/button').click().sleep(10000)
        .eval("window.location.hash='#/search'").sleep(2000)
        .elementByCssSelector('#search input[placeholder="Search"]')
        .sendKeys("aaaa").click().sleep(5000)
        //.elementByXPath('//*[@id="search"]/div[2]/div/div[2]/ul/li')
        .assert.isFulfilled('No clients found', 'No clients found', "done");
        //.elementByXPath('//*[@id="search"]/div[2]/div/div[2]/ul/li').asserters.textInclude('No clients found');
           // .then(function (){
             // return //("No clients found").should.equal(driver.elementByXPath('//*[@id="search"]/div[2]/div/div[2]/ul/li'))
        // });
//         
   });
});
