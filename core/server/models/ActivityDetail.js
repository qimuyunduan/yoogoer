/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/18 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/18 下午1:18
 * @version
 *
 */

/*********************************************************
				 Activity SCHEMA
 ********************************************************/

module.exports = function (mongoose) {

	var Schema = mongoose.Schema;
	// attributes
	var activityDetailScheMa = new Schema({
		activity:{type:Schema.Types.ObjectId,ref:"Activity"},//设置关联关系
		truePrice: {type:Number, required: true},
		bargainPrice:{type:Number,require:true},
		retailerInfo: {retailerName: String, address: String,contactPhone:String},
		packageInfo: {packageName: String, time: Number,price:Number,extraInfo:[String]},
		usage:{validTime:String,notInclude:String,useTime:String,bookInfo:String,usageRules:[String]},
		createdOn: {type: Date, default: Date.now}

	});

	mongoose.model('ActivityDetail',activityDetailScheMa);
};
