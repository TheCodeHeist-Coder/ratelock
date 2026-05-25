import React from "react";
import { NeuralMesh } from "./NeuralMesh";
import { MetricItem } from "./MetricItem";

export function HeroSection() {
  return (
    <div className="hidden lg:flex relative lg:w-[40%] min-h-screen bg-black flex-col overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E6A1]/5 blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00E6A8]/5 blur-[120px] -mr-48 -mt-48" />
      
      <div className="absolute inset-0 z-0">
        {/* Animated Glow Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E6A8]/20 to-transparent animate-pulse" />
            <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#00E6A8]/20 to-transparent animate-pulse delay-700" />
        </div>
      </div>

      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120%] aspect-square z-10 pointer-events-none opacity-50">
        <NeuralMesh />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col h-[80%] justify-center px-8 lg:px-20 py-24 lg:py-0">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl lg:text-6xl font-semibold text-white font-main leading-[1.05] tracking-wide max-w-xl">
            Secure Your <br />
            <span className="text-[#00E6A8]">Digital</span> Core.
          </h1>

          <p className="text-[#c1c1c4] text-base leading-relaxed max-w-[420px]">
            Synchronize your credentials with the distributed mesh. 
            Real-time neural handshake required for high-security node access.
          </p>

          <div className="flex flex-wrap gap-10 mt-4">
            <MetricItem value="12ms" label="Avg Latency" />
            <MetricItem value="99.998%" label="Node Uptime" />
            <MetricItem value="TLS 1.3" label="Auth Protocol" />
          </div>
        </div>
      </div>
    </div>
  );
}
