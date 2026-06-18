
export function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-neon-green/5 to-transparent h-[2px] w-full animate-scanline opacity-30" />
      {/* Noise texture overlay could be added here if needed */}
    </div>
  );
}
