import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  FiArrowLeft, FiPlus, FiX, FiTrash2, FiEdit2, FiCopy, FiCheck,
  FiRefreshCw, FiActivity, FiShield, FiBell, FiSettings, FiBarChart2, FiAlertTriangle,
  FiClock, FiZap,
} from "react-icons/fi";
import { useProjectStore } from "../stores/projectStore";
import { useAuthStore } from "../stores/authStore";
import PasswordPrompt from "../components/PasswordPrompt";
import type { Algorithm, Alert, AlertChannel, Rule } from "../types";

type Tab = "overview" | "rules" | "alerts" | "settings";

const ALGORITHMS: { value: Algorithm; label: string }[] = [
  { value: "sliding_window", label: "Sliding window" },
  { value: "fixed_window", label: "Fixed window" },
  { value: "token_bucket", label: "Token bucket" },
];
const CHANNELS: AlertChannel[] = ["email", "slack", "webhook"];

export default function ProjectDetail() {
  const { projectId = "" } = useParams();
  const navigate = useNavigate();
  const store = useProjectStore();
  const {
    projects, activeProject, rules, alerts, stats, events,
    fetchProject, fetchRules, fetchAlerts, fetchStats, fetchEvents, setActiveProject,
  } = store;

  const [tab, setTab] = useState<Tab>("overview");
  const project = activeProject?.id === projectId
    ? activeProject
    : projects.find((p) => p.id === projectId) ?? null;

  useEffect(() => {
    setActiveProject(null);
    fetchProject(projectId).catch(() => {});
    fetchRules(projectId).catch(() => {});
    fetchAlerts(projectId).catch(() => {});
    fetchStats(projectId).catch(() => {});
    fetchEvents(projectId).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: "overview", label: "Overview", icon: <FiActivity size={15} /> },
    { key: "rules", label: "Rules", icon: <FiShield size={15} />, count: rules.length },
    { key: "alerts", label: "Alerts", icon: <FiBell size={15} />, count: alerts.length },
    { key: "settings", label: "Settings", icon: <FiSettings size={15} /> },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10 animate-fade-in">
      {/* Breadcrumb + title */}
      <button onClick={() => navigate("/dashboard")} className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 transition-colors hover:text-brand-300">
        <FiArrowLeft size={13} /> Projects
      </button>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate font-main text-2xl font-bold tracking-wide text-white">
            {project?.name ?? "Loading…"}
          </h1>
          <p className="mt-0.5 flex items-center gap-2 text-sm text-ink-400">
            {project?.description || "No description"}
          </p>
        </div>
        {project && (
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-brand-400/30 bg-brand-400/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" /> Active
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 overflow-x-auto border-b border-white/5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative flex cursor-pointer items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
              tab === t.key ? "text-brand-300" : "text-ink-400 hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-ink-400">{t.count}</span>
            )}
            {tab === t.key && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-400" />}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab stats={stats} events={events} statsHours={store.statsHours} onRange={(h) => { store.setStatsHours(h); fetchStats(projectId, h); }} />}
      {tab === "rules" && <RulesTab projectId={projectId} rules={rules} />}
      {tab === "alerts" && <AlertsTab projectId={projectId} alerts={alerts} />}
      {tab === "settings" && project && <SettingsTab project={project} />}
    </div>
  );
}

/* ─────────────────────────── OVERVIEW ─────────────────────────── */

function OverviewTab({ stats, events, statsHours, onRange }: {
  stats: ReturnType<typeof useProjectStore.getState>["stats"];
  events: ReturnType<typeof useProjectStore.getState>["events"];
  statsHours: number;
  onRange: (hours: number) => void;
}) {
  const blockRate = stats ? Math.round((stats.block_rate ?? 0) * 100) / 100 : 0;
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-end gap-1">
        {[1, 24, 168].map((h) => (
          <button
            key={h}
            onClick={() => onRange(h)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              statsHours === h ? "bg-brand-400/10 text-brand-300" : "text-ink-500 hover:text-white"
            }`}
          >
            {h === 1 ? "1h" : h === 24 ? "24h" : "7d"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={<FiActivity size={16} />} label="Total requests" value={stats?.total_requests} />
        <StatCard icon={<FiCheck size={16} />} label="Allowed" value={stats?.allowed_requests} tone="good" />
        <StatCard icon={<FiAlertTriangle size={16} />} label="Blocked" value={stats?.blocked_requests} tone="bad" />
        <StatCard icon={<FiBarChart2 size={16} />} label="Block rate" value={stats ? `${blockRate}%` : undefined} />
      </div>

      {!stats && (
        <div className="card flex items-center gap-3 border-brand-400/15 bg-brand-400/5 p-4 text-sm text-ink-300">
          <FiClock className="shrink-0 text-brand-400" size={18} />
          Analytics aggregation isn’t reporting data yet. Once your SDK starts sending traffic through the engine, request volume, block rate and latency will appear here.
        </div>
      )}

      {/* Recent events */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h3 className="font-semibold text-white">Recent events</h3>
          <span className="text-xs text-ink-500">{events.length} shown</span>
        </div>
        {events.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-12 text-center">
            <FiZap className="mb-3 text-ink-600" size={22} />
            <p className="text-sm text-ink-400">No traffic recorded yet.</p>
            <p className="mt-1 text-xs text-ink-600">Events show up as requests flow through your rate-limit rules.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[0.15em] text-ink-500">
                  <th className="px-5 py-3 font-bold">Endpoint</th>
                  <th className="px-5 py-3 font-bold">Method</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold">Latency</th>
                  <th className="px-5 py-3 font-bold">Time</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-t border-white/5 text-ink-300">
                    <td className="px-5 py-3 font-mono text-xs text-white">{e.endpoint}</td>
                    <td className="px-5 py-3 text-xs">{e.method}</td>
                    <td className="px-5 py-3">
                      <span className={`badge ${e.allowed ? "badge-on" : "badge-off"} ${!e.allowed ? "border-red-500/40! bg-red-500/10! text-red-400!" : ""}`}>
                        {e.allowed ? "allowed" : "blocked"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs">{e.latencyMs != null ? `${e.latencyMs}ms` : "—"}</td>
                    <td className="px-5 py-3 text-xs text-ink-500">{format(new Date(e.timestamp), "MMM d, HH:mm")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value?: number | string; tone?: "good" | "bad" }) {
  const toneClass =
    tone === "good" ? "bg-brand-400/10 text-brand-400"
    : tone === "bad" ? "bg-red-500/10 text-red-400"
    : "bg-white/5 text-ink-300";
  return (
    <div className="card p-5 transition-colors duration-200 hover:border-white/15">
      <div className={`mb-3 flex h-9 w-9 font-main items-center justify-center rounded-lg ${toneClass}`}>{icon}</div>
      <p className="stat-value">{value ?? "—"}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-ink-500">{label}</p>
    </div>
  );
}

/* ─────────────────────────── RULES ─────────────────────────── */

const emptyRule: Partial<Rule> = {
  name: "", endpointPattern: "*", limitCount: 100, windowSeconds: 60, tier: "default", algorithm: "sliding_window",
};

function RulesTab({ projectId, rules }: { projectId: string; rules: Rule[] }) {
  const { createRule, updateRule, deleteRule } = useProjectStore();
  const [editing, setEditing] = useState<Partial<Rule> | null>(null);

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-400">Rules define the limits enforced on matching endpoints.</p>
        <button className="btn-primary" onClick={() => setEditing({ ...emptyRule })}><FiPlus size={15} /> New rule</button>
      </div>

      {rules.length === 0 ? (
        <EmptyBlock icon={<FiShield size={22} />} title="No rules yet" hint="Create a rule to start enforcing rate limits on an endpoint pattern." />
      ) : (
        <div className="space-y-3">
          {rules.map((r) => (
            <div key={r.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-white">{r.name}</h3>
                  <span className={`badge ${r.isActive ? "badge-on" : "badge-off"}`}>{r.isActive ? "active" : "paused"}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
                  <span className="font-mono text-brand-300">{r.endpointPattern}</span>
                  <span>{r.limitCount} req / {r.windowSeconds}s</span>
                  <span className="text-ink-500">{r.algorithm.replace("_", " ")}</span>
                  <span className="text-ink-600">tier: {r.tier}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary px-3! py-2! text-xs" onClick={() => updateRule(projectId, r.id, { isActive: !r.isActive })}>
                  {r.isActive ? "Pause" : "Resume"}
                </button>
                <button className="btn-ghost px-2 py-2" title="Edit" onClick={() => setEditing(r)}><FiEdit2 size={15} /></button>
                <button className="btn-ghost px-2 py-2 hover:text-red-400!" title="Delete"
                  onClick={() => confirm(`Delete rule "${r.name}"?`) && deleteRule(projectId, r.id)}><FiTrash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <RuleModal
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            if (editing.id) await updateRule(projectId, editing.id, data);
            else await createRule(projectId, data);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function RuleModal({ initial, onClose, onSave }: { initial: Partial<Rule>; onClose: () => void; onSave: (d: Partial<Rule>) => Promise<void> }) {
  const [f, setF] = useState<Partial<Rule>>({ ...emptyRule, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!initial.id;

  const save = async () => {
    if (!f.name?.trim()) { setError("Rule name is required."); return; }
    setSaving(true); setError(null);
    try { await onSave(f); }
    catch (e: any) { setError(e?.response?.data?.error ?? "Failed to save rule"); setSaving(false); }
  };

  return (
    <Modal title={isEdit ? "Edit rule" : "New rule"} onClose={onClose}>
      <div className="space-y-4">
        <Field label="Rule name *">
          <input className="input" autoFocus value={f.name ?? ""} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Auth endpoints" />
        </Field>
        <Field label="Endpoint pattern">
          <input className="input font-mono" value={f.endpointPattern ?? ""} onChange={(e) => setF({ ...f, endpointPattern: e.target.value })} placeholder="/api/auth/*" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Limit (requests)">
            <input type="number" className="input" value={f.limitCount ?? 0} onChange={(e) => setF({ ...f, limitCount: Number(e.target.value) })} />
          </Field>
          <Field label="Window (seconds)">
            <input type="number" className="input" value={f.windowSeconds ?? 0} onChange={(e) => setF({ ...f, windowSeconds: Number(e.target.value) })} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Algorithm">
            <select className="input" value={f.algorithm} onChange={(e) => setF({ ...f, algorithm: e.target.value as Algorithm })}>
              {ALGORITHMS.map((a) => <option key={a.value} value={a.value} className="bg-ink-900">{a.label}</option>)}
            </select>
          </Field>
          <Field label="Tier">
            <input className="input" value={f.tier ?? ""} onChange={(e) => setF({ ...f, tier: e.target.value })} placeholder="default" />
          </Field>
        </div>
        {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">{error}</p>}
        <div className="flex gap-3 pt-1">
          <button className="btn-primary flex-1" onClick={save} disabled={saving}>{saving ? "Saving…" : isEdit ? "Save changes" : "Create rule"}</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

/* ─────────────────────────── ALERTS ─────────────────────────── */

const emptyAlert: Partial<Alert> = {
  name: "", thresholdPercent: 80, windowMinutes: 5, channel: "email", destination: "",
};

function AlertsTab({ projectId, alerts }: { projectId: string; alerts: Alert[] }) {
  const { createAlert, updateAlert, deleteAlert } = useProjectStore();
  const [editing, setEditing] = useState<Partial<Alert> | null>(null);

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-400">Get notified when block rates cross a threshold.</p>
        <button className="btn-primary" onClick={() => setEditing({ ...emptyAlert })}><FiPlus size={15} /> New alert</button>
      </div>

      {alerts.length === 0 ? (
        <EmptyBlock icon={<FiBell size={22} />} title="No alerts configured" hint="Add an alert to be notified over email, Slack or webhook when traffic gets blocked." />
      ) : (
        <div className="space-y-3">
          {alerts.map((a) => (
            <div key={a.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-white">{a.name}</h3>
                  <span className={`badge ${a.isActive ? "badge-on" : "badge-off"}`}>{a.isActive ? "active" : "paused"}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-400">
                  <span>≥ {a.thresholdPercent}% blocked over {a.windowMinutes}m</span>
                  <span className="text-ink-500">via {a.channel}</span>
                  <span className="truncate font-mono text-brand-300">{a.destination}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-secondary px-3! py-2! text-xs" onClick={() => updateAlert(projectId, a.id, { isActive: !a.isActive })}>
                  {a.isActive ? "Pause" : "Resume"}
                </button>
                <button className="btn-ghost px-2 py-2" title="Edit" onClick={() => setEditing(a)}><FiEdit2 size={15} /></button>
                <button className="btn-ghost px-2 py-2 hover:text-red-400!" title="Delete"
                  onClick={() => confirm(`Delete alert "${a.name}"?`) && deleteAlert(projectId, a.id)}><FiTrash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <AlertModal
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            if (editing.id) await updateAlert(projectId, editing.id, data);
            else await createAlert(projectId, data);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function AlertModal({ initial, onClose, onSave }: { initial: Partial<Alert>; onClose: () => void; onSave: (d: Partial<Alert>) => Promise<void> }) {
  const [f, setF] = useState<Partial<Alert>>({ ...emptyAlert, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!initial.id;

  const save = async () => {
    if (!f.name?.trim() || !f.destination?.trim()) { setError("Name and destination are required."); return; }
    setSaving(true); setError(null);
    try { await onSave(f); }
    catch (e: any) { setError(e?.response?.data?.error ?? "Failed to save alert"); setSaving(false); }
  };

  return (
    <Modal title={isEdit ? "Edit alert" : "New alert"} onClose={onClose}>
      <div className="space-y-4">
        <Field label="Alert name *">
          <input className="input" autoFocus value={f.name ?? ""} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="High block rate" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Threshold (% blocked)">
            <input type="number" className="input" value={f.thresholdPercent ?? 0} onChange={(e) => setF({ ...f, thresholdPercent: Number(e.target.value) })} />
          </Field>
          <Field label="Window (minutes)">
            <input type="number" className="input" value={f.windowMinutes ?? 0} onChange={(e) => setF({ ...f, windowMinutes: Number(e.target.value) })} />
          </Field>
        </div>
        <Field label="Channel">
          <select className="input" value={f.channel} onChange={(e) => setF({ ...f, channel: e.target.value as AlertChannel })}>
            {CHANNELS.map((c) => <option key={c} value={c} className="bg-ink-900">{c}</option>)}
          </select>
        </Field>
        <Field label="Destination">
          <input className="input font-mono" value={f.destination ?? ""} onChange={(e) => setF({ ...f, destination: e.target.value })}
            placeholder={f.channel === "email" ? "ops@company.com" : f.channel === "slack" ? "#alerts" : "https://hooks…"} />
        </Field>
        {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">{error}</p>}
        <div className="flex gap-3 pt-1">
          <button className="btn-primary flex-1" onClick={save} disabled={saving}>{saving ? "Saving…" : isEdit ? "Save changes" : "Create alert"}</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

/* ─────────────────────────── SETTINGS ─────────────────────────── */

function SettingsTab({ project }: { project: NonNullable<ReturnType<typeof useProjectStore.getState>["activeProject"]> }) {
  const navigate = useNavigate();
  const { updateProject, rotateKey, deleteProject } = useProjectStore();
  const verifyPassword = useAuthStore((s) => s.verifyPassword);
  const [name, setName] = useState(project.name);
  const [desc, setDesc] = useState(project.description ?? "");
  const [savedMsg, setSavedMsg] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  // which password-gated action is currently being confirmed
  const [gate, setGate] = useState<null | "reveal" | "rotate" | "delete">(null);

  useEffect(() => { setName(project.name); setDesc(project.description ?? ""); }, [project.id]);

  const dirty = name !== project.name || desc !== (project.description ?? "");
  const maskedKey = useMemo(() => project.apiKey ? `${project.apiKey.slice(0, 8)}${"•".repeat(24)}${project.apiKey.slice(-4)}` : "", [project.apiKey]);

  const copyKey = async () => {
    await navigator.clipboard.writeText(project.apiKey);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-2xl space-y-6 animate-slide-up">
      {/* API key */}
      <div className="card p-6">
        <h3 className="font-semibold text-white">API key</h3>
        <p className="mt-1 text-sm text-ink-400">Use this key in the <span className="font-mono text-brand-300">X-RL-Key</span> header from your SDK or backend.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <code className="flex-1 truncate rounded-xl border border-white/10 bg-black px-4 py-3 font-mono text-sm text-ink-200">
            {revealed ? project.apiKey : maskedKey}
          </code>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => (revealed ? setRevealed(false) : setGate("reveal"))}>{revealed ? "Hide" : "Reveal"}</button>
            <button className="btn-secondary" onClick={copyKey}>{copied ? <FiCheck size={15} className="text-brand-400" /> : <FiCopy size={15} />}{copied ? "Copied" : "Copy"}</button>
          </div>
        </div>
        <button
          className="btn-ghost mt-3 px-0! text-xs text-ink-400 hover:bg-transparent! hover:text-red-400"
          onClick={() => setGate("rotate")}
        >
          <FiRefreshCw size={13} /> Rotate key
        </button>
      </div>

      {/* General */}
      <div className="card p-6">
        <h3 className="font-semibold text-white">General</h3>
        <div className="mt-4 space-y-4">
          <Field label="Project name">
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Description">
            <input className="input" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What is this project for?" />
          </Field>
          <div className="flex items-center gap-3">
            <button className="btn-primary" disabled={!dirty || !name.trim()}
              onClick={async () => { await updateProject(project.id, { name: name.trim(), description: desc.trim() }); setSavedMsg(true); setTimeout(() => setSavedMsg(false), 1500); }}>
              Save changes
            </button>
            {savedMsg && <span className="flex items-center gap-1.5 text-xs text-brand-400"><FiCheck size={14} /> Saved</span>}
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="card border-red-500/20 p-6">
        <h3 className="font-semibold text-red-400">Danger zone</h3>
        <p className="mt-1 text-sm text-ink-400">Deleting a project removes its rules, alerts and events permanently.</p>
        <button className="btn-danger mt-4" onClick={() => setGate("delete")}>
          <FiTrash2 size={15} /> Delete project
        </button>
      </div>

      {gate === "reveal" && (
        <PasswordPrompt
          title="Reveal API key"
          message="Confirm your account password to display the full API key."
          confirmLabel="Reveal key"
          onConfirm={async (pw) => {
            const ok = await verifyPassword(pw);
            if (!ok) throw new Error("Incorrect password.");
            setRevealed(true);
          }}
          onClose={() => setGate(null)}
        />
      )}

      {gate === "rotate" && (
        <PasswordPrompt
          title="Rotate API key"
          message="The current key stops working immediately. Confirm your password to generate a new one."
          confirmLabel="Rotate key"
          tone="danger"
          onConfirm={async (pw) => {
            await rotateKey(project.id, pw);
            setRevealed(true);
          }}
          onClose={() => setGate(null)}
        />
      )}

      {gate === "delete" && (
        <PasswordPrompt
          title="Delete project"
          message={`This permanently deletes "${project.name}" and all its rules, alerts and events. Confirm your password to continue.`}
          confirmLabel="Delete project"
          tone="danger"
          onConfirm={async (pw) => {
            await deleteProject(project.id, pw);
            navigate("/dashboard");
          }}
          onClose={() => setGate(null)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────── SHARED ─────────────────────────── */

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="card max-h-[90vh] w-full max-w-md overflow-y-auto p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white">{title}</h3>
          <button className="btn-ghost px-2 py-2" onClick={onClose}><FiX size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function EmptyBlock({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="card flex flex-col items-center p-14 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-400/10 ring-1 ring-brand-400/20 text-brand-400">{icon}</div>
      <h3 className="mb-2 font-semibold text-white">{title}</h3>
      <p className="max-w-sm text-sm text-ink-400">{hint}</p>
    </div>
  );
}
