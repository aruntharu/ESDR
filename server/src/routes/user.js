const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');

const router = Router();

const { registerUser, loginUser, findAllUsers, updateUserKyc, checkKycStatusByUserId, getUserKyc, approveKyc, rejectKyc } = require('../controllers/user');

// Configuration for front image storage
const storageFront = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/verification/front/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Configuration for back image storage
const storageBack = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/verification/back/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadFront = multer({ storage: storageFront });
const uploadBack = multer({ storage: storageBack });

// Configure multer to handle both front and back file uploads
const multipleUpload = [
  { name: 'front', maxCount: 1 },
  { name: 'back', maxCount: 1 }
];

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', findAllUsers);
router.post('/user-kyc', multer({ storage: multer.memoryStorage() }).fields(multipleUpload), async (req, res, next) => {
  try {
    const frontFile = req.files.front ? req.files.front[0] : null;
    const backFile = req.files.back ? req.files.back[0] : null;

    if (frontFile) {
      const frontPath = 'uploads/verification/front/' + Date.now() + '-' + frontFile.originalname;
      fs.writeFileSync(frontPath, frontFile.buffer);
      req.body.verificationPhotoFront = frontPath;
    }

    if (backFile) {
      const backPath = 'uploads/verification/back/' + Date.now() + '-' + backFile.originalname;
      fs.writeFileSync(backPath, backFile.buffer);
      req.body.verificationPhotoBack = backPath;
    }

    await updateUserKyc(req, res);
  } catch (err) {
    next(err);
  }
});
router.put('/user-kyc', multer({ storage: multer.memoryStorage() }).fields(multipleUpload), async (req, res, next) => {
  try {
    const frontFile = req.files.front ? req.files.front[0] : null;
    const backFile = req.files.back ? req.files.back[0] : null;

    if (frontFile) {
      const frontPath = 'uploads/verification/front/' + Date.now() + '-' + frontFile.originalname;
      fs.writeFileSync(frontPath, frontFile.buffer);
      req.body.verificationPhotoFront = frontPath;
    }

    if (backFile) {
      const backPath = 'uploads/verification/back/' + Date.now() + '-' + backFile.originalname;
      fs.writeFileSync(backPath, backFile.buffer);
      req.body.verificationPhotoBack = backPath;
    }

    await updateUserKyc(req, res);
  } catch (err) {
    next(err);
  }
});
router.put('/user-kyc/approve', approveKyc);
router.put('/user-kyc/reject', rejectKyc);
router.get('/kyc-status/:userId', checkKycStatusByUserId);
router.get('/user-kyc', getUserKyc);
router.get('/user-kyc/:userId', getUserKyc);

module.exports = router;
