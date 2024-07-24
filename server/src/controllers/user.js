const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const UserKyc = require("../models/userKyc");

const findAllUsers = async (req, res) => {
  const data = await User.find();
  res.json(data);
}

const loginUser = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (isMatched) {
      const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
      res.json({ msg: "Authorized", token, user });
    } else {
      res.status(401).json({ msg: "Invalid Password" });
    }
  } else {
    res.status(401).json({ msg: "Email not registered" });
  }
}

const registerUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body?.password, saltRounds);
    req.body.password = hashPassword;
    const phoneExist = await User.exists({ phoneNumber: req.body.phoneNumber });
    const emailExist = await User.exists({ email: req.body.email });

    if (phoneExist) {
      return res.status(409).json({ msg: "Email is taken!" });
    } else if (emailExist) {
      return res.status(409).json({ msg: "Phone Number is taken!" });
    }
    await User.create(req.body);
    return res.json({ msg: "User registered" });

  } catch (err) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

const updateUserKyc = async (req, res) => {
  try {
    const existingKyc = await UserKyc.findOne({ userId: req.body.userId });
    req.body.kycVerifiedStatus = 'pending';

    if (existingKyc) {
      // Update existing KYC
      await UserKyc.updateOne({ userId: req.body.userId }, req.body);
      res.json({ msg: "KYC updated! Please wait for verification!" });
    } else {
      // Create new KYC
      await UserKyc.create(req.body);
      res.json({ msg: "KYC submitted! Please wait for verification!" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

const checkKycStatusByUserId = async (req, res) => {
  const kycDetails = await UserKyc.findOne({ userId: req.params.userId });
  if (!kycDetails) {
    return res.json({
      kycVerifiedStatus: 'unVerified'
    });
  }
  return res.json({
    kycVerifiedStatus: kycDetails.kycVerifiedStatus
  });
}

const getUserKyc = async (req, res) => {
  const userKyc = await UserKyc.find();
  res.json(userKyc);
}

const approveKyc = async (req, res) => {
  try {
    await UserKyc.updateOne({ userId: req.body.userId }, { kycVerifiedStatus: 'verified' });
    res.json({ msg: "KYC approved" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

const rejectKyc = async (req, res) => {
  try {
    await UserKyc.updateOne({ userId: req.body.userId }, { kycVerifiedStatus: 'unVerified' });
    res.json({ msg: "KYC rejected" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

module.exports = { findAllUsers, getUserKyc, loginUser, registerUser, updateUserKyc, checkKycStatusByUserId, approveKyc, rejectKyc };