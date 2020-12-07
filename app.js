const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const dotenv = require('dotenv')

const db = require('./models')
const passport = require('./config/passport')
const _helpers = require('./_helpers')
const helpers = require('./utils/exphbsHelper')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
app.use(flash())

// passport
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))

// local vars
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = _helpers.getUser(req)
  next()
})

// static files for /upload
app.use('/upload', express.static(path.join(__dirname, '/upload')))

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})

// 使用路由
require('./routes')(app)

module.exports = app
