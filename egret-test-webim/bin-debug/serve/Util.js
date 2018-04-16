var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Util.pad0 = function (num, n) {
        return Array(n > num ? ((n - num) + "").length + 1 : 0).join("0") + num;
    };
    Util.createTextFiled = function (_color, _type, _width, _height, _size, _verticalAlign, _textAlign, _lineSpacing, _background, _backgroundColor) {
        if (_color === void 0) { _color = 0x000000; }
        if (_type === void 0) { _type = egret.TextFieldType.INPUT; }
        if (_width === void 0) { _width = 100; }
        if (_height === void 0) { _height = 30; }
        if (_size === void 0) { _size = 20; }
        if (_verticalAlign === void 0) { _verticalAlign = egret.VerticalAlign.MIDDLE; }
        if (_textAlign === void 0) { _textAlign = egret.HorizontalAlign.LEFT; }
        if (_lineSpacing === void 0) { _lineSpacing = 5; }
        if (_background === void 0) { _background = false; }
        if (_backgroundColor === void 0) { _backgroundColor = 0xffffff; }
        var txtInput = new egret.TextField();
        txtInput.textColor = _color;
        // type
        txtInput.type = _type;
        //
        txtInput.width = _width;
        txtInput.height = _height;
        txtInput.size = _size;
        txtInput.verticalAlign = _verticalAlign;
        txtInput.textAlign = _textAlign;
        txtInput.lineSpacing = _lineSpacing;
        // bg
        txtInput.background = _background;
        txtInput.backgroundColor = _backgroundColor;
        return txtInput;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map