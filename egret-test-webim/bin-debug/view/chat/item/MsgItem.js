var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MsgItem = (function () {
    function MsgItem(_text, _role, _index) {
        if (_index === void 0) { _index = -1; }
        this.text = _text;
        this.role = _role;
        this.index = _index;
    }
    return MsgItem;
}());
__reflect(MsgItem.prototype, "MsgItem");
//# sourceMappingURL=MsgItem.js.map