import React, { useState } from "react";
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  Database, 
  RotateCcw, 
  Lock, 
  Save, 
  Key, 
  Users, 
  SlidersHorizontal, 
  BellRing, 
  Palette, 
  Workflow, 
  ShieldAlert 
} from "lucide-react";
import { SOCStats } from "../types";

interface SettingsViewProps {
  stats: SOCStats;
  setStats: React.Dispatch<React.SetStateAction<SOCStats>>;
  onResetIncidents: () => void;
}

type SettingTab = 
  | "Organization Settings" 
  | "RBAC" 
  | "Adaptive Policies" 
  | "AI Configuration" 
  | "Risk Thresholds" 
  | "Notification Rules" 
  | "Integrations" 
  | "API Keys" 
  | "Theme" 
  | "Security Preferences";

export default function SettingsView({ stats, setStats, onResetIncidents }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<SettingTab>("AI Configuration");
  const [temp, setTemp] = useState(0.7);
  const [selectedModel, setSelectedModel] = useState("gemini-3.5-flash");
  const [exfilLimit, setExfilLimit] = useState(4.8); // GB
  const [quantumMode, setQuantumMode] = useState("kyber_1024");
  const [mfaRetention, setMfaRetention] = useState(30); // days
  const [savedStatus, setSavedStatus] = useState(false);

  // Form states
  const [orgName, setOrgName] = useState("Global Trust Bank Corp");
  const [apiKeyVal, setApiKeyVal] = useState("••••••••••••••••••••••••••••••••");
  const [selectedTheme, setSelectedTheme] = useState("Cosmic Slate (Dark)");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
    }, 3000);

    setStats(prev => ({
      ...prev,
      aiAccuracy: temp > 0.8 ? "99.4%" : "99.8%"
    }));
  };

  const tabs: SettingTab[] = [
    "Organization Settings",
    "RBAC",
    "Adaptive Policies",
    "AI Configuration",
    "Risk Thresholds",
    "Notification Rules",
    "Integrations",
    "API Keys",
    "Theme",
    "Security Preferences"
  ];

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary-container" />
            AegisSOC Configuration Console
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Configure system rules, post-quantum key lengths, and neural thresholds
          </p>
        </div>

        <button 
          onClick={handleSaveSettings}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <Save className="h-3.5 w-3.5" />
          Apply Configurations
        </button>
      </div>

      {savedStatus && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 animate-pulse">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Settings successfully saved and propagated to all 4,591 cluster subnets!
        </div>
      )}

      {/* Main split tab workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left tabs list */}
        <div className="soc-card p-4 space-y-1.5">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide px-2 pb-2 border-b border-outline-variant/10">
            System Subsections
          </h3>
          <div className="space-y-1 pt-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTab === tab 
                    ? "bg-primary-container/10 border-l-2 border-primary-container text-primary-container font-bold" 
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.01]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right Tab Content Panel */}
        <div className="lg:col-span-3 soc-card p-6 min-h-[420px] flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-outline-variant/15">
              {activeTab === "AI Configuration" && <Cpu className="h-4 w-4 text-primary" />}
              {activeTab === "Organization Settings" && <Settings className="h-4 w-4 text-primary" />}
              {activeTab === "RBAC" && <Users className="h-4 w-4 text-primary" />}
              {activeTab === "Adaptive Policies" && <SlidersHorizontal className="h-4 w-4 text-primary" />}
              {activeTab === "Risk Thresholds" && <ShieldAlert className="h-4 w-4 text-primary" />}
              {activeTab === "Notification Rules" && <BellRing className="h-4 w-4 text-primary" />}
              {activeTab === "Integrations" && <Workflow className="h-4 w-4 text-primary" />}
              {activeTab === "API Keys" && <Key className="h-4 w-4 text-primary" />}
              {activeTab === "Theme" && <Palette className="h-4 w-4 text-primary" />}
              {activeTab === "Security Preferences" && <Lock className="h-4 w-4 text-primary" />}
              {activeTab} Parameters
            </h3>

            {/* TAB: Organization Settings */}
            {activeTab === "Organization Settings" && (
              <div className="space-y-4 text-xs font-mono text-on-surface-variant">
                <div className="space-y-2">
                  <label className="block">Global Corporate Entity Name</label>
                  <input 
                    type="text" 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg p-2.5 text-on-surface outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="block">Federated AD Integration Scope:</span>
                  <span className="text-primary-container font-bold block">gtbank.auth.internal</span>
                </div>
              </div>
            )}

            {/* TAB: RBAC */}
            {activeTab === "RBAC" && (
              <div className="space-y-4 text-xs font-mono text-on-surface-variant">
                <p>Enforce Role-Based Access controls based on standard NIST IAM models.</p>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-[#080f11] rounded border border-outline-variant/15">
                    <span>CISO Executive Profile:</span>
                    <span className="text-emerald-400 font-bold">Write / Read / Oversee</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#080f11] rounded border border-outline-variant/15">
                    <span>SOC Senior Analyst:</span>
                    <span className="text-emerald-400 font-bold">Write / Read</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#080f11] rounded border border-outline-variant/15">
                    <span>Internal Audit Team:</span>
                    <span className="text-[#00E5FF] font-bold">Read Only (RBI compliant)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Adaptive Policies */}
            {activeTab === "Adaptive Policies" && (
              <div className="space-y-4 text-xs font-mono text-on-surface-variant">
                <p>Configure default policy classes matching hazard thresholds.</p>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <span>Force biometric re-authentication step-up on unvetted subnets.</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <span>Isolate session immediately on EXFIL-09 exfiltration boundary breach.</span>
                </div>
              </div>
            )}

            {/* TAB: AI Configuration */}
            {activeTab === "AI Configuration" && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="text-on-surface-variant font-mono block">Threat Analysis Model</label>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg p-2 text-on-surface focus:border-primary-container outline-none"
                  >
                    <option value="gemini-3.5-flash">Gemini 3.5 Flash (Optimized Speed)</option>
                    <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Deep Analysis)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-on-surface-variant font-mono">
                    <label>Inference Weight Temperature</label>
                    <span>{temp}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.0" 
                    step="0.1"
                    value={temp}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                    className="w-full accent-primary-container h-1 bg-[#080f11] rounded-lg cursor-pointer"
                  />
                  <p className="text-[10px] text-on-surface-variant/70 font-mono leading-relaxed">
                    Lower values yield highly focused reports. Higher values suggest creative cross-network playbooks.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: Risk Thresholds */}
            {activeTab === "Risk Thresholds" && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-on-surface-variant font-mono">
                    <label>EXFIL-09 Limit (Egress Bounds)</label>
                    <span className="text-primary-container font-bold">{exfilLimit} GB</span>
                  </div>
                  <input 
                    type="range" 
                    min="1.0" 
                    max="20.0" 
                    step="0.5"
                    value={exfilLimit}
                    onChange={(e) => setExfilLimit(parseFloat(e.target.value))}
                    className="w-full accent-primary-container h-1 bg-[#080f11] rounded-lg cursor-pointer"
                  />
                  <p className="text-[10px] text-on-surface-variant/70 font-mono leading-relaxed">
                    Sessions automatically quarantine if exfiltration rate exceeds threshold over a 15 minute window.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: Notification Rules */}
            {activeTab === "Notification Rules" && (
              <div className="space-y-3 text-xs font-mono text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <span>Send instant Slack hook alerts on Critical (Severity &ge; 80) alarms.</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <span>Transmit signed night audit compilation reports to compliance officers.</span>
                </div>
              </div>
            )}

            {/* TAB: Integrations */}
            {activeTab === "Integrations" && (
              <div className="space-y-3 text-xs font-mono text-on-surface-variant">
                <div className="p-3 bg-[#080f11] rounded border border-outline-variant/15 flex justify-between items-center">
                  <span>CrowdStrike Falcon Endpoint Broker:</span>
                  <span className="text-emerald-400 font-bold">Connected</span>
                </div>
                <div className="p-3 bg-[#080f11] rounded border border-outline-variant/15 flex justify-between items-center">
                  <span>Splunk SIEM Ingress Pipeline:</span>
                  <span className="text-emerald-400 font-bold">Connected</span>
                </div>
              </div>
            )}

            {/* TAB: API Keys */}
            {activeTab === "API Keys" && (
              <div className="space-y-3 text-xs font-mono text-on-surface-variant">
                <label className="block">Active Enterprise Private Key Seed</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={apiKeyVal}
                    onChange={(e) => setApiKeyVal(e.target.value)}
                    className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg p-2.5 outline-none text-on-surface text-xs"
                  />
                </div>
                <p className="text-[10px] text-on-surface-variant/70 leading-relaxed">
                  Cryptographic private key used to seal JSON audit evidence envelopes. Managed securely inside FIPS HSM.
                </p>
              </div>
            )}

            {/* TAB: Theme */}
            {activeTab === "Theme" && (
              <div className="space-y-3 text-xs font-mono text-on-surface-variant">
                <label className="block">Active Interface Visual Preset</label>
                <select 
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg p-2 text-on-surface outline-none"
                >
                  <option value="Cosmic Slate (Dark)">Cosmic Slate (Dark Theme)</option>
                  <option value="Enterprise Light">Enterprise Light (Not Recommended)</option>
                </select>
              </div>
            )}

            {/* TAB: Security Preferences */}
            {activeTab === "Security Preferences" && (
              <div className="space-y-4 text-xs font-mono text-on-surface-variant">
                <div className="space-y-2">
                  <label className="block">Post-Quantum Key Encapsulation (KEM)</label>
                  <select 
                    value={quantumMode}
                    onChange={(e) => setQuantumMode(e.target.value)}
                    className="w-full bg-[#080f11] border border-outline-variant/30 rounded-lg p-2 text-on-surface outline-none"
                  >
                    <option value="kyber_1024">Kyber-1024 (Maximum Lattice Security)</option>
                    <option value="kyber_512">Kyber-512 (High Performance Standard)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label>Force Password Rotation Term</label>
                    <span>{mfaRetention} Days</span>
                  </div>
                  <input 
                    type="range" 
                    min="15" 
                    max="90" 
                    value={mfaRetention}
                    onChange={(e) => setMfaRetention(parseInt(e.target.value))}
                    className="w-full accent-primary-container h-1 bg-[#080f11] rounded-lg"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Sandbox Controls inside Settings footer */}
          <div className="border-t border-outline-variant/10 pt-4 mt-6 flex justify-between items-center">
            <span className="text-[9px] font-mono text-on-surface-variant">HSM Engine Version: 4.2-GA</span>
            <button 
              type="button"
              onClick={onResetIncidents}
              className="px-3 py-1.5 bg-outline-variant/20 border border-outline-variant/40 hover:bg-outline-variant/40 text-on-surface rounded font-mono text-[10px] hover:text-primary-container transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Simulation State
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
