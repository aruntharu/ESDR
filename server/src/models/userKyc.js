const mongoose = require('mongoose');
const { Schema } = mongoose;

const userKycSchema = new Schema({
  phoneNumber: String,
  fullName: String,
  email: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'female'
  },
  verificationNumber: String,
  verificationPhotoFront: String,
  verificationPhotoBack: String,
  nationality: {
    type: String,
    enum: ['Nepali', 'Foreign'],
    default: 'Nepali'
  },
  fathersName: String,
  permanentAddress: String,
  dob: String,
  temporaryAddress: String,
  kycVerifiedStatus: {
    type: String,
    enum: ['unVerified', 'pending', 'verified'],
    default: 'unVerified'
  },
  userId: String
}, {
  timestamps: true
});

const UserKyc = mongoose.model('UserKyc', userKycSchema);
module.exports = UserKyc;
