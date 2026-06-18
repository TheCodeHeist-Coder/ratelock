
export const MetricItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-white font-bold text-2xl lg:text-3xl tracking-tight">{value}</span>
    <span className="text-[#A1A1AA] text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
  </div>
);
