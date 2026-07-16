import React, { useState } from "react";
import { 
  FileSpreadsheet, 
  Search, 
  Download, 
  Terminal, 
  Sliders, 
  Database, 
  Lock, 
  FileText, 
  ShieldAlert, 
  Settings, 
  Check, 
  ExternalLink 
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  service: "Auth" | "DB" | "File" | "Admin" | "Policy" | "Risk";
  action: string;
  actor: string;
  endpoint: string;
  status: "Success" | "Flagged" | "Rejected" | "Terminated";
  rawPayload: string;
}

export default function SecurityAuditTrailView() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Auth" | "DB" | "File" | "Admin" | "Policy" | "Risk">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "LOG-39182",
      timestamp: "2026-07-15 23:14:12",
      service: "DB",
      action: "RECURSIVE_DUMP_EXPORT",
      actor: "Rahul S. (Senior DBA)",
      endpoint: "SQL-BACKUP-NODE-09",
      status: "Flagged",
      rawPayload: `{"transaction_id": "TXN_991829", "entropy_factor": 8.92, "sql_statement": "SELECT * FROM public.customer_portfolio_backup LIMIT 10000000;", "network_outbound_gb": 4.8, "compression": "gzip"}`
    },
    {
      id: "LOG-39180",
      timestamp: "2026-07-15 23:10:05",
      service: "Auth",
      action: "MFA_HARDWARE_STEP_UP",
      actor: "Meera K. (Wealth Manager)",
      endpoint: "CORP-GATEWAY-VPN",
      status: "Success",
      rawPayload: `{"session_id": "SESS_88290", "authentication_method": "FIDO2_WEBAUTHN", "device_id": "WIN-CORP-411", "ip_subnet": "74.120.9.11"}`
    },
    {
      id: "LOG-39178",
      timestamp: "2026-07-15 22:45:11",
      service: "File",
      action: "UNAUTHORIZED_BATCH_ZIP_DOWNLOAD",
      actor: "James L. (Swift Operator)",
      endpoint: "SHARED-DRIVE-FS-01",
      status: "Rejected",
      rawPayload: `{"file_path": "/financial_ledgers/Q2_consolidated_ledger.zip", "size_bytes": 12400000, "access_token_expired": false, "policy_block_triggered": "POL-03"}`
    },
    {
      id: "LOG-39170",
      timestamp: "2026-07-15 22:05:00",
      service: "Admin",
      action: "CONTAINER_ROLE_ROTATION",
      actor: "Sarah O. (Lead Cloud Eng)",
      endpoint: "ECS-CLUST-ORBIT-02",
      status: "Success",
      rawPayload: `{"deployment_hash": "aef0821c9", "task_definition": "aegis-soc-engine:v5.2.1", "regions": ["us-east-1", "ap-southeast-1"]}`
    },
    {
      id: "LOG-39164",
      timestamp: "2026-07-15 21:50:45",
      service: "Policy",
      action: "ADAPTIVE_THRESHOLD_MODIFICATION",
      actor: "Security Team (Admin console)",
      endpoint: "SOAR-COGNITIVE-CONFIG",
      status: "Success",
      rawPayload: `{"altered_parameter": "block_session_threshold", "old_value": 80, "new_value": 75, "compliance_audit": "FED-RES-COMPLIANCE"}`
    },
    {
      id: "LOG-39150",
      timestamp: "2026-07-15 21:30:12",
      service: "Risk",
      action: "IMPOSSIBLE_TRAVEL_ALARM",
      actor: "Rahul S. (Senior DBA)",
      endpoint: "VPN-SSO-INGRESS-04",
      status: "Terminated",
      rawPayload: `{"origin_subnet": "Moscow Subnet (VPN)", "previous_location": "New York HQ", "timediff_minutes": 15, "distance_miles": 4600, "action": "BLOCK_SESSION"}`
    }
  ]);

  const filteredLogs = logs.filter(l => {
    const matchesCategory = activeCategory === "All" || l.service === activeCategory;
    const matchesSearch = l.actor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleExport = () => {
    alert("Exporting active Audit Log filter set in CSV format (Fed-Compliance Standard).");
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary-container" />
            Security Audit Trail &amp; Ledger Logs
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Immutable log journal compliant with continuous financial auditing requirements
          </p>
        </div>

        <button 
          onClick={handleExport}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <Download className="h-3.5 w-3.5" />
          Export Log Ledger
        </button>
      </div>

      {/* Navigation tabs for audit categories */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/15 pb-2">
        {(["All", "Auth", "DB", "File", "Admin", "Policy", "Risk"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeCategory === cat 
                ? "bg-primary-container/15 border-b-2 border-primary-container text-primary-container" 
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.01]"
            }`}
          >
            {cat === "All" ? "All Audit Fields" : `${cat} Logs`}
          </button>
        ))}
      </div>

      {/* Primary Logs View & Evidence viewer split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Logs Table (Left 2/3) */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/40" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Query actor, ID, execution string..."
                className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-3 text-[11px] outline-none text-on-surface focus:border-primary-container"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20 font-semibold">
                  <th className="p-3">Audit ID</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Instruction</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3 text-right">Inference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {filteredLogs.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => setSelectedLog(log)}
                    className={`hover:bg-white/[0.01] transition-colors cursor-pointer ${selectedLog?.id === log.id ? "bg-[#111827]/60 border-l-2 border-primary-container" : ""}`}
                  >
                    <td className="p-3 font-mono text-[10px] text-primary-container font-bold">{log.id}</td>
                    <td className="p-3 font-mono text-[10px] text-on-surface-variant whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3 font-mono text-[10px] text-on-surface-variant">
                      <span className="px-1.5 py-0.5 rounded bg-outline-variant/15 text-on-surface">
                        {log.service}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-on-surface truncate max-w-[140px]">{log.action}</td>
                    <td className="p-3 text-on-surface-variant whitespace-nowrap">{log.actor}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        log.status === "Success" ? "bg-emerald-500/15 text-emerald-400" :
                        log.status === "Flagged" ? "bg-tertiary-container/15 text-tertiary-container" :
                        log.status === "Rejected" ? "bg-yellow-500/15 text-yellow-400" :
                        "bg-error/15 text-error animate-pulse"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Evidence Inspector (Right 1/3) */}
        <div className="soc-card p-5 flex flex-col justify-between">
          {selectedLog ? (
            <div className="space-y-4">
              <div className="border-b border-outline-variant/20 pb-3">
                <span className="text-[9px] font-mono text-primary-container uppercase tracking-wider">SOAR Evidence Inspector</span>
                <h4 className="text-sm font-black text-on-surface mt-0.5">{selectedLog.action}</h4>
                <p className="text-[10px] text-on-surface-variant font-mono">{selectedLog.id} • Verified cryptographic ledger</p>
              </div>

              {/* Detail list */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Execution:</span>
                  <span className="text-on-surface">{selectedLog.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Subsystem:</span>
                  <span className="text-on-surface font-semibold">{selectedLog.service} Broker</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Operator Node:</span>
                  <span className="text-on-surface">{selectedLog.actor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Access Endpoint:</span>
                  <span className="text-on-surface">{selectedLog.endpoint}</span>
                </div>
              </div>

              {/* Raw JSON block */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-primary-container" />
                  Structured Metadata Payload
                </span>
                <pre className="bg-[#080f11] p-3 rounded-lg border border-outline-variant/25 font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-[180px] leading-relaxed select-all">
                  {selectedLog.rawPayload}
                </pre>
              </div>

              {/* Status message */}
              <div className="bg-[#0d1516]/30 p-2.5 rounded-lg text-[10px] font-mono text-on-surface-variant leading-relaxed border border-outline-variant/15 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Evidence logged to cryptographically sealed vault.
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-on-surface-variant font-mono">
              <Terminal className="h-10 w-10 text-primary-container/40 mb-2" />
              <p className="text-[11px]">Select any transaction log line to decode raw API parameters, JSON structures, and telemetry evidence envelopes.</p>
            </div>
          )}

          <div className="text-[9px] font-mono text-on-surface-variant text-center border-t border-outline-variant/10 pt-3">
            HMAC SHA-256 Ledger signature key verified by hardware security module.
          </div>
        </div>

      </div>
    </div>
  );
}
