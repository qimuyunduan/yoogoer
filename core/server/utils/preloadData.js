/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/19 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/19 下午10:10
 * @version
 *
 */
var models = require('../models');
module.exports = function(){
	var activity = models.getModel("Activity"),
		activityDetail = models.getModel("ActivityDetail"),
		chargeRecord = models.getModel("ChargeRecord"),
		historyOrder = models.getModel("HistoryOrder"),
		retailerActivity = models.getModel("RetailerActivity"),
		user = models.getModel("User");
	var userid;
	user.findOne({userName:"qimu"},function(err,user){
		userid = user._id;
	});

	for(var i=0;i<100;i++){
		//new activity({
		//	company: "company "+i,
		//	startDay: "2015-10-6",
		//	endDay: "2016-1-1",
		//	image: "XXX"+i,
		//	title: "activity "+i,
		//	info: "about activity "+i
		//}).save(function(err,res){
		//	new activityDetail({
		//		activity:res._id,
		//		truePrice: 254,
		//		bargainPrice:465,
		//		retailerInfo: {retailerName: "retailer", address: '望江路一号',contactPhone:"15265656566"},
		//		packageInfo: {packageName: "套餐", time: 1,price:586,extraInfo:["注意使用方法","注意使用时间"]},
		//		usage:{validTime:"2015-4=7至2016-4-6",notInclude:"2015-5-5",useTime:"xxx至xxx",bookInfo:"预定消息",usageRules:["使用规则1","使用规则2"]}
		//	}).save(function(err,result){
		//		var activityID = result.activity;
		//
		//		activity.findOne({_id:activityID},function(err,activity){
		//
		//			activity.detail = result._id;
		//			activity.save(function(err){
		//				new chargeRecord({
		//					title: "剩余额度",
		//					chargeDay: '2015-5-9',
		//					chargeNum: 254,
		//					moneyLeft:452,
		//					type:0,
		//					user:userid
		//				}).save(function(err,record){
		//					user.findOne({userName:"qimu"},function(err,resultUser){
		//						resultUser.chargeRecord.push(record._id);
		//
		//						resultUser.save(function(err){
		//							new historyOrder({
		//								orderUser:userid,
		//								orderImage: 'XXX',
		//								orderTime: "2016-5-9",
		//								orderTitle: "套餐信息",
		//								orderMoney: "595",
		//								orderStatus: 1
		//							}).save(function(err,order){
		//								user.findOne({userName:"qimu"},function(err,user){
		//									user.historyOrder.push(order._id);
		//									user.save(function(err){
												new retailerActivity({
													comName:"company "+i,
													comImage:"XXX",
													activities:[{
														title: "零售商",
														totalCount:200,
														hasSale:102,
														truePrice: 520,
														bargainPrice: 380,
														startDay:"2015-6-8",
														endDay:"2016-2-8"
													},{
														title: "零售商 01",
														totalCount:200,
														hasSale:102,
														truePrice: 520,
														bargainPrice: 380,
														startDay:"2015-6-8",
														endDay:"2016-2-8"
													}]

												}).save(function(err,retailer){

												});
		//									});
		//
		//								});
		//
		//							});
		//						});
		//
		//
		//					});
		//
		//				})
		//			});
		//		});
		//
		//	});
		//});
	}

};