(function ensightenInit() {
    var ensightenOptions = {
        client: "turner",
        clientId: 1511,
        publishPath: "adsm-prod",
        isPublic: 0,
        serverComponentLocation: "nexus.ensighten.com/turner/adsm-prod/serverComponent.php",
        staticJavascriptPath: "nexus.ensighten.com/turner/adsm-prod/code/",
        ns: 'Bootstrapper',
        nexus: "nexus.ensighten.com",
        scUseCacheBuster: "true",
        enableTagAuditBeacon: "false",
        enablePagePerfBeacon: "false",
        registryNs: "ensBootstraps",
        generatedOn: "Thu Jun 09 20:18:59 GMT 2016",
        beaconSamplingSeedValue: 11
    };
    if (!window[ensightenOptions.ns]) {
        window[ensightenOptions.registryNs] || (window[ensightenOptions.registryNs] = {});
        window[ensightenOptions.registryNs][ensightenOptions.ns] = window[ensightenOptions.ns] = function(g) {
            function m(a) {
                this.name = "DependencyNotAvailableException";
                this.message = "Dependency with id " + a + "is missing"
            }

            function n(a) {
                this.name = "BeaconException";
                this.message = "There was an error durring beacon initialization";
                a = a || {};
                this.lineNumber = a.lineNumber || a.line;
                this.fileName = a.fileName
            }

            function p() {
                for (var a = b.dataDefinitionIds.length, e = !0, d = 0; d < a; d++) {
                    var c = b.dataDefinitions[b.dataDefinitionIds[d]];
                    if (!c ||
                        null == c.endRegistration) {
                        e = !1;
                        break
                    }
                }
                e && b.callOnDataDefintionComplete()
            }
            var c = {},
                b = {};
            b.ensightenOptions = ensightenOptions;
            b.scDataObj = {};
            c.version = "1.26.0";
            c.nexus = g.nexus || "nexus.ensighten.com";
            c.rand = -1;
            c.currSec = (new Date).getSeconds();
            c.options = {
                interval: g.interval || 100,
                erLoc: g.errorLocation || c.nexus + "/error/e.gif",
                scLoc: g.serverComponentLocation || c.nexus + "/" + g.client + "/serverComponent.php",
                sjPath: g.staticJavascriptPath || c.nexus + "/" + g.client + "/code/",
                alLoc: g.alertLocation || c.nexus + "/alerts/a.gif",
                publishPath: g.publishPath,
                isPublic: g.isPublic,
                client: g.client,
                clientId: g.clientId,
                enableTagAuditBeacon: g.enableTagAuditBeacon,
                scUseCacheBuster: g.scUseCacheBuster,
                beaconSamplingSeedValue: g.beaconSamplingSeedValue || -1
            };
            c.ruleList = [];
            c.allDeploymentIds = [];
            c.runDeploymentIds = [];
            c.exceptionList = [];
            c.ensightenVariables = {};
            c.test = function(a) {
                if (!(a.executionData.hasRun || a.executionData.runTime && 0 < a.executionData.runTime.length)) {
                    for (var b = 0; b < a.dependencies.length; b++)
                        if (!1 === a.dependencies[b]()) return;
                    a.execute()
                }
            };
            m.prototype = Error();
            m.prototype || (m.prototype = {});
            m.prototype.constructor = m;
            c.DependencyNotAvailableException = m;
            n.prototype = Error();
            n.prototype || (n.prototype = {});
            n.prototype.constructor = n;
            c.BeaconException = n;
            c.checkForInvalidDependencies = function(a, e, d, l) {
                for (a = 0; a < d.length; a++)
                    if ("DEPENDENCYNEVERAVAILABLE" === d[a]) return b.currentRuleId = this.id, b.currentDeploymentId = this.deploymentId, b.reportException(new c.DependencyNotAvailableException(l[a])), e && -1 !== e && c.allDeploymentIds.push(e), !0;
                return !1
            };
            b.currentRuleId = -1;
            b.currentDeploymentId = -1;
            b.reportedErrors = [];
            b.reportedAlerts = [];
            b.AF = [];
            b._serverTime = "";
            b._clientIP = "";
            b.sampleBeacon = function() {
                var a = !1;
                try {
                    var b = (c.currSec || 0) % 20,
                        d = c.options.beaconSamplingSeedValue; - 1 === d ? a = !0 : 0 !== b && 0 === d % b && (a = !0)
                } catch (l) {}
                return a
            };
            b.getServerComponent = function(a) {
                b.callOnGetServerComponent();
                b.insertScript(window.location.protocol + "//" + c.options.scLoc, !1, a || !0, c.options.scUseCacheBuster)
            };
            b.setVariable = function(a, b) {
                c.ensightenVariables[a] =
                    b
            };
            b.getVariable = function(a) {
                return a in c.ensightenVariables ? c.ensightenVariables[a] : null
            };
            b.testAll = function() {
                for (var a = 0; a < c.ruleList.length; a++) c.test(c.ruleList[a])
            };
            b.executionState = {
                DOMParsed: !1,
                DOMLoaded: !1,
                dataDefinitionComplete: !1,
                conditionalRules: !1,
                readyForServerComponent: !1
            };
            b.reportException = function(a) {
                a.timestamp = (new Date).getTime();
                c.exceptionList.push(a);
                a = window.location.protocol + "//" + c.options.erLoc + "?msg=" + encodeURIComponent(a.message || "") + "&lnn=" + encodeURIComponent(a.lineNumber ||
                    a.line || -1) + "&fn=" + encodeURIComponent(a.fileName || "") + "&cid=" + encodeURIComponent(c.options.clientId || -1) + "&client=" + encodeURIComponent(c.options.client || "") + "&publishPath=" + encodeURIComponent(c.options.publishPath || "") + "&rid=" + encodeURIComponent(b.currentRuleId || -1) + "&did=" + encodeURIComponent(b.currentDeploymentId || -1) + "&errorName=" + encodeURIComponent(a.name || "");
                a = b.imageRequest(a);
                a.timestamp = (new Date).getTime();
                this.reportedErrors.push(a)
            };
            b.Rule = function(a) {
                this.execute = function() {
                    this.executionData.runTime.push(new Date);
                    b.currentRuleId = this.id;
                    b.currentDeploymentId = this.deploymentId;
                    try {
                        this.code()
                    } catch (a) {
                        window[ensightenOptions.ns].reportException(a)
                    } finally {
                        this.executionData.hasRun = !0, -1 !== this.deploymentId && c.runDeploymentIds.push(this.deploymentId), b.testAll()
                    }
                };
                this.id = a.id;
                this.deploymentId = a.deploymentId;
                this.dependencies = a.dependencies || [];
                this.code = a.code;
                this.executionData = {
                    hasRun: !1,
                    runTime: []
                }
            };
            b.registerRule = function(a) {
                if (b.getRule(a.id) && -1 !== a.id) return !1;
                c.ruleList.push(a); - 1 !== a.deploymentId &&
                    c.allDeploymentIds.push(a.deploymentId);
                b.testAll();
                return !0
            };
            b.getRule = function(a) {
                for (var b = 0; b < c.ruleList.length; b++)
                    if (c.ruleList[b].id === a) return c.ruleList[b];
                return !1
            };

            b.getAllDeploymentIds = function() {
                return c.allDeploymentIds
            };
            b.getRunDeploymentIds = function() {
                return c.runDeploymentIds
            };
            b.hasRuleRun = function(a) {
                return (a = b.getRule(a)) ? a.executionData.hasRun : !1
            };
            c.toTwoChar = function(a) {
                return (2 === a.toString().length ?
                    "" : "0") + a
            };
            b.Alert = function(a) {
                var b = new Date,
                    b = b.getFullYear() + "-" + c.toTwoChar(b.getMonth()) + "-" + c.toTwoChar(b.getDate()) + " " + c.toTwoChar(b.getHours()) + ":" + c.toTwoChar(b.getMinutes()) + ":" + c.toTwoChar(b.getSeconds());
                this.severity = a.severity || 1;
                this.subject = a.subject || "";
                this.type = a.type || 1;
                this.ruleId = a.ruleId || -1;
                this.severity = encodeURIComponent(this.severity);
                this.date = encodeURIComponent(b);
                this.subject = encodeURIComponent(this.subject);
                this.type = encodeURIComponent(this.type)
            };
            b.generateAlert = function(a) {
                a =
                    b.imageRequest(window.location.protocol + "//" + c.options.alLoc + "?d=" + a.date + "&su=" + a.subject + "&se=" + a.severity + "&t=" + a.type + "&cid=" + c.options.clientId + "&client=" + c.options.client + "&publishPath=" + c.options.publishPath + "&rid=" + b.currentRuleId + "&did=" + b.currentDeploymentId);
                a.timestamp = (new Date).getTime();
                this.reportedAlerts.push(a)
            };
            b.imageRequest = function(a) {
                var b = new Image(0, 0);
                b.src = a;
                return b
            };
            b.insertScript = function(a, e, d, l) {
                var h = document.getElementsByTagName("script"),
                    f;
                l = void 0 !== l ? l : !0;
                if (void 0 !==
                    e ? e : 1)
                    for (f = 0; f < h.length; f++)
                        if (h[f].src === a && h[f].readyState && /loaded|complete/.test(h[f].readyState)) return;
                if (d) {
                    d = 1 == d && "object" == typeof b.scDataObj ? b.scDataObj : d;
                    c.rand = Math.random() * ("1E" + (10 * Math.random()).toFixed(0));
                    e = window.location.href;
                    "object" === typeof d && d.PageID && (e = d.PageID, delete d.PageID);
                    if ("object" === typeof d)
                        for (f in d) {
                            f = ~e.indexOf("#") ? e.slice(e.indexOf("#"), e.length) : "";
                            e = e.slice(0, f.length ? e.length - f.length : e.length);
                            e += ~e.indexOf("?") ? "&" : "?";
                            for (k in d) e += k + "=" + d[k] + "&";
                            e = e.slice(0, -1) + f;
                            break
                        }
                    a += "?";
                    l && (a += "r=" + c.rand + "&");
                    a += "ClientID=" + encodeURIComponent(c.options.clientId) + "&PageID=" + encodeURIComponent(e)
                }(function(a, b, e) {
                    var d = b.head || b.getElementsByTagName("head");
                    setTimeout(function() {
                        if ("item" in d) {
                            if (!d[0]) {
                                setTimeout(arguments.callee, 25);
                                return
                            }
                            d = d[0]
                        }
                        var a = b.createElement("script");
                        a.src = e;
                        a.onload = a.onerror = function() {
                            this.addEventListener && (this.readyState = "loaded")
                        };
                        d.insertBefore(a, d.firstChild)
                    }, 0)
                })(window, document, a)
            };
            b.loadScriptCallback = function(a,
                b, d) {
                var c = document.getElementsByTagName("script"),
                    h;
                d = c[0];
                for (h = 0; h < c.length; h++)
                    if (c[h].src === a && c[h].readyState && /loaded|complete/.test(c[h].readyState)) try {
                        b()
                    } catch (f) {
                        window[ensightenOptions.ns].reportException(f)
                    } finally {
                        return
                    }
                    c = document.createElement("script");
                c.type = "text/javascript";
                c.async = !0;
                c.src = a;
                c.onerror = function() {
                    this.addEventListener && (this.readyState = "loaded")
                };
                c.onload = c.onreadystatechange = function() {
                    if (!this.readyState || "complete" === this.readyState || "loaded" === this.readyState) {
                        this.onload =
                            this.onreadystatechange = null;
                        this.addEventListener && (this.readyState = "loaded");
                        try {
                            b.call(this)
                        } catch (a) {
                            window[ensightenOptions.ns].reportException(a)
                        }
                    }
                };
                d.parentNode.insertBefore(c, d)
            };
            b.unobtrusiveAddEvent = function(a, b, d) {
                try {
                    var c = a[b] ? a[b] : function() {};
                    a[b] = function() {
                        d.apply(this, arguments);
                        return c.apply(this, arguments)
                    }
                } catch (h) {
                    window[ensightenOptions.ns].reportException(h)
                }
            };
            b.anonymous = function(a, e) {
                return function() {
                    try {
                        b.currentRuleId = e ? e : "anonymous", a()
                    } catch (d) {
                        window[ensightenOptions.ns].reportException(d)
                    }
                }
            };
            b.setCurrentRuleId = function(a) {
                b.currentRuleId = a
            };
            b.setCurrentDeploymentId = function(a) {
                b.currentDeploymentId = a
            };
            b.bindImmediate = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDOMParsed = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.DOMParsed
                    }],
                    code: a
                });
                else if ("object" !==
                    typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDOMLoaded = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.DOMLoaded
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindPageSpecificCompletion = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.conditionalRules
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindOnGetServerComponent = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.readyForServerComponent
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.bindDataDefinitionComplete = function(a, e, d) {
                if ("function" === typeof a) a = new b.Rule({
                    id: e || -1,
                    deploymentId: d || -1,
                    dependencies: [function() {
                        return window[ensightenOptions.ns].executionState.dataDefinitionComplete
                    }],
                    code: a
                });
                else if ("object" !== typeof a) return !1;
                b.registerRule(a)
            };
            b.checkHasRun = function(a) {
                if (0 === a.length) return !0;
                for (var e, d = 0; d < a.length; ++d)
                    if (e = b.getRule(parseInt(a[d], 10)), !e || !e.executionData.hasRun) return !1;
                return !0
            };
            b.bindDependencyImmediate = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !==
                        typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyDOMLoaded = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.DOMLoaded
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyDOMParsed = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e,
                        l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.DOMParsed
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyPageSpecificCompletion = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.conditionalRules
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyOnGetServerComponent = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.readyForServerComponent
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" ===
                        typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !== typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.bindDependencyPageSpecificCompletion = function(a, e, d, l, h) {
                var f = [];
                if (!c.checkForInvalidDependencies(e, l, d, h)) {
                    f.push(function() {
                        return window[ensightenOptions.ns].executionState.dataDefinitionComplete
                    });
                    f.push(function() {
                        return window[ensightenOptions.ns].checkHasRun(d)
                    });
                    if ("function" === typeof a) a = new b.Rule({
                        id: e || -1,
                        deploymentId: l || -1,
                        dependencies: f,
                        code: a
                    });
                    else if ("object" !==
                        typeof a) return !1;
                    b.registerRule(a)
                }
            };
            b.dataDefintionIds = [];
            b.dataDefinitions = [];
            b.pageSpecificDataDefinitionsSet = !1;
            b.setPageSpecificDataDefinitionIds = function(a) {
                for (var e = a.length, d = 0; d < e; d++) {
                    var c = a[d];
                    if (Array.prototype.indexOf) - 1 == b.dataDefinitionIds.indexOf(c) && b.dataDefinitionIds.push(c);
                    else {
                        for (var h = !1, f = b.dataDefinitionIds.length, g = 0; g < f; g++)
                            if (b.dataDefinitionIds[g] === c) {
                                h = !0;
                                break
                            }
                        h || b.dataDefinitionIds.push(c)
                    }
                }
                b.pageSpecificDataDefinitionsSet = !0;
                p()
            };
            b.DataDefinition = function(a, b) {
                this.id =
                    a;
                this.registrationFn = b;
                this.endRegistrationTime = this.startRegistrationTime = null;
                this.startRegistration = function() {
                    this.startRegistrationTime = new Date
                };
                this.endRegistration = function() {
                    this.endRegistrationTime = new Date
                }
            };
            b.registerDataDefinition = function(a, e) {
                var d = b.dataDefinitions[e];
                d || (d = new b.DataDefinition(e, a), b.dataDefinitions[e] = d);
                d.startRegistrationTime || (d.startRegistration(), d.registrationFn(), d.endRegistration());
                b.pageSpecificDataDefinitionsSet && p()
            };
            b.callOnDataDefintionComplete = function() {
                b.executionState.dataDefinitionComplete = !0;
                b.testAll()
            };
            b.callOnDOMParsed = function() {
                window[ensightenOptions.ns].executionState.DOMParsed = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.callOnDOMLoaded = function() {
                window[ensightenOptions.ns].executionState.DOMParsed = !0;
                window[ensightenOptions.ns].executionState.DOMLoaded = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.callOnPageSpecificCompletion = function() {
                for (var a = document.getElementsByTagName("script"), b = 0, d = a.length; b < d; b++)
                    if (a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i) && "loaded" !=
                        a[b].readyState && "complete" != a[b].readyState) {
                        setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion, 50);
                        return
                    }
                setTimeout(function() {
                    window[ensightenOptions.ns].executionState.conditionalRules = !0;
                    window[ensightenOptions.ns].testAll()
                }, 1)
            };
            b.callOnGetServerComponent = function() {
                window[ensightenOptions.ns].executionState.readyForServerComponent = !0;
                window[ensightenOptions.ns].testAll()
            };
            b.hasDOMParsed = function() {
                return window[ensightenOptions.ns].executionState.DOMParsed
            };
            b.hasDOMLoaded =
                function() {
                    return window[ensightenOptions.ns].executionState.DOMLoaded
                };
            b.hasPageSpecificCompletion = function() {
                return window[ensightenOptions.ns].executionState.conditionalRules
            };
            var q = function() {
                var a = [],
                    b = !1,
                    d = !1;
                return {
                    add: function(c) {
                        b && !d ? c() : "function" == typeof c && (a[a.length] = c)
                    },
                    exec: function() {
                        d = !0;
                        do {
                            var c = a;
                            a = [];
                            b = !0;
                            for (var g = 0; g < c.length; g++) try {
                                c[g].call(window)
                            } catch (f) {
                                window[ensightenOptions.ns].reportException(f)
                            }
                        } while (0 < a.length);
                        d = !1
                    },
                    haveRun: function() {
                        return b
                    }
                }
            };
            b.new_fArray =
                function() {
                    return q()
                };
            c.timer = null;
            (function() {
                function a(a, b) {
                    return function() {
                        a.apply(b, arguments)
                    }
                }
                window.console || (window.console = {});
                var b = window.console;
                if (!b.log)
                    if (window.log4javascript) {
                        var c = log4javascript.getDefaultLogger();
                        b.log = a(c.info, c);
                        b.debug = a(c.debug, c);
                        b.info = a(c.info, c);
                        b.warn = a(c.warn, c);
                        b.error = a(c.error, c)
                    } else b.log = function() {};
                b.debug || (b.debug = b.log);
                b.info || (b.info = b.log);
                b.warn || (b.warn = b.log);
                b.error || (b.error = b.log)
            })();
            document.addEventListener ? (-1 < navigator.userAgent.indexOf("AppleWebKit/") ?
                c.timer = window.setInterval(function() {
                    /loaded|interactive|complete/.test(document.readyState) && (clearInterval(c.timer), b.callOnDOMParsed())
                }, 50) : document.addEventListener("DOMContentLoaded", b.callOnDOMParsed, !1), window.addEventListener("load", b.callOnDOMLoaded, !1)) : (setTimeout(function() {
                var a = window.document;
                (function() {
                    try {
                        if (!document.body) throw "continue";
                        a.documentElement.doScroll("left")
                    } catch (b) {
                        setTimeout(arguments.callee, 15);
                        return
                    }
                    window[ensightenOptions.ns].callOnDOMParsed()
                })()
            }, 1), window.attachEvent("onload",
                function() {
                    window[ensightenOptions.ns].callOnDOMLoaded()
                }));
            "true" === c.options.enableTagAuditBeacon && b.sampleBeacon() && window.setTimeout(function() {
                if (window[ensightenOptions.ns] && !window[ensightenOptions.ns].mobilePlatform) try {
                    for (var a = [], e, d, l, h, f = 0; f < c.ruleList.length; ++f) d = c.ruleList[f], l = d.executionData.hasRun ? "1" : "0", h = d.deploymentId.toString() + "|" + d.id.toString() + "|" + l, a.push(h);
                    e = "[" + a.join(";") + "]";
                    var m = window.location.protocol + "//" + c.nexus + "/" + encodeURIComponent(g.client) + "/" + encodeURIComponent(g.publishPath) +
                        "/TagAuditBeacon.rnc?cid=" + encodeURIComponent(g.clientId) + "&data=" + e + "&idx=0&r=" + c.rand;
                    b.imageRequest(m)
                } catch (n) {
                    b.currentRuleId = -1, b.currentDeploymentId = -1, a = new c.BeaconException(n), window[ensightenOptions.ns].reportException(a)
                }
            }, 3E3);
            window.setInterval(b.testAll, c.options.interval);
            return b
        }(ensightenOptions);
        "true" === ensightenOptions.enablePagePerfBeacon && window[ensightenOptions.ns] && window[ensightenOptions.ns].sampleBeacon() && window[ensightenOptions.ns].bindDOMParsed(function() {
            if (!window[ensightenOptions.ns].mobilePlatform) {
                var g = window.performance;
                if (g) {
                    var g = g.timing || {},
                        m = "",
                        n = g.navigationStart || 0,
                        p, c = {
                            connectEnd: "ce",
                            connectStart: "cs",
                            domComplete: "dc",
                            domContentLoadedEventEnd: "dclee",
                            domContentLoadedEventStart: "dcles",
                            domInteractive: "di",
                            domLoading: "dl",
                            domainLookupEnd: "dle",
                            domainLookupStart: "dls",
                            fetchStart: "fs",
                            loadEventEnd: "lee",
                            loadEventStart: "les",
                            redirectEnd: "rede",
                            redirectStart: "reds",
                            requestStart: "reqs",
                            responseStart: "resps",
                            responseEnd: "respe",
                            secureConnectionStart: "scs",
                            unloadEventStart: "ues",
                            unloadEventEnd: "uee"
                        },
                        m = "&ns=" + encodeURIComponent(g.navigationStart),
                        b;
                    for (b in c) void 0 !== g[b] ? (p = g[b] - n, m += "&" + c[b] + "=" + (0 < p ? encodeURIComponent(p) : 0)) : m += "&" + c[b] + "=-1";
                    window[ensightenOptions.ns].timing = m;
                    b = ensightenOptions.nexus || "nexus.ensighten.com";
                    g = ensightenOptions.staticJavascriptPath ||
                        "";
                    m = g.indexOf(".com/");
                    n = g.indexOf("/code/");
                    g = g.substring(m + 4, n) + "/perf.rnc";
                    g += "?cid=" + encodeURIComponent(ensightenOptions.clientId) + window[ensightenOptions.ns].timing;
                    window[ensightenOptions.ns].imageRequest("//" + b + g)
                }
            }
        });

        if (!window[ensightenOptions.ns].data) {
            /*
             MIT License (c) copyright 2011-2013 original author or authors  MIT License (c) copyright 2013 original author or authors */
            window.JSON && "object" === typeof JSON || (window[ensightenOptions.ns].JSON = {});
            (function() {
                function d(a) {
                    return 10 > a ? "0" + a : a
                }

                function n(a) {
                    h.lastIndex = 0;
                    return h.test(a) ? '"' + a.replace(h, function(a) {
                        var c = f[a];
                        return "string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + a + '"'
                }

                function l(f, g) {
                    var m, d, b, e, h = k,
                        u, r = g[f];
                    r && "object" === typeof r && "function" === typeof r.toJSON && (r = r.toJSON(f));
                    "function" === typeof c && (r = c.call(g, f, r));
                    switch (typeof r) {
                        case "string":
                            return n(r);
                        case "number":
                            return isFinite(r) ? String(r) : "null";
                        case "boolean":
                        case "null":
                            return String(r);
                        case "object":
                            if (!r) return "null";
                            k += a;
                            u = [];
                            if ("[object Array]" === Object.prototype.toString.apply(r)) {
                                e = r.length;
                                for (m = 0; m < e; m += 1) u[m] = l(m, r) || "null";
                                b = 0 === u.length ? "[]" : k ? "[\n" + k + u.join(",\n" + k) + "\n" + h + "]" : "[" + u.join(",") + "]";
                                k = h;
                                return b
                            }
                            if (c && "object" === typeof c)
                                for (e = c.length, m = 0; m < e; m += 1) "string" === typeof c[m] && (d = c[m], (b = l(d, r)) && u.push(n(d) + (k ? ": " : ":") + b));
                            else
                                for (d in r) Object.prototype.hasOwnProperty.call(r, d) && (b = l(d, r)) && u.push(n(d) + (k ? ": " : ":") + b);
                            b = 0 === u.length ? "{}" : k ? "{\n" + k + u.join(",\n" +
                                k) + "\n" + h + "}" : "{" + u.join(",") + "}";
                            k = h;
                            return b
                    }
                }
                var b = window.JSON ? window.JSON : window[ensightenOptions.ns].JSON;
                "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + d(this.getUTCMonth() + 1) + "-" + d(this.getUTCDate()) + "T" + d(this.getUTCHours()) + ":" + d(this.getUTCMinutes()) + ":" + d(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                    return this.valueOf()
                });
                var e =
                    /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    h = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    k, a, f = {
                        "\b": "\\b",
                        "\t": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                    c;
                "function" !== typeof b.stringify && (b.stringify = function(d, g, b) {
                    var f;
                    a = k = "";
                    if ("number" === typeof b)
                        for (f = 0; f < b; f += 1) a += " ";
                    else "string" === typeof b && (a = b);
                    if ((c = g) && "function" !== typeof g &&
                        ("object" !== typeof g || "number" !== typeof g.length)) throw Error("JSON.stringify");
                    return l("", {
                        "": d
                    })
                });
                "function" !== typeof b.parse && (b.parse = function(a, g) {
                    function c(a, b) {
                        var f, d, e = a[b];
                        if (e && "object" === typeof e)
                            for (f in e) Object.prototype.hasOwnProperty.call(e, f) && (d = c(e, f), void 0 !== d ? e[f] = d : delete e[f]);
                        return g.call(a, b, e)
                    }
                    var b;
                    a = String(a);
                    e.lastIndex = 0;
                    e.test(a) && (a = a.replace(e, function(a) {
                        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    }));
                    if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                            "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return b = eval("(" + a + ")"), "function" === typeof g ? c({
                        "": b
                    }, "") : b;
                    throw new SyntaxError("JSON.parse");
                })
            })();
            window[ensightenOptions.ns].when = function() {
                function d(a, b, g, f) {
                    return l(a).then(b, g, f)
                }

                function n(a) {
                    this.then = a
                }

                function l(a) {
                    return b(function(b) {
                        b(a)
                    })
                }

                function b(g) {
                    function c(a) {
                        t && (p = e(a), f(t, p), t = v)
                    }

                    function d(a) {
                        c(k(a))
                    }

                    function q(b) {
                        t && f(t, a(b))
                    }
                    var p, t = [];
                    try {
                        g(c, d, q)
                    } catch (r) {
                        d(r)
                    }
                    return new n(function(a, g, f) {
                        return b(function(b, c, d) {
                            t ? t.push(function(e) {
                                e.then(a, g, f).then(b, c, d)
                            }) : m(function() {
                                p.then(a, g, f).then(b, c, d)
                            })
                        })
                    })
                }

                function e(a) {
                    return a instanceof n ? a : a !== Object(a) ? h(a) : b(function(b,
                        g, f) {
                        m(function() {
                            try {
                                var c = a.then;
                                "function" === typeof c ? z(c, a, b, g, f) : b(h(a))
                            } catch (d) {
                                g(d)
                            }
                        })
                    })
                }

                function h(a) {
                    var b = new n(function(g) {
                        try {
                            return "function" == typeof g ? e(g(a)) : b
                        } catch (c) {
                            return k(c)
                        }
                    });
                    return b
                }

                function k(a) {
                    var b = new n(function(g, c) {
                        try {
                            return "function" == typeof c ? e(c(a)) : b
                        } catch (f) {
                            return k(f)
                        }
                    });
                    return b
                }

                function a(b) {
                    var g = new n(function(c, f, d) {
                        try {
                            return "function" == typeof d ? a(d(b)) : g
                        } catch (e) {
                            return a(e)
                        }
                    });
                    return g
                }

                function f(a, b) {
                    m(function() {
                        for (var g, c = 0; g = a[c++];) g(b)
                    })
                }

                function c(a,
                    g, c, f, e) {
                    t(2, arguments);
                    return d(a, function(a) {
                        return b(function(b, c, f) {
                            function e(a) {
                                k(a)
                            }

                            function m(a) {
                                h(a)
                            }
                            var q, p, t, r, h, k, l, x;
                            l = a.length >>> 0;
                            q = Math.max(0, Math.min(g, l));
                            t = [];
                            p = l - q + 1;
                            r = [];
                            if (q)
                                for (k = function(a) {
                                        r.push(a);
                                        --p || (h = k = B, c(r))
                                    }, h = function(a) {
                                        t.push(a);
                                        --q || (h = k = B, b(t))
                                    }, x = 0; x < l; ++x) x in a && d(a[x], m, e, f);
                            else b(t)
                        }).then(c, f, e)
                    })
                }

                function p(a, b, c, f) {
                    t(1, arguments);
                    return g(a, C).then(b, c, f)
                }

                function g(a, g) {
                    return d(a, function(a) {
                        return b(function(b, c, f) {
                            var e, m, q, t, p;
                            q = m = a.length >>> 0;
                            e = [];
                            if (q)
                                for (t = function(a, m) {
                                        d(a, g).then(function(a) {
                                            e[m] = a;
                                            --q || b(e)
                                        }, c, f)
                                    }, p = 0; p < m; p++) p in a ? t(a[p], p) : --q;
                            else b(e)
                        })
                    })
                }

                function m(a) {
                    1 === y.push(a) && D(q)
                }

                function q() {
                    for (var a, b = 0; a = y[b++];) a();
                    y = []
                }

                function t(a, b) {
                    for (var g, c = b.length; c > a;)
                        if (g = b[--c], null != g && "function" != typeof g) throw Error("arg " + c + " must be a function");
                }

                function B() {}

                function C(a) {
                    return a
                }
                d.defer = function() {
                    var a, g, c;
                    a = {
                        promise: v,
                        resolve: v,
                        reject: v,
                        notify: v,
                        resolver: {
                            resolve: v,
                            reject: v,
                            notify: v
                        }
                    };
                    a.promise = g = b(function(b,
                        f, d) {
                        a.resolve = a.resolver.resolve = function(a) {
                            if (c) return l(a);
                            c = !0;
                            b(a);
                            return g
                        };
                        a.reject = a.resolver.reject = function(a) {
                            if (c) return l(k(a));
                            c = !0;
                            f(a);
                            return g
                        };
                        a.notify = a.resolver.notify = function(a) {
                            d(a);
                            return a
                        }
                    });
                    return a
                };
                d.resolve = l;
                d.reject = function(a) {
                    return d(a, k)
                };
                d.join = function() {
                    return g(arguments, C)
                };
                d.all = p;
                d.map = g;
                d.reduce = function(a, b) {
                    var c = z(r, arguments, 1);
                    return d(a, function(a) {
                        var g;
                        g = a.length;
                        c[0] = function(a, c, f) {
                            return d(a, function(a) {
                                return d(c, function(c) {
                                    return b(a, c, f,
                                        g)
                                })
                            })
                        };
                        return u.apply(a, c)
                    })
                };
                d.any = function(a, b, g, f) {
                    return c(a, 1, function(a) {
                        return b ? b(a[0]) : a[0]
                    }, g, f)
                };
                d.some = c;
                d.isPromise = function(a) {
                    return a && "function" === typeof a.then
                };
                n.prototype = {
                    otherwise: function(a) {
                        return this.then(v, a)
                    },
                    ensure: function(a) {
                        function b() {
                            return l(a())
                        }
                        return this.then(b, b).yield(this)
                    },
                    yield: function(a) {
                        return this.then(function() {
                            return a
                        })
                    },
                    spread: function(a) {
                        return this.then(function(b) {
                            return p(b, function(b) {
                                return a.apply(v, b)
                            })
                        })
                    },
                    always: function(a, b) {
                        return this.then(a,
                            a, b)
                    }
                };
                var u, r, z, D, y, E, w, A, v;
                y = [];
                E = setTimeout;
                D = "function" === typeof setImmediate ? "undefined" === typeof window ? setImmediate : setImmediate.bind(window) : "object" === typeof process && process.nextTick ? process.nextTick : function(a) {
                    E(a, 0)
                };
                w = Function.prototype;
                A = w.call;
                z = w.bind ? A.bind(A) : function(a, b) {
                    return a.apply(b, r.call(arguments, 2))
                };
                w = [];
                r = w.slice;
                u = w.reduce || function(a) {
                    var b, c, g, f;
                    f = 0;
                    b = Object(this);
                    g = b.length >>> 0;
                    c = arguments;
                    if (1 >= c.length)
                        for (;;) {
                            if (f in b) {
                                c = b[f++];
                                break
                            }
                            if (++f >= g) throw new TypeError;
                        } else c = c[1];
                    for (; f < g; ++f) f in b && (c = a(c, b[f], f, b));
                    return c
                };
                return d
            }();
            (function() {
                function d(b, d) {
                    return l.all(d || [], function(d) {
                        return b.apply(null, d)
                    })
                }

                function n(e) {
                    var h = b.call(arguments, 1);
                    return function() {
                        return d(e, h.concat(b.call(arguments)))
                    }
                }
                var l, b;
                l = window[ensightenOptions.ns].when;
                b = [].slice;
                l.apply = d;
                l.call = function(e) {
                    return d(e, b.call(arguments, 1))
                };
                l.lift = n;
                l.bind = n;
                l.compose = function(e) {
                    var h = b.call(arguments, 1);
                    return function() {
                        var k = b.call(arguments),
                            k = d(e, k);
                        return l.reduce(h, function(a, b) {
                            return b(a)
                        }, k)
                    }
                }
            })();
            window[ensightenOptions.ns].data = function(d, n) {
                function l(a, b) {
                    this.name = "DataDefinitionException";
                    this.message = b || "Data definitions cannot be resolved as there are invalid id(s): " + a
                }
                var b = {
                        engines: {
                            memory: {
                                get: function(a) {
                                    if (e.utils.isArray(a)) {
                                        for (var f = [], c = 0; c < a.length; c++) f.push(b.data[a[c]]);
                                        return d[ensightenOptions.ns].when.resolve(f)
                                    }
                                    f = b.dataDefinitions[a] || {
                                        storage: {
                                            get: function() {}
                                        }
                                    };
                                    f = f.storage.get(f);
                                    b.data[a] = f;
                                    return d[ensightenOptions.ns].when.resolve(b.data[a])
                                },
                                set: function(a, f) {
                                    if (e.utils.isArray(a))
                                        for (var c in a) b.data[a[c]] =
                                            f[c];
                                    else b.data[a] = f;
                                    return d[ensightenOptions.ns].when.resolve(!0)
                                },
                                remove: function(a) {
                                    if (e.utils.isArray(a))
                                        for (var f in a) delete b.data[a[f]];
                                    else delete b.data[a];
                                    return d[ensightenOptions.ns].when.resolve(!0)
                                },
                                clear: function(a) {
                                    b.data = {};
                                    b.definitions = {};
                                    return d[ensightenOptions.ns].when.resolve(!0)
                                },
                                all: function() {
                                    return d[ensightenOptions.ns].when.resolve(b.data)
                                }
                            }
                        },
                        normalizeInputArgs: function(a, b) {
                            var c = {
                                    key: [],
                                    val: n
                                },
                                d;
                            if (e.utils.isPlainObject(a))
                                for (d in c.val = [], a) c.key.push(d), c.val.push(a[d]);
                            else e.utils.isArray(a), c.key = a, c.val = b;
                            return c
                        },
                        definitions: {},
                        data: {}
                    },
                    e = {
                        utils: {
                            isPlainObject: function(a) {
                                return !!a && "[object Object]" === Object.prototype.toString.call(a)
                            },
                            isArray: function(a) {
                                return "[object Array]" === Object.prototype.toString.call(a)
                            },
                            escapeRegEx: function(a) {
                                try {
                                    return a.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1")
                                } catch (b) {
                                    return a
                                }
                            }
                        }
                    },
                    h = function() {
                        return d[ensightenOptions.ns].when.reject("Not Implemented.")
                    };
                l.prototype = Error();
                l.prototype || (l.prototype = {});
                l.prototype.constructor =
                    l;
                b.DataDefinitionException = l;
                b.checkForInvalidDataDefinitions = function(a) {
                    e.utils.isArray(a) || (a = [a]);
                    return a && 0 < a.length && (a = a.join(","), -1 < a.indexOf("invalid_id")) ? (d[ensightenOptions.ns].reportException(new b.DataDefinitionException(a)), !0) : !1
                };
                b.collectAvailableDataDefinitions = function(a) {
                    for (var f = [], c = 0; c < a.length; c++) {
                        var p = parseInt(a[c], 10),
                            g = d[ensightenOptions.ns].dataDefinitions[p];
                        if (null === g || g === n)
                            if (g = e.storage.session.get({
                                    id: p
                                }), null !== g && g !== n) e.set(p, g), b.dataDefinitions[p] = {
                                id: p,
                                load: "visitor",
                                storage: e.storage.visitor,
                                missingDDFromCache: !0
                            }, f.push(d[ensightenOptions.ns].data.get("" + p));
                            else return d[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Invalid data definition used: " + p)), {
                                promises: [],
                                isInvalid: !0
                            };
                        else f.push(d[ensightenOptions.ns].data.get(a[c]))
                    }
                    return {
                        promises: f,
                        isInvalid: !1
                    }
                };
                b.getSync = function(a) {
                    function f(a) {
                        var b = a.extract || p,
                            f = a.transform || g,
                            d = !1,
                            e = null,
                            m = null;
                        try {
                            e = b()
                        } catch (q) {
                            e = null, d = !0
                        }
                        try {
                            m = f(e)
                        } catch (q) {
                            m = null, d = !0
                        }
                        d && c.push(a.id);
                        return m
                    }
                    var c = [],
                        p = function() {
                            return document
                        },
                        g = function(a) {
                            return null !== a && a !== n ? a.toString() : null
                        },
                        m = parseInt(a);
                    a = "string" === typeof a ? a.split(".") : [];
                    var q = {},
                        t = "";
                    isNaN(m) ? 3 == a.length && (q = e.getDataDefinitionBySourceCollectionName(a[0], a[1], a[2])) : q = e.getDataDefinitionById(m);
                    t = q.load && q.load.match(/(session|visitor)/i) && q.storage && q.storage.get ? q.storage.get(q) : f(q);
                    0 < c.length && d[ensightenOptions.ns].reportException(new b.DataDefinitionException(c, "Error resolving data definitions synchronously: " +
                        c));
                    return t
                };
                b.dataDefinitions = {};
                b.dataDefinitionsBySourceCollName = {};
                e.defineEngine = function(a, f) {
                    var c, e = ["get", "set", "remove", "clear", "all"];
                    b.engines[a] = f;
                    if (!f.returnsPromise)
                        for (c = 0; c < e.length; c++) {
                            var g = e[c];
                            f[g] = d[ensightenOptions.ns].when.lift(f[g])
                        }
                };
                e.storage = {
                    instance: {
                        set: function(a, b) {},
                        get: function(a) {
                            return b.getSync(a.id)
                        }
                    },
                    page: {
                        set: function(a, b) {},
                        get: function(a) {
                            return b.data[a.id]
                        }
                    },
                    session: {
                        set: function(a, b) {
                            var c = e.storage.session.get({
                                    id: a
                                }),
                                p = new Date,
                                g = p.getTime();
                            p.setTime(g +
                                18E5);
                            null != c && (b = c);
                            d[ensightenOptions.ns].data.cookie.utils.set(a, b, {
                                expires: p.toGMTString()
                            });
                            c = {
                                expires: p.getTime(),
                                value: b
                            };
                            d[ensightenOptions.ns].data.local.utils.set(a, c)
                        },
                        get: function(a) {
                            var b = d[ensightenOptions.ns].data.cookie.utils.get(a.id),
                                c = d.JSON && d.JSON.stringify ? d.JSON : d[ensightenOptions.ns].JSON,
                                c = c || {},
                                e, g = new Date,
                                g = g.getTime();
                            if (null === b) {
                                try {
                                    e = c.parse(d[ensightenOptions.ns].data.local.utils.get(a.id))
                                } catch (m) {
                                    e = null
                                }
                                null != e && (e.expires = +e.expires, g <= e.expires ? b = e.value : "" ==
                                    e.expires && e.value != n ? b = e.value : d[ensightenOptions.ns].data.local.utils.remove(a.id))
                            }
                            return b
                        }
                    },
                    visitor: {
                        set: function(a, b) {
                            var c = e.storage.session.get({
                                id: a
                            });
                            null != c && (b = c);
                            d[ensightenOptions.ns].data.cookie.utils.set(a, b);
                            d[ensightenOptions.ns].data.local.utils.set(a, {
                                expires: "",
                                value: b
                            })
                        },
                        get: function(a) {
                            return e.storage.session.get(a)
                        }
                    }
                };
                e.getEngine = e.engine = function(a) {
                    return a ? b.engines[a] || {
                        get: h,
                        set: h,
                        remove: h,
                        clear: h,
                        all: h
                    } : b.engines
                };
                e.all = function(a) {
                    return d[ensightenOptions.ns].data.engine(a ||
                        "memory").all()
                };
                e.get = function(a, f, c) {
                    f = f || "memory";
                    c = c || {}; - 1 < a.indexOf(",") && (a = a.split(","));
                    a = b.normalizeInputArgs(a);
                    return c.wait ? b.getWait(a.key, d[ensightenOptions.ns].data.engine(f), c) : b.data && b.data.hasOwnProperty(a.key) ? d[ensightenOptions.ns].data.engine(f).get(a.key) : b.getWaitForKey(a.key, d[ensightenOptions.ns].data.engine(f), c)
                };
                b.getWait = function(a, b, c) {
                    var p = +new Date,
                        g = d[ensightenOptions.ns].when.defer(),
                        m = function() {
                            var d = b.get(a);
                            if (-1 === c.wait) return d;
                            d.then(function(a) {
                                c.setCheck(a) ?
                                    g.resolve(a) : setTimeout(q, c.interval)
                            }, function(a) {
                                setTimeout(q, c.interval)
                            })
                        },
                        q = function() {
                            var a = +new Date - p; - 1 !== c.wait && a < c.wait ? m() : g.reject("Timeout")
                        };
                    c.interval = c.interval || 500;
                    c.wait = c.wait || 5E3;
                    e.utils.isArray(a) ? c.setCheck = c.setCheck || function(a) {
                        for (var b = !0, c = 0; c < a.length; c++) b = b && !!a[c];
                        return b
                    } : c.setCheck = c.setCheck || function(a) {
                        return !!a
                    };
                    m();
                    return g.promise
                };
                b.getWaitForKey = function(a, f, c) {
                    var e = d[ensightenOptions.ns].when.defer(),
                        g = function() {
                            if (b.data && b.data.hasOwnProperty(a)) {
                                var g =
                                    f.get(a);
                                if (-1 === c.wait) return g;
                                g.then(function(a) {
                                    e.resolve(a)
                                }, function(a) {
                                    e.reject(a)
                                })
                            } else setTimeout(m, c.interval)
                        },
                        m = function() {
                            g()
                        };
                    c.interval = c.interval || 100;
                    c.wait = c.wait || 1;
                    g();
                    return e.promise
                };
                e.set = function(a, e, c) {
                    var h = b.normalizeInputArgs(a, e);
                    Array.prototype.slice.call(arguments);
                    return d[ensightenOptions.ns].data.engine(c || "memory").set(h.key, h.val)
                };
                e.remove = function(a, b) {
                    return d[ensightenOptions.ns].data.engine(b || "memory").remove(a)
                };
                e.clear = function(a) {
                    return d[ensightenOptions.ns].data.engine(a ||
                        "memory").clear()
                };
                e.define = function(a, f) {
                    f && (a.name = f.id || f.name);
                    if (!a.name) return d[ensightenOptions.ns].when.reject(Error("Invalid parameters: missing 'name'"));
                    a.id = a.name;
                    var c = a.load || "page";
                    a.load = a.load || "javascript";
                    a.load = -1 < a.load.indexOf("javascript") ? a.load : a.load + ",javascript";
                    a.trigger = a.trigger || function() {
                        return d[ensightenOptions.ns].when.resolve()
                    };
                    a.priv = a.priv || !1;
                    a.collection = a.collection || "Data Layer";
                    a.persist = d[ensightenOptions.ns].data.engine("memory");
                    a.storage = e.storage[c.toLowerCase()] ||
                        e.storage.page;
                    var h = a.extract || function() {
                            return document
                        },
                        g = a.transform || function(a) {
                            return a
                        },
                        m = function(b, c) {
                            var g = [];
                            g.push(a.persist.set(b, c));
                            a.storage.set(a.id, c);
                            "object" == typeof d[ensightenOptions.ns].data.dataExport && d[ensightenOptions.ns].data.dataExport(b, c, a.collection);
                            d[ensightenOptions.ns].when.all(g).then(function(a) {
                                q.resolve(a)
                            }, function(a) {
                                q.reject(a)
                            })
                        },
                        q = d[ensightenOptions.ns].when.defer(),
                        t;
                    try {
                        t = a.trigger()
                    } catch (k) {
                        d[ensightenOptions.ns].reportException(new b.DataDefinitionException(null,
                            '"' + k + '" error caught in Data Definition trigger: ' + a.dataDefName + ", ID:" + a.id + ". Using bottom of body trigger.")), t = d[ensightenOptions.ns].data.bottomOfBodyTrigger()
                    }
                    t.then(function() {
                        q.resolve(d[ensightenOptions.ns].when.reduce([function() {
                            try {
                                return h()
                            } catch (c) {
                                return d[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, '"' + c + '" error caught in Data Definition extractor: ' + a.dataDefName + ", ID:" + a.id + ".")), null
                            }
                        }(), function() {
                            try {
                                return g.apply(this, arguments)
                            } catch (c) {
                                return d[ensightenOptions.ns].reportException(new b.DataDefinitionException(null,
                                    '"' + c + '" error caught in Data Definition transformer: ' + a.dataDefName + ", ID " + a.id + ".")), null
                            }
                        }, m], function(b, c, g, d) {
                            if (1 == g) return c(b);
                            2 == g && c(a.name, b)
                        }))
                    }, function(a) {
                        q.reject(a)
                    });
                    b.dataDefinitions[a.id] = a;
                    b.dataDefinitionsBySourceCollName["" + a.source + "." + a.collection + "." + a.dataDefName] = a;
                    return q.promise
                };
                e.checkConditions = function(a) {
                    var f, c = {
                        lt: function(a, c) {
                            var e = +a,
                                f = +c;
                            return isNaN(e) || isNaN(f) ? (d[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " +
                                a + ", compareTo: " + c)), !1) : e < f
                        },
                        gt: function(a, c) {
                            var e = +a,
                                f = +c;
                            return isNaN(e) || isNaN(f) ? (d[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " + a + ", compareTo: " + c)), !1) : e > f
                        },
                        eql: function(a, b) {
                            return a == b
                        },
                        exists: function(a, b) {
                            return null == a || a == n || "" == a ? !1 : !0
                        },
                        re: function(a, b, c) {
                            b = new RegExp(b, c ? "i" : "");
                            try {
                                return a.match(b)
                            } catch (d) {
                                return !1
                            }
                        },
                        starts: function(a, b, d) {
                            b = e.utils.escapeRegEx(b);
                            return c.re(a, "^" + b, d)
                        },
                        ends: function(a,
                            b, d) {
                            b = e.utils.escapeRegEx(b);
                            return c.re(a, b + "$", d)
                        },
                        contains: function(a, b, d) {
                            b = e.utils.escapeRegEx(b);
                            return c.re(a, ".*" + b + ".*", d)
                        }
                    };
                    c.is = c.eql;
                    c["starts with"] = c.starts;
                    c["ends with"] = c.ends;
                    c["is greater than"] = c.gt;
                    c["is less than"] = c.lt;
                    c.matches = c.re;
                    for (f = 0; f < a.values.length; f++) {
                        var h = (a.customComparator ? a.customComparator[f] ? a.customComparator[f] : c[a.comparators[f]] : c[a.comparators[f]])(a.values[f], a.compareTo[f], a.caseInsensitive ? a.caseInsensitive[f] || !1 : !1);
                        a.not[f] && (h = !h);
                        if (!h) return !1
                    }
                    return !0
                };
                e.triggerPromise = function(a, b, c) {
                    c = c || 5E3;
                    var e = +new Date,
                        g = d[ensightenOptions.ns].when.defer();
                    (function() {
                        var d = a();
                        d != b ? g.resolve(d) : +new Date - e < c ? setTimeout(arguments.callee, 200) : g.reject("timed out")
                    })();
                    return g.promise
                };
                e.timeoutPromise = function(a, b) {
                    var c = d[ensightenOptions.ns].when.defer();
                    b = b || 800;
                    a.then(c.resolve, c.reject);
                    setTimeout(function() {
                        c.reject(Error("timed out"))
                    }, b);
                    return c.promise
                };
                e.delayTrigger = function(a) {
                    a = a || 10;
                    var b = d[ensightenOptions.ns].when.defer();
                    setTimeout(function() {
                            b.resolve()
                        },
                        a);
                    return b.promise
                };
                e.delayUntilTrigger = function(a, b, c, e) {
                    c = c || null;
                    e = e || 200;
                    var g = +new Date,
                        m = d[ensightenOptions.ns].when.defer();
                    (function() {
                        var d = a();
                        d != b ? m.resolve(d) : c ? +new Date - g < c ? setTimeout(arguments.callee, e) : m.reject("timed out") : setTimeout(arguments.callee, e)
                    })();
                    return m.promise
                };
                b.applyTrigger = function(a) {
                    var b = d[ensightenOptions.ns].when.defer();
                    a(function() {
                        b.resolve(!0)
                    });
                    return b.promise
                };
                e.immediateTrigger = function() {
                    return b.applyTrigger(d[ensightenOptions.ns].bindImmediate)
                };
                e.bottomOfBodyTrigger = function() {
                    return b.applyTrigger(d[ensightenOptions.ns].bindDOMParsed)
                };
                e.afterEnsightenCompleteTrigger = function() {
                    return b.applyTrigger(d[ensightenOptions.ns].bindPageSpecificCompletion)
                };
                e.afterElementsDownloadedTrigger = function() {
                    return b.applyTrigger(d[ensightenOptions.ns].bindDOMLoaded)
                };
                e.getAllDataDefinitionsOnCurrentPage = function() {
                    return b.dataDefinitions
                };
                e.getAllDataDefinitionsOnCurrentPage_S_C_N = function() {
                    return b.dataDefinitionsBySourceCollName
                };
                e.getDataDefinitionById =
                    function(a) {
                        return b.dataDefinitions[a || -1] || {}
                    };
                e.getDataDefinitionBySourceCollectionName = function(a, d, c) {
                    return b.dataDefinitionsBySourceCollName["" + a + "." + d + "." + c] || {}
                };
                e.getDataDefinitionByPercentSyntax = function(a) {
                    a = ("" + a).split("_");
                    return 1 > a.length ? {} : b.dataDefinitions[a[1]] || {}
                };
                e.resolve = function(a, f) {
                    var c = this,
                        h = null;
                    if (!b.checkForInvalidDataDefinitions(a))
                        if (f) d[ensightenOptions.ns].bindDataDefinitionComplete(function() {
                            var g = b.collectAvailableDataDefinitions(a);
                            g.isInvalid || d[ensightenOptions.ns].when.all(g.promises).then(function(g) {
                                try {
                                    f.apply(c,
                                        g)
                                } catch (e) {
                                    d[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Error resolving data definitions: " + a + ". Details: " + e))
                                }
                            }, function(c) {
                                d[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Error resolving data definitions: " + a + ". Details: " + c))
                            })
                        });
                        else {
                            var h = [],
                                g = a;
                            e.utils.isArray(a) || (g = [a]);
                            for (var m = 0; m < g.length; m++) h.push(b.getSync(g[m]));
                            return h = e.utils.isArray(a) ? h : h[0]
                        }
                };
                e.extract = function(a, b) {
                    var c = "",
                        e = function(a, b) {
                            var c = ~b.indexOf("#") ? b.split("#")[1] :
                                "",
                                d = c ? 0 : ~b.indexOf("[") ? parseInt(b.match(/\[(\d+)\]/)[1]) : 0,
                                g = (c ? b.split("#")[0] : d ? b.split("[")[0] : b).toLowerCase();
                            if (a == document && "html" == g && 0 == d) return document.getElementsByTagName("html")[0];
                            if (~b.indexOf("#")) return document.getElementById(b.split("#")[1]);
                            var e = a.firstChild;
                            if (!e) return null;
                            for (var f = 0, d = 0 != d ? d - 1 : d; e;) {
                                if (1 == e.nodeType) {
                                    if (e.tagName.toLowerCase() == g && "" != c && e.id == c || e.tagName.toLowerCase() == g && f == d && "" == c) return e;
                                    e.tagName.toLowerCase() == g && f++
                                }
                                e = e.nextSibling
                            }
                        },
                        g = function(a,
                            b) {
                            a = a.split("/");
                            for (var c = e(b || document, a[1]), d = 2; d < a.length; d++) {
                                if (null == c) return null;
                                c = e(c, a[d])
                            }
                            return c
                        },
                        m = function() {
                            for (var a = {}, b = d.document.getElementsByTagName("META") || [], c = 0, e = b.length; c < e; c++) {
                                var g = b[c].name || b[c].getAttribute("property") || "";
                                0 !== g.length && (a[g] = b[c].content)
                            }
                            return a
                        }(),
                        q = function(a) {
                            var b = m[a];
                            if (b) return b;
                            for (var b = d.document.getElementsByTagName("META") || [], c = 0, e = b.length; c < e; c++) {
                                var g = b[c].name || b[c].getAttribute("property") || "";
                                if (a == g) return b[c].content
                            }
                        },
                        h = function(a) {
                            return (val = (new RegExp("&" + a + "=([^&]*)")).exec(d.location.search.replace(/^\?/, "&"))) ? val[0].split("=")[1] : ""
                        },
                        k = function(a) {
                            return (val = (new RegExp("^" + a + "=.*|;\\s*" + a + "=.*")).exec(d.document.cookie)) ? val[0].split("=")[1].split(";")[0] : ""
                        },
                        l = function(a) {
                            (a = n(a)) && a.nodeType && 1 == a.nodeType && (a = a.value || a.innerHTML || "");
                            return a.toString().replace(/\n|\r|\s\s+/g, "") || ""
                        },
                        n = function(a) {
                            var b = "";
                            if (0 == a.indexOf("/HTML/BODY")) b = g(a);
                            else try {
                                b = eval(a)
                            } catch (c) {
                                b = ""
                            }
                            return b
                        };
                    try {
                        return b ?
                            "meta" == b ? c = q(a) : "cookie" == b ? c = k(a) : "param" == b ? c = h(a) : "content" == b ? c = l(a) : "event" == b ? c = n(a) : "var" == b && (c = d[a]) : c = q(a) || k(a) || h(a) || l(a) || n(a) || d[a] || "", c || ""
                    } catch (r) {
                        return ""
                    }
                };
                if ("undefined" == typeof k) var k = {
                    exports: {}
                };
                return e
            }(window);
            window[ensightenOptions.ns].data.defineEngine("store", function() {
                var d = {},
                    n = window,
                    l = n.document,
                    b, e, h = Array.isArray || function(a) {
                        return "[object Array]" === Object.prototype.toString.call(a)
                    };
                d.set = function(a, b) {};
                d.get = function(a) {};
                d.remove = function(a) {};
                d.clear = function() {};
                try {
                    if ("localStorage" in n && n.localStorage) b = n.localStorage, d.set = function(a, c) {
                        var d, e, f = window.JSON && window.JSON.stringify ? window.JSON : window[ensightenOptions.ns].JSON;
                        if (h(a))
                            for (d = 0, e = a.length; d < e; d++) b.setItem(a[d], "string" ===
                                typeof c[d] ? c[d] : f.stringify(c[d]));
                        else b.setItem(a, "string" === typeof c ? c : f.stringify(c))
                    }, d.get = function(a) {
                        if (h(a)) {
                            var c = {},
                                d, e;
                            d = 0;
                            for (e = a.length; d < e; d++) c[a[d]] = b.getItem(a[d]);
                            return c
                        }
                        return b.getItem(a)
                    }, d.remove = function(a) {
                        if (h(a)) {
                            var c, d;
                            c = 0;
                            for (d = a.length; c < d; c++) b.removeItem(a[c])
                        } else b.removeItem(a)
                    }, d.clear = function() {
                        b.clear()
                    }, d.all = function() {
                        return b
                    };
                    else if ("globalStorage" in n && n.globalStorage) b = n.globalStorage[n.location.hostname], d.set = function(a, c) {
                        if (h(a)) {
                            var d, e;
                            d = 0;
                            for (e = a.length; d < e; d++) b[a[d]] = c[d]
                        } else b[a] = c
                    }, d.get = function(a) {
                        if (h(a)) {
                            var c = {},
                                d, e;
                            d = 0;
                            for (e = a.length; d < e; d++) c[a[d]] = b[a[d]] && b[a[d]].value;
                            return c
                        }
                        return b[a] && b[a].value
                    }, d.remove = function(a) {
                        if (h(a)) {
                            var c, d;
                            c = 0;
                            for (d = a.length; c < d; c++) delete b[a[c]]
                        } else delete b[a]
                    }, d.clear = function() {
                        for (var a in b) delete b[a]
                    }, d.all = function() {
                        return b
                    };
                    else if (l.documentElement.addBehavior) {
                        var k = function(a) {
                                return a.replace(c, "___")
                            },
                            n = function(c) {
                                return function() {
                                    var d = Array.prototype.slice.call(arguments,
                                        0);
                                    d.unshift(b);
                                    a.appendChild(b);
                                    b.addBehavior("#default#userData");
                                    b.load("localStorage");
                                    d = c.apply(store, d);
                                    a.removeChild(b);
                                    return d
                                }
                            },
                            a, f;
                        try {
                            f = new ActiveXObject("htmlfile"), f.open(), f.write('<script>document.w=window\x3c/script><iframe src="/favicon.ico"></frame>'), f.close(), a = f.w.frames[0].document, b = a.createElement("div")
                        } catch (g) {
                            b = l.createElement("div"), a = l.body
                        }
                        var c = RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
                        d.set = n(function(a, b, c) {
                            if (h(b)) {
                                var e, f;
                                e = 0;
                                for (f = b.length; e < f; e++) {
                                    fixedKey =
                                        k(b[e]);
                                    if (void 0 === c[e]) return d.remove(fixedKey);
                                    a.setAttribute(fixedKey, c[e]);
                                    a.save("localStorage")
                                }
                            } else {
                                fixedKey = k(b);
                                if (void 0 === c) return d.remove(fixedKey);
                                a.setAttribute(fixedKey, c);
                                a.save("localStorage")
                            }
                        });
                        d.get = n(function(a, b) {
                            if (h(b)) {
                                var c = {},
                                    d, e, f;
                                e = 0;
                                for (f = b.length; e < f; e++) d = k(b[e]), c[b[e]] = a.getAttribute(d);
                                return c
                            }
                            b = k(b);
                            return a.getAttribute(b)
                        });
                        d.remove = n(function(a, b) {
                            if (h(b)) {
                                var c, d;
                                c = 0;
                                for (d = b.length; c < d; c++) a.removeAttribute(k(b[c])), a.save("localStorage")
                            } else b = k(b), a.removeAttribute(b),
                                a.save("localStorage")
                        });
                        d.clear = n(function(a) {
                            var b = a.XMLDocument.documentElement.attributes;
                            a.load("localStorage");
                            for (var c = 0, d; d = b[c]; c++) a.removeAttribute(d.name);
                            a.save("localStorage")
                        });
                        d.all = n(function(a) {
                            for (var b = a.XMLDocument.documentElement.attributes, c = {}, d = 0, e; e = b[d]; ++d) {
                                var f = k(e.name);
                                c[e.name] = a.getAttribute(f)
                            }
                            return c
                        })
                    }
                } catch (g) {}
                var p = {};
                for (e in d) p[e] = d[e];
                p.testStorage = function() {
                    try {
                        var a = "tk_" + Math.ceil(5E7 * Math.random());
                        p.set(a, "test");
                        if ("test" === p.get(a)) return p.remove(a), !0
                    } catch (b) {}
                    return !1
                };
                d.utils = p;
                return window[ensightenOptions.ns].data.local = d
            }());
            window[ensightenOptions.ns].data.defineEngine("cookie", function(d, n) {
                var l = function() {
                        return l.get.apply(l, arguments)
                    },
                    b = l.utils = {
                        isArray: Array.isArray || function(b) {
                            return "[object Array]" === Object.prototype.toString.call(b)
                        },
                        isPlainObject: window[ensightenOptions.ns].data.utils.isPlainObject,
                        toArray: function(b) {
                            return Array.prototype.slice.call(b)
                        },
                        getKeys: Object.keys || function(b) {
                            var d = [],
                                k = "";
                            for (k in b) b.hasOwnProperty(k) && d.push(k);
                            return d
                        },
                        escape: function(b) {
                            return String(b).replace(/[,;"\\=\s%]/g,
                                function(b) {
                                    return encodeURIComponent(b)
                                })
                        },
                        retrieve: function(b, d) {
                            return null == b ? d : b
                        },
                        getAllCookies: function() {
                            if ("" === d.cookie) return {};
                            for (var b = d.cookie.split("; "), h = {}, k = 0, a = b.length; k < a; k++) {
                                var f = b[k].split("=");
                                h[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
                            }
                            return h
                        },
                        set: function(e, h, k) {
                            k = k || -1;
                            if (b.isPlainObject(e))
                                for (var a in e) e.hasOwnProperty(a) && l.set(a, e[a], h);
                            else if (b.isArray(e)) {
                                var f;
                                a = 0;
                                for (f = e.length; a < f; a++) l.set(e[a], h[a], k)
                            } else {
                                a = k.expires !== n ? k.expires : l.defaults.expires ||
                                    "";
                                "number" === typeof a && (a = new Date(a));
                                a = b.isPlainObject(a) && "toGMTString" in a ? ";expires=" + a.toGMTString() : b.isPlainObject(a) && a instanceof Date ? ";expires=" + a.toUTCString() : ";expires=" + a;
                                f = (f = k.path || l.defaults.path) ? ";path=" + f : "";
                                var c = k.domain || l.defaults.domain,
                                    c = c ? ";domain=" + c : "";
                                k = k.secure || l.defaults.secure ? ";secure" : "";
                                d.cookie = b.escape(e) + "=" + b.escape(h) + a + f + c + k
                            }
                        },
                        get: function(d, h) {
                            h = h || n;
                            var k = b.getAllCookies();
                            if (b.isArray(d)) {
                                for (var a = {}, f = 0, c = d.length; f < c; f++) a[d[f]] = b.retrieve(k[d[f]],
                                    h), a[d[f]] === n && (a[d[f]] = null);
                                return a
                            }
                            a = b.retrieve(k[d], h);
                            return a === n ? null : a
                        },
                        getGMTString: function(b) {
                            var d = new Date;
                            d.setTime(d.getTime() + 864E5 * b);
                            return d.toGMTString()
                        }
                    };
                l.defaults = {
                    path: "/",
                    expires: b.getGMTString(90)
                };
                l.set = function(d, h) {
                    b.set(d, h)
                };
                l.remove = function(d) {
                    d = b.isArray(d) ? d : b.toArray(arguments);
                    for (var h = 0, k = d.length; h < k; h++) b.set(d[h], "", {
                        expires: -1
                    })
                };
                l.clear = function() {
                    return l.remove(b.getKeys(b.getAllCookies()))
                };
                l.get = function(d, h) {
                    return b.get(d, h)
                };
                l.all = function() {
                    return b.getAllCookies()
                };
                l.utils = b;
                return window[ensightenOptions.ns].data.cookie = l
            }(document));

        }

        window[ensightenOptions.ns].ensEvent = function(l, u) {
            var k = {
                queue: {},
                pollQueue: {},
                pushTrigger: function(b, g) {
                    if ("[object Array]" === Object.prototype.toString.call(b)) {
                        for (var d = 0; d < b.length; d++) k.pushTrigger(b[d], g);
                        return !0
                    }
                    if ("string" != typeof b) return !1;
                    this.queue[b] = this.queue[b] || {
                        fn: []
                    };
                    "function" == typeof g && this.queue[b].fn.push(g);
                    return !0
                },
                callTrigger: function(b, g, d) {
                    if ("string" != typeof b) return !1;
                    b = k.queue[b];
                    if ("object" == typeof b && b.fn && b.fn.length && (0 != b.fireOnFirstSet && g == u || g != u && 0 != b.fireOnUpdate))
                        for (g =
                            0; g < b.fn.length; g++) b.fn[g].call(this)
                },
                setPollOptions: function(b, g, d) {
                    this.queue[b] = this.queue[b] || {
                        fn: []
                    };
                    this.queue[b].fireOnFirstSet = g;
                    this.queue[b].fireOnUpdate = d
                },
                callPoll: function(b, g, d, l, t) {
                    if ("string" == typeof b && g && g.length && !(1 > g.length)) {
                        for (var p = 0; p < g.length; p++) k.setPollOptions(g[p], l, t);
                        k.pushWatch(b, g, d)
                    }
                },
                pushWatch: function(b, g, d) {
                    this.pollQueue[b] || (this.pollQueue[b] = {
                        previousVal: u,
                        eventArr: [],
                        valueFn: d
                    });
                    this.pollQueue[b].eventArr = this.pollQueue[b].eventArr.concat(g);
                    this.pollQueue[b].valueFn =
                        d
                },
                globalWatch: function() {
                    setInterval(function() {
                        for (key in k.pollQueue) {
                            var b = k.pollQueue[key],
                                g = b.valueFn(key);
                            if (b.previousVal !== g) {
                                for (var d = 0; d < b.eventArr.length; d++) k.callTrigger.call(l, b.eventArr[d], b.previousVal, g);
                                k.pollQueue[key].previousVal = g
                            }
                        }
                    }, 500)
                }
            };
            k.globalWatch();
            return {
                add: function(b, g) {
                    return k.pushTrigger(b, g)
                },
                get: function(b) {
                    return k.queue[b]
                },
                trigger: function(b, g) {
                    return k.callTrigger.call(g || l, b)
                },
                poll: function(b, g, d, u, t) {
                    t = t || l[ensightenOptions.ns].data.resolve;
                    return k.callPoll(b,
                        g, t, d, u)
                }
            }
        }(window);
        (function(l, u, k) {
            u[l] = k()
        })("qwery", window[ensightenOptions.ns], function() {
            function l() {
                this.c = {}
            }

            function u(a) {
                return G.g(a) || G.s(a, "(^|\\s+)" + a + "(\\s+|$)", 1)
            }

            function k(a, e) {
                for (var f = 0, c = a.length; f < c; f++) e(a[f])
            }

            function b(a) {
                for (var e = [], f = 0, c = a.length; f < c; ++f) s(a[f]) ? e = e.concat(a[f]) : e[e.length] = a[f];
                return e
            }

            function g(a) {
                for (var e = 0, f = a.length, c = []; e < f; e++) c[e] = a[e];
                return c
            }

            function d(a) {
                for (;
                    (a = a.previousSibling) && 1 != a.nodeType;);
                return a
            }

            function x(a) {
                return a.match(N)
            }

            function t(a, e, f,
                c, b, r, h, g, d, k, s) {
                var n, y, l;
                if (1 !== this.nodeType || e && "*" !== e && this.tagName && this.tagName.toLowerCase() !== e || f && (n = f.match(O)) && n[1] !== this.id) return !1;
                if (f && (l = f.match(P)))
                    for (a = l.length; a--;)
                        if (!u(l[a].slice(1)).test(this.className)) return !1;
                if (d && m.pseudos[d] && !m.pseudos[d](this, s)) return !1;
                if (c && !h)
                    for (y in d = this.attributes, d)
                        if (Object.prototype.hasOwnProperty.call(d, y) && (d[y].name || y) == b) return this;
                return c && !q(r, Q(this, b) || "", h) ? !1 : this
            }

            function p(a) {
                return H.g(a) || H.s(a, a.replace(R, "\\$1"))
            }

            function q(a, e, f) {
                switch (a) {
                    case "=":
                        return e == f;
                    case "^=":
                        return e.match(w.g("^=" + f) || w.s("^=" + f, "^" + p(f), 1));
                    case "$=":
                        return e.match(w.g("$=" + f) || w.s("$=" + f, p(f) + "$", 1));
                    case "*=":
                        return e.match(w.g(f) || w.s(f, p(f), 1));
                    case "~=":
                        return e.match(w.g("~=" + f) || w.s("~=" + f, "(?:^|\\s+)" + p(f) + "(?:\\s+|$)", 1));
                    case "|=":
                        return e.match(w.g("|=" + f) || w.s("|=" + f, "^" + p(f) + "(-|$)", 1))
                }
                return 0
            }

            function v(a, e) {
                var f = [],
                    b = [],
                    r, h, g, d, m, s = e,
                    n = C.g(a) || C.s(a, a.split(I)),
                    l = a.match(J);
                if (!n.length) return f;
                h = (n = n.slice(0)).pop();
                n.length && (r = n[n.length - 1].match(K)) && (s = y(e, r[1]));
                if (!s) return f;
                d = x(h);
                g = s !== e && 9 !== s.nodeType && l && /^[+~]$/.test(l[l.length - 1]) ? function(a) {
                    for (; s = s.nextSibling;) 1 == s.nodeType && (d[1] ? d[1] == s.tagName.toLowerCase() : 1) && (a[a.length] = s);
                    return a
                }([]) : s.getElementsByTagName(d[1] || "*");
                r = 0;
                for (h = g.length; r < h; r++)
                    if (m = t.apply(g[r], d)) f[f.length] = m;
                if (!n.length) return f;
                k(f, function(a) {
                    c(a, n, l) && (b[b.length] = a)
                });
                return b
            }

            function c(a, e, f, c) {
                function b(a, c, d) {
                    for (; d = S[f[c]](d, a);)
                        if (r(d) && t.apply(d, x(e[c])))
                            if (c) {
                                if (h =
                                    b(d, c - 1, d)) return h
                            } else return d
                }
                var h;
                return (h = b(a, e.length - 1, a)) && (!c || A(h, c))
            }

            function r(a, e) {
                return a && "object" === typeof a && (e = a.nodeType) && (1 == e || 9 == e)
            }

            function h(a) {
                var e = [],
                    f, c;
                f = 0;
                a: for (; f < a.length; ++f) {
                    for (c = 0; c < e.length; ++c)
                        if (e[c] == a[f]) continue a;
                    e[e.length] = a[f]
                }
                return e
            }

            function s(a) {
                return "object" === typeof a && isFinite(a.length)
            }

            function y(a, e, f) {
                return 9 === a.nodeType ? a.getElementById(e) : a.ownerDocument && ((f = a.ownerDocument.getElementById(e)) && A(f, a) && f || !A(a, a.ownerDocument) && E('[id="' +
                    e + '"]', a)[0])
            }

            function m(a, e) {
                var f, c, h;
                h = e ? "string" == typeof e ? m(e)[0] : !e.nodeType && s(e) ? e[0] : e : z;
                if (!h || !a) return [];
                if (a === window || r(a)) return !e || a !== window && r(h) && A(a, h) ? [a] : [];
                if (a && s(a)) return b(a);
                if (f = a.match(T)) {
                    if (f[1]) return (c = y(h, f[1])) ? [c] : [];
                    if (f[2]) return g(h.getElementsByTagName(f[2]));
                    if (U && f[3]) return g(h.getElementsByClassName(f[3]))
                }
                return E(a, h)
            }

            function n(a, e) {
                return function(f) {
                    var c, b;
                    L.test(f) ? 9 !== a.nodeType && ((b = c = a.getAttribute("id")) || a.setAttribute("id", b = "__qwerymeupscotty"),
                        e(a.parentNode || a, '[id="' + b + '"]' + f, !0), c || a.removeAttribute("id")) : f.length && e(a, f, !1)
                }
            }
            var z = document,
                D = z.documentElement,
                E, O = /#([\w\-]+)/,
                P = /\.[\w\-]+/g,
                K = /^#([\w\-]+)$/,
                V = /^([\w]+)?\.([\w\-]+)$/,
                L = /(^|,)\s*[>~+]/,
                W = /^\s+|\s*([,\s\+\~>]|$)\s*/g,
                B = /[\s\>\+\~]/,
                M = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,
                R = /([.*+?\^=!:${}()|\[\]\/\\])/g,
                T = new RegExp(K.source + "|" + /^([\w\-]+)$/.source + "|" + /^\.([\w\-]+)$/.source),
                J = new RegExp("(" + B.source + ")" + M.source, "g"),
                I = new RegExp(B.source +
                    M.source),
                N = new RegExp(/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/.source + "(" + /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/.source + ")?(" + /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/.source + ")?"),
                S = {
                    " ": function(a) {
                        return a && a !== D && a.parentNode
                    },
                    ">": function(a, e) {
                        return a && a.parentNode == e.parentNode && a.parentNode
                    },
                    "~": function(a) {
                        return a && a.previousSibling
                    },
                    "+": function(a, e, f, c) {
                        return a ? (f = d(a)) && (c = d(e)) && f == c && f : !1
                    }
                };
            l.prototype = {
                g: function(a) {
                    return this.c[a] ||
                        void 0
                },
                s: function(a, e, f) {
                    e = f ? new RegExp(e) : e;
                    return this.c[a] = e
                }
            };
            var G = new l,
                H = new l,
                w = new l,
                C = new l,
                A = "compareDocumentPosition" in D ? function(a, e) {
                    return 16 == (e.compareDocumentPosition(a) & 16)
                } : "contains" in D ? function(a, e) {
                    e = 9 === e.nodeType || e == window ? D : e;
                    return e !== a && e.contains(a)
                } : function(a, e) {
                    for (; a = a.parentNode;)
                        if (a === e) return 1;
                    return 0
                },
                Q = function() {
                    var a = z.createElement("p");
                    return (a.innerHTML = '<a href="#x">x</a>', "#x" != a.firstChild.getAttribute("href")) ? function(a, f) {
                        return "class" === f ?
                            a.className : "href" === f || "src" === f ? a.getAttribute(f, 2) : a.getAttribute(f)
                    } : function(a, f) {
                        return a.getAttribute(f)
                    }
                }(),
                U = !!z.getElementsByClassName,
                X = z.querySelector && z.querySelectorAll,
                Y = function(a, e) {
                    var f = [],
                        c, b;
                    try {
                        if (9 === e.nodeType || !L.test(a)) return g(e.querySelectorAll(a));
                        k(c = a.split(","), n(e, function(a, e) {
                            b = a.querySelectorAll(e);
                            1 == b.length ? f[f.length] = b.item(0) : b.length && (f = f.concat(g(b)))
                        }));
                        return 1 < c.length && 1 < f.length ? h(f) : f
                    } catch (r) {}
                    return F(a, e)
                },
                F = function(a, e) {
                    var f = [],
                        c, b, r, d;
                    a = a.replace(W,
                        "$1");
                    if (c = a.match(V)) {
                        d = u(c[2]);
                        c = e.getElementsByTagName(c[1] || "*");
                        b = 0;
                        for (r = c.length; b < r; b++) d.test(c[b].className) && (f[f.length] = c[b]);
                        return f
                    }
                    k(c = a.split(","), n(e, function(a, c, h) {
                        d = v(c, a);
                        b = 0;
                        for (r = d.length; b < r; b++)
                            if (9 === a.nodeType || h || A(d[b], e)) f[f.length] = d[b]
                    }));
                    return 1 < c.length && 1 < f.length ? h(f) : f
                },
                B = function(a) {
                    "undefined" !== typeof a.useNativeQSA && (E = a.useNativeQSA ? X ? Y : F : F)
                };
            B({
                useNativeQSA: !0
            });
            m.configure = B;
            m.uniq = h;
            m.is = function(a, e, f) {
                if (r(e)) return a == e;
                if (s(e)) return !!~b(e).indexOf(a);
                for (var h = e.split(","), d; e = h.pop();)
                    if (d = C.g(e) || C.s(e, e.split(I)), e = e.match(J), d = d.slice(0), t.apply(a, x(d.pop())) && (!d.length || c(a, d, e, f))) return !0;
                return !1
            };
            m.pseudos = {};
            return m
        });
        (function() {
            function l(c, b, h) {
                var d;
                x || (x = window[ensightenOptions.ns].qwery);
                d = x;
                if ((d = d.call(h, b, h)) && 0 < d.length) {
                    if ("_root" == b) c = h;
                    else if (c === h) c = void 0;
                    else {
                        b: {
                            for (var g = d.length, m = 0; m < g; m++)
                                if (c === d[m]) {
                                    d = !0;
                                    break b
                                }
                            d = !1
                        }
                        d || (c.parentNode ? (t++, c = l(c.parentNode, b, h)) : c = void 0)
                    }
                    return c
                }
                return !1
            }

            function u(c, b, d, g) {
                q[c.id] || (q[c.id] = {});
                q[c.id][b] || (q[c.id][b] = {});
                q[c.id][b][d] || (q[c.id][b][d] = []);
                q[c.id][b][d].push(g)
            }

            function k(c, b, d, g) {
                if (g || d)
                    if (g)
                        for (var k = 0; k < q[c.id][b][d].length; k++) {
                            if (q[c.id][b][d][k] ===
                                g) {
                                q[c.id][b][d].pop(k, 1);
                                break
                            }
                        } else delete q[c.id][b][d];
                    else q[c.id][b] = {}
            }

            function b(c, b, h) {
                if (q[c][h]) {
                    var g = b.target || b.srcElement,
                        k, m, n = {},
                        p = m = 0;
                    t = 0;
                    for (k in q[c][h]) q[c][h].hasOwnProperty(k) && (m = l(g, k, v[c].element)) && d.matchesEvent(h, v[c].element, m, "_root" == k, b) && (t++, q[c][h][k].match = m, n[t] = q[c][h][k]);
                    b.stopPropagation = function() {
                        b.cancelBubble = !0
                    };
                    for (m = 0; m <= t; m++)
                        if (n[m])
                            for (p = 0; p < n[m].length; p++) {
                                if (!1 === n[m][p].call(n[m].match, b)) {
                                    d.cancel(b);
                                    return
                                }
                                if (b.cancelBubble) return
                            }
                }
            }

            function g(c,
                g, h, l) {
                function p(c) {
                    return function(d) {
                        b(m, d, c)
                    }
                }
                c instanceof Array || (c = [c]);
                h || "function" != typeof g || (h = g, g = "_root");
                var m = this.id,
                    n;
                for (n = 0; n < c.length; n++) q[m] && q[m][c[n]] || d.addEvent(this, c[n], p(c[n])), l ? k(this, c[n], g, h) : u(this, c[n], g, h);
                return this
            }

            function d(b, g, h, k) {
                if ("string" == typeof b && "function" == typeof g || "string" == typeof g) d(document).on(b, g, h, k || !1);
                if (!(this instanceof d)) {
                    for (var l in v)
                        if (v[l].element === b) return v[l];
                    p++;
                    v[p] = new d(b, p);
                    v[p]._on = v[p].on;
                    v[p].on = function(b, c, d, g) {
                        var h =
                            "function" == typeof c ? c : d;
                        if ("function" == typeof c ? d : g) b = [b], "string" == typeof c && b.push(c), b.push(function(b) {
                            return function(c) {
                                c.defaultPrevented || window[ensightenOptions.ns].Delegate.load(this);
                                if (this.nodeName && "a" != this.nodeName.toLowerCase()) return b.call(this);
                                "undefined" != typeof c.preventDefault ? c.preventDefault() : c.returnValue = !1;
                                b.call(this)
                            }
                        }(h)), this._on.apply(this, b);
                        else return this._on.call(this, b, c, d)
                    };
                    return v[p]
                }
                this.element = b;
                this.id = g
            }
            var x, t = 0,
                p = 0,
                q = {},
                v = {};
            d.prototype.on = function(b,
                d, h) {
                return g.call(this, b, d, h)
            };
            d.prototype.off = function(b, d, h) {
                return g.call(this, b, d, h, !0)
            };
            d.cancel = function(b) {
                b.preventDefault();
                b.stopPropagation()
            };
            d.addEvent = function(b, d, g) {
                b.element.addEventListener(d, g, "blur" == d || "focus" == d)
            };
            d.matchesEvent = function() {
                return !0
            };
            d.load = function(b) {
                setTimeout(function(b, c) {
                    return function() {
                        if (b.nodeName && "a" == b.nodeName.toLowerCase()) {
                            if (c && /^javascript\s*\:/.test(c)) return (new Function(unescape(c))).call(window);
                            c && (window.location.href = c)
                        }
                    }
                }(b, b.href ||
                    ""), 750)
            };
            window[ensightenOptions.ns].Delegate = d
        })();
        (function(l) {
            var u = l.addEvent;
            l.addEvent = function(k, b, g) {
                if (k.element.addEventListener) return u(k, b, g);
                "focus" == b && (b = "focusin");
                "blur" == b && (b = "focusout");
                k.element.attachEvent("on" + b, g)
            };
            l.cancel = function(k) {
                k.preventDefault && k.preventDefault();
                k.stopPropagation && k.stopPropagation();
                k.returnValue = !1;
                k.cancelBubble = !0
            }
        })(window[ensightenOptions.ns].Delegate);
        window[ensightenOptions.ns].on = window[ensightenOptions.ns].Delegate;
        Bootstrapper.dataDefinitionIds = [];
        Bootstrapper.getServerComponent(Bootstrapper.getExtraParams ? Bootstrapper.getExtraParams() : undefined);
    }
})();