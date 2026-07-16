import React, { useState } from "react";
import { 
  Cpu, 
  Settings, 
  BarChart, 
  ShieldAlert, 
  Sliders, 
  Percent, 
  RefreshCw, 
  HelpCircle,
  TrendingUp,
  Award
} from "lucide-react";

export default function AiRiskEngineView() {
  const [learningConfidence, setLearningConfidence] = useState(99.4);
  const [selectedThreshold, setSelectedThreshold] = useState(75);
  const [deviceWeight, setDeviceWeight] = useState(30);
  const [locationWeight, setLocationWeight] = useState(20);
  const [behaviorWeight, setBehaviorWeight] = useState(50);

  const featuresImportance = [
    { name: "Dynamic Egress File Volume", weight: 48, category: "Behavioral" },
    { name: "Unusual SQL Statement Entropy", weight: 26, category: "Application" },
    { name: "Impossible Travel Shift (VPN IP)", weight: 15, category: "Geographic" },
    { name: "Operating Hours Boundary Drift", weight: 11, category: "Temporal" }
  ];

  const handleUpdateWeights = () => {
    alert("AI Cognitive risk neural weights updated successfully in live model stream.");
  };

  return (
    <div className="space-y-6">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary-container" />
            AI Decision Risk Engine (Cognitive Neural Model)
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Transparent deep-learning inference weights, feature importance &amp; threshold control
          </p>
        </div>

        <button 
          onClick={handleUpdateWeights}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10"
        >
          <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
          Update Live Weights
        </button>
      </div>

      {/* Grid of AI telemetry metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Prediction Accuracy */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Model Prediction Accuracy</span>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400">99.81%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Validated on 12.8M continuous telemetry runs</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[99.8%]"></div>
          </div>
        </div>

        {/* AI Confidence Dial */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Inference Mean Confidence</span>
          <div className="my-3">
            <div className="text-3xl font-black text-primary-container">{learningConfidence}%</div>
            <p className="text-[10px] text-on-surface-variant mt-1">Strict Bayesian probability thresholds</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full" style={{ width: `${learningConfidence}%` }}></div>
          </div>
        </div>

        {/* Anomaly Score Threshold */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Global Block Threshold</span>
          <div className="my-3 flex items-baseline gap-2">
            <div className="text-3xl font-black text-error">{selectedThreshold}</div>
            <span className="text-xs text-on-surface-variant">Score Severity</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="95" 
            value={selectedThreshold}
            onChange={(e) => setSelectedThreshold(Number(e.target.value))}
            className="w-full accent-error"
          />
        </div>

        {/* Historical Trust Score baseline */}
        <div className="soc-card p-5 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase">Historical Trust score</span>
          <div className="my-3">
            <div className="text-3xl font-black text-emerald-400">99.12<span className="text-xs text-on-surface-variant">/100</span></div>
            <p className="text-[10px] text-on-surface-variant mt-1">Mean user compliance rating (RBI Audited)</p>
          </div>
          <div className="w-full bg-[#080f11] h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[99.1%]"></div>
          </div>
        </div>

      </div>

      {/* Weights and feature importance section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Formula & Slider Control */}
        <div className="soc-card p-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-primary" />
              Dynamic Risk Matrix Weight Formula
            </h3>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Customize real-time weight factors in global hazard calculations</p>
          </div>

          <div className="space-y-4">
            {/* Behavior slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-on-surface-variant">
                <span>Core Behavioral Drift</span>
                <span className="text-primary font-bold">{behaviorWeight}%</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="70" 
                value={behaviorWeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBehaviorWeight(val);
                  // Balance out others
                  const remaining = 100 - val;
                  setDeviceWeight(Math.round(remaining * 0.6));
                  setLocationWeight(Math.round(remaining * 0.4));
                }}
                className="w-full accent-primary"
              />
            </div>

            {/* Device Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-on-surface-variant">
                <span>Hardware Trust Weight</span>
                <span className="text-tertiary-container font-bold">{deviceWeight}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                value={deviceWeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDeviceWeight(val);
                  const remaining = 100 - val;
                  setBehaviorWeight(Math.round(remaining * 0.7));
                  setLocationWeight(Math.round(remaining * 0.3));
                }}
                className="w-full accent-tertiary-container"
              />
            </div>

            {/* Location Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-on-surface-variant">
                <span>Location Trust Weight</span>
                <span className="text-emerald-400 font-bold">{locationWeight}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                value={locationWeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLocationWeight(val);
                  const remaining = 100 - val;
                  setBehaviorWeight(Math.round(remaining * 0.7));
                  setDeviceWeight(Math.round(remaining * 0.3));
                }}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>

          <div className="bg-[#080f11] p-3 rounded-lg text-[10px] font-mono text-on-surface-variant leading-relaxed">
            <span className="font-bold text-primary-container">RISK_FORMULA_v4:</span> Risk = (B * {behaviorWeight / 100}) + (D * {deviceWeight / 100}) + (L * {locationWeight / 100}). Block on threshold &ge; {selectedThreshold}.
          </div>
        </div>

        {/* Feature Importance weights (Middle card) */}
        <div className="soc-card p-5 space-y-4 lg:col-span-2">
          <div>
            <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide flex items-center gap-1.5">
              <BarChart className="h-4 w-4 text-primary-container" />
              Model Feature Importance (Bayesian Gini Weights)
            </h3>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Primary telemetry markers weighted during active database query analysis</p>
          </div>

          <div className="space-y-3.5">
            {featuresImportance.map((f, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-mono text-on-surface-variant">
                  <span className="text-on-surface font-semibold">{f.name}</span>
                  <div className="flex gap-2 text-[10px]">
                    <span className="text-[#00E5FF]">{f.category}</span>
                    <span className="text-primary-container font-bold">{f.weight}% Weight</span>
                  </div>
                </div>
                <div className="w-full bg-[#080f11] h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full" style={{ width: `${f.weight}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-outline-variant/10 pt-3 text-[10px] text-on-surface-variant font-mono flex items-center gap-1.5 justify-between">
            <span>Precision: 99.1% | Recall: 98.7%</span>
            <span>SHAP / LIME explanation packages loaded</span>
          </div>
        </div>

      </div>
    </div>
  );
}
