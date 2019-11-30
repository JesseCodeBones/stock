// @ts-ignore
const http =  require("http");
// @ts-ignore
var https = require("https");
// @ts-ignore
var iconv = require('iconv-lite');
// @ts-ignore
var BufferHelper = require('bufferhelper');
export class HttpContentHelper {

    static async getHttpRequest(url:string):Promise<string>{
        return new Promise(function (resolve, reject) {
            http.get(url, function(res) {
                var data = "";
                var bufferHelper = new BufferHelper();
                res.on('data', function (chunk) {
                    bufferHelper.concat(chunk);
                });
                res.on("end", function() {
                    resolve(iconv.decode(bufferHelper.toBuffer(),'GBK'));
                });
            }).on("error", function(error) {
                reject(error);
            });
        })
    }

    static downloadHttps(url, callback) {
        https.get(url, function(res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function() {
                callback(data);
            });
        }).on("error", function(error) {
            callback(null, error);
        });
    }

    static async getHttpsRequest(url:string):Promise<string> {
        return new Promise<string>((resolve, reject) => {
            https.get(url, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on("end", function() {
                    resolve(data);
                });
            }).on("error", function(error) {
                console.log(error);
                reject(error);
            });
        });
    }
}
