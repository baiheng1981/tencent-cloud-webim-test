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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStage, _this);
        return _this;
    }
    Scene.prototype.addStage = function (e) {
        this.init();
    };
    Scene.prototype.init = function () {
        this.chatInit();
        this.login = new Login();
        this.addChild(this.login);
    };
    Scene.prototype.chatInit = function () {
        this.chatScene = new ChatScene(700, 400);
        this.addChild(this.chatScene);
    };
    return Scene;
}(eui.UILayer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map