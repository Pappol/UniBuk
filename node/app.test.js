const app = require('./app');
const http = require('http');
const fetch = require("node-fetch");
const mongoose = require("mongoose");

const url = "http://127.0.0.1:8080/user/signup";

describe('api.test', () => {
    let server;
    const PORT = process.env.PORT || 8080;
    const HOST = 'localhost';

    beforeAll(async () => {
        
        server = http.createServer(app);
        server.listen(PORT);
      }); 
    
      afterAll(async () => {
        await server.close();
      });

    it('works with post', async () => {
        //expect.assertions(1)
        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({_id:new mongoose.Types.ObjectId(),
                                email: 'ally@gmail.com', 
                                 username: 'pappol',
                                 firstName: 'riccardo',
                                 lastName: 'P',
                                 password: 'alligatore24'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        var json = await response.json()
        expect(response.status).toEqual(201)
    });
});