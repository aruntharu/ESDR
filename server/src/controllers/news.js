const News = require("../models/news")

  const addNews = async (req,res)=>{
    req.body.newsImage = req.file.filename
   await News.create(req.body)
   return res.json({
    msg: 'News Added'
   }
   )
  }

  const getAllNews = async (req,res)=>{
   const newsList = await News.find()
   return res.json(newsList)
  }

  

  module.exports = {addNews, getAllNews}