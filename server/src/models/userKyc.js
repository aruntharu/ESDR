const mongoose = require('mongoose');
const { Schema } = mongoose;

const userKycSchema = new Schema({
  phoneNumber: String,
  fullName: String,
  email: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male'
  },
  citizenshipNumber:String,
  provinceNepal: String,
  districtNepal: String,
  municipalityNepal: String,
  wardNepal: String,
  collegeUniversityNepal: String,
  companyWorkNepal: String,
  coursesNepal: String,
  passportNumber: String,
  streetAddress:String,
  city: String,
  stateProvince: String,
  postalZipCode: String,
  county: String,
  collegeUniversity: String,
  companyWork: String,
  courses: String,
  abstract: String,
  verificationPhotoFront: String,
  verificationPhotoBack: String,
  nationality: {
    type: String,
    enum: ['Nepali', 'Foreign'],
    default: 'Nepali'
  },
  fatherName: String,
  dob: String,
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