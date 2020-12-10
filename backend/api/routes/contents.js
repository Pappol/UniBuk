import express from "express";
const router = express.Router();
import checkAuth from '../middlewares/check-auth.js';
import multer, { diskStorage } from 'multer';

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/contents');
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

import { contents_get_all, contents_get_content, create_content, edit_content, contents_update_content, contents_add_answer } from '../controllers/contents.js';

router.get('/', contents_get_all);
router.get('/:contentId', contents_get_content);
router.post('/', create_content);
router.patch('/:contentId', edit_content);
router.patch('/add/:contentId/', checkAuth, contents_update_content);
router.patch('/:contentId/questions/:questionId/', checkAuth, contents_add_answer);

export default router;