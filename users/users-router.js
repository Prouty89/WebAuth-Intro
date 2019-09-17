const express = require('express');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');
const Users = require ('./users-model')
const restrict = require('./restrict')

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  Users.add({ username, password: bcrypt.hashSync(password, 8) })
  .then(id => {
    res.status(201).json({ message: "User Registered", id })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Error Registering user" })
  });
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Users
  .findByUsername(username)
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({ message: "Successful Login" });
    } else {
      res.status(401).json({ message: "Invalid Login" })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Error Logging In" })
  });
});

router.get('/', restrict, (req, res) => {
  Users.get()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Error getting Users"});
  });
});

module.exports = router;