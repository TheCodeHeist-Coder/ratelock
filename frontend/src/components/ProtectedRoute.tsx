import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function ProtectedRoute() {
  const { token, user, initialized, fetchMe } = useAuthStore();

  useEffect(() => {
    if (!initialized) fetchMe();
  }, [initialized, fetchMe]);

  // No token at all — straight to login.
  if (!token) return <Navigate to="/login" replace />;

  // Token present but we haven't confirmed the session yet.
  if (!initialized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-brand-400/30 border-t-brand-400 animate-spin" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-500">
            Syncing session…
          </p>
        </div>
      </div>
    );
  }

  // Initialized but the token turned out to be invalid.
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
