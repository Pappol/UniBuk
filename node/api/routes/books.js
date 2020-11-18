const express = require("express");
const router = express.Router();

const BooksController = require('../controllers/books');
 
router.get('/', BooksController.books_get_all);
router.get('/:bookId', BooksController.books_get_book);

module.exports = router;