import * as ct from "crypto";
import * as zlib from "zlib";
import * as fs from "fs";
import * as path from "path";

let base64url = {
    unescape: null,
    escape: null,
    encode: null,
    decode: null
};

base64url.unescape = function unescape (str) {
    return (str + Array(5 - str.length % 4))
        .replace(/_/g, '=')
        .replace(/\-/g, '/')
        .replace(/\*/g, '+');
};

base64url.escape = function escape (str) {
    return str.replace(/\+/g, '*')
        .replace(/\//g, '-')
        .replace(/=/g, '_');
};

base64url.encode = function encode (str) {
    return this.escape(new Buffer(str).toString('base64'));
};

base64url.decode = function decode (str) {
    return new Buffer(this.unescape(str), 'base64').toString();
};

/**
 * 下列接口提供了初始化，生成 TimGenerateSig 和校验 TimGenerateSig 的功能，可以直接使用
 */

/**
 * 此处 config 指定的是公私钥路径，可以考虑直接使用公私钥的内容，
 * 而且可以单独使用私钥生成 TimGenerateSig，公钥并不是必须的
 */
export default class TimGenerateSig{
    public config:LoginInfo;

    public sdkAppid;
    public accountType;
    public identifier;
    public appidAt3rd;
    public expireAfter;
    public expireUntil;

    public privateKey;
    public publicKey;

    constructor(_config) {
        this.config = _config;

        this.sdkAppid = this.config.sdkAppid;
        this.accountType = this.config.accountType;
        this.identifier = this.config.identifier;
        this.appidAt3rd = this.config.sdkAppid;
        this.expireAfter = (this.config.expireAfter || 30 * 24 * 3600).toString();
        this.expireUntil = parseInt((Date.now() / 1000).toString()) + parseInt(this.expireAfter);
        this.privateKey = fs.readFileSync(path.join(__dirname, this.config.privateKey)).toString();
    }

    private _genSignContent(obj) {
        // let ret = '';
        // for (let i in obj) {
        //     ret += i + ':' + obj[i] + '\n';
        // }
        let arr = [
            'TLS.appid_at_3rd',
            'TLS.account_type',
            'TLS.identifier',
            'TLS.sdk_appid',
            'TLS.time',
            'TLS.expire_after'
        ];

        let ret = '';
        for (let i = 0; i < arr.length; i++) {
            ret += arr[i] + ':' + obj[arr[i]] + '\n';
        }
        return ret;
    };

    public genSig(evalSig, callback?) {
        let obj = {
            'TLS.appid_at_3rd': this.appidAt3rd,
            'TLS.account_type': this.accountType,
            'TLS.identifier': this.identifier,
            'TLS.sdk_appid': this.sdkAppid,
            'TLS.version': "201610110000",
            'TLS.time': (Math.floor(Date.now() / 1000)).toString(),
            'TLS.expire_after': this.expireAfter
        };
        let content = this._genSignContent(obj);
        let usersig = "";
        try {
            let signer = ct.createSign('sha256');
            signer.update(content, 'utf8');
            usersig = signer.sign(this.privateKey, 'base64');
        } catch(err) {
            callback(err);
            return;
        }

        obj['TLS.sig'] = usersig;
        let text = JSON.stringify(obj);
        let compressed = zlib.deflateSync(new Buffer(text)).toString('base64');
        evalSig(base64url.escape(compressed), this.expireUntil);
        if (callback) {
            callback();
        }
    };

    public genSigUser(_identifier:string) {
        let obj = {
            'TLS.appid_at_3rd': this.appidAt3rd,
            'TLS.account_type': this.accountType,
            'TLS.identifier': _identifier,
            'TLS.sdk_appid': this.sdkAppid,
            'TLS.version': "201610110000",
            'TLS.time': (Math.floor(Date.now() / 1000)).toString(),
            'TLS.expire_after': this.expireAfter
        };
        let content = this._genSignContent(obj);
        let usersig = "";
        try {
            let signer = ct.createSign('sha256');
            signer.update(content, 'utf8');
            usersig = signer.sign(this.privateKey, 'base64');
        } catch(err) {
            console.log("TimGenerateSig => genSigUser:", err);
            return;
        }

        obj['TLS.sig'] = usersig;
        let text = JSON.stringify(obj);
        let compressed = zlib.deflateSync(new Buffer(text)).toString('base64');
        return base64url.escape(compressed);
        // evalSig(base64url.escape(compressed), this.expireUntil);
        // if (callback) {
        //     callback();
        // }
    };
};

/** 登录身份相关参数集合，详见下面
 * sdkAppID:string [用户标识接入SDK的应用ID，必填]
 * appIDAt3rd: string
 * identifier: string [用户帐号,必须是字符串类型，必填]
 * accountType: number [账号类型，必填]
 * userSig: string 鉴权Token，[必须是字符串类型，必填]
 * identifierNick: string [当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id]
 * headurl: string [当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息]
 */
interface LoginInfo {
    sdkAppid: string,
    identifier: string,
    accountType: number,
    privateKey:string,

    appidAt3rd?: string,
    userSig?: string,
    identifierNick?: string,
    headurl?: string,
    expireAfter?:number
}

export { LoginInfo }