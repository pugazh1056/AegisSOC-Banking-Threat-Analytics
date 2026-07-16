import React, { useState } from "react";
import { 
  Server, 
  Activity, 
  Cpu, 
  Database, 
  Wifi, 
  HardDrive, 
  ShieldCheck, 
  RefreshCw, 
  AlertOctagon, 
  Clock 
} from "lucide-react";

export default function SystemHealthView() {
  const [runningDiagnostics, setRunningDiagnostics] = useState(false);
  const [healthScore, setHealthScore] = useState(99.98);

  const [systems, setSystems] = useState([
    { name: "AegisSOC Deep AI Inference Engine", status: "Optimal", metric: "24ms response", load: "12% CPU" },
    { name: "Oracle Customer Vault Database Pool", status: "Optimal", metric: "1.2ms latency", load: "34% pool load" },
    { name: "Corporate SSO API Ingress Gateway", status: "Optimal", metric: "100% success rate", load: "2,490 req/sec" },
    { name: "Kyber Post-Quantum Sealed Backups", status: "Optimal", metric: "Verifying signature keys", load: "98% capacity available" }
  ]);

  const handleDiagnostics = () => {
    setRunningDiagnostics(true);
    setTimeout(() => {
      setRunningDiagnostics(false);
      setHealthScore(99.99);
      alert("System wide hardware diagnostics completed. All 4,591 cluster subnets responding inside &lt;15ms limits.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Server className="h-5 w-5 text-primary-container" />
            Infrastructure System Health &amp; Telemetry
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Real-time server clustering load, hardware execution benchmarks, and backup state
          </p>
        </div>

        <button 
          onClick={handleDiagnostics}
          disabled={runningDiagnostics}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${runningDiagnostics ? "animate-spin" : ""}`} />
          {runningDiagnostics ? "Polling clusters..." : "Run Global Diagnostics"}
        </button>
      </div>

      {/* Main metrics grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Overall Health Card */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Overall System Health</span>
          <div className="my-3 font-mono">
            <div className="text-3xl font-black text-emerald-400">{healthScore}%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Target SLA bound: 99.95%</p>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> High Performance
          </div>
        </div>

        {/* CPU Clustering load */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Global CPU Cluster Load</span>
          <div className="my-3">
            <div className="text-3xl font-black text-on-surface">18.4%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Cluster scaling parameters normal</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full w-[18%]"></div>
          </div>
        </div>

        {/* Memory Footprint */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Memory Capacity Usage</span>
          <div className="my-3 font-mono">
            <div className="text-3xl font-black text-on-surface">42.1 GB <span className="text-xs text-on-surface-variant">/ 128 GB</span></div>
            <p className="text-[10px] text-on-surface-variant mt-1">Elastic nodes pool rotating normal</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full w-[32%]"></div>
          </div>
        </div>

        {/* Local Network Latency */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Ingress Packet Latency</span>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400">12ms</div>
            <p className="text-[10px] text-on-surface-variant mt-1">CDN endpoints geo-optimized</p>
          </div>
          <div className="text-[10px] text-[#00E5FF] font-mono">
            BGP routing verified (100% active)
          </div>
        </div>

      </div>

      {/* Infrastructure System lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core sub-grids lists (2/3 size) */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Infrastructure Core Subsystems Matrix
          </h3>

          <div className="space-y-3.5">
            {systems.map((sys, idx) => (
              <div key={idx} className="p-3.5 bg-[#080f11]/50 border border-outline-variant/15 rounded-xl flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <h4 className="font-bold text-on-surface text-sm">{sys.name}</h4>
                  </div>
                  <p className="text-[10px] text-on-surface-variant">Capacity Load: {sys.load}</p>
                </div>

                <div className="text-right">
                  <div className="font-mono text-sm font-bold text-[#00E5FF]">{sys.metric}</div>
                  <span className="text-[9px] font-mono uppercase text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 mt-1 inline-block">
                    {sys.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HSM & Hardware details */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              HSM Hardware Trust Modules
            </h3>

            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Our core cluster operations are secured inside physically separated Hardware Security Modules (HSM) compliant with FIPS 140-2 Level 4 certification standards. Encryption keys, seed tokens, and active compliance reports are entirely protected from host-level privilege compromise.
            </p>

            <div className="bg-[#080f11] p-3 rounded-lg border border-outline-variant/20 font-mono text-[10px] space-y-1 text-on-surface-variant">
              <span className="text-primary-container font-bold uppercase block">Hardware Metrics:</span>
              <p>Cluster Hardware Version: v5.2.1-Prod</p>
              <p>Key Retention Keyrings: 14 Active</p>
              <p>Enclosure Temp: Optimal (21°C)</p>
            </div>
          </div>

          <div className="text-[9px] font-mono text-on-surface-variant text-center border-t border-outline-variant/10 pt-3">
            Hardware cluster status synchronized across 3 regions.
          </div>
        </div>

      </div>
    </div>
  );
}
