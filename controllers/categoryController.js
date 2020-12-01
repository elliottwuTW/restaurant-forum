const db = require('../models')
const Category = db.Category

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

const getCategories = async (req, res) => {
  const categories = await Category.findAll({
    raw: true,
    nest: true,
    order: [['updatedAt', 'DESC']]
  })
  if (!req.params.id) {
    return res.render('admin/categories', { categories })
  } else {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      req.flash('error_messages', '分類中無此 id')
      return res.redirect('/admin/categories')
    }

    return res.render('admin/categories', {
      categories,
      category: category.toJSON()
    })
  }
}

const createCategory = async (req, res) => {
  // check name
  if (!req.body.name) {
    req.flash('error_messages', '分類名稱不可為空')
    return res.redirect('/admin/categories')
  }

  try {
    await Category.create(req.body)
    return res.redirect('/admin/categories')
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)[0]
      req.flash('error_messages', validationErrorMsg)
      return res.redirect('/admin/categories')
    } else {
      console.error(err)
    }
  }
}

const putCategory = async (req, res) => {
  // check name
  if (!req.body.name) {
    req.flash('error_messages', '分類名稱不可為空')
    return res.redirect('back')
  }
  const category = await Category.findByPk(req.params.id)
  if (!category) {
    req.flash('error_messages', '分類中無此 id')
    return res.redirect('back')
  }
  try {
    await category.update(req.body)
    return res.redirect('/admin/categories')
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)[0]
      req.flash('error_messages', validationErrorMsg)
      return res.redirect('/admin/categories')
    } else {
      console.error(err)
    }
  }
}

const deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id)
  if (!category) {
    req.flash('error_messages', '分類中無此 id')
    return res.redirect('back')
  }
  await category.destroy()
  return res.redirect('/admin/categories')
}

module.exports = {
  getCategories,
  createCategory,
  putCategory,
  deleteCategory
}
