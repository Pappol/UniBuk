const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/contents');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // this way i can reject files which are neither jpeg nor png
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png') {

        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const ContentsController = require('../controllers/contents');
 
router.get('/', ContentsController.contents_get_all);
router.get('/:contentId', ContentsController.contents_get_content);
router.patch('/:contentId/reviews', checkAuth, ContentsController.contents_add_review);

module.exports = router;