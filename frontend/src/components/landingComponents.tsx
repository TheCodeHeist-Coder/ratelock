import { FiCode, FiZap, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

// Site is dark-only now — the light/dark toggle was removed.
const darkMode = true;

/* ─────────────────────────────────────────────
   CompaniesRow
───────────────────────────────────────────── */
export const CompaniesRow = () => (
  <section
    className={`py-12 border-y relative z-10 transition-colors duration-300 ${
      darkMode
        ? "border-white/5 bg-black/50 backdrop-blur-sm"
        : "border-gray-200 bg-gray-100"
    }`}
  >
    <div className="container mx-auto px-6">
      <div
        className={`flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-500`}
      >
        {["XYZ", "MYBRAND", "REPLOCART", "SHAMMY.AI", "RAJ.AI"].map(
          (company) => (
            <span
              key={company}
              className={`text-xl md:text-2xl font-bold tracking-[0.3em] font-mono ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {company}
            </span>
          ),
        )}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   IntegrationSection
───────────────────────────────────────────── */
export const IntegrationSection = () => (
  <section
    className={`py-24 transition-colors duration-300 ${
      darkMode ? "bg-black/50" : "bg-white"
    }`}
  >
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Image panel */}
        <div className="relative">
          <div
            className={`aspect-square rounded-3xl overflow-hidden border flex items-center justify-center p-8 transition-colors duration-300 ${
              darkMode
                ? "border-white/10 bg-white/5"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center relative">
              <img
                className={`w-full h-auto object-contain transition-all duration-300 ${
                  darkMode ? "" : "opacity-80"
                }`}
                src="/ratelimit.png"
                alt="Rate limit visualization"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-8 transition-colors duration-300 ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Zero Config Integration
          </h2>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Connect",
                desc: "Link your existing API infrastructure with a single line of code.",
              },
              {
                step: "02",
                title: "Configure",
                desc: "Define rate limits and traffic policies using our intuitive DSL.",
              },
              {
                step: "03",
                title: "Deploy",
                desc: "Push to the global edge network with instant propagation.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <span className="text-2xl font-bold text-green-400 font-mono flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4
                    className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`transition-colors duration-300 ${
                      darkMode ? "text-[#A1A1AA]" : "text-gray-500"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Code snippet */}
          <div
            className={`mt-12 p-6 rounded-xl border font-mono text-sm transition-colors duration-300 ${
              darkMode
                ? "bg-[#0a0a0a] border-white/5"
                : "bg-gray-900 border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/40 text-xs">javascript</span>
              <FiCode className="text-white/40" />
            </div>
            <pre className="text-white/80 overflow-x-auto leading-relaxed">
              <code>{`import { RateLock } from "@ratelock/sdk";

const limiter = new RateLock({
  apiKey: process.env.RATELOCK_KEY,
  region: "global-mesh"
});

await limiter.secure(req, res);`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   StatsSection
───────────────────────────────────────────── */
export const StatsSection = () => (
  <section
    className={`py-24 relative overflow-hidden transition-colors duration-300 ${
      darkMode ? "bg-black" : "bg-gray-50"
    }`}
  >
    {/* subtle bg grid */}
    <div
      className={`absolute inset-0 pointer-events-none ${
        darkMode ? "opacity-5" : "opacity-10"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {[
          { value: "<10ms", label: "Global Latency", delay: 0 },
          { value: "99.99%", label: "Guaranteed Uptime", delay: 0.2 },
          { value: "1M+", label: "Requests Per Second", delay: 0.4 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="stat-card"
            style={{ animationDelay: `${stat.delay}s` }}
          >
            <h2
              className={`text-6xl md:text-7xl font-bold mb-4 transition-colors duration-300 ${
                darkMode
                  ? "text-green-400"
                  : "text-green-600"
              }`}
            >
              {stat.value}
            </h2>
            <p
              className={`text-xl font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   PricingSection
───────────────────────────────────────────── */
const PRICING_PLANS = [
  {
    name: "Monthly",
    price: 8,
    period: "/month",
    cadence: "Billed every month",
    tagline: "Kick the tyres on a real project.",
    badge: null as string | null,
    featured: false,
    save: null as string | null,
  },
  {
    name: "Quarterly",
    price: 20,
    period: "/3 months",
    cadence: "Billed every 3 months",
    tagline: "For teams shipping to production.",
    badge: "Most popular",
    featured: true,
    save: "Save 17%",
  },
  {
    name: "Yearly",
    price: 80,
    period: "/year",
    cadence: "Billed once a year",
    tagline: "Best value for serious traffic.",
    badge: "Best value",
    featured: false,
    save: "Save 17%",
  },
];

const PRICING_FEATURES = [
  "Unlimited projects & API keys",
  "Sliding-window rate limiting",
  "Real-time traffic analytics",
  "Email, Slack & webhook alerts",
  "Edge network · <1ms checks",
];

export const PricingSection = () => {
  const loggedIn = useAuthStore((s) => !!s.user);
  return (
    <section id="pricing" className="relative overflow-hidden bg-black py-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-green-400/5 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-green-400">
            Pricing
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-[#A1A1AA]">
            One plan, every feature. Pick the billing period that suits you — the longer
            you commit, the more you save.
          </p>
        </div>

        {/* free tier banner */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3.5 rounded-2xl border border-green-400/20 bg-green-400/[0.04] px-6 py-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
            <FiZap size={18} />
          </div>
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">Your first 500 requests are free.</span>{" "}
            Every account starts with a 500-request guard each month — absolutely free, no
            card required.
          </p>
        </div>

        {/* cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 backdrop-blur-sm transition-all duration-300 ${
                plan.featured
                  ? "border-green-400/40 bg-green-400/[0.05] shadow-[0_0_50px_rgba(74,222,128,0.12)] md:-translate-y-3"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                    plan.featured
                      ? "bg-green-400 text-black"
                      : "border border-white/15 bg-black text-[#A1A1AA]"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                {plan.name}
              </h3>
              <p className="mt-1.5 text-sm text-[#A1A1AA]">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-sm font-medium text-[#71717A]">{plan.period}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#71717A]">
                <span>{plan.cadence}</span>
                {plan.save && (
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-semibold text-gray-300">
                    {plan.save}
                  </span>
                )}
              </div>

              <Link
                to={loggedIn ? "/dashboard" : "/register"}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${
                  plan.featured
                    ? "bg-green-400 text-black hover:bg-green-300"
                    : "border border-white/15 text-white hover:border-white/40 hover:bg-white/5"
                }`}
              >
                {loggedIn ? "Go to dashboard" : "Get started"}
              </Link>

              <ul className="mt-8 space-y-3">
                {PRICING_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <FiCheck className="mt-0.5 shrink-0 text-green-400" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[#71717A]">
          Prices in USD. Cancel anytime · no setup fees.
        </p>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   CTASection
───────────────────────────────────────────── */
export const CTASection = () => {
  const loggedIn = useAuthStore((s) => !!s.user);
  return (
  <section
    className={`py-24 transition-colors duration-300 ${
      darkMode ? "bg-black" : "bg-white"
    }`}
  >
    <div className="container mx-auto px-6">
      <div
        className={`p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden border transition-colors duration-300 ${
          darkMode
            ? "bg-white/5 border-white/10 backdrop-blur-sm"
            : "bg-gray-50 border-gray-200 shadow-xl"
        }`}
      >
        {/* top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, #4ade80, transparent)",
          }}
        />

        <h2
          className={`text-4xl md:text-6xl font-bold mb-8 transition-colors duration-300 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Ready to secure your future?
        </h2>

        <p
          className={`text-lg mb-12 max-w-2xl mx-auto transition-colors duration-300 ${
            darkMode ? "text-[#A1A1AA]" : "text-gray-500"
          }`}
        >
          Join thousands of developers building high-performance, resilient
          applications on the RateLock network.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to={loggedIn ? "/docs" : "/register"}
            className={`inline-block px-10 py-4 font-bold rounded-lg uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              darkMode
                ? "bg-green-400 text-black hover:bg-green-300"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {loggedIn ? "Read the Docs" : "Create Developer Account"}
          </Link>
          <a
            href="#pricing"
            className={`px-10 py-4 font-bold rounded-lg uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
              darkMode
                ? "text-white border-white/20 hover:border-white/40 hover:bg-white/5"
                : "text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            View Pricing Plans
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
export const Footer = () => (
  <footer
    className={`py-12 border-t transition-colors duration-300 ${
      darkMode ? "border-white/5 bg-black" : "border-gray-200 bg-gray-50"
    }`}
  >
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              darkMode
                ? "border-green-400/30 bg-black"
                : "border-green-600/30 bg-white"
            }`}
          >
            <FiZap className={darkMode ? "text-green-400" : "text-green-600"} />
          </div>
          <span
            className={`font-bold tracking-[0.2em] text-xs uppercase transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            RateLock
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8">
          {["Documentation", "API Status", "Terms of Service", "Security"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                  darkMode
                    ? "text-[#A1A1AA] hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link}
              </a>
            ),
          )}
        </div>

        {/* Copyright */}
        <p
          className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
            darkMode ? "text-[#A1A1AA]/40" : "text-gray-400"
          }`}
        >
          &copy; 2026 RateLock Infrastructure. All rights reserved.
        </p>
      </div>

      <p
        className={`pt-4 text-sm transition-colors duration-300 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
      >
        ❤️ RAJKUMAR
      </p>
    </div>
  </footer>
);
