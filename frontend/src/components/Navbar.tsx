import React from "react";
import { FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="absolute top-0 left-0 right-0 z-50 flex items-center h-24 px-8 lg:px-24">
    {/* Left Section Navigation (40%) */}
    <div className="hidden lg:flex items-center justify-between w-[40%] pr-12">
        <div className="flex items-center gap-4">
            <div className=" rounded-full border border-[#00E6A8]/30 flex items-center justify-center bg-black shadow-[0_0_15px_rgba(0,230,168,0.2)]">
                <img className="w-12 h-12" src="/logo.png" alt="" />
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold tracking-[0.4em] text-md uppercase font-special leading-none">RateLock</span>
                <span className="text-[#A1A1AA] text-[8px] tracking-[0.2em] font-bold uppercase mt-1">Advanced RateLimiting System</span>
            </div>
        </div>
    </div>

    {/* Right Section Navigation (60%) */}
    <div className="flex items-center justify-between lg:justify-end w-full lg:w-[60%] lg:pl-16">
        <div className="hidden lg:flex items-center gap-10 mr-auto">
            {["Docs", "Pricing", "System Status"].map((item) => (
                <a key={item} href="#" className="text-[#A1A1AA] hover:text-[#00E6A8] text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                    {item}
                </a>
            ))}
        </div>

        <div className="lg:hidden flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#00E6A8]/30 flex items-center justify-center bg-black">
                <FiZap size={16} className="text-[#00E6A8]" />
            </div>
            <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">Limitless</span>
        </div>
        <div className="flex items-center gap-6">
            <Link to="/login" className="text-[#A1A1AA] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                Log In
            </Link>
            <button className="px-5 py-2 border border-[#00E6A8]/50 text-[#00E6A8] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#00E6A8] hover:text-black transition-all duration-300 rounded-lg shadow-[0_0_10px_rgba(0,230,168,0.1)] cursor-pointer">
                Get Started
            </button>
        </div>
    </div>
  </nav>
);
