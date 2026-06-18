import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
];

// `minimal` renders just the brand (used on auth pages where nav links / CTAs are noise).
const Navbar = ({ minimal = false }: { minimal?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Subtle glass-on-scroll effect.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="RateLock"
              className="h-9 w-9 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-lg font-bold uppercase tracking-[0.25em] text-white">
              Rate<span className="text-[#00E6A8]">Lock</span>
            </span>
          </Link>

          {/* Center links — desktop */}
          {!minimal && (
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#00E6A8] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          )}

          {/* Actions — desktop */}
          {!minimal && (
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#00E6A8] px-5 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(0,230,168,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(0,230,168,0.45)]"
            >
              Get started
              <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          )}

          {/* Mobile toggle */}
          {!minimal && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-white md:hidden"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          )}
        </div>

        {/* Mobile sheet */}
        {!minimal && open && (
          <div className="border-t border-white/10 px-5 pb-6 pt-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#00E6A8] px-4 py-3 text-sm font-semibold text-black"
              >
                Get started <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
