google.maps.__gjsload__('search_impl', function(_) {
    var ocb = function(a) {
            _.F.call(this, a)
        },
        qcb = function(a) {
            var b = _.sj.Pa;
            a = a.toArray();
            pcb || (pcb = {
                K: "sssM",
                O: ["ss"]
            });
            return b.call(_.sj, a, pcb)
        },
        rcb = function(a, b) {
            _.D(a.m, 3, b)
        },
        X$ = function(a) {
            _.F.call(this, a)
        },
        scb = function() {
            var a = _.yk,
                b = _.Mj;
            this.j = _.Fg;
            this.h = _.ol(_.yu, a, _.bv + "/maps/api/js/LayersService.GetFeature", b)
        },
        vcb = function(a, b, c) {
            var d = _.rE(new scb);
            c.Yh = (0, _.Pa)(d.load, d);
            c.clickable = 0 != a.get("clickable");
            _.bEa(c, _.WK(b));
            var e = [];
            e.push(_.L(c, "click", (0, _.Pa)(tcb, null, a)));
            _.lb(["mouseover",
                "mouseout", "mousemove"
            ], function(f) {
                e.push(_.L(c, f, (0, _.Pa)(ucb, null, a, f)))
            });
            e.push(_.L(a, "clickable_changed", function() {
                a.h.clickable = 0 != a.get("clickable")
            }));
            a.j = e
        },
        tcb = function(a, b, c, d, e) {
            var f = null;
            if (e && (f = {
                    status: e.getStatus()
                }, 0 == e.getStatus())) {
                f.location = _.T(e.m, 2) ? new _.Ue(_.Fn(_.J(e.m, 2, _.Un).m, 1), _.Fn(_.J(e.m, 2, _.Un).m, 2)) : null;
                f.fields = {};
                for (var g = _.E(e.m, 3), h = 0; h < g; ++h) {
                    var k = _.xl(e.m, 3, _.bL, h);
                    f.fields[k.getKey()] = k.Ha()
                }
            }
            _.N(a, "click", b, c, d, f)
        },
        ucb = function(a, b, c, d, e, f, g) {
            var h =
                null;
            f && (h = {
                title: f[1].title,
                snippet: f[1].snippet
            });
            _.N(a, b, c, d, e, h, g)
        },
        wcb = function() {};
    _.B(ocb, _.F);
    ocb.prototype.j = function() {
        return _.Od(this.m, 2)
    };
    var pcb;
    _.B(X$, _.F);
    X$.prototype.getStatus = function() {
        return _.I(this.m, 1, -1)
    };
    X$.prototype.getLocation = function() {
        return _.J(this.m, 2, _.Un)
    };
    scb.prototype.load = function(a, b) {
        function c(g) {
            g = new X$(g);
            b(g)
        }
        var d = new ocb;
        _.D(d.m, 1, a.layerId.split("|")[0]);
        _.D(d.m, 2, a.featureId);
        rcb(d, _.Ud(_.Zd(this.j)));
        for (var e in a.parameters) {
            var f = _.Ld(d.m, 4, _.bL);
            _.D(f.m, 1, e);
            _.D(f.m, 2, a.parameters[e])
        }
        a = qcb(d);
        this.h(a, c, c);
        return a
    };
    scb.prototype.cancel = function() {
        throw Error("Not implemented");
    };
    wcb.prototype.uv = function(a) {
        if (_.Yi[15]) {
            var b = a.C,
                c = a.C = a.getMap();
            b && a.h && (a.o ? (b = b.__gm.j, b.set(b.get().qf(a.h))) : a.h && _.xEa(a.h, b) && (_.lb(a.j || [], _.If), a.j = null));
            if (c) {
                var d = a.get("layerId"),
                    e = a.get("spotlightDescription"),
                    f = a.get("paintExperimentIds"),
                    g = a.get("styler"),
                    h = a.get("mapsApiLayer"),
                    k = a.get("darkLaunch"),
                    l = a.get("mapFeatures"),
                    m = a.get("travelMapRequest"),
                    p = a.get("searchPipeMetadata"),
                    q = a.get("overlayLayer"),
                    r = a.get("caseExperimentIds"),
                    t = a.get("airQualityPipeMetadata");
                b = new _.Pm;
                d = d.split("|");
                b.layerId = d[0];
                for (var u = 1; u < d.length; ++u) {
                    var w = _.A(d[u].split(":")),
                        y = w.next().value;
                    w = _.ma(w);
                    b.parameters[y] = w.join(":")
                }
                e && (b.spotlightDescription = new _.Ls(e));
                f && (b.paintExperimentIds = f.slice(0));
                g && (b.styler = new _.Vm(g));
                m && (b.travelMapRequest = new _.fu(m));
                h && (b.mapsApiLayer = new _.wl(h));
                l && (b.mapFeatures = l);
                p && (b.searchPipeMetadata = new _.$o(p));
                q && (b.overlayLayer = new _.vr(q));
                r && (b.caseExperimentIds = r.slice(0));
                t && (b.airQualityPipeMetadata = new _.kt(t));
                b.darkLaunch = !!k;
                a.h =
                    b;
                a.o = a.get("renderOnBaseMap");
                a.o ? (a = c.__gm.j, a.set(a.get().Kd(b))) : vcb(a, c, b);
                _.R(c, "Lg");
                _.P(c, 148282)
            }
        }
    };
    _.Bf("search_impl", new wcb);
});