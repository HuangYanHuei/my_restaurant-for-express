const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/my_restaurant')

//新增餐廳路由
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  return Restaurant.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//點擊餐廳顯示詳細資料路由
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//修改餐廳路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

//修改後update資料庫路由
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)   // 存入資料庫
    .then(restaurants => {
      return restaurants.updateOne(req.body)
    })
    .then(() => res.redirect(`/my_restaurant/${id}`))
    .catch(error => console.log(error))
})

//刪除路由
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router