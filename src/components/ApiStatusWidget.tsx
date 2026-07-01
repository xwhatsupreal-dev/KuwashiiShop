import React, { useState, useEffect } from "react";
import { Activity, Server, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface ApiEndpointStatus {
  online: boolean;
  latency: number;
  name: string;
}

interface WonddStatus {
  online: boolean;
  latency: number;
  endpoints: Record<string, ApiEndpointStatus>;
}

export const ApiStatusWidget: React.FC = () => {
  const [status, setStatus] = useState<WonddStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/wondd-status");
      if (!res.ok) {
        throw new Error("Failed to fetch API status");
      }
      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none -z-10" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              API Status
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              WONDD Game Topup API Health
            </p>
          </div>
        </div>
        <button
          onClick={fetchStatus}
          disabled={loading}
          className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors disabled:opacity-50"
          title="Refresh Status"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {error ? (
        <div className="text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          {error}
        </div>
      ) : (
        <div className="space-y-3">
          {status ? (
            Object.entries(status.endpoints).map(([key, ep]) => (
              <div key={key} className="flex items-center justify-between bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  {ep.online ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-zinc-300">{ep.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono px-2 py-1 rounded-md ${ep.online ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {ep.online ? 'ONLINE' : 'OFFLINE'}
                  </span>
                  {ep.online && (
                    <span className="text-xs text-zinc-500 font-mono w-12 text-right">
                      {ep.latency}ms
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/50 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-zinc-800 rounded-full" />
                    <div className="h-4 bg-zinc-800 rounded w-32" />
                  </div>
                  <div className="h-6 bg-zinc-800 rounded w-16" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
