const passport = require('passport');
const LocalStrategy = require('passport-local');
const {users} = require('../database/model');
const bcrypt = require('bcrypt')

// Passport Local Strategy
passport.use(
    new LocalStrategy(async(username, password, done) => {
      const user = await users.findOne({ where: { email: username } });
      
      if (!user) return done(null, false, { message: 'User not found' });
      
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    })
  );
  
  // Serialize & Deserialize User
  passport.serializeUser((user, done) => {
    done(null, user.id)}
  );
  passport.deserializeUser(async(id, done) => {
    const user = await users.findByPk(id);
    done(null, user);
  });
