const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String }, //标题
  categories: [{
    type: mongoose.SchemaTypes.ObjectId, // id类型
    ref: 'Category' // 关联哪个模型
  }],
  body: { type: String }
})

module.exports = mongoose.model('Article', schema)