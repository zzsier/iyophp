/*
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */
(function(window, undefined) {
    var rootjQuery,
        readyList,
        document = window.document,
        location = window.location,
        navigator = window.navigator,
        _jQuery = window.jQuery,
        _$ = window.$,
        core_push = Array.prototype.push,
        core_slice = Array.prototype.slice,
        core_indexOf = Array.prototype.indexOf,
        core_toString = Object.prototype.toString,
        core_hasOwn = Object.prototype.hasOwnProperty,
        core_trim = String.prototype.trim,
        jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context, rootjQuery)
        },
        core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        core_rnotwhite = /\S/,
        core_rspace = /\s+/,
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(all, letter) {
            return (letter + "").toUpperCase()
        },
        DOMContentLoaded = function() {
            if (document.addEventListener) {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready()
            } else {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", DOMContentLoaded);
                    jQuery.ready()
                }
            }
        },
        class2type = {};
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match,
                elem,
                ret,
                doc;
            if (!selector) {
                return this
            }
            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this
            }
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    match = [null, selector, null]
                } else {
                    match = rquickExpr.exec(selector)
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        doc = (context && context.nodeType ? context.ownerDocument || context: document);
                        selector = jQuery.parseHTML(match[1], doc, true);
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            this.attr.call(selector, context, true)
                        }
                        return jQuery.merge(this, selector)
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector)
                            }
                            this.length = 1;
                            this[0] = elem
                        }
                        this.context = document;
                        this.selector = selector;
                        return this
                    }
                } else {
                    if (!context || context.jquery) {
                        return (context || rootjQuery).find(selector)
                    } else {
                        return this.constructor(context).find(selector)
                    }
                }
            } else {
                if (jQuery.isFunction(selector)) {
                    return rootjQuery.ready(selector)
                }
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context
            }
            return jQuery.makeArray(selector, this)
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return core_slice.call(this)
        },
        get: function(num) {
            return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num])
        },
        pushStack: function(elems, name, selector) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            if (name === "find") {
                ret.selector = this.selector + (this.selector ? " ": "") + selector
            } else {
                if (name) {
                    ret.selector = this.selector + "." + name + "(" + selector + ")"
                }
            }
            return ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        ready: function(fn) {
            jQuery.ready.promise().done(fn);
            return this
        },
        eq: function(i) {
            i = +i;
            return i === -1 ? this.slice(i) : this.slice(i, i + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","))
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this,
                function(elem, i) {
                    return callback.call(elem, i, elem)
                }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {}
        }
        if (length === i) {
            target = this; --i
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src: []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src: {}
                        }
                        target[name] = jQuery.extend(deep, clone, copy)
                    } else {
                        if (copy !== undefined) {
                            target[name] = copy
                        }
                    }
                }
            }
        }
        return target
    };
    jQuery.extend({
        noConflict: function(deep) {
            if (window.$ === jQuery) {
                window.$ = _$
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery
            }
            return jQuery
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++
            } else {
                jQuery.ready(true)
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait: jQuery.isReady) {
                return
            }
            if (!document.body) {
                return setTimeout(jQuery.ready, 1)
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.trigger) {
                jQuery(document).trigger("ready").off("ready")
            }
        },
        isFunction: function(obj) {
            return jQuery.type(obj) === "function"
        },
        isArray: Array.isArray ||
        function(obj) {
            return jQuery.type(obj) === "array"
        },
        isWindow: function(obj) {
            return obj != null && obj == obj.window
        },
        isNumeric: function(obj) {
            return ! isNaN(parseFloat(obj)) && isFinite(obj)
        },
        type: function(obj) {
            return obj == null ? String(obj) : class2type[core_toString.call(obj)] || "object"
        },
        isPlainObject: function(obj) {
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false
                }
            } catch(e) {
                return false
            }
            var key;
            for (key in obj) {}
            return key === undefined || core_hasOwn.call(obj, key)
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false
            }
            return true
        },
        error: function(msg) {
            throw new Error(msg)
        },
        parseHTML: function(data, context, scripts) {
            var parsed;
            if (!data || typeof data !== "string") {
                return null
            }
            if (typeof context === "boolean") {
                scripts = context;
                context = 0
            }
            context = context || document;
            if ((parsed = rsingleTag.exec(data))) {
                return [context.createElement(parsed[1])]
            }
            parsed = jQuery.buildFragment([data], context, scripts ? null: []);
            return jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes)
        },
        parseJSON: function(data) {
            if (!data || typeof data !== "string") {
                return null
            }
            data = jQuery.trim(data);
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data)
            }
            if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                return (new Function("return " + data))()
            }
            jQuery.error("Invalid JSON: " + data)
        },
        parseXML: function(data) {
            var xml,
                tmp;
            if (!data || typeof data !== "string") {
                return null
            }
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml")
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data)
                }
            } catch(e) {
                xml = undefined
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data)
            }
            return xml
        },
        noop: function() {},
        globalEval: function(data) {
            if (data && core_rnotwhite.test(data)) { (window.execScript ||
            function(data) {
                window["eval"].call(window, data)
            })(data)
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var name,
                i = 0,
                length = obj.length,
                isObj = length === undefined || jQuery.isFunction(obj);
            if (args) {
                if (isObj) {
                    for (name in obj) {
                        if (callback.apply(obj[name], args) === false) {
                            break
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(obj[i++], args) === false) {
                            break
                        }
                    }
                }
            } else {
                if (isObj) {
                    for (name in obj) {
                        if (callback.call(obj[name], name, obj[name]) === false) {
                            break
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.call(obj[i], i, obj[i++]) === false) {
                            break
                        }
                    }
                }
            }
            return obj
        },
        trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
            function(text) {
                return text == null ? "": core_trim.call(text)
            }: function(text) {
            return text == null ? "": (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var type,
                ret = results || [];
            if (arr != null) {
                type = jQuery.type(arr);
                if (arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(arr)) {
                    core_push.call(ret, arr)
                } else {
                    jQuery.merge(ret, arr)
                }
            }
            return ret
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) {
                    return core_indexOf.call(arr, elem, i)
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i: 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i
                    }
                }
            }
            return - 1
        },
        merge: function(first, second) {
            var l = second.length,
                i = first.length,
                j = 0;
            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j]
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++]
                }
            }
            first.length = i;
            return first
        },
        grep: function(elems, callback, inv) {
            var retVal,
                ret = [],
                i = 0,
                length = elems.length;
            inv = !!inv;
            for (; i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) {
                    ret.push(elems[i])
                }
            }
            return ret
        },
        map: function(elems, callback, arg) {
            var value,
                key,
                ret = [],
                i = 0,
                length = elems.length,
                isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value
                    }
                }
            } else {
                for (key in elems) {
                    value = callback(elems[key], key, arg);
                    if (value != null) {
                        ret[ret.length] = value
                    }
                }
            }
            return ret.concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp,
                args,
                proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp
            }
            if (!jQuery.isFunction(fn)) {
                return undefined
            }
            args = core_slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context, args.concat(core_slice.call(arguments)))
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy
        },
        access: function(elems, fn, key, value, chainable, emptyGet, pass) {
            var exec,
                bulk = key == null,
                i = 0,
                length = elems.length;
            if (key && typeof key === "object") {
                for (i in key) {
                    jQuery.access(elems, fn, i, key[i], 1, emptyGet, value)
                }
                chainable = 1
            } else {
                if (value !== undefined) {
                    exec = pass === undefined && jQuery.isFunction(value);
                    if (bulk) {
                        if (exec) {
                            exec = fn;
                            fn = function(elem, key, value) {
                                return exec.call(jQuery(elem), value)
                            }
                        } else {
                            fn.call(elems, value);
                            fn = null
                        }
                    }
                    if (fn) {
                        for (; i < length; i++) {
                            fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass)
                        }
                    }
                    chainable = 1
                }
            }
            return chainable ? elems: bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
        },
        now: function() {
            return (new Date()).getTime()
        }
    });
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready, 1)
            } else {
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    window.addEventListener("load", jQuery.ready, false)
                } else {
                    document.attachEvent("onreadystatechange", DOMContentLoaded);
                    window.attachEvent("onload", jQuery.ready);
                    var top = false;
                    try {
                        top = window.frameElement == null && document.documentElement
                    } catch(e) {}
                    if (top && top.doScroll) { (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll("left")
                            } catch(e) {
                                return setTimeout(doScrollCheck, 50)
                            }
                            jQuery.ready()
                        }
                    })()
                    }
                }
            }
        }
        return readyList.promise(obj)
    };
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),
        function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
        });
    rootjQuery = jQuery(document);
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.split(core_rspace),
            function(_, flag) {
                object[flag] = true
            });
        return object
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({},
            options);
        var memory,
            fired,
            firing,
            firingStart,
            firingLength,
            firingIndex,
            list = [],
            stack = !options.once && [],
            fire = function(data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift())
                        }
                    } else {
                        if (memory) {
                            list = []
                        } else {
                            self.disable()
                        }
                    }
                }
            },
            self = {
                add: function() {
                    if (list) {
                        var start = list.length; (function add(args) {
                            jQuery.each(args,
                                function(_, arg) {
                                    var type = jQuery.type(arg);
                                    if (type === "function" && (!options.unique || !self.has(arg))) {
                                        list.push(arg)
                                    } else {
                                        if (arg && arg.length && type !== "string") {
                                            add(arg)
                                        }
                                    }
                                })
                        })(arguments);
                        if (firing) {
                            firingLength = list.length
                        } else {
                            if (memory) {
                                firingStart = start;
                                fire(memory)
                            }
                        }
                    }
                    return this
                },
                remove: function() {
                    if (list) {
                        jQuery.each(arguments,
                            function(_, arg) {
                                var index;
                                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                    list.splice(index, 1);
                                    if (firing) {
                                        if (index <= firingLength) {
                                            firingLength--
                                        }
                                        if (index <= firingIndex) {
                                            firingIndex--
                                        }
                                    }
                                }
                            })
                    }
                    return this
                },
                has: function(fn) {
                    return jQuery.inArray(fn, list) > -1
                },
                empty: function() {
                    list = [];
                    return this
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this
                },
                disabled: function() {
                    return ! list
                },
                lock: function() {
                    stack = undefined;
                    if (!memory) {
                        self.disable()
                    }
                    return this
                },
                locked: function() {
                    return ! stack
                },
                fireWith: function(context, args) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    if (list && (!fired || stack)) {
                        if (firing) {
                            stack.push(args)
                        } else {
                            fire(args)
                        }
                    }
                    return this
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !! fired
                }
            };
        return self
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
                state = "pending",
                promise = {
                    state: function() {
                        return state
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples,
                                function(i, tuple) {
                                    var action = tuple[0],
                                        fn = fns[i];
                                    deferred[tuple[1]](jQuery.isFunction(fn) ?
                                        function() {
                                            var returned = fn.apply(this, arguments);
                                            if (returned && jQuery.isFunction(returned.promise)) {
                                                returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
                                            } else {
                                                newDefer[action + "With"](this === deferred ? newDefer: this, [returned])
                                            }
                                        }: newDefer[action])
                                });
                            fns = null
                        }).promise()
                    },
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise
                    }
                },
                deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples,
                function(i, tuple) {
                    var list = tuple[2],
                        stateString = tuple[3];
                    promise[tuple[1]] = list.add;
                    if (stateString) {
                        list.add(function() {
                                state = stateString
                            },
                            tuples[i ^ 1][2].disable, tuples[2][2].lock)
                    }
                    deferred[tuple[0]] = list.fire;
                    deferred[tuple[0] + "With"] = list.fireWith
                });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred)
            }
            return deferred
        },
        when: function(subordinate) {
            var i = 0,
                resolveValues = core_slice.call(arguments),
                length = resolveValues.length,
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length: 0,
                deferred = remaining === 1 ? subordinate: jQuery.Deferred(),
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values)
                        } else {
                            if (! (--remaining)) {
                                deferred.resolveWith(contexts, values)
                            }
                        }
                    }
                },
                progressValues,
                progressContexts,
                resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
                    } else {--remaining
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues)
            }
            return deferred.promise()
        }
    });
    jQuery.support = (function() {
        var support,
            all,
            a,
            select,
            opt,
            input,
            fragment,
            eventName,
            i,
            isSupported,
            clickFn,
            div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        a.style.cssText = "top:1px;float:left;opacity:.5";
        if (!all || !all.length) {
            return {}
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        support = {
            leadingWhitespace: (div.firstChild.nodeType === 3),
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: (a.getAttribute("href") === "/a"),
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: (input.value === "on"),
            optSelected: opt.selected,
            getSetAttribute: div.className !== "t",
            enctype: !!document.createElement("form").enctype,
            html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            boxModel: (document.compatMode === "CSS1Compat"),
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            boxSizingReliable: true,
            pixelPosition: false
        };
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test
        } catch(e) {
            support.deleteExpando = false
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", clickFn = function() {
                support.noCloneEvent = false
            });
            div.cloneNode(true).fireEvent("onclick");
            div.detachEvent("onclick", clickFn)
        }
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.lastChild);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        support.appendChecked = input.checked;
        fragment.removeChild(input);
        fragment.appendChild(div);
        if (div.attachEvent) {
            for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
                eventName = "on" + i;
                isSupported = (eventName in div);
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = (typeof div[eventName] === "function")
                }
                support[i + "Bubbles"] = isSupported
            }
        }
        jQuery(function() {
            var container,
                div,
                tds,
                marginDiv,
                divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                body = document.getElementsByTagName("body")[0];
            if (!body) {
                return
            }
            container = document.createElement("div");
            container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
            body.insertBefore(container, body.firstChild);
            div = document.createElement("div");
            container.appendChild(div);
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            div.innerHTML = "";
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            support.boxSizing = (div.offsetWidth === 4);
            support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);
            if (window.getComputedStyle) {
                support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
                support.boxSizingReliable = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                marginDiv = document.createElement("div");
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                div.appendChild(marginDiv);
                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)
            }
            if (typeof div.style.zoom !== "undefined") {
                div.innerHTML = "";
                div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.style.overflow = "visible";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3);
                container.style.zoom = 1
            }
            body.removeChild(container);
            container = div = tds = marginDiv = null
        });
        fragment.removeChild(div);
        all = a = select = opt = input = fragment = div = null;
        return support
    })();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !! elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var thisCache,
                ret,
                internalKey = jQuery.expando,
                getByName = typeof name === "string",
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache: elem,
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
                return
            }
            if (!id) {
                if (isNode) {
                    elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++
                } else {
                    id = internalKey
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id] = jQuery.extend(cache[id], name)
                } else {
                    cache[id].data = jQuery.extend(cache[id].data, name)
                }
            }
            thisCache = cache[id];
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {}
                }
                thisCache = thisCache.data
            }
            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data
            }
            if (getByName) {
                ret = thisCache[name];
                if (ret == null) {
                    ret = thisCache[jQuery.camelCase(name)]
                }
            } else {
                ret = thisCache
            }
            return ret
        },
        removeData: function(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var thisCache,
                i,
                l,
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache: elem,
                id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (!cache[id]) {
                return
            }
            if (name) {
                thisCache = pvt ? cache[id] : cache[id].data;
                if (thisCache) {
                    if (!jQuery.isArray(name)) {
                        if (name in thisCache) {
                            name = [name]
                        } else {
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [name]
                            } else {
                                name = name.split(" ")
                            }
                        }
                    }
                    for (i = 0, l = name.length; i < l; i++) {
                        delete thisCache[name[i]]
                    }
                    if (! (pvt ? isEmptyDataObject: jQuery.isEmptyObject)(thisCache)) {
                        return
                    }
                }
            }
            if (!pvt) {
                delete cache[id].data;
                if (!isEmptyDataObject(cache[id])) {
                    return
                }
            }
            if (isNode) {
                jQuery.cleanData([elem], true)
            } else {
                if (jQuery.support.deleteExpando || cache != cache.window) {
                    delete cache[id]
                } else {
                    cache[id] = null
                }
            }
        },
        _data: function(elem, name, data) {
            return jQuery.data(elem, name, data, true)
        },
        acceptData: function(elem) {
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return ! noData || noData !== true && elem.getAttribute("classid") === noData
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var parts,
                part,
                attr,
                name,
                l,
                elem = this[0],
                i = 0,
                data = null;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attr = elem.attributes;
                        for (l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (!name.indexOf("data-")) {
                                name = jQuery.camelCase(name.substring(5));
                                dataAttr(elem, name, data[name])
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true)
                    }
                }
                return data
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key)
                })
            }
            parts = key.split(".", 2);
            parts[1] = parts[1] ? "." + parts[1] : "";
            part = parts[1] + "!";
            return jQuery.access(this,
                function(value) {
                    if (value === undefined) {
                        data = this.triggerHandler("getData" + part, [parts[0]]);
                        if (data === undefined && elem) {
                            data = jQuery.data(elem, key);
                            data = dataAttr(elem, key, data)
                        }
                        return data === undefined && parts[1] ? this.data(parts[0]) : data
                    }
                    parts[1] = value;
                    this.each(function() {
                        var self = jQuery(this);
                        self.triggerHandler("setData" + part, parts);
                        jQuery.data(this, key, value);
                        self.triggerHandler("changeData" + part, parts)
                    })
                },
                null, value, arguments.length > 1, null, false)
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    });
    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true: data === "false" ? false: data === "null" ? null: +data + "" === data ? +data: rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch(e) {}
                jQuery.data(elem, key, data)
            } else {
                data = undefined
            }
        }
        return data
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue
            }
            if (name !== "toJSON") {
                return false
            }
        }
        return true
    }
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data))
                    } else {
                        queue.push(data)
                    }
                }
                return queue || []
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type)
                };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress")
                }
                delete hooks.stop;
                fn.call(elem, next, hooks)
            }
            if (!startLength && hooks) {
                hooks.empty.fire()
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        jQuery.removeData(elem, type + "queue", true);
                        jQuery.removeData(elem, key, true)
                    })
                })
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type)
            }
            return data === undefined ? this: this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type)
                }
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time: time;
            type = type || "fx";
            return this.queue(type,
                function(next, hooks) {
                    var timeout = setTimeout(next, time);
                    hooks.stop = function() {
                        clearTimeout(timeout)
                    }
                })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (! (--count)) {
                        defer.resolveWith(elements, [elements])
                    }
                };
            if (typeof type !== "string") {
                obj = type;
                type = undefined
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve)
                }
            }
            resolve();
            return defer.promise(obj)
        }
    });
    var nodeHook,
        boolHook,
        fixSpecified,
        rclass = /[\t\r\n]/g,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea|)$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name]
                } catch(e) {}
            })
        },
        addClass: function(value) {
            var classNames,
                i,
                l,
                elem,
                setClass,
                c,
                cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                })
            }
            if (value && typeof value === "string") {
                classNames = value.split(core_rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value
                        } else {
                            setClass = " " + elem.className + " ";
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                if (setClass.indexOf(" " + classNames[c] + " ") < 0) {
                                    setClass += classNames[c] + " "
                                }
                            }
                            elem.className = jQuery.trim(setClass)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(value) {
            var removes,
                className,
                elem,
                c,
                cl,
                i,
                l;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                })
            }
            if ((value && typeof value === "string") || value === undefined) {
                removes = (value || "").split(core_rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        className = (" " + elem.className + " ").replace(rclass, " ");
                        for (c = 0, cl = removes.length; c < cl; c++) {
                            while (className.indexOf(" " + removes[c] + " ") >= 0) {
                                className = className.replace(" " + removes[c] + " ", " ")
                            }
                        }
                        elem.className = value ? jQuery.trim(className) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                })
            }
            return this.each(function() {
                if (type === "string") {
                    var className,
                        i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(core_rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state: !self.hasClass(className);
                        self[state ? "addClass": "removeClass"](className)
                    }
                } else {
                    if (type === "undefined" || type === "boolean") {
                        if (this.className) {
                            jQuery._data(this, "__className__", this.className)
                        }
                        this.className = this.className || value === false ? "": jQuery._data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true
                }
            }
            return false
        },
        val: function(value) {
            var hooks,
                ret,
                isFunction,
                elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "": ret
                }
                return
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val,
                    self = jQuery(this);
                if (this.nodeType !== 1) {
                    return
                }
                if (isFunction) {
                    val = value.call(this, i, self.val())
                } else {
                    val = value
                }
                if (val == null) {
                    val = ""
                } else {
                    if (typeof val === "number") {
                        val += ""
                    } else {
                        if (jQuery.isArray(val)) {
                            val = jQuery.map(val,
                                function(value) {
                                    return value == null ? "": value + ""
                                })
                        }
                    }
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val
                }
            })
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return ! val || val.specified ? elem.value: elem.text
                }
            },
            select: {
                get: function(elem) {
                    var value,
                        i,
                        max,
                        option,
                        index = elem.selectedIndex,
                        values = [],
                        options = elem.options,
                        one = elem.type === "select-one";
                    if (index < 0) {
                        return null
                    }
                    i = one ? index: 0;
                    max = one ? index + 1: options.length;
                    for (; i < max; i++) {
                        option = options[i];
                        if (option.selected && (jQuery.support.optDisabled ? !option.disabled: option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value
                            }
                            values.push(value)
                        }
                    }
                    if (one && !values.length && options.length) {
                        return jQuery(options[index]).val()
                    }
                    return values
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1
                    }
                    return values
                }
            }
        },
        attrFn: {},
        attr: function(elem, name, value, pass) {
            var ret,
                hooks,
                notxml,
                nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            if (pass && jQuery.isFunction(jQuery.fn[name])) {
                return jQuery(elem)[name](value)
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value)
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook: nodeHook)
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return
                } else {
                    if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret
                    } else {
                        elem.setAttribute(name, value + "");
                        return value
                    }
                }
            } else {
                if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    ret = elem.getAttribute(name);
                    return ret === null ? undefined: ret
                }
            }
        },
        removeAttr: function(elem, value) {
            var propName,
                attrNames,
                name,
                isBool,
                i = 0;
            if (value && elem.nodeType === 1) {
                attrNames = value.split(core_rspace);
                for (; i < attrNames.length; i++) {
                    name = attrNames[i];
                    if (name) {
                        propName = jQuery.propFix[name] || name;
                        isBool = rboolean.test(name);
                        if (!isBool) {
                            jQuery.attr(elem, name, "")
                        }
                        elem.removeAttribute(getSetAttribute ? name: propName);
                        if (isBool && propName in elem) {
                            elem[propName] = false
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed")
                    } else {
                        if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val
                            }
                            return value
                        }
                    }
                }
            },
            value: {
                get: function(elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name)
                    }
                    return name in elem ? elem.value: null
                },
                set: function(elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name)
                    }
                    elem.value = value
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(elem, name, value) {
            var ret,
                hooks,
                notxml,
                nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name]
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                } else {
                    return (elem[name] = value)
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    return elem[name]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0: undefined
                }
            }
        }
    });
    boolHook = {
        get: function(elem, name) {
            var attrNode,
                property = jQuery.prop(elem, name);
            return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined
        },
        set: function(elem, value, name) {
            var propName;
            if (value === false) {
                jQuery.removeAttr(elem, name)
            } else {
                propName = jQuery.propFix[name] || name;
                if (propName in elem) {
                    elem[propName] = true
                }
                elem.setAttribute(name, name.toLowerCase())
            }
            return name
        }
    };
    if (!getSetAttribute) {
        fixSpecified = {
            name: true,
            id: true,
            coords: true
        };
        nodeHook = jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && (fixSpecified[name] ? ret.value !== "": ret.specified) ? ret.value: undefined
            },
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret)
                }
                return (ret.value = value + "")
            }
        };
        jQuery.each(["width", "height"],
            function(i, name) {
                jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                    set: function(elem, value) {
                        if (value === "") {
                            elem.setAttribute(name, "auto");
                            return value
                        }
                    }
                })
            });
        jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(elem, value, name) {
                if (value === "") {
                    value = "false"
                }
                nodeHook.set(elem, value, name)
            }
        }
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"],
            function(i, name) {
                jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                    get: function(elem) {
                        var ret = elem.getAttribute(name, 2);
                        return ret === null ? undefined: ret
                    }
                })
            })
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText.toLowerCase() || undefined
            },
            set: function(elem, value) {
                return (elem.style.cssText = value + "")
            }
        }
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding"
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"],
            function() {
                jQuery.valHooks[this] = {
                    get: function(elem) {
                        return elem.getAttribute("value") === null ? "on": elem.value
                    }
                }
            })
    }
    jQuery.each(["radio", "checkbox"],
        function() {
            jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
                set: function(elem, value) {
                    if (jQuery.isArray(value)) {
                        return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
                    }
                }
            })
        });
    var rformElems = /^(?:textarea|input|select)$/i,
        rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
        rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        hoverHack = function(events) {
            return jQuery.event.special.hover ? events: events.replace(rhoverHack, "mouseenter$1 mouseleave$1")
        };
    jQuery.event = {
        add: function(elem, types, handler, data, selector) {
            var elemData,
                eventHandle,
                events,
                t,
                tns,
                type,
                namespaces,
                handleObj,
                handleObjIn,
                handlers,
                special;
            if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
                return
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++
            }
            events = elemData.events;
            if (!events) {
                elemData.events = events = {}
            }
            eventHandle = elemData.handle;
            if (!eventHandle) {
                elemData.handle = eventHandle = function(e) {
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
                };
                eventHandle.elem = elem
            }
            types = jQuery.trim(hoverHack(types)).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = tns[1];
                namespaces = (tns[2] || "").split(".").sort();
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType: special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                        type: type,
                        origType: tns[1],
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    },
                    handleObjIn);
                handlers = events[type];
                if (!handlers) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false)
                        } else {
                            if (elem.attachEvent) {
                                elem.attachEvent("on" + type, eventHandle)
                            }
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj)
                } else {
                    handlers.push(handleObj)
                }
                jQuery.event.global[type] = true
            }
            elem = null
        },
        global: {},
        remove: function(elem, types, handler, selector, mappedTypes) {
            var t,
                tns,
                type,
                origType,
                namespaces,
                origCount,
                j,
                events,
                special,
                eventType,
                handleObj,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return
            }
            types = jQuery.trim(hoverHack(types || "")).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = origType = tns[1];
                namespaces = tns[2];
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true)
                    }
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType: special.bindType) || type;
                eventType = events[type] || [];
                origCount = eventType.length;
                namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (j = 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        eventType.splice(j--, 1);
                        if (handleObj.selector) {
                            eventType.delegateCount--
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj)
                        }
                    }
                }
                if (eventType.length === 0 && origCount !== eventType.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle)
                    }
                    delete events[type]
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery.removeData(elem, "events", true)
            }
        },
        customEvent: {
            "getData": true,
            "setData": true,
            "changeData": true
        },
        trigger: function(event, data, elem, onlyHandlers) {
            if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
                return
            }
            var cache,
                exclusive,
                i,
                cur,
                old,
                ontype,
                special,
                handle,
                eventPath,
                bubbleType,
                type = event.type || event,
                namespaces = [];
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return
            }
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                exclusive = true
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort()
            }
            if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                return
            }
            event = typeof event === "object" ? event[jQuery.expando] ? event: new jQuery.Event(type, event) : new jQuery.Event(type);
            event.type = type;
            event.isTrigger = true;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            ontype = type.indexOf(":") < 0 ? "on" + type: "";
            if (!elem) {
                cache = jQuery.cache;
                for (i in cache) {
                    if (cache[i].events && cache[i].events[type]) {
                        jQuery.event.trigger(event, data, cache[i].handle.elem, true)
                    }
                }
                return
            }
            event.result = undefined;
            if (!event.target) {
                event.target = elem
            }
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);
            special = jQuery.event.special[type] || {};
            if (special.trigger && special.trigger.apply(elem, data) === false) {
                return
            }
            eventPath = [[elem, special.bindType || type]];
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                cur = rfocusMorph.test(bubbleType + type) ? elem: elem.parentNode;
                for (old = elem; cur; cur = cur.parentNode) {
                    eventPath.push([cur, bubbleType]);
                    old = cur
                }
                if (old === (elem.ownerDocument || document)) {
                    eventPath.push([old.defaultView || old.parentWindow || window, bubbleType])
                }
            }
            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
                cur = eventPath[i][0];
                event.type = eventPath[i][1];
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data)
                }
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
                    event.preventDefault()
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
                        old = elem[ontype];
                        if (old) {
                            elem[ontype] = null
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (old) {
                            elem[ontype] = old
                        }
                    }
                }
            }
            return event.result
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event || window.event);
            var i,
                j,
                cur,
                ret,
                selMatch,
                matched,
                matches,
                handleObj,
                sel,
                related,
                handlers = ((jQuery._data(this, "events") || {})[event.type] || []),
                delegateCount = handlers.delegateCount,
                args = core_slice.call(arguments),
                run_all = !event.exclusive && !event.namespace,
                special = jQuery.event.special[event.type] || {},
                handlerQueue = [];
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return
            }
            if (delegateCount && !(event.button && event.type === "click")) {
                for (cur = event.target; cur != this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true || event.type !== "click") {
                        selMatch = {};
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector;
                            if (selMatch[sel] === undefined) {
                                selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0: jQuery.find(sel, this, null, [cur]).length
                            }
                            if (selMatch[sel]) {
                                matches.push(handleObj)
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                matches: matches
                            })
                        }
                    }
                }
            }
            if (handlers.length > delegateCount) {
                handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                })
            }
            for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
                matched = handlerQueue[i];
                event.currentTarget = matched.elem;
                for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
                    handleObj = matched.matches[j];
                    if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event)
            }
            return event.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode: original.keyCode
                }
                return event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc,
                    doc,
                    body,
                    button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement: fromElement
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1: (button & 2 ? 3: (button & 4 ? 2: 0)))
                }
                return event
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event
            }
            var i,
                prop,
                originalEvent = event,
                fixHook = jQuery.event.fixHooks[event.type] || {},
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = jQuery.Event(originalEvent);
            for (i = copy.length; i;) {
                prop = copy[--i];
                event[prop] = originalEvent[prop]
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle
                    }
                },
                teardown: function(namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem)
            } else {
                jQuery.event.dispatch.call(elem, e)
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault()
            }
        }
    };
    jQuery.event.handle = jQuery.event.dispatch;
    jQuery.removeEvent = document.removeEventListener ?
        function(elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, false)
            }
        }: function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === "undefined") {
                elem[name] = null
            }
            elem.detachEvent(name, handle)
        }
    };
    jQuery.Event = function(src, props) {
        if (! (this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props)
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue: returnFalse
        } else {
            this.type = src
        }
        if (props) {
            jQuery.extend(this, props)
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true
    };
    function returnFalse() {
        return false
    }
    function returnTrue() {
        return true
    }
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.stopPropagation) {
                e.stopPropagation()
            }
            e.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation()
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        function(orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                    var ret,
                        target = this,
                        related = event.relatedTarget,
                        handleObj = event.handleObj,
                        selector = handleObj.selector;
                    if (!related || (related !== target && !jQuery.contains(target, related))) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix
                    }
                    return ret
                }
            }
        });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.add(this, "click._submit keypress._submit",
                    function(e) {
                        var elem = e.target,
                            form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form: undefined;
                        if (form && !jQuery._data(form, "_submit_attached")) {
                            jQuery.event.add(form, "submit._submit",
                                function(event) {
                                    event._submit_bubble = true
                                });
                            jQuery._data(form, "_submit_attached", true)
                        }
                    })
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true)
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.remove(this, "._submit")
            }
        }
    }
    if (!jQuery.support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change",
                            function(event) {
                                if (event.originalEvent.propertyName === "checked") {
                                    this._just_changed = true
                                }
                            });
                        jQuery.event.add(this, "click._change",
                            function(event) {
                                if (this._just_changed && !event.isTrigger) {
                                    this._just_changed = false
                                }
                                jQuery.event.simulate("change", this, event, true)
                            })
                    }
                    return false
                }
                jQuery.event.add(this, "beforeactivate._change",
                    function(e) {
                        var elem = e.target;
                        if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached")) {
                            jQuery.event.add(elem, "change._change",
                                function(event) {
                                    if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                        jQuery.event.simulate("change", this.parentNode, event, true)
                                    }
                                });
                            jQuery._data(elem, "_change_attached", true)
                        }
                    })
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return ! rformElems.test(this.nodeName)
            }
        }
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
                focus: "focusin",
                blur: "focusout"
            },
            function(orig, fix) {
                var attaches = 0,
                    handler = function(event) {
                        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
                    };
                jQuery.event.special[fix] = {
                    setup: function() {
                        if (attaches++===0) {
                            document.addEventListener(orig, handler, true)
                        }
                    },
                    teardown: function() {
                        if (--attaches === 0) {
                            document.removeEventListener(orig, handler, true)
                        }
                    }
                }
            })
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn,
                type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one)
                }
                return this
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined
            } else {
                if (fn == null) {
                    if (typeof selector === "string") {
                        fn = data;
                        data = undefined
                    } else {
                        fn = data;
                        data = selector;
                        selector = undefined
                    }
                }
            }
            if (fn === false) {
                fn = returnFalse
            } else {
                if (!fn) {
                    return this
                }
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments)
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj,
                type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace: handleObj.origType, handleObj.selector, handleObj.handler);
                return this
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type])
                }
                return this
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined
            }
            if (fn === false) {
                fn = returnFalse
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        live: function(types, data, fn) {
            jQuery(this.context).on(types, this.selector, data, fn);
            return this
        },
        die: function(types, fn) {
            jQuery(this.context).off(types, this.selector || "**", fn);
            return this
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true)
            }
        },
        toggle: function(fn) {
            var args = arguments,
                guid = fn.guid || jQuery.guid++,
                i = 0,
                toggler = function(event) {
                    var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                    jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                    event.preventDefault();
                    return args[lastToggle].apply(this, arguments) || false
                };
            toggler.guid = guid;
            while (i < args.length) {
                args[i++].guid = guid
            }
            return this.click(toggler)
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "),
        function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                if (fn == null) {
                    fn = data;
                    data = null
                }
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
            };
            if (rkeyEvent.test(name)) {
                jQuery.event.fixHooks[name] = jQuery.event.keyHooks
            }
            if (rmouseEvent.test(name)) {
                jQuery.event.fixHooks[name] = jQuery.event.mouseHooks
            }
        });
    /*
     * Sizzle CSS Selector Engine
     * Copyright 2012 jQuery Foundation and other contributors
     * Released under the MIT license
     * http://sizzlejs.com/
     */
    (function(window, undefined) {
        var cachedruns,
            assertGetIdNotName,
            Expr,
            getText,
            isXML,
            contains,
            compile,
            sortOrder,
            hasDuplicate,
            outermostContext,
            baseHasDuplicate = true,
            strundefined = "undefined",
            expando = ("sizcache" + Math.random()).replace(".", ""),
            Token = String,
            document = window.document,
            docElem = document.documentElement,
            dirruns = 0,
            done = 0,
            pop = [].pop,
            push = [].push,
            slice = [].slice,
            indexOf = [].indexOf ||
                function(elem) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                        if (this[i] === elem) {
                            return i
                        }
                    }
                    return - 1
                },
            markFunction = function(fn, value) {
                fn[expando] = value == null || value;
                return fn
            },
            createCache = function() {
                var cache = {},
                    keys = [];
                return markFunction(function(key, value) {
                        if (keys.push(key) > Expr.cacheLength) {
                            delete cache[keys.shift()]
                        }
                        return (cache[key] = value)
                    },
                    cache)
            },
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"),
            operators = "([*^$|!~]?=)",
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",
            pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
            rpseudo = new RegExp(pseudos),
            rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            rnot = /^:not/,
            rsibling = /[\x20\t\r\n\f]*[+~]/,
            rendsWithNot = /:not\($/,
            rheader = /h\d/i,
            rinputs = /input|select|textarea|button/i,
            rbackslash = /\\(?!\\)/g,
            matchExpr = {
                "ID": new RegExp("^#(" + characterEncoding + ")"),
                "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
                "NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
                "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                "ATTR": new RegExp("^" + attributes),
                "PSEUDO": new RegExp("^" + pseudos),
                "POS": new RegExp(pos, "i"),
                "CHILD": new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                "needsContext": new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
            },
            assert = function(fn) {
                var div = document.createElement("div");
                try {
                    return fn(div)
                } catch(e) {
                    return false
                } finally {
                    div = null
                }
            },
            assertTagNameNoComments = assert(function(div) {
                div.appendChild(document.createComment(""));
                return ! div.getElementsByTagName("*").length
            }),
            assertHrefNotNormalized = assert(function(div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#"
            }),
            assertAttributes = assert(function(div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                return type !== "boolean" && type !== "string"
            }),
            assertUsableClassName = assert(function(div) {
                div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
                    return false
                }
                div.lastChild.className = "e";
                return div.getElementsByClassName("e").length === 2
            }),
            assertUsableName = assert(function(div) {
                div.id = expando + 0;
                div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
                docElem.insertBefore(div, docElem.firstChild);
                var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
                assertGetIdNotName = !document.getElementById(expando);
                docElem.removeChild(div);
                return pass
            });
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType
        } catch(e) {
            slice = function(i) {
                var elem,
                    results = [];
                for (; (elem = this[i]); i++) {
                    results.push(elem)
                }
                return results
            }
        }
        function Sizzle(selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var match,
                elem,
                xml,
                m,
                nodeType = context.nodeType;
            if (!selector || typeof selector !== "string") {
                return results
            }
            if (nodeType !== 1 && nodeType !== 9) {
                return []
            }
            xml = isXML(context);
            if (!xml && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results
                                }
                            } else {
                                return results
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results
                            }
                        }
                    } else {
                        if (match[2]) {
                            push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                            return results
                        } else {
                            if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
                                push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                                return results
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml)
        }
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        };
        Sizzle.matchesSelector = function(elem, expr) {
            return Sizzle(expr, null, null, [elem]).length > 0
        };
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j,
                        matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j])
                        }
                    }
                })
            })
        }
        getText = Sizzle.getText = function(elem) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem)
                        }
                    }
                } else {
                    if (nodeType === 3 || nodeType === 4) {
                        return elem.nodeValue
                    }
                }
            } else {
                for (; (node = elem[i]); i++) {
                    ret += getText(node)
                }
            }
            return ret
        };
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML": false
        };
        contains = Sizzle.contains = docElem.contains ?
            function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement: a,
                    bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup))
            }: docElem.compareDocumentPosition ?
            function(a, b) {
                return b && !!(a.compareDocumentPosition(b) & 16)
            }: function(a, b) {
            while ((b = b.parentNode)) {
                if (b === a) {
                    return true
                }
            }
            return false
        };
        Sizzle.attr = function(elem, name) {
            var val,
                xml = isXML(elem);
            if (!xml) {
                name = name.toLowerCase()
            }
            if ((val = Expr.attrHandle[name])) {
                return val(elem)
            }
            if (xml || assertAttributes) {
                return elem.getAttribute(name)
            }
            val = elem.getAttributeNode(name);
            return val ? typeof elem[name] === "boolean" ? elem[name] ? name: null: val.specified ? val.value: null: null
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: assertHrefNotNormalized ? {}: {
                "href": function(elem) {
                    return elem.getAttribute("href", 2)
                },
                "type": function(elem) {
                    return elem.getAttribute("type")
                }
            },
            find: {
                "ID": assertGetIdNotName ?
                    function(id, context, xml) {
                        if (typeof context.getElementById !== strundefined && !xml) {
                            var m = context.getElementById(id);
                            return m && m.parentNode ? [m] : []
                        }
                    }: function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined: []
                    }
                },
                "TAG": assertTagNameNoComments ?
                    function(tag, context) {
                        if (typeof context.getElementsByTagName !== strundefined) {
                            return context.getElementsByTagName(tag)
                        }
                    }: function(tag, context) {
                    var results = context.getElementsByTagName(tag);
                    if (tag === "*") {
                        var elem,
                            tmp = [],
                            i = 0;
                        for (; (elem = results[i]); i++) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem)
                            }
                        }
                        return tmp
                    }
                    return results
                },
                "NAME": assertUsableName &&
                function(tag, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        return context.getElementsByName(name)
                    }
                },
                "CLASS": assertUsableClassName &&
                function(className, context, xml) {
                    if (typeof context.getElementsByClassName !== strundefined && !xml) {
                        return context.getElementsByClassName(className)
                    }
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function(match) {
                    match[1] = match[1].replace(rbackslash, "");
                    match[3] = (match[4] || match[5] || "").replace(rbackslash, "");
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " "
                    }
                    return match.slice(0, 4)
                },
                "CHILD": function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0])
                        }
                        match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
                        match[4] = +((match[6] + match[7]) || match[2] === "odd")
                    } else {
                        if (match[2]) {
                            Sizzle.error(match[0])
                        }
                    }
                    return match
                },
                "PSEUDO": function(match) {
                    var unquoted,
                        excess;
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null
                    }
                    if (match[3]) {
                        match[2] = match[3]
                    } else {
                        if ((unquoted = match[4])) {
                            if (rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                                unquoted = unquoted.slice(0, excess);
                                match[0] = match[0].slice(0, excess)
                            }
                            match[2] = unquoted
                        }
                    }
                    return match.slice(0, 3)
                }
            },
            filter: {
                "ID": assertGetIdNotName ?
                    function(id) {
                        id = id.replace(rbackslash, "");
                        return function(elem) {
                            return elem.getAttribute("id") === id
                        }
                    }: function(id) {
                    id = id.replace(rbackslash, "");
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === id
                    }
                },
                "TAG": function(nodeName) {
                    if (nodeName === "*") {
                        return function() {
                            return true
                        }
                    }
                    nodeName = nodeName.replace(rbackslash, "").toLowerCase();
                    return function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                "CLASS": function(className) {
                    var pattern = classCache[expando][className];
                    if (!pattern) {
                        pattern = classCache(className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"))
                    }
                    return function(elem) {
                        return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "")
                    }
                },
                "ATTR": function(name, operator, check) {
                    return function(elem, context) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!="
                        }
                        if (!operator) {
                            return true
                        }
                        result += "";
                        return operator === "=" ? result === check: operator === "!=" ? result !== check: operator === "^=" ? check && result.indexOf(check) === 0: operator === "*=" ? check && result.indexOf(check) > -1: operator === "$=" ? check && result.substr(result.length - check.length) === check: operator === "~=" ? (" " + result + " ").indexOf(check) > -1: operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-": false
                    }
                },
                "CHILD": function(type, argument, first, last) {
                    if (type === "nth") {
                        return function(elem) {
                            var node,
                                diff,
                                parent = elem.parentNode;
                            if (first === 1 && last === 0) {
                                return true
                            }
                            if (parent) {
                                diff = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        diff++;
                                        if (elem === node) {
                                            break
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0)
                        }
                    }
                    return function(elem) {
                        var node = elem;
                        switch (type) {
                            case "only":
                            case "first":
                                while ((node = node.previousSibling)) {
                                    if (node.nodeType === 1) {
                                        return false
                                    }
                                }
                                if (type === "first") {
                                    return true
                                }
                                node = elem;
                            case "last":
                                while ((node = node.nextSibling)) {
                                    if (node.nodeType === 1) {
                                        return false
                                    }
                                }
                                return true
                        }
                    }
                },
                "PSEUDO": function(pseudo, argument) {
                    var args,
                        fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument)
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx,
                                matched = fn(seed, argument),
                                i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i])
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args)
                        }
                    }
                    return fn
                }
            },
            pseudos: {
                "not": markFunction(function(selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem,
                            unmatched = matcher(seed, null, xml, []),
                            i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem)
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return ! results.pop()
                    }
                }),
                "has": markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                "contains": markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                "enabled": function(elem) {
                    return elem.disabled === false
                },
                "disabled": function(elem) {
                    return elem.disabled === true
                },
                "checked": function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected)
                },
                "selected": function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex
                    }
                    return elem.selected === true
                },
                "parent": function(elem) {
                    return ! Expr.pseudos["empty"](elem)
                },
                "empty": function(elem) {
                    var nodeType;
                    elem = elem.firstChild;
                    while (elem) {
                        if (elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
                            return false
                        }
                        elem = elem.nextSibling
                    }
                    return true
                },
                "header": function(elem) {
                    return rheader.test(elem.nodeName)
                },
                "text": function(elem) {
                    var type,
                        attr;
                    return elem.nodeName.toLowerCase() === "input" && (type = elem.type) === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type)
                },
                "radio": createInputPseudo("radio"),
                "checkbox": createInputPseudo("checkbox"),
                "file": createInputPseudo("file"),
                "password": createInputPseudo("password"),
                "image": createInputPseudo("image"),
                "submit": createButtonPseudo("submit"),
                "reset": createButtonPseudo("reset"),
                "button": function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button"
                },
                "input": function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                "focus": function(elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href)
                },
                "active": function(elem) {
                    return elem === elem.ownerDocument.activeElement
                },
                "first": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [0]
                }),
                "last": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [length - 1]
                }),
                "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length: argument]
                }),
                "even": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "odd": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 1; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length: argument; --i >= 0;) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length: argument; ++i < length;) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                })
            }
        };
        function siblingCheck(a, b, ret) {
            if (a === b) {
                return ret
            }
            var cur = a.nextSibling;
            while (cur) {
                if (cur === b) {
                    return - 1
                }
                cur = cur.nextSibling
            }
            return 1
        }
        sortOrder = docElem.compareDocumentPosition ?
            function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0
                }
                return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition: a.compareDocumentPosition(b) & 4) ? -1: 1
            }: function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0
            } else {
                if (a.sourceIndex && b.sourceIndex) {
                    return a.sourceIndex - b.sourceIndex
                }
            }
            var al,
                bl,
                ap = [],
                bp = [],
                aup = a.parentNode,
                bup = b.parentNode,
                cur = aup;
            if (aup === bup) {
                return siblingCheck(a, b)
            } else {
                if (!aup) {
                    return - 1
                } else {
                    if (!bup) {
                        return 1
                    }
                }
            }
            while (cur) {
                ap.unshift(cur);
                cur = cur.parentNode
            }
            cur = bup;
            while (cur) {
                bp.unshift(cur);
                cur = cur.parentNode
            }
            al = ap.length;
            bl = bp.length;
            for (var i = 0; i < al && i < bl; i++) {
                if (ap[i] !== bp[i]) {
                    return siblingCheck(ap[i], bp[i])
                }
            }
            return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
        }; [0, 0].sort(sortOrder);
        baseHasDuplicate = !hasDuplicate;
        Sizzle.uniqueSort = function(results) {
            var elem,
                i = 1;
            hasDuplicate = baseHasDuplicate;
            results.sort(sortOrder);
            if (hasDuplicate) {
                for (; (elem = results[i]); i++) {
                    if (elem === results[i - 1]) {
                        results.splice(i--, 1)
                    }
                }
            }
            return results
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        };
        function tokenize(selector, parseOnly) {
            var matched,
                match,
                tokens,
                type,
                soFar,
                groups,
                preFilters,
                cached = tokenCache[expando][selector];
            if (cached) {
                return parseOnly ? 0: cached.slice(0)
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length)
                    }
                    groups.push(tokens = [])
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    tokens.push(matched = new Token(match.shift()));
                    soFar = soFar.slice(matched.length);
                    matched.type = match[0].replace(rtrim, " ")
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match, document, true)))) {
                        tokens.push(matched = new Token(match.shift()));
                        soFar = soFar.slice(matched.length);
                        matched.type = type;
                        matched.matches = match
                    }
                }
                if (!matched) {
                    break
                }
            }
            return parseOnly ? soFar.length: soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && combinator.dir === "parentNode",
                doneName = done++;
            return combinator.first ?
                function(elem, context, xml) {
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            return matcher(elem, context, xml)
                        }
                    }
                }: function(elem, context, xml) {
                if (!xml) {
                    var cache,
                        dirkey = dirruns + " " + doneName + " ",
                        cachedkey = dirkey + cachedruns;
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if ((cache = elem[expando]) === cachedkey) {
                                return elem.sizset
                            } else {
                                if (typeof cache === "string" && cache.indexOf(dirkey) === 0) {
                                    if (elem.sizset) {
                                        return elem
                                    }
                                } else {
                                    elem[expando] = cachedkey;
                                    if (matcher(elem, context, xml)) {
                                        elem.sizset = true;
                                        return elem
                                    }
                                    elem.sizset = false
                                }
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if (matcher(elem, context, xml)) {
                                return elem
                            }
                        }
                    }
                }
            }
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ?
                function(elem, context, xml) {
                    var i = matchers.length;
                    while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                            return false
                        }
                    }
                    return true
                }: matchers[0]
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem,
                newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i)
                        }
                    }
                }
            }
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter)
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector)
            }
            return markFunction(function(seed, results, context, xml) {
                if (seed && postFinder) {
                    return
                }
                var i,
                    elem,
                    postFilterIn,
                    preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, [], seed),
                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                    matcherOut = matcher ? postFinder || (seed ? preFilter: preexisting || postFilter) ? [] : results: matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml)
                }
                if (postFilter) {
                    postFilterIn = condense(matcherOut, postMap);
                    postFilter(postFilterIn, [], context, xml);
                    i = postFilterIn.length;
                    while (i--) {
                        if ((elem = postFilterIn[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
                        }
                    }
                }
                if (seed) {
                    i = preFilter && matcherOut.length;
                    while (i--) {
                        if ((elem = matcherOut[i])) {
                            seed[preMap[i]] = !(results[preMap[i]] = elem)
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml)
                    } else {
                        push.apply(results, matcherOut)
                    }
                }
            })
        }
        function matcherFromTokens(tokens) {
            var checkContext,
                matcher,
                j,
                len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1: 0,
                matchContext = addCombinator(function(elem) {
                        return elem === checkContext
                    },
                    implicitRelative, true),
                matchAnyContext = addCombinator(function(elem) {
                        return indexOf.call(checkContext, elem) > -1
                    },
                    implicitRelative, true),
                matchers = [function(elem, context, xml) {
                    return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                }];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)]
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && tokens.join(""))
                    }
                    matchers.push(matcher)
                }
            }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function(seed, context, xml, results, expandContext) {
                    var elem,
                        j,
                        matcher,
                        setMatched = [],
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        outermost = expandContext != null,
                        contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
                        dirrunsUnique = (dirruns += contextBackup == null ? 1: Math.E);
                    if (outermost) {
                        outermostContext = context !== document && context;
                        cachedruns = superMatcher.el
                    }
                    for (; (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            for (j = 0; (matcher = elementMatchers[j]); j++) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++superMatcher.el
                            }
                        }
                        if (bySet) {
                            if ((elem = !matcher && elem)) {
                                matchedCount--
                            }
                            if (seed) {
                                unmatched.push(elem)
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        for (j = 0; (matcher = setMatchers[j]); j++) {
                            matcher(unmatched, setMatched, context, xml)
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (! (unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results)
                                    }
                                }
                            }
                            setMatched = condense(setMatched)
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                            Sizzle.uniqueSort(results)
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup
                    }
                    return unmatched
                };
            superMatcher.el = 0;
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        compile = Sizzle.compile = function(selector, group) {
            var i,
                setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[expando][selector];
            if (!cached) {
                if (!group) {
                    group = tokenize(selector)
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached)
                    } else {
                        elementMatchers.push(cached)
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
            }
            return cached
        };
        function multipleContexts(selector, contexts, results, seed) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results, seed)
            }
            return results
        }
        function select(selector, context, results, seed, xml) {
            var i,
                tokens,
                token,
                type,
                find,
                match = tokenize(selector),
                j = match.length;
            if (!seed) {
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]) {
                        context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
                        if (!context) {
                            return results
                        }
                        selector = selector.slice(tokens.shift().length)
                    }
                    for (i = matchExpr["POS"].test(selector) ? -1: tokens.length - 1; i >= 0; i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break
                        }
                        if ((find = Expr.find[type])) {
                            if ((seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                                tokens.splice(i, 1);
                                selector = seed.length && tokens.join("");
                                if (!selector) {
                                    push.apply(results, slice.call(seed, 0));
                                    return results
                                }
                                break
                            }
                        }
                    }
                }
            }
            compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
            return results
        }
        if (document.querySelectorAll) { (function() {
            var disconnectedMatch,
                oldSelect = select,
                rescape = /'|\\/g,
                rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                rbuggyQSA = [":focus"],
                rbuggyMatches = [":active", ":focus"],
                matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
            assert(function(div) {
                div.innerHTML = "<select><option selected=''></option></select>";
                if (!div.querySelectorAll("[selected]").length) {
                    rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
                }
                if (!div.querySelectorAll(":checked").length) {
                    rbuggyQSA.push(":checked")
                }
            });
            assert(function(div) {
                div.innerHTML = "<p test=''></p>";
                if (div.querySelectorAll("[test^='']").length) {
                    rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')")
                }
                div.innerHTML = "<input type='hidden'/>";
                if (!div.querySelectorAll(":enabled").length) {
                    rbuggyQSA.push(":enabled", ":disabled")
                }
            });
            rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
            select = function(selector, context, results, seed, xml) {
                if (!seed && !xml && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    var groups,
                        i,
                        old = true,
                        nid = expando,
                        newContext = context,
                        newSelector = context.nodeType === 9 && selector;
                    if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if ((old = context.getAttribute("id"))) {
                            nid = old.replace(rescape, "\\$&")
                        } else {
                            context.setAttribute("id", nid)
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + groups[i].join("")
                        }
                        newContext = rsibling.test(selector) && context.parentNode || context;
                        newSelector = groups.join(",")
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                            return results
                        } catch(qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id")
                            }
                        }
                    }
                }
                return oldSelect(selector, context, results, seed, xml)
            };
            if (matches) {
                assert(function(div) {
                    disconnectedMatch = matches.call(div, "div");
                    try {
                        matches.call(div, "[test!='']:sizzle");
                        rbuggyMatches.push("!=", pseudos)
                    } catch(e) {}
                });
                rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
                Sizzle.matchesSelector = function(elem, expr) {
                    expr = expr.replace(rattributeQuotes, "='$1']");
                    if (!isXML(elem) && !rbuggyMatches.test(expr) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                        try {
                            var ret = matches.call(elem, expr);
                            if (ret || disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                                return ret
                            }
                        } catch(e) {}
                    }
                    return Sizzle(expr, null, null, [elem]).length > 0
                }
            }
        })()
        }
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        function setFilters() {}
        Expr.filters = setFilters.prototype = Expr.pseudos;
        Expr.setFilters = new setFilters();
        Sizzle.attr = jQuery.attr;
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains
    })(window);
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = jQuery.expr.match.needsContext,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function(selector) {
            var i,
                l,
                length,
                n,
                r,
                ret,
                self = this;
            if (typeof selector !== "string") {
                return jQuery(selector).filter(function() {
                    for (i = 0, l = self.length; i < l; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true
                        }
                    }
                })
            }
            ret = this.pushStack("", "find", selector);
            for (i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return ret
        },
        has: function(target) {
            var i,
                targets = jQuery(target, this),
                len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true
                    }
                }
            })
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector)
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector)
        },
        is: function(selector) {
            return !! selector && (typeof selector === "string" ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0: jQuery.filter(selector, this).length > 0: this.filter(selector).length > 0)
        },
        closest: function(selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                ret = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                cur = this[i];
                while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
                    if (pos ? pos.index(cur) > -1: jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break
                    }
                    cur = cur.parentNode
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors)
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length: -1
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem))
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this)
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all: jQuery.unique(all))
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject: this.prevObject.filter(selector))
        }
    });
    jQuery.fn.andSelf = jQuery.fn.addBack;
    function isDisconnected(node) {
        return ! node || !node.parentNode || node.parentNode.nodeType === 11
    }
    function sibling(cur, dir) {
        do {
            cur = cur[dir]
        }
        while (cur && cur.nodeType !== 1);
        return cur
    }
    jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent: null
            },
            parents: function(elem) {
                return jQuery.dir(elem, "parentNode")
            },
            parentsUntil: function(elem, i, until) {
                return jQuery.dir(elem, "parentNode", until)
            },
            next: function(elem) {
                return sibling(elem, "nextSibling")
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling")
            },
            nextAll: function(elem) {
                return jQuery.dir(elem, "nextSibling")
            },
            prevAll: function(elem) {
                return jQuery.dir(elem, "previousSibling")
            },
            nextUntil: function(elem, i, until) {
                return jQuery.dir(elem, "nextSibling", until)
            },
            prevUntil: function(elem, i, until) {
                return jQuery.dir(elem, "previousSibling", until)
            },
            siblings: function(elem) {
                return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
            },
            children: function(elem) {
                return jQuery.sibling(elem.firstChild)
            },
            contents: function(elem) {
                return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document: jQuery.merge([], elem.childNodes)
            }
        },
        function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var ret = jQuery.map(this, fn, until);
                if (!runtil.test(name)) {
                    selector = until
                }
                if (selector && typeof selector === "string") {
                    ret = jQuery.filter(selector, ret)
                }
                ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
                if (this.length > 1 && rparentsprev.test(name)) {
                    ret = ret.reverse()
                }
                return this.pushStack(ret, name, core_slice.call(arguments).join(","))
            }
        });
    jQuery.extend({
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")"
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
        },
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur)
                }
                cur = cur[dir]
            }
            return matched
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n)
                }
            }
            return r
        }
    });
    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements,
                function(elem, i) {
                    var retVal = !!qualifier.call(elem, i, elem);
                    return retVal === keep
                })
        } else {
            if (qualifier.nodeType) {
                return jQuery.grep(elements,
                    function(elem, i) {
                        return (elem === qualifier) === keep
                    })
            } else {
                if (typeof qualifier === "string") {
                    var filtered = jQuery.grep(elements,
                        function(elem) {
                            return elem.nodeType === 1
                        });
                    if (isSimple.test(qualifier)) {
                        return jQuery.filter(qualifier, filtered, !keep)
                    } else {
                        qualifier = jQuery.filter(qualifier, filtered)
                    }
                }
            }
        }
        return jQuery.grep(elements,
            function(elem, i) {
                return (jQuery.inArray(elem, qualifier) >= 0) === keep
            })
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop())
            }
        }
        return safeFrag
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rcheckableType = /^(?:checkbox|radio)$/,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "X<div>", "</div>"]
    }
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this,
                function(value) {
                    return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
                },
                null, value, arguments.length)
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                })
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0])
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild
                    }
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                })
            }
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html)
                } else {
                    self.append(html)
                }
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true,
                function(elem) {
                    if (this.nodeType === 1 || this.nodeType === 11) {
                        this.appendChild(elem)
                    }
                })
        },
        prepend: function() {
            return this.domManip(arguments, true,
                function(elem) {
                    if (this.nodeType === 1 || this.nodeType === 11) {
                        this.insertBefore(elem, this.firstChild)
                    }
                })
        },
        before: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false,
                    function(elem) {
                        this.parentNode.insertBefore(elem, this)
                    })
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector)
            }
        },
        after: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false,
                    function(elem) {
                        this.parentNode.insertBefore(elem, this.nextSibling)
                    })
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector)
            }
        },
        remove: function(selector, keepData) {
            var elem,
                i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem])
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem)
                    }
                }
            }
            return this
        },
        empty: function() {
            var elem,
                i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"))
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild)
                }
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false: dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents: deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return jQuery.access(this,
                function(value) {
                    var elem = this[0] || {},
                        i = 0,
                        l = this.length;
                    if (value === undefined) {
                        return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined
                    }
                    if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                        value = value.replace(rxhtmlTag, "<$1></$2>");
                        try {
                            for (; i < l; i++) {
                                elem = this[i] || {};
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(elem.getElementsByTagName("*"));
                                    elem.innerHTML = value
                                }
                            }
                            elem = 0
                        } catch(e) {}
                    }
                    if (elem) {
                        this.empty().append(value)
                    }
                },
                null, value, arguments.length)
        },
        replaceWith: function(value) {
            if (!isDisconnected(this[0])) {
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        var self = jQuery(this),
                            old = self.html();
                        self.replaceWith(value.call(this, i, old))
                    })
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach()
                }
                return this.each(function() {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value)
                    } else {
                        jQuery(parent).append(value)
                    }
                })
            }
            return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this
        },
        detach: function(selector) {
            return this.remove(selector, true)
        },
        domManip: function(args, table, callback) {
            args = [].concat.apply([], args);
            var results,
                first,
                fragment,
                iNoClone,
                i = 0,
                value = args[0],
                scripts = [],
                l = this.length;
            if (!jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function() {
                    jQuery(this).domManip(args, table, callback)
                })
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback)
                })
            }
            if (this[0]) {
                results = jQuery.buildFragment(args, this, scripts);
                fragment = results.fragment;
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (iNoClone = results.cacheable || l - 1; i < l; i++) {
                        callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], i === iNoClone ? fragment: jQuery.clone(fragment, true, true))
                    }
                }
                fragment = first = null;
                if (scripts.length) {
                    jQuery.each(scripts,
                        function(i, elem) {
                            if (elem.src) {
                                if (jQuery.ajax) {
                                    jQuery.ajax({
                                        url: elem.src,
                                        type: "GET",
                                        dataType: "script",
                                        async: false,
                                        global: false,
                                        "throws": true
                                    })
                                } else {
                                    jQuery.error("no ajax")
                                }
                            } else {
                                jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, ""))
                            }
                            if (elem.parentNode) {
                                elem.parentNode.removeChild(elem)
                            }
                        })
                }
            }
            return this
        }
    });
    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag))
    }
    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return
        }
        var type,
            i,
            l,
            oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i])
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({},
                curData.data)
        }
    }
    function cloneFixAttributes(src, dest) {
        var nodeName;
        if (dest.nodeType !== 1) {
            return
        }
        if (dest.clearAttributes) {
            dest.clearAttributes()
        }
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src)
        }
        nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML
            }
            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML
            }
        } else {
            if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.defaultChecked = dest.checked = src.checked;
                if (dest.value !== src.value) {
                    dest.value = src.value
                }
            } else {
                if (nodeName === "option") {
                    dest.selected = src.defaultSelected
                } else {
                    if (nodeName === "input" || nodeName === "textarea") {
                        dest.defaultValue = src.defaultValue
                    } else {
                        if (nodeName === "script" && dest.text !== src.text) {
                            dest.text = src.text
                        }
                    }
                }
            }
        }
        dest.removeAttribute(jQuery.expando)
    }
    jQuery.buildFragment = function(args, context, scripts) {
        var fragment,
            cacheable,
            cachehit,
            first = args[0];
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;
        if (args.length === 1 && typeof first === "string" && first.length < 512 && context === document && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
            cacheable = true;
            fragment = jQuery.fragments[first];
            cachehit = fragment !== undefined
        }
        if (!fragment) {
            fragment = context.createDocumentFragment();
            jQuery.clean(args, context, fragment, scripts);
            if (cacheable) {
                jQuery.fragments[first] = cachehit && fragment
            }
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        }
    };
    jQuery.fragments = {};
    jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        },
        function(name, original) {
            jQuery.fn[name] = function(selector) {
                var elems,
                    i = 0,
                    ret = [],
                    insert = jQuery(selector),
                    l = insert.length,
                    parent = this.length === 1 && this[0].parentNode;
                if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
                    insert[original](this[0]);
                    return this
                } else {
                    for (; i < l; i++) {
                        elems = (i > 0 ? this.clone(true) : this).get();
                        jQuery(insert[i])[original](elems);
                        ret = ret.concat(elems)
                    }
                    return this.pushStack(ret, name, insert.selector)
                }
            }
        });
    function getAll(elem) {
        if (typeof elem.getElementsByTagName !== "undefined") {
            return elem.getElementsByTagName("*")
        } else {
            if (typeof elem.querySelectorAll !== "undefined") {
                return elem.querySelectorAll("*")
            } else {
                return []
            }
        }
    }
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements,
                destElements,
                i,
                clone;
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true)
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild)
            }
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i])
                    }
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i])
                    }
                }
            }
            srcElements = destElements = null;
            return clone
        },
        clean: function(elems, context, fragment, scripts) {
            var i,
                j,
                elem,
                tag,
                wrap,
                depth,
                div,
                hasBody,
                tbody,
                len,
                handleScript,
                jsTags,
                safe = context === document && safeFragment,
                ret = [];
            if (!context || typeof context.createDocumentFragment === "undefined") {
                context = document
            }
            for (i = 0; (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += ""
                }
                if (!elem) {
                    continue
                }
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem)
                    } else {
                        safe = safe || createSafeFragment(context);
                        div = context.createElement("div");
                        safe.appendChild(div);
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        depth = wrap[0];
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild
                        }
                        if (!jQuery.support.tbody) {
                            hasBody = rtbody.test(elem);
                            tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes: wrap[1] === "<table>" && !hasBody ? div.childNodes: [];
                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j])
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild)
                        }
                        elem = div.childNodes;
                        div.parentNode.removeChild(div)
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem)
                } else {
                    jQuery.merge(ret, elem)
                }
            }
            if (div) {
                elem = div = safe = null
            }
            if (!jQuery.support.appendChecked) {
                for (i = 0; (elem = ret[i]) != null; i++) {
                    if (jQuery.nodeName(elem, "input")) {
                        fixDefaultChecked(elem)
                    } else {
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked)
                        }
                    }
                }
            }
            if (fragment) {
                handleScript = function(elem) {
                    if (!elem.type || rscriptType.test(elem.type)) {
                        return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem)
                    }
                };
                for (i = 0; (elem = ret[i]) != null; i++) {
                    if (! (jQuery.nodeName(elem, "script") && handleScript(elem))) {
                        fragment.appendChild(elem);
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                            i += jsTags.length
                        }
                    }
                }
            }
            return ret
        },
        cleanData: function(elems, acceptData) {
            var data,
                id,
                elem,
                type,
                i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = jQuery.support.deleteExpando,
                special = jQuery.event.special;
            for (; (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type)
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle)
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey]
                            } else {
                                if (elem.removeAttribute) {
                                    elem.removeAttribute(internalKey)
                                } else {
                                    elem[internalKey] = null
                                }
                            }
                            jQuery.deletedIds.push(id)
                        }
                    }
                }
            }
        }
    }); (function() {
        var matched,
            browser;
        jQuery.uaMatch = function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            }
        };
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version
        }
        if (browser.chrome) {
            browser.webkit = true
        } else {
            if (browser.webkit) {
                browser.safari = true
            }
        }
        jQuery.browser = browser;
        jQuery.sub = function() {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector, context)
            }
            jQuery.extend(true, jQuerySub, this);
            jQuerySub.superclass = this;
            jQuerySub.fn = jQuerySub.prototype = this();
            jQuerySub.fn.constructor = jQuerySub;
            jQuerySub.sub = this.sub;
            jQuerySub.fn.init = function init(selector, context) {
                if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                    context = jQuerySub(context)
                }
                return jQuery.fn.init.call(this, selector, context, rootjQuerySub)
            };
            jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub
        }
    })();
    var curCSS,
        iframe,
        iframeDoc,
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"),
        elemdisplay = {},
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        cssPrefixes = ["Webkit", "O", "Moz", "ms"],
        eventsToggle = jQuery.fn.toggle;
    function vendorPropName(style, name) {
        if (name in style) {
            return name
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name
            }
        }
        return origName
    }
    function isHidden(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
    }
    function showHide(elements, show) {
        var elem,
            display,
            values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            values[index] = jQuery._data(elem, "olddisplay");
            if (show) {
                if (!values[index] && elem.style.display === "none") {
                    elem.style.display = ""
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName))
                }
            } else {
                display = curCSS(elem, "display");
                if (!values[index] && display !== "none") {
                    jQuery._data(elem, "olddisplay", display)
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "": "none"
            }
        }
        return elements
    }
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this,
                function(elem, name, value) {
                    return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
                },
                name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, true)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state, fn2) {
            var bool = typeof state === "boolean";
            if (jQuery.isFunction(state) && jQuery.isFunction(fn2)) {
                return eventsToggle.apply(this, arguments)
            }
            return this.each(function() {
                if (bool ? state: isHidden(this)) {
                    jQuery(this).show()
                } else {
                    jQuery(this).hide()
                }
            })
        }
    });
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1": ret
                    }
                }
            }
        },
        cssNumber: {
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return
            }
            var ret,
                type,
                hooks,
                origName = jQuery.camelCase(name),
                style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number"
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px"
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value
                    } catch(e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret
                }
                return style[name]
            }
        },
        css: function(elem, name, numeric, extra) {
            var val,
                num,
                hooks,
                origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra)
            }
            if (val === undefined) {
                val = curCSS(elem, name)
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name]
            }
            if (numeric || extra !== undefined) {
                num = parseFloat(val);
                return numeric || jQuery.isNumeric(num) ? num || 0: val
            }
            return val
        },
        swap: function(elem, options, callback) {
            var ret,
                name,
                old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name]
            }
            ret = callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name]
            }
            return ret
        }
    });
    if (window.getComputedStyle) {
        curCSS = function(elem, name) {
            var ret,
                width,
                minWidth,
                maxWidth,
                computed = window.getComputedStyle(elem, null),
                style = elem.style;
            if (computed) {
                ret = computed[name];
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name)
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth
                }
            }
            return ret
        }
    } else {
        if (document.documentElement.currentStyle) {
            curCSS = function(elem, name) {
                var left,
                    rsLeft,
                    ret = elem.currentStyle && elem.currentStyle[name],
                    style = elem.style;
                if (ret == null && style && style[name]) {
                    ret = style[name]
                }
                if (rnumnonpx.test(ret) && !rposition.test(name)) {
                    left = style.left;
                    rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
                    if (rsLeft) {
                        elem.runtimeStyle.left = elem.currentStyle.left
                    }
                    style.left = name === "fontSize" ? "1em": ret;
                    ret = style.pixelLeft + "px";
                    style.left = left;
                    if (rsLeft) {
                        elem.runtimeStyle.left = rsLeft
                    }
                }
                return ret === "" ? "auto": ret
            }
        }
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        var i = extra === (isBorderBox ? "border": "content") ? 4: name === "width" ? 1: 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true)
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0
                }
                if (extra !== "margin") {
                    val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0
                }
            } else {
                val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0;
                if (extra !== "padding") {
                    val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0
                }
            }
        }
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var val = name === "width" ? elem.offsetWidth: elem.offsetHeight,
            valueIsBorderBox = true,
            isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name);
            if (val < 0 || val == null) {
                val = elem.style[name]
            }
            if (rnumnonpx.test(val)) {
                return val
            }
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0
        }
        return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border": "content"), valueIsBorderBox)) + "px"
    }
    function css_defaultDisplay(nodeName) {
        if (elemdisplay[nodeName]) {
            return elemdisplay[nodeName]
        }
        var elem = jQuery("<" + nodeName + ">").appendTo(document.body),
            display = elem.css("display");
        elem.remove();
        if (display === "none" || display === "") {
            iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!iframeDoc || !iframe.createElement) {
                iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
                iframeDoc.write("<!doctype html><html><body>");
                iframeDoc.close()
            }
            elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));
            display = curCSS(elem, "display");
            document.body.removeChild(iframe)
        }
        elemdisplay[nodeName] = display;
        return display
    }
    jQuery.each(["height", "width"],
        function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    if (computed) {
                        if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, "display"))) {
                            return jQuery.swap(elem, cssShow,
                                function() {
                                    return getWidthOrHeight(elem, name, extra)
                                })
                        } else {
                            return getWidthOrHeight(elem, name, extra)
                        }
                    }
                },
                set: function(elem, value, extra) {
                    return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box") : 0)
                }
            }
        });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter: elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "": computed ? "1": ""
            },
            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")": "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    style.removeAttribute("filter");
                    if (currentStyle && !currentStyle.filter) {
                        return
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
            }
        }
    }
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    return jQuery.swap(elem, {
                            "display": "inline-block"
                        },
                        function() {
                            if (computed) {
                                return curCSS(elem, "marginRight")
                            }
                        })
                }
            }
        }
        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
            jQuery.each(["top", "left"],
                function(i, prop) {
                    jQuery.cssHooks[prop] = {
                        get: function(elem, computed) {
                            if (computed) {
                                var ret = curCSS(elem, prop);
                                return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px": ret
                            }
                        }
                    }
                })
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            return (elem.offsetWidth === 0 && elem.offsetHeight === 0) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS(elem, "display")) === "none")
        };
        jQuery.expr.filters.visible = function(elem) {
            return ! jQuery.expr.filters.hidden(elem)
        }
    }
    jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        },
        function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    var i,
                        parts = typeof value === "string" ? value.split(" ") : [value],
                        expanded = {};
                    for (i = 0; i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                    }
                    return expanded
                }
            };
            if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
            }
        });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rselectTextarea = /^(?:select|textarea)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null: jQuery.isArray(val) ? jQuery.map(val,
                    function(val, i) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        }
                    }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    });
    jQuery.param = function(a, traditional) {
        var prefix,
            s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : (value == null ? "": value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
            };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a,
                function() {
                    add(this.name, this.value)
                })
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add)
            }
        }
        return s.join("&").replace(r20, "+")
    };
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj,
                function(i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        add(prefix, v)
                    } else {
                        buildParams(prefix + "[" + (typeof v === "object" ? i: "") + "]", v, traditional, add)
                    }
                })
        } else {
            if (!traditional && jQuery.type(obj) === "object") {
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
                }
            } else {
                add(prefix, obj)
            }
        }
    }
    var ajaxLocParts,
        ajaxLocation,
        rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href
    } catch(e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*"
            }
            var dataType,
                list,
                placeBefore,
                dataTypes = dataTypeExpression.toLowerCase().split(core_rspace),
                i = 0,
                length = dataTypes.length;
            if (jQuery.isFunction(func)) {
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*"
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift": "push"](func)
                }
            }
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var selection,
            list = structure[dataType],
            i = 0,
            length = list ? list.length: 0,
            executeOnly = (structure === prefilters);
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)
        }
        return selection
    }
    function ajaxExtend(target, src) {
        var key,
            deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) { (flatOptions[key] ? target: (deep || (deep = {})))[key] = src[key]
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep)
        }
    }
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments)
        }
        if (!this.length) {
            return this
        }
        var selector,
            type,
            response,
            self = this,
            off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off)
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined
        } else {
            if (params && typeof params === "object") {
                type = "POST"
            }
        }
        jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params,
            complete: function(jqXHR, status) {
                if (callback) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR])
                }
            }
        }).done(function(responseText) {
            response = arguments;
            self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText)
        });
        return this
    };
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
        function(i, o) {
            jQuery.fn[o] = function(f) {
                return this.on(o, f)
            }
        });
    jQuery.each(["get", "post"],
        function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                if (jQuery.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined
                }
                return jQuery.ajax({
                    type: method,
                    url: url,
                    data: data,
                    success: callback,
                    dataType: type
                })
            }
        });
    jQuery.extend({
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        ajaxSetup: function(target, settings) {
            if (settings) {
                ajaxExtend(target, jQuery.ajaxSettings)
            } else {
                settings = target;
                target = jQuery.ajaxSettings
            }
            ajaxExtend(target, settings);
            return target
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined
            }
            options = options || {};
            var ifModifiedKey,
                responseHeadersString,
                responseHeaders,
                transport,
                timeoutTimer,
                parts,
                fireGlobals,
                i,
                s = jQuery.ajaxSetup({},
                    options),
                callbackContext = s.context || s,
                globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    setRequestHeader: function(name, value) {
                        if (!state) {
                            var lname = name.toLowerCase();
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString: null
                    },
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2]
                                }
                            }
                            match = responseHeaders[key.toLowerCase()]
                        }
                        return match === undefined ? null: match
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type
                        }
                        return this
                    },
                    abort: function(statusText) {
                        statusText = statusText || strAbort;
                        if (transport) {
                            transport.abort(statusText)
                        }
                        done(0, statusText);
                        return this
                    }
                };
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess,
                    success,
                    error,
                    response,
                    modified,
                    statusText = nativeStatusText;
                if (state === 2) {
                    return
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer)
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4: 0;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses)
                }
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[ifModifiedKey] = modified
                        }
                        modified = jqXHR.getResponseHeader("Etag");
                        if (modified) {
                            jQuery.etag[ifModifiedKey] = modified
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true
                    } else {
                        isSuccess = ajaxConvert(s, response);
                        statusText = isSuccess.state;
                        success = isSuccess.data;
                        error = isSuccess.error;
                        isSuccess = !error
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success": "Error"), [jqXHR, s, isSuccess ? success: error])
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (! (--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop")
                    }
                }
            }
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.add;
            jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]]
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.always(tmp)
                    }
                }
                return this
            };
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace);
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase()) || false;
                s.crossDomain = parts && (parts.join(":") + (parts[3] ? "": parts[1] === "http:" ? 80: 443)) !== (ajaxLocParts.join(":") + (ajaxLocParts[3] ? "": ajaxLocParts[1] === "http:" ? 80: 443))
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional)
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++===0) {
                jQuery.event.trigger("ajaxStart")
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&": "?") + s.data;
                    delete s.data
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now(),
                        ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&": "?") + "_=" + ts: "")
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType)
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey])
                }
                if (jQuery.etag[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])
                }
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01": "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i])
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort()
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i])
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done( - 1, "No Transport")
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s])
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                            jqXHR.abort("timeout")
                        },
                        s.timeout)
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done)
                } catch(e) {
                    if (state < 2) {
                        done( - 1, e)
                    } else {
                        throw e
                    }
                }
            }
            return jqXHR
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct,
            type,
            finalDataType,
            firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type]
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type")
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0]
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                if (!firstDataType) {
                    firstDataType = type
                }
            }
            finalDataType = finalDataType || firstDataType
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType)
            }
            return responses[finalDataType]
        }
    }
    function ajaxConvert(s, response) {
        var conv,
            conv2,
            current,
            tmp,
            dataTypes = s.dataTypes.slice(),
            prev = dataTypes[0],
            converters = {},
            i = 0;
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType)
        }
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv]
            }
        }
        for (; (current = dataTypes[++i]);) {
            if (current !== "*") {
                if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2]
                                    } else {
                                        if (converters[conv2] !== true) {
                                            current = tmp[0];
                                            dataTypes.splice(i--, 0, current)
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response)
                        } else {
                            try {
                                response = conv(response)
                            } catch(e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e: "No conversion from " + prev + " to " + current
                                }
                            }
                        }
                    }
                }
                prev = current
            }
        }
        return {
            state: "success",
            data: response
        }
    }
    var oldCallbacks = [],
        rquestion = /\?/,
        rjsonp = /(=)\?(?=&|$)|\?\?/,
        nonce = jQuery.now();
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback
        }
    });
    jQuery.ajaxPrefilter("json jsonp",
        function(s, originalSettings, jqXHR) {
            var callbackName,
                overwritten,
                responseContainer,
                data = s.data,
                url = s.url,
                hasCallback = s.jsonp !== false,
                replaceInUrl = hasCallback && rjsonp.test(url),
                replaceInData = hasCallback && !replaceInUrl && typeof data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
            if (s.dataTypes[0] === "jsonp" || replaceInUrl || replaceInData) {
                callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
                overwritten = window[callbackName];
                if (replaceInUrl) {
                    s.url = url.replace(rjsonp, "$1" + callbackName)
                } else {
                    if (replaceInData) {
                        s.data = data.replace(rjsonp, "$1" + callbackName)
                    } else {
                        if (hasCallback) {
                            s.url += (rquestion.test(url) ? "&": "?") + s.jsonp + "=" + callbackName
                        }
                    }
                }
                s.converters["script json"] = function() {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called")
                    }
                    return responseContainer[0]
                };
                s.dataTypes[0] = "json";
                window[callbackName] = function() {
                    responseContainer = arguments
                };
                jqXHR.always(function() {
                    window[callbackName] = overwritten;
                    if (s[callbackName]) {
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        oldCallbacks.push(callbackName)
                    }
                    if (responseContainer && jQuery.isFunction(overwritten)) {
                        overwritten(responseContainer[0])
                    }
                    responseContainer = overwritten = undefined
                });
                return "script"
            }
        });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text
            }
        }
    });
    jQuery.ajaxPrefilter("script",
        function(s) {
            if (s.cache === undefined) {
                s.cache = false
            }
            if (s.crossDomain) {
                s.type = "GET";
                s.global = false
            }
        });
    jQuery.ajaxTransport("script",
        function(s) {
            if (s.crossDomain) {
                var script,
                    head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                return {
                    send: function(_, callback) {
                        script = document.createElement("script");
                        script.async = "async";
                        if (s.scriptCharset) {
                            script.charset = s.scriptCharset
                        }
                        script.src = s.url;
                        script.onload = script.onreadystatechange = function(_, isAbort) {
                            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                                script.onload = script.onreadystatechange = null;
                                if (head && script.parentNode) {
                                    head.removeChild(script)
                                }
                                script = undefined;
                                if (!isAbort) {
                                    callback(200, "success")
                                }
                            }
                        };
                        head.insertBefore(script, head.firstChild)
                    },
                    abort: function() {
                        if (script) {
                            script.onload(0, 1)
                        }
                    }
                }
            }
        });
    var xhrCallbacks,
        xhrOnUnloadAbort = window.ActiveXObject ?
            function() {
                for (var key in xhrCallbacks) {
                    xhrCallbacks[key](0, 1)
                }
            }: false,
        xhrId = 0;
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest()
        } catch(e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch(e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ?
        function() {
            return ! this.isLocal && createStandardXHR() || createActiveXHR()
        }: createStandardXHR; (function(xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !!xhr,
            cors: !!xhr && ("withCredentials" in xhr)
        })
    })(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var handle,
                            i,
                            xhr = s.xhr();
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password)
                        } else {
                            xhr.open(s.type, s.url, s.async)
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i]
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType)
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i])
                            }
                        } catch(_) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function(_, isAbort) {
                            var status,
                                statusText,
                                responseHeaders,
                                responses,
                                xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle]
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort()
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml
                                        }
                                        try {
                                            responses.text = xhr.responseText
                                        } catch(_) {}
                                        try {
                                            statusText = xhr.statusText
                                        } catch(e) {
                                            statusText = ""
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200: 404
                                        } else {
                                            if (status === 1223) {
                                                status = 204
                                            }
                                        }
                                    }
                                }
                            } catch(firefoxAccessException) {
                                if (!isAbort) {
                                    complete( - 1, firefoxAccessException)
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders)
                            }
                        };
                        if (!s.async) {
                            callback()
                        } else {
                            if (xhr.readyState === 4) {
                                setTimeout(callback, 0)
                            } else {
                                handle = ++xhrId;
                                if (xhrOnUnloadAbort) {
                                    if (!xhrCallbacks) {
                                        xhrCallbacks = {};
                                        jQuery(window).unload(xhrOnUnloadAbort)
                                    }
                                    xhrCallbacks[handle] = callback
                                }
                                xhr.onreadystatechange = callback
                            }
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(0, 1)
                        }
                    }
                }
            }
        })
    }
    var fxNow,
        timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function(prop, value) {
                var end,
                    unit,
                    tween = this.createTween(prop, value),
                    parts = rfxnum.exec(value),
                    target = tween.cur(),
                    start = +target || 0,
                    scale = 1,
                    maxIterations = 20;
                if (parts) {
                    end = +parts[2];
                    unit = parts[3] || (jQuery.cssNumber[prop] ? "": "px");
                    if (unit !== "px" && start) {
                        start = jQuery.css(tween.elem, prop, true) || end || 1;
                        do {
                            scale = scale || ".5";
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit)
                        }
                        while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
                    }
                    tween.unit = unit;
                    tween.start = start;
                    tween.end = parts[1] ? start + (parts[1] + 1) * end: end
                }
                return tween
            }]
        };
    function createFxNow() {
        setTimeout(function() {
                fxNow = undefined
            },
            0);
        return (fxNow = jQuery.now())
    }
    function createTweens(animation, props) {
        jQuery.each(props,
            function(prop, value) {
                var collection = (tweeners[prop] || []).concat(tweeners["*"]),
                    index = 0,
                    length = collection.length;
                for (; index < length; index++) {
                    if (collection[index].call(animation, prop, value)) {
                        return
                    }
                }
            })
    }
    function Animation(elem, properties, options) {
        var result,
            index = 0,
            tweenerIndex = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function() {
                delete tick.elem
            }),
            tick = function() {
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    percent = 1 - (remaining / animation.duration || 0),
                    index = 0,
                    length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent)
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                if (percent < 1 && length) {
                    return remaining
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({},
                    properties),
                opts: jQuery.extend(true, {
                        specialEasing: {}
                    },
                    options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end, easing) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length: 0;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1)
                    }
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd])
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd])
                    }
                    return this
                }
            }),
            props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result
            }
        }
        createTweens(animation, props);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation)
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            anim: animation,
            queue: animation.opts.queue,
            elem: elem
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function propFilter(props, specialEasing) {
        var index,
            name,
            easing,
            value,
            hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0]
            }
            if (index !== name) {
                props[name] = value;
                delete props[index]
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (! (index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing
                    }
                }
            } else {
                specialEasing[name] = easing
            }
        }
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"]
            } else {
                props = props.split(" ")
            }
            var prop,
                index = 0,
                length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback)
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback)
            } else {
                animationPrefilters.push(callback)
            }
        }
    });
    function defaultPrefilter(elem, props, opts) {
        var index,
            prop,
            value,
            length,
            dataShow,
            tween,
            hooks,
            oldfire,
            anim = this,
            style = elem.style,
            orig = {},
            handled = [],
            hidden = elem.nodeType && isHidden(elem);
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire()
                    }
                }
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire()
                    }
                })
            })
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none") {
                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block"
                } else {
                    style.zoom = 1
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!jQuery.support.shrinkWrapBlocks) {
                anim.done(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2]
                })
            }
        }
        for (index in props) {
            value = props[index];
            if (rfxtypes.exec(value)) {
                delete props[index];
                if (value === (hidden ? "hide": "show")) {
                    continue
                }
                handled.push(index)
            }
        }
        length = handled.length;
        if (length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
            if (hidden) {
                jQuery(elem).show()
            } else {
                anim.done(function() {
                    jQuery(elem).hide()
                })
            }
            anim.done(function() {
                var prop;
                jQuery.removeData(elem, "fxshow", true);
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop])
                }
            });
            for (index = 0; index < length; index++) {
                prop = handled[index];
                tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
                orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
                if (! (prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1: 0
                    }
                }
            }
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing)
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "": "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
            } else {
                this.pos = eased = percent
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (hooks && hooks.set) {
                hooks.set(this)
            } else {
                Tween.propHooks._default.set(this)
            }
            return this
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop]
                }
                result = jQuery.css(tween.elem, tween.prop, false, "");
                return ! result || result === "auto" ? 0: result
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween)
                } else {
                    if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                    } else {
                        tween.elem[tween.prop] = tween.now
                    }
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now
            }
        }
    };
    jQuery.each(["toggle", "show", "hide"],
        function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return speed == null || typeof speed === "boolean" || (!i && jQuery.isFunction(speed) && jQuery.isFunction(easing)) ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
            }
        });
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                },
                speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({},
                        prop), optall);
                    if (empty) {
                        anim.stop(true)
                    }
                };
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd)
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", [])
            }
            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index])
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index])
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1)
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type)
                }
            })
        }
    });
    function genFx(type, includeWidth) {
        var which,
            attrs = {
                height: type
            },
            i = 0;
        includeWidth = includeWidth ? 1: 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type
        }
        return attrs
    }
    jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        },
        function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback)
            }
        });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({},
            speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0: typeof opt.duration === "number" ? opt.duration: opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx"
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this)
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue)
            }
        };
        return opt
    };
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2
        }
    };
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function() {
        var timer,
            timers = jQuery.timers,
            i = 0;
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1)
            }
        }
        if (!timers.length) {
            jQuery.fx.stop()
        }
    };
    jQuery.fx.timer = function(timer) {
        if (timer() && jQuery.timers.push(timer) && !timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers,
                function(fn) {
                    return elem === fn.elem
                }).length
        }
    }
    var rroot = /^(?:body|html)$/i;
    jQuery.fn.offset = function(options) {
        if (arguments.length) {
            return options === undefined ? this: this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            })
        }
        var docElem,
            body,
            win,
            clientTop,
            clientLeft,
            scrollTop,
            scrollLeft,
            box = {
                top: 0,
                left: 0
            },
            elem = this[0],
            doc = elem && elem.ownerDocument;
        if (!doc) {
            return
        }
        if ((body = doc.body) === elem) {
            return jQuery.offset.bodyOffset(elem)
        }
        docElem = doc.documentElement;
        if (!jQuery.contains(docElem, elem)) {
            return box
        }
        if (typeof elem.getBoundingClientRect !== "undefined") {
            box = elem.getBoundingClientRect()
        }
        win = getWindow(doc);
        clientTop = docElem.clientTop || body.clientTop || 0;
        clientLeft = docElem.clientLeft || body.clientLeft || 0;
        scrollTop = win.pageYOffset || docElem.scrollTop;
        scrollLeft = win.pageXOffset || docElem.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        }
    };
    jQuery.offset = {
        bodyOffset: function(body) {
            var top = body.offsetTop,
                left = body.offsetLeft;
            if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0
            }
            return {
                top: top,
                left: left
            }
        },
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative"
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {},
                curPosition = {},
                curTop,
                curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset)
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft
            }
            if ("using" in options) {
                options.using.call(elem, props)
            } else {
                curElem.css(props)
            }
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) {
                return
            }
            var elem = this[0],
                offsetParent = this.offsetParent(),
                offset = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                }: offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent
                }
                return offsetParent || document.body
            })
        }
    });
    jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        },
        function(method, prop) {
            var top = /Y/.test(prop);
            jQuery.fn[method] = function(val) {
                return jQuery.access(this,
                    function(elem, method, val) {
                        var win = getWindow(elem);
                        if (val === undefined) {
                            return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method]
                        }
                        if (win) {
                            win.scrollTo(!top ? val: jQuery(win).scrollLeft(), top ? val: jQuery(win).scrollTop())
                        } else {
                            elem[method] = val
                        }
                    },
                    method, val, arguments.length, null)
            }
        });
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem: elem.nodeType === 9 ? elem.defaultView || elem.parentWindow: false
    }
    jQuery.each({
            Height: "height",
            Width: "width"
        },
        function(name, type) {
            jQuery.each({
                    padding: "inner" + name,
                    content: type,
                    "": "outer" + name
                },
                function(defaultExtra, funcName) {
                    jQuery.fn[funcName] = function(margin, value) {
                        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                            extra = defaultExtra || (margin === true || value === true ? "margin": "border");
                        return jQuery.access(this,
                            function(elem, type, value) {
                                var doc;
                                if (jQuery.isWindow(elem)) {
                                    return elem.document.documentElement["client" + name]
                                }
                                if (elem.nodeType === 9) {
                                    doc = elem.documentElement;
                                    return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
                                }
                                return value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra)
                            },
                            type, chainable ? margin: undefined, chainable, null)
                    }
                })
        });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [],
            function() {
                return jQuery
            })
    }
})(window);
function get_cookie(varname) {
    var tmp_ary = new Array(),
        a,
        b,
        c,
        d;
    if (varname) {
        a = document.cookie.indexOf(varname + "=");
        if (a != -1) {
            b = document.cookie.substring((a + varname.length + 1), document.cookie.length);
            c = b.split(";");
            d = c[0];
            return d
        }
    }
}
function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expDay = (argc > 2) ? argv[2] : 30;
    try {
        expDay = parseInt(expDay);
        if (expDay < 0) {
            expDay = 0
        }
    } catch(e) {
        expDay = 30
    }
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + (expDay * 24 * 60 * 60 * 1000));
    setCookieVal(name, value, expDate, "/", ".zol.com.cn")
}
function setCookieVal(name, value) {
    var argv = setCookieVal.arguments;
    var argc = setCookieVal.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "": ("; expires=" + expires.toGMTString())) + ((path == null) ? "": ("; path=" + path)) + ((domain == null) ? "": ("; domain=" + domain)) + ((secure == true) ? "; secure": "")
}
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = get_cookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString()
}
function genFlash(flash_src, flash_id, div_str, width, height, trans_tag) {
    var return_str = "";
    return_str += '<object id="' + flash_id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="' + width + '" height="' + height + '"><param name="SRC" value="' + flash_src + '" />';
    if (1 == trans_tag) {
        return_str += '<param name="wmode" value="transparent" />'
    }
    return_str += '<embed id="' + flash_id + '" src="' + flash_src + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + width + '" height="' + height + '"';
    if (1 == trans_tag) {
        return_str += ' wmode="transparent"'
    }
    return_str += "></embed></object>";
    if ("" != div_str) {
        document.getElementById(div_str).innerHTML = return_str
    } else {
        return return_str
    }
}
var tmp_name = document.cookie.indexOf("Adshow=");
var Adshow = get_cookie("Adshow");
if ( - 1 == tmp_name) {
    setCookie("Adshow", 1)
} else {
    Adshow = Adshow - 1;
    if ( - 1 == Adshow) {
        Adshow = 5
    }
    setCookie("Adshow", Adshow)
}
var userid = get_cookie("zol_userid");
var nickname = get_cookie("zol_nickname");
var names = nickname ? nickname: userid;
function filterStrChar(str) {
    if (str == undefined) {
        return ""
    }
    str = str.replace(/<\/?[^>]*>/g, "").replace(/[ | ]*\n/g, "\n").replace(/\n[\s| | ]*\r/g, "\n").replace(/['"]*/g, "").replace(/=*/g, "").replace(/>*/g, "").replace(/<*/g, "");
    return str
}
userid = filterStrChar(userid);
names = filterStrChar(names);
var backUrl = document.URL;
$(function() {
    var oBackBtn = $("#backHeadBtn");
    $(window).on("scroll",
        function() {
            var o = $(this);
            if (o.scrollTop() > 500) {
                oBackBtn.fadeIn(200)
            } else {
                oBackBtn.css("display", "none")
            }
            if (o.scrollTop() >= $(document).height() - $(window).height()) {
                $(".fix-layout").css("bottom", "60px")
            } else {
                $(".fix-layout").css("bottom", "10px")
            }
        });
    oBackBtn.on("click",
        function() {
            window.scrollTo("0", "0")
        });
    $("#searchBox").focus(function() {
        if ($(this).hasClass("placeholder")) {
            $(this).removeClass("placeholder").val("")
        }
    }).focusout(function() {
        if (!$(this).val().replace(/(^\s*)|(\s*$)/, "")) {
            $(this).addClass("placeholder").val("\u8bf7\u8f93\u5165\u5e16\u5b50\u5173\u952e\u8bcd")
        }
    });
    $(".picLiksBtn").live("click",
        function() {
            var self = this;
            if ($(self).attr("data-login") == "no-login") {
                return false
            }
            if (self.flag == 1) {
                return false
            }
            self.flag = 1;
            var obj = $(self);
            var curNum = parseInt(obj.find("em").html());
            var newNum = 0;
            var data = obj.attr("data-role");
            curNum = isNaN(curNum) ? 0: curNum;
            newNum = curNum;
            if (obj.closest(".pic-like").hasClass("has-like")) {
                var isLike = 1; --newNum;
                newNum = newNum < 1 ? 0: newNum
            } else {
                var isLike = 0; ++newNum
            }
            changeLike(newNum, isLike, obj);
            clearTimeout(self.t);
            self.t = setTimeout(function() {
                    addFavour(data.split("_", 3), isLike, obj, newNum)
                },
                300)
        })
});
function checkKword() {
    var kword = $("#searchBox").val().replace(/(^\s*)|(\s*$)/, "");
    if (!kword || kword == "\u8bf7\u8f93\u5165\u5e16\u5b50\u5173\u952e\u8bcd") {
        App.alert("\u8bf7\u8f93\u5165\u5e16\u5b50\u5173\u952e\u8bcd");
        return false
    } else {
        return true
    }
}
function checkKword2() {
    var kword = $("#searchBox2").val().replace(/(^\s*)|(\s*$)/, "");
    if (!kword || kword == "\u8bf7\u8f93\u5165\u5e16\u5b50\u5173\u952e\u8bcd") {
        App.alert("\u8bf7\u8f93\u5165\u5e16\u5b50\u5173\u952e\u8bcd");
        return false
    } else {
        return true
    }
}
function __mores(linkId) {
    var divObj = document.getElementById(linkId + "DetailNotice");
    divObj.style.width = divObj.offsetWidth + "px";
    document.getElementById(linkId).className = "pub-menu pub-more-on";
    if ((linkId == "pubMessage" || linkId == "pubFeed" || linkId == "pubMyBbs" || linkId == "pubUser") && document.getElementById("zol-follow-api")) {
        document.getElementById("zol-follow-api").style.display = "none"
    }
}
function __moreh(linkId) {
    document.getElementById(linkId).className = "pub-menu";
    var divObj = document.getElementById(linkId + "DetailNotice");
    divObj.style.width = "auto";
    if ((linkId == "pubMessage" || linkId == "pubFeed" || linkId == "pubMyBbs" || linkId == "pubUser") && document.getElementById("zol-follow-api")) {
        document.getElementById("zol-follow-api").style.display = ""
    }
}
function addFavour(data, isLike, obj, newNum) {
    bbsid = data[0];
    boardid = data[1];
    bookid = data[2];
    var act = !WEB_CONFIG.userid ? "noLoginFavourBook": "favourBook";
    $.ajax({
        type: "GET",
        url: "/index.php?c=Ajax_Book&a=" + act,
        data: {
            bbsid: bbsid,
            boardid: boardid,
            bookid: bookid
        },
        dataType: "json",
        success: function(back) {
            if (back.info == "ok") {
                changeLike(newNum, isLike, obj)
            } else {
                if (back.info == "error") {
                    App.alert(bask.msg)
                }
            }
            obj.get(0).flag = 0
        }
    })
}
function changeLike(num, isLike, obj) {
    if (isLike == 1) {
        obj.closest(".pic-like").removeClass("has-like")
    } else {
        obj.closest(".pic-like").addClass("has-like")
    }
    var returnItemsLikes = (num == 0) ? "\u8d5e&nbsp;": "\u8d5e&nbsp;<em>+" + num + "</em>";
    obj.html(returnItemsLikes);
    obj.get(0).flag = 0
}
function addHitEvent(event, ipCk, url) {
    if (!event) {
        return false
    }
    if (!ipCk && typeof WEB_CONFIG.ipCk != "undefined") {
        ipCk = WEB_CONFIG.ipCk
    }
    var s = window.location.href.split("#");
    var refUrl = s[0];
    if (!url) {
        url = refUrl
    }
    var countUrl = "http://pvtest.zol.com.cn/images/pvevents.gif";
    countUrl += "?t=" + (new Date().getTime()) + "&event=" + event + "&ip_ck=" + ipCk + "&reful=" + refUrl + "&url=" + url;
    var oScript = null;
    try {
        oScript = document.getElementById("countHit");
        document.body.removeChild(oScript)
    } catch(e) {}
    oScript = document.createElement("script");
    oScript.src = countUrl;
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    oScript.id = "countHit";
    document.getElementsByTagName("head")[0].appendChild(oScript);
    return true
}
var App = {};
App.Load_JsArr = [];
App.Js_Url = "/js/";
App.charset = "GBK";
App.toCenter = function(selector) {
    var _wnd = $(window),
        _doc = $(document);
    var _left = _doc.scrollLeft();
    var _top = _doc.scrollTop();
    _left += (_wnd.width() - $(selector).outerWidth(true)) / 2;
    _top += (_wnd.height() - $(selector).outerHeight(true)) / 2;
    $(selector).css({
        position: "absolute",
        top: _top,
        left: _left
    })
};
App.flutter = function(selector, offset, callback) {
    offset = offset || 100;
    callback = callback ||
    function() {};
    var _wnd = $(window),
        _doc = $(document),
        _left = _doc.scrollLeft(),
        _top = _doc.scrollTop();
    _left += (_wnd.width() - $(selector).outerWidth(true)) / 2;
    _top += (_wnd.height() - $(selector).outerHeight(true)) / 2;
    $(selector).css({
        position: "absolute",
        top: (_top + offset),
        left: _left,
        opacity: 0.2
    }).show().animate({
        opacity: 1,
        top: (_top - offset).toString() + "px"
    });
    setTimeout(function() {
            $(selector).fadeOut("fast");
            callback()
        },
        5100)
};
App.alert = function(content, callback) {
    $("#G_TipsLayer").remove();
    callback = callback ||
    function() {};
    var arr = ['<div id="G_TipsLayer" class="popbox" style="width:310px">', '<div class="popbox-inner"><div class="popbox-head">', '<span class="popbox-close border-radius-s3 closeBtn" onclick="$(\'#G_TipsLayer\').remove();">\u5173\u95ed</span>', '<h3><i class="line"></i>\u63d0\u793a\u4fe1\u606f</h3></div>', '<div class="popbox-main"><div class="popbox-tips">', "<p>" + content + '</p><div class="popbox-btns"><span class="btn-blue border-radius" onclick="javascript:$(\'#G_TipsLayer\').remove();">\u786e\u5b9a</span></div></div></div></div></div>'];
    var _str = $(arr.join(""));
    $("body").append(_str);
    App.toCenter("#G_TipsLayer");
    callback();
    $("#G_TipsLayer").show()
};
App.loadScript = function(url, callback) {
    if ($.inArray(url, App.Load_JsArr) !== 1) {
        var _script = document.createElement("script");
        if (_script.readyState) {
            _script.onreadystatechange = function() {
                if (_script.readyState == "loaded" || _script.readyState == "complete") {
                    _script.onreadystatechange = null;
                    App.Load_JsArr.push(url);
                    callback()
                }
            }
        } else {
            _script.onload = function() {
                App.Load_JsArr.push(url);
                callback()
            }
        }
        _script.src = url;
        document.body.appendChild(_script)
    } else {
        callback();
        return
    }
};
App.mbStrLen = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (App.charset == "utf-8" ? 3: 2) : 1
    }
    return len
};
App.mbSubstr = function(str, maxlen, dot) {
    var len = 0;
    var ret = "";
    var dot = !dot ? "...": "";
    maxlen = maxlen - dot.length;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (App.charset == "utf-8" ? 3: 2) : 1;
        if (len > maxlen) {
            ret += dot;
            break
        }
        ret += str.substr(i, 1)
    }
    return ret
};
App.phoneCharge = function(obj) {
    if (typeof obj == "object" && obj.status == 0) {
        var html = '<a href="javascript:;">\u70b9\u51fb\u9886\u53d6</a>';
        App.alert("\u6211\u9760!\u5929\u4e0a\u6389\u9985\u997c,\u4f60\u88ab" + obj.money + "\u5143\u8bdd\u8d39\u7838\u4e2d\u4e86!<br><br>" + html,
            function() {
                $("#G_TipsLayer").find(".btn-blue").removeAttr("onclick").unbind().bind("click",
                    function() {
                        $("#G_TipsLayer").find("a").click()
                    });
                $("#G_TipsLayer").find("a").bind("click",
                    function() {
                        var h = '<div id="phoneCharge" style="display:none;" class="promptbox popbox">			        <div class="popbox-inner">			            <div class="popbox-head">			                <span class="popbox-close border-radius-s3 prompt-close">\u5173\u95ed</span>			                <h3><i class="line"></i>\u63d0\u793a</h3>			            </div>			            <div class="popbox-main">			                <div style="padding: 15px 0 0;font-size: 14px;">			                    <p></p><p>\u8bf7\u8f93\u5165\u624b\u673a\u53f7\uff1a<input type="text" value="" id="" class="" style="width: 115px;"></p>			                    <p class="wrong" style="display:none;margin-top: 5px;padding: 0 0 0 98px;color: #f00;"></p>			                    <div class="popbox-btns">			                        <span id="" class="btn-blue border-radius-s3">\u786e\u5b9a</span><span class="btn-gray border-radius-s3 layerbox-close">\u53d6\u6d88</span>			                    </div>			                </div>			            </div>			        </div>			    </div>';
                        $("body").append(h);
                        var target = $("#phoneCharge"),
                            closeBtn = target.find(".popbox-close"),
                            confirmBtn = target.find(".btn-blue"),
                            cancleBtn = target.find(".btn-gray"),
                            wrongTip = target.find(".wrong"),
                            input = target.find("input");
                        closeBtn.click(function() {
                            target.remove()
                        });
                        cancleBtn.click(function() {
                            target.remove()
                        });
                        confirmBtn.click(function() {
                            var phone = input.val();
                            var rg = /^(?:1\d\d)-?\d{5}(\d{3}|\*{3})$/;
                            if (!rg.test(phone)) {
                                input.blur();
                                wrongTip.text("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7~").show();
                                return false
                            }
                            var data = obj;
                            data.phone = phone;
                            $.post("/index.php?c=Ajax_Public&a=upChargePhone", data,
                                function(json) {
                                    target.remove();
                                    if (json.info == "ok") {
                                        App.alert("\u63d0\u4ea4\u6210\u529f,\u8bf7\u7b49\u5f85\u7ba1\u7406\u5458\u6838\u5b9e~")
                                    } else {
                                        if (json.info == "err") {
                                            App.alert(json.msg);
                                            return false
                                        }
                                    }
                                },
                                "json")
                        });
                        input.bind({
                            focus: function() {
                                wrongTip.text("").hide()
                            },
                            keydown: function(event) {
                                if (event.keyCode == 13) {
                                    confirmBtn.click()
                                }
                            }
                        });
                        App.toCenter("#phoneCharge");
                        $("#phoneCharge").show()
                    });
                return
            })
    }
};
App.actCkname = "community:onlineActive:loginbox";
if (typeof FB == "undefined" || !FB) {
    var FB = {}
}
FB.isCurPublish = 0;
FB.num = 0;
FB.MinConLen = 10;
FB.MaxConLen = 50000;
FB.IsCodeRight = 0;
FB.HiddenImg = "http://icon.zol.com.cn/community/publish/hidden.png";
FB.NeedScore = 0;
FB.Aattachment = 5;
FB.ToHighlight = 50;
FB.ToTop = 100;
FB.replyMinLen = 5;
FB.replyTips = '<p></p>';
FB.verify = function() {
    if (typeof FB.isCurPublish != "undefined" && FB.isCurPublish == 1) {
        return false
    }
    var active = 0,
        isTry = 0;
    if (typeof Publish_Config.bookType != "undefined" && Publish_Config.bookType == "active") {
        active = 1
    }
    var tot_score = 0;
    if (!active) {
        var manu = $("#bookBrand span").text();
        if (!manu || manu.substr(0, 2) == "\u9009\u62e9") {
            Layer.showTips({
                type: "warn",
                content: "\u8bf7\u9009\u62e9\u7248\u5757\u6216\u54c1\u724c~"
            });
            return false
        }
    }
    var title = $("#titleInput").val();
    if (!title) {
        Layer.showTips({
            type: "warn",
            content: "\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a~"
        });
        return false
    }
    if (App.mbStrLen(title) > 80) {
        Layer.showTips({
            type: "warn",
            content: "\u6807\u9898\u8fc7\u957f~"
        });
        return false
    }
    var attachment = 0;
    if ($("#postSetTopAttach").attr("checked") == "checked") {
        tot_score += FB.Aattachment;
        attachment = 1
    }
    var highlight = 0;
    if ($("#titleColorSet").attr("checked") == "checked") {
        tot_score += FB.ToHighlight;
        var color = $("#titleColor span").css("background-color");
        if (color == "rgb(7, 140, 253)") {
            highlight = 1
        } else {
            if (color == "rgb(30, 226, 95)") {
                highlight = 2
            }
        }
    }
    var toptype = 0;
    if ($("#postSetTop").attr("checked") == "checked") {
        tot_score += FB.ToTop;
        toptype = 4
    }
    var content = ue.getContent();
    var con_len = ue.getContentTxt().length;
    if (!content) {
        Layer.showTips({
            type: "warn",
            content: "\u5e16\u5b50\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\u54df~"
        });
        return false
    }
    if (con_len < FB.MinConLen || con_len >= FB.MaxConLen) {
        Layer.showTips({
            type: "warn",
            content: "\u60a8\u7684\u5e16\u5b50\u957f\u5ea6\u4e0d\u7b26\u5408\u8981\u6c42\u3002\u5f53\u524d\u957f\u5ea6\uff1a" + con_len + "\u5b57\u7b26<br>\u7cfb\u7edf\u9650\u5236: " + FB.MinConLen + " \u5230 " + FB.MaxConLen + "\u5b57\u7b26",
            disappear: 2000
        });
        return false
    }
    if ($(".post-classify").length) {
        if (!Publish_Config.book_type) {
            Layer.showTips({
                type: "warn",
                content: "\u8bf7\u9009\u62e9\u5e16\u5b50\u7c7b\u578b~"
            });
            return false
        }
    }
    var code = $("#verifyCode input").val();
    tot_score += parseInt($("#rewardTotal").text());
    var user_score = parseInt($("#userScore").val());
    if (tot_score > user_score) {
        Layer.showTips({
            type: "warn",
            content: "\u60a8\u7684\u91d1\u8c46\u4e0d\u8db3~"
        });
        return false
    }
    var reply_reward = parseInt($("#replyReward").val());
    var reply_num = parseInt($("#replyNum").val());
    var each_receive = parseInt($("#eachReceive span").text());
    var reward_chance = parseInt($("#rewardChance span").text());
    var share = "";
    $("#bookShare li").each(function(key, val) {
        if ($(val).hasClass("checked")) {
            share += "," + (key + 1)
        }
    });
    share = share.substr(1);
    if ($("#isFenLou").attr("checked") == "checked") {
        var src = "";
        $("#picUploadArea li").each(function(key, val) {
            var picid = $(this).attr("id").substring(3);
            src += $(this).find("img").attr("src") + "#" + picid + ","
        });
        src = src.replace(/,$/, "");
        $("#fenLouArr").val(src)
    }

	var image = Publish_Config.image || '';

	/*
    $("#picUploadArea li").each(function(key, val) {
		image = $(this).find("img").attr("src");
		return false;
    });
	*/
 
    var fenlou = $("#fenLouArr").val();
    var p_size = parseInt($("#picSize").text()),
        book_type = Publish_Config.book_type || 0;
    var data = {
        title: title,
		image: image,
        content: content,
        cateid: Publish_Config.cateid,
        boardid: Publish_Config.boardid,
        manuid: Publish_Config.manuid,
        subid: Publish_Config.subid,
        book_type: book_type,
        productid: Publish_Config.productid,
        attachment: attachment,
        highlight: highlight,
        toptype: toptype,
        reply_reward: reply_reward,
        reply_num: reply_num,
        each_receive: each_receive,
        reward_chance: reward_chance,
        code: code,
        share: share,
        bbsid: Publish_Config.bbsid,
        fenlou: fenlou,
        size: p_size
    };
    var share = [];
    $("#bookShare").find("input").each(function(k, v) {
        if ($(v).val()) {
            share.push($(v).val())
        }
    });
    data.share = share.join("|");
    FB.num++;
    data.num = FB.num;
    if (active == 1) {
        var is_pass = Active.verify();
        if (!is_pass) {
            return false
        }
        if (typeof Publish_Config.activeType != "undefined" && Publish_Config.activeType == "try") {
            isTry = 1
        }
        if (isTry == 1) {
            is_pass = Active.tryVerify();
            if (!is_pass) {
                Layer.showTips({
                    type: "warn",
                    content: "\u60a8\u6709\u5fc5\u9009\u9879\u672a\u586b\u5199\uff0c\u8bf7\u8fd4\u56de\u4fee\u6539"
                });
                return false
            }
            data.isTry = 1
        }
        data.active = 1;
        data.active_info = $("#activeForm").serializeJson()
    }
    return data
};
FB.editVerify = function() {
    var active = 0,
        isTry = 0;
    if (typeof Edit_Config.bookType != "undefined" && Edit_Config.bookType == "active") {
        active = 1
    }
    var tot_score = 0;
    var title = $("#titleInput").val();
    if (!title) {
        Layer.showTips({
            type: "warn",
            content: "\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a~"
        });
        return false
    }
    if (App.mbStrLen(title) >= 80) {
        Layer.showTips({
            type: "warn",
            content: "\u6807\u9898\u8fc7\u957f~"
        });
        return false
    }
    var highlight = $("#highLight").val();
    if (highlight == "0") {
        if ($("#titleColorSet").attr("checked") == "checked") {
            tot_score += FB.ToHighlight;
            var color = $("#titleColor span").css("background-color");
            if (color == "rgb(7, 140, 253)") {
                highlight = 1
            } else {
                if (color == "rgb(30, 226, 95)") {
                    highlight = 2
                }
            }
        }
    }
    var toptype = $("#topType").val();
    if (toptype == "0") {
        if ($("#postSetTop").attr("checked") == "checked") {
            tot_score += FB.ToTop;
            toptype = 4
        }
    }
    var content = ue.getContent();
    var con_len = ue.getContentTxt().length;
    if (!content) {
        Layer.showTips({
            type: "warn",
            content: "\u5e16\u5b50\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\u54df~"
        });
        return false
    }
    if (con_len < FB.MinConLen || con_len >= FB.MaxConLen) {
        Layer.showTips({
            type: "warn",
            content: "\u7cfb\u7edf\u9650\u5236: " + FB.MinConLen + " \u5230 " + FB.MaxConLen + " \u5b57\u3002"
        });
        return false
    }
    if ($(".post-classify").length) {
        if (!Edit_Config.book_type) {
            Layer.showTips({
                type: "warn",
                content: "\u8bf7\u9009\u62e9\u5e16\u5b50\u7c7b\u578b~"
            });
            return false
        }
    }
    var code = $("#verifyCode input").val();
    var user_score = parseInt($("#userScore").val());
    if (tot_score > user_score) {
        Layer.showTips({
            type: "warn",
            content: "\u60a8\u7684\u91d1\u8c46\u4e0d\u8db3~"
        });
        return false
    }
    var data = {
        title: title,
        content: content,
        boardid: Edit_Config.boardid,
        bookid: Edit_Config.bookid,
        highlight: highlight,
        toptype: toptype,
        code: code,
        bbsid: Edit_Config.bbsid,
        book_type: Edit_Config.book_type,
        subid: Edit_Config.subid,
        manuid: Edit_Config.manuid,
        productid: Edit_Config.productid
    };
    if (active == 1) {
        var is_pass = Active.verify();
        if (!is_pass) {
            return false
        }
        if (typeof Edit_Config.activeType != "undefined" && Edit_Config.activeType == "try") {
            isTry = 1
        }
        if (isTry == 1) {
            is_pass = Active.tryVerify();
            if (!is_pass) {
                Layer.showTips({
                    type: "warn",
                    content: "\u60a8\u6709\u5fc5\u9009\u9879\u672a\u586b\u5199\uff0c\u8bf7\u8fd4\u56de\u4fee\u6539"
                });
                return false
            }
            data.isTry = 1
        }
        data.active = 1;
        data.active_info = $("#activeForm").serializeJson()
    }
    return data
};
FB.editBook = function(data) {
    if (!data || typeof data != "object") {
        return false
    }
    data.attach_info = $("#attachForm").serialize();
    data.atuser = FB.getAtUser();
    $.post("/index.php?c=Ajax_Publish&a=editBook", data,
        function(json) {
            if (json.info == "err") {
                Layer.showTips({
                    type: "warn",
                    content: json.msg
                });
                $("#editBookBtn").text("\u4fdd\u5b58");
                $("#editBookBtn").removeClass("btn-loading");
                return false
            } else {
                if (json.info == "ok") {
                    var matchtry = document.referrer.match(/http:\/\/try(.[a-zA-Z]+.test)?.zol.com.cn/);
                    if (matchtry) {
                        window.location.href = document.referrer
                    } else {
                        window.location.href = json.url
                    }
                }
            }
        },
        "json")
};
FB.listQuickPbBook = function(type) {
    var title = $("#quickPbTitle").val().replace(/\s*/, "");
    var content = ue.getContent().replace(/\s*/, "");
    var con_len = ue.getContentTxt().length;
    if (!title) {
        Layer.showTips({
            type: "warn",
            content: "\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a~"
        });
        return false
    }
    if (App.mbStrLen(title) >= 80) {
        Layer.showTips({
            type: "warn",
            content: "\u6807\u9898\u8fc7\u957f~"
        });
        return false
    }
    if (!content) {
        Layer.showTips({
            type: "warn",
            content: "\u5e16\u5b50\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\u54df~"
        });
        return false
    }
    if (con_len < FB.MinConLen || con_len >= FB.MaxConLen) {
        Layer.showTips({
            type: "warn",
            content: "\u7cfb\u7edf\u9650\u5236: " + FB.MinConLen + " \u5230 " + FB.MaxConLen + " \u5b57\u3002"
        });
        return false
    }
    if ($(".post-classify").length) {
        if (!PbBook_Config.bookType && (typeof Publish_Config == "undefined" || !Publish_Config.book_type)) {
            Layer.showTips({
                type: "warn",
                content: "\u8bf7\u9009\u62e9\u5e16\u5b50\u7c7b\u578b~"
            });
            return false
        }
    }
    var code = $("#verifyCode input").val(),
        book_type = PbBook_Config.bookType || (typeof Publish_Config != "undefined" && Publish_Config.book_type) || 0;
    var data = {
        "cateid": PbBook_Config.cateid,
        "boardid": PbBook_Config.boardid,
        "subid": PbBook_Config.subid,
        "manuid": PbBook_Config.manuid,
        "book_type": book_type,
        "productid": PbBook_Config.productid,
        "bbsid": PbBook_Config.bbsid,
        "code": code,
        "title": title,
        "content": content
    };
    return data
};
FB.getConFromList = function() {
    //$.post("/bbs/store?c=Ajax_Publish&a=getConFromList", {},
    //    function(json) {
    //        if (json.info == "ok" && json.data) {
    //            $("#titleInput").val(json.data.title);
    //            ue.setContent(json.data.content)
    //        }
    //    },
    //    "json")
};
FB.publishBook = function(data) {
    if (!data || typeof data != "object") {
        return false
    }
    FB.isCurPublish = 1;
    data.attach_info = $("#attachForm").serialize();
    data.atuser = FB.getAtUser();
	data.is_top = 0;
	if( $('#is_top').val() == 1 || $('#is_top').val() == 2 ) {
		data.is_top = $('#is_top').val();
	}

	if( $('#is_excellent').attr("checked") == "checked" ) {
		data.is_excellent = 1;
	} else {
		data.is_excellent = 0;
	}

	if( $('#is_stick').attr("checked") == "checked" ) {
		data.is_stick = 1;
	} else {
		data.is_stick = 0;
	}

    var url = "/topics";
    var publishtype = "POST";
    if( Publish_Config.topic_id != 0 ) {
        var url = "/topics/"+Publish_Config.topic_id;
        publishtype = "PATCH";
    }
    $.ajax({
        url: url + "?t=" + (new Date()).getTime(),
        data: data,
        type: publishtype,
        success: function (json) {
            if (json.info == "err") {
                Layer.showTips({
                    type: "warn",
                    content: json.msg,
                    disappear: 5000
                });
                $("#publishBookBtn").text("\u53d1\u8868");
                $("#publishBookBtn").removeClass("btn-loading");
                FB.isCurPublish = 0;
                return false
            } else {
                if (json.info == "ok") {
                    FB.isCurPublish = 0;
                    var url = json.url;
                    $("#publishBookBtn").text("\u53d1\u8868\u6210\u529f");
                    $("#pbBookBtn").text("\u53d1\u8868\u6210\u529f");
                    Layer.alert({
                        content: json.tips,
                        nextLine: FB.replyTips
                    });
                    if (location.search && location.search.search("f=") > 0 && typeof taskGuide !== "undefined") {
                        taskGuide.jumpTo(location.href.toString(), 5500)
                    } else {
                        setTimeout(function () {
                                window.location.href = url
                            },
                            5500)
                    }
                }
            }
        },
    });
};
FB.pbReply = function() {
    var content = ue.getContent();
    var con_len = ue.getContentTxt().length;
    if (!content) {
        Layer.showTips({
            type: "warn",
            content: "\u56de\u590d\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\u54df~"
        });
        return false
    }
    if (con_len < FB.replyMinLen) {
        Layer.tips({
            content: "<p>\u5185\u5bb9\u8fc7\u5c11~</p>"
        });
        return false
    }
    var code = $("#verifyCode input").val();
    var data = {
        boardid: Edit_Config.boardid,
        bookid: Edit_Config.bookid,
        bbsid: Edit_Config.bbsid,
        toid: Edit_Config.toid,
        picid: Edit_Config.picid,
        content: content,
        jump: "last"
    };
    data.attach_info = $("#attachForm").serialize();
    data.atuser = FB.getAtUser();
    $.post("/index.php?c=Ajax_Publish&a=publishReply&t=" + (new Date()).getTime(), data,
        function(json) {
            if (typeof json != "undefined" || !json) {
                if (json.info == "ok") {
                    var url = (json.url + "#" + json.anchor).toString();
                    Layer.alert({
                        content: json.tips,
                        nextLine: FB.replyTips
                    });
                    setTimeout(function() {
                            window.location.href = url
                        },
                        1500)
                } else {
                    if (json.info == "err") {
                        Layer.tips({
                            content: "<p>" + json.msg + "</p>"
                        });
                        return false
                    }
                }
            }
        },
        "json");
    $("#pbReplyBtn").text("\u53d1\u8868\u4e2d");
    $("#pbReplyBtn").addClass("btn-loading")
};
FB.editReply = function() {
    var content = ue.getContent();
    var con_len = ue.getContentTxt().length;
    if (!content) {
        Layer.showTips({
            type: "warn",
            content: "\u56de\u590d\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\u54df~"
        });
        return false
    }
    var code = $("#verifyCode input").val();
    var data = {
        boardid: Edit_Config.boardid,
        bookid: Edit_Config.bookid,
        bbsid: Edit_Config.bbsid,
        replyid: Edit_Config.replyid,
        floor: Edit_Config.floor,
        content: content
    };
    data.attach_info = $("#attachForm").serialize();
    data.atuser = FB.getAtUser();
    $.post("/index.php?c=Ajax_Publish&a=editReply", data,
        function(json) {
            if (typeof json != "undefined" || !json) {
                if (json.info == "ok") {
                    var url = (json.url + "#" + json.anchor).toString();
                    window.location.href = url
                } else {
                    if (json.info == "err") {
                        Layer.tips({
                            content: "<p>" + json.msg + "</p>"
                        });
                        return false
                    }
                }
            }
        },
        "json")
};
FB.showEmotion = function(type, selector, callback) {
    FB.hiddenAllLayer();
    if ($("#zolEmotionLayer").length) {
        $("#zolEmotionLayer").remove()
    }
    var _baseurl = "http://icon.zol-img.com.cn/blog/editimage/smilies/";
    var _html = '<div class="popbox" id="zolEmotionLayer" style="width:600px;display:none;">';
    _html += '<div class="popbox-inner"><div class="popbox-head">';
    _html += '<span class="popbox-close border-radius" onclick="javascript:$(\'#zolEmotionLayer\').hide();">\u5173\u95ed</span>';
    _html += '<h3><i class="line"></i>\u8868\u60c5\u5e93</h3></div>';
    _html += '<div class="popbox-main"><div class="add_face"><div class="face_class">';
    _html += '<ul id="zolEmotionTab">';
    if (typeof type == "undefined") {
        var type = 1
    }
    if (typeof callback == "undefined") {
        var callback = function() {}
    }
    if ($(selector).length > 0) {
        var con_obj = selector
    } else {
        var con_obj = ""
    }
    switch (type) {
        case 1:
            var func = "FB.insertEmotion";
            break;
        case 2:
            var func = "FB.insertEmotionMark";
            break;
        default:
            var func = "FB.insertEmotionMark";
            break
    }
    App.loadScript(App.Js_Url + "public/emotion.js",
        function() {
            for (var key in Zol_Emotion_Type) {
                _html += '<li id="emotionTab_' + (key) + '" onclick="javascript:FB.swEmotionTab(this,' + key + ');"><a><img height="20" align="absmiddle" width="20" alt="" src="' + _baseurl + "main_pic/" + Zol_Emotion_Type[key][1] + '.gif">' + Zol_Emotion_Type[key][0] + "</a></li>"
            }
            _html += "</ul></div>";
            for (var i = 1; i <= 5; i++) {
                _html += '<ul class="face_show" id="emotionList_' + i + '" style="display:none;">';
                for (var key in Zol_Emotion_List[i]) {
                    _html += '<li><img height="50" width="50" alt="" src="' + _baseurl + Zol_Emotion_Type[i][1] + "/" + Zol_Emotion_List[i][key][2] + '" onclick="javascript:' + func + "(this,'" + Zol_Emotion_List[i][key][1] + "','" + con_obj + "')\"><br>" + Zol_Emotion_List[i][key][7] + "</li>"
                }
                _html += "</ul>"
            }
            _html += "</div></div></div></div>";
            $("body").append(_html);
            $("#emotionTab_1").addClass("first");
            App.toCenter("#zolEmotionLayer");
            FB.swEmotionTab($("#emotionTab_2").get(0), 2);
            callback();
            $("#zolEmotionLayer").show()
        })
};
FB.swEmotionTab = function(obj, num) {
    $("#zolEmotionTab li").removeClass("now");
    $(obj).addClass("now");
    $("#zolEmotionLayer .face_show").hide();
    var selector = "#emotionList_" + num;
    $(selector).show()
};
FB.formatFaceContent = function(content) {
    var con_arr = content.match(/{:[0-9]{1,3}_[0-9]{1,3}:}/ig);
    if (typeof con_arr == "object" && con_arr) {
        var len = con_arr.length;
        for (var i = 0; i < len; i++) {
            var str = con_arr[i].match(/[0-9]{1,3}_[0-9]{1,3}/ig)[0];
            var face_arr = str.split("_");
            var groupid = parseInt(face_arr[0]);
            var itemid = parseInt(face_arr[1]);
            var img_src = '<img height="50" width="50" src="http://icon.zol-img.com.cn/blog/editimage/smilies/' + groupid + "/" + itemid + '.gif" />';
            content = content.replace(con_arr[i], img_src)
        }
    }
    return content
};
FB.insertEmotionMark = function(obj, mark, con_obj) {
    if (typeof con_obj != "undefined") {
        var obj = $(con_obj).get(0);
        var str = mark;
        if (document.selection) {
            obj.focus();
            var sel = document.selection.createRange();
            sel.text = str
        } else {
            if (typeof obj.selectionStart === "number" && typeof obj.selectionEnd === "number") {
                var startPos = obj.selectionStart;
                var endPos = obj.selectionEnd;
                var tmpStr = obj.value;
                obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
            } else {
                obj.value += str
            }
        }
        $("#zolEmotionLayer").hide()
    }
};
FB.insertEmotion = function(obj, mark, con_obj) {
    var _imgurl = $(obj).attr("src");
    var _html = '<img height="50" width="50" src="' + _imgurl + '" />';
    ue.execCommand("insertHtml", _html);
    $("#zolEmotionLayer").hide()
};
FB.insertHidden = function() {
    var _content = ue.getContent();
    var _hidden_str = '<img src="' + FB.HiddenImg + '" />';
    if (_content.indexOf(FB.HiddenImg) != -1) {
        Layer.showTips({
            type: "warn",
            content: "\u60a8\u5df2\u6dfb\u52a0\u56de\u590d\u53ef\u89c1\uff0c\u4e00\u4e2a\u5e16\u5b50\u53ea\u80fd\u6dfb\u52a0\u4e00\u4e2a\u54e6~"
        })
    } else {
        ue.execCommand("insertHtml", _hidden_str)
    }
};
FB.showBlockquote = function() {
    FB.hiddenAllLayer();
    if ($("#zolBlockquoteLayer").length) {
        $("#zolBlockquoteLayer").show();
        return
    }
    var _html = '<div class="popbox" id="zolBlockquoteLayer" style="display:none;">				    <div class="popbox-inner">				        <div class="popbox-head">				            <span class="popbox-close border-radius" onclick="javascript:$(\'#zolBlockquoteLayer\').hide();">\u5173\u95ed</span>				            <h3><i class="line"></i>\u6dfb\u52a0\u5f15\u7528\u6587\u5b57</h3>				        </div>				        <div class="popbox-main">				            <div class="pop-add-text">				                <textarea class="add-text-area border-radius" name="" id="zolBlockquoteCon" cols="30" rows="10">\u8bf7\u8f93\u5165\u8981\u63d2\u5165\u7684\u5f15\u7528</textarea>				                <div class="popbox-btns">								    <span class="btn-blue border-radius" onclick="javascript:FB.insertBlockquote();">\u63d2\u5165</span>								    <span class="btn-gray border-radius" onclick="javascript:$(\'#zolBlockquoteLayer\').hide();">\u53d6\u6d88</span>								</div>				            </div>				        </div>				    </div>				</div>';
    $("body").append(_html);
    $("#zolBlockquoteCon").bind({
        focus: function() {
            $(this).val("")
        },
        blur: function() {}
    });
    App.toCenter("#zolBlockquoteLayer");
    $("#zolBlockquoteLayer").show()
};
FB.insertBlockquote = function() {
    var _con = $("#zolBlockquoteCon").val();
    if (!_con) {
        return false
    }
    var _html = "<blockquote><p>" + _con + "</p></blockquote>";
    ue.execCommand("insertHtml", _html);
    $("#zolBlockquoteLayer").hide();
    $("#zolBlockquoteCon").val("\u8bf7\u8f93\u5165\u8981\u63d2\u5165\u7684\u5f15\u7528")
};
FB.showCode = function() {
    FB.hiddenAllLayer();
    if ($("#zolCodeLayer").length) {
        App.toCenter("#zolCodeLayer");
        $("#zolCodeLayer").show();
        return
    }
    var _html = '<div class="popbox" id="zolCodeLayer" style="display:none;">                    <div class="popbox-inner">                        <div class="popbox-head">                            <span class="popbox-close border-radius" onclick="javascript:$(\'#zolCodeLayer\').hide();">\u5173\u95ed</span>                            <h3><i class="line"></i>\u6dfb\u52a0\u5f15\u7528\u4ee3\u7801</h3>                        </div>                        <div class="popbox-main">                            <div class="pop-add-text">                                <textarea class="add-text-area border-radius" name="" id="zolCodeCon" cols="30" rows="10">\u8bf7\u8f93\u5165\u8981\u63d2\u5165\u7684\u4ee3\u7801</textarea>                                <div class="popbox-btns">                                    <span class="btn-blue border-radius" onclick="javascript:FB.insertCode();">\u63d2\u5165</span>                                    <span class="btn-gray border-radius" onclick="javascript:$(\'#zolCodeLayer\').hide();">\u53d6\u6d88</span>                                </div>                            </div>                        </div>                    </div>                </div>';
    $("body").append(_html);
    $("#zolCodeCon").bind({
        focus: function() {
            $(this).val("")
        },
        blur: function() {}
    });
    App.toCenter("#zolCodeLayer");
    $("#zolCodeLayer").show()
};
FB.insertCode = function() {
    var _con = $("#zolCodeCon").val();
    var _html = "";
    if (!_con) {
        return false
    }
    if (_con.match(/id="cbsi_survey"/)) {
        var patt = new RegExp(/src="http:\/\/icon.zol-img.com.cn\/survey\/js\/(survey_interface\d+\.js)"[^\(]*\(([^\)]*)\)/);
        patt.exec(_con);
        var param1 = RegExp.$1;
        var param2 = RegExp.$2;
        if (param1 && param2) {
            param2 += ',"' + param1 + '"';
            if (param2.split(",").length == 4) {
                _html = "[SURVEY]" + param2 + "[/SURVEY]"
            }
        }
    } else {
        if (_con.match(/id="vote_(\d+)"/) || _con.match(/\?voteid=(\d+)/)) {
            var vid = _con.match(/id="vote_(\d+)"/) ? _con.match(/id="vote_(\d+)"/)[1] : _con.match(/\?voteid=(\d+)/)[1];
            _html = "[VOTE]" + vid + "[/VOTE]"
        } else {
            _html = $("<div />").text(_con).html()
        }
    }
    ue.execCommand("insertcode");
    ue.execCommand("inserthtml", _html);
    $("#zolCodeLayer").hide();
    $("#zolCodeCon").val("\u8bf7\u8f93\u5165\u8981\u63d2\u5165\u7684\u4ee3\u7801")
};
FB.showVideo = function() {
    FB.hiddenAllLayer();
    if ($("#zolVideoLayer").length) {
        App.toCenter("#zolVideoLayer");
        $("#zolVideoLayer").show();
        return
    }
    var _html = '<div class="popbox" style="display:none;" id="zolVideoLayer">				    <div class="popbox-inner">				        <div class="popbox-head">				            <span class="popbox-close border-radius" onclick="javascript:$(\'#zolVideoLayer\').hide();">\u5173\u95ed</span>				            <h3><i class="line"></i>\u63d2\u5165\u89c6\u9891</h3>				        </div>				        <div class="popbox-main">				            <div class="insert-video-pop">				                <div class="insert-video clearfix">				                    <label class="videoUrl" for="videoUrl">\u8bf7\u8f93\u5165\u89c6\u9891\u5730\u5740\uff1a<input class="text border-radius" id="videoUrl" type="text" value=""></label>				                    <label for="videoWidth">\u5bbd\u5ea6\uff1a<input id="videoWidth" class="text border-radius" disabled="disabled" type="text" value="600"></label>				                    <label for="videoHeight">\u9ad8\u5ea6\uff1a<input id="videoHeight" class="text border-radius" disabled="disabled" type="text" value="450"></label>				                    <div class="insert-video-tip">				                        <p>\u652f\u6301\u4f18\u9177\u3001\u571f\u8c46\u300156\u3001\u91776\u7b49\u89c6\u9891\u7ad9\u7684\u89c6\u9891\u7f51\u5740</p>				                        <p>\u652f\u6301wmv  avi  rmvb  mov  swf  flv\u7b49\u89c6\u9891\u683c\u5f0f</p>				                        <p>\u63d0\u793a\uff1ahtt://server/movie.wmv</p>				                    </div>				                </div>				                <div class="popbox-btns">								    <span class="btn-blue border-radius" onclick="javascript:FB.insertVideo();">\u786e\u5b9a</span>									<span class="btn-gray border-radius" onclick="javascript:$(\'#zolVideoLayer\').hide();">\u53d6\u6d88</span>								</div>				            </div>				        </div>				    </div>				</div>';
    $("body").append(_html);
    $("#videoUrl").bind({
        focus: function() {
            $(this).val("")
        }
    });
    App.toCenter("#zolVideoLayer");
    $("#zolVideoLayer").show()
};
function convert_url(url) {
    if (!url) {
        return ""
    }
    url = url.replace(/(www\.)?youtube\.com\/watch\?v=([\w\-]+)/i, "www.youtube.com/v/$2").replace(/youtu.be\/(\w+)$/i, "www.youtube.com/v/$1").replace(/v\.ku6\.com\/.+\/([\w\.]+)\.html.*$/i, "player.ku6.com/refer/$1/v.swf").replace(/www\.56\.com\/u\d+\/v_([\w\-]+)\.html/i, "player.56.com/v_$1.swf").replace(/www.56.com\/w\d+\/play_album\-aid\-\d+_vid\-([^.]+)\.html/i, "player.56.com/v_$1.swf").replace(/v\.pps\.tv\/play_([\w]+)\.html.*$/i, "player.pps.tv/player/sid/$1/v.swf").replace(/www\.letv\.com\/ptv\/vplay\/([\d]+)\.html.*$/i, "i7.imgs.letv.com/player/swfPlayer.swf?id=$1&autoplay=0").replace(/www\.tudou\.com\/programs\/view\/([\w\-]+)\/?/i, "www.tudou.com/v/$1").replace(/v\.qq\.com\/cover\/[\w]+\/[\w]+\/([\w]+)\.html/i, "static.video.qq.com/TPout.swf?vid=$1").replace(/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, "static.video.qq.com/TPout.swf?vid=$1").replace(/my\.tv\.sohu\.com\/[\w]+\/[\d]+\/([\d]+)\.shtml.*$/i, "share.vrs.sohu.com/my/v.swf&id=$1");
    var matches = url.match(/youtu.be\/(\w+)$/) || url.match(/youtube\.com\/watch\?v=(\w+)/) || url.match(/youtube.com\/v\/(\w+)/),
        youku = url.match(/youku\.com\/v_show\/id_(\w+)/),
        youkuPlay = /player\.youku\.com/ig.test(url);
    if (!youkuPlay) {
        if (matches) {
            url = "https://www.youtube.com/v/" + matches[1] + "?version=3&feature=player_embedded"
        } else {
            if (youku) {
                url = "http://player.youku.com/player.php/sid/" + youku[1] + "/v.swf"
            } else {}
        }
    } else {
        url = url.replace(/\?f=.*/, "")
    }
    var types = url.match(/http:\/\/www.tudou\.com\/(.*)?\/(.*)?/);
    if (!types) {
        return url
    }
    var method = types[1].substr(0, 1),
        str_arr = types[1].split("/"),
        count = str_arr.length,
        swf = "";
    method = method == "p" ? "v": method;
    if (count == 1) {
        var id = types[2].split(".")[0]
    } else {
        if (count == 2) {
            var id = str_arr[1]
        } else {
            if (count == 3) {
                var id = str_arr[2]
            }
        }
    }
    swf = "http://www.tudou.com/" + method + "/" + id + "/v.swf";
    return swf ? swf: url
}
FB.insertVideo = function() {
    var _url = $("#videoUrl").val();
    if (!_url) {
        Layer.showTips({
            type: "warn",
            content: "\u89c6\u9891\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a~"
        });
        return false
    }
    _url = convert_url(_url);
    var _width = parseInt($("#videoWidth").val()) ? parseInt($("#videoWidth").val()) : 600;
    var _height = parseInt($("#videoHeight").val()) ? parseInt($("#videoHeight").val()) : 450;
    var videoAttr = {
        url: _url,
        width: _width,
        height: _height
    };
    ue.execCommand("insertvideo", videoAttr);
    ue.execCommand("inserthtml", "<p></p>");
    $("#zolVideoLayer").hide()
};
FB.showWordformat = function() {
    FB.hiddenAllLayer();
    if ($("#zolWordformatLayer").length) {
        $("#zolWordformatLayer").show();
        return
    }
    var _html = '<div class="popbox" style="display:none;" id="zolWordformatLayer">				    <div class="popbox-inner">				        <div class="popbox-head">				            <span class="popbox-close border-radius" onclick="javascript:$(\'#zolWordformatLayer\').hide();">\u5173\u95ed</span>				            <h3><i class="line"></i>\u4eceword\u7c98\u8d34\u5185\u5bb9</h3>				        </div>				        <div class="popbox-main">				            <div class="pop-word-text">				                <textarea class="add-text-area border-radius" name="" id="zolWordformatCon" cols="30" rows="10"></textarea>				                <div class="popbox-btns">								    <span class="btn-blue border-radius" onclick="javascript:FB.insertWordformat();">\u786e\u5b9a</span>									<span class="btn-gray border-radius" onclick="javascript:$(\'#zolWordformatLayer\').hide();">\u53d6\u6d88</span></div>				            </div>				        </div>				    </div>				</div>';
    $("body").append(_html);
    App.toCenter("#zolWordformatLayer");
    $("#zolWordformatLayer").show()
};
FB.insertWordformat = function() {
    var _con = $("#zolWordformatCon").val();
    FB.pasteWord(_con);
    $("#zolWordformatLayer").hide()
};
FB.pasteWord = function(str) {
    var mstest = /<\w[^>]* class="?[MsoNormal|xl]"?/gi;
    str = str.replace(/<!--\[if[\s\S]+?<!\[endif\]-->/gi, "");
    str = str.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
    str = str.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi,
        function($1, $2, $3, $4) {
            var style = "";
            re = new RegExp("(^|[;\\s])color:\\s*([^;]+);?", "ig");
            match = re.exec($3);
            if (match != null) {
                style += "color:" + match[2] + ";"
            }
            re = new RegExp("(^|[;\\s])text-indent:\\s*([^;]+);?", "ig");
            match = re.exec($3);
            if (match != null) {
                style += "text-indent:" + parseInt(parseInt(match[2]) / 10) + "em;"
            }
            re = new RegExp("(^|[;\\s])font-size:\\s*([^;]+);?", "ig");
            match = re.exec($3);
            if (match != null) {
                style += "font-size:" + match[2] + ";"
            }
            if (style) {
                style = ' style="' + style + '"'
            }
            return "<" + $2 + style + $4
        });
    str = str.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
    str = str.replace(/<\\?\?xml[^>]*>/gi, "");
    str = str.replace(/<\/?\w+:[^>]*>/gi, "");
    str = str.replace(/&nbsp;/, " ");
    var re = new RegExp("(<P)([^>]*>.*?)(</P>)", "ig");
    str = str.replace(re, "<div$2</div>");
    str = FB.html2bbcode(str);
    ue.execCommand("insertHtml", str)
};
FB.html2bbcode = function() {};
FB.lastConLen = 0;
FB.autoSaveContent = function() {
    FB.saveContent(1);
    setTimeout(function() {
            FB.autoSaveContent()
        },
        30000)
};
FB.saveContent = function(n) {
    var _con = ue.getContent();
    var _len = _con.length,
        title = $("#titleInput").val();
    if (_len > 10 && FB.lastConLen != _len) {
        FB.lastConLen = _len;
        var data = {
            title: title,
            content: _con,
            bbsid: parseInt($("#bbsID").val())
        };
        $.post("index.php?c=Ajax_Publish&a=saveContent", data,
            function(json) {
                if (json.info == "ok") {
                    $("#edui1_saveInfo").html("\u6570\u636e\u5df2\u4e8e" + json.time + "\u4fdd\u5b58");
                    $("#edui1_saveInfo").show()
                }
            },
            "json")
    } else {
        if (n == 1) {
            var h = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
            var m = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
            $("#edui1_saveInfo").html("\u6570\u636e\u5df2\u4e8e" + h + ":" + m + "\u4fdd\u5b58")
        } else {
            $("#edui1_saveInfo").html("\u6570\u636e\u5df2\u4fdd\u5b58")
        }
    }
};
FB.getAutoSaveContent = function() {
    var data = {
        bbsid: parseInt($("#bbsID").val())
    };
    $.post("index.php?c=Ajax_Publish&a=getSaveContent", data,
        function(json) {
            if (json.info == "ok") {
                $("#titleInput").val(json.title);
                ue.setContent(json.data);
                $("#edui1_saveInfo").html("\u6570\u636e\u5df2\u6062\u590d")
            }
        },
        "json")
};
FB.delUploadPic = function(picid) {
    if (picid) {
        var _tar = "#li_" + picid;
        $(_tar).remove()
    } else {
        $("#picUploadArea").empty()
    }
    $("#preview").hide()
};
FB.editUploadPic = function(picurl, picid) {
    var url = "http://bbs.zol.com.cn";
    var src = picurl.replace("t_s80x60", "");
    var left = $("#picUploadArea").closest("div").offset().left - $("#xiuxiuContainer").outerWidth();
    var top = $("#picUploadArea").closest("div").offset().top - 10;
    $("#xiuxiuContainer").css({
        position: "absolute",
        top: top,
        left: left
    });
    $("#xiuxiuContainer").show();
    xiuxiu.embedSWF("xiuxiuFlash", 1, "100%", "100%");
    xiuxiu.setUploadArgs({
        "bbsid": $("#bbsID").val()
    });
    xiuxiu.setUploadURL(url + "/index.php?c=Ajax_Upload&a=uploadImage");
    xiuxiu.setUploadType(2);
    xiuxiu.onBeforeUpload = function(data) {};
    xiuxiu.onInit = function() {
        xiuxiu.loadPhoto(src)
    };
    xiuxiu.onUploadResponse = function(data) {
        if (data) {
            $("#li_" + picid).remove();
            swfUpload.handleServerData(data);
            $("#xiuxiuContainer").hide()
        }
    };
    xiuxiu.onClose = function(id) {
        $("#xiuxiuContainer").hide()
    }
};
FB.insertUploadPic = function(picurl, obj, picid, backhtml, suffix, hasCustWater) {
    if (!picurl) {
        return false
    }
    var sReplace = hasCustWater ? "t_s800x800_b" + hasCustWater: "t_s800x800";
    var _img = picurl.replace("t_s80x60", sReplace),
        _size = parseInt($("#picSize").text()),
        _isMark = $("#isWaterMark").attr("checked") == "checked" ? 1: 0;
    if (isNaN(_size)) {
        _size = 800
    }
    if (_size == 1200) {
        _img = _img.replace("t_s800x800", "t_s1200x1200")
    } else {
        if (_size == 240) {
            _img = _img.replace("t_s800x800", "t_s240x240")
        } else {
            if (_size == 500) {
                _img = _img.replace("t_s800x800", "t_s500x500")
            }
        }
    }
    if ($("#isExif").attr("checked")) {
        var _exif = $(obj).parent().attr("data-exif")
    } else {
        var _exif = ""
    }
    var _html = '<br><img data-source="upload" datasrc="' + suffix + '" src="' + _img + '" data-picid="' + picid + '" data-info="' + _size + "#" + _isMark + '"/>';
    if (_exif) {
        _html += '<br><span style="font-size:12px;">' + _exif + "</span><br>"
    }
    if (backhtml) {
        return _html
    }
    ue.execCommand("insertHtml", _html);
    $(obj).parents("li").addClass("has-insert").append('<span class="has-insert-mask"><i></i></span>')
};
FB.insertAllPic = function() {
    var all_pic = $("#picUploadArea li");
    if (all_pic.length == 0) {
        alert("\u8bf7\u9009\u62e9\u56fe\u7247");
        return
    } else {
        var html = "";
        $("#picUploadArea li").each(function() {
            var src = $(this).find("input").val();
            var id = $(this).attr("id").substring(3);
            var suffix = src.substr(src.indexOf("/g") + 1);
            html += FB.insertUploadPic(src, $(this).find(".insert-btn").get(0), id, 1, suffix)
        });
        ue.execCommand("insertHtml", html)
    }
};
FB.showPicSortLayer = function() {
    if ($("#picSortLayer").length) {
        return
    }
    var _html = '<div class="popbox" style="display:none;" id="picSortLayer">	    <div class="popbox-inner">	        <div class="popbox-head">	            <span class="popbox-close border-radius" onclick="javascript:$(\'#picSortLayer\').hide();">\u5173\u95ed</span>	            <h3><i class="line"></i>\u56fe\u7247\u6392\u5e8f<span>\u6210\u529f\u4e0a\u4f20<em id="picSortSize"></em>\u5f20</span></h3>	        </div>	        <div class="popbox-main">	            <div class="scroll-box">	                <div class="scroll">	                    <ul class="pic-sortlist clearfix" id="picSortUl">	                        <li class="hover">	                            <img src="" alt="" width="72" height="54">	                            <span class="mask-layer">\u62d6\u62fd\u6392\u5e8f</span>	                        </li>	                    </ul>	                </div>	            </div>	            <div class="popbox-btns">		           <span class="btn-blue border-radius" onclick="javascript:FB.doSortPic();">\u786e\u5b9a</span>				   <span class="btn-gray border-radius" onclick="javascript:$(\'#picSortLayer\').hide();">\u53d6\u6d88</span></div>	        </div>	    </div>	</div>';
    $("body").append(_html)
};
FB.reSortPic = function() {
    FB.showPicSortLayer();
    var size = $("#picUploadArea li").size();
    if (!size) {
        return false
    }
    $("#picSortUl").empty();
    $("#picSortSize").text(size);
    $("#picUploadArea li").each(function() {
        var src = $(this).find("input").val();
        var id = $(this).attr("id").substring(3);
        var str = "";
        str += '<li id="li_sort_' + id + '">';
        str += '<img width="72" height="54" alt="" src="' + src + '" />';
        str += '<span class="mask-layer">\u62d6\u62fd\u6392\u5e8f</span></li>';
        $("#picSortUl").append(str)
    });
    App.toCenter("#picSortLayer");
    $("#picSortUl").sortable({
        delay: 100,
        cursor: "move",
        items: "li",
        opacity: 0.6,
        revert: true
    });
    $("#picSortUl").disableSelection();
    $("#picSortLayer").show()
};
FB.doSortPic = function() {
    var size = $("#picSortUl li").size();
    if (!size) {
        return false
    }
    if ($("#picUploadAreaBak").length) {
        $("#picUploadAreaBak").empty()
    } else {
        $("body").append('<div id="picUploadAreaBak" style="display:none;"></div>')
    }
    $("#picSortUl li").each(function() {
        var id = $(this).attr("id").substring(8);
        $("#li_" + id).clone().appendTo($("#picUploadAreaBak"))
    });
    $("#picSortLayer").hide();
    $("#picUploadArea").html($("#picUploadAreaBak").html())
};
FB.createAttachment = function() {
    fileSize = WEB_CONFIG.attachFilesize || "5MB";
    var _html = '<div class="popbox" style="display:none;" id="zolAttachLayer">        <div class="popbox-inner">            <div class="popbox-head">                <span class="popbox-close border-radius" onclick="javascript:$(\'#zolAttachLayer\').hide();">\u5173\u95ed</span>                <h3><i class="line"></i>\u4e0a\u4f20\u9644\u4ef6</h3>            </div>            <div class="popbox-main">                <div class="upload-attach">                    <div class="attach-func clearfix">                        <div class="color-set">                            <label for="postSetTopAttach">                                <input id="postSetTopAttach" type="checkbox">                                <span class="color-title">\u53d1\u5e03\u6536\u8d39\u9644\u4ef6</span>                            </label>                            <span class="color-set-tip">\uff01\u9700\u6d88\u80175Z\u91d1\u8c46</span>                        </div>                        <span class="btn-blue border-radius" id="uploadAttachBtn"></span>                    </div>                    <div class="attach-listbox">                        <div class="attach-list-head">                            <span class="file-name">\u6587\u4ef6\u540d\uff08<a href="javascript:;" onclick="FB.insertAttachment(0);">\u63d2\u5165\u5168\u90e8\u9644\u4ef6</a>\uff09</span>                            <span class="file-describe">\u63cf\u8ff0</span>                            <span class="file-price">\u552e\u4ef7</span>                        </div>                        <form id="attachForm"><ul class="attach-list" id="attachUploadArea"></ul></form>                        <div class="attach-tip">                            <i class="ico"></i>                            <p>\u70b9\u51fb\u9644\u4ef6\u6587\u4ef6\u540d\u6dfb\u52a0\u5230\u5e16\u5b50\u5185\u5bb9\u4e2d</p>							<p>\u6bcf\u5e16\u6700\u591a\u4e0a\u4f205\u4e2a\u9644\u4ef6\uff0c\u5355\u4e2a\u9644\u4ef6\u5c3a\u5bf8\u5c0f\u4e8e<em>' + fileSize + '</em>,\uff0c \u53ef\u7528\u6269\u5c55\u540d\uff1a<em> chm,zip,rar,tar,gif,jpg,png</em></p>                            <p>\u5355\u4e2a\u9644\u4ef6\u51fa\u552e\u6700\u9ad8\u6536\u5165\u4e0a\u9650\u4e3a 20 \u4e2aZ\u91d1\u8c46</p>                        </div>                    </div>                    <div class="popbox-btns">                       <span class="btn-blue border-radius" onclick="javascript:FB.insertAttachment(0);">\u786e\u5b9a</span>                       <span class="btn-gray border-radius" onclick="javascript:$(\'#zolAttachLayer\').hide();">\u53d6\u6d88</span></div>                </div>            </div>        </div>    </div>';
    $("body").append(_html);
};

FB.showAttachment = function() {
    FB.hiddenAllLayer();
    App.toCenter("#zolAttachLayer");
    var newtop = parseInt($("#zolAttachLayer").css("top")) - 40;
    $("#zolAttachLayer").css("top", newtop);
    $("#zolAttachLayer").show()
};
FB.insertAttachment = function(attachid) {
    var p = 0;
    $("#attachUploadArea .file-price").each(function(key, val) {
        var price = $(val).val();
        if (price && parseInt(price) > 20) {
            p++;
            $(this).val("");
            return
        }
        if (price && parseInt(price) < 0) {
            p++;
            $(this).val("");
            return
        }
    });
    if (p > 0) {
        Layer.showTips({
            type: "warn",
            content: "\u5355\u4e2a\u9644\u4ef6\u7684\u6700\u9ad8\u552e\u4ef7\u4e0d\u5f97\u9ad8\u4e8e20\u6216\u5c0f\u4e8e0Z\u91d1\u8c46~"
        });
        return false
    }
    if (attachid) {
        var _html = "[attach]" + attachid + "[/attach]";
        ue.execCommand("insertHtml", _html);
        $("#zolAttachLayer").hide()
    } else {
        if ($("#attachUploadArea li").length <= 0) {
            return false
        }
        var _html = "";
        $("#attachUploadArea li").each(function(key, val) {
            var attaid = $(val).attr("id").substr(7);
            _html += "[attach]" + attaid + "[/attach]"
        });
        ue.execCommand("insertHtml", _html);
        $("#zolAttachLayer").hide()
    }
    if (typeof FB.showJinDouTips != "undefined") {
        FB.showJinDouTips()
    }
};
FB.delUploadAttach = function(attachid) {
    var atta_stats = swfa.getStats();
    atta_stats.successful_uploads -= 1;
    swfa.setStats(atta_stats)
};
FB.hiddenAllLayer = function() {
    $("#zolEmotionLayer").hide();
    $("#zolAttachLayer").hide();
    $("#zolVideoLayer").hide();
    $("#zolBlockquoteLayer").hide();
    $("#zolCodeLayer").hide();
    $("#zolWordformatLayer").hide();
    $("#G_atUserLayer").hide()
};
FB.getAtUser = function() {
    var con = ue.getContent();
    var user = con.match(/@<a uid="([0-9_a-z]+)"/g),
        atu = "";
    if (user) {
        $.each(user,
            function(k, v) {
                atu += "#" + v.substring(9).replace('"', "")
            })
    }
    return atu.toString()
};
FB.atUser = function() {
    var _html = '<div class="popbox" style="display:none;" id="G_atUserLayer">		    <div class="popbox-inner">		        <div class="popbox-head">		            <span class="popbox-close border-radius" onclick="javascript:$(\'#G_atUserLayer\').remove();">\u5173\u95ed</span>		            <h3><i class="line"></i>@\u670b\u53cb</h3>		        </div>		        <div class="popbox-main">		            <div class="to-friend">		                <div class="to-friend-title">\u8bf7\u8f93\u5165\u7528\u6237\u6635\u79f0\uff1a</div>		                <input class="text border-radius" type="text" value="">		                <ul class="friend-list border-radius" id="G_atUserContainer"></ul>		                <ul class="friend-list border-radius" id="G_atUserContainerBak" style="display:none;"></ul>		                <div class="friend-tip">@\u670b\u53cb\u8d26\u53f7\uff0c\u63d0\u9192Ta\u6765\u770b\u5e16\u5b50</div>		                <div class="popbox-btns"><span class="btn-blue border-radius">\u786e\u5b9a</span><span class="btn-gray border-radius" onclick="javascript:$(\'#G_atUserLayer\').remove();">\u53d6\u6d88</span></div>		            </div>		        </div>		    </div>		</div>';
    $("body").append(_html);
    $("#G_atUserLayer .popbox-main").find("input").bind({
        keyup: function() {
            var v = $(this).val(),
                data = {
                    "kword": v
                };
            if (v == "") {
                $("#G_atUserLayer #G_atUserContainer").empty().append($("#G_atUserLayer #G_atUserContainerBak").html()).show();
                bindLiEvent($("#G_atUserContainer"));
                return false
            }
            $.post("/index.php?c=Ajax_User&a=searchUsers", data,
                function(json) {
                    if (json.info != "err") {
                        var _li = "";
                        $.each(json.data,
                            function(k, v) {
                                _li += '<li uid="' + v.userId + '" isf="' + v.isF + '">' + v.nickName + "</li>"
                            });
                        $("#G_atUserContainer").empty().append(_li).show();
                        bindLiEvent($("#G_atUserContainer"))
                    } else {
                        $("#G_atUserContainer").empty().hide()
                    }
                },
                "json")
        }
    });
    $("#G_atUserLayer .popbox-main").find(".btn-blue").bind({
        click: function() {
            var empty = $("#G_atUserContainer").text().length > 0 ? 0: 1;
            if (empty) {
                var nick = $("#G_atUserLayer .popbox-main").find("input").val();
                if (nick != "") {
                    $("#G_atUserContainer").html('<li style="color: red;">\u62b1\u6b49,\u8be5\u7528\u6237\u4e0d\u5b58\u5728~</li>').unbind().show();
                    return false
                }
            } else {
                $("#G_atUserLayer").remove()
            }
        }
    });
    $.post("/index.php?c=Ajax_User&a=getFriends", {},
        function(json) {
            if (typeof json != "undefined" || !json) {
                if (json.info == "err") {
                    Layer.tips({
                        content: "<p>" + json.msg + "</p>"
                    });
                    return false
                }
                if (json.info == "ok") {
                    var _li = "";
                    $.each(json.data,
                        function(key, val) {
                            _li += '<li uid="' + key + '" isF="1">' + val + "</li>"
                        });
                    $("#G_atUserLayer #G_atUserContainer").empty().append(_li);
                    bindLiEvent($("#G_atUserContainer"));
                    $("#G_atUserLayer #G_atUserContainerBak").empty().append(_li);
                    App.toCenter("#G_atUserLayer");
                    $("#G_atUserLayer").show()
                }
            }
        },
        "json");
    var bindLiEvent = function(ul) {
        $(ul).find("li").unbind().bind({
            click: function() {
                var self = $(this),
                    name = self.text(),
                    userid = self.attr("uid"),
                    isf = self.attr("isF"),
                    _html = '@<a uid="' + userid + '" href="http://my.zol.com.cn/' + userid + '/feed/">' + name + "</a>&nbsp;";
                if (isf == 0) {
                    self.unbind();
                    $("#G_atUserContainer").html('<li style="color: red;">\u62b1\u6b49\uff0c\u60a8\u53ea\u80fd@\u81ea\u5df1\u7684\u597d\u53cb~</li>').show();
                    return false
                }
                ue.execCommand("insertHtml", _html);
                $("#G_atUserLayer").remove()
            }
        })
    };
    return
};
$(function() {
    var Timer = {};
    $("#titleInput").bind({
        keyup: function() {
            var v = $(this).val(),
                maxlen = 80,
                curlen = App.mbStrLen(v);
            if (curlen > maxlen) {
                $(this).val(App.mbSubstr(v, maxlen, true))
            }
            $(this).prev().html("<em>" + Math.ceil(App.mbStrLen($(this).val()) / 2) + "</em>/40")
        },
        paste: function() {
            var self = $(this);
            setTimeout(function() {
                    self.keyup()
                },
                150)
        },
        focus: function() {},
        blur: function() {}
    });
    $("#switchSeniorBtn").click(function() {
        var par = $(this).parent();
        if (par.hasClass("editor-simple")) {
            par.removeClass("editor-simple")
        } else {
            par.addClass("editor-simple")
        }
    });
    $("#titleColor li").click(function() {
        var color = $(this).find("span").css("background-color");
        $(this).parent().prev().css("background-color", color);
        $(this).parent().parent().removeClass("selectbox-hover")
    });
    ue.addListener("ready",
        function(editor) {
            FB.createAttachment();
            $("#postSetTopAttach").bind("click",
                function() {
                    if ($("#postSetTopAttach").attr("checked") == "checked") {
                        FB.NeedScore += 5;
                        $("#attachUploadArea .file-price").each(function(key, val) {
                            $(val).removeClass("text-disabled");
                            $(val).attr("disabled", false)
                        })
                    } else {
                        FB.NeedScore -= 5;
                        $("#attachUploadArea .file-price").each(function(key, val) {
                            $(val).addClass("text-disabled");
                            $(val).attr("disabled", "disabled")
                        })
                    }
                });
            //setTimeout(function() {
            //        FB.autoSaveContent()
            //    },
            //    30000);
            //$("#edui1_saveContent").click(function() {
            //    FB.saveContent()
            //});
            //$("#edui1_recoverContent").click(function() {
            //    Layer.showConfirm({
            //        title: "\u6062\u590d\u6570\u636e",
            //        content: "\u6b64\u64cd\u4f5c\u5c06\u8986\u76d6\u5f53\u524d\u5e16\u5b50\u5185\u5bb9\uff0c\u786e\u5b9a\u8981\u6062\u590d\u6570\u636e\u5417\uff1f",
            //        sure: function() {
            //            FB.getAutoSaveContent()
            //        }
            //    })
            //});
            //setInterval(function() {
            //        var n = parseInt($("#edui1_saveTime").text().substr(0, 2)) - 10;
            //        n = (n <= 0) ? 30: n;
            //        $("#edui1_saveTime").text(n + "\u79d2\u540e\u81ea\u52a8\u4fdd\u5b58")
            //    },
            //    10000);
            //$("#edui1_clearContent").click(function() {
            //    Layer.showConfirm({
            //        title: "\u6e05\u9664\u5185\u5bb9",
            //        content: "\u60a8\u786e\u8ba4\u8981\u6e05\u9664\u6240\u6709\u5185\u5bb9\u5417\uff1f",
            //        sure: function() {
            //            ue.execCommand("cleardoc")
            //        }
            //    })
            //});
            //$("#edui1_wordCheck").click(function() {
            //    var len = ue.getContentTxt().length;
            //    var content = "\u5f53\u524d\u957f\u5ea6\uff1a" + len + " \u5b57\uff0c\u7cfb\u7edf\u9650\u5236: " + FB.MinConLen + " \u5230 " + FB.MaxConLen + " \u5b57\u3002";
            //    var otips = {
            //        title: "\u5b57\u6570\u68c0\u67e5",
            //        type: "",
            //        content: content,
            //        confirm: 1
            //    };
            //    if (len < FB.MinConLen || len >= FB.MaxConLen) {
            //        otips.type = "warn"
            //    }
            //    Layer.showTips(otips)
            //});
            $("#previewBook").live("click",
                function() {
                    ue.execCommand("preview")
                })
        });
    $("#replyRewardBtn").click(function() {
        if ($("#replyRewardInfo").css("display") == "none") {
            $(this).text("- \u56de\u5e16\u5956\u52b1");
            $("#replyRewardInfo").show()
        } else {
            $(this).text("+\u56de\u5e16\u5956\u52b1");
            $("#replyRewardInfo").hide()
        }
    });
    $("#verifyCode img,#verifyCode2").bind({
        click: function() {
            var src = $("#verifyCode img").attr("src");
            src = src.indexOf("&t=") > -1 ? src.substr(0, src.indexOf("&t=")) : src;
            src += "&t=" + new Date().getTime();
            $("#verifyCode img").attr("src", src)
        }
    });
    $("#verifyCode input").blur(function() {
        var code = $(this).val();
        if (!code) {
            return
        }
        $.post("/index.php?c=Ajax_Verify&a=checkCode&t=" + new Date().getTime(), {
                code: code
            },
            function(data) {
                if (data) {
                    FB.IsCodeRight = 1
                } else {
                    Layer.showTips({
                        type: "warn",
                        content: "\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef~"
                    });
                    return false
                }
            })
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() >= $("#container").offset().top) {
            $("#switchSeniorBtn").addClass("edit-control-level-fixed");
            $("#illustration").addClass("sidebar-fixed")
        } else {
            $("#illustration").removeClass("sidebar-fixed");
            $("#switchSeniorBtn").removeClass("edit-control-level-fixed")
        }
    });
    $("#picUploadArea").closest("div").scroll(function() {
        var scrollTop = $("#picUploadArea").closest("div").scrollTop();
        var ulHeight = $("#picUploadArea").height();
        var maxH = ulHeight - 256;
        if (scrollTop <= 0) {
            $(".illustrated .turn-up").css("visibility", "hidden")
        } else {
            $(".illustrated .turn-up").css("visibility", "visible")
        }
        if (scrollTop >= maxH) {
            $(".illustrated .turn-down").css("visibility", "hidden")
        } else {
            $(".illustrated .turn-down").css("visibility", "visible")
        }
    });
    $(".illustrated .turn-up").live("click",
        function() {
            var sTop = $("#picUploadArea").closest("div").scrollTop();
            var step = parseInt(sTop) - 256;
            step = step > 0 ? step: 0;
            $("#picUploadArea").closest("div").scrollTop(step)
        });
    $(".illustrated .turn-down").live("click",
        function() {
            var scrollTop = $("#picUploadArea").closest("div").scrollTop();
            var ulHeight = $("#picUploadArea").height();
            var maxH = ulHeight - 256;
            var step = parseInt(scrollTop) + 256;
            step = step > maxH ? maxH: step;
            $("#picUploadArea").closest("div").scrollTop(step)
        });
    $("#picSize").bind({
        click: function() {
            var self = $(this);
            self.addClass("selectbox-hover");
            self.find("ul").show()
        },
        mouseleave: function() {
            var self = $(this);
            Timer.b = setTimeout(function() {
                    self.removeClass("selectbox-hover")
                },
                200)
        }
    });
    $("#picSize ul").hover(function() {
            clearTimeout(Timer.b)
        },
        function() {
            $(this).parent().removeClass("selectbox-hover")
        });
    $("#picSize li").click(function() {
        var self = $(this),
            select_con = self.text();
        self.parent().prev().html('<i class="trangle border-radius"></i>' + select_con);
        self.parent().parent().removeClass("selectbox-hover")
    })
});
$(function() {
    var Timer = {};
    var UserScore = parseInt($("#userScore").val());
    var rewardBox = $(".rewardbox");
    $("#titleInput").focus();
    $("#titleColor span,#bookBrand span,#bookModel span").bind({
        click: function() {
            var self = $(this);
            if (self.next().find("li").length > 0) {
                self.parent().addClass("selectbox-hover")
            }
        },
        mouseleave: function() {
            var obj = $(this);
            Timer.a = setTimeout(function() {
                    obj.parent().removeClass("selectbox-hover")
                },
                200)
        }
    });
    $("#titleColor ul,#bookBrand ul,#bookModel ul").hover(function() {
            clearTimeout(Timer.a)
        },
        function() {
            $(this).parent().removeClass("selectbox-hover")
        });
    $("#bookBrand").on("click", "li",
        function() {
            var self = $(this),
                selfid = parseInt(self.attr("data-id"), 10),
                subSect = $("#bookModel"),
                type = self.attr("data-type"),
                pbConfig = Publish_Config,
                bbsid = pbConfig.bbsid,
                noNextFunc = function() {
                    subSect.find("ul").empty();
                    subSect.off("click").addClass("selectbox-unopen").hide()
                };
            boardCommonEvent(this);
            pbConfig.subid = 0;
            pbConfig.manuid = 0;
            pbConfig.productid = 0;
            pbConfig.cateid = 0;
            pbConfig.boardid = 0;
            if (type === "cate") {
                pbConfig.cateid = selfid;
                noNextFunc();
                return false
            } else {
                if (type === "manu") {
                    pbConfig.boardid = selfid
                } else {
                    if (type === "subcate") {
                        pbConfig.boardid = selfid;
                        var otherBbsid = self.attr("data-subbbsid");
                        if (!isNaN(parseInt(otherBbsid, 10))) {
                            pbConfig.bbsid = bbsid = otherBbsid
                        }
                    } else {
                        pbConfig.boardid = selfid
                    }
                }
            }
            Publish_Config = pbConfig;
            var data = {
                "bbsid": pbConfig.bbsid,
                "boardid": selfid
            };
            $.get("/index.php?c=Ajax_Board&a=getSubList", data,
                function(json) {
                    if (typeof json != "undefiend") {
                        if (json.info != "err") {
                            var oSpan = subSect.find("span");
                            oSpan.html('<i class="trangle  border-radius-s3"></i>\u8bf7\u9009\u62e9').attr({
                                "title": "\u8bf7\u9009\u62e9",
                                "alt": "\u8bf7\u9009\u62e9"
                            });
                            subSect.show().removeClass("selectbox-unopen");
                            var li = [];
                            $.each(json.data,
                                function(key, val) {
                                    li.push('<li data-id="' + val.id + '" title="' + val.name + '" alt="' + val.name + '">' + val.name + "</li>")
                                });
                            subSect.find("ul").empty().append(li.join(""));
                            subSect.on("click", "li",
                                function() {
                                    boardCommonEvent(this);
                                    if (json.type == 1) {
                                        Publish_Config.productid = parseInt($(this).attr("data-id"))
                                    } else {
                                        Publish_Config.subid = parseInt($(this).attr("data-id"))
                                    }
                                    getBoardType(this)
                                })
                        } else {
                            noNextFunc()
                        }
                        $(".post-classify").remove();
                        rewardBox.before(json.html);
                        bindBoardTypeEvent()
                    }
                },
                "json")
        });
    $("#bookModel li").click(function() {
        boardCommonEvent(this);
        if (Publish_Config.manuid != 0) {
            Publish_Config.productid = parseInt($(this).attr("data-id"))
        } else {
            //if (Publish_Config.pageType == "subcate") {
                Publish_Config.subid = parseInt($(this).attr("data-id"))
            //} else {
            //    Publish_Config.boardid = parseInt($(this).attr("data-id"))
            //}
        }
        getBoardType(this)
    });
    var bindBoardTypeEvent = function() {
        $(".post-classify").find("a").bind("click",
            function() {
                var self = $(this);
                self.toggleClass("current").siblings().removeClass("current");
                Publish_Config.book_type = self.hasClass("current") ? self.attr("type") : 0
            })
    };
    bindBoardTypeEvent();
    $("#titleColorSet,#postSetTop").click(function(e) {
        if ($(this).attr("checked") == "checked") {
            if (e.target.id == "titleColorSet") {
                FB.NeedScore += FB.ToHighlight
            } else {
                if (e.target.id == "postSetTop") {
                    FB.NeedScore += FB.ToTop
                }
            }
            if (UserScore < FB.NeedScore) {
                Layer.showTips({
                    title: "\u63d0\u793a",
                    content: '\u60a8\u7684Z\u91d1\u8c46\u4e0d\u8db3\uff0c\u8bf7\u591a\u591a\u52aa\u529b\u8d5a\u91d1\u8c46\u54e6&nbsp;&nbsp;<a href="http://jindou.zol.com/about.html" target="_blank">Z\u91d1\u8c46\u8bf4\u660e</a>'
                })
            }
        } else {
            if (e.target.id == "titleColorSet") {
                FB.NeedScore -= FB.ToHighlight
            } else {
                if (e.target.id == "postSetTop") {
                    FB.NeedScore -= FB.ToTop
                }
            }
            $("#G_TipsLayer").hide()
        }
        FB.showJinDouTips()
    });
    ue.addListener("ready",
        function(editor) {
            ue.execCommand("focus");
            FB.getConFromList()
        });
    $("#replyReward,#replyNum").bind({
        focus: function() {},
        blur: function() {
            if ($(this).val() == "") {
                $(this).val(0)
            }
            if (parseInt($(this).val()) <= 0) {
                $(this).val(0)
            }
            var total = parseInt($("#replyReward").val()) * parseInt($("#replyNum").val());
            if (total < 100) {
                var tot = total;
                var tax = 0
            } else {
                var tax = parseInt(total * 0.05);
                var tot = total + tax
            }
            $("#rewardTotal").text(total);
            $("#rewardTax").text(tot);
            FB.showJinDouTips()
        }
    });
    $("#eachReceive span,#rewardChance span").bind({
        click: function() {
            $(this).next().show()
        },
        mouseleave: function() {
            var obj = $(this);
            Timer.b = setTimeout(function() {
                    obj.next().hide()
                },
                200)
        }
    });
    $("#eachReceive ul,#rewardChance ul").hover(function() {
            clearTimeout(Timer.b)
        },
        function() {
            $(this).hide()
        });
    $("#eachReceive li,#rewardChance li").click(function() {
        var select_con = $(this).text();
        $(this).parent().prev().html('<i class="trangle border-radius"></i>' + select_con);
        $(this).parent().hide()
    });
    $("#publishBookBtn").click(function() {
        var data = FB.verify();
        if (!data || typeof data != "object") {
            return false
        }
        FB.publishBook(data)
    });

    if (typeof ue != "undefined") {
        ue.addListener("ready",
            function(editor) {
                $("#pbReplyBtn").click(function() {
                    if ($(this).hasClass("btn-loading")) {
                        return false
                    }
                    FB.pbReply()
                });
                $(ue.container).find("iframe").contents().keydown(function(event) {
                    if (event.keyCode == 13 && event.ctrlKey) {
                        $("#pbReplyBtn").click()
                    }
                    return
                })
            })
    }
    $("#bookShare li").click(function() {
        var self = $(this);
        if (self.hasClass("checked")) {
            self.removeClass("checked").find("input").val("")
        } else {
            self.addClass("checked").find("input").val(self.attr("data-attr"))
        }
    });
    FB.showJinDouTips = function() {
        $("#jindouTips").empty();
        $("#jindouTips").removeClass("jindouTips-warn");
        var str = istr = "";
        var reply_score = parseInt($("#rewardTotal").text());
        if (FB.NeedScore + reply_score) {
            str += "\u63d0\u793a\uff1a\u53d1\u8868\u8be5\u5e16\u5171\u9700\u652f\u4ed8" + (FB.NeedScore + reply_score) + "Z\u91d1\u8c46(";
            if ($("#titleColorSet").attr("checked") == "checked") {
                istr += "\u6807\u9898\u9ad8\u4eae\u8d39\u752850Z\u91d1\u8c46"
            }
            if ($("#postSetTop").attr("checked") == "checked") {
                istr += "\uff0c\u7f6e\u9876\u6b64\u8d34\u8d39\u7528100Z\u91d1\u8c46"
            }
            if ($("#postSetTopAttach").attr("checked") == "checked") {
                istr += "\uff0c\u53d1\u5e03\u6536\u8d39\u9644\u4ef6\u8d39\u75285Z\u91d1\u8c46"
            }
            if (reply_score > 0) {
                istr += "\uff0c\u56de\u5e16\u5956\u52b1" + reply_score + "Z\u91d1\u8c46"
            }
            istr = $.trim(istr.replace("\uff0c", " ")).replace(" ", "\uff0c");
            str += istr + ")\uff0c";
            if (UserScore < (FB.NeedScore + reply_score)) {
                str += "\u603b\u989d\u5927\u4e8e\u81ea\u8eab\u62e5\u6709\u8d22\u5bcc\uff0c\u60a8\u5f53\u524d\u62e5\u6709" + UserScore + "Z\u91d1\u8c46\uff0c\u8bf7\u8fd4\u56de\u4fee\u6539\u3002"
            } else {
                str += "\u60a8\u5f53\u524d\u62e5\u6709" + UserScore + "Z\u91d1\u8c46\u3002"
            }
            str += '<a href="http://jindou.zol.com/about.html" target="_blank">Z\u91d1\u8c46\u8bf4\u660e</a>';
            $("#jindouTips").html(str);
            if (UserScore < (FB.NeedScore + reply_score)) {
                $("#jindouTips").addClass("jindouTips-warn")
            }
            $("#jindouTips").show()
        }
    };
    var boardCommonEvent = function(obj) {
        var self = $(obj),
            select_con = self.text(),
            par = self.parent();
        par.prev().html('<i class="trangle border-radius"></i>' + select_con);
        par.prev().attr({
            "title": select_con,
            "alt": select_con
        });
        par.parent().removeClass("selectbox-hover")
    };
    var getBoardType = function(obj) {
        var self = $(obj),
            data = {
                "bbsid": Publish_Config.bbsid,
                "boardid": Publish_Config.boardid,
                "cateid": Publish_Config.cateid,
                "manuid": Publish_Config.manuid,
                "productid": Publish_Config.productid
            };
        $.get("/index.php?c=Ajax_List&a=getBoardType&t=" + (new Date()).getTime(), data,
            function(json) {
                if (json.info == "ok") {
                    $(".post-classify").remove();
                    rewardBox.before(json.html);
                    bindBoardTypeEvent()
                }
            },
            "json")
    }
});
if (typeof Layer == "undefined" || !Layer) {
    var Layer = {}
}
Layer.bindDisappearEvent = function(o) {
    o.on("test",
        function() {
            $(this).hide()
        })
};
Layer.showTips = function(info) {
    if (typeof info != "object" || !info) {
        return false
    }
    var _title = info.title ? info.title: "\u63d0\u793a";
    var _content = info.content ? info.content: "";
    var _type = info.type ? info.type: 0;
    var _disappear = info.disappear ? parseInt(info.disappear) : 1500;
    var _confirm = info.confirm ? 1: 0;
    var _callback = info.callback ? info.callback: function() {};
    var _cstyle = info.customStyle ? info.customStyle: 0;
    if (!_content) {
        return false
    }
    $("#G_TipsLayer").remove();
    var _html = '<div class="popbox" id="G_TipsLayer" style="display:none;">';
    _html += '<div class="popbox-inner"><div class="popbox-head">';
    _html += '<span class="popbox-close border-radius" onclick="javascript:$(\'#G_TipsLayer\').remove();">\u5173\u95ed</span>';
    _html += '<h3><i class="line"></i>' + _title + "</h3>";
    _html += "</div>";
    _html += '<div class="popbox-main"><div class="popbox-simple" style="padding: 33px 0;">';
    if (_type) {
        _html += '<p class="' + _type + '-tip">' + _content + "</p>"
    } else {
        _html += "<p>" + _content + "</p>"
    }
    if (_confirm) {
        _html += '<div class="popbox-btns"><span class="btn-blue border-radius" onclick="javascript:$(\'#G_TipsLayer\').remove();">\u786e\u5b9a</span></div>'
    }
    _html += "</div></div></div></div>";
    $("body").append(_html);
    $("#G_TipsLayer").css("width", $("#G_TipsLayer").width());
    App.toCenter("#G_TipsLayer");
    _callback();
    $("#G_TipsLayer").show();
    setTimeout(function() {
            $("#G_TipsLayer").remove()
        },
        _disappear)
};
Layer.showConfirm = function(info) {
    if (typeof info != "object" || !info) {
        return false
    }
    var _title = info.title ? info.title: "\u786e\u5b9a\u8be5\u64cd\u4f5c?";
    var _content = info.content ? info.content: "";
    var _callback = info.callback ? info.callback: function() {};
    var _sure = info.sure ? info.sure: function() {};
    if (!_content) {
        return false
    }
    $("#G_ConfirmLayer").remove();
    var _html = '<div class="popbox" id="G_ConfirmLayer" style="">';
    _html += '<div class="popbox-inner"><div class="popbox-head">';
    _html += '<span class="popbox-close border-radius" onclick="javascript:$(\'#G_ConfirmLayer\').remove();">\u5173\u95ed</span>';
    _html += '<h3><i class="line"></i>' + _title + "</h3></div>";
    _html += '<div class="popbox-main"><div class="popbox-simple">';
    _html += "<p>" + _content + "</p>";
    _html += '<div class="popbox-btns"><span class="btn-blue border-radius" id="G_conbtn">\u786e\u5b9a</span>';
    _html += '<span class="btn-gray border-radius" onclick="javascript:$(\'#G_ConfirmLayer\').remove();">\u53d6\u6d88</span></div>';
    _html += "</div></div></div></div>";
    $("body").append(_html);
    $("#G_ConfirmLayer").css("width", $("#G_ConfirmLayer").width());
    App.toCenter("#G_ConfirmLayer");
    _callback();
    $("#G_conbtn").bind("click",
        function() {
            _sure();
            $("#G_ConfirmLayer").hide()
        });
    $("#G_ConfirmLayer").show()
};
Layer.confirm = function(info) {
    if (typeof info != "object" || !info) {
        return false
    }
    var _divclass = info.divclass ? info.divclass: "popbox";
    var _headclass = info.headclass ? info.headclass: "popbox-head";
    var _mainclass = info.mainclass ? info.mainclass: "popbox-main";
    var _bodyclass = info.bodyclass ? info.bodyclass: "popbox-delete";
    var _surebtn = info.surebtn ? info.surebtn: "\u786e\u5b9a";
    var _sureclass = info.sureclass ? info.sureclass: "btn-blue border-radius-s3";
    var _cancelbtn = info.cancelbtn ? info.cancelbtn: "\u53d6\u6d88";
    var _cancelclass = info.cancelclass ? info.cancelclass: "btn-gray border-radius-s3";
    var _title = info.title ? info.title: "\u786e\u5b9a\u8be5\u64cd\u4f5c?";
    var _content = info.content ? info.content: "";
    var _callback = info.callback ? info.callback: function() {};
    var _sure = info.sure ? info.sure: function() {};
    if (!_content) {
        return false
    }
    $("#G_Confirm").remove();
    var _html = '<div class="' + _divclass + '" id="G_Confirm" style="display:none;">	    <div class="popbox-inner">	        <div class="' + _headclass + '">	            <span class="popbox-close border-radius-s3" onclick="javascript:$(\'#G_Confirm\').remove();">\u5173\u95ed</span>	            <h3><i class="line"></i>' + _title + '</h3>	        </div>	        <div class="' + _mainclass + '">	            <div class="' + _bodyclass + '">' + _content + '	                <div class="popbox-btns">						<span class="' + _sureclass + '" id="G_ConfirmBtn">' + _surebtn + '</span>						<span class="' + _cancelclass + '" onclick="javascript:$(\'#G_Confirm\').remove();">' + _cancelbtn + "</span>					</div>	            </div>	        </div>	    </div>	</div>";
    $("body").append(_html);
    $("#G_Confirm").css("width", $("#G_Confirm").width());
    App.toCenter("#G_Confirm");
    _callback();
    $("#G_ConfirmBtn").bind("click",
        function() {
            _sure();
            $("#G_Confirm").hide()
        });
    $("#G_Confirm").show()
};
Layer.tips = function(info) {
    if (typeof info != "object" || !info) {
        return false
    }
    var _divclass = info.divclass ? info.divclass: "popbox";
    var _headclass = info.headclass ? info.headclass: "popbox-head";
    var _mainclass = info.mainclass ? info.mainclass: "popbox-main";
    var _bodyclass = info.bodyclass ? info.bodyclass: "popbox-tips";
    var _title = info.title ? info.title: "\u63d0\u793a\u4fe1\u606f";
    var _content = info.content ? info.content: "";
    var _callback = info.callback ? info.callback: function() {};
    var _hasbtn = info.hasbtn ? 1: 0;
    var _disappear = info.disappear || 3000;
    if (!_content) {
        return false
    }
    $("#G_Tips").remove();
    var _html = '<div class="' + _divclass + '" id="G_Tips" style="display:none;">	    <div class="popbox-inner">			<div class="' + _headclass + '">	            <span class="popbox-close border-radius-s3" onclick="javascript:$(\'#G_Tips\').remove();">\u5173\u95ed</span>				<h3><i class="line"></i>' + _title + '</h3>	        </div>			<div class="' + _mainclass + '">                <div class="' + _bodyclass + '">' + _content + "</div>";
    if (_hasbtn) {
        _html += '<div class="popbox-btns"><span class="btn-blue border-radius" onclick="javascript:$(\'#G_Tips\').remove();">\u786e\u5b9a</span></div>'
    }
    _html += "</div>	    </div>	</div>";
    $("body").append(_html);
    $("#G_Tips").css("width", $("#G_Tips").width());
    App.toCenter("#G_Tips");
    _callback();
    $("#G_Tips").show();
    if (_disappear) {
        setTimeout(function() {
                $("#G_Tips").remove()
            },
            _disappear)
    }
};
Layer.inviteFriends = function() {
    var _html = '<div class="popbox" style="display:none;" id="G_inviteFriend">	    <div class="popbox-inner">	        <div class="popbox-head">	            <span class="popbox-close border-radius-s3" onclick="javascript:$(\'#G_inviteFriend\').hide();">\u5173\u95ed</span>	            <h3><i class="line"></i>\u9080\u8bf7\u597d\u53cb<span>\u770b\u5e16\u5b50<a href="' + document.URL + '">' + Detail_Config.title + '</a></span></h3>	        </div>	        <div class="popbox-main">	            <div class="invite-pop clearfix">	                <div class="invite-pop-main">	                    <h3>\u6211\u60f3\u9080\u8bf7\uff1a</h3>	                    <div class="clearfix">						<form id="G_inviteForm">						    <input type="hidden" value="' + boardid + '" name="boardid"/>						    <input type="hidden" value="' + bookid + '" name="bookid"/>						    <input type="hidden" value="' + Detail_Config.bbsid + '" name="bbsid"/>	                        <div class="invite-listbox">	                            <div class="invite-title" id="selectAll"><label class="label-check"><input type="checkbox" name="selectAll">\u5168\u90e8</label></div>	                            <div class="invite-inner">	                                <ul class="invite-friend-list" id="G_inFriendList">	                                </ul>	                            </div>	                        </div>	                        <div class="invite-aside">	                            <div class="invite-title">\u9644\u8a00\u662f(\u53ef\u9009)\uff1a</div>	                            <textarea class="add-text-area border-radius-s3" name="PScontent"></textarea>	                        </div>	                    </div>						</form>	                </div>	                <div class="invite-pop-tip">	                    <div class="invite-pop-tip-head">	                        <h3>\u65b0\u5165\u575b\u5fc5\u770b\uff1a</h3>	                        <p><a href="http://bbs.zol.com.cn/otherbbs/d4_8983.html" target="_blank">\u5982\u4f55\u7ed9\u81ea\u5df1\u6dfb\u52a0\u66f4\u591a\u597d\u53cb</a></p>	                    </div>	                    <div class="invite-pop-tip-body">	                        <p>\u6e29\u99a8\u63d0\u793a\uff1a</p>	                        <p>\u4e0d\u8981\u9891\u7e41\u7ed9\u4f60\u7684\u597d\u53cb\u53d1\u9001\u9080\u8bf7\u4ed6\u53ef\u80fd\u4f1a\u56e0\u4e3a\u4f60\u7684"\u9a9a\u6270"\u751f\u6c14\u7684\u54e6:)</p>	                    </div>	                </div>	                <div class="popbox-btns" id="G_inviteBtn"><span class="btn-blue border-radius-s3">\u53d1\u9001\u9080\u8bf7</span></div>	            </div>			</div>	    </div>	</div>';
    $("body").append(_html);
    $("#G_inviteFriend").css("width", $("#G_inviteFriend").width())
};
Layer.privateMessage = function() {
    if ($("#G_privateMsg").length) {
        $("#G_privateMsg").remove()
    }
    var _html = '<div class="popbox" style="display:none;" id="G_privateMsg">	    <div class="popbox-inner">	        <div class="popbox-head">	            <span class="popbox-close border-radius-s3" onclick="javascript:$(\'#G_privateMsg\').remove();">\u5173\u95ed</span>	            <h3><i class="line"></i>\u79c1\u4fe1</h3>	        </div>	        <div class="popbox-main">	            <div class="popbox-sixin">	                <div class="popbox-sixin-title">\u8bf7\u8f93\u5165\u79c1\u4fe1\u5185\u5bb9\uff1a</div>	                <textarea class="add-text-area border-radius-s3"></textarea>	                <div class="popbox-btns"><span class="btn-blue border-radius-s3">\u53d1\u9001</span></div>	            </div>	        </div>	    </div>	</div>';
    $("body").append(_html);
    $("#G_privateMsg").css("width", $("#G_privateMsg").width());
    App.toCenter("#G_privateMsg");
    $("#G_privateMsg").show()
};
Layer.scoreBox = function(aScore) {
    var c,
        firstScore;
    _html = "",
        o = $("#G_scoreBox");
    if (o.length < 1) {
        var iScore = parseInt($("#userScore").val());
        iSocre = isNaN(iScore) ? 0: iScore;
        aScore = typeof aScore == "object" && aScore.length > 0 ? aScore: [1, 3, 5, 10];
        _html += '<div class="popbox" style="display:none" id="G_scoreBox"><div class="popbox-inner">' + '<div class="popbox-head"><span class="popbox-close border-radius-s3" onclick="$(\'#G_scoreBox\').hide()">\u5173\u95ed</span>' + '<h3><i class="line"></i>\u53c2\u4e0e\u8bc4\u5206</h3></div><div class="popbox-main"><div class="mark">' + '<div class="item"><span class="item-title">Z\u91d1\u8c46\uff1a</span><div class="special">' + '<ul class="num-list clearfix">';
        for (var i = 0, leng = aScore.length; i < leng; i++) {
            c = "";
            if (i === 0) {
                firstScore = aScore[i];
                c = "select"
            }
            _html += '<li data-value="' + aScore[i] + '" class="border-radius-s3 ' + c + '">+' + aScore[i] + "</li>"
        }
        _html += "</ul>&nbsp;&nbsp;" + '\u60a8\u4eca\u65e5\u8fd8\u6709 <em class="num">' + iScore + "</em> Z\u91d1\u8c46\u53ef\u7528</div></div>" + '<div class="item scoretips" style="color:red; display:none;">\u60a8\u597d\uff0c\u60a8\u7684\u8bc4\u5206\u5de5\u8d44\u5df2\u4e0d\u8db3\uff0c\u8d85\u51fa\u90e8\u5206\u5c06\u4f7f\u7528\u60a8\u4e2a\u4eba\u79ef\u5206</div>' + '<div class="item"><span class="item-title">\u53ef\u9009\u8bc4\u8bed\uff1a</span><div class="select-comment clearfix">' + '<div class="mark-scrollbox"><ul class="mark-scroll"><li>\u6211\u5f88\u8d5e\u540c</li>' + '<li class="act">\u7cbe\u54c1\u6587\u7ae0</li><li>\u539f\u521b\u5185\u5bb9</li><li>\u592a\u7ed9\u529b\u4e86\uff01\uff01\uff01</li>' + "<li>\u5f3a\u5e16\u4e0d\u5f97\u4e0d\u9876\uff01</li><li>\u611f\u8c22\u597d\u53cb\u652f\u6301</li><li>\u652f\u6301</li><li>\u6b23\u8d4f\u4f73\u4f5c</li>" + "<li>\u5b66\u4e60\u4e86</li></ul></div></div></div>" + '<div class="item"><span class="item-title">\u81ea\u5199\u8bc4\u8bed\uff1a</span><div>' + '<textarea class="textarea" maxlength="300" id="scoreBox_content" placeholder="\u8bf7\u8f93\u5165\u5185\u5bb9"></textarea>' + '</div></div> <div class="popbox-btns"><span class="btn-blue border-radius-s3" id="scoreBox_subBtn">\u8bc4\u5206</span>' + '<label class="label-check"><input checked id="scoreBox_notUser" type="checkbox" disabled >\u901a\u77e5\u4f5c\u8005</label></div>' + "</div></div></div>" + '<input type="hidden" id="scoreBox_selScore" value="' + firstScore + '" /><input type="hidden" id="scoreBox_userid" value="" />' + '<input type="hidden" id="scoreBox_replyid" value="0" />' + "</div>";
        o = $(_html);
        $("body").append(o)
    }
    App.toCenter("#G_scoreBox");
    if (iSocre < 10 && iSocre != 0) {
        $(".scoretips").show()
    }
    $.get("/index.php?c=Ajax_User&a=getUserScore",
        function(json) {
            if (json.info != "ok") {
                return false
            }
            $(".num").text(json.scores)
        },
        "json");
    o.show();
    return o
};
Layer.createPicReplyLayer = function() {
    var se_reply_url = $("#seniorReplyUrl").val();
    if (!userid) {
        var user_role = "data-role='user-login'"
    }
    $("#bookContent").find('img[data-role="gallery"]').each(function(key, val) {
        var _picid = $(val).attr("data-picid");
        var _html = '<div class="icons-box" style="display:none;" id="picReplyLayer_' + _picid + '">		    <div class="review-icon" ' + user_role + '><a class="layer" href="javascript:;">\u8bc4\u8bba</a></div>		    <div class="quick-replybox border-radius-s3" id="picReplyCon_' + _picid + '" style="display:none;">		        <i class="trangle"></i>				<ul class="comment-list"></ul>		        <textarea class="textarea" id="picReplyTxt_' + _picid + '"></textarea>		        <div class="reply-option clearfix">		            <div class="reply-shorcut"><a href="javascript:;" data-picid="' + _picid + '" class="expression">\u8868\u60c5</a><a href="' + se_reply_url + "&picid=" + _picid + '">\u9ad8\u7ea7\u56de\u590d</a></div>		            <a href="javascript:;" class="btn-blue border-radius-s3" id="picReplyBtn_' + _picid + '">\u56de\u590d</a>		            <a class="pack-up border-radius-s3" href="javascript:;" onclick="javascript:$(this).parent().parent().hide();$(this).closest(\'.quick-replybox\').prev(\'.review-icon\').removeClass(\'review-current\');">\u6536\u8d77<em></em></a>		        </div>		    </div>		</div>';
        if ($("#picReplyLayer_" + _picid + "").length > 0) {
            return
        }
        $("body").append(_html);
        var self = $("#picReplyLayer_" + _picid);
        imgReady($(val).attr("src"),
            function(w, h) {
                if (w < 210 || h < 210) {
                    return
                }
                self.width(w);
                var _left = $(val).offset().left;
                var _top = $(val).offset().top + h - self.find(".review-icon").height();
                var replyProc = function() {
                    var content = $("#picReplyTxt_" + _picid).val();
                    content = FB.formatFaceContent(content);
                    Book.reply(content, "picReplyTxt_" + _picid)
                };
                self.css({
                    top: _top,
                    left: _left
                }).fadeIn();
                $(val).hover(function() {
                        self.addClass("icons-box-hover")
                    },
                    function() {
                        self.removeClass("icons-box-hover")
                    });
                self.find(".review-icon").click(function() {
                    if (!userid) {
                        return
                    }
                    if ($("#picReplyCon_" + _picid).css("display") != "none") {
                        $(this).removeClass("review-current");
                        self.css({
                            zIndex: ""
                        });
                        $("#picReplyCon_" + _picid).hide();
                        return
                    }
                    Book.getPicReplyInfo(_picid);
                    self.css({
                        zIndex: "103"
                    });
                    $(this).addClass("review-current")
                });
                self.find(".reply-shorcut .expression").click(function() {
                    var picid = $(this).attr("data-picid");
                    var selector = "#picReplyTxt_" + picid;
                    var obj = $(this);
                    FB.showEmotion(2, selector,
                        function() {
                            $("#zolEmotionLayer").css({
                                position: "",
                                top: "",
                                left: ""
                            });
                            obj.parent().append($("#zolEmotionLayer"))
                        })
                });
                self.find("#picReplyBtn_" + _picid).bind("click", replyProc);
                Z_Effect.bindKeyCommit($("#picReplyTxt_" + _picid), replyProc)
            })
    });
    if (WEB_CONFIG && WEB_CONFIG.pageType && WEB_CONFIG.pageType == "detail") {
        var data = {
                boardid: boardid,
                bookid: bookid,
                bbsid: Detail_Config.bbsid
            },
            d = new Date(),
            time = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
        $.get("/index.php?c=Ajax_Book&a=getPicReplyNum&t=" + Math.floor(Date.parse(time) / 1000), data,
            function(json) {
                json && $.each(json,
                    function(picid, num) {
                        var target = $("#picReplyLayer_" + picid);
                        target.find(".review-icon .layer").text("\u8bc4\u8bba(" + num + ")")
                    })
            },
            "json")
    }
};
Layer.quickReplyBox = function() {
    if ($("#quickReplyBox").length > 0) {
        App.toCenter("#quickReplyBox");
        $("#quickReplyBox").show();
        return
    }
    var _seurl = $("#seniorReplyUrl").val();
    var _html = '<div class="popbox" style="display:none;" id="quickReplyBox">        <div class="popbox-inner">            <div class="popbox-head">                <span class="popbox-close border-radius-s3" onclick="javascript:$(\'#quickReplyBox\').hide();">\u5173\u95ed</span>                <h3><i class="line"></i>\u56de\u590d</h3>            </div>            <div class="popbox-main">                <div class="reply-pop">                    <div class="reply-pop-header">\u56de\u590d\u4e3b\u9898\uff1a' + Detail_Config.title + '</div>                    <div class="reply-editor">					    <textarea id="quickReplyCon"></textarea>                        <a class="edit-high-level" href="' + _seurl + '">\u9ad8\u7ea7\u6a21\u5f0f</a>                    </div>                    <div class="reply-footer clearfix">                        <a class="btn-blue border-radius-s3" href="javascript:;" id="quickReplyBtn">\u53d1\u8868\u56de\u590d</a>                        <a class="reply-footer-rule" rel="nofollow" href="/otherbbs/d4_6087.html" target="_blank">\u79ef\u5206\u89c4\u5219</a>                    </div>                </div>            </div>        </div>    </div>';
    var replyProc = function() {
        var content = $("#quickReplyCon").val();
        Book.reply(content, "quickReply")
    };
    $("body").append(_html);
    $("#quickReplyBox").css("width", $("#quickReplyBox").width());
    App.toCenter("#quickReplyBox");
    $("#quickReplyBtn").bind("click", replyProc);
    Z_Effect.bindKeyCommit($("#quickReplyCon"), replyProc);
    $("#quickReplyBox").show()
};
Layer.reportContent = function() {
    var _html = "",
        link = window.location.href,
        o = $("#G_reportBox");
    if (o.length < 1) {
        var type = Detail_Config.reportType || {};
        _html += '<div class="popbox"  id="G_reportBox" style="display:none"><div class="popbox-inner">' + '<div class="popbox-head"><span class="popbox-close border-radius-s3" onclick="$(\'#G_reportBox\').hide()">\u5173\u95ed</span>' + '<h3><i class="line"></i>\u4e3e\u62a5\u4e0d\u826f\u5185\u5bb9</h3></div><div class="popbox-main"><div class="report">' + '<div class="item"><span class="item-title">\u4e3e\u62a5\u5e16\u5b50\uff1a</span><div>' + Detail_Config.title + "</div></div>" + '<div class="item"><span class="item-title">\u5e16\u5b50\u94fe\u63a5\uff1a</span>' + "<div>" + link + '</div></div><div class="item">' + '<span class="item-title">\u4e3e\u62a5\u7c7b\u578b\uff1a</span><div class="report-type">';
        for (x in type) {
            _html += '<label class="label-check"><input type="radio" name="jubao-type" value="' + x + '">' + type[x] + "</label>"
        }
        _html += '</div></div><div class="item"><span class="item-title">\u4e3e\u62a5\u7406\u7531\uff1a</span>' + '<textarea class="add-text-area border-radius-s3" placeholder="\u53ef\u8f93\u5165100\u5b57" id="report_content"></textarea></div>' + '<div class="popbox-btns"><span class="btn-blue border-radius-s3" id="report_subBtn">\u4e3e\u62a5</span>' + '<span class="btn-gray border-radius-s3" onclick="$(\'#G_reportBox\').hide()">\u53d6\u6d88</span></div>' + '</div></div></div><input type="hidden" id="report_link" value="' + link + '"/></div>';
        o = $(_html);
        Layer.bindDisappearEvent(o);
        $("body").append(o)
    }
    App.toCenter("#G_reportBox");
    o.show();
    return o
};
Layer.attachment = function(info, href) {
    if (typeof info == "undefined" || typeof href == "undefined") {
        return false
    }
    var price_str = "";
    var i = JSON.parse(info);
    var userid = $.cookie("zol_userid");
    $.post("/index.php?c=Ajax_Verify&a=isDownloadAttachment", {
            attachid: i.attachid,
            bbsid: Detail_Config.bbsid
        },
        function(json) {
            if (typeof json != "undefined") {
                if (json.info == "err" && userid != i.userid && i.price > 0) {
                    price_str = "\u60a8\u7684Z\u91d1\u8c46 -" + i.price + " \uff0c"
                }
                var _html = '<div class="popbox" style="display:none;" id="G_AttachmentLayer">			    <div class="popbox-inner">			        <div class="popbox-head">			            <span class="popbox-close border-radius-s3" onclick="javascript:$(\'#G_AttachmentLayer\').remove();">\u5173\u95ed</span>			            <h3><i class="line"></i>\u4e0b\u8f7d\u9644\u4ef6</h3>			        </div>			        <div class="popbox-main">			            <div class="down-load-pop">			                <p class="warn-tip"><i class="warn-ico"></i>' + price_str + ' \u73b0\u5728\u5f00\u59cb\u4e0b\u8f7d"' + i.name + '"</p>			                <p class="down-load-tip"><a href="' + href + '">\u5982\u679c\u4e09\u79d2\u540e\u4e0b\u8f7d\u4ecd\u672a\u5f00\u59cb\uff0c\u8bf7\u70b9\u51fb\u6b64\u94fe\u63a5</a></p>			            </div>			        </div>			    </div>			</div>';
                $("body").append(_html);
                $("#G_AttachmentLayer").css("width", $("#G_AttachmentLayer").width());
                App.toCenter("#G_AttachmentLayer");
                $("#G_AttachmentLayer").show();
                setTimeout(function() {
                        $("#G_AttachmentLayer").remove()
                    },
                    2000);
                if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) || /MSIE(\d+\.\d+);/.test(navigator.userAgent)) {
                    var referLink = document.createElement("a");
                    referLink.href = href;
                    document.body.appendChild(referLink);
                    referLink.click()
                } else {
                    window.open(href, "_self")
                }
            }
        },
        "json")
};
Layer.showAttaLayer = function(info, obj, callback) {
    if (typeof info == "undefined") {
        return false
    }
    var i = JSON.parse(info);
    var userid = $.cookie("zol_userid");
    var des = $(obj).attr("describe"),
        _html = "",
        data = {
            "boardid": WEB_CONFIG.selfBoardid,
            "bookid": WEB_CONFIG.bookid,
            "attachid": i.attachid,
            "bbsid": WEB_CONFIG.bbsid
        };
    if ($("#attachLayer_" + i.attachid).length > 0) {
        $("#attachLayer_" + i.attachid).show();
        return
    }
    $.get("/index.php?c=Ajax_Book&a=getAttachmentInfo", data,
        function(json) {
            if (json.info == "ok") {
                _html = '<div class="down-attachments-pop box-shadow" style="display:none;z-index:13;" id="attachLayer_' + i.attachid + '">		            <i class="trangle"></i>		            <p><span>\u4e0b\u8f7d\u6b21\u6570\uff1a' + json.downloads + "</span>" + json.wdate.substr(0, 10) + "\u4e0a\u4f20</p>";
                if (userid != json.userid && json.price > 0) {
                    _html += "<p><span>\u4e0b\u8f7d\u552e\u4ef7\uff1aZ\u91d1\u8c46 -" + json.price + "</span></p>"
                }
                if (json.description) {
                    _html += "<p><span>\u63cf\u8ff0: " + json.description + "<span></p>"
                }
                _html += "</div>";
                $("body").append(_html);
                callback()
            }
        },
        "json")
};
Layer.quickLogin = function() {
    if ($("#quickLoginLayer").length > 0) {
        App.toCenter("#quickLoginLayer");
        $("#quickLoginLayer").show();
        return
    }
    var _html = ['<div class="popbox" style="width:440px; display:none;" id="quickLoginLayer">', '<div class="popbox-inner">', '<div class="popbox-head">', '<span class="popbox-close border-radius-s3" onclick="$(\'#quickLoginLayer\').hide();">\u5173\u95ed</span>', '<h3><i class="line"></i>\u5feb\u901f\u767b\u5f55</h3>', "</div>", '<div class="popbox-main">', '<div class="fast-login">', "<p>\u60a8\u5904\u4e8e\u672a\u767b\u5f55\u72b6\u6001~  \u8bf7\u767b\u5f55\u6216\u4f7f\u7528\u5408\u4f5c\u7f51\u7ad9\u8d26\u53f7\u5feb\u901f\u767b\u5f55</p>", '<div class="popbox-btns">', '<span class="btn-blue border-radius-s3" onclick="javascript:window.location.href=\'http://service.zol.com.cn/user/login.php\'">\u767b\u5f55</span><span class="btn-gray border-radius-s3" onclick="javascript:window.location.href=\'http://service.zol.com.cn/user/register.php\'">\u6ce8\u518c</span><a class="fast-login-btn weibo-login-btn border-radius-s3" href="http://service.zol.com.cn/user/api/sina/jump.php">\u5fae\u535a\u767b\u5f55</a><a class="fast-login-btn qq-login-btn border-radius-s3" href="http://service.zol.com.cn/user/api/qq/libs/oauth/redirect_to_login.php">QQ\u767b\u5f55</a>', "</div>", "</div>", "</div>", "</div></div>"];
    $("body").append(_html.join(""));
    App.toCenter("#quickLoginLayer");
    $("#quickLoginLayer").show()
};
Layer.alert = function(info) {
    if (typeof info != "object" || !info) {
        return false
    }
    var content = info.content ? info.content: "",
        next_line = info.nextLine ? info.nextLine: "";
    var html = '<div class="popbox award-popbox" id="G_simpleTipsLayer" style="display:none;">	    <div class="award-popbox-inner">	        <p><span class="award-ico"></span>' + content + "</p>" + next_line + "	    </div>	</div>";
    $("body").append(html);
    App.flutter("#G_simpleTipsLayer", 0,
        function() {
            setTimeout(function() {
                    $("#G_simpleTipsLayer").remove()
                },
                500)
        })
};
Layer.forbidUser = function() {
    var _html = '<div class="popbox" id="G_forbiduser" style="display:none;">		<div class="popbox-inner">	<div class="popbox-head">		<span class="popbox-close border-radius-s3" onclick="$(\'#G_forbiduser\').hide();">\u5173\u95ed</span>		<h3><i class="line"></i>\u7981\u6b62\u7528\u6237</h3>	</div>	<div class="popbox-main">		<div class="forbid">			<div class="item">				<span class="item-title">\u7981\u6b62\uff1a</span>				<div class="forbid-type">					<label class="label-check"><input type="radio" value="3"  checked="checked" name="days">3\u5929</label>					<label class="label-check"><input type="radio" value="7" name="days">7\u5929</label>					<label class="label-check"><input type="radio" value="30" name="days">30\u5929</label>					<label class="label-check"><input type="radio" value=" "  name="days">\u6c38\u7981</label>				</div>			</div>			<div class="item">				<span class="item-title">\u7406\u7531\uff1a</span>				<div class="select-comment clearfix">					<div class="mark-scrollbox">						<ul class="mark-scroll">							<li class="special"><span>\u81ea\u5b9a\u4e49</span></li>							<li>\u6076\u610f\u704c\u6c34\u6216\u5e7f\u544a</li>							<li class="act">\u8fdd\u6cd5\u56fd\u5bb6\u6cd5\u5f8b\u89c4\u5b9a</li>							<li>\u53d1\u5e03QQ\u5708\u6216\u8fdd\u89c4\u56e2\u8d2d/\u5e7f\u544a</li>							<li>\u8c29\u9a82\u3001\u8bcb\u6bc1\u6216\u67aa\u624b\u8a00\u8bba</li>							<li>\u4e0d\u5408\u65f6\u5b9c\u7684\u5185\u5bb9</li>							<li>\u53d1\u5e03\u8fdd\u89c4\u5916\u90e8\u7f51\u7ad9\u94fe\u63a5</li>							<li>\u4e0e\u672c\u8bba\u575b\u65e0\u5173\u5185\u5bb9</li>							<li>\u4e0d\u5408\u65f6\u5b9c\u7684\u5185\u5bb9</li>						</ul>					</div>					<textarea id="forbiduser_content" class="reason"></textarea>				</div>			</div>			<div class="popbox-btns"><span class="btn-blue border-radius-s3">\u786e\u8ba4</span><span class="btn-gray border-radius-s3" onclick="$(\'#G_forbiduser\').hide();">\u53d6\u6d88</span></div>		</div>	</div></div></div>';
    $("body").append(_html);
    $("#G_forbiduser").css("width", $("#forbiduser").width());
    App.toCenter("#G_forbiduser");
    $("#G_forbiduser").show()
};
Layer.rotateNot = function(content, isCenter, isShare) {
    $("#G_rotateTipsLayer").remove();
    var that = this,
        sShare = "",
        sStyle = isCenter ? 'style="text-align:center"': "";
    that.bdBak = false;
    if (isShare) {
        sShare = '<div class="share-btns clearfix" >' + '<span class="label">\u5206\u4eab\u5230:</span>' + "<div " + 'class="bdsharebuttonbox bdshare-button-style0-24" data-bd-bind="1415586161071">' + '<a href="#" class="bds_tsina" data-cmd="tsina" title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a"></a>' + '<a href="#" class="bds_tqq" data-cmd="tqq" title="\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a"></a>' + '<a href="#" class="bds_qzone" data-cmd="qzone" title="\u5206\u4eab\u5230QQ\u7a7a\u95f4"></a></div>' + "</div>"
    }
    var arr = ['<div id="G_rotateTipsLayer" class="popbox" style="width:310px">', '<div class="popbox-inner"><div class="popbox-head">', '<span class="popbox-close border-radius-s3 closeBtn" >\u5173\u95ed</span>', '<h3><i class="line"></i>\u63d0\u793a\u4fe1\u606f</h3></div>', '<div class="popbox-main"><div class="popbox-tips-turntable">', "<p " + sStyle + ">" + content + "</p>", sShare, '<div class="popbox-btns"><span class="btn-blue border-radius closeBtn" >\u786e\u5b9a</span></div></div></div></div></div>'];
    var o = $(arr.join(""));
    $("body").append(o);
    App.toCenter(o);
    if (isShare && window._bd_share_main) {
        that.bdBak = window._bd_share_config;
        window._bd_share_config = {
            "common": {
                "bdUrl": "http://bbs.zol.com.cn/huodong/d2_16578.html",
                "bdText": "#\u58d5\u51fa\u6ca1\uff0c\u8bf7\u907f\u8ba9#\u5e86\u795d\u65b0\u8bba\u575b\u4e0a\u7ebf\u5927\u8f6c\u76d8\u62bd\u5956 \uff0c\u516c\u4ed4\u5468\u8fb9\u9996\u5ea6\u4eae\u76f8\uff0c\u767e\u5206\u767e\u4e2d\u5956\uff01",
                "bdMini": "2",
                "bdMiniList": false,
                "bdPic": "",
                "bdStyle": "0",
                "bdSize": "24"
            },
            "share": {}
        };
        _bd_share_main.init()
    }
    o.show();
    o.on("click", ".closeBtn",
        function() {
            o.off("click").remove();
            that.bdBak && (window._bd_share_config = that.bdBak);
            o = null
        });
    o.on("click", '[data-role="getPrizeBox"]',
        function() {
            Z_PersonInfo.showSignLayer();
            o.hide()
        })
};
function FileProgress(file, targetID) {
    this.fileProgressID = file.id;
    this.opacity = 100;
    this.height = 0;
    this.fileProgressWrapper = document.getElementById(this.fileProgressID);
    if (!this.fileProgressWrapper) {
        this.fileProgressWrapper = document.createElement("div");
        this.fileProgressWrapper.className = "progressWrapper";
        this.fileProgressWrapper.id = this.fileProgressID;
        this.fileProgressElement = document.createElement("div");
        this.fileProgressElement.className = "progressContainer";
        var progressCancel = document.createElement("a");
        progressCancel.className = "progressCancel";
        progressCancel.href = "#";
        progressCancel.style.visibility = "hidden";
        progressCancel.appendChild(document.createTextNode(" "));
        var progressText = document.createElement("div");
        progressText.className = "progressName";
        progressText.appendChild(document.createTextNode(file.name));
        var progressBar = document.createElement("div");
        progressBar.className = "progressBarInProgress";
        var progressStatus = document.createElement("div");
        progressStatus.className = "progressBarStatus";
        progressStatus.innerHTML = "&nbsp;";
        this.fileProgressElement.appendChild(progressCancel);
        this.fileProgressElement.appendChild(progressText);
        this.fileProgressElement.appendChild(progressStatus);
        this.fileProgressElement.appendChild(progressBar);
        this.fileProgressWrapper.appendChild(this.fileProgressElement);
        document.getElementById(targetID).appendChild(this.fileProgressWrapper)
    } else {
        this.fileProgressElement = this.fileProgressWrapper.firstChild
    }
    this.height = this.fileProgressWrapper.offsetHeight
}
FileProgress.prototype.setProgress = function(percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = percentage + "%"
};
FileProgress.prototype.setComplete = function() {
    this.fileProgressElement.className = "progressContainer blue";
    this.fileProgressElement.childNodes[3].className = "progressBarComplete";
    this.fileProgressElement.childNodes[3].style.width = "";
    var oSelf = this;
    setTimeout(function() {
            oSelf.disappear()
        },
        10000)
};
FileProgress.prototype.setError = function() {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";
    var oSelf = this;
    setTimeout(function() {
            oSelf.disappear()
        },
        5000)
};
FileProgress.prototype.setCancelled = function() {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";
    var oSelf = this;
    setTimeout(function() {
            oSelf.disappear()
        },
        2000)
};
FileProgress.prototype.setStatus = function(status) {
    this.fileProgressElement.childNodes[2].innerHTML = status
};
FileProgress.prototype.toggleCancel = function(show, swfUploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible": "hidden";
    if (swfUploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function() {
            swfUploadInstance.cancelUpload(fileID);
            return false
        }
    }
};
FileProgress.prototype.disappear = function() {
    var reduceOpacityBy = 15;
    var reduceHeightBy = 4;
    var rate = 30;
    if (this.opacity > 0) {
        this.opacity -= reduceOpacityBy;
        if (this.opacity < 0) {
            this.opacity = 0
        }
        if (this.fileProgressWrapper.filters) {
            try {
                this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity
            } catch(e) {
                this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")"
            }
        } else {
            this.fileProgressWrapper.style.opacity = this.opacity / 100
        }
    }
    if (this.height > 0) {
        this.height -= reduceHeightBy;
        if (this.height < 0) {
            this.height = 0
        }
        this.fileProgressWrapper.style.height = this.height + "px"
    }
    if (this.height > 0 || this.opacity > 0) {
        var oSelf = this;
        setTimeout(function() {
                oSelf.disappear()
            },
            rate)
    } else {
        this.fileProgressWrapper.style.display = "none"
    }
};
if (typeof swfUpload == "undefined" || !swfUpload) {
    var swfUpload = {}
}
$(function() {
    swfUpload.picNum = 0;
    swfUpload.attachNum = 0;
    swfUpload.uploadArea = $("#picUploadArea");
    swfUpload.uploadAttachArea = "";
    swfUpload.onloadHtml = '<li class="in-load border-radius"><span>\u52a0\u8f7d\u4e2d</span>		<div class="scroll-bar"><em id="picProgressBar" style=""></em></div>		<a href="###" onclick="$(this).closest(\'li\').remove();swfu.cancelUpload();swfu2.cancelUpload();">\u53d6\u6d88</a>		</li>';
    swfUpload.onloadAttachHtml = '<li class="uploading"><span class="file-name"></span>	   <span class="uploading-progress">\u6b63\u5728\u4e0a\u4f20\uff08<em id="attachProgressBar"></em>%\uff09...</span>	   <span class="delete-btn" onclick="$(this).closest(\'li\').remove();swfa.cancelUpload();">\u5220\u9664</span></li>'
});
swfUpload.fileQueued = function(file) {
    $(".pic-upload").css({
        top: "-500px",
        position: "absolute"
    });
    $(".illustrated").show()
};
swfUpload.fileQueueError = function(file, errorCode, message) {
    try {
        if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            alert("\u60a8\u6b63\u5728\u4e0a\u4f20\u7684\u6587\u4ef6\u961f\u5217\u8fc7\u591a.\n" + (message === 0 ? "\u60a8\u5df2\u8fbe\u5230\u4e0a\u4f20\u9650\u5236": "\u60a8\u6700\u591a\u80fd\u9009\u62e9 " + (message > 1 ? "\u4e0a\u4f20 " + message + " \u6587\u4ef6.": "\u4e00\u4e2a\u6587\u4ef6.")));
            return
        }
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                progress.setStatus("\u6587\u4ef6\u5c3a\u5bf8\u8fc7\u5927.");
                this.debug("\u9519\u8bef\u4ee3\u7801: \u6587\u4ef6\u5c3a\u5bf8\u8fc7\u5927, \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                progress.setStatus("\u65e0\u6cd5\u4e0a\u4f20\u96f6\u5b57\u8282\u6587\u4ef6.");
                this.debug("\u9519\u8bef\u4ee3\u7801: \u96f6\u5b57\u8282\u6587\u4ef6, \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                progress.setStatus("\u4e0d\u652f\u6301\u7684\u6587\u4ef6\u7c7b\u578b.");
                this.debug("\u9519\u8bef\u4ee3\u7801: \u4e0d\u652f\u6301\u7684\u6587\u4ef6\u7c7b\u578b, \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break;
            default:
                if (file !== null) {
                    progress.setStatus("\u672a\u5904\u7406\u7684\u9519\u8bef")
                }
                this.debug("\u9519\u8bef\u4ee3\u7801: " + errorCode + ", \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break
        }
    } catch(ex) {
        this.debug(ex)
    }
};
swfUpload.fileDialogComplete = function(numFilesSelected, numFilesQueued) {
    try {
        if (numFilesSelected > 0) {
            swfUpload.picNum = numFilesSelected
        }
        this.startUpload()
    } catch(ex) {
        this.debug(ex)
    }
};
swfUpload.uploadStart = function(file) {
    if ($("#isWaterMark").attr("checked")) {
        var isWaterMark = 1
    } else {
        var isWaterMark = 0
    }
    var postobj = {
        "PHPSESSID": "fb",
        "isWaterMark": isWaterMark,
        "bbsid": $("#bbsID").val(),
        "userid": get_cookie("zol_userid"),
        "boardid": WEB_CONFIG.boardid
    };
    this.setPostParams(postobj);
    $("#managePicList").css({
        top: "-40px",
        position: "absolute",
        zIndex: "-1"
    });
    $("#managePicList").show();
    $("#cancelPicUpload").show();
    swfUpload.uploadArea.append(swfUpload.onloadHtml);
    var curLen = swfUpload.uploadArea.height();
    var stepH = curLen > 256 ? curLen - 256: 0;
    if (stepH) {
        $(".illustrated .turn-up").css("visibility", "visible").show();
        swfUpload.uploadArea.closest("div").scrollTop(stepH)
    }
};
swfUpload.uploadProgress = function(file, bytesLoaded, bytesTotal) {
    try {
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        if (percent) {
            $("#picProgressBar").css("width", percent + "%")
        }
    } catch(ex) {
        throw (ex);
        this.debug(ex)
    }
};
swfUpload.handleServerData = function(serverData) {
    var li_html = "";
    //var msg = serverData.split("#");
	var response = eval('(' + serverData + ')');
    var picurl = "http://123.59.53.158/"+response["result"];
    var picid = response["result"];
    //var exif = msg[2];
    //var height = msg[3];
    //var suffix = msg[4];
    //var hasCustWater = typeof msg[5] != "undefined" ? msg[5] : false;
    var preview_src = picurl.replace("t_s80x60", "t_s210x6000");
    if (picid) {
        li_html += '<li id="' + picid + "\" onmouseover=\"$(this).addClass('hover');$('#preview img').attr('src', '" + preview_src + "').attr('height',200);$('#preview').show();\" onmouseout=\"$(this).removeClass('hover');$('#preview img').attr('src', '').attr('height', '');$('#preview').hide();\">            <img class=\"border-radius\" src=\"" + picurl + '" alt="">            <input type="hidden" value="' + picurl + '" />            <em class="close" onclick="javascript:FB.delUploadPic(' + picid + ')"></em>            <span class="mask-layer" data-exif="2">                <span class="pic-edit" onclick="FB.editUploadPic(\'' + picurl + "','" + picid + '\');">\u7f8e\u5316</span>                <span class="insert-btn" onclick="FB.insertUploadPic(\'' + picurl + "');\">\u63d2\u5165</span>            </span>        </li>";
        swfUpload.uploadArea.append(li_html)
    }
};
swfUpload.uploadSuccess = function(file, serverData) {
    $(".in-load").remove();
    if (serverData) {
        swfUpload.handleServerData(serverData)
    }
};
swfUpload.uploadError = function(file, errorCode, message) {
    if (errorCode == "-280") {
        return true
    }
    var errorMsg = "";
    switch (message) {
        case "500":
            errorMsg = "<span>\u6587\u4ef6\u8d85\u8fc75M</span>";
            break;
        case "501":
            errorMsg = "<span>\u56fe\u7247\u5f02\u5e38</span>";
            break;
        default:
            errorMsg = "<span>\u4e0a\u4f20\u5931\u8d25</span>";
            break
    }
    var html = "<li>" + file.name + errorMsg + "</li>"
};
swfUpload.uploadComplete = function() {};
swfUpload.queueComplete = function(numFilesUploaded) {
    $("#managePicList").css({
        top: 0,
        position: "",
        zIndex: "1"
    });
    $("#cancelPicUpload").hide()
};
swfUpload.cancel = function() {
    swfu.cancelQueue();
    swfu2.cancelQueue();
    $(".in-load").remove();
    swfUpload.queueComplete()
};
swfUpload.fileQueued_Attach = function(file) {};
swfUpload.myError = function(name, msg) {
    var err_html = '<li id="attachUploadErr"><span class="file-name"><i class="ico"></i>' + name + "</span>	   <span>" + msg + "</span></li>";
    swfUpload.uploadAttachArea.append(err_html);
    setTimeout(function() {
            $("#attachUploadErr").remove()
        },
        2000)
};
swfUpload.fileQueueError_Attach = function(file, errorCode, message) {
    try {
        if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            alert("\u60a8\u6b63\u5728\u4e0a\u4f20\u7684\u6587\u4ef6\u961f\u5217\u8fc7\u591a.\n" + (message == 0 ? "\u60a8\u5df2\u8fbe\u5230\u4e0a\u4f20\u9650\u5236": "\u60a8\u6700\u591a\u80fd\u9009\u62e9 " + (message > 1 ? "\u4e0a\u4f20 " + message + " \u6587\u4ef6.": "\u4e00\u4e2a\u6587\u4ef6.")));
            return
        }
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                swfUpload.myError(file.name, "\u6587\u4ef6\u5c3a\u5bf8\u8fc7\u5927");
                this.debug("\u9519\u8bef\u4ee3\u7801: \u6587\u4ef6\u5c3a\u5bf8\u8fc7\u5927, \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                swfUpload.myError(file.name, "\u65e0\u6cd5\u4e0a\u4f20\u96f6\u5b57\u8282\u6587\u4ef6");
                this.debug("\u9519\u8bef\u4ee3\u7801: \u96f6\u5b57\u8282\u6587\u4ef6, \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                swfUpload.myError(file.name, "\u4e0d\u652f\u6301\u7684\u6587\u4ef6\u7c7b\u578b");
                this.debug("\u9519\u8bef\u4ee3\u7801: \u4e0d\u652f\u6301\u7684\u6587\u4ef6\u7c7b\u578b, \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break;
            default:
                if (file !== null) {
                    swfUpload.myError(file.name, "\u672a\u5904\u7406\u7684\u9519\u8bef")
                }
                this.debug("\u9519\u8bef\u4ee3\u7801: " + errorCode + ", \u6587\u4ef6\u540d: " + file.name + ", \u6587\u4ef6\u5c3a\u5bf8: " + file.size + ", \u4fe1\u606f: " + message);
                break
        }
    } catch(ex) {
        this.debug(ex)
    }
};
swfUpload.fileDialogComplete_Attach = function(numFilesSelected, numFilesQueued) {
    try {
        if (numFilesSelected > 0) {
            swfUpload.attachNum = numFilesSelected
        }
        this.startUpload()
    } catch(ex) {
        this.debug(ex)
    }
};
swfUpload.uploadStart_Attach = function(file) {
    if ($("#postSetTopAttach").attr("checked")) {
        var postSetTopAttach = 1
    } else {
        var postSetTopAttach = 0
    }
    var bid = typeof Publish_Config != "undefined" ? Publish_Config.boardid: boardid;
    var postobj = {
        "PHPSESSID": "fb",
        "postSetTopAttach": postSetTopAttach,
        "boardid": bid,
        "bbsid": $("#bbsID").val(),
        "userid": get_cookie("zol_userid")
    };
    this.setPostParams(postobj);
    swfUpload.uploadAttachArea.append(swfUpload.onloadAttachHtml);
    $(".uploading").find(".file-name").text(file.name)
};
swfUpload.uploadProgress_Attach = function(file, bytesLoaded, bytesTotal) {
    try {
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        if (percent) {
            $("#attachProgressBar").text(percent)
        }
    } catch(ex) {
        throw (ex);
        this.debug(ex)
    }
};
swfUpload.uploadSuccess_Attach = function(file, serverData) {
    $(".uploading").remove();
    try {
        if (serverData) {
            var li_html = "";
			alert(serverData);
			var response = eval('(' + serverData + ')');
            var msg = serverData.split("#");
            var picurl = msg[0];
            var attachid = msg[1];
            if (picurl.length > 0) {
                var preview_src = picurl.replace("t_s80x60", "t_s210x6000");
                li_html += '<li id="' + response["result"] + '" >				    <img class="attach-pic border-radius" width="192" height="142" src="http://123.59.53.158/' + response["result"] + '" alt="">					<span onclick="javascript:FB.insertAttachment(\'' + response["result"] + "')\" onmouseover=\"$(this).closest('li').addClass('attach-list-hover');\" onmouseout=\"$(this).closest('li').removeClass('attach-list-hover');\" class=\"file-pic-name\"><i class=\"ico\"></i>" + file.name + "</span>"
            } else {
                li_html += '<li id="' + response["result"] + '" >				<span class="file-name" onclick="javascript:FB.insertAttachment(\'' + response["result"] + '\')"><i class="ico"></i>' + file.name + "</span>"
            }
            li_html += '<input type="hidden" value="' + file.name + '" name="fileName[]"/>';
            li_html += '<input type="hidden" value="' + response["result"] + '" name="attachid[]"/>';
            if ($("#postSetTopAttach").attr("checked") == "checked") {
                var is_disabled = "";
                var class_name = ""
            } else {
                var is_disabled = 'disabled="disabled"';
                var class_name = "text-disabled"
            }
            li_html += '<input class="text border-radius" type="text" name="description[]" value="">				<input class="text file-price border-radius ' + class_name + '" type="text" name="filePrice[]" value="" ' + is_disabled + '>				<span class="delete-btn" onclick="javascript:FB.delUploadAttach(\'' + attachid + "');$(this).closest('li').remove();\">\u5220\u9664</span>			</li>";
            swfUpload.uploadAttachArea.append(li_html);
            $("#attachUploadArea .file-price").bind("blur",
                function() {
                    var p = parseInt($(this).val());
                    if (p > 20) {
                        Layer.showTips({
                            type: "warn",
                            content: "\u5355\u4e2a\u9644\u4ef6\u7684\u6700\u9ad8\u552e\u4ef7\u4e0d\u5f97\u9ad8\u4e8e20Z\u91d1\u8c46~"
                        });
                        return false
                    }
                    if (p < 0) {
                        Layer.showTips({
                            type: "warn",
                            content: "\u5355\u4e2a\u9644\u4ef6\u7684\u6700\u4f4e\u552e\u4ef7\u4e0d\u5f97\u5c0f\u4e8e0Z\u91d1\u8c46~"
                        });
                        return false
                    }
                })
        }
    } catch(e) {
        throw e
    }
};
swfUpload.uploadError_Attach = function(file, errorCode, message) {
    if (errorCode == "-280") {
        return true
    }
    var errorMsg = "";
    switch (message) {
        case "500":
            errorMsg = "<span>\u6587\u4ef6\u8d85\u8fc75M</span>";
            break;
        case "501":
            errorMsg = "<span>\u6587\u4ef6\u5f02\u5e38</span>";
            break;
        default:
            errorMsg = "<span>\u4e0a\u4f20\u5931\u8d25</span>";
            break
    }
};
swfUpload.uploadComplete_Attach = function() {};
swfUpload.queueComplete_Attach = function(numFilesUploaded) {};
swfUpload.cancel_Attach = function() {
    swfa.cancelQueue()
};
var SWFUpload;
if (SWFUpload == undefined) {
    SWFUpload = function(settings) {
        this.initSWFUpload(settings)
    }
}

SWFUpload.prototype.initSWFUpload = function(settings) {
    try {
        this.customSettings = {};
        this.settings = settings;
        this.eventQueue = [];
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings();
        this.loadFlash();
        this.displayDebugInfo()
    } catch(ex) {
        delete SWFUpload.instances[this.movieName];
        throw ex;
    }
};

SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.2.0 Beta 2";
SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};
SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR: -200,
    MISSING_UPLOAD_URL: -210,
    IO_ERROR: -220,
    SECURITY_ERROR: -230,
    UPLOAD_LIMIT_EXCEEDED: -240,
    UPLOAD_FAILED: -250,
    SPECIFIED_FILE_ID_NOT_FOUND: -260,
    FILE_VALIDATION_FAILED: -270,
    FILE_CANCELLED: -280,
    UPLOAD_STOPPED: -290
};
SWFUpload.FILE_STATUS = {
    QUEUED: -1,
    IN_PROGRESS: -2,
    ERROR: -3,
    COMPLETE: -4,
    CANCELLED: -5
};
SWFUpload.BUTTON_ACTION = {
    SELECT_FILE: -100,
    SELECT_FILES: -110,
    START_UPLOAD: -120
};
SWFUpload.CURSOR = {
    ARROW: -1,
    HAND: -2
};
SWFUpload.WINDOW_MODE = {
    WINDOW: "window",
    TRANSPARENT: "transparent",
    OPAQUE: "opaque"
};
SWFUpload.prototype.initSettings = function() {
    this.ensureDefault = function(settingName, defaultValue) {
        this.settings[settingName] = (this.settings[settingName] == undefined) ? defaultValue: this.settings[settingName]
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("file_post_name", "uploadedfile");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", false);
    this.ensureDefault("requeue_on_error", false);
    this.ensureDefault("http_success", []);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("prevent_swf_caching", true);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", false);
    this.ensureDefault("button_placeholder_id", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);
    this.ensureDefault("debug", false);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings;
    if (this.settings.prevent_swf_caching) {
        this.settings.flash_url = this.settings.flash_url + "?swfuploadrnd=" + Math.floor(Math.random() * 999999999)
    }
    delete this.ensureDefault
};
SWFUpload.prototype.loadFlash = function() {
    if (this.settings.button_placeholder_id !== "") {
        this.replaceWithFlash()
    } else {
        this.appendFlash()
    }
};
SWFUpload.prototype.appendFlash = function() {
    var targetElement,
        container;
    if (document.getElementById(this.movieName) !== null) {
        throw "ID " + this.movieName + " is already in use. The Flash Object could not be added"
    }
    targetElement = document.getElementsByTagName("body")[0];
    if (targetElement == undefined) {
        throw "Could not find the 'body' element."
    }
    container = document.createElement("div");
    container.style.width = "1px";
    container.style.height = "1px";
    container.style.overflow = "hidden";
    targetElement.appendChild(container);
    container.innerHTML = this.getFlashHTML()
};
SWFUpload.prototype.replaceWithFlash = function() {
    var targetElement,
        tempParent;
    if (document.getElementById(this.movieName) !== null) {
        throw "ID " + this.movieName + " is already in use. The Flash Object could not be added"
    }
    targetElement = document.getElementById(this.settings.button_placeholder_id);
    if (targetElement == undefined) {
        throw "Could not find the placeholder element."
    }
    tempParent = document.createElement("div");
    tempParent.innerHTML = this.getFlashHTML();
    targetElement.parentNode.replaceChild(tempParent.firstChild, targetElement)
};
SWFUpload.prototype.getFlashHTML = function() {
    var classid = "";
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject) {
        Sys.ie = ua.match(/msie ([\d.]+)/)[1]
    }
    if (Sys.ie && (Sys.ie.substring(0, 1) == "9" || Sys.ie.substring(0, 2) == "10")) {
        classid = ' classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'
    }
    return ["<object", classid, ' id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
};
SWFUpload.prototype.getFlashVars = function() {
    var paramString = this.buildParamString();
    var httpSuccessString = this.settings.http_success.join(",");
    return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(httpSuccessString), "&amp;params=", encodeURIComponent(paramString), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
};
SWFUpload.prototype.getMovieElement = function() {
    if (this.movieElement == undefined) {
        this.movieElement = document.getElementById(this.movieName)
    }
    if (this.movieElement === null) {
        throw "Could not find Flash element"
    }
    return this.movieElement
};
SWFUpload.prototype.buildParamString = function() {
    var postParams = this.settings.post_params;
    var paramStringPairs = [];
    if (typeof(postParams) === "object") {
        for (var name in postParams) {
            if (postParams.hasOwnProperty(name)) {
                paramStringPairs.push(encodeURIComponent(name.toString()) + "=" + encodeURIComponent(postParams[name].toString()))
            }
        }
    }
    return paramStringPairs.join("&amp;")
};
SWFUpload.prototype.destroy = function() {
    try {
        this.stopUpload();
        var movieElement = null;
        try {
            movieElement = this.getMovieElement()
        } catch(ex) {}
        SWFUpload.instances[this.movieName] = null;
        delete SWFUpload.instances[this.movieName];
        delete this.movieElement;
        delete this.settings;
        delete this.customSettings;
        delete this.eventQueue;
        delete this.movieName;
        delete window[this.movieName];
        return true
    } catch(ex1) {
        return false
    }
};
SWFUpload.prototype.displayDebugInfo = function() {
    this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "), "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n", "\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n", "\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n", "\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n", "\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n", "\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n", "\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n", "\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n", "\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n", "\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"].join(""))
};
SWFUpload.prototype.addSetting = function(name, value, default_value) {
    if (value == undefined) {
        return (this.settings[name] = default_value)
    } else {
        return (this.settings[name] = value)
    }
};
SWFUpload.prototype.getSetting = function(name) {
    if (this.settings[name] != undefined) {
        return this.settings[name]
    }
    return ""
};
SWFUpload.prototype.callFlash = function(functionName, argumentArray) {
    argumentArray = argumentArray || [];
    var movieElement = this.getMovieElement();
    var returnValue;
    if (typeof movieElement[functionName] === "function") {
        if (argumentArray.length === 0) {
            returnValue = movieElement[functionName]()
        } else {
            if (argumentArray.length === 1) {
                returnValue = movieElement[functionName](argumentArray[0])
            } else {
                if (argumentArray.length === 2) {
                    returnValue = movieElement[functionName](argumentArray[0], argumentArray[1])
                } else {
                    if (argumentArray.length === 3) {
                        returnValue = movieElement[functionName](argumentArray[0], argumentArray[1], argumentArray[2])
                    } else {
                        throw "Too many arguments"
                    }
                }
            }
        }
        if (returnValue != undefined && typeof returnValue.post === "object") {
            returnValue = this.unescapeFilePostParams(returnValue)
        }
        return returnValue
    } else {
        throw "Invalid function name: " + functionName
    }
};
SWFUpload.prototype.selectFile = function() {
    this.callFlash("SelectFile")
};
SWFUpload.prototype.selectFiles = function() {
    this.callFlash("SelectFiles")
};
SWFUpload.prototype.startUpload = function(fileID) {
    this.callFlash("StartUpload", [fileID])
};
SWFUpload.prototype.cancelUpload = function(fileID, triggerErrorEvent) {
    if (triggerErrorEvent !== false) {
        triggerErrorEvent = true
    }
    this.callFlash("CancelUpload", [fileID, triggerErrorEvent])
};
SWFUpload.prototype.stopUpload = function() {
    this.callFlash("StopUpload")
};
SWFUpload.prototype.getStats = function() {
    return this.callFlash("GetStats")
};
SWFUpload.prototype.setStats = function(statsObject) {
    this.callFlash("SetStats", [statsObject])
};
SWFUpload.prototype.getFile = function(fileID) {
    if (typeof(fileID) === "number") {
        return this.callFlash("GetFileByIndex", [fileID])
    } else {
        return this.callFlash("GetFile", [fileID])
    }
};
SWFUpload.prototype.addFileParam = function(fileID, name, value) {
    return this.callFlash("AddFileParam", [fileID, name, value])
};
SWFUpload.prototype.removeFileParam = function(fileID, name) {
    this.callFlash("RemoveFileParam", [fileID, name])
};
SWFUpload.prototype.setUploadURL = function(url) {
    this.settings.upload_url = url.toString();
    this.callFlash("SetUploadURL", [url])
};
SWFUpload.prototype.setPostParams = function(paramsObject) {
    this.settings.post_params = paramsObject;
    this.callFlash("SetPostParams", [paramsObject])
};
SWFUpload.prototype.addPostParam = function(name, value) {
    this.settings.post_params[name] = value;
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.removePostParam = function(name) {
    delete this.settings.post_params[name];
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.setFileTypes = function(types, description) {
    this.settings.file_types = types;
    this.settings.file_types_description = description;
    this.callFlash("SetFileTypes", [types, description])
};
SWFUpload.prototype.setFileSizeLimit = function(fileSizeLimit) {
    this.settings.file_size_limit = fileSizeLimit;
    this.callFlash("SetFileSizeLimit", [fileSizeLimit])
};
SWFUpload.prototype.setFileUploadLimit = function(fileUploadLimit) {
    this.settings.file_upload_limit = fileUploadLimit;
    this.callFlash("SetFileUploadLimit", [fileUploadLimit])
};
SWFUpload.prototype.setFileQueueLimit = function(fileQueueLimit) {
    this.settings.file_queue_limit = fileQueueLimit;
    this.callFlash("SetFileQueueLimit", [fileQueueLimit])
};
SWFUpload.prototype.setFilePostName = function(filePostName) {
    this.settings.file_post_name = filePostName;
    this.callFlash("SetFilePostName", [filePostName])
};
SWFUpload.prototype.setUseQueryString = function(useQueryString) {
    this.settings.use_query_string = useQueryString;
    this.callFlash("SetUseQueryString", [useQueryString])
};
SWFUpload.prototype.setRequeueOnError = function(requeueOnError) {
    this.settings.requeue_on_error = requeueOnError;
    this.callFlash("SetRequeueOnError", [requeueOnError])
};
SWFUpload.prototype.setHTTPSuccess = function(http_status_codes) {
    if (typeof http_status_codes === "string") {
        http_status_codes = http_status_codes.replace(" ", "").split(",")
    }
    this.settings.http_success = http_status_codes;
    this.callFlash("SetHTTPSuccess", [http_status_codes])
};
SWFUpload.prototype.setDebugEnabled = function(debugEnabled) {
    this.settings.debug_enabled = debugEnabled;
    this.callFlash("SetDebugEnabled", [debugEnabled])
};
SWFUpload.prototype.setButtonImageURL = function(buttonImageURL) {
    if (buttonImageURL == undefined) {
        buttonImageURL = ""
    }
    this.settings.button_image_url = buttonImageURL;
    this.callFlash("SetButtonImageURL", [buttonImageURL])
};
SWFUpload.prototype.setButtonDimensions = function(width, height) {
    this.settings.button_width = width;
    this.settings.button_height = height;
    var movie = this.getMovieElement();
    if (movie != undefined) {
        movie.style.width = width + "px";
        movie.style.height = height + "px"
    }
    this.callFlash("SetButtonDimensions", [width, height])
};
SWFUpload.prototype.setButtonText = function(html) {
    this.settings.button_text = html;
    this.callFlash("SetButtonText", [html])
};
SWFUpload.prototype.setButtonTextPadding = function(left, top) {
    this.settings.button_text_top_padding = top;
    this.settings.button_text_left_padding = left;
    this.callFlash("SetButtonTextPadding", [left, top])
};
SWFUpload.prototype.setButtonTextStyle = function(css) {
    this.settings.button_text_style = css;
    this.callFlash("SetButtonTextStyle", [css])
};
SWFUpload.prototype.setButtonDisabled = function(isDisabled) {
    this.settings.button_disabled = isDisabled;
    this.callFlash("SetButtonDisabled", [isDisabled])
};
SWFUpload.prototype.setButtonAction = function(buttonAction) {
    this.settings.button_action = buttonAction;
    this.callFlash("SetButtonAction", [buttonAction])
};
SWFUpload.prototype.setButtonCursor = function(cursor) {
    this.settings.button_cursor = cursor;
    this.callFlash("SetButtonCursor", [cursor])
};
SWFUpload.prototype.queueEvent = function(handlerName, argumentArray) {
    if (argumentArray == undefined) {
        argumentArray = []
    } else {
        if (! (argumentArray instanceof Array)) {
            argumentArray = [argumentArray]
        }
    }
    var self = this;
    if (typeof this.settings[handlerName] === "function") {
        this.eventQueue.push(function() {
            this.settings[handlerName].apply(this, argumentArray)
        });
        setTimeout(function() {
                self.executeNextEvent()
            },
            0)
    } else {
        if (this.settings[handlerName] !== null) {
            throw "Event handler " + handlerName + " is unknown or is not a function"
        }
    }
};
SWFUpload.prototype.executeNextEvent = function() {
    var f = this.eventQueue ? this.eventQueue.shift() : null;
    if (typeof(f) === "function") {
        f.apply(this)
    }
};
SWFUpload.prototype.unescapeFilePostParams = function(file) {
    var reg = /[$]([0-9a-f]{4})/i;
    var unescapedPost = {};
    var uk;
    if (file != undefined) {
        for (var k in file.post) {
            if (file.post.hasOwnProperty(k)) {
                uk = k;
                var match;
                while ((match = reg.exec(uk)) !== null) {
                    uk = uk.replace(match[0], String.fromCharCode(parseInt("0x" + match[1], 16)))
                }
                unescapedPost[uk] = file.post[k]
            }
        }
        file.post = unescapedPost
    }
    return file
};
SWFUpload.prototype.flashReady = function() {
    var movieElement = this.getMovieElement();
    if (typeof movieElement.StartUpload !== "function") {
        throw "ExternalInterface methods failed to initialize."
    }
    if (window[this.movieName] == undefined) {
        window[this.movieName] = movieElement
    }
    this.queueEvent("swfupload_loaded_handler")
};
SWFUpload.prototype.fileDialogStart = function() {
    this.queueEvent("file_dialog_start_handler")
};
SWFUpload.prototype.fileQueued = function(file) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("file_queued_handler", file)
};
SWFUpload.prototype.fileQueueError = function(file, errorCode, message) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("file_queue_error_handler", [file, errorCode, message])
};
SWFUpload.prototype.fileDialogComplete = function(numFilesSelected, numFilesQueued) {
    this.queueEvent("file_dialog_complete_handler", [numFilesSelected, numFilesQueued])
};
SWFUpload.prototype.uploadStart = function(file) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("return_upload_start_handler", file)
};
SWFUpload.prototype.returnUploadStart = function(file) {
    var returnValue;
    if (typeof this.settings.upload_start_handler === "function") {
        file = this.unescapeFilePostParams(file);
        returnValue = this.settings.upload_start_handler.call(this, file)
    } else {
        if (this.settings.upload_start_handler != undefined) {
            throw "upload_start_handler must be a function"
        }
    }
    if (returnValue === undefined) {
        returnValue = true
    }
    returnValue = !!returnValue;
    this.callFlash("ReturnUploadStart", [returnValue])
};
SWFUpload.prototype.uploadProgress = function(file, bytesComplete, bytesTotal) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_progress_handler", [file, bytesComplete, bytesTotal])
};
SWFUpload.prototype.uploadError = function(file, errorCode, message) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_error_handler", [file, errorCode, message])
};
SWFUpload.prototype.uploadSuccess = function(file, serverData) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_success_handler", [file, serverData])
};
SWFUpload.prototype.uploadComplete = function(file) {
    file = this.unescapeFilePostParams(file);
    this.queueEvent("upload_complete_handler", file)
};
SWFUpload.prototype.debug = function(message) {
    this.queueEvent("debug_handler", message)
};
SWFUpload.prototype.debugMessage = function(message) {
    if (this.settings.debug) {
        var exceptionMessage,
            exceptionValues = [];
        if (typeof message === "object" && typeof message.name === "string" && typeof message.message === "string") {
            for (var key in message) {
                if (message.hasOwnProperty(key)) {
                    exceptionValues.push(key + ": " + message[key])
                }
            }
            exceptionMessage = exceptionValues.join("\n") || "";
            exceptionValues = exceptionMessage.split("\n");
            exceptionMessage = "EXCEPTION: " + exceptionValues.join("\nEXCEPTION: ");
            SWFUpload.Console.writeLine(exceptionMessage)
        } else {
            SWFUpload.Console.writeLine(message)
        }
    }
};
SWFUpload.Console = {};
SWFUpload.Console.writeLine = function(message) {
    var console,
        documentForm;
    try {
        console = document.getElementById("SWFUpload_Console");
        if (!console) {
            documentForm = document.createElement("form");
            document.getElementsByTagName("body")[0].appendChild(documentForm);
            console = document.createElement("textarea");
            console.id = "SWFUpload_Console";
            console.style.fontFamily = "monospace";
            console.setAttribute("wrap", "off");
            console.wrap = "off";
            console.style.overflow = "auto";
            console.style.width = "700px";
            console.style.height = "350px";
            console.style.margin = "5px";
            documentForm.appendChild(console)
        }
        console.value += message + "\n";
        console.scrollTop = console.scrollHeight - console.clientHeight
    } catch(ex) {
        alert("Exception: " + ex.name + " Message: " + ex.message)
    }
};
var SWFUpload;
if (typeof(SWFUpload) === "function") {
    SWFUpload.queue = {};
    SWFUpload.prototype.initSettings = (function(oldInitSettings) {
        return function() {
            if (typeof(oldInitSettings) === "function") {
                oldInitSettings.call(this)
            }
            this.customSettings.queue_cancelled_flag = false;
            this.customSettings.queue_upload_count = 0;
            this.settings.user_upload_complete_handler = this.settings.upload_complete_handler;
            this.settings.upload_complete_handler = SWFUpload.queue.uploadCompleteHandler;
            this.settings.queue_complete_handler = this.settings.queue_complete_handler || null
        }
    })(SWFUpload.prototype.initSettings);
    SWFUpload.prototype.startUpload = function(fileID) {
        this.customSettings.queue_cancelled_flag = false;
        this.callFlash("StartUpload", false, [fileID])
    };
    SWFUpload.prototype.cancelQueue = function() {
        this.customSettings.queue_cancelled_flag = true;
        this.stopUpload();
        var stats = this.getStats();
        while (stats.files_queued > 0) {
            this.cancelUpload();
            stats = this.getStats()
        }
    };
    SWFUpload.queue.uploadCompleteHandler = function(file) {
        var user_upload_complete_handler = this.settings.user_upload_complete_handler;
        var continueUpload;
        if (file.filestatus === SWFUpload.FILE_STATUS.COMPLETE) {
            this.customSettings.queue_upload_count++
        }
        if (typeof(user_upload_complete_handler) === "function") {
            continueUpload = (user_upload_complete_handler.call(this, file) === false) ? false: true
        } else {
            continueUpload = true
        }
        if (continueUpload) {
            var stats = this.getStats();
            if (stats.files_queued > 0 && this.customSettings.queue_cancelled_flag === false) {
                this.startUpload()
            } else {
                if (this.customSettings.queue_cancelled_flag === false) {
                    this.queueEvent("queue_complete_handler", [this.customSettings.queue_upload_count]);
                    this.customSettings.queue_upload_count = 0
                } else {
                    this.customSettings.queue_cancelled_flag = false;
                    this.customSettings.queue_upload_count = 0
                }
            }
        }
    }
}
/*
 * jQuery UI Core 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function($, undefined) {
    var uuid = 0,
        runiqueId = /^ui-id-\d+$/;
    $.ui = $.ui || {};
    if ($.ui.version) {
        return
    }
    $.extend($.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    $.fn.extend({
        _focus: $.fn.focus,
        focus: function(delay, fn) {
            return typeof delay === "number" ? this.each(function() {
                var elem = this;
                setTimeout(function() {
                        $(elem).focus();
                        if (fn) {
                            fn.call(elem)
                        }
                    },
                    delay)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var scrollParent;
            if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                scrollParent = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test($.css(this, "position")) && (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"))
                }).eq(0)
            } else {
                scrollParent = this.parents().filter(function() {
                    return (/(auto|scroll)/).test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent
        },
        zIndex: function(zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex)
            }
            if (this.length) {
                var elem = $(this[0]),
                    position,
                    value;
                while (elem.length && elem[0] !== document) {
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value
                        }
                    }
                    elem = elem.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                if (!this.id) {
                    this.id = "ui-id-" + (++uuid)
                }
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                if (runiqueId.test(this.id)) {
                    $(this).removeAttr("id")
                }
            })
        }
    });
    function focusable(element, isTabIndexNotNaN) {
        var map,
            mapName,
            img,
            nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !! img && visible(img)
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled: "a" === nodeName ? element.href || isTabIndexNotNaN: isTabIndexNotNaN) && visible(element)
    }
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().andSelf().filter(function() {
                return $.css(this, "visibility") === "hidden"
            }).length
    }
    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !! $.data(elem, dataName)
            }
        }) : function(elem, i, match) {
            return !! $.data(elem, match[3])
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
    });
    $(function() {
        var body = document.body,
            div = body.appendChild(div = document.createElement("div"));
        div.offsetHeight;
        $.extend(div.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });
        $.support.minHeight = div.offsetHeight === 100;
        $.support.selectstart = "onselectstart" in div;
        body.removeChild(div).style.display = "none"
    });
    if (!$("<a>").outerWidth(1).jquery) {
        $.each(["Width", "Height"],
            function(i, name) {
                var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                    type = name.toLowerCase(),
                    orig = {
                        innerWidth: $.fn.innerWidth,
                        innerHeight: $.fn.innerHeight,
                        outerWidth: $.fn.outerWidth,
                        outerHeight: $.fn.outerHeight
                    };
                function reduce(elem, size, border, margin) {
                    $.each(side,
                        function() {
                            size -= parseFloat($.css(elem, "padding" + this)) || 0;
                            if (border) {
                                size -= parseFloat($.css(elem, "border" + this + "Width")) || 0
                            }
                            if (margin) {
                                size -= parseFloat($.css(elem, "margin" + this)) || 0
                            }
                        });
                    return size
                }
                $.fn["inner" + name] = function(size) {
                    if (size === undefined) {
                        return orig["inner" + name].call(this)
                    }
                    return this.each(function() {
                        $(this).css(type, reduce(this, size) + "px")
                    })
                };
                $.fn["outer" + name] = function(size, margin) {
                    if (typeof size !== "number") {
                        return orig["outer" + name].call(this, size)
                    }
                    return this.each(function() {
                        $(this).css(type, reduce(this, size, true, margin) + "px")
                    })
                }
            })
    }
    if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        $.fn.removeData = (function(removeData) {
            return function(key) {
                if (arguments.length) {
                    return removeData.call(this, $.camelCase(key))
                } else {
                    return removeData.call(this)
                }
            }
        })($.fn.removeData)
    } (function() {
        var uaMatch = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        $.ui.ie = uaMatch.length ? true: false;
        $.ui.ie6 = parseFloat(uaMatch[1], 10) === 6
    })();
    $.fn.extend({
        disableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
                function(event) {
                    event.preventDefault()
                })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var i,
                    proto = $.ui[module].prototype;
                for (i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]])
                }
            },
            call: function(instance, name, args) {
                var i,
                    set = instance.plugins[name];
                if (!set || !instance.element[0].parentNode || instance.element[0].parentNode.nodeType === 11) {
                    return
                }
                for (i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) {
                        set[i][1].apply(instance.element, args)
                    }
                }
            }
        },
        contains: $.contains,
        hasScroll: function(el, a) {
            if ($(el).css("overflow") === "hidden") {
                return false
            }
            var scroll = (a && a === "left") ? "scrollLeft": "scrollTop",
                has = false;
            if (el[scroll] > 0) {
                return true
            }
            el[scroll] = 1;
            has = (el[scroll] > 0);
            el[scroll] = 0;
            return has
        },
        isOverAxis: function(x, reference, size) {
            return (x > reference) && (x < (reference + size))
        },
        isOver: function(y, x, top, left, height, width) {
            return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width)
        }
    })
})(jQuery);
/*
 * jQuery UI Widget 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function($, undefined) {
    var uuid = 0,
        slice = Array.prototype.slice,
        _cleanData = $.cleanData;
    $.cleanData = function(elems) {
        for (var i = 0, elem; (elem = elems[i]) != null; i++) {
            try {
                $(elem).triggerHandler("remove")
            } catch(e) {}
        }
        _cleanData(elems)
    };
    $.widget = function(name, base, prototype) {
        var fullName,
            existingConstructor,
            constructor,
            basePrototype,
            namespace = name.split(".")[0];
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        if (!prototype) {
            prototype = base;
            base = $.Widget
        }
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !! $.data(elem, fullName)
        };
        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget) {
                return new constructor(options, element)
            }
            if (arguments.length) {
                this._createWidget(options, element)
            }
        };
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({},
                prototype),
            _childConstructors: []
        });
        basePrototype = new base();
        basePrototype.options = $.widget.extend({},
            basePrototype.options);
        $.each(prototype,
            function(prop, value) {
                if ($.isFunction(value)) {
                    prototype[prop] = (function() {
                        var _super = function() {
                                return base.prototype[prop].apply(this, arguments)
                            },
                            _superApply = function(args) {
                                return base.prototype[prop].apply(this, args)
                            };
                        return function() {
                            var __super = this._super,
                                __superApply = this._superApply,
                                returnValue;
                            this._super = _super;
                            this._superApply = _superApply;
                            returnValue = value.apply(this, arguments);
                            this._super = __super;
                            this._superApply = __superApply;
                            return returnValue
                        }
                    })()
                }
            });
        constructor.prototype = $.widget.extend(basePrototype, {
                widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix: name
            },
            prototype, {
                constructor: constructor,
                namespace: namespace,
                widgetName: name,
                widgetBaseClass: fullName,
                widgetFullName: fullName
            });
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors,
                function(i, child) {
                    var childPrototype = child.prototype;
                    $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
                });
            delete existingConstructor._childConstructors
        } else {
            base._childConstructors.push(constructor)
        }
        $.widget.bridge(name, constructor)
    };
    $.widget.extend = function(target) {
        var input = slice.call(arguments, 1),
            inputIndex = 0,
            inputLength = input.length,
            key,
            value;
        for (; inputIndex < inputLength; inputIndex++) {
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                    if ($.isPlainObject(value)) {
                        target[key] = $.isPlainObject(target[key]) ? $.widget.extend({},
                            target[key], value) : $.widget.extend({},
                            value)
                    } else {
                        target[key] = value
                    }
                }
            }
        }
        return target
    };
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = typeof options === "string",
                args = slice.call(arguments, 1),
                returnValue = this;
            options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
            if (isMethodCall) {
                this.each(function() {
                    var methodValue,
                        instance = $.data(this, fullName);
                    if (!instance) {
                        return $.error("cannot call methods on " + name + " prior to initialization; " + "attempted to call method '" + options + "'")
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return $.error("no such method '" + options + "' for " + name + " widget instance")
                    }
                    methodValue = instance[options].apply(instance, args);
                    if (methodValue !== instance && methodValue !== undefined) {
                        returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var instance = $.data(this, fullName);
                    if (instance) {
                        instance.option(options || {})._init()
                    } else {
                        $.data(this, fullName, new object(options, this))
                    }
                })
            }
            return returnValue
        }
    };
    $.Widget = function() {};
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({},
                this.options, this._getCreateOptions(), options);
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            if (element !== this) {
                $.data(element, this.widgetName, this);
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(event) {
                        if (event.target === element) {
                            this.destroy()
                        }
                    }
                });
                this.document = $(element.style ? element.ownerDocument: element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: $.noop,
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var options = key,
                parts,
                curOption,
                i;
            if (arguments.length === 0) {
                return $.widget.extend({},
                    this.options)
            }
            if (typeof key === "string") {
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({},
                        this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]]
                    }
                    key = parts.pop();
                    if (value === undefined) {
                        return curOption[key] === undefined ? null: curOption[key]
                    }
                    curOption[key] = value
                } else {
                    if (value === undefined) {
                        return this.options[key] === undefined ? null: this.options[key]
                    }
                    options[key] = value
                }
            }
            this._setOptions(options);
            return this
        },
        _setOptions: function(options) {
            var key;
            for (key in options) {
                this._setOption(key, options[key])
            }
            return this
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            if (key === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            }
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement,
                instance = this;
            if (typeof suppressDisabledCheck !== "boolean") {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false
            }
            if (!handlers) {
                handlers = element;
                element = this.element;
                delegateElement = this.widget()
            } else {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element)
            }
            $.each(handlers,
                function(event, handler) {
                    function handlerProxy() {
                        if (!suppressDisabledCheck && (instance.options.disabled === true || $(this).hasClass("ui-state-disabled"))) {
                            return
                        }
                        return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments)
                    }
                    if (typeof handler !== "string") {
                        handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++
                    }
                    var match = event.match(/^(\w+)\s*(.*)$/),
                        eventName = match[1] + instance.eventNamespace,
                        selector = match[2];
                    if (selector) {
                        delegateElement.delegate(selector, eventName, handlerProxy)
                    } else {
                        element.bind(eventName, handlerProxy)
                    }
                })
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName)
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments)
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0)
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(type, event, data) {
            var prop,
                orig,
                callback = this.options[type];
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type: this.widgetEventPrefix + type).toLowerCase();
            event.target = this.element[0];
            orig = event.originalEvent;
            if (orig) {
                for (prop in orig) {
                    if (! (prop in event)) {
                        event[prop] = orig[prop]
                    }
                }
            }
            this.element.trigger(event, data);
            return ! ($.isFunction(callback) && callback.apply(this.element[0], [event].concat(data)) === false || event.isDefaultPrevented())
        }
    };
    $.each({
            show: "fadeIn",
            hide: "fadeOut"
        },
        function(method, defaultEffect) {
            $.Widget.prototype["_" + method] = function(element, options, callback) {
                if (typeof options === "string") {
                    options = {
                        effect: options
                    }
                }
                var hasOptions,
                    effectName = !options ? method: options === true || typeof options === "number" ? defaultEffect: options.effect || defaultEffect;
                options = options || {};
                if (typeof options === "number") {
                    options = {
                        duration: options
                    }
                }
                hasOptions = !$.isEmptyObject(options);
                options.complete = callback;
                if (options.delay) {
                    element.delay(options.delay)
                }
                if (hasOptions && $.effects && ($.effects.effect[effectName] || $.uiBackCompat !== false && $.effects[effectName])) {
                    element[method](options)
                } else {
                    if (effectName !== method && element[effectName]) {
                        element[effectName](options.duration, options.easing, callback)
                    } else {
                        element.queue(function(next) {
                            $(this)[method]();
                            if (callback) {
                                callback.call(element[0])
                            }
                            next()
                        })
                    }
                }
            }
        });
    if ($.uiBackCompat !== false) {
        $.Widget.prototype._getCreateOptions = function() {
            return $.metadata && $.metadata.get(this.element[0])[this.widgetName]
        }
    }
})(jQuery);
/*
 * jQuery UI Mouse 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function($, undefined) {
    var mouseHandled = false;
    $(document).mouseup(function(e) {
        mouseHandled = false
    });
    $.widget("ui.mouse", {
        version: "1.9.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var that = this;
            this.element.bind("mousedown." + this.widgetName,
                function(event) {
                    return that._mouseDown(event)
                }).bind("click." + this.widgetName,
                function(event) {
                    if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
                        $.removeData(event.target, that.widgetName + ".preventClickEvent");
                        event.stopImmediatePropagation();
                        return false
                    }
                });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function(event) {
            if (mouseHandled) {
                return
            } (this._mouseStarted && this._mouseUp(event));
            this._mouseDownEvent = event;
            var that = this,
                btnIsLeft = (event.which === 1),
                elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length: false);
            if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                        that.mouseDelayMet = true
                    },
                    this.options.delay)
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(event) !== false);
                if (!this._mouseStarted) {
                    event.preventDefault();
                    return true
                }
            }
            if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
                $.removeData(event.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function(event) {
                return that._mouseMove(event)
            };
            this._mouseUpDelegate = function(event) {
                return that._mouseUp(event)
            };
            $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            event.preventDefault();
            mouseHandled = true;
            return true
        },
        _mouseMove: function(event) {
            if ($.ui.ie && !(document.documentMode >= 9) && !event.button) {
                return this._mouseUp(event)
            }
            if (this._mouseStarted) {
                this._mouseDrag(event);
                return event.preventDefault()
            }
            if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false); (this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event))
            }
            return ! this._mouseStarted
        },
        _mouseUp: function(event) {
            $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (event.target === this._mouseDownEvent.target) {
                    $.data(event.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(event)
            }
            return false
        },
        _mouseDistanceMet: function(event) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function(event) {
            return this.mouseDelayMet
        },
        _mouseStart: function(event) {},
        _mouseDrag: function(event) {},
        _mouseStop: function(event) {},
        _mouseCapture: function(event) {
            return true
        }
    })
})(jQuery);
/*
 * jQuery UI Sortable 1.9.2
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function($, undefined) {
    $.widget("ui.sortable", $.ui.mouse, {
        version: "1.9.2",
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        },
        _create: function() {
            var o = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? o.axis === "x" || (/left|right/).test(this.items[0].item.css("float")) || (/inline|table-cell/).test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit();
            this.ready = true
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled");
            this._mouseDestroy();
            for (var i = this.items.length - 1; i >= 0; i--) {
                this.items[i].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _setOption: function(key, value) {
            if (key === "disabled") {
                this.options[key] = value;
                this.widget().toggleClass("ui-sortable-disabled", !!value)
            } else {
                $.Widget.prototype._setOption.apply(this, arguments)
            }
        },
        _mouseCapture: function(event, overrideHandle) {
            var that = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(event);
            var currentItem = null,
                nodes = $(event.target).parents().each(function() {
                    if ($.data(this, that.widgetName + "-item") == that) {
                        currentItem = $(this);
                        return false
                    }
                });
            if ($.data(event.target, that.widgetName + "-item") == that) {
                currentItem = $(event.target)
            }
            if (!currentItem) {
                return false
            }
            if (this.options.handle && !overrideHandle) {
                var validHandle = false;
                $(this.options.handle, currentItem).find("*").andSelf().each(function() {
                    if (this == event.target) {
                        validHandle = true
                    }
                });
                if (!validHandle) {
                    return false
                }
            }
            this.currentItem = currentItem;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(event, overrideHandle, noActivation) {
            var o = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(event);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(event);
            this.originalPageX = event.pageX;
            this.originalPageY = event.pageY; (o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (o.containment) {
                this._setContainment()
            }
            if (o.cursor) {
                if ($("body").css("cursor")) {
                    this._storedCursor = $("body").css("cursor")
                }
                $("body").css("cursor", o.cursor)
            }
            if (o.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", o.opacity)
            }
            if (o.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", o.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", event, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!noActivation) {
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    this.containers[i]._trigger("activate", event, this._uiHash(this))
                }
            }
            if ($.ui.ddmanager) {
                $.ui.ddmanager.current = this
            }
            if ($.ui.ddmanager && !o.dropBehaviour) {
                $.ui.ddmanager.prepareOffsets(this, event)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(event);
            return true
        },
        _mouseDrag: function(event) {
            this.position = this._generatePosition(event);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var o = this.options,
                    scrolled = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed
                    } else {
                        if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed
                    } else {
                        if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed
                        }
                    }
                } else {
                    if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
                        scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed)
                    } else {
                        if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)
                        }
                    }
                    if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
                        scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed)
                    } else {
                        if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
                            scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)
                        }
                    }
                }
                if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
                    $.ui.ddmanager.prepareOffsets(this, event)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var i = this.items.length - 1; i >= 0; i--) {
                var item = this.items[i],
                    itemElement = item.item[0],
                    intersection = this._intersectsWithPointer(item);
                if (!intersection) {
                    continue
                }
                if (item.instance !== this.currentContainer) {
                    continue
                }
                if (itemElement != this.currentItem[0] && this.placeholder[intersection == 1 ? "next": "prev"]()[0] != itemElement && !$.contains(this.placeholder[0], itemElement) && (this.options.type == "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)) {
                    this.direction = intersection == 1 ? "down": "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
                        this._rearrange(event, item)
                    } else {
                        break
                    }
                    this._trigger("change", event, this._uiHash());
                    break
                }
            }
            this._contactContainers(event);
            if ($.ui.ddmanager) {
                $.ui.ddmanager.drag(this, event)
            }
            this._trigger("sort", event, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(event, noPropagation) {
            if (!event) {
                return
            }
            if ($.ui.ddmanager && !this.options.dropBehaviour) {
                $.ui.ddmanager.drop(this, event)
            }
            if (this.options.revert) {
                var that = this;
                var cur = this.placeholder.offset();
                this.reverting = true;
                $(this.helper).animate({
                        left: cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] == document.body ? 0: this.offsetParent[0].scrollLeft),
                        top: cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] == document.body ? 0: this.offsetParent[0].scrollTop)
                    },
                    parseInt(this.options.revert, 10) || 500,
                    function() {
                        that._clear(event)
                    })
            } else {
                this._clear(event, noPropagation)
            }
            return false
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    this.containers[i]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[i].containerCache.over) {
                        this.containers[i]._trigger("out", null, this._uiHash(this));
                        this.containers[i].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                $.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    $(this.domPosition.prev).after(this.currentItem)
                } else {
                    $(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected);
            var str = [];
            o = o || {};
            $(items).each(function() {
                var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[-=_](.+)/));
                if (res) {
                    str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]))
                }
            });
            if (!str.length && o.key) {
                str.push(o.key + "=")
            }
            return str.join("&")
        },
        toArray: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected);
            var ret = [];
            o = o || {};
            items.each(function() {
                ret.push($(o.item || this).attr(o.attribute || "id") || "")
            });
            return ret
        },
        _intersectsWith: function(item) {
            var x1 = this.positionAbs.left,
                x2 = x1 + this.helperProportions.width,
                y1 = this.positionAbs.top,
                y2 = y1 + this.helperProportions.height;
            var l = item.left,
                r = l + item.width,
                t = item.top,
                b = t + item.height;
            var dyClick = this.offset.click.top,
                dxClick = this.offset.click.left;
            var isOverElement = (y1 + dyClick) > t && (y1 + dyClick) < b && (x1 + dxClick) > l && (x1 + dxClick) < r;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width": "height"] > item[this.floating ? "width": "height"])) {
                return isOverElement
            } else {
                return (l < x1 + (this.helperProportions.width / 2) && x2 - (this.helperProportions.width / 2) < r && t < y1 + (this.helperProportions.height / 2) && y2 - (this.helperProportions.height / 2) < b)
            }
        },
        _intersectsWithPointer: function(item) {
            var isOverElementHeight = (this.options.axis === "x") || $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
                isOverElementWidth = (this.options.axis === "y") || $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
                isOverElement = isOverElementHeight && isOverElementWidth,
                verticalDirection = this._getDragVerticalDirection(),
                horizontalDirection = this._getDragHorizontalDirection();
            if (!isOverElement) {
                return false
            }
            return this.floating ? (((horizontalDirection && horizontalDirection == "right") || verticalDirection == "down") ? 2: 1) : (verticalDirection && (verticalDirection == "down" ? 2: 1))
        },
        _intersectsWithSides: function(item) {
            var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height / 2), item.height),
                isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width / 2), item.width),
                verticalDirection = this._getDragVerticalDirection(),
                horizontalDirection = this._getDragHorizontalDirection();
            if (this.floating && horizontalDirection) {
                return ((horizontalDirection == "right" && isOverRightHalf) || (horizontalDirection == "left" && !isOverRightHalf))
            } else {
                return verticalDirection && ((verticalDirection == "down" && isOverBottomHalf) || (verticalDirection == "up" && !isOverBottomHalf))
            }
        },
        _getDragVerticalDirection: function() {
            var delta = this.positionAbs.top - this.lastPositionAbs.top;
            return delta != 0 && (delta > 0 ? "down": "up")
        },
        _getDragHorizontalDirection: function() {
            var delta = this.positionAbs.left - this.lastPositionAbs.left;
            return delta != 0 && (delta > 0 ? "right": "left")
        },
        refresh: function(event) {
            this._refreshItems(event);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var options = this.options;
            return options.connectWith.constructor == String ? [options.connectWith] : options.connectWith
        },
        _getItemsAsjQuery: function(connected) {
            var items = [];
            var queries = [];
            var connectWith = this._connectWith();
            if (connectWith && connected) {
                for (var i = connectWith.length - 1; i >= 0; i--) {
                    var cur = $(connectWith[i]);
                    for (var j = cur.length - 1; j >= 0; j--) {
                        var inst = $.data(cur[j], this.widgetName);
                        if (inst && inst != this && !inst.options.disabled) {
                            queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst])
                        }
                    }
                }
            }
            queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var i = queries.length - 1; i >= 0; i--) {
                queries[i][0].each(function() {
                    items.push(this)
                })
            }
            return $(items)
        },
        _removeCurrentsFromItems: function() {
            var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = $.grep(this.items,
                function(item) {
                    for (var j = 0; j < list.length; j++) {
                        if (list[j] == item.item[0]) {
                            return false
                        }
                    }
                    return true
                })
        },
        _refreshItems: function(event) {
            this.items = [];
            this.containers = [this];
            var items = this.items;
            var queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
                item: this.currentItem
            }) : $(this.options.items, this.element), this]];
            var connectWith = this._connectWith();
            if (connectWith && this.ready) {
                for (var i = connectWith.length - 1; i >= 0; i--) {
                    var cur = $(connectWith[i]);
                    for (var j = cur.length - 1; j >= 0; j--) {
                        var inst = $.data(cur[j], this.widgetName);
                        if (inst && inst != this && !inst.options.disabled) {
                            queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
                                item: this.currentItem
                            }) : $(inst.options.items, inst.element), inst]);
                            this.containers.push(inst)
                        }
                    }
                }
            }
            for (var i = queries.length - 1; i >= 0; i--) {
                var targetData = queries[i][1];
                var _queries = queries[i][0];
                for (var j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
                    var item = $(_queries[j]);
                    item.data(this.widgetName + "-item", targetData);
                    items.push({
                        item: item,
                        instance: targetData,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(fast) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var i = this.items.length - 1; i >= 0; i--) {
                var item = this.items[i];
                if (item.instance != this.currentContainer && this.currentContainer && item.item[0] != this.currentItem[0]) {
                    continue
                }
                var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;
                if (!fast) {
                    item.width = t.outerWidth();
                    item.height = t.outerHeight()
                }
                var p = t.offset();
                item.left = p.left;
                item.top = p.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    var p = this.containers[i].element.offset();
                    this.containers[i].containerCache.left = p.left;
                    this.containers[i].containerCache.top = p.top;
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function(that) {
            that = that || this;
            var o = that.options;
            if (!o.placeholder || o.placeholder.constructor == String) {
                var className = o.placeholder;
                o.placeholder = {
                    element: function() {
                        var el = $(document.createElement(that.currentItem[0].nodeName)).addClass(className || that.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!className) {
                            el.style.visibility = "hidden"
                        }
                        return el
                    },
                    update: function(container, p) {
                        if (className && !o.forcePlaceholderSize) {
                            return
                        }
                        if (!p.height()) {
                            p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!p.width()) {
                            p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));
            that.currentItem.after(that.placeholder);
            o.placeholder.update(that, that.placeholder)
        },
        _contactContainers: function(event) {
            var innermostContainer = null,
                innermostIndex = null;
            for (var i = this.containers.length - 1; i >= 0; i--) {
                if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[i].containerCache)) {
                    if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
                        continue
                    }
                    innermostContainer = this.containers[i];
                    innermostIndex = i
                } else {
                    if (this.containers[i].containerCache.over) {
                        this.containers[i]._trigger("out", event, this._uiHash(this));
                        this.containers[i].containerCache.over = 0
                    }
                }
            }
            if (!innermostContainer) {
                return
            }
            if (this.containers.length === 1) {
                this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
                this.containers[innermostIndex].containerCache.over = 1
            } else {
                var dist = 10000;
                var itemWithLeastDistance = null;
                var posProperty = this.containers[innermostIndex].floating ? "left": "top";
                var sizeProperty = this.containers[innermostIndex].floating ? "width": "height";
                var base = this.positionAbs[posProperty] + this.offset.click[posProperty];
                for (var j = this.items.length - 1; j >= 0; j--) {
                    if (!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
                        continue
                    }
                    if (this.items[j].item[0] == this.currentItem[0]) {
                        continue
                    }
                    var cur = this.items[j].item.offset()[posProperty];
                    var nearBottom = false;
                    if (Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base)) {
                        nearBottom = true;
                        cur += this.items[j][sizeProperty]
                    }
                    if (Math.abs(cur - base) < dist) {
                        dist = Math.abs(cur - base);
                        itemWithLeastDistance = this.items[j];
                        this.direction = nearBottom ? "up": "down"
                    }
                }
                if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
                    return
                }
                this.currentContainer = this.containers[innermostIndex];
                itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
                this._trigger("change", event, this._uiHash());
                this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
                this.containers[innermostIndex].containerCache.over = 1
            }
        },
        _createHelper: function(event) {
            var o = this.options;
            var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!helper.parents("body").length) {
                $(o.appendTo != "parent" ? o.appendTo: this.currentItem[0].parentNode)[0].appendChild(helper[0])
            }
            if (helper[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (helper[0].style.width == "" || o.forceHelperSize) {
                helper.width(this.currentItem.width())
            }
            if (helper[0].style.height == "" || o.forceHelperSize) {
                helper.height(this.currentItem.height())
            }
            return helper
        },
        _adjustOffsetFromHelper: function(obj) {
            if (typeof obj == "string") {
                obj = obj.split(" ")
            }
            if ($.isArray(obj)) {
                obj = {
                    left: +obj[0],
                    top: +obj[1] || 0
                }
            }
            if ("left" in obj) {
                this.offset.click.left = obj.left + this.margins.left
            }
            if ("right" in obj) {
                this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left
            }
            if ("top" in obj) {
                this.offset.click.top = obj.top + this.margins.top
            }
            if ("bottom" in obj) {
                this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
                po.left += this.scrollParent.scrollLeft();
                po.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && $.ui.ie)) {
                po = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var p = this.currentItem.position();
                return {
                    top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var o = this.options;
            if (o.containment == "parent") {
                o.containment = this.helper[0].parentNode
            }
            if (o.containment == "document" || o.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $(o.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, ($(o.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (! (/^(document|window|parent)$/).test(o.containment)) {
                var ce = $(o.containment)[0];
                var co = $(o.containment).offset();
                var over = ($(ce).css("overflow") != "hidden");
                this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(d, pos) {
            if (!pos) {
                pos = this.position
            }
            var mod = d == "absolute" ? 1: -1;
            var o = this.options,
                scroll = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            return {
                top: (pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ((this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0: scroll.scrollTop())) * mod)),
                left: (pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ((this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0: scroll.scrollLeft()) * mod))
            }
        },
        _generatePosition: function(event) {
            var o = this.options,
                scroll = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
                scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var pageX = event.pageX;
            var pageY = event.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (event.pageX - this.offset.click.left < this.containment[0]) {
                        pageX = this.containment[0] + this.offset.click.left
                    }
                    if (event.pageY - this.offset.click.top < this.containment[1]) {
                        pageY = this.containment[1] + this.offset.click.top
                    }
                    if (event.pageX - this.offset.click.left > this.containment[2]) {
                        pageX = this.containment[2] + this.offset.click.left
                    }
                    if (event.pageY - this.offset.click.top > this.containment[3]) {
                        pageY = this.containment[3] + this.offset.click.top
                    }
                }
                if (o.grid) {
                    var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
                    pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top: (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;
                    var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
                    pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left: (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left
                }
            }
            return {
                top: (pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (scrollIsRootNode ? 0: scroll.scrollTop())))),
                left: (pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0: scroll.scrollLeft())))
            }
        },
        _rearrange: function(event, i, a, hardRefresh) {
            a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? i.item[0] : i.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter: 1;
            var counter = this.counter;
            this._delay(function() {
                if (counter == this.counter) {
                    this.refreshPositions(!hardRefresh)
                }
            })
        },
        _clear: function(event, noPropagation) {
            this.reverting = false;
            var delayedTriggers = [];
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var i in this._storedCSS) {
                    if (this._storedCSS[i] == "auto" || this._storedCSS[i] == "static") {
                        this._storedCSS[i] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !noPropagation) {
                delayedTriggers.push(function(event) {
                    this._trigger("receive", event, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !noPropagation) {
                delayedTriggers.push(function(event) {
                    this._trigger("update", event, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!noPropagation) {
                    delayedTriggers.push(function(event) {
                        this._trigger("remove", event, this._uiHash())
                    });
                    delayedTriggers.push((function(c) {
                        return function(event) {
                            c._trigger("receive", event, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer));
                    delayedTriggers.push((function(c) {
                        return function(event) {
                            c._trigger("update", event, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer))
                }
            }
            for (var i = this.containers.length - 1; i >= 0; i--) {
                if (!noPropagation) {
                    delayedTriggers.push((function(c) {
                        return function(event) {
                            c._trigger("deactivate", event, this._uiHash(this))
                        }
                    }).call(this, this.containers[i]))
                }
                if (this.containers[i].containerCache.over) {
                    delayedTriggers.push((function(c) {
                        return function(event) {
                            c._trigger("out", event, this._uiHash(this))
                        }
                    }).call(this, this.containers[i]));
                    this.containers[i].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                $("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "": this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!noPropagation) {
                    this._trigger("beforeStop", event, this._uiHash());
                    for (var i = 0; i < delayedTriggers.length; i++) {
                        delayedTriggers[i].call(this, event)
                    }
                    this._trigger("stop", event, this._uiHash())
                }
                this.fromOutside = false;
                return false
            }
            if (!noPropagation) {
                this._trigger("beforeStop", event, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!noPropagation) {
                for (var i = 0; i < delayedTriggers.length; i++) {
                    delayedTriggers[i].call(this, event)
                }
                this._trigger("stop", event, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function(_inst) {
            var inst = _inst || this;
            return {
                helper: inst.helper,
                placeholder: inst.placeholder || $([]),
                position: inst.position,
                originalPosition: inst.originalPosition,
                offset: inst.positionAbs,
                item: inst.currentItem,
                sender: _inst ? _inst.element: null
            }
        }
    })
})(jQuery);
