google.maps.__gjsload__('overlay', function(_) {
    var Qw = function(a) {
            this.h = a
        },
        pna = function() {},
        Rw = function(a) {
            a.Oo = a.Oo || new pna;
            return a.Oo
        },
        qna = function(a) {
            this.Ea = new _.Gi(function() {
                var b = a.Oo;
                if (a.getPanes()) {
                    if (a.getProjection()) {
                        if (!b.En && a.onAdd) a.onAdd();
                        b.En = !0;
                        a.draw()
                    }
                } else {
                    if (b.En)
                        if (a.onRemove) a.onRemove();
                        else a.remove();
                    b.En = !1
                }
            }, 0)
        },
        rna = function(a, b) {
            function c() {
                return _.Hi(e.Ea)
            }
            var d = Rw(a),
                e = d.um;
            e || (e = d.um = new qna(a));
            _.lb(d.Ra || [], _.If);
            var f = d.Za = d.Za || new _.Wu,
                g = b.__gm;
            f.bindTo("zoom", g);
            f.bindTo("offset", g);
            f.bindTo("center",
                g, "projectionCenterQ");
            f.bindTo("projection", b);
            f.bindTo("projectionTopLeft", g);
            f = d.et = d.et || new Qw(f);
            f.bindTo("zoom", g);
            f.bindTo("offset", g);
            f.bindTo("projection", b);
            f.bindTo("projectionTopLeft", g);
            a.bindTo("projection", f, "outProjection");
            a.bindTo("panes", g);
            d.Ra = [_.L(a, "panes_changed", c), _.L(g, "zoom_changed", c), _.L(g, "offset_changed", c), _.L(b, "projection_changed", c), _.L(g, "projectioncenterq_changed", c)];
            c();
            b instanceof _.ag && (_.R(b, "Ox"), _.P(b, 148440))
        },
        vna = function(a) {
            if (a) {
                var b = a.getMap();
                if (sna(a) !== b && b && b instanceof _.ag) {
                    var c = b.__gm;
                    c.overlayLayer ? a.__gmop = new tna(b, a, c.overlayLayer) : c.h.then(function(d) {
                        d = d.va;
                        var e = new Sw(b, d);
                        d.ub(e);
                        c.overlayLayer = e;
                        una(a);
                        vna(a)
                    })
                }
            }
        },
        una = function(a) {
            if (a) {
                var b = a.__gmop;
                b && (a.__gmop = null, b.h.unbindAll(), b.h.set("panes", null), b.h.set("projection", null), b.o.Xd(b), b.j && (b.j = !1, b.h.onRemove ? b.h.onRemove() : b.h.remove()))
            }
        },
        sna = function(a) {
            return (a = a.__gmop) ? a.map : null
        },
        tna = function(a, b, c) {
            this.map = a;
            this.h = b;
            this.o = c;
            this.j = !1;
            _.R(this.map, "Ox");
            _.P(this.map, 148440);
            c.pd(this)
        },
        wna = function(a, b) {
            a.h.get("projection") != b && (a.h.bindTo("panes", a.map.__gm), a.h.set("projection", b))
        },
        Sw = function(a, b) {
            this.C = a;
            this.o = b;
            this.h = null;
            this.j = []
        };
    _.Sa(Qw, _.O);
    Qw.prototype.changed = function(a) {
        "outProjection" != a && (a = !!(this.get("offset") && this.get("projectionTopLeft") && this.get("projection") && _.ue(this.get("zoom"))), a == !this.get("outProjection") && this.set("outProjection", a ? this.h : null))
    };
    var Tw = {};
    _.Sa(qna, _.O);
    Tw.pd = function(a) {
        if (a) {
            var b = a.getMap();
            (Rw(a).Ls || null) !== b && (b && rna(a, b), Rw(a).Ls = b)
        }
    };
    Tw.Xd = function(a) {
        var b = Rw(a),
            c = b.Za;
        c && c.unbindAll();
        (c = b.et) && c.unbindAll();
        a.unbindAll();
        a.set("panes", null);
        a.set("projection", null);
        b.Ra && _.lb(b.Ra, _.If);
        b.Ra = null;
        b.um && (b.um.Ea.Kc(), b.um = null);
        delete Rw(a).Ls
    };
    var Uw = {};
    tna.prototype.draw = function() {
        this.j || (this.j = !0, this.h.onAdd && this.h.onAdd());
        this.h.draw && this.h.draw()
    };
    Sw.prototype.dispose = function() {};
    Sw.prototype.Xb = function(a, b, c, d, e, f, g, h) {
        var k = this.h = this.h || new _.nq(this.C, this.o, function() {});
        k.Xb(a, b, c, d, e, f, g, h);
        a = _.A(this.j);
        for (b = a.next(); !b.done; b = a.next()) b = b.value, wna(b, k), b.draw()
    };
    Sw.prototype.pd = function(a) {
        this.j.push(a);
        this.h && wna(a, this.h);
        this.o.refresh()
    };
    Sw.prototype.Xd = function(a) {
        _.pb(this.j, a)
    };
    Uw.pd = vna;
    Uw.Xd = una;
    _.Bf("overlay", {
        nq: function(a) {
            if (a) {
                (0, Tw.Xd)(a);
                (0, Uw.Xd)(a);
                var b = a.getMap();
                b && (b instanceof _.ag ? (0, Uw.pd)(a) : (0, Tw.pd)(a))
            }
        },
        preventMapHitsFrom: function(a) {
            _.Pq(a, {
                Ud: function(b) {
                    _.Gm(b.event.Ma)
                },
                wc: function(b) {
                    return _.uq(b)
                },
                lh: function(b) {
                    return _.vq(b)
                },
                fd: function(b) {
                    return _.vq(b)
                },
                zc: function(b) {
                    return _.wq(b)
                }
            }).Ai(!0)
        },
        preventMapHitsAndGesturesFrom: function(a) {
            a.addEventListener("click", _.Ff);
            a.addEventListener("contextmenu", _.Ff);
            a.addEventListener("dblclick", _.Ff);
            a.addEventListener("mousedown",
                _.Ff);
            a.addEventListener("mousemove", _.Ff);
            a.addEventListener("MSPointerDown", _.Ff);
            a.addEventListener("pointerdown", _.Ff);
            a.addEventListener("touchstart", _.Ff);
            a.addEventListener("wheel", _.Ff)
        }
    });
});