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
var ChatContainer = (function (_super) {
    __extends(ChatContainer, _super);
    function ChatContainer(_w, _h) {
        if (_w === void 0) { _w = 750; }
        if (_h === void 0) { _h = 500; }
        var _this = _super.call(this, true) || this;
        _this.width = _w;
        _this.height = _h;
        _this.skinName = "resource/chat_skins/Chat_Skin.exml";
        return _this;
    }
    ChatContainer.prototype.init = function () {
        this.btnSend.label = "send";
    };
    return ChatContainer;
}(BaseEuiComponent));
__reflect(ChatContainer.prototype, "ChatContainer");
//# sourceMappingURL=ChatContainer.js.map