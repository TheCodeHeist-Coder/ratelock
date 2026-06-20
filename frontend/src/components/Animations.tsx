import { motion } from "framer-motion";
import { FaServer } from "react-icons/fa";
import { FiShield } from "react-icons/fi";

export default function RateLimiterHero() {
  const allowedParticles = Array.from({ length: 8 });
  const blockedParticles = Array.from({ length: 45 });

  return (
    <section className="relative h-[600px] overflow-hidden bg-black flex items-center justify-center">

      {/* Background glow — brand green */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,168,0.08),transparent_70%)]" />

      {/* API Server — rack */}
      <div className="absolute right-32 top-1/2 z-20 -translate-y-1/2">
        <div className="w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e] shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          {/* header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-3 py-2">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/50">
              <FaServer size={11} className="text-white/40" />
              api-01
            </span>
            <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              online
            </span>
          </div>

          {/* rack units */}
          <div className="space-y-1.5 p-2.5">
            {Array.from({ length: 4 }).map((_, u) => (
              <div
                key={`unit-${u}`}
                className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.03] px-2 py-2"
              >
                {/* status LEDs */}
                <span
                  className={`h-1.5 w-1.5 rounded-full ${u % 3 === 0 ? "bg-amber-400" : "bg-emerald-400"}`}
                  style={{ animation: "pulse 2s infinite", animationDelay: `${u * 0.3}s` }}
                />
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                {/* vents */}
                <div className="ml-1 flex flex-1 items-center gap-[3px]">
                  {Array.from({ length: 7 }).map((_, v) => (
                    <span key={v} className="h-3 w-[2px] rounded-full bg-white/10" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* footer label */}
          <div className="border-t border-white/10 px-3 py-2 text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              backend api
            </span>
          </div>
        </div>
      </div>

      {/* Rate Limiter — live monitor */}
      <div className="absolute right-[340px] top-1/2 z-30 -translate-y-1/2">
        <div className="w-56 overflow-hidden rounded-xl  bg-[#080d0b] shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          {/* header */}
          <div className="flex items-center   justify-between border-b border-[#00E6A8]/15 bg-black px-3 py-2.5">
            <span className="flex items-center gap-2">
              
              <span className="font-special text-[11px] font-bold tracking-[0.15em] text-white">
                RATE LIMITER
              </span>
            </span>

          </div>

          {/* body */}
          <div className="space-y-3 p-3.5">
            {/* usage gauge */}
            <div>
              <div className="mb-1.5 flex items-center justify-between font-mono text-[10px]">
                <span className="text-white/45">requests / window</span>
                <span className="text-white/80">73<span className="text-white/30">/100</span></span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[73%] rounded-full bg-gradient-to-r from-[#00b873] to-[#00E6A8]" />
              </div>
            </div>

            {/* counters */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1.5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/35">allowed</p>
                <p className="font-mono text-sm font-bold text-[#00E6A8]">8.4k</p>
              </div>
              <div className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1.5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/35">blocked</p>
                <p className="font-mono text-sm font-bold text-red-400">312</p>
              </div>
            </div>

            {/* window */}
            <div className="flex items-center justify-between border-t border-white/5 pt-2 font-mono text-[9px] text-white/35">
              <span>window 60s</span>
              <span className="text-white/55">100 req/min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Allowed traffic — brand green, passes through to the API */}
      {allowedParticles.map((_, i) => (
        <motion.div
          key={`allowed-${i}`}
          className="absolute w-3 h-3 rounded-full bg-[#00E6A8] shadow-[0_0_20px_#00E6A8]"
          style={{
            left: -100,
            top: 160 + i * 35,
          }}
          animate={{
            x: [0, 1300],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Attack traffic — red, blocked at the limiter */}
      {blockedParticles.map((_, i) => {
        const y = ((i * 137) % 500) + 50;

        return (
          <motion.div
            key={`blocked-${i}`}
            className="absolute w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
            style={{
              left: -100,
              top: y,
            }}
            animate={{
              x: [0, 780],
              scale: [1, 1.4, 2],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.05,
            }}
          />
        );
      })}

     

      {/* 429 popup */}
      <motion.div
        className="absolute left-[35%] top-[25%] z-50 px-6 py-4 rounded-2xl border border-red-500/60 bg-red-500/10 backdrop-blur-xl text-red-300"
        animate={{
          opacity: [0, 1, 1, 0],
          y: [15, 0, 0, -15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 0.2,
        }}
      >
        <div className="font-bold">429 Too Many Requests</div>
        <div className="text-sm mt-1">Retry in 30 seconds</div>
      </motion.div>

      {/* Heading */}
      <div className="absolute bottom-20 text-center z-50 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          Rate<span className="font-special text-[#00E6A8]">Limit</span>
          <span className="text-gray-300"> as a Service</span>
        </h2>

        <p className="mt-4 text-gray-400 text-lg">
          Protect your APIs from abuse and DDoS attacks.
        </p>
      </div>
    </section>
  );
}
