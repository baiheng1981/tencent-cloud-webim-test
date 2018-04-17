class ChatScene extends eui.Group {
    private chatOutput:ChatOutput;
    private chatInput:ChatInput;

    public constructor(_w:number=500, _h:number=400) {
        super();

        this.width = _w;
        this.height = _h;

        this.verticalCenter = 0;
        this.horizontalCenter = 0;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        QWebIm.i().addEventListener(QWebImEvent.APPLYJOINBIGGROUPEVENT, this.applyJoinBigGroup, this);
    }
    private addStage(e:egret.Event): void {
        this.init();
    }

    private init(): void {
        this.chatOutput = new ChatOutput(this.width, this.height - 55);
        this.addChild(this.chatOutput);

        this.chatInput = new ChatInput(this.width);
        this.addChild(this.chatInput);
        this.chatInput.x = this.chatOutput.x;
        this.chatInput.y = this.chatOutput.y + this.chatOutput.height + 5;

    }


    private applyJoinBigGroup(e:QWebImEvent): void {
        QWebIm.i().getGroupMemberPortrait().then((resp) => {
            console.log("QWebIm.i().getGroupMemberPortrait:", resp)
        });
    }








}