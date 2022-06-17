//宣告框架、port
const express = require('express')
const session = require('express-session')
const app = express()
// 引用 body-parser
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = 3000
//渲染套件
const exphbs = require('express-handlebars')
// 設定連線到 mongoDB
const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

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