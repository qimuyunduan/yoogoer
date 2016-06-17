// # API routes

var express     = require('express'),
	config      = require('../config'),
	middleware  = require('../middleware'),
    models      = require('../models'),
	routes;



routes = function apiRoutes() {

	var router = express.Router();

	///pc  routes

	router.get("/", function (req, res) {

		if(!req.session.views){
			req.session.views = 1;
			var userModel = models.getModel('User');
			new userModel({
				userName: "qimu",
				password: "101410",
				salt:"10122",
				image:"./afewf.jpg",
				email:"87413256@qq.com",
				phone:"15235601543"
			}).save();
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
