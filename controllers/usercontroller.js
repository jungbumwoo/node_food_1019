import passport from "passport";
import routes from '../route';
import User from '../model/User';

export const home = (req, res) => {
	res.render('home');
};

export const user = (req, res) => {
	res.render('user');
};

export const getjoin = async (req, res) => {
	res.render('join');
};

export const login = async (req, res) => {
	res.render('login');
};

export const locallogin = (req, res) => {
	res.render('locallogin');
};

export const facebooklogin = (req, res) => {
	res.render('facebooklogin');
};

export const instagramlogin = (req, res) => {
	res.render('instagramlogin');
};

export const githublogin = (req, res) => {
	res.render("githublogin");
};

export const postjoin = async (req, res, next) => {
	const { body: { name, email, password, password2 } } = req;
	if (password !== password2) {
		res.status(400);
		res.render("join")
	} else {
		try {
            const user = await User({
              name,
              email
            });
			await User.register(user, password);
			console.log(user);
			next();
          } catch (error) {
			console.log(error);
			res.redirect(routes.home)
          }
	}
};

export const postlogin = (req, res) => {
	try {
		passport.authenticate("local", {
			failureRedirect: routes.login,
			successRedirect: routes.home
		})
	} catch (error) {
		console.log(error);
		res.redirect(routes.join)
	}
};

export const userDetail = (req, res) => {
	res.render('userDetail');
};