class ChatContainer extends BaseEuiComponent {
    constructor(_w:number=750, _h:number=500) {
        super(true);
        this.width = _w;
        this.height = _h;

        this.skinName = "resource/chat_skins/Chat_Skin.exml";
    }

    public playerListPanel:eui.Scroller;
    public outputPanel:eui.Scroller;

    public btnSend:eui.Button;

    protected init(): void {
        this.btnSend.label = "send";


    }





}