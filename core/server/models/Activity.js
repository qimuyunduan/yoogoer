/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/17 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/17 下午10:20
 * @version
 *
 */


/*********************************************************
					 Activity SCHEMA
 ********************************************************/

module.exports = function (mongoose) {

	var Schema = mongoose.Schema;
	// attributes
	var activityScheMa = new Schema({
		company: {type:String, required: true},
		startDay: {type: String, required: true},
		endDay: {type: String, required: true},
		image: {type: String, required: true},
		title: {type: String, unique: true,required:true},
		info: {type: String, required: true},
		createdOn: {type: Date, default: Date.now}
	});

	mongoose.model('Activity',activityScheMa);
};