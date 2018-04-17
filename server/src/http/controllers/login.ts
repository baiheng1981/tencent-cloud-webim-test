import lg from '../../utils/lg';

import * as Koa from "koa";
import TimGenerateSig, { LoginInfo } from "../../lib/qcloud/TimGenerateSig";
import TimRestApi from "../../lib/qcloud/TimRestApi";

/**
 * middleware login
 * @param ctx
 * @param next
 */
let login = async(ctx:Koa.Context, next:Function) => {
    let username:string = ctx.request.body.username || "";
    lg.success("login => username:", ctx.request.body);
    // 导入
    await qAccountImoport(username).then((webimInfo) => {
        lg.success("login success => webimInfo:", webimInfo);
        ctx.rest(webimInfo);
    }).catch((err) => {
        lg.error("login err:", err);
    })
}

function qAccountImoport(_username:string): Promise<{}> {
    return new Promise((resolve, reject) => {
        let config:LoginInfo = {
            sdkAppid: '1400084583',
            identifier: 'bhtest_admin01',
            accountType: 25288,
            privateKey:'../../ec_key.pem',
            expireAfter: 30 * 24 * 3600
        }
        let reqBody = {
            Identifier: _username,
            Nick: _username,
            FaceUrl:"http://www.qq.com"
        }
        let api = new TimRestApi(config);
        api.init(() => {
            api.request("im_open_login_svc", "account_import", reqBody, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data.ErrorCode == 0) {
                    let _usersig: string = new TimGenerateSig(config).genSigUser(_username);
                    let webimInfo = {
                        "sdkAppID": api.sdkAppid,
                        "appIDAt3rd": api.sdkAppid,
                        "identifier": reqBody.Identifier,
                        "accountType": 25288,
                        "userSig":_usersig,
                        "identifierNick": reqBody.Nick,
                        "portrait": reqBody.FaceUrl,
                        "avChatRoomId": '@TGS#3FH43EFFF'
                        // "avChatRoomId": '@TGS#aQKTCFFFV'
                    }
                    resolve(webimInfo);
                }
            });
        })
    });
}

export = {
    "POST /api/login": login
 };