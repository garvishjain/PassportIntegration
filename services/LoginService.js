// const { writeLog } = require("../apps/helpers/utils");
// const axios  = require("axios");
const postgreConnection = require("../apps/helpers/sequelizeHelpers");
const {users, tokensessions} = require('../database/model');
const bcrypt = require('bcrypt');
// const { createWebToken } = require("../util/token");
const {Jwt} = require('../apps/JWT/jwt')
const passport = require('passport');
const LocalStrategy = require('passport-local')

module.exports = class UserService {
//   static async LoginUser(objUser) {
//     try {
//         const {email,password} = objUser;
//         const data = {
//             email: email,
//             password: password
//         }
//         const userData = await users.findOne({where:{email:email}});
//         if(userData){            
//             const activetoken = await tokensessions.findOne({where:{userid:userData.id,isactive:true}})
//             if(activetoken){
//                 await tokensessions.update({isactive:false},{where:{userid:userData.id,isactive:true}})
//             }
//             const match_password = await bcrypt.compare(password, userData.password); 
//             if(match_password){
//                 const token = new Jwt().createToken(data,{expiresIn:'5m'})
//                 await tokensessions.create({userid:userData.id,token})
//                 return {
//                     message: 'Login Successfully',
//                     result:token
//                 }
//             }else{
//                 return {
//                     message: 'Incorrect Password',
//                     result: ""
//                 }
//             }
//         }else{
//             return {
//                 message: 'Incorrect Email',
//                 result: ""
//             }
//         }
//     } catch (error) {
//         throw error;
//     }
//   }

    static async LoginUser(obj){
        console.log(obj);
        
        passport.use(new LocalStrategy(
            function(username, password, done) {
                console.log(username,"<<username>>",password,"<<password>>");
                
              users.findOne({ email: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
              });
            }
        ));

        passport.serializeUser((user,done)=>{
            done(null, user.id);
            })
            
            passport.deserializeUser(async(id, done)=>{
            try {
              const user = await Users.findById(id);
            
              done(null, user)
            } catch (error) {
              done(error,false);
            }
            })
    }
}