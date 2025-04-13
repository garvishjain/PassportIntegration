const Routes = require('express').Router();
const UserController = require('../controllers/user');
const jwt_auth = require("../apps/JWT/jwt_auth");
const passport = require('passport');
// const { isAuthenticated } = require('../middleware/utils');
const LoginController = require('../controllers/login');


Routes.route('/register').post(UserController.createUser)
Routes.route('/getUser').post(jwt_auth.authenticate,UserController.getUser)
// Routes.route('/getAllUser').get(jwt_auth.authenticate,UserController.getAllUser);

/** Login */
Routes.route('/login').post(passport.authenticate('local'),LoginController.login);
// Routes.route('/logout').get(LoginController.logout)

// Routes.route('/logout').get((req, res) => {
//   req.logout(() => {
//     res.redirect('/api');
//   });
// });

module.exports= Routes;