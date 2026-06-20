import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap } from "react-icons/fi";

type Endpoint = { m: "GET" | "POST"; p: string; limit: number };

const ENDPOINTS: Endpoint[] = [
  { m: "GET", p: "/api/v2/users", limit: 500 },
  { m: "POST", p: "/api/v2/login", limit: 100 },
  { m: "POST", p: "/api/v2/checkout", limit: 200 },
  { m: "GET", p: "/api/v2/orders", limit: 500 },
  { m: "GET", p: "/api/v2/products", limit: 800 },
];

const LOGIN = ENDPOINTS[1];

type Row = {
  id: number;
  t: string;
  m: string;
  p: string;
  s: number;
  lat: string;
  rem: string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const stamp = () => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export default function LiveDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [stats, setStats] = useState({ requests: 1284902, allowed: 1275500, throttled: 9402 });
  const [p99, setP99] = useState(8.4);
  const [bursting, setBursting] = useState(false);
  const [interacted, setInteracted] = useState(false);

  // mutable remaining-quota per endpoint (token buckets)
  const remaining = useRef<Record<string, number>>(
    Object.fromEntries(ENDPOINTS.map((e) => [e.p, e.limit]))
  );
  const idRef = useRef(0);

  const fire = useCallback((count: number, forced?: Endpoint) => {
    const t = stamp();
    const fresh: Row[] = [];
    let allowed = 0;
    let throttled = 0;

    for (let i = 0; i < count; i++) {
      const ep = forced ?? pick(ENDPOINTS);
      let rem = remaining.current[ep.p];
      let status: number;
      if (rem > 0) {
        status = 200;
        rem -= 1;
        allowed++;
      } else {
        status = 429;
        throttled++;
      }
      remaining.current[ep.p] = rem;
      const lat = status === 200 ? 4 + Math.floor(Math.random() * 11) : 1 + Math.floor(Math.random() * 3);
      fresh.unshift({
        id: idRef.current++,
        t,
        m: ep.m,
        p: ep.p,
        s: status,
        lat: `${lat}ms`,
        rem: `${rem}/${ep.limit}`,
      });
    }

    setRows((prev) => [...fresh, ...prev].slice(0, 6));
    setStats((s) => ({
      requests: s.requests + count,
      allowed: s.allowed + allowed,
      throttled: s.throttled + throttled,
    }));
    if (Math.random() > 0.6) setP99(+(7 + Math.random() * 5).toFixed(1));
  }, []);

  // steady background traffic + slow quota refill
  useEffect(() => {
    const traffic = setInterval(() => fire(1 + Math.floor(Math.random() * 2)), 1100);
    const refill = setInterval(() => {
      for (const e of ENDPOINTS) {
        remaining.current[e.p] = Math.min(e.limit, remaining.current[e.p] + Math.ceil(e.limit * 0.04));
      }
    }, 1000);
    return () => {
      clearInterval(traffic);
      clearInterval(refill);
    };
  }, [fire]);

  const sendBurst = useCallback(() => {
    if (bursting) return;
    setBursting(true);
    setInteracted(true);
    // hammer the login endpoint until it rate-limits
    remaining.current[LOGIN.p] = Math.min(remaining.current[LOGIN.p], 4);
    let n = 0;
    const burst = setInterval(() => {
      fire(3, LOGIN);
      if (++n >= 4) {
        clearInterval(burst);
        setBursting(false);
      }
    }, 180);
  }, [bursting, fire]);

  const fmt = (n: number) => n.toLocaleString("en-US");
  const allowedPct = ((stats.allowed / stats.requests) * 100).toFixed(2);
  const throttledPct = ((stats.throttled / stats.requests) * 100).toFixed(2);

  const statCards = [
    { label: "requests", value: fmt(stats.requests), sub: "+4.2%", tone: "text-white" },
    { label: "allowed", value: fmt(stats.allowed), sub: `${allowedPct}%`, tone: "text-[#00E6A8]" },
    { label: "throttled (429)", value: fmt(stats.throttled), sub: `${throttledPct}%`, tone: "text-red-400" },
    { label: "p99", value: `${p99}ms`, sub: "live", tone: "text-white" },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#0d0d10] px-4 py-2.5">
        <span className="font-mono text-[11px] text-white/30">app.ratelock.dev — Console</span>
      </div>

      {/* app shell */}
      <div className="grid grid-cols-[150px_1fr] text-left">
        {/* sidebar */}
        <aside className="hidden flex-col border-r border-white/5 bg-[#0c0c0f] p-3 sm:flex">
          <div className="mb-4 flex items-center gap-2 px-1">
            <img src="/logo.png" alt="" className="h-5 w-5 rounded object-contain" />
            <span className="font-special text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Rate<span className="text-[#00E6A8]">Lock</span>
            </span>
          </div>
          <p className="px-2 pb-1.5 font-mono text-[9px] uppercase tracking-wider text-white/25">Project</p>
          <button className="mb-3 flex w-full items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[11px] text-white/70">
            acme-prod
            <span className="text-white/30">▾</span>
          </button>
          <nav className="flex flex-col gap-0.5 font-medium">
            {[
              ["Overview", true],
              ["Endpoints", false],
              ["Live logs", false],
              ["API keys", false],
              ["Settings", false],
            ].map(([label, active]) => (
              <span
                key={label as string}
                className={`rounded-md px-2 py-1.5 text-[11px] ${active ? "bg-[#00E6A8]/10 text-[#00E6A8]" : "text-white/45"
                  }`}
              >
                {label}
              </span>
            ))}
          </nav>
        </aside>

        {/* main */}
        <div className="p-4">
          {/* header row */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-white">Overview</h3>
              <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-white/40">
                production
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {/* hint — nudges the user to interact */}
              <AnimatePresence>
                {!interacted && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: [0, 4, 0] }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ x: { duration: 1.1, repeat: Infinity, ease: "easeInOut" } }}
                    className="hidden items-center gap-1 font-mono text-[10px] text-[#00E6A8]/80 sm:inline-flex"
                  >
                    hit me to trigger 429s
                    <span className="text-[#00E6A8]">→</span>
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                onClick={sendBurst}
                disabled={bursting}
                title="Floods POST /api/v2/login to trip the rate limiter"
                className="group cursor-pointer relative inline-flex items-center gap-1.5 rounded-md bg-[#00E6A8] px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-black transition-all   disabled:opacity-60"
              >

                {bursting ? "flooding…" : "Send burst"}
              </button>
            </div>
          </div>

          {/* stat row */}
          <div className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/5 bg-white/5 sm:grid-cols-4">
            {statCards.map((s) => (
              <div key={s.label} className="bg-[#0c0c0f] p-3">
                <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">{s.label}</p>
                <p className={`mt-1 font-mono text-base font-semibold tabular-nums ${s.tone}`}>{s.value}</p>
                <p className="font-mono text-[9px] text-white/30">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* live request log */}
          <div className="overflow-hidden rounded-lg border border-white/5">
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                Live request log
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white/25">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00E6A8]" />
                tail -f
              </span>
            </div>
            <div className="h-[250px] overflow-hidden font-mono text-[11px]">
              <AnimatePresence initial={false}>
                {rows.map((r) => {
                  const methodTone =
                    r.m === "GET" ? "text-sky-300 bg-sky-500/10" : "text-amber-300 bg-amber-500/10";
                  const blocked = r.s === 429;
                  return (
                    <motion.div
                      key={r.id}
                      layout
                      initial={{ opacity: 0, y: -8, backgroundColor: "rgba(0,230,168,0.10)" }}
                      animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0,0,0,0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`flex items-center gap-3 border-b border-white/[0.04] px-3 py-1.5 ${blocked ? "bg-red-500/[0.06]" : ""
                        }`}
                    >
                      <span className="text-white/30">{r.t}</span>
                      <span
                        className={`w-12 shrink-0 rounded px-1 py-0.5 text-center text-[10px] font-semibold ${methodTone}`}
                      >
                        {r.m}
                      </span>
                      <span className="flex-1 truncate text-white/70">{r.p}</span>
                      <span className="hidden text-white/30 sm:inline">{r.rem}</span>
                      <span className="w-10 text-right text-white/40">{r.lat}</span>
                      <span
                        className={`w-9 text-right font-semibold ${blocked ? "text-red-400" : "text-[#00E6A8]"}`}
                      >
                        {r.s}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
