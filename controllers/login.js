'use strict'

const { successResponse, errorResponse, internalServerErrorResponse } = require('../apps/helpers/customeResponseTemplate');
const LoginService = require("../services/LoginService");

module.exports = class LoginController extends LoginService {
    constructor() {
      super();
    }

    static async login(req,res){
        try {
            let obj = req.body;
            
            let userData = await super.LoginUser(obj);            
            if(userData){
              // res.render('getUser',{message: userData.message})
              // res.setHeader({token:userData.token})
              successResponse(req,res, userData.message,userData.result)
            }else{
              errorResponse(req,res,userData.message,userData.result)
            } 
        } catch (error) {
          internalServerErrorResponse(req,res,"SomeThing Went Wrong.",error)
        }
    }

    // static async logout(req,res){
    //     try {
    //         res.status(200).send({
    //           status: true,
    //           message: 'Logout successful.',
    //           data: [],
    //         });
    //       } catch (error) {
    //         res.status(500).send({
    //           status: false,
    //           message: 'Internal Server Error',
    //           data: [],
    //         });
    //       }
    // }

    
}