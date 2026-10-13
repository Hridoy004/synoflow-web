(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  22016,
  (e, t, r) => {
    "use strict";
    e.i(47167), Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      default: function () {
        return y;
      },
      useLinkStatus: function () {
        return v;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let a = e.r(90809),
      i = e.r(43476),
      u = a._(e.r(71645)),
      l = e.r(95057),
      s = e.r(8372),
      c = e.r(18581),
      f = e.r(18967),
      d = e.r(5550),
      p = e.r(88540),
      h = e.r(91949),
      m = e.r(73668),
      g = e.r(9396);
    function y(t) {
      var r;
      let n,
        o,
        a,
        [y, v] = (0, u.useOptimistic)(h.IDLE_LINK_STATUS),
        x = (0, u.useRef)(null),
        {
          href: j,
          as: S,
          children: P,
          prefetch: _ = null,
          passHref: E,
          replace: C,
          shallow: O,
          scroll: N,
          onClick: T,
          onMouseEnter: F,
          onTouchStart: w,
          legacyBehavior: R = !1,
          onNavigate: L,
          transitionTypes: A,
          ref: k,
          unstable_dynamicOnHover: I,
          ...U
        } = t;
      (n = P),
        R &&
          ("string" == typeof n || "number" == typeof n) &&
          (n = (0, i.jsx)("a", { children: n }));
      let M = u.default.useContext(s.AppRouterContext),
        $ = !1 !== _,
        B = !1 === _ ? "none" : !0 === _ ? "full" : "auto",
        D =
          "none" !== B
            ? "auto" === B
              ? g.FetchStrategy.PPR
              : g.FetchStrategy.Full
            : g.FetchStrategy.PPR,
        z = "string" == typeof (r = S || j) ? r : (0, l.formatUrl)(r);
      if (R) {
        if (n?.$$typeof === Symbol.for("react.lazy"))
          throw Object.defineProperty(
            Error(
              "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.",
            ),
            "__NEXT_ERROR_CODE",
            { value: "E863", enumerable: !1, configurable: !0 },
          );
        o = u.default.Children.only(n);
      }
      let K = R ? o && "object" == typeof o && o.ref : k,
        V,
        W = u.default.useCallback(
          (e) => (
            null !== M &&
              (x.current = (0, h.mountLinkInstance)(e, z, M, D, $, v, V)),
            () => {
              x.current &&
                ((0, h.unmountLinkForCurrentNavigation)(x.current),
                (x.current = null)),
                (0, h.unmountPrefetchableInstance)(e);
            }
          ),
          [$, z, M, D, v, V],
        ),
        Q = {
          ref: (0, c.useMergedRef)(W, K),
          onClick(t) {
            R || "function" != typeof T || T(t),
              R &&
                o.props &&
                "function" == typeof o.props.onClick &&
                o.props.onClick(t),
              !M ||
                t.defaultPrevented ||
                (function (t, r, n, o, a, i, l, s = "none") {
                  if ("u" > typeof window) {
                    let c,
                      { nodeName: f } = t.currentTarget;
                    if (
                      ("A" === f.toUpperCase() &&
                        (((c = t.currentTarget.getAttribute("target")) &&
                          "_self" !== c) ||
                          t.metaKey ||
                          t.ctrlKey ||
                          t.shiftKey ||
                          t.altKey ||
                          (t.nativeEvent && 2 === t.nativeEvent.which))) ||
                      t.currentTarget.hasAttribute("download")
                    )
                      return;
                    if (!(0, m.isLocalURL)(r)) {
                      o && (t.preventDefault(), location.replace(r));
                      return;
                    }
                    if ((t.preventDefault(), i)) {
                      let e = !1;
                      if (
                        (i({
                          preventDefault: () => {
                            e = !0;
                          },
                        }),
                        e)
                      )
                        return;
                    }
                    let { dispatchNavigateAction: d } = e.r(99781);
                    u.default.startTransition(() => {
                      d(
                        r,
                        o ? "replace" : "push",
                        !1 === a
                          ? p.ScrollBehavior.NoScroll
                          : p.ScrollBehavior.Default,
                        n.current,
                        l,
                        s,
                      );
                    });
                  }
                })(t, z, x, C, N, L, A, B);
          },
          onMouseEnter(e) {
            R || "function" != typeof F || F(e),
              R &&
                o.props &&
                "function" == typeof o.props.onMouseEnter &&
                o.props.onMouseEnter(e),
              M && $ && (0, h.onNavigationIntent)(e.currentTarget, !0 === I);
          },
          onTouchStart: function (e) {
            R || "function" != typeof w || w(e),
              R &&
                o.props &&
                "function" == typeof o.props.onTouchStart &&
                o.props.onTouchStart(e),
              M && $ && (0, h.onNavigationIntent)(e.currentTarget, !0 === I);
          },
        };
      return (
        (0, f.isAbsoluteUrl)(z)
          ? (Q.href = z)
          : (R && !E && ("a" !== o.type || "href" in o.props)) ||
            (Q.href = (0, d.addBasePath)(z)),
        (a = R
          ? u.default.cloneElement(o, Q)
          : (0, i.jsx)("a", { ...U, ...Q, children: n })),
        (0, i.jsx)(b.Provider, { value: y, children: a })
      );
    }
    let b = (0, u.createContext)(h.IDLE_LINK_STATUS),
      v = () => (0, u.useContext)(b);
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  18581,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "useMergedRef", {
        enumerable: !0,
        get: function () {
          return o;
        },
      });
    let n = e.r(71645);
    function o(e, t) {
      let r = (0, n.useRef)(null),
        o = (0, n.useRef)(null);
      return (0, n.useCallback)(
        (n) => {
          if (null === n) {
            let e = r.current;
            e && ((r.current = null), e());
            let t = o.current;
            t && ((o.current = null), t());
          } else e && (r.current = a(e, n)), t && (o.current = a(t, n));
        },
        [e, t],
      );
    }
    function a(e, t) {
      if ("function" != typeof e)
        return (
          (e.current = t),
          () => {
            e.current = null;
          }
        );
      {
        let r = e(t);
        return "function" == typeof r ? r : () => e(null);
      }
    }
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  18967,
  (e, t, r) => {
    "use strict";
    e.i(47167), Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      DecodeError: function () {
        return y;
      },
      MiddlewareNotFoundError: function () {
        return j;
      },
      MissingStaticPage: function () {
        return x;
      },
      NormalizeError: function () {
        return b;
      },
      PageNotFoundError: function () {
        return v;
      },
      SP: function () {
        return m;
      },
      ST: function () {
        return g;
      },
      WEB_VITALS: function () {
        return a;
      },
      execOnce: function () {
        return i;
      },
      getDisplayName: function () {
        return f;
      },
      getLocationOrigin: function () {
        return s;
      },
      getURL: function () {
        return c;
      },
      isAbsoluteUrl: function () {
        return l;
      },
      isResSent: function () {
        return d;
      },
      loadGetInitialProps: function () {
        return h;
      },
      normalizeRepeatedSlashes: function () {
        return p;
      },
      stringifyError: function () {
        return S;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let a = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"];
    function i(e) {
      let t,
        r = !1;
      return (...n) => (r || ((r = !0), (t = e(...n))), t);
    }
    let u = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
      l = (e) => {
        let t = e.charCodeAt(0);
        return !!((t >= 65 && t <= 90) || (t >= 97 && t <= 122)) && u.test(e);
      };
    function s() {
      let { protocol: e, hostname: t, port: r } = window.location;
      return `${e}//${t}${r ? ":" + r : ""}`;
    }
    function c() {
      let { href: e } = window.location,
        t = s();
      return e.substring(t.length);
    }
    function f(e) {
      return "string" == typeof e ? e : e.displayName || e.name || "Unknown";
    }
    function d(e) {
      return e.finished || e.headersSent;
    }
    function p(e) {
      let t = e.split("?");
      return (
        t[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") +
        (t[1] ? `?${t.slice(1).join("?")}` : "")
      );
    }
    async function h(e, t) {
      let r = t.res || (t.ctx && t.ctx.res);
      if (!e.getInitialProps)
        return t.ctx && t.Component
          ? { pageProps: await h(t.Component, t.ctx) }
          : {};
      let n = await e.getInitialProps(t);
      if (r && d(r)) return n;
      if (!n)
        throw Object.defineProperty(
          Error(
            `"${f(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`,
          ),
          "__NEXT_ERROR_CODE",
          { value: "E1025", enumerable: !1, configurable: !0 },
        );
      return n;
    }
    let m = "u" > typeof performance,
      g =
        m &&
        ["mark", "measure", "getEntriesByName"].every(
          (e) => "function" == typeof performance[e],
        );
    class y extends Error {}
    class b extends Error {}
    class v extends Error {
      constructor(e) {
        super(),
          (this.code = "ENOENT"),
          (this.name = "PageNotFoundError"),
          (this.message = `Cannot find module for page: ${e}`);
      }
    }
    class x extends Error {
      constructor(e, t) {
        super(),
          (this.message = `Failed to load static file for page: ${e} ${t}`);
      }
    }
    class j extends Error {
      constructor() {
        super(),
          (this.code = "ENOENT"),
          (this.message = "Cannot find the middleware module");
      }
    }
    function S(e) {
      return JSON.stringify({ message: e.message, stack: e.stack });
    }
  },
  73668,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 }),
      Object.defineProperty(r, "isLocalURL", {
        enumerable: !0,
        get: function () {
          return a;
        },
      });
    let n = e.r(18967),
      o = e.r(52817);
    function a(e) {
      if (!(0, n.isAbsoluteUrl)(e)) return !0;
      try {
        let t = (0, n.getLocationOrigin)(),
          r = new URL(e, t);
        return r.origin === t && (0, o.hasBasePath)(r.pathname);
      } catch (e) {
        return !1;
      }
    }
  },
  98183,
  (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      assign: function () {
        return l;
      },
      searchParamsToUrlQuery: function () {
        return a;
      },
      urlQueryToSearchParams: function () {
        return u;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    function a(e) {
      let t = {};
      for (let [r, n] of e.entries()) {
        let e = t[r];
        void 0 === e
          ? (t[r] = n)
          : Array.isArray(e)
            ? e.push(n)
            : (t[r] = [e, n]);
      }
      return t;
    }
    function i(e) {
      return "string" == typeof e
        ? e
        : ("number" != typeof e || isNaN(e)) && "boolean" != typeof e
          ? ""
          : String(e);
    }
    function u(e) {
      let t = new URLSearchParams();
      for (let [r, n] of Object.entries(e))
        if (Array.isArray(n)) for (let e of n) t.append(r, i(e));
        else t.set(r, i(n));
      return t;
    }
    function l(e, ...t) {
      for (let r of t) {
        for (let t of r.keys()) e.delete(t);
        for (let [t, n] of r.entries()) e.append(t, n);
      }
      return e;
    }
  },
  95057,
  (e, t, r) => {
    "use strict";
    e.i(47167), Object.defineProperty(r, "__esModule", { value: !0 });
    var n = {
      formatUrl: function () {
        return u;
      },
      formatWithValidation: function () {
        return s;
      },
      urlObjectKeys: function () {
        return l;
      },
    };
    for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
    let a = e.r(90809)._(e.r(98183)),
      i = /https?|ftp|gopher|file/;
    function u(e) {
      let { auth: t, hostname: r } = e,
        n = e.protocol || "",
        o = e.pathname || "",
        u = e.hash || "",
        l = e.query || "",
        s = !1;
      (t = t ? encodeURIComponent(t).replace(/%3A/i, ":") + "@" : ""),
        e.host
          ? (s = t + e.host)
          : r &&
            ((s = t + (~r.indexOf(":") ? `[${r}]` : r)),
            e.port && (s += ":" + e.port)),
        l && "object" == typeof l && (l = String(a.urlQueryToSearchParams(l)));
      let c = e.search || (l && `?${l}`) || "";
      return (
        n && !n.endsWith(":") && (n += ":"),
        e.slashes || ((!n || i.test(n)) && !1 !== s)
          ? ((s = "//" + (s || "")), o && "/" !== o[0] && (o = "/" + o))
          : s || (s = ""),
        u && "#" !== u[0] && (u = "#" + u),
        c && "?" !== c[0] && (c = "?" + c),
        (o = o.replace(/[?#]/g, encodeURIComponent)),
        (c = c.replace("#", "%23")),
        `${n}${s}${o}${c}${u}`
      );
    }
    let l = [
      "auth",
      "hash",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "slashes",
    ];
    function s(e) {
      return u(e);
    }
  },
  18566,
  (e, t, r) => {
    t.exports = e.r(76562);
  },
  11097,
  (e) => {
    "use strict";
    var t = e.i(43476),
      r = e.i(932);
    e.i(64485);
    var n = e.i(31121);
    e.i(53132);
    var o = e.i(33032),
      a = e.i(41452),
      i = e.i(72382),
      u = e.i(13279),
      l = e.i(22016),
      s = e.i(18566),
      c = e.i(71645),
      f = e.i(94614),
      d = e.i(19455),
      p = e.i(42450),
      h = e.i(93479),
      m = e.i(87968),
      g = e.i(73635);
    function y(e) {
      return !e;
    }
    function b(e) {
      let r = e.state.meta.isTouched && !e.state.meta.isValid;
      return (0, t.jsxs)(p.Field, {
        "data-invalid": r,
        children: [
          (0, t.jsx)(p.FieldLabel, { htmlFor: e.name, children: "Email" }),
          (0, t.jsx)(h.Input, {
            id: e.name,
            name: e.name,
            onChange: (t) => e.handleChange(t.target.value),
            onBlur: e.handleBlur,
            value: e.state.value,
            autoComplete: "off",
            "aria-invalid": r,
          }),
          r && (0, t.jsx)(p.FieldError, { errors: e.state.meta.errors }),
        ],
      });
    }
    function v(e) {
      g.toast.add({
        title: "Authorization failure",
        description: e.message || "Something went wrong. Please try again",
        type: "error",
      });
    }
    e.s([
      "default",
      0,
      function () {
        let e,
          x,
          j,
          S,
          P,
          _,
          E,
          C,
          O,
          N,
          T,
          F,
          w,
          R,
          L,
          A,
          k = (0, r.c)(32),
          [I, U] = (0, c.useState)(!1),
          M = (0, s.useRouter)(),
          { mutate: $, isPending: B } = (0, n.useLogin)();
        k[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = {
              email: "superadmin@gmail.com",
              password: "Super@admin12345",
            }),
            (x = { onSubmit: o.loginSchema }),
            (k[0] = e),
            (k[1] = x))
          : ((e = k[0]), (x = k[1])),
          k[2] !== $ || k[3] !== M
            ? ((j = {
                defaultValues: e,
                validators: x,
                onSubmit: (e) => {
                  let { value: t } = e;
                  $(
                    { email: t.email, password: t.password },
                    {
                      onSuccess: (e) => {
                        g.toast.add({
                          title: "Login Success",
                          description: "Welcome back",
                          type: "success",
                        }),
                          M.push("/");
                      },
                      onError: v,
                    },
                  );
                },
              }),
              (k[2] = $),
              (k[3] = M),
              (k[4] = j))
            : (j = k[4]);
        let D = (0, a.useForm)(j);
        return (
          k[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((S = (0, t.jsxs)("div", {
                className: "flex flex-col items-center gap-2 text-center",
                children: [
                  (0, t.jsx)("h1", {
                    className: "text-2xl font-bold tracking-tight",
                    children: "Login to your account",
                  }),
                  (0, t.jsx)("p", {
                    className: "text-balance text-sm text-muted-foreground",
                    children: "Enter your email below to login to your account",
                  }),
                ],
              })),
              (k[5] = S))
            : (S = k[5]),
          k[6] !== D
            ? ((P = (e) => {
                e.preventDefault(), D.handleSubmit();
              }),
              (k[6] = D),
              (k[7] = P))
            : (P = k[7]),
          k[8] !== D.Field
            ? ((_ = (0, t.jsx)(D.Field, { name: "email", children: b })),
              (k[8] = D.Field),
              (k[9] = _))
            : (_ = k[9]),
          k[10] !== I
            ? ((E = (e) => {
                let r = e.state.meta.isTouched && !e.state.meta.isValid;
                return (0, t.jsxs)(p.Field, {
                  "data-invalid": r,
                  children: [
                    (0, t.jsx)(p.FieldLabel, {
                      htmlFor: e.name,
                      children: "Password",
                    }),
                    (0, t.jsxs)("div", {
                      className: "relative",
                      children: [
                        (0, t.jsx)(h.Input, {
                          id: e.name,
                          name: e.name,
                          type: I ? "text" : "password",
                          onChange: (t) => e.handleChange(t.target.value),
                          onBlur: e.handleBlur,
                          value: e.state.value,
                          autoComplete: "off",
                          "aria-invalid": r,
                        }),
                        (0, t.jsx)("button", {
                          className:
                            "absolute right-3 top-1/2 -translate-y-1/2",
                          type: "button",
                          onClick: () => U(y),
                          children: I
                            ? (0, t.jsx)(u.EyeClosed, { className: "size-4" })
                            : (0, t.jsx)(i.Eye, { className: "size-4" }),
                        }),
                      ],
                    }),
                    r &&
                      (0, t.jsx)(p.FieldError, { errors: e.state.meta.errors }),
                  ],
                });
              }),
              (k[10] = I),
              (k[11] = E))
            : (E = k[11]),
          k[12] !== D.Field || k[13] !== E
            ? ((C = (0, t.jsx)(D.Field, { name: "password", children: E })),
              (k[12] = D.Field),
              (k[13] = E),
              (k[14] = C))
            : (C = k[14]),
          k[15] !== B
            ? ((O = B
                ? (0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)(m.Spinner, {}), " submitting"],
                  })
                : "Submit"),
              (k[15] = B),
              (k[16] = O))
            : (O = k[16]),
          k[17] !== B || k[18] !== O
            ? ((N = (0, t.jsx)(d.Button, {
                disabled: B,
                type: "submit",
                children: O,
              })),
              (k[17] = B),
              (k[18] = O),
              (k[19] = N))
            : (N = k[19]),
          k[20] !== _ || k[21] !== C || k[22] !== N
            ? ((T = (0, t.jsxs)(p.FieldGroup, { children: [_, C, N] })),
              (k[20] = _),
              (k[21] = C),
              (k[22] = N),
              (k[23] = T))
            : (T = k[23]),
          k[24] !== T || k[25] !== P
            ? ((F = (0, t.jsx)("form", { onSubmit: P, children: T })),
              (k[24] = T),
              (k[25] = P),
              (k[26] = F))
            : (F = k[26]),
          k[27] === Symbol.for("react.memo_cache_sentinel")
            ? ((w = (0, t.jsx)(p.FieldSeparator, {
                children: "Or continue with",
              })),
              (R = (0, t.jsx)(f.default, {})),
              (k[27] = w),
              (k[28] = R))
            : ((w = k[27]), (R = k[28])),
          k[29] === Symbol.for("react.memo_cache_sentinel")
            ? ((L = (0, t.jsxs)("div", {
                className: "text-center text-sm text-muted-foreground",
                children: [
                  "Don't have an account?",
                  " ",
                  (0, t.jsx)(l.default, {
                    href: "/register",
                    className:
                      "font-medium underline underline-offset-4 hover:text-primary",
                    children: "Register",
                  }),
                ],
              })),
              (k[29] = L))
            : (L = k[29]),
          k[30] !== F
            ? ((A = (0, t.jsxs)("div", {
                className: "flex flex-col gap-5",
                children: [S, F, w, R, L],
              })),
              (k[30] = F),
              (k[31] = A))
            : (A = k[31]),
          A
        );
      },
    ]);
  },
]);
