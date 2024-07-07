const Contact = require("../models/contact")

  const addContact = async (req,res)=>{
   await Contact.create(req.body)
   return res.json({
    msg: 'Thank you for your FeedBack'
   }
   )
  }

  const getAllContact = async (req,res)=>{
   const contactList = await Contact.find()
   return res.json(contactList)
  }

  const deleteContactById = async (req,res)=>{
    const contactList = await Contact.findByIdAndDelete(req.params.id)
    return res.json(contactList)
   }
  
   const getContactDetailsById = async (req,res)=>{
    try{
      const contactList = await Contact.findById(req.params.id)
      return res.json(contactList)
    }catch(err){
      return res.json({
        msg:"unable to fetch"
      })
    }

   }

  module.exports = {addContact, getAllContact, deleteContactById, getContactDetailsById}