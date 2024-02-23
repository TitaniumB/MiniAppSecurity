(global.webpackJsonp = global.webpackJsonp || []).push([ [ "pages/login/login" ], {
    17: function(e, o, n) {
        n.r(o);
        var t = n(18), a = n.n(t);
        for (var l in t) "default" !== l && function(e) {
            n.d(o, e, function() {
                return t[e];
            });
        }(l);
        o.default = a.a;
    },
    18: function(e, o, n) {},
    6: function(e, o, n) {
        n.r(o);
        var t = n(7);
        for (var a in t) "default" !== a && function(e) {
            n.d(o, e, function() {
                return t[e];
            });
        }(a);
        n(17);
        var l = n(19), s = Object(l.default)(t.default, void 0, void 0, !1, null, null, null, !1, void 0, void 0);
        s.options.__file = "App.vue", o.default = s.exports;
    },
    7: function(e, o, n) {
        n.r(o);
        var t = n(8), a = n.n(t);
        for (var l in t) "default" !== l && function(e) {
            n.d(o, e, function() {
                return t[e];
            });
        }(l);
        o.default = a.a;
    },
    79: function(e, o, n) {
        (function(e) {
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            n(5);
            o(n(2));
            e(o(n(80)).default);
        }).call(this, n(1).createPage);
    },
    8: function(e, o, n) {
        (function(e) {
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = void 0;
            var t = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }(n(9)), a = {
                globalData: {
                    sessionId: "",
                    needLogin: !1,
                    needRealNameAuth: !1,
                    pathDetails: [],
                    qrcode: "",
                    evaluate: !0,
                    evalInvokeId: "",
                    showDefault: !0,
                    showEvaluation: !1,
                    location: {},
                    isNew: !1,
                    cardId: "",
                    orderType: "",
                    guideAuthLocaton: !1,
                    guideAuthZhima: !1,
                    phoneResponse: "",
                    phoneSign: "",
                    userInfo: {
                        sessionId: "",
                        mobile: "",
                        realName: "",
                        nickName: null,
                        certType: null,
                        certNo: null,
                        leaseType: "3",
                        creditScore: 0,
                        myLocation: {}
                    },
                    zhimaScore: "",
                    updateLog: {
                        "0.1.39": "第一个版本",
                        "0.1.42": [ "用户信息脱敏显示", "授权机制更新", "还车待结算状态bug修复" ],
                        "0.2.17": [ "修复有桩车需要开启蓝牙bug", "新增退款功能", "新增使用条款自助结束行程功能", "蓝牙接口调整" ],
                        "0.2.24": [ "更新服务端接口", "调整退款按钮样式", "修复查询车锁密码问题" ],
                        "0.3.1": [ "蓝牙新接口", "IDE 0.9.x 打包" ],
                        "0.3.5": "新增还车解决方案",
                        "0.4.12": [ "后端服务4.0", "蓝牙新接口" ]
                    },
                    debug: {
                        flag: !1,
                        logs: []
                    },
                    scanFromIndex: !1,
                    needInitOrder: !0,
                    appName: "微信"
                },
                onLaunch: function(o) {
                    var n = this;
                    t.default.cl("App onLaunch");
                    var a = e.getStorageSync("sessionId");
                    console.log("sessionId: " + a), a && (this.globalData.sessionId = a), console.log("onLaunch时缓存中的sessionId: " + this.globalData.sessionId), 
                    console.info("app.js onLaunch options", o), e.getSystemInfo({
                        success: function(e) {
                            console.log("设备信息： ", e), n.globalData.platform = e.platform, n.globalData.SDKVersion = e.SDKVersion, 
                            n.globalData.wChatVersion = e.version, n.globalData.system = e.system.slice(8);
                        }
                    }), void 0 !== o.query && void 0 !== o.query.cardId && o.query.cardId && (this.globalData.cardId = o.query.cardId, 
                    this.globalData.orderType = o.query.orderType), t.default.cl("App onLaunch");
                    var l = e.getStorageSync({
                        key: "userInfo"
                    });
                    console.info("69 app localUserInfo: " + JSON.stringify(l)), void 0 !== JSON.stringify(l) && l.data ? (console.log("有用户数据 已授权"), 
                    this.globalData.userInfo = l.data) : console.log("没有用户数据呢  要授权");
                },
                onShow: function(o) {
                    if (console.info("app.js onShow options", o), this.globalData.scanFromIndex && (o.query && "{}" !== JSON.stringify(o.query) ? o.query.q && (console.log("小程序onShow扫到的二维码：  ", decodeURIComponent(o.query.q)), 
                    this.globalData.qrcode = decodeURIComponent(o.query.q)) : (console.log("小程序onShow扫到的二维码为空"), 
                    this.globalData.qrcode = "")), e.canIUse("getUpdateManager")) {
                        var n = wx.getUpdateManager();
                        n.onCheckForUpdate(function(o) {
                            o.hasUpdate && (n.onUpdateReady(function() {
                                e.showModal({
                                    title: "更新提示",
                                    content: "新版本已经准备好，是否重启应用？",
                                    success: function(e) {
                                        e.confirm && n.applyUpdate();
                                    }
                                });
                            }), n.onUpdateFailed(function() {
                                e.showModal({
                                    title: "已经有新版本了哟~",
                                    content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                                });
                            }));
                        });
                    } else e.showModal({
                        title: "提示",
                        content: "当前" + target + "版本过低，无法使用该功能，请升级到最新微信版本后重试。"
                    });
                }
            };
            o.default = a;
        }).call(this, n(1).default);
    },
    80: function(e, o, n) {
        n.r(o);
        var t = n(81), a = n(83);
        for (var l in a) "default" !== l && function(e) {
            n.d(o, e, function() {
                return a[e];
            });
        }(l);
        n(85);
        var s = n(19), i = Object(s.default)(a.default, t.render, t.staticRenderFns, !1, null, null, null, !1, t.components, void 0);
        i.options.__file = "pages/login/login.vue", o.default = i.exports;
    },
    81: function(e, o, n) {
        n.r(o);
        var t = n(82);
        n.d(o, "render", function() {
            return t.render;
        }), n.d(o, "staticRenderFns", function() {
            return t.staticRenderFns;
        }), n.d(o, "recyclableRender", function() {
            return t.recyclableRender;
        }), n.d(o, "components", function() {
            return t.components;
        });
    },
    82: function(e, o, n) {
        n.r(o), n.d(o, "render", function() {
            return a;
        }), n.d(o, "staticRenderFns", function() {
            return s;
        }), n.d(o, "recyclableRender", function() {
            return l;
        }), n.d(o, "components", function() {
            return t;
        });
        var t, a = function() {
            var e = this, o = e.$createElement;
            e._self._c;
        }, l = !1, s = [];
        a._withStripped = !0;
    },
    83: function(e, o, n) {
        n.r(o);
        var t = n(84), a = n.n(t);
        for (var l in t) "default" !== l && function(e) {
            n.d(o, e, function() {
                return t[e];
            });
        }(l);
        o.default = a.a;
    },
    84: function(e, o, n) {
        (function(e) {
            function t(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.default = void 0;
            var a = t(n(6)), l = t(n(9)), s = {
                data: function() {
                    return {
                        acceptRule: !1,
                        warnToast: !1,
                        hideWarnToast: !1,
                        loginParams: {},
                        needRealNameAuth: !1,
                        step1Flag: !0
                    };
                },
                onLoad: function(o) {
                    console.log("app.globalData.needRealNameAuth: " + a.default.globalData.needRealNameAuth), 
                    this.needRealNameAuth = a.default.globalData.needRealNameAuth;
                    var n = this;
                    wx.login({
                        success: function(o) {
                            o.code ? e.request({
                                url: l.default.ports.loginUrl + "/youonhelp/user/wxauth/authLogin",
                                method: "POST",
                                data: {
                                    code: o.code,
                                    type: "3"
                                },
                                success: function(o) {
                                    console.log("login onLoad authLogin授权接口结果： ", o);
                                    var t = {};
                                    o.data.data.session_key && (t.session_key = o.data.data.session_key, t.openid = o.data.data.openid, 
                                    n.loginParams = t), e.setStorageSync("loginParams", t);
                                },
                                fail: function(e) {
                                    console.log("authLogin授权接口请求失败", e);
                                }
                            }) : console.log("登录失败！" + o.errMsg);
                        }
                    });
                },
                onShow: function() {},
                methods: {
                    goToLogin: function() {
                        var o = this;
                        e.getUserProfile({
                            desc: "登录",
                            success: function(n) {
                                console.log(n);
                                var t = n.userInfo;
                                console.log("授权getUserProfile", n), e.setStorageSync("wexin_userInfo", t), o.step1Flag = !1;
                            },
                            fail: function(n) {
                                var t = {
                                    nickName: "微信用户",
                                    avatarUrl: "https://mallfile.oss-cn-shanghai.aliyuncs.com/fault/kf/2021-04-09/default_avatar.png"
                                };
                                e.setStorageSync("wexin_userInfo", t), o.step1Flag = !1;
                            }
                        });
                    },
                    bindgetphonenumber: function(o) {
                        console.log("授权bindgetphonenumber", o);
                        var n = o.detail.iv, t = o.detail.encryptedData, s = this.loginParams.session_key;
                        e.request({
                            url: l.default.ports.loginUrl + "/youonhelp/user/wxauth/authLoginWithInfo",
                            method: "POST",
                            data: {
                                encryptedData: t,
                                iv: n,
                                sessionKey: s,
                                source: l.default.getSource,
                                adcode: "320411"
                            },
                            success: function(o) {
                                console.log("authLoginWithInfo接口结果： ", o), l.default.toast(o.data.statemsg), "0" === o.data.statecode && (e.setStorageSync("loginInfo", o.data.data), 
                                console.log("登录成功返回>>>>>>>", JSON.stringify(e.getStorageInfoSync("loginInfo"))), 
                                e.setStorageSync("sessionId", o.data.data.sessionId), a.default.globalData.sessionId = o.data.data.sessionId, 
                                e.navigateBack());
                            }
                        });
                    },
                    onGetIDAuthorize: function() {
                        my.getIDNumber({
                            success: function(o) {
                                console.log("获取身份证号", o), console.log("获取身份证密文", JSON.parse(o.response).response), 
                                console.log("获取身份证sign", JSON.parse(o.response).sign), a.default.globalData.IDInfoResponse = JSON.parse(o.response).response, 
                                a.default.globalData.IDInfoSign = JSON.parse(o.response).sign;
                                var n = {
                                    response: a.default.globalData.IDInfoResponse,
                                    sign: a.default.globalData.IDInfoSign,
                                    type: "2"
                                };
                                l.default.httpPost(l.default.ports.parseData, n, function(o) {
                                    if ("0" == o.statecode) {
                                        var n = {
                                            name: o.data.userName,
                                            certno: o.data.certNo
                                        };
                                        l.default.realNameAuth(n, function() {
                                            a.default.globalData.needRealNameAuth = !1, console.log("登录成功"), l.default.toast("登录成功"), 
                                            e.navigateBack();
                                        }, !1);
                                    }
                                });
                            },
                            fail: function(e) {
                                console.log(e), console.log("getIDNumber_fail");
                            }
                        });
                    },
                    onAuthError: function(o) {
                        "用户取消授权" === o.detail.errorMessage && e.confirm({
                            title: "温馨提示",
                            content: "您取消了授权，将无法正常使用租车功能",
                            confirmButtonText: "继续授权",
                            cancelButtonText: "确认取消",
                            success: function(e) {
                                e.confirm ? console.log("继续授权，弹窗保持") : console.log("确认取消授权，关闭弹窗");
                            }
                        });
                    },
                    bindAcceptRule: function() {
                        console.log("picker发送选择改变，携带值为", this.acceptRule), this.acceptRule ? this.acceptRule = !1 : this.acceptRule = !0;
                    },
                    login: function(e) {
                        this.acceptRule || l.default.toast("请先阅读并同意协议");
                    },
                    goToPolicy: function() {
                        e.navigateTo({
                            url: "../privateProtectPolicy/privateProtectPolicy"
                        });
                    }
                }
            };
            o.default = s;
        }).call(this, n(1).default);
    },
    85: function(e, o, n) {
        n.r(o);
        var t = n(86), a = n.n(t);
        for (var l in t) "default" !== l && function(e) {
            n.d(o, e, function() {
                return t[e];
            });
        }(l);
        o.default = a.a;
    },
    86: function(e, o, n) {}
}, [ [ 79, "common/runtime", "common/vendor" ] ] ]);