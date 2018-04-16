class Login extends ComponentBase {
    public btnLogin:eui.Button;

    public userNameC:eui.Group;
    public bgUserName:eui.Image;
    public txtInput:egret.TextField;

    private inputStr:string;

    public constructor() {
        super();
        this.skinName = "resource/chat_ui/LoginSkin.exml";

        this.verticalCenter = 0;
        this.horizontalCenter = 0;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    protected init(): void {
        this.btnLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLoginTap, this);
        QWebIm.i().addEventListener(QWebImEvent.APPLYJOINBIGGROUPEVENT, this.applyJoinBigGroup, this);
    }
    private addStage(e:egret.Event):void {
        this.inputStr = "";

        setTimeout(() => {
            this.createInput();
        }, 100);
    }
    private restore():void {
        this.inputStr = "";
        if (this.txtInput) {
            this.txtInput.text = this.inputStr;
            this.txtInput.setFocus();
        }
    }
    private createInput(): void {
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
    }

    private btnLoginTap(e:egret.TouchEvent): void {
        this.inputStr = this.txtInput.text;
        if (!this.inputStr) {
            this.restore();
            return;
        }

        this.requestLogin();

        this.restore();
    }

    private requestLogin(): void {
        HttpRequest.i().post("http://192.168.2.77:3000/api/login", (response) => {
            let _res = JSON.parse(response);
            // console.log("Login => requestLogin response:", _res);
            let _lInfo:webim.LoginInfo = {
                sdkAppID: _res.sdkAppID,
                appIDAt3rd: _res.sdkAppID,
                identifier: _res.identifier,
                accountType: _res.accountType,
                userSig:_res.userSig,
                identifierNick: _res.identifierNick,
                headurl: _res.headurl
            }
            QWebIm.i().init(_res.avChatRoomId, _lInfo);
        }, { username:this.inputStr });
    }

    private applyJoinBigGroup(e:QWebImEvent): void {
        let _msg = {
            text: QWebIm.i().loginInfo.identifierNick + " join~!",
            type: QWebImType.MEMBER_CHAT,
            xxoo: "xxxxxxooooo"
        }
        QWebIm.i().onSendMsg(_msg);
        this.remove();
    }




    private remove(): void {
        this.btnLogin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLoginTap, this);
        QWebIm.i().removeEventListener(QWebImEvent.APPLYJOINBIGGROUPEVENT, this.applyJoinBigGroup, this);
        if (this.parent) this.parent.removeChild(this);
    }


}