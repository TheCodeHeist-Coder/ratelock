/**
 * Animated hero backdrop — purely decorative, pointer-events-none.
 * Layers: aurora glows · perspective grid floor · sweeping beam · drifting data particles.
 * Self-contained (ships its own keyframes), sits behind hero content (which is z-10).
 */
export default function HeroBackground() {
  const particles = Array.from({ length: 18 });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes hb-grid { from { background-position: 0 0; } to { background-position: 0 44px; } }
        @keyframes hb-aurora-1 { 0%,100% { transform: translate(-10%, -10%) scale(1); } 50% { transform: translate(8%, 6%) scale(1.25); } }
        @keyframes hb-aurora-2 { 0%,100% { transform: translate(10%, 0%) scale(1.1); } 50% { transform: translate(-6%, 10%) scale(0.9); } }
        @keyframes hb-beam { 0% { transform: translateX(-60%) rotate(8deg); opacity: 0; } 40% { opacity: 0.5; } 60% { opacity: 0.5; } 100% { transform: translateX(160%) rotate(8deg); opacity: 0; } }
        @keyframes hb-rise { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-460px); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .hb-anim { animation: none !important; }
        }
      `}</style>

      {/* base wash */}
      <div className="absolute inset-0 bg-black" />

      {/* aurora glows */}
      <div
        className="hb-anim absolute -top-1/4 left-1/4 h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(0,230,168,0.18), transparent 60%)",
          animation: "hb-aurora-1 16s ease-in-out infinite",
        }}
      />
      <div
        className="hb-anim absolute top-1/3 right-1/4 h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.14), transparent 60%)",
          animation: "hb-aurora-2 20s ease-in-out infinite",
        }}
      />

      {/* perspective grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] [perspective:600px]">
        <div
          className="hb-anim absolute inset-0 origin-bottom [transform:rotateX(72deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,230,168,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,230,168,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            animation: "hb-grid 1.6s linear infinite",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 100%, #000 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 100%, #000 30%, transparent 75%)",
          }}
        />
      </div>

      {/* sweeping beam */}
      <div
        className="hb-anim absolute -inset-y-1/2 left-0 w-1/3 blur-2xl"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,230,168,0.10), transparent)",
          animation: "hb-beam 9s ease-in-out infinite",
        }}
      />

      {/* drifting data particles */}
      {particles.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 9) * 0.9;
        const dur = 7 + (i % 5);
        const size = i % 4 === 0 ? 2.5 : 1.5;
        return (
          <span
            key={i}
            className="hb-anim absolute bottom-0 rounded-full bg-[#00E6A8]"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              boxShadow: "0 0 8px rgba(0,230,168,0.8)",
              animation: `hb-rise ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}

      {/* top vignette so the header/nav stays clean */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      {/* bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
