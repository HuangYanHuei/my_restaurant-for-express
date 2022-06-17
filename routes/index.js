// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
// 掛載 middleware
const { authenticator } = require('../middleware/auth')
// 引入路由模組
// 加入驗證程序
router.use('/my_restaurant', authenticator, restaurants)
router.use('/users', users)
//寬鬆路由放在最後
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router