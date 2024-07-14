const express = require('express')
const app = express()

const dbConnect = require('./src/db/connection')
const userRoute = require('./src/routes/user')
const newsRoute = require('./src/routes/news')
const messageRoute = require('./src/routes/message')
const committeeRoute = require('./src/routes/committee')
const noticeRoute = require('./src/routes/notice')


const path = require('path')

const cors = require('cors');

dbConnect()


app.use(cors())
require('dotenv').config()
//body parser
app.use(express.json())
app.use(userRoute)
app.use(newsRoute)
app.use(messageRoute)
app.use(committeeRoute)
app.use(noticeRoute)

const port = process.env.PORT || 8000

app.use('/news-image', express.static(path.join(__dirname, 'uploads/newsImage')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})