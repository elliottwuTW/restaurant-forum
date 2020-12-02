const db = require('../models')
const Comment = db.Comment
const Restaurant = db.Restaurant

const postComment = async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.body.restaurantId)
  if (!restaurant) {
    req.flash('error_messages', '餐廳中無此 id')
    return res.redirect('back')
  }

  await Comment.create({
    text: req.body.text,
    RestaurantId: restaurant.id,
    UserId: req.user.id
  })
  return res.redirect(`/restaurants/${restaurant.id}`)
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
