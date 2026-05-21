import React, { useState } from "react";
import { FiAlertCircle, FiZap } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";


export default function LoginPage() {

    const [email, setEmail] = useState('demo@ratelimity.dev');
    const [password, setPassword] = useState('demo1234');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

return (
        <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4"
         style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(20,184,166,.12), transparent)' }}>
      <div className="w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
              <FiZap size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">RateLimity</span>
          </div>
        </div>

        <div className="card p-6 shadow-2xl shadow-black/40">
          <h1 className="font-display font-bold text-xl text-white mb-1">Welcome back</h1>
          <p className="text-sm text-ink-300 mb-6">Sign in to your dashboard</p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/30 border border-red-800/50 text-red-300 text-sm mb-4">
              <FiAlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full justify-center py-2.5"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-ink-400 mt-4">
          No account?{' '}
          <Link to="/register" className="text-brand-400 hover:text-brand-300 transition-colors">
            Create one free
          </Link>
        </p>
      </div>
    </div>
)




}