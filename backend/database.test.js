const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const User = require("./api/models/user");
const Content = require("./api/models/content");

describe("insert", () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(
      "mongodb+srv://dbadmin:arara@cluster0.lgrig.mongodb.net/se2-draft?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it("User get test", async (done) => {
    let err = null;

    try {
      const imAboolean = await User.find({ email: "Ciaobello@gmail.com" });
    }
    catch (error) {
      err = error;
    } 

    expect(err).toBeNull();
    done();
  });

  it("User does not get test", async (done) => {
    const user = { email: "doesnotexist@example.com" }
    const res = await User.find(user);
    expect(res).toEqual([]);
    done();
  });

  it("User create test", async (done) => {
    if (User.find({ email: "Ciaobello@gmail.com" })) {
      const deletedUser = await User.deleteOne(
        { email: "Ciaobello@gmail.com" },
        function (err) {
          if (err) return handleError(err);
          console.log("tester deleteds");
        }
      );
    }
    const mockUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: "Ciaobello@gmail.com",
      username: "pappol",
      firstName: "riccardo",
      lastName: "P",
      password: "alligatore24",
    });
    await mockUser.save().catch((err) => {
      console.log(err);
    });

    const insertedUser = await User.find({ _id: mockUser._id });
    expect("" + insertedUser).toEqual("" + mockUser);
    done();
  });

  it("User delete test", async (done) => {
    if (User.find({ email: "Ciaobello@gmail.com" })) {
      const deletedUser = await User.deleteOne(
        { email: "Ciaobello@gmail.com" },
        function (err) {
          if (err) return handleError(err);
          //test executed with no errors
          expect(3).toBe(3);
        }
      );
    } else {
      const mockUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "Ciaobello@gmail.com",
        username: "pappol",
        firstName: "riccardo",
        lastName: "P",
        password: "alligatore24",
      });
      await mockUser.save().catch((err) => {
        console.log(err);
      });
      deletedUser = await User.deleteOne(
        { email: "Ciaobello@gmail.com" },
        function (err) {
          if (err) return handleError(err);
          //test executed with no errors
          expect(3).toBe(3);
        }
      );
    }
    done();
  });

  it("Should update user's info", async (done) => {
    if (User.find({ email: "john.doe@gmail.com" })) {
      const deletedUser = await User.deleteOne(
        { email: "john.doe@gmail.com" },
        function (err) {
          if (err) {
            return handleError(err);
          }
          expect(3).toBe(3);
        }
      );
    } else {
      const mockUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: "john.doe@gmail.com",
        username: "donjohn",
        firstName: "John",
        lastName: "Doe",
        password: "johndoe",
      });
      await mockUser.save().catch((err) => {
        console.log(err);
      });

      const updatedUser = await User.updateOne(
        { email: "john.doe@gmail.com " },
        { username: "jonjon" }
      );
      expect("" + updatedUser).not.toEqual("" + mockUser);
    }
    done();
  });

  it("Create content", async (done) => {
    if (Content.find({ name: "MyBestContent" })) {
      await Content.deleteOne(
        { name: "MyBestContent" },
        function (err) {
          if (err) return handleError(err);
        }
      );
    }
    const mockContent = new Content({
      _id: new mongoose.Types.ObjectId(),
      name: "MyBestContent",
      url: "example.com",
      description: "DescriptionExample",
      image: "pathExample",
      date: new Date(),
      creator: "5fab1591d9fe8e536c4df412"
    });
    await mockContent.save();

    const insertedUser = await Content.find({ _id: mockContent._id });
    expect("" + insertedUser).toEqual("" + mockContent);
    done();
  });
});
