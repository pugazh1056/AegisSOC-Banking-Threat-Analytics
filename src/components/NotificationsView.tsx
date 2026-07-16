import React, { useState } from "react";
import { 
  Bell, 
  ShieldAlert, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Sliders, 
  ShieldCheck, 
  Cpu, 
  Server, 
  Award, 
  Lock 
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  timestamp: string;
  category: "Security Alerts" | "Policy Updates" | "AI Recommendations" | "System Updates" | "Compliance Alerts" | "Quantum Security Alerts";
  type: "critical" | "warning" | "success" | "info";
  message: string;
  read: boolean;
}

export default function NotificationsView() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Security Alerts" | "Policy Updates" | "AI Recommendations" | "System Updates" | "Compliance Alerts" | "Quantum Security Alerts">("All");
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "nt-1",
      title: "Auto-Block Rule EXFIL-09 Triggered",
      timestamp: "Today, 11:58 PM",
      category: "Security Alerts",
      type: "critical",
      message: "Workstation MAC-ENG-892 isolated immediately after registering continuous data egress exceeding the 4.8 GB threshold limits.",
      read: false
    },
    {
      id: "nt-2",
      title: "Crystals-Kyber KEM Rotated",
      timestamp: "Today, 10:12 PM",
      category: "Quantum Security Alerts",
      type: "success",
      message: "Lattice-based seed keys updated successfully. Dynamic post-quantum secure cryptographic signatures applied globally.",
      read: false
    },
    {
      id: "nt-3",
      title: "Cognitive Risk Model Shift Detection",
      timestamp: "Today, 08:45 PM",
      category: "AI Recommendations",
      type: "info",
      message: "AegisSOC neural baseline suggests updating POL-03 download rate limits from 50MB to 75MB to map genuine operator traffic changes.",
      read: true
    },
    {
      id: "nt-4",
      title: "RBI Audit Report Complied",
      timestamp: "Today, 04:30 PM",
      category: "Compliance Alerts",
      type: "success",
      message: "Continuous auditing systems verified and cryptographically signed 100% of transaction logs for RBI review.",
      read: true
    },
    {
      id: "nt-5",
      title: "Policy Update: SSO Proxy Restrictions",
      timestamp: "Yesterday, 12:00 PM",
      category: "Policy Updates",
      type: "warning",
      message: "SSO Proxy policy updated to deny logins originating from unvetted residential VPN subnets.",
      read: true
    },
    {
      id: "nt-6",
      title: "Container Cluster Rotation Complete",
      timestamp: "Yesterday, 09:15 AM",
      category: "System Updates",
      type: "info",
      message: "Failsafe container registry rotated to v5.2.1-Prod inside US-East nodes without operational loss.",
      read: true
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const toggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const categories = [
    "All",
    "Security Alerts",
    "Policy Updates",
    "AI Recommendations",
    "System Updates",
    "Compliance Alerts",
    "Quantum Security Alerts"
  ] as const;

  const filtered = notifications.filter(n => {
    if (activeCategory === "All") return true;
    return n.category === activeCategory;
  });

  return (
    <div className="space-y-6">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/30 p-5 rounded-2xl border border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary-container" />
            Grouped SOC Notification Center
          </h2>
          <p className="text-xs text-on-surface-variant font-mono uppercase mt-0.5">
            Active real-time alert logs separated by operational category
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleMarkAllRead}
            className="px-3.5 py-2 border border-outline-variant/40 hover:text-primary hover:border-primary text-xs font-mono rounded-lg transition-all cursor-pointer"
          >
            Mark All Read
          </button>
          <button 
            onClick={handleClearAll}
            className="p-2 border border-outline-variant/40 hover:text-error hover:border-error rounded-lg transition-all cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main split tab layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Tab Categories list */}
        <div className="soc-card p-4 space-y-2">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide px-2 pb-2 border-b border-outline-variant/10">
            Log Categories
          </h3>

          <div className="space-y-1.5 pt-2">
            {categories.map((cat) => {
              const count = notifications.filter(n => cat === "All" || n.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-all flex justify-between items-center cursor-pointer ${
                    activeCategory === cat 
                      ? "bg-primary-container/10 border-l-2 border-primary-container text-primary-container font-bold" 
                      : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.01]"
                  }`}
                >
                  <span className="truncate pr-2">{cat}</span>
                  <span className="bg-outline-variant/15 text-[10px] px-1.5 py-0.5 rounded-full text-on-surface-variant shrink-0">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side Notifications Queue list */}
        <div className="lg:col-span-3 soc-card p-5 space-y-4">
          <h3 className="text-xs font-bold font-mono text-on-surface uppercase tracking-wide">
            Live {activeCategory} Notification Stream
          </h3>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant font-mono text-xs">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
                <p>No operational notifications matching active category.</p>
              </div>
            ) : (
              filtered.map((item) => {
                const iconColor = item.type === "critical" 
                  ? "text-error border-error/20 bg-error/5" 
                  : item.type === "warning" 
                  ? "text-tertiary-container border-tertiary-container/25 bg-tertiary-container/5"
                  : item.type === "success"
                  ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                  : "text-primary border-primary/20 bg-primary/5";

                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleRead(item.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer bg-[#0d1516]/20 ${
                      item.read 
                        ? "border-outline-variant/10 opacity-55" 
                        : "border-outline-variant/35 hover:border-primary-container"
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg border shrink-0 ${iconColor}`}>
                      {item.category === "Security Alerts" && <ShieldAlert className="h-4 w-4" />}
                      {item.category === "Quantum Security Alerts" && <Lock className="h-4 w-4" />}
                      {item.category === "AI Recommendations" && <Cpu className="h-4 w-4" />}
                      {item.category === "Compliance Alerts" && <Award className="h-4 w-4" />}
                      {item.category === "Policy Updates" && <Sliders className="h-4 w-4" />}
                      {item.category === "System Updates" && <Server className="h-4 w-4" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-primary-container uppercase font-bold tracking-wide">
                            {item.category}
                          </span>
                          <h4 className={`text-xs font-bold font-mono tracking-tight ${item.read ? "text-on-surface-variant" : "text-on-surface"}`}>
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-[9px] font-mono text-on-surface-variant whitespace-nowrap">{item.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1.5 leading-relaxed">
                        {item.message}
                      </p>
                    </div>

                    <div className="flex items-center self-center shrink-0">
                      <div className={`w-2 h-2 rounded-full ${item.read ? "bg-transparent" : "bg-primary-container animate-pulse"}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
