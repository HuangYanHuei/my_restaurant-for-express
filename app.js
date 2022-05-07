const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keyword2 = keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.name.toLowerCase().includes(keyword2) || restaurants.category.includes(keyword2)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.find(restaurants =>
    restaurants.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurants: restaurants })
})

app.listen(port, () => {
  console.log('ok')
})