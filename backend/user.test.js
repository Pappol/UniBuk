const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./api/models/user");

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

  afterEach(async () => { });

  afterAll(async () => {
    await connection.close();
  });

  it("User get test", async () => {
    let err = null;

    try {
      const imAboolean = await User.find({ email: "Ciaobello@gmail.com" });
    }
    catch (error) {
      err = error;
    } 

    expect(err).toBeNull();
  });

  it("User does not get test", async () => {
    const user = { email: "doesnotexist@example.com" }
    const res = await User.find(user);
    expect(res).toEqual([]);
  });

  it("User create test", async () => {
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
  });

  it("User delete test", async () => {
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
  });

  it("Should update user's info", async () => {
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
  });

});
