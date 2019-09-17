const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const usersRouter = require('./users/users-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());
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