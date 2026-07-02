import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiLogOut, FiBookOpen, FiActivity, FiChevronRight } from "react-icons/fi";
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
    <div className="relative min-h-screen bg-[#050506] text-white font-main selection:bg-[#00E6A8] selection:text-black">
      {/* ── Sidebar (desktop) ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.06] bg-[#08090a] lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-6">
          <img src="/logo.png" alt="RateLock" className="h-9 w-auto" />
          <h1 className="font-special text-lg font-bold tracking-tight">RateLock</h1>
        </div>

        <div className="mx-6 mb-2 h-px bg-white/[0.06]" />

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-3">
          <p className="mb-2 px-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-600">
            Workspace
          </p>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `nav-item group ${isActive ? "nav-item-active" : ""}`}
          >
            <FiGrid size={17} />
            Projects
            <FiChevronRight
              size={14}
              className="ml-auto opacity-0 -translate-x-1 transition-all group-hover:opacity-60 group-hover:translate-x-0"
            />
          </NavLink>
          <a className="nav-item cursor-not-allowed opacity-40" title="Coming soon">
            <FiActivity size={17} />
            Analytics
            <span className="ml-auto rounded-full border border-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-500">
              soon
            </span>
          </a>
          <NavLink
            to="/docs"
            className={({ isActive }) => `nav-item group ${isActive ? "nav-item-active" : ""}`}
            title="Documentation"
          >
            <FiBookOpen size={17} />
            Docs
            <FiChevronRight
              size={14}
              className="ml-auto opacity-0 -translate-x-1 transition-all group-hover:opacity-60 group-hover:translate-x-0"
            />
          </NavLink>
        </nav>

        {/* User card */}
        <div className="border-t border-white/[0.06] p-3">
          <div className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-white/[0.03]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-bold text-ink-300">
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
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.06] bg-[#0a0a0c]/85 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="RateLock" className="h-7 w-auto" />
          <span className="font-special text-base font-bold">RateLock</span>
        </div>
        <button onClick={handleLogout} className="btn-ghost" title="Log out">
          <FiLogOut size={18} />
        </button>
      </header>

      {/* ── Main content ── */}
      <main className="relative z-10 lg:pl-64">
        <Outlet />
      </main>
    </div>
  );
}
