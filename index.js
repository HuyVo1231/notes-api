const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
const route = require('./routes/')
const db = require('./config/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
  cors({
    origin: '*'
    // origin: 'https://your-frontend.vercel.app',
  })
)

db.connect()

// Route init
route(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
