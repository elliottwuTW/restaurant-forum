// imgur upload promise
const imgur = require('imgur-node-api')

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    imgur.setClientID(IMGUR_CLIENT_ID)
    imgur.upload(file.path, (err, img) => {
      if (err) {
        return reject(err)
      }
      return resolve(img)
    })
  })
}
