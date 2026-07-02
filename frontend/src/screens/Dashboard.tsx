import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import PasswordPrompt from '../components/PasswordPrompt';
import type { Project } from '../types';
import { format } from 'date-fns';
import { FiPlus, FiFolder, FiTrash2, FiZap, FiBarChart2, FiActivity, FiX, FiInfo, FiClock, FiArrowRight } from 'react-icons/fi';

export default function ProjectsList() {
  const { projects, fetchProjects, createProject, deleteProject, loading } = useProjectStore();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  async function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const p = await createProject(newName.trim(), newDesc.trim());
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      navigate(`/dashboard/projects/${p.id}`);
    } catch (e: any) {
      setError(e?.response?.data?.error ?? 'Failed to create project');
    } finally {
      setCreating(false);
    }
  }

  const totalRules = projects.reduce((acc, p) => acc + (p._count?.rules ?? 0), 0);
  const totalEvents = projects.reduce((acc, p) => acc + (p._count?.events ?? 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/[0.06] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(0,230,168,0.8)]" />
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-brand-300">Control Plane</span>
          </div>
          <h1 className="font-main text-4xl font-bold tracking-tight text-gradient">Projects</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-400">
            Each project gets its own API key, rule set and traffic intelligence.
          </p>
        </div>
        <button className="btn-primary self-start sm:self-auto" onClick={() => setShowCreate(true)}>
          <FiPlus size={16} />
          New project
        </button>
      </div>

      {/* Summary stats */}
      <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryStat icon={<FiFolder size={17} />} label="Projects" value={projects.length} accent="brand" />
        <SummaryStat icon={<FiBarChart2 size={17} />} label="Total rules" value={totalRules} accent="violet" />
        <SummaryStat icon={<FiActivity size={17} />} label="Lifetime requests" value={totalEvents} accent="sky" />
      </div>

      {/* Projects grid */}
      {loading && projects.length === 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="skeleton h-10 w-10 rounded-xl" />
              </div>
              <div className="skeleton mb-2 h-4 w-2/3" />
              <div className="skeleton mb-5 h-3 w-full" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card relative flex flex-col items-center overflow-hidden p-16 text-center">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,230,168,0.08), transparent 70%)' }} />
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-400/10 ring-1 ring-brand-400/25 shadow-[0_0_40px_-8px_rgba(0,230,168,0.4)]">
            <FiZap size={26} className="text-brand-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">No projects yet</h3>
          <p className="mb-6 max-w-sm text-sm leading-relaxed text-ink-400">
            Spin up your first project to generate an API key and start rate limiting any backend.
          </p>
          <button className="btn-primary" onClick={() => setShowCreate(true)}>
            <FiPlus size={15} />
            Create project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="card-interactive group cursor-pointer p-5 animate-rise"
              style={{ animationDelay: `${Math.min(i * 60, 360)}ms` }}
              onClick={() => navigate(`/dashboard/projects/${p.id}`)}
            >
              {/* soft radial glow that fades in on hover */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-400/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative mb-4 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/20 to-brand-600/5 text-brand-400 ring-1 ring-brand-400/15 transition-all duration-300 group-hover:ring-brand-400/40 group-hover:shadow-[0_0_20px_-4px_rgba(0,230,168,0.5)]">
                  <FiFolder size={19} />
                </div>
                <button
                  className="rounded-lg p-1.5 text-ink-500 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                  onClick={(e) => { e.stopPropagation(); setDeleteTarget(p); }}
                  title="Delete project"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
              <h3 className="relative mb-1 truncate text-[15px] font-semibold text-white transition-colors group-hover:text-brand-100">{p.name}</h3>
              {p.description
                ? <p className="relative line-clamp-2 text-xs leading-relaxed text-ink-400">{p.description}</p>
                : <p className="relative text-xs italic text-ink-600">No description</p>}
              <div className="relative mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-xs text-ink-400">
                <span className="flex items-center gap-1.5"><FiBarChart2 size={12} className="text-brand-400/70" />{p._count?.rules ?? 0} rules</span>
                <span className="text-ink-600">{format(new Date(p.createdAt), 'MMM d, yyyy')}</span>
                <FiArrowRight size={15} className="ml-auto -translate-x-1 text-brand-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footnotes */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-4">
          <FiInfo size={17} className="mt-0.5 shrink-0 text-brand-400/80" />
          <p className="text-[13px] leading-relaxed text-ink-500">
            Projects act as isolated environments. You can manage separate API keys and rule sets for staging, development, and production.
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-4">
          <FiClock size={17} className="mt-0.5 shrink-0 text-brand-400/80" />
          <p className="text-[13px] leading-relaxed text-ink-500">
            Our edge network ensures &lt;1ms latency for all rate limiting checks across 32 globally distributed regions.
          </p>
        </div>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in" onClick={() => setShowCreate(false)}>
          <div className="card w-full max-w-md p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-main text-xl font-bold text-white">New project</h3>
              <button className="btn-ghost px-2 py-2" onClick={() => setShowCreate(false)}><FiX size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label">Project name *</label>
                <input
                  className="input"
                  placeholder="My API"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
              </div>
              <div>
                <label className="label">Description (optional)</label>
                <input
                  className="input"
                  placeholder="Production backend rate limiting"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
              {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button className="btn-primary flex-1" onClick={handleCreate} disabled={creating || !newName.trim()}>
                  {creating ? 'Creating…' : 'Create project'}
                </button>
                <button className="btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation (re-auth) */}
      {deleteTarget && (
        <PasswordPrompt
          title="Delete project"
          message={`This permanently deletes "${deleteTarget.name}" and all its rules, alerts and events. Confirm your password to continue.`}
          confirmLabel="Delete project"
          tone="danger"
          onConfirm={async (pw) => { await deleteProject(deleteTarget.id, pw); }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

const ACCENTS = {
  brand: { icon: 'from-brand-400/25 to-brand-600/5 text-brand-400 ring-brand-400/20', glow: 'rgba(0,230,168,0.12)' },
  violet: { icon: 'from-violet-500/25 to-violet-700/5 text-violet-300 ring-violet-500/20', glow: 'rgba(139,92,246,0.12)' },
  sky: { icon: 'from-sky-500/25 to-sky-700/5 text-sky-300 ring-sky-500/20', glow: 'rgba(56,189,248,0.12)' },
} as const;

function SummaryStat({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: number; accent: keyof typeof ACCENTS }) {
  const a = ACCENTS[accent];
  return (
    <div className="card-interactive group flex items-center gap-4 p-5">
      <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" style={{ background: a.glow }} />
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ${a.icon}`}>{icon}</div>
      <div className="min-w-0">
        <p className="stat-value text-[26px] leading-none">{value.toLocaleString()}</p>
        <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500">{label}</p>
      </div>
    </div>
  );
}
