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
var QWebIm = (function (_super) {
    __extends(QWebIm, _super);
    function QWebIm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //帐号模式，0-表示独立模式，1-表示托管模式
        _this.accountMode = 0;
        _this.avChatRoomId = ''; //默认房间群ID
        _this.selToID = ''; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
        _this.selSess = null; //当前聊天会话
        //默认群组头像(选填)
        _this.selSessHeadUrl = '';
        //当前用户身份
        _this.loginInfo = {
            "sdkAppID": "",
            "appIDAt3rd": "",
            "identifier": "",
            "accountType": 0,
            "userSig": "",
            "identifierNick": "",
            "headurl": '' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
        };
        //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
        //注意每个数字代表的含义，比如，
        //1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
        _this.onGroupSystemNotifys = {
            "5": _this.onDestoryGroupNotify,
            "11": _this.onRevokeGroupNotify,
            "255": _this.onCustomGroupNotify //用户自定义通知(默认全员接收)
        };
        _this.options = {
            "isAccessFormalEnv": true,
            "isLogOn": false //是否在浏览器控制台打印sdk日志
        };
        //监听事件
        _this.listeners = {
            "jsonpCallback": _this.jsonpCallback.bind(_this) //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
            ,
            "onMsgNotify": _this.onMsgNotify.bind(_this) //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件
            ,
            "onBigGroupMsgNotify": _this.onBigGroupMsgNotify.bind(_this) //监听新消息(直播聊天室)事件，直播场景下必填
            ,
            "onGroupInfoChangeNotify": _this.onGroupInfoChangeNotify.bind(_this) //监听群资料变化事件，选填
            ,
            "onGroupSystemNotifys": _this.onGroupSystemNotifys //监听（多终端同步）群系统消息事件，必填
            ,
            "onProfileSystemNotifys": _this.onProfileModifyNotify.bind(_this) //监听资料系统（自己或好友）通知事件，选填
        };
        return _this;
        /** 监听 end ************************************************************************************/
    }
    QWebIm.i = function () {
        if (!this._instance)
            this._instance = new QWebIm();
        return this._instance;
    };
    QWebIm.prototype.init = function (_avChatRoomId, _loginInfo) {
        console.log("webim init:", _avChatRoomId, _loginInfo);
        this.avChatRoomId = _avChatRoomId;
        this.selToID = this.avChatRoomId;
        this.selType = webim.SESSION_TYPE.GROUP; //群聊
        this.loginInfo = _loginInfo;
        if (this.accountMode == 1) {
        }
        else {
            console.log("独立模式");
            this.sdkLogin();
        }
    };
    ;
    /** 登录 start ************************************************************************************/
    //sdk登录
    QWebIm.prototype.sdkLogin = function () {
        var _this = this;
        // console.log("sdkLogin : ", this.loginInfo)
        //web sdk 登录
        webim.login(this.loginInfo, this.listeners, this.options, function (resp) {
            console.log("webim登录成功:", resp);
            //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
            _this.loginInfo.identifierNick = resp.identifierNick; //设置当前用户昵称
            // webim.Log.info('webim登录成功');
            _this.applyJoinBigGroup(); //加入大群
        }, function (err) {
            console.log(err);
        });
    };
    //进入大群
    QWebIm.prototype.applyJoinBigGroup = function () {
        var _this = this;
        var options = {
            'GroupId': this.avChatRoomId //群id
        };
        webim.applyJoinBigGroup(options, function (resp) {
            //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
            if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
                console.log("进群成功", resp);
                // webim.Log.info('进群成功');
                _this.selToID = _this.avChatRoomId;
                var ime = new QWebImEvent(QWebImEvent.APPLYJOINBIGGROUPEVENT);
                _this.dispatchEvent(ime);
            }
            else {
                console.log('进群失败');
            }
        }, function (err) {
            console.log("applyJoinBigGroup error:", err);
            if (err.ErrorCode == 10013) {
                var ime = new QWebImEvent(QWebImEvent.APPLYJOINBIGGROUPEVENT);
                _this.dispatchEvent(ime);
            }
        });
    };
    /** 退出大群 */
    QWebIm.prototype.quitBigGroup = function () {
        var _this = this;
        var options = {
            'GroupId': this.avChatRoomId //群id
        };
        webim.quitBigGroup(options, function (resp) {
            webim.Log.info('退群成功');
            _this.logout();
        }, function (err) {
            console.log(err);
        });
    };
    /** 登出 */
    QWebIm.prototype.logout = function () {
        var _this = this;
        webim.logout(function (resp) {
            webim.Log.info('登出成功');
            _this.loginInfo.identifier = null;
            _this.loginInfo.userSig = null;
        }, function (err) {
            console.log(err);
        });
    };
    /** 发送消息(普通消息)
     * msgData: {
     *              data:{},
                    desc:"",
                    ext:""
                }
     */
    QWebIm.prototype.onSendMsg = function (msgData, cbOk, cbErr) {
        if (!this.loginInfo.identifier) {
            if (this.accountMode == 0) {
                this.sdkLogin();
            }
            return;
        }
        if (!this.selSess) {
            this.selSess = new webim.Session(this.selType, this.selToID, this.selToID, this.selSessHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var isSend = true; //是否为自己发送
        var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
        var subType; //消息子类型
        if (this.selType == webim.SESSION_TYPE.GROUP) {
            subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
        }
        else {
            subType = webim.C2C_MSG_SUB_TYPE.COMMON;
        }
        console.log("发送消息：", subType);
        var msg = new webim.Msg(this.selSess, isSend, seq, random, msgTime, this.loginInfo.identifier, subType, this.loginInfo.identifierNick);
        var customObj = new webim.Msg.Elem.Custom(JSON.stringify(msgData), "", "");
        msg.addCustom(customObj);
        webim.sendMsg(msg, function (resp) {
            console.log("发消息成功:", resp);
            // webim.Log.info("发消息成功");
            return cbOk && cbOk(resp);
        }, function (err) {
            console.log("发消息失败:", err);
            // webim.Log.error("发消息失败:" + err.ErrorInfo);
            return cbErr && cbErr(err);
        });
    };
    /** 登录 end **********************************************************************************/
    /** 接收信息 start ****************************************************************************/
    //IE9(含)以下浏览器用到的jsonp回调函数
    QWebIm.prototype.jsonpCallback = function (rspData) {
        //设置接口返回的数据
        webim.setJsonpLastRspData(rspData);
    };
    QWebIm.prototype.onGroupInfoChangeNotify = function (newNotify) {
        console.log("onGroupInfoChangeNotify:", newNotify);
    };
    //监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
    QWebIm.prototype.onMsgNotify = function (newMsgList) {
        console.log("onMsgNotify:", newMsgList);
        var newMsg;
        for (var j in newMsgList) {
            newMsg = newMsgList[j];
            this.handlderMsg(newMsg); //处理新消息
        }
    };
    QWebIm.prototype.onBigGroupMsgNotify = function (newMsgList) {
        console.log("onBigGroupMsgNotify:", newMsgList);
    };
    QWebIm.prototype.onProfileModifyNotify = function (notify) {
        console.log("onProfileModifyNotify:", notify);
    };
    //处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
    QWebIm.prototype.handlderMsg = function (msg) {
        // console.log("handlderMsg:", msg);
        /** 获取会话类型
         * webim.SESSION_TYPE.GROUP-群聊，
         * webim.SESSION_TYPE.C2C-私聊，
         */
        var sessType = msg.getSession().type();
        /** 获取消息子类型
         * 会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
         * 会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
         */
        var subType = msg.getSubType();
        var ime;
        switch (sessType) {
            case webim.SESSION_TYPE.C2C://私聊消息
                console.log("私聊消息....", msg);
                ime = new QWebImEvent(QWebImEvent.ADDMSGPRIVATEEVENT);
                break;
            case webim.SESSION_TYPE.GROUP://普通群消息，对于直播聊天室场景，不需要作处理
                console.log("普通群新消息:", msg, sessType, subType);
                ime = new QWebImEvent(QWebImEvent.ADDMSGGROUPEVENT);
                break;
        }
        ime.msgList = this.parseMsg(msg);
        this.dispatchEvent(ime);
    };
    QWebIm.prototype.parseMsg = function (msg) {
        var _itemlist = [];
        var _els = msg.getElems();
        for (var i = 0; i < _els.length; i++) {
            var _el = _els[i];
            var type = _el.getType(); //获取元素类型
            var content = _el.getContent(); //获取元素对象
            // console.log(_el);
            if (type == webim.MSG_ELEMENT_TYPE.CUSTOM) {
                var data = JSON.parse(content.getData());
                var _item = new QWebImItem(data);
                _item.fromAccount = msg.getFromAccount();
                _item.fromAccountNick = msg.getFromAccountNick();
                _item.isSend = msg.getIsSend();
                _item.time = msg.getTime();
                _itemlist.push(_item);
            }
        }
        return _itemlist;
    };
    /** 接收信息 end ****************************************************************************/
    /** 监听 start ************************************************************************************/
    //监听 解散群 系统消息
    QWebIm.prototype.onDestoryGroupNotify = function (notify) {
        webim.Log.warn("执行 解散群 回调：" + JSON.stringify(notify));
        console.log("执行 解散群 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[群被解散]";
        var content = "群主" + notify.Operator_Account + "已解散该群";
        this.showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    };
    //监听 群被回收 系统消息
    QWebIm.prototype.onRevokeGroupNotify = function (notify) {
        webim.Log.warn("执行 群被回收 回调：" + JSON.stringify(notify));
        console.log("执行 群被回收 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[群被回收]";
        var content = "该群已被回收";
        this.showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    };
    //监听 用户自定义 群系统消息
    QWebIm.prototype.onCustomGroupNotify = function (notify) {
        webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
        console.log("执行 用户自定义系统消息 回调：" + JSON.stringify(notify));
        var reportTypeCh = "[用户自定义系统消息]";
        var content = notify.UserDefinedField; //群自定义消息数据
        this.showGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    };
    //显示一条群组系统消息
    QWebIm.prototype.showGroupSystemMsg = function (type, typeCh, group_id, group_name, msg_content, msg_time) {
        var sysMsgStr = "收到一条群系统消息: type=" + type + ", typeCh=" + typeCh + ",群ID=" + group_id + ", 群名称=" + group_name + ", 内容=" + msg_content + ", 时间=" + webim.Tool.formatTimeStamp(msg_time);
        webim.Log.warn(sysMsgStr);
        console.log("showGroupSystemMsg:", sysMsgStr);
        var ime = new QWebImEvent(QWebImEvent.SHOWGROUPSYSTEMMSGEVENT);
        ime.str = sysMsgStr;
        this.dispatchEvent(ime);
    };
    return QWebIm;
}(egret.EventDispatcher));
__reflect(QWebIm.prototype, "QWebIm");
/**
 * 接收数据
 */
var QWebImItem = (function () {
    function QWebImItem(_data) {
        this.data = _data;
    }
    return QWebImItem;
}());
__reflect(QWebImItem.prototype, "QWebImItem");
//# sourceMappingURL=QWebIm.js.map