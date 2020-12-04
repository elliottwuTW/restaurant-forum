'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.belongsTo(models.Category)
      Restaurant.hasMany(models.Comment)
    }
  }
  Restaurant.init(
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: '請填入餐廳名稱'
          }
        }
      },
      tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: '請填入餐廳電話'
          },
          is: {
            args: /^\(?(0[0-9])\)?[-]([0-9]{4})[-]([0-9]{4})$/,
            msg: '請確認電話格式'
          }
        }
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: '請填入餐廳地址'
          }
        }
      },
      opening_hours: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: '請填入開店時間'
          }
        }
      },
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      viewCounts: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Restaurant'
    }
  )
  return Restaurant
}
