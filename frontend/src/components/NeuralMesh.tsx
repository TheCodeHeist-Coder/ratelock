import { motion } from "motion/react";

export function NeuralMesh() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Core Glow */}
      {/* <div className="absolute w-32 h-32 bg-neon-green/20 rounded-full blur-3xl animate-pulse" /> */}
      {/* <div className="absolute w-16 h-16 bg-neon-green/40 rounded-full blur-xl" /> */}
      {/* <div className="absolute w-4 h-4 bg-neon-green rounded-full shadow-[0_0_20px_#00ff9c]" /> */}

      {/* Rotating Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 border border-neon-green/20 rounded-full border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-80 h-80 border border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] border border-neon-green/10 rounded-full border-dashed"
      />

      {/* Floating Nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: 200 + i * 40, height: 200 + i * 40 }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_10px_#00ff9c]" 
            style={{ opacity: 0.3 + (i * 0.1) }}
          />
        </motion.div>
      ))}

      {/* Connection Lines (Simulated with large thin circles) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-linear-to-r from-transparent via-neon-green/10 to-transparent rotate-45" />
        <div className="w-full h-px bg-linear-to-r from-transparent via-neon-green/10 to-transparent -rotate-45" />
      </div>
      
      {/* Scanning Ring */}
      <motion.div
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-64 h-64 border-2 border-neon-green/30 rounded-full"
      />
    </div>
  );
}
