const db = require('../models')
const Category = db.Category

const getCategories = async (req, res, callback) => {
  const categories = await Category.findAll({
    raw: true,
    nest: true,
    order: [['updatedAt', 'DESC']]
  })
  if (!req.params.id) {
    callback({ success: true, data: categories })
  } else {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      return callback({ success: false, message: '分類中無此 id', data: {} })
    }
    callback({
      success: true,
      data: {
        categories,
        category: category.toJSON()
      }
    })
  }
}

module.exports = {
  getCategories
}
