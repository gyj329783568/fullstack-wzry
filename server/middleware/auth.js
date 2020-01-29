module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  return async (req, res, next) => {
    // 校验用户是否登录
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先提供jwt token')
    const { id } = jwt.verify(token, req.app.get('secret')) // 找到用户id
    assert(id, 401, '无效的jwt token')
    req.user = await AdminUser.findById(id) //挂载到req
    assert(req.user, 401, '请先登录')
    await next()
  }
}