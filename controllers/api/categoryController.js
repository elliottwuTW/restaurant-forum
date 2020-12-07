const categoryService = require('../../services/categoryService')

const getCategories = async (req, res) => {
  categoryService.getCategories(req, res, (result) => {
    if (result.success === true) {
      return res.json(result.data.category ? result.data.category : result.data)
    } else {
      return res.json(result)
    }
  })
}

const createCategory = async (req, res) => {
  categoryService.createCategory(req, res, (result) => {
    return res.json(result)
  })
}

const putCategory = async (req, res) => {
  categoryService.putCategory(req, res, (result) => {
    return res.json(result)
  })
}

module.exports = {
  getCategories,
  createCategory,
  putCategory
}
