if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require("../my_restaurant")
const User = require('../user')
const bcrypt = require('bcryptjs')
const restaurantList = require("../../restaurant.json").results
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    restaurantsId: [1, 2, 3],
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    restaurantsId: [4, 5, 6],
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  SEED_USER.map(seed => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seed.password, salt))
      .then(hash => User.create({
        email: seed.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(
          restaurantList.map(restaurantdata => {
            if (seed.restaurantsId.includes(restaurantdata.id)) {
              restaurantdata.userId = userId
              return Restaurant.create(restaurantdata)
            }
          })
        )
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
  })
})