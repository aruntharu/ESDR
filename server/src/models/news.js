const mongoose = require('mongoose')
const { Schema } = mongoose;

const newsSchema = new Schema({
  newsHeading: String, // String is shorthand for {type: String}
  newsIntro: String,
  newsDescription: String,
  newsDate: String,
  newsImage: String, 
});
const News = mongoose.model('News', newsSchema);
module.exports= News


