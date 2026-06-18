import { create } from 'zustand';
import type { User } from '../types';
import { api } from '../lib/api';


interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    initialized: boolean;

    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchMe: () => Promise<void>;
}



export const useAuthStore = create<AuthState>((set, get) => ({
  user:    null,
  token:   localStorage.getItem('rl_token'),
  loading: false,
  initialized: false,

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('rl_token', data.token);
    set({ token: data.token });
    // login response shape is light — pull the canonical user from /auth/me
    await get().fetchMe();
  },

  register: async (name, email, password) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    localStorage.setItem('rl_token', data.token);
    set({ token: data.token });
    await get().fetchMe();
  },

  logout: () => {
    localStorage.removeItem('rl_token');
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    const token = get().token ?? localStorage.getItem('rl_token');
    if (!token) {
      set({ user: null, token: null, initialized: true });
      return;
    }
    set({ loading: true });
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user, token });
    } catch {
      localStorage.removeItem('rl_token');
      set({ user: null, token: null });
    } finally {
      set({ loading: false, initialized: true });
    }
  },
}));
