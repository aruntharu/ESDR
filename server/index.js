
const express = require('express')
const dbConnect = require('./src/db/connection')
dbConnect()
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const { Schema } = mongoose;

const bookSchema = new Schema({
  Bookname: String, // String is shorthand for {type: String}
  price: String,
  body: String,
 
});
const Book = mongoose.model('Book', bookSchema);

const port = process.env.PORT


app.post('/books/', (req, res) => {
  Book.create({Bookname:'ajia', price:'4000'})
  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})