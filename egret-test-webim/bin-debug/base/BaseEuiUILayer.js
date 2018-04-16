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
var BaseEuiUILayer = (function (_super) {
    __extends(BaseEuiUILayer, _super);
    function BaseEuiUILayer(_stopPropagation) {
        if (_stopPropagation === void 0) { _stopPropagation = false; }
        var _this = _super.call(this) || this;
        _this.stopPropagation = _stopPropagation;
        _this.touchEnabled = false;
        _this.touchThrough = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.toStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStage, _this);
        if (_this.stopPropagation == true) {
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.tapHandler, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.tapHandler, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.tapHandler, _this);
        }
        return _this;
    }
    BaseEuiUILayer.prototype.toStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.toStage, this);
        this.init();
    };
    BaseEuiUILayer.prototype.removeStage = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.tapHandler, this);
    };
    BaseEuiUILayer.prototype.init = function () {
    };
    BaseEuiUILayer.prototype.tapHandler = function (e) {
        if (this.stopPropagation == true) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    return BaseEuiUILayer;
}(eui.UILayer));
__reflect(BaseEuiUILayer.prototype, "BaseEuiUILayer");
//# sourceMappingURL=BaseEuiUILayer.js.map