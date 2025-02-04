// const { writeLog } = require("../apps/helpers/utils");
// const axios  = require("axios");
const postgreConnection = require("../apps/helpers/sequelizeHelpers");
const {users} = require('../database/model');
const bcrypt = require('bcrypt');

module.exports = class UserService {
  static async CreateUser(objUser) {
    try {
      const {firstName,lastName,email,mobileno,password}= objUser
      if(mobileno===toString()){
        return {
          message: 'Please Enter Number Value',
          result: ""
        }
      }
      const hash_password = await bcrypt.hash(password, 10);
      const getUser = await users.findAll();
      let getEmail = {}
      const data = {
          first_name:firstName,
          last_name:lastName,
          email: email,
          mobileno: mobileno,
          password: hash_password
      }
      getUser.map((item)=>{
        getEmail = item.email;
      })
      if(getEmail == email){
        return {
          message: 'Please enter different email',
          result: ""
        }
      }
      if(getEmail!==email){
        const result = await users.create(data);
        return {
          message: 'User is Create Successfully',
          result
        }
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  // static async GetAllUser(){
  //   try {
  //     const userData = await users.findAll();
  //     if(userData){
  //       return{
  //         message: "Data Found",
  //         result: userData
  //       }
  //     }
  //     else{
  //       return{
  //         message: "Data Not Found",
  //         result: ""
  //       }
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async GetUser(objUser){
    try {
      const {email} = objUser;
      const userData = await users.findOne({ where: { email: email } });
      if(userData){
        return{
          message: "Data Found",
          result: userData
        }
      }
      else{
        return{
          message: "Data Not Found",
          result: ""
        }
      }
    } catch (error) {
      throw error;
    }
  }
}