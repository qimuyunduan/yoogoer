/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/18 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/18 下午5:19
 * @version
 *
 */

var _      = require('lodash'),
	moment = require('moment');


//set moment env
moment.locale('zh-cn');



function getWeekday(){

	return moment().format('dddd');  //星期三
}

function getLocalDate(){

	return moment().format("LL");

}
function getDate(){
	return moment().format('L'); //2016-5-4
}

function getDateAndTime(){
	return moment().format('YYYY-MM-DD HH:mm:ss'); //2016-5-4 23:36:09
}


function getLocalDateAndTime(){

	var date = getLocalDate();   // 2016-5-4
	var weekday = getWeekday(); //星期三

	if(_.isString(date)){
		return date+"  "+weekday;    //2016年5月4日  星期三
	}
	return _.toString(date)+ _.toString(weekday);

}


function getAfterDays(days){
	return moment().add(days,'days').format('YYYY年MM月DD日');
}

module.exports = {
	localDate:getLocalDate(),
	date     :getDate(),
	dateAndTime:getDateAndTime(),
	localDateAndTime:getLocalDateAndTime(),
	afterDays:getAfterDays
};