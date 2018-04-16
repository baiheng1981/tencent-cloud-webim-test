class OutputTxtSys extends OutputBase {
    public txt: egret.TextField;

    public constructor(_item:MsgItem) {
        super();
        this.skinName = "resource/chat_ui/ChatOutputTxtSysSkin.exml";

        this.item = _item;

        this.init();
    }

    protected init(): void {
        this.txt = Util.createTextFiled(
            0xaaaaaa,
            egret.TextFieldType.DYNAMIC,
            100,
            30,
            20,
            egret.VerticalAlign.MIDDLE,
            egret.HorizontalAlign.LEFT,
            5
        )
        this.txt.x = 40 + 20;
        this.txt.y = 10;
        this.addChild(this.txt);

        this.update(this.item);
    }

    public update(_item:MsgItem): void {
        // console.log("OutputTxt0 => update:", _item);
        this.item = _item;

        this.txt.width = 1000;
        this.txt.text = "[Sys] " +this.item.text;

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
        this.txtBox.height = this.txt.textHeight + 20;
        this.width = this.txtBox.width + 10 + 45;
        this.height = this.txtBox.height;
    }
}