window.define("pages/booking/cityInfoPage/cityInfoPage", (function (t, e, i, a, o, n, s, r, c, d, u, g, l, y, f, p, h, I, S) {
    ! function (e) {
        e.global, e.Function;
        var i = e.setTimeout,
            a = (e.setInterval, e.setImmediate, e.requestAnimationFrame, e.swanGlobal, e.jsNative, e.masterManager, e._openSourceDebugInfo, e.System, e.Bdbox_aiapps_jsbridge, e.Bdbox_android_jsbridge, e.Bdbox_android_utils, e._naFile, e._naInteraction, e._naNetwork, e._naRouter, e._naSetting, e._naStorage, e._naUtils, e.globalThis, t("../../../utils/util.js")),
            s = n(),
            r = s.globalData,
            c = "http://www.test.com",
            g = "nameeeee";
        Page({
            data: {
                pageName: "step1-city",
                isSearch: !1,
                isReturn: "",
                cityList: "",
                cityListHot: "",
                toView: "",
                searchCity: "",
                searchCityList: ""
            },
            onLoad: function (t) {
                var e = this;
                e.setData({
                    isReturn: t.isReturn
                }), o.getStorage({
                    key: "CityList",
                    success: function (t) {
                        t.data && e.setData({
                            cityList: t.data
                        })
                    }
                }), o.getStorage({
                    key: "CityListHot",
                    success: function (t) {
                        t.data && e.setData({
                            cityListHot: t.data
                        })
                    }
                }), "" != e.data.cityList && "" != e.data.cityListHot || e.getCityList()
            },
            test: function () {
                            o.getStorage({
                            key: "testkey",
                            success: function(t) {
                                console.log("1111111")
                            }
                            }),o.getStorage({
                              key: g,
                              success: function (t) {
                                  t.data && e.setData({
                                      cityListHot: t.data
                                  })
                              }
                          })
                        },
            onShow: function () {
                o.setPageInfo({
                    title: "选择租车城市",
                    keywords: "一嗨租车,一嗨,租车城市,北京租车,安达租车,大庆租车,哈尔滨租车,鹤岗租车,鸡西租车,肇东租车,佳木斯租车,尚志租车,宾县租车,绥芬河租车,海林租车,牡丹江租车,齐齐哈尔租车,伊春租车,白城租车,松原租车,德惠租车,扶余租车,安图租车,敦化租车,公主岭租车,吉林租车,四平租车,延吉租车,长春租车,宽甸租车,东港租车,铁岭租车,阜新租车,朝阳租车,丹东租车,鞍山租车,兴城租车,绥中租车,本溪租车,大连租车,凤城租车,抚顺租车,葫芦岛租车,锦州租车,辽阳租车,沈阳租车,营口租车,永安租车,福鼎租车,漳浦租车,福安租车,福州租车,建瓯租车,龙岩租车,南平租车,宁德租车,莆田租车,泉州租车,三明租车,厦门租车,武夷山租车,漳州租车,潮州租车,东莞租车,佛山租车,高州租车,河源租车,惠州租车,江门租车,揭阳租车,廉江租车,茂名租车,梅州租车,普宁租车,清远租车,汕头租车,汕尾租车,韶关租车,四会租车,遂溪租车,台山租车,吴川租车,兴宁租车,阳春租车,阳江租车,英德租车,云浮租车,湛江租车,肇庆租车,中山租车,珠海租车,广州租车,澄迈租车,琼中租车,屯昌租车,儋州租车,定安租车,海口租车,临高租车,琼海租车,文昌租车,昌江租车,东方租车,乐东租车,陵水租车,三亚租车,万宁租车,承德租车,霸州租车,保定租车,沧州租车,辛集租车,定州租车,邯郸租车,衡水租车,廊坊租车,秦皇岛租车,石家庄租车,唐山租车,邢台租车,雄安新区租车,张家口租车,巴彦淖尔租车,包头租车,赤峰租车,鄂尔多斯租车,呼和浩特租车,呼伦贝尔租车,通辽租车,乌海租车,乌兰察布租车,锡林浩特租车,洪洞租车,应县租车,怀仁租车,霍州租车,闻喜租车,襄汾租车,太谷租车,介休租车,灵石租车,祁县租车,永济租车,原平租车,吕梁租车,大同租车,侯马租车,晋城租车,晋中租车,临汾租车,平遥租车,朔州租车,太原租车,忻州租车,阳泉租车,运城租车,长治租车,天津租车,启东租车,海安租车,常熟租车,如皋租车,常州租车,句容租车,丹阳租车,淮安租车,江阴租车,靖江租车,昆山租车,溧阳租车,连云港租车,南京租车,南通租车,苏州租车,太仓租车,泰州租车,无锡租车,宿迁租车,徐州租车,盐城租车,扬州租车,宜兴租车,镇江租车,荣成租车,德州租车,东营租车,高密租车,菏泽租车,济南租车,济宁租车,聊城租车,临海租车,临沂租车,青岛租车,青州租车,曲阜租车,日照租车,泰安租车,威海租车,潍坊租车,烟台租车,余姚租车,枣庄租车,淄博租车,江山租车,慈溪租车,德清租车,富阳租车,海宁租车,杭州租车,湖州租车,嘉兴租车,建德租车,金华租车,丽水租车,宁波租车,千岛湖租车,衢州租车,绍兴租车,台州租车,桐庐租车,温岭租车,温州租车,义乌租车,舟山租车,稻城租车,巴中租车,蓬安租车,成都租车,资中租车,达州租车,德阳租车,广安租车,广汉租车,广元租车,简阳租车,江油租车,九寨沟租车,阆中租车,乐山租车,泸州租车,眉山租车,绵阳租车,南部租车,南充租车,内江租车,攀枝花租车,遂宁租车,武胜租车,西昌租车,雅安租车,宜宾租车,资阳租车,自贡租车,拉萨租车,林芝租车,重庆租车,淮北租车,安庆租车,蚌埠租车,池州租车,滁州租车,阜阳租车,合肥租车,淮南租车,黄山租车,六安租车,马鞍山租车,铜陵租车,芜湖租车,宿州租车,宣城租车,长临河租车,安阳租车,巩义租车,鹤壁租车,焦作租车,开封租车,灵宝租车,洛阳租车,漯河租车,南阳租车,平顶山租车,濮阳租车,三门峡租车,商丘租车,新乡租车,新郑租车,信阳租车,许昌租车,永城租车,郑州租车,周口租车,驻马店租车,赤壁租车,麻城租车,红安租车,大冶租车,鄂州租车,恩施租车,汉川租车,黄冈租车,利川租车,黄石租车,荆门租车,荆州租车,潜江租车,十堰租车,随州租车,武汉租车,仙桃租车,咸宁租车,襄阳租车,孝感租车,阳新租车,宜昌租车,枝江租车,常德租车,郴州租车,衡阳租车,怀化租车,吉首租车,耒阳租车,醴陵租车,浏阳租车,娄底租车,汨罗租车,祁东租车,邵阳租车,双峰租车,湘潭租车,新化租车,益阳租车,永州租车,岳阳租车,张家界租车,长沙租车,株洲租车,德兴租车,抚州租车,赣州租车,高安租车,共青城租车,吉安租车,景德镇租车,九江租车,进贤租车,南昌租车,萍乡租车,瑞昌租车,上饶租车,婺源租车,新余租车,宜春租车,鹰潭租车,上海租车,庆阳租车,定西租车,陇南租车,敦煌租车,嘉峪关租车,兰州租车,天水租车,张掖租车,银川租车,格尔木租车,德令哈租车,西宁租车,安康租车,宝鸡租车,汉中租车,渭南租车,西安租车,咸阳租车,延安租车,榆林租车,库尔勒租车,喀什租车,乌鲁木齐租车,深圳租车,百色租车,北海租车,防城港租车,贵港租车,桂林租车,贺州租车,来宾租车,柳州租车,南宁租车,钦州租车,梧州租车,安顺租车,贵定租车,从江租车,都匀租车,贵阳租车,凯里租车,六盘水租车,铜仁租车,兴义租车,遵义租车,保山租车,楚雄租车,大理租车,德宏租车,昆明租车,丽江租车,蒙自租车,普洱租车,曲靖租车,腾冲租车,文山租车,西双版纳租车,玉溪租车,昭通租车",
                    description: "选择要租车的城市",
                    success: function () {
                        console.log("setPageInfo success")
                    },
                    fail: function (t) {
                        console.log("setPageInfo fail", t)
                    }
                })
            },
            onUnload: function () {
                this.setData({
                    isSearch: !1
                })
            },
            toggleSearch: function () {
                o.showToast({
                    title: "加载中",
                    icon: "loading",
                    duration: 1500
                }), this.setData({
                    isSearch: !this.data.isSearch
                })
            },
            getSearchCity: function (t) {
                var e = t.detail.value,
                    i = [];
                e.length > 0 && this.data.cityList.forEach((function (t) {
                    -1 == t.CityCode.toUpperCase().indexOf(e.toUpperCase()) && -1 == t.Name.indexOf(e) || i.push(t)
                })), this.setData({
                    searchCityList: i
                })
            },
            getCityList: function () {
                var t = this,
                    e = "Version=" + r.Version + "&DeviceId=" + r.DeviceId + "&Source=" + r.Source + "&AppStoreId=" + r.AppStoreId + "&Idfa=" + r.Idfa + "&SessionId=" + r.SessionId + "&PromotionUrl=" + r.PromotionUrl + "&PromotionTemplateId=" + r.PromotionTemplateId + "&Longitude=" + r.Longitude + "&Latitude=" + r.Latitude + "&IpAddress=" + r.IpAddress + "&PromotionId=" + r.PromotionId + "&PhoneIMSI=" + r.PhoneIMSI + "&PhoneMAC=" + r.PhoneMAC + "&Extend=" + r.Extend,
                    n = a.getParamEncrypt(r.md5_key, e);
                o.showLoading({
                    title: "加载中",
                    mask: !0
                }), o.request({
                    url: c.CityList,
                    data: {
                        query: n.des
                    },
                    method: "GET",
                    header: {
                        "Content-Type": "application/json",
                        Token: r.Token,
                        Remark: "Unchecked",
                        AppVersion: r.Version,
                        AppPlatform: r.Source,
                        Authorization: n.auth,
                        AppIdentity: r.des_identity
                    },
                    success: function (e) {
                        i((function () {
                            o.hideLoading()
                        }), 1500);
                        var n = [],
                            s = e.data.Result.toString();
                        s = a.decrypt(s, !0), s = JSON.parse(s), console.log("城市列表"), console.log(s);
                        var r, c = s.Result;
                        (c = c.sort((r = "FirstLetter", function (t, e) {
                            var i = t[r],
                                a = e[r];
                            return i < a ? -1 : i > a ? 1 : 0
                        }))).forEach((function (t, e) {
                            !0 === t.IsHot && n.push(t)
                        })), t.setData({
                            cityList: c,
                            cityListHot: n
                        }), o.setStorage({
                            key: "CityList",
                            data: c
                        }), o.setStorage({
                            key: "CityListHot",
                            data: n
                        })
                    },
                    fail: function () {
                        o.hideLoading()
                    }
                })
            },
            letterIndexTap: function (t) {
                var e = t.currentTarget.dataset.index;
                this.setData({
                    toView: e
                })
            },
            cityNameTap: function (t) {
                var e = t.currentTarget.dataset.city,
                    i = a.getCartData();
                "N" == this.data.isReturn ? (i.PickupCity = e, i.ReturnCity = e, i.PickupStore = "", i.ReturnStore = "") : (i.ReturnCity = e, i.ReturnStore = ""), a.setCartData(i), o.navigateBack({
                    url: "../bookIndex/bookIndex"
                })
            }
        })
    }(__hacked)
})), window.__swanRoute = "pages/booking/cityInfoPage/cityInfoPage", window.usingComponents = [], window.usingPluginComponents = [], require("pages/booking/cityInfoPage/cityInfoPage");