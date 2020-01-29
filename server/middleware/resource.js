module.exports = options => {
  return async (req, res, next) => {
    const Inflection = require('inflection')
    // 转首字母大写
    const modelName = Inflection.classify(req.params.resource)
    // 挂载到req.Model中
    req.Model = require(`../models/${modelName}`)
    next()
  }
}