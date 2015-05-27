before(function () {
    this.timeout(2000000);
    var driver = require('helpers/driver');
    return driver.init();
});