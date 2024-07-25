const mongoose = require('mongoose');
const { Schema } = mongoose;

const esdrSchema = new Schema({
  esdrHeading: String,
  esdrIntro: String,
  esdrDescription: String,
  esdrDate: Date, // Use Date type
  esdrImage: String,
});

const Esdr = mongoose.model('Esdr', esdrSchema);
module.exports = Esdr;
