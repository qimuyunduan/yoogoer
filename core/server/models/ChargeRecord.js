/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/18 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/18 上午11:59
 * @version
 *
 */


/*********************************************************
 					ChargeRecord SCHEMA
 ********************************************************/

module.exports = function (mongoose) {

	var Schema = mongoose.Schema;
	// attributes
	var chargeRecordScheMa = new Schema({
		title: {type:String, required: true,default:"剩余额度"},
		chargeDay: {type: String, required: true},
		chargeNum: {type: Number, required: true},
		moneyLeft:{type:  Number,required:true},
		type:{type:Number,default:0,required:true,enum:[0,1]},
		user:{type:Schema.Types.ObjectId,ref:"User"},
		createdOn: {type: Date, default: Date.now}
	});

	mongoose.model('ChargeRecord',chargeRecordScheMa);
};