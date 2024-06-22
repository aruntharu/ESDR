const express = require('express')

const dbConnect = require('./src/db/connection')
const userRoute = require('./src/routes/user')
const newsRoute = require('./src/routes/news')

const cors = require('cors');

dbConnect()
const app = express()

app.use(cors())
require('dotenv').config()
//body parser
app.use(express.json())
app.use(userRoute)
app.use(newsRoute)


const port = process.env.PORT || 8000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})