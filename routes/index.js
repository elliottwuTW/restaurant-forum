const home = require('./modules/home')
const admin = require('./modules/admin')

module.exports = (app) => {
  // 前台
  app.use('/', home)

  // 後台
  app.use('/admin', admin)
}
