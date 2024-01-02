const { response, request, json } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt-generation');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {
	const { email, password } = req.body;
	try {
		//validar que exista un email
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				msg: 'the email or the passeord is incorrect - correo',
			});
		}

		//verificar que este activo
		if (!user.status) {
			return res.status(400).json({
				msg: 'the email or the passeord is incorrect - status false',
			});
		}

		//verificar la contraseña
		const validPassowrd = bcryptjs.compareSync(password, user.password);

		if (!validPassowrd) {
			return res.status(400).json({
				msg: 'the email or the passeord is incorrect - wrong Pass',
			});
		}

		//generate JWT
		const token = await generateJWT(user.id);
		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(500).json({
			msg: 'Internal error',
		});
	}
};

const googleSignIn = async (req, res = response) => {
	const { id_token } = req.body;
	try {
		const { name, email, picture } = await googleVerify(id_token);

		let user = await User.findOne({ email });

		if (!user) {
			const data = {
				name,
				email,
				password: ':)',
				img: picture,
				google: true,
			};

			user = new User(data);
			await user.save();
		}

		//if user status is false
		if (!user.status) {
			return res.status(401).json({
				msg: 'communicate with the admin, user bloqued',
			});
		}

		//generate JWT
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: 'ID_TOKEN could not be verified',
		});
	}
};

module.exports = {
	login,
	googleSignIn,
};
