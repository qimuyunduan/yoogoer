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

		comName:{type:String,required:true},
		comImage:{type:String,required:true},
		activities:[
			{
				title: {type:String, required: true},
				totalCount:{type:Number,require:true},
				hasSale:{type:Number,required:true},
				truePrice: {type: Number, required: true},
				bargainPrice: {type: Number, required: true},
				startDay:{type:String,required:true},
				endDay:{type:String,required:true},
				createdOn: {type: Date, default: Date.now}
			}
		]

	});
	RetailerActivitySchema.methods.getActivityCount = function () {
		return this.activities.count;
	};
	mongoose.model('RetailerActivity',RetailerActivitySchema);
};