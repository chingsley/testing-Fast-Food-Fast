const express = require('express');
const router = express.Router();
const messanger = require('./messangerFunctions/userMessanger');
const jwt = require('jsonwebtoken');
const { Pool, Client } = require('pg')

// for connection information
  const pool = new Pool({
    user: 'eneja',
    host: 'localhost',
    database: 'fastfoodfastdb',
    password: 'chinonxo',
    port: 5432,
  });


// Handle POST request to register a new user
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const telephone = req.body.telephone;
  if (messanger.valid(username, password, email, telephone)) {
    const queryText =   `INSERT INTO users (username, password, email, telephone) VALUES ('${username}', '${password}', '${email}', '${telephone}')`;
    pool.query(queryText)
    .then((result) => {
      res.status(201).json({
        "status": 201,
        "message": "User Created"
      });
    })
    .catch(err => {
      res.status(401).json({
        error: "Failed to Register new User!"
      })
    });
     // 401 means 'unauthorised'
     //400 means 'bad request'
  } else {
    res.status(400).json({
      error: "Invalid entries"
    });
  }
});

// Handle POST request to login a user
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let isUser = messanger.validateUser(email, password);
  if(isUser) {
    // jwt.sign()
    res.status(200).json({
      "status": 200,
      "message": "access granted"
    });
  }else {
    res.status(401).json({
      "status": 401,
      "message": "Unathorized Access. Acess denied."
    });
  }
});


module.exports = router;
