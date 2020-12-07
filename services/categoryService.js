const db = require('../models')
const Category = db.Category

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

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

const createCategory = async (req, res, callback) => {
  if (!req.body.name) req.body.name = ''
  try {
    const category = await Category.create(req.body)
    callback({ success: true, message: '分類名稱建立成功', data: category })
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)[0]
      callback({ success: false, message: validationErrorMsg, data: {} })
    } else {
      console.error(err)
    }
  }
}

const putCategory = async (req, res, callback) => {
  if (!req.body.name) req.body.name = ''

  let category = await Category.findByPk(req.params.id)
  if (!category) {
    return callback({ success: false, message: '分類中無此 id', data: {} })
  }
  try {
    category = await category.update(req.body)
    callback({ success: true, message: '分類修改成功', data: category })
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)[0]
      callback({ success: false, message: validationErrorMsg, data: {} })
    } else {
      console.error(err)
    }
  }
}

module.exports = {
  getCategories,
  createCategory,
  putCategory
}
