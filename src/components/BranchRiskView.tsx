import React, { useState } from "react";
import { 
  Map, 
  MapPin, 
  Search, 
  Download, 
  Sliders, 
  TrendingUp, 
  Clock, 
  ShieldAlert, 
  CheckCircle2 
} from "lucide-react";
import { exportToPdf } from "../lib/pdfExport";
import NotificationToast from "./NotificationToast";

interface BranchRiskData {
  name: string;
  code: string;
  riskScore: number;
  latitude: number;
  longitude: number;
  threatDistribution: string;
  incidentsActive: number;
  timeline: string[];
}

export default function BranchRiskView() {
  const [selectedBranchCode, setSelectedBranchCode] = useState("MOS-01");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const handleExportLedger = () => {
    try {
      exportToPdf({
        title: `Branch Security Audit Ledger: ${activeBranch.name}`,
        metadata: {
          "Branch Name": activeBranch.name,
          "Branch Code": activeBranch.code,
          "Assigned Risk Score": `${activeBranch.riskScore}/100`,
          "Active Incidents Count": String(activeBranch.incidentsActive),
          "Threat Distribution profile": activeBranch.threatDistribution,
          "Auditor IP Address": "127.0.0.1",
          "Generated At": new Date().toUTCString()
        },
        sections: [
          {
            title: "Threat Distribution Forensic Profile",
            content: `The Branch Risk index is currently analyzed at ${activeBranch.riskScore}/100. This is categorized based on the active geo-tracking vectors highlighting ${activeBranch.threatDistribution}. Currently, there are ${activeBranch.incidentsActive} active high-threat incidents mapping directly to this workspace Node.`
          },
          {
            title: "Asset Incident History Timeline",
            content: activeBranch.timeline
          },
          {
            title: "Regional Threat Probing Statement",
            content: "Physical asset verification matches authorized hardware parameters. Real-time GPS geo-probing latency is logged at 12ms under active cryptographic envelopes."
          }
        ]
      }, `Branch_Risk_Ledger_${activeBranch.code}.pdf`);

      setToast({
        message: `Branch security ledger for ${activeBranch.name} downloaded successfully!`,
        type: "success"
      });
    } catch (e: any) {
      setToast({
        message: `Failed to compile branch ledger: ${e?.message || e}`,
        type: "error"
      });
    }
  };

  const branches: Record<string, BranchRiskData> = {
    "MOS-01": {
      name: "Moscow Regional Hub",
      code: "MOS-01",
      riskScore: 88,
      latitude: 55.75,
      longitude: 37.61,
      threatDistribution: "Brute Force SSO + Data Exfiltration (VPN Subnets)",
      incidentsActive: 1,
      timeline: [
        "23:14 - Recursive Oracle backup queries flagged",
        "22:45 - High-volume download block from Moscow endpoint IP"
      ]
    },
    "LON-02": {
      name: "London Investment Desk",
      code: "LON-02",
      riskScore: 64,
      latitude: 51.50,
      longitude: -0.12,
      threatDistribution: "Out-of-Hours Swift Ledger Access",
      incidentsActive: 0,
      timeline: [
        "18:12 - Failed hardware token validation attempt",
        "16:30 - Shared drive download boundary warning"
      ]
    },
    "NYC-01": {
      name: "New York Corporate HQ",
      code: "NYC-01",
      riskScore: 32,
      latitude: 40.71,
      longitude: -74.00,
      threatDistribution: "Standard Security Configuration Drift",
      incidentsActive: 0,
      timeline: [
        "11:00 - FIDO2 WebAuthn token rotation complete",
        "09:15 - Active directory schema synched successfully"
      ]
    }
  };

  const activeBranch = branches[selectedBranchCode] || branches["MOS-01"];

  return (
    <>
      <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Map className="h-5 w-5 text-primary-container" />
            Global Branch Risk Analytics Map
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Geographic security heat maps &amp; active threat vectors on physical assets
          </p>
        </div>

        <button 
          onClick={handleExportLedger}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <Download className="h-3.5 w-3.5" />
          Export Branch Ledger
        </button>
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Interactive Map Mockup (2/3 size) */}
        <div className="lg:col-span-2 soc-card p-5 h-[420px] flex flex-col relative justify-between">
          <div>
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              Regional Threat Heat Map
            </h3>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Click any active node beacon to focus local branch telemetry</p>
          </div>

          <div className="flex-1 relative rounded-xl border border-outline-variant/25 bg-[#0a0e17] my-3 overflow-hidden">
            {/* World Map Background Stylized */}
            <div 
              className="bg-cover bg-center w-full h-full opacity-30 mix-blend-color-dodge" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPq6mTpD2QXY8PQQu6BFID2S3VPNRsSQjmEkD7Jngta-eX_OMDbABYi7wPZLJq99ttXdvUxVAlRGOdd3ED5DI9T4IA-L1pr-hTFoOZmomDLaMfhQ54w7GTmPThiU1P-lirwN-tc6feLCozJoZqQXiBrWycwgETNvIeTlLWLhCEDI3VUr0m263h8FNOtj692GiO7jOnhtycbOufadIM7A13QOVy5PhINT-nK_fGu9X0p3ZBlEH1WH3kTFKnybqbWo5VXEQetD_QcSg')" }}
            />

            {/* Interactive click beacons */}
            {/* Moscow Beacon */}
            <div 
              onClick={() => setSelectedBranchCode("MOS-01")}
              className="absolute top-[28%] left-[62%] cursor-pointer group z-40"
            >
              <span className={`absolute inline-flex h-6 w-6 rounded-full bg-error/30 animate-ping`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 bg-error border border-white/20`}></span>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#080f11] text-[9px] text-on-surface font-mono p-1 border border-outline-variant/30 rounded whitespace-nowrap shadow-2xl">
                Moscow Regional (Risk: 88)
              </div>
            </div>

            {/* London Beacon */}
            <div 
              onClick={() => setSelectedBranchCode("LON-02")}
              className="absolute top-[32%] left-[45%] cursor-pointer group z-40"
            >
              <span className={`absolute inline-flex h-4 w-4 rounded-full bg-yellow-400/20 animate-ping`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 bg-yellow-400 border border-white/10`}></span>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#080f11] text-[9px] text-on-surface font-mono p-1 border border-outline-variant/30 rounded whitespace-nowrap shadow-2xl">
                London Investment (Risk: 64)
              </div>
            </div>

            {/* NY Beacon */}
            <div 
              onClick={() => setSelectedBranchCode("NYC-01")}
              className="absolute top-[38%] left-[25%] cursor-pointer group z-40"
            >
              <span className={`relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border border-white/10`}></span>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#080f11] text-[9px] text-on-surface font-mono p-1 border border-outline-variant/30 rounded whitespace-nowrap shadow-2xl">
                New York HQ (Risk: 32)
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-on-surface-variant flex gap-3">
            <span>Critical Nodes: 1</span>
            <span>Warning Nodes: 1</span>
            <span>Optimal Nodes: 1</span>
          </div>
        </div>

        {/* Right focused telemetry panel (1/3 size) */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-outline-variant/20 pb-3">
              <span className="text-[9px] font-mono text-primary-container uppercase tracking-wider">Node Focused</span>
              <h4 className="text-sm font-black text-on-surface mt-0.5">{activeBranch.name} ({activeBranch.code})</h4>
              <p className="text-[10px] text-on-surface-variant font-mono">Coordinates: {activeBranch.latitude}°N, {activeBranch.longitude}°W</p>
            </div>

            {/* Metrics */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Active Threat Level:</span>
                <span className={`font-bold ${activeBranch.riskScore >= 70 ? "text-error" : "text-emerald-400"}`}>
                  {activeBranch.riskScore} / 100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Active Incidents:</span>
                <span className="text-on-surface font-bold">{activeBranch.incidentsActive}</span>
              </div>
              <div className="space-y-1">
                <span className="text-on-surface-variant block">Primary Threat Taxonomy:</span>
                <span className="text-on-surface font-bold text-[11px] block bg-[#080f11] p-2 rounded border border-outline-variant/15 leading-relaxed">
                  {activeBranch.threatDistribution}
                </span>
              </div>
            </div>

            {/* Branch risk timeline */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                Active Local Risk Timeline
              </span>
              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                {activeBranch.timeline.map((line, idx) => (
                  <div key={idx} className="p-2 bg-[#080f11]/80 rounded text-[10px] font-mono text-on-surface border border-outline-variant/10 leading-normal">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[9px] font-mono text-on-surface-variant text-center border-t border-outline-variant/10 pt-3">
            Continuous GPS geo-probing latency: 12ms.
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
