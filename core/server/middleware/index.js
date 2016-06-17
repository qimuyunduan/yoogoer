var bodyParser       = require('body-parser'),
    config           = require('../config'),
    errors           = require('../errors'),
    express          = require('express'),
    logger           = require('morgan'),
    path             = require('path'),
    routes           = require('../routes'),
    utils            = require('../utils'),
	uuid             = require('node-uuid'),
	helmet           = require('helmet'),
	csurf 			 = require('csurf'),
	favicon          = require('serve-favicon'),
	cookieParser     = require('cookie-parser'),
	redisSession     = require('node-redis-session'),
	session          = require('express-session'),
	sessionStore     = require('connect-redis')(session),
	//client         = require('redis').createClient(),
    setupMiddleware;


setupMiddleware  = function setupMiddleware(App) {

    var logging  = config.logging,
		contentPath = config.paths.contentPath,
        corePath = config.paths.corePath;

	var sessionSecret = "fgegsaf";

    // (X-Forwarded-Proto header will be checked, if present)
    App.enable('trust proxy');

    // Logging configuration
    if (logging !== false) {
        if (App.get('env') !== 'development') {
            App.use(logger('combined', logging));
        } else {
            App.use(logger('dev', logging));
        }
    }

	// Body parsing
	App.use(bodyParser.json({limit: '1mb'}));
	App.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));

	// ### cookie and session

	App.use(cookieParser());
	App.use(redisSession());


	//App.use(session({
	//	store:new sessionStore( {
	//		host: "127.0.0.1",
	//		port: 6379
	//	}),
	//	secret: sessionSecret,
	//	resave:false,
	//	saveUninitialized:false
	//}));

	App.use(helmet());

    // Favicon
	App.use(favicon(path.join(__dirname,'../views/images/favicon.ico')));
	App.use('/img',express.static(path.join(corePath,'/server/views/images')));

	App.use('/shared', express.static(path.join(corePath, '/shared')));
	App.use('/res', express.static(contentPath));
	App.use('/res/data', express.static(path.join(contentPath, '/data')));
	App.use('/res/images', express.static(path.join(contentPath, '/images')));

    // ### Routing
    // Set up API routes
    App.use(routes.apiBaseUri, routes.api());

    // ### Error handling
    // 404 Handler
    //App.use(errors.error404);
	//
    //// 500 Handler
    //App.use(errors.error500);
};

module.exports = setupMiddleware;

