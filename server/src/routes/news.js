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

const {addNews, getAllNews, deleteNewsById, getNewsDetailsById } = require('../controllers/news');

router.post('/news',upload.single('newsImage'),  addNews)

router.get('/news', getAllNews)

router.delete('/news/:id', deleteNewsById)

router.get('/news/:id', getNewsDetailsById)

    
  module.exports = router



  