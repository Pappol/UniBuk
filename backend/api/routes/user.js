import express from "express";
import { users_get_user, user_signup, user_login, user_update, user_delete, user_add, user_get_contents } from '../controllers/user.js';
import checkAuth from '../middlewares/check-auth.js';

const router = express.Router();

router.get('/:userId', users_get_user);
router.get('/:userId/contents', user_get_contents);
router.post('/signup', user_signup);
router.post('/login', user_login);
router.patch('/:userId', checkAuth, user_update);
router.patch('/add/:userId', checkAuth, user_add);
router.delete('/:userId', checkAuth, user_delete);

export default router;