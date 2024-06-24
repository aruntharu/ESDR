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

const {addNews, getAllNews } = require('../controllers/news');

router.post('/news',upload.single('newsImage'),  addNews)

router.post('/newsImage',upload.single('newsImage'),  addNews)

router.get('/news', getAllNews)


  
  module.exports = router



  