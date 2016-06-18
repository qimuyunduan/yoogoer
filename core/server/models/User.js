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
		userName: {firstName:String,lastName:String},
		password: {type:String,required:true},
		salt:{type:String,required:true},
		image:{type:String,required:true},
		email:{type:String,unique:true},
		phone:{type:String,required:true},
		createdOn:{type:Date,default:Date.now}
	});

	//define virtual attribute
	//userScheMa.virtual('name.full').get(function(){
	//	return this.userName.firstName + ' ' + this.userName.lastName;
	//});
	//userScheMa.virtual('name.full').set(function(name){
	//	var split = name.split(' ');
	//	this.userName.firstName = split[0];
	//	this.userName.lastName = split[1];
	//});

	//can also define sub_doc  validators middleware
	//sub_doc
	//var ChildSchema1 = new Schema({name:String});
	//var ChildSchema2 = new Schema({name:String});
	//var ParentSchema = new Schema({
	//	children1:ChildSchema1,   //嵌套Document
	//	children2:[ChildSchema2]  //嵌套Documents
	//});
	//methods
	
	//instance methods
	//userScheMa.methods.funcXX = function () {
	//
	//};

	//static functions

	//userScheMa.statics.funcXX = function(){
	//
	//};
	mongoose.model('User', userScheMa);


};
