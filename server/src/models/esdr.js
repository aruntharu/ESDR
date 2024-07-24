const mongoose = require('mongoose')
const { Schema } = mongoose;

const esdrSchema = new Schema({
    esdrHeading: String,
    esdrIntro: String,
    esdrDescription: String,
    esdrDate: String,
    esdrImage: String,
});
const Esdr = mongoose.model('Esdr', esdrSchema);
module.exports= Esdr

