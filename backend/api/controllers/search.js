import Content from "../models/content.js";
import Book from "../models/book.js";
import User from "../models/user.js";

export const queryAll = async (req, res) => {
  const { query } = req.params;
  let contents, books, users;
  try {
    contents = await Content.find(
      { $or: [
        { "name": { "$regex": query } },
        { "url": { "$regex": query } },
        { "description": { "$regex": query } },
        { "image": { "$regex": query } },
      ]});
    books = await Book.find(
      { $or: [
        { "isbn": { "$regex": query } },
        { "title": { "$regex": query } },
        { "author": { "$regex": query } },
        { "editor": { "$regex": query } },
        { "description": { "$regex": query } },
        { "image": { "$regex": query } },
      ]});
    users = await User.find(
      { $or: [
        { "email": { "$regex": query } },
        { "username": { "$regex": query } },
        { "firstName": { "$regex": query } },
        { "lastName": { "$regex": query } },
      ]});
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

export const queryUniversity = async (req, res) => {
  const { university, kind } = req.params;
  console.log("UNIVERSITY", university, kind);
  if(kind === "books") {
    Book.find({validFor: {}})
  }
}