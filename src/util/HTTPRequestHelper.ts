import * as http from 'http';
import * as  BufferHelper from 'bufferhelper';
import * as iconv_lite from 'iconv-lite';
import * as https from 'https';
export class HTTPRequestHelper {

    static async download(url:string):Promise<string>{
        return new Promise<string>((resolve, reject) => {
            http.get(url, function(res) {
                let bufferHelper = new BufferHelper();
                res.on('data', function (chunk) {
                    bufferHelper.concat(chunk);
                });
                res.on("end", function() {
                    resolve(iconv_lite.decode(bufferHelper.toBuffer(),'GBK'));
                });
            }).on("error", function(error) {
                reject(error)
            });
        });
    }

    static downloadHttps(url, callback):Promise<string> {
        return new Promise<string> (((resolve, reject) => {
            https.get(url, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on("end", function() {
                    resolve(data);
                });
            }).on("error", function(error) {
                reject(error);
            });
        }));
    }
}