let fs = require('fs');
let ordersJsonData = fs.readFileSync('orders.json');
let ordersJsonObject = JSON.parse(ordersJsonData);
let orders = ordersJsonObject.orders; //orders is the array of order objects

/*The saveChanges() function persists changes to memory (JSON FILE)
If the process is successful, it returns true (using the 'outcome' variable)
otherwise, it returns false. NOTICE: This function is not exorted */
function saveChanges() {
  let outcome = true;
  let data = JSON.stringify(ordersJsonObject, null, 2);
  fs.writeFile('orders.json', data, function(err){
    if(err) outcome = false;
  });
  return outcome;
}

function getNewID() {
    let arr = [];
    let lastID;

   for (let i = 0; i < orders.length; i++) {
     arr.push( Number(orders[i].orderID.slice(1)) );
   }
   arr.sort((a,b) => a - b);
   lastID = arr[arr.length - 1];
   if((lastID + 1) < 10 ) {
     return "R00" + (lastID + 1).toString();
   }else if ((lastID + 1) < 100) {
     return "R0" + (lastID + 1).toString();
   }else {
     return "R"(lastID + 1).toString();
   }
}
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
    updateOrder: (id, obj) => {
        let matchFound = false;

        for(let i = 0; i < orders.length; i++) {
          if(orders[i].orderID === id) {
              matchFound = true;
              orders[i].status = obj.status || orders[i].status;
              if(saveChanges()) {
                return orders[i]; //returns the updated order
              }else {
                return false;
              }
          }//end outer if
        }//end for

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

          console.log(deletedOrder);
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
