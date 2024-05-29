
const express = require('express')
const app = express()
const port = 5000
const bookList = [
  {id:1, Bookname: 'Asian Journal Vol 1', price: 4000},
  {id:2, Bookname: 'Trafficking of Girls and Women in Nepal', price: 6000},
  {id:3, Bookname: 'Situational Analysis and Baseline Study "Torture & Improper Use of Force in Nepal"', price: 4000},
  {id:4, Bookname: 'Jurisprudence: The Philosophy of Law, Oriental Perspective, with Special Refere', price: 4000},
  {id:5, Bookname: 'Criminal Justice System: Comparative Study of the Criminal Justice System of Nepal', price: 4000},
  {id:6, Bookname: 'Asian Journal Vol 3', price: 4000},

]

app.get('/books/:id', (req, res) => {
  const selectBook = bookList.find((item)=>{
    if(item.Bookname==req.params.id){
      return item
    }
  })
  res.send(selectBook)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})