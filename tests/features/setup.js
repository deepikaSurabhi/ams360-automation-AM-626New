before(function () {
    this.timeout(800000);
    var driver = require('helpers/driver');
    return driver.init();
});