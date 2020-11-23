const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./api/models/user");

describe('insert', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await mongoose.connect(
        "mongodb+srv://dbadmin:" +
          process.env.MONGO_ATLAS_PW +
          "@cluster0.lgrig.mongodb.net/" +
          process.env.MONGO_ATLAS_NAME +
          "?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
      );
      mongoose.Promise = global.Promise;
      db = await connection.once('open', function() {
        console.log('connected db');
      });
    });
  
    afterAll(async () => {
      await connection.close();
      await db.close();
    });
  
    it('User create test', async () => {  
      const mockUser = new User( {_id:new mongoose.Types.ObjectId(),
                        email: 'Ciaobello@gmail.com', 
                        username: 'pappol',
                        firstName: 'riccardo',
                        lastName: 'P',
                        password: 'alligatore24'
                        });
      await mockUser.save()
                    .catch((err) => {
                        console.log(err);
                    });
  
      const insertedUser = await User.find({_id: mockUser._id});
      expect(insertedUser).toEqual(mockUser);
    });
  });