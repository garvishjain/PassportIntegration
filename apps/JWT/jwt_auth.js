'use strict'
const { Jwt } = require('./jwt')

const { unauthorizedResponse } = require('../helpers/customeResponseTemplate')
// const {users, tokensessions} = require('../../database/model');
const {users} = require('../../database/model')


class Token {
  static async authenticate(req, res, next) {
    const bearerHeader = req.headers['token']

    if (typeof bearerHeader != 'undefined') {
      try {
        const decode = await new Jwt().verifyToken(bearerHeader)

        if (decode == 'expired') {
          return unauthorizedResponse(req, res, 'Token is expired / Invalid')
        } else {
          const activetoken = await users.findOne({where:{email:decode.email}})
          res.setHeader = req.user
          if (activetoken) {
            next()
          } else {
            return unauthorizedResponse(req, res, `Not Authenticated` , `You have been logged-out`)
          }
        }
      } catch (e) {
        console.log(e)
        // writeLog(e, 'error')
        return unauthorizedResponse(req, res, `Please Provide a valid token `)
      }
    } else {
      return unauthorizedResponse(
        req,
        res,
        `A token is required for authentication.`,
      )
    }
  }
}

module.exports = Token
