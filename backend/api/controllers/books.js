import mongoose from 'mongoose';
import Book from '../models/book.js';

export const books_get_all = (req, res, next) => {
  Book.find()
    // .select("isbn title author description _id")
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
            description: doc.description,
            image: doc.image,
            validFor: doc.validFor,
            tags: doc.tags,
            comments: doc.comments,
            _id: doc._id
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

export const books_get_book = (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
		// .select("isbn title author description _id validFor")
    .exec()
    .then((doc) => {
      console.log("Gathered from database", doc);
      if (doc) {
        res.status(200).json({
          book: doc
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
