//宣告框架、port
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
//渲染套件
const exphbs = require('express-handlebars')
//餐廳JSON檔
const restaurantList = require('./restaurant.json')
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//靜態檔案
app.use(express.static('public'))

//首頁路由
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
//搜尋路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keyword2 = keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.name.toLowerCase().includes(keyword2) || restaurants.category.includes(keyword2)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})
//點擊餐廳顯示詳細資料路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.find(restaurants =>
    restaurants.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurants: restaurants })
})
//監聽器
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})