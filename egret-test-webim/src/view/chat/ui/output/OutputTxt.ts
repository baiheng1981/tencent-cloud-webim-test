class OutputTxt extends eui.Group {
    private skin: OutputBase;

    private msgItem:MsgItem;

    public constructor(_msg:MsgItem, _w:number=530, _h:number=30) {
        super();
        this.width = _w;
        this.height = _h;
        this.msgItem = _msg;

        this.init();
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    private addStage(e:egret.Event): void {

    }

    private init(): void {
        if (this.msgItem.isSend) {
            this.update1();
        } else {
            this.update0();
        }
    }

    private update0(): void {
        this.skin = new OutputTxt0(this.msgItem);
        this.addChild(this.skin);
        this.skin.x = 10;
        this.skin.y = 0;
        this.height = this.skin.height;
    }
    private update1(): void {
        this.skin = new OutputTxt1(this.msgItem);
        this.addChild(this.skin);
        this.skin.x = this.width - this.skin.width - 30;
        this.skin.y = 0;
        this.height = this.skin.height;
    }

}