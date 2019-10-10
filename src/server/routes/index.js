const StockFetcherServiceImpl = require("../Test").Test;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let stockFetchService = new StockFetcherServiceImpl();

  res.render('index', { title: 'Express' });
});

module.exports = router;
