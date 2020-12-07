const db = require('../models')

const categoryService = require('../services/categoryService')

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
  categoryService.putCategory(req, res, (result) => {
    if (result.success === true) {
      req.flash('success_messages', result.message)
    } else {
      req.flash('error_messages', result.message)
    }
    return res.redirect('/admin/categories')
  })
}

const deleteCategory = async (req, res) => {
  categoryService.deleteCategory(req, res, (result) => {
    if (result.success === true) {
      req.flash('success_messages', result.message)
    } else {
      req.flash('error_messages', result.message)
    }
    return res.redirect('/admin/categories')
  })
}

module.exports = {
  getCategories,
  createCategory,
  putCategory,
  deleteCategory
}
