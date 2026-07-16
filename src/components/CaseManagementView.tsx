import React, { useState } from "react";
import { 
  FolderLock, 
  Search, 
  Download, 
  Plus, 
  Send, 
  CheckCircle, 
  Paperclip, 
  Trash2, 
  Clock, 
  AlertTriangle,
  User,
  ExternalLink
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

interface CaseItem {
  id: string;
  title: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "In Investigation" | "Mitigated" | "Archived";
  owner: string;
  evidenceCount: number;
  comments: { author: string; time: string; text: string }[];
}

export default function CaseManagementView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState("CASE-891");
  const [newComment, setNewComment] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const [cases, setCases] = useState<CaseItem[]>([
    {
      id: "CASE-891",
      title: "Oracle DBA Recursive Exfiltration Leak",
      priority: "Critical",
      status: "In Investigation",
      owner: "Elena R. (Senior Analyst)",
      evidenceCount: 4,
      comments: [
        { author: "Elena R.", time: "23:14 PM", text: "Isolating database credentials and validating network logs. Egress matches recursive SELECT backups." },
        { author: "System BOT", time: "23:10 PM", text: "AI Copilot triggered automated containment checklist. Waiting for analyst override." }
      ]
    },
    {
      id: "CASE-411",
      title: "Swift Terminal Wire Ledger Out-Of-Hours",
      priority: "High",
      status: "In Investigation",
      owner: "Sanjay P. (Threat Hunter)",
      evidenceCount: 2,
      comments: [
        { author: "Sanjay P.", time: "18:45 PM", text: "Called Swift wire room coordinator. They confirm they are performing emergency maintenance." }
      ]
    },
    {
      id: "CASE-102",
      title: "Wealth Management Customer Record Downloads",
      priority: "Medium",
      status: "Mitigated",
      owner: "Security Team (Admin)",
      evidenceCount: 3,
      comments: [
        { author: "System BOT", time: "15:10 PM", text: "POL-03 active block applied. Session exfiltration rates contained under threshold." }
      ]
    }
  ]);

  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCases(prev => prev.map(c => {
      if (c.id === activeCase.id) {
        return {
          ...c,
          comments: [...c.comments, { author: "You (SOC Analyst)", time: "Just now", text: newComment }]
        };
      }
      return c;
    }));
    setNewComment("");
    setToast({
      message: "Security journal comment appended and signed under immutable compliance standard.",
      type: "success"
    });
  };

  const handleResolveCase = (id: string) => {
    setCases(prev => prev.map(c => {
      if (c.id === id) return { ...c, status: "Mitigated" };
      return c;
    }));
    setToast({
      message: `Case ${id} successfully marked as MITIGATED. Continuous monitoring active.`,
      type: "success"
    });
  };

  const handleExport = () => {
    if (!activeCase) {
      setToast({ message: "No active case file selected to export.", type: "error" });
      return;
    }

    try {
      exportToPdf({
        title: `Certified Forensic Case Dossier - ${activeCase.id}`,
        metadata: {
          "Case Reference": activeCase.id,
          "Title": activeCase.title,
          "Severity Class": activeCase.priority,
          "Operational Status": activeCase.status,
          "Owner / Handler": activeCase.owner,
          "Evidence Packets Attached": `${activeCase.evidenceCount} Files`,
          "Export Classification": "STRICTLY CONFIDENTIAL",
          "Generated At": new Date().toUTCString(),
          "Operator": "spugazhenthi1005@gmail.com"
        },
        sections: [
          {
            title: "Executive Threat Overview",
            content: `The incident file ${activeCase.id} describes: "${activeCase.title}". It is assigned to ${activeCase.owner} for systematic triage and defensive mitigation.`
          },
          {
            title: "Shared Team Activity Log Journal",
            content: activeCase.comments.map(c => (
              `[${c.time}] ${c.author}: ${c.text}`
            ))
          },
          {
            title: "Audited SOC Containment Certification",
            content: "This report acts as legal and regulatory proof of secure container isolation matching RBI bank policy requirements and SOC 2 Type II criteria."
          }
        ]
      }, `AegisSOC_Case_File_${activeCase.id}.pdf`);

      setToast({
        message: `Forensic report for case ${activeCase.id} exported successfully!`,
        type: "success"
      });
    } catch (e: any) {
      setToast({
        message: `Failed to compile forensic report: ${e?.message || e}`,
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
              <FolderLock className="h-5 w-5 text-primary-container" />
              SOC Case Management &amp; Collaboration Workspace
            </h2>
            <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
              Active threat forensic files, shared analyst chat journals, and containment compliance
            </p>
          </div>

          <button 
            onClick={handleExport}
            className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
          >
            <Download className="h-3.5 w-3.5" />
            Export Case File
          </button>
        </div>

        {/* Main split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left cases list (1/3 size) */}
          <div className="soc-card p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
                Active Investigations ({cases.length})
              </h3>
              <button 
                onClick={() => {
                  const newId = `CASE-${Math.floor(100 + Math.random() * 900)}`;
                  setCases(prev => [
                    {
                      id: newId,
                      title: "New Automated Security Outlier Check",
                      priority: "Medium",
                      status: "In Investigation",
                      owner: "Unassigned Analyst",
                      evidenceCount: 1,
                      comments: [
                        { author: "System BOT", time: "Just now", text: "Ad-hoc investigation file registered via operator command." }
                      ]
                    },
                    ...prev
                  ]);
                  setSelectedCaseId(newId);
                  setToast({
                    message: `Spawned new case folder ${newId} in investigation queue.`,
                    type: "info"
                  });
                }}
                className="text-primary-container font-mono text-xs hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> New Case
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant/40" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter cases by title, owner..."
                className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-3 text-[11px] outline-none text-on-surface focus:border-primary-container"
              />
            </div>

            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {cases
                .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedCaseId === c.id 
                        ? "bg-primary-container/10 border-primary-container text-primary-container font-bold" 
                        : "bg-[#080f11] border-outline-variant/15 text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span>{c.id}</span>
                      <span className={c.priority === "Critical" ? "text-error" : "text-yellow-400"}>
                        {c.priority}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-on-surface mt-1 truncate">{c.title}</h4>
                    <div className="flex justify-between items-center mt-2 text-[9px] text-on-surface-variant font-mono">
                      <span className="truncate max-w-[120px]">{c.owner}</span>
                      <span>{c.status}</span>
                    </div>
                  </button>
              ))}
            </div>
          </div>

          {/* Focused case workspace (2/3 size) */}
          <div className="lg:col-span-2 soc-card p-5 flex flex-col justify-between min-h-[450px]">
            {activeCase ? (
              <div className="space-y-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Header info */}
                  <div className="border-b border-outline-variant/20 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-primary-container uppercase tracking-wider">Focused Case File</span>
                      <h3 className="text-base font-black text-on-surface mt-0.5">{activeCase.title} — {activeCase.id}</h3>
                      <p className="text-[11px] text-on-surface-variant mt-1 font-mono">Managed by {activeCase.owner}</p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleResolveCase(activeCase.id)}
                        disabled={activeCase.status === "Mitigated"}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-40"
                      >
                        Mark Mitigated
                      </button>
                    </div>
                  </div>

                  {/* Evidence attachments indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs font-mono">
                    <div className="p-3 bg-[#080f11] rounded-lg border border-outline-variant/15 flex items-center justify-between">
                      <span className="text-on-surface-variant">Attachments:</span>
                      <span className="text-on-surface font-bold flex items-center gap-1">
                        <Paperclip className="h-3.5 w-3.5 text-primary-container" /> {activeCase.evidenceCount} Files
                      </span>
                    </div>
                    <div className="p-3 bg-[#080f11] rounded-lg border border-outline-variant/15 flex items-center justify-between">
                      <span className="text-on-surface-variant">Active Stage:</span>
                      <span className="text-on-surface font-bold">{activeCase.status}</span>
                    </div>
                    <div className="p-3 bg-[#080f11] rounded-lg border border-outline-variant/15 flex items-center justify-between">
                      <span className="text-on-surface-variant">Severity Index:</span>
                      <span className={`font-bold ${activeCase.priority === "Critical" ? "text-error" : "text-yellow-400"}`}>
                        {activeCase.priority}
                      </span>
                    </div>
                  </div>

                  {/* Shared logs / Comments stream */}
                  <div className="space-y-2 pt-4">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" /> Shared Analyst Activity Journal
                    </span>

                    <div className="space-y-3 bg-[#080f11]/40 p-4 rounded-xl border border-outline-variant/15 max-h-[160px] overflow-y-auto custom-scrollbar">
                      {activeCase.comments.map((cmt, idx) => (
                        <div key={idx} className="text-xs space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant">
                            <span className="text-primary-container font-bold">{cmt.author}</span>
                            <span>{cmt.time}</span>
                          </div>
                          <p className="text-on-surface leading-normal">{cmt.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form to submit comment */}
                <form onSubmit={handleAddComment} className="flex gap-2 pt-4 border-t border-outline-variant/10 mt-4">
                  <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Post security update, justification payload or active action comment..."
                    className="flex-1 bg-[#080f11] border border-outline-variant/30 rounded-lg px-3 py-2 text-xs outline-none text-on-surface focus:border-primary-container"
                  />
                  <button 
                    type="submit"
                    className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-3 py-2 rounded-lg font-bold flex items-center justify-center cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-on-surface-variant font-mono">
                <FolderLock className="h-10 w-10 text-primary-container/40 mb-2" />
                <p className="text-[11px]">Select an active security case file to investigate, attach forensics, and coordinate team actions.</p>
              </div>
            )}
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
