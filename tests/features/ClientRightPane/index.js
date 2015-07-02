var loginWorkflow = require('common/workflow/login');
var Q = require('q');
var users = require('data/users');
var constants = require('data/constants');
var assert = require('assert');

describe('features.ClientRightPane', function () {
    var driver;
    before(function () {
        return require('helpers/driver').init().then(function (d) {
            driver = d;
        });
    });

    beforeEach(function () {
        return driver.eval("window.location.hash='#/login'").sleep(10000);
       
    });
    
    it('will select the client summary', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(10000)
              .elementByXPath('//*[@id="eula-agreement-feature"]/footer/button[1]').click().click().sleep(5000)
              .waitForElementByCssSelector('#splash-feature', 20000).sleep(10000)
              .eval("window.location.hash='#/dash'").sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[2]/button').click().sleep(10000)
              .eval("window.location.hash='#/search'")
              .elementByCssSelector('#search input[placeholder="Search"]').sleep(5000)
              .sendKeys(constants.clientSearch.name).click().sleep(5000)
              .elementByCssSelector('li:nth-child(1)').click().sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[2]/md-sidenav/md-content/div/div[1]/button').click().click().sleep(20000)
              .should.eventually.be.fulfilled;
    });
    
    it('will select the client policies', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(5000)
              .waitForElementByCssSelector('#splash-feature', 20000).sleep(10000)
              .eval("window.location.hash='#/dash'").sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[2]/button').click().sleep(10000)
              .eval("window.location.hash='#/search'")
              .elementByCssSelector('#search input[placeholder="Search"]').sleep(5000)
              .sendKeys(constants.clientSearch.name).click().sleep(5000)
              .elementByCssSelector('li:nth-child(2)').click().sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[2]/md-sidenav/md-content/div/div[2]/button').click().click().sleep(10000)
              .should.eventually.be.fulfilled;
    });
    
    it('will select the client Claims', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(5000)
              .waitForElementByCssSelector('#splash-feature', 20000).sleep(10000)
              .eval("window.location.hash='#/dash'").sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[2]/button').click().sleep(10000)
              .eval("window.location.hash='#/search'")
              .elementByCssSelector('#search input[placeholder="Search"]').sleep(5000)
              .sendKeys(constants.clientSearch.name).click().sleep(5000)
              .elementByCssSelector('li:nth-child(1)').click().sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[2]/md-sidenav/md-content/div/div[3]/button').click().click().sleep(10000)
              .should.eventually.be.fulfilled;
    });
    
    it('will select the client Documents', function () {
        return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(5000)
              .waitForElementByCssSelector('#splash-feature', 20000).sleep(10000)
              .eval("window.location.hash='#/dash'").sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[2]/button').click().sleep(10000)
              .eval("window.location.hash='#/search'")
              .elementByCssSelector('#search input[placeholder="Search"]').sleep(5000)
              .sendKeys(constants.clientSearch.name).click().sleep(5000)
              .elementByCssSelector('li:nth-child(1)').click().sleep(10000)
              .elementByXPath('//*[@id="master-layout"]/div[2]/md-sidenav/md-content/div/div[4]/button').click().click().sleep(10000)
              .should.eventually.be.fulfilled;
        
    });
 });