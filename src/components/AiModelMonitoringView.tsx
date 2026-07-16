import React, { useState } from "react";
import { 
  Cpu, 
  CheckCircle2, 
  Download, 
  Sliders, 
  BarChart, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  Percent, 
  Activity 
} from "lucide-react";

export default function AiModelMonitoringView() {
  const [retraining, setRetraining] = useState(false);
  const [modelHash, setModelHash] = useState("AEGIS-NEURAL-v4.2.1-GA");

  const modelMetrics = {
    accuracy: 99.81,
    precision: 99.12,
    recall: 98.74,
    falsePositives: "0.02%",
    falseNegatives: "0.01%",
    modelDrift: "Optimal (0.04% drift)",
    retrainingStatus: "Idle - Dynamic Continuous Sync"
  };

  const handleRetraining = () => {
    setRetraining(true);
    setTimeout(() => {
      setRetraining(false);
      setModelHash("AEGIS-NEURAL-v4.2.2-GA-RECOMPILED");
      alert("Model retraining process executed successfully. Weight tensors verified and active on production subnets.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary-container" />
            AI Model Telemetry &amp; Performance Monitoring
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Real-time deep learning confusion matrix parameters, tensor distributions, and drift indicators
          </p>
        </div>

        <button 
          onClick={handleRetraining}
          disabled={retraining}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${retraining ? "animate-spin" : ""}`} />
          {retraining ? "Regenerating Tensors..." : "Trigger Model Retraining"}
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Model Identifier */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Active Deep Model</span>
          <div className="my-3 font-mono">
            <div className="text-xl font-black text-primary-container truncate">{modelHash}</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Multi-modal Bayesian Transformer</p>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded self-start border border-emerald-400/20">
            FIPS-Neural-Approved
          </span>
        </div>

        {/* Prediction Accuracy */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Inference Accuracy</span>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400">{modelMetrics.accuracy}%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Validated across 12M continuous logs</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[99.8%]"></div>
          </div>
        </div>

        {/* Precision & Recall */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Precision / Recall</span>
          <div className="my-3 font-mono">
            <div className="text-2xl font-black text-on-surface">{modelMetrics.precision}% <span className="text-xs text-on-surface-variant font-normal">/ {modelMetrics.recall}%</span></div>
            <p className="text-[10px] text-on-surface-variant mt-1">Gini coefficient bounds verified</p>
          </div>
          <div className="text-[10px] text-[#00E5FF] font-mono">
            Optimal target threshold met
          </div>
        </div>

        {/* Drift index */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">Concept Drift Ratio</span>
          <div className="my-3">
            <div className="text-2xl font-black text-emerald-400">{modelMetrics.modelDrift}</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Comparing 30-day decision weights</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[100%]"></div>
          </div>
        </div>

      </div>

      {/* Main confusion matrix and retraining layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Confusion matrix grid (2/3 size) */}
        <div className="lg:col-span-2 soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Model Inference Confusion Matrix
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#080f11] rounded-xl border border-outline-variant/15 text-center space-y-1">
              <span className="text-emerald-400 font-bold block uppercase text-[10px]">True Positives (Anomaly Detected)</span>
              <div className="text-2xl font-black text-on-surface">99.81%</div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">System triggered active SOAR isolate procedures correctly.</p>
            </div>

            <div className="p-4 bg-[#080f11] rounded-xl border border-outline-variant/15 text-center space-y-1">
              <span className="text-emerald-400 font-bold block uppercase text-[10px]">True Negatives (Allowed Standard Actions)</span>
              <div className="text-2xl font-black text-on-surface">99.96%</div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">Approved standard employee sessions resolved without steps.</p>
            </div>

            <div className="p-4 bg-[#080f11] rounded-xl border border-outline-variant/15 text-center space-y-1">
              <span className="text-yellow-400 font-bold block uppercase text-[10px]">False Positives (MFA Interrupted)</span>
              <div className="text-2xl font-black text-on-surface">{modelMetrics.falsePositives}</div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">Minor login location anomalies cleared immediately via FIDO2 key.</p>
            </div>

            <div className="p-4 bg-[#080f11] rounded-xl border border-outline-variant/15 text-center space-y-1">
              <span className="text-error font-bold block uppercase text-[10px]">False Negatives (Missed Threat Indicators)</span>
              <div className="text-2xl font-black text-on-surface">{modelMetrics.falseNegatives}</div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">Zero-day activities bypassed initially but captured inside window.</p>
            </div>
          </div>
        </div>

        {/* Drift Trend Chart */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-primary" />
              Dynamic Tensor Drift Graph
            </h3>

            {/* Custom SVG Drift lines */}
            <div className="h-32 relative flex items-end pt-4 bg-[#0a0e17]/40 rounded-lg p-2 border border-outline-variant/15">
              <svg className="w-full h-full stroke-primary fill-none" preserveAspectRatio="none" viewBox="0 0 100 50">
                <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="10" y2="10"></line>
                <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25"></line>
                <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="40" y2="40"></line>
                <path d="M0,45 Q20,44 40,42 T80,45 T100,43" strokeWidth="1.5" stroke="#00E5FF" fill="none"></path>
              </svg>
              <div className="absolute top-2 left-2 text-[8px] font-mono text-on-surface-variant bg-[#0A0E17]/80 px-1.5 py-0.5 rounded border border-outline-variant/10">
                Concept Stability Bound Mapping
              </div>
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Drift indicators compare real-time prediction variables against the standard training baseline parameters. Standard drift factor: 0.04% (optimal stability).
            </p>
          </div>

          <div className="text-[9px] font-mono text-on-surface-variant text-center border-t border-outline-variant/10 pt-3">
            Last model check complete 12 minutes ago.
          </div>
        </div>

      </div>
    </div>
  );
}
