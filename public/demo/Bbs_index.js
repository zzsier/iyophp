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
    1100)
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
    if (!WEB_CONFIG.userid) {
        return false
    }
    bbsid = data[0];
    boardid = data[1];
    bookid = data[2];
    $.ajax({
        type: "GET",
        url: "/index.php?c=Ajax_Book&a=favourBook",
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
jQuery.cookie = function(name, value, options) {
    if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString())) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
            } else {
                date = options.expires
            }
            expires = "; expires=" + date.toUTCString()
        }
        var path = options.path ? "; path=" + (options.path) : "";
        var domain = options.domain ? "; domain=" + (options.domain) : "";
        var secure = options.secure ? "; secure": "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("")
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return cookieValue
    }
};
var zAvatar = {
    text: "\u6211\u662f\u795e\u901a\u54e5\uff0c\u95ee\u9898\u5728\u8fd9\u95ee\uff0c\u8868\u767d\u5728\u8fd9\u8bf4\u3002",
    sClass: "zST-ask-box-small",
    minLen: 5,
    titleLen: 40,
    isBind: 1,
    html: function() {
        var html = '<div class="zST-ask-box" id="zAvatarLayer" style="display:none;">                <div class="zST-ask-photo"></div>                <div class="zST-ask-inner border-radius-s3">                    <a href="http://bbs.zol.com.cn/quanzi/d643.html" target="_blank" class="zST-ask-header">\u795e\u901a\u54e5\u6709\u95ee\u5fc5\u7b54</a>                    <div class="zST-ask-title">						<ul class="zST-ask-filter clearfix">							<li type-num="1"><span class="sj" title="\u79fb\u52a8\u8bbe\u5907"></span></li>							<li type-num="2"><span class="dc" title="\u6570\u7801\u5f71\u50cf"></span></li>							<li type-num="3"><span class="diy" title="\u6512\u673a\u786c\u4ef6"></span></li>							<li type-num="4"><span class="else" title="\u5176\u4ed6"></span></li>						</ul>						<input class="title-txt" type="text" value="\u8bf7\u8f93\u5165\u63d0\u95ee\u6807\u9898" />					</div>                    <div class="zST-ask-textarea">                        <textarea style="display:block;" value="">' + this.text + '</textarea>                        <div class="zST-ask-tip" style="display:none;">                            <span class="zST-ask-close"></span>                            <p>\u54e5\u5df2\u6536\u5230, \u7ea6\u4f1a\u56de\u6765\u56de\u590d\u4f60!\u8bf7\u5bc6\u5207\u5173\u6ce8\u6d88\u606f\u4e2d\u5fc3!</p>                            <p><a href="#" target="_blank">\u70b9\u8fd9\u91cc\u67e5\u770b\u521a\u53d1\u5e03\u7684\u95ee\u9898!</a></p>                        </div>                    </div>                    <div class="zST-ask-btn"><a href="javascript:;">\u53d1\u5e03</a></div>                </div>            </div>';
        $("body").append(html);
        return true
    },
    get: function() {
        var self = this;
        $.post("/index.php?c=Ajax_Public&a=getZAvatarInfo&t=" + (new Date).getTime(), {},
        function(json) {
            self.set(json)
        },
        "json")
    },
    set: function(json) {
        var self = this,
        booktype = 0,
        target = $("#zAvatarLayer"),
        oTitle = target.find(".zST-ask-title"),
        oTitleLi = target.find("li"),
        oTitleTxt = oTitle.find(".title-txt"),
        oTextDiv = target.find(".zST-ask-textarea"),
        oInput = oTextDiv.find("textarea"),
        oTip = oTextDiv.find(".zST-ask-tip"),
        oSelTip = target.find(".zST-ask-select-tip"),
        oBtn = target.find(".zST-ask-btn").find("a");
        $(window).on("scroll", 
        function() {
            var o = $(this);
            if (o.scrollTop() > 500) {
                target.css("top", 119)
            } else {
                target.css("top", 235)
            }
        });
        oTitleLi.bind("click", 
        function() {
            var self = $(this);
            self.toggleClass("select").siblings().removeClass("select");
            booktype = self.hasClass("select") ? self.attr("type-num") : 0
        });
        oInput.bind({
            focus: function() {
                if (!userid) {
                    $(this).blur().zLogin();
                    return false
                }
                $(this).val("")
            },
            blur: function() {
                var me = $(this);
                if (me.val() == "") {
                    me.val(self.text)
                }
            },
            keydown: function(event) {
                if (event.keyCode == 13 && event.ctrlKey) {
                    oBtn.click()
                }
            }
        });
        oTitleTxt.bind({
            focus: function() {
                if (!userid) {
                    $(this).blur().zLogin();
                    return false
                }
                $(this).val("")
            },
            blur: function() {
                var tInput = $(this);
                if (tInput.val() == "") {
                    tInput.val("\u8bf7\u8f93\u5165\u63d0\u95ee\u6807\u9898")
                }
            },
            keydown: function(event) {
                if (event.keyCode == 13 && event.ctrlKey) {
                    oBtn.click()
                }
            }
        });
        oBtn.bind("click", 
        function() {
            if (!self.isBind) {
                return false
            }
            var type = booktype,
            tit = oTitleTxt.val(),
            con = oInput.val().replace(/<[^>].*?>/g, "").replace(/{:\d+_\d+:}/g, "").replace(/\s*/, ""),
            length = con.length,
            tlength = tit.length,
            data = {
                "type": type,
                "title": tit,
                "content": con,
                "bbsid": 6,
                "boardid": 643
            };
            if (!booktype) {
                Layer.tips({
                    content: "<p>\u8bf7\u9009\u62e9\u95ee\u9898\u6240\u5c5e\u7684\u9886\u57df~</p>"
                });
                return false
            }
            if (!tit || tit == "\u8bf7\u8f93\u5165\u63d0\u95ee\u6807\u9898") {
                Layer.tips({
                    content: "<p>\u6807\u9898\u4e0d\u80fd\u4e3a\u7a7a~</p>"
                });
                return false
            }
            if (tlength > self.titleLen) {
                Layer.tips({
                    content: "<p>\u6807\u9898\u957f\u5ea6\u9650\u523640\u5b57\uff0c\u8bf7\u8fd4\u56de\u4fee\u6539~</p>"
                });
                return false
            }
            if (!con || con == self.text) {
                Layer.tips({
                    content: "<p>\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a~</p>"
                });
                return false
            }
            if (length < self.minLen) {
                Layer.tips({
                    content: "<p>\u5185\u5bb9\u8fc7\u5c11~</p>"
                });
                return false
            }
            oInput.val("");
            $.post("/index.php?c=Ajax_Publish&a=pbBook&t=" + (new Date).getTime(), data, 
            function(j) {
                if (j.info == "ok") {
                    var url = j.url;
                    oTip.find("a").attr("href", url.toString());
                    oInput.hide();
                    oTip.fadeIn();
                    self.isBind = 0;
                    oTitleTxt.val("")
                } else {
                    if (j.info == "err") {
                        Layer.tips({
                            content: "<p>" + j.msg + "</p>"
                        });
                        return false
                    }
                }
            },
            "json")
        });
        if (!userid) {
            $('[data-login="no-login"]').zLogin({
                "from": 100
            })
        }
        oTip.find(".zST-ask-close").bind("click", 
        function() {
            oTip.hide();
            oInput.val(self.text).fadeIn();
            self.isBind = 1
        });
        oSelTip.find(".close").bind("click", 
        function() {
            oSelTip.hide()
        });
        target.show()
    },
    init: function() {
        var self = this,
        w = document.body.clientWidth;
        if (w > 1440) {
            self.html()
        } else {
            if (w >= 1345 && w < 1440) {
                self.html();
                $("#zAvatarLayer").addClass(self.sClass)
            } else {
                return false
            }
        }
        return true
    },
    show: function() {
        var self = this,
        isShow = self.init();
        if (!isShow) {
            return false
        }
        self.get()
    }
};
$(function() {
    setTimeout(function() {
        zAvatar.show()
    },
    1000)
});
var ZolTask3 = {
    tarID: "ZolTaskLayerJBW",
    html: function() {
        var self = this;
        $.get("/index.php?c=Ajax_Task&a=initTaskLayer&t=" + (new Date()).getTime(), {},
        function(json) {
            if (json.info == "ok") {
                $("body").append(json.html);
                self.bind();
                return true
            }
        },
        "json")
    },
    bind: function() {
        var self = this,
        target = $("#" + this.tarID),
        defItem = target.find("div.default-icon"),
        taskTab = target.find("ul.tasks-tabs"),
        item1 = defItem.find(".item1"),
        item2 = defItem.find(".item2"),
        tab1 = taskTab.find("li").eq(0),
        tab2 = taskTab.find("li").eq(1);
        $(window).on("scroll", 
        function() {
            var o = $(this);
            if (o.scrollTop() > 500) {
                target.css("top", 339)
            } else {
                target.css("top", 455)
            }
        });
        $(defItem).find("a[option]").one("click", 
        function() {
            commonSw($(this).attr("option"))
        });
        var commonSw = function(action) {
            defItem.hide();
            taskTab.show();
            taskTab.find("li").removeClass("current");
            var t = action === "experience" ? tab1: tab2;
            t.addClass("current");
            getHtmlData(action);
            $(taskTab).find("li[option]").on("click", 
            function() {
                tabSwitch($(this))
            });
            return true
        };
        var tabSwitch = function(liObj) {
            var option = $(liObj).attr("option"),
            tar = option == "experience" ? target.find("div.my-experience") : target.find("div.my-task"),
            hide = option != "experience" ? target.find("div.my-experience") : target.find("div.my-task");
            taskTab.find("li").removeClass("current");
            $(liObj).addClass("current");
            hide && hide.hide();
            if (tar.length > 0) {
                tar.show();
                return false
            }
            getHtmlData(option);
            return true
        };
        var getHtmlData = function(option) {
            var action = "to" + option.substring(0, 1).toUpperCase() + option.substring(1);
            $.get("/index.php?c=Ajax_Task&a=" + action + "&t=" + (new Date()).getTime(), {},
            function(json) {
                json.info == "ok" && (function() {
                    target.append(json.html);
                    handler();
                    self.fiveBoards(target)
                })()
            },
            "json")
        };
        var handler = function() {
            var taskBtn = target.find("a.getLevelPackage");
            taskBtn && taskBtn.on("click", 
            function() {
                $.get("/index.php?c=Ajax_Task&a=getLevelPackage&t=" + (new Date()).getTime(), {},
                function(json) {
                    if (json.info == "ok") {
                        target.find("div.my-task").replaceWith(json.html);
                        self.fiveBoards(target)
                    } else {
                        App.alert(json.msg)
                    }
                },
                "json")
            })
        };
        target.show();
        return true
    },
    fiveBoards: function(tar) {
        var target = $(tar).find("a.fiveLayer");
        var getLi = function(task, type) {
            var l = flag = "",
            a = [],
            b = ["sj", "dc", "diy", "nb", "pad"],
            n = ["\u624b\u673a\u60c5\u62a5\u7ad9", "\u4eba\u50cf\u6444\u5f71", "DIY\u4e0e\u6512\u673a", "\u672c\u672c\u5927\u8ba8\u8bba", "\u5e73\u677f\u6c47"],
            a1 = ["http://bbs.zol.com.cn/sjbbs/c1.html?", "http://bbs.zol.com.cn/dcbbs/d16.html?", "http://bbs.zol.com.cn/diybbs/d231.html?", "http://bbs.zol.com.cn/nbbbs/c1.html?", "http://bbs.zol.com.cn/padbbs/c4.html?"],
            a2 = ["http://bbs.zol.com.cn/index.php?c=publish&a=default&boardid=34130&bbsid=5&", "http://bbs.zol.com.cn/index.php?c=publish&a=default&boardid=16&bbsid=1&", "http://bbs.zol.com.cn/index.php?c=publish&a=default&boardid=231&bbsid=2&", "http://bbs.zol.com.cn/index.php?c=publish&a=default&boardid=34013&bbsid=3&", "http://bbs.zol.com.cn/index.php?c=publish&a=default&boardid=294&bbsid=4&"];
            a = (task === "inviteViewBook" || task === "invite") ? a1: a2;
            flag = (type === "daily") ? "td": "f";
            for (var i = 0; i <= 4; i++) {
                l += '<li class="' + b[i] + '">';
                l += '  <a target="_blank" href="' + a[i] + flag + "=" + task + '">';
                l += '  <i class="sendpost-classify-ico"></i><span>' + n[i] + "</span></a>";
                l += "</li>"
            }
            return l
        };
        var html = function(task, type) {
            var h = '<div class="layerbox-border" style="margin:-140px 0px 0px -182px;display:none;" id="WWtaskFiveLayer">';
            h += '    <div class="layerbox-content" style="width:365px; height:280px;">';
            h += '      <div class="layerbox-head clearfix">';
            h += "          <h3>\u9009\u62e9\u4e00\u4e2a\u70ed\u95e8\u8bba\u575b</h3>";
            h += '          <span class="layerbox-close"></span>';
            h += "      </div>";
            h += '      <ul class="select-sendpost-classify clearfix">';
            h += getLi(task, type);
            h += "      </ul>";
            h += "    </div>";
            h += "</div>";
            return h
        };
        var create = function(task, type) {
            var h = html(task, type);
            $("body").append(h);
            var target = $("#WWtaskFiveLayer");
            target.find("span.layerbox-close").click(function() {
                target.remove()
            });
            target.show()
        };
        target && target.on("click", 
        function() {
            var task = $(this).attr("flag"),
            type = $(this).attr("type");
            if (!task || !type) {
                return false
            }
            create(task, type)
        });
        return target
    },
    init: function() {
        var self = this,
        w = document.body.clientWidth;
        return w > 1440 ? true: false
    },
    show: function() {
        var self = this,
        isShow = self.init();
        if (!isShow) {
            return false
        }
        self.html()
    }
};
$(function() {
    setTimeout(function() {
        ZolTask3.show()
    },
    1000)
});
/* iScroll v5.0.4 ~ (c) 2008-2013 Matteo Spinelli ~ http://cubiq.org/license */
var IScroll = (function(window, document, Math) {
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf("Mozilla/5.0") > -1 && nua.indexOf("Android ") > -1 && nua.indexOf("AppleWebKit") > -1) && !(nua.indexOf("Chrome") > -1));
    if (is_android) {
        document.getElementsByTagName("body")[0].className += " is-android-browser"
    }
    var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
    function(callback) {
        window.setTimeout(callback, 1000 / 60)
    };
    var utils = (function() {
        var me = {};
        var _elementStyle = document.createElement("div").style;
        var _vendor = (function() {
            var vendors = ["t", "webkitT", "MozT", "msT", "OT"],
            transform,
            i = 0,
            l = vendors.length;
            for (; i < l; i++) {
                transform = vendors[i] + "ransform";
                if (transform in _elementStyle) {
                    return vendors[i].substr(0, vendors[i].length - 1)
                }
            }
            return false
        })();
        function _prefixStyle(style) {
            if (_vendor === false) {
                return false
            }
            if (_vendor === "") {
                return style
            }
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1)
        }
        me.getTime = Date.now || 
        function getTime() {
            return new Date().getTime()
        };
        me.extend = function(target, obj) {
            for (var i in obj) {
                target[i] = obj[i]
            }
        };
        me.extendEvent = function(e, _this) {
            if (!e.currentTarget) {
                e.currentTarget = _this
            }
            if (!e.target) {
                e.target = e.srcElement
            }
            if (!e.relatedTarget) {
                if (e.type == "mouseover") {
                    e.relatedTarget = e.fromElement
                }
                if (e.type == "mouseout") {
                    e.relatedTarget = e.toElement
                }
            }
            if (e.pageX == null && e.clientX != null) {
                var html = document.documentElement;
                var body = document.body;
                e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
                e.pageX -= html.clientLeft || 0;
                e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
                e.pageY -= html.clientTop || 0
            }
            if (!e.which && e.button) {
                if (e.button == 1) {
                    e.button2 = 0
                } else {
                    if (e.button == 4) {
                        e.button2 = 1
                    } else {
                        if (e.button == 2) {
                            e.button2 = 2
                        } else {
                            e.button2 = 0
                        }
                    }
                }
                e.which = e.button & 1 ? 1: (e.button & 2 ? 3: (e.button & 4 ? 2: 0))
            }
            return e
        };
        me.addEvent = function(el, type, fn, capture) {
            if ("addEventListener" in el) {
                try {
                    el.addEventListener(type, fn, !!capture)
                } catch(e) {
                    if (typeof fn == "object" && fn.handleEvent) {
                        el.addEventListener(type, 
                        function(e) {
                            fn.handleEvent.call(fn, e)
                        },
                        !!capture)
                    } else {
                        throw e
                    }
                }
            } else {
                if ("attachEvent" in el) {
                    if (el == window) {
                        el = document
                    }
                    if (typeof fn == "object" && fn.handleEvent) {
                        el.attachEvent("on" + type, 
                        function(e) {
                            e = me.extendEvent(e, el);
                            fn.handleEvent.call(fn, e)
                        })
                    } else {
                        el.attachEvent("on" + type, fn)
                    }
                }
            }
        };
        me.removeEvent = function(el, type, fn, capture) {
            el.removeEventListener(type, fn, !!capture);
            if (typeof el.addEventListener != undefined) {
                el.removeEventListener(type, fn, !!capture)
            } else {
                if (typeof el.attachEvent != undefined) {
                    el.detachEvent("on" + type, el[type + fn]);
                    el[type + fn] = null;
                    el["e" + type + fn] = null
                }
            }
        };
        me.momentum = function(current, start, time, lowerMargin, wrapperSize) {
            var distance = current - start,
            speed = Math.abs(distance) / time,
            destination,
            duration,
            deceleration = 0.0006;
            destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1: 1);
            duration = speed / deceleration;
            if (destination < lowerMargin) {
                destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed
            } else {
                if (destination > 0) {
                    destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
                    distance = Math.abs(current) + destination;
                    duration = distance / speed
                }
            }
            return {
                destination: Math.round(destination),
                duration: duration
            }
        };
        var _transform = _prefixStyle("transform");
        me.extend(me, {
            hasTransform: _transform !== false,
            hasPerspective: _prefixStyle("perspective") in _elementStyle,
            hasTouch: "ontouchstart" in window,
            hasPointer: navigator.msPointerEnabled,
            hasTransition: _prefixStyle("transition") in _elementStyle
        });
        me.isAndroidBrowser = /Android/.test(window.navigator.appVersion) && /Version\/\d/.test(window.navigator.appVersion);
        me.extend(me.style = {},
        {
            transform: _transform,
            transitionTimingFunction: _prefixStyle("transitionTimingFunction"),
            transitionDuration: _prefixStyle("transitionDuration"),
            transformOrigin: _prefixStyle("transformOrigin")
        });
        me.hasClass = function(e, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
            return re.test(e.className)
        };
        me.addClass = function(e, c) {
            if (me.hasClass(e, c)) {
                return
            }
            var newclass = e.className.split(" ");
            newclass.push(c);
            e.className = newclass.join(" ")
        };
        me.removeClass = function(e, c) {
            if (!me.hasClass(e, c)) {
                return
            }
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
            e.className = e.className.replace(re, "")
        };
        me.offset = function(el) {
            var left = -el.offsetLeft,
            top = -el.offsetTop;
            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop
            }
            return {
                left: left,
                top: top
            }
        };
        me.extend(me.eventType = {},
        {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,
            mousedown: 2,
            mousemove: 2,
            mouseup: 2,
            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        });
        me.extend(me.ease = {},
        {
            quadratic: {
                style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                fn: function(k) {
                    return k * (2 - k)
                }
            },
            circular: {
                style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                fn: function(k) {
                    return Math.sqrt(1 - (--k * k))
                }
            },
            back: {
                style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                fn: function(k) {
                    var b = 4;
                    return (k = k - 1) * k * ((b + 1) * k + b) + 1
                }
            },
            bounce: {
                style: "",
                fn: function(k) {
                    if ((k /= 1) < (1 / 2.75)) {
                        return 7.5625 * k * k
                    } else {
                        if (k < (2 / 2.75)) {
                            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75
                        } else {
                            if (k < (2.5 / 2.75)) {
                                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375
                            } else {
                                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375
                            }
                        }
                    }
                }
            },
            elastic: {
                style: "",
                fn: function(k) {
                    var f = 0.22,
                    e = 0.4;
                    if (k === 0) {
                        return 0
                    }
                    if (k == 1) {
                        return 1
                    }
                    return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1)
                }
            }
        });
        me.tap = function(e, eventName) {
            var ev = document.createEvent("Event");
            ev.initEvent(eventName, true, true);
            ev.pageX = e.pageX;
            ev.pageY = e.pageY;
            e.target.dispatchEvent(ev)
        };
        me.click = function(e) {
            var target = e.target,
            ev;
            if (target.tagName != "SELECT" && target.tagName != "INPUT" && target.tagName != "TEXTAREA") {
                ev = document.createEvent("MouseEvents");
                ev.initMouseEvent("click", true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                ev._constructed = true;
                target.dispatchEvent(ev)
            }
        };
        return me
    })();
    function IScroll(el, options) {
        this.wrapper = typeof el == "string" ? $(el).get(0) || document.querySelector(el) : el;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;
        this.options = {
            resizeIndicator: true,
            mouseWheelSpeed: 20,
            snapThreshold: 0.334,
            startX: 0,
            startY: 0,
            scrollY: true,
            directionLockThreshold: 5,
            momentum: true,
            bounce: true,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: true,
            HWCompositing: true,
            useTransition: true,
            useTransform: true
        };
        for (var i in options) {
            this.options[i] = options[i]
        }
        this.translateZ = this.options.HWCompositing && utils.hasPerspective ? " translateZ(0)": "";
        this.options.useTransition = utils.hasTransition && this.options.useTransition;
        this.options.useTransform = utils.hasTransform && this.options.useTransform;
        this.options.eventPassthrough = this.options.eventPassthrough === true ? "vertical": this.options.eventPassthrough;
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
        this.options.scrollY = this.options.eventPassthrough == "vertical" ? false: this.options.scrollY;
        this.options.scrollX = this.options.eventPassthrough == "horizontal" ? false: this.options.scrollX;
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0: this.options.directionLockThreshold;
        this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? utils.ease[this.options.bounceEasing] || utils.ease.circular: this.options.bounceEasing;
        this.options.resizePolling = this.options.resizePolling === undefined ? 60: this.options.resizePolling;
        if (this.options.tap === true) {
            this.options.tap = "tap"
        }
        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1: 1;
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};
        this._init();
        this.refresh();
        this.scrollTo(this.options.startX, this.options.startY);
        this.enable()
    }
    IScroll.prototype = {
        version: "5.0.4",
        _init: function() {
            this._initEvents();
            if (this.options.scrollbars || this.options.indicators) {
                this._initIndicators()
            }
            if (this.options.mouseWheel) {
                this._initWheel()
            }
            if (this.options.snap) {
                this._initSnap()
            }
            if (this.options.keyBindings) {
                this._initKeys()
            }
        },
        destroy: function() {
            this._initEvents(true);
            this._execEvent("destroy")
        },
        _transitionEnd: function(e) {
            if (e.target != this.scroller) {
                return
            }
            this._transitionTime(0);
            if (!this.resetPosition(this.options.bounceTime)) {
                this._execEvent("scrollEnd")
            }
        },
        _start: function(e) {
            var _button = e.button2 != undefined ? e.button2: e.button;
            if (utils.eventType[e.type] != 1) {
                if (_button !== 0) {
                    return
                }
            }
            if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
                return
            }
            if (this.options.preventDefault && !utils.isAndroidBrowser) { (e.preventDefault) ? e.preventDefault() : e.returnValue = false
            }
            var point = e.touches ? e.touches[0] : e,
            pos;
            this.initiated = utils.eventType[e.type];
            this.moved = false;
            this.distX = 0;
            this.distY = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;
            this._transitionTime();
            this.isAnimating = false;
            this.startTime = utils.getTime();
            if (this.options.useTransition && this.isInTransition) {
                pos = this.getComputedPosition();
                if (is_android) {
                    this._transitionTime(0.001)
                }
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this.isInTransition = false
            }
            this.startX = this.x;
            this.startY = this.y;
            this.absStartX = this.x;
            this.absStartY = this.y;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this._execEvent("scrollStart")
        },
        _move: function(e) {
            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                return
            }
            if (this.options.preventDefault) { (e.preventDefault) ? e.preventDefault() : e.returnValue = false
            }
            var point = e.touches ? e.touches[0] : e,
            deltaX = this.hasHorizontalScroll ? point.pageX - this.pointX: 0,
            deltaY = this.hasVerticalScroll ? point.pageY - this.pointY: 0,
            timestamp = utils.getTime(),
            newX,
            newY,
            absDistX,
            absDistY;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this.distX += deltaX;
            this.distY += deltaY;
            absDistX = Math.abs(this.distX);
            absDistY = Math.abs(this.distY);
            if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
                return
            }
            if (!this.directionLocked && !this.options.freeScroll) {
                if (absDistX > absDistY + this.options.directionLockThreshold) {
                    this.directionLocked = "h"
                } else {
                    if (absDistY >= absDistX + this.options.directionLockThreshold) {
                        this.directionLocked = "v"
                    } else {
                        this.directionLocked = "n"
                    }
                }
            }
            if (this.directionLocked == "h") {
                if (this.options.eventPassthrough == "vertical") { (e.preventDefault) ? e.preventDefault() : e.returnValue = false
                } else {
                    if (this.options.eventPassthrough == "horizontal") {
                        this.initiated = false;
                        return
                    }
                }
                deltaY = 0
            } else {
                if (this.directionLocked == "v") {
                    if (this.options.eventPassthrough == "horizontal") { (e.preventDefault) ? e.preventDefault() : e.returnValue = false
                    } else {
                        if (this.options.eventPassthrough == "vertical") {
                            this.initiated = false;
                            return
                        }
                    }
                    deltaX = 0
                }
            }
            newX = this.x + deltaX;
            newY = this.y + deltaY;
            if (newX > 0 || newX < this.maxScrollX) {
                newX = this.options.bounce ? this.x + deltaX / 3: newX > 0 ? 0: this.maxScrollX
            }
            if (newY > 0 || newY < this.maxScrollY) {
                newY = this.options.bounce ? this.y + deltaY / 3: newY > 0 ? 0: this.maxScrollY
            }
            this.directionX = deltaX > 0 ? -1: deltaX < 0 ? 1: 0;
            this.directionY = deltaY > 0 ? -1: deltaY < 0 ? 1: 0;
            this.moved = true;
            this._translate(newX, newY);
            if (timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y
            }
        },
        _end: function(e) {
            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                return
            }
            if (this.options.preventDefault) { (e.preventDefault) ? e.preventDefault() : e.returnValue = false
            }
            var point = e.changedTouches ? e.changedTouches[0] : e,
            momentumX,
            momentumY,
            duration = utils.getTime() - this.startTime,
            newX = Math.round(this.x),
            newY = Math.round(this.y),
            distanceX = Math.abs(newX - this.startX),
            distanceY = Math.abs(newY - this.startY),
            time = 0,
            easing = "";
            this.scrollTo(newX, newY);
            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = utils.getTime();
            if (this.resetPosition(this.options.bounceTime)) {
                return
            }
            if (!this.moved) {
                if (this.options.tap) {
                    utils.tap(e, this.options.tap)
                }
                if (this.options.click) {
                    utils.click(e)
                }
                return
            }
            if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
                this._execEvent("flick");
                return
            }
            if (this.options.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth: 0) : {
                    destination: newX,
                    duration: 0
                };
                momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight: 0) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1
            }
            if (this.options.snap) {
                var snap = this._nearestSnap(newX, newY);
                this.currentPage = snap;
                newX = snap.x;
                newY = snap.y;
                time = this.options.snapSpeed || Math.max(Math.max(Math.min(distanceX, 1000), Math.min(distanceX, 1000)), 300);
                this.directionX = 0;
                this.directionY = 0;
                easing = this.options.bounceEasing
            }
            if (newX != this.x || newY != this.y) {
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                    easing = utils.ease.quadratic
                }
                this.scrollTo(newX, newY, time, easing);
                return
            }
            this._execEvent("scrollEnd")
        },
        _resize: function() {
            var that = this;
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(function() {
                that.refresh()
            },
            this.options.resizePolling)
        },
        resetPosition: function(time) {
            var x = this.x,
            y = this.y;
            time = time || 0;
            if (!this.hasHorizontalScroll || this.x > 0) {
                x = 0
            } else {
                if (this.x < this.maxScrollX) {
                    x = this.maxScrollX
                }
            }
            if (!this.hasVerticalScroll || this.y > 0) {
                y = 0
            } else {
                if (this.y < this.maxScrollY) {
                    y = this.maxScrollY
                }
            }
            if (x == this.x && y == this.y) {
                return false
            }
            this.scrollTo(x, y, time, this.options.bounceEasing);
            return true
        },
        disable: function() {
            this.enabled = false
        },
        enable: function() {
            this.enabled = true
        },
        refresh: function() {
            var rf = this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth;
            this.wrapperHeight = this.wrapper.clientHeight;
            this.scrollerWidth = this.scroller.offsetWidth;
            this.scrollerHeight = this.scroller.offsetHeight;
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
            if (!this.hasHorizontalScroll) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth
            }
            if (!this.hasVerticalScroll) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight
            }
            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.wrapperOffset = utils.offset(this.wrapper);
            this._execEvent("refresh");
            this.resetPosition();
            if (this.options.snap) {
                var snap = this._nearestSnap(this.x, this.y);
                if (this.x == snap.x && this.y == snap.y) {
                    return
                }
                this.currentPage = snap;
                this.scrollTo(snap.x, snap.y)
            }
        },
        on: function(type, fn) {
            if (!this._events[type]) {
                this._events[type] = []
            }
            this._events[type].push(fn)
        },
        _execEvent: function(type) {
            if (!this._events[type]) {
                return
            }
            var i = 0,
            l = this._events[type].length;
            if (!l) {
                return
            }
            for (; i < l; i++) {
                this._events[type][i].call(this)
            }
        },
        scrollBy: function(x, y, time, easing) {
            x = this.x + x;
            y = this.y + y;
            time = time || 0;
            this.scrollTo(x, y, time, easing)
        },
        scrollTo: function(x, y, time, easing) {
            easing = easing || utils.ease.circular;
            if (!time || (this.options.useTransition && easing.style)) {
                this._transitionTimingFunction(easing.style);
                this._transitionTime(time);
                this._translate(x, y)
            } else {
                this._animate(x, y, time, easing.fn)
            }
        },
        scrollToElement: function(el, time, offsetX, offsetY, easing) {
            el = el.nodeType ? el: this.scroller.querySelector(el);
            if (!el) {
                return
            }
            var pos = utils.offset(el);
            pos.left -= this.wrapperOffset.left;
            pos.top -= this.wrapperOffset.top;
            if (offsetX === true) {
                offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2)
            }
            if (offsetY === true) {
                offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2)
            }
            pos.left -= offsetX || 0;
            pos.top -= offsetY || 0;
            pos.left = pos.left > 0 ? 0: pos.left < this.maxScrollX ? this.maxScrollX: pos.left;
            pos.top = pos.top > 0 ? 0: pos.top < this.maxScrollY ? this.maxScrollY: pos.top;
            time = time === undefined || time === null || time === "auto" ? Math.max(Math.abs(pos.left) * 2, Math.abs(pos.top) * 2) : time;
            this.scrollTo(pos.left, pos.top, time, easing)
        },
        _transitionTime: function(time) {
            time = time || 0;
            this.scrollerStyle[utils.style.transitionDuration] = time + "ms";
            if (this.indicator1) {
                this.indicator1.transitionTime(time)
            }
            if (this.indicator2) {
                this.indicator2.transitionTime(time)
            }
        },
        _transitionTimingFunction: function(easing) {
            this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
            if (this.indicator1) {
                this.indicator1.transitionTimingFunction(easing)
            }
            if (this.indicator2) {
                this.indicator2.transitionTimingFunction(easing)
            }
        },
        _translate: function(x, y) {
            if (this.options.useTransform) {
                this.scrollerStyle[utils.style.transform] = "translate(" + x + "px," + y + "px)" + this.translateZ
            } else {
                x = Math.round(x);
                y = Math.round(y);
                this.scrollerStyle.left = x + "px";
                this.scrollerStyle.top = y + "px"
            }
            this.x = x;
            this.y = y;
            if (this.indicator1) {
                this.indicator1.updatePosition()
            }
            if (this.indicator2) {
                this.indicator2.updatePosition()
            }
        },
        _initEvents: function(remove) {
            var eventType = remove ? utils.removeEvent: utils.addEvent,
            target = this.options.bindToWrapper ? this.wrapper: window;
            eventType(window, "orientationchange", this);
            eventType(window, "resize", this);
            eventType(this.wrapper, "mousedown", this);
            eventType(target, "mousemove", this);
            eventType(target, "mousecancel", this);
            eventType(target, "mouseup", this);
            if (utils.hasPointer) {
                eventType(this.wrapper, "MSPointerDown", this);
                eventType(target, "MSPointerMove", this);
                eventType(target, "MSPointerCancel", this);
                eventType(target, "MSPointerUp", this)
            }
            if (utils.hasTouch) {
                eventType(this.wrapper, "touchstart", this);
                eventType(target, "touchmove", this);
                eventType(target, "touchcancel", this);
                eventType(target, "touchend", this)
            }
            eventType(this.scroller, "transitionend", this);
            eventType(this.scroller, "webkitTransitionEnd", this);
            eventType(this.scroller, "oTransitionEnd", this);
            eventType(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var matrix = window.getComputedStyle(this.scroller, null),
            x,
            y;
            if (this.options.useTransform) {
                matrix = matrix[utils.style.transform].split(")")[0].split(", ");
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5])
            } else {
                x = +matrix.left.replace(/[^-\d]/g, "");
                y = +matrix.top.replace(/[^-\d]/g, "")
            }
            return {
                x: x,
                y: y
            }
        },
        _initIndicators: function() {
            var interactive = this.options.interactiveScrollbars,
            defaultScrollbars = typeof this.options.scrollbars != "object",
            customStyle = typeof this.options.scrollbars != "string",
            indicator1,
            indicator2;
            if (this.options.scrollbars) {
                if (this.options.scrollY) {
                    indicator1 = {
                        el: createDefaultScrollbar("v", interactive, this.options.scrollbars),
                        interactive: interactive,
                        defaultScrollbars: true,
                        customStyle: customStyle,
                        resize: this.options.resizeIndicator,
                        listenX: false
                    };
                    this.wrapper.appendChild(indicator1.el)
                }
                if (this.options.scrollX) {
                    indicator2 = {
                        el: createDefaultScrollbar("h", interactive, this.options.scrollbars),
                        interactive: interactive,
                        defaultScrollbars: true,
                        customStyle: customStyle,
                        resize: this.options.resizeIndicator,
                        listenY: false
                    };
                    this.wrapper.appendChild(indicator2.el)
                }
            } else {
                indicator1 = this.options.indicators.length ? this.options.indicators[0] : this.options.indicators;
                indicator2 = this.options.indicators[1] && this.options.indicators[1]
            }
            if (indicator1) {
                this.indicator1 = new Indicator(this, indicator1)
            }
            if (indicator2) {
                this.indicator2 = new Indicator(this, indicator2)
            }
            this.on("refresh", 
            function() {
                if (this.indicator1) {
                    this.indicator1.refresh()
                }
                if (this.indicator2) {
                    this.indicator2.refresh()
                }
            });
            this.on("destroy", 
            function() {
                if (this.indicator1) {
                    this.indicator1.destroy();
                    this.indicator1 = null
                }
                if (this.indicator2) {
                    this.indicator2.destroy();
                    this.indicator2 = null
                }
            })
        },
        _initWheel: function() {
            utils.addEvent(this.wrapper, "mousewheel", this);
            utils.addEvent(this.wrapper, "DOMMouseScroll", this);
            this.on("destroy", 
            function() {
                utils.removeEvent(this.wrapper, "mousewheel", this);
                utils.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(e) {
            if (!this.enabled) {
                return
            }
            var wheelDeltaX,
            wheelDeltaY,
            newX,
            newY,
            that = this;
            clearTimeout(this.wheelTimeout);
            this.wheelTimeout = setTimeout(function() {
                that._execEvent("scrollEnd")
            },
            400); (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
            if ("wheelDeltaX" in e) {
                wheelDeltaX = e.wheelDeltaX / 120;
                wheelDeltaY = e.wheelDeltaY / 120
            } else {
                if ("wheelDelta" in e) {
                    wheelDeltaX = wheelDeltaY = e.wheelDelta / 120
                } else {
                    if ("detail" in e) {
                        wheelDeltaX = wheelDeltaY = -e.detail / 3
                    } else {
                        return
                    }
                }
            }
            wheelDeltaX *= this.options.mouseWheelSpeed;
            wheelDeltaY *= this.options.mouseWheelSpeed;
            if (!this.hasVerticalScroll) {
                wheelDeltaX = wheelDeltaY
            }
            newX = this.x + (this.hasHorizontalScroll ? wheelDeltaX * this.options.invertWheelDirection: 0);
            newY = this.y + (this.hasVerticalScroll ? wheelDeltaY * this.options.invertWheelDirection: 0);
            if (newX > 0) {
                newX = 0
            } else {
                if (newX < this.maxScrollX) {
                    newX = this.maxScrollX
                }
            }
            if (newY > 0) {
                newY = 0
            } else {
                if (newY < this.maxScrollY) {
                    newY = this.maxScrollY
                }
            }
            this.scrollTo(newX, newY, 0)
        },
        _initSnap: function() {
            this.currentPage = {};
            if (typeof this.options.snap == "string") {
                this.options.snap = this.scroller.querySelectorAll(this.options.snap)
            }
            this.on("refresh", 
            function() {
                var i = 0,
                l,
                m = 0,
                n,
                cx,
                cy,
                x = 0,
                y,
                stepX = this.options.snapStepX || this.wrapperWidth,
                stepY = this.options.snapStepY || this.wrapperHeight,
                el;
                this.pages = [];
                if (this.options.snap === true) {
                    cx = Math.round(stepX / 2);
                    cy = Math.round(stepY / 2);
                    while (x > -this.scrollerWidth) {
                        this.pages[i] = [];
                        l = 0;
                        y = 0;
                        while (y > -this.scrollerHeight) {
                            this.pages[i][l] = {
                                x: Math.max(x, this.maxScrollX),
                                y: Math.max(y, this.maxScrollY),
                                width: stepX,
                                height: stepY,
                                cx: x - cx,
                                cy: y - cy
                            };
                            y -= stepY;
                            l++
                        }
                        x -= stepX;
                        i++
                    }
                } else {
                    el = this.options.snap;
                    l = el.length;
                    n = -1;
                    for (; i < l; i++) {
                        if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
                            m = 0;
                            n++
                        }
                        if (!this.pages[m]) {
                            this.pages[m] = []
                        }
                        x = Math.max( - el[i].offsetLeft, this.maxScrollX);
                        y = Math.max( - el[i].offsetTop, this.maxScrollY);
                        cx = x - Math.round(el[i].offsetWidth / 2);
                        cy = y - Math.round(el[i].offsetHeight / 2);
                        this.pages[m][n] = {
                            x: x,
                            y: y,
                            width: el[i].offsetWidth,
                            height: el[i].offsetHeight,
                            cx: cx,
                            cy: cy
                        };
                        if (x > this.maxScrollX) {
                            m++
                        }
                    }
                }
                this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
                if (this.options.snapThreshold % 1 === 0) {
                    this.snapThresholdX = this.options.snapThreshold;
                    this.snapThresholdY = this.options.snapThreshold
                } else {
                    this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
                    this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold)
                }
            });
            this.on("flick", 
            function() {
                var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time)
            })
        },
        _nearestSnap: function(x, y) {
            var i = 0,
            l = this.pages.length,
            m = 0;
            if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
                return this.currentPage
            }
            if (x > 0) {
                x = 0
            } else {
                if (x < this.maxScrollX) {
                    x = this.maxScrollX
                }
            }
            if (y > 0) {
                y = 0
            } else {
                if (y < this.maxScrollY) {
                    y = this.maxScrollY
                }
            }
            for (; i < l; i++) {
                if (x >= this.pages[i][0].cx) {
                    x = this.pages[i][0].x;
                    break
                }
            }
            l = this.pages[i].length;
            for (; m < l; m++) {
                if (y >= this.pages[0][m].cy) {
                    y = this.pages[0][m].y;
                    break
                }
            }
            if (i == this.currentPage.pageX) {
                i += this.directionX;
                if (i < 0) {
                    i = 0
                } else {
                    if (i >= this.pages.length) {
                        i = this.pages.length - 1
                    }
                }
                x = this.pages[i][0].x
            }
            if (m == this.currentPage.pageY) {
                m += this.directionY;
                if (m < 0) {
                    m = 0
                } else {
                    if (m >= this.pages[0].length) {
                        m = this.pages[0].length - 1
                    }
                }
                y = this.pages[0][m].y
            }
            return {
                x: x,
                y: y,
                pageX: i,
                pageY: m
            }
        },
        goToPage: function(x, y, time, easing) {
            easing = easing || this.options.bounceEasing;
            if (x >= this.pages.length) {
                x = this.pages.length - 1
            } else {
                if (x < 0) {
                    x = 0
                }
            }
            if (y >= this.pages[0].length) {
                y = this.pages[0].length - 1
            } else {
                if (y < 0) {
                    y = 0
                }
            }
            var posX = this.pages[x][y].x,
            posY = this.pages[x][y].y;
            time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;
            this.currentPage = {
                x: posX,
                y: posY,
                pageX: x,
                pageY: y
            };
            this.scrollTo(posX, posY, time, easing)
        },
        next: function(time, easing) {
            var x = this.currentPage.pageX,
            y = this.currentPage.pageY;
            x++;
            if (x >= this.pages.length && this.hasVerticalScroll) {
                x = 0;
                y++
            }
            this.goToPage(x, y, time, easing)
        },
        prev: function(time, easing) {
            var x = this.currentPage.pageX,
            y = this.currentPage.pageY;
            x--;
            if (x < 0 && this.hasVerticalScroll) {
                x = 0;
                y--
            }
            this.goToPage(x, y, time, easing)
        },
        _initKeys: function(e) {
            var keys = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            var i;
            if (typeof this.options.keyBindings == "object") {
                for (i in this.options.keyBindings) {
                    if (typeof this.options.keyBindings[i] == "string") {
                        this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0)
                    }
                }
            } else {
                this.options.keyBindings = {}
            }
            for (i in keys) {
                this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i]
            }
            utils.addEvent(window, "keydown", this);
            this.on("destroy", 
            function() {
                utils.removeEvent(window, "keydown", this)
            })
        },
        _key: function(e) {
            if (!this.enabled) {
                return
            }
            var snap = this.options.snap,
            newX = snap ? this.currentPage.pageX: this.x,
            newY = snap ? this.currentPage.pageY: this.y,
            now = utils.getTime(),
            prevTime = this.keyTime || 0,
            acceleration = 0.25,
            pos;
            if (this.options.useTransition && this.isInTransition) {
                pos = this.getComputedPosition();
                if (is_android) {
                    this._transitionTime(0.001)
                }
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this.isInTransition = false
            }
            this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
            switch (e.keyCode) {
            case this.options.keyBindings.pageUp:
                if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
                    newX += snap ? 1: this.wrapperWidth
                } else {
                    newY += snap ? 1: this.wrapperHeight
                }
                break;
            case this.options.keyBindings.pageDown:
                if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
                    newX -= snap ? 1: this.wrapperWidth
                } else {
                    newY -= snap ? 1: this.wrapperHeight
                }
                break;
            case this.options.keyBindings.end:
                newX = snap ? this.pages.length - 1: this.maxScrollX;
                newY = snap ? this.pages[0].length - 1: this.maxScrollY;
                break;
            case this.options.keyBindings.home:
                newX = 0;
                newY = 0;
                break;
            case this.options.keyBindings.left:
                newX += snap ? -1: 5 + this.keyAcceleration >> 0;
                break;
            case this.options.keyBindings.up:
                newY += snap ? 1: 5 + this.keyAcceleration >> 0;
                break;
            case this.options.keyBindings.right:
                newX -= snap ? -1: 5 + this.keyAcceleration >> 0;
                break;
            case this.options.keyBindings.down:
                newY -= snap ? 1: 5 + this.keyAcceleration >> 0;
                break
            }
            if (snap) {
                this.goToPage(newX, newY);
                return
            }
            if (newX > 0) {
                newX = 0;
                this.keyAcceleration = 0
            } else {
                if (newX < this.maxScrollX) {
                    newX = this.maxScrollX;
                    this.keyAcceleration = 0
                }
            }
            if (newY > 0) {
                newY = 0;
                this.keyAcceleration = 0
            } else {
                if (newY < this.maxScrollY) {
                    newY = this.maxScrollY;
                    this.keyAcceleration = 0
                }
            }
            this.scrollTo(newX, newY, 0);
            this.keyTime = now
        },
        _animate: function(destX, destY, duration, easingFn) {
            var that = this,
            startX = this.x,
            startY = this.y,
            startTime = utils.getTime(),
            destTime = startTime + duration;
            function step() {
                var now = utils.getTime(),
                newX,
                newY,
                easing;
                if (now >= destTime) {
                    that.isAnimating = false;
                    that._translate(destX, destY);
                    if (!that.resetPosition(that.options.bounceTime)) {
                        that._execEvent("scrollEnd")
                    }
                    return
                }
                now = (now - startTime) / duration;
                easing = easingFn(now);
                newX = (destX - startX) * easing + startX;
                newY = (destY - startY) * easing + startY;
                that._translate(newX, newY);
                if (that.isAnimating) {
                    rAF(step)
                }
            }
            this.isAnimating = true;
            step()
        },
        handleEvent: function(e) {
            switch (e.type) {
            case "touchstart":
            case "MSPointerDown":
            case "mousedown":
                this._start(e);
                break;
            case "touchmove":
            case "MSPointerMove":
            case "mousemove":
                this._move(e);
                break;
            case "touchend":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(e);
                break;
            case "orientationchange":
            case "resize":
                this._resize();
                break;
            case "transitionend":
            case "webkitTransitionEnd":
            case "oTransitionEnd":
            case "MSTransitionEnd":
                this._transitionEnd(e);
                break;
            case "DOMMouseScroll":
            case "mousewheel":
                this._wheel(e);
                break;
            case "keydown":
                this._key(e);
                break
            }
        }
    };
    function createDefaultScrollbar(direction, interactive, type) {
        var scrollbar = document.createElement("div"),
        indicator = document.createElement("div");
        if (type === true) {
            scrollbar.style.cssText = "position:absolute;z-index:9999";
            indicator.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"
        }
        indicator.className = "iScrollIndicator";
        if (direction == "h") {
            if (type === true) {
                scrollbar.style.cssText += ";height:7px;left:2px;right:2px;bottom:0";
                indicator.style.height = "100%"
            }
            scrollbar.className = "iScrollHorizontalScrollbar"
        } else {
            if (type === true) {
                scrollbar.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px";
                indicator.style.width = "100%"
            }
            scrollbar.className = "iScrollVerticalScrollbar"
        }
        if (!interactive) {
            scrollbar.style.pointerEvents = "none"
        }
        scrollbar.appendChild(indicator);
        return scrollbar
    }
    function Indicator(scroller, options) {
        this.wrapper = typeof options.el == "string" ? document.querySelector(options.el) : options.el;
        this.indicator = this.wrapper.children[0];
        this.indicatorStyle = this.indicator.style;
        this.scroller = scroller;
        this.options = {
            listenX: true,
            listenY: true,
            interactive: false,
            resize: true,
            defaultScrollbars: false,
            speedRatioX: 0,
            speedRatioY: 0
        };
        for (var i in options) {
            this.options[i] = options[i]
        }
        this.sizeRatioX = 1;
        this.sizeRatioY = 1;
        this.maxPosX = 0;
        this.maxPosY = 0;
        if (this.options.interactive) {
            utils.addEvent(this.indicator, "touchstart", this);
            utils.addEvent(this.indicator, "MSPointerDown", this);
            utils.addEvent(this.indicator, "mousedown", this);
            utils.addEvent(window, "touchend", this);
            utils.addEvent(window, "MSPointerUp", this);
            utils.addEvent(window, "mouseup", this)
        }
    }
    Indicator.prototype = {
        handleEvent: function(e) {
            switch (e.type) {
            case "touchstart":
            case "MSPointerDown":
            case "mousedown":
                this._start(e);
                break;
            case "touchmove":
            case "MSPointerMove":
            case "mousemove":
                this._move(e);
                break;
            case "touchend":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(e);
                break
            }
        },
        destroy: function() {
            if (this.options.interactive) {
                utils.removeEvent(this.indicator, "touchstart", this);
                utils.removeEvent(this.indicator, "MSPointerDown", this);
                utils.removeEvent(this.indicator, "mousedown", this);
                utils.removeEvent(window, "touchmove", this);
                utils.removeEvent(window, "MSPointerMove", this);
                utils.removeEvent(window, "mousemove", this);
                utils.removeEvent(window, "touchend", this);
                utils.removeEvent(window, "MSPointerUp", this);
                utils.removeEvent(window, "mouseup", this)
            }
            if (this.options.defaultScrollbars) {
                this.wrapper.parentNode.removeChild(this.wrapper)
            }
        },
        _start: function(e) {
            var point = e.touches ? e.touches[0] : e; (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation();
            this.transitionTime(0);
            this.initiated = true;
            this.moved = false;
            this.lastPointX = point.pageX;
            this.lastPointY = point.pageY;
            this.startTime = utils.getTime();
            utils.addEvent(window, "touchmove", this);
            utils.addEvent(window, "MSPointerMove", this);
            utils.addEvent(window, "mousemove", this);
            this.scroller._execEvent("scrollStart")
        },
        _move: function(e) {
            var point = e.touches ? e.touches[0] : e,
            deltaX,
            deltaY,
            newX,
            newY,
            timestamp = utils.getTime();
            this.moved = true;
            deltaX = point.pageX - this.lastPointX;
            this.lastPointX = point.pageX;
            deltaY = point.pageY - this.lastPointY;
            this.lastPointY = point.pageY;
            newX = this.x + deltaX;
            newY = this.y + deltaY;
            this._pos(newX, newY); (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation()
        },
        _end: function(e) {
            if (!this.initiated) {
                return
            }
            this.initiated = false; (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation();
            utils.removeEvent(window, "touchmove", this);
            utils.removeEvent(window, "MSPointerMove", this);
            utils.removeEvent(window, "mousemove", this);
            if (this.moved) {
                this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(time) {
            time = time || 0;
            this.indicatorStyle[utils.style.transitionDuration] = time + "ms"
        },
        transitionTimingFunction: function(easing) {
            this.indicatorStyle[utils.style.transitionTimingFunction] = easing
        },
        refresh: function() {
            this.transitionTime(0);
            if (this.options.listenX && !this.options.listenY) {
                this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block": "none"
            } else {
                if (this.options.listenY && !this.options.listenX) {
                    this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block": "none"
                } else {
                    this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block": "none"
                }
            }
            if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
                utils.addClass(this.wrapper, "iScrollBothScrollbars");
                utils.removeClass(this.wrapper, "iScrollLoneScrollbar");
                if (this.options.defaultScrollbars && this.options.customStyle) {
                    if (this.options.listenX) {
                        this.wrapper.style.right = "8px"
                    } else {
                        this.wrapper.style.bottom = "8px"
                    }
                }
            } else {
                utils.removeClass(this.wrapper, "iScrollBothScrollbars");
                utils.addClass(this.wrapper, "iScrollLoneScrollbar");
                if (this.options.defaultScrollbars && this.options.customStyle) {
                    if (this.options.listenX) {
                        this.wrapper.style.right = "2px"
                    } else {
                        this.wrapper.style.bottom = "2px"
                    }
                }
            }
            var r = this.wrapper.offsetHeight;
            if (this.options.listenX) {
                this.wrapperWidth = this.wrapper.clientWidth;
                if (this.options.resize) {
                    this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / this.scroller.scrollerWidth), 8);
                    this.indicatorStyle.width = this.indicatorWidth + "px"
                } else {
                    this.indicatorWidth = this.indicator.clientWidth
                }
                this.maxPosX = this.wrapperWidth - this.indicatorWidth;
                this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX))
            }
            if (0 && this.options.listenY) {
                this.wrapperHeight = this.wrapper.clientHeight;
                if (this.options.resize) {
                    this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / this.scroller.scrollerHeight), 8);
                    this.indicatorStyle.height = this.indicatorHeight + "px"
                } else {
                    this.indicatorHeight = this.indicator.clientHeight
                }
                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY))
            }
            this.updatePosition()
        },
        updatePosition: function() {
            var x = Math.round(this.sizeRatioX * this.scroller.x) || 0,
            y = Math.round(this.sizeRatioY * this.scroller.y) || 0;
            if (!this.options.ignoreBoundaries) {
                if (x < 0) {
                    x = 0
                } else {
                    if (x > this.maxPosX) {
                        x = this.maxPosX
                    }
                }
                if (y < 0) {
                    y = 0
                } else {
                    if (y > this.maxPosY) {
                        y = this.maxPosY
                    }
                }
            }
            this.x = x;
            this.y = y;
            if (this.scroller.options.useTransform) {
                this.indicatorStyle[utils.style.transform] = "translate(" + x + "px," + y + "px)" + this.scroller.translateZ
            } else {
                this.indicatorStyle.left = x + "px";
                this.indicatorStyle.top = y + "px"
            }
        },
        _pos: function(x, y) {
            if (x < 0) {
                x = 0
            } else {
                if (x > this.maxPosX) {
                    x = this.maxPosX
                }
            }
            if (y < 0) {
                y = 0
            } else {
                if (y > this.maxPosY) {
                    y = this.maxPosY
                }
            }
            x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
            y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
            this.scroller.scrollTo(x, y)
        }
    };
    IScroll.ease = utils.ease;
    return IScroll
})(window, document, Math);
var Z_Dom = {
    insertShare: function(id) {
        var o = null,
        tmpStr = "",
        title = "",
        hiddenStr = "",
        showStr = "";
        id = id ? "#" + id: "body";
        showStr = '<div class="bdsharebuttonbox" data-tag="nor-share">';
        hiddenStr = '<div class="bdsharebuttonbox" data-tag="nor-share" style="display:none">';
        tmpStr += '<a href="#" class="bds_tsina" data-cmd="tsina" title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a"></a>' + '<a href="#" class="bds_tqq" data-cmd="tqq" title="\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a"></a>' + '<a href="#" class="bds_qzone" data-cmd="qzone" title="\u5206\u4eab\u5230QQ\u7a7a\u95f4"></a></div>';
        hiddenStr += tmpStr;
        showStr += tmpStr;
        $(id).find(".share-btns").each(function() {
            var sInsert,
            oInsert = null;
            o = $(this);
            sInsert = o.attr("data-insertbox");
            oInsert = typeof sInsert != "undefined" ? $("#" + sInsert) : o;
            switch (o.attr("data-share")) {
            case "show":
                oInsert.append(showStr);
                break;
            case "hidden":
                oInsert.append(hiddenStr);
                break;
            default:
                break
            }
        });
        var spe_share_cfg = $("#speShareCfg").length ? $("#speShareCfg").val() : "",
        bd_text = spe_share_cfg ? spe_share_cfg.split("|")[1] : "",
        bd_url = spe_share_cfg ? spe_share_cfg.split("|")[0] : "",
        share_cfg = WEB_CONFIG.isShareBtn ? [{
            "tag": "nor-share",
            "bdText": ""
        },
        {
            "tag": "sp-share",
            "bdText": bd_text,
            "bdUrl": bd_url
        }] : {};
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdMini": "2",
                "bdMiniList": false,
                "bdPic": "",
                "bdStyle": "0",
                "bdSize": "24"
            },
            "share": share_cfg
        };
        with(document) {
            0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~ ( - new Date() / 3600000)]
        }
    },
    getMarginTop: function(e) {
        return e && e.offsetTop + (e.offsetParent ? arguments.callee(e.offsetParent) : 0)
    },
    getMarginLeft: function(e) {
        return e && e.offsetLeft + (e.offsetParent ? arguments.callee(e.offsetParent) : 0)
    },
    processSidebar: function() {
        var oSidebar = $("#sidebar");
        if (typeof $.cookie == "undefined" || typeof IScroll == "undefined" || oSidebar.length < 1) {
            return false
        }
        var sideKey = "LIST_SHOW_SIDEBAR",
        isShowSide = $.cookie(sideKey);
        if (document.body.clientWidth > 1650) {
            isShowSide == 1 && oSidebar.removeClass("bbsMenuOpen")
        }
        var myScroll = new IScroll("#forumMenuInner", {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "scale",
            fadeScrollbars: true
        });
        oSidebar.height($(window).height() - 30);
        myScroll.refresh();
        $(window).resize(function() {
            var windowHeight = $(window).height(),
            windowScrollTop = $(window).scrollTop();
            if (windowScrollTop <= 30) {
                oSidebar.height(windowHeight - 30)
            } else {
                oSidebar.height(windowHeight)
            }
        }); (function() {
            var srollFun = function(ws) {
                if (ws <= 30) {
                    oSidebar.css({
                        "top": "30px",
                        "height": $(window).height() - 30
                    });
                    myScroll.refresh()
                } else {
                    oSidebar.css({
                        "top": "0",
                        "height": $(window).height()
                    });
                    myScroll.refresh()
                }
            };
            srollFun($(window).scrollTop());
            $(window).scroll(function() {
                srollFun($(window).scrollTop())
            })
        })();
        oSidebar.show();
        oSidebar.find(".trigger-bar").on("click", 
        function() {
            var flag = 0,
            o = $(this).parent();
            if (o.hasClass("bbsMenuOpen")) {
                flag = 1;
                o.removeClass("bbsMenuOpen")
            } else {
                o.addClass("bbsMenuOpen")
            }
            $.cookie(sideKey, flag, {
                path: "/"
            });
            setTimeout(function() {
                myScroll.refresh()
            },
            0)
        }); (function() {
            var t = {};
            oSidebar.on("mouseenter", ".cateitemboxshow", 
            function() {
                var o = $(this);
                oSidebar.find(".cateitemboxshow").removeClass("cateitembox-hover");
                o.addClass("cateitembox-hover");
                o.css("zIndex", 10);
                clearTimeout(t.b);
                $("#publicSubcatepop").remove();
                var html = '<div id="publicSubcatepop" class="subcatepop" >' + o.find(".subcatepop").html() + "</div>";
                $("body").append(html);
                pop(o);
                $("#publicSubcatepop").css({
                    top: o.offset().top
                });
                return
            }).on("mouseleave", ".cateitemboxshow", 
            function() {
                var o = $(this);
                t.a = setTimeout(function() {
                    o.removeClass("cateitembox-hover")
                },
                150);
                t.b = setTimeout(function() {
                    $("#publicSubcatepop").remove()
                },
                150);
                o.css("zIndex", 0);
                pop(o);
                return
            });
            var pop = function(o) {
                $("#publicSubcatepop").unbind().hover(function() {
                    clearTimeout(t.a);
                    clearTimeout(t.b);
                    $(o).addClass("cateitembox-hover")
                },
                function() {
                    $("#publicSubcatepop").remove();
                    $(o).removeClass("cateitembox-hover")
                })
            }
        })()
    },
    delayLoadImg: function(options) {
        options = typeof options != "object" ? {}: options;
        var t,
        that = this,
        dealArr = [],
        config = {
            id: "body",
            selected: "img"
        };
        options = $.extend(config, options);
        var noLoad = getNoLoadImg();
        if (noLoad.length < 1) {
            return false
        }
        var alpha = 0;
        noLoad.each(function() {
            var o = this,
            iiTop = that.getMarginTop(this);
            dealArr.push({
                obj: o
            })
        });
        t = setInterval(function() {
            process()
        },
        200);
        function getNoLoadImg() {
            var id = config.id == "body" ? "body": "#" + config.id;
            return $(id).find(config.selected)
        }
        function process() {
            var leng = dealArr.length;
            if (leng < 1) {
                end();
                return false
            }
            for (var i = 0; i < leng; i++) { (function(o) {
                    opts = setInterval(function() {
                        o.src = o.getAttribute("data-src");
                        o.setAttribute("shid", 1);
                        alpha += 2;
                        if (alpha > 100) {
                            alpha = 100
                        }
                        o.style.opacity = alpha / 100;
                        o.style.filter = "alpha(opacity=" + alpha + ")";
                        if (alpha == 100) {
                            clearInterval(opts)
                        }
                    },
                    13)
                })(dealArr[i].obj)
            }
            dealArr = []
        }
        function addDealArr() {}
        function end() {
            clearInterval(t);
            $(window).off("scroll resize", addDealArr)
        }
    },
    loadFile: function(data) {
        if (!data) {
            return false
        }
        var head = document.getElementsByTagName("head")[0],
        doHandle = function(src) {
            if (!src || typeof src !== "string") {
                return false
            }
            js = document.createElement("script");
            js.src = src;
            head.appendChild(js)
        };
        if (typeof data === "object") {
            for (x in data) {
                if (data.hasOwnProperty(x)) {
                    doHandle(data[x])
                }
            }
        }
    },
    delayCallback: function(options) {
        var sMark = "",
        sQuery = "",
        oData = null,
        oPar = null,
        config = {
            par: null,
            data: null,
            tag: "",
            prop: "data-id"
        };
        options = $.extend(config, options);
        oData = options.data;
        if (typeof oData != "object" || oData.length < 1) {
            return false
        }
        for (var i = 0, size = oData.length; i < size; i++) {
            sMark = i === 0 ? "": ",";
            sQuery += sMark + config.tag + "[" + config.prop + '="' + oData[i].userid + '"]'
        }
        oPar = config.par || $("body");
        oPar.find(sQuery).each(function() {
            options.callback && options.callback($(this))
        })
    },
    listImgPop: function() {
        var oList = $("#bookList"),
        oImgPop = $("#imgPopBox"),
        oPos = oList.find(".author").get(0),
        popConfig = {
            t1: null,
            t2: null,
            iLeft: Z_Dom.getMarginLeft(oPos)
        };
        oImgPop.css({
            "top": Z_Dom.getMarginTop(oPos),
            "left": popConfig.iLeft
        });
        oList.on("mouseenter", ".showImgPop", 
        function() {
            var self = this;
            clearTimeout(popConfig.t2);
            popConfig.t1 = setTimeout(function() {
                var o = $("#pre_img"),
                iLeft = Z_Dom.getMarginTop(self) + self.offsetHeight;
                o.attr("href", self.getAttribute("url"));
                o.find("img").attr("src", self.getAttribute("data-pic"));
                oImgPop.animate({
                    "top": iLeft,
                    "left": popConfig.iLeft
                },
                "fast").show()
            },
            200)
        }).on("mouseleave", ".showImgPop", 
        function() {
            clearTimeout(popConfig.t1);
            popConfig.t2 = setTimeout(function() {
                oImgPop.hide()
            },
            300)
        });
        oImgPop.on("mouseenter", 
        function() {
            clearTimeout(popConfig.t2);
            $(this).show();
            return false
        }).on("mouseleave", 
        function() {
            $(this).hide();
            return false
        })
    },
    insertScrambleBox: function(config) {
        if (!config) {
            return false
        }
        var o = null,
        oBox,
        sMsg = "",
        iEnd;
        iEnd = config.cdown;
        sMsg = "\u8ddd\u79bb\u4e0b\u6b21\u62a2\u8d2d\u8fd8\u6709";
        if (config.cdown < config.now) {
            sMsg = "\u5c3d\u60c5\u671f\u5f85\u4e0b\u6b21\u62a2\u8d2d";
            iEnd = config.end
        }
        var sHtml = '<div class="brand-scramble-box" style="display:none">' + "<h3><span>\u62a2N1</span></h3>" + "<p>" + sMsg + '<em class="cd-time-zone"><span></span>\u5929<span></span>\u5c0f\u65f6<span></span>\u5206<span></span>\u79d2</em></p>' + '<a href="http://n1.zol.com/" target="_blank">\u53bb\u62a2N\u7801&gt;&gt;</a></div>';
        o = $(sHtml);
        $("body").append(o);
        oBox = o.find(".cd-time-zone").find("span");
        Z_Effect.countDown({
            sec: $(oBox[3]),
            min: $(oBox[2]),
            hour: $(oBox[1]),
            day: $(oBox[0]),
            nowTime: config.now,
            endTime: iEnd
        });
        o.show()
    },
    insertBbsAd: function(options) {
        var url = "/index.php?c=Ajax_Public&a=getModule",
        oDom = null,
        config = {
            domId: "bbsAd",
            moduleId: null,
            width: "1000",
            height: "90"
        };
        options = $.extend(config, options);
        oDom = $("#" + options.domId);
        if (!options || !oDom.size()) {
            return false
        }
        $.getJSON(url + "&moduleId=" + options.moduleId, 
        function(json) {
            if (json.info == "ok") {
                var oData = json.data;
                for (i = 0; i < oData.length; i++) {
                    var htmlStr = '<a target="_blank" href="' + oData[i].url + '" style="display:block; margin:10px 0 0;"><img style="display:block;" height="' + options.height + '" width="' + options.width + '" src="' + oData[i].img1 + '" /></a>';
                    oDom.html(htmlStr)
                }
            }
        })
    }
}; (function($) {
    $.fn.survey = function(options) {
        var defaults = {
            content: "\u5c06\u60a8\u7684\u4f7f\u7528\u5efa\u8bae\u6216\u8005\u60f3\u6cd5\u544a\u8bc9\u6211\u4eec\u5427\uff0c\u6211\u4eec\u5c06\u8ba4\u771f\u503e\u542c\u60a8\u7684\u611f\u53d7\uff1a\uff09",
            width: "298",
            height: "207",
            words: 500,
            api: "/index.php?c=Ajax_Public&a=addSurvey&t=" + (new Date).getTime(),
            channel: "<em>\u201c\u5f53\u524d\u9875\u9762\u201d</em>",
            pageType: "",
            url: location.hostname + location.pathname + location.search
        };
        var options = $.extend(defaults, options);
        if ($.browser.msie) {
            var ieVersion = parseInt($.browser.version)
        }
        var __surveyCreate = function() {
            var surveyHtml = $("<div></div>");
            surveyHtml.addClass("survey-box");
            surveyHtml.attr("id", "D_SurveyBox");
            if (ieVersion && ieVersion < 10) {
                surveyHtml.addClass("survey-ie")
            }
            surveyHtml.html('<div class="survey-header"><div class="survey-title">\u60a8\u5bf9' + options.channel + '\u6ee1\u610f\u5417\uff1f</div><a id="D_SurveyClose" class="survey-close" href="#"></a></div><div class="survey-main"><div class="survey-radio survey-radio-good" idx="1"><i></i>\u6ee1\u610f</div><div class="survey-radio survey-radio-bad" idx="2"><i></i>\u4e0d\u6ee1\u610f</div><textarea id="D_SurveyText" class="survey-text default">' + options.content + '</textarea><div class="survey-count">\u8fd8\u53ef\u4ee5\u8f93\u5165<label id="D_SurveyCountCur" class="survey-count-cur">' + options.words + '</label>\u5b57</div><button id="D_SurveySubmit" class="survey-submit">\u63d0\u4ea4</button></div><div id="D_SurveyMask" class="survey-mask"></div><div id="D_SurveyTip" class="survey-tip"></div>');
            $("body").append(surveyHtml);
            __ie6Fixed()
        };
        var __surveyShow = function() {
            var surveyBox = $("#D_SurveyBox");
            if (!surveyBox) {
                return
            }
            if (!ieVersion || ieVersion >= 10) {
                surveyBox.removeClass("survey-hide-w3c").addClass("survey-show-w3c")
            }
            surveyBox.css("visibility", "visible")
        };
        var __surveyHide = function() {
            var surveyBox = $("#D_SurveyBox");
            if (!surveyBox) {
                return
            }
            __reset();
            if (!ieVersion || ieVersion >= 10) {
                surveyBox.removeClass("survey-show-w3c").addClass("survey-hide-w3c");
                return
            }
            surveyBox.css("visibility", "hidden")
        };
        var __reset = function() {
            $("#D_SurveyText").val(options.content).addClass("default");
            $(".survey-count-cur").text(options.words);
            $(".survey-radio").removeClass("survey-radio-good-sel survey-radio-bad-sel")
        };
        var __initEvent = function() {
            $("#callSurvey").bind("click", 
            function(e) {
                e.preventDefault();
                __surveyShow()
            });
            var surveyClose = $("#D_SurveyClose");
            surveyClose.bind("click", 
            function(e) {
                e.preventDefault();
                __surveyHide()
            });
            var surveyRadios = $(".survey-radio");
            if (!surveyRadios || !surveyRadios.length) {
                return
            }
            surveyRadios.each(function() {
                $(this).bind("click", 
                function() {
                    surveyRadios.removeClass("survey-radio-good-sel survey-radio-bad-sel");
                    if ($(this).attr("idx") == 1) {
                        $(this).addClass("survey-radio-good-sel")
                    } else {
                        $(this).addClass("survey-radio-bad-sel")
                    }
                })
            });
            var surveyText = $("#D_SurveyText"),
            surveySubmit = $("#D_SurveySubmit");
            surveyText.bind({
                "focus": function() {
                    if ($(this).val() == options.content) {
                        $(this).val("")
                    }
                    $(this).removeClass("default")
                },
                "blur": function() {
                    if ($(this).val() == "" || $(this).val() == options.content) {
                        $(this).val(options.content);
                        $(this).addClass("default")
                    } else {
                        $(this).removeClass("default")
                    }
                },
                "keyup": function() {
                    var tempLen = (options.words - $(this).val().length),
                    count = $("#D_SurveyCountCur");
                    count.html(tempLen);
                    if (tempLen < 0) {
                        count.addClass("survey-count-over");
                        surveySubmit.attr("disabled", "disabled").addClass("survey-submit-disabled")
                    } else {
                        count.removeClass("survey-count-over");
                        surveySubmit.removeAttr("disabled").removeClass("survey-submit-disabled")
                    }
                }
            });
            if (!surveySubmit.hasClass("survey-submit-disabled")) {
                surveySubmit.bind("click", 
                function() {
                    __submit.call(this)
                })
            }
        };
        var __validate = function() {
            var selRadio = $(".survey-radio-good-sel").length > 0 ? $(".survey-radio-good-sel").attr("idx") : "" || $(".survey-radio-bad-sel").length > 0 ? $(".survey-radio-bad-sel").attr("idx") : "";
            var valIn = $.trim($("#D_SurveyText").val());
            if ("" == selRadio) {
                __tip("warning", "\u8bf7\u9009\u62e9 '\u6ee1\u610f' \u8fd8\u662f '\u4e0d\u6ee1\u610f'\uff01");
                return null
            }
            if (valIn.length == 0 || valIn == options.content) {
                __tip("warning", "\u8bf7\u8f93\u5165\u60a8\u5bf9" + options.channel + "\u7684\u5efa\u8bae\uff01");
                return null
            }
            return {
                causes: selRadio,
                content: valIn
            }
        };
        var __submit = function() {
            if (! (feedContent = __validate())) {
                return
            }
            $.post(options.api, {
                pageType: options.pageType,
                url: options.url,
                causes: feedContent.causes,
                content: escape(feedContent.content)
            },
            function(data) {
                if (data.status == 1) {
                    __tip("success", "\u63d0\u4ea4\u6210\u529f! \u8c22\u8c22\u60a8\u7684\u53cd\u9988!");
                    setTimeout(function() {
                        __surveyHide()
                    },
                    1000)
                } else {
                    if (data.status == 0) {
                        __tip("warning", "\u63d0\u4ea4\u5931\u8d25! \u8bf7\u7a0d\u540e\u518d\u8bd5!")
                    } else {
                        if (data.status == 2) {
                            __tip("success", "\u63d0\u4ea4\u6210\u529f! \u8c22\u8c22\u60a8\u7684\u53cd\u9988!");
                            setTimeout(function() {
                                __surveyHide()
                            },
                            1000)
                        }
                    }
                }
            },
            "json")
        };
        var __tip = function(type, tipText) {
            var surveyTip = $("#D_SurveyTip"),
            surveyMask = $("#D_SurveyMask");
            if (!surveyTip || !surveyMask) {
                return
            }
            surveyTip.removeClass("warning success").addClass(type).html(tipText);
            surveyMask.css("display", "block");
            surveyTip.css("display", "block");
            setTimeout(function() {
                surveyMask.css("display", "none");
                surveyTip.css("display", "none")
            },
            1000)
        };
        var __ie6Fixed = function() {
            if (ieVersion !== 6) {
                return
            }
            var surveyBox = $("#D_SurveyBox");
            if (!surveyBox) {
                return
            }
            $(window).bind("scroll", 
            function() {
                var h = $(window).height(),
                st = $(window).scrollTop(),
                _top = h + st - options.height;
                surveyBox.css("top", _top + "px")
            })
        };
        if (screen.width >= 1280) {
            $(function() {
                __surveyCreate();
                __initEvent()
            })
        }
    }
})(jQuery);
if (typeof User == "undefined" || !User) {
    var User = {}
}
User.sendPrivateMessage = function(touserid, content) {
    if (!touserid) {
        return false
    }
    var data = {
        touserid: touserid,
        content: content
    };
    $.post("/index.php?c=Ajax_Book&a=sendPrivateMessage", data, 
    function(json) {
        $("#G_privateMsg").remove();
        if (typeof json != "undefined" || !json) {
            $("#G_privateMsg").find("textarea").val("");
            if (json.info == "err") {
                Layer.tips({
                    content: "<p>" + json.msg + "</p>"
                });
                return false
            }
            if (json.info == "ok") {
                Layer.tips({
                    content: "<p>\u53d1\u9001\u6210\u529f~</p>"
                })
            }
        }
    },
    "json")
};
User.addFollow = function(touid, obj) {
    var userdata = {
        "userid": userid
    };
    $.get("/index.php?c=Ajax_User&a=GetForeverForbidPublish&r=" + (new Date()).getTime(), userdata, 
    function(json) {
        if (json.info == "ok") {
            Layer.tips({
                content: "<p>\u60a8\u7684ID\u5df2\u88ab\u6c38\u7981\uff0c\u4e0d\u5141\u8bb8\u4efb\u4f55\u64cd\u4f5c~</p>"
            });
            return false
        } else {
            if (!touid) {
                return false
            }
            var data = {
                follow_uid: touid
            };
            $.getJSON("http://my.zol.com.cn/api/follow/follow.php?callback=?", data, 
            function(json) {
                if (typeof json != "undefiend" || !json) {
                    var newStr = "",
                    o = $(".wrapper").find(".addFollow[touid='" + touid + "']");
                    if (json.code == 1001 || json.code == 4009) {
                        newStr = "<span>\u5df2\u5173\u6ce8</span>"
                    } else {
                        if (json.code == 4012) {
                            newStr = '<span class="each-other"><em>\u76f8\u4e92\u5173\u6ce8</em></span>'
                        } else {
                            if (json.code == 4010) {
                                Layer.tips({
                                    content: "<p>" + json.msg + "</p>"
                                });
                                return false
                            } else {
                                return false
                            }
                        }
                    }
                    o.each(function() {
                        this.parentNode.innerHTML = newStr
                    });
                    obj && $(obj).replaceWith(newStr)
                }
            })
        }
    },
    "json")
};
User.forbidUser = function(touserid, forbidtime, content) {
    if (!touserid) {
        return false
    }
    var data = {
        touserid: touserid,
        forbidtime: forbidtime,
        content: content,
        boardid: boardid,
        bookid: bookid,
        bbsid: Detail_Config.bbsid
    };
    $.post("/index.php?c=Ajax_Book&a=ForbidUser", data, 
    function(json) {
        $("#G_forbiduser").hide();
        if (typeof json != "undefined" || !json) {
            $("#G_forbiduser").find("textarea").val("");
            if (json.info == "err") {
                Layer.tips({
                    content: "<p>" + json.msg + "</p>"
                });
                return false
            }
            if (json.info == "ok") {
                Layer.tips({
                    content: "<p>\u53d1\u9001\u6210\u529f~</p>"
                })
            }
        }
    },
    "json")
}; ! 
function(t) {
    var e = {},
    s = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4000,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {},
        onSliderResize: function() {}
    };
    t.fn.bxSlider = function(n) {
        if (0 == this.length) {
            return this
        }
        if (this.length > 1) {
            return this.each(function() {
                t(this).bxSlider(n)
            }),
            this
        }
        var o = {},
        r = this;
        e.el = this;
        var a = t(window).width(),
        l = t(window).height(),
        d = function() {
            o.settings = t.extend({},
            s, n),
            o.settings.slideWidth = parseInt(o.settings.slideWidth),
            o.children = r.children(o.settings.slideSelector),
            o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length),
            o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length),
            o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)),
            o.active = {
                index: o.settings.startSlide
            },
            o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1,
            o.carousel && (o.settings.preloadImages = "all"),
            o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin,
            o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin,
            o.working = !1,
            o.controls = {},
            o.interval = null,
            o.animProp = "vertical" == o.settings.mode ? "top": "left",
            o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && 
            function() {
                var t = document.createElement("div"),
                e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var i in e) {
                    if (void 0 !== t.style[e[i]]) {
                        return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(),
                        o.animProp = "-" + o.cssPrefix + "-transform",
                        !0
                    }
                }
                return ! 1
            } (),
            "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides),
            r.data("origStyle", r.attr("style")),
            r.children(o.settings.slideSelector).each(function() {
                t(this).data("origStyle", t(this).attr("style"))
            }),
            c()
        },
        c = function() {
            r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),
            o.viewport = r.parent(),
            o.loader = t('<div class="bx-loading" />'),
            o.viewport.prepend(o.loader),
            r.css({
                width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%": "auto",
                position: "relative"
            }),
            o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"),
            f(),
            o.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }),
            o.viewport.parent().css({
                maxWidth: p()
            }),
            o.settings.pager || o.viewport.parent().css({
                margin: "0 auto 0px"
            }),
            o.children.css({
                "float": "horizontal" == o.settings.mode ? "left": "none",
                listStyle: "none",
                position: "relative"
            }),
            o.children.css("width", u()),
            "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin),
            "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin),
            "fade" == o.settings.mode && (o.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }), o.children.eq(o.settings.startSlide).css({
                zIndex: o.settings.slideZIndex,
                display: "block"
            })),
            o.controls.el = t('<div class="bx-controls" />'),
            o.settings.captions && P(),
            o.active.last = o.settings.startSlide == x() - 1,
            o.settings.video && r.fitVids();
            var e = o.children.eq(o.settings.startSlide);
            "all" == o.settings.preloadImages && (e = o.children),
            o.settings.ticker ? o.settings.pager = !1: (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)),
            g(e, h)
        },
        g = function(e, i) {
            var s = e.find("img, iframe").length;
            if (0 == s) {
                return i(),
                void 0
            }
            var n = 0;
            e.find("img, iframe").each(function() {
                t(this).one("load", 
                function() {++n == s && i()
                }).each(function() {
                    this.complete && t(this).load()
                })
            })
        },
        h = function() {
            if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                var e = "vertical" == o.settings.mode ? o.settings.minSlides: o.settings.maxSlides,
                i = o.children.slice(0, e).clone().addClass("bx-clone"),
                s = o.children.slice( - e).clone().addClass("bx-clone");
                r.append(i).prepend(s)
            }
            o.loader.remove(),
            S(),
            "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0),
            o.viewport.height(v()),
            r.redrawSlider(),
            o.settings.onSliderLoad(o.active.index),
            o.initialized = !0,
            o.settings.responsive && t(window).bind("resize", Z),
            o.settings.auto && o.settings.autoStart && H(),
            o.settings.ticker && L(),
            o.settings.pager && q(o.settings.startSlide),
            o.settings.controls && W(),
            o.settings.touchEnabled && !o.settings.ticker && O()
        },
        v = function() {
            var e = 0,
            s = t();
            if ("vertical" == o.settings.mode || o.settings.adaptiveHeight) {
                if (o.carousel) {
                    var n = 1 == o.settings.moveSlides ? o.active.index: o.active.index * m();
                    for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++) {
                        s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i))
                    }
                } else {
                    s = o.children.eq(o.active.index)
                }
            } else {
                s = o.children
            }
            return "vertical" == o.settings.mode ? (s.each(function() {
                e += t(this).outerHeight()
            }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function() {
                return t(this).outerHeight(!1)
            }).get()),
            e
        },
        p = function() {
            var t = "100%";
            return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin: o.settings.slideWidth),
            t
        },
        u = function() {
            var t = o.settings.slideWidth,
            e = o.viewport.width();
            return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e: o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)),
            t
        },
        f = function() {
            var t = 1;
            if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0) {
                if (o.viewport.width() < o.minThreshold) {
                    t = o.settings.minSlides
                } else {
                    if (o.viewport.width() > o.maxThreshold) {
                        t = o.settings.maxSlides
                    } else {
                        var e = o.children.first().width();
                        t = Math.floor(o.viewport.width() / e)
                    }
                }
            } else {
                "vertical" == o.settings.mode && (t = o.settings.minSlides)
            }
            return t
        },
        x = function() {
            var t = 0;
            if (o.settings.moveSlides > 0) {
                if (o.settings.infiniteLoop) {
                    t = o.children.length / m()
                } else {
                    for (var e = 0, i = 0; e < o.children.length;) {++t,
                        e = i + f(),
                        i += o.settings.moveSlides <= f() ? o.settings.moveSlides: f()
                    }
                }
            } else {
                t = Math.ceil(o.children.length / f())
            }
            return t
        },
        m = function() {
            return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides: f()
        },
        S = function() {
            if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                if ("horizontal" == o.settings.mode) {
                    var t = o.children.last(),
                    e = t.position();
                    b( - (e.left - (o.viewport.width() - t.width())), "reset", 0)
                } else {
                    if ("vertical" == o.settings.mode) {
                        var i = o.children.length - o.settings.minSlides,
                        e = o.children.eq(i).position();
                        b( - e.top, "reset", 0)
                    }
                }
            } else {
                var e = o.children.eq(o.active.index * m()).position();
                o.active.index == x() - 1 && (o.active.last = !0),
                void 0 != e && ("horizontal" == o.settings.mode ? b( - e.left, "reset", 0) : "vertical" == o.settings.mode && b( - e.top, "reset", 0))
            }
        },
        b = function(t, e, i, s) {
            if (o.usingCSS) {
                var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)": "translate3d(" + t + "px, 0, 0)";
                r.css("-" + o.cssPrefix + "-transition-duration", i / 1000 + "s"),
                "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", 
                function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    D()
                })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", 
                function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),
                    b(s.resetValue, "reset", 0),
                    N()
                }))
            } else {
                var a = {};
                a[o.animProp] = t,
                "slide" == e ? r.animate(a, i, o.settings.easing, 
                function() {
                    D()
                }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", 
                function() {
                    b(s.resetValue, "reset", 0),
                    N()
                })
            }
        },
        w = function() {
            for (var e = "", i = x(), s = 0; i > s; s++) {
                var n = "";
                o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1, o.pagerEl.addClass("bx-default-pager")),
                e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>"
            }
            o.pagerEl.html(e)
        },
        T = function() {
            o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()),
            o.pagerEl.on("click", "a", I)
        },
        C = function() {
            o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"),
            o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"),
            o.controls.next.bind("click", y),
            o.controls.prev.bind("click", z),
            o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next),
            o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev),
            o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
        },
        E = function() {
            o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"),
            o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"),
            o.controls.autoEl = t('<div class="bx-controls-auto" />'),
            o.controls.autoEl.on("click", ".bx-start", k),
            o.controls.autoEl.on("click", ".bx-stop", M),
            o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop),
            o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),
            A(o.settings.autoStart ? "stop": "start")
        },
        P = function() {
            o.children.each(function() {
                var e = t(this).find("img:first").attr("title");
                void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
            })
        },
        y = function(t) {
            o.settings.auto && r.stopAuto(),
            r.goToNextSlide(),
            t.preventDefault()
        },
        z = function(t) {
            o.settings.auto && r.stopAuto(),
            r.goToPrevSlide(),
            t.preventDefault()
        },
        k = function(t) {
            r.startAuto(),
            t.preventDefault()
        },
        M = function(t) {
            r.stopAuto(),
            t.preventDefault()
        },
        I = function(e) {
            o.settings.auto && r.stopAuto();
            var i = t(e.currentTarget),
            s = parseInt(i.attr("data-slide-index"));
            s != o.active.index && r.goToSlide(s),
            e.preventDefault()
        },
        q = function(e) {
            var i = o.children.length;
            return "short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function(i, s) {
                t(s).find("a").eq(e).addClass("active")
            }), void 0)
        },
        D = function() {
            if (o.settings.infiniteLoop) {
                var t = "";
                0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()),
                t && ("horizontal" == o.settings.mode ? b( - t.left, "reset", 0) : "vertical" == o.settings.mode && b( - t.top, "reset", 0))
            }
            o.working = !1,
            o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
        },
        A = function(t) {
            o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
        },
        W = function() {
            1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
        },
        H = function() {
            o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(),
            o.settings.autoHover && r.hover(function() {
                o.interval && (r.stopAuto(!0), o.autoPaused = !0)
            },
            function() {
                o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
            })
        },
        L = function() {
            var e = 0;
            if ("next" == o.settings.autoDirection) {
                r.append(o.children.clone().addClass("bx-clone"))
            } else {
                r.prepend(o.children.clone().addClass("bx-clone"));
                var i = o.children.first().position();
                e = "horizontal" == o.settings.mode ? -i.left: -i.top
            }
            b(e, "reset", 0),
            o.settings.pager = !1,
            o.settings.controls = !1,
            o.settings.autoControls = !1,
            o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function() {
                r.stop()
            },
            function() {
                var e = 0;
                o.children.each(function() {
                    e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                });
                var i = o.settings.speed / e,
                s = "horizontal" == o.settings.mode ? "left": "top",
                n = i * (e - Math.abs(parseInt(r.css(s))));
                N(n)
            }),
            N()
        },
        N = function(t) {
            speed = t ? t: o.settings.speed;
            var e = {
                left: 0,
                top: 0
            },
            i = {
                left: 0,
                top: 0
            };
            "next" == o.settings.autoDirection ? e = r.find(".bx-clone").first().position() : i = o.children.first().position();
            var s = "horizontal" == o.settings.mode ? -e.left: -e.top,
            n = "horizontal" == o.settings.mode ? -i.left: -i.top,
            a = {
                resetValue: n
            };
            b(s, "ticker", speed, a)
        },
        O = function() {
            o.touch = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            },
            o.viewport.bind("touchstart", X)
        },
        X = function(t) {
            if (o.working) {
                t.preventDefault()
            } else {
                o.touch.originalPos = r.position();
                var e = t.originalEvent;
                o.touch.start.x = e.changedTouches[0].pageX,
                o.touch.start.y = e.changedTouches[0].pageY,
                o.viewport.bind("touchmove", Y),
                o.viewport.bind("touchend", V)
            }
        },
        Y = function(t) {
            var e = t.originalEvent,
            i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x),
            s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
            if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
                var n = 0;
                if ("horizontal" == o.settings.mode) {
                    var r = e.changedTouches[0].pageX - o.touch.start.x;
                    n = o.touch.originalPos.left + r
                } else {
                    var r = e.changedTouches[0].pageY - o.touch.start.y;
                    n = o.touch.originalPos.top + r
                }
                b(n, "reset", 0)
            }
        },
        V = function(t) {
            o.viewport.unbind("touchmove", Y);
            var e = t.originalEvent,
            i = 0;
            if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) {
                var s = Math.abs(o.touch.start.x - o.touch.end.x);
                s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
            } else {
                var s = 0;
                "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top),
                !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200)
            }
            o.viewport.unbind("touchend", V)
        },
        Z = function() {
            var e = t(window).width(),
            i = t(window).height(); (a != e || l != i) && (a = e, l = i, r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index))
        };
        return r.goToSlide = function(e, i) {
            if (!o.working && o.active.index != e) {
                if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1: e >= x() ? 0: e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && q(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode) {
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({
                        height: v()
                    },
                    o.settings.adaptiveHeightSpeed),
                    o.children.filter(":visible").fadeOut(o.settings.speed).css({
                        zIndex: 0
                    }),
                    o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, 
                    function() {
                        t(this).css("zIndex", o.settings.slideZIndex),
                        D()
                    })
                } else {
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({
                        height: v()
                    },
                    o.settings.adaptiveHeightSpeed);
                    var s = 0,
                    n = {
                        left: 0,
                        top: 0
                    };
                    if (!o.settings.infiniteLoop && o.carousel && o.active.last) {
                        if ("horizontal" == o.settings.mode) {
                            var a = o.children.eq(o.children.length - 1);
                            n = a.position(),
                            s = o.viewport.width() - a.outerWidth()
                        } else {
                            var l = o.children.length - o.settings.minSlides;
                            n = o.children.eq(l).position()
                        }
                    } else {
                        if (o.carousel && o.active.last && "prev" == i) {
                            var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides),
                            a = r.children(".bx-clone").eq(d);
                            n = a.position()
                        } else {
                            if ("next" == i && 0 == o.active.index) {
                                n = r.find("> .bx-clone").eq(o.settings.maxSlides).position(),
                                o.active.last = !1
                            } else {
                                if (e >= 0) {
                                    var c = e * m();
                                    n = o.children.eq(c).position()
                                }
                            }
                        }
                    }
                    if ("undefined" != typeof n) {
                        var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                        b(g, "slide", o.settings.speed)
                    }
                }
            }
        },
        r.goToNextSlide = function() {
            if (o.settings.infiniteLoop || !o.active.last) {
                var t = parseInt(o.active.index) + 1;
                r.goToSlide(t, "next")
            }
        },
        r.goToPrevSlide = function() {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
                var t = parseInt(o.active.index) - 1;
                r.goToSlide(t, "prev")
            }
        },
        r.startAuto = function(t) {
            o.interval || (o.interval = setInterval(function() {
                "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            },
            o.settings.pause), o.settings.autoControls && 1 != t && A("stop"))
        },
        r.stopAuto = function(t) {
            o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start"))
        },
        r.getCurrentSlide = function() {
            return o.active.index
        },
        r.getCurrentSlideElement = function() {
            return o.children.eq(o.active.index)
        },
        r.getSlideCount = function() {
            return o.children.length
        },
        r.redrawSlider = function() {
            o.children.add(r.find(".bx-clone")).outerWidth(u()),
            o.viewport.css("height", v()),
            o.settings.ticker || S(),
            o.active.last && (o.active.index = x() - 1),
            o.active.index >= x() && (o.active.last = !0),
            o.settings.pager && !o.settings.pagerCustom && (w(), q(o.active.index))
        },
        r.destroySlider = function() {
            o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function() {
                void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.settings.controls && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", Z))
        },
        r.reloadSlider = function(t) {
            void 0 != t && (n = t),
            r.destroySlider(),
            d()
        },
        d(),
        this
    }
} (jQuery);
$(function() {
    var focusLen = 1000;
    var flag;
    var st = 8000;
    var isFocus = false;
    var oHotFavour = $(".talk-body"),
    oHFUl = oHotFavour.find("ul.talk-list"),
    oHFheight = oHotFavour.height(),
    oHFloading = oHotFavour.find("#loading"),
    oHFLock = false;
    oHFtime = 1;
    $(".focus-date").mouseenter(function() {
        isFocus = true;
        clearTimeout(flag)
    }).mouseleave(function() {
        isFocus = false;
        flag = setTimeout(function() {
            $("#focus_top_next").click()
        },
        st)
    });
    $(".talk-body").scroll(function() {
        if (oHFLock || oHFtime > 2) {
            return false
        }
        var hght = oHFUl.height() - oHFheight,
        top = $(this).scrollTop();
        if (top >= hght) {
            oHFLock = true;
            oHFloading.show();
            $.get("/index.php?c=Ajax_Default&a=getHotFavourInfo", {
                "times": oHFtime
            },
            function(json) {
                if (json.info == "ok") {
                    oHFloading.hide();
                    oHFUl.append(json.html);
                    oHFtime <= 2 && oHFtime++;
                    oHFLock = false
                }
            },
            "json")
        }
    }); (function() {
        var target = $(".fix-layout"),
        wechat = target.find("a.fix-wx"),
        webox = target.find(".zst-wx-box"),
        w = document.body.clientWidth,
        h = $(window).scrollTop();
        $(window).on("scroll", 
        function() {
            var o = $(this);
            if (o.scrollTop() <= 500) {
                target.addClass("noBackTop")
            } else {
                target.removeClass("noBackTop")
            }
        });
        if (h <= 500) {
            target.addClass("noBackTop")
        }
        if (w < 1366) {
            target.addClass("small-fix-layout")
        }
        wechat.hover(function() {
            webox.show()
        },
        function() {
            webox.hide()
        })
    })();
    Z_Dom.processSidebar();
    $(".focus-date .focus-list").bxSlider({
        infiniteLoop: true,
        hideControlOnEnd: true,
        auto: true
    }); (function() {
        var target = $("#brandList"),
        li = target.find(".rank-tab").find("li"),
        tab = target.find(".brand-list");
        li.hover(function() {
            var self = $(this),
            index = self.attr("data-role"),
            tar = target.find(".brandTab_" + index);
            if (tar.css("display") != "none") {
                return false
            }
            li.removeClass("current");
            self.addClass("current");
            tab.hide();
            tar.show()
        });
        tab.find("li").hover(function() {
            $(this).siblings().removeClass("current");
            $(this).addClass("current")
        })
    })(); (function() {
        var target = $("#hotBookList"),
        li = target.find(".rank-tab").find("li"),
        tab = target.find(".rank-list");
        li.hover(function() {
            var self = $(this),
            index = self.attr("data-role"),
            tar = $(".hotBookDiv_" + index);
            if (tar.css("display") != "none") {
                return false
            }
            li.removeClass("current");
            self.addClass("current");
            tab.hide();
            tar.show()
        });
        tab.find("li").hover(function() {
            $(this).siblings().removeClass("current");
            $(this).addClass("current")
        })
    })();
    Z_Dom.insertBbsAd({
        "moduleId": "1797"
    })
});
var Z_PersonInfo = (function($, App) {
    var getActiveUserInfo = function() {
        $.get("/index.php?c=Ajax_Active&a=getUserInfo", {},
        function(json) {
            if (typeof json != "undefined") {
                if (json.info == "ok") {
                    var tar = $("#GuserInfoLayer");
                    tar.find("#signName").val(json.name);
                    tar.find("#signTele").val(json.phone);
                    tar.find("#signQQ").val(json.qq);
                    if (json.sex == 1) {
                        tar.find('input[name="sex"]').eq(1).attr("checked", "checked")
                    }
                    if (json.province) {
                        tar.find("#province input").val(json.province);
                        tar.find("#province span").html('<i class="trangle border-radius-s3"></i>' + json.pro_name)
                    }
                    if (json.town) {
                        tar.find("#town input").val(json.town);
                        tar.find("#town span").html('<i class="trangle border-radius-s3"></i>' + json.town_name)
                    }
                    if (json.city) {
                        tar.find("#city input").val(json.city);
                        tar.find("#city span").html('<i class="trangle border-radius-s3"></i>' + json.city_name)
                    }
                    tar.find('textarea[name="address"]').val(json.address);
                    tar.find("#signCode").val(json.code);
                    tar.find('input[name="weibo"]').val(json.weibo)
                }
            }
        },
        "json")
    },
    createSignLayer = function() {
        if ($("#GuserInfoLayer").length > 0) {
            App.toCenter("#GuserInfoLayer");
            $("#GuserInfoLayer").show();
            return
        }
        var html = ['<div class="popbox" id="GuserInfoLayer" style="width:554px; display:none;">', '<div class="popbox-inner">', '<div class="popbox-head">', '<span class="popbox-close border-radius-s3" onclick="javascript:$(\'#GuserInfoLayer\').hide();">\u5173\u95ed</span>', '<h3><i class="line"></i>\u6211\u8981\u62a5\u540d</h3>', "</div>", '<div class="popbox-main">', '<div class="personal-infor">', '<form id="signForm">', '<ul class="personal-infor-list">', "<li>", '<label class="title"><em>*</em>\u771f\u5b9e\u59d3\u540d\uff1a</label>', '<div class="personal-infor-cont">', '<input type="text" class="txt txt2" id="signName" name="signName" value="">', "</div>", "</li>", '<li style="z-index:3;">', '<label class="title"><em>*</em>\u624b\u673a\u53f7\u7801\uff1a</label>', '<div class="personal-infor-cont">', '<input type="text" class="txt txt2" id="signTele" name="signTele" value="">', "</div>", "</li>", "<li>", '<label class="title">\u6027\u522b\uff1a</label>', '<div class="personal-infor-cont">', '<label><input type="radio" tabindex="2" name="sex" value="0" checked="checked">\u7537</label>', '<label><input type="radio" tabindex="3" name="sex" value="1">\u5973</label>', "</div>", "</li>", '<li style="z-index:3;">', '<label class="title"><em>*</em>QQ\u53f7\u7801\uff1a</label>', '<div class="personal-infor-cont">', '<input type="text" class="txt txt2" id="signQQ"  name="signQQ" value="">', "</div>", "</li>", '<li style="z-index:2;">', '<label class="title">\u90ae\u5bc4\u5730\u5740\uff1a</label>', '<div class="personal-infor-cont">', '<div class="selectbox2 border-radius-s3" id="province">', '<span class="select-label border-radius-s3"><i class="trangle border-radius-s3"></i>\u8bf7\u9009\u62e9</span>', '<input type="hidden" value="" name="province" />', '<ul class="border-radius" style="display:none;"><li>--<li></ul>', "</div>", '<div class="selectbox2 border-radius-s3" id="town">', '<span class="select-label border-radius-s3"><i class="trangle border-radius-s3"></i>\u8bf7\u9009\u62e9</span>', '<input type="hidden" value="" name="town" />', '<ul class="border-radius" style="display:none;"><li>--</li></ul>', "</div>", '<div class="selectbox2 border-radius-s3" id="city">', '<span class="select-label border-radius-s3"><i class="trangle border-radius-s3"></i>\u8bf7\u9009\u62e9</span>', '<input type="hidden" value="" name="city" />', '<ul class="border-radius" style="display:none;"><li>--</li></ul>', "</div>", "<div>", '<textarea class="add-text-area border-radius-s3" name="address"></textarea>', "</div>", '<p style="color:#aaa;">\u8bf7\u586b\u5199\u6709\u6548\u63a5\u6536\u5730\u5740\uff0c\u4ee5\u4fbf\u63a5\u6536\u5956\u54c1</p>', "</div>", "</li>", "<li>", '<label class="title">\u90ae\u653f\u7f16\u7801\uff1a</label>', '<div class="personal-infor-cont">', '<input type="text" class="txt txt2" id="signCode" value="" name="zipCode">', '<span class="wrong-tip" style="display:none;">\u90ae\u7f16\u9519\u8bef\uff0c\u8bf7\u8f93\u5165\u6709\u6548\u90ae\u7f16</span>', "</div>", "</li>", "<li>", '<label class="title">\u5fae\u535a\u5730\u5740\uff1a</label>', '<div class="personal-infor-cont">', '<input type="text" class="txt txt2" name="weibo" value="">', "</div>", "</li>", "</ul>", "</form>", '<div class="popbox-btns"><a class="btn-blue border-radius-s3" href="javascript:;">\u786e\u5b9a</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn-gray border-radius-s3" href="javascript:;">\u91cd\u7f6e</a></div>', "</div>", "</div>", "</div>", "</div>"];
        $("body").append(html.join(""));
        App.toCenter("#GuserInfoLayer")
    },
    showSignLayer = function() {
        var Timer = {};
        createSignLayer();
        getActiveUserInfo();
        $("#province ul").empty().append('<li data-id="1">\u5317\u4eac</li><li data-id="2">\u4e0a\u6d77</li><li data-id="3">\u5929\u6d25</li><li data-id="4">\u91cd\u5e86</li><li data-id="33">\u798f\u5efa</li> <li data-id="6">\u8fbd\u5b81</li> <li data-id="7">\u5409\u6797</li> <li data-id="8">\u6cb3\u5317</li> <li data-id="34">\u6d77\u5357</li> <li data-id="10">\u9655\u897f</li> <li data-id="11">\u5c71\u897f</li> <li data-id="12">\u7518\u8083</li> <li data-id="13">\u5b81\u590f</li> <li data-id="14">\u65b0\u7586</li> <li data-id="15">\u897f\u85cf</li> <li data-id="16">\u9752\u6d77</li> <li data-id="17">\u56db\u5ddd</li> <li data-id="18">\u4e91\u5357</li> <li data-id="19">\u8d35\u5dde</li> <li data-id="20">\u6e56\u5357</li> <li data-id="21">\u6e56\u5317</li> <li data-id="22">\u6cb3\u5357</li> <li data-id="23">\u5c71\u4e1c</li> <li data-id="24">\u5b89\u5fbd</li> <li data-id="25">\u6c5f\u82cf</li> <li data-id="26">\u6d59\u6c5f</li> <li data-id="27">\u53f0\u6e7e</li> <li data-id="28">\u9999\u6e2f</li> <li data-id="29">\u6fb3\u95e8</li> <li data-id="30">\u5e7f\u4e1c</li> <li data-id="31">\u5e7f\u897f</li> <li data-id="32">\u6c5f\u897f</li> <li data-id="5">\u9ed1\u9f99\u6c5f</li> <li data-id="9">\u5185\u8499\u53e4</li> <li data-id="35">\u5176\u4ed6</li>');
        $("#province,#town,#city").hover(function() {
            $(this).addClass("selectbox-hover")
        },
        function() {
            $(this).removeClass("selectbox-hover")
        });
        $("#province li").click(function() {
            provincialEvent(this);
            var data = {
                "pid": $(this).attr("data-id")
            };
            $.post("/index.php?c=Ajax_Public&a=getTown", data, 
            function(json) {
                if (typeof json != "undefined") {
                    var li = [];
                    $.each(json, 
                    function(key, val) {
                        li.push('<li data-id="' + val.id + '">' + val.name + "</li>")
                    });
                    $("#town ul").empty().html(li.join(""));
                    $("#town li").bind("click", 
                    function() {
                        provincialEvent(this);
                        var data = {
                            "pid": $("#province input").val(),
                            "tid": $(this).attr("data-id")
                        };
                        $.post("/index.php?c=Ajax_Public&a=getCity", data, 
                        function(json) {
                            if (typeof json != "undefined") {
                                var li = [];
                                $.each(json, 
                                function(key, val) {
                                    li.push('<li data-id="' + val.id + '">' + val.name + "</li>")
                                });
                                $("#city ul").empty().html(li.join(""));
                                $("#city li").bind("click", 
                                function() {
                                    provincialEvent(this)
                                })
                            }
                        },
                        "json")
                    })
                }
            },
            "json")
        });
        $("#province span,#town span,#city span").bind({
            click: function() {
                $(this).siblings("ul").show()
            },
            mouseleave: function() {
                var obj = $(this);
                Timer.c = setTimeout(function() {
                    obj.siblings("ul").hide()
                },
                200)
            }
        });
        $("#province ul,#town ul,#city ul").hover(function() {
            clearTimeout(Timer.c)
        },
        function() {
            $(this).hide()
        });
        $("#GuserInfoLayer .popbox-btns .btn-blue").click(function() {
            var tar = $("#GuserInfoLayer"),
            name = tar.find("#signName").val(),
            phone = tar.find("#signTele").val(),
            qq = tar.find("#signQQ").val();
            if (!name || !phone || !qq) {
                Layer.showTips({
                    type: "warn",
                    content: "\u8bf7\u586b\u5199\u6b63\u786e\u7684\u62a5\u540d\u4fe1\u606f~"
                });
                return false
            }
            if (!phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
                Layer.showTips({
                    type: "warn",
                    content: "\u8bf7\u586b\u5199\u6b63\u786e\u7684\u624b\u673a\u53f7~"
                });
                return false
            }
            $.post("/index.php?c=Ajax_Public&a=recordPersonInfo", $("#signForm").serialize(), 
            function(json) {
                if (typeof json != "undefined") {
                    App.alert(json.msg);
                    $("#GuserInfoLayer").hide()
                }
            },
            "json")
        });
        $("#GuserInfoLayer .popbox-btns .btn-gray").click(function() {
            $("#signForm").get(0).reset()
        });
        $("#GuserInfoLayer").show()
    },
    provincialEvent = function(obj) {
        var self = $(obj),
        str = self.text(),
        id = self.attr("data-id");
        self.parent().siblings("input").val(id);
        self.parent().siblings("span").html('<i class="trangle border-radius"></i>' + str);
        self.parent().hide()
    };
    return {
        showSignLayer: showSignLayer
    }
} (jQuery, App)); (function($, Layer, Z_PersonInfo) {
    var oHead = document.getElementsByTagName("head")[0],
    iCount = 0,
    aLoadJs = ["js/jquery.easing.1.3.js", "js/jQueryRotate.2.2.js"],
    sLoadCss = "css/rotate-plate.css",
    h = {
        loadJs: function(url) {
            if (typeof url !== "string") {
                return false
            }
            var varScript = document.createElement("script");
            varScript.src = url;
            varScript.language = "javascript";
            varScript.type = "text/javascript";
            oHead.appendChild(varScript);
            varScript.onload = varScript.onreadystatechange = function() {
                if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                    if (++iCount == aLoadJs.length) {
                        _do()
                    }
                }
            }
        }
    };
    for (var i = 0, size = aLoadJs.length; i < size; i++) {
        h.loadJs(aLoadJs[i])
    }
    var oStyle = document.createElement("link");
    oStyle.type = "text/css";
    oStyle.rel = "stylesheet";
    oStyle.href = sLoadCss;
    oHead.appendChild(oStyle);
    var _do = function() {
        var iNowLeft = 0,
        iPreNum = 9,
        iPreWidth = 60,
        iSize = 0,
        iMaxLeft = 0;
        var init = function(options) {
            var defaults = $.extend({},
            options),
            rotate = {
                id: "GroteplateThumb",
                userScores: 0,
                createHtml: function() {
                    var self = this,
                    hideNext = "block",
                    aHtml,
                    oList = self.winList,
                    sWin = "";
                    if (typeof oList != "undefined" && oList.length > 0) {
                        for (var i = 0, size = oList.length; i < size; i++) {
                            sWin += '<a  title="' + oList[i].nickName + '" href="' + oList[i].url + '" title="" target="_blank">' + '<img width="50" height="50" src="' + oList[i].pic + '" >' + '<span class="avatar-mask">' + oList[i].desc + "</span></a>"
                        }
                        hideNext = size >= iPreNum ? hideNext: "none";
                        iSize = size
                    }
                    aHtml = ['<div class="bbs-turntable" id="' + self.id + '"  style="display: block;">', '<div class="bbs-turntable-header">', "<h4>\u6d3b\u52a8\u5927\u8f6c\u76d8</h4>", "<label>\u6211\u7684Z\u91d1\u8c46\uff1a</label>", '<var class="turnMyScore">' + self.userScores + '</var><span class="close" onclick="$(\'#' + self.id + "').hide()\">X</span></div>", '<div class="bbs-turntable-container">', '<div class="rotate-bg"></div>', '<div class="lottery-star"><img src="http://icon.zol-img.com.cn/community/rotateplate/rotate-arrow.png" id="lotteryBtn" style="-webkit-transform: rotate(0deg);"><i id="startLottery" class="rotate-btn"></i></div>', "</div>", '<div class="bbs-turntable-footer">', "<h5>TA\u4eec\u521a\u521a\u4e2d\u5956</h5>", '<div class="winners">', '<a href="###" data-role="1" id="Groteprevious" class="previous-winner" style="display: none;">&lt;</a>', '<div class="winner-balloon" id="GwinBalloon" style="left: 0; display: none; opacity: 1;">', '<div class="balloon-background">', '<div class="balloon-left"></div>', '<div class="balloon-repeat"></div>', '<div class="balloon-right"></div>', "</div>", "<span>\u83b7\u5f9720Z\u91d1\u8c46</span>", "</div>", '<div class="winner-scroller">', '<div style="left: 0px;" id="GroteplateScroll">', sWin, "</div>", "</div>", '<a href="###" id="Grotenext" data-role="-1" class="next-winner" style="display:' + hideNext + '">&gt;</a>', "</div>", "</div>", "</div>"];
                    $(aHtml.join("")).appendTo("body")
                }
            };
            $("body").on("click", '[data-role="rotate-plate"]', 
            function(event) {
                event.preventDefault();
                if ($("#" + rotate.id).length > 0) {
                    $("#" + rotate.id).show();
                    return false
                }
                $.get("/index.php?c=Ajax_User&a=getUserInfo&t=" + (new Date().getTime()), 
                function(json) {
                    if (json.info != "ok") {
                        return false
                    }
                    if (!window._bd_share_config) {
                        with(document) {
                            0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~ ( - new Date() / 3600000)]
                        }
                    }
                    rotate.userScores = json.scores;
                    rotate.winList = json.data;
                    rotate.createHtml();
                    var iLock = false,
                    oBalloon = $("#GwinBalloon"),
                    oScroll = $("#GroteplateScroll"),
                    oPrev = $("#Groteprevious"),
                    oNext = $("#Grotenext"),
                    oLotterBtn = $("#startLottery");
                    var rotateFunc = function(angle, callback) {
                        $("#lotteryBtn").stopRotate();
                        $("#lotteryBtn").rotate({
                            angle: angle,
                            duration: 3000,
                            animateTo: angle + 1440,
                            callback: function() {
                                callback && callback()
                            }
                        })
                    };
                    $("#startLottery").on("click", 
                    function() {
                        if (iLock === true) {
                            return false
                        }
                        iLock = true;
                        var url = "/index.php?c=Ajax_Prize&a=roll&r=" + (new Date()).getTime();
                        $.post(url, null, 
                        function(json) {
                            var oPath = {
                                0: 225,
                                1: 45,
                                2: 0,
                                3: 90,
                                4: 180,
                                5: 135,
                                6: 270,
                                7: 315
                            };
                            if (json.info == "ok") {
                                var iLv = json.lv,
                                iPath = 0;
                                iPath = typeof oPath[iLv] ? oPath[iLv] : 0;
                                rotateFunc(iPath, 
                                function() {
                                    if (iLv < 1) {
                                        Layer.rotateNot(json.msg, 1)
                                    } else {
                                        var oUser = json.user; ++iSize;
                                        Layer.rotateNot(json.msg, 0, 1);
                                        var sHtml = '<a title="" href="' + oUser.url + '" target="_blank"><img width="50" height="50" src="' + oUser.pic + '"><span class="avatar-mask">' + oUser.desc + "</span></a>";
                                        $("#GroteplateScroll").prepend(sHtml)
                                    }
                                    $("#" + rotate.id).find(".turnMyScore").html(json.scores);
                                    iLock = false
                                })
                            } else {
                                Layer.rotateNot(json.msg, 1);
                                iLock = false
                            }
                        },
                        "json")
                    });
                    oScroll.on("mouseenter", "a", 
                    function() {
                        var self = $(this),
                        i = self.index();
                        oBalloon.find("span").html(self.find(".avatar-mask").html());
                        oBalloon.css("left", iPreWidth * i + iNowLeft + "px").show()
                    }).on("mouseleave", 
                    function() {
                        oBalloon.hide()
                    });
                    $("#Groteprevious, #Grotenext").on("click", 
                    function() {
                        var that = this;
                        if (that.lock) {
                            return false
                        }
                        iMaxLeft = iSize <= iPreNum ? 0: iPreWidth * (iSize - iPreNum);
                        that.lock = 1;
                        if (iMaxLeft <= 0) {
                            return false
                        }
                        var self = $(this),
                        iLeft = 0,
                        iDirect = parseInt(self.attr("data-role"), 10);
                        iLeft = iNowLeft + iPreWidth * iDirect;
                        iLeft = iLeft > 0 ? 0: iLeft;
                        iLeft = iLeft >= iMaxLeft ? iMaxLeft: iLeft;
                        if (iLeft == 0) {
                            oPrev.hide()
                        } else {
                            oPrev.show()
                        }
                        if (Math.abs(iLeft) == iMaxLeft) {
                            oNext.hide()
                        } else {
                            oNext.show()
                        }
                        oScroll.animate({
                            "left": iLeft
                        },
                        "normal", null, 
                        function() {
                            that.lock = false
                        });
                        iNowLeft = iLeft
                    })
                },
                "json")
            })
        };
        init()
    }
} (jQuery, Layer, Z_PersonInfo));
