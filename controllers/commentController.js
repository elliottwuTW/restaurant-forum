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

module.exports = {
  postComment
}
