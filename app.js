const express = require('express');
const app = express();
require('./database/model')
require('dotenv').config();
const http = require('http');
const passport = require('passport');
const routes = require('./routes/routes')
const expressSession = require('express-session');
require('./apps/passportconfig')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({secret:'secret',resave:false,saveUninitialized:false}))
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


// app.use(user)
server.listen(process.env.PORT,()=>{
    console.log(`Server is Started at ${process.env.NODE_ENV}-Server ${process.env.PORT} `);
})
