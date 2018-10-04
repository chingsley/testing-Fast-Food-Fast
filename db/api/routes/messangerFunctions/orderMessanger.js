const { Pool, Client } = require('pg')

// for connection information
  const pool = new Pool({
    user: 'eneja',
    host: 'localhost',
    database: 'fastfoodfastdb',
    password: 'chinonxo',
    port: 5432,
  });

  let orders;

  const queryText = 'SELECT * FROM orders';
  pool.query(queryText)
  .then( function (res) {
    orders = res.rows;
    // console.log(orders)
    pool.end();
  })
  .catch( function (err){
    console.log(err);
    // pool.end();
  });

// console.log(orders);


/*==================================================================*/

module.exports = {

/*________________________________________________________________*/
    getOrders: () => { //Get all the orders (an array of order objects)
      return orders;
    },
/*________________________________________________________________*/

/*________________________________________________________________*/
    getOrder: (id) => {

      for(let i = 0; i < orders.length; i++) {
        if(orders[i].orderID === id) {
          return orders[i];
        }//end if
      }//end for

      return false;
      // return {error:'The specified ID does not match any order in our system'};
    },
/*________________________________________________________________*/

/*________________________________________________________________*/
   validateUser : (username, password) => {
        for(let i = 0; i < users.length; i++) {
          if(users[i].username === username && users[i].password === password) {
              return true;
          }//end outer if
        }//end for
        return false;
    },
/*________________________________________________________________*/


/*________________________________________________________________*/
    deleteOrder: (id) => {
      // let matchFound = false;
      let deletedOrder = {};
      for(let i = 0; i < orders.length; i++ ) {
        if(orders[i].orderID === id) {
          // matchFound = true;
          deletedOrder = (orders.splice(i, 1))[0];
          /*Recall that splice returns an array of deleted orders.
          So, we get the actual deleted order by using index [0]*/

          // console.log(deletedOrder);
          return saveChanges();
        }//end if
      }//end for

      // if(matchFound) {
      //   console.log(deletedOrder);
      //   return saveChanges();
      // }
    },
/*________________________________________________________________*/

/*________________________________________________________________*/
addOrder: (order) => {
    order.orderID = getNewID();
    // order.orderID = "R015";
    orders.push(order);

    if(saveChanges()) {
      return order; //Return the newly created order
    }else {
      return false;
    }
},
/*________________________________________________________________*/


}//END module.exports
