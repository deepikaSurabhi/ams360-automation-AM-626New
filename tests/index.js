var glob = require('glob');
var path = require('path');
var Q = require('q');
var Mocha = require('mocha');
var config = require('config');

module.exports = {
    start: function () {
        var mochaConfig = {
            timeout: 60000,
            grep: config.get('run.testGroup') != 'all' ? config.get('run.testGroup') : undefined
        };

        var mocha = new Mocha(mochaConfig);
        var deferred = Q.defer();

        glob(path.join(__dirname, '**/*.js'), {}, function (er, files) {
            for(var i = 0, l = files.length; i < l; i++) {
                console.log("Adding file to test.", files[i])
                var file = files[i];
                mocha.addFile(file);
            }

            mocha.run(function(failures){
               deferred[failures > 0 ? 'reject' : 'resolve']();
            });
        });

        return deferred.promise;
    }
};