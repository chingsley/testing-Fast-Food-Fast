/*  ====================================================== */
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

const app = express();


const orderRoutes = require('./db/api/routes/orders');
const dbUsersRoutes = require('./db/api/routes/users');
const dbMenuRoutes = require('./db/api/routes/menu');

app.use(bodyParser.json());

//  enables the rendering of html for the home page of the endpoints
app.use(express.static(__dirname));

//  render the homepage at localhost:3000/
// app.get('/', (req, res) => {
//   res.render('index');
// });

// ORDER ROUTES
app.use('/orders', orderRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', orderRoutes);

// USER AUTHENTICALTION ROUTES
// app.use('/api/v1/users', dbUsersRoutes);
app.use('/api/v1/auth', dbUsersRoutes);

// MENU ROUTES
app.use('/api/v1/menu', dbMenuRoutes);

module.exports = app;
