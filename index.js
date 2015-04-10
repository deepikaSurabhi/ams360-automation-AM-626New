var argv = require('minimist')(process.argv.slice(2));
require('colors');
var _ = require('lodash');
var environments = require('./helpers/environments');
var config = require('config');

if(!argv.app) {
    console.error("You must specify an app.".red);
    process.exit(1);
}

//Level zero prints everything
config.debugLevel = argv.debugLevel || 2;
config.debugLevel = parseInt(argv.debugLevel, 10);

config.run = {
    testGroup: argv.group || 'all',
    app: argv.app
};

/** Must be done before config becomes immutable **/
if(!argv.environment) {
    console.log("No environment selected - using default of ios81");
    config.run.environment = 'ios81';
} else if (!environments[argv.environment]) {
    console.log(("Environment " + argv.environment + " not found. Environments available are: ").magenta);
    _.keys(environments).forEach(function (key) {
        console.log('\t * ' + key)
    })
    process.exit(1);
} else {
    config.run.environment = argv.environment;
}

var server = require('./helpers/server.js');
server.start().then(function () {
    console.log("Server is up")
    try {
        return require('./tests').start().done(function () {
            server.stop();
        });
    } catch (e) {
        console.error(e);
    }
}).catch(function (e) {

    throw e;
});

process.on('uncaughtException', function () {
    server.stop();
    process.exit(1);
});
