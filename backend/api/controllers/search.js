import Content from "../models/content.js";
import Book from "../models/book.js";
import User from "../models/user.js";

export const queryAll = async (req, res) => {
  const { query } = req.params;
  let contents, books, users;
  try {
    contents = await Content.find({ "name": { "$regex": query } });
    books = await Book.find({ "title": { "$regex": query } });
    users = await User.find({ "firstName": { "$regex": query } });
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
  res.status(200).json({
    contents: contents,
    books: books,
    users: users
  });
}