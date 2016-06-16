/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/16 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/16 下午2:13
 * @version
 *
 */
module.exports = {
	entry: "",
	output: {
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{test: /\.js$/, loader: "babel"},
			{test: /\.css$/, loader: "style!css"},
			{test: /\.(jpg|png)$/, loader: "url?limit=8192"},
			{test: /\.scss$/, loader: "style!css!sass"}
		]
	}
};