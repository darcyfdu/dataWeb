var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Name Model
 * ==========
 */
var Name = new keystone.List('Name');

Name.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Name.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Name.defaultColumns = 'name, email, isAdmin';
Name.register();
