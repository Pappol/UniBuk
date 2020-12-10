const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/books');
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

const BooksController = require('../controllers/books');
 
router.get('/', BooksController.books_get_all);
router.get('/:bookId', BooksController.books_get_book);
router.patch('/:bookId', checkAuth, BooksController.books_update_book);
router.patch('/:bookId/questions/:questionId/', checkAuth, BooksController.books_add_answer);

module.exports = router;