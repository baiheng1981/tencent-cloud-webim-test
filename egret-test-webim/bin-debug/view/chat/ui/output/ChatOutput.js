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
var ChatOutput = (function (_super) {
    __extends(ChatOutput, _super);
    function ChatOutput(_w, _h) {
        if (_w === void 0) { _w = 550; }
        if (_h === void 0) { _h = 200; }
        var _this = _super.call(this) || this;
        _this.disY = 10;
        _this.width = _w;
        _this.height = _h;
        _this.skinName = "resource/chat_ui/ChatOutputSkin.exml";
        return _this;
    }
    ChatOutput.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ChatOutput.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    ChatOutput.prototype.init = function () {
        console.log("ChatOutput => init");
        this.outputTxtList = [];
        this.msgList = [];
        this.nextY = this.disY;
        this.ScrollerBox.scrollPolicyH = eui.ScrollPolicy.OFF;
        QWebIm.i().addEventListener(QWebImEvent.ADDMSGGROUPEVENT, this.addMsgGroup, this);
    };
    ChatOutput.prototype.addMsgGroup = function (e) {
        var _itemlist = [];
        var _els = e.msgList;
        for (var i = 0; i < _els.length; i++) {
            var _el = _els[i];
            var _msgItem = new MsgItem(_el.data.text, _el.fromAccountNick);
            _msgItem.isSend = _el.isSend;
            _itemlist.push(_msgItem);
        }
        this.update(_itemlist);
    };
    ChatOutput.prototype.update = function (_msglist) {
        // console.log("ChatOutput => update:", _msglist);
        this.msgList = this.msgList.concat(_msglist);
        var _opTxtList = [];
        for (var i = 0; i < _msglist.length; i++) {
            var _item = _msglist[i];
            var _opTxt = new OutputTxt(_item, this.width);
            _opTxtList.push(_opTxt);
        }
        this.outputTxtList = this.outputTxtList.concat(_opTxtList);
        this.layout(_opTxtList);
    };
    ChatOutput.prototype.layout = function (_opTxtList) {
        for (var i = 0; i < _opTxtList.length; i++) {
            var _opTxt = _opTxtList[i];
            this.GroupOutput.addChild(_opTxt);
            _opTxt.x = 0;
            _opTxt.y = this.nextY;
            this.nextY += (_opTxt.height + this.disY);
        }
        this.viewportRender(null);
    };
    ChatOutput.prototype.outputTxtComplete = function (e) {
        // console.log("xxxx:", e.target);
    };
    ChatOutput.prototype.viewportRender = function (e) {
        if (this.ScrollerBox.viewport.scrollV < (this.ScrollerBox.viewport.contentHeight - this.ScrollerBox.viewport.height)) {
            this.ScrollerBox.viewport.scrollV = this.ScrollerBox.viewport.contentHeight - this.ScrollerBox.viewport.height;
        }
    };
    return ChatOutput;
}(eui.Component));
__reflect(ChatOutput.prototype, "ChatOutput", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ChatOutput.js.map