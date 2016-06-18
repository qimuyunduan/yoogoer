/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/18 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/18 下午12:13
 * @version
 *
 */
/*********************************************************
 				RetailerActivity SCHEMA
 ********************************************************/

module.exports = function (mongoose) {

	var Schema = mongoose.Schema;
	// attributes
	var RetailerActivitySchema = new Schema({
		title: {type:String, required: true},
		totalCount:{type:Number},
		hasSale:{type:Number,required:true},
		truePrice: {type: Number, required: true},
		bargainPrice: {type: Number, required: true},
		startDay:{type:Date,required:true},
		endDay:{type:Date,required:true},
		createdOn: {type: Date, default: Date.now}
	});

	mongoose.model('RetailerActivity',RetailerActivitySchema);
};