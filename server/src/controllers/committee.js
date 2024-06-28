const News = require("../models/news")

  const addCommittee = async (req,res)=>{
    req.body.committee = req.file.filename
   await Committee.create(req.body)
   return res.json({
    msg: 'Committee Added'
   }
   )
  }

  const getAllCommittee = async (req,res)=>{
   const committeeList = await Committee.find()
   return res.json(committeeList)
  }

  const deleteCommitteeById = async (req,res)=>{
    const committeeList = await News.findByIdAndDelete(req.params.id)
    return res.json(committeeList)
   }
  

  module.exports = {addCommittee , getAllCommittee, deleteCommitteeById}