const { Router } = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/esdrImage/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });
const router = Router();

const { addEsdr, getAllEsdr, deleteEsdrById, getEsdrDetailsById } = require('../controllers/esdr');

router.post('/esdr', upload.single('esdrImage'), addEsdr);
router.get('/esdr', getAllEsdr);
router.delete('/esdr/:id', deleteEsdrById);
router.get('/esdr/:id', getEsdrDetailsById);

module.exports = router;
