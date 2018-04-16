declare namespace webim {
    /** 登录身份相关参数集合，详见下面
     * sdkAppID:string          //用户标识接入SDK的应用ID，必填
     * appIDAt3rd: string
     * identifier: string       //用户帐号,必须是字符串类型，必填
     * accountType: number      //账号类型，必填
     * userSig: string          //鉴权Token，[必须是字符串类型，必填
     * identifierNick: string   //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
     * headurl: string          //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
     */
    interface LoginInfo {
        sdkAppID: string,
        appIDAt3rd: string,
        identifier: string,
        accountType: number,
        userSig: string,
        identifierNick: string,
        headurl: string
    }
    /** 聊天类型
     * C2C      "C2C" //私聊
     * GROUP    "GROUP" //群聊
     */
    namespace SESSION_TYPE {
        var C2C:string
        var GROUP:string
    }
    /** 群消息子类型
     * COMMON       0 //普通消息
     * LOVEMSG      1 //点赞消息
     * TIP          2 //提示消息
     * REDPACKET    3 //红包消息
     */
    enum GROUP_MSG_SUB_TYPE {
        COMMON,
        LOVEMSG,
        TIP,
        REDPACKET
    }
    /** c2c消息子类型
     * COMMON       0 //普通消息
     */
    enum C2C_MSG_SUB_TYPE {
        COMMON
    }
    /** 长轮询连接状态
     *  'INIT':         -1, //初始化
        'ON':           0, //连接正常
        'RECONNECT':    1, //连接恢复正常
        'OFF':          9999 //连接已断开,可能是用户网络问题，或者长轮询接口报错引起的
     */
    enum CONNECTION_STATUS {
        INIT,
        ON,
        RECONNECT,
        OFF
    }
    /** 群提示消息类型
     *  "JOIN": 1, //加入群组
        "QUIT": 2, //退出群组
        "KICK": 3, //被踢出群组
        "SET_ADMIN": 4, //被设置为管理员
        "CANCEL_ADMIN": 5, //被取消管理员
        "MODIFY_GROUP_INFO": 6, //修改群资料
        "MODIFY_MEMBER_INFO": 7 //修改群成员信息
     */
    enum GROUP_TIP_TYPE {
        JOIN,
        QUIT,
        KICK,
        SET_ADMIN,
        CANCEL_ADMIN,
        MODIFY_GROUP_INFO,
        MODIFY_MEMBER_INFO
    }

    /** 消息元素类型
     *  'TEXT': 'TIMTextElem', //文本
        'FACE': 'TIMFaceElem', //表情
        'IMAGE': 'TIMImageElem', //图片
        'CUSTOM': 'TIMCustomElem', //自定义
        'SOUND': 'TIMSoundElem', //语音,只支持显示
        'FILE': 'TIMFileElem', //文件,只支持显示
        'LOCATION': 'TIMLocationElem', //地理位置
        'GROUP_TIP': 'TIMGroupTipElem' //群提示消息,只支持显示
     */
    namespace MSG_ELEMENT_TYPE {
        var TEXT:string;
        var FACE:string;
        var IMAGE:string;
        var CUSTOM:string;
        var SOUND:string;
        var FILE:string;
        var LOCATION:string;
        var GROUP_TIP:string;
    }




    function login(loginInfo:LoginInfo, listeners:any, options?:any, cbOk?:Function, cbErr?:Function);
    function logout(cbOk, cbErr?);
    function syncMsgs(cbOk, cbErr?);
    function getC2CHistoryMsgs(options, cbOk?, cbErr?);
    function syncGroupMsgs(options, cbOk?, cbErr?);
    function sendMsg(msg, cbOk?, cbErr?);
    function applyJoinBigGroup(options, cbOk?, cbErr?);
    function quitBigGroup(options, cbOk?, cbErr?);
    function setJsonpLastRspData(rspData);
    function c2CMsgReaded(options, cbOk?, cbErr?);

    namespace Tool {
        function getQueryString(name:string):string;
        function formatTimeStamp(timestamp, format?):any;
    }
    namespace Log {
        function info(logStr:any): void ;
        function warn(logStr:any): void ;
        function error(logStr:any): void ;
    }
    class Msg {
        constructor(sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick);

        public addText(text):any;
        public addCustom(custom):any;

        public getFromAccount():string;
        public getFromAccountNick():string;
        public getTime():any;
        public getElems():Msg.Elem[];
        public getIsSend():boolean;
    }
    namespace Msg {
        class Elem {
            public type:any;
            public content:any;

            constructor(type, value);

            public Face:Elem.Face;
            public Text:Elem.Text;
            public custom:Elem.Custom;

            public getContent():any;
            public getType():any;
        }
        namespace Elem {
            class Text {
                public text:any;

                constructor(text);
            }
            class Face {
                public index:any;
                public data:any;

                constructor(index, data);
            }
            class Custom {
                constructor(data, desc, ext);

                public getData():any;
                public getDesc():any;
                public getExt():any;
                public toHtml():any;
            }
        }

    }




    class Session {
        constructor(type, id, name, icon, time, seq?);
    }
    namespace MsgStore {
        function sessMap();
    }

}