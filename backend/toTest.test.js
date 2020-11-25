//const test = require('jest');
//const server = require('./server');
//const app = require('./app');
const toTest = require('./toTest');


test('Adds 2+2 equal 4', () => {
    expect(toTest.add(2,2)).toBe(4);
});

test('Get funciont', async () => {
    expect.assertions(1);
    const data = await toTest.fetchUser();
    expect(data.name).toEqual('Leanne Graham');
});