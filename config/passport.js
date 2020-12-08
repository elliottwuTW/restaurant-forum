const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const { User, Restaurant } = require('../models')

// setup passport strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    // verifying function
    (req, email, password, done) => {
      User.findOne({ where: { email } }).then((user) => {
        if (!user) {
          return done(null, false, req.flash('error_messages', '帳號不存在'))
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, req.flash('error_messages', '密碼輸入錯誤'))
        }
        return done(null, user)
      })
    }
  )
)

passport.serializeUser((user, done) => {
  return done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findByPk(id, {
    include: [
      {
        model: Restaurant,
        as: 'FavoritedRestaurants'
      },
      {
        model: Restaurant,
        as: 'LikedRestaurants'
      },
      {
        model: User,
        as: 'Followers'
      },
      {
        model: User,
        as: 'Followings'
      }
    ]
  }).then((user) => {
    user = user.toJSON()
    return done(null, user)
  })
})

// JWT
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

passport.use(
  new JwtStrategy(jwtOptions, function (payload, done) {
    User.findByPk(payload.id, {
      include: [
        {
          model: Restaurant,
          as: 'FavoritedRestaurants'
        },
        {
          model: Restaurant,
          as: 'LikedRestaurants'
        },
        {
          model: User,
          as: 'Followers'
        },
        {
          model: User,
          as: 'Followings'
        }
      ]
    }).then((user) => {
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
)

module.exports = passport
