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
const routes = require('./routes')

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
// 將 request 導入路由器
app.use(routes)

//監聽器
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})