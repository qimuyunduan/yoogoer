/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/17 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/17 下午12:31
 * @version
 *
 */

/*********************************************************
 USER SCHEMA
 ********************************************************/

module.exports = function (mongoose) {
	var  Schema = mongoose.Schema;
	// attributes
	var userScheMa = new Schema({
		userName: String,
		password: String,
		salt:String,
		image:String,
		email:{type:String,unique:true},
		phone:String,
		createdOn:{type:Date,default:Date.now}
	});
	//methods
	mongoose.model('User', userScheMa);


};
