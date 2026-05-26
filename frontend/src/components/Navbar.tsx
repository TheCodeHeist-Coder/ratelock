import React from "react";
import { FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center h-16 px-8 lg:px-24 bg-black/50 backdrop-blur-md border-b border-gray-600">
    <div className="flex items-center justify-between w-full">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full border border-neon-green/30 flex items-center justify-center bg-black shadow-[0_0_15px_rgba(0,255,156,0.2)] group-hover:shadow-[0_0_20px_rgba(0,255,156,0.4)] transition-all">
          <img src="/logo.png" alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-[0.3em] text-lg uppercase  font-special leading-none">RateLock</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_5px_#00ff9c]" />
            <span className="text-[#A1A1AA] text-[8px] tracking-[0.2em] font-bold uppercase">System Operational</span>
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center gap-10">
        {["Home", "Network", "Documentation", "Pricing"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-[#A1A1AA] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full shadow-[0_0_5px_#00ff9c]" />
          </a>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        <Link to="/login" className="text-[#A1A1AA] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
          Log In
        </Link>
        <Link to="/register">
            <button className="px-6 py-2.5 border border-neon-green/50 text-neon-green text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neon-green hover:text-black transition-all duration-300 rounded-lg shadow-[0_0_10px_rgba(0,255,156,0.1)] cursor-pointer">
            Get Started
            </button>
        </Link>
      </div>
    </div>
  </nav>
);
