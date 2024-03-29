const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String }, //称号
  categories: [{ //多个分类、法师、刺客
    type: mongoose.SchemaTypes.ObjectId, // id类型
    ref: 'Category' // 关联哪个模型
  }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  items1: [{ //顺风出装
    type: mongoose.SchemaTypes.ObjectId, // id类型
    ref: 'Item' // 关联哪个模型
  }],
  items2: [{ //逆风出装
    type: mongoose.SchemaTypes.ObjectId, // id类型
    ref: 'Item' // 关联哪个模型
  }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: { type: String }
  }],
})

module.exports = mongoose.model('Hero', schema)