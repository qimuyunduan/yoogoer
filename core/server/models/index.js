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

var _             = require('lodash'),
	configManager = require('../config'),
	Promise       = require('bluebird'),
	fs            = Promise.promisifyAll(require("fs")),
	mongoose      = require('mongoose'),
	DBConnection;




function initConnection(){

	//程序中只有一个数据库时,使用mongoose.connnect()就行了
	//若有多个数据库,使用mongoose.createConnnection()可以得到一个所在数据库的链接句柄,进而使用该句柄获取该database下的model

	DBConnection = mongoose.createConnection(configManager.config.development.database.url);

	DBConnection.on('connected', function () {
		console.log('Mongoose connected to server');
	});
	DBConnection.on('error', function (err) {
		console.log('Mongoose connection error: ' + err);
	});
	DBConnection.on('disconnected', function () {
		console.log('Mongoose disconnected');
	});
}


module.exports = {

	init: function () {

		initConnection();

		fs.readdirAsync(__dirname).then(function (files) {

			_.forEach(files, function (file) {

				if (file !== 'index.js') {

					require('./' + file)(mongoose)
				}
			});

		}).catch(function (err) {
			console.log(err);
		});
	},
	getModel:function(modelName){
		if(DBConnection.model(modelName)){
			return DBConnection.model(modelName);
		}
	}
};
