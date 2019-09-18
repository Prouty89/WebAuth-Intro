// const jwt = require('jsonwebtoken')
// const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: "error logging in"})
    }
  };


  // const token = req.headers.authorization;

  

  // if (token) {
  //     jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
  //       if(err) {
  //         //if token is expired or invalid
  //         res.status(401).json({ message: 'You shall not pass' });
  //       } else {
  //         //token is good
  //         // could add the user to the req object
  //         req.user = { username: decodedToken.username }
  //         next()
  //       }
  //     });
  //   } else {
  //     res.status(400).json({ message: 'no credentials provided'})
  //   }
  // };