(function(c, g) {
    var f = ["http://service.zol.com.cn/user/js/md5.js"],
        j = false,
        e = 1,
        a = false,
        d = {
			ajaxHost: "http://123.59.53.158",
            loadJs: function(i) {
                if (typeof i !== "string") {
                    return false
                }
                var h = document.createElement("script");
                h.src = i;
                h.language = "javascript";
                h.type = "text/javascript";
                document.getElementsByTagName("head")[0].appendChild(h)
            },
            ssoLogin: function(h, i) {
                h = h + "&callback=?";
                c.getJSON(h, i)
            }
        };
    for (var b = 0, l = f.length; b < l; b++) {
        d.loadJs(f[b])
    }
    var k = function(t) {
        var m = c.extend({
                width: 400,
                height: 450,
                hasCover: true,
                registerUrl: "http://service.zol.com.cn/user/login.php?type=reg",
                sinaUrl: "http://service.zol.com.cn/user/api/sina/jump.php?",
                qqUrl: "http://service.zol.com.cn/user/api/qq/libs/oauth/redirect_to_login.php?",
                wechatUrl: "http://service.zol.com.cn/user/api/weixin/jump.php",
                baiduUrl: "http://service.zol.com.cn/user/api/baidu/jump.php",
                getPsw: "http://service.zol.com.cn/user/get_pwd.php",
                cssUrl: "http://icon.zol-img.com.cn/group/css/zLoginDialog.css",
                backUrl: "",
                from: 0,
                checkTimer: "",
                closeEvent: "",
                callback: function() {
                    return true
                }
            },
            t);
        var n = !-[1, ] && !window.XMLHttpRequest;
        var o,
            q = false;
        if (parent) {
            var s = c(parent.window);
            var u = parent.document
        } else {
            var s = c(window);
            var u = document
        }
        if (!m.backUrl) {
            o = window.location.href.split("#");
            m.backUrl = o[0]
        }
        m.registerUrl += "&to=tanceng&backUrl=" + m.backUrl;
        if (m.from) {
            m.sinaUrl += "&from=" + m.from;
            m.qqUrl += "&from=" + m.from;
            m.registerUrl += "&from=" + m.from
        }
        var x = ["@qq.com", "@163.com", "@126.com", "@hotmail.com", "@sina.com", "@gmail.com", "@yahoo.com"];
        if (j === false && m.cssUrl != "") {
            j = true;
            var p = '<link href="' + m.cssUrl + "?" + new Date().getTime() + '" rel="stylesheet">';
            if (parent) {
                c(window.parent.document).find("head").append(p)
            } else {
                c("head").append(c(p))
            }
        }
        var w = {
                getPosition: function() {
                    var B,
                        A;
                    var C = s.width();
                    var y = s.height();
                    var z = s.scrollTop();
                    B = (C - m.width) / 2;
                    if (n) {
                        A = (y - m.height) / 2 + z
                    } else {
                        A = (y - m.height) / 2
                    }
                    return {
                        x: B,
                        y: A,
                        clientH: y
                    }
                },
                createHTML: function() {
                    if (c("#J_dialogBox", u).size()) {
                        return true
                    }
                    var D = this.getPosition();
                    var y = n ? "absolute": "fixed";
                    var A = n ? ' style="height:' + D.clientH + 'px;"': "";
                    var z = '<div id="J_LoginOverlay"' + A + '><div class="login-dialog-overlay"></div><iframe' + A + "></iframe></div>";
                    var B = '<div id="J_dialogBox" style="position:' + y + "; left:" + D.x + "px; top:" + D.y + "px; z-index:10000; width:" + m.width + "px; height:" + m.height + 'px">' 
						+ '   <div class="login-dialog">' 
						+ '       <div class="login-dialog-inner">' 
						+ '           <div id="J_dialogClose" class="login-dialog-close">\u5173\u95ed</div>' 
						+ '           <div class="login-dialog-header"><h3>IYO\u767b\u5f55</h3></div>' 
						+ '           <form class="login-zol" id="J_LoginZol" onsubmit="return false;">' 
						+ '               <div class="login-input-itembox login-user-name">' 
						+ '                   <i class="login-right-ico"></i>' 
						+ '                   <div class="login-input-item login-item-focus">' 
						+ '                       <i class="ico"></i>' 
						+ '                       <i class="delete-btn" style="display:none"></i>' 
						+ '                       <label for="J_loginUser" class="txt-tip">\u7528\u6237ID/\u90ae\u7bb1/\u624b\u673a\u53f7</label>' 
						+ '                       <input id="J_loginUser"  class="login-txt tabInput" type="text" name="J_loginUser" hidefocus="true">' 
						+ "                   </div>" 
						+ "               </div>" 
						+ '               <div class="login-input-itembox login-user-pwd">' 
						+ '                   <i class="login-right-ico"></i>' 
						+ '                   <div class="login-input-item">' 
						+ '                       <i class="ico"></i>' 
						+ '                       <i class="delete-btn" style="display:none"></i>' 
						+ '                       <label for="J_loginPsw" class="txt-tip">\u5bc6\u7801</label>' 
						+ '                       <input id="J_loginPsw"  class="login-txt tabInput" type="password" name="J_loginPsw" hidefocus="true">' 
						+ '                       <input style="display:none;" name="pwd" type="password" id="pwd" value="" /> ' 
						+ "                   </div>" 
						+ "               </div>" 
						+ '               <div class="login-input-itembox pass-verifycode" id="J_verifyBox" style="display:none">' 
						+ '                   <i class="login-right-ico"></i>' 
						+ '                   <span class="verifycode-img"><img id="J_verifyCodeImg" title="\u9a8c\u8bc1\u7801\u56fe\u7247" alt="\u9a8c\u8bc1\u7801\u56fe\u7247" class="pass-verifyCode verifyCodeImg" width="113" height="38" src=""></span>' 
						+ '                   <a href="javascript:;" id="J_changeCodeBtn" class="verifycode-changelink">\u6362\u4e00\u5f20</a>' 
						+ '                   <div class="login-input-item">' 
						+ '                       <label for="J_verifyCode" class="txt-tip">\u9a8c\u8bc1\u7801</label>' 
						+ '                       <input id="J_verifyCode" type="text " class="login-txt "  value="" maxlength=4>' 
						+ "                   </div>" 
						+ "               </div>" 
						+ '               <div class="login-member-pass clearfix">' 
						+ '                   <span class="login-zol-forget-register"><a href="' + m.getPsw + '" target="_blank">\u5fd8\u8bb0\u5bc6\u7801?</a> | <a href="' + m.registerUrl + '" target="_blank">\u514d\u8d39\u6ce8\u518c</a></span>' 
						+ '                   <input id="J_autoMemberPass" name="is_auto" checked="checked" type="checkbox" value="1"><label for="J_autoMemberPass" class="autologon">\u4e0b\u6b21\u81ea\u52a8\u767b\u5f55</label>' 
						+ "               </div>" 
						+ '               <div id="loginBtnBox" class="login-btn ">' 
						+ '                   <span class="wait-bar" style="width:0%;"></span>' 
						+ '                   <input id="J_loginBtn"  class="pass-btn tabInput" type="submit" value="\u9a6c\u4e0a\u767b\u5f55" name="" hidefocus="true">' 
						+ "               </div>" 
						+ "           </form>" 
						+ "       </div>" 
						+ "   </div>" 
						+ "</div>";

                    var C = m.hasCover ? z + B: B;
                    if (parent) {
                        c(window.parent.document.body).append(C)
                    } else {
                        c(C).appendTo("body")
                    }
                }
            },
            i = {
                checkPrefixEmail: function(z) {
                    var y = /^[0-9a-z][_.0-9a-z-]{0,31}@/;
                    return z.search(y) < 0 ? false: true
                }
            },
            r = {
                stat: function(C) {
                    var A = null,
                        z = this.getCookie("ip_ck"),
                        E = "http://pvtest.zol.com.cn/images/pvevents.gif",
                        C = C || "tanceng";
                    var B = window.location.href.split("#"),
                        y = encodeURIComponent(B[0]);
                    E += "?t=" + (new Date().getTime()) + "&event=" + C + "&ip_ck=" + z + "&url=" + y;
                    try {
                        A = document.getElementById("countHit");
                        document.body.removeChild(A)
                    } catch(D) {}
                    A = document.createElement("script");
                    A.src = E;
                    A.language = "javascript";
                    A.type = "text/javascript";
                    A.id = "countHit";
                    document.getElementsByTagName("head")[0].appendChild(A)
                },
                getCookie: function(z) {
                    var y,
                        A = new RegExp("(^| )" + z + "=([^;]*)(;|$)");
                    if (y = document.cookie.match(A)) {
                        return unescape(y[2])
                    } else {
                        return ""
                    }
                }
            },
            v = {
                hasCode: false,
                lockCommit: false,
                vailCode: false,
                codeUrl: "http://service.zol.com.cn/captchasrc.php?param=2b16O-3nOiN3PYk0U33HSurnUqu1Xn8JbKqcBQhZe1Ak6KYrlSH56fQdkIMF6Wh96du0R988kweawliMbuHF97F1_wTlluIG&1414043813342",
                errorObj: null,
                disSucc: function(A, z) {
                    var y = A.closest(".login-input-itembox").find(".login-right-ico");
                    z ? y.show() : y.hide()
                },
                disError: function(C, B, A, y) {
                    var z = this;
                    if (typeof C === "object" && C !== null) {
                        v.errorObj = C;
                        A && C.focus();
                        C.closest(".login-input-item").addClass("login-item-wrong");
                        C.closest(".login-input-itembox").find(".login-right-ico").hide()
                    }
                    z.disNotice(B, y)
                },
                disNotice: function(B, y) {
                    var A = c("#J_noticeTip", u);
                    if (A.length > 0) {
                        A.off("click").remove()
                    }
                    var y = y || "",
                        z = '<div id="J_noticeTip" class="login-wrong-tips" style="display:block">' + '<i class="login-wrong-ico"></i>' + B + y + "</div>";
                    A = c(z);
                    c("#J_LoginZol", u).prepend(A)
                },
                doInput: function(E, B, y) {
                    var D = E.val(),
                        z = E.attr("id"),
                        C = E.siblings('label[for="' + z + '"]'),
                        A = E.parent().find(".delete-btn"); ! y && E.closest(".login-input-item").attr("class", "login-input-item login-item-focus");
                    if (B) {
                        C.hide() && A.show()
                    } else {
                        D ? (C.hide(), A.show()) : (C.show(), A.hide())
                    }
                },
                doClear: function(B, A) {
                    var y = this;
                    A = A === undefined ? 1: A;
                    B.parent().removeClass("login-item-focus");
                    if (A) {
                        var z = this.errorObj;
                        z !== null && B.attr("id") === z.attr("id") && c("#J_noticeTip").hide()
                    }
                },
                enterToTab: function(z, A) {
                    var y = false;
                    c("#J_dialogBox", u).find(".tabInput").each(function(B) {
                        var C,
                            D = c(this);
                        if (y === true) {
                            C = A != 9 && D.attr("id") === "J_loginBtn" ? "click": "focus";
                            D[C]();
                            return false
                        }
                        if (D.attr("id") == z.attr("id")) {
                            y = true
                        }
                    })
                },
                tabToTab: function() {
                    var A = this,
                        z = typeof A.nowInput === "undefined" ? c("#J_loginUser", u) : A.nowInput,
                        y = false;
                    c("#J_dialogBox", u).find(".tabInput").each(function(B) {
                        var C = c(this);
                        if (y === true) {
                            C.focus();
                            A.nowInput = C;
                            return false
                        }
                        if (C.attr("id") == z.attr("id")) {
                            y = true
                        }
                    })
                },
                getKeyCode: function(y) {
                    var z = y || window.event;
                    return z.keyCode
                },
                doEnter: function(y, z) {
                    var A = this.getKeyCode(y); (A === 9 || A === 13) && z && z(A)
                },
                showComplete: function(F) {
                    var D = "",
                        G = this,
                        y = [],
                        C = c("#J_tippopBox", u),
                        A = x,
                        z = c("#J_loginUser", u),
                        H = "";
                    for (var B = 0, E = A.length; B < E; B++) {
                        D = F.substr(0, F.indexOf("@")) + A[B];
                        H += D.indexOf(F) > -1 ? "<li>" + D + "</li>": ""
                    }
                    if (C.length < 1) {
                        H = '<ul id="J_tippopBox" class="item-tippop">' + H + "</ul>";
                        C = c(H);
                        z.after(C);
                        C.on("click", "li",
                            function() {
                                C.hide();
                                z.val(c(this).text());
                                clearTimeout(v.completeTimer);
                                v.enterToTab(z)
                            })
                    } else {
                        C.html(H)
                    }
                    C.show()
                },
                hideComplete: function() {
                    c("#J_tippopBox", u).hide()
                },
                showCode: function() {
                    var z = c("#J_verifyCode", u),
                        A = c("#J_verifyBox", u),
                        y = this;
                    y.refreshCode();
                    A.show();
                    if (!z.hasClass("tabInput")) {
                        z.addClass("tabInput");
                        z.on("focus",
                            function() {
                                v.loginUser = v.loginPass = v.loginCode = true
                            });
                        A.on("click", "#J_verifyCodeImg, #J_changeCodeBtn",
                            function() {
                                y.refreshCode();
                                z.val("").focus()
                            });
                        z.on("blur",
                            function() {
                                if (v.loginUser && v.loginPass && v.loginCode) {
                                    m.checkTimer = setTimeout(function() {
                                            v.checkCode()
                                        },
                                        200)
                                }
                            })
                    }
                },
                checkCode: function() {
                    var y = c("#J_verifyCode", u);
                    var z = y.val();
                    if (!z) {
                        v.doClear(y);
                        v.disError(y, "\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801");
                        return false
                    }
                    if (z.length != 4) {
                        v.disError(y, "\u9a8c\u8bc1\u7801\u6709\u8bef");
                        return false
                    }
                    c.ajax({
                        type: "post",
                        url: d.ajaxHost + "/api/checkCode.php",
                        async: false,
                        data: {
                            code: z
                        },
                        dataType: "jsonp",
                        success: function(A) {
                            if (A.info == "ok") {
                                v.vailCode = true;
                                v.disSucc(y, 1)
                            } else {
                                v.vailCode = false;
                                v.disError(y, "\u9a8c\u8bc1\u7801\u6709\u8bef")
                            }
                        }
                    })
                },
                refreshCode: function() {
                    var y = m.checkTimer;
                    clearTimeout(c("#J_verifyCode", u).get(0).checkTimer);
                    c("#J_verifyCodeImg", u).attr("src", this.codeUrl + "&r" + (new Date().getTime()))
                },
                onTab: function(z) {
                    var y = v.getKeyCode(z);
                    if (y === 9) {
                        v.tabToTab();
                        z.preventDefault();
                        return false
                    }
                }
            };
        var h = function() {
            w.createHTML();
            var C = this,
                B = c("#J_loginUser", u),
                y = c("#J_loginPsw", u),
                E = c("#J_dialogBox", u),
                A = c("#J_LoginOverlay", u),
                F = c("#J_verifyCode", u),
                z = c("#J_verifyCodeImg", u),
                D = c("#J_loginBtn", u);
            B.focus();
            s.bind("resize scroll",
                function() {
                    var G = w.getPosition();
                    E.css({
                        "left": G.x,
                        "top": G.y
                    });
                    A.css({
                        "height": G.clientH
                    })
                });
            c("#J_dialogClose", u).on("click",
                function() {
                    E.remove();
                    A.remove();
                    m.closeEvent && (function() {
                        r.stat(m.closeEvent)
                    } ())
                });
            c("#J_loginUser,#J_loginPsw, #J_verifyCode", u).on({
                "focus": function() {
                    var G = c(this);
                    v.doClear(G);
                    v.doInput(G)
                },
                "keydown": function(H) {
                    var G = c(this);
                    v.doClear(G);
                    v.doInput(G, true);
                    v.doEnter(H,
                        function(I) {
                            v.enterToTab(G, I);
                            G.blur();
                            H.preventDefault();
                            return false
                        })
                },
                "input": function() {
                    v.doInput(c(this), true)
                },
                "blur": function() {
                    var G = c(this);
                    that = v;
                    v.doInput(G, false, true);
                    v.doClear(G, false);
                    that.completeTimer = setTimeout(function() {
                            that.hideComplete()
                        },
                        300)
                }
            });
            B.on({
                "keyup": function(H) {
                    var G = c(this),
                        J = v.getKeyCode(H),
                        I = G.val();
                    if (J === 38 || J === 40 || J === 13) {
                        return false
                    }
                    if (I.indexOf("@") != -1 && i.checkPrefixEmail(I)) {
                        v.showComplete(I)
                    } else {
                        v.hideComplete()
                    }
                    this.srcValue = I;
                    this.index = -1
                },
                "keydown": function(G) {
                    var P = c(this),
                        N = {
                            40: 1,
                            38: 1,
                            13: 1
                        },
                        M = 0,
                        J = c("#J_tippopBox", u),
                        O = v.getKeyCode(G);
                    if (typeof N[O] != "undefined" && J.length > 0 && J.is(":visible")) {
                        var I = this.index,
                            H = 0,
                            L = [],
                            K = false;
                        J.find("li").each(function(Q) {++H;
                            L.push(c(this))
                        });
                        typeof L[I] != "undefined" && L[I].removeClass("tippopHover");
                        if (O === 40) {
                            if (I >= H - 1) {
                                I = -1;
                                K = this.srcValue
                            } else {
                                I++;
                                L[I].addClass("tippopHover")
                            }
                        } else {
                            if (O === 38) {
                                I--;
                                if (I < 0) {
                                    I = -1;
                                    K = this.srcValue
                                } else {
                                    L[I].addClass("tippopHover")
                                }
                            } else {
                                if (O === 13) {
                                    K = typeof L[I] != "undefined" ? K = L[I].html() : this.srcValue;
                                    I = -1;
                                    v.hideComplete();
                                    v.enterToTab(P)
                                }
                            }
                        }
                        K = K === false ? L[I].html() : K;
                        P.val(K);
                        this.index = I;
                        return false
                    }
                }
            });
            E.on("click", ".delete-btn",
                function() {
                    c(this).nextAll(".login-txt").val("").focus();
                    c(this).hide();
                    return false
                });
            D.on("click",
                function() {
                    var N = c("#pwd", u),
                        I = this,
                        L = B.val(),
                        H = y.val(),
                        K = typeof I.rNum == "undefined" ? 0: I.rNum,
                        G = "",
                        M = m.from ? m.from: "",
                        J = c("#J_autoMemberPass").attr("checked") ? 1: 0;
                    v.loginUser = v.loginPass = v.loginCode = true;
                    if (!L) {
                        v.disError(B, "\u8bf7\u586b\u5199\u5e10\u53f7/\u90ae\u7bb1/\u624b\u673a\u53f7", true);
                        v.loginUser = false;
                        clearTimeout(m.checkTimer);
                        return false
                    }
                    if (!H) {
                        v.disError(y, "\u8bf7\u586b\u5199\u5bc6\u7801", true);
                        v.loginPass = false;
                        clearTimeout(m.checkTimer);
                        return false
                    }
                    if (v.hasCode === true) {
                        G = F.val();
                        if (!G) {
                            if (c("#J_verifyBox").css("display") == "none") {
                                v.showCode()
                            }
                            v.loginCode = false;
                            v.disError(F, "\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801", true);
                            clearTimeout(m.checkTimer);
                            return false
                        }
                    }
                    if (v.lockCommit === true) {
                        return false
                    }
                    v.lockCommit = true;
                    c("#loginBtnBox").addClass("login-btn-wait");
                    D.val("\u767b\u5f55\u4e2d");
                    N.val(CryptoJS.MD5(H));
                    clearTimeout(m.checkTimer);
					loginparam = '{"phone":"'+L+'","password":"'+H+'"}';
                    c.ajax({
                        type: "post",
                        url: d.ajaxHost + "/user/login",
                        async: false,
                        data: loginparam,
						//{
							
                    //        phone: L,
                    //        password: H,
                    //        is_auto: J,
                    //        from: M,
                    //        code: G,
                    //        rNum: K,
                    //        first: e
                        //},
                        dataType: "json",
                        success: function(R) {
                            if (R.code < 1) {
                               // for (var Q = 0, P = R.ssoArr.length; Q < P; ++Q) {
                               //     d.ssoLogin(R.ssoArr[Q],
                               //         function() {
                               //             E.remove();
                               //             A.remove();
                               //             if (!m.callback.call(C, R)) {
                               //                 return false
                               //             }
                               //             if (window.parent) {
                               //                 window.parent.location.reload(true)
                               //             } else {
                               //                 window.location.reload(true)
                               //             }
                               //         })
                               // }
                                E.remove();
                                A.remove();
                                if (window.parent) {
                                    window.parent.location.reload(true)
                                } else {
                                    window.location.reload(true)
                                }

                                return false
                            } else {
                                clearTimeout(m.checkTimer);
                                c("#loginBtnBox").removeClass("login-btn-wait");
                                D.val("\u9a6c\u4e0a\u767b\u5f55");
                                var S = typeof R.fcheck == "undefined" ? 0: R.fcheck,
                                    O = typeof R.type != "undefined" && R.type == "user" ? B: null;
                                F.val("");
                                F.siblings('label[for="J_verifyCode"]').show();
                                if (R.code == 11) {
                                    O = F
                                } else {
                                    F.closest(".login-input-itembox").find(".login-right-ico").hide();
                                    if (R.code == 1) {
                                        c("#J_loginPsw").val("").focus()
                                    }
                                }
                                if (S > 2 || R.num > 2) {
                                    v.hasCode = true;
                                    v.showCode()
                                }
                                I.rNum++;
                                v.disError(O, R.message, true)
                            }
                        },
                        complete: function() {}
                    });
                    e = false;
                    v.lockCommit = false
                });
            r.stat()
        };
        if (a === false) {
            a = true;
            return function() {
                if (q === true) {
                    return false
                }
                q = true;
                c("body").on("click", '[data-role="user-login"]',
                    function(y) {
                        y.preventDefault();
                        h.call(c(this))
                    })
            }
        } else {
            return this.each(function() {
                var y = null;
                c(this).on("click", y = function(z) {
                    z.preventDefault();
                    h.call(c(this))
                });
                this["_zLogin"] = y
            })
        }
    };
    window.Zol_Login = k(g);
    c.fn.zLogin = k;
    c.fn.zRemoveLogin = function() {
        this.each(function() {
            typeof this["_zLogin"] != "undefined" && c(this).off("click", this["_zLogin"])
        })
    };
    k = null
} (jQuery, typeof ZLOGIN_CONFIG === "object" ? ZLOGIN_CONFIG: {}));
$(function() {
    Zol_Login()
});
