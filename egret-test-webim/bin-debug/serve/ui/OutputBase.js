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
var OutputBase = (function (_super) {
    __extends(OutputBase, _super);
    function OutputBase() {
        var _this = _super.call(this) || this;
        _this.widthMin = 100;
        _this.widthMax = 300;
        _this.heightMin = 30;
        _this.heightMax = Number.MAX_VALUE;
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    OutputBase.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    OutputBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OutputBase.prototype.addStage = function (e) {
        this.init();
    };
    OutputBase.prototype.init = function () {
    };
    OutputBase.prototype.update = function (_item) {
    };
    OutputBase.prototype.layout = function () {
    };
    return OutputBase;
}(eui.Component));
__reflect(OutputBase.prototype, "OutputBase", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=OutputBase.js.map