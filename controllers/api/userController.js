const jwt = require('jsonwebtoken')

const { User } = require('../../models')

const signin = async (req, res) => {
  const email = req.body.email || ''
  const password = req.body.password || ''
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: '帳號密碼不可空缺'
    })
  }
  let user = await User.findOne({ where: { email } })
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '此 email 沒有註冊'
    })
  }
  const isMatch = await user.matchPassword(password)
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: '密碼錯誤'
    })
  }
  // generate token
  const payload = { id: user.id }
  const token = jwt.sign(payload, process.env.JWT_SECRET)

  user = user.toJSON()
  const removeFields = ['password', 'image', 'createdAt', 'updatedAt']
  removeFields.forEach((field) => delete user[field])

  return res.status(200).json({
    success: true,
    message: '登入成功',
    token,
    user
  })
}

module.exports = {
  signin
}
