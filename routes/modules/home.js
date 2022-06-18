// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Restaurant = require('../../models/my_restaurant')
//首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  const sort = Number(req.query.value) || 5
  const sortItem = ['name', '-name', 'category', 'location', '_id']

  Restaurant.find({ userId }) // 取出  model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort(sortItem[sort - 1])
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//搜尋路由
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }
  const keywords = req.query.keywords
  const sort = Number(req.query.value) || 5
  const sortItem = ['name', '-name', 'category', 'location', '_id']
  const reg = new RegExp(keywords, 'i') //不區分大小寫

  Restaurant.find({
    $or: [
      { name: { $regex: reg } },
      { category: { $regex: reg } }
    ]
  })
    .lean()
    .sort(sortItem[sort - 1])
    .then(restaurants => {
      res.render("index", { restaurants, keywords })
    })
    .catch(err => console.log(err))
})
// 匯出路由模組
module.exports = router