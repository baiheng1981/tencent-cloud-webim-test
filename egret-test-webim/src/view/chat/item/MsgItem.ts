class MsgItem {
    public text: string;
    public role: string;
    public index: number;
    public isSend: boolean;
    public type:string;// QWebImType

    constructor(_text:string, _role:string, _index:number=-1) {
        this.text = _text;
        this.role = _role;
        this.index = _index;
    }

}