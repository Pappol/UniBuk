import mongoose from "mongoose";
const jwt = require("jsonwebtoken");
import User from './api/models/user.js';
import Content from './api/models/content';
import Axios from 'axios';
const Content = require("./api/models/content");

describe("Mongoose tests", () => {
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
    } catch (error) {
      err = error;
    }

    expect(err).toBeNull();
    done();
  });

  it("User does not get test", async (done) => {
    const user = { email: "doesnotexist@example.com" };
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
      //console.log(err);
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
        //console.log(err);
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
        //console.log(err);
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
      await Content.deleteOne({ name: "MyBestContent" }, function (err) {
        if (err) return handleError(err);
      });
    }
    const mockContent = new Content({
      _id: new mongoose.Types.ObjectId(),
      name: "MyBestContent",
      url: "example.com",
      description: "DescriptionExample",
      image: "pathExample",
      date: new Date(),
      creator: "5fab1591d9fe8e536c4df412",
    });
    await mockContent.save();

    const insertedUser = await Content.find({ _id: mockContent._id });
    expect("" + insertedUser).toEqual("" + mockContent);
    done();
  });

//   it("Should create a content with axios", async () => {
//     let resMessage = "";

//     if (
//       Content.find({
//         name: "MyBestContent",
//         creator: "5fab1591d9fe8e536c4df412",
//       })
//     ) {
//       const deleteContent = await Content.deleteOne({
//         name: "MyBestContent",
//         creator: "5fab1591d9fe8e536c4df412",
//       });

//       const content = {
//         _id: new mongoose.Types.ObjectId(),
//         name: "MyBestContent",
//         url: "example.com",
//         description: "DescriptionExample",
//         image: "pathExample",
//         date: 2020,
//         creator: "5fab1591d9fe8e536c4df412",
//       };

//       await Axios.post("http://localhost:8080/contents", content)
//         .then((res) => {
//           //console.log(res);
//           resMessage = res.data.message;
//         })
//         .catch((err) => {
//           resMessage = err.message;
//         });

//       expect("" + resMessage).toEqual("Content created");
//     } else {
//       const content = {
//         _id: new mongoose.Types.ObjectId(),
//         name: "MyBestContent",
//         url: "example.com",
//         description: "DescriptionExample",
//         image: "pathExample",
//         date: 2020,
//         creator: "5fab1591d9fe8e536c4df412",
//       };

//       await Axios.post("http://localhost:8080/contents", content)
//         .then((res) => {
//           resMessage = res.data.message;
//         })
//         .catch((err) => {
//           resMessage = err.message;
//         });

//       expect("" + resMessage).toEqual("Content created");
//     }
//   });

//   it("Sould not create duplicate content", async () => {
//     if (
//       Content.find({
//         name: "MyBestContent",
//         creator: "5fab1591d9fe8e536c4df412",
//       })
//     ) {
//       let resMessage = "";

//       const duplicateContent = {
//         name: "MyBestContent",
//         url: "example.com new",
//         description: "DescriptionExample new",
//         image: "pathExample new",
//         date: 2020,
//         creator: "5fab1591d9fe8e536c4df412",
//       };

//       await Axios.post("http://localhost:8080/contents", duplicateContent)
//         .then((res) => {
//           resMessage = res.data.message;
//         })
//         .catch((err) => {
//           resMessage = err.message;
//         });

//       expect("" + resMessage).toEqual("Request failed with status code 409");
//     } else {
//       let resMessage = "";

//       const mockContent = new Content({
//         _id: new mongoose.Types.ObjectId(),
//         name: "MyBestContent",
//         url: "example.com",
//         description: "DescriptionExample",
//         image: "pathExample",
//         date: 2020,
//         creator: "5fab1591d9fe8e536c4df412",
//       });
//       await mockContent.save();

//       const duplicateContent = {
//         name: "MyBestContent",
//         url: "example.com new",
//         description: "DescriptionExample new",
//         image: "pathExample new",
//         date: new Date(),
//         creator: "5fab1591d9fe8e536c4df412",
//       };

//       await Axios.post("http://localhost:8080/contents", duplicateContent)
//         .then((res) => {
//           resMessage = res.data.message;
//         })
//         .catch((err) => {
//           resMessage = err.message;
//         });

//       expect("" + resMessage).toEqual("Request failed with status code 409");
//     }
//   });

//   it("Should edit content", async () => {
//     if (Content.find({ name: "MyBestContent" })) {
//       const findContent = await Content.find({ name: "MyBestContent" });
//       const updatedContent = await Content.updateOne({
//         name: findContent.name + "new",
//       });

//       expect("" + updatedContent).not.toEqual("" + findContent);
//     } else {
//       const mockContent = new Content({
//         _id: new mongoose.Types.ObjectId(),
//         name: "MyBestContent",
//         url: "example.com",
//         description: "DescriptionExample",
//         image: "pathExample",
//         date: new Date(),
//         creator: "5fab1591d9fe8e536c4df412",
//       });
//       await mockContent.save();

//       const updatedContent = await Content.updateOne({
//         name: findContent.name + "new",
//       });

//       expect("" + updatedContent).not.toEqual("" + mockContent);
//     }
//   });

//   it("Should edit a content with axios", async () => {
//     let resMessage = "";
//     let idToEdit = "";
//     if (Content.find({ name: "MyBestContent" })) {
//       await Content.find({ name: "MyBestContent" })
//         .then((content) => {
//           idToEdit = content[0]._id;
//           //console.log(content);
//         })
//         .then(async () => {
//           //console.log('Questo dovrebbe essere l\'id '+idToEdit);
//           const data = [
//             {
//               propName: "date",
//               value: 1700,
//             },
//           ];
//           await Axios.patch("http://localhost:8080/contents/" + idToEdit, data)
//             .then((res) => {
//               resMessage = res.data.message;
//             })
//             .catch((err) => {
//               resMessage = err.message;
//             });
//         });
//       expect(resMessage).toEqual("content updated");
//     } else {
//       const idd = new mongoose.Types.ObjectId();
//       const content = {
//         _id: idd,
//         name: "MyBestContent",
//         url: "example.com",
//         description: "DescriptionExample",
//         image: "pathExample",
//         date: 2020,
//         creator: "5fab1591d9fe8e536c4df412",
//       };

//       await Axios.post("http://localhost:8080/contents", content);

//       const data = [
//         {
//           propName: "date",
//           value: 1700,
//         },
//       ];
//       await Axios.patch("http://localhost:8080/contents" + idd, data)
//         .then((res) => {
//           resMessage = res.data.message;
//         })
//         .catch((err) => {
//           resMessage = err.message;
//         });

//       expect(resMessage).toEqual("content updated");
//     }
//   });
//   it("should add a review to a content", async () => {
//     const mockContent = new Content({
//       _id: new mongoose.Types.ObjectId(),
//       name: "MyBestContent",
//       url: "example.com",
//       description: "DescriptionExample",
//       image: "pathExample",
//       date: new Date(),
//       creator: "5fab1591d9fe8e536c4df412",
//     });
//     await mockContent.save();
//     const review = [
//       {
//         propName: "comments",
//         value: {
//           author: "5fbe79324c63a6000fa72651",
//           rank: 4,
//           text: "sampleReview",
//         },
//       },
//     ];
//     await Content.updateOne(
//       {
//         _id: mockContent._id,
//       },
//       {
//         $push: review,
//       }
//     );
//     const updatedContent = await Content.find({ _id: mockContent._id });
//     expect("" + updatedContent.comments).not.toBe(null);
//     await Content.deleteOne({ _id: updatedContent._id }, (err) => {
//       if (err) {
//         return handleError(err);
//       }
//     });
//   });
});
