import React, { useState } from "react";
import { 
  BellRing, 
  Search, 
  Download, 
  ShieldAlert, 
  UserPlus, 
  CheckCircle2, 
  TrendingUp, 
  Sliders, 
  Play, 
  Clock, 
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

interface AlertItem {
  id: string;
  employee: string;
  riskScore: number;
  timestamp: string;
  affectedSystem: string;
  reason: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Unassigned" | "Assigned" | "Investigating" | "Resolved";
  analyst?: string;
}

export default function AlertsCenterView() {
  const [activeTab, setActiveTab] = useState<"Critical" | "High" | "Medium" | "Low" | "Resolved">("Critical");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "ALRT-0091",
      employee: "Rahul S. (Senior DBA)",
      riskScore: 96,
      timestamp: "2026-07-15 23:14",
      affectedSystem: "Oracle-Customer-Vault-Primary",
      reason: "Recursive schema backup export from unvetted IP",
      severity: "Critical",
      status: "Unassigned"
    },
    {
      id: "ALRT-0092",
      employee: "Meera K. (Wealth Manager)",
      riskScore: 78,
      timestamp: "2026-07-15 23:10",
      affectedSystem: "Private Portfolio Shares Egress",
      reason: "Bulk download of premium customer record sheets",
      severity: "High",
      status: "Assigned",
      analyst: "Sanjay P."
    },
    {
      id: "ALRT-0093",
      employee: "James L. (Swift Operator)",
      riskScore: 62,
      timestamp: "2026-07-15 22:45",
      affectedSystem: "Swift Terminal Wire Router",
      reason: "Out-of-hours session initiation attempt",
      severity: "Medium",
      status: "Investigating",
      analyst: "Elena R."
    },
    {
      id: "ALRT-0094",
      employee: "Sarah O. (Lead Cloud Eng)",
      riskScore: 24,
      timestamp: "2026-07-15 21:50",
      affectedSystem: "AWS Gateway Rotator",
      reason: "Standard token update drift checked",
      severity: "Low",
      status: "Resolved",
      analyst: "System Automated Trigger"
    },
    {
      id: "ALRT-0095",
      employee: "Anand G. (Audit Team)",
      riskScore: 18,
      timestamp: "2026-07-15 21:30",
      affectedSystem: "Risk Audit Compliance Portal",
      reason: "Successful regulatory report compilation log",
      severity: "Resolved",
      status: "Resolved",
      analyst: "System Automated Trigger"
    }
  ]);

  const handleAssign = (id: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === id) return { ...a, status: "Assigned", analyst: "Self (Active Analyst)" };
      return a;
    }));
    setToast({
      message: `Alert ${id} assigned to your profile successfully. Timeline logs synced.`,
      type: "success"
    });
  };

  const handleClose = (id: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === id) return { ...a, status: "Resolved", severity: "Resolved" };
      return a;
    }));
    setToast({
      message: `Alert ${id} resolved, marked as secure, and filed under active ISO audit trails.`,
      type: "success"
    });
  };

  const handleExportAlerts = () => {
    try {
      exportToPdf({
        title: `Certified Alerts Ledger Export - Category [${activeTab}]`,
        metadata: {
          "Source Registry": "AegisSOC Primary SIEM Alarms Database",
          "Target Severity Queue": activeTab,
          "Total Items Logged": String(filteredAlerts.length),
          "Export Classification": "Audited Standard Restricted",
          "Generated At": new Date().toUTCString(),
          "Operator": "spugazhenthi1005@gmail.com"
        },
        sections: [
          {
            title: `Active Registered Alarms List (${activeTab})`,
            content: filteredAlerts.map(a => (
              `ID: ${a.id} | Employee: ${a.employee} | System: ${a.affectedSystem} | Risk: ${a.riskScore}/100 | Trigger: ${a.reason} | Status: ${a.status} (Assigned: ${a.analyst || "None"})`
            ))
          },
          {
            title: "Threat Action & Investigation Guidelines",
            content: "Each alert logged requires dynamic playbook execution. Critical or high severity items require immediate board escalation and user session suspension procedures."
          }
        ]
      }, `Alerts_Ledger_${activeTab.toUpperCase()}_Export.pdf`);

      setToast({
        message: `Alerts ledger for ${activeTab} queue generated and downloaded successfully!`,
        type: "success"
      });
    } catch (e: any) {
      setToast({
        message: `Failed to compile alerts list: ${e?.message || e}`,
        type: "error"
      });
    }
  };

  const filteredAlerts = alerts.filter(a => {
    const matchesTab = activeTab === "Resolved" ? a.severity === "Resolved" : a.severity === activeTab;
    const matchesSearch = a.employee.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.affectedSystem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <div className="space-y-6">
        {/* Upper header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
          <div>
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <BellRing className="h-5 w-5 text-primary-container" />
              Security Alerts Center
            </h2>
            <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
              Active SOC alarms filtered by hazard score, asset class, and threat classification
            </p>
          </div>

          <button 
            onClick={handleExportAlerts}
            className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
          >
            <Download className="h-3.5 w-3.5" />
            Export Alerts
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-outline-variant/15 pb-2">
          {(["Critical", "High", "Medium", "Low", "Resolved"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab 
                  ? "bg-primary-container/15 border-b-2 border-primary-container text-primary-container" 
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.01]"
              }`}
            >
              {tab === "Critical" && <span className="w-2 h-2 rounded-full bg-error animate-ping shrink-0" />}
              {tab === "High" && <span className="w-2 h-2 rounded-full bg-tertiary-container shrink-0" />}
              {tab === "Medium" && <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />}
              {tab === "Low" && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />}
              {tab}
              <span className="bg-outline-variant/15 text-[10px] px-1.5 py-0.5 rounded-full text-on-surface-variant">
                {alerts.filter(a => tab === "Resolved" ? a.severity === "Resolved" : a.severity === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search and interactive list */}
        <div className="soc-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/40" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by employee, affected node, or alert triggers..."
                className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-3 text-[11px] outline-none text-on-surface focus:border-primary-container"
              />
            </div>
          </div>

          {filteredAlerts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20 font-semibold">
                    <th className="p-3">Alert ID</th>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Risk Factor</th>
                    <th className="p-3">Affected Node/Subsystem</th>
                    <th className="p-3">Classification Reason</th>
                    <th className="p-3">Analyst Assignment</th>
                    <th className="p-3 text-right">Operational Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-xs">
                  {filteredAlerts.map((a) => (
                    <tr key={a.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-3 font-mono text-primary-container font-bold">{a.id}</td>
                      <td className="p-3">
                        <div className="font-semibold text-on-surface">{a.employee}</div>
                        <div className="text-[10px] text-on-surface-variant font-mono">{a.timestamp}</div>
                      </td>
                      <td className="p-3 font-mono">
                        <span className={`font-black ${a.riskScore >= 80 ? "text-error" : a.riskScore >= 60 ? "text-tertiary-container" : "text-emerald-400"}`}>
                          {a.riskScore} / 100
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-on-surface">{a.affectedSystem}</td>
                      <td className="p-3 text-on-surface-variant max-w-xs truncate" title={a.reason}>{a.reason}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-outline-variant/15 text-[10px] font-mono text-on-surface-variant">
                          {a.analyst || "Unassigned"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          {a.status === "Unassigned" && (
                            <button 
                              onClick={() => handleAssign(a.id)}
                              className="bg-[#0d1516] border border-outline-variant text-[10px] font-mono px-2 py-1 rounded hover:bg-primary-container/10 hover:text-primary-container transition-colors"
                            >
                              Assign Self
                            </button>
                          )}
                          
                          <button 
                            onClick={() => {
                              setToast({
                                message: `Opening investigation console for ${a.id}...`,
                                type: "info"
                              });
                            }}
                            className="bg-[#0d1516] border border-outline-variant text-[10px] font-mono px-2 py-1 rounded hover:bg-primary-container/10 hover:text-primary-container transition-colors"
                          >
                            Investigate
                          </button>

                          {a.severity !== "Resolved" && (
                            <button 
                              onClick={() => handleClose(a.id)}
                              className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono px-2 py-1 rounded hover:bg-emerald-500/25 transition-colors"
                            >
                              Close Alert
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-44 flex flex-col items-center justify-center text-center p-6 text-on-surface-variant font-mono">
              <CheckCircle2 className="h-10 w-10 text-emerald-400/40 mb-2" />
              <p className="text-[11px]">All clear! No active alarms currently triggered in the {activeTab} hazard queue.</p>
            </div>
          )}
        </div>
      </div>

      {/* Unified Toast Alerts */}
      {toast && (
        <NotificationToast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
