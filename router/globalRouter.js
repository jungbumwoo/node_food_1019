import express from 'express';
import routes from '../route';
import passport from 'passport';
import { user, home, getjoin, postjoin, postlogin, login, locallogin, facebooklogin, instagramlogin, githublogin } from '../controllers/usercontroller';

const globalRouter = express.Router();

globalRouter.get(routes.user, user);
globalRouter.get(routes.home, home);

globalRouter.get(routes.login, login);


globalRouter.get(routes.facebooklogin, facebooklogin);
globalRouter.get(routes.instagramlogin, instagramlogin);
globalRouter.get(routes.githublogin, githublogin);

globalRouter.get(routes.join, getjoin);
globalRouter.post(routes.join, postjoin, postlogin);

export default globalRouter;