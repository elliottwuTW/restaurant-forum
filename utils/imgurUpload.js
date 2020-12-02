// imgur upload promise
const imgur = require('imgur-node-api')
module.exports = (file) => {
  return new Promise((resolve, reject) => {
    imgur.upload(file.path, (err, img) => {
      if (err) {
        return reject(err)
      }
      return resolve(img)
    })
  })
}
