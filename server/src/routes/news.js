const { Router } = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, 'uploads/newsPDF/');
    } else {
      cb(null, 'uploads/newsImage/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });
const router = Router();

const { addNews, getAllNews, deleteNewsById, getNewsDetailsById } = require('../controllers/news');

router.post('/news', upload.fields([{ name: 'newsImage', maxCount: 1 }, { name: 'newsPDF', maxCount: 1 }]), addNews);
router.get('/news', getAllNews);
router.delete('/news/:id', deleteNewsById);
router.get('/news/:id', getNewsDetailsById);

module.exports = router;
