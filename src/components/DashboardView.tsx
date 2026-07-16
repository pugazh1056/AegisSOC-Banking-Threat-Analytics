import React, { useState } from "react";
import { 
  Users, 
  Key, 
  AlertTriangle, 
  UserX, 
  ShieldAlert, 
  Server, 
  Lock, 
  Globe, 
  TrendingUp, 
  LayoutGrid, 
  ArrowUpRight, 
  Activity, 
  CheckCircle,
  Clock,
  ShieldCheck,
  Brain
} from "lucide-react";
import { Alert, DepartmentRisk, SOCStats } from "../types";
import GlobalThreatMap from "./GlobalThreatMap";

interface DashboardViewProps {
  onNavigateToView: (view: "dashboard" | "investigations" | "copilot" | "notifications" | "settings") => void;
  onSelectAlert: (alertId: string) => void;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  stats: SOCStats;
  setStats: React.Dispatch<React.SetStateAction<SOCStats>>;
}

export default function DashboardView({ 
  onNavigateToView, 
  onSelectAlert,
  alerts,
  setAlerts,
  stats,
  setStats
}: DashboardViewProps) {
  
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [mapPingCount, setMapPingCount] = useState(3);
  const [customPings, setCustomPings] = useState<{ x: number; y: number; id: number; delay: number }[]>([
    { x: 25, y: 35, id: 1, delay: 0 },
    { x: 60, y: 55, id: 2, delay: 0.5 },
    { x: 80, y: 40, id: 3, delay: 1.0 }
  ]);

  const departments: DepartmentRisk[] = [
    { name: "Trading", riskScore: 78, status: "critical" },
    { name: "Retail", riskScore: 12, status: "success" },
    { name: "HR", riskScore: 8, status: "success" },
    { name: "IT Ops", riskScore: 45, status: "warning" },
    { name: "Exec", riskScore: 89, status: "critical" },
    { name: "Legal", riskScore: 15, status: "success" },
    { name: "Wealth", riskScore: 24, status: "success" },
    { name: "Audit", riskScore: 32, status: "warning" },
    { name: "Marketing", riskScore: 18, status: "success" }
  ];

  const handleSimulateAttack = () => {
    // Generate random coordinate on map
    const newX = Math.floor(Math.random() * 80) + 10;
    const newY = Math.floor(Math.random() * 70) + 15;
    const newId = Date.now();
    
    setCustomPings(prev => [...prev, { x: newX, y: newY, id: newId, delay: 0 }]);
    setStats(prev => ({
      ...prev,
      criticalAlerts: prev.criticalAlerts + 1,
      highRiskUsers: prev.highRiskUsers + 1
    }));

    const newAlert: Alert = {
      id: `ALT-${newId.toString().slice(-4)}`,
      title: "Anomalous Endpoint Handshake",
      time: "Just now",
      severity: "warning",
      description: `Irregular API handshakes detected from custom origin at coordinates [${newX}, ${newY}].`,
      resolved: false,
      user: "System_Daemon",
      ip: `192.168.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`
    };

    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleResolveAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    setStats(prev => ({
      ...prev,
      criticalAlerts: Math.max(0, prev.criticalAlerts - 1),
      resolvedThreats: prev.resolvedThreats + 1
    }));
  };

  // Threat gauge math
  // Circle circumference is 2 * pi * r (for r=40, C=251.2)
  const activeAlertsCount = alerts.filter(a => !a.resolved).length;
  // Dynamic threat level score based on remaining alerts
  const threatScore = Math.min(100, Math.max(30, 40 + (activeAlertsCount * 6)));
  const strokeDashoffset = 251.2 * (1 - threatScore / 100);

  return (
    <div className="space-y-6">
      {/* Hero Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            AegisSOC - AI-Powered Banking Security Operations Center
          </h1>
          <p className="text-on-surface-variant text-sm mt-1 max-w-4xl">
            Real-time behavioral intelligence for privileged access monitoring, insider threat detection, and quantum-safe banking security.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={handleSimulateAttack}
            className="px-4 py-2 bg-error/10 border border-error/30 text-error rounded-lg font-mono text-xs hover:bg-error/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="h-4 w-4 animate-pulse" />
            Simulate Incident
          </button>
        </div>
      </div>

      {/* Top KPI Grid Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* KPI 1 */}
        <div className="soc-card p-4 hover:bg-white/[0.02] transition-all relative overflow-hidden group">
          <div className="text-xs font-mono text-on-surface-variant mb-1">Employees Online</div>
          <div className="text-2xl font-bold text-primary">{stats.employeesOnline.toLocaleString()}</div>
          <div className="mt-2 h-8 w-full opacity-40 group-hover:opacity-75 transition-opacity">
            <svg className="w-full h-full stroke-primary fill-primary/5" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,30 L0,20 Q10,15 20,22 T40,15 T60,25 T80,10 T100,5 L100,30 Z" stroke="none"></path>
              <path d="M0,20 Q10,15 20,22 T40,15 T60,25 T80,10 T100,5" fill="none" strokeWidth="2"></path>
            </svg>
          </div>
          <Users className="absolute top-4 right-4 h-4 w-4 text-primary/30" />
        </div>

        {/* KPI 2 */}
        <div className="soc-card p-4 hover:bg-white/[0.02] transition-all relative">
          <div className="text-xs font-mono text-on-surface-variant mb-1">Privileged Sessions</div>
          <div className="text-2xl font-bold text-tertiary-fixed-dim">{stats.privilegedSessions}</div>
          <div className="flex items-center gap-1.5 mt-3 text-tertiary-fixed-dim">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-wider">Active Now</span>
          </div>
          <Key className="absolute top-4 right-4 h-4 w-4 text-tertiary-fixed-dim/30" />
        </div>

        {/* KPI 3 */}
        <div className="soc-card p-4 hover:bg-white/[0.02] transition-all relative border-l-2 border-error">
          <div className="text-xs font-mono text-on-surface-variant mb-1">Critical Alerts</div>
          <div className="text-2xl font-bold text-error">{stats.criticalAlerts}</div>
          <div className="mt-2 h-8 w-full opacity-40">
            <svg className="w-full h-full stroke-error fill-none" preserveAspectRatio="none" viewBox="0 0 100 30">
              <path d="M0,25 L20,25 L30,5 L40,28 L50,15 L60,25 L100,25" strokeWidth="1.5"></path>
            </svg>
          </div>
          <AlertTriangle className="absolute top-4 right-4 h-4 w-4 text-error/30 animate-pulse" />
        </div>

        {/* KPI 4 */}
        <div className="soc-card p-4 hover:bg-white/[0.02] transition-all relative">
          <div className="text-xs font-mono text-on-surface-variant mb-1">High Risk Users</div>
          <div className="text-2xl font-bold text-tertiary-container">{stats.highRiskUsers}</div>
          <div className="mt-3 text-[10px] text-on-surface-variant font-mono uppercase">Avg. 1.2% Total</div>
          <UserX className="absolute top-4 right-4 h-4 w-4 text-tertiary-container/30" />
        </div>

        {/* KPI 5 */}
        <div className="soc-card p-4 hover:bg-white/[0.02] transition-all relative">
          <div className="text-xs font-mono text-on-surface-variant mb-1">Blocked Sessions</div>
          <div className="text-2xl font-bold text-primary-container">{stats.blockedSessions}</div>
          <div className="mt-3 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Auto-Mitigated
          </div>
          <ShieldAlert className="absolute top-4 right-4 h-4 w-4 text-primary-container/30" />
        </div>

        {/* KPI 6 */}
        <div className="soc-card p-4 hover:bg-white/[0.02] transition-all relative">
          <div className="text-xs font-mono text-on-surface-variant mb-1">Protected Systems</div>
          <div className="text-2xl font-bold text-on-surface">{stats.protectedSystems.toLocaleString()}</div>
          <div className="mt-3 text-[10px] text-on-surface-variant font-mono uppercase">99.98% Uptime</div>
          <Server className="absolute top-4 right-4 h-4 w-4 text-on-surface-variant/30" />
        </div>

        {/* KPI 7 */}
        <div className="soc-card p-4 hover:bg-white/[0.02] transition-all relative border-l-2 border-primary-container">
          <div className="text-xs font-mono text-on-surface-variant mb-1 flex justify-between items-center pr-4">
            Quantum Vault
          </div>
          <div className="text-2xl font-bold text-primary-container">Secure</div>
          <div className="mt-3 text-[10px] text-primary-container font-mono uppercase tracking-wider">KYBER ACTIVE</div>
          <Lock className="absolute top-4 right-4 h-4 w-4 text-primary-container/30" />
        </div>
      </div>

      {/* Main Threat Map & Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 size) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Global Threat Map Block */}
          <GlobalThreatMap 
            customPings={customPings} 
            onSimulateAttack={handleSimulateAttack} 
          />

          {/* Sub-grid of Risk and Behavioral charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Behavior Analytics SVG */}
            <div className="soc-card p-5 h-[300px] flex flex-col">
              <h2 className="text-xs font-semibold text-on-surface-variant mb-4 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Cognitive Behavior Analytics
              </h2>
              <div className="flex-1 relative flex items-end pt-4 bg-[#0a0e17]/40 rounded-lg p-2 border border-outline-variant/15">
                <svg className="w-full h-full stroke-primary fill-none" preserveAspectRatio="none" viewBox="0 0 100 50">
                  {/* Horizontal Grid lines */}
                  <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="10" y2="10"></line>
                  <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25"></line>
                  <line stroke="#1F2937" strokeWidth="0.5" x1="0" x2="100" y1="40" y2="40"></line>
                  
                  {/* Dynamic Risk Line Path */}
                  <path d="M0,45 Q10,40 20,42 T40,25 T60,35 T75,15 T90,20 L100,5" strokeWidth="1.5" stroke="#00daf3"></path>
                  
                  {/* Anchor plot points */}
                  <circle className="pulse" cx="75" cy="15" fill="#00E5FF" r="2.5"></circle>
                  <circle className="pulse" cx="100" cy="5" fill="#FF3B5C" r="2.5"></circle>
                </svg>
                
                {/* Visual annotations */}
                <div className="absolute top-2 right-2 text-[10px] bg-error/10 border border-error/20 text-error px-1.5 py-0.5 rounded font-mono">
                  ANOMALY DETECTION SPIKE
                </div>
              </div>
            </div>

            {/* Department Risk Heatmap Grid */}
            <div className="soc-card p-5 h-[300px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-tertiary-fixed-dim" />
                  Department Risk Heatmap
                </h2>
                {selectedDept && (
                  <button 
                    onClick={() => setSelectedDept(null)}
                    className="text-[9px] font-mono text-primary-container hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              
              <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2">
                {departments.map((dept, idx) => {
                  const isSelected = selectedDept === dept.name;
                  const borderClass = dept.status === "critical" 
                    ? "border-error/50 bg-error/10 hover:bg-error/20 text-error" 
                    : dept.status === "warning"
                    ? "border-tertiary-container/50 bg-tertiary-container/10 hover:bg-tertiary-container/20 text-tertiary-container"
                    : "border-primary-container/20 bg-primary-container/5 hover:bg-primary-container/15 text-primary-container";

                  return (
                    <button 
                      key={idx}
                      onClick={() => setSelectedDept(dept.name)}
                      className={`border rounded-lg flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${borderClass} ${isSelected ? "ring-2 ring-primary-container scale-102" : "opacity-80 hover:opacity-100"}`}
                    >
                      <span className="text-[11px] font-bold tracking-tight">{dept.name}</span>
                      <span className="text-[10px] font-mono opacity-85 mt-1">Risk: {dept.riskScore}%</span>
                    </button>
                  );
                })}
              </div>

              {selectedDept && (
                <div className="mt-3 p-2 bg-[#111827] border border-outline-variant/30 rounded text-[11px] text-on-surface-variant font-mono">
                  Selected: <strong className="text-on-surface">{selectedDept}</strong>. Privileged credentials under continuous cognitive auditing.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1/3 size) */}
        <div className="flex flex-col gap-6">
          {/* Circular Security Score Gauge */}
          <div className="soc-card p-5 flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest w-full text-left mb-4">
              A.I. Security Score
            </h2>
            
            <div className="relative w-44 h-44 flex items-center justify-center mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle grey track */}
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#1F2937" strokeWidth="8"></circle>
                {/* Threat indicator gauge */}
                <circle 
                  className="threat-gauge-circle" 
                  cx="50" cy="50" 
                  fill="transparent" 
                  r="40" 
                  stroke="#00E5FF" 
                  strokeLinecap="round" 
                  strokeWidth="8"
                  strokeDashoffset={strokeDashoffset}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-primary-container">{threatScore}</span>
                <span className="text-xs font-mono text-on-surface-variant">/100 Health</span>
              </div>
            </div>
            
            <p className="text-[11px] text-on-surface-variant font-mono mt-2 text-center">
              Score calculated dynamically from {activeAlertsCount} active threat anomalies.
            </p>
          </div>

          {/* Stateful Recent Alerts List */}
          <div className="soc-card p-5 flex-1 flex flex-col min-h-[350px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-error" />
                Live Incident Queue ({alerts.filter(a => !a.resolved).length})
              </h2>
            </div>
            
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[380px] pr-2 custom-scrollbar">
              {alerts.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-on-surface-variant font-mono">
                  <ShieldCheck className="h-10 w-10 text-emerald-400 mb-2 animate-bounce" />
                  <p className="text-xs">All incidents mitigated.</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div 
                    key={alert.id}
                    onClick={() => alert.user === "Rahul S." ? onNavigateToView("investigations") : onSelectAlert(alert.id)}
                    className={`group flex items-start gap-3 p-3 rounded-lg border bg-[#0d1516]/50 transition-all cursor-pointer ${
                      alert.resolved 
                        ? "border-outline-variant/10 opacity-55" 
                        : alert.severity === "critical"
                        ? "border-error/40 hover:border-error hover:bg-error/5"
                        : "border-tertiary-container/30 hover:border-tertiary-container hover:bg-tertiary-container/5"
                    }`}
                  >
                    <div className="mt-1">
                      {alert.resolved ? (
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                      ) : alert.severity === "critical" ? (
                        <ShieldAlert className="h-4 w-4 text-error animate-pulse" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-tertiary-container" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <span className={`text-xs font-bold truncate ${alert.resolved ? "text-on-surface-variant line-through" : alert.severity === "critical" ? "text-error" : "text-tertiary-container"}`}>
                          {alert.title}
                        </span>
                        <span className="text-[10px] font-mono text-on-surface-variant shrink-0">{alert.time}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed line-clamp-2">
                        {alert.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-outline-variant/10">
                        <span className="text-[10px] font-mono text-primary-container truncate max-w-[130px]">
                          User: {alert.user || "System"}
                        </span>
                        
                        {!alert.resolved && (
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => handleResolveAlert(alert.id, e)}
                              className="text-[9px] font-mono text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded hover:bg-emerald-400/10 cursor-pointer"
                            >
                              Resolve
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                alert.user === "Rahul S." ? onNavigateToView("investigations") : onNavigateToView("copilot");
                              }}
                              className="text-[9px] font-mono text-primary-container border border-primary-container/30 px-2 py-0.5 rounded hover:bg-primary-container/10 flex items-center gap-0.5 cursor-pointer"
                            >
                              Inspect
                              <ArrowUpRight className="h-2 w-2" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Status Operations Banner panel */}
      <div className="soc-card p-5 flex flex-wrap gap-6 items-center justify-between border-t border-outline-variant/30 bg-[#0B101A]">
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center border border-primary-container/20">
            <Activity className="h-5 w-5 text-primary-container" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-on-surface-variant uppercase">Today's Total Events</div>
            <div className="text-lg font-bold text-on-surface">1,042 Raw Events</div>
          </div>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-outline-variant/30"></div>
        
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center border border-emerald-400/20">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-on-surface-variant uppercase">Resolved Incidents</div>
            <div className="text-lg font-bold text-on-surface">{stats.resolvedThreats} mitigated</div>
          </div>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-outline-variant/30"></div>
        
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center border border-tertiary-container/20">
            <Clock className="h-5 w-5 text-tertiary-container" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-on-surface-variant uppercase">Mean Mitigation Time</div>
            <div className="text-lg font-bold text-on-surface">{stats.avgResponseTime}</div>
          </div>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-outline-variant/30"></div>
        
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-on-surface-variant uppercase">Cognitive Accuracy</div>
            <div className="text-lg font-bold text-primary-container">{stats.aiAccuracy}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
