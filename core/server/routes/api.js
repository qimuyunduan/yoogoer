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


//		if(!req.session.views){
//			req.session.views = 1;
//
//			//CURD
//
//			//查询 得到userModel
//			var userModel = models.getModel('User');
//			new userModel({
//				userName: "qimu",
//				password: "101410",
//				salt:"10122",
//				image:"XXX",
//				email:"84678042@qq.com",
//				phone:"12434545455"
//
//			 }).save(function(err,user){
//				console.log(user);
//			 });


//
//			userModel.find({name:""},function(err,user){
//				console.log(user);
//				//对查询出来的结果user进行修改    更新
//				//user.name = "XXX"
//				//调用save()否则所做的修改不会更新到数据库
//				//user.save(function(err){
//				//
//				//     if(!err){
//				//
//				// 		res.send("update success...");
//				//
//				// }
//				// });
//
//			});
//			//userModel.findById(userId,function(err,user){
//			//	user.name = 'XXX';
//			//	var _id = user._id; //需要取出主键_id
//			//	delete user._id;    //再将其删除
//			//	user.update({_id:userId},user,function(err){
//			//
//			//	});
//			//	//此时才能用Model操作，否则报错
//			//});
//			//update第一个参数是查询条件，第二个参数是更新的对象，但不能更新主键，这就是为什么要删除主键的原因。
//　　         //当然这样的更新很麻烦，可以使用$set属性来配置，这样也不用先查询，如果更新的数据比较少，可用性还是很好的：
//            //  userModel.update({_id:userId},{$set:{name:'XXX'}},function(err){});
//
//
//			//新建  方法1
//			//new userModel({
//			// name:"",
//			// email:""
//			//
//			// }).save(function(err){
//			//
//			//
//			// });
//			//方法2
//			//userModel.create({name:"",email:""},function(err,user){
//			//
//			//});
//
//			//删除
//			//userModel.remove({name: 'XXX'}, function(err){
//			//	if(!err){
//			//		//成功删除
//			//	}
//			//});
//			//先查询在删除
//			//userModel.findOne({name: 'XXX'}, function(err, user){
//			//	if(!err){
//			//		node.remove(function(err){
//			//			//成功删除
//			//		});
//			//	}
//			//});
//
//			//other methods
//			// findByIdAndRomove()  findByIdAndUpdate()
//
//		}
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
	router.route('/latestActivities')
		.get(function(req,res){
			var activity = models.getModel('Activity');
			activity.find(function(err,activities){
				console.log(activities);
				res.send(activities);
				//res.json({activities:activities});
			});
		})
		.post(function(req,res){

		});

	router.route()
		.get(function(req,res){

		})
		.post(function(req,res){

		});
	router.route()
		.get(function(req,res){

		})
		.post(function(req,res){

		});
	router.route()
		.get(function(req,res){

		})
		.post(function(req,res){

		});
	router.route()
		.get(function(req,res){

		})
		.post(function(req,res){

		});


	return router;
};

module.exports = routes;
