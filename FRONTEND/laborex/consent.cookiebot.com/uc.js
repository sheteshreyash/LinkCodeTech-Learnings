// 2.46.1 - 2023-03-06T10:23:59.502Z
! function() {
    function finallyConstructor(callback) {
        var constructor = this.constructor;
        return this.then((function(value) {
            return constructor.resolve(callback()).then((function() {
                return value
            }))
        }), (function(reason) {
            return constructor.resolve(callback()).then((function() {
                return constructor.reject(reason)
            }))
        }))
    }

    function allSettled(arr) {
        var P = this;
        return new P((function(resolve, reject) {
            if (!arr || void 0 === arr.length) return reject(new TypeError(typeof arr + " " + arr + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var args = Array.prototype.slice.call(arr);
            if (0 === args.length) return resolve([]);
            var remaining = args.length;

            function res(i, val) {
                if (val && ("object" == typeof val || "function" == typeof val)) {
                    var then = val.then;
                    if ("function" == typeof then) return void then.call(val, (function(val) {
                        res(i, val)
                    }), (function(e) {
                        args[i] = {
                            status: "rejected",
                            reason: e
                        }, 0 == --remaining && resolve(args)
                    }))
                }
                args[i] = {
                    status: "fulfilled",
                    value: val
                }, 0 == --remaining && resolve(args)
            }
            for (var i = 0; i < args.length; i++) res(i, args[i])
        }))
    }
    var setTimeoutFunc = setTimeout;

    function isArray(x) {
        return Boolean(x && void 0 !== x.length)
    }

    function noop() {}

    function bind(fn, thisArg) {
        return function() {
            fn.apply(thisArg, arguments)
        }
    }

    function Promise$2(fn) {
        if (!(this instanceof Promise$2)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof fn) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], doResolve(fn, this)
    }

    function handle(self, deferred) {
        for (; 3 === self._state;) self = self._value;
        0 !== self._state ? (self._handled = !0, Promise$2._immediateFn((function() {
            var cb = 1 === self._state ? deferred.onFulfilled : deferred.onRejected;
            if (null !== cb) {
                var ret;
                try {
                    ret = cb(self._value)
                } catch (e) {
                    return void reject(deferred.promise, e)
                }
                resolve(deferred.promise, ret)
            } else(1 === self._state ? resolve : reject)(deferred.promise, self._value)
        }))) : self._deferreds.push(deferred)
    }

    function resolve(self, newValue) {
        try {
            if (newValue === self) throw new TypeError("A promise cannot be resolved with itself.");
            if (newValue && ("object" == typeof newValue || "function" == typeof newValue)) {
                var then = newValue.then;
                if (newValue instanceof Promise$2) return self._state = 3, self._value = newValue, void finale(self);
                if ("function" == typeof then) return void doResolve(bind(then, newValue), self)
            }
            self._state = 1, self._value = newValue, finale(self)
        } catch (e) {
            reject(self, e)
        }
    }

    function reject(self, newValue) {
        self._state = 2, self._value = newValue, finale(self)
    }

    function finale(self) {
        2 === self._state && 0 === self._deferreds.length && Promise$2._immediateFn((function() {
            self._handled || Promise$2._unhandledRejectionFn(self._value)
        }));
        for (var i = 0, len = self._deferreds.length; i < len; i++) handle(self, self._deferreds[i]);
        self._deferreds = null
    }

    function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = "function" == typeof onFulfilled ? onFulfilled : null, this.onRejected = "function" == typeof onRejected ? onRejected : null, this.promise = promise
    }

    function doResolve(fn, self) {
        var done = !1;
        try {
            fn((function(value) {
                done || (done = !0, resolve(self, value))
            }), (function(reason) {
                done || (done = !0, reject(self, reason))
            }))
        } catch (ex) {
            if (done) return;
            done = !0, reject(self, ex)
        }
    }

    function initializeMutationHandlerFallback(window, cookieConsent, document) {
        var testdoc = document.implementation.createHTMLDocument("");
        testdoc.documentElement.innerHTML = "<html><head><script><\/script></head><body></body></html>", document.replaceChild(document.importNode(testdoc.documentElement, !0), document.documentElement), cookieConsent.mutationFallback = !0, "function" == typeof window.stop && window.stop(), mutationHandlerFallback(cookieConsent, document, null)
    }

    function mutationHandlerFallback(cookieConsent, document, charset) {
        var xhr = new XMLHttpRequest,
            content = "";
        xhr.onreadystatechange = function() {
            xhr.readyState === XMLHttpRequest.DONE && (content = xhr.responseText, mutationHandlerFallbackInit(window, cookieConsent, document, content))
        }, xhr.open("GET", document.URL, !0), charset && xhr.overrideMimeType("text/html; charset=" + charset), xhr.send(null)
    }

    function mutationHandlerFallbackInit(window, cookieConsent, document, content) {
        if (cookieConsent.configuration.loaded || cookieConsent.configuration.loadRetry > 30) {
            if (cookieConsent.configuration.loaded = !0, cookieConsent.configuration.loadRetry = 0, !cookieConsent.mutationHandlerFallbackCharsetLoaded) {
                cookieConsent.mutationHandlerFallbackCharsetLoaded = !0;
                var regexCharset = /<meta.*?charset=["'].*charset=([^"']+)["'][^>]*>/g,
                    matchCharset = regexCharset.exec(content);
                if (matchCharset || (regexCharset = /<meta charset=["']([^"']+)["'][^>]*>/g, matchCharset = regexCharset.exec(content)), matchCharset && matchCharset.length > 1) {
                    var currentCharset = matchCharset[1];
                    if ("utf-8" !== currentCharset.toLowerCase()) return void mutationHandlerFallback(cookieConsent, document, matchCharset[1])
                }
            }
            var doc = document.implementation.createHTMLDocument("" + (document.title || ""));
            document.replaceChild(document.importNode(doc.documentElement, !0), document.documentElement), document.documentElement.innerHTML = content;
            for (var i = 0; i < cookieConsent.mutationFallbackDocAttributes.length; i++) document.documentElement.setAttribute(cookieConsent.mutationFallbackDocAttributes[i].name, cookieConsent.mutationFallbackDocAttributes[i].value);
            var regex = /<\s*body[^>]*>/g,
                match = regex.exec(content);
            if (match && match.length > 0 && "<body>" !== match[0]) try {
                var testdoc = document.implementation.createHTMLDocument("");
                testdoc.documentElement.innerHTML = "<html><head><script><\/script></head>" + match[0] + "</body></html>";
                for (var j = 0; j < testdoc.body.attributes.length; j++) try {
                    document.body.setAttribute(testdoc.body.attributes[j].name, testdoc.body.attributes[j].value)
                } catch (e) {}
            } catch (e) {}
            var baseTags = document.getElementsByTagName("base");
            if (baseTags.length > 0 && navigator.userAgent.match(/IEMobile|Trident/i)) {
                var all = document.getElementsByTagName("*");
                [].forEach.call(all, (function(node) {
                    if ("LINK" === node.tagName && (node.cookiebotTagHash = window.CookieConsent.tagHash(node)), node.hasAttribute("src")) node.src = node.src ? cookieConsent.resolveURL(node.src) : "";
                    else if (node.hasAttribute("href") && (node.href = node.href ? cookieConsent.resolveURL(node.href) : "", "LINK" === node.tagName && node.hasAttribute("rel"))) {
                        var linkClone = node.cloneNode(!0);
                        linkClone.cookiebotTagHash = node.cookiebotTagHash;
                        var cloneParentNode = node.parentNode;
                        cloneParentNode && cloneParentNode.insertBefore(linkClone, node), cloneParentNode && cloneParentNode.removeChild(node)
                    }
                }))
            }
            var scripts = document.getElementsByTagName("script");
            [].forEach.call(scripts, (function(node) {
                if (cookieConsent.isCookiebotCoreNode(node) || node.hasAttribute("data-cookieconsent")) node.hasAttribute("data-cookieconsent") && "ignore" === node.getAttribute("data-cookieconsent") && (node.removeAttribute("data-cookieconsent"), cookieConsent.fallbackScriptNodes.push(node));
                else {
                    var tagCategories = "",
                        tagURL = "",
                        hasSrc = !1;
                    node.hasAttribute("src") && (tagURL = node.getAttribute("src") || "", hasSrc = !0), node.cookiebotTagHash = window.CookieConsent.tagHash(node), tagCategories = cookieConsent.getTagCookieCategories(node.outerHTML, tagURL, node, !0), hasSrc && "" !== tagCategories && tagURL.toLocaleLowerCase().indexOf("jquery") >= 0 && (tagCategories = ""), "" !== tagCategories && (null != node.type && void 0 !== node.type && "" !== node.type && "text/plain" !== node.type && (node.origScriptType = node.type), node.type = "text/plain", node.setAttribute("data-cookieconsent", tagCategories)), node.hasAttribute("defer") ? cookieConsent.fallbackDeferNodes.push(node) : cookieConsent.fallbackScriptNodes.push(node)
                }
            })), loadFallbackScriptNodes(window, cookieConsent, document, cookieConsent.fallbackScriptNodes), mutationHandlerFallbackMarkupTag(window, cookieConsent, document, "video"), mutationHandlerFallbackMarkupTag(window, cookieConsent, document, "audio"), mutationHandlerFallbackMarkupTag(window, cookieConsent, document, "picture"), mutationHandlerFallbackMarkupTag(window, cookieConsent, document, "source"), mutationHandlerFallbackMarkupTag(window, cookieConsent, document, "iframe"), mutationHandlerFallbackMarkupTag(window, cookieConsent, document, "img"), mutationHandlerFallbackMarkupTag(window, cookieConsent, document, "embed"), cookieConsent.mutationFallback = !1, cookieConsent.dialog && cookieConsent.dialog.visible && cookieConsent.show(!1), (cookieConsent.consented || cookieConsent.declined) && cookieConsent.triggerOnloadEvents()
        } else setTimeout((function() {
            mutationHandlerFallbackInit(window, cookieConsent, document, content)
        }), 100)
    }

    function mutationHandlerFallbackMarkupTag(window, cookieConsent, doc, nodeType) {
        var elements = doc.getElementsByTagName(nodeType);
        [].forEach.call(elements, (function(node) {
            if (node.hasAttribute("data-cookieconsent") || cookieConsent.isCookiebotNode(node)) node.hasAttribute("data-cookieconsent") && "ignore" === node.getAttribute("data-cookieconsent") && node.removeAttribute("data-cookieconsent");
            else if ("IMG" !== node.tagName || !node.hasAttribute("src") || cookieConsent.getHostnameFromURL(node.src || "") !== window.location.hostname) {
                var tagCategories = "",
                    tagURL = "";
                if (node.hasAttribute("src") && (tagURL = node.getAttribute("src") || ""), node.cookiebotTagHash = window.CookieConsent.tagHash(node), tagCategories = cookieConsent.getTagCookieCategories(node.outerHTML, tagURL, node, !0), "" !== tagCategories && (node.setAttribute("data-cookieconsent", tagCategories), node.hasAttribute("src"))) {
                    var src = node.getAttribute("src") || "";
                    node.origOuterHTML = node.outerHTML, node.setAttribute("data-cookieblock-src", src), node.removeAttribute("src")
                }
            }
        }))
    }

    function loadFallbackScriptNodes(window, cookieConsent, document, mutationNodes) {
        if (cookieConsent.startJQueryHold(), mutationNodes.length > 0) {
            var node = mutationNodes.shift();
            if (!node || null != node.type && void 0 !== node.type && "" !== node.type && "text/javascript" !== node.type && "application/javascript" !== node.type && "module" !== node.type && "text/plain" !== node.type) loadFallbackScriptNodes(window, cookieConsent, document, mutationNodes);
            else {
                var tagParent = node.parentNode,
                    tagClone_1 = cookieConsent.cloneScriptTag(node);
                cookieConsent.cloneEventListeners(node, tagClone_1), tagClone_1.consentProcessed = "1";
                var hasSrc = !1;
                node.hasAttribute("src") && (hasSrc = !0);
                var fireTagOnLoad = hasSrc && !tagClone_1.hasAttribute("data-cookieconsent") && !tagClone_1.hasAttribute("nomodule");
                fireTagOnLoad && (tagClone_1.onload = function() {
                    tagClone_1.isloaded = !0, loadFallbackScriptNodes(window, cookieConsent, document, mutationNodes), cookieConsent.startJQueryHold()
                }, tagClone_1.onerror = function() {
                    tagClone_1.isloaded = !0, loadFallbackScriptNodes(window, cookieConsent, document, mutationNodes), cookieConsent.startJQueryHold()
                }), tagClone_1.hasAttribute("data-cookieconsent") && "ignore" !== tagClone_1.getAttribute("data-cookieconsent") && (tagClone_1.type = "text/plain"), tagParent = node.parentNode, null != tagParent && (tagParent.insertBefore(tagClone_1, node), tagParent.removeChild(node)), fireTagOnLoad || loadFallbackScriptNodes(window, cookieConsent, document, mutationNodes)
            }
        } else cookieConsent.fallbackDeferNodes.length > 0 ? loadFallbackScriptNodes(window, cookieConsent, document, cookieConsent.fallbackDeferNodes) : (cookieConsent.runScripts(), setTimeout((function() {
            if (cookieConsent.stopOverrideEventListeners(), cookieConsent.endJQueryHold(), "undefined" != typeof EventTarget) {
                var evt = document.createEvent("Event");
                evt.initEvent("readystatechange", !0, !0), document.dispatchEvent(evt), evt = document.createEvent("Event"), evt.initEvent("DOMContentLoaded", !0, !0), document.dispatchEvent(evt), evt = document.createEvent("Event"), evt.initEvent("load", !0, !0), window.dispatchEvent(evt), evt = document.createEvent("Event"), evt.initEvent("onload", !0, !0), window.dispatchEvent(evt)
            }
        }), 500))
    }
    Promise$2.prototype.catch = function(onRejected) {
        return this.then(null, onRejected)
    }, Promise$2.prototype.then = function(onFulfilled, onRejected) {
        var prom = new this.constructor(noop);
        return handle(this, new Handler(onFulfilled, onRejected, prom)), prom
    }, Promise$2.prototype.finally = finallyConstructor, Promise$2.all = function(arr) {
        return new Promise$2((function(resolve, reject) {
            if (!isArray(arr)) return reject(new TypeError("Promise.all accepts an array"));
            var args = Array.prototype.slice.call(arr);
            if (0 === args.length) return resolve([]);
            var remaining = args.length;

            function res(i, val) {
                try {
                    if (val && ("object" == typeof val || "function" == typeof val)) {
                        var then = val.then;
                        if ("function" == typeof then) return void then.call(val, (function(val) {
                            res(i, val)
                        }), reject)
                    }
                    args[i] = val, 0 == --remaining && resolve(args)
                } catch (ex) {
                    reject(ex)
                }
            }
            for (var i = 0; i < args.length; i++) res(i, args[i])
        }))
    }, Promise$2.allSettled = allSettled, Promise$2.resolve = function(value) {
        return value && "object" == typeof value && value.constructor === Promise$2 ? value : new Promise$2((function(resolve) {
            resolve(value)
        }))
    }, Promise$2.reject = function(value) {
        return new Promise$2((function(resolve, reject) {
            reject(value)
        }))
    }, Promise$2.race = function(arr) {
        return new Promise$2((function(resolve, reject) {
            if (!isArray(arr)) return reject(new TypeError("Promise.race accepts an array"));
            for (var i = 0, len = arr.length; i < len; i++) Promise$2.resolve(arr[i]).then(resolve, reject)
        }))
    }, Promise$2._immediateFn = "function" == typeof setImmediate && function(fn) {
        setImmediate(fn)
    } || function(fn) {
        setTimeoutFunc(fn, 0)
    }, Promise$2._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", err)
    };
    var CATEGORY_PREFERENCES = "preferences",
        CATEGORY_STATISTICS = "statistics",
        CATEGORY_MARKETING = "marketing";

    function cookieCategoriesFromNumberArray(catNumberArray) {
        for (var categoryString = "", i = 0; i < catNumberArray.length; i++) switch ("" !== categoryString && (categoryString += ","), Number(catNumberArray[i])) {
            case 2:
                categoryString += "preferences";
                break;
            case 3:
                categoryString += "statistics";
                break;
            case 4:
                "" !== categoryString && -1 !== categoryString.indexOf("marketing") || (categoryString += "marketing")
        }
        return "" !== categoryString && "," === categoryString.slice(-1) && (categoryString = categoryString.substring(0, categoryString.length - 1)), categoryString
    }

    function isCookiebotNode(cookieConsent, node) {
        var hasMatch = !1;
        if (node.hasAttribute("src")) {
            var url = node.getAttribute("src").toLowerCase();
            0 !== url.indexOf(cookieConsent.host) && 0 !== url.indexOf(cookieConsent.CDN) || (hasMatch = !0)
        }
        return hasMatch
    }
    var resolveURL = function(url) {
            if ("" !== url) {
                var a = document.createElementOrig("a");
                return a.href = url, a.cloneNode(!1).href
            }
            return url
        },
        hashCode = function(s) {
            if (void 0 === s) return "";
            var ss = s.replace(/\r\n|\n|\r|\t|\s/g, ""),
                h = 0,
                l = ss.length,
                i = 0;
            if (l > 0)
                for (; i < l;) h = (h << 5) - h + ss.charCodeAt(i++) | 0;
            return h
        },
        getHostnameFromURL = function(url) {
            try {
                var a = document.createElementOrig("a");
                return a.href = url, a.cloneNode(!1).hostname
            } catch (e) {
                return ""
            }
        },
        resolvedPromise = function(PromiseConstructor) {
            return new PromiseConstructor((function(resolve, _) {
                resolve()
            }))
        },
        createTimeoutPromise = function(PromiseConstructor, timeoutMs) {
            return new PromiseConstructor((function(resolve) {
                setTimeout(resolve, timeoutMs)
            }))
        },
        getTruncatedString = function(value, length) {
            return value.length > length ? value.substring(0, length - 3) + "..." : value
        },
        CATEGORY_ID_PREFERENCES = 2,
        CATEGORY_ID_STATISTICS = 3,
        CATEGORY_ID_MARKETING = 4;

    function cookiesNumberCategoriesFromStringArray(categoryStrings) {
        for (var categoryNumberArray = [], i = 0; i < categoryStrings.length; i++) {
            var categoryString = categoryStrings[i];
            switch (categoryString) {
                case "preferences":
                    categoryNumberArray.push(2);
                    break;
                case "statistics":
                    categoryNumberArray.push(3);
                    break;
                case "marketing":
                    categoryNumberArray.push(4)
            }
        }
        return categoryNumberArray
    }
    var createBannerQueryParameters = function(cookieConsent, ucScriptElement) {
            return {
                serial: cookieConsent.getURLParam("cbid") || ucScriptElement.getAttribute("data-cbid") || void 0,
                mode: cookieConsent.getURLParam("mode") || ucScriptElement.getAttribute("data-mode") || void 0,
                culture: cookieConsent.getURLParam("culture") || ucScriptElement.getAttribute("data-culture") || void 0,
                type: cookieConsent.getURLParam("type") || ucScriptElement.getAttribute("data-type") || void 0,
                level: cookieConsent.getURLParam("level") || ucScriptElement.getAttribute("data-level") || void 0,
                domainPath: cookieConsent.getURLParam("path") || ucScriptElement.getAttribute("data-path") || void 0,
                userCountry: cookieConsent.getURLParam("userCountry") || ucScriptElement.getAttribute("data-user-country") || void 0
            }
        },
        createBanner = function(cookieConsent, isRenewal) {
            var ucScriptElement = document.getElementById(cookieConsent.scriptId) || cookieConsent.scriptElement;
            if (!ucScriptElement) return console.warn("Error: Can't read data values from the cookie script tag - make sure to set script attribute ID."), resolvedPromise(cookieConsent.Promise);
            var parameters = createBannerQueryParameters(cookieConsent, ucScriptElement);
            if (!parameters.serial) return console.warn("Error: Cookie script tag attribute 'data-cbid' is missing."), resolvedPromise(cookieConsent.Promise);
            if (!cookieConsent.isGUID(parameters.serial)) return console.warn("Error: Cookie script tag ID %s is not a valid key.", parameters.serial), resolvedPromise(cookieConsent.Promise);
            var serial = parameters.serial,
                mode = parameters.mode,
                culture = parameters.culture,
                type = parameters.type,
                level = parameters.level,
                domainPath = parameters.domainPath,
                userCountry = parameters.userCountry;
            if (cookieConsent.serial = serial, !cookieConsent.cookieEnabled) return cookieConsent.consented = !1, cookieConsent.declined = !0, cookieConsent.hasResponse = !0, cookieConsent.consent.preferences = !1, cookieConsent.consent.statistics = !1, cookieConsent.consent.marketing = !1, cookieConsent.consentID = "-3", cookieConsent.consent.stamp = "-3", resolvedPromise(cookieConsent.Promise);
            var querystrings = ["renew=" + (isRenewal ? "true" : "false"), "referer=" + encodeURIComponent(window.location.hostname), "dnt=" + (cookieConsent.doNotTrack ? "true" : "false"), "init=false"];
            return isRenewal && querystrings.push("nocache=" + (new Date).getTime()), mode && querystrings.push("mode=" + mode), culture && querystrings.push("culture=" + culture), type && querystrings.push("type=" + type), level && querystrings.push("level=" + level), domainPath && querystrings.push("path=" + encodeURIComponent(domainPath)), userCountry && querystrings.push("usercountry=" + userCountry), cookieConsent.framework && querystrings.push("framework=" + cookieConsent.framework), cookieConsent.geoRegions.length > 0 && querystrings.push("georegions=" + encodeURIComponent(JSON.stringify(cookieConsent.geoRegions))), cookieConsent.isbulkrenewal && querystrings.push("bulkrenew=1"), cookieConsent.isbulkrenewal = !1, new cookieConsent.Promise((function(resolve) {
                cookieConsent.getScript(cookieConsent.host + serial + "/cc.js?" + querystrings.join("&"), !0, resolve)
            }))
        },
        fetchJsonData = function(url, onSuccess, onError) {
            var xmlhttp = new XMLHttpRequest;
            xmlhttp.onreadystatechange = function() {
                if (4 === this.readyState && this.status >= 200 && this.status <= 299) {
                    if (204 === this.status) return void onSuccess({});
                    try {
                        var json = JSON.parse(this.responseText);
                        onSuccess(json)
                    } catch (e) {
                        onError && onError({
                            status: this.status,
                            message: "JSON.parse error: " + e.message
                        })
                    }
                } else 4 === this.readyState && onError && onError({
                    status: this.status,
                    message: this.responseText
                })
            }, xmlhttp.onerror = function() {
                onError && onError({
                    status: -1,
                    message: "onerror"
                })
            }, xmlhttp.open("GET", url, !0), xmlhttp.send()
        },
        fetchCmpSettings = function(Promise, serial) {
            return new Promise((function(resolve, reject) {
                var url = "https://dev-consent-cookiebot-com.cookiebot.dev/" + serial.toLowerCase() + "/settings.json";
                fetchJsonData(url, (function(data) {
                    resolve(data)
                }), (function(data) {
                    reject(data)
                }))
            }))
        },
        createWidgetIconUrl = function(cdnHost) {
            return cdnHost + "Scripts/widgetIcon.min.js"
        };

    function tagString(node) {
        if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) return node.nodeValue && node.nodeValue.trim() || "";
        if (node.nodeType === Node.ELEMENT_NODE) {
            for (var attrs = [], i = node.attributes.length; i--;) {
                var attr = node.attributes[i];
                "style" !== attr.name && attrs.push(attr.name + "=" + attr.value)
            }
            attrs.sort();
            for (var children = [], j = 0, len = node.childNodes.length; j < len; j++) {
                var childNode = node.childNodes[j],
                    string = tagString(childNode);
                "" !== string && children.push(string)
            }
            return node.tagName + ";" + attrs.join(";") + (children.length ? "[" + children.join("|") + "]" : "")
        }
        return ""
    }

    function tagHash(el) {
        for (var str = tagString(el), hash1 = 5381, hash2 = 52711, k = str.length; k--;) {
            var char = str.charCodeAt(k);
            hash1 = 33 * hash1 ^ char, hash2 = 33 * hash2 ^ char
        }
        var hash = 4096 * (hash1 >>> 0) + (hash2 >>> 0);
        return hash.toString()
    }

    function isNodeIgnoredFromInlineConfig(cookieConsent, node) {
        var tagConfiguration = cookieConsent.inlineConfiguration && cookieConsent.inlineConfiguration.TagConfiguration,
            isIgnored = !1;
        if (node.id && tagConfiguration && tagConfiguration.length > 0)
            for (var i = 0; i < tagConfiguration.length; i++) {
                var tag = tagConfiguration[i];
                if (tag.id === node.id && tag.ignore) {
                    isIgnored = !0;
                    break
                }
            }
        return isIgnored
    }

    function initMutationObserver(window, document, cookieConsent) {
        var writeOverride = function(node) {
            var lastChild;
            document.body ? (document.body.insertAdjacentHTML("beforeend", node), lastChild = document.body.lastChild) : (document.head.insertAdjacentHTML("beforeend", node), lastChild = document.head.lastChild), lastChild && lastChild.tagName && "SCRIPT" === lastChild.tagName && void 0 === lastChild.cookieScriptProcessed && void 0 === lastChild.CB_isClone && void 0 === lastChild.consentProcessed && void 0 === lastChild.cookiesProcessed && (lastChild.consentProcessed = "1", cookieConsent.RunScriptTags([lastChild]))
        };
        document.write = writeOverride, cookieConsent.overrideEventListeners();
        var isMutationBrowser = !0;
        if ("function" != typeof MutationObserver && "object" != typeof MutationObserver && (isMutationBrowser = !1), isMutationBrowser && navigator.userAgent.match(/IEMobile|Trident|Edge/i) && (isMutationBrowser = !1), document && document.documentElement && (document.documentElement.hasAttribute("ng-app") && (cookieConsent.mutationAppName = document.documentElement.getAttribute("ng-app"), document.documentElement.removeAttribute("ng-app")), document.documentElement.attributes))
            for (var j = 0; j < document.documentElement.attributes.length; j++) {
                var attrName = document.documentElement.attributes[j].name,
                    attrValue = "";
                document.documentElement.attributes[j].value && (attrValue = document.documentElement.attributes[j].value), cookieConsent.mutationFallbackDocAttributes.push({
                    name: attrName,
                    value: attrValue
                })
            }
        isMutationBrowser ? (cookieConsent.mutationObserver = new MutationObserver(cookieConsent.mutationHandler), cookieConsent.mutationObserver.observe(document.documentElement, {
            childList: !0,
            subtree: !0
        }), cookieConsent.downloadConfiguration()) : window.cookieconsentscriptfallbackpreloaded || (window.cookieconsentscriptfallbackpreloaded = !0, initializeMutationHandlerFallback(window, cookieConsent, document), cookieConsent.downloadConfiguration())
    }

    function stopMutationObserver(window, cookieConsent) {
        null != cookieConsent.mutationObserver && (window.CookieConsent.processPostPonedMutations(), window.CookieConsent.dequeueNonAsyncScripts(cookieConsent.nonAsyncMutations), cookieConsent.mutationObserver.disconnect(), cookieConsent.mutationObserver = null)
    }

    function mutationHandler(window, document, mutationsList) {
        if (window.CookieConsent) {
            var doPostPoneMutation = !0;
            window.CookieConsent.configuration.loaded && (doPostPoneMutation = !1, window.CookieConsent.processPostPonedMutations());
            for (var j = 0; j < mutationsList.length; j++) {
                var mutationRecord = mutationsList[j];
                if ("childList" === mutationRecord.type)
                    for (var i = 0; i < mutationRecord.addedNodes.length; i++) {
                        var node = mutationRecord.addedNodes[i],
                            isNodeIgnored = isNodeIgnoredFromInlineConfig(window.CookieConsent, node);
                        if (1 === node.nodeType && !node.hasAttribute("data-cookieconsent") && void 0 === node.CB_isClone && void 0 === node.isCookiebotDynamicTag && !isNodeIgnored) {
                            if (null == window.CookieConsent.mutationHandlerFirstScript && "SCRIPT" === node.tagName) {
                                window.CookieConsent.mutationHandlerFirstScript = node;
                                for (var scripts = document.getElementsByTagName("script"), k = 0; k < scripts.length; k++) {
                                    var currentScript = scripts[k];
                                    if (!currentScript.hasAttribute("data-cookieconsent")) {
                                        window.CookieConsent.isCookiebotNode(currentScript) || console.warn("WARNING: The Cookiebot script tag must be the first to load for auto-blocking to work.", currentScript);
                                        break
                                    }
                                }
                            }
                            node.cookiebotTagHash = window.CookieConsent.tagHash(node), doPostPoneMutation || "SCRIPT" === node.tagName ? window.CookieConsent.postponeMutation(node) : window.CookieConsent.processMutation(node, !1)
                        }
                    }
            }
        }
    }

    function runScriptTags(window, cookieConsent, tagContainer) {
        if (tagContainer.length > 0) {
            var currentTag = tagContainer.shift();
            currentTag.cookiesProcessed = void 0;
            var tagConsentLevels = [];
            currentTag.hasAttribute("data-cookieconsent") && (tagConsentLevels = currentTag.getAttribute("data-cookieconsent").toLowerCase().split(","));
            for (var canExecute = !0, j = 0; j < tagConsentLevels.length; j++) {
                var consentReq = tagConsentLevels[j].replace(/^\s*/, "").replace(/\s*$/, "");
                "preferences" !== consentReq || window.CookieConsent.consent.preferences || (canExecute = !1), "statistics" !== consentReq || window.CookieConsent.consent.statistics || (canExecute = !1), "marketing" !== consentReq || window.CookieConsent.consent.marketing || (canExecute = !1)
            }
            if (canExecute) {
                var tagParent = currentTag.parentNode,
                    nextElement = currentTag.nextElementSibling,
                    tagClone = cookieConsent.cloneScriptTag(currentTag),
                    hasSrc = !1;
                tagClone.hasAttribute("src") && (hasSrc = !0);
                var fireTagOnLoad = hasSrc && !tagClone.hasAttribute("nomodule");
                tagClone.hasAttribute("async") && tagClone.removeAttribute("async"), void 0 !== currentTag.origScriptType && (tagClone.type = currentTag.origScriptType), fireTagOnLoad && (tagClone.onload = function() {
                    window.CookieConsent.RunScriptTags(tagContainer)
                }, tagClone.onerror = function() {
                    window.CookieConsent.RunScriptTags(tagContainer)
                }), cookieConsent.cloneEventListeners(currentTag, tagClone), null != tagParent && (tagParent.removeChild(currentTag), tagParent.insertBefore(tagClone, nextElement || null)), fireTagOnLoad || cookieConsent.RunScriptTags(tagContainer)
            } else cookieConsent.RunScriptTags(tagContainer)
        }
    }

    function cloneScriptTag(document, currentTag) {
        for (var tagClone = document.createElementOrig("script"), k = 0; k < currentTag.attributes.length; k++) tagClone.setAttribute(currentTag.attributes[k].name, currentTag.attributes[k].value);
        return currentTag.hasAttribute("nomodule") && tagClone.setAttribute("nomodule", ""), void 0 !== currentTag.text && (tagClone.text = currentTag.text), tagClone.setAttribute("type", "text/javascript"), tagClone
    }

    function overrideEventListeners(cookieConsent) {
        cookieConsent.mutateEventListeners = !0, "undefined" != typeof EventTarget && void 0 === EventTarget.prototype.addEventListenerBase && (EventTarget.prototype.addEventListenerBase = EventTarget.prototype.addEventListener, EventTarget.prototype.addEventListener = function(type, callback, options) {
            cookieConsent.mutateEventListeners && !cookieConsent.isInternalEventListener(type, this, callback) ? "DOMContentLoaded" === type || "load" === type || "onload" === type || "readystatechange" === type ? cookieConsent.mutationOnloadEventListeners.push({
                target: this,
                type: type,
                listener: callback,
                options: options
            }) : (cookieConsent.mutationEventListeners.push({
                target: this,
                type: type,
                listener: callback,
                options: options
            }), this.addEventListenerBase(type, callback, options)) : this.addEventListenerBase(type, callback, options)
        })
    }

    function stopOverrideEventListeners(window, cookieConsent) {
        cookieConsent.mutateEventListeners && setTimeout((function() {
            cookieConsent.mutateEventListeners = !1, cookieConsent.applyOverrideEventListeners(), "" !== cookieConsent.mutationAppName && window.angular && window.angular.bootstrap && window.angular.bootstrap(document.documentElement, [cookieConsent.mutationAppName])
        }), 1)
    }

    function processPostPonedMutations(cookieConsent) {
        if (cookieConsent.postPonedMutations.length > 0) {
            for (var j = 0; j < cookieConsent.postPonedMutations.length; j++) {
                var postPonedNode = cookieConsent.postPonedMutations[j];
                cookieConsent.processMutation(postPonedNode, !0)
            }
            cookieConsent.postPonedMutations = []
        }
    }

    function dequeueNonAsyncScripts(cookieConsent, mutationNodes) {
        if (mutationNodes.length > 0) {
            var node = mutationNodes.shift();
            if ("SCRIPT" === (null == node ? void 0 : node.tagName) && void 0 === node.cookieScriptProcessed) {
                node.cookieScriptProcessed = 1, cookieConsent.startJQueryHold();
                var tagURL = "",
                    tagCategories = "",
                    hasSrc = !1;
                if (node.hasAttribute("src") && (tagURL = node.getAttribute("src") || "", hasSrc = !0), void 0 !== node.origOuterHTML && (tagCategories = cookieConsent.getTagCookieCategories(node.origOuterHTML, tagURL, node, !0)), hasSrc && "" !== tagCategories && tagURL.toLocaleLowerCase().indexOf("jquery") >= 0 && (tagCategories = ""), "" !== tagCategories) node.type = "text/plain", node.setAttribute("data-cookieconsent", tagCategories), cookieConsent.dequeueNonAsyncScripts(mutationNodes);
                else if ("text/plain" === node.type) {
                    var tagParent = node.parentNode,
                        tagClone = cookieConsent.cloneScriptTag(node);
                    cookieConsent.cloneEventListeners(node, tagClone), tagClone.consentProcessed = "1", tagClone.CB_isClone = 1;
                    var fireTagOnLoad = hasSrc && !tagClone.hasAttribute("data-cookieconsent") && !tagClone.hasAttribute("nomodule");
                    fireTagOnLoad && (tagClone.onload = function() {
                        cookieConsent.dequeueNonAsyncScripts(mutationNodes)
                    }, tagClone.onerror = function() {
                        cookieConsent.dequeueNonAsyncScripts(mutationNodes)
                    }), tagClone.origOuterHTML = node.origOuterHTML, void 0 !== node.origScriptType && (tagClone.type = node.origScriptType);
                    try {
                        null != tagParent && (tagParent.insertBefore(tagClone, node), tagParent.removeChild(node))
                    } catch (e) {}
                    fireTagOnLoad || cookieConsent.dequeueNonAsyncScripts(mutationNodes)
                } else cookieConsent.dequeueNonAsyncScripts(mutationNodes)
            } else cookieConsent.dequeueNonAsyncScripts(mutationNodes)
        } else cookieConsent.deferMutations.length > 0 ? cookieConsent.dequeueNonAsyncScripts(cookieConsent.deferMutations) : (cookieConsent.runScripts(), setTimeout((function() {
            cookieConsent.stopOverrideEventListeners(), cookieConsent.endJQueryHold()
        }), 1e3))
    }

    function processMutation(cookieConsent, node, isPostPoned) {
        var canProcess = !0;
        if (!isPostPoned && cookieConsent.isCookiebotNode(node) && (canProcess = !1), node.consentProcessed && "1" === node.consentProcessed ? canProcess = !1 : node.consentProcessed = "1", canProcess) {
            var tagCategories = "",
                tagURL = "",
                hasSrc = !1;
            if ("SCRIPT" === node.tagName) {
                var scriptNode = node;
                if (scriptNode.hasAttribute("src") && (tagURL = scriptNode.getAttribute("src"), hasSrc = !0), isPostPoned ? void 0 !== scriptNode.origOuterHTML && (tagCategories = cookieConsent.getTagCookieCategories(scriptNode.origOuterHTML, tagURL, node, !0)) : (tagCategories = cookieConsent.getTagCookieCategories(scriptNode.outerHTML, tagURL, node, !0), null != scriptNode.type && void 0 !== scriptNode.type && "" !== scriptNode.type && "text/plain" !== scriptNode.type && (scriptNode.origScriptType = scriptNode.type)), hasSrc && "" !== tagCategories && tagURL.toLocaleLowerCase().indexOf("jquery") >= 0 && (tagCategories = ""), "" !== tagCategories) scriptNode.type = "text/plain", scriptNode.setAttribute("data-cookieconsent", tagCategories);
                else if (isPostPoned && "text/plain" === scriptNode.type) {
                    var tagParent = scriptNode.parentNode,
                        tagClone = cookieConsent.cloneScriptTag(node);
                    cookieConsent.cloneEventListeners(node, tagClone), tagClone.consentProcessed = "1", tagClone.CB_isClone = 1, isPostPoned && (tagClone.origOuterHTML = scriptNode.origOuterHTML, void 0 !== scriptNode.origScriptType && (tagClone.type = scriptNode.origScriptType)), null != tagParent && (tagParent.insertBefore(tagClone, node), tagParent.removeChild(node))
                }
            } else if ("IFRAME" === node.tagName || "IMG" === node.tagName || "EMBED" === node.tagName || "VIDEO" === node.tagName || "AUDIO" === node.tagName || "PICTURE" === node.tagName || "SOURCE" === node.tagName) {
                if (!isPostPoned && node.hasAttribute("src") && !cookieConsent.isCookiebotNode(node) && !node.hasAttribute("data-lazy-type")) {
                    node.origOuterHTML = node.outerHTML;
                    var nodeSrc = node.getAttribute("src");
                    "IFRAME" === node.tagName && "about:blank" !== nodeSrc && "" !== nodeSrc && (node.setAttribute("data-cookieblock-src", nodeSrc), node.removeAttribute("src"))
                }
                if ("IMG" === node.tagName && node.hasAttribute("data-image_src") && node.setAttribute("src", node.getAttribute("data-image_src")), node.hasAttribute("data-cookieblock-src") && !node.hasAttribute("src") && !node.hasAttribute("data-lazy-type") && !node.hasAttribute("data-image_src"))
                    if (tagURL = node.getAttribute("data-cookieblock-src"), tagCategories = cookieConsent.getTagCookieCategories(node.origOuterHTML, tagURL, node, !0), "" !== tagCategories) {
                        node.setAttribute("data-cookieconsent", tagCategories);
                        var clone = node.cloneNode(!0);
                        cookieConsent.cloneEventListeners(node, clone), clone.cookiebotTagHash = node.cookiebotTagHash, clone.CB_isClone = 1, clone.consentProcessed = "1";
                        var cloneParentNode = node.parentNode;
                        cloneParentNode.insertBefore(clone, node), cloneParentNode.removeChild(node), node = null
                    } else if (node.hasAttribute("data-cookieblock-src") && (node.setAttribute("src", node.getAttribute("data-cookieblock-src")), node.removeAttribute("data-cookieblock-src")), node.consentProcessed = "1", "SOURCE" === node.tagName) {
                    var cloneToActive = node.cloneNode(!0);
                    cookieConsent.cloneEventListeners(node, cloneToActive), cloneToActive.cookiebotTagHash = node.cookiebotTagHash, cloneToActive.CB_isClone = 1, cloneToActive.consentProcessed = "1";
                    var cloneParentNodeToActivate = node.parentNode;
                    cloneParentNodeToActivate.removeChild(node), cloneParentNodeToActivate.appendChild(cloneToActive), node = null
                }
            }
        }
    }

    function postponeMutation(window, cookieConsent, nodeElement) {
        if (nodeElement && !cookieConsent.isCookiebotNode(nodeElement)) {
            var scriptNode_1 = nodeElement;
            if ("SCRIPT" === nodeElement.tagName && void 0 !== scriptNode_1.type && "text/javascript" !== scriptNode_1.type && scriptNode_1.type.indexOf("-text/javascript") > -1 && (scriptNode_1.type = "text/javascript"), "SCRIPT" !== scriptNode_1.tagName || null != scriptNode_1.type && void 0 !== scriptNode_1.type && "" !== scriptNode_1.type && "text/javascript" !== scriptNode_1.type && "application/javascript" !== scriptNode_1.type && "module" !== scriptNode_1.type && "text/plain" !== scriptNode_1.type) {
                if ("IFRAME" === nodeElement.tagName || "IMG" === nodeElement.tagName || "EMBED" === nodeElement.tagName || "VIDEO" === nodeElement.tagName || "AUDIO" === nodeElement.tagName || "PICTURE" === nodeElement.tagName || "SOURCE" === nodeElement.tagName) {
                    var node = nodeElement;
                    if ("IMG" !== node.tagName || !node.hasAttribute("src") || cookieConsent.getHostnameFromURL(node.src) !== window.location.hostname) {
                        if (node.hasAttribute("src") && !node.hasAttribute("data-lazy-type") && !node.hasAttribute("data-image_src") && !cookieConsent.isCookiebotNode(node)) {
                            node.origOuterHTML = node.outerHTML, node.setAttribute("data-cookieblock-src", node.getAttribute("src")), node.removeAttribute("src");
                            var clone = node.cloneNode(!0);
                            cookieConsent.cloneEventListeners(node, clone), clone.cookiebotTagHash = node.cookiebotTagHash, clone.CB_isClone = 1;
                            var cloneParentNode = node.parentNode;
                            cloneParentNode.insertBefore(clone, node), cloneParentNode.removeChild(node), node = null, cookieConsent.postPonedMutations.push(clone)
                        }
                        null != node && "IMG" === node.tagName && node.hasAttribute("data-image_src") && node.setAttribute("src", node.getAttribute("data-image_src"))
                    }
                }
            } else {
                cookieConsent.startJQueryHold(), scriptNode_1.origOuterHTML = scriptNode_1.outerHTML, null != scriptNode_1.type && void 0 !== scriptNode_1.type && "" !== scriptNode_1.type && "text/plain" !== scriptNode_1.type && (scriptNode_1.origScriptType = scriptNode_1.type), scriptNode_1.type = "text/plain";
                var beforeScriptExecuteListener_1 = function(event) {
                    "text/plain" === scriptNode_1.getAttribute("type") && event.preventDefault(), scriptNode_1.removeEventListener("beforescriptexecute", beforeScriptExecuteListener_1)
                };
                scriptNode_1.addEventListener("beforescriptexecute", beforeScriptExecuteListener_1), cookieConsent.hasResponse && scriptNode_1.hasAttribute("src") && !scriptNode_1.hasAttribute("nomodule") && cookieConsent.preloadMutationScript(scriptNode_1.src), scriptNode_1.hasAttribute("defer") ? (scriptNode_1.hasAttribute("async") && scriptNode_1.removeAttribute("async"), cookieConsent.deferMutations.push(scriptNode_1)) : cookieConsent.nonAsyncMutations.push(scriptNode_1)
            }
        }
    }

    function getTagCookieCategories(window, cookieConsent, outerhtml, tagURL, node, matchCommon) {
        for (var categories = "", j = 0; j < cookieConsent.configuration.tags.length; j++) {
            var currentTag = cookieConsent.configuration.tags[j];
            if ("" !== tagURL && currentTag.url && "" !== currentTag.url && currentTag.url.toLowerCase() === tagURL.toLowerCase()) {
                categories = cookieConsent.cookieCategoriesFromNumberArray(currentTag.cat);
                break
            }
            if ("" !== tagURL && currentTag.resolvedUrl && "" !== currentTag.resolvedUrl && currentTag.resolvedUrl.toLowerCase() === cookieConsent.resolveURL(tagURL).toLowerCase()) {
                categories = cookieConsent.cookieCategoriesFromNumberArray(currentTag.cat);
                break
            }
            if (node.hasAttribute("id") && currentTag.tagID && "" !== currentTag.tagID) {
                var tagID = node.getAttribute("id").toLowerCase();
                if (currentTag.tagID.toLowerCase() === tagID) {
                    categories = cookieConsent.cookieCategoriesFromNumberArray(currentTag.cat);
                    break
                }
            }
            if (currentTag.tagHash && "" !== currentTag.tagHash && node && node.cookiebotTagHash && "" !== node.cookiebotTagHash && currentTag.tagHash === node.cookiebotTagHash) {
                categories = cookieConsent.cookieCategoriesFromNumberArray(currentTag.cat);
                break
            }
            if (currentTag.innerHash && "" !== currentTag.innerHash && node && node.innerHTML && "" !== node.innerHTML) {
                var tagHashInner = cookieConsent.hashCode(node.innerHTML).toString();
                if (currentTag.innerHash === tagHashInner && "0" !== tagHashInner) {
                    categories = cookieConsent.cookieCategoriesFromNumberArray(currentTag.cat);
                    break
                }
            }
            if (currentTag.outerHash && "" !== currentTag.outerHash && void 0 !== outerhtml && "undefined" !== outerhtml) {
                var tagHashOuter = cookieConsent.hashCode(outerhtml).toString();
                if (currentTag.outerHash === tagHashOuter && "0" !== tagHashOuter) {
                    categories = cookieConsent.cookieCategoriesFromNumberArray(currentTag.cat);
                    break
                }
            }
            if ("" !== tagURL && currentTag.resolvedUrl && "" !== currentTag.resolvedUrl && cookieConsent.configuration.trackingDomains.length > 0 && "IMG" !== node.tagName && "PICTURE" !== node.tagName) {
                var tagDomain = cookieConsent.getHostnameFromURL(tagURL);
                if ("" !== tagDomain && tagDomain !== window.location.hostname)
                    for (var k = 0; k < cookieConsent.configuration.trackingDomains.length; k++) {
                        var currentRecord = cookieConsent.configuration.trackingDomains[k];
                        if (tagDomain === currentRecord.d) {
                            categories = cookieConsent.cookieCategoriesFromNumberArray(currentRecord.c);
                            break
                        }
                    }
            }
        }
        if (0 === cookieConsent.configuration.tags.length && matchCommon && "" !== tagURL && "" === categories) {
            var tagdomain = tagURL.toLowerCase(),
                isAboluteURL = !0;
            if (0 === tagdomain.indexOf("https://") && tagdomain.length > 8 ? tagdomain = tagdomain.substr(8) : 0 === tagdomain.indexOf("http://") && tagdomain.length > 7 ? tagdomain = tagdomain.substr(7) : 0 === tagdomain.indexOf("//") && tagdomain.length > 2 ? tagdomain = tagdomain.substr(2) : isAboluteURL = !1, isAboluteURL && (tagdomain.indexOf(":") > 0 && (tagdomain = tagdomain.substr(0, tagdomain.indexOf(":"))), tagdomain.indexOf("/") > 0 && (tagdomain = tagdomain.substr(0, tagdomain.indexOf("/"))), tagdomain.length > 3))
                for (var i = 0; i < cookieConsent.commonTrackers.domains.length; i++) {
                    var testDomain = cookieConsent.commonTrackers.domains[i];
                    if (tagdomain.indexOf(testDomain.d) >= 0) {
                        categories = cookieConsent.cookieCategoriesFromNumberArray(testDomain.c);
                        break
                    }
                }
        }
        return categories
    }

    function uspapi(command, version, callback) {
        var APIVersion = 1,
            uspData = null,
            isSuccess = !0,
            uspApplies = !0;
        if (window.CookieConsent && "" !== window.CookieConsent.userCountry && -1 === window.CookieConsent.regulationRegions.ccpa.indexOf(window.CookieConsent.userCountry.toLowerCase()) && (uspApplies = !1), 1 === version)
            if ("getUSPData" === command)
                if (uspApplies) {
                    var uspString = 1..toString();
                    uspString += "Y", window.CookieConsent && window.CookieConsent.hasResponse ? window.CookieConsent.consent.marketing ? uspString += "N" : uspString += "Y" : !window.CookieConsent || window.CookieConsent.hasResponse || navigator.globalPrivacyControl ? uspString += "Y" : uspString += "N", uspString += "Y", uspData = {
                        version: 1,
                        uspString: uspString
                    }
                } else uspData = {
                    version: 1,
                    uspString: 1..toString() + "---"
                };
        else isSuccess = !1;
        else isSuccess = !1;
        callback && callback(uspData, isSuccess)
    }

    function addUspapiLocatorFrame() {
        if (!window.frames.__uspapiLocator)
            if (document.body) {
                var iframe = document.createElement("iframe");
                iframe.style.cssText = "display:none;position:absolute;width:1px;height:1px;top:-9999px;", iframe.name = "__uspapiLocator", iframe.tabIndex = -1, iframe.setAttribute("role", "presentation"), iframe.setAttribute("aria-hidden", "true"), iframe.setAttribute("title", "Blank"), document.body.appendChild(iframe)
            } else setTimeout(window.addUspapiLocatorFrame, 5)
    }

    function handleUspapiMessage(event) {
        var data = event && event.data && event.data.__uspapiCall;
        data && "function" == typeof window.__uspapi && window.__uspapi(data.command, data.version, (function(returnValue, success) {
            var eventSource = event.source;
            null == eventSource || eventSource.postMessage({
                __uspapiReturn: {
                    returnValue: returnValue,
                    success: success,
                    callId: data.callId
                }
            }, "*")
        }))
    }

    function loadInlineTagConfiguration(cookieConsent) {
        var tagConfiguration = cookieConsent.inlineConfiguration && cookieConsent.inlineConfiguration.TagConfiguration;
        if (tagConfiguration && tagConfiguration.length > 0)
            for (var i = 0; i < tagConfiguration.length; i++) {
                var tag = tagConfiguration[i];
                if (tag.id) {
                    for (var j = 0; j < cookieConsent.configuration.tags.length; j++) {
                        var currentTag = cookieConsent.configuration.tags[j];
                        tag.id === currentTag.tagID && cookieConsent.configuration.tags.splice(j, 1)
                    }
                    var categoryNumberArray = cookiesNumberCategoriesFromStringArray(tag.categories || []);
                    cookieConsent.configuration.tags.push({
                        id: 0,
                        tagID: tag.id,
                        cat: categoryNumberArray,
                        innerHash: "",
                        outerHash: "",
                        resolvedUrl: "",
                        tagHash: "",
                        type: "",
                        url: ""
                    })
                }
            }
    }
    var Promise$1 = void 0 !== window.Promise && -1 !== window.Promise.toString().indexOf("[native code]") ? window.Promise : Promise$2;
    void 0 === window.CookieControl && (window.CookieControl = {}), window.CookieControl.Cookie = function(n) {
        this.Promise = Promise$1, this.name = n, this.consented = !1, this.declined = !1, this.changed = !1, this.hasResponse = !1, this.consentID = "0", this.consent = {
            stamp: "0",
            necessary: !0,
            preferences: !1,
            statistics: !1,
            marketing: !1,
            method: null
        }, this.isOutsideEU = !1, this.isOutOfRegion = !1, this.host = "https://consent.cookiebot.com/", this.domain = "", this.currentPath = "/", this.doNotTrack = !1, this.consentLevel = "strict", this.isRenewal = !1, this.forceShow = !1, this.dialog = null, this.responseMode = "", this.serial = "", this.scriptId = "Cookiebot", this.scriptElement = null, this.whitelist = [], this.cookieList = {
            cookieTablePreference: [],
            cookieTableStatistics: [],
            cookieTableAdvertising: [],
            cookieTableUnclassified: []
        }, this.pathlist = [], this.userIsInPath = !0, this.cookieEnabled = !0, this.versionChecked = !1, this.versionRequested = !1, this.version = 1, this.latestVersion = 1, this.isNewVersion = !1, this.CDN = null, this.source = "", this.retryCounter = 0, this.frameRetryCounter = 0, this.bulkConsentFrameRetryCounter = 0, this.setOnloadFrameRetryCounter = 0, this.optOutLifetime = 12, this.consentModeDisabled = !1, this.consentModeDataRedaction = "dynamic", this.consentLifetime = null, this.framework = "", this.hasFramework = !1, this.frameworkBlocked = !1, this.frameworkLoaded = !1, this.iframeReady = !1, this.iframe = null, this.bulkconsent = null, this.bulkresetdomains = [], this.bulkconsentsubmitted = !1, this.isbulkrenewal = !1, this.handleCcpaOptinInFrontend = !1, this.wipe = {
            preferences: !0,
            statistics: !0,
            marketing: !0
        }, this.consentUTC = null, this.IABConsentString = "", this.GACMConsentString = "", this.staticFilesEnabled = !1, this.cmpSettings = null, this.dataLayerName = function() {
            function isContainer(name) {
                return !!window.google_tag_manager[name].dataLayer
            }
            var containerName = window.google_tag_manager ? Object.keys(window.google_tag_manager).filter(isContainer)[0] : null;
            return containerName ? window.google_tag_manager[containerName].dataLayer.name : "dataLayer"
        }(), this.loaded = !1, this.autoblock = !1, this.mutationObserver = null, this.mutationCounter = 0, this.mutationFallback = !1, this.mutationFallbackDocAttributes = [], this.mutationHandlerFallbackCharsetLoaded = !1, this.mutationAppName = "", this.mutationEventListeners = [], this.mutationOnloadEventListeners = [], this.mutateEventListeners = !1, this.mutationHandlerFirstScript = null, this.postPonedMutations = [], this.nonAsyncMutations = [], this.deferMutations = [], this.geoRegions = [], this.userCountry = "", this.userCulture = "", this.userCultureOverride = null, this.windowOnloadTriggered = !1, this.botDetectionDisabled = !1, this.regulations = {
            gdprApplies: !0,
            ccpaApplies: !0,
            lgpdApplies: !0
        }, this.regulationRegions = {
            gdpr: ["at", "be", "bg", "cy", "cz", "de", "dk", "es", "ee", "fi", "fr", "gb", "gr", "hr", "hu", "ie", "it", "lt", "lu", "lv", "mt", "nl", "pl", "pt", "ro", "sk", "si", "se", "li", "no", "is"],
            ccpa: ["us-06"],
            lgpd: ["br"]
        }, this.commonTrackers = {
            domains: [{
                d: "google-analytics.com",
                c: [3]
            }, {
                d: "youtube.com",
                c: [4]
            }, {
                d: "youtube-nocookie.com",
                c: [4]
            }, {
                d: "googleadservices.com",
                c: [4]
            }, {
                d: "googlesyndication.com",
                c: [4]
            }, {
                d: "doubleclick.net",
                c: [4]
            }, {
                d: "facebook.*",
                c: [4]
            }, {
                d: "linkedin.com",
                c: [4]
            }, {
                d: "twitter.com",
                c: [4]
            }, {
                d: "addthis.com",
                c: [4]
            }, {
                d: "bing.com",
                c: [4]
            }, {
                d: "sharethis.com",
                c: [4]
            }, {
                d: "yahoo.com",
                c: [4]
            }, {
                d: "addtoany.com",
                c: [4]
            }, {
                d: "dailymotion.com",
                c: [4]
            }, {
                d: "amazon-adsystem.com",
                c: [4]
            }, {
                d: "snap.licdn.com",
                c: [4]
            }]
        }, this.configuration = {
            loaded: !1,
            loadRetry: 0,
            tags: [],
            trackingDomains: []
        }, this.inlineConfiguration = null, this.widget = null, this.bulkConsentEnabled = !0, this.$assign = "function" == typeof Object.assign ? Object.assign : function assign(target, varArgs) {
            if (null == target) throw new TypeError("Cannot convert undefined or null to object");
            for (var to = Object(target), index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (null != nextSource)
                    for (var nextKey in nextSource) Object.prototype.hasOwnProperty.call(nextSource, nextKey) && (to[nextKey] = nextSource[nextKey])
            }
            return to
        }, this.init = function() {
            var that = this,
                newElement;
            if ("cookie" in document) {
                var testcookie = this.getCookie(this.name);
                if (!testcookie) {
                    var secureAttribute = "https:" === window.location.protocol ? ";secure" : "";
                    document.cookie = this.name + "=-3;expires=Thu, 01 Jan 2060 00:00:00 GMT" + secureAttribute, this.cookieEnabled = document.cookie.indexOf.call(document.cookie, this.name) > -1, this.cookieEnabled && (document.cookie = this.name + "=-3;expires=Thu, 01 Jan 1970 00:00:00 GMT" + secureAttribute)
                }
            } else this.cookieEnabled = !1;

            function logMissingUcReference() {
                var supportUrl = "https://www.cookiebot.com/en/help/";
                console.warn("Cookiebot: Cookiebot was unable to reference the uc.js script, which should be declared with an ID attribute set to 'Cookiebot'. For more information about Cookiebot setup, see %s", supportUrl)
            }
            this.cookieEnabled || (this.isOutsideEU = !1, this.isOutOfRegion = !1, this.hasResponse = !0, this.declined = !0, this.consented = !1, this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.consentID = "-3", this.consent.stamp = "-3", this.consent.method = null), void 0 === document.createElementOrig && (document.createElementOrig = document.createElement), document.createElement = (newElement = document.createElement, function() {
                var element = newElement.apply(this, arguments);
                return element.isCookiebotDynamicTag = 1, element
            }), window.addEventListener("load", this.signalWindowLoad, !1);
            var d = document.getElementById(this.scriptId) || document.getElementById("CookieConsent");
            if (d) this.scriptId = d.getAttribute("id");
            else
                for (var tagsAll = document.getElementsByTagName("script"), i = 0; i < tagsAll.length; i++) {
                    var currentTag = tagsAll[i];
                    if (currentTag.hasAttribute("src") && (currentTag.hasAttribute("data-cbid") || currentTag.getAttribute("src").toLowerCase().indexOf("cbid=") > 0) && currentTag.getAttribute("src").toLowerCase().indexOf("/uc.js") > 0) {
                        d = currentTag, d.hasAttribute("id") ? this.scriptId = d.getAttribute("id") : d.id = this.scriptId;
                        break
                    }
                }

            function getUserCultures() {
                return navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
            }
            if (d ? d && d.hasAttribute("src") && (this.source = d.getAttribute("src")) : logMissingUcReference(), this.userCulture = getUserCultures()[0], d) {
                function hostHasSuffix(host, suffix) {
                    var fromIndex = host.length - suffix.length;
                    return -1 !== host.indexOf(suffix, fromIndex)
                }
                this.scriptElement = d, this.host = "https://" + d.src.match(/:\/\/(.[^/]+)/)[1] + "/", hostHasSuffix(this.host, "cookiebot.eu/") ? this.CDN = "https://consentcdn.cookiebot.eu" : this.CDN = "https://consentcdn.cookiebot.com";
                var e = d.getAttribute("data-cbid"),
                    ex = this.getURLParam("cbid");
                ex && (e = ex), e && this.isGUID(e) && (this.serial = e);
                var p = d.getAttribute("data-path");
                if (p) {
                    var customdatapathlist = p.replace(/ /g, "");
                    this.pathlist = customdatapathlist.split(",")
                }
                var p2 = d.getAttribute("data-blockingmode");
                p2 && "auto" === p2.toLowerCase() && (this.autoblock = !0);
                var pol = d.getAttribute("data-optoutlifetime");
                pol && "0" === pol && (this.optOutLifetime = "0");
                var pw1 = d.getAttribute("data-wipe-preferences");
                pw1 && "0" === pw1.toLowerCase() && (this.wipe.preferences = !1);
                var pw2 = d.getAttribute("data-wipe-statistics");
                pw2 && "0" === pw2.toLowerCase() && (this.wipe.statistics = !1);
                var pw3 = d.getAttribute("data-wipe-marketing");
                pw3 && "0" === pw3.toLowerCase() && (this.wipe.marketing = !1);
                var pf = d.getAttribute("data-framework");
                pf && (this.framework = pf);
                var pg = d.getAttribute("data-georegions");
                pg && this.registerGeoRegions(pg);
                var uc = d.getAttribute("data-user-country");
                uc && (this.userCountry = uc);
                var pc = d.getAttribute("data-culture");
                pc && (this.userCulture = pc, this.userCultureOverride = pc);
                var we = d.getAttribute("data-widget-enabled");
                we && ("true" === we || "false" === we ? (this.widget = this.widget || {}, this.widget.enabledOverride = "true" === we) : this.logWidgetAttributeWarning("data-widget-enabled", we));
                var cm = d.getAttribute("data-consentmode");
                cm && "disabled" === cm.toLowerCase() && (this.consentModeDisabled = !0);
                var bce = d.getAttribute("data-bulkconsentmode");
                bce && "disabled" === bce.toLowerCase() && (this.bulkConsentEnabled = !1);
                var staticFilesEnabledAttribute = d.getAttribute("data-static-files-enabled");
                staticFilesEnabledAttribute && "true" === staticFilesEnabledAttribute.toLowerCase() && (this.staticFilesEnabled = !0);
                var cmdr = this.getURLParam("consentmode-dataredaction") || d.getAttribute("data-consentmode-dataredaction");
                cmdr && ("true" === cmdr || "false" === cmdr || "dynamic" === cmdr ? this.consentModeDataRedaction = cmdr : console.warn("Cookiebot: Cookiebot script attribute 'data-consentmode-dataredaction' with value '%s' is invalid. Supported values are 'true', 'false' or 'dynamic'", cmdr)), this.dataLayerName = d.getAttribute("data-layer-name") || this.dataLayerName
            }
            var px = this.getURLParam("path");
            if (px) {
                var custompathlist = px.replace(/ /g, "");
                this.pathlist = custompathlist.split(",")
            }
            var px2 = this.getURLParam("blockingmode");
            px2 && "auto" === px2.toLowerCase() && (this.autoblock = !0);
            var polx = this.getURLParam("optoutlifetime");
            polx && "0" === polx && (this.optOutLifetime = "0");
            var pwx1 = this.getURLParam("wipe_preferences");
            pwx1 && "0" === pwx1.toLowerCase() && (this.wipe.preferences = !1);
            var pwx2 = this.getURLParam("wipe_statistics");
            pwx2 && "0" === pwx2.toLowerCase() && (this.wipe.statistics = !1);
            var pwx3 = this.getURLParam("wipe_marketing");
            pwx3 && "0" === pwx3.toLowerCase() && (this.wipe.marketing = !1);
            var pfx = this.getURLParam("framework");
            pfx && (this.framework = pfx);
            var pfy = this.getURLParam("georegions");
            pfy && this.registerGeoRegions(pfy);
            var pfz = this.getURLParam("user_country");
            pfz && (this.userCountry = pfz);
            var puc = this.getURLParam("culture");
            puc && (this.userCulture = puc, this.userCultureOverride = puc);
            var pcm = this.getURLParam("consentmode");
            pcm && "disabled" === pcm.toLowerCase() && (this.consentModeDisabled = !0), window.Cookiebot = this, this.domain = window.location.hostname.toLowerCase(), 0 === this.domain.indexOf("www.") && (this.domain = this.domain.substring(4));
            var gDisableBotDetection = this.getDomainUrlParam("g_disable_bot_detection");
            gDisableBotDetection && "1" === gDisableBotDetection && (this.botDetectionDisabled = !0), "iab" !== this.framework.toLowerCase() && "iab1" !== this.framework.toLowerCase() && "iabv2" !== this.framework.toLowerCase() || (this.hasFramework = !0, this.framework = "IABv2"), this.frameworkBlocked && (this.hasFramework = !1, this.framework = ""), "IABv2" === this.framework && window.propagateIABStub(), this.consentModeDisabled || this.pushGoogleConsent("set", "developer_id.dMWZhNz", !0);
            for (var temppathlist = [], j = 0; j < this.pathlist.length; j++) {
                var currentpath = this.pathlist[j];
                "" !== currentpath && (0 !== currentpath.indexOf("/") && (currentpath = "/" + currentpath), temppathlist.push(decodeURIComponent(currentpath)))
            }
            if (this.pathlist = temppathlist, this.pathlist.length > 0) {
                this.userIsInPath = !1;
                var userCurrentPath = window.location.pathname;
                if ("/" !== userCurrentPath)
                    for (var k = 0; k < this.pathlist.length; k++)
                        if (0 === userCurrentPath.toLowerCase().indexOf(this.pathlist[k].toLowerCase())) {
                            this.currentPath = this.pathlist[k], this.userIsInPath = !0;
                            break
                        }
                this.userIsInPath || (this.consented = !0, this.declined = !1, this.hasResponse = !0, this.consent.preferences = !0, this.consent.statistics = !0, this.consent.marketing = !0, this.consent.method = "implied", this.consentLevel = "implied")
            }
            if (this.userIsInPath) {
                var c = this.getCookie(this.name);
                if (c) {
                    if ("-2" === c ? (this.declined = !1, this.consented = !1, this.hasResponse = !1, this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.consent.method = "implied", this.consentLevel = "implied") : ("0" === c ? (this.declined = !0, this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.consent.method = "implied", this.responseMode = "leveloptin") : (this.hasResponse = !0, this.declined = !1, this.consented = !0, this.consent.preferences = !0, this.consent.statistics = !0, this.consent.marketing = !0, this.consent.method = this.consent.method || "implied", "-1" === c && (this.isOutsideEU = !0, this.isOutOfRegion = !0, this.version = this.latestVersion, this.iframeReady = !0, this.consentUTC = new Date, this.updateRegulations())), this.hasResponse = !0, "-1" === c || this.iframeReady || (this.bulkConsentEnabled ? (this.iframeReady = !1, this.loadCDNiFrame()) : this.iframeReady = !0)), 0 === c.indexOf("{") && c.indexOf("}") > 0) {
                        var consentJSON = c.replace(/%2c/g, ",").replace(/'/g, '"').replace(/([{\[,])\s*([a-zA-Z0-9_]+?):/g, '$1"$2":'),
                            consentObject = JSON.parse(consentJSON);
                        this.consentID = consentObject.stamp, this.consent.stamp = consentObject.stamp, this.consent.preferences = consentObject.preferences, this.consent.statistics = consentObject.statistics, this.consent.marketing = consentObject.marketing, this.consent.method = consentObject.method || this.consent.method || "implied", this.isOutsideEU = "-1" === this.consent.stamp, this.isOutOfRegion = "-1" === this.consent.stamp, this.consent.preferences || this.consent.statistics || this.consent.marketing || (this.declined = !0, this.consented = !1, this.responseMode = "leveloptin"), void 0 !== consentObject.utc && (this.consentUTC = new Date(consentObject.utc)), void 0 !== consentObject.iab && (this.IABConsentString = consentObject.iab, this.hasFramework && "iabv2" === this.framework.toLowerCase() && !this.frameworkBlocked && (this.IABConsentString = "", this.deleteConsentCookie())), void 0 !== consentObject.iab2 && this.hasFramework && "iabv2" === this.framework.toLowerCase() && !this.frameworkBlocked && (this.IABConsentString = consentObject.iab2), void 0 !== consentObject.gacm && (this.GACMConsentString = consentObject.gacm), void 0 !== consentObject.region && ("" === this.userCountry && (this.userCountry = consentObject.region), this.updateRegulations()), void 0 !== consentObject.ver && (this.version = consentObject.ver), this.responseMode = "leveloptin"
                    } else this.consentID = c, this.consent.stamp = c;
                    this.changed || this.triggerGTMEvents(), this.signalGoogleConsentAPI(this.consentModeDisabled, this.consentModeDataRedaction, this.consent.preferences, this.consent.statistics, this.consent.marketing)
                } else {
                    if (this.isSpider()) return void this.setOutOfRegion();
                    this.bulkConsentEnabled ? (this.loadCDNiFrame(), this.bulkconsentsubmitted || this.checkForBulkConsent()) : this.iframeReady = !0
                }
                if (this.autoblock && !(this.consent.preferences && this.consent.statistics && this.consent.marketing)) {
                    var hasTopLocation = !1;
                    try {
                        top && top.location && (hasTopLocation = !0)
                    } catch (event) {}
                    if (hasTopLocation && top.location.pathname.indexOf("wp-admin") >= 0) this.autoblock = !1;
                    else {
                        for (var l = 0; l < this.commonTrackers.domains.length; l++) {
                            var testDomain = this.commonTrackers.domains[l];
                            "*" === testDomain.d.substr(testDomain.d.length - 1, 1) && (testDomain.d = testDomain.d.substr(0, testDomain.d.length - 1))
                        }
                        this.initMutationObserver()
                    }
                }
            }
            this.staticFilesEnabled && !this.cmpSettings ? fetchCmpSettings(this.Promise, this.serial).then((function(cmpSettings) {
                window.Cookiebot.widget = window.Cookiebot.widget || {}, window.Cookiebot.cmpSettings = cmpSettings, window.Cookiebot.widget.configuration = cmpSettings.widget
            })).catch((function() {})).finally((function() {
                window.Cookiebot.initConsent()
            })) : this.initConsent()
        }, this.initConsent = function() {
            var that = this;
            try {
                var d = document.getElementById("CookiebotConfiguration");
                if (d && "script" === d.tagName.toLowerCase() && d.type && "application/json" === d.type.toLowerCase()) {
                    this.inlineConfiguration = JSON.parse(d.innerHTML);
                    var hasEnabledFramework = this.hasFramework && !this.frameworkBlocked && "iabv2" === this.framework.toLowerCase() && !this.frameworkLoaded;
                    this.inlineConfiguration.Frameworks && (hasEnabledFramework && void 0 !== this.inlineConfiguration.Frameworks && void 0 !== this.inlineConfiguration.Frameworks.IABTCF2 || (this.inlineConfiguration.Frameworks = void 0)), this.inlineConfiguration.TagConfiguration && ("object" == typeof this.inlineConfiguration.TagConfiguration && 0 !== this.inlineConfiguration.TagConfiguration.length || (this.inlineConfiguration.TagConfiguration = void 0))
                }
            } catch (e) {
                this.inlineConfiguration = null, console.log("Error in Cookiebot inline configuration section within tag Id 'CookiebotConfiguration'.")
            }
            var iframePromise = new Promise$1((function(resolve) {
                    function checkIFrame() {
                        that.iframeReady ? resolve() : setTimeout(checkIFrame, 50)
                    }
                    checkIFrame()
                })),
                tcfPromise = new Promise$1((function(resolve) {
                    !that.hasFramework || that.frameworkBlocked || "iabv2" !== that.framework.toLowerCase() || that.frameworkLoaded ? resolve() : that.getScript(that.host + "Framework/IAB/consent-sdk-2.0.js", !1, (function() {
                        window.CookieConsentIABCMP.initFramework(), that.frameworkLoaded = !0, resolve()
                    }))
                }));
            this.setDNTState(), this.setHeaderStyles();
            var bannerPromise = this.consented || this.declined ? resolvedPromise : createBanner(that, !1);
            Promise$1.all([Promise$1.race([iframePromise, createTimeoutPromise(that.Promise, 2e3)]).then((function() {
                that.iframeReady = !0
            })), Promise$1.race([tcfPromise, createTimeoutPromise(that.Promise, 2e3)]), bannerPromise]).then((function() {
                return that.consented || that.declined ? (that.signalConsentReady(), that.setOnload(), resolvedPromise) : (document.addEventListener("click", that.submitImpliedConsent, !0), window.CookieConsentDialog && window.CookieConsentDialog.init(), that.changed = !0, document.body ? that.cbonloadevent() : window.addEventListener("load", that.cbonloadevent, !1), resolvedPromise)
            }))
        }, this.signalWindowLoad = function() {
            window.CookieConsent.windowOnloadTriggered = !0, window.removeEventListener("load", window.CookieConsent.signalWindowLoad), window.CookieConsent.stopMutationObserver()
        }, this.registerGeoRegions = function(geodata) {
            if (this.geoRegions && 0 === this.geoRegions.length && geodata && geodata.length > 0) {
                var JSONversion = '{"configs": [' + geodata.replace(/ /g, "").replace(/'/g, '"') + "]}";
                try {
                    var jsonArray = JSON.parse(JSONversion);
                    if (jsonArray.configs)
                        for (var i = 0; i < jsonArray.configs.length; i++) jsonArray.configs[i].region && jsonArray.configs[i].cbid && this.geoRegions.push({
                            r: jsonArray.configs[i].region,
                            i: jsonArray.configs[i].cbid
                        })
                } catch (e) {
                    console.warn("ERROR IN GEOREGIONS ATTRIBUTE VALUE - NOT A VALID JSON ARRAY: " + geodata)
                }
            }
        };
        var IMPLIED_TRIGGER_PATTERN = /(\s+|^)cookieconsent-implied-trigger(\s+|$)/i;

        function isImpliedConsentTrigger(target) {
            return target && 1 === target.nodeType && ("A" === target.tagName || "BUTTON" === target.tagName || IMPLIED_TRIGGER_PATTERN.test(target.className))
        }
        var COMMAND_LINK_PATTERN = /javascript:.*\b(CookieConsent|Cookiebot)\b/;

        function isCommandLink(target) {
            return "A" === target.tagName && COMMAND_LINK_PATTERN.test(target.href)
        }

        function isStorageSupported() {
            try {
                var key = "cookiebottest";
                return localStorage.setItem(key, key), localStorage.removeItem(key), !0
            } catch (ignore) {
                return !1
            }
        }
        this.submitImpliedConsent = function(event) {
            if ("object" == typeof window.CookieConsent && !window.CookieConsent.hasResponse && "object" == typeof window.CookieConsentDialog && "implied" === window.CookieConsentDialog.consentLevel && !window.CookieConsent.mutationFallback) {
                for (var target = event.target; target && !isImpliedConsentTrigger(target);) target = target.parentNode;
                if (!target) return;
                for (var parent = target; parent;) {
                    if (parent.id && parent.id === window.CookieConsentDialog.DOMid) return;
                    parent = parent.parentNode
                }
                if (isCommandLink(target)) return;
                "optout" === window.CookieConsent.responseMode && !0 === navigator.globalPrivacyControl ? (window.CookieConsent.submitCustomConsent(!1, !1, !1, !0), window.CookieConsent.hide()) : window.CookieConsent.submitConsent(!0, window.location.href, !1), document.removeEventListener("click", window.CookieConsent.submitImpliedConsent, !0), "object" == typeof window.performance && "function" == typeof window.performance.getEntriesByType && (this.performanceEntriesCounter = window.performance.getEntriesByType("resource").length), setTimeout((function() {
                    window.CookieConsent.processLinkClick(event.target)
                }), 1e3), event.bubbles && event.stopPropagation(), event.preventDefault()
            }
        }, this.cbonloadevent = function() {
            "object" == typeof window.CookieConsent && (window.CookieConsent.loaded = !0), setTimeout((function() {
                "object" == typeof window.CookieConsent && window.CookieConsent.applyDisplay(), void 0 !== window.CookieDeclaration && "function" == typeof window.CookieDeclaration.SetUserStatusLabel && window.CookieDeclaration.SetUserStatusLabel(), "object" == typeof window.CookieConsentDialog && (window.CookieConsentDialog.pageHasLoaded = !0)
            }), 1e3)
        }, this.processLinkClickCounter = 0, this.performanceEntriesCounter = 0, this.processLinkClick = function(waittarg) {
            this.processLinkClickCounter += 1;
            var currentPerformanceEntriesCount = 0;
            if ("object" == typeof window.performance && "function" == typeof window.performance.getEntriesByType ? currentPerformanceEntriesCount = window.performance.getEntriesByType("resource").length : this.performanceEntriesCounter = 0, this.performanceEntriesCounter !== currentPerformanceEntriesCount && this.processLinkClickCounter < 6) this.performanceEntriesCounter = currentPerformanceEntriesCount, setTimeout((function() {
                window.CookieConsent.processLinkClick(waittarg)
            }), 1e3);
            else {
                this.processLinkClickCounter = 0, this.performanceEntriesCounter = 0;
                var evt = new MouseEvent("click", {
                    view: window,
                    bubbles: !0,
                    cancelable: !0
                });
                waittarg.dispatchEvent(evt)
            }
        }, this.loadCDNiFrame = function() {
            var that = this;
            document.body ? (this.iframe || (this.iframe = document.createElementOrig("iframe"), this.iframe.style.cssText = "position:absolute;width:1px;height:1px;top:-9999px;", this.iframe.tabIndex = -1, this.iframe.setAttribute("role", "presentation"), this.iframe.setAttribute("aria-hidden", "true"), this.iframe.setAttribute("title", "Blank"), document.body.appendChild(this.iframe), this.iframe.addEventListener("load", (function() {
                that.readBulkConsent()
            }), !1), window.addEventListener("message", (function(event) {
                that.handleBulkConsentIframeMessage(event)
            }), !1)), this.iframe && !this.iframeReady ? this.iframe.src = this.CDN + "/sdk/bc-v4.min.html" : this.iframeReady = !0) : setTimeout((function() {
                window.CookieConsent.loadCDNiFrame()
            }), 100)
        }, this.readBulkConsent = function() {
            if (window.CookieConsent && null != window.CookieConsent.iframe && void 0 !== window.CookieConsent.iframe.contentWindow) {
                var postObj = {
                    action: "get",
                    serial: this.serial.toLowerCase()
                };
                try {
                    window.CookieConsent.iframe.contentWindow.postMessage(postObj, this.CDN)
                } catch (e) {
                    window.CookieConsent.iframeReady = !0
                }
            } else window.CookieConsent.iframeReady = !0
        }, this.handleBulkConsentIframeMessage = function(event) {
            if (event && event.origin && event.data && event.origin === this.CDN) {
                try {
                    var bulkConsentData = event.data;
                    if ("string" == typeof bulkConsentData) {
                        if ("bcEmpty" === bulkConsentData) return this.bulkresetdomains = [], void(window.CookieConsent.iframeReady = !0);
                        bulkConsentData = JSON.parse(bulkConsentData)
                    }
                    if (bulkConsentData.value && (bulkConsentData = bulkConsentData.value), this.bulkresetdomains = bulkConsentData.resetdomains, bulkConsentData.bulkconsent) {
                        if (this.bulkconsent = bulkConsentData.bulkconsent, bulkConsentData.bulkconsent.utc) {
                            var expireMonths = bulkConsentData.bulkconsent.expireMonths;
                            if (void 0 === expireMonths && (expireMonths = isNaN(this.consentLifetime) ? 12 : this.consentLifetime), 0 !== expireMonths) {
                                var expireDate = new window.CookieControl.DateTime(bulkConsentData.bulkconsent.utc).addMonths(expireMonths);
                                if (expireDate < new Date) return this.removeBulkReset(), this.deleteConsentCookie(), void this.init()
                            }
                        }
                    } else this.bulkresetdomains = []
                } catch (e) {}
                window.CookieConsent.iframeReady = !0
            }
        }, this.checkForBulkConsent = function() {
            var that = this;
            if (!this.iframeReady && this.bulkConsentFrameRetryCounter < 40) return this.bulkConsentFrameRetryCounter++, void setTimeout((function() {
                that.checkForBulkConsent()
            }), 50);
            if (this.iframeReady = !0, this.bulkConsentFrameRetryCounter = 0, this.bulkresetdomains.length > 0 && !this.changed) {
                var domainmustrenew = !1,
                    currentHost = window.location.hostname.toLowerCase(),
                    althost = currentHost;
                althost = 0 === currentHost.indexOf("www.") ? althost.substring(4) : "www." + althost;
                for (var j = 0; j < this.bulkresetdomains.length; j++)
                    if (currentHost === this.bulkresetdomains[j] || althost === this.bulkresetdomains[j]) {
                        domainmustrenew = !0;
                        break
                    }
                if (domainmustrenew && this.iframe) return this.isbulkrenewal = !0, null != this.bulkconsent ? (this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.bulkconsent.iab2 && this.hasFramework && "iabv2" === this.framework.toLowerCase() && !this.frameworkBlocked && (this.IABConsentString = this.bulkconsent.iab2), this.bulkconsent.gacm && (this.GACMConsentString = this.bulkconsent.gacm), this.bulkconsentsubmitted = !0, void this.submitCustomConsent(this.bulkconsent.preferences, this.bulkconsent.statistics, this.bulkconsent.marketing)) : (this.deleteConsentCookie(), this.removeCurrentDomainBulkReset(), void this.init())
            }
        }, this.deleteConsentCookie = function() {
            document.cookie = this.name + "=;Path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT", this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.consent.method = null, this.hasResponse = !1, this.consented = !1, this.declined = !1
        }, this.resetBulkDomains = function(newDomains, updateStorage) {
            if (this.iframe && newDomains.length > 0) {
                for (var i = 0; i < newDomains.length; i++) {
                    for (var domainExists = !1, j = 0; j < this.bulkresetdomains.length; j++)
                        if (newDomains[i] === this.bulkresetdomains[j]) {
                            domainExists = !0;
                            break
                        }
                    domainExists || this.bulkresetdomains.push(newDomains[i])
                }
                var currentHost = window.location.hostname.toLowerCase(),
                    altHost = currentHost;
                altHost = 0 === currentHost.indexOf("www.") ? altHost.substring(4) : "www." + altHost, this.bulkresetdomains = this.bulkresetdomains.filter((function(item) {
                    return item !== currentHost && item !== altHost
                })), updateStorage && window.CookieConsent && null != window.CookieConsent.iframe && window.CookieConsent.iframe.contentWindow && this.updateBulkStorage()
            }
        }, this.removeBulkReset = function() {
            if (this.bulkresetdomains = [], this.bulkconsent = null, this.iframe && this.iframe.contentWindow) {
                var postObj = {
                    action: "remove",
                    value: "",
                    serial: this.serial.toLowerCase()
                };
                this.iframe.contentWindow.postMessage(postObj, this.CDN)
            }
        }, this.removeCurrentDomainBulkReset = function() {
            this.isbulkrenewal = !1;
            var currentHost = window.location.hostname.toLowerCase(),
                althost = currentHost;
            althost = 0 === currentHost.indexOf("www.") ? althost.substring(4) : "www." + althost, this.bulkresetdomains.length > 0 && (this.bulkresetdomains = this.bulkresetdomains.filter((function(item) {
                return item !== currentHost && item !== althost
            }))), this.updateBulkStorage()
        }, this.registerBulkConsent = function(expireMonths) {
            this.consentLifetime = isNaN(expireMonths) ? this.consentLifetime || 12 : expireMonths;
            var ticketid = this.consentID,
                ticketutc = this.consentUTC;
            null == ticketutc && (ticketutc = new Date), null != this.bulkconsent && this.changed && (void 0 !== this.bulkconsent.ticket && (ticketid = this.bulkconsent.ticket), void 0 !== this.bulkconsent.utc && (ticketutc = new Date(this.bulkconsent.utc))), this.bulkconsent = {
                ticket: ticketid,
                utc: ticketutc.getTime(),
                expireMonths: this.consentLifetime,
                preferences: this.consent.preferences,
                statistics: this.consent.statistics,
                marketing: this.consent.marketing
            }, this.hasFramework && this.frameworkLoaded && !this.frameworkBlocked && "iabv2" === this.framework.toLowerCase() && (this.bulkconsent.iab2 = this.IABConsentString, this.bulkconsent.gacm = this.GACMConsentString), this.updateBulkStorage()
        }, this.updateBulkStorage = function() {
            if (this.iframe) try {
                var postObj = {
                    action: "set",
                    value: {
                        resetdomains: this.bulkresetdomains,
                        bulkconsent: this.bulkconsent,
                        expireMonths: isNaN(this.bulkconsent.expireMonths) ? 12 : this.bulkconsent.expireMonths,
                        serial: this.serial.toLowerCase()
                    },
                    serial: this.serial.toLowerCase()
                };
                this.iframe.contentWindow.postMessage(postObj, this.CDN)
            } catch (e) {}
        }, this.signalConsentFramework = function() {
            this.hasFramework && !this.frameworkLoaded && setTimeout((function() {
                window.CookieConsent.signalConsentFramework()
            }), 50)
        }, this.cloneScriptTag = function(currentTag) {
            return cloneScriptTag(document, currentTag)
        }, this.runScripts = function() {
            for (var that = this, tagContainer = [], deferTagContainer = [], tagsAll = document.getElementsByTagName("script"), i = 0, event; i < tagsAll.length; i++) {
                var currentTag = tagsAll[i];
                currentTag.hasAttribute("data-cookieconsent") && currentTag.hasAttribute("type") && "text/plain" === currentTag.getAttribute("type").toLowerCase() && "ignore" !== currentTag.getAttribute("data-cookieconsent").toLowerCase() && void 0 === currentTag.cookiesProcessed && (currentTag.hasAttribute("defer") ? (currentTag.removeAttribute("defer"), deferTagContainer.push(currentTag)) : tagContainer.push(currentTag), currentTag.cookiesProcessed = 1)
            }
            for (var j = 0; j < deferTagContainer.length; j++) tagContainer.push(deferTagContainer[j]);
            (this.RunScriptTags(tagContainer), this.RunSrcTags("iframe"), this.RunSrcTags("img"), this.RunSrcTags("embed"), this.RunSrcTags("video"), this.RunSrcTags("audio"), this.RunSrcTags("picture"), this.RunSrcTags("source"), void 0 === window.CB_OnTagsExecuted_Processed) && (window.CB_OnTagsExecuted_Processed = 1, window.CookieConsent.ontagsexecuted && window.CookieConsent.ontagsexecuted(), "function" == typeof window.CookiebotCallback_OnTagsExecuted ? window.CookiebotCallback_OnTagsExecuted() : "function" == typeof window.CookieConsentCallback_OnTagsExecuted && window.CookieConsentCallback_OnTagsExecuted(), event = document.createEvent("Event"), event.initEvent("CookiebotOnTagsExecuted", !0, !0), window.dispatchEvent(event), event = document.createEvent("Event"), event.initEvent("CookieConsentOnTagsExecuted", !0, !0), window.dispatchEvent(event))
        }, this.RunScriptTags = function(tagContainer) {
            runScriptTags(window, this, tagContainer)
        }, this.RunSrcTags = function(tagName) {
            for (var elementsAll = document.getElementsByTagName(tagName), elementContainer = [], i = 0; i < elementsAll.length; i++) {
                var currentElement = elementsAll[i];
                currentElement.hasAttribute("data-cookieconsent") && (currentElement.hasAttribute("data-src") || currentElement.hasAttribute("data-cookieblock-src")) && "ignore" !== currentElement.getAttribute("data-cookieconsent").toLowerCase() && elementContainer.push(currentElement)
            }
            for (var j = 0; j < elementContainer.length; j++) {
                var currentElementContainer = elementContainer[j];
                this.registerDisplayState(currentElementContainer);
                for (var tagConsentLevels = currentElementContainer.getAttribute("data-cookieconsent").toLowerCase().split(","), canExecute = !0, k = 0; k < tagConsentLevels.length; k++) {
                    var consentReq = tagConsentLevels[k].replace(/^\s*/, "").replace(/\s*$/, "");
                    "preferences" === consentReq && (this.addClass(currentElementContainer, "cookieconsent-optin-preferences"), window.CookieConsent.consent.preferences || (canExecute = !1)), "statistics" === consentReq && (this.addClass(currentElementContainer, "cookieconsent-optin-statistics"), window.CookieConsent.consent.statistics || (canExecute = !1)), "marketing" === consentReq && (this.addClass(currentElementContainer, "cookieconsent-optin-marketing"), window.CookieConsent.consent.marketing || (canExecute = !1))
                }
                canExecute ? (currentElementContainer.hasAttribute("data-cookieblock-src") ? (currentElementContainer.src = currentElementContainer.getAttribute("data-cookieblock-src"), currentElementContainer.removeAttribute("data-cookieblock-src")) : currentElementContainer.hasAttribute("data-src") && (currentElementContainer.src = currentElementContainer.getAttribute("data-src"), currentElementContainer.removeAttribute("data-src")), this.displayElement(currentElementContainer)) : this.hideElement(currentElementContainer)
            }
        }, this.applyDisplay = function() {
            for (var iframesAll = document.getElementsByTagName("iframe"), i = 0; i < iframesAll.length; i++) {
                var currentIframe = iframesAll[i];
                if (this.registerDisplayState(currentIframe), currentIframe.hasAttribute("data-cookieconsent") && (currentIframe.hasAttribute("data-src") || currentIframe.hasAttribute("data-cookieblock-src")))
                    for (var requiredCategories = currentIframe.getAttribute("data-cookieconsent").replace("/ /g", "").toLowerCase().split(","), j = 0; j < requiredCategories.length; j++) "preferences" === requiredCategories[j] && this.addClass(currentIframe, "cookieconsent-optin-preferences"), "statistics" === requiredCategories[j] && this.addClass(currentIframe, "cookieconsent-optin-statistics"), "marketing" === requiredCategories[j] && this.addClass(currentIframe, "cookieconsent-optin-marketing")
            }
            for (var consetElementsClassesArray = [".cookieconsent-optout-preferences", ".cookieconsent-optout-statistics", ".cookieconsent-optout-marketing", ".cookieconsent-optin-preferences", ".cookieconsent-optin-statistics", ".cookieconsent-optin-marketing", ".cookieconsent-optin", ".cookieconsent-optout"], consentElementsClasses = consetElementsClassesArray.join(","), consentElements = document.querySelectorAll(consentElementsClasses), k = 0; k < consentElements.length; k++) {
                this.registerDisplayState(consentElements[k]);
                var showElement = !0;
                (this.hasClass(consentElements[k], "cookieconsent-optin") && !window.CookieConsent.consented || this.hasClass(consentElements[k], "cookieconsent-optin-preferences") && !window.CookieConsent.consent.preferences || this.hasClass(consentElements[k], "cookieconsent-optin-statistics") && !window.CookieConsent.consent.statistics || this.hasClass(consentElements[k], "cookieconsent-optin-marketing") && !window.CookieConsent.consent.marketing || this.hasClass(consentElements[k], "cookieconsent-optout") && window.CookieConsent.consented || this.hasClass(consentElements[k], "cookieconsent-optout-preferences") && window.CookieConsent.consent.preferences || this.hasClass(consentElements[k], "cookieconsent-optout-statistics") && window.CookieConsent.consent.statistics || this.hasClass(consentElements[k], "cookieconsent-optout-marketing") && window.CookieConsent.consent.marketing) && (showElement = !1), (this.hasClass(consentElements[k], "cookieconsent-optout-preferences") && !window.CookieConsent.consent.preferences || this.hasClass(consentElements[k], "cookieconsent-optout-statistics") && !window.CookieConsent.consent.statistics || this.hasClass(consentElements[k], "cookieconsent-optout-marketing") && !window.CookieConsent.consent.marketing) && (showElement = !0), showElement ? this.displayElement(consentElements[k]) : this.hideElement(consentElements[k])
            }
        }, this.hideElement = function(HTMLElement) {
            "SOURCE" === HTMLElement.tagName && HTMLElement.parentNode && (HTMLElement = HTMLElement.parentNode), HTMLElement.style.display = "none"
        }, this.displayElement = function(HTMLElement) {
            if (HTMLElement.cookieconsentDataStyleDisplay) {
                var cookieconsentDataStyleDisplay = HTMLElement.cookieconsentDataStyleDisplay;
                "SOURCE" === HTMLElement.tagName && HTMLElement.parentNode && (HTMLElement = HTMLElement.parentNode, "AUDIO" === HTMLElement.tagName && HTMLElement.load()), HTMLElement.style.display = cookieconsentDataStyleDisplay
            }
        }, this.registerDisplayState = function(HTMLElement) {
            if (void 0 === HTMLElement.cookieconsentDataStyleDisplay) {
                for (var oldClasses = [], internalClasses = ["cookieconsent-optin-preferences", "cookieconsent-optin-statistics", "cookieconsent-optin-marketing", "cookieconsent-optin", "cookieconsent-optout-preferences", "cookieconsent-optout-statistics", "cookieconsent-optout-marketing", "cookieconsent-optout"], i = 0; i < internalClasses.length; i++) {
                    var currentClass = internalClasses[i];
                    this.hasClass(HTMLElement, currentClass) && (oldClasses.push(currentClass), this.removeClass(HTMLElement, currentClass))
                }
                if (HTMLElement.style.display ? HTMLElement.cookieconsentDataStyleDisplay = HTMLElement.style.display : HTMLElement.cookieconsentDataStyleDisplay = window.getComputedStyle(HTMLElement, null).getPropertyValue("display"), oldClasses.length > 0)
                    for (var j = 0; j < oldClasses.length; j++) this.addClass(HTMLElement, oldClasses[j])
            }
        }, this.hasClass = function(HTMLElement, cls) {
            return HTMLElement.className && HTMLElement.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
        }, this.addClass = function(HTMLElement, cls) {
            this.hasClass(HTMLElement, cls) || (HTMLElement.className += " " + cls)
        }, this.removeClass = function(HTMLElement, cls) {
            this.hasClass(HTMLElement, cls) && (HTMLElement.className = HTMLElement.className.replace(cls, ""))
        }, this.setOnload = function() {
            var that = this;
            if (this.isOutOfRegion ? (this.versionRequested = !0, this.versionChecked = !0) : setTimeout((function() {
                    that.versionRequested || (that.versionRequested = !0, that.versionChecked || that.getScript(that.CDN + "/consentconfig/" + that.serial + "/state.js", !0, (function() {
                        that.versionChecked = !0
                    })))
                }), 1), !this.iframeReady && this.setOnloadFrameRetryCounter < 40) return this.setOnloadFrameRetryCounter++, void setTimeout((function() {
                that.setOnload()
            }), 50);
            if (this.iframeReady = !0, this.setOnloadFrameRetryCounter = 0, this.bulkconsentsubmitted || this.checkForBulkConsent(), !this.mutationFallback)
                if (document.body)
                    if ("string" == typeof document.readyState) {
                        if ("complete" !== document.readyState) return void setTimeout((function() {
                            that.setOnload()
                        }), 100);
                        setTimeout((function() {
                            that.triggerOnloadEvents()
                        }), 1)
                    } else setTimeout((function() {
                        that.triggerOnloadEvents()
                    }), 500);
            else window.addEventListener("load", that.triggerOnloadEvents.bind(that), !1);
            this.initWidget()
        }, this.triggerOnloadEvents = function() {
            if (!this.versionChecked && this.retryCounter < 10) this.retryCounter += 1, setTimeout((function() {
                window.CookieConsent.triggerOnloadEvents()
            }), 100);
            else {
                if (this.retryCounter = 0, this.loaded = !0, this.version < this.latestVersion) return this.isNewVersion = !0, this.removeCookies(), this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.consent.method = null, this.hasResponse = !1, this.consented = !1, this.declined = !1, this.changed = !0, void 0 !== window.CookieDeclaration && "function" == typeof window.CookieDeclaration.SetUserStatusLabel && window.CookieDeclaration.SetUserStatusLabel(), window.CookieConsent.applyDisplay(), void this.show();
                var event;
                if (window.CookieConsent.applyDisplay(), void 0 !== window.CookieDeclaration && "function" == typeof window.CookieDeclaration.SetUserStatusLabel && window.CookieDeclaration.SetUserStatusLabel(), window.CookieConsent.onload && window.CookieConsent.onload(), "function" == typeof window.CookiebotCallback_OnLoad ? window.CookiebotCallback_OnLoad() : "function" == typeof window.CookieConsentCallback_OnLoad && window.CookieConsentCallback_OnLoad(), event = document.createEvent("Event"), event.initEvent("CookiebotOnLoad", !0, !0), window.dispatchEvent(event), event = document.createEvent("Event"), event.initEvent("CookieConsentOnLoad", !0, !0), window.dispatchEvent(event), this.changed && this.triggerGTMEvents(), window.CookieConsent.consented ? (window.CookieConsent.onaccept && window.CookieConsent.onaccept(), "function" == typeof window.CookiebotCallback_OnAccept ? window.CookiebotCallback_OnAccept() : "function" == typeof window.CookieConsentCallback_OnAccept && window.CookieConsentCallback_OnAccept(), event = document.createEvent("Event"), event.initEvent("CookiebotOnAccept", !0, !0), window.dispatchEvent(event), event = document.createEvent("Event"), event.initEvent("CookieConsentOnAccept", !0, !0), window.dispatchEvent(event), window.CookieConsent.runScripts()) : (window.CookieConsent.ondecline && window.CookieConsent.ondecline(), "function" == typeof window.CookiebotCallback_OnDecline ? window.CookiebotCallback_OnDecline() : "function" == typeof window.CookieConsentCallback_OnDecline && window.CookieConsentCallback_OnDecline(), event = document.createEvent("Event"), event.initEvent("CookiebotOnDecline", !0, !0), window.dispatchEvent(event), event = document.createEvent("Event"), event.initEvent("CookieConsentOnDecline", !0, !0), window.dispatchEvent(event)), window.CookieConsent.signalConsentFramework(), this.iframe && !this.consented && !this.declined) {
                    var currentHost = window.location.hostname.toLowerCase(),
                        althost = currentHost;
                    althost = 0 === currentHost.indexOf("www.") ? althost.substring(4) : "www." + althost, this.bulkresetdomains = this.bulkresetdomains.filter((function(item) {
                        return item !== currentHost && item !== althost
                    })), this.updateBulkStorage()
                }
            }
        }, this.getGTMDataLayer = function() {
            return null == window[this.dataLayerName] && (window[this.dataLayerName] = []), Array.isArray(window[this.dataLayerName]) ? window[this.dataLayerName] : []
        }, this.triggerGTMEvents = function() {
            this.consent.preferences && this.getGTMDataLayer().push({
                event: "cookie_consent_preferences"
            }), this.consent.statistics && this.getGTMDataLayer().push({
                event: "cookie_consent_statistics"
            }), this.consent.marketing && this.getGTMDataLayer().push({
                event: "cookie_consent_marketing"
            })
        }, this.signalGoogleConsentAPI = function(googleConsentModeDisabled, dataRedactionMode, consentPreferences, consentStatistics, consentMarketing) {
            googleConsentModeDisabled || (this.pushGoogleConsent("consent", "update", {
                ad_storage: consentMarketing ? "granted" : "denied",
                analytics_storage: consentStatistics ? "granted" : "denied",
                functionality_storage: consentPreferences ? "granted" : "denied",
                personalization_storage: consentPreferences ? "granted" : "denied",
                security_storage: "granted"
            }), "dynamic" === dataRedactionMode && this.pushGoogleConsent("set", "ads_data_redaction", !consentMarketing), this.getGTMDataLayer().push({
                event: "cookie_consent_update"
            }))
        }, this.pushGoogleConsent = function gtag() {
            this.getGTMDataLayer().push(arguments)
        }, this.show = function(isRenewal) {
            isRenewal || (this.forceShow = !0), this.cookieEnabled ? (this.hasResponse = !1, this.process(isRenewal)) : isRenewal && alert("Please enable cookies in your browser to proceed.")
        }, this.hide = function() {
            "object" == typeof window.CookieConsentDialog && window.CookieConsentDialog.hide(!0)
        }, this.renew = function() {
            this.isRenewal = !0, this.show(!0), setTimeout((function() {
                "object" == typeof window.CookieConsentDialog && "inlineoptin" === window.CookieConsentDialog.responseMode && window.CookieConsentDialog.toggleDetails()
            }), 300)
        }, this.getURLParam = function(paramName) {
            var d = document.getElementById(this.scriptId) || this.scriptElement,
                urlParam = "";
            return d && (paramName = new RegExp("[?&]" + encodeURIComponent(paramName) + "=([^&#]*)").exec(d.src), paramName && (urlParam = decodeURIComponent(paramName[1].replace(/\+/g, " ")))), urlParam
        }, this.getDomainUrlParam = function(paramName) {
            var url = window.location.href;
            paramName = paramName.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            return results ? results[2] ? decodeURIComponent(results[2].replace(/\+/g, " ")) : "" : null
        }, this.process = function(isRenewal) {
            createBanner(this, isRenewal).then((function() {
                window.CookieConsentDialog && window.CookieConsentDialog.init(), window.CookieConsent.changed = !0
            }))
        }, this.getCookie = function(name) {
            var consentCookieValue = "",
                documentCookies = document.cookie,
                cookie = void 0,
                i, x, y, l = documentCookies.split(";");
            for (i = 0; i < l.length; i++) x = l[i].substr(0, l[i].indexOf("=")), y = l[i].substr(l[i].indexOf("=") + 1), x = x.replace(/^\s+|\s+$/g, ""), x === name && (name === this.name && documentCookies.split(name).length - 1 > 1 ? (y.length > consentCookieValue.length || "0" === y) && (consentCookieValue = y) : cookie = unescape(y));
            return "" !== consentCookieValue && (cookie = unescape(consentCookieValue)), cookie
        }, this.setCookie = function(value, expiredate, path, domain, secure) {
            var isSecure = "https:" === window.location.protocol;
            secure && (isSecure = secure);
            var cookieDef = this.name + "=" + value + (expiredate ? ";expires=" + expiredate.toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (isSecure ? ";secure" : "");
            document.cookie = cookieDef
        }, this.removeCookies = function() {
            for (var cookies = document.cookie.split(";"), path = window.location.pathname.split("/"), hostname = window.location.hostname, isWwwDomain = "www" === hostname.substring(0, 3), i = 0; i < cookies.length; i++) {
                var cookie = cookies[i],
                    nameEndPos = cookie.indexOf("="),
                    name = nameEndPos > -1 ? cookie.substr(0, nameEndPos) : cookie;
                name = name.replace(/^\s*/, "").replace(/\s*$/, "");
                for (var isWhiteListed = !1, j = 0; j < this.whitelist.length; j++)
                    if (this.whitelist[j] === name) {
                        isWhiteListed = !0;
                        break
                    }
                if (!isWhiteListed && name !== this.name) {
                    var pathString = ";path=",
                        expireString = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT",
                        domainString = ";domain=";
                    document.cookie = name + expireString;
                    for (var k = 0; k < path.length; k++) pathString += ("/" !== pathString.substr(-1) ? "/" : "") + path[k], document.cookie = name + expireString + pathString, document.cookie = name + expireString + pathString + ";domain=" + escape(hostname), document.cookie = name + expireString + pathString + ";domain=." + escape(hostname), document.cookie = name + expireString + pathString + ";domain=" + escape(this.getRootDomain(hostname)), document.cookie = name + expireString + pathString + ";domain=." + escape(this.getRootDomain(hostname)), isWwwDomain && (document.cookie = name + expireString + pathString + ";domain=" + escape(hostname.substring(3)))
                }
                if (!isStorageSupported()) return;
                localStorage.clear(), sessionStorage.clear()
            }
        }, this.getRootDomain = function(domain) {
            var rootDomain = domain;
            if (domain.length > 0) {
                var sections = rootDomain.split(".");
                rootDomain.length > 1 && (rootDomain = sections.slice(-2).join("."))
            }
            return rootDomain
        }, this.resetCookies = function() {
            var self = this,
                resetForCookieTable = function(cookieTable) {
                    cookieTable.forEach((function(cookie) {
                        var cookieName = cookie[0],
                            cookieStorageType = cookie[5],
                            cookieNameRegEx = cookie[6];
                        switch (cookieStorageType) {
                            case "1":
                                self.removeCookieHTTP(cookieName, cookieNameRegEx);
                                break;
                            case "2":
                                self.removeCookieLocalStorage(cookieName, cookieNameRegEx)
                        }
                    }))
                },
                cookieIndex = this.dialog || this.cookieList;
            null != cookieIndex && (!this.consent.preferences && this.wipe.preferences && resetForCookieTable(cookieIndex.cookieTablePreference), !this.consent.statistics && this.wipe.statistics && resetForCookieTable(cookieIndex.cookieTableStatistics), !this.consent.marketing && this.wipe.marketing && resetForCookieTable(cookieIndex.cookieTableAdvertising), resetForCookieTable(cookieIndex.cookieTableUnclassified))
        }, this.removeCookieHTTP = function(cookiename, cookieregex) {
            for (var cookies = document.cookie.split(";"), path = window.location.pathname.split("/"), hostname = window.location.hostname, isWwwDomain = "www" === hostname.substring(0, 3), i = 0; i < cookies.length; i++) {
                var cookie = cookies[i],
                    nameEndPos = cookie.indexOf("="),
                    name = nameEndPos > -1 ? cookie.substr(0, nameEndPos) : cookie;
                name = name.replace(/^\s*/, "").replace(/\s*$/, "");
                var isNameMatch = !1;
                if ("" === cookieregex ? name === cookiename && (isNameMatch = !0) : isNameMatch = name.match(cookieregex), isNameMatch && name !== this.name) {
                    var pathString = ";path=",
                        expireString = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT",
                        domainString = ";domain=";
                    document.cookie = name + expireString;
                    for (var j = 0; j < path.length; j++) pathString += ("/" !== pathString.substr(-1) ? "/" : "") + path[j], document.cookie = name + expireString + pathString, document.cookie = name + expireString + pathString + ";domain=" + escape(hostname), document.cookie = name + expireString + pathString + ";domain=." + escape(hostname), document.cookie = name + expireString + pathString + ";domain=" + escape(this.getRootDomain(hostname)), document.cookie = name + expireString + pathString + ";domain=." + escape(this.getRootDomain(hostname)), isWwwDomain && (document.cookie = name + expireString + pathString + ";domain=" + escape(hostname.substring(3)))
                }
            }
        }, this.removeCookieLocalStorage = function(cookiename, cookieregex) {
            if (isStorageSupported())
                for (var keys = Object.keys(localStorage), i = 0; i < keys.length; i++) {
                    var name = keys[i],
                        isNameMatch = !1;
                    "" === cookieregex ? name === cookiename && (isNameMatch = !0) : isNameMatch = name.match(cookieregex), isNameMatch && (localStorage.removeItem(name), "undefined" != typeof sessionStorage && sessionStorage.removeItem(name))
                }
        }, this.withdraw = function() {
            this.consented = !1, this.declined = !1, this.hasResponse = !1, this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.consent.method = "explicit", this.changed = !0, void 0 !== window.CookieDeclaration && "function" == typeof window.CookieDeclaration.SetUserStatusLabel && window.CookieDeclaration.SetUserStatusLabel(), window.CookieConsent.ondecline(), "function" == typeof window.CookiebotCallback_OnDecline ? window.CookiebotCallback_OnDecline() : "function" == typeof window.CookieConsentCallback_OnDecline && window.CookieConsentCallback_OnDecline(), window.CookieConsent.applyDisplay();
            var pathUrlString = "";
            this.pathlist.length > 0 && (pathUrlString = "&path=" + encodeURIComponent(this.pathlist.join(",")));
            var hasCookieData = null != this.dialog;
            if (this.hasFramework && this.frameworkLoaded && "iabv2" === this.framework.toLowerCase() && !this.frameworkBlocked) "object" == typeof window.CookieConsentIABCMP && window.CookieConsentIABCMP.withdrawConsent(), window.__tcfapi("getTCData", 2, (function(result) {
                result.tcString ? window.CookieConsent.IABConsentString = result.tcString : window.CookieConsent.IABConsentString = "", "object" == typeof window.CookieConsentIABCMP && window.CookieConsentIABCMP.encodeGACMString && result.addtlConsent ? window.CookieConsent.GACMConsentString = window.CookieConsentIABCMP.encodeGACMString(result.addtlConsent) : window.CookieConsent.GACMConsentString = "", pathUrlString += "&iab2=" + window.CookieConsent.IABConsentString + "&gacm=" + window.CookieConsent.GACMConsentString;
                var logConsentUrl = window.CookieConsent.host + "logconsent.ashx?action=decline&nocache=" + (new Date).getTime() + "&cbid=" + window.CookieConsent.serial + pathUrlString + "&lifetime=" + window.CookieConsent.optOutLifetime + "&cbt=" + window.CookieConsent.responseMode + "&hasdata=" + hasCookieData + "&method=strict&referer=" + encodeURIComponent(window.location.protocol + "//" + window.location.hostname),
                    truncatedLogConsentUrl = getTruncatedString(logConsentUrl, 4096);
                window.CookieConsent.getScript(truncatedLogConsentUrl)
            }));
            else {
                var logConsentUrl = this.host + "logconsent.ashx?action=decline&nocache=" + (new Date).getTime() + "&cbid=" + this.serial + pathUrlString + "&lifetime=" + this.optOutLifetime + "&cbt=" + window.CookieConsent.responseMode + "&hasdata=" + hasCookieData + "&method=strict&referer=" + encodeURIComponent(window.location.protocol + "//" + window.location.hostname),
                    truncatedLogConsentUrl = getTruncatedString(logConsentUrl, 4096);
                this.getScript(truncatedLogConsentUrl)
            }
        }, this.setOutOfRegion = function(countryCode, consentVersion) {
            this.isOutsideEU = !0, this.isOutOfRegion = !0, this.hasResponse = !0, this.declined = !1, this.consented = !0, this.consent.preferences = !0, this.consent.statistics = !0, this.consent.marketing = !0, this.consent.method = "implied";
            var countryFragment = "";
            countryCode && (this.userCountry = countryCode, countryFragment = "%2Cregion:%27" + countryCode + "%27"), this.changed = !0, this.version = this.latestVersion, consentVersion && (this.version = this.latestVersion = consentVersion), this.updateRegulations(), this.consent.stamp = "-1";
            var expireMonths = 1,
                expirationDate = (new window.CookieControl.DateTime).addMonths(1);
            if (this.hasFramework && "iabv2" === this.framework.toLowerCase() && !this.frameworkBlocked) {
                if (!this.frameworkLoaded) return void setTimeout((function() {
                    window.CookieConsent.setOutOfRegion(countryCode)
                }), 50);
                window.CookieConsentIABCMP.updateConsentFullOptIn(), window.__tcfapi("getTCData", 2, (function(result) {
                    result.tcString ? window.CookieConsent.IABConsentString = result.tcString : window.CookieConsent.IABConsentString = "";
                    var IABconsentFragment = "%2Ciab2:%27" + window.CookieConsent.IABConsentString + "%27";
                    "object" == typeof window.CookieConsentIABCMP && window.CookieConsentIABCMP.encodeGACMString && result.addtlConsent ? (window.CookieConsent.GACMConsentString = window.CookieConsentIABCMP.encodeGACMString(result.addtlConsent), IABconsentFragment += "%2Cgacm:%27" + window.CookieConsent.GACMConsentString + "%27") : window.CookieConsent.GACMConsentString = "", window.CookieConsent.setCookie("{stamp:%27" + window.CookieConsent.consent.stamp + "%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:" + window.CookieConsent.version + "%2Cutc:" + (new Date).getTime() + IABconsentFragment + countryFragment + "}", expirationDate, "/")
                }))
            } else this.setCookie("{stamp:%27" + this.consent.stamp + "%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:" + this.version + "%2Cutc:" + (new Date).getTime() + countryFragment + "}", expirationDate, "/");
            this.setHeaderStyles(), this.signalGoogleConsentAPI(this.consentModeDisabled, this.consentModeDataRedaction, this.consent.preferences, this.consent.statistics, this.consent.marketing), this.setOnload()
        }, this.isSpider = function() {
            return !this.botDetectionDisabled && /adidxbotc|Applebot\/|archive.org_bot|asterias\/|Baiduspider\/|bingbot\/|BingPreview\/|DuckDuckBot\/|FAST-WebCrawler\/|Feedspot|Feedspotbot\/|Google Page Speed Insights|Google PP|Google Search Console|Google Web Preview|Googlebot\/|Googlebot-Image\/|Googlebot-Mobile\/|Googlebot-News|Googlebot-Video\/|Google-SearchByImage|Google-Structured-Data-Testing-Tool|Chrome-Lighthouse|heritrix\/|iaskspider\/|Mediapartners-Google|msnbot\/|msnbot-media\/|msnbot-NewsBlogs\/|msnbot-UDiscovery\/|PTST\/|SEMrushBot|special_archiver\/|Siteimprove|Y!J-ASR\/|Y!J-BRI\/|Y!J-BRJ\/YATS|Y!J-BRO\/YFSJ|Y!J-BRW\/|Y!J-BSC\/|Yahoo! Site Explorer Feed Validator|Yahoo! Slurp|YahooCacheSystem|Yahoo-MMCrawler\/|YahooSeeker\/|aabot\/|compatible; aa\/|PetalBot\/|Prerender\/|webvitals.dev/.test(navigator.userAgent)
        }, this.getScript = function(url, async, callback) {
            var h = document.getElementsByTagName("script")[0],
                s = document.createElementOrig("script");
            s.type = "text/javascript", s.charset = "UTF-8";
            var doAsyncLoad = !0;
            void 0 === async || async || (doAsyncLoad = !1), doAsyncLoad && (s.async = "async"), s.src = url, s.onload = s.onreadystatechange = function(_, isAbort) {
                (isAbort || !s.readyState || /loaded|complete/.test(s.readyState)) && (s.onload = s.onreadystatechange = null, isAbort || callback && callback())
            }, s.onerror = function() {
                if (callback) try {
                    callback()
                } catch (e) {}
            }, h && h.parentNode ? h.parentNode.insertBefore(s, h) : document.head.appendChild(s)
        }, this.fetchJsonData = fetchJsonData, this.loadIframe = function(iframeID, iframeSrc) {
            var customFrame = document.getElementById(iframeID);
            customFrame && (customFrame.src = iframeSrc)
        }, this.setDNTState = function() {
            "yes" === navigator.doNotTrack || "1" === navigator.msDoNotTrack || "1" === navigator.doNotTrack || !1 === this.cookieEnabled || !1 === navigator.cookieEnabled ? this.doNotTrack = !0 : this.doNotTrack = !1
        }, this.setHeaderStyles = function() {
            var styleObjectID = "CookieConsentStateDisplayStyles",
                styleObject = document.getElementById(styleObjectID);
            styleObject && styleObject.parentNode.removeChild(styleObject);
            var head = document.head;
            if (head) {
                var s = document.createElement("style");
                s.setAttribute("type", "text/css"), s.id = styleObjectID;
                var newstylesheet = "";
                if (this.consented) {
                    var optins = [],
                        optouts = [];
                    optins.push(".cookieconsent-optin"), this.consent.preferences ? (optins.push(".cookieconsent-optin-preferences"), optouts.push(".cookieconsent-optout-preferences")) : (optouts.push(".cookieconsent-optin-preferences"), optins.push(".cookieconsent-optout-preferences")), this.consent.statistics ? (optins.push(".cookieconsent-optin-statistics"), optouts.push(".cookieconsent-optout-statistics")) : (optouts.push(".cookieconsent-optin-statistics"), optins.push(".cookieconsent-optout-statistics")), this.consent.marketing ? (optins.push(".cookieconsent-optin-marketing"), optouts.push(".cookieconsent-optout-marketing")) : (optouts.push(".cookieconsent-optin-marketing"), optins.push(".cookieconsent-optout-marketing")), optouts.push(".cookieconsent-optout"), newstylesheet = optins.join() + "{display:block;display:initial;}" + optouts.join() + "{display:none;}"
                } else newstylesheet = ".cookieconsent-optin-preferences,.cookieconsent-optin-statistics,.cookieconsent-optin-marketing,.cookieconsent-optin", newstylesheet += "{display:none;}", newstylesheet += ".cookieconsent-optout-preferences,.cookieconsent-optout-statistics,.cookieconsent-optout-marketing,.cookieconsent-optout", newstylesheet += "{display:block;display:initial;}";
                s.styleSheet ? s.styleSheet.cssText = newstylesheet : s.appendChild(document.createTextNode(newstylesheet)), head.appendChild(s)
            }
        }, this.submitConsent = function(isImpliedConsent, consentURL, loadAsync) {
            "object" == typeof window.CookieConsentDialog && (this.changed = !0, window.CookieConsentDialog.submitConsent(isImpliedConsent, consentURL, loadAsync))
        }, this.submitCustomConsent = function(optinPreferences, optinStatistics, optinMarketing, isImpliedConsent) {
            if (!this.hasFramework || this.frameworkLoaded || this.frameworkBlocked) {
                var finalConsentURL = window.location.protocol + "//" + window.location.hostname,
                    responseMode = window.CookieConsent.responseMode,
                    logConsentMethod = isImpliedConsent ? "implied" : "strict";
                this.consented = !0, this.declined = !1, this.hasResponse = !0, this.consent.preferences = !1, this.consent.statistics = !1, this.consent.marketing = !1, this.consent.method = isImpliedConsent ? "implied" : "explicit", optinPreferences && (this.consent.preferences = !0), optinStatistics && (this.consent.statistics = !0), optinMarketing && (this.consent.marketing = !0), this.dialog && "custom" === this.dialog.template || (responseMode = "none"), void 0 !== window.CookieDeclaration && "function" == typeof window.CookieDeclaration.SetUserStatusLabel && window.CookieDeclaration.SetUserStatusLabel();
                var dnt = "false";
                this.doNotTrack && (dnt = "true");
                var asyncload = !0,
                    pathUrlString = "";
                this.pathlist.length > 0 && (pathUrlString = "&path=" + encodeURIComponent(this.pathlist.join(",")));
                var bulkTicket = "",
                    hasCookieData = null != this.dialog;
                if (this.hasFramework && this.frameworkLoaded && "iabv2" === this.framework.toLowerCase() && !this.frameworkBlocked) window.__tcfapi("getTCData", 2, (function(result) {
                    result.tcString ? window.CookieConsent.IABConsentString = result.tcString : window.CookieConsent.IABConsentString = "", "object" == typeof window.CookieConsentIABCMP && window.CookieConsentIABCMP.encodeGACMString && result.addtlConsent ? window.CookieConsent.GACMConsentString = window.CookieConsentIABCMP.encodeGACMString(result.addtlConsent) : window.CookieConsent.GACMConsentString = "", pathUrlString += "&iab2=" + window.CookieConsent.IABConsentString + "&gacm=" + window.CookieConsent.GACMConsentString;
                    var logConsentUrl = window.CookieConsent.host + "logconsent.ashx?action=accept&nocache=" + (new Date).getTime() + "&dnt=" + dnt + "&clp=" + window.CookieConsent.consent.preferences + "&cls=" + window.CookieConsent.consent.statistics + "&clm=" + window.CookieConsent.consent.marketing + "&cbid=" + window.CookieConsent.serial + pathUrlString + "&cbt=" + responseMode + "&ticket=&bulk=" + this.isbulkrenewal + "&hasdata=" + hasCookieData + "&method=" + logConsentMethod + "&referer=" + encodeURIComponent(finalConsentURL),
                        truncatedLogConsentUrl = getTruncatedString(logConsentUrl, 4096);
                    window.CookieConsent.getScript(truncatedLogConsentUrl, true)
                }));
                else {
                    var logConsentUrl = this.host + "logconsent.ashx?action=accept&nocache=" + (new Date).getTime() + "&dnt=" + dnt + "&clp=" + this.consent.preferences + "&cls=" + this.consent.statistics + "&clm=" + this.consent.marketing + "&cbid=" + this.serial + pathUrlString + "&cbt=" + responseMode + "&ticket=&bulk=" + this.isbulkrenewal + "&hasdata=" + hasCookieData + "&method=" + logConsentMethod + "&referer=" + encodeURIComponent(finalConsentURL),
                        truncatedLogConsentUrl = getTruncatedString(logConsentUrl, 4096);
                    this.getScript(truncatedLogConsentUrl, true)
                }
                "object" == typeof window.CookieConsentDialog && "function" == typeof window.CookieConsentDialog.releaseBannerFocus && window.CookieConsentDialog.releaseBannerFocus()
            } else setTimeout((function() {
                window.CookieConsent.submitCustomConsent(optinPreferences, optinStatistics, optinMarketing)
            }), 5)
        }, this.isGUID = function(objGuid) {
            var guidSyntax = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/;
            return !!(objGuid.length > 0 && guidSyntax.test(objGuid))
        }, this.hashCode = hashCode, this.tagHash = tagHash, this.initMutationObserver = function() {
            initMutationObserver(window, document, this)
        }, this.overrideEventListeners = function() {
            overrideEventListeners(this)
        }, this.isInternalEventListener = function(type, node, callback) {
            var that = this,
                result = !1;
            return ("beforescriptexecute" === type && void 0 !== node.origOuterHTML || node === this.iframe || callback === this.cbonloadevent || callback === this.triggerOnloadEvents || callback === this.handleMessage || callback === this.readBulkConsent || callback === this.submitImpliedConsent || callback === this.signalWindowLoad || void 0 !== node.CB_isClone && ("load" === type || "error" === type)) && (result = !0), result
        }, this.stopOverrideEventListeners = function() {
            stopOverrideEventListeners(window, this)
        }, this.OverrideEventListenersOnloadFired = [], this.OverrideEventListenersOnloadToFire = [], this.applyOverrideEventListeners = function() {
            for (var i = 0; i < this.mutationOnloadEventListeners.length; i++) try {
                var eventElement = this.mutationOnloadEventListeners[i];
                if (eventElement.target && null != eventElement.target && void 0 !== eventElement.target)
                    if (eventElement.target.addEventListenerBase(eventElement.type, eventElement.listener, eventElement.options), !window.CookieConsent.windowOnloadTriggered || eventElement.target !== window && eventElement.target !== document) {
                        if (eventElement.target !== window && eventElement.target !== document) try {
                            var evt = document.createEvent("Event");
                            evt.initEvent(eventElement.type, !0, !0), eventElement.target.dispatchEvent(evt)
                        } catch (e) {}
                    } else {
                        var targetID = eventElement.target.toString() + eventElement.type.toString();
                        window.CookieConsent.OverrideEventListenersOnloadFired.indexOf(targetID) < 0 && (window.CookieConsent.OverrideEventListenersOnloadFired.push(targetID), window.CookieConsent.OverrideEventListenersOnloadToFire.push({
                            target: eventElement.target,
                            type: eventElement.type
                        }))
                    }
            } catch (e) {}
            for (var j = 0; j < window.CookieConsent.OverrideEventListenersOnloadToFire.length; j++) try {
                var overrideEvt = document.createEvent("Event");
                overrideEvt.initEvent(window.CookieConsent.OverrideEventListenersOnloadToFire[j].type, !0, !0), window.CookieConsent.OverrideEventListenersOnloadToFire[j].target.dispatchEvent(overrideEvt)
            } catch (e) {}!window.CookieConsent.windowOnloadTriggered || "function" != typeof window.onload || null != document.body.getAttribute("onload") && document.body.onload === window.onload || window.onload(), this.mutationOnloadEventListeners = []
        }, this.cloneEventListeners = function(node, clone) {
            for (var j = 0; j < this.mutationEventListeners.length; j++) this.mutationEventListeners[j].target === node && clone.addEventListenerBase(this.mutationEventListeners[j].type, this.mutationEventListeners[j].listener, this.mutationEventListeners[j].options)
        }, this.downloadConfiguration = function() {
            var CDNPathFragment = this.currentPath;
            CDNPathFragment.length > 0 ? (0 !== CDNPathFragment.indexOf("/") && (CDNPathFragment = "/" + CDNPathFragment), CDNPathFragment.lastIndexOf("/") !== CDNPathFragment.length - 1 && (CDNPathFragment += "/")) : CDNPathFragment = "/";
            var ASCIIOnlyDomain = this.domain;
            if (0 !== ASCIIOnlyDomain.indexOf("xn--")) {
                var regex = /[^\u0020-\u007E]/gi;
                ASCIIOnlyDomain = this.domain.replace(regex, "-")
            }
            var configurationURL = this.CDN + "/consentconfig/" + this.serial.toLowerCase() + "/" + ASCIIOnlyDomain + CDNPathFragment + "configuration.js";
            this.configuration.tags = [], this.getScript(configurationURL, !1, (function() {
                if (loadInlineTagConfiguration(window.CookieConsent), window.CookieConsent.configuration.loaded = !0, 0 === window.CookieConsent.configuration.trackingDomains.length)
                    for (var j = 0; j < window.CookieConsent.configuration.tags.length; j++) {
                        var currentTag = window.CookieConsent.configuration.tags[j];
                        if (currentTag.resolvedUrl && "" !== currentTag.resolvedUrl) {
                            var currentDomain = window.CookieConsent.getHostnameFromURL(currentTag.resolvedUrl);
                            "" !== currentDomain && currentDomain !== window.location.hostname && window.CookieConsent.configuration.trackingDomains.push({
                                d: currentDomain,
                                c: currentTag.cat
                            })
                        }
                    }
            }))
        }, this.initWidget = function() {
            var that = this,
                hasWidgetEnabledOverride = this.widget && null != this.widget.enabledOverride;
            if (!this.isOutOfRegion && this.hasResponse && this.cookieEnabled && (!hasWidgetEnabledOverride || this.widget.enabledOverride))
                if (this.widget = this.widget || {}, this.widget.configuration) initWidgetInternal();
                else {
                    var url = this.CDN + "/consentconfig/" + this.serial.toLowerCase() + "/settings.json";

                    function fetchSettingsCallback(data) {
                        data && data.widget && (that.widget.configuration = data.widget, initWidgetInternal())
                    }
                    this.fetchJsonData(url, fetchSettingsCallback, fetchSettingsCallback)
                }
            function initWidgetInternal() {
                var widgetConfig = that.widget.configuration,
                    enabled = widgetConfig && (hasWidgetEnabledOverride || widgetConfig.enabled);
                enabled && !that.widget.loaded && window.CookieConsent.getScript(createWidgetIconUrl(that.host), !0, (function() {
                    that.widget.loaded = !0
                }))
            }
        }, this.logWidgetAttributeWarning = function(attribute, value) {
            var supportUrl = "https://support.cookiebot.com/hc/en-us/articles/4406571299346";
            console.warn("Cookiebot: Cookiebot script attribute '%s' with value  '%s' is invalid. For more information about valid options see %s", attribute, value, supportUrl)
        }, this.mutationHandler = function(mutationsList, mutationObserver) {
            mutationHandler(window, document, mutationsList)
        }, this.preloadMutationScript = function(src) {
            var preloadLink = document.createElementOrig("link");
            preloadLink.href = src, preloadLink.rel = "preload", preloadLink.as = "script", preloadLink.CB_isClone = 1, document.head.appendChild(preloadLink)
        }, this.processMutation = function(node, isPostPoned) {
            processMutation(this, node, isPostPoned)
        }, this.isCookiebotNode = function(node) {
            return isCookiebotNode(this, node)
        }, this.isCookiebotCoreNode = function(node) {
            return this.isCookiebotNode(node) && node.src.indexOf("/uc.js") > -1
        }, this.postponeMutation = function(node) {
            postponeMutation(window, this, node)
        }, this.processPostPonedMutations = function() {
            processPostPonedMutations(this)
        }, this.dequeueNonAsyncScripts = function(mutationNodes) {
            dequeueNonAsyncScripts(this, mutationNodes)
        }, this.getTagCookieCategories = function(outerhtml, tagURL, node, matchCommon) {
            return getTagCookieCategories(window, this, outerhtml, tagURL, node, matchCommon)
        }, this.cookieCategoriesFromNumberArray = cookieCategoriesFromNumberArray, this.stopMutationObserver = function() {
            stopMutationObserver(window, this)
        }, this.mutationHandlerFallback = function(charset) {
            mutationHandlerFallback(this, document, charset)
        }, this.mutationHandlerFallbackInit = function(content) {
            mutationHandlerFallbackInit(window, this, document, content)
        }, this.fallbackScriptNodes = [], this.fallbackDeferNodes = [], this.startJQueryHold = function() {
            void 0 !== window.jQuery && void 0 === window.CB_jQueryHoldReadyStarted && void 0 !== window.jQuery.holdReady && (window.CB_jQueryHoldReadyStarted = 1, window.CookieConsent.holdReadyClone = jQuery.holdReady, window.CookieConsent.holdReadyClone(!0))
        }, this.endJQueryHold = function() {
            void 0 !== window.jQuery && void 0 !== window.CB_jQueryHoldReadyStarted && void 0 !== window.CookieConsent.holdReadyClone && window.CookieConsent.holdReadyClone(!1)
        }, this.loadFallbackScriptNodes = function(mutationNodes) {
            loadFallbackScriptNodes(window, this, document, mutationNodes)
        }, this.mutationHandlerFallbackMarkupTag = function(doc, nodeType) {
            mutationHandlerFallbackMarkupTag(window, this, doc, nodeType)
        }, this.resolveURL = resolveURL, this.getHostnameFromURL = getHostnameFromURL, this.updateRegulations = function() {
            if ("" !== this.userCountry) {
                var lowercaseCountry = this.userCountry.toLowerCase();
                this.regulations.gdprApplies = this.regulationRegions.gdpr.indexOf(lowercaseCountry) >= 0, this.regulations.ccpaApplies = this.regulationRegions.ccpa.indexOf(lowercaseCountry) >= 0, this.regulations.lgpdApplies = this.regulationRegions.lgpd.indexOf(lowercaseCountry) >= 0
            } else this.regulations.gdprApplies = !1, this.regulations.ccpaApplies = !1, this.regulations.lgpdApplies = !1;
            this.hasFramework && this.frameworkLoaded && "iabv2" === this.framework.toLowerCase() && !this.frameworkBlocked && "object" == typeof window.CookieConsentIABCMP && window.CookieConsentIABCMP.updateFramework && window.CookieConsentIABCMP.gdprApplies !== this.regulations.gdprApplies && window.CookieConsentIABCMP.updateFramework()
        }, this.signalConsentReady = function() {
            setTimeout((function() {
                var event = document.createEvent("Event");
                event.initEvent("CookiebotOnConsentReady", !0, !0), window.dispatchEvent(event), event = document.createEvent("Event"), event.initEvent("CookieConsentOnConsentReady", !0, !0), window.dispatchEvent(event)
            }), 1)
        }, this.init()
    }, window.CookieControl.Cookie.prototype.onload = function() {}, window.CookieControl.Cookie.prototype.ondecline = function() {}, window.CookieControl.Cookie.prototype.onaccept = function() {}, window.CookieControl.DateTime = function(initdate) {
        this.Date = new Date, initdate && (this.Date = new Date(initdate)), this.isLeapYear = function(year) {
            return year % 4 == 0 && year % 100 != 0 || year % 400 == 0
        }, this.getDaysInMonth = function(year, month) {
            return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        }, this.addMonths = function(monthcount) {
            var n = this.Date.getDate();
            return this.Date.setDate(1), this.Date.setMonth(this.Date.getMonth() + monthcount), this.Date.setDate(Math.min(n, this.getDaysInMonth(this.Date.getFullYear(), this.Date.getMonth()))), this.Date
        }
    }, window.__uspapi = uspapi, window.addUspapiLocatorFrame = addUspapiLocatorFrame, window.addUspapiLocatorFrame(), window.__handleUspapiMessage = handleUspapiMessage, window.addEventListener("message", window.__handleUspapiMessage, !1), window.propagateIABStub = function() {
        function postMessageEventHandler(event) {
            var msgIsString = "string" == typeof event.data,
                json = {};
            try {
                json = msgIsString ? JSON.parse(event.data) : event.data
            } catch (ignore) {}
            var payload = json && json.__tcfapiCall;
            payload && window.__tcfapi(payload.command, payload.version, (function(retValue, success) {
                var returnMsg = {
                    __tcfapiReturn: {
                        returnValue: retValue,
                        success: success,
                        callId: payload.callId
                    }
                };
                msgIsString && (returnMsg = JSON.stringify(returnMsg)), event && event.source && event.source.postMessage && event.source.postMessage(returnMsg, "*")
            }), payload.parameter)
        }
        var TCF_LOCATOR_NAME = "__tcfapiLocator",
            queue = [],
            win = window,
            cmpFrame;

        function addFrame() {
            var doc = win.document,
                otherCMP = !!win.frames.__tcfapiLocator;
            if (!otherCMP)
                if (doc.body) {
                    var iframe = doc.createElement("iframe");
                    iframe.style.cssText = "display:none", iframe.name = TCF_LOCATOR_NAME, doc.body.appendChild(iframe)
                } else setTimeout(addFrame, 5);
            return !otherCMP
        }

        function tcfAPIHandler() {
            for (var args = [], i = 0, gdprApplies; i < arguments.length; i++) args.push(arguments[i]);
            if (!args.length) return queue;
            if ("setGdprApplies" === args[0]) args.length > 3 && 2 === parseInt(args[1], 10) && "boolean" == typeof args[3] && (gdprApplies = args[3], "function" == typeof args[2] && args[2]("set", !0));
            else if ("ping" === args[0]) {
                var retr = {
                    gdprApplies: gdprApplies,
                    cmpLoaded: !1,
                    cmpStatus: "stub"
                };
                "function" == typeof args[2] && args[2](retr)
            } else queue.push(args)
        }
        for (; win;) {
            try {
                if (win.frames.__tcfapiLocator) {
                    cmpFrame = win;
                    break
                }
            } catch (ignore) {}
            if (win === window.top) break;
            win = win.parent
        }
        cmpFrame || (addFrame(), win.__tcfapi = tcfAPIHandler, win.addEventListener("message", postMessageEventHandler, !1))
    }, "object" != typeof window.CookieConsent || window.CookieConsent && window.CookieConsent.nodeType ? (window.CookieConsent = new window.CookieControl.Cookie("CookieConsent"), "CookieConsent" !== window.CookieConsent.scriptId && "Cookiebot" !== window.CookieConsent.scriptId && (window[window.CookieConsent.scriptId] = window.CookieConsent)) : console.warn("WARNING: Cookiebot script is included twice - please remove one instance to avoid unexpected results.")
}();