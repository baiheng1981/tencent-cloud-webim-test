class Data extends egret.EventDispatcher {
    private static _instance:Data;
    public static i():Data {
        if (!this._instance) this._instance = new Data();
        return this._instance;
    }











}