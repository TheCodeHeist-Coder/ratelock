import React, { useState } from "react";
import { FiGithub, FiZap, FiLayers } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Globe , GLOBE_CONFIG} from "../components/globe";
import { Navbar } from "../components/Navbar";
import { MetricItem } from "../components/MetricItem";
import { SocialButton } from "../components/SocialButton";

// --- Components ---

const HeroPanel = () => (
  <div className="hidden lg:flex relative lg:w-[40%] min-h-screen bg-black flex-col overflow-hidden">

 
    {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E6A1]/5 blur-[120px] -mr-48 -mt-48" />

        {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00E6A8]/5 blur-[120px] -mr-48 -mt-48" />
      
      
    
    <div className="absolute inset-0 z-0">
     
      {/* Animated Glow Lines */}
      <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E6A8]/20 to-transparent animate-pulse" />
          <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#00E6A8]/20 to-transparent animate-pulse delay-700" />
      </div>
    </div>

     <div className="absolute -bottom-85 left-42 -translate-x-1/2 w-[98%] aspect-square z-10 pointer-events-none ">
      <Globe
        config={{
          ...GLOBE_CONFIG,
          
        }}
      />
    </div>


    {/* Content Layer */}
    <div className="relative  z-20 flex flex-col h-[80%] justify-center px-8 lg:px-20  py-24 lg:py-0">
      <div className="flex flex-col gap-10 ">
     

        <h1 className="text-5xl lg:text-6xl font-semibold  text-white font-main leading-[1.05] tracking-wide max-w-xl">
          Architect for <br />
          <span className="text-[#00E6A8]">Infinite</span> Scale.
        </h1>

        <p className="text-[#c1c1c4] text-base leading-relaxed max-w-[420px]">
          Deploy mission-critical rate limiting and traffic orchestration at the edge. 
          Engineered for the next generation of high-availability AI infrastructure.
        </p>

        <div className="flex flex-wrap gap-10 mt-4">
          <MetricItem value="99.99%" label="SLA Uptime" />
          <MetricItem value="<10ms" label="Global Latency" />
          <MetricItem value="256-bit" label="AES Encryption" />
        </div>
      </div>
    </div>

  </div>
);

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="w-full lg:w-[60%] min-h-screen bg-[#000000] flex flex-col justify-center px-8 lg:px-24 py-24 lg:py-0 lg:border-l border-white/5 relative overflow-hidden">
    
      <div className="max-w-lg w-full mx-auto space-y-10 relative z-10">
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-4xl lg:text-4xl font-semibold font-main text-gray-300 tracking-tight">Initialize Account</h2>
          <p className="text-[#d7d7d7] text-sm  leading-relaxed opacity-80 max-w-md mx-auto lg:mx-0">
            Provision your developer credentials and access our globally distributed API infrastructure. 
            Free tier is available for trial.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em] ml-1">Your Name</label>
            <input 
              type="text" 
              placeholder="Dev raaz"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#003c2c]  transition-all text-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em] ml-1">Your Email</label>
            <input 
              type="email" 
              placeholder="raaz@tach.com"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#003c2c]  transition-all text-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em] ml-1">Access Token (Password)</label>
            <input 
              type="password" 
              placeholder="••••••••••••••••"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#003c2c]  transition-all text-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              required
            />
            <div className="flex items-center gap-2 mt-2 ml-1">
                <FiLayers size={10} className="text-[#00E6A8]" />
                <p className="text-[10px] text-[#A1A1AA] font-medium opacity-60">
                    Requirement: Minimum 10 characters for high entropy
                </p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00E6A8] text-black font-bold text-[11px] py-5 rounded-xl uppercase tracking-[0.3em] transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(0,230,168,0.2)] hover:shadow-[0_0_20px_rgba(0,230,168,0.4)] transform hover:-translate-y-0.5"
          >
            {loading ? "Account Initialization..." : "Initialize Account"}
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

        <p className="text-center text-[#A1A1AA] text-sm opacity-80 mt-8">
          Already configured?{" "}
          <Link to="/login" className="text-[#00E6A8] font-bold hover:underline underline-offset-8 decoration-1 transition-all">
            Log in to dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};


export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row relative selection:bg-[#00E6A8] selection:text-black font-sans antialiased overflow-x-hidden">
      <Navbar />
      <HeroPanel />
      <RegisterForm />

    </div>
  );
}
