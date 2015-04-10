require('colors');
var spawn = require('child_process').spawn, appiumServer;
var Q = require('q');
var config = require('config');

module.exports = {
    start: function () {
        var deferred = Q.defer();
        appiumServer = spawn('./node_modules/.bin/appium');

        appiumServer.stdout.on('data', function (data) {

            if(config.get('debugLevel') === 0) {
                console.log('appium >> '.blue, data.toString());
            }
            if(data.toString().indexOf('Appium REST http interface') != -1) {
                deferred.resolve();
            }
        });

        appiumServer.stderr.on('data', function (data) {
            console.log('appium >> '.red, data.toString());
        });
        return deferred.promise;
    },
    stop: function () {
        appiumServer.kill();
    }
};