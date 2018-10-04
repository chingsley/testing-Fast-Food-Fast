const { Pool, Client } = require('pg')

// for connection information
  const pool = new Pool({
    user: 'eneja',
    host: 'localhost',
    database: 'fastfoodfastdb',
    password: 'chinonxo',
    port: 5432,
  });

  let menu;
  pool.query('SELECT * FROM menu', (err, result) => {
    if(err) throw err;
    menu =  result.rows;
    // pool.end();
  });

module.exports = {

    getUsers: () => {
      return users;
    },

   validateUser : (email, password) => {
        for(let i = 0; i < users.length; i++) {
          if(users[i].email === email && users[i].password === password) {
              return users[i];
          }//end outer if
        }//end for
        return false;
    },

    valid: (name, price, imagePath) => {
      if (!name) return false;
      if (!price) return false;
       if (name.trim().length < 1) return false;
       if (typeof(name) != "string") return false;
       if (price < 0) return false;
       if (imagePath != undefined) {
       if (typeof(imagePath) != "string") return false;
         if (imagePath.indexOf('http://') < 0 && imagePath.indexOf('https://') < 0) return false;
         if (imagePath.indexOf('www') < 0) return false;
         if (imagePath.indexOf('.com') < 0 && imagePath.indexOf('.org') < 0 && imagePath.indexOf('.co.uk') < 0) return false;
       }


       return true;
    },

}//END module.exports
