// # API routes

var express     = require('express'),
	config      = require('../config'),
	middleware  = require('../middleware'),
	routes;



routes = function apiRoutes() {

	var router = express.Router();

	///pc  routes

	router.get("/", function (req, res) {

		if(!req.session.views){
			req.session.views = 1;
		}
		res.render('index');

	});
	router.get("/index.html", function (req, res) {
		res.render('index');
	});
	router.route("/index")
		.get(function (req, res) {
			res.render('index');
		})
		.post(function (req, res) {

		});


	return router;
};

module.exports = routes;
