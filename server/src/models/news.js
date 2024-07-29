const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
  newsHeading: String, 
  newsIntro: String,
  newsDescription: String,
  newsDate: String,
  newsImage: String,
  newsPDF: String, // Add this field for the PDF file
});

const News = mongoose.model('News', newsSchema);
module.exports = News;
