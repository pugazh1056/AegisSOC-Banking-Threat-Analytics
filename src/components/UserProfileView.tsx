import React, { useState } from "react";
import { 
  User, 
  Search, 
  Download, 
  ShieldAlert, 
  Clock, 
  Monitor, 
  MapPin, 
  Activity, 
  ShieldCheck, 
  Key,
  Globe 
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  dept: string;
  behaviourScore: number;
  securityRating: number;
  assignedDevices: string[];
  loginHistory: { time: string; location: string; status: string }[];
  accessHistory: string[];
}

export default function UserProfileView() {
  const [searchTerm, setSearchTerm] = useState("Rahul S.");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const handleExportProfile = () => {
    try {
      exportToPdf({
        title: `Employee Compliance Profile: ${activeProfile.name}`,
        metadata: {
          "Employee Name": activeProfile.name,
          "Employee ID": activeProfile.id,
          "Corporate Role": activeProfile.role,
          "Department Node": activeProfile.dept,
          "Security Rating Score": `${activeProfile.securityRating}/100`,
          "Drift Risk Score": `${activeProfile.behaviourScore}/100`,
          "Generated At": new Date().toUTCString()
        },
        sections: [
          {
            title: "Assigned Workstation Devices",
            content: activeProfile.assignedDevices
          },
          {
            title: "Recently Mapped SSO Logins",
            content: activeProfile.loginHistory.map((l) => (
              `Time: ${l.time} | Location/IP: ${l.location} | Gateway Status: ${l.status}`
            ))
          },
          {
            title: "Authorized System Access Privileges",
            content: activeProfile.accessHistory
          }
        ]
      }, `Profile_Compliance_${activeProfile.id}.pdf`);

      setToast({
        message: `Employee compliance dossier for ${activeProfile.name} exported successfully!`,
        type: "success"
      });
    } catch (e: any) {
      setToast({
        message: `Failed to compile dossier: ${e?.message || e}`,
        type: "error"
      });
    }
  };

  const profiles: Record<string, EmployeeProfile> = {
    "Rahul S.": {
      id: "EMP-092",
      name: "Rahul S.",
      role: "Senior Database Administrator",
      dept: "Database Admin Division",
      behaviourScore: 96,
      securityRating: 34,
      assignedDevices: ["MAC-ENG-892 (Secure Key Enrolled)", "WIN-DB-MGR-01 (Office Hardware)"],
      loginHistory: [
        { time: "23:14 PM", location: "Moscow Subnet (VPN Ingress)", status: "Flagged" },
        { time: "22:10 PM", location: "New York Corporate HQ subnet", status: "Success" }
      ],
      accessHistory: [
        "DB_SCHEMA_BACKUP_DUMP_EXPORT on Oracle-Customer-Vault-Primary",
        "RECURSIVE_SQL_STATEMENT_EXECUTION on Oracle-Customer-Vault-Backup",
        "Active Directory role mapping refresh request"
      ]
    },
    "Meera K.": {
      id: "EMP-104",
      name: "Meera K.",
      role: "Senior Wealth Manager",
      dept: "Private Banking & Wealth",
      behaviourScore: 78,
      securityRating: 62,
      assignedDevices: ["WIN-CORP-411 (FIDO2 Key Enrolled)"],
      loginHistory: [
        { time: "23:10 PM", location: "New York Corporate HQ subnet", status: "Success" },
        { time: "18:45 PM", location: "London Branch Gateway Proxy", status: "Success" }
      ],
      accessHistory: [
        "BATCH_DOWNLOAD of premium wealth client sheets",
        "Wealth portfolio manager session validation"
      ]
    }
  };

  const activeProfile = profiles[searchTerm] || profiles["Rahul S."];

  return (
    <>
      <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <User className="h-5 w-5 text-primary-container" />
            Privileged Employee Profile Dossier
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Operational baselines, login footprints, and assigned hardware security parameters
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative w-48">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/40" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search e.g. Rahul S., Meera K...."
              className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-3 text-[11px] outline-none text-on-surface focus:border-primary-container"
            />
          </div>

          <button 
            onClick={handleExportProfile}
            className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
          >
            <Download className="h-3.5 w-3.5" />
            Export Profile PDF
          </button>
        </div>
      </div>

      {/* Main split dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Profile overview & Scores (1/3 size) */}
        <div className="soc-card p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center font-black text-lg text-primary-container">
                {activeProfile.name.substring(0, 2)}
              </div>
              <div>
                <h3 className="text-base font-black text-on-surface">{activeProfile.name}</h3>
                <span className="text-[10px] font-mono text-primary-container block">{activeProfile.id} • {activeProfile.role}</span>
                <p className="text-[11px] text-on-surface-variant">{activeProfile.dept}</p>
              </div>
            </div>

            {/* Scores dials */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Cognitive Risk Score:</span>
                <span className={`font-black text-base ${activeProfile.behaviourScore >= 80 ? "text-error animate-pulse" : "text-emerald-400"}`}>
                  {activeProfile.behaviourScore} / 100
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">General Security Rating:</span>
                <span className="text-on-surface font-bold text-base">
                  {activeProfile.securityRating} / 100
                </span>
              </div>
            </div>

            {/* Enrolled secure devices */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/10">
              <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1.5">
                <Monitor className="h-4 w-4 text-primary" />
                Authorized Hardware Enclosures
              </span>
              <div className="space-y-1.5">
                {activeProfile.assignedDevices.map((dev, idx) => (
                  <div key={idx} className="p-2.5 bg-[#080f11] rounded border border-outline-variant/15 text-[10px] font-mono text-on-surface flex items-center gap-1.5">
                    <Key className="h-3.5 w-3.5 text-[#00E5FF]" />
                    {dev}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-4">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Hardware security signatures match active registry.
          </div>
        </div>

        {/* Right columns: Login History and Access Logs (2/3 size) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Interactive Access logs table */}
          <div className="soc-card p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
              Recent Action &amp; Access Log History
            </h3>

            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
              {activeProfile.accessHistory.map((log, idx) => (
                <div key={idx} className="p-3 bg-[#080f11] rounded-xl border border-outline-variant/15 text-xs font-mono text-on-surface flex justify-between items-center">
                  <span className="truncate max-w-[400px]">{log}</span>
                  <span className="text-[10px] text-primary-container font-bold uppercase shrink-0">Executed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Login footprints */}
          <div className="soc-card p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
              Login Ingress Footprints
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20 font-semibold">
                    <th className="p-3">Login Date Time</th>
                    <th className="p-3">Location IP Vector</th>
                    <th className="p-3 text-right">Inference Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-xs">
                  {activeProfile.loginHistory.map((history, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01]">
                      <td className="p-3 font-mono text-[11px]">{history.time}</td>
                      <td className="p-3 flex items-center gap-1.5 font-mono">
                        <Globe className="h-3.5 w-3.5 text-primary" />
                        {history.location}
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                          history.status === "Success" ? "bg-emerald-500/15 text-emerald-400" : "bg-error/15 text-error animate-pulse"
                        }`}>
                          {history.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

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
