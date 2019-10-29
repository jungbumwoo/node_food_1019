import routes from './route';
import multer from 'multer';

const multerFood = multer({ dest: 'uploads/food' });

export const localsMiddleware = (req, res, next) => {
	res.locals.siteName = "NodeFood"
	res.locals.routes = routes;
	res.locals.user = req.user || null;
	console.log(req.user);
	next();
};

export const middlewareReady = (req, res, next) => {
	next();
};

export const foodUpload = multerFood.single('foodfile');