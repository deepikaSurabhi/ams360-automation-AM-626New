var loginWorkflow = require('common/workflow/login');

var Q = require('q');
var users = require('data/users');

describe('features.login', function() {
	var driver;
	before(function() {
		return require('helpers/driver').init().then(function(d) {
			driver = d;
		});
	});

	beforeEach(function() {
		return driver.eval("window.location.hash='#/login'").sleep(20000);

	});

	it('login with single user and will click on the ToDo link on the dashboard', function() {
		return loginWorkflow(driver, users.singleAgency.username, users.singleAgency.password).sleep(20000)
		.waitForElementByCssSelector('#splash-feature', 20000).sleep(10000)
		.eval("window.location.hash='#/dash'").sleep(10000)
		.elementByTagName("h5").click().sleep(10000);

	});

	it('login with multi agency user and will click on the ToDo link on the dashboard', function() {
		return loginWorkflow(driver, users.multiAgency1.username, users.multiAgency1.password).sleep(10000)
		.elementByXPath('//*[@id="pick-agency-feature"]/div[1]/div/select/option[2]').click()
		.sleep(5000).elementByCssSelector('#pick-agency-feature button').click()
		.waitForElementByCssSelector('#splash-feature', 20000)
		.eval("window.location.hash='#/dash'").sleep(20000)
		.elementByXPath('//*[@id="master-layout"]/div[1]/md-sidenav/md-content/div[4]/button').click()
		.sleep(10000).eval("window.location.hash='#/dash'").sleep(20000)
		.elementByTagName("h5").click().sleep(10000);
	});

}); 