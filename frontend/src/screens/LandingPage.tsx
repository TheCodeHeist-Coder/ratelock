import { motion } from "motion/react";
import { FiZap, FiShield, FiCpu, FiGlobe, FiCode, FiArrowRight } from "react-icons/fi";
import { Navbar } from "../components/Navbar";
import { BackgroundGrid } from "../components/BackgroundGrid";


const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
    <BackgroundGrid />

    <div className="relative z-10 container mx-auto px-6 mb-18 text-center">
      
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-6xl md:text-8xl font-bold font-main text-gray-200 mb-6 tracking-wide "
      >
        Architect for <br />
        <span className="italic text-neon-green glow-text font-special tracking-wider">Infinite</span> Scale
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
        {["XYZ", "MYBRAND", "REPLOCART", "SHAMMY.AI", "RAJ.AI"].map((company) => (
          <span key={company} className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white font-display">
            {company}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const FeatureCard = ({ 
  children, 
  className = "", 
  glowColor = "rgba(0, 255, 153, 0.1)" 
}: { 
  children: React.ReactNode, 
  className?: string,
  glowColor?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -2 }}
    className={`relative group ${className}`}
  >
    <div 
      className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl z-0"
      // style={{ background: glowColor }}
    />
    <div className="relative h-full glass-panel p-8 rounded-2xl border border-white/10 group-hover:border-neon-green/30 transition-colors duration-500 bg-[#0B0F0E]/80 backdrop-blur-xl overflow-hidden flex flex-col">
      {children}
    </div>
  </motion.div>
);

const FeaturesSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
        {/* Card 1: Latency (Large horizontal) */}
        <FeatureCard className="lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-bold text-neon-green uppercase tracking-wider">Live Network</span>
            </div>
            <FiZap className="text-neon-green" size={24} />
          </div>
          <div className="mt-auto">
            <h3 className="text-5xl md:text-6xl font-bold text-neon-green glow-text mb-2 tracking-tight">10ms</h3>
            <p className="text-xl font-bold text-white mb-1">Latency P99</p>
            <p className="text-[#A1A1AA] text-sm">Ultra-low latency response times at the global edge.</p>
          </div>
        </FeatureCard>

        {/* Card 2: Global Mesh (Tall vertical) */}
        <FeatureCard className="lg:row-span-2">
          <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-4">Global Mesh</h3>
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border border-neon-green/20 flex items-center justify-center">
                  <FiGlobe size={64} className="text-neon-green/40" />
                </div>
                {/* Floating labels */}
                <div className="absolute -top-2 -right-4 bg-black/80 border border-white/10 px-2 py-1 rounded text-[8px] font-mono text-neon-green">US-EAST-1</div>
                <div className="absolute bottom-4 -left-6 bg-black/80 border border-white/10 px-2 py-1 rounded text-[8px] font-mono text-neon-green">EU-WEST-1</div>
              </div>
            </div>
            <div className="mt-auto space-y-3">
              <p className="text-[#A1A1AA] text-sm">Resilient node synchronization across 42 global regions.</p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border border-black bg-neon-green/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-neon-green" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-white/60">42 NODES ONLINE</span>
              </div>
            </div>
          </div>
        </FeatureCard>

        {/* Card 3: Smart Proxy (Square) */}
        <FeatureCard>
          <FiShield className="text-neon-green mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Smart Proxy</h3>
          <p className="text-[#A1A1AA] text-sm mb-4">Adaptive threat detection and protocol filtering.</p>
          <div className="mt-auto grid grid-cols-2 gap-2">
            {["L3", "L4", "L7", "DDoS"].map(label => (
              <div key={label} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 text-center uppercase tracking-tighter">
                {label} PROTECTED
              </div>
            ))}
          </div>
        </FeatureCard>

        {/* Card 4: Adaptive Throttling (Square) */}
        <FeatureCard>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">Adaptive Throttling</h3>
            <FiCpu className="text-neon-green" size={24} />
          </div>
          <p className="text-[#A1A1AA] text-sm mb-6">ML-driven traffic orchestration.</p>
          <div className="mt-auto space-y-4">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-neon-green shadow-[0_0_10px_rgba(0,255,153,0.5)]"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold font-mono">
              <span className="text-white/40 uppercase">Normal</span>
              <span className="text-neon-green uppercase">Surge Protection Active</span>
            </div>
          </div>
        </FeatureCard>

        {/* Card 5: Terminal Status (Wide horizontal) */}
        <FeatureCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">System Health</h3>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
          </div>
          <div className="bg-black/40 rounded-lg p-4 font-mono text-xs border border-white/5 flex-1">
            <div className="text-neon-green/70 mb-1 leading-relaxed">
              <span className="text-white/30">$</span> ratelock status --check
            </div>
            <div className="text-white/70 mb-1 leading-relaxed">
              [SYSTEM] Verifying global edge nodes...
            </div>
            <div className="text-neon-green leading-relaxed">
              [SUCCESS] All 42 nodes synchronized. 0.001% packet loss detected.
            </div>
            <div className="text-white/30 animate-pulse mt-1">_</div>
          </div>
        </FeatureCard>
      </div>
    </div>
  </section>
);

const IntegrationSection = () => (
  <section className="py-24 bg-black/50">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden border border-white/10  to-transparent flex items-center justify-center p-18">
            <div className="w-full h-full flex items-center justify-center relative">
              <img className="h-180 w-full" src="/ratelimit.png" alt="" />
               {/* Simplified Traffic Flow Visualization */}
              
               
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-5xl font-main font-bold text-gray-200 mb-8">Zero Config Integration</h2>
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

   
   <p className="font-special  text-gray-500  pt-4"> ❤️ RAJKUMAR </p>



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
