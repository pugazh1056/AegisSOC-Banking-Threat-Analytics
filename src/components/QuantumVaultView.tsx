import React, { useState } from "react";
import { 
  Key, 
  ShieldCheck, 
  RefreshCw, 
  Download, 
  Lock, 
  Server, 
  Database, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Layers 
} from "lucide-react";

export default function QuantumVaultView() {
  const [entropyRate, setEntropyRate] = useState(100);
  const [rotatingKeys, setRotatingKeys] = useState(false);
  const [lastRotation, setLastRotation] = useState("3 hours ago");

  const protectedAssets = [
    { name: "Protected Compliance Audit Logs", count: 42910, type: "Audit Log Ledger", security: "AES-256-GCM + Kyber-1024" },
    { name: "Protected Private API Keys", count: 32, type: "Active secrets", security: "Crystals-Kyber KEM" },
    { name: "Protected CA Certificates", count: 18, type: "System-wide trust", security: "Crystals-Dilithium Signature" },
    { name: "Protected CISO Incident Reports", count: 48, type: "Sensitive PDF artifacts", security: "Quantum Envelope Enclosure" }
  ];

  const handleKeyRotation = () => {
    setRotatingKeys(true);
    setTimeout(() => {
      setRotatingKeys(false);
      setEntropyRate(100);
      setLastRotation("Just now");
      alert("Crystals-Kyber-1024 key encapsulation mechanism refreshed. Dynamic entropy injected successfully.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary-container" />
            Post-Quantum Cryptographic Vault
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Lattice-based security envelopes utilizing standard Crystals-Kyber &amp; Dilithium algorithms
          </p>
        </div>

        <button 
          onClick={handleKeyRotation}
          disabled={rotatingKeys}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${rotatingKeys ? "animate-spin" : ""}`} />
          {rotatingKeys ? "Injecting Entropy..." : "Rotate Kyber Seed"}
        </button>
      </div>

      {/* Overview stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Core Algorithm Status */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Quantum KEM Standard</span>
          <div className="my-3">
            <div className="text-2xl font-black text-primary-container">CRYSTALS-Kyber</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Lattice-based encryption</p>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded self-start border border-emerald-400/20">
            NIST FIPS 203 Approved
          </span>
        </div>

        {/* Dilithium signature standard */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Signature Standard</span>
          <div className="my-3">
            <div className="text-2xl font-black text-on-surface">CRYSTALS-Dilithium</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Authentication seed signing</p>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded self-start border border-emerald-400/20">
            FIPS 204 Operational
          </span>
        </div>

        {/* Entropy rate status */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">KEM Entropy Rating</span>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400">{entropyRate}%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Last rotated: {lastRotation}</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[100%]"></div>
          </div>
        </div>

        {/* Certificate security rating */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Encryption Health</span>
          <div className="my-3 font-mono">
            <div className="text-3xl font-black text-emerald-400">100.0%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">No active crypto-drift anomalies</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[100%]"></div>
          </div>
        </div>

      </div>

      {/* Main Asset table layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Protected Assets list */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Kyber-Sealed Vault Ledger Assets
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 text-[10px] font-mono text-on-surface-variant uppercase bg-[#0d1516]/20 font-semibold">
                  <th className="p-3">Asset Parameter</th>
                  <th className="p-3">Count/Capacity</th>
                  <th className="p-3">Asset Classification</th>
                  <th className="p-3 text-right">Cryptographic Envelope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-xs">
                {protectedAssets.map((asset, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01]">
                    <td className="p-3 font-semibold text-on-surface flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      {asset.name}
                    </td>
                    <td className="p-3 font-mono text-primary-container font-bold">{asset.count} items</td>
                    <td className="p-3 text-on-surface-variant">{asset.type}</td>
                    <td className="p-3 text-right font-mono text-xs text-emerald-400 font-bold">{asset.security}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crypto details panel */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-primary" />
              Lattice Math Security Core
            </h3>

            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Our quantum-safe system implements lattice-based cryptography, specifically the Module Learning with Errors (M-LWE) design parameters. Crystals-Kyber-1024 offers safety metrics that completely withstand future high-qubit Shor's algorithm quantum factoring risks.
            </p>

            <div className="bg-[#080f11] p-3 rounded-lg border border-outline-variant/20 font-mono text-[10px] space-y-1 text-on-surface-variant">
              <span className="text-primary-container font-bold uppercase block">Kyber-1024 Active Seed Parameters:</span>
              <p>Security Level: AES-256 equivalent</p>
              <p>Ciphertext size: 1,568 bytes</p>
              <p>Private Key size: 3,168 bytes</p>
              <p>Hardware Trust Module: HSM-FIPS-Level-4</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-4">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            No active threat vector or crypt-entropy leaks detected.
          </div>
        </div>

      </div>
    </div>
  );
}
