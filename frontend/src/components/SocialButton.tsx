
export const SocialButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button className="flex items-center justify-center gap-3 w-full py-3.5 bg-black border border-white/10 rounded-xl text-white text-[11px] font-bold tracking-[0.15em] uppercase hover:border-[#00E6A8]/50 hover:bg-[#00E6A8]/5 transition-all duration-400 group cursor-pointer">
    <Icon size={18} className="group-hover:text-[#00E6A8] transition-colors" />
    {label}
  </button>
);
