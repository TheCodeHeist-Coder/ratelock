import { useState } from "react";
import { FiLock, FiX } from "react-icons/fi";

/**
 * Re-authentication modal. Collects the account password and hands it to
 * `onConfirm`, which should perform the sensitive action and throw on failure
 * (e.g. a 401 "Incorrect password" from the API). On success the modal closes.
 */
export default function PasswordPrompt({
  title,
  message,
  confirmLabel = "Confirm",
  tone = "primary",
  onConfirm,
  onClose,
}: {
  title: string;
  message?: string;
  confirmLabel?: string;
  tone?: "primary" | "danger";
  onConfirm: (password: string) => Promise<void>;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!password) {
      setError("Enter your password to continue.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onConfirm(password);
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.error ?? e?.message ?? "Incorrect password.");
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in"
      onClick={() => !busy && onClose()}
    >
      <div className="card w-full max-w-md p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-ink-300">
              <FiLock size={16} />
            </div>
            <h3 className="font-main text-lg font-bold text-white">{title}</h3>
          </div>
          <button className="btn-ghost px-2 py-2" onClick={() => !busy && onClose()}>
            <FiX size={18} />
          </button>
        </div>

        {message && <p className="mb-4 text-sm leading-relaxed text-ink-400">{message}</p>}

        <label className="label">Confirm your password</label>
        <input
          type="password"
          className="input"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="••••••••"
        />

        {error && (
          <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
            {error}
          </p>
        )}

        <div className="mt-5 flex gap-3">
          <button
            className={`${tone === "danger" ? "btn-danger" : "btn-primary"} flex-1`}
            onClick={submit}
            disabled={busy}
          >
            {busy ? "Verifying…" : confirmLabel}
          </button>
          <button className="btn-secondary" onClick={onClose} disabled={busy}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
