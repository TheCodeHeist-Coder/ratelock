import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiGithub,
  FiShield,
  FiZap,
  FiCheck,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "./HeroSection.css";

export default function HeroSection() {
  // Site is dark-only now — the light/dark toggle was removed.
  const darkMode = true;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Glass effect once the page is scrolled past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navLinks = ["Features", "Docs", "Pricing"];

  return (
    <div
      className={`relative overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)"
              : "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          }}
        />
        {/* green glow */}
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-[#00E6A8]/20 blur-[140px]" />
        <div
          className={`absolute right-[-10%] top-[30%] h-72 w-72 rounded-full blur-[120px] ${
            darkMode ? "bg-emerald-500/10" : "bg-emerald-400/20"
          }`}
        />
      </div>

      {/* ── Header (fixed / sticky across the page) ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 py-4 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="RateLock"
              className="h-9 w-9 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-special text-lg font-bold uppercase tracking-[0.25em] text-white">
              Rate<span className="text-[#00E6A8]">Lock</span>
            </span>
          </Link>

          {/* Center nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`text-sm font-medium transition-colors ${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className={`hidden text-sm font-medium transition-colors lg:block ${
                darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="hidden items-center gap-1.5 rounded-xl bg-[#00E6A8] px-4 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(0,230,168,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,230,168,0.45)] lg:inline-flex"
            >
              Get started
              <FiArrowRight size={15} />
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              className={`lg:hidden ${darkMode ? "text-gray-100" : "text-gray-900"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className={`mx-4 mt-3 rounded-2xl border p-4 lg:hidden ${
              darkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
            }`}
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}
                >
                  {item}
                </a>
              ))}
              <hr className={darkMode ? "border-white/10" : "border-gray-200"} />
              <Link to="/login" className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#00E6A8] px-4 py-2.5 text-sm font-semibold text-black"
              >
                Get started <FiArrowRight size={15} />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Announcement pill */}
          <div
            className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur ${
              darkMode
                ? "border-white/10 bg-white/5 text-gray-200"
                : "border-gray-200 bg-white/70 text-gray-700"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E6A8] opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#00E6A8]" />
            </span>
            Redis-powered · made by developers, for developers
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            API rate limiting,
            <br />
            <span className="bg-gradient-to-r from-[#00E6A8] via-emerald-400 to-[#00b873] bg-clip-text text-transparent">
              shipped in two lines.
            </span>
          </h1>

          {/* Subcopy */}
          <p
            className={`mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Stop paying for API gateways you don't need. RateLock adds production-grade
            rate limiting to any backend — Redis-backed, dashboard included, zero infra to manage.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00E6A8] px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(0,230,168,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(0,230,168,0.5)] sm:w-auto"
            >
              Start for free
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold transition-all sm:w-auto ${
                darkMode
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiGithub size={16} />
              View on GitHub
            </a>
          </div>

          {/* Trust strip */}
          <div
            className={`mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            {["No credit card required", "2-line integration", "Sub-10ms latency"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <FiCheck size={14} className="text-[#00b873]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Product mockup ── */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Floating stat chips */}
          <div
            className={`absolute -left-4 top-10 z-20 hidden animate-float items-center gap-2 rounded-xl border px-3.5 py-2.5 shadow-xl backdrop-blur-md md:flex ${
              darkMode ? "border-white/10 bg-black/70 text-white" : "border-gray-200 bg-white/90 text-gray-900"
            }`}
          >
            <FiZap className="text-[#00E6A8]" size={16} />
            <div className="text-left">
              <p className="text-sm font-bold leading-none">&lt;10ms</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">p99 latency</p>
            </div>
          </div>
          <div
            className={`absolute -right-4 bottom-12 z-20 hidden animate-float items-center gap-2 rounded-xl border px-3.5 py-2.5 shadow-xl backdrop-blur-md md:flex ${
              darkMode ? "border-white/10 bg-black/70 text-white" : "border-gray-200 bg-white/90 text-gray-900"
            }`}
            style={{ animationDelay: "1.5s" }}
          >
            <FiShield className="text-[#00E6A8]" size={16} />
            <div className="text-left">
              <p className="text-sm font-bold leading-none">99.99%</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">uptime SLA</p>
            </div>
          </div>

          {/* Window */}
          <div
            className={`relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur ${
              darkMode ? "border-white/10 bg-[#0b0b0d]/90" : "border-gray-200 bg-[#0b0b0d]"
            }`}
          >
            {/* chrome */}
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-white/40">app/middleware.ts</span>
            </div>

            {/* code */}
            <div className="grid gap-0 md:grid-cols-[1.3fr_1fr]">
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                <code>
                  <span className="text-fuchsia-400">import</span>{" "}
                  <span className="text-white">{"{ RateLock }"}</span>{" "}
                  <span className="text-fuchsia-400">from</span>{" "}
                  <span className="text-amber-300">"@ratelock/sdk"</span>;
                  {"\n\n"}
                  <span className="text-fuchsia-400">const</span>{" "}
                  <span className="text-sky-300">limiter</span> ={" "}
                  <span className="text-fuchsia-400">new</span>{" "}
                  <span className="text-[#00E6A8]">RateLock</span>(
                  <span className="text-white">{"{"}</span>
                  {"\n"}
                  {"  "}apiKey: <span className="text-amber-300">process.env.RL_KEY</span>,
                  {"\n"}
                  <span className="text-white">{"}"}</span>);
                  {"\n\n"}
                  <span className="text-gray-500">{"// drop into any route"}</span>
                  {"\n"}
                  <span className="text-fuchsia-400">await</span>{" "}
                  <span className="text-sky-300">limiter</span>.
                  <span className="text-[#00E6A8]">protect</span>(req, res);
                </code>
              </pre>

              {/* response panel */}
              <div className="border-t border-white/5 p-5 md:border-l md:border-t-0">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Live response
                </p>
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-md bg-[#00E6A8]/15 px-2 py-1 font-mono text-[11px] font-bold text-[#00E6A8]">
                    200 OK
                  </span>
                  <span className="font-mono text-[11px] text-white/50">allowed</span>
                </div>
                <div className="space-y-2.5 font-mono text-[11px] text-white/60">
                  <div className="flex justify-between">
                    <span>X-RateLimit-Limit</span>
                    <span className="text-white/90">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>X-RateLimit-Remaining</span>
                    <span className="text-[#00E6A8]">97</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[97%] rounded-full bg-gradient-to-r from-[#00b873] to-[#00E6A8]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
