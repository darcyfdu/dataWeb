var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var xhr = require("xhr");
var assign = require('object-assign');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'login';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'login' }, function (next) {
		xhr({
			url: '/keystone/api/session/signin',
			method: 'post',
			json: {
				email: req.body.username,
				password: req.body.password,
			},
			headers: assign({}, req.header),
		}, function (err, resp, body) {
			if (err || body && body.error) {
				req.flash('error', '用户名密码错误！');
				next();
			} else {
				res.redirect('/');
			}
		});
	});

	view.render('login');
};