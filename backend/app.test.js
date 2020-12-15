// const app = require('./app');
import { createServer, request } from "http";
import fetch from "node-fetch";
import app from "./app.js";
// import mongoose from "mongoose";
// import { execPath } from 'process';
import { jest } from "@jest/globals";
// jest.useFakeTimers();
jest.setTimeout(10000);
import supertest from "supertest";
import mongoose from "mongoose";

import Book from "./api/models/book.js";
import Content from "./api/models/content.js";
import User from "./api/models/user.js";
import content from "./api/models/content.js";

describe("API tests", () => {
  let server;
  let request;
  let token;

  const bookExample = new Book({
    _id: new mongoose.Types.ObjectId(),
    isbn: "7439657423896743789",
    title: "MyTitle",
    author: "MyAuthor",
    year: "1945",
    editor: "MyEditor",
    description: "MyDescription",
    image: "MyDescription",
    questions: [
      {
        _id: "5fab1591d9fe8e536c4df799",
        quest: "Sample quest",
        answers: ["5fab1591d9fe8e536c4df415"],
      },
    ],
    validFor: [
      {
        _id: "5fab1591d9fe8e536c4df793",
        university: "University of Trento",
        course: "Software engineering 2",
      },
    ],
  });
  const contentExample = new Content({
    _id: new mongoose.Types.ObjectId(),
    creator: "5fab1591d9fe8e536c4df412",
    date: new Date(),
    name: "MyBestContent",
    url: "example.com",
    description: "DescriptionExample",
    image: "pathExample",
    questions: [
      {
        _id: "5fab1591d9fe8e536c4df798",
        quest: "Sample quest",
        answers: ["5fab1591d9fe8e536c4df414"],
      },
    ],
    validFor: [
      {
        _id: "5fab1591d9fe8e536c4df793",
        university: "University of Trento",
        course: "Software engineering 2",
      },
    ],
  });
  const contentExampleBis = {
    creator: "toberetrieved",
    date: 2020,
    name: "MyBestContentBis",
    url: "exampleBis.com",
    description: "DescriptionExampleBis",
    image: "pathExampleBis",
  };
  const userExample = {
    email: "email@example.com",
    username: "Username",
    firstName: "Name",
    lastName: "LastName",
    password: "test",
  };
  const userCredentials = {
    email: "email@example.com",
    password: "test",
  };
  const userExampleBis = {
    email: "emailBis@example.com",
    username: "UsernameBis",
    firstName: "NameBis",
    lastName: "LastNameBis",
    password: "testBis",
  };

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
    await request.post("/user/signup").send(userExample);
    let response = await request.post("/user/login").send(userCredentials);
    let body = JSON.parse(response.text);
    token = `Bearer ${body.token}`;
  });

  afterEach(async () => {
    // Remove all objects from the database
    await Book.deleteMany({});
    await Content.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async (done) => {
    await server.close(done);
    await mongoose.disconnect();
  });

  test("Root page", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(404);
  });

  test("Get books", async () => {
    const response = await request.get("/books");
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

  test("Get all books but there is actually 0", async () => {
    await Book.deleteOne({ _id: bookExample._id });
    const response = await request.get("/books");
    // Request body from string to object
    const body = JSON.parse(response.text);
    const { books } = body;
    expect(books).toHaveLength(0);
    expect(response.status).toBe(200);
  });

  test("Get contents", async () => {
    const response = await request.get("/contents");
    // Request body from string to object
    const body = JSON.parse(response.text);
    const { contents } = body;
    let contentExists = false;
    for (const content of contents) {
      if (content._id == contentExample._id) {
        contentExists = true;
      }
    }
    expect(contentExists).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Get all contents but there is actually 0", async () => {
    await Content.deleteOne({ _id: contentExample._id });
    const response = await request.get("/contents");
    // Request body from string to object
    const body = JSON.parse(response.text);
    const { contents } = body;
    expect(contents).toHaveLength(0);
    expect(response.status).toBe(200);
  });

  test("Get a content", async () => {
    const response = await request.get(`/contents/${contentExample._id}`);
    const body = JSON.parse(response.text);
    expect(body.content._id == contentExample._id).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Get a content but ID does not exist", async () => {
    const response = await request.get(`/contents/000000000000000000000000`);
    const body = JSON.parse(response.text);
    expect(body).toHaveProperty("message");
    expect(body.message == "No valid entry found for provided ID").toBeTruthy();
    expect(response.status).toBe(404);
  });

  test("Get a book", async () => {
    const response = await request.get(`/books/${bookExample._id}`);
    const body = JSON.parse(response.text);
    expect(body.book._id == bookExample._id).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Get a book but ID does not exist", async () => {
    const response = await request.get(`/books/000000000000000000000000`);
    const body = JSON.parse(response.text);
    expect(body).toHaveProperty("message");
    expect(body.message == "No valid entry found for provided ID").toBeTruthy();
    expect(response.status).toBe(404);
  });

  test("Search existing", async () => {
    const response = await request.get(`/search/all/${bookExample.title}`);
    const body = JSON.parse(response.text);
    // Check if there at least one element that has been found
    expect(body.books.length).not.toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Search not existing", async () => {
    const response = await request.get(`/search/all/thiselementdoesnotexist`);
    const body = JSON.parse(response.text);
    // Check if there are no elements found
    expect(body.books.length).toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Get a user", async () => {
    const user = await User.findOne({ email: userExample.email });
    const response = await request.get(`/user/${user._id}`);
    const body = JSON.parse(response.text);
    expect(body.user.username == userExample.username).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Get a user that doesn't exist", async () => {
    const response = await request.get(`/user/5fab1591d9fe8e536c4df412`);
    const body = JSON.parse(response.text);
    expect(body.user).toBe(null || undefined);
    expect(body).toHaveProperty("message");
    expect(body.message).toEqual("No valid entry found for provided ID");
    expect(response.status).toBe(404);
  });

  test("Get a user without providing a valid ID value", async () => {
    const response = await request.get(`/user/thisisnotauserid`);
    const body = JSON.parse(response.text);
    expect(body.user).toBe(null || undefined);
    expect(body).toHaveProperty("error");
    expect(response.status).toBe(500);
  });

  test("User login", async () => {
    const response = await request.post(`/user/login`).send({
      email: userExample.email,
      password: userExample.password,
    });
    const body = JSON.parse(response.text);
    expect(body.token).not.toBe(null || undefined);
    expect(body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("User login with wrong credentials", async () => {
    const response = await request.post(`/user/login`).send({
      email: "wrongmail",
      password: userExample.password,
    });
    const body = JSON.parse(response.text);
    expect(body.token).toBe(null || undefined);
    expect(body).toHaveProperty("message");
    expect(body.message).toEqual("Auth failed:no mail found");
    expect(response.status).toBe(403);
  });

  test("User login but password hash does not match", async () => {
    const response = await request.post(`/user/login`).send({
      email: userExample.email,
      password: "wrongpassword",
    });
    const body = JSON.parse(response.text);
    expect(body.token).toBe(null || undefined);
    expect(body).toHaveProperty("message");
    expect(body.message).toEqual("Auth failed");
    expect(response.status).toBe(401);
  });

  test("User signup", async () => {
    const response = await request.post(`/user/signup`).send(userExampleBis);
    const user = await User.findOne({ email: userExampleBis.email });
    console.log(user);
    expect(user.username == userExampleBis.username).toBeTruthy();
    expect(response.status).toBe(201);
  });

  test("User signup but mail already exists", async () => {
    const response = await request.post(`/user/signup`).send(userExample);
    const body = JSON.parse(response.text);
    expect(body).toHaveProperty("message");
    expect(body.message).toEqual("Mail exists");
    expect(response.status).toBe(409);
  });

  test("Delete a user", async () => {
    let header = {
      Authorization: token,
    };
    const user = await User.findOne({ email: userExample.email });
    const response = await request.delete(`/user/${user._id}`).set(header);
    const deletedUser = await User.findOne({ email: userExample.email });
    expect(deletedUser).not.toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Adding a review to a book", async () => {
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "comments",
        value: {
          quest: "Sample review",
        },
      },
    ];
    const response = await request
      .patch(`/books/add/${bookExample._id}`)
      .send(data)
      .set(header);
    const bookUpdated = await Book.findOne({ _id: bookExample._id });
    expect(bookUpdated.comments.length).not.toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Edit a user details", async () => {
    let header = {
      Authorization: token,
    };
    const data = [
      {
        propName: "studentCreds",
        value: {
          university: "Università di Trento",
          course: "Informatica",
          year: "3",
        },
      },
      {
        propName: "links",
        value: {
          website: "https://github.com/Pappol/UniBuk",
          contactEmail: "riccardo.parol@gmail.com",
          linkedin: "https://www.linkedin.com/in/riccardo-parola-37397b196/",
          gitHub: "https://github.com/Pappol",
        },
      },
      {
        propName: "profileImage",
        value: "https://thispersondoesnotexist.com/image",
      },
    ];
    const user = await User.findOne({ email: userExample.email });
    const response = await request
      .patch(`/user/${user._id}`)
      .send(data)
      .set(header);
    expect(response.status).toBe(200);
  });

  test("Adding a review to a content", async () => {
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "comments",
        value: {
          quest: "Sample review",
        },
      },
    ];
    const response = await request
      .patch(`/contents/add/${contentExample._id}`)
      .send(data)
      .set(header);
    const contentUpdated = await Content.findOne({ _id: contentExample._id });
    expect(contentUpdated.comments.length).not.toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Adding a review to a content", async () => {
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "comments",
        value: {
          quest: "Sample review",
        },
      },
    ];
    const response = await request
      .patch(`/contents/add/${contentExample._id}`)
      .send(data)
      .set(header);
    const contentUpdated = await Content.findOne({ _id: contentExample._id });
    expect(contentUpdated.comments.length).not.toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Adding a question to a book", async () => {
    const book = await Book.findOne({ _id: bookExample._id });
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "questions",
        value: {
          quest: "Sample question",
        },
      },
    ];
    const response = await request
      .patch(`/books/add/${bookExample._id}`)
      .send(data)
      .set(header);
    const bookUpdated = await Book.findOne({ _id: bookExample._id });
    expect(bookUpdated.questions.length).not.toEqual(book.questions.length);
    expect(response.status).toBe(200);
  });

  test("Adding a question to a content", async () => {
    const content = await Content.findOne({ _id: contentExample._id });
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "questions",
        value: {
          quest: "Sample question",
        },
      },
    ];
    const response = await request
      .patch(`/contents/add/${contentExample._id}`)
      .send(data)
      .set(header);
    const contentUpdated = await Content.findOne({ _id: contentExample._id });
    expect(contentUpdated.questions.length).not.toEqual(
      content.questions.length
    );
    expect(response.status).toBe(200);
  });

  test("Adding a question to a book", async () => {
    const book = await Book.findOne({ _id: bookExample._id });
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "questions",
        value: {
          quest: "Sample question",
        },
      },
    ];
    const response = await request
      .patch(`/books/add/${bookExample._id}`)
      .send(data)
      .set(header);
    const bookUpdated = await Book.findOne({ _id: bookExample._id });
    expect(bookUpdated.questions.length).not.toEqual(book.questions.length);
    expect(response.status).toBe(200);
  });

  test("Adding an answer to a question to a book", async () => {
    let header = {
      Authorization: token,
    };
    let data = {
      text: "Sample answer",
    };
    const response = await request
      .patch(
        `/books/${bookExample._id}/questions/${bookExample.questions[0]._id}`
      )
      .send(data)
      .set(header);
    const bookUpdated = await Book.findOne({ _id: bookExample._id });
    expect(bookUpdated.questions[0].answers.length).not.toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Adding an answer to a question to a content", async () => {
    let header = {
      Authorization: token,
    };
    let data = {
      text: "Sample answer",
    };
    const response = await request
      .patch(
        `/contents/${contentExample._id}/questions/${contentExample.questions[0]._id}`
      )
      .send(data)
      .set(header);
    const contentUpdated = await Content.findOne({ _id: contentExample._id });
    expect(contentUpdated.questions[0].answers.length).not.toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Insert an element in user follow", async () => {
    let user = await User.findOne({ email: userExample.email });
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "follow",
        value: "5fab1591d9fe8e536c4df412",
      },
    ];
    const response = await request
      .patch(`/user/add/${user._id}`)
      .send(data)
      .set(header);
    let userUpdated = await User.findOne({ email: userExample.email });
    expect(userUpdated.follow.length).not.toEqual(0);
    expect(response.status).toBe(200);
  });

  test("Insert an element in invalid user follow", async () => {
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "follow",
        value: "5fab1591d9fe8e536c4df412",
      },
    ];
    const response = await request
      .patch(`/user/add/invaliduserid`)
      .send(data)
      .set(header);
    const body = JSON.parse(response.text);
    expect(body).toHaveProperty("error");
    expect(response.status).toBe(500);
  });

  test("create a new content", async () => {
    let data = {
      _id: new mongoose.Types.ObjectId(),
      creator: "5fab1591d9fe8e536c4df412",
      date: 2020,
      name: "MySecondBestContent",
      url: "example.com",
      description: "DescriptionExample",
      image: "pathExample",
      questions: [
        {
          _id: "5fab1591d9fe8e536c4df798",
          quest: "Sample quest",
          answers: ["5fab1591d9fe8e536c4df414"],
        },
      ],
    };
    const response = await request.post("/contents").send(data);
    expect(response.status).toBe(201);
  });

  test("Don't create a new content", async () => {
    let data = {
      _id: new mongoose.Types.ObjectId(),
      creator: "5fab1591d9fe8e536c4df412",
      date: new Date(),
      name: "MyBestContent",
      url: "another.example.com",
      description: "another DescriptionExample",
      image: "another pathExample",
      questions: [
        {
          _id: "5fab1591d9fe8e536c4df798",
          quest: "another Sample quest",
          answers: ["5fab1591d9fe8e536c4df414"],
        },
      ],
    };
    const response = await request.post("/contents").send(data);
    expect(response.status).toBe(409);
  });

  test("create a content with a missing field", async () => {
    let data = {
      _id: new mongoose.Types.ObjectId(),
      creator: "5fab1591d9fe8e536c4df412",
      name: "MyBestContent",
      url: "another.example.com",
      description: "another DescriptionExample",
      image: "another pathExample",
      questions: [
        {
          _id: "5fab1591d9fe8e536c4df798",
          quest: "another Sample quest",
          answers: ["5fab1591d9fe8e536c4df414"],
        },
      ],
    };
    const response = await request.post("/contents").send(data);
    expect(response.status).toBe(500);
  });

  test("edit a content", async () => {
    let data = [
      {
        propName: "name",
        value: "MyBestContent edited",
      },
    ];
    let header = {
      Authorization: token,
    };
    const response = await request
      .patch(`/contents/${contentExample._id}`)
      .send(data)
      .set(header);
    let contentUpdated = await Content.findOne({
      name: "MyBestContent edited",
    });
    expect(contentUpdated.name).not.toEqual(contentExample.name);
    expect(response.status).toBe(200);
  });

  test("edit user favourites", async () => {
    let user = await User.findOne({ email: userExample.email });
    let header = {
      Authorization: token,
    };

    let newFavourites = [contentExample._id];
    let data = [
      {
        propName: "favourites",
        value: newFavourites,
      },
    ];
    const response = await request
      .patch(`/user/${user._id}`)
      .send(data)
      .set(header);
    let userUpdatedone = await User.findOne({ email: userExample.email });
    expect(userUpdatedone.favourites.length).not.toEqual(0);
    expect(response.status).toBe(200);

    newFavourites = [bookExample._id];
    data = [
      {
        propName: "favourites",
        value: newFavourites,
      },
    ];
    const responsedue = await request
      .patch(`/user/${user._id}`)
      .send(data)
      .set(header);
    let userUpdatedtwo = await User.findOne({ email: userExample.email });
    expect(userUpdatedtwo.favourites.length).not.toEqual(0);
    expect(responsedue.status).toBe(200);

    expect(userUpdatedone).not.toEqual(userUpdatedtwo);
  });

  test("Search content by university", async () => {
    const response = await request.get(
      `/search/university/contents/${encodeURI(
        contentExample.validFor[0].university
      )}`
    );
    // Request body from string to object
    const body = JSON.parse(response.text);
    const { contents } = body;
    expect(contents).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Search content by university with kind not existing", async () => {
    const response = await request.get(
      `/search/university/THISKINDDOESNOTEXIST/${encodeURI(
        contentExample.validFor[0].university
      )}`
    );
    // Request body from string to object
    const body = JSON.parse(response.text);
    const { contents } = body;
    expect(contents).not.toBeTruthy();
    expect(response.status).toBe(404);
  });

  test("Search content by university with university not existing", async () => {
    const response = await request.get(
      `/search/university/contents/THISUNIVERSITYDOESNOTEXIST`
    );
    // Request body from string to object
    const body = JSON.parse(response.text);
    const { contents } = body;
    expect(contents).toHaveLength(0);
    expect(response.status).toBe(200);
  });

  test("Search contents related to the user", async () => {
    const response = await request.get(
      `/user/${contentExample.creator}/contents`
    );
    // Request body from string to object
    const body = await JSON.parse(response.text);
    const { resources } = body;
    // Test if array has at least 1 resource
    expect(resources).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Search contents on a user that does not have related contents", async () => {
    const response = await request.get(
      `/user/000000000000000000000000/contents`
    );
    // Request body from string to object
    const body = await JSON.parse(response.text);
    const { resources } = body;
    expect(resources).toHaveLength(0);
    // Test if array has at least 1 resource
    expect(response.status).toBe(200);
  });

  test("Increment view count", async () => {
    const content = await Content.findOne({ _id: contentExample._id });
    const response = await request.post(
      `/contents/${contentExample._id}/addView`
    );
    const contentUpdated = await Content.findOne({ _id: contentExample._id });
    expect(content.views == contentUpdated.views).not.toBeTruthy();
    expect(response.status).toBe(200);
  });

  test("Increment view count for not existing content", async () => {
    const response = await request.post(`/contents/notexisting/addView`);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(500);
  });

  test("Create a new content", async () => {
    let header = {
      Authorization: token,
    };
    const user = await User.findOne({ email: userExample.email });
    const response = await request
      .post(`/contents`)
      .send({
        creator: user._id,
        date: 2020,
        name: "MyBestContentBis",
        url: "exampleBis.com",
        description: "DescriptionExampleBis",
        image: "pathExampleBis",
      })
      .set(header);
    // const newContent = await Content.findOne({ name: "MyBestContentBis" });
    // console.log(newContent);
    // console.log(user._id);
    // expect(user._id == newContent.creator).toBeTruthy();
    expect(response.status).toBe(201);
  });

  test("Create a duplicated content", async () => {
    let header = {
      Authorization: token,
    };
    const creator = await User.findOne({ email: userExample.email });
    // first create
    await request
      .post(`/contents`)
      .send({
        creator: creator._id,
        date: 2020,
        name: "MyBestContentBis",
        url: "exampleBis.com",
        description: "DescriptionExampleBis",
        image: "pathExampleBis",
      })
      .set(header);
    // duplicate save
    const response = await request
      .post(`/contents`)
      .send({
        creator: creator._id,
        date: 2020,
        name: "MyBestContentBis",
        url: "exampleBis.com",
        description: "DescriptionExampleBis",
        image: "pathExampleBis",
      })
      .set(header);
    const body = JSON.parse(response.text);
    expect(body).toHaveProperty("message");
    expect(body.message).toEqual("Content with that name already exists");
    expect(response.status).toBe(409);
  });

  test("Adding a comment for not existing content", async () => {
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "comments",
        value: {
          quest: "Sample review",
        },
      },
    ];
    const response = await request
      .patch(`/contents/add/notexisting`)
      .send(data)
      .set(header);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(500);
  });

  test("Adding a review to a non existing book", async () => {
    let header = {
      Authorization: token,
    };
    let data = [
      {
        propName: "comments",
        value: {
          quest: "Sample review",
        },
      },
    ];
    const response = await request
      .patch(`/books/add/notexisting`)
      .send(data)
      .set(header);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(500);
  });

  test("Adding an answer to a question to a content that doesn't exist", async () => {
    let header = {
      Authorization: token,
    };
    let data = {
      text: "Sample answer",
    };
    const response = await request
      .patch(
        `/contents/notexisting/questions/${contentExample.questions[0]._id}`
      )
      .send(data)
      .set(header);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(500);
  });
});
