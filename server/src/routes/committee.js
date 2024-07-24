const { Router } = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/committeeImage/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });
const router = Router();

const { addCommittee, getAllCommittee, deleteCommitteeById, getCommitteeDetailsById } = require('../controllers/committee');

router.post('/committee', upload.single('committeeImage'), addCommittee);
router.get('/committee', getAllCommittee);
router.delete('/committee/:id', deleteCommitteeById);
router.get('/committee/:id', getCommitteeDetailsById);

module.exports = router;
