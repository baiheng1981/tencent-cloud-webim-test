class Scene extends eui.UILayer {

    private chatScene:ChatScene;
    private login:Login;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    private addStage(e:egret.Event): void {
        this.init();
    }

    private init(): void {
        this.chatInit();

        this.login = new Login();
        this.addChild(this.login);
    }


    private chatInit(): void {
        this.chatScene = new ChatScene(700, 400);
        this.addChild(this.chatScene);
    }

}