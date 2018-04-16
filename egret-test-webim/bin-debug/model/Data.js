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
var Data = (function (_super) {
    __extends(Data, _super);
    function Data() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Data.i = function () {
        if (!this._instance)
            this._instance = new Data();
        return this._instance;
    };
    return Data;
}(egret.EventDispatcher));
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map