 // Module dependencies
var express     = require('express'),
    hbs         = require('hbs'),
    compress    = require('compression'),
    Promise     = require('bluebird'),
	path        = require('path'),
	models      = require('./models'),
    middleware  = require('./middleware'),
    Server      = require('./app_server');


function init(options) {
    // Get reference to an express app instance.
    var app = express();

    return Promise.resolve().then(function () {

		//init models
		models.init();

        // enabled gzip compression by default
		app.use(compress());

		// set view path
		app.set('views',path.join(__dirname,'/views'));
		// set the view engine
		app.set('view engine', 'html');
		app.engine('html', hbs.__express);
		hbs.registerPartials(__dirname + '/views/partials');
        middleware(app);

        return new Server(app,options);
    });
}
module.exports = init;
