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
		title: {type:String, required: true,default:"剩余额度"},
		chargeDay: {type: Date, required: true},
		chargeNum: {type: Number, required: true},
		moneyLeft:{type:  Number,required:true},
		createdOn: {type: Date, default: Date.now}
	});

	mongoose.model('RetailerActivity',RetailerActivitySchema);
};