const express = require('express');

const router = express.Router();
const messanger = require('./messangerFunctions/orderMessanger');

const orders = messanger.getOrders();


//  Handle GET request for orders
router.get('/', (req, res, next) => {
  // res.status(200).json(ordersJsonObject); //Will GET an object containing an array of object
  res.status(200).json({
    "status": 200,
    "message": "successful",
    "result": orders
  }); // Will GET an array of objects
});


// Handle POST request to add an order
router.post('/', (req, res, next) => {
  // let id = messanger.getNewID()
  const order = {
    orderID: "",
    foodName: req.body.foodName,
    itemID: req.body.itemID,
    quantity: req.body.quantity,
    price: req.body.price,
    username: req.body.username,
    date: req.body.date || null,
    status: 'pending',
  };

  const newOrder = messanger.addOrder(order);
  if (newOrder) {
    res.status(201).json({
      status: 201,
      message: 'New order has been placed',
      // order: newOrder,
    });
  } else {
    res.status(500).json({
      message: 'Failed to place a new order'
    });
  }
});

//  Handle GET request for a particular orders specified by ID
router.get('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  const order = messanger.getOrder(id);
  if (order) {
    res.status(200).json({
      "status": 200,
      "message": "successful",
      "result": order
    });
  } else {
    res.status(404).json({
      error: 'The specified id does not match any order in our system',
    });
  }
});

//Handle PUT request updating an order, like setting the status of an order: "pending", "complete", or "declined"
router.put('/:orderID', (req, res, next) => {
  // console.log(req.body.status);
    const id = req.params.orderID;
    let obj = {
      status: req.body.status
    }
    let updatedOrder = messanger.updateOrder(id, obj);
    if(updatedOrder){
      res.status(200).json({
        status: 200,
        message: 'order update: Successful!',
        // order: updatedOrder,
      });
    }else {
      res.status(404).json({
        error: "not found"
      });
    }
});


//Handle DELETE request to delete an order
router.delete('/:orderID', (req, res, next) => {
  if(messanger.deleteOrder(req.params.orderID)){
    // note: status code 204 means no content, and hence no content will be returned, but the delete method will be successful
    res.status(204).json({
      message: 'Order '+ req.params.orderID + ' deleted!',
    });
  }else {
    res.status(404).json({
      error: 'Order '+ req.params.orderID + ' not found.'
    });
  }
});

module.exports = router;
