const app = require('./app');
const fetch = require("node-fetch");
const url = "http://localhost:8080/user/signup";

describe('api.test', () => {

    let server;

    beforeAll( () => {
        const port = process.env.PORT || 3000;
        return new Promise( (resolve, reject) => {
            server = app.listen(port, resolve());
            console.log(`Server listening on port ${port}`);
        });

    });
    
    afterAll( (done) => {
        console.log(`Closing server`);
        server.close( done() );
    });

    it('works with post', async () => {
        expect.assertions(1)
        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({email: 'Ciaobello@gmail.com', 
                                 username: 'pappol',
                                 firstName: 'riccardo',
                                 lastName: 'parola',
                                 password: 'alligatore24'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        var json = await response.json()
        expect(response.status).toEqual(201)
    });
});