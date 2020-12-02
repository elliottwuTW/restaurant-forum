const db = require('../models')
const Comment = db.Comment
const Restaurant = db.Restaurant

// error handle method
const {
  allValidationError,
  errorMsgToArray
} = require('../utils/errorHandleHelper')

const postComment = async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.body.restaurantId)
  if (!restaurant) {
    req.flash('error_messages', '餐廳中無此 id')
    return res.redirect('back')
  }
  try {
    await Comment.create({
      text: req.body.text,
      RestaurantId: restaurant.id,
      UserId: req.user.id
    })
    return res.redirect(`/restaurants/${restaurant.id}`)
  } catch (err) {
    if (allValidationError(err.errors)) {
      const validationErrorMsg = errorMsgToArray(err.message)
      req.flash('error_messages', validationErrorMsg)
      return res.redirect('back')
    } else {
      console.error(err)
    }
  }
}

const deleteComment = async (req, res) => {
  let comment = await Comment.findByPk(req.params.id)
  if (!comment) {
    req.flash('error_messages', '評論中無此 id')
    return res.redirect('back')
  }
  if (!req.user.isAdmin) {
    req.flash('error_messages', '權限不足')
    return res.redirect('back')
  }
  comment = await comment.destroy()
  return res.redirect(`/restaurants/${comment.RestaurantId}`)
}

module.exports = {
  postComment,
  deleteComment
}
