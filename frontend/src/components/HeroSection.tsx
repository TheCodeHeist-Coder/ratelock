import  { useState } from "react";
import "./HeroSection.css";

export default function HeroSection({ darkMode }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Experts", "Community Groups", "Support"];

  return (
    <div
      className={`overflow-x-hidden transition-colors duration-300 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}
    >
      {/* Header */}
      <header
        className={`relative py-4 md:py-6 transition-colors duration-300 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#"
                className="flex rounded outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-400"
              >
                <img
                  className={`w-auto h-8 transition-all duration-300 ${darkMode ? "invert brightness-200" : ""}`}
                  src="logo.svg"
                  alt="Logo"
                />
              </a>
            </div>

            {/* Center nav links - desktop */}
            <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-base font-medium transition-all duration-200 rounded focus:outline-none hover:opacity-50 focus:ring-1 focus:ring-offset-2 ${
                    darkMode
                      ? "text-gray-100 focus:ring-gray-400"
                      : "text-gray-900 focus:ring-gray-900"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right side actions (no toggle here — handled in App.jsx) */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <a
                  href="#"
                  className={`text-base font-medium transition-all duration-200 rounded focus:outline-none hover:opacity-50 focus:ring-1 focus:ring-offset-2 ${
                    darkMode
                      ? "text-gray-100 focus:ring-gray-400"
                      : "text-gray-900 focus:ring-gray-900"
                  }`}
                >
                  Login
                </a>
                <a
                  href="#"
                  className={`px-5 py-2 text-base font-semibold leading-7 transition-all duration-200 bg-transparent border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    darkMode
                      ? "text-gray-100 border-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400"
                      : "text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900"
                  }`}
                >
                  Join community
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className={darkMode ? "text-gray-100" : "text-gray-900"}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <svg
                      className="w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div
              className={`lg:hidden mt-4 pb-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <nav className="flex flex-col space-y-4 pt-4">
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`text-base font-medium hover:opacity-50 transition-all duration-200 ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {item}
                  </a>
                ))}
                <hr
                  className={darkMode ? "border-gray-700" : "border-gray-200"}
                />
                <a
                  href="#"
                  className={`text-base font-medium hover:opacity-50 transition-all duration-200 ${darkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  Login
                </a>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center px-5 py-2 text-base font-semibold border rounded-xl transition-all duration-200 ${
                    darkMode
                      ? "text-gray-100 border-gray-400 hover:bg-gray-100 hover:text-gray-900"
                      : "text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  Join community
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className={`inline-flex px-4 py-2 text-base border rounded-full ${
                darkMode
                  ? "text-gray-300 border-gray-600"
                  : "text-gray-900 border-gray-200"
              }`}
            >
              Made by Developers, for Developers
            </p>

            <h1
              className={`mt-5 text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              API Rate Limiter <br /> as a Service
            </h1>

            <p
              className={`max-w-md mx-auto mt-6 text-base leading-7 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Stop paying for API gateways you don't need. Ratelock adds rate
              limiting to any backend in 2 lines - Redis-powered, dashboard
              included, zero infra to manage.
            </p>

            {/* Gradient CTA Button */}
            <div className="relative inline-flex mt-10 group">
              <div
                className="absolute transition-all duration-1000 opacity-70 -inset-px rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
                style={{
                  background:
                    "linear-gradient(to right, #44BCFF, #FF44EC, #FF675E)",
                }}
              />
              <a
                href="#"
                className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? "bg-gray-800 focus:ring-gray-500"
                    : "bg-gray-900 focus:ring-gray-900"
                }`}
              >
                Getting started with RateLock
              </a>
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="mt-16 md:mt-20">
          <img
            className={`object-cover object-top w-full h-auto mx-auto scale-150 xl:scale-100 transition-all duration-300 ${
              darkMode ? "hero-illustration-dark" : ""
            }`}
            src="https://chatgpt.com/backend-api/estuary/content?id=file_00000000ad1871fab86112339038f9f1&ts=494827&p=fs&cid=1&sig=4d11f1238d7d0192da55418f4b35ee60fcc10ebfd01c46947fd069ede78bdfb3&v=0"
            alt="Hero illustration"
          />
        </div>
      </section>
    </div>
  );
}
