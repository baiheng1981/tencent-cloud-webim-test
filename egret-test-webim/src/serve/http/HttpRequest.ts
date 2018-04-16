class HttpRequest extends egret.EventDispatcher {
    private static _instance:HttpRequest;
    public static i():HttpRequest {
        if (!this._instance) this._instance = new HttpRequest();
        return this._instance;
    }

    public host:string = "http://192.168.2.77";
    public port:number = 3000;

    public requestList:HttpRequestItem[] = [];

    public init(): void {
    }


    public get(_url:string, _callback?:Function, _param?:Object): void {
        new HttpRequestItem(egret.HttpMethod.GET, _url, _callback, _param);
    }
    public post(_url:string, _callback?:Function, _param?:Object): void {
        new HttpRequestItem(egret.HttpMethod.POST, _url, _callback, _param);
    }



}

class HttpRequestItem {
    public request:egret.HttpRequest;

    private method:string;
    private url:string;
    private cb:Function;
    private param:Object;
    private paramSend:string;

    public constructor(_method:string, _url:string, _cb?:Function, _param?:Object) {
        this.method = _method;
        this.url = _url;
        this.cb = _cb;
        this.param = _param;

        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        this.request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);

        if (this.method == egret.HttpMethod.GET) {
            this.get();
        } else if (this.method == egret.HttpMethod.POST) {
            this.post();
        }
    }
    private get(): void {
        console.log(this.method + ":" + this.url, this.param);
        this.paramSend = this.paramParse(this.param);
        this.request.open(this.url + "?" + this.paramSend, egret.HttpMethod.GET);
        this.request.send();
    }
    private post(): void {
        console.log(this.method + ":" + this.url, this.param);
        this.paramSend = this.paramParse(this.param);
        this.request.open(this.url, egret.HttpMethod.POST);
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        this.request.send(this.paramSend);
    }

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        console.log(this.method + " onGetComplete : ",request.response);
        if (this.cb) {
            this.cb(request.response);
        }
    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log(this.method + " error : " + event);
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        // console.log(this.method + " progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }



    private paramParse(_param:Object):string {
        let _send = "";
        let paramlist = [];
        for (let key in _param) {
            let _p:string = key + "=" + _param[key];
            paramlist.push(_p);
        }
        _send = paramlist.join("&");
        // console.log("paramParse:", _send);
        return _send;
    }



}