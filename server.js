const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const usersRouter = require('./users/users-router.js');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./database/dbConfig')

const sessionConfig ={
    secret: process.env.SESSION_SECRET || 'test secret',
    name: 'Snickerdoodle',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized : false,
    store: new KnexSessionStore({
        knex: db,
        tablename: 'knexsessions',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use(logger);
server.use('/users', usersRouter);




function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to '${url}' at ${timestamp}`);
    next()
};

server.get('/', (req, res) => {
    res.status(200).json({ Message: "it's Alive!" })
});

module.exports = server;