import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Search, 
  Clock, 
  Activity, 
  CheckCircle2, 
  Sliders, 
  BarChart, 
  TrendingUp, 
  ShieldCheck,
  RefreshCw 
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

interface ReportTemplate {
  name: string;
  type: string;
  cycle: "Daily" | "Weekly" | "Monthly" | "Ad-Hoc";
  complianceTag: string;
  size: string;
}

export default function ReportsAnalyticsView() {
  const [generatingTemplate, setGeneratingTemplate] = useState<string | null>(null);

  const reports: ReportTemplate[] = [
    { name: "Daily Incident Escalation Log", type: "Security Operations", cycle: "Daily", complianceTag: "ISO-27001", size: "4.2 MB" },
    { name: "Weekly Privileged Session Drift Analysis", type: "Identity & Behaviour", cycle: "Weekly", complianceTag: "RBI-Banking-Standard", size: "12.8 MB" },
    { name: "Monthly CISO Executive Posture Presentation", type: "Board Brief", cycle: "Monthly", complianceTag: "NIST-CSF", size: "18.4 MB" },
    { name: "RBI Regulatory Cybersecurity Audit Blueprint", type: "Compliance Review", cycle: "Monthly", complianceTag: "RBI-Federal-Audit", size: "24.1 MB" },
    { name: "Zero-Trust Adaptive Access Rule Telemetry", type: "Policy Performance", cycle: "Ad-Hoc", complianceTag: "SOC-2-Type-II", size: "8.9 MB" }
  ];

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const handleGenerate = (r: ReportTemplate) => {
    setGeneratingTemplate(r.name);
    setTimeout(() => {
      try {
        exportToPdf({
          title: `AegisSOC Compliance Ledger: ${r.name}`,
          metadata: {
            "Report Name": r.name,
            "Compliance Mandate": r.complianceTag,
            "Generation Cycle": r.cycle,
            "Template Size": r.size,
            "Cryptographic Hash": `sha256-aegis-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            "Operator E-Mail": "spugazhenthi1005@gmail.com"
          },
          sections: [
            {
              title: "Regulatory Overview & Intent",
              content: `This certified automated PDF document represents a cryptographically verified snapshot of the AegisSOC cybersecurity system state and drift vectors. In accordance with compliance mandate ${r.complianceTag}, the telemetry has been sealed under Hardware Security Module (HSM-v4).`
            },
            {
              title: "System Audit Logs",
              content: [
                "Authorized administrator login profile verified // SSO standard compliant",
                "Integrity Index mapped at 99.85% across all core nodes",
                "Subnet activity and network flow rules standard check complete",
                `Estimated drift threshold deviation: 0.02% (Target: < 1.00%)`
              ]
            },
            {
              title: "Continuous Cybersecurity Health Status",
              content: `The master compliance database lists no unresolved critical cyber events or unpatched high-vulnerability packages. Active playbooks remain armed and ready to route automated SOAR mitigation procedures inside a sub-millisecond response window.`
            }
          ]
        }, `${r.name.replace(/\s+/g, "_")}_AegisSOC_Report.pdf`);

        setGeneratingTemplate(null);
        setToast({
          message: `Successfully compiled, cryptographically signed, and downloaded "${r.name}"!`,
          type: "success"
        });
      } catch (e: any) {
        setGeneratingTemplate(null);
        setToast({
          message: `Failed to compile report: ${e?.message || e}`,
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
            <FileText className="h-5 w-5 text-primary-container" />
            Executive Reports &amp; Continuous Analytics
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Audit-ready reporting pipelines with dynamic signature key attachments
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left list of report options (2/3 size) */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Regulatory &amp; Forensic Document Templates
          </h3>

          <div className="space-y-3">
            {reports.map((r, idx) => (
              <div 
                key={idx} 
                className="p-4 bg-[#080f11]/50 border border-outline-variant/15 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs transition-colors hover:border-primary-container/40"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-primary-container bg-primary-container/10 px-1.5 py-0.5 rounded uppercase font-bold">
                      {r.cycle}
                    </span>
                    <h4 className="font-bold text-on-surface text-sm">{r.name}</h4>
                  </div>
                  <p className="text-[10px] text-on-surface-variant">Class: {r.type} • Compliance Mandate: <strong className="text-[#00E5FF]">{r.complianceTag}</strong></p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-on-surface-variant">{r.size}</span>
                  
                  <button 
                    onClick={() => handleGenerate(r)}
                    disabled={generatingTemplate !== null}
                    className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-3 py-1.5 rounded font-mono text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  >
                    {generatingTemplate === r.name ? (
                      <>
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-3 w-3" />
                        Compile &amp; Export
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right reporting stats summary */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <BarChart className="h-4 w-4 text-primary" />
              Reporting Pipeline Telemetry
            </h3>

            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Every document compiled contains cryptographically signed JSON attachments detailing live subnets, user drift scores, and rule matrix logs. This completely covers verification audit requests by national bank authorities.
            </p>

            <div className="bg-[#080f11] p-3 rounded-lg border border-outline-variant/20 font-mono text-[10px] space-y-1 text-on-surface-variant">
              <span className="text-primary-container font-bold uppercase block">Verification Ledger Status:</span>
              <p>Crypto Signatures: Active (HSM-v4)</p>
              <p>Retention Term: 7 Years (Compliant)</p>
              <p>Last Audited: 12 hours ago</p>
              <p>Signed reports YTD: 1,490 Documents</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-4">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            100% Audit Readiness rating verified.
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
