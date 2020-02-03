const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {type: String},
  parent: {
    type: mongoose.SchemaTypes.ObjectId, // id类型
    ref: 'Category' // 关联哪个模型
  }
})

schema.virtual('children',{
  localField: '_id',
  foreignField: 'parent',
  justone: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'parent',
  justone: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)