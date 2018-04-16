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
var BaseEuiComponent = (function (_super) {
    __extends(BaseEuiComponent, _super);
    function BaseEuiComponent(_stopPropagation) {
        if (_stopPropagation === void 0) { _stopPropagation = false; }
        var _this = _super.call(this) || this;
        _this.stopPropagation = _stopPropagation;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeStage, _this);
        if (_this.stopPropagation == true) {
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.tapHandler, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.tapHandler, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.tapHandler, _this);
        }
        return _this;
    }
    BaseEuiComponent.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseEuiComponent.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    BaseEuiComponent.prototype.addStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.init();
    };
    BaseEuiComponent.prototype.removeStage = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.tapHandler, this);
    };
    BaseEuiComponent.prototype.init = function () {
    };
    BaseEuiComponent.prototype.tapHandler = function (e) {
        if (this.stopPropagation == true) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    return BaseEuiComponent;
}(eui.Component));
__reflect(BaseEuiComponent.prototype, "BaseEuiComponent", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BaseEuiComponent.js.map