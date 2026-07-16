import React, { useState } from "react";
import { 
  TrendingUp, 
  User, 
  MapPin, 
  ShieldAlert, 
  Search, 
  Download, 
  Activity, 
  RefreshCw, 
  Database, 
  FileText, 
  Monitor, 
  Sliders, 
  Zap, 
  Clock 
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

export default function BehaviourAnalyticsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [learningProgress, setLearningProgress] = useState(94.2);
  const [driftDetected, setDriftDetected] = useState(false);

  const topSuspiciousUsers = [
    { name: "Rahul S.", role: "Senior DBA", score: 96, drift: "+12% drift", dept: "Database Admin", status: "Critical" },
    { name: "Meera K.", role: "Wealth Manager", score: 78, drift: "+4% drift", dept: "Private Banking", status: "Warning" },
    { name: "James L.", role: "Swift Operator", score: 65, drift: "Stable", dept: "Treasury", status: "Moderate" },
    { name: "Sarah O.", role: "Cloud Architect", score: 45, drift: "-2% drift", dept: "IT Infrastructure", status: "Normal" }
  ];

  const anomalyTimeline = [
    { time: "11:58 PM", user: "Rahul S.", action: "Unusual SQL execution on Backup_Q3", type: "DB Access Anomalous", severity: "high" },
    { time: "11:45 PM", user: "Rahul S.", action: "Login via Moscow Subnet VPN", type: "Location Intelligence", severity: "high" },
    { time: "09:12 PM", user: "Meera K.", action: "120 Wealth Portfolio exports", type: "File Download Behaviour", severity: "medium" },
    { time: "04:30 PM", user: "James L.", action: "Swift Terminal session outside hours", type: "Login Pattern", severity: "medium" }
  ];

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const handleExport = () => {
    try {
      exportToPdf({
        title: "User Behavioural Baseline Analysis",
        metadata: {
          "Analysis Framework": "AegisSOC Behavioural Engine",
          "Learning Progress": `${learningProgress}% Trained`,
          "Drift Alert State": driftDetected ? "WARNING" : "STABLE_OK",
          "Generated At": new Date().toUTCString(),
          "Operator": "spugazhenthi1005@gmail.com"
        },
        sections: [
          {
            title: "Flagged Suspileged Operative Profiles",
            content: topSuspiciousUsers.map((u) => (
              `Operative: ${u.name} | Role: ${u.role} | Score: ${u.score}/100 | Category Status: ${u.status}`
            ))
          },
          {
            title: "Discovered Anomaly Timeline Sequence",
            content: anomalyTimeline.map((a) => (
              `Time: ${a.time} | User Node: ${a.user} | Threat Category: ${a.type} | Action Description: ${a.action}`
            ))
          },
          {
            title: "CISO Risk Rating Certification",
            content: "The behavioral tracking profile is cryptographically verified to have standard deviation matches matching federal NIST baselines."
          }
        ]
      }, "User_Behaviour_Baseline_Audit.pdf");

      setToast({
        message: "User Behaviour baseline compliance PDF report downloaded successfully!",
        type: "success"
      });
    } catch (e: any) {
      setToast({
        message: `Failed to compile behavioural PDF: ${e?.message || e}`,
        type: "error"
      });
    }
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary-container" />
            Privileged Behavioural Intelligence
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Real-time baseline comparisons &amp; cognitive drift markers
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setDriftDetected(!driftDetected)}
            className="px-3 py-1.5 border border-outline-variant/40 hover:text-primary hover:border-primary text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
            Simulate Drift Check
          </button>
          <button 
            onClick={handleExport}
            className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export Analytics
          </button>
        </div>
      </div>

      {/* Grid of Main Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* User Behaviour Score Card */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase">Mean Behaviour Score</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black text-on-surface">34.5<span className="text-xs text-on-surface-variant">/100</span></div>
            <p className="text-[10px] text-on-surface-variant mt-1">Average user risk level (lower is safer)</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[34.5%]"></div>
          </div>
        </div>

        {/* AI Learning Progress */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase">AI Baseline Progress</span>
            <span className="text-[10px] text-primary font-mono">{learningProgress}%</span>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black text-primary-container">Continuous</div>
            <p className="text-[10px] text-on-surface-variant mt-1">4,591 endpoints mapped dynamically</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full" style={{ width: `${learningProgress}%` }}></div>
          </div>
        </div>

        {/* Behaviour Drift Detection Status */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase">Drift Indicators</span>
            <span className={`w-2.5 h-2.5 rounded-full ${driftDetected ? "bg-error animate-pulse" : "bg-emerald-400"}`}></span>
          </div>
          <div className="my-3">
            <div className={`text-2xl font-black uppercase ${driftDetected ? "text-error" : "text-emerald-400"}`}>
              {driftDetected ? "Drift Alert Active" : "Operational Normal"}
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1">Comparing 30-day session boundaries</p>
          </div>
          <div className="text-[10px] text-primary-container font-mono underline cursor-pointer" onClick={() => setDriftDetected(!driftDetected)}>
            {driftDetected ? "Acknowledge Drift Markers" : "Force Drift Audit"}
          </div>
        </div>

        {/* Device Trust Baseline */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase">Device Trust</span>
            <span className="text-[10px] text-emerald-400 font-mono">98.1% Safe</span>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black text-on-surface">4,504 <span className="text-xs text-on-surface-variant">/ 4,591</span></div>
            <p className="text-[10px] text-on-surface-variant mt-1">Hardware signature verified</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[98%]"></div>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Historical Behaviour Graph & Line Chart */}
        <div className="soc-card p-5 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">Historical Behaviour &amp; Download Trends</h3>
              <p className="text-[10px] text-on-surface-variant mt-0.5">30-day privileged session and network traffic baselines</p>
            </div>
            <div className="flex bg-[#080f11] border border-outline-variant/30 rounded p-0.5 text-[9px] font-mono">
              <button className="px-2 py-0.5 rounded bg-primary-container/15 text-primary-container">Egress Volume</button>
              <button className="px-2 py-0.5 rounded text-on-surface-variant">SQL Velocity</button>
            </div>
          </div>

          {/* Area Line Chart via SVG */}
          <div className="flex-1 min-h-[220px] relative flex items-end pt-4 bg-[#0a0e17]/40 rounded-lg p-3 border border-outline-variant/15">
            <svg className="w-full h-full stroke-primary fill-none" preserveAspectRatio="none" viewBox="0 0 100 50">
              {/* Horizontal Grid lines */}
              <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="10" y2="10"></line>
              <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25"></line>
              <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="40" y2="40"></line>
              
              {/* Normal Baseline Area */}
              <path d="M0,45 Q15,42 30,40 T60,43 T80,38 T100,42 L100,50 L0,50 Z" fill="rgba(0, 218, 243, 0.05)" stroke="none"></path>
              {/* Live Egress Spike Line */}
              <path d="M0,45 Q15,42 30,40 T60,20 T75,8 T90,35 L100,42" strokeWidth="1.5" stroke="#00daf3" fill="none"></path>
              
              {/* Spike annotations */}
              <circle cx="75" cy="8" fill="#FF3B5C" r="3" className="animate-pulse"></circle>
            </svg>
            <div className="absolute top-2 left-2 text-[9px] font-mono text-on-surface-variant bg-[#0A0E17]/80 px-2 py-0.5 rounded border border-outline-variant/20">
              Exfiltration Threshold Spike (Rahul S. 4.8 GB)
            </div>
          </div>
        </div>

        {/* Radar Chart equivalent / Core Vector Weights */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">Multi-Vector Behaviour Weight</h3>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Analytic distribution across vectors</p>
          </div>

          <div className="my-4 flex justify-center items-center h-44 relative">
            {/* Custom SVG Radar Shape */}
            <svg className="w-40 h-40" viewBox="0 0 100 100">
              {/* Concentric hexagons */}
              <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="#1f2937" strokeWidth="0.5" fill="none"></polygon>
              <polygon points="50,25 76,40 76,60 50,75 24,60 24,40" stroke="#1f2937" strokeWidth="0.5" fill="none"></polygon>
              <polygon points="50,40 65,50 65,60 50,70 35,60 35,50" stroke="#1f2937" strokeWidth="0.5" fill="none"></polygon>
              
              {/* Axis lines */}
              <line x1="50" y1="10" x2="50" y2="90" stroke="#1f2937" strokeWidth="0.5"></line>
              <line x1="15" y1="30" x2="85" y2="70" stroke="#1f2937" strokeWidth="0.5"></line>
              <line x1="15" y1="70" x2="85" y2="30" stroke="#1f2937" strokeWidth="0.5"></line>
              
              {/* Risk Weights filled polygon */}
              {/* Vertices representing Login, Device, Location, Database, Downloads, Workhours */}
              <polygon points="50,15 80,35 60,65 50,85 20,60 30,35" fill="rgba(0, 229, 255, 0.25)" stroke="#00E5FF" strokeWidth="1.5"></polygon>
            </svg>
            
            {/* Labels placed absolutely */}
            <span className="absolute top-1 text-[8px] font-mono text-on-surface-variant uppercase">Device Trust</span>
            <span className="absolute bottom-1 text-[8px] font-mono text-on-surface-variant uppercase">Database Access</span>
            <span className="absolute right-0 top-12 text-[8px] font-mono text-on-surface-variant uppercase">Downloads</span>
            <span className="absolute left-0 top-12 text-[8px] font-mono text-on-surface-variant uppercase">Location</span>
          </div>

          <div className="text-[10px] font-mono text-on-surface-variant flex justify-between">
            <span>Critical Weight: Downloads</span>
            <span className="text-error font-bold">Priority High</span>
          </div>
        </div>
      </div>

      {/* Search, Filter, and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Top Suspicious Users with search/filter */}
        <div className="soc-card p-5 lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">Top Suspicious Privileged Users</h3>
              <p className="text-[10px] text-on-surface-variant mt-0.5">High variance against historical operational profiles</p>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/40" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search operator..."
                  className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-3 text-[11px] outline-none text-on-surface focus:border-primary-container"
                />
              </div>
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-[#080f11] border border-outline-variant/30 rounded-lg px-2 py-1.5 text-[11px] font-mono text-on-surface"
              >
                <option value="All">All Sectors</option>
                <option value="Database Admin">DBA</option>
                <option value="Private Banking">Wealth Mgmt</option>
                <option value="Treasury">Treasury</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20">
                  <th className="p-3">Analyst Node</th>
                  <th className="p-3">Scope Dept</th>
                  <th className="p-3">Behaviour Risk</th>
                  <th className="p-3">Variance Drift</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {topSuspiciousUsers
                  .filter(u => selectedDept === "All" || u.dept === selectedDept)
                  .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((user, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-container/10 flex items-center justify-center text-[10px] font-bold text-primary-container">
                          {user.name.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface">{user.name}</div>
                          <div className="text-[9px] text-on-surface-variant">{user.role}</div>
                        </div>
                      </td>
                      <td className="p-3 text-on-surface-variant font-mono">{user.dept}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-bold ${user.score >= 80 ? "text-error" : user.score >= 60 ? "text-tertiary-container" : "text-emerald-400"}`}>
                            {user.score}
                          </span>
                          <div className="w-12 bg-[#080f11] h-1 rounded-full overflow-hidden">
                            <div className={`h-full ${user.score >= 80 ? "bg-error" : user.score >= 60 ? "bg-tertiary-container" : "bg-emerald-400"}`} style={{ width: `${user.score}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-[10px] text-on-surface-variant">{user.drift}</td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold ${
                          user.status === "Critical" ? "bg-error/15 text-error border border-error/20" :
                          user.status === "Warning" ? "bg-tertiary-container/15 text-tertiary-container border border-tertiary-container/20" :
                          "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Real-time anomaly timeline */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              Dynamic Anomaly Timeline
            </h3>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Continuous audit trail event stream</p>
          </div>

          <div className="my-4 space-y-3.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
            {anomalyTimeline.map((item, idx) => (
              <div key={idx} className="flex gap-3 text-xs">
                <span className="text-[10px] font-mono text-primary-container shrink-0 w-12 pt-0.5">{item.time}</span>
                <div className="relative shrink-0 flex flex-col items-center">
                  <span className={`w-2 h-2 rounded-full ${item.severity === "high" ? "bg-error animate-ping" : "bg-tertiary-container"}`}></span>
                  <div className="w-0.5 flex-1 bg-outline-variant/20 my-1"></div>
                </div>
                <div>
                  <p className="font-bold text-on-surface">{item.user} — {item.type}</p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed mt-0.5">{item.action}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#080f11] p-3 rounded-lg text-[10px] font-mono text-on-surface-variant flex items-center gap-2">
            <Sliders className="h-3.5 w-3.5 text-primary-container animate-pulse" />
            AI continuous training batch executed 4m ago.
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
