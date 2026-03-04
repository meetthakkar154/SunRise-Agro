const { products } = require('../data/products');

function getProducts(_req, res) {
  res.json(products);
}

module.exports = { getProducts };
