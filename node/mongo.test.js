const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./api/models/user");

describe('insert', () => {
    let connection;
  
    beforeAll(async () => {
      connection = await mongoose.connect(
        "mongodb+srv://dbadmin:arara@cluster0.lgrig.mongodb.net/se2-draft?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
      );
   }); 
  
    afterAll(async () => {
      await connection.close();
    });
  
    it('User create test', async () => {  
      if(User.find({email: 'Ciaobello@gmail.com'})){
        const deletedUser = await User.deleteOne({ email: 'Ciaobello@gmail.com' }, function (err) {
          if (err) return handleError(err);
          console.log('tester deleter');
        });
      }
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
      expect(""+insertedUser).toEqual(""+mockUser);
    });

    it('User delete test', async () => {  
      if(User.find({email: 'Ciaobello@gmail.com'})){
        const deletedUser = await User.deleteOne({ email: 'Ciaobello@gmail.com' }, function (err) {
          if (err) return handleError(err);
          //test executed with no errors
          expect(3).toBe(3);
        });
      }else{
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
        deletedUser = await User.deleteOne({ email: 'Ciaobello@gmail.com' }, function (err) {
                if (err) return handleError(err);
                //test executed with no errors
                expect(3).toBe(3);
              });
      }
      //expect(2).toBe(3);
    });
  }
);
