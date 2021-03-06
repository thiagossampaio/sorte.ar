/*! ========================================================================== 
 * pongstagr.am v3.0.4 jQuery Plugin | http://pongstr.github.io/pongstagr.am/
 * ===========================================================================
 * Copyright (c) 2014 Pongstr Ordillo. Licensed under MIT License.
 * =========================================================================== */
var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0,
    function () {
        function a(a) {
            function b(a) {
                var b = a.charCodeAt(0);
                if (92 !== b) return b;
                var c = a.charAt(1);
                return (b = l[c]) ? b : c >= "0" && "7" >= c ? parseInt(a.substring(1), 8) : "u" === c || "x" === c ? parseInt(a.substring(2), 16) : a.charCodeAt(1)
            }

            function c(a) {
                return 32 > a ? (16 > a ? "\\x0" : "\\x") + a.toString(16) : (a = String.fromCharCode(a), ("\\" === a || "-" === a || "[" === a || "]" === a) && (a = "\\" + a), a)
            }

            function d(a) {
                for (var d = a.substring(1, a.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), a = [], e = [], f = "^" === d[0], g = f ? 1 : 0, h = d.length; h > g; ++g) {
                    var i = d[g];
                    if (/\\[bdsw]/i.test(i)) a.push(i);
                    else {
                        var j, i = b(i);
                        h > g + 2 && "-" === d[g + 1] ? (j = b(d[g + 2]), g += 2) : j = i, e.push([i, j]), 65 > j || i > 122 || (65 > j || i > 90 || e.push([32 | Math.max(65, i), 32 | Math.min(j, 90)]), 97 > j || i > 122 || e.push([-33 & Math.max(97, i), -33 & Math.min(j, 122)]))
                    }
                }
                for (e.sort(function (a, b) {
                    return a[0] - b[0] || b[1] - a[1]
                }), d = [], i = [0 / 0, 0 / 0], g = 0; g < e.length; ++g) h = e[g], h[0] <= i[1] + 1 ? i[1] = Math.max(i[1], h[1]) : d.push(i = h);
                for (e = ["["], f && e.push("^"), e.push.apply(e, a), g = 0; g < d.length; ++g) h = d[g], e.push(c(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && e.push("-"), e.push(c(h[1])));
                return e.push("]"), e.join("")
            }

            function e(a) {
                for (var b = a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), c = b.length, e = [], h = 0, i = 0; c > h; ++h) {
                    var j = b[h];
                    "(" === j ? ++i : "\\" === j.charAt(0) && (j = +j.substring(1)) && i >= j && (e[j] = -1)
                }
                for (h = 1; h < e.length; ++h) - 1 === e[h] && (e[h] = ++f);
                for (i = h = 0; c > h; ++h) j = b[h], "(" === j ? (++i, void 0 === e[i] && (b[h] = "(?:")) : "\\" === j.charAt(0) && (j = +j.substring(1)) && i >= j && (b[h] = "\\" + e[i]);
                for (i = h = 0; c > h; ++h) "^" === b[h] && "^" !== b[h + 1] && (b[h] = "");
                if (a.ignoreCase && g)
                    for (h = 0; c > h; ++h) j = b[h], a = j.charAt(0), j.length >= 2 && "[" === a ? b[h] = d(j) : "\\" !== a && (b[h] = j.replace(/[A-Za-z]/g, function (a) {
                        return a = a.charCodeAt(0), "[" + String.fromCharCode(-33 & a, 32 | a) + "]"
                    }));
                return b.join("")
            }
            for (var f = 0, g = !1, h = !1, i = 0, j = a.length; j > i; ++i) {
                var k = a[i];
                if (k.ignoreCase) h = !0;
                else if (/[a-z]/i.test(k.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                    g = !0, h = !1;
                    break
                }
            }
            for (var l = {
                b: 8,
                t: 9,
                n: 10,
                v: 11,
                f: 12,
                r: 13
            }, m = [], i = 0, j = a.length; j > i; ++i) {
                if (k = a[i], k.global || k.multiline) throw Error("" + k);
                m.push("(?:" + e(k) + ")")
            }
            return RegExp(m.join("|"), h ? "gi" : "g")
        }

        function b(a) {
            function b(a) {
                switch (a.nodeType) {
                case 1:
                    if (d.test(a.className)) break;
                    for (var c = a.firstChild; c; c = c.nextSibling) b(c);
                    c = a.nodeName, ("BR" === c || "LI" === c) && (e[h] = "\n", g[h << 1] = f++, g[h++ << 1 | 1] = a);
                    break;
                case 3:
                case 4:
                    c = a.nodeValue, c.length && (c = i ? c.replace(/\r\n?/g, "\n") : c.replace(/[\t\n\r ]+/g, " "), e[h] = c, g[h << 1] = f, f += c.length, g[h++ << 1 | 1] = a)
                }
            }
            var c, d = /(?:^|\s)nocode(?:\s|$)/,
                e = [],
                f = 0,
                g = [],
                h = 0;
            a.currentStyle ? c = a.currentStyle.whiteSpace : window.getComputedStyle && (c = document.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
            var i = c && "pre" === c.substring(0, 3);
            return b(a), {
                a: e.join("").replace(/\n$/, ""),
                c: g
            }
        }

        function c(a, b, c, d) {
            b && (a = {
                a: b,
                d: a
            }, c(a), d.push.apply(d, a.e))
        }

        function d(b, d) {
            function e(a) {
                for (var b = a.d, j = [b, "pln"], k = 0, l = a.a.match(f) || [], m = {}, n = 0, o = l.length; o > n; ++n) {
                    var p, q = l[n],
                        r = m[q],
                        s = void 0;
                    if ("string" == typeof r) p = !1;
                    else {
                        var t = g[q.charAt(0)];
                        if (t) s = q.match(t[1]), r = t[0];
                        else {
                            for (p = 0; i > p; ++p)
                                if (t = d[p], s = q.match(t[1])) {
                                    r = t[0];
                                    break
                                }
                            s || (r = "pln")
                        }!(p = r.length >= 5 && "lang-" === r.substring(0, 5)) || s && "string" == typeof s[1] || (p = !1, r = "src"), p || (m[q] = r)
                    } if (t = k, k += q.length, p) {
                        p = s[1];
                        var u = q.indexOf(p),
                            v = u + p.length;
                        s[2] && (v = q.length - s[2].length, u = v - p.length), r = r.substring(5), c(b + t, q.substring(0, u), e, j), c(b + t + u, p, h(r, p), j), c(b + t + v, q.substring(v), e, j)
                    } else j.push(b + t, r)
                }
                a.e = j
            }
            var f, g = {};
            ! function () {
                for (var c = b.concat(d), e = [], h = {}, i = 0, j = c.length; j > i; ++i) {
                    var k = c[i],
                        l = k[3];
                    if (l)
                        for (var m = l.length; --m >= 0;) g[l.charAt(m)] = k;
                    k = k[1], l = "" + k, h.hasOwnProperty(l) || (e.push(k), h[l] = q)
                }
                e.push(/[\S\s]/), f = a(e)
            }();
            var i = d.length;
            return e
        }

        function e(a) {
            var b = [],
                c = [];
            a.tripleQuotedStrings ? b.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : a.multiLineStrings ? b.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : b.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]), a.verbatimStrings && c.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
            var e = a.hashComments;
            return e && (a.cStyleComments ? (e > 1 ? b.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : b.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), c.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : b.push(["com", /^#[^\n\r]*/, q, "#"])), a.cStyleComments && (c.push(["com", /^\/\/[^\n\r]*/, q]), c.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q])), a.regexLiterals && c.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]), (e = a.types) && c.push(["typ", e]), a = ("" + a.keywords).replace(/^ | $/g, ""), a.length && c.push(["kwd", RegExp("^(?:" + a.replace(/[\s,]+/g, "|") + ")\\b"), q]), b.push(["pln", /^\s+/, q, " \r\n	 "]), c.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]), d(b, c)
        }

        function f(a, b) {
            function c(a) {
                switch (a.nodeType) {
                case 1:
                    if (f.test(a.className)) break;
                    if ("BR" === a.nodeName) d(a), a.parentNode && a.parentNode.removeChild(a);
                    else
                        for (a = a.firstChild; a; a = a.nextSibling) c(a);
                    break;
                case 3:
                case 4:
                    if (i) {
                        var b = a.nodeValue,
                            e = b.match(g);
                        if (e) {
                            var j = b.substring(0, e.index);
                            a.nodeValue = j, (b = b.substring(e.index + e[0].length)) && a.parentNode.insertBefore(h.createTextNode(b), a.nextSibling), d(a), j || a.parentNode.removeChild(a)
                        }
                    }
                }
            }

            function d(a) {
                function b(a, c) {
                    var d = c ? a.cloneNode(!1) : a,
                        e = a.parentNode;
                    if (e) {
                        var e = b(e, 1),
                            f = a.nextSibling;
                        e.appendChild(d);
                        for (var g = f; g; g = f) f = g.nextSibling, e.appendChild(g)
                    }
                    return d
                }
                for (; !a.nextSibling;)
                    if (a = a.parentNode, !a) return;
                for (var c, a = b(a.nextSibling, 0);
                    (c = a.parentNode) && 1 === c.nodeType;) a = c;
                j.push(a)
            }
            var e, f = /(?:^|\s)nocode(?:\s|$)/,
                g = /\r\n?|\n/,
                h = a.ownerDocument;
            a.currentStyle ? e = a.currentStyle.whiteSpace : window.getComputedStyle && (e = h.defaultView.getComputedStyle(a, q).getPropertyValue("white-space"));
            var i = e && "pre" === e.substring(0, 3);
            for (e = h.createElement("LI"); a.firstChild;) e.appendChild(a.firstChild);
            for (var j = [e], k = 0; k < j.length; ++k) c(j[k]);
            b === (0 | b) && j[0].setAttribute("value", b);
            var l = h.createElement("OL");
            l.className = "linenums";
            for (var m = Math.max(0, b - 1 | 0) || 0, k = 0, n = j.length; n > k; ++k) e = j[k], e.className = "L" + (k + m) % 10, e.firstChild || e.appendChild(h.createTextNode(" ")), l.appendChild(e);
            a.appendChild(l)
        }

        function g(a, b) {
            for (var c = b.length; --c >= 0;) {
                var d = b[c];
                u.hasOwnProperty(d) ? window.console && console.warn("cannot override language handler %s", d) : u[d] = a
            }
        }

        function h(a, b) {
            return a && u.hasOwnProperty(a) || (a = /^\s*</.test(b) ? "default-markup" : "default-code"), u[a]
        }

        function i(a) {
            var c = a.g;
            try {
                var d = b(a.h),
                    e = d.a;
                a.a = e, a.c = d.c, a.d = 0, h(c, e)(a);
                var f = /\bMSIE\b/.test(navigator.userAgent),
                    c = /\n/g,
                    g = a.a,
                    i = g.length,
                    d = 0,
                    j = a.c,
                    k = j.length,
                    e = 0,
                    l = a.e,
                    m = l.length,
                    a = 0;
                l[m] = i;
                var n, o;
                for (o = n = 0; m > o;) l[o] !== l[o + 2] ? (l[n++] = l[o++], l[n++] = l[o++]) : o += 2;
                for (m = n, o = n = 0; m > o;) {
                    for (var p = l[o], q = l[o + 1], r = o + 2; m >= r + 2 && l[r + 1] === q;) r += 2;
                    l[n++] = p, l[n++] = q, o = r
                }
                for (l.length = n; k > e;) {
                    var s, t = j[e + 2] || i,
                        u = l[a + 2] || i,
                        r = Math.min(t, u),
                        v = j[e + 1];
                    if (1 !== v.nodeType && (s = g.substring(d, r))) {
                        f && (s = s.replace(c, "\r")), v.nodeValue = s;
                        var w = v.ownerDocument,
                            x = w.createElement("SPAN");
                        x.className = l[a + 1];
                        var y = v.parentNode;
                        y.replaceChild(x, v), x.appendChild(v), t > d && (j[e + 1] = v = w.createTextNode(g.substring(r, t)), y.insertBefore(v, x.nextSibling))
                    }
                    d = r, d >= t && (e += 2), d >= u && (a += 2)
                }
            } catch (z) {
                "console" in window && console.log(z && z.stack ? z.stack : z)
            }
        }
        var j = ["break,continue,do,else,for,if,return,while"],
            k = [
                [j, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
            ],
            l = [k, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
            m = [k, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
            n = [m, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],
            k = [k, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
            o = [j, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
            p = [j, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
            j = [j, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
            r = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,
            s = /\S/,
            t = e({
                keywords: [l, n, k, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + o, p, j],
                hashComments: !0,
                cStyleComments: !0,
                multiLineStrings: !0,
                regexLiterals: !0
            }),
            u = {};
        g(t, ["default-code"]), g(d([], [
            ["pln", /^[^<?]+/],
            ["dec", /^<!\w[^>]*(?:>|$)/],
            ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
            ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
            ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
            ["pun", /^(?:<[%?]|[%?]>)/],
            ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
            ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
            ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
            ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
        ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]), g(d([
            ["pln", /^\s+/, q, " 	\r\n"],
            ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
        ], [
            ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
            ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
            ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
            ["pun", /^[/<->]+/],
            ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
            ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
            ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
            ["lang-css", /^style\s*=\s*"([^"]+)"/i],
            ["lang-css", /^style\s*=\s*'([^']+)'/i],
            ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
        ]), ["in.tag"]), g(d([], [
            ["atv", /^[\S\s]+/]
        ]), ["uq.val"]), g(e({
            keywords: l,
            hashComments: !0,
            cStyleComments: !0,
            types: r
        }), ["c", "cc", "cpp", "cxx", "cyc", "m"]), g(e({
            keywords: "null,true,false"
        }), ["json"]), g(e({
            keywords: n,
            hashComments: !0,
            cStyleComments: !0,
            verbatimStrings: !0,
            types: r
        }), ["cs"]), g(e({
            keywords: m,
            cStyleComments: !0
        }), ["java"]), g(e({
            keywords: j,
            hashComments: !0,
            multiLineStrings: !0
        }), ["bsh", "csh", "sh"]), g(e({
            keywords: o,
            hashComments: !0,
            multiLineStrings: !0,
            tripleQuotedStrings: !0
        }), ["cv", "py"]), g(e({
            keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), ["perl", "pl", "pm"]), g(e({
            keywords: p,
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), ["rb"]), g(e({
            keywords: k,
            cStyleComments: !0,
            regexLiterals: !0
        }), ["js"]), g(e({
            keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0
        }), ["coffee"]), g(d([], [
            ["str", /^[\S\s]+/]
        ]), ["regex"]), window.prettyPrintOne = function (a, b, c) {
            var d = document.createElement("PRE");
            return d.innerHTML = a, c && f(d, c), i({
                g: b,
                i: c,
                h: d
            }), d.innerHTML
        }, window.prettyPrint = function (a) {
            function b() {
                for (var c = window.PR_SHOULD_USE_CONTINUATION ? j.now() + 250 : 1 / 0; l < d.length && j.now() < c; l++) {
                    var e = d[l],
                        g = e.className;
                    if (g.indexOf("prettyprint") >= 0) {
                        var h, n, g = g.match(m);
                        if (n = !g) {
                            n = e;
                            for (var o = void 0, p = n.firstChild; p; p = p.nextSibling) var q = p.nodeType,
                                o = 1 === q ? o ? n : p : 3 === q ? s.test(p.nodeValue) ? n : o : o;
                            n = (h = o === n ? void 0 : o) && "CODE" === h.tagName
                        }
                        for (n && (g = h.className.match(m)), g && (g = g[1]), n = !1, o = e.parentNode; o; o = o.parentNode)
                            if (("pre" === o.tagName || "code" === o.tagName || "xmp" === o.tagName) && o.className && o.className.indexOf("prettyprint") >= 0) {
                                n = !0;
                                break
                            }
                        n || ((n = (n = e.className.match(/\blinenums\b(?::(\d+))?/)) ? n[1] && n[1].length ? +n[1] : !0 : !1) && f(e, n), k = {
                            g: g,
                            h: e,
                            i: n
                        }, i(k))
                    }
                }
                l < d.length ? setTimeout(b, 250) : a && a()
            }
            for (var c = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], d = [], e = 0; e < c.length; ++e)
                for (var g = 0, h = c[e].length; h > g; ++g) d.push(c[e][g]);
            var c = q,
                j = Date;
            j.now || (j = {
                now: function () {
                    return +new Date
                }
            });
            var k, l = 0,
                m = /\blang(?:uage)?-([\w.]+)(?!\S)/;
            b()
        }, window.PR = {
            createSimpleLexer: d,
            registerLangHandler: g,
            sourceDecorator: e,
            PR_ATTRIB_NAME: "atn",
            PR_ATTRIB_VALUE: "atv",
            PR_COMMENT: "com",
            PR_DECLARATION: "dec",
            PR_KEYWORD: "kwd",
            PR_LITERAL: "lit",
            PR_NOCODE: "nocode",
            PR_PLAIN: "pln",
            PR_PUNCTUATION: "pun",
            PR_SOURCE: "src",
            PR_STRING: "str",
            PR_TAG: "tag",
            PR_TYPE: "typ"
        }
    }(), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function (a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
        },
        easeInQuad: function (a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function (a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function (a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function (a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function (a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function (a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function (a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function (a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function (a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function (a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function (a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function (a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function (a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function (a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function (a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function (a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function (a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function (a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function (a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function (a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function (a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function (a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c
        },
        easeOutElastic: function (a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
        },
        easeInOutElastic: function (a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (2 == (b /= e / 2)) return c + d;
            if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
        },
        easeInBack: function (a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
        },
        easeOutBack: function (a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
        },
        easeInOutBack: function (a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
        },
        easeInBounce: function (a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
        },
        easeOutBounce: function (a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function (a, b, c, d, e) {
            return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
        }
    }), $(window).load(function () {
        "use strict";

        function a(a) {
            var b = "679256982",
                c = "679256982.401c5ac.0a183542db5f4ae1b51caae21acadc1e";
            $(a.target).pongstgrm({
                accessId: b,
                accessToken: c,
                show: a.show,
                count: a.count,
                profile_bg_img: "http://pongstr.github.io/pongstagr.am/assets/img/img.jpg",
                profile_bg_color: "#4F405F"
            })
        }
        window.prettyPrint && prettyPrint();
        var b = $("body").outerHeight();
        $(window).scroll(function () {
            //$(this).scrollTop() > b + 20 ? $("[role=navigation]").addClass("navbar-fixed-top") : $("[role=navigation]").removeClass("navbar-fixed-top")
        }), a({
            target: "#profile",
            show: "profile"
        }), a({
            target: "#recent",
            show: "recent",
            count: 4
        }), a({
            target: "#likes",
            show: "liked",
            count: 4
        }), a({
            target: "#feed",
            show: "feed",
            count: 4
        }), a({
            target: "#tags",
            show: "nofilter",
            count: 4
        }), $("[data-hash=slide]").each(function () {
            $(this).on("click", function (a) {
                a.preventDefault();
                var b = $(this).attr("href"),
                    c = $(b),
                    d = void 0 === $(this).data("hash-offset") ? 100 : $(this).data("hash-offset");
                0 !== c.length && $("html, body").stop().animate({
                    scrollTop: c.offset().top - d
                }, 500, function () {
                    return window.location.hash = b, !1
                })
            })
        })
    });