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
var OutputTxt = (function (_super) {
    __extends(OutputTxt, _super);
    function OutputTxt(_msg, _w, _h) {
        if (_w === void 0) { _w = 530; }
        if (_h === void 0) { _h = 30; }
        var _this = _super.call(this) || this;
        _this.width = _w;
        _this.height = _h;
        _this.msgItem = _msg;
        _this.init();
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    OutputTxt.prototype.addStage = function (e) {
    };
    OutputTxt.prototype.init = function () {
        if (this.msgItem.isSend) {
            this.update1();
        }
        else {
            this.update0();
        }
    };
    OutputTxt.prototype.update0 = function () {
        this.skin = new OutputTxt0(this.msgItem);
        this.addChild(this.skin);
        this.skin.x = 10;
        this.skin.y = 0;
        this.height = this.skin.height;
    };
    OutputTxt.prototype.update1 = function () {
        this.skin = new OutputTxt1(this.msgItem);
        this.addChild(this.skin);
        this.skin.x = this.width - this.skin.width - 30;
        this.skin.y = 0;
        this.height = this.skin.height;
    };
    return OutputTxt;
}(eui.Group));
__reflect(OutputTxt.prototype, "OutputTxt");
//# sourceMappingURL=OutputTxt.js.map