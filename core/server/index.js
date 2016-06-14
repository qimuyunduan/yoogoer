 // Module dependencies
var express     = require('express'),
    hbs         = require('hbs'),
    compress    = require('compression'),
    uuid        = require('node-uuid'),
    Promise     = require('bluebird'),
	path        = require('path'),
    middleware  = require('./middleware'),
    Server      = require('./app_server');


function init() {
    // Get reference to an express app instance.
    var app = express();

    return Promise.resolve().then(function () {

        // enabled gzip compression by default
		app.use(compress());

		// set view path
		app.set('views',path.join(__dirname,'/views'));
		// set the view engine
		app.set('view engine', 'html');
		app.engine('html', hbs.__express);
		hbs.registerPartials(__dirname + '/views/partials');
        middleware(app);

        return new Server(app);
    //});
    });
}
module.exports = init;
