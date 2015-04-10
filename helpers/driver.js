var config = require('config');
var wd = require("wd");
var _ = require('lodash');
require('colors');
var driver = wd.promiseChainRemote({
    host: config.get('server.host'),
    port: config.get('server.port')
});
var Q = require('q');
require("../helpers/logging").configure(driver);
var desired = _.clone(require("../helpers/environments")[config.get('run.environment')]);
desired.app = config.get('run.app');

var connectedDriver;

module.exports = {
    init: function () {
        var deferred = Q.defer();
        if(connectedDriver) {
            deferred.resolve(connectedDriver);
            return deferred.promise;
        }
        driver.init(desired).then(function () {
            return driver.contexts().then(function (contexts) {
                var p;
                contexts.forEach(function (c) {
                    if (c.indexOf('WEBVIEW') != -1) {
                        p = driver.context(c);
                    }
                });

                if (!p) {
                    throw "Could not find webview context";
                }
                return p;
            }).then(function (d) {
                connectedDriver = driver;
                deferred.resolve(connectedDriver);
            });
        });
        return deferred.promise;
    }
}