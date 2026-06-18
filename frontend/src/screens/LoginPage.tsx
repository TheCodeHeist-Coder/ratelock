import { Navbar } from "../components/Navbar";
import { Globe, GLOBE_CONFIG } from "../components/globe";
import { MetricItem } from "../components/MetricItem";
import { LoginForm } from "../components/LoginForm";

// Left brand panel — mirrors the register page so the two auth screens feel like siblings.
const HeroPanel = () => (
  <div className="hidden lg:flex relative lg:w-[40%] min-h-screen bg-black flex-col overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E6A1]/5 blur-[120px] -mr-48 -mt-48" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00E6A8]/5 blur-[120px] -mr-48 -mt-48" />

    {/* Animated grid lines */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E6A8]/20 to-transparent animate-pulse" />
        <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#00E6A8]/20 to-transparent animate-pulse delay-700" />
      </div>
    </div>

    <div className="absolute -bottom-85 left-42 -translate-x-1/2 w-[98%] aspect-square z-10 pointer-events-none">
      <Globe config={{ ...GLOBE_CONFIG }} />
    </div>

    {/* Content */}
    <div className="relative z-20 flex flex-col h-[80%] justify-center px-8 lg:px-20 py-24 lg:py-0">
      <div className="flex flex-col gap-10">
        <h1 className="text-5xl lg:text-6xl font-semibold text-white font-main leading-[1.05] tracking-wide max-w-xl">
          Welcome back, <br />
          <span className="text-[#00E6A8]">Operative.</span>
        </h1>

        <p className="text-[#c1c1c4] text-base leading-relaxed max-w-[420px]">
          Re-establish your secure session with the global rate-limiting mesh.
          Your projects, rules and traffic intelligence are one sync away.
        </p>

        <div className="flex flex-wrap gap-10 mt-4">
          <MetricItem value="99.99%" label="SLA Uptime" />
          <MetricItem value="<10ms" label="Global Latency" />
          <MetricItem value="256-bit" label="AES Encryption" />
        </div>
      </div>
    </div>
  </div>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row relative selection:bg-[#00E6A8] selection:text-black font-sans antialiased overflow-x-hidden">
      <Navbar />
      <HeroPanel />
      <LoginForm />
    </div>
  );
}
