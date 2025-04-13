const Routes = require('express').Router();
const UserController = require('../controllers/user');
const jwt_auth = require("../apps/JWT/jwt_auth");
const passport = require('passport');
const { isAuthenticated } = require('../middleware/utils');


Routes.route('/createuser').post(UserController.createUser)
Routes.route('/getUser').post(jwt_auth.authenticate,UserController.getUser)
// Routes.route('/getAllUser').get(jwt_auth.authenticate,UserController.getAllUser);

/** Login */
// Routes.route('/login').post(LoginController.login)
// Routes.route('/login').post(LoginController.login)
// Routes.route('/logout').get(LoginController.logout)

/** View */
// Routes.route('/dashboard').get(DashboardController.dashboard)

/** Passport Routes */
Routes.route('/').get((req, res) => res.send('Home Page'));

// Routes.route('/login').get((req, res) => res.send('<form action="/api/login" method="POST"><input name="username"/><input name="password" type="password"/><button type="submit">Login</button></form>'));

// Routes.route('/login').post(passport.authenticate('local', {
//   successRedirect: '/api/dashboard',
//   failureRedirect: '/api/login'
// }));

Routes.route('/dashboard').get(isAuthenticated, (req, res) => res.send(`Welcome ${req.user.first_name}! <a href="/api/logout">Logout</a>`));

Routes.route('/logout').get((req, res) => {
  req.logout(() => {
    res.redirect('/api');
  });
});

module.exports= Routes;