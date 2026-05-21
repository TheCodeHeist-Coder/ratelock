import React, { useState } from "react";
import { FiGithub, FiZap, FiLayers } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

// --- Components ---

const Navbar = () => (
  <nav className="absolute top-0 left-0 right-0 z-50 flex items-center h-24 px-8 lg:px-24">
    {/* Left Section Navigation (65%) */}
    <div className="hidden lg:flex items-center justify-between w-[65%] pr-12">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black">
                <FiZap size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold tracking-[0.4em] text-sm uppercase leading-none">Limitless</span>
                <span className="text-[#A1A1AA] text-[8px] tracking-[0.2em] font-bold uppercase mt-1">Advanced AI Systems</span>
            </div>
        </div>
        
        <div className="flex items-center gap-10">
            {["Docs", "Pricing", "System Status"].map((item) => (
                <a key={item} href="#" className="text-[#A1A1AA] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                    {item}
                </a>
            ))}
        </div>
    </div>

    {/* Right Section Navigation (35%) */}
    <div className="flex items-center justify-between lg:justify-end w-full lg:w-[35%]">
        <div className="lg:hidden flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black">
                <FiZap size={16} className="text-white" />
            </div>
            <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">Limitless</span>
        </div>
        <div className="flex items-center gap-6">
            <Link to="/login" className="text-[#A1A1AA] hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                Log In
            </Link>
            <button className="hidden sm:block px-5 py-2 border border-white/10 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-lg">
                Get Started
            </button>
        </div>
    </div>
  </nav>
);

const MetricItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-white font-bold text-2xl lg:text-3xl tracking-tight">{value}</span>
    <span className="text-[#A1A1AA] text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
  </div>
);

const HeroPanel = () => (
  <div className="relative w-full lg:w-[65%] min-h-[50vh] lg:min-h-screen bg-black flex flex-col overflow-hidden">
    {/* Static Background Layer */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle Static Grid */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ 
             backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
           }} 
      />
    </div>

    {/* Content Layer */}
    <div className="relative z-20 flex flex-col h-full px-8 lg:px-24 justify-center py-24 lg:py-0">
      <div className="flex flex-col gap-10">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 rounded-full bg-white/5 w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E6A8]" />
          <span className="text-[#00E6A8] text-[9px] font-bold tracking-[0.2em] uppercase">Global Mesh Network Active</span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-xl">
          Architect for <br />
          <span className="text-[#00E6A8]">Infinite</span> Scale.
        </h1>

        <p className="text-[#A1A1AA] text-base lg:text-lg leading-relaxed max-w-[520px]">
          Deploy mission-critical rate limiting and traffic orchestration at the edge. 
          Engineered for the next generation of high-availability AI infrastructure.
        </p>

        <div className="flex flex-wrap gap-12 lg:gap-20 mt-4">
          <MetricItem value="99.99%" label="SLA Uptime" />
          <MetricItem value="<10ms" label="Global Latency" />
          <MetricItem value="256-bit" label="AES Encryption" />
        </div>
      </div>
    </div>
  </div>
);

const SocialButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button className="flex items-center justify-center gap-3 w-full py-3.5 bg-black border border-white/10 rounded-xl text-white text-[11px] font-bold tracking-[0.15em] uppercase hover:border-[#00E6A8]/50 hover:bg-[#00E6A8]/5 transition-all duration-400 group cursor-pointer">
    <Icon size={18} className="group-hover:text-[#00E6A8] transition-colors" />
    {label}
  </button>
);

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="w-full lg:w-[35%] min-h-screen bg-[#050505] flex flex-col justify-center px-8 lg:px-16 py-24 lg:py-0 border-l border-white/5">
      <div className="max-w-md w-full mx-auto space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white tracking-tight">Initialize Account</h2>
          <p className="text-[#A1A1AA] text-sm leading-relaxed opacity-80">
            Provision your developer credentials and access our globally distributed API infrastructure. 
            Free tier includes 1M monthly requests.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em] ml-1">Developer Name</label>
            <input 
              type="text" 
              placeholder="Cypher Neo"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E6A8] focus:ring-1 focus:ring-[#00E6A8] transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em] ml-1">Endpoint Email</label>
            <input 
              type="email" 
              placeholder="neo@limitless.arch"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E6A8] focus:ring-1 focus:ring-[#00E6A8] transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em] ml-1">Access Token (Password)</label>
            <input 
              type="password" 
              placeholder="••••••••••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E6A8] focus:ring-1 focus:ring-[#00E6A8] transition-all text-sm"
              required
            />
            <div className="flex items-center gap-2 mt-2 ml-1">
                <FiLayers size={10} className="text-[#00E6A8]" />
                <p className="text-[10px] text-[#A1A1AA] font-medium opacity-60">
                    Requirement: Minimum 16 characters for high entropy
                </p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00E6A8] text-black font-bold text-[11px] py-5 rounded-xl uppercase tracking-[0.3em] transition-all duration-400 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "System Initialization..." : "Establish Identity"}
          </button>
        </form>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
            <span className="bg-[#050505] px-6 text-[#A1A1AA]/60">Fast Connect</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton icon={FiGithub} label="GitHub" />
          <SocialButton icon={FaGoogle} label="Google" />
        </div>

        <p className="text-center text-[#A1A1AA] text-sm opacity-80">
          Already configured?{" "}
          <Link to="/login" className="text-[#00E6A8] font-bold hover:underline underline-offset-8 decoration-1 transition-all">
            Log in to dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="absolute bottom-0 left-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between px-8 py-6 border-t border-white/5 bg-black/80 backdrop-blur-md">
    <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-bold text-[#A1A1AA] tracking-[0.2em] uppercase opacity-60">
      <span className="text-white">© 2024 Limitless Architecture</span>
      <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20" />
      <span>Immutable Precision at Scale</span>
    </div>
    <div className="flex items-center gap-8 mt-4 md:mt-0">
      {["Privacy", "Terms", "Security"].map((item) => (
        <a key={item} href="#" className="text-[10px] font-bold text-[#A1A1AA] hover:text-[#00E6A8] tracking-[0.2em] uppercase transition-colors opacity-60 hover:opacity-100">
          {item}
        </a>
      ))}
    </div>
  </footer>
);

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row relative selection:bg-[#00E6A8] selection:text-black font-sans antialiased overflow-x-hidden">
      <Navbar />
      <HeroPanel />
      <RegisterForm />
      <Footer />
    </div>
  );
}