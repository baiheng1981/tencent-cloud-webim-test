class Util {
    public static randomInt(min, max):number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    public static pad0(num, n) {
        return Array( n>num ? ((n-num)+"").length+1 : 0 ).join("0")+num;
    }

    public static createTextFiled(
        _color:number=0x000000,
        _type:string=egret.TextFieldType.INPUT,
        _width:number=100,
        _height:number=30,
        _size:number=20,
        _verticalAlign:string=egret.VerticalAlign.MIDDLE,
        _textAlign:string=egret.HorizontalAlign.LEFT,
        _lineSpacing:number = 5,
        _background:boolean=false,
        _backgroundColor:number=0xffffff
    ): egret.TextField {
        let txtInput:egret.TextField = new egret.TextField();
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
    }
}