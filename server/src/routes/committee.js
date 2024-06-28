const { Router } = require('express'); 
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/personImage/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = Router(); 

const {addCommittee} = require('../controllers/committee.js');

router.post('/committee',upload.single('newsImage'),  addCommittee)

router.get('/committee', getAllcommittee)

router.delete('/committee/:id', deleteCommitteeById)

    
  module.exports = router



  