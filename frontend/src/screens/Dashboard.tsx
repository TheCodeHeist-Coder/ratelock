import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../stores/projectStore';
import { format } from 'date-fns';
import { FiPlus, FiFolder, FiTrash2, FiZap, FiBarChart2, FiActivity, FiX } from 'react-icons/fi';

export default function ProjectsList() {
  const { projects, fetchProjects, createProject, deleteProject, loading } = useProjectStore();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-brand-400">Control Plane</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">Projects</h1>
          <p className="mt-1 text-sm text-ink-400">Each project gets its own API key, rule set and traffic intelligence.</p>
        </div>
        <button className="btn-primary self-start sm:self-auto" onClick={() => setShowCreate(true)}>
          <FiPlus size={16} />
          New project
        </button>
      </div>

      {/* Summary stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryStat icon={<FiFolder size={16} />} label="Projects" value={projects.length} />
        <SummaryStat icon={<FiBarChart2 size={16} />} label="Total rules" value={totalRules} />
        <SummaryStat icon={<FiActivity size={16} />} label="Lifetime requests" value={totalEvents} />
      </div>

      {/* Projects grid */}
      {loading && projects.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-ink-500">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-400/30 border-t-brand-400" />
        </div>
      ) : projects.length === 0 ? (
        <div className="card flex flex-col items-center p-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-400/10">
            <FiZap size={24} className="text-brand-400" />
          </div>
          <h3 className="mb-2 font-semibold text-white">No projects yet</h3>
          <p className="mb-6 max-w-sm text-sm text-ink-400">
            Spin up your first project to generate an API key and start rate limiting any backend.
          </p>
          <button className="btn-primary" onClick={() => setShowCreate(true)}>
            <FiPlus size={15} />
            Create project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="card group relative cursor-pointer p-5 transition-all duration-200 hover:border-brand-400/40 hover:shadow-[0_0_30px_rgba(0,230,168,0.07)]"
              onClick={() => navigate(`/dashboard/projects/${p.id}`)}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-400/10 text-brand-400">
                  <FiFolder size={18} />
                </div>
                <button
                  className="rounded-lg p-1.5 text-ink-500 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                  onClick={(e) => { e.stopPropagation(); if (confirm(`Delete "${p.name}"? This cannot be undone.`)) deleteProject(p.id); }}
                  title="Delete project"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
              <h3 className="mb-1 truncate font-semibold text-white">{p.name}</h3>
              {p.description
                ? <p className="line-clamp-2 text-xs text-ink-400">{p.description}</p>
                : <p className="text-xs italic text-ink-600">No description</p>}
              <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4 text-xs text-ink-400">
                <span className="flex items-center gap-1.5"><FiBarChart2 size={12} />{p._count?.rules ?? 0} rules</span>
                <span className="ml-auto text-ink-600">{format(new Date(p.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in" onClick={() => setShowCreate(false)}>
          <div className="card w-full max-w-md p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">New project</h3>
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
    </div>
  );
}

function SummaryStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-400/10 text-brand-400">{icon}</div>
      <div>
        <p className="stat-value text-2xl">{value.toLocaleString()}</p>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500">{label}</p>
      </div>
    </div>
  );
}
