import React, { useState } from "react";
import { X, Copy, CheckCircle, Shield, Key, Link2, Share2, Mail, Globe } from "lucide-react";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  reportTitle: string;
}

export default function ShareDialog({ isOpen, onClose, reportId, reportTitle }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [accessLevel, setAccessLevel] = useState("Auditor Only");
  const [expiry, setExpiry] = useState("2 Hours");
  
  if (!isOpen) return null;

  const secureToken = `tok_aegis_${Math.random().toString(36).substring(2, 12)}_${reportId.toLowerCase()}`;
  const shareableUrl = `${window.location.origin}/reports/${reportId}?auth=${secureToken}&access=auditor_tier`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
      <div className="bg-[#090e17] border border-outline-variant/40 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-[#1f2937]/50 p-5 flex justify-between items-center bg-[#0d1424]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary-container/10 rounded-lg text-primary-container">
              <Share2 className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface font-sans">Cryptographic Share Panel</h3>
              <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider mt-0.5">
                Generate secure audited gateway endpoint link
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/[0.04] text-on-surface-variant hover:text-on-surface rounded-lg cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5">
          <div>
            <span className="text-[9px] font-mono font-bold text-primary-container bg-primary-container/10 px-1.5 py-0.5 rounded">
              TARGET DOCUMENT: {reportId}
            </span>
            <h4 className="text-xs font-bold text-on-surface mt-1.5 leading-snug">{reportTitle}</h4>
          </div>

          {/* Access Policy selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Access Scope Tier</label>
              <select 
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)}
                className="w-full bg-[#060a12] border border-[#1f2937] text-xs text-on-surface p-2.5 rounded-xl font-mono focus:border-primary-container focus:outline-none"
              >
                <option>Auditor Only (Read-Only)</option>
                <option>Regulatory Compliance Team</option>
                <option>Emergency Board Clearance</option>
                <option>Sandbox Cryptographic Mock</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Token Expiry Window</label>
              <select 
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full bg-[#060a12] border border-[#1f2937] text-xs text-on-surface p-2.5 rounded-xl font-mono focus:border-primary-container focus:outline-none"
              >
                <option>15 Minutes (High Severity)</option>
                <option>2 Hours (Standard Compliance)</option>
                <option>24 Hours (Long-form Audit)</option>
                <option>1 Use Only (Atomic Revoke)</option>
              </select>
            </div>
          </div>

          {/* Security Status Box */}
          <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex gap-3 text-xs">
            <Shield className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-emerald-300">NIST Security Compliance Verified</p>
              <p className="text-[10px] text-slate-400">
                This transaction generates a zero-knowledge verified tracking hash dynamically appended to the master SOC Audit log.
              </p>
            </div>
          </div>

          {/* Share Link Area */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Secure Audit URL Path</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-[#060a12] border border-[#1f2937] rounded-xl p-3 flex items-center font-mono text-[9px] text-primary-container overflow-hidden select-all whitespace-nowrap scrollbar-none relative">
                <Link2 className="h-3.5 w-3.5 text-on-surface-variant mr-2 shrink-0" />
                <span className="truncate">{shareableUrl}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-4 bg-primary-container hover:bg-primary-fixed text-on-primary-fixed font-mono text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0c1424] px-6 py-4 border-t border-[#1f2937]/50 flex justify-between items-center text-[10px] font-mono text-on-surface-variant">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Globe className="h-3 w-3 animate-spin [animation-duration:12s]" />
            Encrypted Gateway Handshake: ACTIVE
          </div>
          <span className="text-[9px] uppercase bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
            AES-256
          </span>
        </div>

      </div>
    </div>
  );
}
