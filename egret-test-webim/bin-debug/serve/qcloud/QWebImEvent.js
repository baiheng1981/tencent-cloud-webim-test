var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var QWebImEvent = (function (_super) {
    __extends(QWebImEvent, _super);
    function QWebImEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    /** 收到新消息 */
    QWebImEvent.ADDMSGGROUPEVENT = "addMsgGroupEvent";
    /** 私聊消息 */
    QWebImEvent.ADDMSGPRIVATEEVENT = "addMsgPrivateEvent";
    /** 加入大群成功 */
    QWebImEvent.APPLYJOINBIGGROUPEVENT = "applyJoinBigGroupEvent";
    /** 群组系统消息 */
    QWebImEvent.SHOWGROUPSYSTEMMSGEVENT = "showGroupSystemMsgEvent";
    return QWebImEvent;
}(egret.Event));
__reflect(QWebImEvent.prototype, "QWebImEvent");
//# sourceMappingURL=QWebImEvent.js.map