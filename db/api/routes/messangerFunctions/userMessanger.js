const { Pool, Client } = require('pg')

// for connection information
  const pool = new Pool({
    user: 'eneja',
    host: 'localhost',
    database: 'fastfoodfastdb',
    password: 'chinonxo',
    port: 5432,
  });

  let users;
  pool.query('SELECT * FROM users', (err, result) => {
    if(err) throw err;
    users =  result.rows;
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

    valid: (username, password, email, telephone) => {
       if (username.length < 1) return false;
       if (password.length < 1) return false;
       if (email.indexOf('@') < 1) return false;
       if (email.indexOf('.') < 0) return false;
       if (!Number(telephone)) return false;
       if(telephone.length < 5) return false;

       return true;
    },

}//END module.exports
