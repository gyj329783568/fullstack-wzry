const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, //密码为空不会加密，查不出来
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)