const db = require('../models')
const Category = db.Category

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

const getCategories = (req, res) => {
  Category.findAll({
    raw: true,
    nest: true,
    order: [['updatedAt', 'DESC']]
  }).then((categories) => {
    if (req.params.id) {
      Category.findByPk(req.params.id).then((category) => {
        if (!category) {
          req.flash('error_messages', '分類中無此 id')
          return res.redirect('/admin/categories')
        }

        return res.render('admin/categories', {
          categories,
          category: category.toJSON()
        })
      })
    } else {
      return res.render('admin/categories', { categories })
    }
  })
}

const createCategory = (req, res) => {
  // check name
  if (!req.body.name) {
    req.flash('error_messages', '分類名稱不可為空')
    return res.redirect('/admin/categories')
  }

  Category.create(req.body)
    .then((category) => {
      return res.redirect('/admin/categories')
    })
    .catch((err) => {
      if (allValidationError(err.errors)) {
        const validationErrorMsg = errorMsgToArray(err.message)[0]
        req.flash('error_messages', validationErrorMsg)
        return res.redirect('/admin/categories')
      } else {
        console.error(err)
      }
    })
}

const putCategory = (req, res) => {
  // check name
  if (!req.body.name) {
    req.flash('error_messages', '分類名稱不可為空')
    return res.redirect('back')
  }
  Category.findByPk(req.params.id).then((category) => {
    if (!category) {
      req.flash('error_messages', '分類中無此 id')
      return res.redirect('back')
    }
    category
      .update(req.body)
      .then((category) => {
        console.log('category: ', category.toJSON())
        return res.redirect('/admin/categories')
      })
      .catch((err) => {
        if (allValidationError(err.errors)) {
          const validationErrorMsg = errorMsgToArray(err.message)[0]
          req.flash('error_messages', validationErrorMsg)
          return res.redirect('/admin/categories')
        } else {
          console.error(err)
        }
      })
  })
}

const deleteCategory = (req, res) => {
  Category.findByPk(req.params.id).then((category) => {
    if (!category) {
      req.flash('error_messages', '分類中無此 id')
      return res.redirect('back')
    }
    category.destroy().then((category) => {
      console.log('category: ', category)
      return res.redirect('/admin/categories')
    })
  })
}

module.exports = {
  getCategories,
  createCategory,
  putCategory,
  deleteCategory
}
