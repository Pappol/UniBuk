const mongoose = require("mongoose");

const Book = require("../models/book");

exports.books_get_all = (req, res, next) => {
  Book.find()
    .select("isbn title author _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        books: docs.map((doc) => {
          return {
            isbn: doc.isbn,
            title: doc.title,
            author: doc.author,
            year: doc.year,
            editor: doc.editor,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/books/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.books_get_book = (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
		.select("isbn title author _id validFor")
    .exec()
    .then((doc) => {
      console.log("Gathered from database", doc);
      if (doc) {
        res.status(200).json({
          book: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/books/",
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
