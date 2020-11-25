// const app = require('./app');
const http = require('http');
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const server = require('./server');

describe('App tests', () => {
  // let server;
  const PORT = process.env.PORT || 8080;

  // beforeAll(() => {

  // });

  // afterAll(async () => {
  //   await server.close();
  // });

  beforeAll(async () => {
    // connection = await mongoose.connect(
    //   "mongodb+srv://dbadmin:arara@cluster0.lgrig.mongodb.net/se2-draft?retryWrites=true&w=majority",
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //   }
    // );
    // const app = createServer();
    // server.listen(PORT);
  });

  afterAll(async () => {
    // await connection.close();
  });

  it('works with post', async () => {
    const url = `http://localhost:${PORT}/books`;
    const response = await fetch(url, { method: 'POST', body: 'a=1' })
    // const response = await fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     _id: new mongoose.Types.ObjectId(),
    //     email: 'ally@gmail.com',
    //     username: 'pappol',
    //     firstName: 'riccardo',
    //     lastName: 'P',
    //     password: 'alligatore24'
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // });
    // console.log("AFTER FETCH")
    // const json = await response.json()
    // console.log("JSON", json)
    // console.log("response", response)
    // expect(response.status).toEqual(404)
  });
});
