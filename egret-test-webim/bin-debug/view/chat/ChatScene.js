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
var ChatScene = (function (_super) {
    __extends(ChatScene, _super);
    function ChatScene(_w, _h) {
        if (_w === void 0) { _w = 500; }
        if (_h === void 0) { _h = 400; }
        var _this = _super.call(this) || this;
        _this.width = _w;
        _this.height = _h;
        _this.verticalCenter = 0;
        _this.horizontalCenter = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStage, _this);
        return _this;
    }
    ChatScene.prototype.addStage = function (e) {
        this.init();
    };
    ChatScene.prototype.init = function () {
        this.chatOutput = new ChatOutput(this.width, this.height - 55);
        this.addChild(this.chatOutput);
        this.chatInput = new ChatInput(this.width);
        this.addChild(this.chatInput);
        this.chatInput.x = this.chatOutput.x;
        this.chatInput.y = this.chatOutput.y + this.chatOutput.height + 5;
    };
    return ChatScene;
}(eui.Group));
__reflect(ChatScene.prototype, "ChatScene");
//# sourceMappingURL=ChatScene.js.map