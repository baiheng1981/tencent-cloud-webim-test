class BaseEuiComponent extends eui.Component implements eui.UIComponent {
    protected partAdded(partName:string, instance:any): void {
        super.partAdded(partName, instance);
    }
    protected childrenCreated(): void {
        super.childrenCreated();
    }

    public stopPropagation:boolean;

    public constructor(_stopPropagation:boolean=false){
        super();
        this.stopPropagation = _stopPropagation;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);

        if (this.stopPropagation == true) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.tapHandler, this);
        }
    }

    protected addStage(e:egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        this.init();
    }
    protected removeStage(e:egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.tapHandler, this);
    }

    protected init(): void {

    }

    protected tapHandler(e:egret.TouchEvent): void {
        if (this.stopPropagation == true) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}