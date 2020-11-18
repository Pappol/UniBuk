const { TestScheduler } = require('jest');
const toTest = require('./toTest');

test('Adds 2+2 equal 4', () => {
    expect(toTest.add(2,2)).toBe(4);
});