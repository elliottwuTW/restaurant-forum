const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant

// Get all restaurants
const getRestaurants = (req, res) => {
  Restaurant.findAll({
    raw: true,
    nested: true
  }).then((restaurants) => res.render('admin/restaurants', { restaurants })) // can't put a '/' before admin
}

// New restaurant page
const createRestaurant = (req, res) => {
  return res.render('admin/create')
}

// Create an restaurant
const postRestaurant = (req, res) => {
  // check restaurant name
  if (!req.body.name) {
    req.flash('error_messages', '請填入餐廳名稱')
    return res.redirect('back')
  }
  // check if file exists in req
  const { file } = req
  if (file) {
    fs.readFile(file.path, (err, data) => {
      if (err) return console.error(err)
      fs.writeFile(`upload/${file.originalname}`, data, () => {
        return Restaurant.create({
          ...req.body,
          image: `/upload/${file.originalname}`
        }).then((restaurant) => {
          req.flash('success_messages', '餐廳建立成功')
          res.redirect('/admin/restaurants')
        })
      })
    })
  } else {
    Restaurant.create({ ...req.body, image: null }).then((restaurant) => {
      req.flash('success_messages', '餐廳建立成功')
      res.redirect('/admin/restaurants')
    })
  }
}

// Read a specific restaurant
const getRestaurant = (req, res) => {
  Restaurant.findByPk(req.params.id)
    .then((restaurant) => {
      return res.render('admin/restaurant', { restaurant: restaurant.toJSON() })
    })
    .catch((err) => console.error(err))
}

// Edit restaurant page
const editRestaurant = (req, res) => {
  Restaurant.findByPk(req.params.id).then((restaurant) =>
    res.render('admin/create', { restaurant: restaurant.toJSON() })
  )
}

// Update a specific restaurant
const updateRestaurant = (req, res) => {
  // check restaurant name
  if (!req.body.name) {
    req.flash('error_messages', '請填入餐廳名稱')
    return res.redirect('back')
  }

  const { file } = req
  if (file) {
    fs.readFile(file.path, (err, data) => {
      if (err) return console.error(err)
      console.log('file.originalname: ', file.originalname)
      fs.writeFile(`upload/${file.originalname}`, data, () => {
        return Restaurant.update(
          {
            ...req.body,
            image: `/upload/${file.originalname}`
          },
          { where: { id: req.params.id } }
        ).then(() => {
          req.flash('success_messages', '餐廳資料更新成功')
          res.redirect('/admin/restaurants')
        })
      })
    })
  } else {
    Restaurant.findByPk(req.params.id)
      .then((restaurant) => {
        restaurant.update({ ...req.body, image: restaurant.image }).then(() => {
          req.flash('success_messages', '餐廳資料更新成功')
          return res.redirect('/admin/restaurants')
        })
      })
      .catch((err) => console.error(err))
  }
}

// Delete a specific restaurant
const deleteRestaurant = (req, res) => {
  Restaurant.destroy({ where: { id: req.params.id } })
    .then(() => res.redirect('/admin/restaurants'))
    .catch((err) => console.error(err))
}

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  postRestaurant,
  editRestaurant,
  updateRestaurant,
  deleteRestaurant
}
