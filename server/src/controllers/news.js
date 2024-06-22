const News = require("../models/news")

  const addNews = async (req,res)=>{
   await News.create(req.body)
   return res.json({
    msg: 'News Added'
   }
   )
  }

  module.exports = {addNews}