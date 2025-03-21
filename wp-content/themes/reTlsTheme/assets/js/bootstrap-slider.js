"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    },
    windowIsDefined = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window));
! function(t) {
    if ("function" == typeof define && define.amd) define(["jquery"], t);
    else if ("object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports) {
        var e;
        try {
            e = require("jquery")
        } catch (t) {
            e = null
        }
        module.exports = t(e)
    } else window && (window.Slider = t(window.jQuery))
}(function(t) {
    var e;
    return windowIsDefined && !window.console && (window.console = {}), windowIsDefined && !window.console.log && (window.console.log = function() {}), windowIsDefined && !window.console.warn && (window.console.warn = function() {}),
        function(t) {
            var e = Array.prototype.slice;

            function i() {}! function(t) {
                if (t) {
                    var s = "undefined" == typeof console ? i : function(t) {
                        console.error(t)
                    };
                    t.bridget = function(i, o) {
                        ! function(e) {
                            e.prototype.option || (e.prototype.option = function(e) {
                                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
                            })
                        }(o),
                        function(i, o) {
                            t.fn[i] = function(n) {
                                if ("string" == typeof n) {
                                    for (var a = e.call(arguments, 1), h = 0, l = this.length; h < l; h++) {
                                        var r = this[h],
                                            d = t.data(r, i);
                                        if (d)
                                            if (t.isFunction(d[n]) && "_" !== n.charAt(0)) {
                                                var p = d[n].apply(d, a);
                                                if (void 0 !== p && p !== d) return p
                                            } else s("no such method '" + n + "' for " + i + " instance");
                                        else s("cannot call methods on " + i + " prior to initialization; attempted to call '" + n + "'")
                                    }
                                    return this
                                }
                                var c = this.map(function() {
                                    var e = t.data(this, i);
                                    return e ? (e.option(n), e._init()) : (e = new o(this, n), t.data(this, i, e)), t(this)
                                });
                                return 1 === c.length ? c[0] : c
                            }
                        }(i, o)
                    }, t.bridget
                }
            }(t)
        }(t),
        function(t) {
            var i = void 0,
                s = function(t) {
                    return "Invalid input value '" + t + "' passed in"
                },
                o = {
                    linear: {
                        getValue: function(t, e) {
                            return t < e.min ? e.min : t > e.max ? e.max : t
                        },
                        toValue: function(t) {
                            var e = t / 100 * (this.options.max - this.options.min),
                                i = !0;
                            if (this.options.ticks_positions.length > 0) {
                                for (var s, n, a, h = 0, l = 1; l < this.options.ticks_positions.length; l++)
                                    if (t <= this.options.ticks_positions[l]) {
                                        s = this.options.ticks[l - 1], a = this.options.ticks_positions[l - 1], n = this.options.ticks[l], h = this.options.ticks_positions[l];
                                        break
                                    }
                                e = s + (t - a) / (h - a) * (n - s), i = !1
                            }
                            var r = (i ? this.options.min : 0) + Math.round(e / this.options.step) * this.options.step;
                            return o.linear.getValue(r, this.options)
                        },
                        toPercentage: function(t) {
                            if (this.options.max === this.options.min) return 0;
                            if (this.options.ticks_positions.length > 0) {
                                for (var e, i, s, o = 0, n = 0; n < this.options.ticks.length; n++)
                                    if (t <= this.options.ticks[n]) {
                                        e = n > 0 ? this.options.ticks[n - 1] : 0, s = n > 0 ? this.options.ticks_positions[n - 1] : 0, i = this.options.ticks[n], o = this.options.ticks_positions[n];
                                        break
                                    }
                                if (n > 0) return s + (t - e) / (i - e) * (o - s)
                            }
                            return 100 * (t - this.options.min) / (this.options.max - this.options.min)
                        }
                    },
                    logarithmic: {
                        toValue: function(t) {
                            var e = 1 - this.options.min,
                                i = Math.log(this.options.min + e),
                                s = Math.log(this.options.max + e),
                                n = Math.exp(i + (s - i) * t / 100) - e;
                            return Math.round(n) === s ? s : (n = this.options.min + Math.round((n - this.options.min) / this.options.step) * this.options.step, o.linear.getValue(n, this.options))
                        },
                        toPercentage: function(t) {
                            if (this.options.max === this.options.min) return 0;
                            var e = 1 - this.options.min,
                                i = Math.log(this.options.max + e),
                                s = Math.log(this.options.min + e);
                            return 100 * (Math.log(t + e) - s) / (i - s)
                        }
                    }
                };

            function n(e, i) {
                this._state = {
                    value: null,
                    enabled: null,
                    offset: null,
                    size: null,
                    percentage: null,
                    inDrag: !1,
                    over: !1,
                    tickIndex: null
                }, this.ticksCallbackMap = {}, this.handleCallbackMap = {}, "string" == typeof e ? this.element = document.querySelector(e) : e instanceof HTMLElement && (this.element = e), i = i || {};
                for (var s = Object.keys(this.defaultOptions), n = i.hasOwnProperty("min"), a = i.hasOwnProperty("max"), h = 0; h < s.length; h++) {
                    var l = s[h],
                        r = i[l];
                    r = null !== (r = void 0 !== r ? r : p(this.element, l)) ? r : this.defaultOptions[l], this.options || (this.options = {}), this.options[l] = r
                }
                if (this.ticksAreValid = Array.isArray(this.options.ticks) && this.options.ticks.length > 0, this.ticksAreValid || (this.options.lock_to_ticks = !1), "auto" === this.options.rtl) {
                    var d = window.getComputedStyle(this.element);
                    this.options.rtl = null != d ? "rtl" === d.direction : "rtl" === this.element.style.direction
                }

                function p(t, e) {
                    var i = "data-slider-" + e.replace(/_/g, "-"),
                        s = t.getAttribute(i);
                    try {
                        return JSON.parse(s)
                    } catch (t) {
                        return s
                    }
                }
                "vertical" !== this.options.orientation || "top" !== this.options.tooltip_position && "bottom" !== this.options.tooltip_position ? "horizontal" !== this.options.orientation || "left" !== this.options.tooltip_position && "right" !== this.options.tooltip_position || (this.options.tooltip_position = "top") : this.options.rtl ? this.options.tooltip_position = "left" : this.options.tooltip_position = "right";
                var c, u, m, v, _, g = this.element.style.width,
                    f = !1,
                    y = this.element.parentNode;
                if (this.sliderElem) f = !0;
                else {
                    this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
                    var b = document.createElement("div");
                    b.className = "slider-track", (u = document.createElement("div")).className = "slider-track-low", (c = document.createElement("div")).className = "slider-selection", (m = document.createElement("div")).className = "slider-track-high", (v = document.createElement("div")).className = "slider-handle min-slider-handle", v.setAttribute("role", "slider"), v.setAttribute("aria-valuemin", this.options.min), v.setAttribute("aria-valuemax", this.options.max), (_ = document.createElement("div")).className = "slider-handle max-slider-handle", _.setAttribute("role", "slider"), _.setAttribute("aria-valuemin", this.options.min), _.setAttribute("aria-valuemax", this.options.max), b.appendChild(u), b.appendChild(c), b.appendChild(m), this.rangeHighlightElements = [];
                    var k = this.options.rangeHighlights;
                    if (Array.isArray(k) && k.length > 0)
                        for (var E = 0; E < k.length; E++) {
                            var C = document.createElement("div"),
                                w = k[E].class || "";
                            C.className = "slider-rangeHighlight slider-selection " + w, this.rangeHighlightElements.push(C), b.appendChild(C)
                        }
                    var x = Array.isArray(this.options.labelledby);
                    if (x && this.options.labelledby[0] && v.setAttribute("aria-labelledby", this.options.labelledby[0]), x && this.options.labelledby[1] && _.setAttribute("aria-labelledby", this.options.labelledby[1]), !x && this.options.labelledby && (v.setAttribute("aria-labelledby", this.options.labelledby), _.setAttribute("aria-labelledby", this.options.labelledby)), this.ticks = [], Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                        for (this.ticksContainer = document.createElement("div"), this.ticksContainer.className = "slider-tick-container", h = 0; h < this.options.ticks.length; h++) {
                            var L = document.createElement("div");
                            if (L.className = "slider-tick", this.options.ticks_tooltip) {
                                var T = this._addTickListener(),
                                    M = T.addMouseEnter(this, L, h),
                                    P = T.addMouseLeave(this, L);
                                this.ticksCallbackMap[h] = {
                                    mouseEnter: M,
                                    mouseLeave: P
                                }
                            }
                            this.ticks.push(L), this.ticksContainer.appendChild(L)
                        }
                        c.className += " tick-slider-selection"
                    }
                    if (this.tickLabels = [], Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0)
                        for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", h = 0; h < this.options.ticks_labels.length; h++) {
                            var A = document.createElement("div"),
                                H = 0 === this.options.ticks_positions.length,
                                N = this.options.reversed && H ? this.options.ticks_labels.length - (h + 1) : h;
                            A.className = "slider-tick-label", A.innerHTML = this.options.ticks_labels[N], this.tickLabels.push(A), this.tickLabelContainer.appendChild(A)
                        }
                    var S = function(t) {
                            var e = document.createElement("div");
                            e.className = "tooltip-arrow";
                            var i = document.createElement("div");
                            i.className = "tooltip-inner", t.appendChild(e), t.appendChild(i)
                        },
                        V = document.createElement("div");
                    V.className = "tooltip tooltip-main", V.setAttribute("role", "presentation"), S(V);
                    var z = document.createElement("div");
                    z.className = "tooltip tooltip-min", z.setAttribute("role", "presentation"), S(z);
                    var D = document.createElement("div");
                    D.className = "tooltip tooltip-max", D.setAttribute("role", "presentation"), S(D), this.sliderElem.appendChild(b), this.sliderElem.appendChild(V), this.sliderElem.appendChild(z), this.sliderElem.appendChild(D), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), this.ticksContainer && this.sliderElem.appendChild(this.ticksContainer), this.sliderElem.appendChild(v), this.sliderElem.appendChild(_), y.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
                }
                if (t && (this.$element = t(this.element), this.$sliderElem = t(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.touchX = 0, this.touchY = 0, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), o[this.options.scale] && (this.options.scale = o[this.options.scale]), !0 === f && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.sliderElem, "slider-rtl"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "right", "top", "width", "height"].forEach(function(t) {
                        this._removeProperty(this.trackLow, t), this._removeProperty(this.trackSelection, t), this._removeProperty(this.trackHigh, t)
                    }, this), [this.handle1, this.handle2].forEach(function(t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "right"), this._removeProperty(t, "top")
                    }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function(t) {
                        this._removeProperty(t, "left"), this._removeProperty(t, "right"), this._removeProperty(t, "top"), this._removeClass(t, "right"), this._removeClass(t, "left"), this._removeClass(t, "top")
                    }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = g, this.options.orientation = "horizontal", this.options.rtl ? this.stylePos = "right" : this.stylePos = "left", this.mousePos = "clientX", this.sizePos = "offsetWidth"), this.options.rtl && this._addClass(this.sliderElem, "slider-rtl"), this._setTooltipPosition(), Array.isArray(this.options.ticks) && this.options.ticks.length > 0 && (a || (this.options.max = Math.max.apply(Math, this.options.ticks)), n || (this.options.min = Math.min.apply(Math, this.options.ticks))), Array.isArray(this.options.value) ? (this.options.range = !0, this._state.value = this.options.value) : this.options.range ? this._state.value = [this.options.value, this.options.max] : this._state.value = this.options.value, this.trackLow = u || this.trackLow, this.trackSelection = c || this.trackSelection, this.trackHigh = m || this.trackHigh, "none" === this.options.selection ? (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")) : "after" !== this.options.selection && "before" !== this.options.selection || (this._removeClass(this.trackLow, "hide"), this._removeClass(this.trackSelection, "hide"), this._removeClass(this.trackHigh, "hide")), this.handle1 = v || this.handle1, this.handle2 = _ || this.handle2, !0 === f)
                    for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), h = 0; h < this.ticks.length; h++) this._removeClass(this.ticks[h], "round triangle hide");
                if (-1 !== ["round", "triangle", "custom"].indexOf(this.options.handle))
                    for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), h = 0; h < this.ticks.length; h++) this._addClass(this.ticks[h], this.options.handle);
                if (this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this.setValue(this._state.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.mousedown = this._mousedown.bind(this), this.touchstart = this._touchstart.bind(this), this.touchmove = this._touchmove.bind(this), this.touchCapable && (this.sliderElem.addEventListener("touchstart", this.touchstart, !1), this.sliderElem.addEventListener("touchmove", this.touchmove, !1)), this.sliderElem.addEventListener("mousedown", this.mousedown, !1), this.resize = this._resize.bind(this), window.addEventListener("resize", this.resize, !1), "hide" === this.options.tooltip) this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide");
                else if ("always" === this.options.tooltip) this._showTooltip(), this._alwaysShowTooltip = !0;
                else {
                    if (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.options.ticks_tooltip) {
                        var I = this._addTickListener(),
                            F = I.addMouseEnter(this, this.handle1),
                            O = I.addMouseLeave(this, this.handle1);
                        this.handleCallbackMap.handle1 = {
                            mouseEnter: F,
                            mouseLeave: O
                        }, F = I.addMouseEnter(this, this.handle2), O = I.addMouseLeave(this, this.handle2), this.handleCallbackMap.handle2 = {
                            mouseEnter: F,
                            mouseLeave: O
                        }
                    } else this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.touchCapable && (this.sliderElem.addEventListener("touchstart", this.showTooltip, !1), this.sliderElem.addEventListener("touchmove", this.showTooltip, !1), this.sliderElem.addEventListener("touchend", this.hideTooltip, !1));
                    this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1), this.touchCapable && (this.handle1.addEventListener("touchstart", this.showTooltip, !1), this.handle1.addEventListener("touchmove", this.showTooltip, !1), this.handle1.addEventListener("touchend", this.hideTooltip, !1), this.handle2.addEventListener("touchstart", this.showTooltip, !1), this.handle2.addEventListener("touchmove", this.showTooltip, !1), this.handle2.addEventListener("touchend", this.hideTooltip, !1))
                }
                this.options.enabled ? this.enable() : this.disable()
            }(e = function(t, e) {
                return n.call(this, t, e), this
            }).prototype = {
                _init: function() {},
                constructor: e,
                defaultOptions: {
                    id: "",
                    min: 0,
                    max: 10,
                    step: 1,
                    precision: 0,
                    orientation: "horizontal",
                    value: 5,
                    range: !1,
                    selection: "before",
                    tooltip: "show",
                    tooltip_split: !1,
                    lock_to_ticks: !1,
                    handle: "round",
                    reversed: !1,
                    rtl: "auto",
                    enabled: !0,
                    formatter: function(t) {
                        return Array.isArray(t) ? t[0] + " : " + t[1] : t
                    },
                    natural_arrow_keys: !1,
                    ticks: [],
                    ticks_positions: [],
                    ticks_labels: [],
                    ticks_snap_bounds: 0,
                    ticks_tooltip: !1,
                    scale: "linear",
                    focus: !1,
                    tooltip_position: null,
                    labelledby: null,
                    rangeHighlights: []
                },
                getElement: function() {
                    return this.sliderElem
                },
                getValue: function() {
                    return this.options.range ? this._state.value : this._state.value[0]
                },
                setValue: function(t, e, i) {
                    t || (t = 0);
                    var s = this.getValue();
                    this._state.value = this._validateInputValue(t);
                    var o = this._applyPrecision.bind(this);
                    this.options.range ? (this._state.value[0] = o(this._state.value[0]), this._state.value[1] = o(this._state.value[1]), this.ticksAreValid && this.options.lock_to_ticks && (this._state.value[0] = this.options.ticks[this._getClosestTickIndex(this._state.value[0])], this._state.value[1] = this.options.ticks[this._getClosestTickIndex(this._state.value[1])]), this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0])), this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]))) : (this._state.value = o(this._state.value), this.ticksAreValid && this.options.lock_to_ticks && (this._state.value = this.options.ticks[this._getClosestTickIndex(this._state.value)]), this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))], this._addClass(this.handle2, "hide"), "after" === this.options.selection ? this._state.value[1] = this.options.max : this._state.value[1] = this.options.min), this._setTickIndex(), this.options.max > this.options.min ? this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : this._state.percentage = [0, 0, 100], this._layout();
                    var n = this.options.range ? this._state.value : this._state.value[0];
                    this._setDataVal(n), !0 === e && this._trigger("slide", n);
                    return (Array.isArray(n) ? s[0] !== n[0] || s[1] !== n[1] : s !== n) && !0 === i && this._trigger("change", {
                        oldValue: s,
                        newValue: n
                    }), this
                },
                destroy: function() {
                    this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), t && (this._unbindJQueryEventHandlers(), "slider" === i && this.$element.removeData(i), this.$element.removeData("bootstrapSlider"))
                },
                disable: function() {
                    return this._state.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
                },
                enable: function() {
                    return this._state.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
                },
                toggle: function() {
                    return this._state.enabled ? this.disable() : this.enable(), this
                },
                isEnabled: function() {
                    return this._state.enabled
                },
                on: function(t, e) {
                    return this._bindNonQueryEventHandler(t, e), this
                },
                off: function(e, i) {
                    t ? (this.$element.off(e, i), this.$sliderElem.off(e, i)) : this._unbindNonQueryEventHandler(e, i)
                },
                getAttribute: function(t) {
                    return t ? this.options[t] : this.options
                },
                setAttribute: function(t, e) {
                    return this.options[t] = e, this
                },
                refresh: function(e) {
                    var s = this.getValue();
                    return this._removeSliderEventHandlers(), n.call(this, this.element, this.options), e && !0 === e.useCurrentValue && this.setValue(s), t && ("slider" === i ? (t.data(this.element, "slider", this), t.data(this.element, "bootstrapSlider", this)) : t.data(this.element, "bootstrapSlider", this)), this
                },
                relayout: function() {
                    return this._resize(), this
                },
                _removeTooltipListener: function(t, e) {
                    this.handle1.removeEventListener(t, e, !1), this.handle2.removeEventListener(t, e, !1)
                },
                _removeSliderEventHandlers: function() {
                    if (this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.options.ticks_tooltip) {
                        for (var t = this.ticksContainer.getElementsByClassName("slider-tick"), e = 0; e < t.length; e++) t[e].removeEventListener("mouseenter", this.ticksCallbackMap[e].mouseEnter, !1), t[e].removeEventListener("mouseleave", this.ticksCallbackMap[e].mouseLeave, !1);
                        this.handleCallbackMap.handle1 && this.handleCallbackMap.handle2 && (this.handle1.removeEventListener("mouseenter", this.handleCallbackMap.handle1.mouseEnter, !1), this.handle2.removeEventListener("mouseenter", this.handleCallbackMap.handle2.mouseEnter, !1), this.handle1.removeEventListener("mouseleave", this.handleCallbackMap.handle1.mouseLeave, !1), this.handle2.removeEventListener("mouseleave", this.handleCallbackMap.handle2.mouseLeave, !1))
                    }
                    this.handleCallbackMap = null, this.ticksCallbackMap = null, this.showTooltip && this._removeTooltipListener("focus", this.showTooltip), this.hideTooltip && this._removeTooltipListener("blur", this.hideTooltip), this.showTooltip && this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.hideTooltip && this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1), this.touchCapable && (this.showTooltip && (this.handle1.removeEventListener("touchstart", this.showTooltip, !1), this.handle1.removeEventListener("touchmove", this.showTooltip, !1), this.handle2.removeEventListener("touchstart", this.showTooltip, !1), this.handle2.removeEventListener("touchmove", this.showTooltip, !1)), this.hideTooltip && (this.handle1.removeEventListener("touchend", this.hideTooltip, !1), this.handle2.removeEventListener("touchend", this.hideTooltip, !1)), this.showTooltip && (this.sliderElem.removeEventListener("touchstart", this.showTooltip, !1), this.sliderElem.removeEventListener("touchmove", this.showTooltip, !1)), this.hideTooltip && this.sliderElem.removeEventListener("touchend", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.touchstart, !1), this.sliderElem.removeEventListener("touchmove", this.touchmove, !1)), window.removeEventListener("resize", this.resize, !1)
                },
                _bindNonQueryEventHandler: function(t, e) {
                    void 0 === this.eventToCallbackMap[t] && (this.eventToCallbackMap[t] = []), this.eventToCallbackMap[t].push(e)
                },
                _unbindNonQueryEventHandler: function(t, e) {
                    var i = this.eventToCallbackMap[t];
                    if (void 0 !== i)
                        for (var s = 0; s < i.length; s++)
                            if (i[s] === e) {
                                i.splice(s, 1);
                                break
                            }
                },
                _cleanUpEventCallbacksMap: function() {
                    for (var t = Object.keys(this.eventToCallbackMap), e = 0; e < t.length; e++) {
                        var i = t[e];
                        delete this.eventToCallbackMap[i]
                    }
                },
                _showTooltip: function() {
                    !1 === this.options.tooltip_split ? (this._addClass(this.tooltip, "in"), this.tooltip_min.style.display = "none", this.tooltip_max.style.display = "none") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in"), this.tooltip.style.display = "none"), this._state.over = !0
                },
                _hideTooltip: function() {
                    !1 === this._state.inDrag && !0 !== this._alwaysShowTooltip && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this._state.over = !1
                },
                _setToolTipOnMouseOver: function(t) {
                    var e = this,
                        i = this.options.formatter(t ? t.value[0] : this._state.value[0]),
                        s = o(t || this._state, this.options.reversed);

                    function o(t, i) {
                        return i ? [100 - t.percentage[0], e.options.range ? 100 - t.percentage[1] : t.percentage[1]] : [t.percentage[0], t.percentage[1]]
                    }
                    this._setText(this.tooltipInner, i), this.tooltip.style[this.stylePos] = s[0] + "%"
                },
                _copyState: function() {
                    return {
                        value: [this._state.value[0], this._state.value[1]],
                        enabled: this._state.enabled,
                        offset: this._state.offset,
                        size: this._state.size,
                        percentage: [this._state.percentage[0], this._state.percentage[1], this._state.percentage[2]],
                        inDrag: this._state.inDrag,
                        over: this._state.over,
                        dragged: this._state.dragged,
                        keyCtrl: this._state.keyCtrl
                    }
                },
                _addTickListener: function() {
                    return {
                        addMouseEnter: function(t, e, i) {
                            var s = function() {
                                var s = t._copyState(),
                                    o = e === t.handle1 ? s.value[0] : s.value[1],
                                    n = void 0;
                                void 0 !== i ? (o = t.options.ticks[i], n = t.options.ticks_positions.length > 0 && t.options.ticks_positions[i] || t._toPercentage(t.options.ticks[i])) : n = t._toPercentage(o), s.value[0] = o, s.percentage[0] = n, t._setToolTipOnMouseOver(s), t._showTooltip()
                            };
                            return e.addEventListener("mouseenter", s, !1), s
                        },
                        addMouseLeave: function(t, e) {
                            var i = function() {
                                t._hideTooltip()
                            };
                            return e.addEventListener("mouseleave", i, !1), i
                        }
                    }
                },
                _layout: function() {
                    var t, e, i;
                    if (t = this.options.reversed ? [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]] : [this._state.percentage[0], this._state.percentage[1]], this.handle1.style[this.stylePos] = t[0] + "%", this.handle1.setAttribute("aria-valuenow", this._state.value[0]), e = this.options.formatter(this._state.value[0]), isNaN(e) ? this.handle1.setAttribute("aria-valuetext", e) : this.handle1.removeAttribute("aria-valuetext"), this.handle2.style[this.stylePos] = t[1] + "%", this.handle2.setAttribute("aria-valuenow", this._state.value[1]), e = this.options.formatter(this._state.value[1]), isNaN(e) ? this.handle2.setAttribute("aria-valuetext", e) : this.handle2.removeAttribute("aria-valuetext"), this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0)
                        for (var s = 0; s < this.options.rangeHighlights.length; s++) {
                            var o = this._toPercentage(this.options.rangeHighlights[s].start),
                                n = this._toPercentage(this.options.rangeHighlights[s].end);
                            if (this.options.reversed) {
                                var a = 100 - n;
                                n = 100 - o, o = a
                            }
                            var h = this._createHighlightRange(o, n);
                            h ? "vertical" === this.options.orientation ? (this.rangeHighlightElements[s].style.top = h.start + "%", this.rangeHighlightElements[s].style.height = h.size + "%") : (this.options.rtl ? this.rangeHighlightElements[s].style.right = h.start + "%" : this.rangeHighlightElements[s].style.left = h.start + "%", this.rangeHighlightElements[s].style.width = h.size + "%") : this.rangeHighlightElements[s].style.display = "none"
                        }
                    if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                        var l, r = "vertical" === this.options.orientation ? "height" : "width";
                        l = "vertical" === this.options.orientation ? "marginTop" : this.options.rtl ? "marginRight" : "marginLeft";
                        var d = this._state.size / (this.options.ticks.length - 1);
                        if (this.tickLabelContainer) {
                            var p = 0;
                            if (0 === this.options.ticks_positions.length) "vertical" !== this.options.orientation && (this.tickLabelContainer.style[l] = -d / 2 + "px"), p = this.tickLabelContainer.offsetHeight;
                            else
                                for (c = 0; c < this.tickLabelContainer.childNodes.length; c++) this.tickLabelContainer.childNodes[c].offsetHeight > p && (p = this.tickLabelContainer.childNodes[c].offsetHeight);
                            "horizontal" === this.options.orientation && (this.sliderElem.style.marginBottom = p + "px")
                        }
                        for (var c = 0; c < this.options.ticks.length; c++) {
                            var u = this.options.ticks_positions[c] || this._toPercentage(this.options.ticks[c]);
                            this.options.reversed && (u = 100 - u), this.ticks[c].style[this.stylePos] = u + "%", this._removeClass(this.ticks[c], "in-selection"), this.options.range ? u >= t[0] && u <= t[1] && this._addClass(this.ticks[c], "in-selection") : "after" === this.options.selection && u >= t[0] ? this._addClass(this.ticks[c], "in-selection") : "before" === this.options.selection && u <= t[0] && this._addClass(this.ticks[c], "in-selection"), this.tickLabels[c] && (this.tickLabels[c].style[r] = d + "px", "vertical" !== this.options.orientation && void 0 !== this.options.ticks_positions[c] ? (this.tickLabels[c].style.position = "absolute", this.tickLabels[c].style[this.stylePos] = u + "%", this.tickLabels[c].style[l] = -d / 2 + "px") : "vertical" === this.options.orientation && (this.options.rtl ? this.tickLabels[c].style.marginRight = this.sliderElem.offsetWidth + "px" : this.tickLabels[c].style.marginLeft = this.sliderElem.offsetWidth + "px", this.tickLabelContainer.style[l] = this.sliderElem.offsetWidth / 2 * -1 + "px"), this._removeClass(this.tickLabels[c], "label-in-selection label-is-selection"), this.options.range ? u >= t[0] && u <= t[1] && (this._addClass(this.tickLabels[c], "label-in-selection"), (u === t[0] || t[1]) && this._addClass(this.tickLabels[c], "label-is-selection")) : ("after" === this.options.selection && u >= t[0] ? this._addClass(this.tickLabels[c], "label-in-selection") : "before" === this.options.selection && u <= t[0] && this._addClass(this.tickLabels[c], "label-in-selection"), u === t[0] && this._addClass(this.tickLabels[c], "label-is-selection")))
                        }
                    }
                    if (this.options.range) {
                        i = this.options.formatter(this._state.value), this._setText(this.tooltipInner, i), this.tooltip.style[this.stylePos] = (t[1] + t[0]) / 2 + "%";
                        var m = this.options.formatter(this._state.value[0]);
                        this._setText(this.tooltipInner_min, m);
                        var v = this.options.formatter(this._state.value[1]);
                        this._setText(this.tooltipInner_max, v), this.tooltip_min.style[this.stylePos] = t[0] + "%", this.tooltip_max.style[this.stylePos] = t[1] + "%"
                    } else i = this.options.formatter(this._state.value[0]), this._setText(this.tooltipInner, i), this.tooltip.style[this.stylePos] = t[0] + "%";
                    if ("vertical" === this.options.orientation) this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(t[0], t[1]) + "%", this.trackSelection.style.top = Math.min(t[0], t[1]) + "%", this.trackSelection.style.height = Math.abs(t[0] - t[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                    else {
                        "right" === this.stylePos ? this.trackLow.style.right = "0" : this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(t[0], t[1]) + "%", "right" === this.stylePos ? this.trackSelection.style.right = Math.min(t[0], t[1]) + "%" : this.trackSelection.style.left = Math.min(t[0], t[1]) + "%", this.trackSelection.style.width = Math.abs(t[0] - t[1]) + "%", "right" === this.stylePos ? this.trackHigh.style.left = "0" : this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(t[0], t[1]) - Math.abs(t[0] - t[1]) + "%";
                        var _ = this.tooltip_min.getBoundingClientRect(),
                            g = this.tooltip_max.getBoundingClientRect();
                        "bottom" === this.options.tooltip_position ? _.right > g.left ? (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = "", this.tooltip_max.style.bottom = "22px") : (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = this.tooltip_min.style.top, this.tooltip_max.style.bottom = "") : _.right > g.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top)
                    }
                },
                _createHighlightRange: function(t, e) {
                    return this._isHighlightRange(t, e) ? t > e ? {
                        start: e,
                        size: t - e
                    } : {
                        start: t,
                        size: e - t
                    } : null
                },
                _isHighlightRange: function(t, e) {
                    return 0 <= t && t <= 100 && 0 <= e && e <= 100
                },
                _resize: function(t) {
                    this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this._layout()
                },
                _removeProperty: function(t, e) {
                    t.style.removeProperty ? t.style.removeProperty(e) : t.style.removeAttribute(e)
                },
                _mousedown: function(t) {
                    if (!this._state.enabled) return !1;
                    t.preventDefault && t.preventDefault(), this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos];
                    var e = this._getPercentage(t);
                    if (this.options.range) {
                        var i = Math.abs(this._state.percentage[0] - e),
                            s = Math.abs(this._state.percentage[1] - e);
                        this._state.dragged = i < s ? 0 : 1, this._adjustPercentageForRangeSliders(e)
                    } else this._state.dragged = 0;
                    this._state.percentage[this._state.dragged] = e, this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !0;
                    var o = this._calculateValue();
                    return this._trigger("slideStart", o), this.setValue(o, !1, !0), t.returnValue = !1, this.options.focus && this._triggerFocusOnHandle(this._state.dragged), !0
                },
                _touchstart: function(t) {
                    this._mousedown(t)
                },
                _triggerFocusOnHandle: function(t) {
                    0 === t && this.handle1.focus(), 1 === t && this.handle2.focus()
                },
                _keydown: function(t, e) {
                    if (!this._state.enabled) return !1;
                    var i;
                    switch (e.keyCode) {
                        case 37:
                        case 40:
                            i = -1;
                            break;
                        case 39:
                        case 38:
                            i = 1
                    }
                    if (i) {
                        if (this.options.natural_arrow_keys) {
                            var s = "horizontal" === this.options.orientation,
                                o = "vertical" === this.options.orientation,
                                n = this.options.rtl,
                                a = this.options.reversed;
                            s ? n ? a || (i = -i) : a && (i = -i) : o && (a || (i = -i))
                        }
                        var h;
                        if (this.ticksAreValid && this.options.lock_to_ticks) {
                            var l = void 0; - 1 === (l = this.options.ticks.indexOf(this._state.value[t])) && (l = 0, window.console.warn("(lock_to_ticks) _keydown: index should not be -1")), l += i, l = Math.max(0, Math.min(this.options.ticks.length - 1, l)), h = this.options.ticks[l]
                        } else h = this._state.value[t] + i * this.options.step;
                        var r = this._toPercentage(h);
                        if (this._state.keyCtrl = t, this.options.range) {
                            this._adjustPercentageForRangeSliders(r);
                            var d = this._state.keyCtrl ? this._state.value[0] : h,
                                p = this._state.keyCtrl ? h : this._state.value[1];
                            h = [Math.max(this.options.min, Math.min(this.options.max, d)), Math.max(this.options.min, Math.min(this.options.max, p))]
                        } else h = Math.max(this.options.min, Math.min(this.options.max, h));
                        return this._trigger("slideStart", h), this.setValue(h, !0, !0), this._trigger("slideStop", h), this._pauseEvent(e), delete this._state.keyCtrl, !1
                    }
                },
                _pauseEvent: function(t) {
                    t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.cancelBubble = !0, t.returnValue = !1
                },
                _mousemove: function(t) {
                    if (!this._state.enabled) return !1;
                    var e = this._getPercentage(t);
                    this._adjustPercentageForRangeSliders(e), this._state.percentage[this._state.dragged] = e;
                    var i = this._calculateValue(!0);
                    return this.setValue(i, !0, !0), !1
                },
                _touchmove: function(t) {
                    void 0 !== t.changedTouches && t.preventDefault && t.preventDefault()
                },
                _adjustPercentageForRangeSliders: function(t) {
                    if (this.options.range) {
                        var e = this._getNumDigitsAfterDecimalPlace(t);
                        e = e ? e - 1 : 0;
                        var i = this._applyToFixedAndParseFloat(t, e);
                        0 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[1], e) < i ? (this._state.percentage[0] = this._state.percentage[1], this._state.dragged = 1) : 1 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[0], e) > i ? (this._state.percentage[1] = this._state.percentage[0], this._state.dragged = 0) : 0 === this._state.keyCtrl && this._toPercentage(this._state.value[1]) < t ? (this._state.percentage[0] = this._state.percentage[1], this._state.keyCtrl = 1, this.handle2.focus()) : 1 === this._state.keyCtrl && this._toPercentage(this._state.value[0]) > t && (this._state.percentage[1] = this._state.percentage[0], this._state.keyCtrl = 0, this.handle1.focus())
                    }
                },
                _mouseup: function(t) {
                    if (!this._state.enabled) return !1;
                    var e = this._getPercentage(t);
                    this._adjustPercentageForRangeSliders(e), this._state.percentage[this._state.dragged] = e, this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !1, !1 === this._state.over && this._hideTooltip();
                    var i = this._calculateValue(!0);
                    return this.setValue(i, !1, !0), this._trigger("slideStop", i), this._state.dragged = null, !1
                },
                _setValues: function(t, e) {
                    var i = 0 === t ? 0 : 100;
                    this._state.percentage[t] !== i && (e.data[t] = this._toValue(this._state.percentage[t]), e.data[t] = this._applyPrecision(e.data[t]))
                },
                _calculateValue: function(t) {
                    var e = {};
                    return this.options.range ? (e.data = [this.options.min, this.options.max], this._setValues(0, e), this._setValues(1, e), t && (e.data[0] = this._snapToClosestTick(e.data[0]), e.data[1] = this._snapToClosestTick(e.data[1]))) : (e.data = this._toValue(this._state.percentage[0]), e.data = parseFloat(e.data), e.data = this._applyPrecision(e.data), t && (e.data = this._snapToClosestTick(e.data))), e.data
                },
                _snapToClosestTick: function(t) {
                    for (var e = [t, 1 / 0], i = 0; i < this.options.ticks.length; i++) {
                        var s = Math.abs(this.options.ticks[i] - t);
                        s <= e[1] && (e = [this.options.ticks[i], s])
                    }
                    return e[1] <= this.options.ticks_snap_bounds ? e[0] : t
                },
                _applyPrecision: function(t) {
                    var e = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                    return this._applyToFixedAndParseFloat(t, e)
                },
                _getNumDigitsAfterDecimalPlace: function(t) {
                    var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                    return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
                },
                _applyToFixedAndParseFloat: function(t, e) {
                    var i = t.toFixed(e);
                    return parseFloat(i)
                },
                _getPercentage: function(t) {
                    !this.touchCapable || "touchstart" !== t.type && "touchmove" !== t.type && "touchend" !== t.type || (t = t.changedTouches[0]);
                    var e = t[this.mousePos] - this._state.offset[this.stylePos];
                    "right" === this.stylePos && (e = -e);
                    var i = e / this._state.size * 100;
                    return i = Math.round(i / this._state.percentage[2]) * this._state.percentage[2], this.options.reversed && (i = 100 - i), Math.max(0, Math.min(100, i))
                },
                _validateInputValue: function(t) {
                    if (isNaN(+t)) {
                        if (Array.isArray(t)) return this._validateArray(t), t;
                        throw new Error(s(t))
                    }
                    return +t
                },
                _validateArray: function(t) {
                    for (var e = 0; e < t.length; e++) {
                        var i = t[e];
                        if ("number" != typeof i) throw new Error(s(i))
                    }
                },
                _setDataVal: function(t) {
                    this.element.setAttribute("data-value", t), this.element.setAttribute("value", t), this.element.value = t
                },
                _trigger: function(e, i) {
                    i = i || 0 === i ? i : void 0;
                    var s = this.eventToCallbackMap[e];
                    if (s && s.length)
                        for (var o = 0; o < s.length; o++) {
                            (0, s[o])(i)
                        }
                    t && this._triggerJQueryEvent(e, i)
                },
                _triggerJQueryEvent: function(t, e) {
                    var i = {
                        type: t,
                        value: e
                    };
                    this.$element.trigger(i), this.$sliderElem.trigger(i)
                },
                _unbindJQueryEventHandlers: function() {
                    this.$element.off(), this.$sliderElem.off()
                },
                _setText: function(t, e) {
                    void 0 !== t.textContent ? t.textContent = e : void 0 !== t.innerText && (t.innerText = e)
                },
                _removeClass: function(t, e) {
                    for (var i = e.split(" "), s = t.className, o = 0; o < i.length; o++) {
                        var n = i[o],
                            a = new RegExp("(?:\\s|^)" + n + "(?:\\s|$)");
                        s = s.replace(a, " ")
                    }
                    t.className = s.trim()
                },
                _addClass: function(t, e) {
                    for (var i = e.split(" "), s = t.className, o = 0; o < i.length; o++) {
                        var n = i[o];
                        new RegExp("(?:\\s|^)" + n + "(?:\\s|$)").test(s) || (s += " " + n)
                    }
                    t.className = s.trim()
                },
                _offsetLeft: function(t) {
                    return t.getBoundingClientRect().left
                },
                _offsetRight: function(t) {
                    return t.getBoundingClientRect().right
                },
                _offsetTop: function(t) {
                    for (var e = t.offsetTop;
                        (t = t.offsetParent) && !isNaN(t.offsetTop);) e += t.offsetTop, "BODY" !== t.tagName && (e -= t.scrollTop);
                    return e
                },
                _offset: function(t) {
                    return {
                        left: this._offsetLeft(t),
                        right: this._offsetRight(t),
                        top: this._offsetTop(t)
                    }
                },
                _css: function(e, i, s) {
                    if (t) t.style(e, i, s);
                    else {
                        var o = i.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(t, e) {
                            return e.toUpperCase()
                        });
                        e.style[o] = s
                    }
                },
                _toValue: function(t) {
                    return this.options.scale.toValue.apply(this, [t])
                },
                _toPercentage: function(t) {
                    return this.options.scale.toPercentage.apply(this, [t])
                },
                _setTooltipPosition: function() {
                    var t = [this.tooltip, this.tooltip_min, this.tooltip_max];
                    if ("vertical" === this.options.orientation) {
                        var e, i = "left" === (e = this.options.tooltip_position ? this.options.tooltip_position : this.options.rtl ? "left" : "right") ? "right" : "left";
                        t.forEach(function(t) {
                            this._addClass(t, e), t.style[i] = "100%"
                        }.bind(this))
                    } else "bottom" === this.options.tooltip_position ? t.forEach(function(t) {
                        this._addClass(t, "bottom"), t.style.top = "22px"
                    }.bind(this)) : t.forEach(function(t) {
                        this._addClass(t, "top"), t.style.top = -this.tooltip.outerHeight - 14 + "px"
                    }.bind(this))
                },
                _getClosestTickIndex: function(t) {
                    for (var e = Math.abs(t - this.options.ticks[0]), i = 0, s = 0; s < this.options.ticks.length; ++s) {
                        var o = Math.abs(t - this.options.ticks[s]);
                        o < e && (e = o, i = s)
                    }
                    return i
                },
                _setTickIndex: function() {
                    this.ticksAreValid && (this._state.tickIndex = [this.options.ticks.indexOf(this._state.value[0]), this.options.ticks.indexOf(this._state.value[1])])
                }
            }, t && t.fn && (t.fn.slider ? (windowIsDefined && window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead."), i = "bootstrapSlider") : (t.bridget("slider", e), i = "slider"), t.bridget("bootstrapSlider", e), t(function() {
                t("input[data-provide=slider]")[i]()
            }))
        }(t), e
});