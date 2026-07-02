import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBarChart2, FiChevronDown } from "react-icons/fi";
import { useProjectStore } from "../stores/projectStore";
import type { DashboardStats } from "../types";

const RANGES = [
  { h: 1, label: "1h" },
  { h: 24, label: "24h" },
  { h: 168, label: "7d" },
  { h: 720, label: "30d" },
];

/* Status colors — allowed = brand green, blocked = muted red. Always paired with a label. */
const C_ALLOWED = "#00e6a8";
const C_BLOCKED = "#f87171";

export default function Analytics() {
  const navigate = useNavigate();
  const { projects, fetchProjects, fetchStatsFor } = useProjectStore();

  const [projectId, setProjectId] = useState<string>("");
  const [hours, setHours] = useState<number>(24);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);

  // Load the project list once, default the selection to the first project.
  useEffect(() => { fetchProjects(); }, [fetchProjects]);
  useEffect(() => {
    if (!projectId && projects.length) setProjectId(projects[0].id);
  }, [projects, projectId]);

  // Fetch analytics whenever the selected project or range changes.
  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    setLoading(true);
    fetchStatsFor(projectId, hours).then((s) => {
      if (!cancelled) { setStats(s); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [projectId, hours, fetchStatsFor]);

  const activeProject = projects.find((p) => p.id === projectId);
  const hasData = !!stats && stats.total_requests > 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-main text-4xl font-bold tracking-tight text-white">Analytics</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-400">
            Request volume, block rate, latency and endpoint breakdown across your traffic.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Project selector */}
          <div className="relative">
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="appearance-none rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5 pl-3.5 pr-9 text-sm font-medium text-ink-200 transition-colors hover:border-white/15 focus:border-brand-400/50 focus:outline-none"
            >
              {projects.length === 0 && <option className="bg-ink-900" value="">No projects</option>}
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-ink-900">{p.name}</option>
              ))}
            </select>
            <FiChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500" />
          </div>
          {/* Range selector */}
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
            {RANGES.map((r) => (
              <button
                key={r.h}
                onClick={() => setHours(r.h)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  hours === r.h ? "bg-brand-400/[0.08] text-brand-300" : "text-ink-500 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* No projects at all */}
      {projects.length === 0 ? (
        <EmptyState
          title="No projects to analyze"
          hint="Create a project and start sending traffic through the engine to see analytics here."
          cta={<button className="btn-primary" onClick={() => navigate("/dashboard")}>Go to projects</button>}
        />
      ) : loading && !stats ? (
        <SkeletonGrid />
      ) : !hasData ? (
        <EmptyState
          title="No traffic yet"
          hint={`No requests recorded for ${activeProject?.name ?? "this project"} in the selected window. Once your SDK sends traffic through the engine, analytics appear here.`}
        />
      ) : (
        <Dashboard stats={stats!} hours={hours} />
      )}
    </div>
  );
}

/* ───────────────────────── Dashboard body ───────────────────────── */

function Dashboard({ stats, hours }: { stats: DashboardStats; hours: number }) {
  const allowedPct = stats.total_requests
    ? Math.round((stats.allowed_requests / stats.total_requests) * 100)
    : 0;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Total requests" value={stats.total_requests.toLocaleString()} />
        <Kpi label="Allowed" value={stats.allowed_requests.toLocaleString()} tone="good" />
        <Kpi label="Blocked" value={stats.blocked_requests.toLocaleString()} tone="bad" />
        <Kpi label="Avg latency" value={`${stats.avg_latency_ms}ms`} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Requests over time — spans 2 cols */}
        <Panel title="Requests over time" className="lg:col-span-2">
          <Legend />
          <TimeSeries data={stats.requests_over_time} hours={hours} />
        </Panel>

        {/* Allowed vs blocked ratio */}
        <Panel title="Allowed vs blocked">
          <Donut allowed={stats.allowed_requests} blocked={stats.blocked_requests} allowedPct={allowedPct} />
        </Panel>
      </div>

      {/* Top endpoints */}
      <Panel title="Top endpoints">
        <TopEndpoints rows={stats.top_endpoints} />
      </Panel>
    </div>
  );
}

/* ───────────────────────── KPI ───────────────────────── */

function Kpi({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  const dot = tone === "good" ? "bg-brand-500" : tone === "bad" ? "bg-red-500" : "bg-ink-600";
  return (
    <div className="card-interactive p-5">
      <p className="stat-value text-[28px] leading-none">{value}</p>
      <p className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {label}
      </p>
    </div>
  );
}

/* ───────────────────────── Panel + legend ───────────────────────── */

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`card p-5 ${className}`}>
      <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}

function Legend() {
  return (
    <div className="mb-3 flex items-center gap-4 text-[11px] font-medium text-ink-400">
      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{ background: C_ALLOWED }} /> Allowed</span>
      <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm" style={{ background: C_BLOCKED }} /> Blocked</span>
    </div>
  );
}

/* ───────────────────────── Time series (stacked bars) ───────────────────────── */

function TimeSeries({ data, hours }: { data: DashboardStats["requests_over_time"]; hours: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 720, H = 200, padB = 22, padL = 4;

  const max = Math.max(1, ...data.map((d) => d.allowed + d.blocked));
  const n = data.length;
  const gap = 2;
  const bw = n > 0 ? (W - padL * 2) / n : 0;

  const fmt = (iso: string) => {
    const d = new Date(iso);
    return hours <= 24
      ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  if (n === 0) return <p className="py-8 text-center text-sm text-ink-500">No time-bucketed data.</p>;

  // gridlines at 0/50/100%
  const gridY = [0, 0.5, 1];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 200 }}>
        {gridY.map((g) => {
          const y = padL + (H - padB - padL) * (1 - g);
          return <line key={g} x1={padL} x2={W - padL} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />;
        })}
        {data.map((d, i) => {
          const total = d.allowed + d.blocked;
          const x = padL + i * bw;
          const innerW = Math.max(1, bw - gap);
          const chartH = H - padB - padL;
          const hAllowed = (d.allowed / max) * chartH;
          const hBlocked = (d.blocked / max) * chartH;
          const yBlocked = padL + chartH - hBlocked;
          const yAllowed = yBlocked - hAllowed;
          const active = hover === i;
          return (
            <g key={i} opacity={hover === null || active ? 1 : 0.45} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              {/* hit area */}
              <rect x={x} y={padL} width={bw} height={chartH} fill="transparent" />
              {d.blocked > 0 && <rect x={x} y={yBlocked} width={innerW} height={Math.max(0, hBlocked)} rx={1} fill={C_BLOCKED} />}
              {d.allowed > 0 && <rect x={x} y={yAllowed} width={innerW} height={Math.max(0, hAllowed)} rx={1} fill={C_ALLOWED} />}
              {total === 0 && <rect x={x} y={padL + chartH - 2} width={innerW} height={2} rx={1} fill="rgba(255,255,255,0.08)" />}
            </g>
          );
        })}
      </svg>
      {/* x-axis labels: first / middle / last */}
      <div className="mt-1 flex justify-between px-1 text-[10px] text-ink-600">
        <span>{fmt(data[0].time)}</span>
        {n > 2 && <span>{fmt(data[Math.floor(n / 2)].time)}</span>}
        <span>{fmt(data[n - 1].time)}</span>
      </div>
      {/* tooltip */}
      {hover !== null && data[hover] && (
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-white/10 bg-ink-900/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
          <p className="mb-1 font-mono text-[10px] text-ink-400">{new Date(data[hover].time).toLocaleString()}</p>
          <p className="flex items-center gap-1.5 text-ink-200"><span className="h-2 w-2 rounded-sm" style={{ background: C_ALLOWED }} /> {data[hover].allowed.toLocaleString()} allowed</p>
          <p className="flex items-center gap-1.5 text-ink-200"><span className="h-2 w-2 rounded-sm" style={{ background: C_BLOCKED }} /> {data[hover].blocked.toLocaleString()} blocked</p>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Donut ───────────────────────── */

function Donut({ allowed, blocked, allowedPct }: { allowed: number; blocked: number; allowedPct: number }) {
  const total = allowed + blocked;
  const r = 52, sw = 14, C = 2 * Math.PI * r;
  const allowedFrac = total ? allowed / total : 0;
  const allowedLen = C * allowedFrac;

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="relative">
        <svg width={140} height={140} viewBox="0 0 140 140" className="-rotate-90">
          <circle cx={70} cy={70} r={r} fill="none" stroke={C_BLOCKED} strokeWidth={sw} />
          <circle
            cx={70} cy={70} r={r} fill="none" stroke={C_ALLOWED} strokeWidth={sw}
            strokeDasharray={`${allowedLen} ${C - allowedLen}`} strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="stat-value text-3xl">{allowedPct}%</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-500">allowed</span>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-ink-300"><span className="h-2 w-2 rounded-sm" style={{ background: C_ALLOWED }} /> Allowed</span>
          <span className="font-mono text-ink-200">{allowed.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-ink-300"><span className="h-2 w-2 rounded-sm" style={{ background: C_BLOCKED }} /> Blocked</span>
          <span className="font-mono text-ink-200">{blocked.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Top endpoints ───────────────────────── */

function TopEndpoints({ rows }: { rows: DashboardStats["top_endpoints"] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  if (rows.length === 0) return <p className="py-6 text-center text-sm text-ink-500">No endpoint data.</p>;
  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const w = (r.count / max) * 100;
        const hot = r.block_rate >= 50;
        return (
          <div key={r.endpoint} className="group">
            <div className="mb-1 flex items-center justify-between gap-3 text-xs">
              <span className="truncate font-mono text-ink-200">{r.endpoint}</span>
              <span className="flex shrink-0 items-center gap-3 text-ink-500">
                <span className={hot ? "text-red-400" : "text-ink-400"}>{r.block_rate}% blocked</span>
                <span className="font-mono text-ink-300">{r.count.toLocaleString()}</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${w}%`, background: hot ? C_BLOCKED : C_ALLOWED }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────────────── States ───────────────────────── */

function EmptyState({ title, hint, cta }: { title: string; hint: string; cta?: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center p-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-ink-400">
        <FiBarChart2 size={26} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-6 max-w-sm text-sm leading-relaxed text-ink-400">{hint}</p>
      {cta}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card p-5">
            <div className="skeleton mb-3 h-7 w-2/3" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2 p-5"><div className="skeleton h-52 w-full" /></div>
        <div className="card p-5"><div className="skeleton h-52 w-full" /></div>
      </div>
    </div>
  );
}
