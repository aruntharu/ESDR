const News = require("../models/news")

  const addNews = async (req,res)=>{
    req.body.news = req.file.filename
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

  const deleteNewsById = async (req,res)=>{
    const newsList = await News.findByIdAndDelete(req.params.id)
    return res.json(newsList)
   }
  
   const getNewsDetailsById = async (req,res)=>{
    try{
      const newsList = await News.findById(req.params.id)
      return res.json(newsList)
    }catch(err){
      return res.json({
        msg:"unable to fetch"
      })
    }

   }

  module.exports = {addNews, getAllNews, deleteNewsById, getNewsDetailsById}