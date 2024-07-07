const Message = require("../models/message")

  const addMessage = async (req,res)=>{
   await Message.create(req.body)
   return res.json({
    msg: 'Message Sent'
   }
   )
  }

  const getAllMessage = async (req,res)=>{
   const messageList = await Message.find()
   return res.json(messageList)
  }

  const deleteMessageById = async (req,res)=>{
    const messageList = await Message.findByIdAndDelete(req.params.id)
    return res.json(messageList)
   }
  
   const getMessageDetailsById = async (req,res)=>{
    try{
      const messageList = await Message.findById(req.params.id)
      return res.json(messageList)
    }catch(err){
      return res.json({
        msg:"unable to fetch"
      })
    }

   }

  module.exports = {addMessage, getAllMessage, deleteMessageById, getMessageDetailsById}