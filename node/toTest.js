const axios = require('axios');

const toTest = {
    add:(num1, num2) => num1+num2,
    fetchUser: () => axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => 'Error with the get')
}
module.exports = toTest; 