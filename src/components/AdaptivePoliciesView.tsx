import React, { useState } from "react";
import { 
  Check, 
  ShieldAlert, 
  Sliders, 
  Play, 
  HelpCircle, 
  Clock, 
  Lock, 
  Eye, 
  Activity, 
  UserCheck, 
  SlidersHorizontal 
} from "lucide-react";

interface PolicyRule {
  id: string;
  name: string;
  minRisk: number;
  maxRisk: number;
  outcome: string;
  priority: number;
  enabled: boolean;
  description: string;
}

export default function AdaptivePoliciesView() {
  const [simulationRisk, setSimulationRisk] = useState(45);
  const [policies, setPolicies] = useState<PolicyRule[]>([
    { id: "POL-01", name: "Standard Trust Allowed Access", minRisk: 0, maxRisk: 20, outcome: "Allow Session", priority: 1, enabled: true, description: "Normal operational baseline. Allow session propagation without MFA prompt." },
    { id: "POL-02", name: "MFA Authentication Step-Up", minRisk: 21, maxRisk: 40, outcome: "Require MFA", priority: 2, enabled: true, description: "Minor location anomaly detected. Trigger FIDO2 WebAuthn hardware token query." },
    { id: "POL-03", name: "Egress Compression Rate Limiting", minRisk: 41, maxRisk: 60, outcome: "Restrict Downloads", priority: 3, enabled: true, description: "Anomalous download speed. Enforce download rate limits & reject ZIP exports." },
    { id: "POL-04", name: "Privileged Database Isolation", minRisk: 61, maxRisk: 80, outcome: "Read Only Mode", priority: 4, enabled: true, description: "Significant command entropy variance. Restrict write/insert statement execution." },
    { id: "POL-05", name: "Zero Trust Active Session Quarantine", minRisk: 81, maxRisk: 100, outcome: "Block Session", priority: 5, enabled: true, description: "Extreme data exfiltration drift. Terminate active IAM sessions immediately." }
  ]);

  const [simulatedOutcome, setSimulatedOutcome] = useState("Restrict Downloads");

  const handleToggle = (id: string) => {
    setPolicies(prev => prev.map(p => {
      if (p.id === id) return { ...p, enabled: !p.enabled };
      return p;
    }));
  };

  const handleSimulate = (val: number) => {
    setSimulationRisk(val);
    const rule = policies.find(p => val >= p.minRisk && val <= p.maxRisk && p.enabled);
    setSimulatedOutcome(rule ? rule.outcome : "Allow (Fallback)");
  };

  const approvalWorkflowQueue = [
    { id: "APP-982", employee: "Rahul S.", requestedBy: "System SOAR", policyAffected: "POL-05 Block Session Override", status: "Awaiting CISO Signature", date: "Just now" },
    { id: "APP-911", employee: "Meera K.", requestedBy: "Private Banking Director", policyAffected: "POL-03 Download Rate Exemption", status: "Pending security review", date: "4h ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary-container" />
            Adaptive Zero-Trust Access Policies
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Real-time policy step-up thresholds linked directly to cognitive risk profiles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) - Policy Rules Board */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Adaptive Policy Ruleset Matrix
          </h3>

          <div className="space-y-3">
            {policies.map((p) => (
              <div 
                key={p.id} 
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  p.enabled ? "bg-[#0d1516]/20 border-outline-variant/20" : "bg-[#111827]/10 border-outline-variant/10 opacity-50"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-primary-container bg-primary-container/10 px-1.5 py-0.5 rounded uppercase font-bold">
                      Priority {p.priority}
                    </span>
                    <h4 className="text-sm font-bold text-on-surface">{p.name}</h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-xl">{p.description}</p>
                  
                  {/* Risk Bounds */}
                  <div className="text-[10px] font-mono text-on-surface-variant flex gap-3 pt-1">
                    <span>Score Bounds: <strong className="text-primary-container">{p.minRisk}–{p.maxRisk}</strong></span>
                    <span>Enforced Outcome: <strong className="text-error">{p.outcome}</strong></span>
                  </div>
                </div>

                {/* Enable / Disable toggle button */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleToggle(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      p.enabled ? "bg-primary-container/15 text-primary-container hover:bg-primary-container/20 border border-primary-container/25" : "bg-outline-variant/10 text-on-surface-variant border border-outline-variant/20"
                    }`}
                  >
                    {p.enabled ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3) - Policy Simulator & Approval workflows */}
        <div className="space-y-6">
          
          {/* Policy Simulator */}
          <div className="soc-card p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Play className="h-4 w-4 text-primary" />
              Dynamic Policy Simulator
            </h3>
            
            <p className="text-[11px] text-on-surface-variant">
              Drag the hazard score index simulator to observe real-time policy outcome shifts.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                <span>Simulated Risk Score</span>
                <span className={`font-bold ${simulationRisk > 70 ? "text-error" : "text-emerald-400"}`}>{simulationRisk} / 100</span>
              </div>

              <input 
                type="range" 
                min="0" 
                max="100" 
                value={simulationRisk}
                onChange={(e) => handleSimulate(Number(e.target.value))}
                className="w-full accent-primary"
              />

              <div className="bg-[#080f11] p-4 rounded-xl border border-outline-variant/20 text-center space-y-1">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Enforced Action Outcome</span>
                <div className="text-base font-black text-primary-container uppercase tracking-wide">
                  {simulatedOutcome}
                </div>
              </div>
            </div>
          </div>

          {/* Policy Approval Workflows */}
          <div className="soc-card p-5 space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              Override Signatures Queue
            </h3>

            <div className="space-y-3">
              {approvalWorkflowQueue.map((q) => (
                <div key={q.id} className="p-3 bg-[#080f11] rounded-xl border border-outline-variant/15 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-primary-container font-semibold">{q.id}</span>
                    <span className="text-on-surface-variant">{q.date}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{q.employee} — {q.policyAffected}</h4>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Requested by {q.requestedBy}</p>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-outline-variant/10 text-[10px] font-mono">
                    <span className="text-yellow-400 animate-pulse font-bold">{q.status}</span>
                    <button 
                      onClick={() => alert(`Reviewing override request ${q.id}`)}
                      className="text-primary-container hover:underline font-bold"
                    >
                      Process &gt;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
