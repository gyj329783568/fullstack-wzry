const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  parent: {
    type: mongoose.SchemaTypes.ObjectId, // id类型
    ref: 'Category' // 关联哪个模型
  }
})

module.exports = mongoose.model('Category', schema)