const { Router } = require('express'); 
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/newsImage/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = Router(); 

const {addNews } = require('../controllers/news');

router.post('/news', addNews)

router.post('/news',upload.single('newsImage'),  addNews)
  
  module.exports = router



  