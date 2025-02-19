const mongoose = require('mongoose')
const { Schema } = mongoose;

const committeeSchema = new Schema({
  fullName: String, // String is shorthand for {type: String}
  designation: String,
  personDescription: String,
  personPhoto: String, 
  serialNumber: Number,
});
const Committee = mongoose.model('Committee', committeeSchema);
module.exports= Committee

