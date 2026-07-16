import React, { useState } from "react";
import { 
  Award, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Download, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Activity, 
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

export default function ComplianceCenterView() {
  const [generatingReport, setGeneratingReport] = useState(false);
  const [readinessScore, setReadinessScore] = useState(98.4);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const frameworks = [
    { name: "ISO 27001:2022", score: 100, desc: "Information Security Management System", status: "Certified", color: "text-emerald-400" },
    { name: "PCI-DSS v4.0", score: 98, desc: "Payment Card Industry Data Security Standard", status: "Compliant", color: "text-emerald-400" },
    { name: "SOC 2 Type II", score: 100, desc: "Trust Services Criteria Security & Confidentiality", status: "Certified", color: "text-emerald-400" },
    { name: "GDPR Article 32", score: 94, desc: "General Data Protection Regulation Security Controls", status: "Passing", color: "text-emerald-400" },
    { name: "RBI Banking Mandate (India)", score: 98, desc: "Reserve Bank of India Cybersecurity Guidelines", status: "Audited", color: "text-emerald-400" }
  ];

  const upcomingAudits = [
    { agency: "Reserve Bank of India Regulatory Audit", date: "August 12, 2026", scope: "Privileged Identity & Adaptive Access Core", status: "Active Prep" },
    { agency: "Deloitte SOC 2 Surveillance", date: "September 04, 2026", scope: "Immutable Audit Trails & Quantum Vault", status: "Scheduled" }
  ];

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setTimeout(() => {
      try {
        exportToPdf({
          title: "Executive RBI & SOC 2 Compliance Report",
          metadata: {
            "Framework Score": `${readinessScore}% Readiness`,
            "Audit Agency Target": "Reserve Bank of India / Deloitte",
            "Classification Status": "SECURE COGNITIVE LEDGER",
            "Generated At": new Date().toUTCString(),
            "Operator ID": "spugazhenthi1005@gmail.com"
          },
          sections: [
            {
              title: "Certified Framework Standings",
              content: frameworks.map((f) => (
                `Framework: ${f.name} | Score: ${f.score}% | Status: ${f.status} | Description: ${f.desc}`
              ))
            },
            {
              title: "Upcoming Scheduled Regulatory Audits",
              content: upcomingAudits.map((a) => (
                `Auditor: ${a.agency} | Scheduled Date: ${a.date} | Target System Scope: ${a.scope}`
              ))
            },
            {
              title: "SOAR Automated Compliance Handshake",
              content: "All framework controls are verified in real-time through the continuous compliance pipeline daemon at 02:00 UTC."
            }
          ]
        }, "RBI_SOC2_Compliance_Briefing.pdf");

        setGeneratingReport(false);
        setToast({
          message: "RBI & SOC 2 Compliance PDF briefing has been compiled and downloaded successfully!",
          type: "success"
        });
      } catch (e: any) {
        setGeneratingReport(false);
        setToast({
          message: `Failed to compile compliance report: ${e?.message || e}`,
          type: "error"
        });
      }
    }, 1200);
  };

  return (
    <>
      <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Award className="h-5 w-5 text-primary-container" />
            Enterprise Compliance &amp; Audit Center
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Continuous compliance mapping to global financial and privacy regulatory mandates
          </p>
        </div>

        <button 
          onClick={handleGenerateReport}
          disabled={generatingReport}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          {generatingReport ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Compiling Regulations...
            </>
          ) : (
            <>
              <FileText className="h-3.5 w-3.5" />
              Generate Compliance Report
            </>
          )}
        </button>
      </div>

      {/* Main dashboard stats grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Overall compliance score */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Global Compliance Index</span>
          <div className="my-3 font-mono">
            <div className="text-3xl font-black text-emerald-400">98.4%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Weighted mean across 140 core controls</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[98%]"></div>
          </div>
        </div>

        {/* Audit readiness index */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Audit Readiness</span>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400">Optimal</div>
            <p className="text-[10px] text-on-surface-variant mt-1">100% telemetry feeds cryptographically signed</p>
          </div>
          <div className="text-[10px] text-primary-container font-mono flex items-center gap-1 font-semibold">
            <CheckCircle2 className="h-3 w-3" /> All systems Go
          </div>
        </div>

        {/* Closed control checks */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Mandated Checkpoints Passed</span>
          <div className="my-3">
            <div className="text-3xl font-black text-on-surface">1,240 <span className="text-xs text-on-surface-variant">/ 1,252</span></div>
            <p className="text-[10px] text-on-surface-variant mt-1">12 minor process exemptions active</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[99%]"></div>
          </div>
        </div>

        {/* Outstanding Compliance Alarms */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Outstanding Inquiries</span>
          <div className="my-3">
            <div className="text-3xl font-black text-on-surface-variant">0 <span className="text-xs text-emerald-400">Active</span></div>
            <p className="text-[10px] text-on-surface-variant mt-1">All audit actions resolved inside window</p>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> 100% Clear
          </div>
        </div>

      </div>

      {/* Main compliance standards and upcoming events split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Compliance standards matrix */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Regulatory Compliance Frameworks
          </h3>

          <div className="space-y-3.5">
            {frameworks.map((fw, idx) => (
              <div key={idx} className="p-3.5 bg-[#080f11]/50 border border-outline-variant/15 rounded-xl flex items-center justify-between text-xs gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-primary-container/10 text-primary-container px-2 py-0.5 rounded font-bold border border-primary-container/20">
                      {fw.status}
                    </span>
                    <h4 className="font-bold text-on-surface text-sm">{fw.name}</h4>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">{fw.desc}</p>
                </div>

                <div className="text-right">
                  <div className="font-mono text-base font-black text-emerald-400">{fw.score}% Compliant</div>
                  <div className="w-24 bg-[#080f11] h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-emerald-400 h-full" style={{ width: `${fw.score}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Audits & Reports */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary-container" />
              Upcoming Audit Inspections
            </h3>

            <div className="space-y-3">
              {upcomingAudits.map((ua, idx) => (
                <div key={idx} className="p-3 bg-[#080f11] rounded-xl border border-outline-variant/15 text-xs space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-primary-container font-bold">
                    <span>{ua.status}</span>
                    <span className="text-on-surface-variant font-normal">{ua.date}</span>
                  </div>
                  <h4 className="font-bold text-on-surface">{ua.agency}</h4>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">Scope: {ua.scope}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1516]/20 border border-outline-variant/15 p-3 rounded-lg text-[10px] font-mono text-on-surface-variant leading-relaxed mt-4">
            <span className="font-bold text-primary-container">Continuous Compliance:</span> Framework checks are verified inside live code configurations every night at 02:00 UTC.
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
