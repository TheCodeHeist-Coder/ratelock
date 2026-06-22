import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiLogOut, FiBookOpen, FiActivity } from "react-icons/fi";
import { useAuthStore } from "../../stores/authStore";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = (user?.name || user?.email || "?")
    .split(/[\s@.]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-screen bg-black text-white font-main selection:bg-[#00E6A8] selection:text-black">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-0 h-96 w-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-400/[0.06] blur-[150px]" />

      {/* ── Sidebar (desktop) ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/5 bg-ink-900/60 backdrop-blur-xl lg:flex">
        <div className="flex items-center gap-2 px-6 py-6">
          <img src="/logo.png" alt="RateLock" className="h-10 w-auto" />
          <h1 className="font-special font-bold"> RateLock </h1>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`}
          >
            <FiGrid size={17} />
            Projects
          </NavLink>
          <a className="nav-item opacity-50 cursor-not-allowed" title="Coming soon">
            <FiActivity size={17} />
            Analytics
            <span className="ml-auto text-[9px] uppercase tracking-wider text-ink-500">soon</span>
          </a>
          <NavLink
            to="/docs"
            className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`}
            title="Documentation"
          >
            <FiBookOpen size={17} />
            Docs
          </NavLink>
        </nav>

        {/* User card */}
        <div className="border-t border-white/5 p-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-xs font-bold text-brand-300">
              {initials || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user?.name ?? "User"}</p>
              <p className="truncate text-xs text-ink-500">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="btn-ghost px-2 py-2" title="Log out">
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-ink-900/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <img src="/RateLock.svg" alt="RateLock" className="h-7 w-auto" />
        <button onClick={handleLogout} className="btn-ghost" title="Log out">
          <FiLogOut size={18} />
        </button>
      </header>

      {/* ── Main content ── */}
      <main className="relative lg:pl-64">
        <Outlet />
      </main>
    </div>
  );
}
