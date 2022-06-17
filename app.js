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
const usePassport = require('./config/passport')
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

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

//設定本地變數 res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// 將 request 導入路由器
app.use(routes)

//監聽器
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})