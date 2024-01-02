const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, 'name is a required field'],
	},
	email: {
		type: String,
		required: [true, 'email is a required field'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password is a required field'],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		emun: ['ADMIN', 'USER'],
		default: 'USER_ADMIN',
	},
	status: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

/**
 * sobre escribo el metodo toJSON para modificar que quiero ver
 * quito del objeto __v y password y me quedo con el resto de los parametros en la variable user
 */
UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

/*
primer parametro es el nombre del modelo con la primer letra mayuscula y tmb el nombre de la coleccion pero agregandole una "s"
y el segundo parametro es el schema
*/
module.exports = model('User', UserSchema);
