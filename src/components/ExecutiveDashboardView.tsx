import React, { useState } from "react";
import { 
  Building, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Search, 
  Download, 
  Percent, 
  AlertOctagon, 
  Activity, 
  SlidersHorizontal 
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

export default function ExecutiveDashboardView() {
  const [activeQuarter, setActiveQuarter] = useState<"Q1" | "Q2" | "Q3">("Q1");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const handleExportBrief = () => {
    try {
      exportToPdf({
        title: `Corporate Executive Security Brief - ${activeQuarter} 2026`,
        metadata: {
          "Document Title": "Executive Board Security Briefing",
          "Fiscal Period": activeQuarter,
          "Audience": "Corporate Executive Officers / CISO",
          "Classification": "Restricted Board Confidential",
          "Generated At": new Date().toUTCString(),
          "Operator": "spugazhenthi1005@gmail.com"
        },
        sections: [
          {
            title: "Key Performance Indicators",
            content: [
              `Enterprise Security Score: ${executiveKpis.enterpriseScore}% (Target: > 90.00%)`,
              `Active Cyber Incidents Quarantined: ${executiveKpis.blockedThreats}`,
              `Avoided Outbound Threat Losses: ${executiveKpis.criticalIncidents}`,
              `Policy Compliance Coverage: ${executiveKpis.complianceScore}`
            ]
          },
          {
            title: "Branch Offices Cyber Drift Standings",
            content: branchRiskRankings.map((b) => (
              `Branch: ${b.branch} | Risk Score: ${b.riskScore}/100 | Severity Rank: ${b.status} | Trend: ${b.trend.toUpperCase()}`
            ))
          },
          {
            title: "System CISO Directives",
            content: "Board mandates direct immediate remediation on London Investment Desk privileges and continuous zero-knowledge credential auditing for high-wealth client database operators."
          }
        ]
      }, `Executive_Security_Brief_${activeQuarter}_2026.pdf`);

      setToast({
        message: `Corporate Executive Security Brief downloaded successfully!`,
        type: "success"
      });
    } catch (e: any) {
      setToast({
        message: `Failed to compile brief: ${e?.message || e}`,
        type: "error"
      });
    }
  };

  const branchRiskRankings = [
    { rank: 1, branch: "Moscow Regional Hub", riskScore: 88, status: "Critical", trend: "up" },
    { rank: 2, branch: "London Investment Desk", riskScore: 64, status: "Warning", trend: "down" },
    { rank: 3, branch: "New York Corporate HQ", riskScore: 32, status: "Normal", trend: "stable" },
    { rank: 4, branch: "Mumbai Operational Site", riskScore: 18, status: "Normal", trend: "stable" }
  ];

  const executiveKpis = {
    enterpriseScore: 92,
    threatLevel: "Elevated (Mitigated)",
    blockedThreats: 42910,
    criticalIncidents: 1,
    aiAccuracy: "99.8%",
    businessRisk: "2.4% (Lower Bound)",
    complianceScore: "98.4%",
  };

  return (
    <>
      <div className="space-y-6">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Building className="h-5 w-5 text-primary-container" />
            CISO &amp; CIO Executive Risk Dashboard
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Quarterly aggregate security posture, corporate loss hazard index, and compliance standards
          </p>
        </div>

        <div className="flex gap-2">
          <div className="bg-[#080f11] border border-outline-variant/30 rounded-lg p-0.5 flex text-xs font-mono">
            {(["Q1", "Q2", "Q3"] as const).map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuarter(q)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeQuarter === q ? "bg-primary-container/20 text-primary-container font-black" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <button 
            onClick={handleExportBrief}
            className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
          >
            <Download className="h-3.5 w-3.5" />
            Export Executive Brief
          </button>
        </div>
      </div>

      {/* Corporate index row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Enterprise Security Score */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Enterprise Security Score</span>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400">{executiveKpis.enterpriseScore}%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">NIST CSF Frame audit rating</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[92%]"></div>
          </div>
        </div>

        {/* Current Threat Level */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Threat Level</span>
          <div className="my-3">
            <div className="text-2xl font-black text-yellow-400">{executiveKpis.threatLevel}</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Live active global perimeter shield</p>
          </div>
          <div className="text-[10px] text-primary-container font-mono font-bold">
            All nodes operational
          </div>
        </div>

        {/* Total Blocked Threats */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Threats Blocked YTD</span>
          <div className="my-3">
            <div className="text-3xl font-black text-on-surface">42,910</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Average 120 blocks per hour</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full w-[85%]"></div>
          </div>
        </div>

        {/* Business Risk Index */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Business Loss Risk</span>
          <div className="my-3">
            <div className="text-3xl font-black text-on-surface">{executiveKpis.businessRisk}</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Projected annualized loss limit</p>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono font-semibold">
            Optimal Compliance Band
          </div>
        </div>

      </div>

      {/* Chart Section and branch rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Threat Trends */}
        <div className="soc-card p-5 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">Monthly Threat Mitigated Volume</h3>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Comparative visual plot showing active defense mitigation rate</p>
            </div>
            <div className="text-[10px] text-primary font-mono font-semibold">
              +12% Defense Velocity YoY
            </div>
          </div>

          <div className="flex-1 min-h-[220px] relative flex items-end pt-4 bg-[#0a0e17]/40 rounded-lg p-3 border border-outline-variant/15">
            {/* Custom SVG Line graph */}
            <svg className="w-full h-full stroke-primary fill-none" preserveAspectRatio="none" viewBox="0 0 100 50">
              <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="10" y2="10"></line>
              <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25"></line>
              <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="40" y2="40"></line>
              
              <path d="M0,45 Q15,40 30,30 T60,20 T80,15 T100,5" strokeWidth="2" stroke="#00E5FF" fill="none"></path>
              <circle cx="100" cy="5" fill="#FF3B5C" r="3" className="animate-pulse"></circle>
            </svg>
            <div className="absolute top-2 right-2 text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
              AI Cyber Shield Efficiency: 99.8%
            </div>
          </div>
        </div>

        {/* Branch Risk Ranking */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Building className="h-4 w-4 text-primary" />
              Branch Risk Rankings
            </h3>
            <p className="text-[10px] text-on-surface-variant mt-0.5">High variance priority operational zones</p>
          </div>

          <div className="my-4 space-y-3.5">
            {branchRiskRankings.map((b) => (
              <div key={b.rank} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-on-surface-variant w-4">#{b.rank}</span>
                  <div>
                    <h4 className="font-bold text-on-surface">{b.branch}</h4>
                    <p className="text-[9px] text-on-surface-variant font-mono">Status: {b.status}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono font-bold ${b.riskScore >= 70 ? "text-error" : b.riskScore >= 40 ? "text-yellow-400" : "text-emerald-400"}`}>
                    {b.riskScore} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-on-surface-variant text-center border-t border-outline-variant/10 pt-3">
            Aggregate loss prevention index: $4.2M saved
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
