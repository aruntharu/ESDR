const Committee = require("../models/committee")

  const addCommittee = async (req,res)=>{
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
    const committeeList = await Committee.findByIdAndDelete(req.params.id)
    return res.json(committeeList)
   }
  
   const getCommitteeDetailsById = async (req,res)=>{
    try{
      const committeeList = await Committee.findById(req.params.id)
      return res.json(committeeList)
    }catch(err){
      return res.json({
        msg:"unable to fetch"
      })
    }

   }

  module.exports = {addCommittee, getAllCommittee, deleteCommitteeById, getCommitteeDetailsById}