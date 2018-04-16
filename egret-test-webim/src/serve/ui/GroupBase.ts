class GroupBase extends eui.Group {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    }
    private addStage(e:egret.Event):void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.init();
    }
    protected removeStage(e:egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.remove();
    }

    protected init(): void {

    }
    protected remove(): void {

    }



}