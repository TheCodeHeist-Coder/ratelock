import { motion } from "motion/react";
import {
  FiZap,
  FiShield,
  FiCpu,
  FiGlobe,
 
} from "react-icons/fi";

const FeatureCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
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
              <span className="text-[10px] font-bold text-neon-green uppercase tracking-wider">
                Live Network
              </span>
            </div>
            <FiZap className="text-neon-green" size={24} />
          </div>
          <div className="mt-auto">
            <h3 className="text-5xl md:text-6xl font-bold text-neon-green glow-text mb-2 tracking-tight">
              10ms
            </h3>
            <p className="text-xl font-bold text-white mb-1">Latency P99</p>
            <p className="text-[#A1A1AA] text-sm">
              Ultra-low latency response times at the global edge.
            </p>
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
                <div className="absolute -top-2 -right-4 bg-black/80 border border-white/10 px-2 py-1 rounded text-[8px] font-mono text-neon-green">
                  US-EAST-1
                </div>
                <div className="absolute bottom-4 -left-6 bg-black/80 border border-white/10 px-2 py-1 rounded text-[8px] font-mono text-neon-green">
                  EU-WEST-1
                </div>
              </div>
            </div>
            <div className="mt-auto space-y-3">
              <p className="text-[#A1A1AA] text-sm">
                Resilient node synchronization across 42 global regions.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border border-black bg-neon-green/20 flex items-center justify-center"
                    >
                      <div className="w-1 h-1 rounded-full bg-neon-green" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-white/60">
                  42 NODES ONLINE
                </span>
              </div>
            </div>
          </div>
        </FeatureCard>

        {/* Card 3: Smart Proxy (Square) */}
        <FeatureCard>
          <FiShield className="text-neon-green mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Smart Proxy</h3>
          <p className="text-[#A1A1AA] text-sm mb-4">
            Adaptive threat detection and protocol filtering.
          </p>
          <div className="mt-auto grid grid-cols-2 gap-2">
            {["L3", "L4", "L7", "DDoS"].map((label) => (
              <div
                key={label}
                className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/50 text-center uppercase tracking-tighter"
              >
                {label} PROTECTED
              </div>
            ))}
          </div>
        </FeatureCard>

        {/* Card 4: Adaptive Throttling (Square) */}
        <FeatureCard>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">
              Adaptive Throttling
            </h3>
            <FiCpu className="text-neon-green" size={24} />
          </div>
          <p className="text-[#A1A1AA] text-sm mb-6">
            ML-driven traffic orchestration.
          </p>
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
              <span className="text-neon-green uppercase">
                Surge Protection Active
              </span>
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

export default FeaturesSection;
