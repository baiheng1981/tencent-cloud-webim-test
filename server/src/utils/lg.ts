class lg {
    private static _instance:lg = null;
    public static i():lg {
        if(this._instance==null) this._instance = new lg();
        return this._instance;
    }

    styles = {
        'bold'          : ['\x1B[1m',  '\x1B[22m'],
        'italic'        : ['\x1B[3m',  '\x1B[23m'],
        'underline'     : ['\x1B[4m',  '\x1B[24m'],
        'inverse'       : ['\x1B[7m',  '\x1B[27m'],
        'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
        'white'         : ['\x1B[37m', '\x1B[39m'],
        'grey'          : ['\x1B[90m', '\x1B[39m'],
        'black'         : ['\x1B[30m', '\x1B[39m'],
        'blue'          : ['\x1B[34m', '\x1B[39m'],
        'cyan'          : ['\x1B[36m', '\x1B[39m'],
        'green'         : ['\x1B[32m', '\x1B[39m'],
        'magenta'       : ['\x1B[35m', '\x1B[39m'],
        'red'           : ['\x1B[31m', '\x1B[39m'],
        'yellow'        : ['\x1B[33m', '\x1B[39m'],
        'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
        'greyBG'        : ['\x1B[48m', '\x1B[49m'],
        'blackBG'       : ['\x1B[40m', '\x1B[49m'],
        'blueBG'        : ['\x1B[44m', '\x1B[49m'],
        'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
        'greenBG'       : ['\x1B[42m', '\x1B[49m'],
        'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
        'redBG'         : ['\x1B[41m', '\x1B[49m'],
        'yellowBG'      : ['\x1B[43m', '\x1B[49m']
    };

    isLog:boolean = true;
    to(_type:string, ...arg){
        _type = _type || '';
        let _TStyle:string[] = ['', ''];
        if(_type) {
            _TStyle = this.styles[_type];
        }
        if(this.isLog){
            console.log(_TStyle[0], ...arg, _TStyle[1]);
        }
    }
    log(...arg){
        console.log(...arg);
    }

    error(...arg){
        this.to('red', ...arg);
    }
    warning(...arg){
        this.to('yellow', ...arg);
    }
    success(...arg){
        this.to('green', ...arg);
    }
    info(...arg){
        this.to('grey', ...arg);
    }

    request(...arg){
        this.to('greenBG', ...arg);
    }
    response(...arg){
        this.to('cyanBG', ...arg);
    }

    ness(...arg){
        this.to('magentaBG', ...arg);
    }

}

export default lg.i();