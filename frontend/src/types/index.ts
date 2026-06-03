export type Plan = 'free' | 'pro' | 'team';
export type Algorithm = 'sliding_window' | 'fixed_window' | 'token_bucket';
export type AlertChannel = 'email' | 'slack' | 'webhook';


export interface User {
    id: string;
    email: string;
    name: string;
    plan: Plan;
    createdAt: string;
    updatedAt: string;
}

export interface Project {
    id: string;
    userId: string;
    name: string;
    description: string;
    apiKey: string;
    createdAt: string;
    updatedAt: string;
    _count?: {rules: number; events: number};
}


export interface Rule {
   id: string;
  projectId: string;
  name: string;
  endpointPattern: string;
  limitCount: number;
  windowSeconds: number;
  tier: string;
  algorithm: Algorithm;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}




export interface Event {
  id: number;
  projectId: string;
  apiKeyUsed: string;
  endpoint: string;
  method: string;
  allowed: boolean;
  ipAddress?: string;
  latencyMs?: number;
  timestamp: string;
}


export interface Alert {
  id: string;
  projectId: string;
  name: string;
  thresholdPercent: number;
  windowMinutes: number;
  channel: AlertChannel;
  destination: string;
  isActive: boolean;
  lastTriggeredAt?: string;
  createdAt: string;
}


export interface DashboardStats {
  total_requests: number;
  allowed_requests: number;
  blocked_requests: number;
  block_rate: number;
  avg_latency_ms: number;
  top_endpoints: { endpoint: string; count: number; block_rate: number }[];
  requests_over_time: { time: string; allowed: number; blocked: number }[];
}
