const express = require("express");
const router = express.Router();

const ContentsController = require('../controllers/contents');
 
router.get('/', ContentsController.contents_get_all);
router.get('/:contentId', ContentsController.contents_get_content);

module.exports = router;