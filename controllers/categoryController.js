const db = require('../models')
const adminService = require('../services/adminService')
const Category = db.Category

const categoryService = require('../services/categoryService')

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

const getCategories = async (req, res) => {
  categoryService.getCategories(req, res, (result) => {
    if (result.success === true) {
      const data = result.data
      if (req.params.id) {
        return res.render('admin/categories', {
          categories: data.categories,
          category: data.category
        })
      } else {
        return res.render('admin/categories', { categories: data })
      }
    } else {
      req.flash('error_messages', `${result.message}`)
      return res.redirect('/admin/categories')
    }
  })
}

const createCategory = async (req, res) => {
  categoryService.createCategory(req, res, (result) => {
    if (result.success === true) {
      req.flash('success_messages', result.message)
    } else {
      req.flash('error_messages', result.message)
    }
    return res.redirect('/admin/categories')
  })
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
