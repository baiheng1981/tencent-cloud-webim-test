class OutputBase extends eui.Component implements eui.UIComponent {
    public txtBox: eui.Group;

    public widthMin: number = 100;
    public widthMax: number = 300;
    public heightMin: number = 30;
    public heightMax: number = Number.MAX_VALUE;

    public item:MsgItem;

    public constructor() {
        super();
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }

    protected partAdded(partName:string, instance:any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();

    }

    protected addStage(e:egret.Event): void {
        this.init();
    }

    protected init(): void {

    }

    public update(_item:MsgItem): void {

    }
    protected layout(): void {

    }
}