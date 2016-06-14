var appInit;

appInit = require('./core');


	//  get an instance of AppServer
appInit().then(function (server) {
	// starting our server instance.
    server.start();

}).catch(function (err) {
    console.log(err);
});
