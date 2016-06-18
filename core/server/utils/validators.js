/**
 *
 * ProjectName：yoogoer
 * Description：
 * Created by qimuyunduan on 16/6/18 .
 * Revise person：qimuyunduan
 * Revise Time：16/6/18 下午2:05
 * @version
 *
 */
var mongoose = require('mongoose'),
	validate = require('mongoose-validator'),

	emailValidator,
	cellphoneValidator,
	phoneValidator,
	lengthValidator,
	AlphanumericValidator;

emailValidator = validate({
	validator: 'matches',
	arguments: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
	message: 'this isn\'t a valid email...'
});

cellphoneValidator = validate({
	validator: 'matches',
	arguments: /^1\d{10}$/,
	message: 'this isn\'t a valid cellphone number...'
});

phoneValidator = validate({
	validator: 'matches',
	arguments: /^0\d{2,3}-?\d{7,8}$/,
	message: 'this isn\'t a valid phone number...'
});

lengthValidator = function (min,max) {
	return validate({
		validator: 'isLength',
		arguments: [min, max],
		message: 'length should be between {ARGS[0]} and {ARGS[1]} characters'
	})
};
AlphanumericValidator = validate({
	validator: 'isAlphanumeric',
	passIfEmpty: true,
	message: 'it should contain alpha-numeric characters only'
});
module.exports = {
	emailValidator:emailValidator,
	cellphoneValidator:cellphoneValidator,
	phoneValidator:phoneValidator,
	lengthValidator:lengthValidator,
	AlphanumericValidator:AlphanumericValidator
};

