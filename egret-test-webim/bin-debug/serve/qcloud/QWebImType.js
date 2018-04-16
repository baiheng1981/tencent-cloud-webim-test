var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QWebImType = (function () {
    function QWebImType() {
    }
    /** 进入房间 */
    QWebImType.ROOM_ENTER = "ROOM_ENTER";
    /** 退出房间 */
    QWebImType.ROOM_QUIT = "ROOM_QUIT";
    /** 聊天 */
    QWebImType.MEMBER_CHAT = "MEMBER_CHAT";
    /** 私聊 */
    QWebImType.CHAT_PRIVATE = "CHAT_PRIVATE";
    return QWebImType;
}());
__reflect(QWebImType.prototype, "QWebImType");
//# sourceMappingURL=QWebImType.js.map