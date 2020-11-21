const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middlewares/check-auth');

router.get('/:userId', UserController.users_get_user);
router.post('/signup', UserController.user_signup);
router.post('/login', UserController.user_login);
// router.patch('/:userId', UserController.user_update);
router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;