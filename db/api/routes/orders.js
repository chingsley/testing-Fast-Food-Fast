const express = require('express');
const router = express.Router();

const messanger = require('./messangerFunctions/orderMessanger');
const orders = messanger.getOrders();

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
  const queryText = 'SELECT * FROM orders';
  pool.query(queryText)
  .then( function (result) {
    res.status(200).json({
      "status": 200,
      "message": "successful",
      "result": result.rows
    }); // Will GET an array of objects
    // pool.end();
  })
  .catch( function (err){
    console.log(err);
    // pool.end();
  });

});


// Handle POST request to add an order
router.post('/', (req, res, next) => {
  // let id = messanger.getNewID()
  const order = {
     userId : req.body.userId,
     foodItem : req.body.foodItem,
     quantity : req.body.quantity,
     price : req.body.price,
     date : req.body.date
  };

  const queryText = `INSERT INTO orders (userId, foodItem, quantity, price, date, status) VALUES ( '${order.userId}', '${order.foodItem}', '${order.quantity}', '${order.price}', '${order.date}', 'pending')`;
  pool.query(queryText)
  .then( function (result) {
    res.status(201).json({
      "status": 201,
      "message": "successful",
      "result": order
    }); // Will GET an array of objects
    // pool.end();
  })
  .catch( function (err){
    res.status(500).json({
      message: 'Failed to place a new order'
    });
    console.log(err);
    // pool.end();
  });

});



//  Get all the order history belonging to a  specific user
router.get('/:userId/orders', (req, res, next) => {
  const id = req.params.userId;
  const queryText = `SELECT * FROM orders WHERE userId = '${id}'`;
  pool.query(queryText)
  .then( function (result) {
      res.status(200).json({
        "status": 200,
        "message": "successful",
        "result": result.rows
      });
  })
  .catch( function (err){
    res.status(404).json({
      "status": 404,
      message: 'Not Found'
    });
    console.log(err);
    // pool.end();
  });
});

//  Handle GET request for a particular orders specified by ID
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  const queryText = `SELECT * FROM orders WHERE orderId = '${id}'`;
  pool.query(queryText)
  .then( function (result) {
      res.status(200).json({
        "status": 200,
        "message": "successful",
        "result": result.rows
      });
  })
  .catch( function (err){
    res.status(404).json({
      "status": 404,
      message: 'Not Found'
    });
    console.log(err);
    // pool.end();
  });
});


//Handle PUT request updating an order, like setting the status of an order: "pending", "complete", or "declined"
router.put('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  const status = req.body.status;
  console.log(status);
  const queryText = `UPDATE orders SET status = '${status}' WHERE orderId = '${id}'`;
  pool.query(queryText)
  .then((result) => {
      res.status(200).json({
        "status": 200,
        "message": "successful",
        "result": result.rows
      });
  })
  .catch( (err) => {
    res.status(415).json({
      "status": 415,
      message: 'Unsuported format. Please pass a json object as the body.'
    });
    //STATUS 500: Internal server error: the server encountered an unexpected condition which prevented it from fulfilling the request
    console.log(err);
    // pool.end();
  });
});

module.exports = router;
