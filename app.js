const express = require('express');
const app = express();
require('./database/model')
require('dotenv').config();
const http = require('http');
const passport = require('passport');
var LocalStrategy = require('passport-local');
const routes = require('./routes/routes')
const expressSession = require('express-session');
const {users} = require('./database/model');
require('./apps/passportconfig')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({secret:'secret',resave:false,saveUninitialized:false}))

/** Passport Middleware */
app.use(passport.initialize())
app.use(passport.session())

app.use('/api',routes)

const server = http.createServer(app)
app.use((req,res,next)=>{
    res.header('X-XSS-Protection', '1; mode=block')
    res.header("X-powered-by", "Blood, sweat, and tears.");
    res.header('X-Frame-Options', 'deny')
    res.header('X-Content-Type-Options', 'nosniff')
    res.header(
      'Access-Control-Allow-Methods',
      'GET, PUT, POST, DELETE , HEAD , OPTIONS',
    )
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept,Authorization, X-Token',
    )
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

/** Create Local Strategies */
passport.use(new LocalStrategy(
  async function(username, password, done) {
    console.log(username, password,users);
    try {
      const userData = await users.findOne({ where: { email: username } });
      // console.log(userData,"userData");
      if (!userData) { return done(null, false); }
      if (!userData.password == password) { return done(null, false); }
      // console.log(userData);
      
      return done(null, userData);
    } catch (error) {
      console.log(error); 
    }
  }
));

app.post('/register', 
  async (req,res,done)=>{
    const userData = await users.findOne({ where: { email: req.body.username } });
    // if(userData == "" || userData == null) done(null, false)
    if(userData) res.json({msg:"User Is Already Exist."})
    else {
      let userData = await users.create({email:req.body.username,password: req.body.password,first_name:req.body.firstname,last_name:req.body.lastname,mobileno:req.body.mobileno})
      console.log(userData,"userData");
      res.json({msg: "user is created.",result: userData})
    }
  },
  passport.authenticate('local'),
  // function(req, res) {
  //   res.json({msg:`${userData.email} user is created`})
  //   // res.json(req.user)
  //   // res.redirect('/');
  // }
);

app.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    res.json(req.user)
    // res.redirect('/');
  });

/** Serialize & Deserialize User */
passport.serializeUser((userData, done) => {
  if(userData){
    done(null, userData.id)
  }
  done(null, false)
});
passport.deserializeUser(async(id, done) => {
  const user = await users.findByPk(id);
  done(null, user);
});


// app.use(user)
server.listen(process.env.PORT,()=>{
    console.log(`Server is Started at ${process.env.NODE_ENV}-Server ${process.env.PORT} `);
})
