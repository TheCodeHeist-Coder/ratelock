import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SocialButton } from "./SocialButton";
import { useAuthStore } from "../stores/authStore";

export function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.error ?? err?.response?.data?.message ?? 'Authentication failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-[60%] min-h-screen bg-[#000000] flex flex-col justify-center px-8 lg:px-24 py-24 lg:py-0 lg:border-l border-white/5 relative overflow-hidden">
      <div className="max-w-lg w-full mx-auto space-y-10 relative z-10">
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-4xl lg:text-4xl font-semibold font-main text-gray-300 tracking-tight">Welcome Operative</h2>
          <p className="text-[#d7d7d7] text-sm leading-relaxed opacity-80 max-w-md mx-auto lg:mx-0">
            Authentication required for core network access. 
            Synchronize your session with the global node.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em] ml-1">Your Email</label>
            <input 
              type="email" 
              placeholder="operator@mesh.net"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#003c2c] transition-all text-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center pr-1">
              <label className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.2em]">Your Password</label>
            </div>
            <input 
              type="password" 
              placeholder="••••••••••••••••"
              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#003c2c] transition-all text-sm shadow-[0_4px_12_rgba(0,0,0,0.5)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00E6A8] text-black font-bold text-[11px] py-5 rounded-xl uppercase tracking-[0.3em] transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(0,230,168,0.2)] hover:shadow-[0_0_20px_rgba(0,230,168,0.4)] transform hover:-translate-y-0.5"
          >
            {loading ? "Initiating Session..." : "Initiate Session"}
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
          New to the network?{" "}
          <Link to="/register" className="text-[#00E6A8] font-bold hover:underline underline-offset-8 decoration-1 transition-all">
            Join the Mesh
          </Link>
        </p>
      </div>
    </div>
  );
}
