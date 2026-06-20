import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiGithub,
  FiCheck,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "./HeroSection.css";
import Badge from "./Badge";
import RateLimiterHero from "./Animations";
import LiveDashboard from "./LiveDashboard";
import HeroBackground from "./HeroBackground";

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
      className={`relative overflow-hidden transition-colors duration-300 ${darkMode ? "bg-black" : "bg-white"
        }`}
    >
      {/* Animated hero backdrop */}
      <HeroBackground />


      {/* ── Header (fixed / sticky across the page) ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 py-4 transition-all duration-300 ${scrolled || mobileMenuOpen
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
                className={`text-sm font-medium transition-colors ${darkMode
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
              className={`hidden text-sm font-medium transition-colors lg:block ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
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
            className={`mx-4 mt-3 rounded-2xl border p-4 lg:hidden ${darkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-white"
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

        <div className="mx-auto flex flex-col max-w-3xl text-center">
          <div className="py-12">
            <Badge />
          </div>


          <div className="pt-8">


            <h1
              className={`text-4xl font-bold leading-[1.08] tracking-wide sm:text-5xl lg:text-7xl ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              API <span className="font-special text-[#189171]"> Rate </span> limiting,
              <br />
              <span className="bg-gradient-to-r from-[#00E6A8] via-emerald-400 to-[#00b873] bg-clip-text text-transparent">
                shipped in two lines.
              </span>
            </h1>


          </div>

          <div>
            
          
          <p
            className={`mx-auto mt-6 max-w-3xl text-base leading-relaxed sm:text-lg ${
              darkMode ? "text-gray-400" : "text-gray-800"
            }`}
          >
            Stop paying for API gateways you don't need. RateLock adds production-grade
            rate limiting to any backend — Redis-backed, dashboard included, zero infra to manage.
          </p> 

          </div>

          {/* CTAs */}
          <div className="mt-9 py-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#00dba1] px-16 py-3.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(0,230,168,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(0,230,168,0.5)] sm:w-auto"
            >
              Start for free
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/TheCodeHeist-Coder/ratelock"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-16 py-3.5 text-sm font-semibold transition-all sm:w-auto ${darkMode
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
            className={`mt-7 flex flex-wrap items-center justify-center gap-x-15 gap-y-16 text-xs font-medium ${darkMode ? "text-gray-500" : "text-gray-500"
              }`}
          >
            {["No credit card required", "2-line integration", "Sub-10ms latency"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <FiCheck size={14} className="text-[#00b873]" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Product mockup ── */}
        <div className="relative mx-auto mt-16 w-[80vw] max-w-none">
          {/* Live dashboard preview */}
          <LiveDashboard />
        </div>
      </section>
    </div>
  );
}
