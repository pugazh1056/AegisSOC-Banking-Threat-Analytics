import React, { useState } from "react";
import { 
  Building2, 
  Search, 
  Download, 
  Plus, 
  ShieldAlert, 
  UserCheck, 
  Grid, 
  Briefcase, 
  Key, 
  Activity 
} from "lucide-react";

interface OrgEmployee {
  id: string;
  name: string;
  role: string;
  dept: string;
  branch: string;
  clearance: "Secret" | "Top-Secret" | "Executive-Admin";
  deviceCount: number;
}

export default function OrgManagementView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  const [employees, setEmployees] = useState<OrgEmployee[]>([
    { id: "EMP-092", name: "Rahul S.", role: "Senior Database Administrator", dept: "Database Admin", branch: "Moscow Regional Hub", clearance: "Top-Secret", deviceCount: 2 },
    { id: "EMP-104", name: "Meera K.", role: "Senior Wealth Manager", dept: "Private Banking", branch: "New York Corporate HQ", clearance: "Secret", deviceCount: 3 },
    { id: "EMP-238", name: "James L.", role: "Swift Terminal Operator", dept: "Treasury Operations", branch: "London Investment Desk", clearance: "Top-Secret", deviceCount: 1 },
    { id: "EMP-411", name: "Sarah O.", role: "Lead Cloud Infrastructure Engineer", dept: "IT Infrastructure", branch: "New York Corporate HQ", clearance: "Executive-Admin", deviceCount: 2 },
    { id: "EMP-802", name: "Anand G.", role: "Treasury Audit Coordinator", dept: "Risk & Audit", branch: "Mumbai Operational Site", clearance: "Secret", deviceCount: 2 }
  ]);

  const branchesSummary = [
    { name: "Moscow Regional Hub", staff: 14, score: 88, status: "Critical" },
    { name: "London Investment Desk", staff: 28, score: 64, status: "Warning" },
    { name: "New York Corporate HQ", staff: 140, score: 32, status: "Optimal" },
    { name: "Mumbai Operational Site", staff: 92, score: 18, status: "Optimal" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary-container" />
            Corporate Directory &amp; Access Hierarchy
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Audit staff allocations, regional security footprints, and high-clearance assets
          </p>
        </div>

        <button 
          onClick={() => alert("Downloading entire encrypted corporate directory metadata.")}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <Download className="h-3.5 w-3.5" />
          Export Org Directory
        </button>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Branches & Staff Strength */}
        <div className="soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Regional Hub Allocations
          </h3>

          <div className="space-y-3">
            {branchesSummary.map((b, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedBranch(b.name)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                  selectedBranch === b.name ? "bg-primary-container/10 border-primary-container text-primary-container" : "bg-[#080f11] border-outline-variant/15 text-on-surface hover:border-primary-container"
                }`}
              >
                <div>
                  <h4 className="font-bold text-on-surface">{b.name}</h4>
                  <p className="text-[10px] text-on-surface-variant font-mono">{b.staff} High-Clearance staff</p>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    b.status === "Critical" ? "bg-error/15 text-error" : b.status === "Warning" ? "bg-tertiary-container/15 text-tertiary-container" : "bg-emerald-500/15 text-emerald-400"
                  }`}>
                    {b.score} Risk
                  </span>
                </div>
              </div>
            ))}
            {selectedBranch !== "All" && (
              <button 
                onClick={() => setSelectedBranch("All")}
                className="w-full text-center text-[10px] font-mono text-primary-container hover:underline py-1"
              >
                Clear Branch Filter
              </button>
            )}
          </div>
        </div>

        {/* Right column: Employee List & Clearance matrix (2/3 size) */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
              High-Clearance Staff Registry
            </h3>

            <div className="relative w-full sm:w-48">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/40" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search staff, ID, department..."
                className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-3 text-[11px] outline-none text-on-surface focus:border-primary-container"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20 font-semibold">
                  <th className="p-3">Staff ID</th>
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">Operational Scope</th>
                  <th className="p-3">Compliance Clearance</th>
                  <th className="p-3">Physical Devices</th>
                  <th className="p-3 text-right">Location Hub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {employees
                  .filter(e => selectedBranch === "All" || e.branch === selectedBranch)
                  .filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.dept.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((e) => (
                    <tr key={e.id} className="hover:bg-white/[0.01]">
                      <td className="p-3 font-mono text-[10px] text-primary-container font-bold">{e.id}</td>
                      <td className="p-3">
                        <div className="font-bold text-on-surface">{e.name}</div>
                        <div className="text-[10px] text-on-surface-variant">{e.role}</div>
                      </td>
                      <td className="p-3 text-on-surface font-semibold">{e.dept}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-outline-variant/15 text-[10px] font-mono text-on-surface">
                          {e.clearance}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-on-surface-variant">{e.deviceCount} MAC keys</td>
                      <td className="p-3 text-right font-mono text-xs text-on-surface-variant">{e.branch}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
