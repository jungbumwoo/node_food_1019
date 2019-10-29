import express from 'express';
import morgan from "morgan";
import routes from './route';
import './db';
import { localsMiddleware } from './middlewares';
import foodRouter from './router/foodRouter';
import globalRouter from './router/globalRouter';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import './model/Food';
import './model/Comment';
import './model/User';
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import GitHubStrategy from "passport-github";
import "./passport";
import path from "path";



const app = express();

const CokieStore = MongoStore(session);

app.set('view engine', 'pug');

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

var publicPath = path.resolve(__dirname,"uploads");
app.use(express.static(publicPath));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(morgan("dev"));

app.use(session({
  secret:" !$GFAERFZSDFsdfafe!#$DFSdfa",
  resave: true,
  saveUninitialized: false,
  store: new CokieStore({mongooseConnection: mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET ,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


app.use(routes.home, globalRouter);
app.use(routes.food, foodRouter);


app.listen(process.env.PORT, () => {
	console.log('✅  Express app listening on port 3000');
});

export default app;