import { create } from 'zustand';
import type { User } from '../types';
import { api } from '../lib/api';


interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;

    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    fetchMe: () => Promise<void>;

}



export const useAuthStore = create<AuthState>((set) => ({
  user:    null,
  token:   localStorage.getItem('rl_token'),
  loading: false,

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('rl_token', data.token);
    set({ user: data.user, token: data.token });
  },

  register: async (email, password, name) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    localStorage.setItem('rl_token', data.token);
    set({ user: data.user, token: data.token });
  },

  logout: () => {
    localStorage.removeItem('rl_token');
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/auth/me');
      set({ user: data.user });
    } catch {
      localStorage.removeItem('rl_token');
      set({ user: null, token: null });
    } finally {
      set({ loading: false });
    }
  },
}));