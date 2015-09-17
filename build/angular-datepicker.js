/*!
 * pickadate.js v3.4.0, 2014/02/15
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */
! function(a) {
    "function" == typeof define && define.amd ? define("picker", ["angular"], a) : this.Picker = a(angular)
}(function(a) {
    function b(a, d, e, g) {
        function h() {
            return b._.node("div", b._.node("div", b._.node("div", b._.node("div", r.component.nodes(o.open), n.box), n.wrap), n.frame), n.holder)
        }

        function i() {
            p.data(d, r), p.addClass(n.input), p[0].value = p.attr("data-value") ? r.get("select", m.format) : a.value, angular.element(document.querySelectorAll("#" + o.id)).on("focus", l), angular.element(document.querySelectorAll("#" + o.id)).on("click", l), m.editable || angular.element(document.querySelectorAll("#" + o.id)).on("keydown", function(a) {
                var b = a.keyCode,
                    c = /^(8|46)$/.test(b);
                return 27 == b ? (r.close(), !1) : void((32 == b || c || !o.open && r.component.key[b]) && (a.preventDefault(), a.stopPropagation(), c ? r.clear().close() : r.open()))
            }), c(a, {
                haspopup: !0,
                expanded: !1,
                readonly: !1,
                owns: a.id + "_root" + (r._hidden ? " " + r._hidden.id : "")
            })
        }

        function j() {
            function d() {
                angular.element(r.$root[0].querySelectorAll("[data-pick], [data-nav], [data-clear]")).on("click", function() {
                    var c = angular.element(this),
                        e = c.hasClass(n.navDisabled) || c.hasClass(n.disabled),
                        f = document.activeElement;
                    f = f && (f.type || f.href) && f, (e || f && !r.$root[0].contains(f)) && a.focus(), c.attr("data-nav") && !e ? (r.set("highlight", r.component.item.highlight, {
                        nav: parseInt(c.attr("data-nav"))
                    }), d()) : b._.isInteger(parseInt(c.attr("data-pick"))) && !e ? (r.set("select", parseInt(c.attr("data-pick"))).close(!0), d()) : c.attr("data-clear") && (r.clear().close(!0), d())
                })
            }
            r.$root.on("focusin", function(a) {
                r.$root.removeClass(n.focused), c(r.$root[0], "selected", !1), a.stopPropagation()
            }), r.$root.on("mousedown click", function(b) {
                var c = b.target;
                c != r.$root.children()[0] && (b.stopPropagation(), "mousedown" == b.type && "input" !== angular.element(c)[0].tagName && "OPTION" != c.nodeName && (b.preventDefault(), a.focus()))
            }), d(), c(r.$root[0], "hidden", !0)
        }

        function k() {
            var b = ["string" == typeof m.hiddenPrefix ? m.hiddenPrefix : "", "string" == typeof m.hiddenSuffix ? m.hiddenSuffix : "_submit"];
            r._hidden = angular.element('<input type=hidden name="' + b[0] + a.name + b[1] + '"id="' + b[0] + a.id + b[1] + '"' + (p.attr("data-value") || a.value ? ' value="' + r.get("select", m.formatSubmit) + '"' : "") + ">")[0], p.on("change." + o.id, function() {
                r._hidden.value = a.value ? r.get("select", m.formatSubmit) : ""
            }).after(r._hidden)
        }

        function l(a) {
            a.stopPropagation(), "focus" == a.type && (r.$root.addClass(n.focused), c(r.$root[0], "selected", !0)), r.open()
        }
        if (!a) return b;
        var m;
        e ? (m = e.defaults, angular.extend(m, g)) : m = g || {};
        var n = b.klasses();
        angular.extend(n, m.klass);
        var o = {
                id: a.id || "P" + Math.abs(~~(Math.random() * new Date))
            }, p = angular.element(a),
            q = function() {
                return this.start()
            }, r = q.prototype = {
                constructor: q,
                $node: p,
                start: function() {
                    return o && o.start ? r : (o.methods = {}, o.start = !0, o.open = !1, o.type = a.type, a.autofocus = a == document.activeElement, a.type = "text", a.readOnly = !m.editable, a.id = a.id || o.id, r.component = new e(r, m), r.$root = angular.element(b._.node("div", h(), n.picker, 'id="' + a.id + '_root"')), j(), m.formatSubmit && k(), i(), m.container ? angular.element(m.container).append(r.$root) : p.after(r.$root), r.on({
                        start: r.component.onStart,
                        render: r.component.onRender,
                        stop: r.component.onStop,
                        open: r.component.onOpen,
                        close: r.component.onClose,
                        set: r.component.onSet
                    }).on({
                        start: m.onStart,
                        render: m.onRender,
                        stop: m.onStop,
                        open: m.onOpen,
                        close: m.onClose,
                        set: m.onSet
                    }), a.autofocus && r.open(), r.trigger("start").trigger("render"))
                },
                render: function(a) {
                    return a ? r.$root.html(h()) : angular.element(r.$root[0].querySelectorAll("." + n.box)).html(r.component.nodes(o.open)), r.trigger("render")
                },
                stop: function() {
                    return o.start ? (r.close(), r._hidden && r._hidden.parentNode.removeChild(r._hidden), r.$root.remove(), p.removeClass(n.input).removeData(d), setTimeout(function() {
                        p.off("." + o.id)
                    }, 0), a.type = o.type, a.readOnly = !1, r.trigger("stop"), o.methods = {}, o.start = !1, r) : r
                },
                open: function(d) {
                    return o.open ? r : (p.addClass(n.active), c(a, "expanded", !0), r.$root.addClass(n.opened), c(r.$root[0], "hidden", !1), d !== !1 && (o.open = !0, p.triggerHandler("focus"), angular.element(document.querySelectorAll("#" + o.id)).on("click focusin", function(b) {
                        var c = b.target;
                        c != a && c != document && 3 != b.which && r.close(c === r.$root.children()[0])
                    }), angular.element(document.querySelectorAll("#" + o.id)).on("keydown", function(c) {
                        var d = c.keyCode,
                            e = r.component.key[d],
                            f = c.target;
                        27 == d ? r.close(!0) : f != a || !e && 13 != d ? r.$root[0].contains(f) && 13 == d && (c.preventDefault(), f.click()) : (c.preventDefault(), e ? b._.trigger(r.component.key.go, r, [b._.trigger(e)]) : angular.element(r.$root[0].querySelectorAll("." + n.highlighted)).hasClass(n.disabled) || r.set("select", r.component.item.highlight).close())
                    })), r.trigger("open"))
                },
                close: function(b) {
                    return b && (p.off("focus." + o.id), p.triggerHandler("focus"), setTimeout(function() {
                        angular.element(document.querySelectorAll("#" + o.id)).on("focus", l)
                    }, 0)), p.removeClass(n.active), c(a, "expanded", !1), r.$root.removeClass(n.opened + " " + n.focused), c(r.$root[0], "hidden", !0), c(r.$root[0], "selected", !1), o.open ? (o.open = !1, f.off("." + o.id), r.trigger("close")) : r
                },
                clear: function() {
                    return r.set("clear")
                },
                set: function(a, b, c) {
                    var d, e, f = angular.isObject(a),
                        g = f ? a : {};
                    if (c = f && angular.isObject(b) ? b : c || {}, a) {
                        f || (g[a] = b);
                        for (d in g) e = g[d], d in r.component.item && r.component.set(d, e, c), ("select" == d || "clear" == d) && (p[0].value = "clear" == d ? "" : r.get(d, m.format), p.triggerHandler("change"));
                        r.render()
                    }
                    return c.muted ? r : r.trigger("set", g)
                },
                get: function(c, d) {
                    return c = c || "value", null != o[c] ? o[c] : "value" == c ? a.value : c in r.component.item ? "string" == typeof d ? b._.trigger(r.component.formats.toString, r.component, [d, r.component.get(c)]) : r.component.get(c) : void 0
                },
                on: function(a, b) {
                    var c, d, e = angular.isObject(a),
                        f = e ? a : {};
                    if (a) {
                        e || (f[a] = b);
                        for (c in f) d = f[c], o.methods[c] = o.methods[c] || [], o.methods[c].push(d)
                    }
                    return r
                },
                off: function() {
                    var a, b, c = arguments;
                    for (a = 0, namesCount = c.length; namesCount > a; a += 1) b = c[a], b in o.methods && delete o.methods[b];
                    return r
                },
                trigger: function(a, c) {
                    var d = o.methods[a];
                    return d && d.map(function(a) {
                        b._.trigger(a, r, [c])
                    }), r
                }
            };
        return new q
    }

    function c(a, b, c) {
        if (angular.isObject(b))
            for (var e in b) d(a, e, b[e]);
        else d(a, b, c)
    }

    function d(a, b, c) {
        angular.element(a).attr(("role" == b ? "" : "aria-") + b, c)
    }

    function e(a, b) {
        angular.isObject(a) || (a = {
            attribute: b
        }), b = "";
        for (var c in a) {
            var d = ("role" == c ? "" : "aria-") + c,
                e = a[c];
            b += null == e ? "" : d + '="' + a[c] + '"'
        }
        return b
    }
    var f = angular.element(document);
    return b.klasses = function(a) {
        return a = a || "picker", {
            picker: a,
            opened: a + "--opened",
            focused: a + "--focused",
            input: a + "__input",
            active: a + "__input--active",
            holder: a + "__holder",
            frame: a + "__frame",
            wrap: a + "__wrap",
            box: a + "__box"
        }
    }, b._ = {
        group: function(a) {
            for (var c, d = "", e = b._.trigger(a.min, a); e <= b._.trigger(a.max, a, [e]); e += a.i) c = b._.trigger(a.item, a, [e]), d += b._.node(a.node, c[0], c[1], c[2]);
            return d
        },
        node: function(b, c, d, e) {
            return c ? (c = a.isArray(c) ? c.join("") : c, d = d ? ' class="' + d + '"' : "", e = e ? " " + e : "", "<" + b + d + e + ">" + c + "</" + b + ">") : ""
        },
        lead: function(a) {
            return (10 > a ? "0" : "") + a
        },
        trigger: function(a, b, c) {
            return "function" == typeof a ? a.apply(b, c || []) : a
        },
        digits: function(a) {
            return /\d/.test(a[1]) ? 2 : 1
        },
        isDate: function(a) {
            return {}.toString.call(a).indexOf("Date") > -1 && this.isInteger(a.getDate())
        },
        isInteger: function(a) {
            return {}.toString.call(a).indexOf("Number") > -1 && a % 1 === 0
        },
        ariaAttr: e
    }, b.extend = function(a, c) {
        angular.element.prototype[a] = function(d, e) {
            var f = this.data(a);
            if ("picker" == d) return f;
            if (f && "string" == typeof d) return b._.trigger(f[d], f, [e]), this;
            for (var g = 0; g < this.length; g++) {
                var h = angular.element(this[g]);
                h.data(a) || new b(h[0], a, c, d)
            }
        }, angular.element.prototype[a].defaults = c.defaults
    }, b
});
/*!
 * Date picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/date.htm
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["picker", "angular"], a) : a(Picker, angular)
}(function(a, b) {
    function c(a, c) {
        var d = this,
            e = a.$node[0].value,
            f = a.$node.attr("data-value"),
            g = f || e,
            h = f ? c.formatSubmit : c.format,
            i = function() {
                return "rtl" === getComputedStyle(a.$root[0]).direction
            };
        d.settings = c, d.$node = a.$node, d.queue = {
            min: "measure create",
            max: "measure create",
            now: "now create",
            select: "parse create validate",
            highlight: "parse navigate create validate",
            view: "parse create validate viewset",
            disable: "deactivate",
            enable: "activate"
        }, d.item = {}, d.item.disable = (c.disable || []).slice(0), d.item.enable = - function(a) {
            return a[0] === !0 ? a.shift() : -1
        }(d.item.disable), d.set("min", c.min).set("max", c.max).set("now"), g ? d.set("select", g, {
            format: h,
            fromValue: !! e
        }) : d.set("select", null).set("highlight", d.item.now), d.key = {
            40: 7,
            38: -7,
            39: function() {
                return i() ? -1 : 1
            },
            37: function() {
                return i() ? 1 : -1
            },
            go: function(a) {
                var b = d.item.highlight,
                    c = new Date(b.year, b.month, b.date + a);
                d.set("highlight", [c.getFullYear(), c.getMonth(), c.getDate()], {
                    interval: a
                }), this.render()
            }
        }, a.on("render", function() {
            b.element(a.$root[0].querySelectorAll("." + c.klass.selectMonth)).on("change", function() {
                var d = this.value;
                d && (a.set("highlight", [a.get("view").year, d, a.get("highlight").date]), b.element(a.$root[0].querySelectorAll("." + c.klass.selectMonth)).triggerHandler("focus"))
            }), b.element(a.$root[0].querySelectorAll("." + c.klass.selectYear)).on("change", function() {
                var d = this.value;
                d && (a.set("highlight", [d, a.get("view").month, a.get("highlight").date]), b.element(a.$root[0].querySelectorAll("." + c.klass.selectYear)).triggerHandler("focus"))
            })
        }).on("open", function() {
            b.element(a.$root[0].querySelectorAll("button, select")).attr("disabled", !1)
        }).on("close", function() {
            b.element(a.$root[0].querySelectorAll("button, select")).attr("disabled", !0)
        })
    }
    var d = 7,
        e = 6,
        f = a._;
    c.prototype.set = function(a, b, c) {
        var d = this,
            e = d.item;
        return null === b ? (e[a] = b, d) : (e["enable" == a ? "disable" : "flip" == a ? "enable" : a] = d.queue[a].split(" ").map(function(e) {
            return b = d[e](a, b, c)
        }).pop(), "select" == a ? d.set("highlight", e.select, c) : "highlight" == a ? d.set("view", e.highlight, c) : a.match(/^(flip|min|max|disable|enable)$/) && (e.select && d.disabled(e.select) && d.set("select", e.select, c), e.highlight && d.disabled(e.highlight) && d.set("highlight", e.highlight, c)), d)
    }, c.prototype.get = function(a) {
        return this.item[a]
    }, c.prototype.create = function(a, c, d) {
        var e, g = this;
        return c = void 0 === c ? a : c, c == -1 / 0 || 1 / 0 == c ? e = c : b.isObject(c) && f.isInteger(c.pick) ? c = c.obj : b.isArray(c) ? (c = new Date(c[0], c[1], c[2]), c = f.isDate(c) ? c : g.create().obj) : c = f.isInteger(c) || f.isDate(c) ? g.normalize(new Date(c), d) : g.now(a, c, d), {
            year: e || c.getFullYear(),
            month: e || c.getMonth(),
            date: e || c.getDate(),
            day: e || c.getDay(),
            obj: e || c,
            pick: e || c.getTime()
        }
    }, c.prototype.createRange = function(a, c) {
        var d = this,
            e = function(a) {
                return a === !0 || b.isArray(a) || f.isDate(a) ? d.create(a) : a
            };
        return f.isInteger(a) || (a = e(a)), f.isInteger(c) || (c = e(c)), f.isInteger(a) && b.isObject(c) ? a = [c.year, c.month, c.date + a] : f.isInteger(c) && b.isObject(a) && (c = [a.year, a.month, a.date + c]), {
            from: e(a),
            to: e(c)
        }
    }, c.prototype.withinRange = function(a, b) {
        return a = this.createRange(a.from, a.to), b.pick >= a.from.pick && b.pick <= a.to.pick
    }, c.prototype.overlapRanges = function(a, b) {
        var c = this;
        return a = c.createRange(a.from, a.to), b = c.createRange(b.from, b.to), c.withinRange(a, b.from) || c.withinRange(a, b.to) || c.withinRange(b, a.from) || c.withinRange(b, a.to)
    }, c.prototype.now = function(a, b, c) {
        return b = new Date, c && c.rel && b.setDate(b.getDate() + c.rel), this.normalize(b, c)
    }, c.prototype.navigate = function(a, c, d) {
        var e, f, g, h, i = b.isArray(c),
            j = b.isObject(c),
            k = this.item.view;
        if (i || j) {
            for (j ? (f = c.year, g = c.month, h = c.date) : (f = +c[0], g = +c[1], h = +c[2]), d && d.nav && k && k.month !== g && (f = k.year, g = k.month), e = new Date(f, g + (d && d.nav ? d.nav : 0), 1), f = e.getFullYear(), g = e.getMonth(); new Date(f, g, h).getMonth() !== g;) h -= 1;
            c = [f, g, h]
        }
        return c
    }, c.prototype.normalize = function(a) {
        return a.setHours(0, 0, 0, 0), a
    }, c.prototype.measure = function(a, b) {
        var c = this;
        return b ? f.isInteger(b) && (b = c.now(a, b, {
            rel: b
        })) : b = "min" == a ? -1 / 0 : 1 / 0, b
    }, c.prototype.viewset = function(a, b) {
        return this.create([b.year, b.month, 1])
    }, c.prototype.validate = function(a, c, d) {
        var e, g, h, i, j = this,
            k = c,
            l = d && d.interval ? d.interval : 1,
            m = -1 === j.item.enable,
            n = j.item.min,
            o = j.item.max,
            p = m && j.item.disable.filter(function(a) {
                    if (b.isArray(a)) {
                        var d = j.create(a).pick;
                        d < c.pick ? e = !0 : d > c.pick && (g = !0)
                    }
                    return f.isInteger(a)
                }).length;
        if ((!d || !d.nav) && (!m && j.disabled(c) || m && j.disabled(c) && (p || e || g) || !m && (c.pick <= n.pick || c.pick >= o.pick)))
            for (m && !p && (!g && l > 0 || !e && 0 > l) && (l *= -1); j.disabled(c) && (Math.abs(l) > 1 && (c.month < k.month || c.month > k.month) && (c = k, l = l > 0 ? 1 : -1), c.pick <= n.pick ? (h = !0, l = 1, c = j.create([n.year, n.month, n.date - 1])) : c.pick >= o.pick && (i = !0, l = -1, c = j.create([o.year, o.month, o.date + 1])), !h || !i);) c = j.create([c.year, c.month, c.date + l]);
        return c
    }, c.prototype.disabled = function(a) {
        var c = this,
            d = c.item.disable.filter(function(d) {
                return f.isInteger(d) ? a.day === (c.settings.firstDay ? d : d - 1) % 7 : b.isArray(d) || f.isDate(d) ? a.pick === c.create(d).pick : b.isObject(d) ? c.withinRange(d, a) : void 0
            });
        return d = d.length && !d.filter(function(a) {
                return b.isArray(a) && "inverted" == a[3] || b.isObject(a) && a.inverted
            }).length, -1 === c.item.enable ? !d : d || a.pick < c.item.min.pick || a.pick > c.item.max.pick
    }, c.prototype.parse = function(a, c, d) {
        var e, g = this,
            h = {};
        return !c || f.isInteger(c) || b.isArray(c) || f.isDate(c) || b.isObject(c) && f.isInteger(c.pick) ? c : (d && d.format || (d = d || {}, d.format = g.settings.format), e = "string" != typeof c || d.fromValue ? 0 : 1, g.formats.toArray(d.format).map(function(a) {
            var b = g.formats[a],
                d = b ? f.trigger(b, g, [c, h]) : a.replace(/^!/, "").length;
            b && (h[a] = c.substr(0, d)), c = c.substr(d)
        }), [h.yyyy || h.yy, +(h.mm || h.m) - e, h.dd || h.d])
    }, c.prototype.formats = function() {
        function a(a, b, c) {
            var d = a.match(/\w+/)[0];
            return c.mm || c.m || (c.m = b.indexOf(d)), d.length
        }

        function b(a) {
            return a.match(/\w+/)[0].length
        }
        return {
            d: function(a, b) {
                return a ? f.digits(a) : b.date
            },
            dd: function(a, b) {
                return a ? 2 : f.lead(b.date)
            },
            ddd: function(a, c) {
                return a ? b(a) : this.settings.weekdaysShort[c.day]
            },
            dddd: function(a, c) {
                return a ? b(a) : this.settings.weekdaysFull[c.day]
            },
            m: function(a, b) {
                return a ? f.digits(a) : b.month + 1
            },
            mm: function(a, b) {
                return a ? 2 : f.lead(b.month + 1)
            },
            mmm: function(b, c) {
                var d = this.settings.monthsShort;
                return b ? a(b, d, c) : d[c.month]
            },
            mmmm: function(b, c) {
                var d = this.settings.monthsFull;
                return b ? a(b, d, c) : d[c.month]
            },
            yy: function(a, b) {
                return a ? 2 : ("" + b.year).slice(2)
            },
            yyyy: function(a, b) {
                return a ? 4 : b.year
            },
            toArray: function(a) {
                return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
            },
            toString: function(a, b) {
                var c = this;
                return c.formats.toArray(a).map(function(a) {
                    return f.trigger(c.formats[a], c, [0, b]) || a.replace(/^!/, "")
                }).join("")
            }
        }
    }(), c.prototype.isDateExact = function(a, c) {
        var d = this;
        return f.isInteger(a) && f.isInteger(c) || "boolean" == typeof a && "boolean" == typeof c ? a === c : (f.isDate(a) || b.isArray(a)) && (f.isDate(c) || b.isArray(c)) ? d.create(a).pick === d.create(c).pick : b.isObject(a) && b.isObject(c) ? d.isDateExact(a.from, c.from) && d.isDateExact(a.to, c.to) : !1
    }, c.prototype.isDateOverlap = function(a, c) {
        var d = this;
        return f.isInteger(a) && (f.isDate(c) || b.isArray(c)) ? a === d.create(c).day + 1 : f.isInteger(c) && (f.isDate(a) || b.isArray(a)) ? c === d.create(a).day + 1 : b.isObject(a) && b.isObject(c) ? d.overlapRanges(a, c) : !1
    }, c.prototype.flipEnable = function(a) {
        var b = this.item;
        b.enable = a || (-1 == b.enable ? 1 : -1)
    }, c.prototype.deactivate = function(a, c) {
        var d = this,
            e = d.item.disable.slice(0);
        return "flip" == c ? d.flipEnable() : c === !1 ? (d.flipEnable(1), e = []) : c === !0 ? (d.flipEnable(-1), e = []) : c.map(function(a) {
            for (var c, g = 0; g < e.length; g += 1)
                if (d.isDateExact(a, e[g])) {
                    c = !0;
                    break
                }
            c || (f.isInteger(a) || f.isDate(a) || b.isArray(a) || b.isObject(a) && a.from && a.to) && e.push(a)
        }), e
    }, c.prototype.activate = function(a, c) {
        var d = this,
            e = d.item.disable,
            g = e.length;
        return "flip" == c ? d.flipEnable() : c === !0 ? (d.flipEnable(1), e = []) : c === !1 ? (d.flipEnable(-1), e = []) : c.map(function(a) {
            var c, h, i, j;
            for (i = 0; g > i; i += 1) {
                if (h = e[i], d.isDateExact(h, a)) {
                    c = e[i] = null, j = !0;
                    break
                }
                if (d.isDateOverlap(h, a)) {
                    b.isObject(a) ? (a.inverted = !0, c = a) : b.isArray(a) ? (c = a, c[3] || c.push("inverted")) : f.isDate(a) && (c = [a.getFullYear(), a.getMonth(), a.getDate(), "inverted"]);
                    break
                }
            }
            if (c)
                for (i = 0; g > i; i += 1)
                    if (d.isDateExact(e[i], a)) {
                        e[i] = null;
                        break
                    }
            if (j)
                for (i = 0; g > i; i += 1)
                    if (d.isDateOverlap(e[i], a)) {
                        e[i] = null;
                        break
                    }
            c && e.push(c)
        }), e.filter(function(a) {
            return null != a
        })
    }, c.prototype.nodes = function(a) {
        var b = this,
            c = b.settings,
            g = b.item,
            h = g.now,
            i = g.select,
            j = g.highlight,
            k = g.view,
            l = g.disable,
            m = g.min,
            n = g.max,
            o = function(a) {
                return c.firstDay && a.push(a.shift()), f.node("thead", f.node("tr", f.group({
                    min: 0,
                    max: d - 1,
                    i: 1,
                    node: "th",
                    item: function(b) {
                        return [a[b], c.klass.weekdays]
                    }
                })))
            }((c.showWeekdaysFull ? c.weekdaysFull : c.weekdaysShort).slice(0)),
            p = function(a) {
                return f.node("div", " ", c.klass["nav" + (a ? "Next" : "Prev")] + (a && k.year >= n.year && k.month >= n.month || !a && k.year <= m.year && k.month <= m.month ? " " + c.klass.navDisabled : ""), "data-nav=" + (a || -1))
            }, q = function(b) {
                return c.selectMonths ? f.node("select", f.group({
                    min: 0,
                    max: 11,
                    i: 1,
                    node: "option",
                    item: function(a) {
                        return [b[a], 0, "value=" + a + (k.month == a ? " selected" : "") + (k.year == m.year && a < m.month || k.year == n.year && a > n.month ? " disabled" : "")]
                    }
                }), c.klass.selectMonth, a ? "" : "disabled") : f.node("div", b[k.month], c.klass.month)
            }, r = function() {
                var b = k.year,
                    d = c.selectYears === !0 ? 5 : ~~(c.selectYears / 2);
                if (d) {
                    var e = m.year,
                        g = n.year,
                        h = b - d,
                        i = b + d;
                    if (e > h && (i += e - h, h = e), i > g) {
                        var j = h - e,
                            l = i - g;
                        h -= j > l ? l : j, i = g
                    }
                    return f.node("select", f.group({
                        min: h,
                        max: i,
                        i: 1,
                        node: "option",
                        item: function(a) {
                            return [a, 0, "value=" + a + (b == a ? " selected" : "")]
                        }
                    }), c.klass.selectYear, a ? "" : "disabled")
                }
                return f.node("div", b, c.klass.year)
            };
        return f.node("div", p() + p(1) + q(c.showMonthsShort ? c.monthsShort : c.monthsFull) + r(), c.klass.header) + f.node("table", o + f.node("tbody", f.group({
                    min: 0,
                    max: e - 1,
                    i: 1,
                    node: "tr",
                    item: function(a) {
                        var e = c.firstDay && 0 === b.create([k.year, k.month, 1]).day ? -7 : 0;
                        return [f.group({
                            min: d * a - k.day + e + 1,
                            max: function() {
                                return this.min + d - 1
                            },
                            i: 1,
                            node: "td",
                            item: function(a) {
                                a = b.create([k.year, k.month, a + (c.firstDay ? 1 : 0)]);
                                var d = i && i.pick == a.pick,
                                    e = j && j.pick == a.pick,
                                    g = l && b.disabled(a) || a.pick < m.pick || a.pick > n.pick;
                                return [f.node("div", a.date, function(b) {
                                    return b.push(k.month == a.month ? c.klass.infocus : c.klass.outfocus), h.pick == a.pick && b.push(c.klass.now), d && b.push(c.klass.selected), e && b.push(c.klass.highlighted), g && b.push(c.klass.disabled), b.join(" ")
                                }([c.klass.day]), "data-pick=" + a.pick + " " + f.ariaAttr({
                                        role: "button",
                                        controls: b.$node[0].id,
                                        checked: d && b.$node[0].value === f.trigger(b.formats.toString, b, [c.format, a]) ? !0 : null,
                                        activedescendant: e ? !0 : null,
                                        disabled: g ? !0 : null
                                    }))]
                            }
                        })]
                    }
                })), c.klass.table) + f.node("div", f.node("button", c.today, c.klass.buttonToday, "type=button data-pick=" + h.pick + (a ? "" : " disabled")) + f.node("button", c.clear, c.klass.buttonClear, "type=button data-clear=1" + (a ? "" : " disabled")), c.klass.footer)
    }, c.defaults = function(a) {
        return {
            monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            today: "Today",
            clear: "Clear",
            format: "d mmmm, yyyy",
            klass: {
                table: a + "table",
                header: a + "header",
                navPrev: a + "nav--prev",
                navNext: a + "nav--next",
                navDisabled: a + "nav--disabled",
                month: a + "month",
                year: a + "year",
                selectMonth: a + "select--month",
                selectYear: a + "select--year",
                weekdays: a + "weekday",
                day: a + "day",
                disabled: a + "day--disabled",
                selected: a + "day--selected",
                highlighted: a + "day--highlighted",
                now: a + "day--today",
                infocus: a + "day--infocus",
                outfocus: a + "day--outfocus",
                footer: a + "footer",
                buttonClear: a + "button--clear",
                buttonToday: a + "button--today"
            }
        }
    }(a.klasses().picker + "__"), a.extend("pickadate", c)
});
/*!
 * Time picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/time.htm
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["picker", "angular"], a) : a(Picker, angular)
}(function(a, b) {
    function c(a, b) {
        var c = this,
            d = a.$node[0].value,
            e = a.$node.data("value"),
            f = e || d,
            g = e ? b.formatSubmit : b.format;
        c.settings = b, c.$node = a.$node, c.queue = {
            interval: "i",
            min: "measure create",
            max: "measure create",
            now: "now create",
            select: "parse create validate",
            highlight: "parse create validate",
            view: "parse create validate",
            disable: "deactivate",
            enable: "activate"
        }, c.item = {}, c.item.interval = b.interval || 30, c.item.disable = (b.disable || []).slice(0), c.item.enable = - function(a) {
            return a[0] === !0 ? a.shift() : -1
        }(c.item.disable), c.set("min", b.min).set("max", b.max).set("now"), f ? c.set("select", f, {
            format: g,
            fromValue: !! d
        }) : c.set("select", null).set("highlight", c.item.now), c.key = {
            40: 1,
            38: -1,
            39: 1,
            37: -1,
            go: function(a) {
                c.set("highlight", c.item.highlight.pick + a * c.item.interval, {
                    interval: a * c.item.interval
                }), this.render()
            }
        }, a.on("render", function() {
            var c = a.$root.children(),
                d = c.find("." + b.klass.viewset);
            d.length && (c[0].scrollTop = ~~d.position().top - 2 * d[0].clientHeight)
        }).on("open", function() {
            a.$root.find("button").attr("disable", !1)
        }).on("close", function() {
            a.$root.find("button").attr("disable", !0)
        })
    }
    var d = 24,
        e = 60,
        f = 12,
        g = d * e,
        h = a._;
    c.prototype.set = function(a, b, c) {
        var d = this,
            e = d.item;
        return null === b ? (e[a] = b, d) : (e["enable" == a ? "disable" : "flip" == a ? "enable" : a] = d.queue[a].split(" ").map(function(e) {
            return b = d[e](a, b, c)
        }).pop(), "select" == a ? d.set("highlight", e.select, c) : "highlight" == a ? d.set("view", e.highlight, c) : "interval" == a ? d.set("min", e.min, c).set("max", e.max, c) : a.match(/^(flip|min|max|disable|enable)$/) && ("min" == a && d.set("max", e.max, c), e.select && d.disabled(e.select) && d.set("select", e.select, c), e.highlight && d.disabled(e.highlight) && d.set("highlight", e.highlight, c)), d)
    }, c.prototype.get = function(a) {
        return this.item[a]
    }, c.prototype.create = function(a, c, f) {
        var i = this;
        return c = void 0 === c ? a : c, h.isDate(c) && (c = [c.getHours(), c.getMinutes()]), b.isObject(c) && h.isInteger(c.pick) ? c = c.pick : b.isArray(c) ? c = +c[0] * e + +c[1] : h.isInteger(c) || (c = i.now(a, c, f)), "max" == a && c < i.item.min.pick && (c += g), "min" != a && "max" != a && (c - i.item.min.pick) % i.item.interval !== 0 && (c += i.item.interval), c = i.normalize(a, c, f), {
            hour: ~~(d + c / e) % d,
            mins: (e + c % e) % e,
            time: (g + c) % g,
            pick: c
        }
    }, c.prototype.createRange = function(a, c) {
        var d = this,
            e = function(a) {
                return a === !0 || b.isArray(a) || h.isDate(a) ? d.create(a) : a
            };
        return h.isInteger(a) || (a = e(a)), h.isInteger(c) || (c = e(c)), h.isInteger(a) && b.isObject(c) ? a = [c.hour, c.mins + a * d.settings.interval] : h.isInteger(c) && b.isObject(a) && (c = [a.hour, a.mins + c * d.settings.interval]), {
            from: e(a),
            to: e(c)
        }
    }, c.prototype.withinRange = function(a, b) {
        return a = this.createRange(a.from, a.to), b.pick >= a.from.pick && b.pick <= a.to.pick
    }, c.prototype.overlapRanges = function(a, b) {
        var c = this;
        return a = c.createRange(a.from, a.to), b = c.createRange(b.from, b.to), c.withinRange(a, b.from) || c.withinRange(a, b.to) || c.withinRange(b, a.from) || c.withinRange(b, a.to)
    }, c.prototype.now = function(a, b) {
        var c, d = this.item.interval,
            f = new Date,
            g = f.getHours() * e + f.getMinutes(),
            i = h.isInteger(b);
        return g -= g % d, c = 0 > b && -d >= d * b + g, g += "min" == a && c ? 0 : d, i && (g += d * (c && "max" != a ? b + 1 : b)), g
    }, c.prototype.normalize = function(a, b) {
        var c = this.item.interval,
            d = this.item.min && this.item.min.pick || 0;
        return b -= "min" == a ? 0 : (b - d) % c
    }, c.prototype.measure = function(a, c, f) {
        var g = this;
        return c ? c === !0 || h.isInteger(c) ? c = g.now(a, c, f) : b.isObject(c) && h.isInteger(c.pick) && (c = g.normalize(a, c.pick, f)) : c = "min" == a ? [0, 0] : [d - 1, e - 1], c
    }, c.prototype.validate = function(a, b, c) {
        var d = this,
            e = c && c.interval ? c.interval : d.item.interval;
        return d.disabled(b) && (b = d.shift(b, e)), b = d.scope(b), d.disabled(b) && (b = d.shift(b, -1 * e)), b
    }, c.prototype.disabled = function(a) {
        var c = this,
            d = c.item.disable.filter(function(d) {
                return h.isInteger(d) ? a.hour == d : b.isArray(d) || h.isDate(d) ? a.pick == c.create(d).pick : b.isObject(d) ? c.withinRange(d, a) : void 0
            });
        return d = d.length && !d.filter(function(a) {
                return b.isArray(a) && "inverted" == a[2] || b.isObject(a) && a.inverted
            }).length, -1 === c.item.enable ? !d : d || a.pick < c.item.min.pick || a.pick > c.item.max.pick
    }, c.prototype.shift = function(a, b) {
        var c = this,
            d = c.item.min.pick,
            e = c.item.max.pick;
        for (b = b || c.item.interval; c.disabled(a) && (a = c.create(a.pick += b), !(a.pick <= d || a.pick >= e)););
        return a
    }, c.prototype.scope = function(a) {
        var b = this.item.min.pick,
            c = this.item.max.pick;
        return this.create(a.pick > c ? c : a.pick < b ? b : a)
    }, c.prototype.parse = function(a, c, d) {
        var f, g, i, j, k, l = this,
            m = {};
        if (!c || h.isInteger(c) || b.isArray(c) || h.isDate(c) || b.isObject(c) && h.isInteger(c.pick)) return c;
        d && d.format || (d = d || {}, d.format = l.settings.format), l.formats.toArray(d.format).map(function(a) {
            var b, d = l.formats[a],
                e = d ? h.trigger(d, l, [c, m]) : a.replace(/^!/, "").length;
            d && (b = c.substr(0, e), m[a] = b.match(/^\d+$/) ? +b : b), c = c.substr(e)
        });
        for (j in m) k = m[j], h.isInteger(k) ? j.match(/^(h|hh)$/i) ? (f = k, ("h" == j || "hh" == j) && (f %= 12)) : "i" == j && (g = k) : j.match(/^a$/i) && k.match(/^p/i) && ("h" in m || "hh" in m) && (i = !0);
        return (i ? f + 12 : f) * e + g
    }, c.prototype.formats = {
        h: function(a, b) {
            return a ? h.digits(a) : b.hour % f || f
        },
        hh: function(a, b) {
            return a ? 2 : h.lead(b.hour % f || f)
        },
        H: function(a, b) {
            return a ? h.digits(a) : "" + b.hour % 24
        },
        HH: function(a, b) {
            return a ? h.digits(a) : h.lead(b.hour % 24)
        },
        i: function(a, b) {
            return a ? 2 : h.lead(b.mins)
        },
        a: function(a, b) {
            return a ? 4 : g / 2 > b.time % g ? "a.m." : "p.m."
        },
        A: function(a, b) {
            return a ? 2 : g / 2 > b.time % g ? "AM" : "PM"
        },
        toArray: function(a) {
            return a.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)
        },
        toString: function(a, b) {
            var c = this;
            return c.formats.toArray(a).map(function(a) {
                return h.trigger(c.formats[a], c, [0, b]) || a.replace(/^!/, "")
            }).join("")
        }
    }, c.prototype.isTimeExact = function(a, c) {
        var d = this;
        return h.isInteger(a) && h.isInteger(c) || "boolean" == typeof a && "boolean" == typeof c ? a === c : (h.isDate(a) || b.isArray(a)) && (h.isDate(c) || b.isArray(c)) ? d.create(a).pick === d.create(c).pick : b.isObject(a) && b.isObject(c) ? d.isTimeExact(a.from, c.from) && d.isTimeExact(a.to, c.to) : !1
    }, c.prototype.isTimeOverlap = function(a, c) {
        var d = this;
        return h.isInteger(a) && (h.isDate(c) || b.isArray(c)) ? a === d.create(c).hour : h.isInteger(c) && (h.isDate(a) || b.isArray(a)) ? c === d.create(a).hour : b.isObject(a) && b.isObject(c) ? d.overlapRanges(a, c) : !1
    }, c.prototype.flipEnable = function(a) {
        var b = this.item;
        b.enable = a || (-1 == b.enable ? 1 : -1)
    }, c.prototype.deactivate = function(a, c) {
        var d = this,
            e = d.item.disable.slice(0);
        return "flip" == c ? d.flipEnable() : c === !1 ? (d.flipEnable(1), e = []) : c === !0 ? (d.flipEnable(-1), e = []) : c.map(function(a) {
            for (var c, f = 0; f < e.length; f += 1)
                if (d.isTimeExact(a, e[f])) {
                    c = !0;
                    break
                }
            c || (h.isInteger(a) || h.isDate(a) || b.isArray(a) || b.isObject(a) && a.from && a.to) && e.push(a)
        }), e
    }, c.prototype.activate = function(a, c) {
        var d = this,
            e = d.item.disable,
            f = e.length;
        return "flip" == c ? d.flipEnable() : c === !0 ? (d.flipEnable(1), e = []) : c === !1 ? (d.flipEnable(-1), e = []) : c.map(function(a) {
            var c, g, i, j;
            for (i = 0; f > i; i += 1) {
                if (g = e[i], d.isTimeExact(g, a)) {
                    c = e[i] = null, j = !0;
                    break
                }
                if (d.isTimeOverlap(g, a)) {
                    b.isObject(a) ? (a.inverted = !0, c = a) : b.isArray(a) ? (c = a, c[2] || c.push("inverted")) : h.isDate(a) && (c = [a.getFullYear(), a.getMonth(), a.getDate(), "inverted"]);
                    break
                }
            }
            if (c)
                for (i = 0; f > i; i += 1)
                    if (d.isTimeExact(e[i], a)) {
                        e[i] = null;
                        break
                    }
            if (j)
                for (i = 0; f > i; i += 1)
                    if (d.isTimeOverlap(e[i], a)) {
                        e[i] = null;
                        break
                    }
            c && e.push(c)
        }), e.filter(function(a) {
            return null != a
        })
    }, c.prototype.i = function(a, b) {
        return h.isInteger(b) && b > 0 ? b : this.item.interval
    }, c.prototype.nodes = function(a) {
        var b = this,
            c = b.settings,
            d = b.item.select,
            e = b.item.highlight,
            f = b.item.view,
            g = b.item.disable;
        return h.node("ul", h.group({
                min: b.item.min.pick,
                max: b.item.max.pick,
                i: b.item.interval,
                node: "li",
                item: function(a) {
                    a = b.create(a);
                    var i = a.pick,
                        j = d && d.pick == i,
                        k = e && e.pick == i,
                        l = g && b.disabled(a);
                    return [h.trigger(b.formats.toString, b, [h.trigger(c.formatLabel, b, [a]) || c.format, a]), function(a) {
                        return j && a.push(c.klass.selected), k && a.push(c.klass.highlighted), f && f.pick == i && a.push(c.klass.viewset), l && a.push(c.klass.disabled), a.join(" ")
                    }([c.klass.listItem]), "data-pick=" + a.pick + " " + h.ariaAttr({
                        role: "button",
                        controls: b.$node[0].id,
                        checked: j && b.$node.val() === h.trigger(b.formats.toString, b, [c.format, a]) ? !0 : null,
                        activedescendant: k ? !0 : null,
                        disabled: l ? !0 : null
                    })]
                }
            }) + h.node("li", h.node("button", c.clear, c.klass.buttonClear, "type=button data-clear=1" + (a ? "" : " disable"))), c.klass.list)
    }, c.defaults = function(a) {
        return {
            clear: "Clear",
            format: "h:i A",
            interval: 30,
            klass: {
                picker: a + " " + a + "--time",
                holder: a + "__holder",
                list: a + "__list",
                listItem: a + "__list-item",
                disabled: a + "__list-item--disabled",
                selected: a + "__list-item--selected",
                highlighted: a + "__list-item--highlighted",
                viewset: a + "__list-item--viewset",
                now: a + "__list-item--now",
                buttonClear: a + "__button--clear"
            }
        }
    }(a.klasses().picker), a.extend("pickatime", c)
});
/*!
 * Legacy browser support
 */
[].map || (Array.prototype.map = function(a, b) {
    for (var c = this, d = c.length, e = new Array(d), f = 0; d > f; f++) f in c && (e[f] = a.call(b, c[f], f, c));
    return e
}), [].filter || (Array.prototype.filter = function(a) {
    if (null == this) throw new TypeError;
    var b = Object(this),
        c = b.length >>> 0;
    if ("function" != typeof a) throw new TypeError;
    for (var d = [], e = arguments[1], f = 0; c > f; f++)
        if (f in b) {
            var g = b[f];
            a.call(e, g, f, b) && d.push(g)
        }
    return d
}), [].indexOf || (Array.prototype.indexOf = function(a) {
    if (null == this) throw new TypeError;
    var b = Object(this),
        c = b.length >>> 0;
    if (0 === c) return -1;
    var d = 0;
    if (arguments.length > 1 && (d = Number(arguments[1]), d != d ? d = 0 : 0 !== d && 1 / 0 != d && d != -1 / 0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), d >= c) return -1;
    for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++)
        if (e in b && b[e] === a) return e;
    return -1
});
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * http://blog.stevenlevithan.com/archives/cross-browser-split
 */
var nativeSplit = String.prototype.split,
    compliantExecNpcg = void 0 === /()??/.exec("")[1];
String.prototype.split = function(a, b) {
    var c = this;
    if ("[object RegExp]" !== Object.prototype.toString.call(a)) return nativeSplit.call(c, a, b);
    var d, e, f, g, h = [],
        i = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.extended ? "x" : "") + (a.sticky ? "y" : ""),
        j = 0;
    for (a = new RegExp(a.source, i + "g"), c += "", compliantExecNpcg || (d = new RegExp("^" + a.source + "$(?!\\s)", i)), b = void 0 === b ? -1 >>> 0 : b >>> 0;
         (e = a.exec(c)) && (f = e.index + e[0].length, !(f > j && (h.push(c.slice(j, e.index)), !compliantExecNpcg && e.length > 1 && e[0].replace(d, function() {
             for (var a = 1; a < arguments.length - 2; a++) void 0 === arguments[a] && (e[a] = void 0)
         }), e.length > 1 && e.index < c.length && Array.prototype.push.apply(h, e.slice(1)), g = e[0].length, j = f, h.length >= b)));) a.lastIndex === e.index && a.lastIndex++;
    return j === c.length ? (g || !a.test("")) && h.push("") : h.push(c.slice(j)), h.length > b ? h.slice(0, b) : h
};
angular.module("angular-datepicker", []).directive("pickADate", function() {
    return {
        restrict: "A",
        scope: {
            pickADate: "=",
            minDate: "=",
            maxDate: "="
        },
        link: function(a, b) {
            b.pickadate({
                onSet: function(c) {
                    if (!a.$$phase && !a.$root.$$phase) {
                        var d = b.pickadate("picker").get("select");
                        a.$apply(function() {
                            return c.hasOwnProperty("clear") ? void(a.pickADate = null) : (a.pickADate || (a.pickADate = new Date(0)), a.pickADate.setYear(d.obj.getYear() + 1900), a.pickADate.setMonth(d.obj.getMonth()), void a.pickADate.setDate(d.obj.getDate()))
                        })
                    }
                },
                onClose: function() {
                    b[0].blur()
                }
            })
        }
    }
}).directive('pickATime', function () {
    return {
        restrict: "A",
        scope: {
            pickATime: '=',
            pickATimeOptions: '='
        },
        link: function (scope, element, attrs) {
            var options = $.extend(scope.pickATimeOptions || {}, {
                onSet: function (e) {
                    if (scope.$$phase || scope.$root.$$phase) // we are coming from $watch or link setup
                        return;
                    var select = element.pickatime('picker').get('select'); // selected date
                    scope.$apply(function () {
                        if (e.hasOwnProperty('clear')) {
                            scope.pickATime = null;
                            return;
                        }
                        if (!scope.pickATime)
                            scope.pickATime = new Date(0);
                        // (attrs.setUtc)
                        // ? scope.pickATime.setUTCHours(select.hour)
                        // : scope.pickATime.setHours(select.hour);
                        scope.pickATime.setHours(select.hour);
                        scope.pickATime.setMinutes(select.mins);
                        scope.pickATime.setSeconds(0);
                        scope.pickATime.setMilliseconds(0);
                    });
                },
                onClose: function () {
                    element.blur();
                }
            });
            element.pickatime(options);
            function updateValue(newValue) {
                if (newValue) {
                    scope.pickATime = (newValue instanceof Date) ? newValue : new Date(newValue);
                    // needs to be in minutes
                    var totalMins = scope.pickATime.getHours() * 60 + scope.pickATime.getMinutes();
                    element.pickatime('picker').set('select', totalMins);
                } else {
                    element.pickatime('picker').clear();
                    scope.pickATime = null;
                }
            }

            //updateValue(scope.pickATime);
            scope.$watch('pickATime', function (newValue, oldValue) {
                if (newValue === oldValue)
                    return;
                updateValue(newValue);
            }, true);
        }
    };
});