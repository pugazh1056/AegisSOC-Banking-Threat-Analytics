import React, { useState } from "react";
import { 
  ShieldAlert, 
  Search, 
  Sliders, 
  HelpCircle, 
  TrendingUp, 
  Award, 
  DollarSign, 
  RefreshCw, 
  Share2, 
  CheckCircle, 
  FileText, 
  Users, 
  Activity, 
  AlertTriangle, 
  Briefcase, 
  Filter, 
  Info, 
  Zap, 
  ChevronRight, 
  Lock,
  Flame,
  Globe
} from "lucide-react";

// Structure of Fraud Alert / Transaction
interface AmlTransaction {
  id: string;
  sender: string;
  senderCountry: string;
  receiver: string;
  receiverCountry: string;
  amount: number;
  timestamp: string;
  riskScore: number;
  status: "Pending Investigation" | "Frozen" | "Cleared" | "SAR Filed";
  typology: string;
  layeringSteps: string[];
}

// Suspicious Activity Report (SAR) Template structure
interface SarDraft {
  transactionId: string;
  narrative: string;
  subjectName: string;
  filingDate: string;
  status: "Draft" | "Submitted" | "Generating";
}

export default function FraudAmlView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTxn, setSelectedTxn] = useState<AmlTransaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [sarDraft, setSarDraft] = useState<SarDraft | null>(null);
  const [activeTab, setActiveTab] = useState<"alerts" | "graph" | "rules" | "fincen">("alerts");
  
  // Simulated transaction dataset
  const [transactions, setTransactions] = useState<AmlTransaction[]>([
    {
      id: "TXN-8802",
      sender: "Siberian Timber Export LLC",
      senderCountry: "Russia (Sanctioned Gateway)",
      receiver: "Vertex Intermediary Holdings",
      receiverCountry: "Cyprus (Offshore)",
      amount: 2450000,
      timestamp: "2026-07-16 00:05:12",
      riskScore: 94,
      status: "Pending Investigation",
      typology: "Nested Layering via Shell Companies",
      layeringSteps: [
        "Origin: Siberian Timber Export LLC (RU) - $2.45M Transfer",
        "Layer 1: Vertex Intermediary Holdings (CY) - Currency conversion to EUR",
        "Layer 2: Horizon Capital Trust (UK) - Split into multiple smaller wires",
        "Destination: Apex Cayman Real Estate (KY) - Luxury property acquisition"
      ]
    },
    {
      id: "TXN-5412",
      sender: "Zheng Financial Corp Ltd",
      senderCountry: "Hong Kong",
      receiver: "Global Trust Retail Node 42",
      receiverCountry: "United States",
      amount: 145000,
      timestamp: "2026-07-15 23:18:41",
      riskScore: 81,
      status: "Frozen",
      typology: "High-Frequency Structuring (Smurfing)",
      layeringSteps: [
        "Origin: Zheng Financial (HK) - Multiple batches of $9,950 to bypass AML caps",
        "Layer 1: 15 individual sub-accounts registered at NY Digital Gateway",
        "Destination: Main retail node consolidation under single shell registration"
      ]
    },
    {
      id: "TXN-1092",
      sender: "Al-Miraj Trading Services",
      senderCountry: "United Arab Emirates",
      receiver: "Zenith Digital Exchange",
      receiverCountry: "Seychelles",
      amount: 870000,
      timestamp: "2026-07-15 22:45:00",
      riskScore: 78,
      status: "Pending Investigation",
      typology: "Rapid Trade-Based Money Laundering (TBML)",
      layeringSteps: [
        "Origin: Al-Miraj Trading (UAE) - Over-invoiced electronics shipment",
        "Layer 1: Trade ledger matching Zenith Digital wire of equivalent value",
        "Destination: Anonymous multi-sig hardware wallet address"
      ]
    },
    {
      id: "TXN-3011",
      sender: "Elena Rostova (PEP Tier-1)",
      senderCountry: "Ukraine",
      receiver: "Rostova Family Trust",
      receiverCountry: "Switzerland",
      amount: 1200000,
      timestamp: "2026-07-15 21:02:15",
      riskScore: 89,
      status: "Pending Investigation",
      typology: "Politically Exposed Person Asset Flight",
      layeringSteps: [
        "Origin: Elena Rostova (Daughter of regional minister)",
        "Layer 1: Swiss private bank custody transfer under premium trust framework",
        "Destination: Secured gold-backed bullion vault storage"
      ]
    },
    {
      id: "TXN-4019",
      sender: "Apex Global Consulting",
      senderCountry: "United States",
      receiver: "Neo-Tech Logistics LLC",
      receiverCountry: "Germany",
      amount: 65000,
      timestamp: "2026-07-15 18:44:30",
      riskScore: 42,
      status: "Cleared",
      typology: "Standard Corporate Ledger Clearing",
      layeringSteps: [
        "Origin: Client Invoice payout - standard ACH stream",
        "Destination: Corporate operating expenses account (DE)"
      ]
    }
  ]);

  // AI Sandbox states
  const [autoFreeze, setAutoFreeze] = useState(true);
  const [structuringDetector, setStructuringDetector] = useState(true);
  const [pepContinuousScan, setPepContinuousScan] = useState(true);
  const [quantumEncryptionLedger, setQuantumEncryptionLedger] = useState(true);

  // Triggering AI Deep-Scan Animation
  const handleTriggerAmlScan = () => {
    setLoading(true);
    setTimeout(() => {
      // Add a newly detected threat
      const newThreat: AmlTransaction = {
        id: `TXN-${Math.floor(Math.random() * 8000) + 2000}`,
        sender: "Volkov Cyber-Solutions Inc",
        senderCountry: "Bulgaria",
        receiver: "Decentralized Escrow SmartContract",
        receiverCountry: "Marshall Islands (Offshore)",
        amount: 3200000,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        riskScore: 97,
        status: "Pending Investigation",
        typology: "Automated Ransomware Ransom Laundering Loop",
        layeringSteps: [
          "Origin: Coerced payout from municipal infrastructure targets ($3.2M)",
          "Layer 1: Automated smart-contract batch splitting on privacy blockchain nodes",
          "Layer 2: Currency-tumbling network (Tornado-style protocol mix)",
          "Destination: Multi-currency crypto cashout gateway nodes"
        ]
      };
      setTransactions(prev => [newThreat, ...prev]);
      setLoading(false);
    }, 1500);
  };

  // SAR Generation using Gemini API proxy
  const handleGenerateSarReport = async (txn: AmlTransaction) => {
    setSarDraft({
      transactionId: txn.id,
      narrative: "Structuring initial report...",
      subjectName: txn.sender,
      filingDate: new Date().toLocaleDateString(),
      status: "Generating"
    });

    try {
      // Standard AI request utilizing the system's core /api/copilot API proxy
      const payload = {
        messages: [
          {
            sender: "user",
            text: `Generate an official, structured US FinCEN Suspicious Activity Report (SAR) narrative in highly technical banking-legal jargon for Transaction ID: ${txn.id}. 
Details:
- Sender Entity: ${txn.sender} (${txn.senderCountry})
- Receiver Entity: ${txn.receiver} (${txn.receiverCountry})
- Transaction Amount: $${txn.amount.toLocaleString()} USD
- Fraud Typology Identified: ${txn.typology}
- Process Flow: ${txn.layeringSteps.join(" -> ")}

Include:
1. Executive summary of suspicious activity.
2. Step-by-step transaction analysis outlining layering.
3. Recommended federal action and assets quarantine. Be concise and professional.`
          }
        ]
      };

      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      
      setSarDraft(prev => prev ? {
        ...prev,
        narrative: data.text,
        status: "Draft"
      } : null);
    } catch (err) {
      console.error("Error generating SAR narrative via AI proxy, using fallback:", err);
      // Fallback SAR narrative
      const fallbackNarrative = `### FinCEN SUSPICIOUS ACTIVITY REPORT (SAR-DRAFT)
**Filing Date:** ${new Date().toLocaleDateString()}
**Subject Entity:** ${txn.sender}
**Origin Jurisdiction:** ${txn.senderCountry}
**Counterparty:** ${txn.receiver} (${txn.receiverCountry})
**Value Flagged:** $${txn.amount.toLocaleString()} USD

---

#### 1. EXAMINER STATEMENT & BASIS OF SUSPICION
The Global Trust compliance network identified anomalous transactional patterns matching standard FinCEN layering typologies. Specifically, the subject has routed capital through multiple regional offshore legal regimes without clear commercial justification.

#### 2. DYNAMIC LAYERING STRUCTURE
1. **Initial Ledger Credit:** Funds credited under the entity name **${txn.sender}**.
2. **Intermediate Layering:** Capital split and converted across cross-border sub-accounts to obfuscate origin.
3. **Asset Acquisition Phase:** Final destination is verified as **${txn.receiver}** over non-standard settlement channels.

#### 3. PREVENTATIVE REMEDIAL ACTIONS
- Freeze all active sub-accounts linked to the client's master corporate entity.
- Flag the beneficial owners (UBOs) in the continuous World-Check PEP databases.
- Submit final XML format report to FinCEN systems under Urgent Code [TBML-09].`;

      setSarDraft(prev => prev ? {
        ...prev,
        narrative: fallbackNarrative,
        status: "Draft"
      } : null);
    }
  };

  const handleFreezeTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "Frozen" as const } : t));
    if (selectedTxn && selectedTxn.id === id) {
      setSelectedTxn(prev => prev ? { ...prev, status: "Frozen" as const } : null);
    }
  };

  const handleClearTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: "Cleared" as const } : t));
    if (selectedTxn && selectedTxn.id === id) {
      setSelectedTxn(prev => prev ? { ...prev, status: "Cleared" as const } : null);
    }
  };

  const handleSubmitSar = () => {
    if (!sarDraft) return;
    
    // Update transaction state
    const targetId = sarDraft.transactionId;
    setTransactions(prev => prev.map(t => t.id === targetId ? { ...t, status: "SAR Filed" as const } : t));
    if (selectedTxn && selectedTxn.id === targetId) {
      setSelectedTxn(prev => prev ? { ...prev, status: "SAR Filed" as const } : null);
    }

    setSarDraft(prev => prev ? { ...prev, status: "Submitted" as const } : null);
  };

  // Filtered transactions list
  const filteredTxns = transactions.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.typology.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary-container" />
            AI-Driven Fraud &amp; AML Monitor (Cognitive Compliance Hub)
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Continuous real-time anti-money laundering, PEP tracing, structured transfer sweeps &amp; automated SAR drafting
          </p>
        </div>

        <button 
          onClick={handleTriggerAmlScan}
          disabled={loading}
          className="bg-primary-container text-on-primary-fixed hover:bg-primary-fixed px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/10 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Scanning Swifts..." : "Trigger AI AML Scan"}
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-[#1f2937]/80 gap-1 overflow-x-auto">
        <button 
          onClick={() => { setActiveTab("alerts"); setSarDraft(null); }}
          className={`px-4 py-2.5 font-mono text-xs font-semibold transition-all border-b-2 cursor-pointer ${activeTab === "alerts" ? "border-primary-container text-primary-container" : "border-transparent text-on-surface-variant hover:text-on-surface"}`}
        >
          Interactive Alert Queue
        </button>
        <button 
          onClick={() => { setActiveTab("graph"); setSarDraft(null); }}
          className={`px-4 py-2.5 font-mono text-xs font-semibold transition-all border-b-2 cursor-pointer ${activeTab === "graph" ? "border-primary-container text-primary-container" : "border-transparent text-on-surface-variant hover:text-on-surface"}`}
        >
          Money Laundering Flow Graph (SVG)
        </button>
        <button 
          onClick={() => { setActiveTab("rules"); setSarDraft(null); }}
          className={`px-4 py-2.5 font-mono text-xs font-semibold transition-all border-b-2 cursor-pointer ${activeTab === "rules" ? "border-primary-container text-primary-container" : "border-transparent text-on-surface-variant hover:text-on-surface"}`}
        >
          Automated SOAR Safeguards
        </button>
      </div>

      {/* Headline Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="soc-card p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-primary-container" />
            Monitored Swifts (Daily)
          </span>
          <div className="my-2.5">
            <div className="text-2xl font-black text-on-surface">$142,850,200</div>
            <p className="text-[10px] text-emerald-400 mt-0.5">▲ +12% vs. Historic Average</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full w-[85%]"></div>
          </div>
        </div>

        <div className="soc-card p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1">
            <Flame className="h-3 w-3 text-error" />
            Unresolved AML Flags
          </span>
          <div className="my-2.5">
            <div className="text-2xl font-black text-error">
              {transactions.filter(t => t.status === "Pending Investigation").length}
            </div>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Continuous Risk Priority Level: HIGH</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-error h-full w-[60%]"></div>
          </div>
        </div>

        <div className="soc-card p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1">
            <Activity className="h-3 w-3 text-primary-container" />
            AI Compliance Index
          </span>
          <div className="my-2.5">
            <div className="text-2xl font-black text-emerald-400">99.85%</div>
            <p className="text-[10px] text-on-surface-variant mt-0.5">90-Day False Positive Threshold Margin</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[99.85%]"></div>
          </div>
        </div>

        <div className="soc-card p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-on-surface-variant uppercase flex items-center gap-1">
            <FileText className="h-3 w-3 text-primary-container" />
            SAR Filing Pipeline
          </span>
          <div className="my-2.5">
            <div className="text-2xl font-black text-amber-400">
              {transactions.filter(t => t.status === "SAR Filed").length} Submitted
            </div>
            <p className="text-[10px] text-on-surface-variant mt-0.5">Secure XML FinCEN Direct Gateway</p>
          </div>
          <div className="w-full bg-[#080f11] h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full w-[45%]"></div>
          </div>
        </div>
      </div>

      {/* Main Tab Contents */}
      {activeTab === "alerts" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Alerts List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="soc-card p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1f2937]/50 pb-4">
                <h3 className="text-xs font-bold text-primary font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-primary-container" />
                  Filter Flagged SWIFT Ledger
                </h3>
                
                <div className="relative w-full sm:w-64">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, Entity, Typology..."
                    className="w-full bg-[#080f11] border border-[#1f2937] rounded-lg pl-8 pr-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary-container"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-on-surface-variant" />
                </div>
              </div>

              {/* Transactions List */}
              <div className="divide-y divide-[#1f2937]/30 max-h-[500px] overflow-y-auto custom-scrollbar pr-1 mt-3">
                {filteredTxns.length === 0 ? (
                  <div className="p-8 text-center text-xs text-on-surface-variant">
                    No matching suspicious activity flagged. Run a new SWIFT scan.
                  </div>
                ) : (
                  filteredTxns.map((txn) => (
                    <div 
                      key={txn.id}
                      onClick={() => { setSelectedTxn(txn); setSarDraft(null); }}
                      className={`p-3.5 transition-all cursor-pointer rounded-xl hover:bg-white/[0.02] flex items-center justify-between gap-4 mt-2 ${selectedTxn?.id === txn.id ? "bg-[#111827]/80 border border-primary-container/20" : "border border-transparent"}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black font-mono text-on-surface">{txn.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                            txn.riskScore >= 90 ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                            txn.riskScore >= 75 ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            Risk Index: {txn.riskScore}%
                          </span>
                          
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-semibold ${
                            txn.status === "Frozen" ? "bg-red-500/10 text-red-400" :
                            txn.status === "Cleared" ? "bg-emerald-500/10 text-emerald-400" :
                            txn.status === "SAR Filed" ? "bg-amber-500/10 text-amber-400" :
                            "bg-blue-500/10 text-blue-400"
                          }`}>
                            {txn.status}
                          </span>
                        </div>
                        
                        <div className="text-xs text-on-surface-variant flex items-center gap-1">
                          <span className="font-semibold text-on-surface">{txn.sender}</span>
                          <span className="text-slate-500">to</span>
                          <span className="font-semibold text-on-surface">{txn.receiver}</span>
                        </div>

                        <div className="text-[11px] font-mono text-primary-container/80 flex items-center gap-1 mt-0.5">
                          <Globe className="h-3 w-3 inline" /> {txn.typology}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-black font-mono text-on-surface">
                          ${txn.amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                          {txn.timestamp}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Detailed Forensic / SAR Generation Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {selectedTxn ? (
              <div className="soc-card p-5 space-y-4">
                <div className="flex justify-between items-start border-b border-[#1f2937]/50 pb-4">
                  <div>
                    <h3 className="text-xs font-bold text-primary font-mono uppercase">
                      AI Compliance Diagnosis
                    </h3>
                    <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                      Flag ID: {selectedTxn.id}
                    </p>
                  </div>
                  
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                    selectedTxn.riskScore >= 90 ? "bg-red-500/20 text-red-300" : "bg-amber-500/20 text-amber-300"
                  }`}>
                    Risk Index: {selectedTxn.riskScore}%
                  </span>
                </div>

                {/* Core diagnosis details */}
                <div className="space-y-3.5 text-xs">
                  <div className="bg-[#080f11] p-3 rounded-xl border border-[#1f2937] space-y-2">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Typology Flagged</span>
                    <div className="font-bold text-on-surface flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      {selectedTxn.typology}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#080f11]/50 p-2.5 rounded-lg border border-[#1f2937]/60">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Sender Jurisdiction</span>
                      <span className="font-semibold text-on-surface">{selectedTxn.senderCountry}</span>
                    </div>
                    <div className="bg-[#080f11]/50 p-2.5 rounded-lg border border-[#1f2937]/60">
                      <span className="text-[9px] font-mono text-slate-500 uppercase block">Receiver Jurisdiction</span>
                      <span className="font-semibold text-on-surface">{selectedTxn.receiverCountry}</span>
                    </div>
                  </div>

                  {/* Flow Steps */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Trace Flow Steps</span>
                    <div className="space-y-1.5 pl-1.5 border-l border-primary-container/20">
                      {selectedTxn.layeringSteps.map((step, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-[11px] text-on-surface-variant">
                          <span className="font-mono text-primary-container select-none mt-0.5">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-[#1f2937]/50 space-y-3">
                    <div className="flex gap-2.5">
                      <button 
                        onClick={() => handleFreezeTransaction(selectedTxn.id)}
                        disabled={selectedTxn.status === "Frozen" || selectedTxn.status === "SAR Filed"}
                        className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white py-2 rounded-lg font-mono text-[10px] font-bold tracking-wider transition-all cursor-pointer"
                      >
                        Freeze Asset Accounts
                      </button>
                      <button 
                        onClick={() => handleClearTransaction(selectedTxn.id)}
                        disabled={selectedTxn.status === "Cleared" || selectedTxn.status === "SAR Filed"}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white py-2 rounded-lg font-mono text-[10px] font-bold tracking-wider transition-all cursor-pointer"
                      >
                        Clear Transaction
                      </button>
                    </div>

                    <button 
                      onClick={() => handleGenerateSarReport(selectedTxn)}
                      disabled={selectedTxn.status === "SAR Filed"}
                      className="w-full bg-primary-container hover:bg-primary-fixed text-on-primary-fixed py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-primary-container/5 disabled:opacity-40"
                    >
                      <Zap className="h-4 w-4" />
                      Draft Suspicious Activity Report (SAR) via AI
                    </button>
                  </div>
                </div>

                {/* SAR Generator Frame */}
                {sarDraft && (
                  <div className="bg-[#080f11] border border-outline-variant/30 rounded-xl p-4 space-y-3 mt-4 animate-scale-up">
                    <div className="flex justify-between items-center border-b border-[#1f2937]/80 pb-2">
                      <span className="text-[10px] font-mono text-primary-container font-black flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        FINCEN SAR FORM DRAFT
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        sarDraft.status === "Generating" ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"
                      }`}>
                        {sarDraft.status}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono space-y-1.5">
                      <div className="text-slate-400">
                        <span className="font-bold text-on-surface">Subject Entity:</span> {sarDraft.subjectName}
                      </div>
                      <div className="text-slate-400">
                        <span className="font-bold text-on-surface">Filing System:</span> US FinCEN direct API
                      </div>
                    </div>

                    <div className="bg-black/40 border border-[#1f2937] p-3 rounded-lg text-[11px] font-mono text-slate-300 max-h-48 overflow-y-auto custom-scrollbar whitespace-pre-wrap leading-relaxed">
                      {sarDraft.status === "Generating" ? (
                        <div className="flex flex-col items-center justify-center py-6 gap-2">
                          <RefreshCw className="h-5 w-5 animate-spin text-primary-container" />
                          <span>AI is drafting legal narrative report...</span>
                        </div>
                      ) : (
                        sarDraft.narrative
                      )}
                    </div>

                    {sarDraft.status !== "Generating" && (
                      <div className="flex gap-2 justify-end pt-2 border-t border-[#1f2937]/50">
                        <button 
                          onClick={() => setSarDraft(null)}
                          className="px-3 py-1.5 border border-[#1f2937] hover:border-outline text-on-surface-variant hover:text-on-surface rounded-lg font-mono text-[10px]"
                        >
                          Discard
                        </button>
                        <button 
                          onClick={handleSubmitSar}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-lg font-mono text-[10px] flex items-center gap-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Submit to FinCEN Gateway
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="soc-card p-8 text-center text-xs text-on-surface-variant flex flex-col items-center justify-center h-full gap-2">
                <Info className="h-8 w-8 text-slate-600" />
                <span>Select a SWIFT transaction from the list to analyze its money laundering route and generate legal AML reports with AI.</span>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Graph Tab */}
      {activeTab === "graph" && (
        <div className="soc-card p-5 space-y-4">
          <div className="border-b border-[#1f2937]/50 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-xs font-bold text-primary font-mono uppercase tracking-wider">
                Coordinated Money Laundering Networks (SVG Nodes)
              </h3>
              <p className="text-[10px] text-on-surface-variant font-mono">
                Interactive relational graph mapping cyclic transactions, nested shell layers, and PEP trusts. Click nodes to trace wire channels.
              </p>
            </div>
            <div className="text-[10px] font-mono text-primary-container flex items-center gap-1 bg-primary-container/10 border border-primary-container/20 px-2.5 py-1 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
              </span>
              <span>1 Live Network Anomalies Found</span>
            </div>
          </div>

          <div className="bg-[#080f11] rounded-2xl border border-[#1f2937] p-4 relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 min-h-[420px]">
            {/* Legend / Info box absolute */}
            <div className="absolute top-4 left-4 bg-[#111827]/90 border border-[#1f2937] p-3 rounded-lg text-[10px] font-mono space-y-1.5 z-10 max-w-xs">
              <div className="font-bold text-on-surface border-b border-[#1f2937] pb-1.5 mb-1.5">GRAPH LEGEND</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span>Sanctioned Endpoint (Critical)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span>Offshore Intermediary (Layer 1-2)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span>
                <span>Source / PEP Initiator (Origin)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span>Cleared Banking Hubs</span>
              </div>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="flex-1 w-full h-[350px] relative">
              <svg viewBox="0 0 600 350" className="w-full h-full">
                {/* Connecting lines / wires */}
                {/* Siberian Timber -> Vertex (CY) */}
                <path d="M 120 180 Q 210 100 300 130" fill="none" stroke="#fec931" strokeWidth="2.5" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
                {/* Vertex -> Horizon (UK) */}
                <path d="M 300 130 Q 390 100 480 160" fill="none" stroke="#fec931" strokeWidth="2" strokeDasharray="5,5" />
                {/* Al-Miraj -> Zenith (UAE to Seychelles) */}
                <path d="M 160 270 Q 280 280 400 250" fill="none" stroke="#00e5ff" strokeWidth="2" strokeDasharray="3,3" />
                {/* Zenith -> Anonymous Multicig */}
                <path d="M 400 250 Q 480 230 480 160" fill="none" stroke="#ffb4ab" strokeWidth="3" />
                {/* Siberian Timber -> Anonymous Multicig direct (anomaly bypass) */}
                <path d="M 120 180 Q 300 220 480 160" fill="none" stroke="#ffb4ab" strokeWidth="2.5" strokeDasharray="4,4" />

                {/* Nodes representing financial entities */}
                {/* 1. Siberian Timber Export (RU) */}
                <g className="cursor-pointer group">
                  <circle cx="120" cy="180" r="24" fill="#0d1516" stroke="#ffb4ab" strokeWidth="3" className="hover:scale-105 transition-all" />
                  <text x="120" y="185" textAnchor="middle" fill="#ffb4ab" fontSize="9" fontWeight="bold" fontFamily="monospace">Siberian RU</text>
                  <title>Siberian Timber Export LLC&#10;Jurisdiction: Russia (Sanctioned)&#10;Total Volume: $2.45M</title>
                </g>

                {/* 2. Vertex Intermediary (CY) */}
                <g className="cursor-pointer group">
                  <circle cx="300" cy="130" r="20" fill="#0d1516" stroke="#fec931" strokeWidth="2.5" />
                  <text x="300" y="134" textAnchor="middle" fill="#ffeac0" fontSize="8" fontWeight="bold" fontFamily="monospace">Vertex CY</text>
                  <title>Vertex Intermediary Holdings&#10;Jurisdiction: Cyprus&#10;Transferred: $2.45M (Split EUR)</title>
                </g>

                {/* 3. Horizon Capital (UK) */}
                <g className="cursor-pointer group">
                  <circle cx="480" cy="160" r="22" fill="#0d1516" stroke="#ffb4ab" strokeWidth="3" />
                  <text x="480" y="164" textAnchor="middle" fill="#ffb4ab" fontSize="8" fontWeight="bold" fontFamily="monospace">Apex Cay</text>
                  <title>Apex Cayman Real Estate&#10;Jurisdiction: Cayman Islands (Tax Haven)&#10;Suspicion: Coordinated Luxury Asset Flight</title>
                </g>

                {/* 4. Al-Miraj Trading (UAE) */}
                <g className="cursor-pointer group">
                  <circle cx="160" cy="270" r="18" fill="#0d1516" stroke="#00e5ff" strokeWidth="2" />
                  <text x="160" y="273" textAnchor="middle" fill="#dce4e5" fontSize="8" fontWeight="bold" fontFamily="monospace">Miraj UAE</text>
                  <title>Al-Miraj Trading Services&#10;Jurisdiction: UAE&#10;Suspicion: Over-invoiced shipping transactions</title>
                </g>

                {/* 5. Zenith Digital (Seychelles) */}
                <g className="cursor-pointer group">
                  <circle cx="400" cy="250" r="18" fill="#0d1516" stroke="#ffeac0" strokeWidth="2" />
                  <text x="400" y="253" textAnchor="middle" fill="#dce4e5" fontSize="8" fontWeight="bold" fontFamily="monospace">Zenith SC</text>
                  <title>Zenith Digital Exchange&#10;Jurisdiction: Seychelles&#10;Status: Flagged offshore trade</title>
                </g>
              </svg>
            </div>

            {/* Right node detail explanation */}
            <div className="w-full lg:w-72 bg-[#111827] border border-[#1f2937] rounded-xl p-4 space-y-3 shrink-0 text-xs">
              <span className="text-[10px] font-mono text-primary-container font-black uppercase block">Relational Flow Diagnosis</span>
              <div className="space-y-2">
                <div className="font-bold text-on-surface">Active Fraud Ring Pattern detected:</div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  The graph highlights **Siberian Timber Export (RU)** distributing structured multi-million dollar funds via intermediate offshore holding corporations (**Vertex CY**) to finalize land transfers in tax havens.
                </p>
                <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] text-red-400 font-mono">
                  <strong>SYSTEM WARNING:</strong> Direct capital bypass channel detected aiming to circumvent EU/US sanction compliance protocols on corporate SWIFTs.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === "rules" && (
        <div className="soc-card p-5 space-y-5">
          <div className="border-b border-[#1f2937]/50 pb-3">
            <h3 className="text-xs font-bold text-primary font-mono uppercase tracking-wider">
              Autonomous SOAR Guardrails &amp; AML Triggers
            </h3>
            <p className="text-[10px] text-on-surface-variant font-mono">
              Configure deep learning behavioral parameters that trigger immediate automatic asset freezes, PEP blocks, and institutional audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Left Box: Active Policies */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#080f11] rounded-xl border border-[#1f2937] transition-colors hover:border-primary-container/20">
                <div className="space-y-1 pr-4">
                  <span className="font-bold text-on-surface block">Automated Transaction Freezes</span>
                  <p className="text-[11px] text-on-surface-variant">
                    Automatically freeze assets and wires exceeding $100,000 originating from or routing through heavily sanctioned geolocations.
                  </p>
                </div>
                <input 
                  type="checkbox"
                  checked={autoFreeze}
                  onChange={(e) => setAutoFreeze(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#080f11] rounded-xl border border-[#1f2937] transition-colors hover:border-primary-container/20">
                <div className="space-y-1 pr-4">
                  <span className="font-bold text-on-surface block">Structuring &amp; Smurfing Detector</span>
                  <p className="text-[11px] text-on-surface-variant">
                    Deploy machine learning neural models to scan for high-frequency low-amount transfers ($9k-$9.9k) intended to evade FinCEN reporting limits.
                  </p>
                </div>
                <input 
                  type="checkbox"
                  checked={structuringDetector}
                  onChange={(e) => setStructuringDetector(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#080f11] rounded-xl border border-[#1f2937] transition-colors hover:border-primary-container/20">
                <div className="space-y-1 pr-4">
                  <span className="font-bold text-on-surface block">Continuous PEP Checking</span>
                  <p className="text-[11px] text-on-surface-variant">
                    Execute real-time World-Check integration scanning beneficial ownerships (UBO) against regional PEP registers.
                  </p>
                </div>
                <input 
                  type="checkbox"
                  checked={pepContinuousScan}
                  onChange={(e) => setPepContinuousScan(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer shrink-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#080f11] rounded-xl border border-[#1f2937] transition-colors hover:border-primary-container/20">
                <div className="space-y-1 pr-4">
                  <span className="font-bold text-on-surface block">Post-Quantum Cryptographic Ledger Guard</span>
                  <p className="text-[11px] text-on-surface-variant">
                    Encrypt offshore transfer ledger values with Kyber lattice envelope cryptography to secure transaction audits.
                  </p>
                </div>
                <input 
                  type="checkbox"
                  checked={quantumEncryptionLedger}
                  onChange={(e) => setQuantumEncryptionLedger(e.target.checked)}
                  className="w-5 h-5 accent-primary-container cursor-pointer shrink-0"
                />
              </div>
            </div>

            {/* Right Box: Simulation Sandbox */}
            <div className="soc-card p-5 space-y-3.5">
              <span className="text-[10px] font-mono text-primary-container font-black uppercase block">Compliance Simulation Center</span>
              <div className="space-y-3 leading-relaxed">
                <p>
                  Deploy custom stress-testing simulations to verify how fast the **SentinelAI SOAR playbooks** respond to massive, coordinated financial laundering events.
                </p>
                <div className="bg-[#080f11] p-3 rounded-lg border border-[#1f2937] text-[11px] space-y-1.5 font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span>Active Gateway:</span>
                    <span className="text-emerald-400">FinCEN REST Direct API v4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto-Defense Status:</span>
                    <span className="text-primary-container">Auto-Revocation active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Action Speed:</span>
                    <span className="text-emerald-400">1.4 seconds mean response</span>
                  </div>
                </div>
                <button 
                  onClick={() => alert("Simulation test started. 450 simulated smurf accounts injected. Verification report generated under Reports tab.")}
                  className="w-full bg-[#151d1e]/15 border border-[#1f2937] hover:border-primary-container/30 text-on-surface py-2 rounded-lg font-mono text-xs transition-colors cursor-pointer"
                >
                  Run Compliance Stress Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
