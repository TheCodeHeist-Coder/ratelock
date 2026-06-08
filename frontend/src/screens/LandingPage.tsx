import { motion } from "motion/react";
import { FiZap,  FiCode,  } from "react-icons/fi";
import { Navbar } from "../components/Navbar";
import Hero from "../components/HeroSection";
import FeaturesSection from "../components/featureSecton";


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
    <>
      <Navbar />
      <main>
        <Hero />
        <CompaniesRow />
        <FeaturesSection />
        <IntegrationSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
  </>
  );
}
