import TimGenerateSig, { LoginInfo } from "./TimGenerateSig";
import * as https from "https";
import * as util from "util";

let maxSock = 10000;
let keepAliveAgent: https.Agent = new https.Agent({
    keepAlive: true,
    maxSockets: maxSock
});

export default class TimRestApi {
    public sdkAppid:string;
    public identifier:string;
    public config:LoginInfo;

    public usersig:string;
    public expireUntil:number;

    public constructor(config:LoginInfo) {
        this.sdkAppid = config.sdkAppid;
        this.identifier = config.identifier;
        this.config = config;
    }

    public init(callback) {
        let sig = new TimGenerateSig(this.config);
        sig.genSig((usersig, expireUntil) => {
            this.usersig = usersig;
            this.expireUntil = expireUntil;
        }, callback);
    }

    public request(serviceName, cmdName, reqBody, callback) {
        if (this.expireUntil < (Date.now() / 1000)) {
            let sig = new TimGenerateSig(this.config);
            sig.genSig((usersig, expireUntil) => {
                this.usersig = usersig;
                this.expireUntil = expireUntil;
            });
        }
        let urlPath = util.format("/v4/%s/%s?usersig=%s&identifier=%s&sdkappid=%s&contenttype=json", serviceName, cmdName, this.usersig, this.identifier, this.sdkAppid);
        let requestArg = {
            agent: keepAliveAgent,
            host: 'console.tim.qq.com',
            method: 'post',
            path: urlPath
        }
        let chunkList = [];
        let rspJsonBody:any;
        let req = https.request(requestArg,
        function(rsp) {
            rsp.setEncoding('utf8');
            rsp.on('data',
            function(chunk) {
                chunkList.push(chunk);
            });
            rsp.on('error',
            function(err) {
                if (callback) {
                    callback(err);
                }
            });
            rsp.on('end',
            () => {
                let rspBody = chunkList.join('');
                try {
                    rspJsonBody = JSON.parse(rspBody);
                } catch(err) {
                    if (callback) {
                        callback(err);
                    }
                }
                if (callback) {
                    callback(null, rspJsonBody);
                }
            });
        });
        req.write(JSON.stringify(reqBody));
        req.end();
    }



}

