import React from "react";
import { motion } from "motion/react";
import { FiZap, FiShield, FiCpu, FiGlobe, FiCode, FiArrowRight } from "react-icons/fi";
import { Navbar } from "../components/Navbar";
import { Globe, GLOBE_CONFIG } from "../components/globe";
import { BackgroundGrid } from "../components/BackgroundGrid";
import { NeuralMesh } from "../components/NeuralMesh";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
    <BackgroundGrid />
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square opacity-50">
        <NeuralMesh />
      </div>
      
      {/* Globe Container: Occupies bottom 40% of the screen height */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] opacity-40 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] aspect-square">
          <Globe 
            config={{ ...GLOBE_CONFIG, width: 2000, height: 2000 }} 
            className="w-full max-w-none" 
          />
        </div>
      </div>
    </div>

    <div className="relative z-10 container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs font-bold uppercase tracking-widest mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
        </span>
        Global Network 42 Live
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight font-display"
      >
        Architect for <br />
        <span className="italic text-neon-green glow-text">Infinite</span> Scale
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-[#c1c1c4] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        Deploy mission-critical rate limiting and traffic orchestration at the edge. 
        Engineered for the next generation of high-availability AI infrastructure.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <button className="px-10 py-4 bg-neon-green text-black font-bold rounded-lg uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,255,156,0.3)] hover:shadow-[0_0_40px_rgba(0,255,156,0.5)] cursor-pointer group flex items-center gap-2">
          Get Started <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-lg uppercase tracking-wider hover:bg-white/5 transition-all duration-300 cursor-pointer">
          Documentation
        </button>
      </motion.div>
    </div>
  </section>
);

const CompaniesRow = () => (
  <section className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm relative z-10">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-500">
        {["HEXACORE", "QUANTUM", "NEXUS.AI", "VORTEX", "CYPHER"].map((company) => (
          <span key={company} className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white font-display">
            {company}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description, code }: { icon: any, title: string, description: string, code: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="glass-panel p-8 rounded-2xl relative group overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={80} className="text-neon-green" />
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-lg bg-neon-green/10 flex items-center justify-center mb-6 border border-neon-green/20">
        <Icon size={24} className="text-neon-green" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-[#A1A1AA] mb-6 leading-relaxed">
        {description}
      </p>
      <div className="bg-black/50 rounded-lg p-4 font-mono text-xs border border-white/5">
        <div className="flex gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <code className="text-neon-green/70">
          {code}
        </code>
      </div>
    </div>
    <div className="absolute inset-0 border border-neon-green/0 group-hover:border-neon-green/20 rounded-2xl transition-colors duration-500" />
  </motion.div>
);

const FeaturesSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard 
          icon={FiZap}
          title="10ms Latency P99"
          description="Distributed edge network ensures ultra-low latency response times for every request."
          code="ping -c 1 api.ratelock.io"
        />
        <FeatureCard 
          icon={FiGlobe}
          title="Global Mesh"
          description="A resilient network of nodes synchronized across 42 global regions."
          code="ratelock mesh --status"
        />
        <FeatureCard 
          icon={FiShield}
          title="Smart Proxy"
          description="Adaptive threat detection and traffic filtering at the protocol level."
          code="curl -X POST /v1/proxy"
        />
        <FeatureCard 
          icon={FiCpu}
          title="Adaptive Throttling"
          description="Machine learning models predict and prevent traffic spikes before they hit."
          code="policy.adapt({ mode: 'ai' })"
        />
      </div>
    </div>
  </section>
);

const IntegrationSection = () => (
  <section className="py-24 bg-black/50">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-neon-green/10 to-transparent flex items-center justify-center p-12">
            <div className="w-full h-full relative">
               <NeuralMesh />
               {/* Simplified Traffic Flow Visualization */}
               <div className="absolute inset-0 flex flex-col justify-center gap-8">
                  {[1,2,3].map(i => (
                    <motion.div 
                      key={i}
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 300, opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                      className="h-1 bg-neon-green shadow-[0_0_10px_#00ff9c] w-20 rounded-full"
                    />
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Zero Config Integration</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Connect", desc: "Link your existing API infrastructure with a single line of code." },
              { step: "02", title: "Configure", desc: "Define rate limits and traffic policies using our intuitive DSL." },
              { step: "03", title: "Deploy", desc: "Push to the global edge network with instant propagation." }
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <span className="text-2xl font-bold text-neon-green font-mono">{item.step}</span>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-[#A1A1AA]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-[#0a0a0a] rounded-xl border border-white/5 font-mono text-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/40">javascript</span>
              <FiCode className="text-neon-green" />
            </div>
            <pre className="text-white/80 overflow-x-auto">
              <code>{`import { RateLock } from "@ratelock/sdk";

const limiter = new RateLock({
  apiKey: process.env.RATELOCK_KEY,
  region: "global-mesh"
});

await limiter.secure(req, res);`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-neon-green mb-4 glow-text">&lt;10ms</h2>
          <p className="text-xl text-white font-medium uppercase tracking-[0.2em] font-display">Global Latency</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-neon-green mb-4 glow-text">99.99%</h2>
          <p className="text-xl text-white font-medium uppercase tracking-[0.2em] font-display">Guaranteed Uptime</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-neon-green mb-4 glow-text">1M+</h2>
          <p className="text-xl text-white font-medium uppercase tracking-[0.2em] font-display">Requests Per Second</p>
        </motion.div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass-panel p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to secure your future?</h2>
        <p className="text-[#A1A1AA] text-lg mb-12 max-w-2xl mx-auto">
          Join thousands of developers building high-performance, resilient applications on the RateLock network.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-10 py-4 bg-neon-green text-black font-bold rounded-lg uppercase tracking-wider hover:bg-white transition-all cursor-pointer">
            Create Developer Account
          </button>
          <button className="px-10 py-4 text-white font-bold rounded-lg uppercase tracking-wider hover:text-neon-green transition-all cursor-pointer">
            View Pricing Plans
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-black">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-neon-green/30 flex items-center justify-center bg-black">
            <FiZap className="text-neon-green" />
          </div>
          <span className="text-white font-bold tracking-[0.2em] text-xs uppercase font-special">RateLock</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Documentation", "API Status", "Terms of Service", "Security"].map((link) => (
            <a key={link} href="#" className="text-[#A1A1AA] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
              {link}
            </a>
          ))}
        </div>
        <p className="text-[#A1A1AA]/40 text-[10px] font-bold uppercase tracking-widest">
          &copy; 2026 RateLock Infrastructure. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cyber-black text-white selection:bg-neon-green selection:text-black font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <CompaniesRow />
        <FeaturesSection />
        <IntegrationSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
