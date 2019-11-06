import express from 'express';
var router = express.Router();
import {Stock} from "../beans/Stock";
import {IStockService} from "../service/IStockService";
import {IStockServiceImpl} from "../service/impl/IStockServiceImpl";
import {StockServiceFactory} from "../service/generator/StockServiceFactory";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "jesse" });
});
router.get('/updateStockName', function (req, res, next) {
    let stockService = StockServiceFactory.getInstance(null);
    stockService.fetchStockName();
    res.json({success:true});
});
router.get('/updateStockName_status', function (req, res, next) {
    let stockService = StockServiceFactory.getInstance(null);
    res.json({status:stockService.isRunning()})
});

router.get('/duotou_fetch', function (req, res, next) {

});
router.get('/duotou_fetch_status', function (req, res, next) {
    res.json({status:true});
});
export default router;