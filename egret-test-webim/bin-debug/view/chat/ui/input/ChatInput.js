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
var ChatInput = (function (_super) {
    __extends(ChatInput, _super);
    function ChatInput(_w) {
        if (_w === void 0) { _w = 550; }
        var _this = _super.call(this) || this;
        _this.width = _w;
        _this.skinName = "resource/chat_ui/ChatInputSkin.exml";
        return _this;
    }
    ChatInput.prototype.init = function () {
        this.inputStr = "input your Message";
        this.txtInput = new egret.TextField();
        // type
        this.txtInput.type = egret.TextFieldType.INPUT;
        // bg
        this.txtInput.background = true;
        this.txtInput.backgroundColor = 0x000000;
        //
        this.txtInput.width = this.width - 130;
        this.txtInput.height = 30;
        this.txtInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtInput.textAlign = egret.HorizontalAlign.LEFT;
        this.txtInput.x = 10;
        this.txtInput.y = 10;
        this.txtInput.size = 20;
        this.addChild(this.txtInput);
        this.txtInput.text = this.inputStr;
        this.EmojiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.emojiBtnTap, this);
        this.BtnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSendTap, this);
    };
    ChatInput.prototype.restore = function () {
        this.txtInput.text = "";
        this.txtInput.setFocus();
    };
    ChatInput.prototype.btnSendTap = function (e) {
        var _text = this.txtInput.text;
        if (!_text) {
            this.restore();
            return;
        }
        var _msg = {
            text: _text,
            type: QWebImType.MEMBER_CHAT
        };
        QWebIm.i().onSendMsg(_msg);
        this.restore();
    };
    ChatInput.prototype.emojiBtnTap = function (e) {
    };
    return ChatInput;
}(ComponentBase));
__reflect(ChatInput.prototype, "ChatInput");
//# sourceMappingURL=ChatInput.js.map