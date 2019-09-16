const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("It's alive!");
  });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));