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
import {LowBollGeneralFetcher} from "../service/impl/LowBollGeneralFetcher";
import {GeneralFetchGood} from "../service/impl/GeneralFetchGood";
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

router.get('/fetch', function (req, res, next) {
    let fetchService = FetchServiceFactory.getFetchService(null);
    let lowBollGeneralFetcher = LowBollGeneralFetcher.generateInstance();
    let duotouFetcher = DuotouStockFetcher.generateInstance();
    if (!GeneralFetchService.status) {
        fetchService.addFetcher(duotouFetcher);
        fetchService.addFetcher(lowBollGeneralFetcher);
        fetchService.fetch();
    }
});
router.get('/fetch_status', function (req, res, next) {
    res.json({status:GeneralFetchService.status});
});

router.get('/reverse_report', function (req, res, next) {
    let duotouFetcher = DuotouStockFetcher.generateInstance();
    res.json(duotouFetcher.report());
});

router.get('/low_boll_report', function (req, res, next) {
    res.json(LowBollGeneralFetcher.generateInstance().report());
});

router.get('/stock',function (req, res, next) {
    res.render("stocks_index");
});

router.get('/tabs',function (req, res, next) {
    res.render("tabs");
});
router.get('/blog',function (req, res, next) {
    res.render("blog");
});

router.get('/fetchGood',function (req, res, next) {
    let fetchGood = new GeneralFetchGood();
    fetchGood.fetch();
    res.json({status:'fetching'});
});


export default router;