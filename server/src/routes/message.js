const { Router } = require('express'); 
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/messageImage/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = Router(); 

const {addMessage, getAllMessage, deleteMessageById, getMessageDetailsById } = require('../controllers/message');

router.post('/message',upload.single('messageImage'), addMessage)

router.get('/message', getAllMessage)

router.delete('/message/:id', deleteMessageById)

router.get('/message/:id', getMessageDetailsById)

    
  module.exports = router



  