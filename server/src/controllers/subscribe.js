const Subscribe = require("../models/subscribe")

  const addSubscribe = async (req,res)=>{
   await Subscribe.create(req.body)
   return res.json({
    msg: 'Thank you'
   }
   )
  }

  const getAllSubscribe = async (req,res)=>{
   const subscribeList = await Subscribe.find()
   return res.json(subscribeList)
  }

  const deleteSubscribeById = async (req,res)=>{
    const subscribeList = await Subscribe.findByIdAndDelete(req.params.id)
    return res.json(subscribeList)
   }
  
   const getSubscribeDetailsById = async (req,res)=>{
    try{
      const subscribeList = await Subscribe.findById(req.params.id)
      return res.json(subscribeList)
    }catch(err){
      return res.json({
        msg:"unable to fetch"
      })
    }

   }

  module.exports = {addSubscribe, getAllSubscribe, deleteSubscribeById, getSubscribeDetailsById}