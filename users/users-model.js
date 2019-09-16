const db = require('./dbConfig.js')

module.exports = {
    add,
    get,
    login
};

const add = user => {
    return db('users').insert(user)
}

function login(filter) {
    return db('users').where(filter);
}

const get = () => {
    return db('users')
};

