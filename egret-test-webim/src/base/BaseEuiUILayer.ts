class BaseEuiUILayer extends eui.UILayer {

    public stopPropagation:boolean;

    public constructor(_stopPropagation:boolean=false) {
        super();
        this.stopPropagation = _stopPropagation;
        this.touchEnabled = false;
        this.touchThrough = true;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.toStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);

        if (this.stopPropagation == true) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tapHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.tapHandler, this);
        }
    }
    protected toStage(e:egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.toStage, this);
        this.init();
    }

    protected removeStage(e:egret.Event): void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
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