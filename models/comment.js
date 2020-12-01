'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Restaurant)
    }
  }
  Comment.init(
    {
      text: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: { msg: '不可發送空白評論' }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      RestaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  )
  return Comment
}
