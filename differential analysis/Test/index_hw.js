! function () {
    var t = function () {
        return function (t) {
            var e = {};

            function i(o) {
                if (e[o]) return e[o].exports;
                var n = e[o] = {
                    i: o,
                    l: !1,
                    exports: {}
                };
                return t[o].call(n.exports, n, n.exports, i), n.l = !0, n.exports
            }
            return i.m = t, i.c = e, i.d = function (t, e, o) {
                i.o(t, e) || Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: o
                })
            }, i.r = function (t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }, i.t = function (t, e) {
                if (1 & e && (t = i(t)), 8 & e) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                var o = Object.create(null);
                if (i.r(o), Object.defineProperty(o, "default", {
                        enumerable: !0,
                        value: t
                    }), 2 & e && "string" != typeof t)
                    for (var n in t) i.d(o, n, function (e) {
                        return t[e]
                    }.bind(null, n));
                return o
            }, i.n = function (t) {
                var e = t && t.__esModule ? function () {
                    return t.default
                } : function () {
                    return t
                };
                return i.d(e, "a", e), e
            }, i.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }, i.p = "", i(i.s = 18)
        }([function (t, e, i) {
            "use strict";
            var o, n, r, a;

            function s(t) {
                return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            a = function () {
                var t = t || function (t, e) {
                    var i = Object.create || function () {
                            function t() {}
                            return function (e) {
                                var i;
                                return t.prototype = e, i = new t, t.prototype = null, i
                            }
                        }(),
                        o = {},
                        n = o.lib = {},
                        r = n.Base = {
                            extend: function (t) {
                                var e = i(this);
                                return t && e.mixIn(t), e.hasOwnProperty("init") && this.init !== e.init || (e.init = function () {
                                    e.$super.init.apply(this, arguments)
                                }), e.init.prototype = e, e.$super = this, e
                            },
                            create: function () {
                                var t = this.extend();
                                return t.init.apply(t, arguments), t
                            },
                            init: function () {},
                            mixIn: function (t) {
                                for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                                t.hasOwnProperty("toString") && (this.toString = t.toString)
                            },
                            clone: function () {
                                return this.init.prototype.extend(this)
                            }
                        },
                        a = n.WordArray = r.extend({
                            init: function (t, e) {
                                t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length
                            },
                            toString: function (t) {
                                return (t || c).stringify(this)
                            },
                            concat: function (t) {
                                var e = this.words,
                                    i = t.words,
                                    o = this.sigBytes,
                                    n = t.sigBytes;
                                if (this.clamp(), o % 4)
                                    for (var r = 0; r < n; r++) {
                                        var a = i[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                                        e[o + r >>> 2] |= a << 24 - (o + r) % 4 * 8
                                    } else
                                        for (r = 0; r < n; r += 4) e[o + r >>> 2] = i[r >>> 2];
                                return this.sigBytes += n, this
                            },
                            clamp: function () {
                                var e = this.words,
                                    i = this.sigBytes;
                                e[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, e.length = t.ceil(i / 4)
                            },
                            clone: function () {
                                var t = r.clone.call(this);
                                return t.words = this.words.slice(0), t
                            },
                            random: function (e) {
                                for (var i, o = [], n = function (e) {
                                        e = e;
                                        var i = 987654321,
                                            o = 4294967295;
                                        return function () {
                                            var n = ((i = 36969 * (65535 & i) + (i >> 16) & o) << 16) + (e = 18e3 * (65535 & e) + (e >> 16) & o) & o;
                                            return n /= 4294967296, (n += .5) * (t.random() > .5 ? 1 : -1)
                                        }
                                    }, r = 0; r < e; r += 4) {
                                    var s = n(4294967296 * (i || t.random()));
                                    i = 987654071 * s(), o.push(4294967296 * s() | 0)
                                }
                                return new a.init(o, e)
                            }
                        }),
                        s = o.enc = {},
                        c = s.Hex = {
                            stringify: function (t) {
                                for (var e = t.words, i = t.sigBytes, o = [], n = 0; n < i; n++) {
                                    var r = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                    o.push((r >>> 4).toString(16)), o.push((15 & r).toString(16))
                                }
                                return o.join("")
                            },
                            parse: function (t) {
                                for (var e = t.length, i = [], o = 0; o < e; o += 2) i[o >>> 3] |= parseInt(t.substr(o, 2), 16) << 24 - o % 8 * 4;
                                return new a.init(i, e / 2)
                            }
                        },
                        u = s.Latin1 = {
                            stringify: function (t) {
                                for (var e = t.words, i = t.sigBytes, o = [], n = 0; n < i; n++) {
                                    var r = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                                    o.push(String.fromCharCode(r))
                                }
                                return o.join("")
                            },
                            parse: function (t) {
                                for (var e = t.length, i = [], o = 0; o < e; o++) i[o >>> 2] |= (255 & t.charCodeAt(o)) << 24 - o % 4 * 8;
                                return new a.init(i, e)
                            }
                        },
                        l = s.Utf8 = {
                            stringify: function (t) {
                                try {
                                    return decodeURIComponent(escape(u.stringify(t)))
                                } catch (t) {
                                    throw new Error("Malformed UTF-8 data")
                                }
                            },
                            parse: function (t) {
                                return u.parse(unescape(encodeURIComponent(t)))
                            }
                        },
                        p = n.BufferedBlockAlgorithm = r.extend({
                            reset: function () {
                                this._data = new a.init, this._nDataBytes = 0
                            },
                            _append: function (t) {
                                "string" == typeof t && (t = l.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
                            },
                            _process: function (e) {
                                var i = this._data,
                                    o = i.words,
                                    n = i.sigBytes,
                                    r = this.blockSize,
                                    s = n / (4 * r),
                                    c = (s = e ? t.ceil(s) : t.max((0 | s) - this._minBufferSize, 0)) * r,
                                    u = t.min(4 * c, n);
                                if (c) {
                                    for (var l = 0; l < c; l += r) this._doProcessBlock(o, l);
                                    var p = o.splice(0, c);
                                    i.sigBytes -= u
                                }
                                return new a.init(p, u)
                            },
                            clone: function () {
                                var t = r.clone.call(this);
                                return t._data = this._data.clone(), t
                            },
                            _minBufferSize: 0
                        }),
                        A = (n.Hasher = p.extend({
                            cfg: r.extend(),
                            init: function (t) {
                                this.cfg = this.cfg.extend(t), this.reset()
                            },
                            reset: function () {
                                p.reset.call(this), this._doReset()
                            },
                            update: function (t) {
                                return this._append(t), this._process(), this
                            },
                            finalize: function (t) {
                                return t && this._append(t), this._doFinalize()
                            },
                            blockSize: 16,
                            _createHelper: function (t) {
                                return function (e, i) {
                                    return new t.init(i).finalize(e)
                                }
                            },
                            _createHmacHelper: function (t) {
                                return function (e, i) {
                                    return new A.HMAC.init(t, i).finalize(e)
                                }
                            }
                        }), o.algo = {});
                    return o
                }(Math);
                return t
            }, "object" === s(e) ? t.exports = e = a() : (n = [], void 0 === (r = "function" == typeof (o = a) ? o.apply(e, n) : o) || (t.exports = r))
        }, function (t, e, i) {
            "use strict";
            t.exports = i(10)
        }, function (t, e, i) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = c(i(7)),
                n = c(i(5)),
                r = c(i(6)),
                a = c(i(8)),
                s = c(i(9));

            function c(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function u(t, e) {
                var i = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(t);
                    e && (o = o.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), i.push.apply(i, o)
                }
                return i
            }

            function l(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? u(Object(i), !0).forEach((function (e) {
                        p(t, e, i[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : u(Object(i)).forEach((function (e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                    }))
                }
                return t
            }

            function p(t, e, i) {
                return e in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            }

            function A(t, e, i, o, n, r, a) {
                try {
                    var s = t[r](a),
                        c = s.value
                } catch (t) {
                    return void i(t)
                }
                s.done ? e(c) : Promise.resolve(c).then(o, n)
            }

            function d(t) {
                return function () {
                    var e = this,
                        i = arguments;
                    return new Promise((function (o, n) {
                        var r = t.apply(e, i);

                        function a(t) {
                            A(r, o, n, a, s, "next", t)
                        }

                        function s(t) {
                            A(r, o, n, a, s, "throw", t)
                        }
                        a(void 0)
                    }))
                }
            }

            function h(t, e) {
                return function (t) {
                    if (Array.isArray(t)) return t
                }(t) || function (t, e) {
                    if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var i = [],
                        o = !0,
                        n = !1,
                        r = void 0;
                    try {
                        for (var a, s = t[Symbol.iterator](); !(o = (a = s.next()).done) && (i.push(a.value), !e || i.length !== e); o = !0);
                    } catch (t) {
                        n = !0, r = t
                    } finally {
                        try {
                            o || null == s.return || s.return()
                        } finally {
                            if (n) throw r
                        }
                    }
                    return i
                }(t, e) || function (t, e) {
                    if (!t) return;
                    if ("string" == typeof t) return f(t, e);
                    var i = Object.prototype.toString.call(t).slice(8, -1);
                    "Object" === i && t.constructor && (i = t.constructor.name);
                    if ("Map" === i || "Set" === i) return Array.from(t);
                    if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return f(t, e)
                }(t, e) || function () {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function f(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, o = new Array(e); i < e; i++) o[i] = t[i];
                return o
            }

            function m(t, e) {
                if (null == t) return {};
                var i, o, n = function (t, e) {
                    if (null == t) return {};
                    var i, o, n = {},
                        r = Object.keys(t);
                    for (o = 0; o < r.length; o++) i = r[o], e.indexOf(i) >= 0 || (n[i] = t[i]);
                    return n
                }(t, e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    for (o = 0; o < r.length; o++) i = r[o], e.indexOf(i) >= 0 || Object.prototype.propertyIsEnumerable.call(t, i) && (n[i] = t[i])
                }
                return n
            }(Object.getPrototypeOf(global) || global).regeneratorRuntime = i(1);
            var g = n.default.ENV,
                y = n.default.mt_id,
                x = n.default.mt_key,
                v = n.default.brandConfig;

            function b() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "vivo";
                return v[t] ? v[t] : v.vivo
            }
            var w = function (t) {
                return t < 1e4 ? Math.round(1e6 * t) : t
            };

            function _() {
                var t = $app_require$("@app-module/system.prompt"),
                    e = $app_require$("@app-module/system.shortcut");
                e.hasInstalled({
                    success: function (i) {
                        i ? t.showToast({
                            message: "已创建桌面图标"
                        }) : e.install({
                            success: function () {
                                t.showToast({
                                    message: "成功创建桌面图标"
                                })
                            },
                            fail: function (e, i) {
                                t.showToast({
                                    message: "".concat(i, ": ").concat(e)
                                })
                            }
                        })
                    }
                })
            }
            var L = function (t) {
                    switch (t) {
                        case "prod":
                            return "https://h5.waimai.meituan.com";
                        case "prod_default":
                            return "https://openapi.waimai.meituan.com/openh5/entrance?type=main_page";
                        case "st":
                            return "http://h5.waimai.st.meituan.com";
                        case "test":
                            return "http://h5.waimai.test.sankuai.com";
                        case "dev":
                            return "https://h5.waimai.dev.sankuai.com";
                        case "localhost":
                            return "http://h5.waimai.meituan.com:3001";
                        default:
                            return "https:h5.waimai.meituan.com"
                    }
                },
                k = function (t) {
                    switch (t) {
                        case "prod":
                            return "https://i.waimai.meituan.com";
                        case "st":
                            return "http://i.waimai.st.meituan.com";
                        case "test":
                            return "http://i.c.waimai.test.sankuai.com";
                        case "dev":
                            return "http://i.c.waimai.dev.sankuai.com";
                        default:
                            return "https://i.waimai.meituan.com"
                    }
                };

            function j() {
                return (j = d(regeneratorRuntime.mark((function t(e) {
                    var i, o, n, r, c, u, p, A, d, h, f, m, v, w, _, k, j, O, S = arguments;
                    return regeneratorRuntime.wrap((function (t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                i = S.length > 1 && void 0 !== S[1] ? S[1] : {}, o = S.length > 2 && void 0 !== S[2] ? S[2] : {}, n = $app_require$("@app-module/system.router"), r = o.allowthirdpartycookies, c = void 0 === r ? "true" : r, u = o.titleBarConfig, p = void 0 === u ? {} : u, A = o.data, d = void 0 === A ? {} : A, h = o.brand, m = b(f = void 0 === h ? "vivo" : h), v = m.utm_source, w = m.channel, _ = "", /^http/.test(e) || (_ = L(g)), "st" !== g && "test" !== g || (e += "".concat(/\?/.test(e) ? "&" : "?", "vconsole=true")), k = i.mt_uuid, j = (new Date).getTime(), O = s.default.stringify((0, a.default)("".concat(x, ":mt_id=").concat(y, "&mt_uuid=").concat(k, "&mt_t=").concat(j), x)), i = l(l({}, i), {}, {
                                    channel: w,
                                    utm_source: v,
                                    from: "quickApp",
                                    geotype: "gcj02",
                                    a: "ws://test.com"
                                    mt_id: y,
                                    mt_uuid: k,
                                    mt_t: j,
                                    mt_sign: O
                                }), n.push({
                                    uri: "Webview",
                                    params: {
                                        isDirector: "false",
                                        brand: f,
                                        url: _ + e,
                                        params: encodeURIComponent(JSON.stringify(i)),
                                        allowthirdpartycookies: c,
                                        titleBarConfig: encodeURIComponent(JSON.stringify(p)),
                                        data: encodeURIComponent(JSON.stringify(d))
                                    }
                                });
                            case 13:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }
            var O = {
                getChannelByBrand: b,
                getUrlByEnv: L,
                getApiUrlByEnv: k,
                getNewUrlByQueryObject: function (t, e) {
                    var i = o.default.parseUrl(t),
                        n = i.query,
                        r = i.url;
                    Object.keys(e).forEach((function (t) {
                        n[t] = e[t]
                    }));
                    var a = o.default.stringify(i.query);
                    return "".concat(r, "?").concat(a)
                },
                jumpToWebview: function (t) {
                    return j.apply(this, arguments)
                },
                request: function (t) {
                    var e = $app_require$("@app-module/system.fetch"),
                        i = $app_require$("@app-module/system.storage"),
                        o = t.brand,
                        n = m(t, ["brand"]),
                        a = b(o),
                        s = a.utm_source,
                        c = a.channel;
                    return global.Promise.all([i.get({
                        key: "wm_actual_latitude"
                    }).catch((function () {
                        return 0
                    })), i.get({
                        key: "wm_actual_longitude"
                    }).catch((function () {
                        return 0
                    })), i.get({
                        key: "wm_latitude"
                    }).catch((function () {
                        return 0
                    })), i.get({
                        key: "wm_longitude"
                    }).catch((function () {
                        return 0
                    })), r.default.getItem("token").catch((function () {
                        return ""
                    }))]).then((function (t) {
                        var i = h(t, 5),
                            o = i[0].data,
                            r = i[1].data,
                            a = i[2].data,
                            u = i[3].data,
                            l = i[4],
                            p = Object.assign({}, n);
                        p.header = p.header || {}, p.data = p.data || {};
                        var A = p.header.Cookie || "";
                        A += "wm_order_channel=".concat(c, ";utm_source=").concat(s, ";_lx_utm=utm_source%3D").concat(s, ";"), l && (p.data._token = l, A += "token=".concat(l)), p.header.Cookie = A, p.data.wm_actual_latitude = w(o) || 0, p.data.wm_actual_longitude = w(r) || 0, p.data.wm_latitude = w(a) || 0, p.data.wm_longitude = w(u) || 0, p.data.utm_source = s;
                        var d = (new Date).getTime(),
                            f = "";
                        return /^http/.test(p.url) || (f = k(g)), p.url = f + p.url + "?_=" + d, e.fetch(p)
                    }))
                },
                showMenu: function () {
                    var t = $app_require$("@app-module/system.prompt");
                    t.showContextMenu({
                        itemList: ["保存桌面"],
                        success: function (e) {
                            switch (e.index) {
                                case 0:
                                    _();
                                    break;
                                default:
                                    t.showToast({
                                        message: "error"
                                    })
                            }
                        }
                    })
                },
                createShortcut: _,
                camlToKebab: function t(e) {
                    if (e instanceof Array) return e.map((function (e) {
                        return t(e)
                    }));
                    if (e instanceof Object) {
                        var i = {};
                        return Object.keys(e).forEach((function (o) {
                            var n = o.replace(/[A-Z]/g, (function (t) {
                                return "_" + t.toLocaleLowerCase()
                            }));
                            i[n] = t(e[o])
                        })), i
                    }
                    return e
                }
            };
            e.default = O
        }, function (t, e, i) {
            "use strict";
            var o, n, r, a;

            function s(t) {
                return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            a = function (t) {
                return function (e) {
                    var i = t,
                        o = i.lib,
                        n = o.WordArray,
                        r = o.Hasher,
                        a = i.algo,
                        s = [],
                        c = [];
                    ! function () {
                        function t(t) {
                            for (var i = e.sqrt(t), o = 2; o <= i; o++)
                                if (!(t % o)) return !1;
                            return !0
                        }

                        function i(t) {
                            return 4294967296 * (t - (0 | t)) | 0
                        }
                        for (var o = 2, n = 0; n < 64;) t(o) && (n < 8 && (s[n] = i(e.pow(o, .5))), c[n] = i(e.pow(o, 1 / 3)), n++), o++
                    }();
                    var u = [],
                        l = a.SHA256 = r.extend({
                            _doReset: function () {
                                this._hash = new n.init(s.slice(0))
                            },
                            _doProcessBlock: function (t, e) {
                                for (var i = this._hash.words, o = i[0], n = i[1], r = i[2], a = i[3], s = i[4], l = i[5], p = i[6], A = i[7], d = 0; d < 64; d++) {
                                    if (d < 16) u[d] = 0 | t[e + d];
                                    else {
                                        var h = u[d - 15],
                                            f = (h << 25 | h >>> 7) ^ (h << 14 | h >>> 18) ^ h >>> 3,
                                            m = u[d - 2],
                                            g = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;
                                        u[d] = f + u[d - 7] + g + u[d - 16]
                                    }
                                    var y = o & n ^ o & r ^ n & r,
                                        x = (o << 30 | o >>> 2) ^ (o << 19 | o >>> 13) ^ (o << 10 | o >>> 22),
                                        v = A + ((s << 26 | s >>> 6) ^ (s << 21 | s >>> 11) ^ (s << 7 | s >>> 25)) + (s & l ^ ~s & p) + c[d] + u[d];
                                    A = p, p = l, l = s, s = a + v | 0, a = r, r = n, n = o, o = v + (x + y) | 0
                                }
                                i[0] = i[0] + o | 0, i[1] = i[1] + n | 0, i[2] = i[2] + r | 0, i[3] = i[3] + a | 0, i[4] = i[4] + s | 0, i[5] = i[5] + l | 0, i[6] = i[6] + p | 0, i[7] = i[7] + A | 0
                            },
                            _doFinalize: function () {
                                var t = this._data,
                                    i = t.words,
                                    o = 8 * this._nDataBytes,
                                    n = 8 * t.sigBytes;
                                return i[n >>> 5] |= 128 << 24 - n % 32, i[14 + (n + 64 >>> 9 << 4)] = e.floor(o / 4294967296), i[15 + (n + 64 >>> 9 << 4)] = o, t.sigBytes = 4 * i.length, this._process(), this._hash
                            },
                            clone: function () {
                                var t = r.clone.call(this);
                                return t._hash = this._hash.clone(), t
                            }
                        });
                    i.SHA256 = r._createHelper(l), i.HmacSHA256 = r._createHmacHelper(l)
                }(Math), t.SHA256
            }, "object" === s(e) ? t.exports = e = a(i(0)) : (n = [i(0)], void 0 === (r = "function" == typeof (o = a) ? o.apply(e, n) : o) || (t.exports = r))
        }, function (t, e, i) {
            "use strict";
            var o, n, r, a;

            function s(t) {
                return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            a = function (t) {
                var e, i, o;
                i = (e = t).lib.Base, o = e.enc.Utf8, e.algo.HMAC = i.extend({
                    init: function (t, e) {
                        t = this._hasher = new t.init, "string" == typeof e && (e = o.parse(e));
                        var i = t.blockSize,
                            n = 4 * i;
                        e.sigBytes > n && (e = t.finalize(e)), e.clamp();
                        for (var r = this._oKey = e.clone(), a = this._iKey = e.clone(), s = r.words, c = a.words, u = 0; u < i; u++) s[u] ^= 1549556828, c[u] ^= 909522486;
                        r.sigBytes = a.sigBytes = n, this.reset()
                    },
                    reset: function () {
                        var t = this._hasher;
                        t.reset(), t.update(this._iKey)
                    },
                    update: function (t) {
                        return this._hasher.update(t), this
                    },
                    finalize: function (t) {
                        var e = this._hasher,
                            i = e.finalize(t);
                        return e.reset(), e.finalize(this._oKey.clone().concat(i))
                    }
                })
            }, "object" === s(e) ? t.exports = e = a(i(0)) : (n = [i(0)], void 0 === (r = "function" == typeof (o = a) ? o.apply(e, n) : o) || (t.exports = r))
        }, function (t, e, i) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = {
                ENV: "prod",
                mt_id: "qYeJmfvchMh",
                mt_key: "5b166d6ab6c9da89a62b3ef0f8d6aef2",
                brandConfig: {
                    vivo: {
                        channel: "vivokyy",
                        utm_source: "60350",
                        cid: "c_waimai_u2zasmdk",
                        mvbid: ""
                    },
                    vivofyp01: {
                        channel: "vivofyp01",
                        utm_source: "60401",
                        cid: "c_waimai_u2zasmdk",
                        mvbid: ""
                    },
                    vivofyp02: {
                        channel: "vivofyp02",
                        utm_source: "60402",
                        cid: "c_waimai_u2zasmdk",
                        mvbid: ""
                    },
                    vivoqjss: {
                        channel: "vivoqjss",
                        utm_source: "60403",
                        cid: "c_waimai_u2zasmdk",
                        mvbid: ""
                    },
                    oppo: {
                        channel: "oppokyy",
                        utm_source: "60371",
                        cid: "c_waimai_01qygs19",
                        mvbid: ""
                    },
                    oppovoice: {
                        channel: "oppovoice",
                        utm_source: "60129",
                        cid: "c_waimai_01qygs19",
                        mvbid: ""
                    },
                    huawei: {
                        channel: "hwkyy",
                        utm_source: "60381",
                        cid: "c_waimai_s068lcej",
                        mvbid: ""
                    },
                    honor: {
                        channel: "hwkyy",
                        utm_source: "60381",
                        cid: "c_waimai_s068lcej",
                        mvbid: ""
                    },
                    kyyhwsh: {
                        channel: "kyyhwsh",
                        utm_source: "60391",
                        cid: "c_waimai_nuyl9gdi",
                        mvbid: ""
                    },
                    kyyfyp: {
                        channel: "kyyfyp",
                        utm_source: "60392",
                        cid: "c_waimai_0b2kx823",
                        mvbid: ""
                    },
                    kyyqb: {
                        channel: "kyyqb",
                        utm_source: "60393",
                        cid: "c_waimai_s2phz6lj",
                        mvbid: ""
                    },
                    xiaomi: {
                        channel: "xmkyy",
                        utm_source: "60396",
                        cid: "c_waimai_ghjoov63",
                        mvbid: ""
                    }
                }
            };
            e.default = o
        }, function (t, e, i) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o, n = (o = $app_require$("@app-module/system.storage")) && o.__esModule ? o : {
                default: o
            };

            function r(t, e, i, o, n, r, a) {
                try {
                    var s = t[r](a),
                        c = s.value
                } catch (t) {
                    return void i(t)
                }
                s.done ? e(c) : Promise.resolve(c).then(o, n)
            }

            function a(t) {
                return function () {
                    var e = this,
                        i = arguments;
                    return new Promise((function (o, n) {
                        var a = t.apply(e, i);

                        function s(t) {
                            r(a, o, n, s, c, "next", t)
                        }

                        function c(t) {
                            r(a, o, n, s, c, "throw", t)
                        }
                        s(void 0)
                    }))
                }
            }

            function s() {
                return (s = a(regeneratorRuntime.mark((function t(e, i, o) {
                    var r, a;
                    return regeneratorRuntime.wrap((function (t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (e && i) {
                                    t.next = 2;
                                    break
                                }
                                return t.abrupt("return", !1);
                            case 2:
                                return r = (new Date).getTime(), o || (o = r + 15552e6), a = {
                                    value: i,
                                    expires: o
                                }, t.next = 7, n.default.set({
                                    key: e,
                                    value: JSON.stringify(a)
                                }).catch((function () {
                                    n.default.set({
                                        key: e,
                                        value: JSON.stringify(a)
                                    })
                                }));
                            case 7:
                                return t.abrupt("return", !0);
                            case 8:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }

            function c() {
                return (c = a(regeneratorRuntime.mark((function t(e) {
                    var i, o, r, a, s, c, u, l;
                    return regeneratorRuntime.wrap((function (t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (e) {
                                    t.next = 2;
                                    break
                                }
                                return t.abrupt("return", "");
                            case 2:
                                return t.next = 4, n.default.get({
                                    key: e
                                }).catch((function () {
                                    i = {}
                                }));
                            case 4:
                                if (i = t.sent, o = (i || {}).data, r = void 0 === o ? "" : o) {
                                    t.next = 8;
                                    break
                                }
                                return t.abrupt("return", "");
                            case 8:
                                if (a = JSON.parse(r), s = (new Date).getTime(), c = a.value, u = void 0 === c ? "" : c, l = a.expires, !(s > l)) {
                                    t.next = 16;
                                    break
                                }
                                return n.default.delete({
                                    key: e
                                }), t.abrupt("return", "");
                            case 16:
                                return t.abrupt("return", u);
                            case 17:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }(Object.getPrototypeOf(global) || global).regeneratorRuntime = i(1);
            var u = {
                setItem: function (t, e, i) {
                    return s.apply(this, arguments)
                },
                getItem: function (t) {
                    return c.apply(this, arguments)
                },
                delItem: function (t) {
                    n.default.delete({
                        key: t
                    })
                }
            };
            e.default = u
        }, function (t, e, i) {
            "use strict";

            function o(t, e) {
                var i = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(t);
                    e && (o = o.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), i.push.apply(i, o)
                }
                return i
            }

            function n(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? o(Object(i), !0).forEach((function (e) {
                        r(t, e, i[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : o(Object(i)).forEach((function (e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                    }))
                }
                return t
            }

            function r(t, e, i) {
                return e in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            }

            function a(t) {
                return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var s = function (t) {
                if ("string" != typeof t) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + a(t) + "`");
                try {
                    return t = t.replace(/\+/g, " "), decodeURIComponent(t)
                } catch (e) {
                    return global.customDecodeURIComponent ? global.customDecodeURIComponent(t) : ""
                }
            };

            function c(t, e) {
                return e.encode ? e.strict ? encodeURIComponent(t).replace(/[!'()*]/g, (function (t) {
                    return "%".concat(t.charCodeAt(0).toString(16).toUpperCase())
                })) : encodeURIComponent(t) : t
            }

            function u(t, e) {
                var i = function (t) {
                        var e;
                        switch (t.arrayFormat) {
                            case "index":
                                return function (t, i, o) {
                                    e = /\[(\d*)\]$/.exec(t), t = t.replace(/\[\d*\]$/, ""), e ? (void 0 === o[t] && (o[t] = {}), o[t][e[1]] = i) : o[t] = i
                                };
                            case "bracket":
                                return function (t, i, o) {
                                    e = /(\[\])$/.exec(t), t = t.replace(/\[\]$/, ""), e ? void 0 !== o[t] ? o[t] = [].concat(o[t], i) : o[t] = [i] : o[t] = i
                                };
                            default:
                                return function (t, e, i) {
                                    void 0 !== i[t] ? i[t] = [].concat(i[t], e) : i[t] = e
                                }
                        }
                    }(e = n({
                        arrayFormat: "none"
                    }, e)),
                    o = Object.create(null);
                return "string" != typeof t ? o : (t = t.trim().replace(/^[?#&]/, "")) ? (t.split("&").forEach((function (t) {
                    var e = t.replace(/\+/g, " ").split("="),
                        n = e.shift(),
                        r = e.length > 0 ? e.join("=") : void 0;
                    r = void 0 === r ? null : s(r), i(s(n), r, o)
                })), Object.keys(o).sort().reduce((function (t, e) {
                    var i = o[e];
                    return Boolean(i) && "object" === a(i) && !Array.isArray(i) ? t[e] = function t(e) {
                        return Array.isArray(e) ? e.sort() : "object" === a(e) ? t(Object.keys(e)).sort((function (t, e) {
                            return Number(t) - Number(e)
                        })).map((function (t) {
                            return e[t]
                        })) : e
                    }(i) : t[e] = i, t
                }), Object.create(null))) : o
            }

            function l(t) {
                var e = t.indexOf("?");
                return -1 === e ? "" : t.slice(e + 1)
            }
            var p = {
                parse: u,
                stringify: function (t, e) {
                    !1 === (e = n(n({}, {
                        encode: !0,
                        strict: !0,
                        arrayFormat: "none"
                    }), e)).sort && (e.sort = function () {});
                    var i = function (t) {
                        switch (t.arrayFormat) {
                            case "index":
                                return function (e, i, o) {
                                    return null === i ? [c(e, t), "[", o, "]"].join("") : [c(e, t), "[", c(o, t), "]=", c(i, t)].join("")
                                };
                            case "bracket":
                                return function (e, i) {
                                    return null === i ? c(e, t) : [c(e, t), "[]=", c(i, t)].join("")
                                };
                            default:
                                return function (e, i) {
                                    return null === i ? c(e, t) : [c(e, t), "=", c(i, t)].join("")
                                }
                        }
                    }(e);
                    return t ? Object.keys(t).sort(e.sort).map((function (o) {
                        var n = t[o];
                        if (void 0 === n) return "";
                        if (null === n) return c(o, e);
                        if (Array.isArray(n)) {
                            var r = [];
                            return n.slice().forEach((function (t) {
                                void 0 !== t && r.push(i(o, t, r.length))
                            })), r.join("&")
                        }
                        return c(o, e) + "=" + c(n, e)
                    })).filter((function (t) {
                        return t.length > 0
                    })).join("&") : ""
                },
                parseUrl: function (t, e) {
                    return {
                        url: t.split("?")[0] || "",
                        query: u(l(t), e)
                    }
                }
            };
            e.default = p
        }, function (t, e, i) {
            "use strict";
            var o, n, r, a;

            function s(t) {
                return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            a = function (t) {
                return t.HmacSHA256
            }, "object" === s(e) ? t.exports = e = a(i(0), i(3), i(4)) : (n = [i(0), i(3), i(4)], void 0 === (r = "function" == typeof (o = a) ? o.apply(e, n) : o) || (t.exports = r))
        }, function (t, e, i) {
            "use strict";
            var o, n, r, a;

            function s(t) {
                return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            a = function (t) {
                return t.enc.Hex
            }, "object" === s(e) ? t.exports = e = a(i(0)) : (n = [i(0)], void 0 === (r = "function" == typeof (o = a) ? o.apply(e, n) : o) || (t.exports = r))
        }, function (t, e, i) {
            "use strict";
            (function (t) {
                function e(t) {
                    return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    })(t)
                }
                var i = function (t) {
                    var i = Object.prototype,
                        o = i.hasOwnProperty,
                        n = "function" == typeof Symbol ? Symbol : {},
                        r = n.iterator || "@@iterator",
                        a = n.asyncIterator || "@@asyncIterator",
                        s = n.toStringTag || "@@toStringTag";

                    function c(t, e, i) {
                        return Object.defineProperty(t, e, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }), t[e]
                    }
                    try {
                        c({}, "")
                    } catch (t) {
                        c = function (t, e, i) {
                            return t[e] = i
                        }
                    }

                    function u(t, e, i, o) {
                        var n = e && e.prototype instanceof A ? e : A,
                            r = Object.create(n.prototype),
                            a = new L(o || []);
                        return r._invoke = function (t, e, i) {
                            var o = "suspendedStart";
                            return function (n, r) {
                                if ("executing" === o) throw new Error("Generator is already running");
                                if ("completed" === o) {
                                    if ("throw" === n) throw r;
                                    return j()
                                }
                                for (i.method = n, i.arg = r;;) {
                                    var a = i.delegate;
                                    if (a) {
                                        var s = b(a, i);
                                        if (s) {
                                            if (s === p) continue;
                                            return s
                                        }
                                    }
                                    if ("next" === i.method) i.sent = i._sent = i.arg;
                                    else if ("throw" === i.method) {
                                        if ("suspendedStart" === o) throw o = "completed", i.arg;
                                        i.dispatchException(i.arg)
                                    } else "return" === i.method && i.abrupt("return", i.arg);
                                    o = "executing";
                                    var c = l(t, e, i);
                                    if ("normal" === c.type) {
                                        if (o = i.done ? "completed" : "suspendedYield", c.arg === p) continue;
                                        return {
                                            value: c.arg,
                                            done: i.done
                                        }
                                    }
                                    "throw" === c.type && (o = "completed", i.method = "throw", i.arg = c.arg)
                                }
                            }
                        }(t, i, a), r
                    }

                    function l(t, e, i) {
                        try {
                            return {
                                type: "normal",
                                arg: t.call(e, i)
                            }
                        } catch (t) {
                            return {
                                type: "throw",
                                arg: t
                            }
                        }
                    }
                    t.wrap = u;
                    var p = {};

                    function A() {}

                    function d() {}

                    function h() {}
                    var f = {};
                    f[r] = function () {
                        return this
                    };
                    var m = Object.getPrototypeOf,
                        g = m && m(m(k([])));
                    g && g !== i && o.call(g, r) && (f = g);
                    var y = h.prototype = A.prototype = Object.create(f);

                    function x(t) {
                        ["next", "throw", "return"].forEach((function (e) {
                            c(t, e, (function (t) {
                                return this._invoke(e, t)
                            }))
                        }))
                    }

                    function v(t, i) {
                        var n;
                        this._invoke = function (r, a) {
                            function s() {
                                return new i((function (n, s) {
                                    ! function n(r, a, s, c) {
                                        var u = l(t[r], t, a);
                                        if ("throw" !== u.type) {
                                            var p = u.arg,
                                                A = p.value;
                                            return A && "object" === e(A) && o.call(A, "__await") ? i.resolve(A.__await).then((function (t) {
                                                n("next", t, s, c)
                                            }), (function (t) {
                                                n("throw", t, s, c)
                                            })) : i.resolve(A).then((function (t) {
                                                p.value = t, s(p)
                                            }), (function (t) {
                                                return n("throw", t, s, c)
                                            }))
                                        }
                                        c(u.arg)
                                    }(r, a, n, s)
                                }))
                            }
                            return n = n ? n.then(s, s) : s()
                        }
                    }

                    function b(t, e) {
                        var i = t.iterator[e.method];
                        if (void 0 === i) {
                            if (e.delegate = null, "throw" === e.method) {
                                if (t.iterator.return && (e.method = "return", e.arg = void 0, b(t, e), "throw" === e.method)) return p;
                                e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                            }
                            return p
                        }
                        var o = l(i, t.iterator, e.arg);
                        if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, p;
                        var n = o.arg;
                        return n ? n.done ? (e[t.resultName] = n.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, p) : n : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p)
                    }

                    function w(t) {
                        var e = {
                            tryLoc: t[0]
                        };
                        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                    }

                    function _(t) {
                        var e = t.completion || {};
                        e.type = "normal", delete e.arg, t.completion = e
                    }

                    function L(t) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }], t.forEach(w, this), this.reset(!0)
                    }

                    function k(t) {
                        if (t) {
                            var e = t[r];
                            if (e) return e.call(t);
                            if ("function" == typeof t.next) return t;
                            if (!isNaN(t.length)) {
                                var i = -1,
                                    n = function e() {
                                        for (; ++i < t.length;)
                                            if (o.call(t, i)) return e.value = t[i], e.done = !1, e;
                                        return e.value = void 0, e.done = !0, e
                                    };
                                return n.next = n
                            }
                        }
                        return {
                            next: j
                        }
                    }

                    function j() {
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    return d.prototype = y.constructor = h, h.constructor = d, d.displayName = c(h, s, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
                        var e = "function" == typeof t && t.constructor;
                        return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name))
                    }, t.mark = function (t) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(t, h) : (t.__proto__ = h, c(t, s, "GeneratorFunction")), t.prototype = Object.create(y), t
                    }, t.awrap = function (t) {
                        return {
                            __await: t
                        }
                    }, x(v.prototype), v.prototype[a] = function () {
                        return this
                    }, t.AsyncIterator = v, t.async = function (e, i, o, n, r) {
                        void 0 === r && (r = Promise);
                        var a = new v(u(e, i, o, n), r);
                        return t.isGeneratorFunction(i) ? a : a.next().then((function (t) {
                            return t.done ? t.value : a.next()
                        }))
                    }, x(y), c(y, s, "Generator"), y[r] = function () {
                        return this
                    }, y.toString = function () {
                        return "[object Generator]"
                    }, t.keys = function (t) {
                        var e = [];
                        for (var i in t) e.push(i);
                        return e.reverse(),
                            function i() {
                                for (; e.length;) {
                                    var o = e.pop();
                                    if (o in t) return i.value = o, i.done = !1, i
                                }
                                return i.done = !0, i
                            }
                    }, t.values = k, L.prototype = {
                        constructor: L,
                        reset: function (t) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(_), !t)
                                for (var e in this) "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                        },
                        stop: function () {
                            this.done = !0;
                            var t = this.tryEntries[0].completion;
                            if ("throw" === t.type) throw t.arg;
                            return this.rval
                        },
                        dispatchException: function (t) {
                            if (this.done) throw t;
                            var e = this;

                            function i(i, o) {
                                return a.type = "throw", a.arg = t, e.next = i, o && (e.method = "next", e.arg = void 0), !!o
                            }
                            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                                var r = this.tryEntries[n],
                                    a = r.completion;
                                if ("root" === r.tryLoc) return i("end");
                                if (r.tryLoc <= this.prev) {
                                    var s = o.call(r, "catchLoc"),
                                        c = o.call(r, "finallyLoc");
                                    if (s && c) {
                                        if (this.prev < r.catchLoc) return i(r.catchLoc, !0);
                                        if (this.prev < r.finallyLoc) return i(r.finallyLoc)
                                    } else if (s) {
                                        if (this.prev < r.catchLoc) return i(r.catchLoc, !0)
                                    } else {
                                        if (!c) throw new Error("try statement without catch or finally");
                                        if (this.prev < r.finallyLoc) return i(r.finallyLoc)
                                    }
                                }
                            }
                        },
                        abrupt: function (t, e) {
                            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                var n = this.tryEntries[i];
                                if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                    var r = n;
                                    break
                                }
                            }
                            r && ("break" === t || "continue" === t) && r.tryLoc <= e && e <= r.finallyLoc && (r = null);
                            var a = r ? r.completion : {};
                            return a.type = t, a.arg = e, r ? (this.method = "next", this.next = r.finallyLoc, p) : this.complete(a)
                        },
                        complete: function (t, e) {
                            if ("throw" === t.type) throw t.arg;
                            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), p
                        },
                        finish: function (t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var i = this.tryEntries[e];
                                if (i.finallyLoc === t) return this.complete(i.completion, i.afterLoc), _(i), p
                            }
                        },
                        catch: function (t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var i = this.tryEntries[e];
                                if (i.tryLoc === t) {
                                    var o = i.completion;
                                    if ("throw" === o.type) {
                                        var n = o.arg;
                                        _(i)
                                    }
                                    return n
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function (t, e, i) {
                            return this.delegate = {
                                iterator: k(t),
                                resultName: e,
                                nextLoc: i
                            }, "next" === this.method && (this.arg = void 0), p
                        }
                    }, t
                }("object" === e(t) ? t.exports : {});
                try {
                    regeneratorRuntime = i
                } catch (t) {
                    Function("r", "regeneratorRuntime = r")(i)
                }
            }).call(this, i(11)(t))
        }, function (t, e, i) {
            "use strict";
            t.exports = function (t) {
                return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                    enumerable: !0,
                    get: function () {
                        return t.l
                    }
                }), Object.defineProperty(t, "id", {
                    enumerable: !0,
                    get: function () {
                        return t.i
                    }
                }), t.webpackPolyfill = 1), t
            }
        }, function (t, e, i) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = a($app_require$("@app-module/system.fetch")),
                n = a($app_require$("@app-module/system.geolocation")),
                r = a($app_require$("@app-module/system.storage"));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function s(t, e) {
                return function (t) {
                    if (Array.isArray(t)) return t
                }(t) || function (t, e) {
                    if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
                    var i = [],
                        o = !0,
                        n = !1,
                        r = void 0;
                    try {
                        for (var a, s = t[Symbol.iterator](); !(o = (a = s.next()).done) && (i.push(a.value), !e || i.length !== e); o = !0);
                    } catch (t) {
                        n = !0, r = t
                    } finally {
                        try {
                            o || null == s.return || s.return()
                        } finally {
                            if (n) throw r
                        }
                    }
                    return i
                }(t, e) || function (t, e) {
                    if (!t) return;
                    if ("string" == typeof t) return c(t, e);
                    var i = Object.prototype.toString.call(t).slice(8, -1);
                    "Object" === i && t.constructor && (i = t.constructor.name);
                    if ("Map" === i || "Set" === i) return Array.from(t);
                    if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return c(t, e)
                }(t, e) || function () {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function c(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var i = 0, o = new Array(e); i < e; i++) o[i] = t[i];
                return o
            }

            function u(t, e, i, o, n, r, a) {
                try {
                    var s = t[r](a),
                        c = s.value
                } catch (t) {
                    return void i(t)
                }
                s.done ? e(c) : Promise.resolve(c).then(o, n)
            }

            function l(t) {
                return function () {
                    var e = this,
                        i = arguments;
                    return new Promise((function (o, n) {
                        var r = t.apply(e, i);

                        function a(t) {
                            u(r, o, n, a, s, "next", t)
                        }

                        function s(t) {
                            u(r, o, n, a, s, "throw", t)
                        }
                        a(void 0)
                    }))
                }
            }(Object.getPrototypeOf(global) || global).regeneratorRuntime = i(1);
            var p = function (t) {
                    return t < 1e4 ? Math.round(1e6 * t) : t
                },
                A = function (t) {
                    return t > 1e3 ? t / 1e6 : t
                },
                d = function (t) {
                    switch (t) {
                        case 0:
                            return {
                                msg: "获取地理位置失败，请选择收货地址，"
                            };
                        case 201:
                            return {
                                msg: "获取定位权限失败，请选择收货地址，"
                            };
                        case 204:
                            return {
                                msg: "获取地理位置超时，请选择收货地址，"
                            };
                        case 1e3:
                            return {
                                msg: "系统位置开关关闭，无法获取位置，请选择收货地址"
                            };
                        default:
                            return {
                                msg: "获取地理位置信息失败，请选择收货地址"
                            }
                    }
                },
                h = {
                    setUserCacheLocation: function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                        return r.default.set({
                            key: "wm_longitude",
                            value: p(t)
                        }), r.default.set({
                            key: "wm_latitude",
                            value: p(e)
                        }), r.default.set({
                            key: "wm_poi",
                            value: i
                        }), !0
                    },
                    getUserCacheLocation: function () {
                        return l(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, global.Promise.all([r.default.get({
                                            key: "wm_longitude"
                                        }).catch((function () {
                                            return 0
                                        })), r.default.get({
                                            key: "wm_latitude"
                                        }).catch((function () {
                                            return 0
                                        })), r.default.get({
                                            key: "wm_poi"
                                        }).catch((function () {
                                            return ""
                                        }))]).then((function (t) {
                                            var e = s(t, 3),
                                                i = e[0].data,
                                                o = e[1].data,
                                                n = e[2].data;
                                            return !!(i && o && n) && {
                                                longitude: A(i),
                                                latitude: A(o),
                                                poi: n
                                            }
                                        }), (function () {
                                            return !1
                                        }));
                                    case 2:
                                        if (e = t.sent) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return", !1);
                                    case 5:
                                        return t.abrupt("return", e);
                                    case 6:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    },
                    setCacheLocation: function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                        return r.default.set({
                            key: "wm_actual_longitude",
                            value: p(t)
                        }), r.default.set({
                            key: "wm_actual_latitude",
                            value: p(e)
                        }), r.default.set({
                            key: "wm_actual_poi",
                            value: i
                        }), !0
                    },
                    getCacheLocation: function () {
                        return l(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, global.Promise.all([r.default.get({
                                            key: "wm_actual_longitude"
                                        }).catch((function () {
                                            return 0
                                        })), r.default.get({
                                            key: "wm_actual_latitude"
                                        }).catch((function () {
                                            return 0
                                        })), r.default.get({
                                            key: "wm_actual_poi"
                                        }).catch((function () {
                                            return ""
                                        }))]).then((function (t) {
                                            var e = s(t, 3),
                                                i = e[0].data,
                                                o = e[1].data,
                                                n = e[2].data;
                                            return !!(i && o && n) && {
                                                longitude: A(i),
                                                latitude: A(o),
                                                poi: n
                                            }
                                        }), (function () {
                                            return !1
                                        }));
                                    case 2:
                                        if (e = t.sent) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return", !1);
                                    case 5:
                                        return t.abrupt("return", e);
                                    case 6:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })))()
                    },
                    revertAddress: function (t, e) {
                        var i = this;
                        return o.default.fetch({
                            url: "https://maf.meituan.com/regeo/text",
                            method: "GET",
                            data: {
                                key: "be9427ec-bca4-4bfa-b981-9314f6a1adc7",
                                location: this.getLocationString(t, e),
                                scenario: "WAIMAI"
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            responseType: "json"
                        }).then((function (o) {
                            var n = o.data.data.result;
                            return i.setCacheLocation(t, e, n), {
                                longitude: t,
                                latitude: e,
                                poi: n
                            }
                        }), l(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, i.getCacheLocation();
                                    case 2:
                                        if (!(e = t.sent)) {
                                            t.next = 7;
                                            break
                                        }
                                        return t.abrupt("return", e);
                                    case 7:
                                        return t.abrupt("return", !1);
                                    case 8:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        }))))
                    },
                    getGeolocation: function () {
                        var t = this,
                            e = [];
                        try {
                            e = n.default.getSupportedCoordTypes()
                        } catch (t) {
                            e = []
                        }
                        var i = -1 === e.indexOf("gcj02") ? {} : {
                            coordType: "gcj02"
                        };
                        return n.default.getLocation(i).then((function (t) {
                            return t.data
                        }), function () {
                            var e = l(regeneratorRuntime.mark((function e(i) {
                                var o, n;
                                return regeneratorRuntime.wrap((function (e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return o = i.code, e.next = 3, t.getCacheLocation();
                                        case 3:
                                            if (!(n = e.sent)) {
                                                e.next = 8;
                                                break
                                            }
                                            return e.abrupt("return", n);
                                        case 8:
                                            return e.abrupt("return", {
                                                code: o,
                                                isFailed: !0
                                            });
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function (t) {
                                return e.apply(this, arguments)
                            }
                        }())
                    },
                    getLocation: function () {
                        var t = this;
                        return l(regeneratorRuntime.mark((function e() {
                            var i, o, n, r;
                            return regeneratorRuntime.wrap((function (e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, t.getGeolocation();
                                    case 2:
                                        if (!(i = e.sent).isFailed) {
                                            e.next = 7;
                                            break
                                        }
                                        return e.abrupt("return", global.Promise.reject(d(i.code)));
                                    case 7:
                                        if (!i.poi) {
                                            e.next = 9;
                                            break
                                        }
                                        return e.abrupt("return", i);
                                    case 9:
                                        return o = i.longitude, n = i.latitude, e.next = 12, t.revertAddress(o, n);
                                    case 12:
                                        if (r = e.sent) {
                                            e.next = 15;
                                            break
                                        }
                                        return e.abrupt("return", global.Promise.reject(d(0)));
                                    case 15:
                                        return e.abrupt("return", r);
                                    case 16:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })))()
                    },
                    getLocationString: function (t, e) {
                        var i = parseFloat(t),
                            o = parseFloat(e);
                        return "".concat(i.toFixed(6), ",").concat(o.toFixed(6))
                    }
                };
            e.default = h
        }, function (t, e, i) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = r($app_require$("@app-module/system.storage")),
                n = r($app_require$("@app-module/system.device"));

            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function a(t, e, i, o, n, r, a) {
                try {
                    var s = t[r](a),
                        c = s.value
                } catch (t) {
                    return void i(t)
                }
                s.done ? e(c) : Promise.resolve(c).then(o, n)
            }

            function s(t) {
                return function () {
                    var e = this,
                        i = arguments;
                    return new Promise((function (o, n) {
                        var r = t.apply(e, i);

                        function s(t) {
                            a(r, o, n, s, c, "next", t)
                        }

                        function c(t) {
                            a(r, o, n, s, c, "throw", t)
                        }
                        s(void 0)
                    }))
                }
            }(Object.getPrototypeOf(global) || global).regeneratorRuntime = i(1);
            var c = function () {
                for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 48, e = 16, i = "", o = 0; o < t; o++) {
                    var n = Math.floor(Math.random() * e);
                    i += n.toString(16)
                }
                return i.toUpperCase()
            };

            function u() {
                return n.default.getDeviceId().then((function (t) {
                    var e = t.data,
                        i = (void 0 === e ? {} : e).deviceId;
                    return void 0 === i ? "" : i
                }), (function () {
                    return !1
                }))
            }

            function l() {
                return n.default.getInfo().then((function (t) {
                    var e = t.data;
                    return void 0 === e ? {} : e
                }), (function () {}))
            }

            function p(t) {
                var e, i, o = t,
                    n = [],
                    r = 0;

                function a(t, e) {
                    var i, o = 0;
                    for (i = 0; i < e.length; i++) o |= n[i] << 8 * i;
                    return t ^ o
                }
                for (e = 0; e < o.length; e++) i = o.charCodeAt(e), n.unshift(255 & i), n.length >= 4 && (r = a(r, n), n = []);
                return n.length > 0 && (r = a(r, n)), r.toString(16)
            }

            function A() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!t) return "";
                var i = e.brand,
                    o = void 0 === i ? "vivo" : i,
                    n = e.manufacturer,
                    r = void 0 === n ? "bbg" : n,
                    a = e.model,
                    s = void 0 === a ? "x20" : a,
                    c = e.osType,
                    u = void 0 === c ? "android" : c,
                    l = e.osVersionCode,
                    A = void 0 === l ? "10.0.0" : l,
                    d = e.platformVersionCode,
                    h = void 0 === d ? "1050" : d,
                    f = e.screenWidth,
                    m = void 0 === f ? "375" : f,
                    g = e.screenHeight,
                    y = void 0 === g ? "667" : g,
                    x = p(t),
                    v = p("".concat(o, "~").concat(r, "~").concat(s)),
                    b = p("".concat(u, "~").concat(A, "~").concat(h)),
                    w = p("".concat(m, "~").concat(y));
                return "".concat(x, "-").concat(v, "-").concat(b, "-").concat(w)
            }

            function d() {
                return (d = s(regeneratorRuntime.mark((function t() {
                    var e, i, n, r;
                    return regeneratorRuntime.wrap((function (t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2, l();
                            case 2:
                                return e = t.sent, i = (i = e && e.brand ? e.brand : "vivo").toLowerCase(), t.next = 7, u();
                            case 7:
                                if (n = t.sent, r = A(n, e)) {
                                    t.next = 18;
                                    break
                                }
                                return t.next = 12, o.default.get({
                                    key: "wm_uuid"
                                }).then((function (t) {
                                    return t.data
                                }), (function () {
                                    return ""
                                }));
                            case 12:
                                if (!(r = t.sent)) {
                                    t.next = 17;
                                    break
                                }
                                return t.abrupt("return", {
                                    uuid: r,
                                    brand: i
                                });
                            case 17:
                                r = c(64);
                            case 18:
                                return o.default.set({
                                    key: "wm_uuid",
                                    value: r
                                }), t.abrupt("return", {
                                    uuid: r,
                                    brand: i
                                });
                            case 20:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }
            var h = function () {
                return d.apply(this, arguments)
            };
            e.default = h
        }, function (t, e, i) {
            var o = i(20),
                n = i(21);
            $app_define$("@app-component/comp-img", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(22), r.exports.style = o
            }))
        }, , , , function (t, e, i) {
            i(19), i(26), i(30), i(34), i(37), i(41), i(45);
            var o = i(49),
                n = i(50);
            $app_define$("@app-component/index", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(53), r.exports.style = o
            })), $app_bootstrap$("@app-component/index", {
                packagerVersion: "1.8.1-beta.1"
            })
        }, function (t, e, i) {
            i(14);
            var o = i(23),
                n = i(24);
            $app_define$("@app-component/comp-entry", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(25), r.exports.style = o
            }))
        }, function (t, e) {
            t.exports = {
                ".cmm-img": {
                    backgroundImage: "/Common/imgs/imgbg.jpg",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }
            }
        }, function (t, e) {
            t.exports = function (t, e, i) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                e.default = {
                    props: {
                        visiable: {
                            default: !0
                        },
                        imgurl: {
                            default: ""
                        },
                        stylestr: {
                            default: "object-fit: cover"
                        }
                    },
                    data: {
                        preUrl: "",
                        retryStatus: 0,
                        retryUrl: ""
                    },
                    computed: {
                        imgsrc: function () {
                            !this.preUrl && this.imgurl && (this.preUrl = this.imgurl);
                            var t = "";
                            return this.preUrl !== this.imgurl && (this.retryStatus = 0, this.retryUrl = "", this.preUrl = this.imgurl), 1 === this.retryStatus && this.retryUrl ? t = this.retryUrl : 2 === this.retryStatus ? t = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEqAY4DAREAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAgMEBwEJ/8QAPhABAAECBAMEBwUGBQUAAAAAAAECAwQFERIGITETQVGBBzJhobHB0RQiQnGRIzNScuHwFRZDU4JEYnOy8f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9PQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARfEWeW8gy65ia+c06aR484jwnxB5Tc9KGcfbd8YjSx/t7afDx0Bd+HPSRhM12WsTH2e7PTnNWvXwiIBc6aoqiJpnWJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUPSTll7HZPF21G6bWuseOs0g8TrpmiqYnuAormieU6AvvB/pEuZdVRh8XO/D+PTb1nuiZnWQes4XFWsZYpu2qt9FXSQbQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY3btNm3Ndc6U09ZBTMz4923NmHo0p/3NdfdMAgMVxfj8RExOI5T/wBtP0BW72EtX65qqp1mQaasrsT+H4g1VZNR61NW2Y/vxBaODM9v8P3+yu178LPWOXLTX2TPWQem4PO8HjoibV7d5THxgHdExPTmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqBrAGsAAAAAA4c8wteNyy9at+vOmn6xIPJcZhbtF+uJjp1ByzGkgREz0AmJjqADK3TNddMRymZBaOLcTw76Pcrws5xiOzv4jd2de2uekxr6usfigHBlnF1/DbasPf3Yeek7Y5/rGoLXlnHlm/ERiaOx8a9Zn3RALNhsXaxdEV2a91M+XxBuAAAAAAAAAAAAAAABHV8QYC3d7Kb/wB/w0n6A7bOJtYinWiuKoBsAAAAAAABjXdot0zNVUREAjcXxNl+D5V3ufhpP0BFYjjuxbp1tWu0/wCUx8gRl30hXaqtIs9nH5xPyBxXuOcfVP3L+2P5afoCPq4qx9VWtV/dHhtiPkD5/mjF/wAXw+gE8U478F3Z5RPyB0WOM8xt/wDU6/8AGn6AkrPpAv0RG+O1nyj5AlMJx7avaRds9n7d2vyBK4XirLcVypv6VeG2r6AkrWJtXo1oriYBt11BxY3J8Jj+d61unx1mPgCLq4Gy2Z1i1p51fUH2ngfLI62tfOr6grvFnDGHy2i3XYnZTOv3Oc9NO+ZBTwImYnWOUwDdxTcw3GeXYfCZthftM4fXs7m6adNZiZ5Rp4QDms2qLFqm3RGlFPSAZxVNM6wDvwOc4jA3N9uvbXPf19wLrlHHVF7SjE06af6mvXyiAWuzeov24roq3Uz0kGYAAAAAAAAAAAAFUaxMeIPK89yXEZRiZiJmaJ9WeXPpr3z4gi8PmN3DV7qZndAJrAca47D6Rcv7qfDbH0BL4X0hzPK5htfbv0+QJOjjjCzTurp2ecz8gZ08c5bV/q6eVX0AnjjLI/1fdV9AYV8b4XbrRTv85j5AjsV6Q9usW8N59p/QEXjeOcZejS1d7OJ7tIn5AhMXnF/Gc7tU1T49PgDlqxFdXWrUGrfE1aRPMH0AAAAAADUGyi/Xb9WrQGyxjrlirWJnUElY4rx9ir7l/ZT3RpE/IErZ4+xNFP36u0n8oj5A6LfpFuaRuwus/wA39ALnpEuzGkYbbr37o+gK5nOe382u63K91MerGkRp017oBFgATTMRrPeAAAD7TVNM6wD0D0dXb9djFU3J/Z07dnnu1BcQAAAAAAAAAAAAAaMZgrOPszau07qZ/vuBQs/4Lu4Wqq7Y/aW5/KNOntBVLlmu31jkDADWQfd0+IG6fEHzWQAAY1VxRGszoDhrx84i52VjrPf/APQdtq3FqnSOc98gzAAAAAAAAAAAAAAAApnbMAsGV4bDZtY7Cqrsr/4Z5zu7/wAo5A4szyLEZbVPa0bY7uk/AHB9mufwgVYeunrSCQyrJL2PvUxTTM+zoD1HKMtoyrBUWKO7XWfOZB2gAAAAAAAAAAAAAAAh814XwmZxu29nd/j5z7tYgFLzPgrF4TnRT2lPfVyj3agr93C1266qZj1eoNOkgA+TVERrM6A03cbZtda+f5A4sRnMRrFqnX2/3AI67ibuInSqrUE1l+FjD2tZ9aeoOsAAAAAAAAAAAHyZ0gGum/TXXtp5zHUG0AGVNuqvpGoJDBZBi8fpNm3v8ecR8ZBYsFwFiZmKq7n2efDSKvhILphcBFnB02LtXbaa89NNeeoOavhvLq6tZw+s/wA1X1Bus5Ng7E60WdPOZ+YOui3TbjSmmIBkAAAAAAAAAAAAAAAAAADjxmU4XHxpetbvOY+AK3mHo8tX6ZjC4j7NHdG3d8ZBWcX6Nc0taxaudv7dKafmCv4zgXPbMzM4bl/5KfqDhnhPMKPWtTT5xPzA/wArY2elEz+n1As5HfwmJj7Rb2RHtie72SCSAAAAAAAABrv3extzXMaxANNGZYeuNd+n6/QCrMcPT+PX9Qc17OqY5UU6/wB/kDTanEZjVznbR39P6AlbNmmxRtpBuotzX0jUFgyjg/E5jG6Y2W56XOU+7WAXTLOEcHgPv1U9rd/j5x7tQTdNEURpTGkA+gAAAAAAAAAAAAAAAAAAAAAAAAAAaagbKfCkHzbH8MA8042vxXm1+iPw7fLWmAVkAAAAAAAAHyqmKqZiekggcZgLliuZiNaPEHNTarrnSI1kEhhMpmrSq708P7kEvRRFERTTGkQCVynIcRmd6KKLesd/OOXvB6Bk3CWGy2mK7kdrd8ecePtBPRERyjkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyji7X/HMTr7P/WAQgAAAAAMbkzFOsdYB8tXYvUbokGYAAPkREdIBlRRNdWkRrMgtnDvB1eNmLt/7tn49fCdYBf8ACYOzgbUW7NGymPP4g3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8y42w3Z5tfr8dPhAK0AAAAAACNxNc4DExXH7urr5QCQpqiumKo6SDIAH2ima6oiO8F84V4Rp20YrFR/LR+sdYkF1ppimNIjSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTOP8umui1fp6Rru90QCgTyAAAAAABx5nai7hap/h+cg5snxWv7Kqfy94JUAGVqvZXEg9U4VzmM0wW2Y0uW9N36zp3AnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAV/izNMJYwNdi7+0rq6Uc474nrAPL7kxVXMx0BiAAAAADXf8A3VUSCt2rs2bkVx3As1u5F2iKo7wZA6MLgruLuU0W6d1U9IB6dwxkP+D2K6q+V25prHh19s+IJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFxNxFTk9mKKJ1vVdPZpp7J7pB5ljMbcxl2quurdNXWQc4AAAAAANGMuRbw1c/kCtgn8m3X8PpEazH1Ba8n4UxOZTFUU7bf8XLl5ag9ByjIrGU29KI3XJ61c+flzBJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA14i9GHs1XKulIPIM4zGvMMXXdr9arr5cgcAAAAAAAM7dmq7OkQDbjuFMzxs027FjtKe+d1MfGQd2XeijG39s4iv7N48oq+EgvGR8DYDJtatva3J01r5x017tQWOmmKI0iNIgH0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHJmuHqxWAu2qPWnTTynUHkmMwV6nEVRNExPfH9Qc1Vi5T1gGGkwAAD7TG6qIBKYLIb+P8A3Vvd/wAoj4yCcwnAOIuRE3J7GfHlV8JBZ8q4WwmWVRXMdpdj8fOPdqCa0iOkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA58RgMPiv3tuKv1j4A4L/CmW3452Ofjuq+oIzF8BWLlGli72UR0jSZ+MgruYcE4zCU7qKO1iOtWsR7tQQF/B3LFUxMer1BojWJ1Bst4iu3XFUTpMAsOVcZYvBVaVVb7f+3yj36AveU55YzajWidK460c+XnpAJIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHDmGTYXM6JpvW9dfbMfDQFJzzgm9ht12x+1o8o06eMgqdy1VbnnHIGIOzLswuYLEUV0VbZjpPUHq2SZpTm2BovU8qp6x5zHs8ASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK/n3ClnMqKq7X7O9+uvTxmIB5zj8tvYC7VRdo21R1gHGC8ej7FVxdu0TP3a9NPLUF6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHZzklnN7O2uNtyPVr8OntB5fnGT3crxE0V06f3+YLF6P6ZrxMzp+76/pIL+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACPzjJrWcYebdf3au6rw6e2PAGvIsit5JZmimrtK6vWr00166ctZ8QSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z" : 0 === this.retryStatus && (t = this.imgurl), t
                        }
                    },
                    onImgError: function () {
                        if (0 === this.retryStatus && /p(0|1)\.meituan\.net/.test(this.imgurl)) {
                            var t = this.imgurl.replace(/p(0|1)\.meituan\.net/, (function (t, e) {
                                return "0" === e ? "p1.meituan.net" : "p0.meituan.net"
                            }));
                            this.retryUrl = t, this.retryStatus = 1
                        } else this.retryStatus = 2
                    }
                }
            }
        }, function (t, e) {
            t.exports = {
                type: "image",
                attr: {
                    show: function () {
                        return this.visiable
                    },
                    src: function () {
                        return this.imgsrc
                    }
                },
                classList: ["cmm-img"],
                style: function () {
                    return this.stylestr
                },
                events: {
                    error: "onImgError"
                }
            }
        }, function (t, e) {
            t.exports = {
                ".home-entry": {
                    width: "375px",
                    backgroundColor: "#ffffff",
                    paddingTop: "3px",
                    paddingRight: "2px",
                    paddingBottom: "3px",
                    paddingLeft: "2px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                },
                ".home-entry-cont": {
                    width: "70px",
                    height: "82px",
                    paddingTop: "8px",
                    paddingRight: "0px",
                    paddingBottom: "8px",
                    paddingLeft: "0px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },
                ".home-entry-cont-logo": {
                    height: "44px",
                    width: "44px",
                    borderRadius: "50%"
                },
                ".home-entry-cont-txt": {
                    marginTop: "5px",
                    height: "17px",
                    fontSize: "12px",
                    color: "#666666",
                    lineHeight: "17px",
                    lines: 1,
                    textOverflow: "ellipsis",
                    textAlign: "center",
                    width: "100%"
                }
            }
        }, function (t, e, i) {
            t.exports = function (t, e, o) {
                "use strict";
                var n;
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var r = ((n = i(2)) && n.__esModule ? n : {
                        default: n
                    }).default.jumpToWebview,
                    a = {
                        props: ["kingkongListData", "latitude", "longitude", "poi", "uuid", "brand"],
                        onKingkongItemTap: function (t) {
                            var e = t || {},
                                i = e.cateId,
                                o = e.name;
                            if (i) {
                                var n = "/waimai/mindex/kingkong?navigateType=".concat(i, "&firstCategoryId=").concat(i, "&secondCategoryId=").concat(i, "&title=").concat(o);
                                r(n, {
                                    wm_actual_latitude: this.latitude,
                                    wm_actual_longitude: this.longitude,
                                    wm_actual_poi: this.poi,
                                    wm_latitude: this.latitude,
                                    wm_longitude: this.longitude,
                                    wm_poi: this.poi,
                                    lat: this.latitude,
                                    lng: this.longitude,
                                    mt_uuid: this.uuid
                                }, {
                                    brand: this.brand
                                })
                            }
                        }
                    };
                e.default = a
            }
        }, function (t, e) {
            t.exports = {
                type: "div",
                attr: {},
                classList: ["home-entry"],
                children: [{
                    type: "div",
                    attr: {},
                    events: {
                        click: function (t) {
                            this.onKingkongItemTap(this.item, t)
                        }
                    },
                    classList: ["home-entry-cont"],
                    repeat: {
                        exp: function () {
                            return this.kingkongListData
                        },
                        key: "index",
                        value: "item"
                    },
                    children: [{
                        type: "comp-img",
                        attr: {
                            visiable: function () {
                                return !!this.item.icon
                            },
                            imgurl: function () {
                                return this.item.icon
                            },
                            stylestr: "object-fit: cover; height: 44px; width: 44px; border-radius: 50%;"
                        }
                    }, {
                        type: "text",
                        attr: {
                            value: function () {
                                return this.item.name
                            }
                        },
                        classList: ["home-entry-cont-txt"]
                    }]
                }]
            }
        }, function (t, e, i) {
            var o = i(27),
                n = i(28);
            $app_define$("@app-component/comp-entry-holdplace", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(29), r.exports.style = o
            }))
        }, function (t, e) {
            t.exports = {
                ".home-hpentry": {
                    width: "375px",
                    backgroundColor: "#ffffff",
                    paddingTop: "3px",
                    paddingRight: "2px",
                    paddingBottom: "3px",
                    paddingLeft: "2px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-around"
                },
                ".home-hpentry-cont": {
                    width: "70px",
                    height: "82px",
                    paddingTop: "8px",
                    paddingRight: "0px",
                    paddingBottom: "8px",
                    paddingLeft: "0px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                },
                ".home-hpentry-cont-logo": {
                    height: "44px",
                    width: "44px",
                    borderRadius: "22px",
                    backgroundColor: "#F0F1F2"
                },
                ".home-hpentry-cont-txt": {
                    width: "35px",
                    marginTop: "5px",
                    height: "17px",
                    fontSize: "12px",
                    backgroundColor: "#F0F1F2",
                    lineHeight: "17px",
                    lines: 1,
                    textOverflow: "ellipsis",
                    textAlign: "center"
                }
            }
        }, function (t, e) {
            t.exports = function (t, e, i) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var o = {
                    data: {
                        entrys: new Array(10).fill({})
                    }
                };
                e.default = o
            }
        }, function (t, e) {
            t.exports = {
                type: "div",
                attr: {},
                classList: ["home-hpentry"],
                children: [{
                    type: "div",
                    attr: {},
                    classList: ["home-hpentry-cont"],
                    repeat: {
                        exp: function () {
                            return this.entrys
                        },
                        key: "index",
                        value: "item"
                    },
                    children: [{
                        type: "text",
                        attr: {},
                        classList: ["home-hpentry-cont-logo"]
                    }, {
                        type: "text",
                        attr: {},
                        classList: ["home-hpentry-cont-txt"]
                    }]
                }]
            }
        }, function (t, e, i) {
            i(14);
            var o = i(31),
                n = i(32);
            $app_define$("@app-component/comp-list-item", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(33), r.exports.style = o
            }))
        }, function (t, e) {
            t.exports = {
                ".home-list-item": {
                    backgroundColor: "#ffffff",
                    marginBottom: "30px",
                    paddingTop: "0px",
                    paddingRight: "12px",
                    paddingBottom: "0px",
                    paddingLeft: "12px",
                    width: "375px"
                },
                ".home-list-item-logo": {
                    borderTopWidth: "0.5px",
                    borderRightWidth: "0.5px",
                    borderBottomWidth: "0.5px",
                    borderLeftWidth: "0.5px",
                    borderStyle: "solid",
                    borderTopColor: "#E4E4E4",
                    borderRightColor: "#E4E4E4",
                    borderBottomColor: "#E4E4E4",
                    borderLeftColor: "#E4E4E4",
                    borderRadius: "4px",
                    width: "80px",
                    height: "60px",
                    marginRight: "8px"
                },
                ".home-list-item-logoimg": {
                    width: "80px",
                    height: "60px",
                    borderRadius: "4px",
                    objectFit: "contain"
                },
                ".home-list-item-logoimgclosed": {
                    opacity: .5
                },
                ".home-list-item-logocont": {
                    height: "100%",
                    width: "100%",
                    justifyContent: "space-between"
                },
                ".home-list-item-logopromo": {
                    width: "35px",
                    height: "30px",
                    backgroundImage: "https://img.meituan.net/kangaroox/320163b6bf651a8a5d3b0e764b2c6be35823.png?t=1544072562742"
                },
                ".home-list-item-logoads": {
                    flexDirection: "column",
                    justifyContent: "space-between"
                },
                ".home-list-item-logoicon": {
                    width: "26px"
                },
                ".home-list-item-logoad": {
                    width: "14px",
                    height: "9px",
                    marginTop: "0px",
                    marginRight: "0px",
                    marginBottom: "2px",
                    marginLeft: "1px"
                },
                ".home-list-item-logotxt": {
                    background: '{"values":[{"type":"linearGradient","directions":["108deg"],"values":["#FFD161 3%","#FFB216 100%"]}]}',
                    borderTopRightRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    fontSize: "10px",
                    color: "#333333",
                    paddingTop: "0px",
                    paddingRight: "3px",
                    paddingBottom: "0px",
                    paddingLeft: "3px",
                    lineHeight: "14px"
                },
                ".home-list-item-cont": {
                    flex: 1,
                    flexDirection: "column"
                },
                ".home-list-item-conttit": {
                    fontSize: "17px",
                    color: "#333333",
                    lineHeight: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    lines: 1,
                    textOverflow: "ellipsis"
                },
                ".home-list-item-conts": {
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px"
                },
                ".home-list-item-contnum": {
                    height: "11px"
                },
                ".home-list-item-contstatus": {
                    fontSize: "11px",
                    lineHeight: "11px",
                    paddingTop: "3px",
                    paddingRight: "4px",
                    paddingBottom: "2px",
                    paddingLeft: "4px",
                    borderRadius: "2px"
                },
                ".home-list-item-contstatusdesc": {
                    fontSize: "11px",
                    lineHeight: "11px"
                },
                ".home-list-item-contcolor-red .home-list-item-contstatus": {
                    backgroundColor: "#ffefda",
                    borderRadius: "2px",
                    color: "#FFA735",
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contcolor-red"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contstatus"
                        }]
                    }
                },
                ".home-list-item-contcolor-red .home-list-item-contstatusdesc": {
                    color: "#FFA735",
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contcolor-red"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contstatusdesc"
                        }]
                    }
                },
                ".home-list-item-contcolor-blue .home-list-item-contstatus": {
                    backgroundColor: "#daedfc",
                    borderRadius: "2px",
                    color: "#37A2EE",
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contcolor-blue"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contstatus"
                        }]
                    }
                },
                ".home-list-item-contcolor-blue .home-list-item-contstatusdesc": {
                    color: "#37A2EE",
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contcolor-blue"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contstatusdesc"
                        }]
                    }
                },
                ".home-list-item-contrest": {
                    color: "#fafafa",
                    backgroundColor: "#cccccc",
                    borderRadius: "2px",
                    fontSize: "11px",
                    lineHeight: "11px",
                    paddingTop: "3px",
                    paddingRight: "4px",
                    paddingBottom: "2px",
                    paddingLeft: "4px"
                },
                ".home-list-item-contstart": {
                    height: "10px",
                    width: "10px",
                    marginRight: "2px"
                },
                ".home-list-item-contscore": {
                    fontSize: "11px",
                    lineHeight: "11px",
                    color: "#FFA100"
                },
                ".home-list-item-contscorenone": {
                    fontSize: "11px",
                    lineHeight: "11px",
                    color: "#666666"
                },
                ".home-list-item-conttime": {
                    height: "11px"
                },
                ".home-list-item-conttxt": {
                    fontSize: "11px",
                    color: "#666666",
                    lineHeight: "11px"
                },
                ".home-list-item-contdet": {
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px"
                },
                ".home-list-item-contflag": {
                    backgroundColor: "#FFD161",
                    borderTopColor: "#FFD161",
                    borderRightColor: "#FFD161",
                    borderBottomColor: "#FFD161",
                    borderLeftColor: "#FFD161",
                    borderTopWidth: "0px",
                    borderRightWidth: "0px",
                    borderBottomWidth: "0px",
                    borderLeftWidth: "0px",
                    borderBottomRightRadius: "7px",
                    borderTopLeftRadius: "7px",
                    borderTopRightRadius: "2px",
                    borderBottomLeftRadius: "2px"
                },
                ".home-list-item-contflagtxt": {
                    paddingTop: "2px",
                    paddingRight: "4px",
                    paddingBottom: "2px",
                    paddingLeft: "4px",
                    height: "14px",
                    fontSize: "10px",
                    color: "#34373B",
                    lineHeight: "10px"
                },
                ".home-list-item-conttags": {
                    marginBottom: "8px",
                    height: "20px"
                },
                ".home-list-item-conttag": {
                    backgroundColor: "#FFF5E5",
                    color: "#FE6D27",
                    borderRadius: "2px",
                    fontSize: "12px",
                    lineHeight: "20px",
                    lines: 1,
                    textOverflow: "ellipsis",
                    paddingTop: "0px",
                    paddingRight: "4px",
                    paddingBottom: "0px",
                    paddingLeft: "4px"
                },
                ".home-list-item-contoffs": {
                    alignItems: "center",
                    justifyContent: "space-between"
                },
                ".home-list-item-contoff": {
                    height: "16px",
                    marginRight: "4px",
                    marginBottom: "6px",
                    borderRadius: "2px",
                    borderTopWidth: "0.5px",
                    borderRightWidth: "0.5px",
                    borderBottomWidth: "0.5px",
                    borderLeftWidth: "0.5px",
                    borderStyle: "solid",
                    color: "#FB4E44",
                    fontSize: "11px",
                    lineHeight: "11px",
                    paddingTop: "2px",
                    paddingRight: "4px",
                    paddingBottom: "2px",
                    paddingLeft: "4px",
                    lines: 1,
                    textOverflow: "ellipsis"
                },
                ".home-list-item-contofftags": {
                    flexGrow: 1,
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "center"
                },
                ".home-list-item-contofftagstotal": {
                    flexGrow: 1,
                    flexDirection: "column"
                },
                ".home-list-item-contofftagsfirst": {
                    flexGrow: 1,
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "22px"
                },
                ".home-list-item-contofficon": {
                    flexShrink: 0,
                    height: "22px",
                    paddingTop: "6px",
                    paddingRight: "6px",
                    paddingBottom: "6px",
                    paddingLeft: "6px",
                    width: "30px",
                    flexDirection: "row-reverse"
                },
                ".home-list-item-contfold": {
                    height: "10px",
                    width: "10px"
                },
                ".home-list-item-contfolded": {
                    transform: '{"rotate":"180deg"}',
                    transformOrigin: "5px 5px"
                },
                ".home-list-item-contclosed .home-list-item-conttxt": {
                    color: "#999999",
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contclosed"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-conttxt"
                        }]
                    }
                },
                ".home-list-item-contclosed .home-list-item-conttit": {
                    color: "#999999",
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contclosed"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-conttit"
                        }]
                    }
                },
                ".home-list-item-contclosed .home-list-item-contoff": {
                    opacity: .5,
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contclosed"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contoff"
                        }]
                    }
                },
                ".home-list-item-contclosed .home-list-item-conttag": {
                    opacity: .5,
                    _meta: {
                        ruleDef: [{
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-contclosed"
                        }, {
                            t: "d"
                        }, {
                            t: "a",
                            n: "class",
                            i: !1,
                            a: "element",
                            v: "home-list-item-conttag"
                        }]
                    }
                },
                ".h-16": {
                    height: "16px"
                },
                ".mr-8": {
                    marginRight: "8px"
                }
            }
        }, function (t, e, i) {
            t.exports = function (t, e, o) {
                "use strict";
                var n;

                function r(t, e) {
                    var i = Object.keys(t);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(t);
                        e && (o = o.filter((function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable
                        }))), i.push.apply(i, o)
                    }
                    return i
                }

                function a(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var i = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? r(Object(i), !0).forEach((function (e) {
                            s(t, e, i[e])
                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach((function (e) {
                            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                        }))
                    }
                    return t
                }

                function s(t, e, i) {
                    return e in t ? Object.defineProperty(t, e, {
                        value: i,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[e] = i, t
                }

                function c(t) {
                    return function (t) {
                        if (Array.isArray(t)) return u(t)
                    }(t) || function (t) {
                        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
                    }(t) || function (t, e) {
                        if (!t) return;
                        if ("string" == typeof t) return u(t, e);
                        var i = Object.prototype.toString.call(t).slice(8, -1);
                        "Object" === i && t.constructor && (i = t.constructor.name);
                        if ("Map" === i || "Set" === i) return Array.from(t);
                        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return u(t, e)
                    }(t) || function () {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function u(t, e) {
                    (null == e || e > t.length) && (e = t.length);
                    for (var i = 0, o = new Array(e); i < e; i++) o[i] = t[i];
                    return o
                }
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var l = ((n = i(2)) && n.__esModule ? n : {
                        default: n
                    }).default.jumpToWebview,
                    p = {
                        props: ["poiData", "poiIndex", "latitude", "longitude", "poi", "uuid", "brand"],
                        computed: {
                            poiDataFormated: function () {
                                var t = 0;
                                1 === this.poiData.status && this.poiData.shippingTimeInfo ? t = 1 : 3 === this.poiData.status && (t = 3);
                                var e = this.poiData.labelInfoFirst ? c(this.poiData.labelInfoFirst) : [],
                                    i = e.length,
                                    o = this.poiData.labelInfo ? c(this.poiData.labelInfo) : [],
                                    n = o.length;
                                i < 5 && (e.length = 5, e.fill({
                                    contentColor: "#ff635b",
                                    content: !1
                                }, i)), n < 10 ? (o.length = 10, o.fill({
                                    contentColor: "#ff635b",
                                    content: !1
                                }, n)) : o.splice(10);
                                var r = this.poiData.recommendInfo && this.poiData.recommendInfo.recommendReason,
                                    s = this.poiData.adType && 2 === this.poiData.adType,
                                    u = this.poiData.shippingTimeInfo && 1 === this.poiData.shippingTimeInfo.reservationStatus,
                                    l = this.poiData.labelInfo && this.poiData.labelInfo.length > 0,
                                    p = this.poiData.labelInfoSecond && this.poiData.labelInfoSecond.length > 0;
                                return a(a({}, this.poiData), {}, {
                                    statusFormat: t,
                                    labelInfoFirstFromated: e,
                                    labelInfoFromated: o,
                                    showTags: r,
                                    showAd: s,
                                    showRedStatus: u,
                                    showOffs: l,
                                    showOffIcon: p
                                })
                            }
                        },
                        onPoiTap: function (t) {
                            var e = (t || {}).mtWmPoiId;
                            if (e) {
                                var i = "/waimai/mindex/menu?mtShopId=".concat(e, "&source=shoplist");
                                l(i, {
                                    initialLat: this.latitude,
                                    initialLng: this.longitude,
                                    actualLat: this.latitude,
                                    actualLng: this.longitude,
                                    wm_latitude: this.latitude,
                                    wm_longitude: this.longitude,
                                    wm_poi: this.poi,
                                    wm_actual_latitude: this.latitude,
                                    wm_actual_longitude: this.longitude,
                                    wm_actual_poi: this.poi,
                                    mt_uuid: this.uuid
                                }, {
                                    brand: this.brand
                                })
                            }
                        },
                        tagFold: function (t) {
                            t.stopPropagation(), this.$emit("tagfold", {
                                poiIndex: this.poiIndex
                            })
                        }
                    };
                e.default = p
            }
        }, function (t, e) {
            t.exports = {
                type: "div",
                attr: {},
                classList: ["home-list-item"],
                events: {
                    click: function (t) {
                        this.onPoiTap(this.poiData, t)
                    }
                },
                children: [{
                    type: "stack",
                    attr: {},
                    classList: ["home-list-item-logo"],
                    children: [{
                        type: "comp-img",
                        attr: {
                            visiable: function () {
                                return !0
                            },
                            imgurl: function () {
                                return this.poiData.picUrl
                            },
                            stylestr: function () {
                                return "width: 80px; height: 60px; border-radius: 4px; object-fit: contain;" + (3 === this.poiData.status ? " opacity: 0.5;" : "")
                            }
                        }
                    }, {
                        type: "div",
                        attr: {},
                        classList: ["home-list-item-logocont"],
                        children: [{
                            type: "div",
                            attr: {},
                            classList: ["home-list-item-logoads"],
                            children: [{
                                type: "image",
                                attr: {
                                    show: function () {
                                        return !!this.poiData.poiPromotionPic
                                    },
                                    src: function () {
                                        return this.poiData.poiPromotionPic
                                    }
                                },
                                classList: ["home-list-item-logopromo"]
                            }, {
                                type: "image",
                                attr: {
                                    show: function () {
                                        return !!this.poiDataFormated.showAd
                                    },
                                    src: "/Common/imgs/adbg.png"
                                },
                                classList: ["home-list-item-logoad"]
                            }]
                        }, {
                            type: "image",
                            attr: {
                                show: function () {
                                    return !!this.poiData.poiTypeIcon
                                },
                                src: function () {
                                    return this.poiData.poiTypeIcon
                                }
                            },
                            classList: ["home-list-item-logoicon"]
                        }]
                    }]
                }, {
                    type: "div",
                    attr: {},
                    classList: function () {
                        return ["home-list-item-cont" + (3 === this.poiData.status ? " home-list-item-contclosed" : "")]
                    },
                    children: [{
                        type: "text",
                        attr: {
                            value: function () {
                                return this.poiData.shopName
                            }
                        },
                        classList: ["home-list-item-conttit"]
                    }, {
                        type: "div",
                        attr: {},
                        classList: ["home-list-item-conts"],
                        children: [{
                            type: "div",
                            attr: {
                                show: function () {
                                    return 1 === this.poiDataFormated.statusFormat
                                }
                            },
                            classList: function () {
                                return ["home-list-item-contnum", "h-16", this.poiDataFormated.showRedStatus ? "home-list-item-contcolor-red" : "home-list-item-contcolor-blue"]
                            },
                            children: [{
                                type: "text",
                                attr: {
                                    value: function () {
                                        return this.poiData.shippingTimeInfo && this.poiData.shippingTimeInfo.statusContent
                                    }
                                },
                                classList: ["home-list-item-contstatus", "h-16", "mr-8"]
                            }, {
                                type: "text",
                                attr: {
                                    value: function () {
                                        return this.poiData.shippingTimeInfo && this.poiData.shippingTimeInfo.descContent
                                    }
                                },
                                classList: ["home-list-item-contstatusdesc"]
                            }]
                        }, {
                            type: "div",
                            attr: {
                                show: function () {
                                    return 3 === this.poiDataFormated.statusFormat
                                }
                            },
                            classList: ["home-list-item-contnum", "h-16"],
                            children: [{
                                type: "text",
                                attr: {
                                    value: function () {
                                        return this.poiData.statusDesc
                                    }
                                },
                                classList: ["home-list-item-contrest", "h-16"]
                            }]
                        }, {
                            type: "div",
                            attr: {
                                show: function () {
                                    return 1 !== this.poiDataFormated.statusFormat && 3 !== this.poiDataFormated.statusFormat
                                }
                            },
                            classList: ["home-list-item-contnum"],
                            children: [{
                                type: "image",
                                attr: {
                                    show: function () {
                                        return !!this.poiData.wmPoiScore
                                    },
                                    src: "/Common/imgs/start.png"
                                },
                                classList: ["home-list-item-contstart"]
                            }, {
                                type: "text",
                                attr: {
                                    show: function () {
                                        return !!this.poiData.wmPoiScore
                                    },
                                    value: function () {
                                        return this.poiData.wmPoiScore
                                    }
                                },
                                classList: ["home-list-item-contscore", "mr-8"]
                            }, {
                                type: "image",
                                attr: {
                                    show: function () {
                                        return !this.poiData.wmPoiScore
                                    },
                                    src: "/Common/imgs/greystart.png"
                                },
                                classList: ["home-list-item-contstart"]
                            }, {
                                type: "text",
                                attr: {
                                    show: function () {
                                        return !this.poiData.wmPoiScore
                                    },
                                    value: "暂无评分"
                                },
                                classList: ["home-list-item-contscorenone", "mr-8"]
                            }, {
                                type: "text",
                                attr: {
                                    value: function () {
                                        return this.poiDataFormated.monthSalesTip
                                    }
                                },
                                classList: ["home-list-item-conttxt"]
                            }]
                        }, {
                            type: "div",
                            attr: {},
                            classList: ["home-list-item-conttime"],
                            children: [{
                                type: "text",
                                attr: {
                                    value: function () {
                                        return this.poiData.deliveryTimeTip
                                    }
                                },
                                classList: ["home-list-item-conttxt", "mr-8"]
                            }, {
                                type: "text",
                                attr: {
                                    value: function () {
                                        return this.poiData.distance
                                    }
                                },
                                classList: ["home-list-item-conttxt"]
                            }]
                        }]
                    }, {
                        type: "div",
                        attr: {},
                        classList: ["home-list-item-contdet"],
                        children: [{
                            type: "div",
                            attr: {},
                            classList: ["home-list-item-continfo"],
                            children: [{
                                type: "text",
                                attr: {
                                    show: function () {
                                        return !!this.poiData.minPriceTip
                                    },
                                    value: function () {
                                        return this.poiData.minPriceTip
                                    }
                                },
                                classList: ["home-list-item-conttxt", "mr-8"]
                            }, {
                                type: "text",
                                attr: {
                                    show: function () {
                                        return !!this.poiData.shippingFeeTip
                                    },
                                    value: function () {
                                        return this.poiData.shippingFeeTip
                                    }
                                },
                                classList: ["home-list-item-conttxt", "mr-8"]
                            }, {
                                type: "text",
                                attr: {
                                    show: function () {
                                        return !!this.poiData.averagePriceTip
                                    },
                                    value: function () {
                                        return this.poiData.averagePriceTip
                                    }
                                },
                                classList: ["home-list-item-conttxt"]
                            }]
                        }, {
                            type: "div",
                            attr: {},
                            classList: ["home-list-item-contflag"],
                            children: [{
                                type: "text",
                                attr: {
                                    show: function () {
                                        return 1 === this.poiData.deliveryType
                                    },
                                    value: "美团专送"
                                },
                                classList: ["home-list-item-contflagtxt"]
                            }, {
                                type: "text",
                                attr: {
                                    show: function () {
                                        return 2 === this.poiData.deliveryType
                                    },
                                    value: "全城送"
                                },
                                classList: ["home-list-item-contflagtxt"]
                            }]
                        }]
                    }, {
                        type: "div",
                        attr: {
                            show: function () {
                                return !!this.poiDataFormated.showTags
                            }
                        },
                        classList: ["home-list-item-conttags"],
                        children: [{
                            type: "text",
                            attr: {
                                value: function () {
                                    return this.poiData.recommendInfo && this.poiData.recommendInfo.recommendReason
                                }
                            },
                            classList: ["home-list-item-conttag"]
                        }]
                    }, {
                        type: "div",
                        attr: {
                            show: function () {
                                return !!this.poiDataFormated.showOffs
                            }
                        },
                        classList: ["home-list-item-contoffs"],
                        children: [{
                            type: "div",
                            attr: {},
                            classList: ["home-list-item-contofftagstotal"],
                            children: [{
                                type: "div",
                                attr: {
                                    show: function () {
                                        return !!this.poiData.isLabelInfoFold
                                    }
                                },
                                classList: ["home-list-item-contofftagsfirst"],
                                children: [{
                                    type: "block",
                                    attr: {},
                                    repeat: {
                                        exp: function () {
                                            return this.poiDataFormated.labelInfoFirstFromated
                                        },
                                        key: "tagIndex",
                                        value: "tagItem"
                                    },
                                    children: [{
                                        type: "text",
                                        attr: {
                                            show: function () {
                                                return !!this.tagItem.content
                                            },
                                            value: function () {
                                                return this.tagItem.content
                                            }
                                        },
                                        style: {
                                            color: function () {
                                                return this.tagItem.contentColor
                                            },
                                            borderColor: function () {
                                                return this.tagItem.contentColor
                                            }
                                        },
                                        classList: ["home-list-item-contoff"]
                                    }]
                                }]
                            }, {
                                type: "div",
                                attr: {
                                    show: function () {
                                        return !this.poiData.isLabelInfoFold
                                    }
                                },
                                classList: ["home-list-item-contofftags"],
                                children: [{
                                    type: "block",
                                    attr: {},
                                    repeat: {
                                        exp: function () {
                                            return this.poiDataFormated.labelInfoFromated
                                        },
                                        key: "tagIndex",
                                        value: "tagItem"
                                    },
                                    children: [{
                                        type: "text",
                                        attr: {
                                            show: function () {
                                                return !!this.tagItem.content
                                            },
                                            value: function () {
                                                return this.tagItem.content
                                            }
                                        },
                                        style: {
                                            color: function () {
                                                return this.tagItem.contentColor
                                            },
                                            borderColor: function () {
                                                return this.tagItem.contentColor
                                            }
                                        },
                                        classList: ["home-list-item-contoff"]
                                    }]
                                }]
                            }]
                        }, {
                            type: "div",
                            attr: {
                                show: function () {
                                    return !!this.poiDataFormated.labelInfoSecond && this.poiDataFormated.labelInfoSecond.length > 0
                                }
                            },
                            classList: ["home-list-item-contofficon"],
                            events: {
                                click: "tagFold"
                            },
                            children: [{
                                type: "image",
                                attr: {
                                    src: "/Common/imgs/morearr.png"
                                },
                                classList: function () {
                                    return ["home-list-item-contfold", this.poiData.isLabelInfoFold ? "home-list-item-contfolded" : ""]
                                }
                            }]
                        }]
                    }]
                }]
            }
        }, function (t, e, i) {
            var o = i(35);
            $app_define$("@app-component/comp-list-item-holdplace", [], (function (t, e, n) {
                n.exports.template = i(36), n.exports.style = o
            }))
        }, function (t, e) {
            t.exports = {
                ".home-hplist-item": {
                    backgroundColor: "#ffffff",
                    marginBottom: "30px",
                    paddingTop: "0px",
                    paddingRight: "12px",
                    paddingBottom: "0px",
                    paddingLeft: "12px",
                    width: "375px"
                },
                ".home-hplist-item-logo": {
                    borderRadius: "4px",
                    width: "80px",
                    height: "60px",
                    marginRight: "8px"
                },
                ".home-hplist-item-logoimg": {
                    width: "80px",
                    height: "60px",
                    borderRadius: "4px",
                    backgroundColor: "#F0F1F2"
                },
                ".home-hplist-item-logoimgclosed": {
                    opacity: .5
                },
                ".home-hplist-item-cont": {
                    flex: 1,
                    flexDirection: "column"
                },
                ".home-hplist-item-conttit": {
                    height: "18px",
                    backgroundColor: "#F0F1F2",
                    marginBottom: "10px",
                    width: "140px"
                },
                ".home-hplist-item-conts": {
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px"
                },
                ".home-hplist-item-contnum": {
                    height: "11px"
                },
                ".home-hplist-item-contscore": {
                    width: "50px",
                    height: "11px",
                    backgroundColor: "#F0F1F2"
                },
                ".home-hplist-item-conttime": {
                    height: "11px"
                },
                ".home-hplist-item-conttxt": {
                    height: "11px",
                    backgroundColor: "#F0F1F2",
                    lineHeight: "11px",
                    width: "50px"
                },
                ".home-hplist-item-contdet": {
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px"
                },
                ".home-hplist-item-contflag": {
                    backgroundColor: "#F0F1F2",
                    borderRadius: "2px",
                    height: "14px",
                    width: "60px"
                },
                ".home-hplist-item-conttags": {
                    marginBottom: "8px",
                    height: "20px"
                },
                ".home-hplist-item-conttag": {
                    backgroundColor: "#F0F1F2",
                    borderRadius: "2px",
                    width: "100px",
                    height: "14px"
                },
                ".home-hplist-item-contoffs": {
                    alignItems: "center",
                    justifyContent: "space-between"
                },
                ".home-hplist-item-contoff": {
                    marginRight: "4px",
                    marginBottom: "6px",
                    borderRadius: "2px",
                    backgroundColor: "#F0F1F2",
                    width: "50px",
                    height: "16px"
                },
                ".home-hplist-item-contofftags": {
                    flexGrow: 1,
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "center"
                },
                ".home-hplist-item-contofftagstotal": {
                    flexGrow: 1,
                    flexDirection: "column"
                },
                ".home-hplist-item-contofftagsfirst": {
                    flexGrow: 1,
                    flexWrap: "wrap",
                    alignItems: "center",
                    height: "22px"
                },
                ".h-16": {
                    height: "16px"
                },
                ".mr-8": {
                    marginRight: "8px"
                }
            }
        }, function (t, e) {
            t.exports = {
                type: "div",
                attr: {},
                classList: ["home-hplist-item"],
                children: [{
                    type: "stack",
                    attr: {},
                    classList: ["home-hplist-item-logo"],
                    children: [{
                        type: "text",
                        attr: {},
                        classList: ["home-hplist-item-logoimg"]
                    }]
                }, {
                    type: "div",
                    attr: {},
                    classList: ["home-hplist-item-cont"],
                    children: [{
                        type: "text",
                        attr: {},
                        classList: ["home-hplist-item-conttit"]
                    }, {
                        type: "div",
                        attr: {},
                        classList: ["home-hplist-item-conts"],
                        children: [{
                            type: "block",
                            attr: {},
                            children: [{
                                type: "div",
                                attr: {},
                                classList: ["home-hplist-item-contnum"],
                                children: [{
                                    type: "text",
                                    attr: {},
                                    classList: ["home-hplist-item-contscore", "mr-8"]
                                }, {
                                    type: "text",
                                    attr: {},
                                    classList: ["home-hplist-item-conttxt"]
                                }]
                            }]
                        }, {
                            type: "div",
                            attr: {},
                            classList: ["home-hplist-item-conttime"],
                            children: [{
                                type: "text",
                                attr: {},
                                classList: ["home-hplist-item-conttxt", "mr-8"]
                            }, {
                                type: "text",
                                attr: {},
                                classList: ["home-hplist-item-conttxt"]
                            }]
                        }]
                    }, {
                        type: "div",
                        attr: {},
                        classList: ["home-hplist-item-contdet"],
                        children: [{
                            type: "div",
                            attr: {},
                            classList: ["home-hplist-item-continfo"],
                            children: [{
                                type: "text",
                                attr: {},
                                classList: ["home-hplist-item-conttxt", "mr-8"]
                            }, {
                                type: "text",
                                attr: {},
                                classList: ["home-hplist-item-conttxt"]
                            }]
                        }, {
                            type: "div",
                            attr: {},
                            classList: ["home-hplist-item-contflag"],
                            children: [{
                                type: "text",
                                attr: {},
                                classList: ["home-hplist-item-contflagtxt"]
                            }]
                        }]
                    }, {
                        type: "div",
                        attr: {},
                        classList: ["home-hplist-item-conttags"],
                        children: [{
                            type: "text",
                            attr: {},
                            classList: ["home-hplist-item-conttag"]
                        }]
                    }, {
                        type: "div",
                        attr: {},
                        classList: ["home-hplist-item-contoffs"],
                        children: [{
                            type: "div",
                            attr: {},
                            classList: ["home-hplist-item-contofftagstotal"],
                            children: [{
                                type: "div",
                                attr: {},
                                classList: ["home-hplist-item-contofftagsfirst"],
                                children: [{
                                    type: "text",
                                    attr: {},
                                    classList: ["home-hplist-item-contoff"]
                                }, {
                                    type: "text",
                                    attr: {},
                                    classList: ["home-hplist-item-contoff"]
                                }, {
                                    type: "text",
                                    attr: {},
                                    classList: ["home-hplist-item-contoff"]
                                }]
                            }]
                        }]
                    }]
                }]
            }
        }, function (t, e, i) {
            var o = i(38),
                n = i(39);
            $app_define$("@app-component/comp-footer", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(40), r.exports.style = o
            }))
        }, function (t, e) {
            t.exports = {
                ".home-footer": {
                    width: "375px",
                    height: "49px",
                    backgroundColor: "#ffffff",
                    paddingTop: "3px",
                    paddingRight: "2px",
                    paddingBottom: "3px",
                    paddingLeft: "2px",
                    alignItems: "center",
                    justifyContent: "space-around"
                },
                ".home-footer-cont": {
                    width: "30px",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "49px"
                },
                ".home-footer-cont-logo": {
                    height: "30px",
                    width: "30px"
                },
                ".home-footer-cont-txt": {
                    height: "14px",
                    width: "30px",
                    color: "#999999",
                    fontSize: "10px",
                    lineHeight: "10px",
                    lines: 1,
                    textOverflow: "ellipsis",
                    textAlign: "center"
                }
            }
        }, function (t, e, i) {
            t.exports = function (t, e, o) {
                "use strict";
                var n;
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var r = ((n = i(2)) && n.__esModule ? n : {
                        default: n
                    }).default.jumpToWebview,
                    a = {
                        props: ["latitude", "longitude", "poi", "uuid", "brand"],
                        onOrderTap: function () {
                            r("/waimai/mindex/olist", {
                                wm_actual_latitude: this.latitude,
                                wm_actual_longitude: this.longitude,
                                wm_actual_poi: this.poi,
                                wm_latitude: this.latitude,
                                wm_longitude: this.longitude,
                                wm_poi: this.poi,
                                lat: this.latitude,
                                lng: this.longitude,
                                mt_uuid: this.uuid
                            }, {
                                brand: this.brand
                            })
                        },
                        onMineTap: function () {
                            r("/waimai/mindex/mine", {
                                wm_actual_latitude: this.latitude,
                                wm_actual_longitude: this.longitude,
                                wm_actual_poi: this.poi,
                                wm_latitude: this.latitude,
                                wm_longitude: this.longitude,
                                wm_poi: this.poi,
                                lat: this.latitude,
                                lng: this.longitude,
                                mt_uuid: this.uuid
                            }, {
                                brand: this.brand
                            })
                        }
                    };
                e.default = a
            }
        }, function (t, e) {
            t.exports = {
                type: "div",
                attr: {},
                classList: ["home-footer"],
                children: [{
                    type: "div",
                    attr: {},
                    classList: ["home-footer-cont"],
                    children: [{
                        type: "image",
                        attr: {
                            src: "/Common/imgs/homebtn.png"
                        },
                        classList: ["home-footer-cont-logo"]
                    }, {
                        type: "text",
                        attr: {
                            value: "首页"
                        },
                        classList: ["home-footer-cont-txt"]
                    }]
                }, {
                    type: "div",
                    attr: {},
                    classList: ["home-footer-cont"],
                    events: {
                        click: "onOrderTap"
                    },
                    children: [{
                        type: "image",
                        attr: {
                            src: "/Common/imgs/ordergrey.png"
                        },
                        classList: ["home-footer-cont-logo"]
                    }, {
                        type: "text",
                        attr: {
                            value: "订单"
                        },
                        classList: ["home-footer-cont-txt"]
                    }]
                }, {
                    type: "div",
                    attr: {},
                    classList: ["home-footer-cont"],
                    events: {
                        click: "onMineTap"
                    },
                    children: [{
                        type: "image",
                        attr: {
                            src: "/Common/imgs/megrey.png"
                        },
                        classList: ["home-footer-cont-logo"]
                    }, {
                        type: "text",
                        attr: {
                            value: "我的"
                        },
                        classList: ["home-footer-cont-txt"]
                    }]
                }]
            }
        }, function (t, e, i) {
            var o = i(42),
                n = i(43);
            $app_define$("@app-component/comp-header-sticky", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(44), r.exports.style = o
            }))
        }, function (t, e) {
            t.exports = {
                ".home-header-search-sticky": {
                    height: "45px",
                    paddingTop: "5px",
                    paddingRight: "12px",
                    paddingBottom: "5px",
                    paddingLeft: "12px",
                    backgroundColor: "#ffffff"
                },
                ".home-header-search-stickycont": {
                    flexGrow: 1,
                    backgroundColor: "#F0F1F2",
                    borderRadius: "8px",
                    alignItems: "center"
                },
                ".home-header-search-stickylogo": {
                    height: "15px",
                    width: "15px",
                    marginLeft: "8px",
                    marginRight: "6px"
                },
                ".home-header-search-stickytxt": {
                    fontSize: "14px",
                    color: "#999897",
                    lineHeight: "15px"
                }
            }
        }, function (t, e, i) {
            t.exports = function (t, e, o) {
                "use strict";
                var n;
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var r = ((n = i(2)) && n.__esModule ? n : {
                        default: n
                    }).default.jumpToWebview,
                    a = {
                        props: ["latitude", "longitude", "poi", "uuid", "brand"],
                        onSearchTap: function () {
                            r("/waimai/mindex/search?mode=search", {
                                wm_actual_latitude: this.latitude,
                                wm_actual_longitude: this.longitude,
                                wm_actual_poi: this.poi,
                                wm_latitude: this.latitude,
                                wm_longitude: this.longitude,
                                wm_poi: this.poi,
                                lat: this.latitude,
                                lng: this.longitude,
                                mt_uuid: this.uuid
                            }, {
                                brand: this.brand
                            })
                        }
                    };
                e.default = a
            }
        }, function (t, e) {
            t.exports = {
                type: "div",
                attr: {},
                classList: ["home-header-search-sticky"],
                children: [{
                    type: "div",
                    attr: {},
                    events: {
                        click: "onSearchTap"
                    },
                    classList: ["home-header-search-stickycont"],
                    children: [{
                        type: "image",
                        attr: {
                            src: "/Common/imgs/search.png"
                        },
                        classList: ["home-header-search-stickylogo"]
                    }, {
                        type: "text",
                        attr: {
                            value: "请输入商家或商品名称"
                        },
                        classList: ["home-header-search-stickytxt"]
                    }]
                }]
            }
        }, function (t, e, i) {
            var o = i(46),
                n = i(47);
            $app_define$("@app-component/comp-error", [], (function (t, e, r) {
                n(r, e, t), e.__esModule && e.default && (r.exports = e.default), r.exports.template = i(48), r.exports.style = o
            }))
        }, function (t, e) {
            t.exports = {
                ".home-error": {
                    width: "375px",
                    backgroundColor: "#ffffff",
                    paddingTop: "10px",
                    paddingRight: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center"
                },
                ".home-error-logo": {
                    height: "150px",
                    width: "161px"
                },
                ".home-error-txt": {
                    marginTop: "8px",
                    fontSize: "14px",
                    lineHeight: "24px",
                    color: "#666666"
                },
                ".home-error-btn": {
                    marginTop: "8px",
                    height: "30px",
                    fontSize: "14px",
                    lineHeight: "30px",
                    paddingTop: "0px",
                    paddingRight: "14px",
                    paddingBottom: "0px",
                    paddingLeft: "14px",
                    backgroundColor: "#ffb000",
                    color: "#ffffff",
                    borderRadius: "3px"
                }
            }
        }, function (t, e) {
            t.exports = function (t, e, i) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                e.default = {
                    props: ["errorInfo"],
                    tapErrorButton: function () {
                        this.$emit("tapErrorButton", {})
                    }
                }
            }
        }, function (t, e) {
            t.exports = {
                type: "div",
                attr: {},
                classList: ["home-error"],
                children: [{
                    type: "image",
                    attr: {
                        src: "/Common/imgs/none.png"
                    },
                    classList: ["home-error-logo"]
                }, {
                    type: "text",
                    attr: {
                        value: function () {
                            return this.errorInfo.message
                        }
                    },
                    classList: ["home-error-txt"]
                }, {
                    type: "text",
                    attr: {
                        value: function () {
                            return this.errorInfo.buttonText
                        }
                    },
                    classList: ["home-error-btn"],
                    events: {
                        click: "tapErrorButton"
                    }
                }]
            }
        }, function (t, e) {
            t.exports = {
                ".home-stack": {
                    flexDirection: "column",
                    height: "100%",
                    width: "375px"
                },
                ".home-content": {
                    flex: 1,
                    width: "375px",
                    flexDirection: "column-reverse"
                },
                ".home-list": {
                    width: "375px",
                    flexGrow: 1
                },
                ".home-header": {
                    width: "375px",
                    backgroundColor: "#ffffff",
                    height: "85px",
                    paddingTop: "0px",
                    paddingRight: "12px",
                    paddingBottom: "0px",
                    paddingLeft: "12px",
                    flexDirection: "column",
                    alignItems: "stretch"
                },
                ".home-header-location": {
                    height: "35px",
                    alignItems: "center"
                },
                ".home-header-location-logo": {
                    height: "20px",
                    width: "20px",
                    marginRight: "4px"
                },
                ".home-header-location-txt": {
                    fontSize: "16px",
                    color: "#333333",
                    lineHeight: "35px",
                    fontWeight: "bold",
                    lines: 1,
                    textOverflow: "ellipsis"
                },
                ".home-header-location-right": {
                    height: "10px",
                    width: "10px"
                },
                ".home-header-search": {
                    height: "35px",
                    marginTop: "5px",
                    marginRight: "0px",
                    marginBottom: "5px",
                    marginLeft: "0px",
                    backgroundColor: "#F0F1F2",
                    borderRadius: "8px",
                    alignItems: "center"
                },
                ".home-header-search-logo": {
                    height: "15px",
                    width: "15px",
                    marginLeft: "8px",
                    marginRight: "6px"
                },
                ".home-header-search-txt": {
                    fontSize: "14px",
                    color: "#999897",
                    lineHeight: "15px"
                },
                ".home-list-tit": {
                    paddingTop: "12px",
                    paddingRight: "12px",
                    paddingBottom: "12px",
                    paddingLeft: "12px",
                    marginBottom: "8px"
                },
                ".home-list-tit-txt": {
                    fontSize: "20px",
                    color: "#333333",
                    lineHeight: "20px"
                },
                ".home-list-cont": {
                    flexDirection: "column"
                },
                ".home-list-loadmore": {
                    justifyContent: "center",
                    alignItems: "center",
                    width: "375px"
                },
                ".home-list-loadmore-logo": {
                    height: "16px",
                    width: "16px",
                    marginTop: "0px",
                    marginRight: "4px",
                    marginBottom: "0px",
                    marginLeft: "4px",
                    transformOrigin: "8px 8px",
                    animationName: "rotate",
                    animationIterationCount: -1,
                    animationDuration: "1000ms",
                    animationTimingFunction: "linear"
                },
                ".home-list-loadmore-txt": {
                    fontSize: "11px",
                    color: "#666666",
                    marginTop: "0px",
                    marginRight: "4px",
                    marginBottom: "0px",
                    marginLeft: "4px"
                },
                ".home-list-loadmore-line": {
                    height: "0.5px",
                    width: "80px",
                    backgroundColor: "#999999"
                },
                ".home-footer-wrap": {
                    flexDirection: "column-reverse",
                    height: "50px"
                },
                ".home-popup": {
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                },
                ".home-popup-toast": {
                    paddingTop: "15px",
                    paddingRight: "15px",
                    paddingBottom: "15px",
                    paddingLeft: "15px"
                },
                ".home-popup-toast-msg": {
                    backgroundColor: "#808080",
                    paddingTop: "10px",
                    paddingRight: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    borderRadius: "4px",
                    fontSize: "16px",
                    color: "#ffffff"
                },
                "@KEYFRAMES": {
                    rotate: [{
                        transform: '{"rotate":"0deg"}',
                        time: 0
                    }, {
                        transform: '{"rotate":"360deg"}',
                        time: 100
                    }]
                }
            }
        }, function (t, e, i) {
            t.exports = function (t, e, o) {
                "use strict";
                Object.defineProperty(e, "__esModule", {
                    value: !0
                }), e.default = void 0;
                var n = l(i(12)),
                    r = l(i(13)),
                    a = l(i(6)),
                    s = l(i(51)),
                    c = l(i(52)),
                    u = l(i(2));

                function l(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }

                function p(t) {
                    return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    })(t)
                }

                function A(t, e, i, o, n, r, a) {
                    try {
                        var s = t[r](a),
                            c = s.value
                    } catch (t) {
                        return void i(t)
                    }
                    s.done ? e(c) : Promise.resolve(c).then(o, n)
                }

                function d(t) {
                    return function (t) {
                        if (Array.isArray(t)) return h(t)
                    }(t) || function (t) {
                        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
                    }(t) || function (t, e) {
                        if (!t) return;
                        if ("string" == typeof t) return h(t, e);
                        var i = Object.prototype.toString.call(t).slice(8, -1);
                        "Object" === i && t.constructor && (i = t.constructor.name);
                        if ("Map" === i || "Set" === i) return Array.from(t);
                        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return h(t, e)
                    }(t) || function () {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()
                }

                function h(t, e) {
                    (null == e || e > t.length) && (e = t.length);
                    for (var i = 0, o = new Array(e); i < e; i++) o[i] = t[i];
                    return o
                }
                var f = u.default.request,
                    m = u.default.jumpToWebview;
                (Object.getPrototypeOf(global) || global).regeneratorRuntime = i(1);
                var g = {
                    public: {
                        hasMore: !1,
                        pageDataLoaded: !1,
                        showErrorTip: !1,
                        errorInfo: {
                            buttonText: "搜索地址",
                            message: "无法获取地址位置，请选择收货地址"
                        },
                        popupInfo: {
                            toast: {
                                isShow: !1,
                                msg: ""
                            }
                        },
                        kingkongList: [],
                        startIndex: 0,
                        poilist: [],
                        loadingPoi: !0,
                        requestMoreNeedLogin: !1,
                        poi: "加载中...",
                        latitude: 0,
                        longitude: 0,
                        uuid: "",
                        brand: "",
                        isHeaderSticky: !1
                    },
                    computed: {
                        kingkongListData: function () {
                            var t = d(this.kingkongList.filter((function (t) {
                                    return 101181 != t.cateId
                                })).slice(0, 10)),
                                e = t.length;
                            if (0 === e) return t;
                            if (e < 5) {
                                var i = new Array(5 - e).fill({});
                                t = t.concat(i)
                            } else if (e < 10) {
                                var o = new Array(10 - e).fill({});
                                t = t.concat(o)
                            }
                            return t
                        }
                    },
                    onInit: function () {
                        n.default.setUserCacheLocation(), this.loadData(!1)
                    },
                    onShow: function () {
                        var t = this;
                        n.default.getUserCacheLocation().then((function (e) {
                            if (e) {
                                var i = e.poi,
                                    o = e.latitude,
                                    n = e.longitude;
                                i && "加载中..." !== t.poi && i !== t.poi && (t.poi = i, t.latitude = o, t.longitude = n, t.getKingKong(), t.getPoiList())
                            }
                        })), this.requestMoreNeedLogin && a.default.getItem("token").then((function (e) {
                            e ? t.loadMoreData() : (t.requestMoreNeedLogin = !1, t.toast("登录后才能查看更多内容哦"), t.$element("list").scrollTo({
                                index: 0
                            }))
                        })).catch((function () {
                            t.requestMoreNeedLogin = !1, t.toast("登录后才能查看更多内容哦"), t.$element("list").scrollTo({
                                index: 0
                            })
                        }))
                    },
                    loadData: function (t) {
                        var e, i = this;
                        return (e = regeneratorRuntime.mark((function e() {
                            var o;
                            return regeneratorRuntime.wrap((function (e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, n.default.getLocation().then((function (t) {
                                            var e = t.poi,
                                                o = t.latitude,
                                                n = t.longitude;
                                            i.poi = e, i.latitude = o, i.longitude = n
                                        }), (function () {
                                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                                e = t.msg,
                                                o = void 0 === e ? "获取地理位置信息失败，请选择收货地址" : e;
                                            i.poi = "获取地址失败", i.showErrorTip = !0, i.errorInfo.message = o, i.errorInfo.buttonText = "重新定位"
                                        }));
                                    case 2:
                                        return e.next = 4, (0, r.default)();
                                    case 4:
                                        if (o = e.sent, i.uuid = o.uuid, !i.brand && o.brand && (i.brand = o.brand), t || s.default.pv(i.uuid, i.brand), i.latitude && i.longitude) {
                                            e.next = 10;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 10:
                                        i.getKingKong(), i.getPoiList();
                                    case 12:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        })), function () {
                            var t = this,
                                i = arguments;
                            return new Promise((function (o, n) {
                                var r = e.apply(t, i);

                                function a(t) {
                                    A(r, o, n, a, s, "next", t)
                                }

                                function s(t) {
                                    A(r, o, n, a, s, "throw", t)
                                }
                                a(void 0)
                            }))
                        })()
                    },
                    getKingKong: function () {
                        var t = this;
                        f({
                            brand: this.brand,
                            method: "post",
                            responseType: "json",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                geoType: 2,
                                openh5_uuid: this.uuid,
                                uuid: this.uuid
                            },
                            url: c.default.kingkong
                        }).then((function (e) {
                            var i = e.data.data;
                            if (i && i.data && i.data.kingkongList) {
                                var o = i.data.kingkongList;
                                t.kingkongList = o
                            }
                        }))
                    },
                    getPoiList: function () {
                        var t = this,
                            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                        this.loadingPoi = !0, f({
                            brand: this.brand,
                            url: c.default.poiList,
                            method: "POST",
                            responseType: "json",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                startIndex: e,
                                sortId: 0,
                                multiFilterIds: "",
                                sliderSelectCode: "",
                                sliderSelectMin: "",
                                sliderSelectMax: "",
                                geoType: 2,
                                rankTraceId: i,
                                openh5_uuid: this.uuid,
                                uuid: this.uuid
                            }
                        }).then((function (i) {
                            var o = i.data.data,
                                n = o.code,
                                r = o.msg,
                                s = void 0 === r ? "附近还没商家可以送外卖哦" : r,
                                c = o.data,
                                u = void 0 === c ? {} : c;
                            t.pageDataLoaded || (t.pageDataLoaded = !0), t.loadingPoi = !1, t.requestMoreNeedLogin = !1;
                            var l = "";
                            if (200410 === n || 200411 === n) return t.xianliu = !1, t.showErrorTip = !1, void a.default.getItem("token").then((function (e) {
                                e ? t.toast("登录信息已过期，请重新登录！") : (t.requestMoreNeedLogin = !0, l = "/login?force=true&back_url=".concat(encodeURIComponent("https://h5.waimai.meituan.com/waimai/mindex/home")), m(l, {
                                    wm_actual_latitude: t.latitude,
                                    wm_actual_longitude: t.longitude,
                                    wm_actual_poi: t.poi,
                                    wm_latitude: t.latitude,
                                    wm_longitude: t.longitude,
                                    wm_poi: t.poi,
                                    lat: t.latitude,
                                    lng: t.longitude,
                                    mt_uuid: t.uuid
                                }, {
                                    brand: t.brand
                                }))
                            }));
                            if (1 === n) return t.showErrorTip = !0, t.errorInfo.message = s, t.errorInfo.buttonText = "切换地址", void(t.xianliu = !1);
                            if (200100 === n || 801 === n || 802 === n || 803 === n || 804 === n || 805 === n || 806 === n) return t.xianliu = !0, t.showErrorTip = !0, void(t.errorInfo = {
                                buttonText: "点击刷新",
                                message: o.data.msg || "网络繁忙，获取数据失败"
                            });
                            var p = u.shopList.map((function (t) {
                                    t.wmPoiScore = t.wmPoiScore / 10;
                                    var e = [];
                                    return t.discounts2 && t.discounts2.forEach((function (t) {
                                        if (/^满/.test(t.info)) {
                                            var i = t.info.split(";").map((function (t) {
                                                return {
                                                    content: t,
                                                    contentColor: "#ff635b"
                                                }
                                            }));
                                            e.push.apply(e, d(i))
                                        } else /发票/.test(t.info) ? e.push({
                                            content: "支持发票",
                                            contentColor: "#519cf0"
                                        }) : /^折扣商品/.test(t.info) ? e.push({
                                            content: t.info.replace("折扣商品", ""),
                                            contentColor: "#c183e2"
                                        }) : e.push({
                                            content: t.info,
                                            contentColor: "#fec032"
                                        })
                                    })), e.length > 3 && (t.isLabelInfoFold = !0), t.labelInfo = e, t.labelInfoFirst = e.slice(0, 3), t.labelInfoSecond = e.slice(3), t
                                })),
                                A = u.poiHasNextPage,
                                h = u.nextStartIndex,
                                f = u.judasData,
                                g = void 0 === f ? {} : f;
                            t.poilist = 0 === e ? p : t.poilist.concat(p), t.xianliu = !1, t.showErrorTip = !1, t.rankTraceId = g.rankTraceId || "", t.hasMore = A, t.startIndex = h
                        })).catch((function () {
                            t.loadingPoi = !1, t.xianliu = !1, t.showErrorTip = !1
                        }))
                    },
                    onLocationTap: function () {
                        var t = this;
                        n.default.getCacheLocation().then((function (e) {
                            if (!e) throw Error("");
                            var i = e.latitude,
                                o = e.longitude,
                                n = e.poi;
                            m("/waimai/mindex/poipicker", {
                                wm_actual_latitude: i,
                                wm_actual_longitude: o,
                                wm_actual_poi: n,
                                wm_latitude: i,
                                wm_longitude: o,
                                wm_poi: n,
                                lat: i,
                                lng: o,
                                mt_uuid: t.uuid
                            }, {
                                brand: t.brand
                            })
                        })).catch((function () {
                            m("/waimai/mindex/poipicker", {
                                wm_actual_latitude: t.latitude,
                                wm_actual_longitude: t.longitude,
                                wm_actual_poi: t.poi,
                                wm_latitude: t.latitude,
                                wm_longitude: t.longitude,
                                wm_poi: t.poi,
                                lat: t.latitude,
                                lng: t.longitude,
                                mt_uuid: t.uuid
                            }, {
                                brand: t.brand
                            })
                        }))
                    },
                    onSearchTap: function () {
                        m("/waimai/mindex/search?mode=search", {
                            wm_actual_latitude: this.latitude,
                            wm_actual_longitude: this.longitude,
                            wm_actual_poi: this.poi,
                            wm_latitude: this.latitude,
                            wm_longitude: this.longitude,
                            wm_poi: this.poi,
                            lat: this.latitude,
                            lng: this.longitude,
                            mt_uuid: this.uuid
                        }, {
                            brand: this.brand
                        })
                    },
                    tapErrorButton: function () {
                        if (this.latitude && this.longitude)
                            if (this.xianliu) this.getPoiList();
                            else {
                                m("/waimai/mindex/poipicker", {
                                    wm_actual_latitude: this.latitude,
                                    wm_actual_longitude: this.longitude,
                                    wm_actual_poi: this.poi,
                                    wm_latitude: this.latitude,
                                    wm_longitude: this.longitude,
                                    wm_poi: this.poi,
                                    lat: this.latitude,
                                    lng: this.longitude,
                                    mt_uuid: this.uuid
                                }, {
                                    brand: this.brand
                                })
                            }
                        else this.loadData(!0)
                    },
                    showSticky: function () {
                        this.isHeaderSticky = !0
                    },
                    hideSticky: function () {
                        this.isHeaderSticky = !1
                    },
                    toggleTagFold: function (t) {
                        var e = t.detail.poiIndex;
                        this.poilist[e].isLabelInfoFold = !this.poilist[e].isLabelInfoFold
                    },
                    loadMoreData: function () {
                        this.loadingPoi || this.getPoiList(this.startIndex, this.rankTraceId)
                    },
                    toast: function (t) {
                        var e = this,
                            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3;
                        this.popupInfo.toast = {
                            isShow: !0,
                            msg: t
                        }, setTimeout((function () {
                            e.popupInfo.toast = {
                                isShow: !1,
                                msg: ""
                            }
                        }), i)
                    }
                };
                e.default = g;
                var y = e.default || t.exports,
                    x = ["public", "protected", "private"];
                if (y.data && x.some((function (t) {
                        return y[t]
                    }))) throw new Error('页面VM对象中的属性data不可与"' + x.join(",") + '"同时存在，请使用private替换data名称');
                y.data || (y.data = {}, y._descriptor = {}, x.forEach((function (t) {
                    var e = p(y[t]);
                    if ("object" === e)
                        for (var i in y.data = Object.assign(y.data, y[t]), y[t]) y._descriptor[i] = {
                            access: t
                        };
                    else "function" === e && console.warn("页面VM对象中的属性" + t + "的值不能是函数，请使用对象")
                })))
            }
        }, function (t, e, i) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = a($app_require$("@app-module/system.fetch")),
                n = a(i(5)),
                r = a(i(2));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }

            function s(t, e) {
                var i = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(t);
                    e && (o = o.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), i.push.apply(i, o)
                }
                return i
            }

            function c(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? s(Object(i), !0).forEach((function (e) {
                        u(t, e, i[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : s(Object(i)).forEach((function (e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
                    }))
                }
                return t
            }

            function u(t, e, i) {
                return e in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            }
            var l = n.default.ENV,
                p = r.default.getChannelByBrand;

            function A() {
                return Math.floor(1 + 65535 * Math.random()).toString(16).substring(1)
            }

            function d(t, e) {
                var i = p(t),
                    o = i.utm_source,
                    n = i.channel,
                    r = i.mvbid,
                    a = {
                        sdk_ver: "4.13.12",
                        category: "data_sdk_waimai",
                        appnm: "waimai_open",
                        ct: "www",
                        ch: n,
                        utm: {
                            utm_source: o
                        }
                    },
                    s = {
                        nt: 5,
                        nm: e,
                        isauto: 7,
                        val_cid: i.cid
                    };
                return "PV" !== e && r && (s.val_bid = r), {
                    lxConfig: a,
                    lxEvent: s
                }
            }
            var h = {
                uuid: "",
                uuidWithRndSeed: "",
                msid: "",
                req_id: "",
                seq: 0,
                lxid: "",
                lxcuid: "",
                pv: function (t, e) {
                    if ("prod" === l) {
                        var i, n;
                        this.msid = (i = [], n = +new Date, i.push(n.toString(16)), i.push(A()), i.push(A()), i.push(A()), i.join("-")), this.req_id = (new Date).toString(16) + "-" + Math.floor(65535 * Math.random()) + "-" + Math.floor(65535 * Math.random()), this.uuid = t, this.lxid = t, this.lxcuid = t, this.uuidWithRndSeed = "".concat(t, "-").concat(A()), this.seq = 0;
                        var r = [],
                            a = [],
                            s = d(e, "PV"),
                            u = s.lxConfig,
                            p = s.lxEvent,
                            h = c(c({}, u), {}, {
                                lxid: t,
                                lxcuid: t,
                                uuid: this.uuidWithRndSeed,
                                msid: this.msid
                            }),
                            f = c(c({}, p), {}, {
                                tm: +(new Date).getTime(),
                                req_id: this.req_id,
                                seq: this.seq,
                                val_lab: {
                                    custom: {
                                        brand: e,
                                        type: "quickapp"
                                    }
                                }
                            });
                        a.push(f), h.evs = a, r.push(h), o.default.fetch({
                            url: "https://report.meituan.com",
                            responseType: "text",
                            method: "POST",
                            data: JSON.stringify(r)
                        }).then((function () {})), this.seq += 1
                    }
                },
                mv: function (t, e) {
                    if ("prod" === l) {
                        var i = [],
                            n = [],
                            r = d(e, "MV"),
                            a = r.lxConfig,
                            s = r.lxEvent,
                            u = c(c({}, a), {}, {
                                lxid: t,
                                lxcuid: t,
                                uuid: this.uuidWithRndSeed,
                                msid: this.msid
                            }),
                            p = c(c({}, s), {}, {
                                tm: +(new Date).getTime(),
                                req_id: this.req_id,
                                seq: this.seq,
                                val_lab: {
                                    custom: {
                                        brand: e,
                                        type: "quickapp"
                                    }
                                }
                            });
                        n.push(p), u.evs = n, i.push(u), o.default.fetch({
                            url: "https://report.meituan.com",
                            responseType: "text",
                            method: "POST",
                            data: JSON.stringify(i)
                        }).then((function () {})), this.seq += 1
                    }
                }
            };
            e.default = h
        }, function (t, e, i) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var o = {
                kingkong: "/openh5/homepage/kingkong",
                poiList: "/openh5/homepage/poilist"
            };
            e.default = o
        }, function (t, e) {
            t.exports = {
                type: "stack",
                attr: {},
                classList: ["home-stack"],
                children: [{
                    type: "div",
                    attr: {},
                    classList: ["home-content"],
                    children: [{
                        type: "div",
                        attr: {},
                        classList: ["home-footer-wrap"],
                        children: [{
                            type: "comp-footer",
                            attr: {
                                latitude: function () {
                                    return this.latitude
                                },
                                longitude: function () {
                                    return this.longitude
                                },
                                poi: function () {
                                    return this.poi
                                },
                                uuid: function () {
                                    return this.uuid
                                },
                                brand: function () {
                                    return this.brand
                                }
                            }
                        }]
                    }, {
                        type: "list",
                        attr: {
                            id: "list"
                        },
                        classList: ["home-list"],
                        id: "list",
                        children: [{
                            type: "list-item",
                            attr: {
                                type: "header"
                            },
                            children: [{
                                type: "div",
                                attr: {},
                                classList: ["home-header"],
                                children: [{
                                    type: "div",
                                    attr: {},
                                    classList: ["home-header-location"],
                                    events: {
                                        click: "onLocationTap",
                                        disappear: "showSticky",
                                        appear: "hideSticky"
                                    },
                                    children: [{
                                        type: "image",
                                        attr: {
                                            src: "/Common/imgs/location.png"
                                        },
                                        classList: ["home-header-location-logo"]
                                    }, {
                                        type: "text",
                                        attr: {
                                            value: function () {
                                                return this.poi
                                            }
                                        },
                                        classList: ["home-header-location-txt"]
                                    }, {
                                        type: "image",
                                        attr: {
                                            src: "/Common/imgs/right.png"
                                        },
                                        classList: ["home-header-location-right"]
                                    }]
                                }, {
                                    type: "div",
                                    attr: {},
                                    classList: ["home-header-search"],
                                    events: {
                                        click: "onSearchTap"
                                    },
                                    children: [{
                                        type: "image",
                                        attr: {
                                            src: "/Common/imgs/search.png"
                                        },
                                        classList: ["home-header-search-logo"]
                                    }, {
                                        type: "text",
                                        attr: {
                                            value: "请输入商家或商品名称"
                                        },
                                        classList: ["home-header-search-txt"]
                                    }]
                                }]
                            }]
                        }, {
                            type: "list-item",
                            attr: {
                                type: "entryHoldplace"
                            },
                            shown: function () {
                                return !this.kingkongListData || 0 === this.kingkongListData.length
                            },
                            children: [{
                                type: "comp-entry-holdplace",
                                attr: {}
                            }]
                        }, {
                            type: "list-item",
                            attr: {
                                type: "entry"
                            },
                            shown: function () {
                                return this.kingkongListData && this.kingkongListData.length > 0
                            },
                            children: [{
                                type: "comp-entry",
                                attr: {
                                    kingkongListData: function () {
                                        return this.kingkongListData
                                    },
                                    latitude: function () {
                                        return this.latitude
                                    },
                                    longitude: function () {
                                        return this.longitude
                                    },
                                    poi: function () {
                                        return this.poi
                                    },
                                    uuid: function () {
                                        return this.uuid
                                    },
                                    brand: function () {
                                        return this.brand
                                    }
                                }
                            }]
                        }, {
                            type: "list-item",
                            attr: {
                                type: "list-tit"
                            },
                            children: [{
                                type: "div",
                                attr: {},
                                classList: ["home-list-tit"],
                                children: [{
                                    type: "text",
                                    attr: {
                                        value: "附近商家"
                                    },
                                    classList: ["home-list-tit-txt"]
                                }]
                            }]
                        }, {
                            type: "block",
                            attr: {},
                            shown: function () {
                                return this.showErrorTip
                            },
                            children: [{
                                type: "list-item",
                                attr: {
                                    type: "list-item-error"
                                },
                                classList: ["home-list-cont"],
                                children: [{
                                    type: "comp-error",
                                    attr: {
                                        errorInfo: function () {
                                            return this.errorInfo
                                        }
                                    },
                                    events: {
                                        "tap-error-button": "tapErrorButton"
                                    }
                                }]
                            }]
                        }, {
                            type: "block",
                            attr: {},
                            shown: function () {
                                return !this.pageDataLoaded && 0 === this.poilist.length && !this.showErrorTip
                            },
                            children: [{
                                type: "list-item",
                                attr: {
                                    type: "list-item-holdplace"
                                },
                                classList: ["home-list-cont"],
                                children: [{
                                    type: "comp-list-item-holdplace",
                                    attr: {}
                                }, {
                                    type: "comp-list-item-holdplace",
                                    attr: {}
                                }, {
                                    type: "comp-list-item-holdplace",
                                    attr: {}
                                }]
                            }]
                        }, {
                            type: "block",
                            attr: {},
                            shown: function () {
                                return this.poilist && this.poilist.length > 0 && !this.showErrorTip && !(!this.pageDataLoaded && 0 === this.poilist.length)
                            },
                            repeat: {
                                exp: function () {
                                    return this.poilist
                                },
                                key: "poiIndex",
                                value: "poiItem"
                            },
                            children: [{
                                type: "list-item",
                                attr: {
                                    type: "list-item-info"
                                },
                                classList: ["home-list-cont"],
                                children: [{
                                    type: "comp-list-item",
                                    attr: {
                                        poiData: function () {
                                            return this.poiItem
                                        },
                                        poiIndex: function () {
                                            return this.poiIndex
                                        },
                                        latitude: function () {
                                            return this.latitude
                                        },
                                        longitude: function () {
                                            return this.longitude
                                        },
                                        poi: function () {
                                            return this.poi
                                        },
                                        uuid: function () {
                                            return this.uuid
                                        },
                                        brand: function () {
                                            return this.brand
                                        }
                                    },
                                    events: {
                                        tagfold: "toggleTagFold"
                                    }
                                }]
                            }]
                        }, {
                            type: "list-item",
                            attr: {
                                type: "list-loadmore"
                            },
                            shown: function () {
                                return this.poilist && this.poilist.length > 0
                            },
                            children: [{
                                type: "div",
                                attr: {},
                                shown: function () {
                                    return this.hasMore
                                },
                                classList: ["home-list-loadmore"],
                                events: {
                                    appear: "loadMoreData"
                                },
                                children: [{
                                    type: "image",
                                    attr: {
                                        src: "/Common/imgs/loadmore.png"
                                    },
                                    classList: ["home-list-loadmore-logo"]
                                }, {
                                    type: "text",
                                    attr: {
                                        value: "加载中..."
                                    },
                                    classList: ["home-list-loadmore-txt"]
                                }]
                            }, {
                                type: "div",
                                attr: {},
                                shown: function () {
                                    return !this.hasMore
                                },
                                classList: ["home-list-loadmore"],
                                children: [{
                                    type: "div",
                                    attr: {},
                                    classList: ["home-list-loadmore-line"]
                                }, {
                                    type: "text",
                                    attr: {
                                        value: "已无更多商户"
                                    },
                                    classList: ["home-list-loadmore-txt"]
                                }, {
                                    type: "div",
                                    attr: {},
                                    classList: ["home-list-loadmore-line"]
                                }]
                            }]
                        }, {
                            type: "list-item",
                            attr: {
                                type: "list-footer"
                            },
                            children: [{
                                type: "div",
                                attr: {},
                                classList: ["home-list-footer-placehold"]
                            }]
                        }]
                    }]
                }, {
                    type: "comp-header-sticky",
                    attr: {
                        latitude: function () {
                            return this.latitude
                        },
                        longitude: function () {
                            return this.longitude
                        },
                        poi: function () {
                            return this.poi
                        },
                        uuid: function () {
                            return this.uuid
                        },
                        brand: function () {
                            return this.brand
                        }
                    },
                    shown: function () {
                        return this.isHeaderSticky
                    }
                }, {
                    type: "div",
                    attr: {},
                    classList: ["home-popup"],
                    shown: function () {
                        return this.popupInfo.toast.isShow
                    },
                    children: [{
                        type: "div",
                        attr: {},
                        classList: ["home-popup-toast"],
                        shown: function () {
                            return this.popupInfo.toast.isShow
                        },
                        children: [{
                            type: "text",
                            attr: {
                                value: function () {
                                    return this.popupInfo.toast.msg
                                }
                            },
                            classList: ["home-popup-toast-msg"]
                        }]
                    }]
                }]
            }
        }])
    };
    if ("undefined" == typeof window) return t();
    window.createPageHandler = t
}();