const express = require('express');
const router = express.Router();
const messanger = require('./messangerFunctions/menuMessanger');


const { Pool, Client } = require('pg')

// for connection information
  const pool = new Pool({
    user: 'eneja',
    host: 'localhost',
    database: 'fastfoodfastdb',
    password: 'chinonxo',
    port: 5432,
  });


//  Handle GET request for orders
router.get('/', (req, res, next) => {
  const queryText = 'SELECT * FROM menu';
  pool.query(queryText)
  .then((result) => {
    res.status(200).json({
      "status": 200,
      "message": "successful",
      "result": result.rows
    }); // Will GET an array of objects
    // pool.end();
  })
  .catch( (err) => {
    console.log(err);
    // pool.end();
  });

});


// Handle POST request to add an order
router.post('/', (req, res, next) => {
  // let id = messanger.getNewID()
  const {name, price, imagePath} = req.body;
  console.log(`${name} ${price} ${imagePath}`);
  console.log(messanger.valid(name, price, imagePath));
  if(messanger.valid(name, price, imagePath)) {

    const queryText = `INSERT INTO menu (itemname, itemunitprice, itemimage) VALUES ( '${name}', '${price}', '${imagePath}')`;
    pool.query(queryText)
    .then( function (result) {
      res.status(201).json({
        "status": 201,
        "message": "menu added Successfully"
      }); // Will GET an array of objects
      // pool.end();
    })
    .catch( function (err){
      res.status(500).json({
        error: 'Failed to add new menu',
        message: 'Please check your entries and try again'
      });
      console.log(err);
      // pool.end();
    });
  } else {
    res.status(415).json({
      error: 'Failed to add new menu.',
      message: "Ensure you entered the correct values"
    })
  }

});


module.exports = router;
