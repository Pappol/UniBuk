import Content from "../models/content.js";
import Book from "../models/book.js";
import User from "../models/user.js";

export const queryAll = async (req, res) => {
  const { query } = req.params;
  let contents, books, users;
  try {
    contents = await Content.find({
      $or: [
        { name: { $regex: query } },
        { url: { $regex: query } },
        { description: { $regex: query } },
        { image: { $regex: query } },
      ],
    });
    books = await Book.find({
      $or: [
        { isbn: { $regex: query } },
        { title: { $regex: query } },
        { author: { $regex: query } },
        { editor: { $regex: query } },
        { description: { $regex: query } },
        { image: { $regex: query } },
      ],
    });
    users = await User.find({
      $or: [
        { email: { $regex: query } },
        { username: { $regex: query } },
        { firstName: { $regex: query } },
        { lastName: { $regex: query } },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
  res.status(200).json({
    contents: contents,
    books: books,
    users: users,
  });
};

export const queryUniversity = async (req, res) => {
  const { university, kind } = req.params;
  
  let contents;
  if (kind === "books") {
    contents = await Book.find({});
  } else if (kind === "contents") {
    contents = await Content.find({});
  } else {
    return res.status(404).json({ error: "Kind not found" });
  }
  const newContents = []
  for (const content of contents) {
    for (const validFor of content.validFor) {
      if (validFor.university === university) {
        console.log("SAME")
        newContents.push(content)
      } else {
        console.log("DIFF");
      }
    }
  }

  return res.status(200).json({ contents: newContents });
};
