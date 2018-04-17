class MsgItem {
    public text: string;
    public role: string;
    public index: number;
    public isSend: boolean;
    public type:string;// QWebImType

    public data:IQWebImMsg;

    constructor(_data:IQWebImMsg, _index:number=-1) {
        this.data = _data;

        this.text = (_data.content && _data.content["text"]) || "";
        this.role = _data.sender.nickname;
        this.type = _data.action;
        this.index = _index;
    }

}