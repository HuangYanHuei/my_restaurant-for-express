//宣告框架、port
const express = require('express')
const app = express()
const mongoose = require('mongoose')
// 引用 body-parser
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 3000
//渲染套件
const exphbs = require('express-handlebars')
// 設定連線到 mongoDB
const Restaurant = require('./models/my_restaurant') // 載入 Todo model

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//靜態檔案
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//首頁路由
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
//新增餐廳路由
app.get('/my_restaurant/new', (req, res) => {
  return res.render('new')
})

app.post('/my_restaurant', (req, res) => {
  return Restaurant.create(req.body)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//搜尋路由
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const restaurantsData = restaurants.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurants: restaurantsData, keywords })
    })
    .catch(err => console.log(err))
})
//點擊餐廳顯示詳細資料路由
app.get('/my_restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//修改餐廳路由
app.get('/my_restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

//修改後update資料庫路由
app.put('/my_restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)   // 存入資料庫
    .then(restaurants => {
      return restaurants.update(req.body)
    })
    .then(() => res.redirect(`/my_restaurant/${id}`))
    .catch(error => console.log(error))
})

//刪除路由
app.delete('/my_restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//監聽器
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})