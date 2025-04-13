'use strict'

const { successResponse, internalServerErrorResponse, errorResponse } = require("../apps/helpers/customeResponseTemplate");
// const {users} = require('../database/model');
const UserService = require("../services/UserService");

module.exports = class UserController extends UserService {
    constructor() {
      super();
    }

    static async createUser(req,res){
        try {
            let obj = req.body;
            let result = await super.CreateUser(obj); 
            if(result){
                successResponse(req,res, result.message,result.result)
            }else{
                errorResponse(req,res,result.message,result.result)
            }       
        } catch (error) {
            console.log(error);
            internalServerErrorResponse(req,res,"SomeThing Went Wrong.",error)
        }
    }

    // static async getAllUser(req,res){
    //     try {
    //         const userData = await super.GetAllUser()
    //         if(userData){
    //             successResponse(req,res, userData.message,userData.result)
    //         }else{
    //             errorResponse(req,res,userData.message,userData.result)
    //         }           
    //     } catch (error) {
    //         console.log(error);
    //         internalServerErrorResponse(req,res,"SomeThing Went Wrong.",error)
    //     }
    // }

    static async getUser(req,res){
        try {
            const userData = await super.GetUser(req.body)                 
            if(userData){
                successResponse(req,res, userData.message,userData.result)
            }else{
                errorResponse(req,res,userData.message,userData.result)
            }           
        } catch (error) {
            console.log(error);
            internalServerErrorResponse(req,res,"SomeThing Went Wrong.",error)
        }
    }    
}