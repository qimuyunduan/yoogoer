/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/16 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/16 下午5:18
 * @version
 *
 */
function initModels(fileNames) {
	var  models = {};
	if(_.isArray(fileNames)){

		for(var i=0;i<fileNames.length;i++){

			_.assign(models,require('./'+fileNames[i]));
		}
	}
	return models;
}
/**
 * Expose `models`
 */

module.exports = initModels(files);