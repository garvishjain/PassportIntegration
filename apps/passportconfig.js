const passport = require('passport');
const LocalStrategy = require('passport-local');
const {users} = require('../database/model');
const bcrypt = require('bcrypt')

/** Passport Local Strategy */
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const userData = await users.findOne({ where: { email: username } });      
      if (userData == null || userData =="") { return done(null, false,{ message: 'User not found' }); }
      if (!bcrypt.compareSync(password, userData.password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, userData);
    } catch (error) {
      console.log(error); 
      throw error;
    }
  }
));
  
// Serialize & Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id)}
);
passport.deserializeUser(async(id, done) => {
  const user = await users.findByPk(id);
  done(null, user);
});
