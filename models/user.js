'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment)
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: '請填入 Email' },
          is: {
            args: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            msg: 'Email 格式異常'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: '請填入密碼' },
          len: {
            args: [6, 20],
            msg: '密碼長度需介於 6 ~ 20'
          }
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  // hash user password
  User.afterValidate((user) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
  })
  return User
}
