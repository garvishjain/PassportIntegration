'use strict'
// const { log } = require('winston')
const db = require('../../database/model/index')
const sequelize = require('sequelize')
// let transaction = new sequelize.Transaction()
const postgreConnection = {
  query: async (query, types) => {
    if (types) {
      let result
      switch (types) {
        case 'select':
          result = await db.sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
          })
          return result
        case 'insert':
          result = await db.sequelize.query(query, {
            type: sequelize.QueryTypes.INSERT,
          })
          return result
        case 'update':
          result = await db.sequelize.query(query, {
            type: sequelize.QueryTypes.UPDATE,
          })
          return result
        case 'delete':
          result = await db.sequelize.query(query, {
            type: sequelize.QueryTypes.DELETE,
          })
          return result
      }
    } else {
      let result = await db.sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      })
      return result
    }
  },
  createTransaction: async () => {
    const tran = await db.sequelize.transaction()
    return tran
  },
  getSingleData: async query => {
    let result = await db.sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    return result[0]
  },
  updateWithValues: async (query, values) => {
    let result = await db.sequelize.query(query, {
      bind: values,
      type: sequelize.QueryTypes.UPDATE,
    })
    return result
  },
  selectWithValues: async (query, values) => {
    let result = await db.sequelize.query(query, {
      bind: values,
      type: sequelize.QueryTypes.SELECT,
    })
    return result
  },

  insertNewToken: async (UserCredential, UserId, Token) => {
    let isInserted = false
    const values = [
      UserCredential.FcmDeviceid,
      true,
      UserId,
      UserCredential.imei_no,
      UserCredential.Devicetype,
      UserCredential.DeviceInfo,
      UserCredential.VersionCode,
      UserCredential.VersionName,
      '',
      UserCredential.EazyErpAppVersion,
      UserCredential.Username,
      UserCredential.loginappname,
      Token,
    ]
    const sQuery = `
      INSERT INTO tbl_mobilesessiondetail(fcmid, isactiveuser, userid, imeinumber, devicetype, deviceinfo, versioncode,
      versionname, token, appversion, expiry_date, username, appname , nvtoken)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now(), $11, $12, $13)
    `

    let result = await db.sequelize.query(sQuery, {
      bind: values,
      type: sequelize.QueryTypes.INSERT,
    })

    console.log(result)

    isInserted = result[1] > 0

    console.log('isInserted', isInserted)

    return isInserted
  },
}

module.exports = postgreConnection
