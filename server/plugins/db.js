module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/fullstack-wzry', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(connectiton => {
    //console.log(connectiton)
  }).catch(error => {
    //console.log(error)
  })
  // 引入某文件夹下的所有
  require('require-all')(__dirname + '/../models')


}