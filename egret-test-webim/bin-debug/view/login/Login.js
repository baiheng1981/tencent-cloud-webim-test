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
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/chat_ui/LoginSkin.exml";
        _this.verticalCenter = 0;
        _this.horizontalCenter = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStage, _this);
        return _this;
    }
    Login.prototype.init = function () {
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLoginTap, this);
        QWebIm.i().addEventListener(QWebImEvent.APPLYJOINBIGGROUPEVENT, this.applyJoinBigGroup, this);
    };
    Login.prototype.addStage = function (e) {
        var _this = this;
        this.inputStr = "";
        setTimeout(function () {
            _this.createInput();
        }, 100);
    };
    Login.prototype.restore = function () {
        this.inputStr = "";
        if (this.txtInput) {
            this.txtInput.text = this.inputStr;
            this.txtInput.setFocus();
        }
    };
    Login.prototype.createInput = function () {
        this.txtInput = new egret.TextField();
        // type
        this.txtInput.type = egret.TextFieldType.INPUT;
        this.txtInput.textColor = 0x333333;
        this.txtInput.width = this.bgUserName.width - 20;
        this.txtInput.height = this.bgUserName.height - 10;
        this.txtInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txtInput.textAlign = egret.HorizontalAlign.LEFT;
        this.txtInput.x = this.bgUserName.x + 10;
        this.txtInput.y = this.bgUserName.y + 5;
        this.txtInput.size = 30;
        this.userNameC.addChild(this.txtInput);
        this.txtInput.text = this.inputStr;
    };
    Login.prototype.btnLoginTap = function (e) {
        this.inputStr = this.txtInput.text;
        if (!this.inputStr) {
            this.restore();
            return;
        }
        this.requestLogin();
        this.restore();
    };
    Login.prototype.requestLogin = function () {
        HttpRequest.i().post("http://192.168.2.77:3000/api/login", function (response) {
            var _res = JSON.parse(response);
            // console.log("Login => requestLogin response:", _res);
            var _lInfo = {
                sdkAppID: _res.sdkAppID,
                appIDAt3rd: _res.sdkAppID,
                identifier: _res.identifier,
                accountType: _res.accountType,
                userSig: _res.userSig,
                identifierNick: _res.identifierNick,
                headurl: _res.headurl
            };
            QWebIm.i().init(_res.avChatRoomId, _lInfo);
        }, { username: this.inputStr });
    };
    Login.prototype.applyJoinBigGroup = function (e) {
        var _msg = {
            text: QWebIm.i().loginInfo.identifierNick + " join~!",
            type: QWebImType.ROOM_ENTER,
            xxoo: "xxxxxxooooo"
        };
        QWebIm.i().onSendMsg(_msg);
        this.remove();
    };
    Login.prototype.remove = function () {
        this.btnLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLoginTap, this);
        QWebIm.i().removeEventListener(QWebImEvent.APPLYJOINBIGGROUPEVENT, this.applyJoinBigGroup, this);
        if (this.parent)
            this.parent.removeChild(this);
    };
    return Login;
}(ComponentBase));
__reflect(Login.prototype, "Login");
//# sourceMappingURL=Login.js.map