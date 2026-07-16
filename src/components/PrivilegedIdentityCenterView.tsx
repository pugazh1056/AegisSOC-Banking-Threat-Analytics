import React, { useState } from "react";
import { 
  Users, 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  UserMinus, 
  ShieldAlert, 
  Activity, 
  AlertTriangle,
  ExternalLink,
  Lock,
  Globe,
  Monitor
} from "lucide-react";

interface PrivilegedUser {
  id: string;
  name: string;
  role: string;
  dept: string;
  privilegeLevel: "Level-3 (Admin)" | "Level-2 (Operator)" | "Level-1 (Analyst)";
  behaviourScore: number;
  currentRisk: "Critical" | "High" | "Medium" | "Low";
  sessionActive: boolean;
  location: string;
  device: string;
  activity: string;
  status: "Active" | "Restricted" | "Suspended" | "Flagged";
}

export default function PrivilegedIdentityCenterView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedUser, setSelectedUser] = useState<PrivilegedUser | null>(null);

  const [users, setUsers] = useState<PrivilegedUser[]>([
    {
      id: "EMP-092",
      name: "Rahul S.",
      role: "Senior Database Administrator",
      dept: "Database Admin",
      privilegeLevel: "Level-3 (Admin)",
      behaviourScore: 96,
      currentRisk: "Critical",
      sessionActive: false,
      location: "Moscow Subnet (VPN)",
      device: "MAC-ENG-892",
      activity: "Continuous SQL Exfiltration",
      status: "Restricted"
    },
    {
      id: "EMP-104",
      name: "Meera K.",
      role: "Senior Wealth Manager",
      dept: "Private Banking",
      privilegeLevel: "Level-2 (Operator)",
      behaviourScore: 78,
      currentRisk: "High",
      sessionActive: true,
      location: "New York HQ",
      device: "WIN-CORP-411",
      activity: "Downloading Batch Customer Portfolio",
      status: "Flagged"
    },
    {
      id: "EMP-238",
      name: "James L.",
      role: "Swift Terminal Operator",
      dept: "Treasury Operations",
      privilegeLevel: "Level-3 (Admin)",
      behaviourScore: 62,
      currentRisk: "Medium",
      sessionActive: true,
      location: "London Branch",
      device: "WIN-SWIFT-902",
      activity: "Validating Inter-bank Wire Ledger",
      status: "Active"
    },
    {
      id: "EMP-411",
      name: "Sarah O.",
      role: "Lead Cloud Infrastructure Engineer",
      dept: "IT Infrastructure",
      privilegeLevel: "Level-3 (Admin)",
      behaviourScore: 24,
      currentRisk: "Low",
      sessionActive: true,
      location: "San Francisco Subnet",
      device: "MAC-CLD-102",
      activity: "Standard ECS Container Rotation",
      status: "Active"
    },
    {
      id: "EMP-802",
      name: "Anand G.",
      role: "Treasury Audit Coordinator",
      dept: "Risk & Audit",
      privilegeLevel: "Level-2 (Operator)",
      behaviourScore: 18,
      currentRisk: "Low",
      sessionActive: false,
      location: "Mumbai Main Branch",
      device: "WIN-RISK-019",
      activity: "None (Offline)",
      status: "Active"
    },
    {
      id: "EMP-903",
      name: "Elena R.",
      role: "Senior Security Analyst",
      dept: "Security Operations",
      privilegeLevel: "Level-2 (Operator)",
      behaviourScore: 15,
      currentRisk: "Low",
      sessionActive: true,
      location: "Geneva Hub",
      device: "MAC-SOC-001",
      activity: "Reviewing Splunk Trigger Queues",
      status: "Active"
    }
  ]);

  const handleAction = (id: string, actionType: "restrict" | "suspend" | "approve") => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        let nextStatus: "Restricted" | "Suspended" | "Active" = "Active";
        if (actionType === "restrict") nextStatus = "Restricted";
        if (actionType === "suspend") nextStatus = "Suspended";
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    if (selectedUser?.id === id) {
      setSelectedUser(prev => prev ? { ...prev, status: actionType === "restrict" ? "Restricted" : actionType === "suspend" ? "Suspended" : "Active" } : null);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === "All" || u.currentRisk === selectedRisk;
    const matchesDept = selectedDept === "All" || u.dept === selectedDept;
    return matchesSearch && matchesRisk && matchesDept;
  });

  const handleExport = () => {
    alert("Exporting Privilege Access List & Behaviour Profiles to Excel format.");
  };

  return (
    <div className="space-y-6">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Users className="h-5 w-5 text-primary-container" />
            Privileged Identity Hub (IAM)
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Audit, restrict, and isolate credentials of high-clearance assets
          </p>
        </div>

        <button 
          onClick={handleExport}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10 self-start md:self-auto"
        >
          <Download className="h-3.5 w-3.5" />
          Export IAM Ledger
        </button>
      </div>

      {/* Main layout: Table on Left, Interactive Inspect Card on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Table Column (3/4 on large screens) */}
        <div className="xl:col-span-3 soc-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
              Privileged Employee Registry ({filteredUsers.length} active)
            </h3>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/40" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ID, Employee name, or Role..."
                  className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-3 text-[11px] outline-none text-on-surface focus:border-primary-container"
                />
              </div>

              <select 
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="bg-[#080f11] border border-outline-variant/30 rounded-lg px-2 py-1.5 text-[11px] font-mono text-on-surface"
              >
                <option value="All">All Risk</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-[#080f11] border border-outline-variant/30 rounded-lg px-2 py-1.5 text-[11px] font-mono text-on-surface"
              >
                <option value="All">All Depts</option>
                <option value="Database Admin">DBA</option>
                <option value="Private Banking">Private Banking</option>
                <option value="Treasury Operations">Treasury</option>
                <option value="IT Infrastructure">IT</option>
                <option value="Risk & Audit">Audit</option>
                <option value="Security Operations">SOC</option>
              </select>
            </div>
          </div>

          {/* Interactive Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20">
                  <th className="p-3">Employee</th>
                  <th className="p-3">Clearance / Dept</th>
                  <th className="p-3">Risk Factor</th>
                  <th className="p-3">Terminal Endpoint</th>
                  <th className="p-3">Session Activity</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    onClick={() => setSelectedUser(user)}
                    className={`hover:bg-white/[0.02] cursor-pointer transition-colors ${selectedUser?.id === user.id ? "bg-[#111827]/60 border-l-2 border-primary-container" : ""}`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary-container/15 text-primary-container flex items-center justify-center font-black text-xs">
                          {user.name.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface">{user.name}</div>
                          <div className="text-[9px] font-mono text-on-surface-variant">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-on-surface">{user.privilegeLevel}</div>
                      <div className="text-[9px] text-on-surface-variant">{user.dept}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <span className={`font-bold font-mono ${
                          user.currentRisk === "Critical" ? "text-error" :
                          user.currentRisk === "High" ? "text-tertiary-container" :
                          user.currentRisk === "Medium" ? "text-yellow-400" : "text-emerald-400"
                        }`}>
                          {user.behaviourScore}
                        </span>
                        <span className="text-[9px] text-on-surface-variant">({user.currentRisk})</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-[10px]">
                      <div className="text-on-surface flex items-center gap-1"><Monitor className="h-3 w-3" /> {user.device}</div>
                      <div className="text-on-surface-variant flex items-center gap-1"><Globe className="h-3 w-3" /> {user.location}</div>
                    </td>
                    <td className="p-3">
                      <div className="max-w-[140px] truncate font-mono text-[10px] text-on-surface-variant">
                        {user.activity}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        user.status === "Active" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" :
                        user.status === "Restricted" ? "bg-tertiary-container/10 border border-tertiary-container/25 text-tertiary-container" :
                        user.status === "Suspended" ? "bg-error/10 border border-error/25 text-error animate-pulse" :
                        "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="text-[10px] font-mono font-bold text-primary-container hover:underline px-2 py-1"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inspect Side Panel (1/4 Column) */}
        <div className="soc-card p-5 flex flex-col justify-between space-y-4">
          {selectedUser ? (
            <div className="space-y-4">
              <div className="border-b border-outline-variant/20 pb-3">
                <span className="text-[9px] font-mono text-primary-container uppercase tracking-wider">Inspect Credentials</span>
                <h4 className="text-sm font-black text-on-surface mt-0.5">{selectedUser.name}</h4>
                <p className="text-[10px] text-on-surface-variant font-mono">{selectedUser.id} • {selectedUser.role}</p>
              </div>

              {/* Status metrics list */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Clearance:</span>
                  <span className="text-on-surface font-semibold">{selectedUser.privilegeLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Risk Index:</span>
                  <span className={`font-bold ${selectedUser.behaviourScore > 70 ? "text-error" : "text-emerald-400"}`}>
                    {selectedUser.behaviourScore} ({selectedUser.currentRisk})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Live Active:</span>
                  <span className={selectedUser.sessionActive ? "text-emerald-400 font-bold" : "text-on-surface-variant"}>
                    {selectedUser.sessionActive ? "Online" : "Offline"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Hardware:</span>
                  <span className="text-on-surface">{selectedUser.device}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Active Subnet:</span>
                  <span className="text-on-surface max-w-[150px] truncate">{selectedUser.location}</span>
                </div>
              </div>

              <div className="bg-[#080f11] p-3 rounded-xl space-y-1.5 border border-outline-variant/15 text-[10px]">
                <div className="text-primary-container font-bold uppercase tracking-wider flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Action Intelligence
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Last flagged trigger: <span className="text-on-surface font-mono">"{selectedUser.activity}"</span>
                </p>
              </div>

              {/* Action Buttons Block */}
              <div className="pt-4 border-t border-outline-variant/10 space-y-2">
                <button 
                  onClick={() => handleAction(selectedUser.id, "restrict")}
                  disabled={selectedUser.status === "Restricted"}
                  className="w-full py-2 bg-tertiary-container/10 hover:bg-tertiary-container/20 border border-tertiary-container/30 text-tertiary-container text-[11px] font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Restrict Access
                </button>
                
                <button 
                  onClick={() => handleAction(selectedUser.id, "suspend")}
                  disabled={selectedUser.status === "Suspended"}
                  className="w-full py-2 bg-error/15 hover:bg-error/25 border border-error/30 text-error text-[11px] font-mono font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  <UserMinus className="h-3.5 w-3.5" />
                  Suspend Account
                </button>

                <button 
                  onClick={() => handleAction(selectedUser.id, "approve")}
                  disabled={selectedUser.status === "Active"}
                  className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Clear Sanctions
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-on-surface-variant font-mono">
              <ShieldCheck className="h-10 w-10 text-primary-container/40 mb-2" />
              <p className="text-[11px]">Select a privileged credential from the registry to inspect session hardware and enforce automated SOAR blocks.</p>
            </div>
          )}

          <div className="text-[10px] font-mono text-on-surface-variant text-center bg-[#080f11] py-1.5 rounded">
            FIDO2 Security Key enforcement: 100%
          </div>
        </div>

      </div>
    </div>
  );
}
