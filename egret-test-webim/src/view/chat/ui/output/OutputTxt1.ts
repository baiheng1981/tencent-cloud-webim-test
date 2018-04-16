class OutputTxt1 extends OutputBase {
    public txt: egret.TextField;

    public constructor(_item:MsgItem) {
        super();

        this.item = _item;
        // this.addEventListener(egret.Event.COMPLETE, this.complete, this);
        this.skinName = "resource/chat_ui/ChatOutputTxt1Skin.exml";
        this.init();
    }
    private complete(e:egret.Event): void {
        // console.log("complete:", this);
        // this.dispatchEvent( new egret.Event(egret.Event.COMPLETE) );
    }

    protected init(): void {
        this.txt = Util.createTextFiled(
            0xffffff,
            egret.TextFieldType.DYNAMIC,
            100,
            30,
            20,
            egret.VerticalAlign.MIDDLE,
            egret.HorizontalAlign.LEFT,
            5
        )
        this.txt.x = 10;
        this.txt.y = 5;
        this.addChild(this.txt);

        this.update(this.item);
    }

    public update(_item:MsgItem): void {
        this.item = _item;

        this.txt.width = 1000;
        this.txt.text = "[" + this.item.role + "] " +this.item.text;

        this.layout();
    }
    protected layout(): void {
        if (this.txt.textWidth > this.widthMax) {
            this.txt.width = this.widthMax;
        } else {
            this.txt.width = this.txt.textWidth;
        }
        this.txt.height = this.txt.textHeight;
        this.txtBox.width = this.txt.width + 20;
        this.txtBox.height = this.txt.textHeight + 10;
        this.width = this.txtBox.width + 10;
        this.height = this.txtBox.height;
    }
}