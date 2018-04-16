class QWebImEvent extends egret.Event {
    constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable);
    }

    public msgList:QWebImItem[];
    public msg:QWebImItem;

    public str:string; //群组系统消息


    /** 收到新消息 */
    public static ADDMSGGROUPEVENT:string = "addMsgGroupEvent";
    /** 私聊消息 */
    public static ADDMSGPRIVATEEVENT:string = "addMsgPrivateEvent";


    /** 加入大群成功 */
    public static APPLYJOINBIGGROUPEVENT:string = "applyJoinBigGroupEvent";

    /** 群组系统消息 */
    public static SHOWGROUPSYSTEMMSGEVENT:string = "showGroupSystemMsgEvent";









}