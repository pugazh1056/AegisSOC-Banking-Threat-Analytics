import React, { useState } from "react";
import { 
  ArrowLeft, 
  User, 
  Laptop, 
  Globe, 
  Clock, 
  ShieldAlert, 
  LogIn, 
  Lock, 
  Database, 
  Download, 
  Usb, 
  Ban, 
  Brain, 
  AlertTriangle, 
  Gavel, 
  RefreshCw, 
  Megaphone, 
  FileText,
  Activity,
  CheckCircle,
  Copy
} from "lucide-react";

interface InvestigationViewProps {
  onBackToQueue: () => void;
  onNavigateToCopilot: () => void;
}

export default function InvestigationView({ onBackToQueue, onNavigateToCopilot }: InvestigationViewProps) {
  const [accountSuspended, setAccountSuspended] = useState(false);
  const [mfaResetStatus, setMfaResetStatus] = useState<"idle" | "sending" | "done">("idle");
  const [socNotified, setSocNotified] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const reportText = `### AEGIS_SOC COGNITIVE INCIDENT REPORT
==========================================
INCIDENT ID : INC-9921
TARGET USER : Rahul S. (Senior DBA)
RISK CONFIDENCE : 96% CRITICAL
ENFORCEMENT POLICY : EXFIL-09 (Auto-Terminated)
DATE : 2026-07-15 UTC

FORENSIC TIMELINE SUMMARY:
- 08:00 AM : Standard SSO Authentication logged from routine IP.
- 08:02 AM : Multi-Factor Authentication successfully completed.
- 11:45 PM : High-sensitivity query executed against Customer PII database tables.
- 11:52 PM : Large-scale exfiltration event (4.8 GB backup files egressed).
- 11:55 PM : Unregistered USB mass storage mount (Vendor: Kingston) on MAC-ENG-892.
- 11:58 PM : Active session revoked. Target account suspended locally.

MITRE ATT&CK MATRIX TAGS:
- T1078 (Valid Accounts), T1114 (DB Harvesting), T1048 (Egress/USB Exfiltration).

RECOMMENDED NEXT STEPS:
1. Maintain active account lockout.
2. Conduct physical asset inspection of device MAC-ENG-892.
3. Require physical identity check before account restoration.`;

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleForceMfa = () => {
    setMfaResetStatus("sending");
    setTimeout(() => {
      setMfaResetStatus("done");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant/30 pb-4 gap-4">
        <div>
          <button 
            onClick={onBackToQueue}
            className="text-xs font-mono text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5 hover:text-primary-container transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Queue
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-3">
            Incident Investigation
            <span className="text-base text-on-surface-variant font-normal">- User: Rahul (DBA)</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-error/10 border border-error px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            <span className="text-xs font-bold text-error font-mono uppercase">Critical Threat</span>
            <span className="text-xs font-mono font-bold bg-error/20 text-error px-1.5 py-0.5 rounded">96% Risk Score</span>
          </div>
        </div>
      </div>

      {/* Main Investigation Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (3/12) - Target Employee Profile */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-5 relative overflow-hidden flex flex-col min-h-[460px]">
            {/* Tech aesthetic neon back blur */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-6 border-b border-outline-variant/20 pb-2.5 flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-primary" /> 
              Target Profile
            </h3>
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full border-2 border-outline-variant/50 p-1 mb-4 relative shadow-2xl">
                <div 
                  className="bg-cover bg-center w-full h-full rounded-full" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBfZi9iLldePJ_GE0lw1JF3a07mhCbw511y-5T2pVI1ENBWeTvj06_rBwP80tVYbA_20pnv8c4JNk7KQv5tgEAqSFBg73Vr7Zmbh0Waxm6MLDukyBLWnK4tMflObg-ZhWVh0W6kd-9abaMwkJ7nZGbgPGfkfpSPYKwx2i41YOctV7ORn0bEagVNOaGBq8vAtK0MkFJAC0R5LFcDfftbvDiT_YPpJvS0n0lrmQfWashykEr8_cyjpROd8sCyZer02TOG7O9yWVVKPM')" }}
                />
                <div className={`absolute bottom-0 right-0 w-6 h-6 border-2 border-[#192122] rounded-full flex items-center justify-center shadow-lg ${accountSuspended ? "bg-emerald-500" : "bg-error animate-pulse"}`}>
                  {accountSuspended ? (
                    <CheckCircle className="h-3 w-3 text-white" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 text-white" />
                  )}
                </div>
              </div>
              <h4 className="text-xl font-bold text-on-surface">Rahul S.</h4>
              <p className="text-xs text-on-surface-variant font-mono mt-0.5">Senior Database Admin</p>
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1 text-xs">
              <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/15">
                <span className="text-on-surface-variant">Department</span>
                <span className="text-on-surface font-semibold">Engineering / DBA</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/15">
                <span className="text-on-surface-variant">Primary Device</span>
                <span className="text-on-surface font-mono flex items-center gap-1 font-semibold">
                  <Laptop className="h-3 w-3 text-primary-container" />
                  MAC-ENG-892
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/15">
                <span className="text-on-surface-variant">Location Origin</span>
                <span className="text-error font-mono flex items-center gap-1 font-semibold">
                  <Globe className="h-3 w-3" />
                  Remote (VPN-RU)
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-outline-variant/15">
                <span className="text-on-surface-variant">SSO Session</span>
                <span className="text-on-surface font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3 text-on-surface-variant" />
                  04h 12m 45s
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-on-surface-variant">Status</span>
                <span className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded border ${accountSuspended ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-error/10 border-error text-error animate-pulse"}`}>
                  {accountSuspended ? "SUSPENDED" : "FLAGGED / ACTIVE"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column (6/12) - Kill Chain Timeline */}
        <div className="lg:col-span-6">
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-5 relative flex flex-col min-h-[460px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-error/40 to-transparent"></div>
            
            <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-6 border-b border-outline-variant/20 pb-2.5 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-primary" />
                Kill Chain Forensic Timeline
              </span>
              <span className="text-[9px] font-mono text-on-surface-variant border border-outline-variant/30 px-2 py-0.5 rounded bg-surface-container-low">
                T-MINUS 04:12:00
              </span>
            </h3>
            
            {/* Timeline Events Scroll Area */}
            <div className="flex-1 overflow-y-auto max-h-[380px] pr-1.5 custom-scrollbar relative">
              {/* Vertical line indicator */}
              <div className="absolute left-6 top-3 bottom-3 w-px bg-outline-variant/20"></div>
              
              <div className="flex flex-col gap-5 relative z-10">
                {/* Event 1 */}
                <div className="flex gap-4">
                  <div className="w-12 shrink-0 flex justify-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#192122] border-2 border-outline-variant/30 flex items-center justify-center shadow">
                      <LogIn className="h-3 w-3 text-on-surface-variant" />
                    </div>
                  </div>
                  <div className="bg-surface-container-highest/50 border border-outline-variant/20 rounded-xl p-3.5 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-xs font-bold text-on-surface">Standard Session Auth</h4>
                      <span className="text-[10px] font-mono text-on-surface-variant">08:00 AM</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Routine single-sign-on authenticated from registered corporate residential node.
                    </p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-4">
                  <div className="w-12 shrink-0 flex justify-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#192122] border-2 border-primary-container/30 flex items-center justify-center shadow">
                      <Lock className="h-3 w-3 text-primary-container" />
                    </div>
                  </div>
                  <div className="bg-surface-container-highest/50 border border-outline-variant/20 rounded-xl p-3.5 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-xs font-bold text-on-surface">MFA Handshake Accepted</h4>
                      <span className="text-[10px] font-mono text-on-surface-variant">08:02 AM</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Push notification validated and authorized from secondary registered biometric mobile device.
                    </p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-4">
                  <div className="w-12 shrink-0 flex justify-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#192122] border-2 border-tertiary-container/40 flex items-center justify-center shadow">
                      <Database className="h-3 w-3 text-tertiary-container" />
                    </div>
                  </div>
                  <div className="bg-surface-container-highest/50 border border-tertiary-container/25 rounded-xl p-3.5 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-xs font-bold text-tertiary-container">Anomalous DB Harvesting</h4>
                      <span className="text-[10px] font-mono text-on-surface-variant">11:45 PM</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Initiated high-velocity query targeted at highly sensitive customer table <code className="bg-surface-container-lowest px-1 rounded text-primary">Customer_PII_Q3</code> outside scheduled work envelope.
                    </p>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="flex gap-4">
                  <div className="w-12 shrink-0 flex justify-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#192122] border-2 border-error flex items-center justify-center shadow-lg shadow-error/20">
                      <Download className="h-3 w-3 text-error" />
                    </div>
                  </div>
                  <div className="bg-error/5 border border-error/20 rounded-xl p-3.5 flex-1 relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1 bg-error"></div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-xs font-bold text-error">Massive Database Exfiltration</h4>
                      <span className="text-[10px] font-mono text-on-surface-variant">11:52 PM</span>
                    </div>
                    <p className="text-[11px] text-on-surface">
                      Completed <strong>4.8 GB backup transfer</strong> containing approx. 12,000 decrypted financial entries over encrypted tunnel to an unknown external Russian hosting subnet.
                    </p>
                  </div>
                </div>

                {/* Event 5 */}
                <div className="flex gap-4">
                  <div className="w-12 shrink-0 flex justify-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#192122] border-2 border-error/50 flex items-center justify-center shadow">
                      <Usb className="h-3 w-3 text-error/80" />
                    </div>
                  </div>
                  <div className="bg-surface-container-highest/50 border border-error/20 rounded-xl p-3.5 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-xs font-bold text-on-surface">Physical USB Mass Storage Insertion</h4>
                      <span className="text-[10px] font-mono text-on-surface-variant">11:55 PM</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Unregistered and unapproved hardware device (Vendor ID: Kingston, capacity: 128GB) mounted on workstation MAC-ENG-892.
                    </p>
                  </div>
                </div>

                {/* Event 6 */}
                <div className="flex gap-4">
                  <div className="w-12 shrink-0 flex justify-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#192122] border-2 border-primary-container flex items-center justify-center shadow">
                      <Ban className="h-3 w-3 text-primary-container" />
                    </div>
                  </div>
                  <div className="bg-primary-container/5 border border-primary-container/20 rounded-xl p-3.5 flex-1">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="text-xs font-bold text-primary-container">SOAR Auto-Lock Enforced</h4>
                      <span className="text-[10px] font-mono text-on-surface-variant">11:58 PM</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Active sessions killed and host isolated locally via security baseline directive <strong className="text-primary font-mono">[EXFIL-09]</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (3/12) - AI Copilot & Playbooks */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
          {/* AI Explainability */}
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 border-b border-outline-variant/20 pb-2.5 flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-primary" /> 
                Copilot Analysis
              </h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle className="text-[#2e3638]" cx="18" cy="18" fill="none" r="15.915" stroke="currentColor" strokeWidth="3"></circle>
                    <circle className="text-error" cx="18" cy="18" fill="none" r="15.915" stroke="currentColor" strokeDasharray="99, 100" strokeWidth="3"></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-error">99%</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Cognitive Confidence Alert</h4>
                  <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">Insider Threat Profile matched</p>
                </div>
              </div>
              
              <ul className="flex flex-col gap-2 mt-4 text-[11px]">
                <li className="flex items-start gap-2 bg-[#192122]/40 p-2.5 rounded border border-outline-variant/15 text-on-surface-variant">
                  <span className="text-error mt-0.5">•</span>
                  <span>Midnight login context out-of-routine baseline hours.</span>
                </li>
                <li className="flex items-start gap-2 bg-[#192122]/40 p-2.5 rounded border border-outline-variant/15 text-on-surface-variant">
                  <span className="text-error mt-0.5">•</span>
                  <span>Impossible travel: Russian IP subnet originating within 5 minutes of local sessions.</span>
                </li>
                <li className="flex items-start gap-2 bg-[#192122]/40 p-2.5 rounded border border-outline-variant/15 text-on-surface-variant">
                  <span className="text-error mt-0.5">•</span>
                  <span>Harvesting data volume exceeds his historical 99th percentile bounds.</span>
                </li>
              </ul>
            </div>
            
            <button 
              onClick={onNavigateToCopilot}
              className="mt-6 w-full text-center text-xs font-mono text-primary-container hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Ask Copilot to cross-reference logs
              <span>&rarr;</span>
            </button>
          </div>

          {/* Action Playbook */}
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-5 shrink-0">
            <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 border-b border-outline-variant/20 pb-2.5">
              Active Playbook Actions
            </h3>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setAccountSuspended(prev => !prev)}
                className={`w-full font-mono text-xs py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  accountSuspended 
                    ? "bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20" 
                    : "bg-error text-on-error hover:bg-error/90 shadow-md shadow-error/15"
                }`}
              >
                <Gavel className="h-4 w-4" />
                {accountSuspended ? "Account Locked" : "Lock / Suspend Account"}
              </button>
              
              <button 
                onClick={handleForceMfa}
                disabled={mfaResetStatus === "sending"}
                className="w-full border border-primary text-primary font-mono text-xs py-2.5 rounded-lg hover:bg-primary/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${mfaResetStatus === "sending" ? "animate-spin" : ""}`} />
                {mfaResetStatus === "idle" && "Force MFA Reset"}
                {mfaResetStatus === "sending" && "Broadcasting reset..."}
                {mfaResetStatus === "done" && "MFA Reset Token Broadcasted"}
              </button>
              
              <div className="grid grid-cols-2 gap-3 mt-1.5">
                <button 
                  onClick={() => {
                    setSocNotified(true);
                    setTimeout(() => setSocNotified(false), 5000);
                  }}
                  className={`border font-mono py-2 rounded-lg transition-all text-[10px] flex items-center justify-center gap-1.5 cursor-pointer ${
                    socNotified 
                      ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" 
                      : "border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline"
                  }`}
                >
                  <Megaphone className="h-3 w-3" />
                  {socNotified ? "SOC Alerts Sent" : "Notify SOC"}
                </button>
                <button 
                  onClick={() => setShowReportModal(true)}
                  className="border border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline font-mono py-2 rounded-lg transition-all text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="h-3 w-3" />
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Graph Section - 30-Day Risk Trend vs Dept Average */}
      <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-5 h-48 flex flex-col relative overflow-hidden">
        <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 flex items-center gap-2 z-10">
          <Activity className="h-3.5 w-3.5 text-primary" />
          30-Day Risk Trend vs Department Average Baseline
        </h3>
        
        <div className="flex-1 w-full bg-[#0a0e17]/50 border border-outline-variant/15 rounded-xl relative flex items-center justify-center overflow-hidden">
          {/* Subtle dots layout background */}
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#3b494c 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
          
          {/* Custom vector trends line */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Department Baseline trend (Dashed Grey line) */}
            <path d="M0,110 Q150,90 300,105 T600,92 T900,100 T1200,95" fill="none" stroke="#3b494c" strokeDasharray="5,5" strokeWidth="2"></path>
            
            {/* User risk trend (Primary Cyan line peaking right side) */}
            <path d="M0,115 Q150,110 300,112 T600,90 T900,45 T1200,15" fill="none" stroke="#00e5ff" strokeWidth="2"></path>
            
            {/* Ambient visual gradient */}
            <path d="M0,115 Q150,110 300,112 T600,90 T900,45 T1200,15 L1200,150 L0,150 Z" fill="url(#grad2)" opacity="0.08"></path>
            <defs>
              <linearGradient id="grad2" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#00e5ff", stopOpacity: 1 }}></stop>
                <stop offset="100%" style={{ stopColor: "#00e5ff", stopOpacity: 0 }}></stop>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Risk Spike badge */}
          <div className="absolute right-4 top-4 bg-error/15 border border-error/30 text-error text-[10px] px-2.5 py-1 rounded-full font-mono flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
            Critical Risk Spike Peak: 96%
          </div>

          <div className="absolute left-4 bottom-2 text-[9px] font-mono text-on-surface-variant flex gap-4">
            <span>-- -- Dept Average Risk Baseline (14%)</span>
            <span className="text-[#00e5ff]">— Workstation MAC-ENG-892 Risk Trend</span>
          </div>
        </div>
      </div>

      {/* Markdown Compliance Report Modal Dialog */}
      {showReportModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] border border-outline-variant/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container">
              <h3 className="text-sm font-bold text-primary font-mono tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4" />
                SOAR COMPLIANCE REPORT GENERATOR
              </h3>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-on-surface-variant hover:text-on-surface font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>
            
            <div className="p-5 flex-1 max-h-[380px] overflow-y-auto">
              <pre className="text-xs text-[#00daf3] bg-[#080f11] p-4 rounded-xl border border-[#1f2937] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                {reportText}
              </pre>
            </div>
            
            <div className="p-4 bg-surface-container border-t border-outline-variant/15 flex justify-end gap-3">
              <button 
                onClick={handleCopyReport}
                className="px-4 py-2 bg-primary-container text-on-primary-fixed rounded-lg font-mono text-xs font-bold hover:bg-primary-fixed flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied to clipboard!" : "Copy Report Markdown"}
              </button>
              <button 
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 border border-outline-variant/40 text-on-surface-variant hover:text-on-surface rounded-lg font-mono text-xs hover:bg-white/[0.02]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
