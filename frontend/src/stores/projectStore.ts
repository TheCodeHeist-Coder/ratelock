import { create } from "zustand";
import type { Alert, DashboardStats, Event, Project, Rule } from "../types";
import { api } from "../lib/api";




interface ProjectState {
    projects: Project[];
    activeProject: Project | null;
    rules: Rule[];
    alerts: Alert[];
    stats: DashboardStats | null;
    events: Event[];
    loading: boolean;
    statsHours: number;

    // projects
    fetchProjects: () => Promise<void>;
    fetchProject: (id: string) => Promise<Project | null>;
    createProject: (name: string, description?: string) => Promise<Project>;
    updateProject: (id: string, data: { name?: string; description?: string }) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    setActiveProject: (p: Project | null) => void;
    rotateKey: (id: string) => Promise<void>;

    // for rules
    fetchRules: (projectId: string) => Promise<void>;
    createRule: (projectId: string, data: Partial<Rule>) => Promise<void>;
    updateRule: (projectId: string, ruleId: string, data: Partial<Rule>) => Promise<void>;
    deleteRule: (projectId: string, ruleId: string) => Promise<void>;

    // alets
    fetchAlerts: (projectId: string) => Promise<void>;
    createAlert: (projectId: string, data: Partial<Alert>) => Promise<void>;
    updateAlert: (projectId: string, alertId: string, data: Partial<Alert>) => Promise<void>;
    deleteAlert: (projectId: string, alertId: string) => Promise<void>;

    // stats & events
    fetchStats: (projectId: string, hours?: number) => Promise<void>;
    fetchEvents: (projectId: string) => Promise<void>;
    setStatsHours: (h: number) => void;
}




export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    activeProject: null,
    rules: [],
    alerts: [],
    stats: null,
    events: [],
    loading: false,
    statsHours: 24,

    fetchProjects: async () => {
        set({ loading: true });
        const { data } = await api.get('/projects');
        set({ projects: data.projects, loading: false });
    },

    fetchProject: async (id) => {
        // backend exposes the single-project read as POST /projects/:id
        const { data } = await api.post(`/projects/${id}`);
        set((s) => ({
            activeProject: data.project,
            projects: s.projects.some((p) => p.id === id)
                ? s.projects.map((p) => (p.id === id ? { ...p, ...data.project } : p))
                : s.projects,
        }));
        return data.project;
    },

    createProject: async (name, description) => {
        const { data } = await api.post('/projects', { name, description });
        set((s) => ({ projects: [data.project, ...s.projects] }));
        return data.project;
    },

    updateProject: async (id, body) => {
        const { data } = await api.put(`/projects/${id}`, body);
        set((s) => ({
            projects: s.projects.map((p) => (p.id === id ? { ...p, ...data.project } : p)),
            activeProject: s.activeProject?.id === id ? { ...s.activeProject, ...data.project } : s.activeProject,
        }));
    },

    deleteProject: async (id) => {
        await api.delete(`/projects/${id}`);
        set((s) => ({
            projects: s.projects.filter((p) => p.id !== id),
            activeProject: s.activeProject?.id === id ? null : s.activeProject,
        }));
    },

    setActiveProject: (p) => set({ activeProject: p, rules: [], alerts: [], stats: null, events: [] }),

    rotateKey: async (id) => {
        const { data } = await api.post(`/projects/${id}/rotate-api-key`);
        set((s) => ({
            projects: s.projects.map((p) => (p.id === id ? data.project : p)),
            activeProject: s.activeProject?.id === id ? data.project : s.activeProject,
        }));
    },

    fetchRules: async (projectId) => {
        const { data } = await api.get(`/projects/${projectId}/rules`);
        set({ rules: data.rules });
    },

    createRule: async (projectId, rule) => {
        const { data } = await api.post(`/projects/${projectId}/rules`, {
            name: rule.name,
            endpoint_pattern: rule.endpointPattern,
            limit_count: rule.limitCount,
            window_seconds: rule.windowSeconds,
            tier: rule.tier,
            algorithm: rule.algorithm,
        });
        set((s) => ({ rules: [...s.rules, data.rule] }));
    },

    updateRule: async (projectId, ruleId, rule) => {
        const { data } = await api.put(`/projects/${projectId}/rules/${ruleId}`, {
            name: rule.name,
            endpoint_pattern: rule.endpointPattern,
            limit_count: rule.limitCount,
            window_seconds: rule.windowSeconds,
            tier: rule.tier,
            algorithm: rule.algorithm,
            is_active: rule.isActive,
        });
        set((s) => ({ rules: s.rules.map((r) => (r.id === ruleId ? data.rule : r)) }));
    },

    deleteRule: async (projectId, ruleId) => {
        await api.delete(`/projects/${projectId}/rules/${ruleId}`);
        set((s) => ({ rules: s.rules.filter((r) => r.id !== ruleId) }));
    },

    fetchAlerts: async (projectId) => {
        const { data } = await api.get(`/projects/${projectId}/alerts`);
        set({ alerts: data.alerts });
    },

    createAlert: async (projectId, alert) => {
        const { data } = await api.post(`/projects/${projectId}/alerts`, {
            name: alert.name,
            threshold_percent: alert.thresholdPercent,
            window_minutes: alert.windowMinutes,
            channel: alert.channel,
            destination: alert.destination,
        });
        set((s) => ({ alerts: [data.alert, ...s.alerts] }));
    },

    updateAlert: async (projectId, alertId, alert) => {
        const { data } = await api.patch(`/projects/${projectId}/alerts/${alertId}`, {
            name: alert.name,
            threshold_percent: alert.thresholdPercent,
            window_minutes: alert.windowMinutes,
            channel: alert.channel,
            destination: alert.destination,
            is_active: alert.isActive,
        });
        set((s) => ({ alerts: s.alerts.map((a) => (a.id === alertId ? data.alert : a)) }));
    },

    deleteAlert: async (projectId, alertId) => {
        await api.delete(`/projects/${projectId}/alerts/${alertId}`);
        set((s) => ({ alerts: s.alerts.filter((a) => a.id !== alertId) }));
    },

    fetchStats: async (projectId, hours) => {
        const h = hours ?? get().statsHours;
        // backend route is /states (analytics controller is still a stub → tolerate empty)
        try {
            const { data } = await api.get(`/projects/${projectId}/states?hours=${h}`);
            set({ stats: data?.stats ?? null });
        } catch {
            set({ stats: null });
        }
    },

    fetchEvents: async (projectId) => {
        try {
            const { data } = await api.get(`/projects/${projectId}/events?limit=100`);
            set({ events: data?.events ?? [] });
        } catch {
            set({ events: [] });
        }
    },

    setStatsHours: (h) => set({ statsHours: h }),
}));
