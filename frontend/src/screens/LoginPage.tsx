import React, { useState } from "react";
import { FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";


export default function LoginPage() {

    const [email, setEmail] = useState('demo@ratelimity.dev');
    const [password, setPassword] = useState('demo1234');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Submit", { email, password });
    }

return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4"
         style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,230,168,0.1), transparent)' }}>
      <div className="w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#00E6A8] flex items-center justify-center">
              <FiZap size={18} className="text-black" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">LIMITLESS</span>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl shadow-2xl">
          <h1 className="font-display font-bold text-xl text-white mb-1">Welcome back</h1>
          <p className="text-sm text-[#A1A1AA] mb-6">Sign in to your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1.5 ml-1">Email</label>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6A8] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1.5 ml-1">Password</label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E6A8] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#00E6A8] text-black font-bold py-3 rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,230,168,0.4)] transition-all"
            >
              Sign in
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#A1A1AA] mt-4">
          No account?{' '}
          <Link to="/register" className="text-[#00E6A8] hover:underline transition-colors">
            Create one free
          </Link>
        </p>
      </div>
    </div>
)




}