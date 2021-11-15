const express = require('express')
const db = require('./db')
const router = require('./route')

const app = express()
const port = 3030

// Middlewares
app.use(express.json()) // converts request body to json format
app.use(express.urlencoded({
    extended: true
}))

// Default response on browser
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Welcome to my User API',
        data: []
    })
})

app.use(router)

// Error handling middleware
app.use((req, res) => {
    res.send('Not Found')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        status: 'failed',
        message: 'internal server error',
        data: []
    })
})

// db connect
db.connect()
  .then((obj) => {
    app.listen(port, () => {
      obj.done();
      console.log(`starting on port ${port}`)
    });
  })
  .catch((error) => {
    console.log(error.message)
  });

  module.exports = app