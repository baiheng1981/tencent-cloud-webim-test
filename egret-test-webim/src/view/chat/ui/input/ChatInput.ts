class ChatInput extends ComponentBase {
    public BtnSend: eui.Button;
    public EmojiBtn: eui.Image;
    public txtInput: egret.TextField;

    private inputStr: string;


    public constructor(_w:number=550) {
        super();
        this.width = _w;

        this.skinName = "resource/chat_ui/ChatInputSkin.exml";
    }

    protected init(): void {
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


    }

    private restore(): void {
        this.txtInput.text = "";

        this.txtInput.setFocus();
    }


    private btnSendTap(e:egret.TouchEvent): void {
        let _text: string = this.txtInput.text;
        if (!_text) {
            this.restore();
            return;
        }

        let _msg:IQWebImMsg = {
            sender: {
                userId: QWebIm.i().loginInfo.identifier,
                nickname: QWebIm.i().loginInfo.identifierNick
            },
            action: QWebImType.MEMBER_CHAT,
            content: {
                text: _text
            }
        }
        QWebIm.i().onSendMsg(_msg);

        this.restore();
    }
    private emojiBtnTap(e:egret.TouchEvent): void {

    }






}