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
var ComponentBase = (function (_super) {
    __extends(ComponentBase, _super);
    function ComponentBase() {
        return _super.call(this) || this;
    }
    ComponentBase.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ComponentBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    ComponentBase.prototype.init = function () {
    };
    return ComponentBase;
}(eui.Component));
__reflect(ComponentBase.prototype, "ComponentBase", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ComponentBase.js.map