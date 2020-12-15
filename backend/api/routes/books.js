import express from "express";
const router = express.Router();
import checkAuth from '../middlewares/check-auth.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/books');
    },
    filename: function (req, file, cb) {
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

import { books_get_all, books_get_book, books_update_book, books_add_answer } from '../controllers/books.js';

router.get('/', books_get_all);
router.get('/:bookId', books_get_book);
router.patch('/:bookId/review', checkAuth, books_update_book);
router.patch('/:bookId/questions/:questionId/', checkAuth, books_add_answer);

export default router;