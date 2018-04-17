declare namespace webim {
    /** 登录身份相关参数集合，详见下面\n
     * sdkAppID:string          //用户标识接入SDK的应用ID，必填
     * appIDAt3rd: string
     * identifier: string       //用户帐号,必须是字符串类型，必填
     * accountType: number      //账号类型，必填
     * userSig: string          //鉴权Token，[必须是字符串类型，必填
     * identifierNick: string   //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
     * portrait: string          //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
     */
    interface LoginInfo {
        sdkAppID: string,
        appIDAt3rd: string,
        identifier: string,
        accountType: number,
        userSig: string,
        identifierNick: string,
        portrait: string
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

    /** function init
     *   sdk登录
     * params:
     *   loginInfo      - Object, 登录身份相关参数集合，详见下面
     *   {
     *     sdkAppID     - String, 用户标识接入SDK的应用ID，必填
     *     identifier   - String, 用户帐号,必须是字符串类型，必填
     *     accountType  - int, 账号类型，必填
     *     identifierNick   - String, 用户昵称，选填
     *     userSig      - String, 鉴权Token，必须是字符串类型，必填
     *   }
     *   listeners      - Object, 事件回调函数集合, 详见下面
     *   {
     *     onConnNotify - function(connInfo), 用于收到连接状态相关通知的回调函数,目前未使用
     *     jsonpCallback -function(rspData),//IE9(含)以下浏览器用到的jsonp回调函数
     *     onMsgNotify  - function(newMsgList), 用于收到消息通知的回调函数,
     *      newMsgList为新消息数组，格式为[Msg对象]
     *      使用方有两种处理回调: 1)处理newMsgList中的增量消息,2)直接访问webim.MsgStore获取最新的消息
     *     onGroupInfoChangeNotify  - function(groupInfo), 用于监听群组资料变更的回调函数,
     *          groupInfo为新的群组资料信息
     *     onGroupSystemNotifys - Object, 用于监听（多终端同步）群系统消息的回调函数对象
     *
     *   }
     *   options        - Object, 其它选项, 目前未使用
     * return:
     *   (无)
     */
    function login(loginInfo:LoginInfo, listeners:any, options?:any, cbOk?:Function, cbErr?:Function);
    /** function logout
     *   sdk登出
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    function logout(cbOk, cbErr?);
    /** function syncMsgs
     *   拉取最新C2C消息
     *   一般不需要使用方直接调用, SDK底层会自动同步最新消息并通知使用方, 一种有用的调用场景是用户手动触发刷新消息
     * params:
     *   cbOk   - function(msgList)类型, 当同步消息成功时的回调函数, msgList为新消息数组，格式为[Msg对象],
     *            如果此参数为null或undefined则同步消息成功后会像自动同步那样回调cbNotify
     *   cbErr  - function(err)类型, 当同步消息失败时的回调函数, err为错误对象
     * return:
     *   (无)
     */
    function syncMsgs(cbOk, cbErr?);
    /** function getC2CHistoryMsgs
     * 拉取C2C漫游消息
     * params:
     *   options    - 请求参数
     *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    function getC2CHistoryMsgs(options, cbOk?, cbErr?);
    /** function syncGroupMsgs
     * 拉取群漫游消息
     * params:
     *   options    - 请求参数
     *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    function syncGroupMsgs(options, cbOk?, cbErr?);
    /** function sendMsg
     *   发送一条消息
     * params:
     *   msg    - webim.Msg类型, 要发送的消息对象
     *   cbOk   - function()类型, 当发送消息成功时的回调函数
     *   cbErr  - function(err)类型, 当发送消息失败时的回调函数, err为错误对象
     * return:
     *   (无)
     */
    function sendMsg(msg, cbOk?, cbErr?);
    /** 进入大群 */
    function applyJoinBigGroup(options, cbOk?, cbErr?);
    /** 退出大群 */
    function quitBigGroup(options, cbOk?, cbErr?);
    /** 设置jsonp返回的值 */
    function setJsonpLastRspData(rspData);
    /** 上报c2c消息已读 */
    function c2CMsgReaded(options, cbOk?, cbErr?);
    /** function getGroupInfo
     *   读取群详细资料-高级接口
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    function getGroupInfo(options, cbOk, cbErr);
    /** function getGroupMemberInfo
     *   获取群组成员列表
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    function getGroupMemberInfo(options, cbOk, cbErr);
    /** 获取个人资料接口，可用于搜索用户 */
    function getProfilePortrait(options, cbOk, cbErr);

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