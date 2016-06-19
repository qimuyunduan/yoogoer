/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/18 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/18 下午4:08
 * @version
 *
 */


/*********************************************************
 				HistoryOrder SCHEMA
 ********************************************************/

module.exports = function (mongoose) {

	var Schema = mongoose.Schema;
	// attributes
	var historyOrderScheMa = new Schema({
		orderUser:{type:Schema.Types.ObjectId,ref:"User"},
		orderImage: {type:String, required: true},
		orderTime: {type: String, required: true},
		orderTitle: {type: String, required: true},
		orderMoney: {type: Number, required: true},
		orderStatus: {type:Number,enum:[0,1,2],required:true},
		createdOn: {type: Date, default: Date.now}
	});

	mongoose.model('HistoryOrder',historyOrderScheMa);
};