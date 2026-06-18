
export function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-panel px-4 py-2 rounded-lg flex flex-col gap-0.5">
      <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{label}</span>
      <span className="text-sm font-mono text-neon-green glow-text">{value}</span>
    </div>
  );
}
