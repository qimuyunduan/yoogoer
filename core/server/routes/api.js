// # API routes

var express     = require('express'),
	config      = require('../config'),
    models      = require('../models'),
	preloadData = require('../utils/preloadData'),
	routes;


routes = function apiRoutes() {

	var router = express.Router();

	///pc  routes

	router.get("/", function (req, res) {



		//preloadData();
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
//		var user = models.getModel('User');
//		var historyOrder = models.getModel('HistoryOrder');

		//historyOrder.findOne({orderTitle: 'first order'})
		//	//populate 实现连表查询,结果是historyOrder,通过orderUser属性可以获取相应的User
		//	.populate('orderUser', 'userName password')
		//	.exec(function(err, doc) {
		//		console.log(doc.orderUser.userName);
		//	});
		//historyOrder.findOne({orderTitle: 'first order'})
		//	//populate 实现连表查询,结果是historyOrder,通过orderUser属性可以获取相应的User
		//	.populate({path:'orderUser',select:{userName:1,password:1}})
		//	.exec(function(err, doc) {
		//		console.log(doc.orderUser.userName);
		//	});

		//historyOrder.findOne({orderTitle:'first order'},function(err,order){
		//	user.findOne({userName:"qimu"},function(err,user){
		//		user.historyOrder.push(order._id);
		//		user.save(function(err,user){
		//			console.log("保存成功...");
		//		});
		//	});
		//});
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


//		Model.distinct
//
//		查询符合条件的文档并返回根据键分组的结果。
//
//		Model.distinct(field, conditions, callback);
//		Model.where
//
//		当查询比较复杂时，用 where：
//
//		Model
//		.where('age').gte(25)
//		.where('tags').in(['movie', 'music', 'art'])
//		.select('name', 'age', 'tags')
//		.skip(20)
//		.limit(10)
//		.asc('age')
//		.slaveOk()
//		.hint({ age: 1, name: 1 })
//		.run(callback);
//		Model.$where
//
//		有时我们需要在 mongodb 中使用 javascript 表达式进行查询，这时可以用 find({$where : javascript}) 方式，$where 是一种快捷方式，并支持链式调用查询。
//
//		Model.$where('this.firstname === this.lastname').exec(callback)


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
			//按时间升序  排除createdOn __v字段
			activity.find().limit(15).sort({_id:1}).select("-createdOn -__v").exec(function(err,result){
				res.json({res:result});
			});
		});


	router.route('/consumeOrder')
		.get(function(req,res){
			var orderPerson = req.query;
			var historyOrder = models.getModel('HistoryOrder');
			historyOrder.find(function(err,orders){
				res.json({res:orders});
			})
		})
		.post(function(req,res){
			res.end();
		});
	router.route('/activityDetail')
		.get(function(req,res){
			var activityID = req.query;
			var detailActivityModel = models.getModel('ActivityDetail');
			detailActivityModel.find(function(err,detailActivity){
				res.json({res:detailActivity});
			});

		})
		.post(function(req,res){

		});

	router.route('/rechargeRecord')
		.get(function(req,res){
			var personName = req.query;
			var chargeRecordModel = models.getModel('ChargeRecord');
			chargeRecordModel.find(function(err,record){
				res.json({res:record});
			});
		})
		.post(function(req,res){

		});


	router.route('/retailerActivities')
		.get(function(req,res){
			var retailerActivities = models.getModel('RetailerActivity');
			retailerActivities.find().limit(15).sort({_id:1}).select("-__v").exec(function(err,result){
				res.json({res:result});
			});
		})
		.post(function(req,res){

		});


	return router;
};

module.exports = routes;
