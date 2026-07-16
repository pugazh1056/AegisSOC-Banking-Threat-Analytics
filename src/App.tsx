import React, { useState } from "react";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Search, 
  Bot, 
  Bell, 
  Settings as SettingsIcon, 
  Plus, 
  CheckCircle, 
  GitBranch, 
  Network,
  Users,
  Activity,
  LogOut,
  ChevronDown,
  Building,
  ShieldCheck,
  Award,
  Lock,
  Cpu,
  Fingerprint,
  Radio,
  FileText,
  Sliders,
  Database,
  Building2,
  ChevronRight,
  UserCheck,
  FileText as FileTextIcon
} from "lucide-react";
import { Alert, SOCStats } from "./types";

// Base views
import LandingPage from "./components/LandingPage";
import DashboardView from "./components/DashboardView";
import InvestigationView from "./components/InvestigationView";
import CopilotView from "./components/CopilotView";
import NotificationsView from "./components/NotificationsView";
import SettingsView from "./components/SettingsView";

// Advanced custom views (Modules 1 - 20)
import BehaviourAnalyticsView from "./components/BehaviourAnalyticsView";
import PrivilegedIdentityCenterView from "./components/PrivilegedIdentityCenterView";
import ThreatIntelligenceView from "./components/ThreatIntelligenceView";
import AiRiskEngineView from "./components/AiRiskEngineView";
import AdaptivePoliciesView from "./components/AdaptivePoliciesView";
import SecurityAuditTrailView from "./components/SecurityAuditTrailView";
import QuantumVaultView from "./components/QuantumVaultView";
import ComplianceCenterView from "./components/ComplianceCenterView";
import AlertsCenterView from "./components/AlertsCenterView";
import IncidentReportsView from "./components/IncidentReportsView";
import ExecutiveDashboardView from "./components/ExecutiveDashboardView";
import BranchRiskView from "./components/BranchRiskView";
import CaseManagementView from "./components/CaseManagementView";
import OrgManagementView from "./components/OrgManagementView";
import ReportsAnalyticsView from "./components/ReportsAnalyticsView";
import SystemHealthView from "./components/SystemHealthView";
import AiModelMonitoringView from "./components/AiModelMonitoringView";
import UserProfileView from "./components/UserProfileView";
import FraudAmlView from "./components/FraudAmlView";

type ActiveViewType = 
  | "landing" 
  | "dashboard" 
  | "investigations" 
  | "copilot" 
  | "notifications" 
  | "settings"
  | "behaviour"
  | "privileged"
  | "threatIntel"
  | "aiRisk"
  | "adaptive"
  | "audit"
  | "quantum"
  | "compliance"
  | "alerts"
  | "incidentReports"
  | "executive"
  | "branchRisk"
  | "caseManagement"
  | "orgManagement"
  | "reportsAnalytics"
  | "systemHealth"
  | "aiModel"
  | "userProfile"
  | "fraudAml";

export default function App() {
  const [activeView, setActiveView] = useState<ActiveViewType>("landing");
  const [showNewIncidentModal, setShowNewIncidentModal] = useState(false);
  const [newIncidentTitle, setNewIncidentTitle] = useState("");
  const [newIncidentUser, setNewIncidentUser] = useState("");
  const [newIncidentDesc, setNewIncidentDesc] = useState("");

  // Control sidebar sections expansion
  const [expandedSection, setExpandedSection] = useState<string | null>("core");

  // Dynamic unified security states
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "ALT-9921",
      title: "Anomalous Database Query Query",
      time: "2m ago",
      severity: "critical",
      description: "Rahul S. (Senior DBA) queried non-routine Customer PII Backup tables at 11:45 PM outside standard working hours.",
      resolved: false,
      user: "Rahul S.",
      ip: "82.102.23.11"
    },
    {
      id: "ALT-4412",
      title: "Impossible Travel Geographic Warning",
      time: "15m ago",
      severity: "warning",
      description: "User JSmith logged in from NY and Tokyo subnets within 5 minutes of active session.",
      resolved: false,
      user: "JSmith",
      ip: "103.22.45.1"
    },
    {
      id: "ALT-1205",
      title: "Failed SSO Authentication Spike",
      time: "1h ago",
      severity: "warning",
      description: "Multiple failed administrative VPN login attempts targeting corporate active directory nodes.",
      resolved: false,
      user: "System Admin",
      ip: "185.220.101.4"
    }
  ]);

  const [stats, setStats] = useState<SOCStats>({
    employeesOnline: 12450,
    privilegedSessions: 342,
    criticalAlerts: 3,
    highRiskUsers: 24,
    blockedSessions: 128,
    protectedSystems: 4591,
    resolvedThreats: 987,
    avgResponseTime: "1.2s",
    aiAccuracy: "99.8%"
  });

  const handleResetIncidents = () => {
    setAlerts([
      {
        id: "ALT-9921",
        title: "Anomalous Database Query Query",
        time: "2m ago",
        severity: "critical",
        description: "Rahul S. (Senior DBA) queried non-routine Customer PII Backup tables at 11:45 PM outside standard working hours.",
        resolved: false,
        user: "Rahul S.",
        ip: "82.102.23.11"
      }
    ]);
    setStats({
      employeesOnline: 12450,
      privilegedSessions: 342,
      criticalAlerts: 1,
      highRiskUsers: 24,
      blockedSessions: 128,
      protectedSystems: 4591,
      resolvedThreats: 987,
      avgResponseTime: "1.2s",
      aiAccuracy: "99.8%"
    });
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncidentTitle.trim()) return;

    const newId = `ALT-${Math.floor(Math.random() * 9000) + 1000}`;
    const newAlert: Alert = {
      id: newId,
      title: newIncidentTitle,
      time: "Just now",
      severity: "warning",
      description: newIncidentDesc || "Manual simulated security probe triggered by SOC Administrator.",
      resolved: false,
      user: newIncidentUser || "System Admin",
      ip: "192.168.1.99"
    };

    setAlerts(prev => [newAlert, ...prev]);
    setStats(prev => ({
      ...prev,
      criticalAlerts: prev.criticalAlerts + 1
    }));

    setNewIncidentTitle("");
    setNewIncidentUser("");
    setNewIncidentDesc("");
    setShowNewIncidentModal(false);
    setActiveView("dashboard");
  };

  const handleSelectAlert = (alertId: string) => {
    if (alertId === "ALT-9921") {
      setActiveView("investigations");
    } else {
      setActiveView("copilot");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (activeView === "landing") {
    return <LandingPage onEnterApp={() => setActiveView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-[#080B12] text-[#dce4e5] font-sans antialiased flex">
      
      {/* Left Side Navigation Drawer/Rail */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-[#151d1e]/15 border-r border-[#1f2937] z-50 flex flex-col justify-between overflow-y-auto custom-scrollbar">
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 border-b border-[#1f2937] flex items-center gap-3">
            <ShieldAlert className="text-primary-container h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-primary">AegisSOC</h1>
              <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Banking SOC Ops</p>
            </div>
          </div>

          {/* Grouped Sidebar Accordion Navigation List */}
          <div className="p-3 space-y-2">
            
            {/* Core Security Ops */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection("core")}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
              >
                <span>Core Security Ops</span>
                {expandedSection === "core" ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {expandedSection === "core" && (
                <div className="space-y-0.5 pl-2">
                  <button 
                    onClick={() => setActiveView("dashboard")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "dashboard" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                  </button>
                  <button 
                    onClick={() => setActiveView("alerts")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "alerts" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Alerts Center
                  </button>
                  <button 
                    onClick={() => setActiveView("caseManagement")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "caseManagement" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Case Management
                  </button>
                  <button 
                    onClick={() => setActiveView("investigations")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "investigations" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Search className="h-3.5 w-3.5" />
                    Investigations
                  </button>
                  <button 
                    onClick={() => setActiveView("incidentReports")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "incidentReports" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <FileTextIcon className="h-3.5 w-3.5" />
                    Incident Archives
                  </button>
                  <button 
                    onClick={() => setActiveView("fraudAml")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "fraudAml" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    AI Fraud &amp; AML
                  </button>
                </div>
              )}
            </div>

            {/* Identity & Behavior */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection("identity")}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
              >
                <span>Identity &amp; Behavior</span>
                {expandedSection === "identity" ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {expandedSection === "identity" && (
                <div className="space-y-0.5 pl-2">
                  <button 
                    onClick={() => setActiveView("privileged")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "privileged" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Fingerprint className="h-3.5 w-3.5" />
                    Privileged Identity
                  </button>
                  <button 
                    onClick={() => setActiveView("behaviour")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "behaviour" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Activity className="h-3.5 w-3.5" />
                    User Behavior
                  </button>
                  <button 
                    onClick={() => setActiveView("userProfile")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "userProfile" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    Staff Profile
                  </button>
                </div>
              )}
            </div>

            {/* Advanced Engineering */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection("engineering")}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
              >
                <span>Defense Tech</span>
                {expandedSection === "engineering" ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {expandedSection === "engineering" && (
                <div className="space-y-0.5 pl-2">
                  <button 
                    onClick={() => setActiveView("threatIntel")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "threatIntel" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Radio className="h-3.5 w-3.5" />
                    Threat Intel Feed
                  </button>
                  <button 
                    onClick={() => setActiveView("aiRisk")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "aiRisk" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Cpu className="h-3.5 w-3.5" />
                    AI Risk Engine
                  </button>
                  <button 
                    onClick={() => setActiveView("adaptive")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "adaptive" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Sliders className="h-3.5 w-3.5" />
                    Adaptive Policies
                  </button>
                  <button 
                    onClick={() => setActiveView("quantum")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "quantum" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Lock className="h-3.5 w-3.5" />
                    Quantum Vault
                  </button>
                </div>
              )}
            </div>

            {/* Compliance & Operations */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection("complianceSec")}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
              >
                <span>Compliance &amp; Sys</span>
                {expandedSection === "complianceSec" ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {expandedSection === "complianceSec" && (
                <div className="space-y-0.5 pl-2">
                  <button 
                    onClick={() => setActiveView("compliance")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "compliance" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Award className="h-3.5 w-3.5" />
                    Compliance Center
                  </button>
                  <button 
                    onClick={() => setActiveView("audit")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "audit" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Database className="h-3.5 w-3.5" />
                    Audit Trail Logs
                  </button>
                  <button 
                    onClick={() => setActiveView("orgManagement")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "orgManagement" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    Corporate Directory
                  </button>
                  <button 
                    onClick={() => setActiveView("reportsAnalytics")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "reportsAnalytics" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Reports &amp; Export
                  </button>
                  <button 
                    onClick={() => setActiveView("systemHealth")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "systemHealth" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Network className="h-3.5 w-3.5" />
                    System Health
                  </button>
                  <button 
                    onClick={() => setActiveView("aiModel")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "aiModel" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Cpu className="h-3.5 w-3.5" />
                    AI Model Monitoring
                  </button>
                </div>
              )}
            </div>

            {/* C-Suite/Executive */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection("executiveSec")}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
              >
                <span>C-Suite Executive</span>
                {expandedSection === "executiveSec" ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {expandedSection === "executiveSec" && (
                <div className="space-y-0.5 pl-2">
                  <button 
                    onClick={() => setActiveView("executive")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "executive" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Building className="h-3.5 w-3.5" />
                    CISO Risk Scorecard
                  </button>
                  <button 
                    onClick={() => setActiveView("branchRisk")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "branchRisk" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                    Global Branch Map
                  </button>
                </div>
              )}
            </div>

            {/* General Settings */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection("generalSec")}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-on-surface"
              >
                <span>General</span>
                {expandedSection === "generalSec" ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {expandedSection === "generalSec" && (
                <div className="space-y-0.5 pl-2">
                  <button 
                    onClick={() => setActiveView("copilot")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "copilot" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Bot className="h-3.5 w-3.5" />
                    AI Copilot
                  </button>
                  <button 
                    onClick={() => setActiveView("notifications")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer relative ${activeView === "notifications" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <Bell className="h-3.5 w-3.5" />
                    Notifications
                    {alerts.filter(a => !a.resolved).length > 0 && (
                      <span className="absolute right-4 w-2 h-2 bg-error rounded-full animate-ping"></span>
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveView("settings")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${activeView === "settings" ? "bg-primary-container/10 text-primary-container font-black" : "text-on-surface-variant hover:bg-white/[0.02]"}`}
                  >
                    <SettingsIcon className="h-3.5 w-3.5" />
                    Settings Console
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Action button: New incident trigger */}
        <div className="p-4 border-t border-[#1f2937]/50 space-y-2 shrink-0">
          <button 
            onClick={() => setShowNewIncidentModal(true)}
            className="w-full bg-primary-container text-on-primary-fixed hover:bg-primary-fixed font-mono text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 font-bold transition-all cursor-pointer shadow-lg shadow-primary-container/10"
          >
            <Plus className="h-4 w-4" />
            New Incident
          </button>
          
          <button 
            onClick={() => setActiveView("landing")}
            className="w-full border border-outline-variant/30 text-on-surface-variant hover:text-on-surface font-mono text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Exit Console
          </button>
        </div>
      </nav>

      {/* Top Header Navigation Bar + Page Main View Panel */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen overflow-hidden">
        
        {/* Top Header bar */}
        <header className="h-16 flex justify-between items-center px-6 md:px-8 border-b border-[#1f2937] shrink-0 bg-[#080B12]/70 backdrop-blur-md z-40 sticky top-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-on-surface-variant uppercase tracking-wider hidden sm:block">
              Operations Control Panel &gt; <span className="text-primary-container font-bold">{activeView}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">System Healthy</span>
            </div>

            <div className="h-4 w-px bg-[#1f2937]"></div>
            
            <button className="text-xs font-mono text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-1">
              Global Trust Org <ChevronDown className="h-3.5 w-3.5" />
            </button>
            
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveView("branchRisk")} className="text-on-surface-variant hover:text-primary-container p-2 rounded-lg hover:bg-white/[0.02] transition-all" title="Network Topology Map">
                <GitBranch className="h-4 w-4" />
              </button>
              <button onClick={() => setActiveView("systemHealth")} className="text-on-surface-variant hover:text-primary-container p-2 rounded-lg hover:bg-white/[0.02] transition-all" title="Systems Hub Matrix">
                <Network className="h-4 w-4" />
              </button>
            </div>
            
            <div onClick={() => setActiveView("userProfile")} className="w-9 h-9 rounded-full bg-[#111827] overflow-hidden border border-[#1f2937] cursor-pointer" title="SOC Profile">
              <div 
                className="bg-cover bg-center w-full h-full" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4r_GA6wNjxNhUuJjKj6JzP5kysq7N9SxpxgZaIay2FAggw6BFqT_67TOvS9j2E77_uldjWfKb9NchzPg9Zbjn_VtaRk2XS2r8TALBLlwbuiMVOaUY9XOaGSXZbfJ4abS6U8a5EnlGQ-wAoOti7OPJ1r39H-Q--QbIBzkpgeFgI6qRs2Ma8kKQQzOCYoFzjRPpBbCUpVtfUqnyS6u2RdPeOPpaUasdS7MHjtpSnKD52NGhOJkJSCS-ntmHjGp9ddtNLMZ_HswihFw')" }}
              />
            </div>
          </div>
        </header>

        {/* Sub-View Canvas container */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto animate-fade-in">
            {activeView === "dashboard" && (
              <DashboardView 
                onNavigateToView={setActiveView} 
                onSelectAlert={handleSelectAlert}
                alerts={alerts}
                setAlerts={setAlerts}
                stats={stats}
                setStats={setStats}
              />
            )}
            
            {activeView === "investigations" && (
              <InvestigationView 
                onBackToQueue={() => setActiveView("dashboard")} 
                onNavigateToCopilot={() => setActiveView("copilot")} 
              />
            )}
            
            {activeView === "copilot" && (
              <CopilotView />
            )}
            
            {activeView === "notifications" && (
              <NotificationsView />
            )}
            
            {activeView === "settings" && (
              <SettingsView 
                stats={stats} 
                setStats={setStats} 
                onResetIncidents={handleResetIncidents} 
              />
            )}

            {/* Custom modules routing mapping */}
            {activeView === "behaviour" && (
              <BehaviourAnalyticsView />
            )}

            {activeView === "privileged" && (
              <PrivilegedIdentityCenterView />
            )}

            {activeView === "threatIntel" && (
              <ThreatIntelligenceView />
            )}

            {activeView === "aiRisk" && (
              <AiRiskEngineView />
            )}

            {activeView === "adaptive" && (
              <AdaptivePoliciesView />
            )}

            {activeView === "audit" && (
              <SecurityAuditTrailView />
            )}

            {activeView === "quantum" && (
              <QuantumVaultView />
            )}

            {activeView === "compliance" && (
              <ComplianceCenterView />
            )}

            {activeView === "alerts" && (
              <AlertsCenterView />
            )}

            {activeView === "incidentReports" && (
              <IncidentReportsView />
            )}

            {activeView === "executive" && (
              <ExecutiveDashboardView />
            )}

            {activeView === "branchRisk" && (
              <BranchRiskView />
            )}

            {activeView === "caseManagement" && (
              <CaseManagementView />
            )}

            {activeView === "orgManagement" && (
              <OrgManagementView />
            )}

            {activeView === "reportsAnalytics" && (
              <ReportsAnalyticsView />
            )}

            {activeView === "systemHealth" && (
              <SystemHealthView />
            )}

            {activeView === "aiModel" && (
              <AiModelMonitoringView />
            )}

            {activeView === "userProfile" && (
              <UserProfileView />
            )}

            {activeView === "fraudAml" && (
              <FraudAmlView />
            )}
          </div>
        </main>
      </div>

      {/* Interactive simulated incident trigger modal */}
      {showNewIncidentModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] border border-[#1f2937] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-scale-up">
            <div className="p-5 border-b border-[#1f2937] bg-[#151d1e]/10 flex justify-between items-center">
              <h3 className="text-xs font-bold text-primary font-mono tracking-wider flex items-center gap-2">
                <Plus className="h-4 w-4" />
                SIMULATE NEW THREAT INCIDENT
              </h3>
              <button 
                onClick={() => setShowNewIncidentModal(false)}
                className="text-on-surface-variant hover:text-on-surface text-xs font-bold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateIncident} className="p-5 space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-on-surface-variant font-mono block">Incident Title</label>
                <input 
                  required
                  type="text" 
                  value={newIncidentTitle}
                  onChange={(e) => setNewIncidentTitle(e.target.value)}
                  placeholder="e.g., Ransomware handshake / Session hijack"
                  className="w-full bg-[#080f11] border border-[#1f2937] rounded-lg p-2.5 text-on-surface outline-none focus:border-primary-container"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-on-surface-variant font-mono block">Target User Entity</label>
                <input 
                  type="text" 
                  value={newIncidentUser}
                  onChange={(e) => setNewIncidentUser(e.target.value)}
                  placeholder="e.g., JSmith / System_Core"
                  className="w-full bg-[#080f11] border border-[#1f2937] rounded-lg p-2.5 text-on-surface outline-none focus:border-primary-container"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-on-surface-variant font-mono block">Threat Description</label>
                <textarea 
                  rows={3}
                  value={newIncidentDesc}
                  onChange={(e) => setNewIncidentDesc(e.target.value)}
                  placeholder="Summarize key log events triggering policy violation..."
                  className="w-full bg-[#080f11] border border-[#1f2937] rounded-lg p-2.5 text-on-surface outline-none focus:border-primary-container resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#1f2937]/50">
                <button 
                  type="button"
                  onClick={() => setShowNewIncidentModal(false)}
                  className="px-4 py-2 border border-[#1f2937] text-on-surface-variant hover:text-on-surface hover:border-outline rounded-lg font-mono text-[11px] cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary-container text-on-primary-fixed hover:bg-primary-fixed rounded-lg font-mono text-[11px] font-bold cursor-pointer"
                >
                  Inject Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
