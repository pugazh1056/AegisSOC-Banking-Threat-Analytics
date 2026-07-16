import React, { useState } from "react";
import { 
  Zap, 
  ShieldAlert, 
  Search, 
  Download, 
  Globe, 
  TrendingUp, 
  CheckCircle, 
  Sliders, 
  AlertTriangle, 
  Grid, 
  BookOpen, 
  Activity 
} from "lucide-react";

interface ThreatSource {
  ip: string;
  country: string;
  category: string;
  severity: "critical" | "warning" | "low";
  timestamp: string;
}

export default function ThreatIntelligenceView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("All");

  const [threats, setThreats] = useState<ThreatSource[]>([
    { ip: "185.220.101.4", country: "Russian Federation (VPN)", category: "Brute-force SSO login", severity: "critical", timestamp: "Just now" },
    { ip: "82.102.23.11", country: "Sweden Proxy Node", category: "High Velocity PII Export", severity: "critical", timestamp: "3m ago" },
    { ip: "103.22.45.1", country: "Japan Subnet", category: "Impossible Travel Geographic Shift", severity: "warning", timestamp: "12m ago" },
    { ip: "194.50.16.88", country: "Netherlands Tor Exit", category: "Active directory query spike", severity: "warning", timestamp: "25m ago" },
    { ip: "45.12.93.102", country: "United States Cloud Provider", category: "Standard automated API scan", severity: "low", timestamp: "1h ago" }
  ]);

  const departmentRisks = [
    { name: "Database Administration", score: 92, status: "critical" },
    { name: "Private Banking & Wealth", score: 76, status: "warning" },
    { name: "Treasury Operational Flow", score: 64, status: "warning" },
    { name: "Cloud Infrastructure (IT)", score: 32, status: "success" }
  ];

  const handleApplyPlaybook = (actionName: string) => {
    alert(`Playbook automated instruction deployed: "${actionName}". Threat mitigation active.`);
  };

  const handleExport = () => {
    alert("Exporting STIX/TAXII Threat Intelligence Feed JSON package.");
  };

  return (
    <div className="space-y-6">
      {/* Threat Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Global Threat Intelligence Center (CTI)
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Synchronized threat feeds &amp; active MITRE ATT&amp;CK mappings
          </p>
        </div>

        <button 
          onClick={handleExport}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <Download className="h-3.5 w-3.5" />
          Export STIX Feed
        </button>
      </div>

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column (2/3 size) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Live Threat Stream & Feed */}
          <div className="soc-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-error animate-pulse" />
                  Live Ingress cyber-probe feed
                </h3>
                <p className="text-[10px] text-on-surface-variant mt-0.5">Real-time indicators of compromise matching signatures</p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto text-xs">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter country or IP..."
                  className="bg-[#080f11] border border-outline-variant/30 rounded px-2.5 py-1 text-[11px] outline-none text-on-surface focus:border-primary"
                />
                <select 
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="bg-[#080f11] border border-outline-variant/30 rounded px-2 py-1 text-[11px] font-mono text-on-surface"
                >
                  <option value="All">All Severity</option>
                  <option value="critical">Critical Only</option>
                  <option value="warning">Warning Only</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20">
                    <th className="p-3">Source Vector IP</th>
                    <th className="p-3">Geographic Subnet</th>
                    <th className="p-3">Behavior Taxonomy</th>
                    <th className="p-3 text-right">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-xs">
                  {threats
                    .filter(t => filterSeverity === "All" || t.severity === filterSeverity)
                    .filter(t => t.ip.includes(searchTerm) || t.country.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((t, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.01]">
                        <td className="p-3 font-mono text-on-surface flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${t.severity === "critical" ? "bg-error animate-ping" : t.severity === "warning" ? "bg-tertiary-container" : "bg-emerald-400"}`}></span>
                          {t.ip}
                        </td>
                        <td className="p-3 text-on-surface-variant">{t.country}</td>
                        <td className="p-3 text-on-surface font-semibold">{t.category}</td>
                        <td className="p-3 text-right font-mono text-on-surface-variant text-[10px]">{t.timestamp}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: MITRE ATT&CK Taxonomy Map */}
          <div className="soc-card p-5 space-y-4">
            <div>
              <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
                <Grid className="h-4 w-4 text-primary" />
                MITRE ATT&amp;CK matrix mapping
              </h3>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Incident correlation against standardized threat playbooks</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-[#080f11] p-3 rounded-xl border border-error/30">
                <span className="text-[9px] font-mono text-error font-bold block uppercase">T1078.002</span>
                <span className="text-xs font-bold text-on-surface mt-1 block">Valid Accounts</span>
                <p className="text-[10px] text-on-surface-variant mt-1">SSO Session abuse via unvetted proxy tunnels</p>
              </div>

              <div className="bg-[#080f11] p-3 rounded-xl border border-error/30">
                <span className="text-[9px] font-mono text-error font-bold block uppercase">T1114.002</span>
                <span className="text-xs font-bold text-on-surface mt-1 block">Data Harvesting</span>
                <p className="text-[10px] text-on-surface-variant mt-1">Anomalous queries outside standard schedule</p>
              </div>

              <div className="bg-[#080f11] p-3 rounded-xl border border-outline-variant/10">
                <span className="text-[9px] font-mono text-primary-container block uppercase">T1041</span>
                <span className="text-xs font-bold text-on-surface mt-1 block">Exfiltration over C2</span>
                <p className="text-[10px] text-on-surface-variant mt-1">Encrypted database compressed backup uploads</p>
              </div>

              <div className="bg-[#080f11] p-3 rounded-xl border border-outline-variant/10">
                <span className="text-[9px] font-mono text-primary-container block uppercase">T1091</span>
                <span className="text-xs font-bold text-on-surface mt-1 block">Physical Media</span>
                <p className="text-[10px] text-on-surface-variant mt-1">Workstation USB driver registration alert</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right column: Risk, metrics and recommended playbooks */}
        <div className="space-y-6">
          
          {/* Department Risk Indicators */}
          <div className="soc-card p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-tertiary-fixed-dim" />
              Sector Threat Distributions
            </h3>
            
            <div className="space-y-3">
              {departmentRisks.map((dept, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>{dept.name}</span>
                    <span className={`font-mono font-bold ${dept.score > 70 ? "text-error" : "text-emerald-400"}`}>{dept.score}% Risk</span>
                  </div>
                  <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${dept.score > 70 ? "bg-error" : "bg-emerald-400"}`} style={{ width: `${dept.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Playbook Actions */}
          <div className="soc-card p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              CTI Advisory Recommended Playbooks
            </h3>

            <div className="space-y-2">
              <div 
                onClick={() => handleApplyPlaybook("Enforce Kyber quantum-safe SSH seed rotation")}
                className="bg-[#0d1516]/40 p-3 rounded-xl border border-outline-variant/15 hover:border-primary-container cursor-pointer transition-colors text-xs"
              >
                <div className="font-bold text-on-surface flex justify-between">
                  <span>Kyber-1024 Seed Rotate</span>
                  <span className="text-primary-container font-mono text-[9px] uppercase">Quantum</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                  Rotate quantum-safe cryptographic envelopes for corporate directory backups.
                </p>
              </div>

              <div 
                onClick={() => handleApplyPlaybook("Isolate workstation VPN hardware tokens")}
                className="bg-[#0d1516]/40 p-3 rounded-xl border border-outline-variant/15 hover:border-primary-container cursor-pointer transition-colors text-xs"
              >
                <div className="font-bold text-on-surface flex justify-between">
                  <span>Isolate VPN Token</span>
                  <span className="text-error font-mono text-[9px] uppercase">Active SOAR</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                  Quarantine active hardware profiles with anomalous impossible travel geographical shift.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
