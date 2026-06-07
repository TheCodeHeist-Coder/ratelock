import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProjectStore } from '../stores/projectStore';
import { format } from 'date-fns';
import { FaFolderOpen, FaPlus } from 'react-icons/fa';
import { FiBarChart, FiTrash2, FiZap } from 'react-icons/fi';

export default function DashboardPage() {
  const { projects, fetchProjects, createProject, deleteProject, loading } = useProjectStore();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  async function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const p = await createProject(newName.trim(), newDesc.trim());
      setShowCreate(false);
      setNewName('');
      setNewDesc('');
      navigate(`/projects/${p.id}`);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Projects</h1>
          <p className="text-sm text-ink-300 mt-0.5">Each project gets its own API key and rule set</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>
          <FaPlus size={15} />
          New project
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="card p-5 mb-6 animate-slide-up border-brand-800/50">
          <h3 className="font-semibold text-white mb-4">New Project</h3>
          <div className="space-y-3">
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
            <div className="flex gap-2 pt-1">
              <button className="btn-primary" onClick={handleCreate} disabled={creating || !newName.trim()}>
                {creating ? 'Creating…' : 'Create project'}
              </button>
              <button className="btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Projects grid */}
      {loading && projects.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-ink-400">Loading…</div>
      ) : projects?.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-900/40 flex items-center justify-center mx-auto mb-4">
            <FiZap size={22} className="text-brand-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-sm text-ink-400 mb-5">Create your first project to start rate limiting</p>
          <button className="btn-primary mx-auto" onClick={() => setShowCreate(true)}>
            <FaPlus size={14} />
            Create project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects?.map((p) => (
            <div
              key={p.id}
              className="card p-5 hover:border-ink-600 transition-all group cursor-pointer relative"
              onClick={() => navigate(`/projects/${p.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-brand-900/50 flex items-center justify-center shrink-0">
                  <FaFolderOpen size={16} className="text-brand-400" />
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 text-ink-400 hover:text-red-400 transition-all p-1 rounded"
                  onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }}
                  title="Delete project"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
              <h3 className="font-semibold text-white text-sm mb-1 truncate">{p.name}</h3>
              {p.description && (
                <p className="text-xs text-ink-400 mb-3 line-clamp-2">{p.description}</p>
              )}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-ink-700">
                <div className="flex items-center gap-1.5 text-xs text-ink-400">
                  <FiBarChart size={11} />
                  {p._count?.rules ?? 0} rules
                </div>
                <div className="text-xs text-ink-500">
                  {format(new Date(p.createdAt), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
