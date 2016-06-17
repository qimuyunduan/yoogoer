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

var config   = require('../config'),
	fs       = require('fs'),
	Promise  = require('bluebird'),
	mongoose = require('mongoose');

var DBConnection =  mongoose.createConnection();


module.exports = {

	DB:DBConnection,
	init:function(){

	}
};