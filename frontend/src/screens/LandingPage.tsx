import { useState } from "react";
import HeroSection from "../components/HeroSection";
import {
  CompaniesRow,
  IntegrationSection,
  StatsSection,
  CTASection,
  Footer,
} from "../components/landingComponents";
import "../components/HeroSection.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Single dark mode toggle — fixed top-right so it's always accessible */}
      <div className="fixed top-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-xs uppercase tracking-wider shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            darkMode
              ? "bg-gray-900 border-green-400/40 text-green-400 hover:bg-gray-800 focus:ring-green-400 focus:ring-offset-black"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400 focus:ring-offset-white"
          }`}
        >
          {darkMode ? (
            <>
              {/* Sun */}
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"
                />
              </svg>
              Light Mode
            </>
          ) : (
            <>
              {/* Moon */}
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
              Dark Mode
            </>
          )}
        </button>
      </div>

      {/* All sections receive darkMode prop */}
      <HeroSection darkMode={darkMode} />
      <CompaniesRow darkMode={darkMode} />
      <IntegrationSection darkMode={darkMode} />
      <StatsSection darkMode={darkMode} />
      <CTASection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
