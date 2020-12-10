// const app = require('./app');
import { createServer, request } from 'http';
import fetch from "node-fetch";
import app from './app.js';
// import mongoose from "mongoose";
// import { execPath } from 'process';
import { jest } from '@jest/globals'
// jest.useFakeTimers();
jest.setTimeout(10000);
import supertest from 'supertest';
import mongoose from 'mongoose';

import Book from './api/models/book.js';
import Content from './api/models/content.js';
import User from './api/models/user.js';

describe('API tests', () => {
  let server;
  let request;

  const bookExample = new Book({
    _id: new mongoose.Types.ObjectId(),
    isbn: "7439657423896743789",
    title: "MyTitle",
    author: "MyAuthor",
    year: "1945",
    editor: "MyEditor",
    description: "MyDescription",
    image: "MyDescription"
  });
  const contentExample = new Content({
    _id: new mongoose.Types.ObjectId(),
    creator: "5fab1591d9fe8e536c4df412",
    date: new Date(),
    name: "MyBestContent",
    url: "example.com",
    description: "DescriptionExample",
    image: "pathExample",
  });
  const userExample = new User({
    _id: new mongoose.Types.ObjectId(),
    email: "email@example.com",
    username: "Username",
    firstName: "Name",
    lastName: "LastName",
    password: "Password",
  });

  beforeAll(async (done) => {
    server = createServer(app);
    server.listen(done);
    request = supertest(server);

    // Remove all objects from the database
    await Book.deleteMany({});
    await Content.deleteMany({});
    await User.deleteMany({});
  });

  beforeEach(async () => {
    // Insert each object in the database
    await Book.insertMany(bookExample);
    await Content.insertMany(contentExample);
    await User.findOneAndUpdate(userExample);
  });

  afterEach(async () => {
    // // Remove objects from the database
    // await Book.deleteOne({ _id: bookExample._id });
    // await Content.deleteOne({ _id: contentExample._id });
    // await User.deleteOne({ _id: userExample._id });

    // Remove all objects from the database
    await Book.deleteMany({});
    await Content.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async (done) => {
    await server.close(done);
    await mongoose.disconnect();
  });

  test('Root page', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(404);
  });

  test('Get books', async () => {
    const response = await request.get('/books');
    // Request body from string to object
    const body = JSON.parse(response.text);
    const { books } = body;
    let bookExists = false;
    for (const book of books) {
      if (book._id == bookExample._id) {
        bookExists = true;
      }
    }
    expect(bookExists).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test('Search existing', async () => {
    const response = await request.get(`/search/${bookExample.title}`);
    const body = JSON.parse(response.text);
    // Check if there at least one element that has been found
    expect(body.books.length).not.toEqual(0);
    expect(response.status).toBe(200);
  })

  test('Search not existing', async () => {
    const response = await request.get(`/search/thiselementdoesnotexist`);
    const body = JSON.parse(response.text);
    // Check if there are no elements found
    expect(body.books.length).toEqual(0);
    expect(response.status).toBe(200);
  })
});
