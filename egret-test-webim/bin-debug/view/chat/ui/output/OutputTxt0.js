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
var OutputTxt0 = (function (_super) {
    __extends(OutputTxt0, _super);
    function OutputTxt0(_item) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/chat_ui/ChatOutputTxt0Skin.exml";
        _this.item = _item;
        _this.init();
        return _this;
    }
    OutputTxt0.prototype.init = function () {
        this.txt = Util.createTextFiled(0x333333, egret.TextFieldType.DYNAMIC, 100, 30, 20, egret.VerticalAlign.MIDDLE, egret.HorizontalAlign.LEFT, 5);
        this.txt.x = 20;
        this.txt.y = 5;
        this.addChild(this.txt);
        this.update(this.item);
    };
    OutputTxt0.prototype.update = function (_item) {
        // console.log("OutputTxt0 => update:", _item);
        this.item = _item;
        this.txt.width = 1000;
        this.txt.text = "[" + this.item.role + "] " + this.item.text;
        this.layout();
    };
    OutputTxt0.prototype.layout = function () {
        if (this.txt.textWidth > this.widthMax) {
            this.txt.width = this.widthMax;
        }
        else {
            this.txt.width = this.txt.textWidth;
        }
        this.txt.height = this.txt.textHeight;
        this.txtBox.width = this.txt.width + 20;
        this.txtBox.height = this.txt.textHeight + 10;
        this.width = this.txtBox.width + 10;
        this.height = this.txtBox.height;
    };
    return OutputTxt0;
}(OutputBase));
__reflect(OutputTxt0.prototype, "OutputTxt0");
//# sourceMappingURL=OutputTxt0.js.map