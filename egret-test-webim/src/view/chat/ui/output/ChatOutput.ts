class ChatOutput extends eui.Component implements eui.UIComponent {
    public ScrollerBox:eui.Scroller;
    public GroupOutput:eui.Group;

    private outputTxtList: OutputTxt[];
    private nextY: number;
    private disY:number = 10;
    private msgList: MsgItem[];

    public constructor(_w:number=550, _h:number=200) {
        super();
        this.width = _w;
        this.height = _h;

        this.skinName = "resource/chat_ui/ChatOutputSkin.exml";
    }

    protected partAdded(partName:string, instance:any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init(): void {
        console.log("ChatOutput => init");
        this.outputTxtList = [];
        this.msgList = [];
        this.nextY = this.disY;

        this.ScrollerBox.scrollPolicyH = eui.ScrollPolicy.OFF;
        QWebIm.i().addEventListener(QWebImEvent.ADDMSGGROUPEVENT, this.addMsgGroup, this);
    }

    private addMsgGroup(e:QWebImEvent): void {
        let _itemlist:MsgItem[] = [];
        let _els:QWebImItem[] = e.msgList;
        for (let i=0; i<_els.length; i++) {
            let _el:QWebImItem = _els[i];
            let _msgItem:MsgItem = new MsgItem(_el.data.text, _el.fromAccountNick);
            _msgItem.isSend = _el.isSend;
            _itemlist.push(_msgItem);
        }
        this.update(_itemlist);
    }

    public update(_msglist: MsgItem[]): void {
        // console.log("ChatOutput => update:", _msglist);
        this.msgList = this.msgList.concat(_msglist);
        let _opTxtList: OutputTxt[] = [];
        for (let i:number=0; i<_msglist.length; i++) {
            let _item:MsgItem = _msglist[i];
            let _opTxt: OutputTxt = new OutputTxt(_item, this.width);
            _opTxtList.push(_opTxt);
        }
        this.outputTxtList = this.outputTxtList.concat(_opTxtList);
        this.layout(_opTxtList);
    }
    private layout(_opTxtList: OutputTxt[]): void {
        for (let i:number=0; i<_opTxtList.length; i++) {
            let _opTxt: OutputTxt = _opTxtList[i];
            this.GroupOutput.addChild(_opTxt);
            _opTxt.x = 0;
            _opTxt.y = this.nextY;
            this.nextY += (_opTxt.height + this.disY);
        }
        this.viewportRender(null);
    }
    private outputTxtComplete(e:egret.Event): void {
        // console.log("xxxx:", e.target);
    }

    private viewportRender(e:egret.Event): void {
        if (this.ScrollerBox.viewport.scrollV < (this.ScrollerBox.viewport.contentHeight - this.ScrollerBox.viewport.height)) {
            this.ScrollerBox.viewport.scrollV = this.ScrollerBox.viewport.contentHeight - this.ScrollerBox.viewport.height;
        }
    }
}