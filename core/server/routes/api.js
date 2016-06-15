// # API routes

var express     = require('express'),
	config      = require('../config'),
	middleware  = require('../middleware'),
	redisClient = require('redis').createClient(),
	routes;



routes = function apiRoutes() {

	var router = express.Router();

	///pc  routes

	router.get("/", function (req, res) {


	});
	router.get("/index.html", function (req, res) {

	});
	router.route("/index")
		.get(function (req, res) {

		})
		.post(function (req, res) {

		});


	return router;
};

module.exports = routes;
