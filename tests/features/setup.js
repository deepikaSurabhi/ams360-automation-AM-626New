before(function () {
    this.timeout(300000);
    var driver = require('helpers/driver');
    return driver.init();
});