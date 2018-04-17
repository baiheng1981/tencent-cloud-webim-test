class OutputTxt0 extends OutputBase {
    public txt: egret.TextField;

    public constructor(_item:MsgItem) {
        super();
        this.skinName = "resource/chat_ui/ChatOutputTxt0Skin.exml";

        this.item = _item;

        this.init();
    }

    protected init(): void {
        this.txt = Util.createTextFiled(
            0x333333,
            egret.TextFieldType.DYNAMIC,
            100,
            30,
            20,
            egret.VerticalAlign.MIDDLE,
            egret.HorizontalAlign.LEFT,
            5
        )
        this.txt.x = 20;
        this.txt.y = 5;
        this.addChild(this.txt);

        this.update(this.item);
    }

    public update(_item:MsgItem): void {
        // console.log("OutputTxt0 => update:", _item);
        this.item = _item;

        this.txt.width = 1000;
        // this.txt.text = "[" + this.item.role + "] " +this.item.text;
        this.txt.textFlow = <Array<egret.ITextElement>>[
            {text:"[" + this.item.role + "] ", style:{"textColor": 0x156877}},
            {text:this.item.text}
        ]

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