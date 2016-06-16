/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/16 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/16 下午5:16
 * @version
 *
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;	//	创建模型
var userScheMa = new Schema({
	userid: String,
	password: String
});
exports.user = mongoose.model('users', userScheMa);