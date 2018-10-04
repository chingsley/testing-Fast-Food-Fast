const messanger = require('../api/routes/messangerFunctions/orderMessanger');

const orders = messanger.getOrders();
console.log(orders);

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app; Recall that server.js imports app.js

describe('API endpoint /orders', function() {
  this.timeout(5000);

  before(() => {});
  after(() => {});

  // GET - List all orders
  it('should return all orders', () => {
    return chai.request(app)
      .get('/api/v1/orders')
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.result).to.be.an('array');
      });// end then()
  });// end it()

  
});// ENDS THE MAIN describe()
