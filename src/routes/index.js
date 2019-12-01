import express from 'express';
var router = express.Router();
import {Stock} from "../beans/Stock";
import {IStockService} from "../service/IStockService";
import {IStockServiceImpl} from "../service/impl/IStockServiceImpl";
import {StockServiceFactory} from "../service/generator/StockServiceFactory";
import {FetchServiceFactory} from "../service/generator/FetchServiceFactory";
import {DuotouStockFetcher} from "../service/impl/DuotouStockFetcher";
import {PatchRunnerHelper} from "../service/util/PatchRunnerHelper";
import {GeneralFetchService} from "../service/impl/GeneralFetchService";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: "jesse" });
});

router.get('/trigger', function(req, res, next) {
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
    let fetchService = FetchServiceFactory.getFetchService(null);
    let duotouFetcher = DuotouStockFetcher.generateInstance();
    if (!GeneralFetchService.status) {
        fetchService.addFetcher(duotouFetcher);
        fetchService.fetch();
    }
});
router.get('/duotou_fetch_status', function (req, res, next) {
    res.json({status:GeneralFetchService.status});
});

router.get('/reverse_report', function (req, res, next) {
    let duotouFetcher = DuotouStockFetcher.generateInstance();
    res.json(duotouFetcher.report());
});

export default router;