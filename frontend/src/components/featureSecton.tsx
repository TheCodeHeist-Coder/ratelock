import {
  FiZap,
  FiShield,
  FiBarChart2,
  FiBell,
  FiCode,
  FiGlobe,
} from "react-icons/fi";

const FEATURES = [
  {
    icon: FiZap,
    title: "Edge-fast checks",
    desc: "Every request is evaluated in under a millisecond with an atomic, Redis-backed sliding window.",
  },
  {
    icon: FiShield,
    title: "Flexible rules",
    desc: "Match endpoints by exact path, prefix or wildcard and set precise limits per route.",
  },
  {
    icon: FiBarChart2,
    title: "Real-time analytics",
    desc: "Track allowed vs. throttled traffic, top endpoints and latency as it happens.",
  },
  {
    icon: FiBell,
    title: "Smart alerts",
    desc: "Get notified over email, Slack or webhook the moment block rates spike.",
  },
  {
    icon: FiCode,
    title: "Drop-in SDKs",
    desc: "Add one middleware to Express or FastAPI and you're protected — no rewrites.",
  },
  {
    icon: FiGlobe,
    title: "Per-project isolation",
    desc: "Separate API keys, rules and traffic for staging, development and production.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="scroll-mt-24 bg-black py-24">
    <div className="container mx-auto px-6">
      {/* heading */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#71717A]">
          Features
        </p>
        <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Built for production traffic
        </h2>
        <p className="mt-4 text-lg text-[#A1A1AA]">
          Everything you need to keep APIs fast, fair and protected — at the edge,
          in real time.
        </p>
      </div>

      {/* grid — hairline dividers, monochrome dark cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-black p-8 transition-colors duration-300 hover:bg-white/[0.02]"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white">
              <f.icon size={18} />
            </div>
            <h3 className="text-base font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
