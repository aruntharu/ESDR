const mongoose = require('mongoose')
const { Schema } = mongoose;

const messageSchema = new Schema({
  messageHeading: String,
  senderName: String,
  messageDate: String,
  messageDescription: String,
  messageImage: String, 
});
const Message = mongoose.model('Message', messageSchema);
module.exports= Message

