var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HttpRequest = (function (_super) {
    __extends(HttpRequest, _super);
    function HttpRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.host = "http://192.168.2.77";
        _this.port = 3000;
        _this.requestList = [];
        return _this;
    }
    HttpRequest.i = function () {
        if (!this._instance)
            this._instance = new HttpRequest();
        return this._instance;
    };
    HttpRequest.prototype.init = function () {
    };
    HttpRequest.prototype.get = function (_url, _callback, _param) {
        new HttpRequestItem(egret.HttpMethod.GET, _url, _callback, _param);
    };
    HttpRequest.prototype.post = function (_url, _callback, _param) {
        new HttpRequestItem(egret.HttpMethod.POST, _url, _callback, _param);
    };
    return HttpRequest;
}(egret.EventDispatcher));
__reflect(HttpRequest.prototype, "HttpRequest");
var HttpRequestItem = (function () {
    function HttpRequestItem(_method, _url, _cb, _param) {
        this.method = _method;
        this.url = _url;
        this.cb = _cb;
        this.param = _param;
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        if (this.method == egret.HttpMethod.GET) {
            this.get();
        }
        else if (this.method == egret.HttpMethod.POST) {
            this.post();
        }
    }
    HttpRequestItem.prototype.get = function () {
        console.log(this.method + ":" + this.url, this.param);
        this.paramSend = this.paramParse(this.param);
        this.request.open(this.url + "?" + this.paramSend, egret.HttpMethod.GET);
        this.request.send();
    };
    HttpRequestItem.prototype.post = function () {
        console.log(this.method + ":" + this.url, this.param);
        this.paramSend = this.paramParse(this.param);
        this.request.open(this.url, egret.HttpMethod.POST);
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        this.request.send(this.paramSend);
    };
    HttpRequestItem.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log(this.method + " onGetComplete : ", request.response);
        if (this.cb) {
            this.cb(request.response);
        }
    };
    HttpRequestItem.prototype.onGetIOError = function (event) {
        console.log(this.method + " error : " + event);
    };
    HttpRequestItem.prototype.onGetProgress = function (event) {
        // console.log(this.method + " progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    };
    HttpRequestItem.prototype.paramParse = function (_param) {
        var _send = "";
        var paramlist = [];
        for (var key in _param) {
            var _p = key + "=" + _param[key];
            paramlist.push(_p);
        }
        _send = paramlist.join("&");
        // console.log("paramParse:", _send);
        return _send;
    };
    return HttpRequestItem;
}());
__reflect(HttpRequestItem.prototype, "HttpRequestItem");
//# sourceMappingURL=HttpRequest.js.map