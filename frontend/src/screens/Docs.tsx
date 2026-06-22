import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiMenu,
  FiX,
  FiZap,
  FiCode,
  FiServer,
} from "react-icons/fi";

/* ────────────────────────────────────────────────────────────
   RateLock — User Documentation
   Single-page, scroll-spy navigation. Dark / neon-green palette,
   matching the dashboard + auth aesthetic (#00e6a8 on black).
   ──────────────────────────────────────────────────────────── */

type NavItem = { id: string; label: string };
type NavGroup = { group: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    group: "Getting started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "how-it-works", label: "How it works" },
      { id: "quickstart", label: "Quickstart" },
    ],
  },
  {
    group: "Core concepts",
    items: [
      { id: "projects", label: "Projects & API keys" },
      { id: "rules", label: "Rules & matching" },
      { id: "algorithms", label: "Algorithms" },
      { id: "analytics", label: "Analytics & events" },
      { id: "alerts", label: "Alerts" },
    ],
  },
  {
    group: "SDKs",
    items: [
      { id: "sdk-node", label: "Node / Express" },
      { id: "sdk-python", label: "Python / FastAPI" },
      { id: "direct-check", label: "Direct HTTP check" },
    ],
  },
  {
    group: "API reference",
    items: [
      { id: "api-auth", label: "Authentication" },
      { id: "api-projects", label: "Projects" },
      { id: "api-rules", label: "Rules" },
      { id: "api-alerts", label: "Alerts" },
      { id: "api-check", label: "Rate-limit check" },
      { id: "api-errors", label: "Errors & status" },
    ],
  },
  {
    group: "Operations",
    items: [
      { id: "self-host", label: "Self-hosting" },
      { id: "faq", label: "FAQ" },
    ],
  },
];

const ALL_IDS = NAV.flatMap((g) => g.items.map((i) => i.id));

export default function Docs() {
  const [active, setActive] = useState<string>(ALL_IDS[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLElement>(null);

  // Scroll-spy — highlight the section currently in the reading zone.
  // The content area is its own scroll container, so the observer roots there.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { root: scrollRef.current, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black font-main text-ink-200 selection:bg-brand-400 selection:text-black">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed left-0 top-0 h-[28rem] w-[28rem] -translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-400/5 blur-[150px]" />

      {/* ── Top bar ── */}
      <header className="z-50 shrink-0 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="btn-ghost px-2 py-2 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
            <Link to="/" className="flex items-baseline gap-2">
              <span className="font-display text-base font-bold uppercase tracking-[0.22em] text-white">
                Rate<span className="text-brand-400">Lock</span>
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-ink-500 sm:inline">
                Docs
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="btn-ghost hidden sm:inline-flex">
              Dashboard
            </Link>
            <Link to="/register" className="btn-primary px-3.5 py-2 text-[13px]">
              Get started
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full min-h-0 max-w-[1400px] flex-1">
        {/* ── Sidebar (fixed column on desktop; slide-in drawer on mobile) ── */}
        <aside
          className={`fixed inset-y-0 left-0 top-14 z-40 w-72 overflow-y-auto border-r border-white/5 bg-black/95 px-5 py-7 backdrop-blur-xl transition-transform duration-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:static lg:top-0 lg:z-0 lg:h-full lg:shrink-0 lg:translate-x-0 lg:bg-transparent ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="space-y-7">
            {NAV.map((group) => (
              <div key={group.group}>
                <p className="mb-2.5 px-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-600">
                  {group.group}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => setMenuOpen(false)}
                          className={`block rounded-lg border-l-2 px-3 py-1.5 text-[13.5px] transition-all ${
                            isActive
                              ? "border-brand-400 bg-brand-400/10 font-medium text-brand-300"
                              : "border-transparent text-ink-400 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Backdrop for mobile drawer */}
        {menuOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* ── Content (independent scroll area) ── */}
        <main
          ref={scrollRef}
          className="min-w-0 flex-1 overflow-y-auto scroll-smooth px-5 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-14 lg:py-14"
        >
          <div className="mx-auto max-w-3xl">
            <Hero />

            {/* GETTING STARTED ─────────────────────────────── */}
            <Section id="introduction" eyebrow="Getting started" title="Introduction">
              <p>
                <strong className="text-white">RateLock</strong> is rate-limiting infrastructure for
                any API or backend service. Instead of building, deploying, and maintaining your own
                token-bucket counters, Redis scripts, and per-route quota logic, you create a project,
                define a few rules, and drop a lightweight middleware into your app. Every incoming
                request is checked in under a millisecond, and traffic that exceeds your limits is
                rejected with a standard <Code>429 Too Many Requests</Code> response.
              </p>
              <p>RateLock gives you:</p>
              <Ul>
                <li>
                  <strong className="text-white">Centralized limits</strong> — rules live in one
                  control plane, not scattered across every service.
                </li>
                <li>
                  <strong className="text-white">Per-project isolation</strong> — each project has its
                  own API key, rule set, and traffic intelligence, so staging and production never
                  share state.
                </li>
                <li>
                  <strong className="text-white">Drop-in SDKs</strong> — Express and FastAPI/Starlette
                  middleware that you install once and forget.
                </li>
                <li>
                  <strong className="text-white">Live traffic intelligence</strong> — allowed vs.
                  throttled requests, top endpoints, latency, and a streaming request log.
                </li>
              </Ul>
              <Callout>
                New here? Jump straight to the{" "}
                <a href="#quickstart" className="font-medium text-brand-300 hover:underline">
                  Quickstart
                </a>{" "}
                — you can be enforcing your first limit in about five minutes.
              </Callout>
            </Section>

            <Section id="how-it-works" eyebrow="Getting started" title="How it works">
              <p>
                RateLock has two planes. The <strong className="text-white">control plane</strong> is
                the dashboard and management API where you sign in, manage projects, and author rules.
                The <strong className="text-white">data plane</strong> is a single high-performance
                endpoint, <Code>POST /api/rl/check</Code>, that your application calls on every request
                to ask one question: <em>should I allow this?</em>
              </p>
              <H3>The request lifecycle</H3>
              <Ol>
                <li>A request arrives at your service. The RateLock middleware intercepts it.</li>
                <li>
                  The middleware calls <Code>/api/rl/check</Code>, sending your project API key, the
                  endpoint path, the HTTP method, and the client IP.
                </li>
                <li>
                  RateLock resolves your project, finds the most specific matching rule, and runs an
                  atomic counter check in Redis.
                </li>
                <li>
                  It responds with <Code>allowed</Code>, the <Code>limit</Code>, the{" "}
                  <Code>remaining</Code> quota, and a <Code>reset</Code> timestamp — plus standard{" "}
                  <Code>X-RateLimit-*</Code> headers.
                </li>
                <li>
                  If allowed, your handler runs normally. If not, the middleware short-circuits with a{" "}
                  <Code>429</Code> and a <Code>Retry-After</Code> header. The event is logged
                  asynchronously for analytics.
                </li>
              </Ol>
              <H3>Built to stay out of the way</H3>
              <p>
                The counter check is backed by an atomic Redis script and active rules are cached
                in-memory, so the hot path adds negligible latency. Event logging is fire-and-forget —
                it never blocks the decision. And the SDKs <strong className="text-white">fail open</strong>{" "}
                by default: if RateLock is ever unreachable, your traffic is allowed through rather than
                blocked, so a limiter outage can never take down your API.
              </p>
            </Section>

            <Section id="quickstart" eyebrow="Getting started" title="Quickstart">
              <p>
                This walkthrough takes you from zero to an enforced limit. You'll create an account,
                spin up a project, add a rule, and wire in an SDK.
              </p>

              <H3>1 — Create an account &amp; a project</H3>
              <p>
                <Link to="/register" className="font-medium text-brand-300 hover:underline">
                  Sign up
                </Link>
                , open the dashboard, and click <strong className="text-white">New project</strong>.
                Every project is generated with its own API key. Copy it — you'll need it for the SDK.
              </p>

              <H3>2 — Add a rule</H3>
              <p>
                Open your project and create a rule. For example, to cap logins at 100 requests per
                minute, set the endpoint pattern to <Code>/api/login</Code>, the limit to{" "}
                <Code>100</Code>, and the window to <Code>60</Code> seconds. See{" "}
                <a href="#rules" className="text-brand-300 hover:underline">
                  Rules &amp; matching
                </a>{" "}
                for pattern syntax.
              </p>

              <H3>3 — Install an SDK and protect your routes</H3>
              <p>Add the middleware to your app and point it at your project's API key.</p>

              <Tabs
                tabs={[
                  {
                    label: "Node / Express",
                    code: `import express from "express";
import { rateLimiter } from "@ratelock/express";

const app = express();

app.use(rateLimiter({
  apiKey: process.env.RATELOCK_KEY!,
  serviceUrl: "https://api.ratelock.com", // your RateLock host
}));

app.get("/api/login", (req, res) => res.send("ok"));
app.listen(3000);`,
                    lang: "ts",
                  },
                  {
                    label: "Python / FastAPI",
                    code: `from fastapi import FastAPI
from ratelock import RateLimiter

app = FastAPI()

app.add_middleware(
    RateLimiter,
    api_key="YOUR_PROJECT_API_KEY",
    service_url="https://api.ratelock.com",
)

@app.get("/api/login")
def login():
    return {"ok": True}`,
                    lang: "python",
                  },
                  {
                    label: "Any language (curl)",
                    code: `curl -X POST https://api.ratelock.com/api/rl/check \\
  -H "X-RL-Key: $RATELOCK_KEY" \\
  -H "X-RL-Endpoint: /api/login" \\
  -H "X-RL-Method: POST" \\
  -H "X-RL-IP: 203.0.113.10"`,
                    lang: "bash",
                  },
                ]}
              />

              <H3>4 — Send traffic and watch it live</H3>
              <p>
                Hit your endpoint past the limit. Excess requests get a <Code>429</Code>. Back in the
                dashboard, the project's analytics show allowed vs. blocked counts, block rate, top
                endpoints, and a live request log. That's the whole loop.
              </p>
            </Section>

            {/* CORE CONCEPTS ──────────────────────────────── */}
            <Section id="projects" eyebrow="Core concepts" title="Projects & API keys">
              <p>
                A <strong className="text-white">project</strong> is an isolated environment. It owns
                its own rules, events, alerts, and a single API key. Use separate projects for staging,
                development, and production so their limits and traffic never mix.
              </p>
              <H3>The API key</H3>
              <p>
                Each project is issued a unique 64-character hex API key on creation. This key
                authenticates calls to the rate-limit check endpoint (the data plane) — it is{" "}
                <em>not</em> the same as your account login. Treat it as a secret: store it in an
                environment variable, never commit it to source control.
              </p>
              <Callout type="warn">
                If a key leaks, rotate it from the project's settings (or via the{" "}
                <a href="#api-projects" className="font-medium text-brand-300 hover:underline">
                  rotate endpoint
                </a>
                ). Rotation generates a fresh key and immediately invalidates the old one — update your
                services right after.
              </Callout>
              <p>
                Your <strong className="text-white">account</strong> (email + password) authenticates
                the dashboard and the management API using a JWT bearer token. Project API keys
                authenticate the high-volume check endpoint. Keeping them separate means the key you
                ship into your apps can never manage your account.
              </p>
            </Section>

            <Section id="rules" eyebrow="Core concepts" title="Rules & matching">
              <p>
                A <strong className="text-white">rule</strong> defines a limit for a set of endpoints.
                When a request comes in, RateLock picks the single best-matching active rule for the
                requested path and enforces it.
              </p>
              <H3>Fields</H3>
              <ParamTable
                rows={[
                  ["name", "string", "Human label for the rule."],
                  ["endpointPattern", "string", 'Which paths this rule applies to. Default "*".'],
                  ["limitCount", "int", "Max requests allowed in the window (1 – 1,000,000). Default 100."],
                  ["windowSeconds", "int", "Length of the window in seconds (1 – 86,400). Default 60."],
                  ["algorithm", "enum", "sliding_window · fixed_window · token_bucket. Default sliding_window."],
                  ["tier", "string", 'Optional grouping label. Default "default".'],
                  ["isActive", "bool", "Whether the rule is enforced. Default true."],
                ]}
              />
              <H3>Pattern matching</H3>
              <p>The endpoint pattern supports three forms, evaluated most-specific first:</p>
              <ParamTable
                head={["Pattern", "Matches"]}
                rows={[
                  ["*", "Every endpoint (a project-wide catch-all)."],
                  ["/api/login", "Only that exact path."],
                  ["/api/users*", 'Any path that starts with "/api/users".'],
                ]}
              />
              <p>
                When several rules could match, the most specific wins — an exact path beats a prefix,
                and a prefix beats the <Code>*</Code> wildcard. This lets you set a generous default and
                then tighten individual sensitive endpoints.
              </p>
              <Callout>
                If <strong className="text-white">no active rule matches</strong> a request, it is
                allowed through with no limit. Add a <Code>*</Code> rule if you want a backstop limit on
                everything.
              </Callout>
            </Section>

            <Section id="algorithms" eyebrow="Core concepts" title="Algorithms">
              <p>Each rule declares the counting algorithm it uses.</p>
              <H3>Sliding window (default)</H3>
              <p>
                RateLock tracks the exact timestamp of every request within the trailing window and
                counts how many fall inside it. As time moves forward the window slides continuously, so
                there's no burst-at-the-boundary problem you'd get with fixed buckets. The check is
                executed as a single atomic Redis script, which keeps it both fast and race-free under
                concurrency. This is the recommended choice for almost all workloads.
              </p>
              <H3>Fixed window &amp; token bucket</H3>
              <p>
                <Code>fixed_window</Code> (simple per-interval counters) and <Code>token_bucket</Code>{" "}
                (steady refill with burst capacity) are available as rule options for workloads that
                specifically need them. Sliding window is the production-hardened default and what we
                recommend unless you have a reason to choose otherwise.
              </p>
            </Section>

            <Section id="analytics" eyebrow="Core concepts" title="Analytics & events">
              <p>
                Every decision RateLock makes is recorded as an <strong className="text-white">event</strong>{" "}
                — asynchronously, so it never slows the check. Each event captures the endpoint, method,
                whether it was allowed, the client IP and user agent, the measured latency, and a
                timestamp.
              </p>
              <p>The project dashboard rolls these up over a configurable window into:</p>
              <Ul>
                <li>
                  <strong className="text-white">Totals</strong> — total, allowed, and blocked request
                  counts, plus the overall block rate.
                </li>
                <li>
                  <strong className="text-white">Average latency</strong> across all checks.
                </li>
                <li>
                  <strong className="text-white">Top endpoints</strong> by volume, each with its own
                  block rate.
                </li>
                <li>
                  <strong className="text-white">Requests over time</strong> — allowed vs. blocked,
                  bucketed hourly.
                </li>
              </Ul>
              <p>
                You can also pull the raw, most-recent events for a project to debug exactly which
                requests were throttled and why. See the{" "}
                <a href="#api-projects" className="text-brand-300 hover:underline">
                  Projects API
                </a>
                .
              </p>
            </Section>

            <Section id="alerts" eyebrow="Core concepts" title="Alerts">
              <p>
                Alerts notify you when throttling spikes. An alert watches a project's block rate over a
                rolling window and fires when it crosses a threshold.
              </p>
              <ParamTable
                rows={[
                  ["name", "string", "Label for the alert."],
                  ["thresholdPercent", "int", "Fire when the block rate meets or exceeds this %. Default 80."],
                  ["windowMinutes", "int", "Look-back window for the block-rate calculation. Default 5."],
                  ["channel", "enum", "email · slack · webhook. Default email."],
                  ["destination", "string", "Where to deliver — an email address, Slack target, or webhook URL."],
                  ["isActive", "bool", "Whether the alert is armed. Default true."],
                ]}
              />
              <p>
                A sustained spike in 429s usually means either an abusive client or a limit set too
                tight for real traffic — alerts let you catch both quickly.
              </p>
            </Section>

            {/* SDKs ───────────────────────────────────────── */}
            <Section id="sdk-node" eyebrow="SDKs" title="Node / Express">
              <p>
                The Node SDK is Express middleware that checks every request before it reaches your
                handlers.
              </p>
              <H3>Install</H3>
              <CodeBlock lang="bash" code={`npm install @ratelock/express`} />
              <H3>Use</H3>
              <CodeBlock
                lang="ts"
                code={`import express from "express";
import { rateLimiter } from "@ratelock/express";

const app = express();

app.use(rateLimiter({
  apiKey: process.env.RATELOCK_KEY!,    // required — your project API key
  serviceUrl: "https://api.ratelock.com", // optional — your RateLock host
  failOpen: true,                        // optional — allow traffic if RateLock is down (default)
  timeoutMs: 1500,                       // optional — abort the check after N ms (default 1500)
  endpoint: (req) => req.path,           // optional — customize the matched endpoint
  identify: (req) => req.ip,             // optional — customize the client identity (IP)
}));

app.get("/api/login", (req, res) => res.json({ ok: true }));
app.listen(3000);`}
              />
              <H3>Options</H3>
              <ParamTable
                rows={[
                  ["apiKey", "string", "Required. Your project API key."],
                  ["serviceUrl", "string", "RateLock host. Defaults to the managed endpoint."],
                  ["failOpen", "boolean", "Allow requests if the check fails or times out. Default true."],
                  ["timeoutMs", "number", "Per-request check timeout in ms. Default 1500."],
                  ["endpoint", "(req) => string", "Override how the endpoint path is derived."],
                  ["identify", "(req) => string", "Override how the client IP/identity is derived."],
                ]}
              />
              <p>
                On a <Code>429</Code>, the middleware short-circuits the request and mirrors the{" "}
                <Code>X-RateLimit-*</Code> and <Code>Retry-After</Code> headers onto the response, so
                your clients get a standards-compliant rate-limit signal automatically.
              </p>
            </Section>

            <Section id="sdk-python" eyebrow="SDKs" title="Python / FastAPI">
              <p>
                The Python package ships both a raw client and ASGI middleware for FastAPI / Starlette.
              </p>
              <H3>Install</H3>
              <CodeBlock
                lang="bash"
                code={`pip install ratelock            # raw client only
pip install "ratelock[fastapi]"  # + FastAPI / Starlette middleware`}
              />
              <H3>Middleware (FastAPI)</H3>
              <CodeBlock
                lang="python"
                code={`from fastapi import FastAPI
from ratelock import RateLimiter

app = FastAPI()

app.add_middleware(
    RateLimiter,
    api_key="YOUR_PROJECT_API_KEY",        # required
    service_url="https://api.ratelock.com",  # optional — your RateLock host
    fail_open=True,                          # optional — default True
    timeout=1.5,                             # optional — seconds, default 1.5
    endpoint=lambda req: req.url.path,       # optional
    identify=lambda req: req.client.host,    # optional
)

@app.get("/api/login")
def login():
    return {"ok": True}`}
              />
              <H3>Raw client</H3>
              <p>
                Use the client directly when you need to gate something that isn't an HTTP route — a
                queue worker, a cron job, a background task.
              </p>
              <CodeBlock
                lang="python"
                code={`from ratelock import RateLockClient

client = RateLockClient(api_key="YOUR_PROJECT_API_KEY")

# synchronous
result = client.check(endpoint="/jobs/export", method="POST", ip="worker-1")
if not result.allowed:
    raise RuntimeError(f"Throttled — retry after {result.retry_after}s")

# async
result = await client.acheck(endpoint="/jobs/export", method="POST", ip="worker-1")`}
              />
              <p>
                <Code>check()</Code> / <Code>acheck()</Code> return a <Code>RateLimitResult</Code> with{" "}
                <Code>allowed</Code>, <Code>limit</Code>, <Code>remaining</Code>, <Code>reset</Code>,
                and (when blocked) <Code>retry_after</Code>.
              </p>
            </Section>

            <Section id="direct-check" eyebrow="SDKs" title="Direct HTTP check">
              <p>
                No SDK for your stack? Call the check endpoint directly — it's a single POST. This is
                exactly what the SDKs do under the hood.
              </p>
              <CodeBlock
                lang="bash"
                code={`curl -i -X POST https://api.ratelock.com/api/rl/check \\
  -H "X-RL-Key: $RATELOCK_KEY" \\
  -H "X-RL-Endpoint: /api/login" \\
  -H "X-RL-Method: POST" \\
  -H "X-RL-IP: 203.0.113.10"`}
              />
              <p>
                Allow the request through your own code if <Code>allowed</Code> is true; otherwise return{" "}
                <Code>429</Code> to your caller and surface <Code>retry_after</Code>. See the{" "}
                <a href="#api-check" className="text-brand-300 hover:underline">
                  full reference
                </a>{" "}
                for every header and field.
              </p>
            </Section>

            {/* API REFERENCE ──────────────────────────────── */}
            <Section id="api-auth" eyebrow="API reference" title="Authentication">
              <p>
                Management endpoints live under <Code>/api/v1</Code> and authenticate with a JWT bearer
                token. Register or log in to receive a token, then send it as{" "}
                <Code>Authorization: Bearer &lt;token&gt;</Code> on every subsequent request.
              </p>
              <Endpoint method="POST" path="/api/v1/auth/register" />
              <p>Body: <Code>{`{ name, email, password }`}</Code> — returns a <Code>token</Code> and the new <Code>user</Code>. Passwords must be at least 6 characters.</p>
              <Endpoint method="POST" path="/api/v1/auth/login" />
              <p>Body: <Code>{`{ email, password }`}</Code> — returns a <Code>token</Code> and the <Code>user</Code>.</p>
              <Endpoint method="GET" path="/api/v1/auth/me" />
              <p>Returns the currently authenticated <Code>user</Code>. Requires the bearer token.</p>
              <CodeBlock
                lang="bash"
                code={`# log in, capture the token
curl -X POST https://api.ratelock.com/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com","password":"••••••••"}'

# use it on management calls
curl https://api.ratelock.com/api/v1/projects \\
  -H "Authorization: Bearer $RL_TOKEN"`}
              />
            </Section>

            <Section id="api-projects" eyebrow="API reference" title="Projects">
              <p>All project endpoints require the JWT bearer token and operate only on projects you own.</p>
              <Endpoint method="GET" path="/api/v1/projects" />
              <p>List your projects, each with a <Code>_count</Code> of its rules and events.</p>
              <Endpoint method="POST" path="/api/v1/projects" />
              <p>Create a project. Body: <Code>{`{ name, description? }`}</Code>. The response includes the generated <Code>apiKey</Code>.</p>
              <Endpoint method="PUT" path="/api/v1/projects/:projectId" />
              <p>Update a project. Body: <Code>{`{ name?, description? }`}</Code>.</p>
              <Endpoint method="DELETE" path="/api/v1/projects/:projectId" />
              <p>Delete a project and cascade its rules, events, and alerts.</p>
              <Endpoint method="POST" path="/api/v1/projects/:projectId/rotate-api-key" />
              <p>Issue a new API key and invalidate the old one.</p>
              <Endpoint method="GET" path="/api/v1/projects/:projectId/states" />
              <p>
                Analytics rollup. Query: <Code>hours</Code> (1–720, default 24). Returns totals,{" "}
                <Code>block_rate</Code>, <Code>avg_latency_ms</Code>, <Code>top_endpoints</Code>, and{" "}
                <Code>requests_over_time</Code>.
              </p>
              <Endpoint method="GET" path="/api/v1/projects/:projectId/events" />
              <p>Recent raw events. Query: <Code>limit</Code> (1–500, default 100).</p>
            </Section>

            <Section id="api-rules" eyebrow="API reference" title="Rules">
              <p>
                Rules are nested under a project. Request bodies use <Code>snake_case</Code>; responses
                use <Code>camelCase</Code>.
              </p>
              <Endpoint method="GET" path="/api/v1/projects/:projectId/rules" />
              <Endpoint method="POST" path="/api/v1/projects/:projectId/rules" />
              <Endpoint method="PUT" path="/api/v1/projects/:projectId/rules/:ruleId" />
              <Endpoint method="DELETE" path="/api/v1/projects/:projectId/rules/:ruleId" />
              <H3>Create / update body</H3>
              <ParamTable
                rows={[
                  ["name", "string", "Required on create. Rule label."],
                  ["endpoint_pattern", "string", 'Path pattern. Default "*".'],
                  ["limit_count", "int", "Max requests per window. Default 100."],
                  ["window_seconds", "int", "Window length in seconds. Default 60."],
                  ["algorithm", "string", "sliding_window · fixed_window · token_bucket."],
                  ["tier", "string", 'Optional grouping label. Default "default".'],
                  ["is_active", "bool", "Update only — enable or disable the rule."],
                ]}
              />
              <CodeBlock
                lang="bash"
                code={`curl -X POST https://api.ratelock.com/api/v1/projects/$PID/rules \\
  -H "Authorization: Bearer $RL_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Login limit",
    "endpoint_pattern": "/api/login",
    "limit_count": 100,
    "window_seconds": 60
  }'`}
              />
              <p>
                Changing a rule takes effect within seconds — the data plane refreshes its cached rule
                set automatically.
              </p>
            </Section>

            <Section id="api-alerts" eyebrow="API reference" title="Alerts">
              <p>Alerts are nested under a project and require the JWT bearer token.</p>
              <Endpoint method="GET" path="/api/v1/projects/:projectId/alerts" />
              <Endpoint method="POST" path="/api/v1/projects/:projectId/alerts" />
              <Endpoint method="PATCH" path="/api/v1/projects/:projectId/alerts/:alertId" />
              <Endpoint method="DELETE" path="/api/v1/projects/:projectId/alerts/:alertId" />
              <H3>Create / update body</H3>
              <ParamTable
                rows={[
                  ["name", "string", "Required on create."],
                  ["threshold_percent", "int", "Block-rate trigger. Default 80."],
                  ["window_minutes", "int", "Look-back window. Default 5."],
                  ["channel", "string", "email · slack · webhook. Default email."],
                  ["destination", "string", "Required. Delivery target."],
                  ["is_active", "bool", "Update only — arm or disarm."],
                ]}
              />
            </Section>

            <Section id="api-check" eyebrow="API reference" title="Rate-limit check">
              <p>
                The data-plane endpoint. No JWT — it authenticates with the project API key in a header.
                Built to be called on every single request.
              </p>
              <Endpoint method="POST" path="/api/rl/check" />
              <H3>Request headers</H3>
              <ParamTable
                rows={[
                  ["X-RL-Key", "required", "Your project API key."],
                  ["X-RL-Endpoint", "optional", 'Path to match against rules. Default "/".'],
                  ["X-RL-Method", "optional", 'HTTP method of the request. Default "GET".'],
                  ["X-RL-IP", "optional", "Client IP. Falls back to X-Forwarded-For / socket address."],
                ]}
              />
              <H3>Response — allowed (200)</H3>
              <CodeBlock
                lang="json"
                code={`{ "allowed": true, "limit": 100, "remaining": 73, "reset": 1750579200 }`}
              />
              <H3>Response — throttled (429)</H3>
              <CodeBlock
                lang="json"
                code={`{
  "allowed": false,
  "error": "Rate limit exceeded",
  "limit": 100,
  "remaining": 0,
  "reset": 1750579200,
  "retry_after": 42
}`}
              />
              <H3>Response headers</H3>
              <ParamTable
                rows={[
                  ["X-RateLimit-Limit", "int", "The limit applied to this request."],
                  ["X-RateLimit-Remaining", "int", "Requests left in the current window."],
                  ["X-RateLimit-Reset", "int", "Unix timestamp (seconds) when the window resets."],
                  ["Retry-After", "int", "Seconds to wait before retrying. Sent only on 429."],
                ]}
              />
              <Callout>
                <Code>reset</Code> and <Code>X-RateLimit-Reset</Code> are Unix timestamps in seconds.
                When a request is allowed but no rule matched, <Code>limit</Code> and{" "}
                <Code>remaining</Code> come back as <Code>-1</Code> to signal "unlimited".
              </Callout>
            </Section>

            <Section id="api-errors" eyebrow="API reference" title="Errors & status codes">
              <p>
                Errors return JSON shaped like <Code>{`{ "success": false, "error": "message" }`}</Code>.
              </p>
              <ParamTable
                head={["Status", "Meaning"]}
                rows={[
                  ["200", "OK — request allowed / call succeeded."],
                  ["201", "Created — register, project, rule, or alert created."],
                  ["400", "Bad request — missing or invalid fields."],
                  ["401", "Unauthorized — invalid JWT or invalid API key."],
                  ["403", "Forbidden — you don't own this project."],
                  ["404", "Not found — the resource doesn't exist."],
                  ["409", "Conflict — email already registered."],
                  ["429", "Too many requests — rate limit exceeded."],
                  ["500", "Server error."],
                  ["503", "Limiter unavailable (only when the SDK runs with fail-open disabled)."],
                ]}
              />
            </Section>

            {/* OPERATIONS ─────────────────────────────────── */}
            <Section id="self-host" eyebrow="Operations" title="Self-hosting">
              <p>
                RateLock ships as a Docker stack: PostgreSQL, Redis, the backend, and an Nginx reverse
                proxy that serves the dashboard and proxies <Code>/api</Code> to the backend.
              </p>
              <CodeBlock
                lang="bash"
                code={`# from the repo root
cp .env.example .env     # then edit the secrets below
docker compose up -d`}
              />
              <p>
                Nginx is exposed on <Code>:8080</Code> and proxies API traffic to the backend on{" "}
                <Code>:4000</Code>. Point your SDK's <Code>serviceUrl</Code> /{" "}
                <Code>service_url</Code> at your host (e.g. <Code>http://localhost:8080</Code>).
              </p>
              <H3>Environment</H3>
              <ParamTable
                rows={[
                  ["DATABASE_URL", "required", "PostgreSQL connection string."],
                  ["REDIS_HOST / REDIS_PORT", "required", "Redis host and port for the counter store."],
                  ["REDIS_PASSWORD", "optional", "Redis password, if set."],
                  ["JWT_SECRET", "required", "Signing key for dashboard / management JWTs."],
                  ["FRONTEND_URL", "required", "Allowed origin for CORS."],
                  ["PORT", "optional", "Backend HTTP port. Default 3000 (4000 in the Docker stack)."],
                ]}
              />
              <Callout type="warn">
                Always set a strong, unique <Code>JWT_SECRET</Code> and a real{" "}
                <Code>REDIS_PASSWORD</Code> before exposing a deployment to the internet.
              </Callout>
            </Section>

            <Section id="faq" eyebrow="Operations" title="FAQ">
              <H3>What happens if RateLock is unreachable?</H3>
              <p>
                By default the SDKs fail open — requests are allowed through so your API stays up. Set{" "}
                <Code>failOpen: false</Code> (Node) / <Code>fail_open=False</Code> (Python) to fail
                closed (return <Code>503</Code>) instead.
              </p>
              <H3>How much latency does a check add?</H3>
              <p>
                Very little. The decision is a single atomic Redis script, active rules are cached
                in-memory, and event logging happens asynchronously off the hot path.
              </p>
              <H3>What if a request matches no rule?</H3>
              <p>
                It's allowed with no limit. Add a <Code>*</Code> rule to enforce a project-wide
                backstop.
              </p>
              <H3>Can I change limits without redeploying?</H3>
              <p>
                Yes. Rules live in the control plane; edit them in the dashboard or via the API and the
                data plane picks them up within seconds — no code changes, no restart.
              </p>
              <H3>How are staging and production kept separate?</H3>
              <p>
                Use one project per environment. Each has its own API key, rules, and analytics, so they
                never share counters or limits.
              </p>
            </Section>

            {/* Footer */}
            <footer className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <FiArrowLeft size={14} />
                Back to home
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 transition-colors hover:text-brand-300">
                Open the dashboard
                <FiArrowRight size={14} />
              </Link>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────── */
function Hero() {
  const cards = [
    { id: "quickstart", icon: <FiZap size={16} />, title: "Quickstart", desc: "Enforce your first limit in five minutes." },
    { id: "sdk-node", icon: <FiCode size={16} />, title: "SDKs", desc: "Drop-in middleware for Node and Python." },
    { id: "api-auth", icon: <FiServer size={16} />, title: "API reference", desc: "Every endpoint, header, and field." },
  ];
  return (
    <div className="mb-4">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-brand-400">
        Documentation
      </p>
      <h1 className="mt-2 font-main text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Build with RateLock
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-400">
        Everything you need to add fast, centralized rate limiting to any API — core concepts,
        drop-in SDKs, and a complete REST reference.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="card group p-4 transition-all hover:border-brand-400/40 hover:shadow-[0_0_30px_rgba(0,230,168,0.06)]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-400/10 text-brand-400">
              {c.icon}
            </div>
            <p className="flex items-center gap-1.5 font-semibold text-white">
              {c.title}
              <FiArrowRight size={13} className="text-ink-600 transition-all group-hover:translate-x-0.5 group-hover:text-brand-400" />
            </p>
            <p className="mt-1 text-[13px] leading-snug text-ink-500">{c.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Layout / prose primitives ──────────────────────────── */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-white/5 py-12">
      <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-brand-400/80">
        {eyebrow}
      </p>
      <h2 className="font-main text-2xl font-bold tracking-tight text-white sm:text-[28px]">{title}</h2>
      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-300">{children}</div>
    </section>
  );
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="!mt-8 !mb-2 font-main text-lg font-semibold text-white">{children}</h3>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-white/5 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[12.5px] text-brand-300">
      {children}
    </code>
  );
}

function Ul({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-brand-400/70">{children}</ul>
  );
}

function Ol({ children }: { children: ReactNode }) {
  return (
    <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-brand-400/70">
      {children}
    </ol>
  );
}

function Callout({ children, type = "note" }: { children: ReactNode; type?: "note" | "warn" }) {
  const tone =
    type === "warn"
      ? "border-amber-500/25 bg-amber-500/[0.06]"
      : "border-brand-400/25 bg-brand-400/[0.05]";
  return (
    <div className={`my-5 rounded-xl border px-4 py-3.5 text-[14px] leading-relaxed text-ink-200 ${tone}`}>
      {children}
    </div>
  );
}

/* ── Code block with copy ───────────────────────────────── */
function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="group relative my-5 overflow-hidden rounded-xl border border-ink-700 bg-[#0a0a0c]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-600">
          {lang ?? "code"}
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          {copied ? <FiCheck size={12} className="text-brand-400" /> : <FiCopy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-ink-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Tabbed code (one snippet per language) ─────────────── */
function Tabs({ tabs }: { tabs: { label: string; code: string; lang?: string }[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="my-5">
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t, idx) => (
          <button
            key={t.label}
            onClick={() => setI(idx)}
            className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-all ${
              i === idx
                ? "bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/30"
                : "text-ink-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <CodeBlock code={tabs[i].code} lang={tabs[i].lang} />
    </div>
  );
}

/* ── Endpoint signature row ─────────────────────────────── */
const METHOD_TONE: Record<string, string> = {
  GET: "text-sky-300 border-sky-500/30 bg-sky-500/10",
  POST: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  PUT: "text-violet-300 border-violet-500/30 bg-violet-500/10",
  PATCH: "text-blue-300 border-blue-500/30 bg-blue-500/10",
  DELETE: "text-red-300 border-red-500/30 bg-red-500/10",
};

function Endpoint({ method, path }: { method: keyof typeof METHOD_TONE; path: string }) {
  return (
    <div className="my-3 flex items-center gap-3 overflow-x-auto rounded-lg border border-ink-700 bg-ink-900/50 px-3 py-2.5">
      <span
        className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] font-bold ${METHOD_TONE[method]}`}
      >
        {method}
      </span>
      <code className="whitespace-nowrap font-mono text-[13px] text-ink-200">{path}</code>
    </div>
  );
}

/* ── Reference table ────────────────────────────────────── */
function ParamTable({
  rows,
  head = ["Field", "Type", "Description"],
}: {
  rows: string[][];
  head?: string[];
}) {
  const cols = head.length;
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-ink-700">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-ink-700 bg-ink-900/60 text-[10px] uppercase tracking-[0.15em] text-ink-500">
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-white/5 last:border-0">
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  className={
                    cols === 3 && ci < 2
                      ? "px-4 py-2.5 align-top font-mono text-[12px] " +
                        (ci === 0 ? "whitespace-nowrap text-brand-300" : "text-ink-400")
                      : cols !== 3 && ci === 0
                      ? "px-4 py-2.5 align-top font-mono text-[12px] text-brand-300"
                      : "px-4 py-2.5 align-top text-[13.5px] text-ink-300"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
