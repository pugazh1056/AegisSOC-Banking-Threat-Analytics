import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Server, 
  Grid, 
  Lock, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Loader2,
  AlertCircle
} from "lucide-react";
import { ChatMessage, SystemStatus } from "../types";

export default function CopilotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "user",
      text: "Why was Rahul blocked?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: "2",
      sender: "ai",
      text: "Rahul S. was automatically blocked due to anomalous activity patterns detected culminating at **11:58 PM UTC**, triggering our autonomous SOAR directive **[EXFIL-09]** with a **96% Risk Score**.\n\n### Critical Triggers:\n- **SSO Login Location Anomaly:** SSO credentials used via a Russian (VPN-RU) subnet at 11:45 PM while other active endpoints registered regional home office states.\n- **PII Database Harvesting:** Queried highly restricted consumer backup records in table \`Customer_PII_Q3\` out-of-schedule baseline.\n- **High-Velocity Data Transfer:** Exfiltrated **4.8 GB of encrypted database backups** (approx. 12,000 files) to an unvetted remote IP address within 5 minutes.\n- **Workstation Physical Breach:** An unregistered USB mass storage device (Kingston 128GB) was registered on device MAC-ENG-892 at 11:55 PM.",
      timestamp: new Date(Date.now() - 280000)
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeMitre, setActiveMitre] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const affectedSystems: SystemStatus[] = [
    { name: "Customer_DB_Primary", status: "critical" },
    { name: "Internal_VPN_Gateway", status: "warning" },
    { name: "Active_Directory_Auth", status: "success" }
  ];

  const mitreTactics = [
    { id: "recon", name: "Recon", desc: "Gathering banking endpoint configurations", status: "normal" },
    { id: "init_access", name: "Initial Access", desc: "Valid credential abuse via Moscow VPN", status: "compromised" },
    { id: "execution", name: "Execution", desc: "Direct table extraction queries", status: "normal" },
    { id: "persistence", name: "Persistence", desc: "Simultaneous session maintenance", status: "normal" },
    { id: "priv_esc", name: "Priv Esc", desc: "DBA administrative privileges exercised", status: "warning" },
    { id: "defense_ev", name: "Defense Ev", desc: "SSO obfuscation attempts", status: "normal" },
    { id: "cred_access", name: "Cred Access", desc: "Potential administrative credential harvest", status: "compromised" },
    { id: "discovery", name: "Discovery", desc: "Database table scanning", status: "normal" },
    { id: "lat_move", name: "Lat Move", desc: "Inter-segment server hops", status: "normal" }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const chatHistory = [...messages, userMsg];
      
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error("Server communication issue");
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.text,
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error("AI Copilot request failed:", err);
      // Fallback fallback response to keep user flows intact
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "### Technical Error: Secure Routing Degraded\n\nI am experiencing difficulty reaching the live cloud analysis servers. \n\n**Incident INC-9921 Offline Assessment:**\n- Rahul S.'s session isolation under policy **[EXFIL-09]** remains fully operational. \n- Data exfiltration of **4.8 GB** has been blocked from further egress. \n- Local hardware quarantine is advised for workstation **MAC-ENG-892**.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestAction = (text: string) => {
    handleSendMessage(text);
  };

  const renderFormattedText = (rawText: string) => {
    return rawText.split("\n").map((line, idx) => {
      // Header parsing
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="text-sm font-bold text-primary-container mt-4 mb-2 first:mt-0">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("#### ")) {
        return <h4 key={idx} className="text-xs font-bold text-on-surface mt-3 mb-1 font-mono">{line.replace("#### ", "")}</h4>;
      }
      
      // List items
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant my-1 pl-4">
            <span className="text-primary-container shrink-0">•</span>
            <span>{parseInlineBold(itemText)}</span>
          </div>
        );
      }

      // Standard paragraphs
      return (
        <p key={idx} className="text-xs text-on-surface-variant my-2 leading-relaxed">
          {parseInlineBold(line)}
        </p>
      );
    });
  };

  const parseInlineBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-bold text-on-surface font-mono">{part}</strong>;
      }
      // Check for code tags as well
      const subParts = part.split(/`(.*?)`/);
      return subParts.map((subPart, j) => {
        if (j % 2 === 1) {
          return <code key={j} className="bg-[#0A0E17] text-primary-container px-1 py-0.5 rounded font-mono font-semibold border border-outline-variant/10 text-[10px]">{subPart}</code>;
        }
        return subPart;
      });
    });
  };

  return (
    <div className="flex-1 h-[78vh] flex flex-col md:flex-row gap-6 overflow-hidden">
      
      {/* Interactive Chat Board (Left Column) */}
      <section className="flex-1 flex flex-col bg-[#111827] border border-outline-variant/30 rounded-2xl overflow-hidden shadow-xl">
        {/* Chat Title Panel */}
        <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between bg-[#151d1e]/10">
          <div>
            <h2 className="text-sm font-bold text-primary flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AegisSOC Cognitive Copilot
            </h2>
            <p className="text-[10px] text-on-surface-variant font-mono uppercase mt-0.5">Tactical Cybersecurity Agent</p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            Agent-Online
          </span>
        </div>

        {/* Chat Output Message Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-5">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div 
                key={msg.id}
                className={`flex gap-4 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}
              >
                {/* Sender Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isUser 
                    ? "bg-[#404758]/50 border-outline-variant/30 text-on-surface" 
                    : "bg-primary-container/10 border-primary-container/20 text-primary-container"
                }`}>
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`px-4 py-3.5 rounded-2xl border text-xs relative ${
                  isUser 
                    ? "bg-[#2e3638]/50 border-outline-variant/30 rounded-tr-none text-on-surface" 
                    : "bg-[#0d1516]/60 border-outline-variant/20 rounded-tl-none text-on-surface-variant"
                }`}>
                  {/* Visual Left Line accent for AI response */}
                  {!isUser && (
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-primary-container"></div>
                  )}

                  <div className="space-y-1">
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Inline SOAR Warning Block under first AI message */}
                  {!isUser && msg.id === "2" && (
                    <div className="bg-[#080f11] border border-tertiary-container/20 rounded-lg p-3 mt-4 flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-tertiary-container shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <p className="font-bold text-[10px] text-tertiary-container font-mono uppercase">Automated SOAR Safeguard</p>
                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                          Workstation MAC-ENG-892 suspended from further WAN handshakes. Encrypted database exfiltration is fully contained.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Inline Quick Actions suggestions (Only on latest model message) */}
                  {!isUser && messages[messages.length - 1]?.id === msg.id && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-outline-variant/15">
                      <button 
                        onClick={() => handleSuggestAction("Explain the 96% Risk Score calculations.")}
                        className="text-[10px] font-mono text-primary-container border border-primary-container/30 rounded-full px-3 py-1 hover:bg-primary-container/10 cursor-pointer transition-colors"
                      >
                        Explain Risk Score
                      </button>
                      <button 
                        onClick={() => handleSuggestAction("Display full kill-chain timeline.")}
                        className="text-[10px] font-mono text-primary-container border border-primary-container/30 rounded-full px-3 py-1 hover:bg-primary-container/10 cursor-pointer transition-colors"
                      >
                        Show Timeline
                      </button>
                      <button 
                        onClick={() => handleSuggestAction("Draft an Executive Incident Summary Report.")}
                        className="text-[10px] font-mono text-primary-container border border-primary-container/30 rounded-full px-3 py-1 hover:bg-primary-container/10 cursor-pointer transition-colors"
                      >
                        Generate Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Typing Indicator */}
          {loading && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/20 text-primary-container flex items-center justify-center shrink-0">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-[#0d1516]/60 border border-outline-variant/20 rounded-2xl rounded-tl-none px-4 py-3.5 text-xs text-on-surface-variant flex items-center gap-2">
                <span className="font-mono text-[11px] text-primary-container animate-pulse">AegisSOC is auditing transaction logs...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-outline-variant/20 bg-[#151d1e]/15">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="relative"
          >
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }
              }}
              className="w-full bg-[#080f11] border border-outline-variant/30 rounded-xl py-3 pl-4 pr-12 text-xs text-on-surface placeholder-on-surface-variant/40 resize-none outline-none focus:border-primary-container transition-all focus:ring-1 focus:ring-primary-container/30 custom-scrollbar" 
              placeholder="Query active incident anomalies or playbook directives..." 
              rows={2}
            />
            <button 
              type="submit"
              disabled={!inputText.trim() || loading}
              className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-primary-container text-black flex items-center justify-center hover:bg-primary-fixed transition-colors cursor-pointer disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
          <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Info className="h-3 w-3 text-primary-container" />
              Press Enter to Send / Shift+Enter for newline
            </span>
            <button 
              onClick={() => setMessages([
                {
                  id: Date.now().toString(),
                  sender: "ai",
                  text: "System context cleared. Let's initiate a fresh threat analysis. Ask me about INC-9921 or network logs.",
                  timestamp: new Date()
                }
              ])}
              className="text-primary hover:underline cursor-pointer"
            >
              Reset Context
            </button>
          </div>
        </div>
      </section>

      {/* Cyber Incident Context Sidebar (Right Column) */}
      <section className="w-full md:w-[320px] lg:w-[380px] flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1">
        
        {/* Incident Summary Card */}
        <div className="bg-[#111827] border border-outline-variant/30 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xs font-mono font-bold text-on-surface uppercase tracking-wider">Current Incident</h3>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-error/15 border border-error/30 text-error">
              INC-9921
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">Suspected Insider Threat / DBA Credential Compromise</p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-4 border-error/50 border-t-transparent animate-spin-slow">
              <span className="text-sm font-black text-error">96</span>
            </div>
            <div>
              <div className="text-[10px] font-mono text-on-surface-variant uppercase">Threat Confidence</div>
              <div className="text-sm font-bold text-error uppercase tracking-wider">CRITICAL SEVERITY</div>
            </div>
          </div>
        </div>

        {/* Affected Systems Health Monitor */}
        <div className="bg-[#111827] border border-outline-variant/30 rounded-2xl p-4">
          <h3 className="text-xs font-mono font-bold text-on-surface uppercase tracking-wider mb-3 flex items-center gap-2">
            <Server className="h-4 w-4 text-tertiary-fixed-dim" />
            Affected Systems Matrix
          </h3>
          <div className="space-y-2">
            {affectedSystems.map((sys, idx) => (
              <div 
                key={idx} 
                className="flex justify-between items-center bg-[#0d1516]/40 p-2.5 rounded-lg border border-outline-variant/15"
              >
                <span className="text-xs text-on-surface font-mono">{sys.name}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  sys.status === "critical" 
                    ? "bg-error animate-pulse" 
                    : sys.status === "warning" 
                    ? "bg-tertiary-container" 
                    : "bg-emerald-400"
                }`}></span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive MITRE ATT&CK Framework */}
        <div className="bg-[#111827] border border-outline-variant/30 rounded-2xl p-4 flex-1">
          <h3 className="text-xs font-mono font-bold text-on-surface uppercase tracking-wider mb-3 flex items-center gap-2">
            <Grid className="h-4 w-4 text-primary" />
            MITRE ATT&amp;CK Vectors
          </h3>
          <div className="grid grid-cols-3 gap-1">
            {mitreTactics.map((tactic, idx) => {
              const bgClass = tactic.status === "compromised"
                ? "bg-error/20 border-error text-error font-bold"
                : tactic.status === "warning"
                ? "bg-tertiary-container/20 border-tertiary-container text-tertiary-container font-semibold"
                : "bg-[#080f11] border-outline-variant/10 text-on-surface-variant";

              return (
                <button 
                  key={idx}
                  onClick={() => setActiveMitre(activeMitre === tactic.id ? null : tactic.id)}
                  className={`border p-2 text-center text-[9px] rounded-md transition-all cursor-pointer ${bgClass} hover:scale-102`}
                >
                  {tactic.name}
                </button>
              );
            })}
          </div>

          {activeMitre ? (
            <div className="mt-3 p-3 bg-[#080f11] border border-outline-variant/30 rounded-xl text-[10px] font-mono leading-relaxed text-on-surface-variant animate-fade-in">
              <strong className="text-primary-container uppercase">Tactic: </strong>
              {mitreTactics.find(t => t.id === activeMitre)?.desc}
            </div>
          ) : (
            <p className="text-[9px] font-mono text-on-surface-variant/60 mt-3 text-center">
              Click any cell to examine tactical threat details.
            </p>
          )}
        </div>

        {/* Quantum Cryptography Vault Status */}
        <div className="bg-[#111827] border border-outline-variant/30 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary-container" />
              <div>
                <div className="text-xs font-bold text-on-surface">Quantum Vault</div>
                <div className="text-[10px] font-mono text-on-surface-variant">Envelope Cryptography</div>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
              Secure
            </span>
          </div>
        </div>

      </section>
    </div>
  );
}
